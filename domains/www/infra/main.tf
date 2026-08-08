terraform {
  required_version = "~> 1.12.6"

  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 5.24.0"
    }
  }
}

variable "root_domain" {
  type = string
}

variable "cloudflare_account_id" {
  type = string
}

variable "cloudflare_root_zone_id" {
  type = string
}

resource "cloudflare_dns_record" "www" {
  zone_id = var.cloudflare_root_zone_id
  type    = "CNAME"
  name    = "www"
  content = cloudflare_pages_project.www.subdomain
  proxied = true
  ttl     = 1
}

resource "cloudflare_page_rule" "redirect_root_to_www" {
  zone_id = var.cloudflare_root_zone_id
  target  = "${var.root_domain}/*"
  status  = "active"

  actions = {
    forwarding_url = {
      url         = "https://www.${var.root_domain}/$1"
      status_code = 301
    }
  }
}

resource "cloudflare_pages_project" "www" {
  account_id        = var.cloudflare_account_id
  name              = "www-spookysoftware-dev"
  production_branch = "production"
}

resource "cloudflare_pages_domain" "www" {
  account_id   = var.cloudflare_account_id
  project_name = cloudflare_pages_project.www.name
  name         = cloudflare_dns_record.www.name
}

output "www_pages_project_name" {
  value = cloudflare_pages_project.www.name
}
