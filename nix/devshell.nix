{ flake, pkgs, ... }:
let
  pwd = builtins.getEnv "PWD";
  secretsDir = "${pwd}/.secrets";
  cloudflareAPITokenFile = "${secretsDir}/cloudflare-api-token";
in
flake.lib.mkMinimalShell pkgs {
  name = "spookysoftware-infra-devshell";

  packages = [
    pkgs.opentofu
    pkgs.awscli2
  ];

  shellHook = /* lang bash */ ''
    export AWS_PROFILE="production"
    export SPOOKY_ROOT="${pwd}"
    export CLOUDFLARE_API_TOKEN_FILE="${cloudflareAPITokenFile}"
    export TF_VAR_cloudflare_api_token_file="${cloudflareAPITokenFile}"
    export TF_DATA_DIR="${pwd}/.opentofu"
    export TF_VAR_cloudflare_theater_tunnel_password_file="${secretsDir}/cloudflare-theater-tunnel-password"
    export AWS_SHARED_CREDENTIALS_FILE="${secretsDir}/aws-credentials"
  '';
}
