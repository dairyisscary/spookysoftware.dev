variable "root_domain" {
  type = string
}

variable "root_dns_zone_id" {
  type = string
}

resource "aws_acm_certificate" "main_cert" {
  domain_name               = var.root_domain
  validation_method         = "DNS"
  subject_alternative_names = ["www.${var.root_domain}"]

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_acm_certificate_validation" "main_cert_all" {
  certificate_arn         = aws_acm_certificate.main_cert.arn
  validation_record_fqdns = [for record in aws_route53_record.main_cert_validation : record.fqdn]

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_s3_bucket" "root_website_bucket" {
  bucket = var.root_domain

  lifecycle {
    prevent_destroy = true
  }

  website {
    redirect_all_requests_to = "https://www.${var.root_domain}"
  }

  policy = <<POLICY
{
    "Statement": [
        {
            "Action": [
                "s3:GetObject"
            ],
            "Effect": "Allow",
            "Principal": "*",
            "Resource": "arn:aws:s3:::${var.root_domain}/*",
            "Sid": "PublicReadAccess"
        }
    ],
    "Version": "2012-10-17"
}
POLICY
}

resource "aws_s3_bucket" "www_website_bucket" {
  bucket = "www.${var.root_domain}"

  lifecycle {
    prevent_destroy = true
  }

  website {
    index_document = "index.html"
    error_document = "404.html"
  }

  versioning {
    enabled = true
  }

  lifecycle_rule {
    enabled = true

    noncurrent_version_expiration {
      days = "15"
    }
  }

  policy = <<POLICY
{
    "Statement": [
        {
            "Action": [
                "s3:GetObject"
            ],
            "Effect": "Allow",
            "Principal": "*",
            "Resource": "arn:aws:s3:::www.${var.root_domain}/*",
            "Sid": "PublicReadAccess"
        }
    ],
    "Version": "2012-10-17"
}
POLICY
}

output "www_static_bucket_name" {
  value = aws_s3_bucket.www_website_bucket.bucket
}

resource "aws_cloudfront_distribution" "root_website_cdn" {
  enabled         = true
  is_ipv6_enabled = true
  price_class     = "PriceClass_All"
  http_version    = "http2"

  origin {
    origin_id   = "origin-bucket-${aws_s3_bucket.root_website_bucket.id}"
    domain_name = aws_s3_bucket.root_website_bucket.website_endpoint

    custom_origin_config {
      origin_protocol_policy = "http-only"
      http_port              = "80"
      https_port             = "443"
      origin_ssl_protocols   = ["TLSv1.2"]
    }
  }

  default_cache_behavior {
    min_ttl                = "0"
    default_ttl            = "86400"    # one day
    max_ttl                = "31536000" # one year
    target_origin_id       = "origin-bucket-${aws_s3_bucket.root_website_bucket.id}"
    viewer_protocol_policy = "redirect-to-https"
    compress               = true

    allowed_methods = [
      "GET",
      "HEAD",
    ]

    cached_methods = [
      "GET",
      "HEAD",
    ]

    forwarded_values {
      query_string = "false"

      cookies {
        forward = "none"
      }
    }
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate_validation.main_cert_all.certificate_arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.1_2016"
  }

  aliases = [
    var.root_domain,
  ]
}

resource "aws_cloudfront_distribution" "www_website_cdn" {
  enabled         = true
  is_ipv6_enabled = true
  price_class     = "PriceClass_All"
  http_version    = "http2"

  origin {
    origin_id   = "origin-bucket-${aws_s3_bucket.www_website_bucket.id}"
    domain_name = aws_s3_bucket.www_website_bucket.website_endpoint

    custom_origin_config {
      origin_protocol_policy = "http-only"
      http_port              = "80"
      https_port             = "443"
      origin_ssl_protocols   = ["TLSv1.2"]
    }
  }

  default_cache_behavior {
    min_ttl                = "0"
    default_ttl            = "86400"    # one day
    max_ttl                = "31536000" # one year
    target_origin_id       = "origin-bucket-${aws_s3_bucket.www_website_bucket.id}"
    viewer_protocol_policy = "redirect-to-https"
    compress               = true

    allowed_methods = [
      "GET",
      "HEAD",
    ]

    cached_methods = [
      "GET",
      "HEAD",
    ]

    forwarded_values {
      query_string = "false"

      cookies {
        forward = "none"
      }
    }
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate_validation.main_cert_all.certificate_arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.1_2016"
  }

  aliases = [
    "www.${var.root_domain}",
  ]
}

output "www_cdn_id" {
  value = aws_cloudfront_distribution.www_website_cdn.id
}

resource "aws_route53_record" "cdn_alias_a_root_domain" {
  zone_id = var.root_dns_zone_id
  name    = var.root_domain
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.root_website_cdn.domain_name
    zone_id                = aws_cloudfront_distribution.root_website_cdn.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "cdn_alias_aaaa_root_domain" {
  zone_id = var.root_dns_zone_id
  name    = var.root_domain
  type    = "AAAA"

  alias {
    name                   = aws_cloudfront_distribution.root_website_cdn.domain_name
    zone_id                = aws_cloudfront_distribution.root_website_cdn.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "cdn_alias_a_www_domain" {
  zone_id = var.root_dns_zone_id
  name    = "www.${var.root_domain}"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.www_website_cdn.domain_name
    zone_id                = aws_cloudfront_distribution.www_website_cdn.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "cdn_alias_aaaa_www_domain" {
  zone_id = var.root_dns_zone_id
  name    = "www.${var.root_domain}"
  type    = "AAAA"

  alias {
    name                   = aws_cloudfront_distribution.www_website_cdn.domain_name
    zone_id                = aws_cloudfront_distribution.www_website_cdn.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "main_cert_validation" {
  for_each = {
    for dvo in aws_acm_certificate.main_cert.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  zone_id = var.root_dns_zone_id
  name    = each.value.name
  type    = each.value.type
  records = [each.value.record]
  ttl     = 60
}

resource "aws_route53_record" "fathom_analytics_cname" {
  zone_id = var.root_dns_zone_id
  name    = "efficient-skilled.${var.root_domain}"
  type    = "CNAME"
  records = ["ideal-pencil.b-cdn.net"]
  ttl     = 60
}
