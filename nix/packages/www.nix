{ flake, pkgs, ... }:
let
  inherit (pkgs) lib;

  nodejsSlim = pkgs.nodejs-slim_24;
  nodejs = nodejsSlim.out;
  pnpm = pkgs.pnpm_11.override { nodejs-slim = nodejsSlim; };

  playwrightDriver = pkgs.playwright-driver;
  playwrightDriverVersion = playwrightDriver.version;
  browsers = playwrightDriver.browsers.override {
    withChromium = false;
    withFirefox = false;
    withWebkit = false;
    withFfmpeg = false;
    withChromiumHeadlessShell = true;
  };

  fs = lib.fileset;
  getSrc = mapFn: fs.toSource rec {
    root = ./../../domains/www;
    fileset = mapFn (fs.gitTracked root);
  };

  packageJsonFile = ./../../domains/www/package.json;
  packageJson = builtins.fromJSON (builtins.readFile packageJsonFile);
  npmPlaywrightVersion = packageJson.dependencies.playwright;
in

assert lib.assertMsg (npmPlaywrightVersion == playwrightDriverVersion)
  "Expected playwright versions to match (npm: ${npmPlaywrightVersion}, nixpkgs: ${playwrightDriverVersion})";

pkgs.stdenvNoCC.mkDerivation (finalAttrs: {
  pname = "www.spookysoftware.dev";
  version = flake.shortRev or "dev";

  src = getSrc lib.id;

  pnpmDeps = pkgs.fetchPnpmDeps {
    inherit (finalAttrs) pname pnpmInstallFlags;
    inherit pnpm;
    src = getSrc (fs.intersection (fs.unions [
      packageJsonFile
      ./../../domains/www/pnpm-lock.yaml
      ./../../domains/www/pnpm-workspace.yaml
    ]));
    env = { inherit (finalAttrs.env) NODE_ENV; };
    fetcherVersion = 4;
    hash = "sha256-8A1oHQD61T0s8rlT/wpM5VXljKenHJx+SZ+1qa8QueQ=";
  };

  pnpmInstallFlags = [ "--prod" ];

  env = {
    NODE_ENV = "production";
    PUBLIC_PACKAGE_VERSION = finalAttrs.version;

    PLAYWRIGHT_BROWSERS_PATH = "${browsers}";
    PLAYWRIGHT_SKIP_VALIDATE_HOST_REQUIREMENTS = "1";
    PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD = "1";
    FONTCONFIG_FILE = "${pkgs.makeFontsConf { fontDirectories = []; }}";
  };

  nativeBuildInputs = [
    pnpm
    pkgs.pnpmConfigHook
    nodejs
    browsers
    pkgs.nushell
  ];

  buildPhase = ''
    runHook preBuild

    nu bin/build.nu

    runHook postBuild
  '';

  installPhase = ''
    runHook preInstall

    mkdir -p $out/opt
    # TODO cp -r dist/{server,client} $out/opt
    cp -r dist/client $out/opt

    runHook postInstall
  '';

  passthru = {
    inherit nodejs pnpm;
  };
})
