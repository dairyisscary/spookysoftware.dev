resource "cloudflare_zone" "root_zone" {
  account = {
    id = var.cloudflare_account_id
  }
  name = local.root_domain
}

resource "cloudflare_zone_setting" "always_use_https" {
  zone_id    = cloudflare_zone.root_zone.id
  setting_id = "always_use_https"
  value      = "on"
}

resource "cloudflare_zone_setting" "automatic_https_rewrites" {
  zone_id    = cloudflare_zone.root_zone.id
  setting_id = "automatic_https_rewrites"
  value      = "off"
}

resource "cloudflare_zone_setting" "brotli" {
  zone_id    = cloudflare_zone.root_zone.id
  setting_id = "brotli"
  value      = "on"
}

resource "cloudflare_zone_setting" "browser_cache_ttl" {
  zone_id    = cloudflare_zone.root_zone.id
  setting_id = "browser_cache_ttl"
  value      = 0
}

resource "cloudflare_zone_setting" "browser_check" {
  zone_id    = cloudflare_zone.root_zone.id
  setting_id = "browser_check"
  value      = "off"
}

resource "cloudflare_zone_setting" "email_obfuscation" {
  zone_id    = cloudflare_zone.root_zone.id
  setting_id = "email_obfuscation"
  value      = "off"
}

resource "cloudflare_zone_setting" "http3" {
  zone_id    = cloudflare_zone.root_zone.id
  setting_id = "http3"
  value      = "on"
}

resource "cloudflare_zone_setting" "ipv6" {
  zone_id    = cloudflare_zone.root_zone.id
  setting_id = "ipv6"
  value      = "on"
}

resource "cloudflare_zone_setting" "min_tls_version" {
  zone_id    = cloudflare_zone.root_zone.id
  setting_id = "min_tls_version"
  value      = "1.2"
}

resource "cloudflare_zone_setting" "security_level" {
  zone_id    = cloudflare_zone.root_zone.id
  setting_id = "security_level"
  value      = "essentially_off"
}

resource "cloudflare_zone_setting" "ssl" {
  zone_id    = cloudflare_zone.root_zone.id
  setting_id = "ssl"
  value      = "flexible"
}

resource "cloudflare_zone_setting" "tls_1_3" {
  zone_id    = cloudflare_zone.root_zone.id
  setting_id = "tls_1_3"
  value      = "zrt"
}

resource "cloudflare_zone_setting" "websockets" {
  zone_id    = cloudflare_zone.root_zone.id
  setting_id = "websockets"
  value      = "off"
}

resource "cloudflare_zone_setting" "zero_rtt" {
  zone_id    = cloudflare_zone.root_zone.id
  setting_id = "0rtt"
  value      = "on"
}

resource "cloudflare_dns_record" "root" {
  zone_id = cloudflare_zone.root_zone.id
  type    = "CNAME"
  name    = "@"
  content = "www.${local.root_domain}"
  proxied = true
  ttl     = 1
}

resource "cloudflare_dns_record" "spf" {
  zone_id = cloudflare_zone.root_zone.id
  type    = "TXT"
  name    = "@"
  content = "\"v=spf1 -all\""
  ttl     = 1
}

resource "cloudflare_dns_record" "dkim" {
  zone_id = cloudflare_zone.root_zone.id
  type    = "TXT"
  name    = "*._domainkey"
  content = "\"v=DKIM1; p=\""
  ttl     = 1
}

resource "cloudflare_dns_record" "dmarc" {
  zone_id = cloudflare_zone.root_zone.id
  type    = "TXT"
  name    = "_dmarc"
  content = "\"v=DMARC1; p=reject; sp=reject; adkim=s; aspf=s;\""
  ttl     = 1
}
