{ flake, perSystem, pkgs, ... }:
let
  inherit (pkgs) lib;
  package = perSystem.self.www;
  inherit (package.passthru) nodejs pnpm;
in
flake.lib.mkMinimalShell pkgs {
  name = "www-spookysoftware-dev-devshell";

  env = lib.filterAttrs (key: value: lib.hasPrefix "PLAYWRIGHT_" key) package;

  packages = [
    nodejs.out
    pnpm
    flake.formatter.${pkgs.stdenv.system}.passthru.formatters.oxfmt
    (pkgs.writeShellScriptBin "dev" /* lang bash */ ''
      set -e
      pnpm exec vite --config-loader native
    '')
  ];
}
