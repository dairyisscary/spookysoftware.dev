terraform {
  required_version = "~> 1.12.6"

  backend "s3" {
    bucket = "dairyisscary-terraform-state"
    key    = "spookysoftware/terraform.tfstate"
    region = "us-east-1"
  }

  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 5.24.0"
    }
  }
}

provider "cloudflare" {
  api_token = var.cloudflare_api_token
}

locals {
  root_domain = "spookysoftware.dev"
}

variable "cloudflare_api_token" {
  type = string
}

variable "cloudflare_account_id" {
  type = string
}

module "www" {
  source = "../domains/www/infra"

  root_domain             = local.root_domain
  cloudflare_account_id   = var.cloudflare_account_id
  cloudflare_root_zone_id = cloudflare_zone.root_zone.id
}

output "cloudflare_zone_id" {
  value = cloudflare_zone.root_zone.id
}

output "cloudflare_www_pages_project_name" {
  value = module.www.www_pages_project_name
}
