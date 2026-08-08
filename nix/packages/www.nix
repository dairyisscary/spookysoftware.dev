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

  src = getSrc (gitRoot: fs.difference gitRoot ./../../domains/www/infra);

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
    hash = "sha256-TBjvr49jE+sY6dyR5HWPni8eua4VJukdoNBki6sKn+0=";
  };

  pnpmInstallFlags = [ "--prod" ];

  env = {
    NODE_ENV = "production";
    PUBLIC_PACKAGE_VERSION = finalAttrs.version;

    PLAYWRIGHT_BROWSERS_PATH = browsers;
    PLAYWRIGHT_SKIP_VALIDATE_HOST_REQUIREMENTS = "1";
    PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD = "1";
    FONTCONFIG_FILE = pkgs.makeFontsConf {
      fontDirectories = [
        pkgs.source-serif
        pkgs.fira-code
        pkgs.noto-fonts
      ];
      impureFontDirectories = [ ];
      includes = [ ];
    };
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

    cp -r dist/static-routes $out
    cp -r dist/client/* $out
    cp src/site/cloudflare-pages-headers.txt $out/_headers
    cp src/site/cloudflare-pages-redirects.txt $out/_redirects

    runHook postInstall
  '';

  passthru = {
    inherit nodejs pnpm;
  };
})
