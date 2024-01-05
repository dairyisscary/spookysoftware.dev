{
  description = "spookysoftware";

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

      devShells = forAllSystems (systemPkgs: {
        default = systemPkgs.mkShell {
          buildInputs = [
            systemPkgs.nodejs-slim
            systemPkgs.nodePackages.pnpm
            systemPkgs.nodePackages.prettier
          ];
        };
      });

    };
}
