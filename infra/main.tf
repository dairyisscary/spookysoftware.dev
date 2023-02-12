terraform {
  required_version = "~> 1.1.7"

  backend "s3" {
    bucket = "dairyisscary-terraform-state"
    key    = "spookysoftware/terraform.tfstate"
    region = "us-east-1"
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.14.0"
    }

    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 3.14.0"
    }
  }
}

locals {
  root_domain = "spookysoftware.dev"
}

provider "aws" {
  region = "us-east-1"
}

provider "cloudflare" {}

resource "cloudflare_zone" "root_zone" {
  zone = local.root_domain
}

resource "cloudflare_record" "root" {
  zone_id = cloudflare_zone.root_zone.id
  type    = "CNAME"
  name    = "@"
  value   = "www.${local.root_domain}"
  proxied = true
}

resource "cloudflare_record" "spf" {
  zone_id = cloudflare_zone.root_zone.id
  type    = "TXT"
  name    = "@"
  value   = "v=spf1 -all"
}

resource "cloudflare_record" "dkim" {
  zone_id = cloudflare_zone.root_zone.id
  type    = "TXT"
  name    = "*._domainkey"
  value   = "v=DKIM1; p="
}

resource "cloudflare_record" "dmarc" {
  zone_id = cloudflare_zone.root_zone.id
  type    = "TXT"
  name    = "_dmarc"
  value   = "v=DMARC1; p=reject; sp=reject; adkim=s; aspf=s;"
}

module "www" {
  source = "../domains/www/infra"

  root_domain     = local.root_domain
  cf_root_zone_id = cloudflare_zone.root_zone.id
}

output "www_static_bucket_name" {
  value = module.www.www_static_bucket_name
}

output "cloudflare_zone_id" {
  value = cloudflare_zone.root_zone.id
}
