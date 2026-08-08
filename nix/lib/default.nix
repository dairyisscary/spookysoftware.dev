{ inputs, ... }:
let
  inherit (inputs.nixpkgs) lib;
in
{
  # Like `mkShell` but less garbage
  mkMinimalShell = pkgs: args:
    let
      inherit (pkgs) stdenvNoCC;
      minimalStdEnv = stdenvNoCC.override {
        allowedRequisites = null;
        cc = null;
        extraNativeBuildInputs = [ ];
        initialPath = lib.filter (a: lib.hasPrefix "coreutils" a.name) stdenvNoCC.initialPath;
        preHook = "";
      };
    in
    pkgs.mkShell.override { stdenv = minimalStdEnv; } args;
}
