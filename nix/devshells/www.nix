{ flake, pkgs, ... }:
let
  nodejs = pkgs.nodejs-slim_24;
  pnpm = pkgs.pnpm_11.override { nodejs-slim = nodejs; };
in
flake.lib.mkMinimalShell pkgs {
  name = "www-spookysoftware-dev-devshell";

  packages = [
    nodejs.out
    pnpm
    flake.formatter.${pkgs.stdenv.system}.passthru.formatters.oxfmt
  ];
}
