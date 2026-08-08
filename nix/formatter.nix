{ pname, pkgs, ... }:
let
  inherit (pkgs) lib treefmt;
  inherit (lib) getExe;

  formatters = {
    deadnix = {
      args = [ "--edit" ];
      includes = [ "*.nix" ];
    };
    nixpkgs-fmt = {
      includes = [ "*.nix" ];
    };
    opentofu = {
      options = [ "fmt" ];
      includes = [ "*.tf" "*.tfvars" "*.tftest.hcl" ];
    };
    oxfmt = {
      includes = [
        "*.cjs"
        "*.css"
        "*.html"
        "*.js"
        "*.json"
        "*.jsx"
        "*.md"
        "*.mjs"
        "*.ts"
        "*.tsx"
        "*.yaml"
        "*.yml"
      ];
    };
  };

  treefmtConfigFile = (pkgs.formats.toml { }).generate "treefmt.toml" {
    formatter = builtins.mapAttrs (name: config: config // { command = getExe pkgs.${name}; }) formatters;
  };
in
pkgs.stdenvNoCC.mkDerivation {
  name = pname;

  nativeBuildInputs = [
    pkgs.makeBinaryWrapper
  ];

  dontUnpack = true;
  dontConfigure = true;
  dontBuild = true;

  installPhase = ''
    runHook preInstall

    mkdir -p $out/bin

    makeWrapper "${getExe treefmt}" "$out/bin/treefmt" \
      --append-flags "--config-file ${treefmtConfigFile}"

    runHook postInstall
  '';

  passthru = {
    formatters = builtins.mapAttrs (name: config: pkgs.${name}) formatters;
  };

  inherit (treefmt) meta;
}
