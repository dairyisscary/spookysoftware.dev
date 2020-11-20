terraform {
  backend "s3" {
    bucket = "dairyisscary-terraform-state"
    key    = "spookysoftware/terraform.tfstate"
    region = "us-east-1"
  }

  required_providers {
    aws = {
      version = "~> 3.12"
    }
  }
}

locals {
  root_domain = "spookysoftware.dev"
}

provider "aws" {
  region  = "us-east-1"
}

resource "aws_route53_zone" "root" {
  name = local.root_domain
}

module "www" {
  source = "../www/infra"

  root_domain      = local.root_domain
  root_dns_zone_id = aws_route53_zone.root.zone_id
}

output "www_static_bucket_name" {
  value = module.www.www_static_bucket_name
}

output "www_cdn_id" {
  value = module.www.www_cdn_id
}
