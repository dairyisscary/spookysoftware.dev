terraform {
  backend "s3" {
    bucket = "dairyisscary-terraform-state"
    key    = "spookysoftware/terraform.tfstate"
    region = "us-east-1"
  }
}

locals {
  root_domain = "spookysoftware.dev"
}

provider "aws" {
  region  = "us-east-1"
  version = "~> 2.46"
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
