{
  description = "The online presence of spookysoftware.dev";

  inputs = {
    blueprint = {
      url = "github:numtide/blueprint";
      inputs.nixpkgs.follows = "nixpkgs";
    };

    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
  };

  outputs = inputs: inputs.blueprint {
    inherit inputs;
    systems = [
      "aarch64-darwin"
      "x86_64-linux"
    ];
    prefix = "nix/";
  };
}
