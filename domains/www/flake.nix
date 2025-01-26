{
  description = "Spooky Software www Domain";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
  };

  outputs = inputs @ { self, nixpkgs }:
    let
      forAllSystems = mapFn: nixpkgs.lib.genAttrs [ "aarch64-darwin" "x86_64-linux" ] (
        system: mapFn (import nixpkgs { inherit system; })
      );
    in
    {

      devShells = forAllSystems (pkgs:
        let
          nodejs = pkgs.nodejs_22;
        in
        {
          default = pkgs.mkShell {
            buildInputs = [
              nodejs
              nodejs.pkgs.pnpm
              (pkgs.writeScriptBin "prettier" ''
                #!${pkgs.bash}/bin/bash
                set -euo pipefail
                ${nodejs.pkgs.pnpm}/bin/pnpm exec prettier "$@"
              '')
            ];
          };
        });

    };
}
