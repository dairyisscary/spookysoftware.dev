set -ex

ONE_YEAR="31536000"

# HTML and Page Data that can't be (browser) cached
aws s3 cp --recursive --metadata-directive REPLACE --cache-control "public, max-age=0, s-maxage=$ONE_YEAR, must-revalidate" --exclude "*" --include "*.html" public "s3://$BUCKET_NAME"
aws s3 cp --recursive --metadata-directive REPLACE --cache-control "public, max-age=0, s-maxage=$ONE_YEAR, must-revalidate" public/page-data "s3://$BUCKET_NAME/page-data"

# Static and JS/CSS that can be cached forever
aws s3 cp --recursive --metadata-directive REPLACE --cache-control "public, max-age=$ONE_YEAR, immutable" public/static "s3://$BUCKET_NAME/static"
aws s3 cp --recursive --metadata-directive REPLACE --cache-control "public, max-age=$ONE_YEAR, immutable" --exclude "*" --include "*.js" --include "*.css" public "s3://$BUCKET_NAME"
