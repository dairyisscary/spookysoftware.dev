{ flake, pkgs, ... }:
flake.lib.mkMinimalShell pkgs {
  name = "spookysoftware-infra-devshell";

  packages = [
    pkgs.nushell
    pkgs.opentofu
    pkgs.wrangler
  ];

  env =
    let
      cloudflareAccountId = "a135e34dcd53a22a339f6a334d0281db";
    in
    {
      AWS_PROFILE = "production";
      CLOUDFLARE_ACCOUNT_ID = cloudflareAccountId;
      TF_VAR_cloudflare_account_id = cloudflareAccountId;
    };

  shellHook = ''
    export AWS_SHARED_CREDENTIALS_FILE="$(pwd)/.secrets/aws-credentials"
    export CLOUDFLARE_API_TOKEN="$(cat "$(pwd)/.secrets/cloudflare-api-token" | xargs)"
    export TF_VAR_cloudflare_api_token="$CLOUDFLARE_API_TOKEN"
  '';
}
