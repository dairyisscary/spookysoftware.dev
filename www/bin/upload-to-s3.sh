set -ex

ONE_YEAR="31536000"
BROWSER_EXPIRES="public, max-age=0, s-maxage=$ONE_YEAR, must-revalidate"
BROWSER_IMMUTABLE="public, max-age=$ONE_YEAR, immutable"

# HTML and Page Data that can't be (browser) cached
aws s3 cp --recursive --metadata-directive REPLACE --cache-control "$BROWSER_EXPIRES" --exclude "*" --include "*.html" public "s3://$BUCKET_NAME"
aws s3 cp --recursive --metadata-directive REPLACE --cache-control "$BROWSER_EXPIRES" public/page-data "s3://$BUCKET_NAME/page-data"
aws s3 cp --metadata-directive REPLACE --cache-control "$BROWSER_EXPIRES" public/chunk-map.json "s3://$BUCKET_NAME"
aws s3 cp --metadata-directive REPLACE --cache-control "$BROWSER_EXPIRES" public/webpack.stats.json "s3://$BUCKET_NAME"
aws s3 cp --metadata-directive REPLACE --cache-control "$BROWSER_EXPIRES" public/rss.xml "s3://$BUCKET_NAME"

# Static and JS/CSS that can be cached forever
aws s3 cp --recursive --metadata-directive REPLACE --cache-control "$BROWSER_IMMUTABLE" public/static "s3://$BUCKET_NAME/static"
aws s3 cp --recursive --metadata-directive REPLACE --cache-control "$BROWSER_IMMUTABLE" --exclude "*" --include "*.js" --include "*.css" public "s3://$BUCKET_NAME"
