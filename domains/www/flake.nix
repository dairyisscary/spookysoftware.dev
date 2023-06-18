{
  description = "spookysoftware";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
  };

  outputs = inputs @ { self, nixpkgs }: let
    getSystemPkgs = system: nixpkgs.legacyPackages.${system};
   
    forAllSystems = mapFn:
      nixpkgs.lib.genAttrs ["x86_64-linux"] (
        system: mapFn (getSystemPkgs system)
      );
  in {

    devShells = forAllSystems (systemPkgs: {
      default = systemPkgs.mkShell {
        buildInputs = [systemPkgs.nodejs-slim systemPkgs.nodePackages.pnpm];
      };
    });

  };
}
