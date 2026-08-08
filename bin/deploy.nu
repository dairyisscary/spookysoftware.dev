def build_www []: nothing -> string {
  print 'Building www'
  ^nix build '.#www' --no-link --print-out-paths | str trim
}

def provision_infrastructure []: nothing -> record {
  print 'Forming infrastructure'
  cd infra
  ^tofu init
  ^tofu apply
  let output = ^tofu output -json | from json
  cd -
  $output
}

def upload_assets [tf_output: record]: string -> nothing {
  let dir = $in
  print $'Uploading assets to Cloudflare pages from ($dir)'
  (
    ^wrangler pages deploy $dir
      --branch production
      --project-name $tf_output.cloudflare_www_pages_project_name.value
  )
}

def purge_cdn [tf_output: record]: nothing -> nothing {
  print 'Purging CDN cache'
  let cf_zone_id = $tf_output.cloudflare_zone_id.value
  (
    http post
      -t application/json
      -H [Authorization $'Bearer ($env.CLOUDFLARE_API_TOKEN)']
      $'https://api.cloudflare.com/client/v4/zones/($cf_zone_id)/purge_cache'
      {purge_everything: true}
  )
}

def main [] {
  let www_dir = build_www
  let tf_output = provision_infrastructure
  $www_dir | upload_assets $tf_output
  purge_cdn $tf_output
}
