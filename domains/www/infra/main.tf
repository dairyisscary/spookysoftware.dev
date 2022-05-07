terraform {
  required_version = "~> 1.1.7"

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

variable "root_domain" {
  type = string
}

variable "cf_root_zone_id" {
  type = string
}

data "aws_iam_policy_document" "www_website_bucket_policy_document" {
  statement {
    sid       = "PublicReadAccess"
    actions   = ["s3:GetObject"]
    resources = ["arn:aws:s3:::${aws_s3_bucket.www_website_bucket.bucket}/*"]

    principals {
      type        = "*"
      identifiers = ["*"]
    }
  }
}

resource "aws_s3_bucket_policy" "www_website_bucket_policy" {
  bucket = aws_s3_bucket.www_website_bucket.id
  policy = data.aws_iam_policy_document.www_website_bucket_policy_document.json
}

resource "aws_s3_bucket_website_configuration" "www_website_bucket_website" {
  bucket = aws_s3_bucket.www_website_bucket.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "404.html"
  }
}

resource "aws_s3_bucket_versioning" "www_website_bucket_versioning" {
  bucket = aws_s3_bucket.www_website_bucket.id

  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_lifecycle_configuration" "www_website_bucket_lifecycle" {
  bucket = aws_s3_bucket.www_website_bucket.id

  rule {
    id     = "DeleteOldVersions"
    status = "Enabled"

    noncurrent_version_expiration {
      noncurrent_days = 15
    }
  }
}

resource "aws_s3_bucket" "www_website_bucket" {
  bucket = "www.${var.root_domain}"

  lifecycle {
    prevent_destroy = true
  }
}

output "www_static_bucket_name" {
  value = aws_s3_bucket.www_website_bucket.bucket
}

resource "cloudflare_record" "www" {
  zone_id = var.cf_root_zone_id
  type    = "CNAME"
  name    = "www"
  value   = aws_s3_bucket.www_website_bucket.website_endpoint
  proxied = true
}

resource "cloudflare_zone_settings_override" "root_zone" {
  zone_id = var.cf_root_zone_id

  settings {
    always_use_https         = "on"
    automatic_https_rewrites = "off"
    brotli                   = "on"
    browser_cache_ttl        = 0
    browser_check            = "off"
    http3                    = "on"
    ipv6                     = "on"
    min_tls_version          = "1.2"
    security_level           = "essentially_off"
    ssl                      = "flexible"
    tls_1_3                  = "zrt"
    websockets               = "off"
    zero_rtt                 = "on"
  }
}

resource "cloudflare_ruleset" "transform_http_headers" {
  zone_id     = var.cf_root_zone_id
  name        = "Add Security HTTP Headers"
  description = "Add security headers to responses"
  kind        = "zone"
  phase       = "http_response_headers_transform"

  rules {
    enabled     = true
    description = "Add security headers to all HTML content-type responses"
    action      = "rewrite"
    expression  = "any(http.response.headers[\"content-type\"][*] contains \"text/html\")"

    action_parameters {
      # Keep these alphabetized by name so that terraform doesn't diff
      headers {
        operation = "set"
        name      = "Referrer-Policy"
        value     = "no-referrer-when-downgrade"
      }

      headers {
        operation = "set"
        name      = "X-Content-Type-Options"
        value     = "nosniff"
      }

      headers {
        operation = "set"
        name      = "X-Frame-Options"
        value     = "DENY"
      }

      headers {
        operation = "set"
        name      = "X-XSS-Protection"
        value     = "1; mode=block"
      }
    }
  }
}

resource "cloudflare_page_rule" "redirect_root_to_www" {
  zone_id = var.cf_root_zone_id
  target  = "${var.root_domain}/*"

  actions {
    forwarding_url {
      url         = "https://www.${var.root_domain}/$1"
      status_code = 301
    }
  }
}
