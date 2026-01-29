# Cloudflare R2 CORS Configuration

To fix the `ERR_FAILED` upload errors, you must apply this CORS policy to your `tweetstore-assets` bucket in the Cloudflare R2 Dashboard.

1. Go to R2 -> tweetstore-assets -> Settings -> CORS Policy.
2. Paste the following JSON:

```json
[
  {
    "AllowedOrigins": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE", "HEAD"],
    "AllowedHeaders": ["*"],
    "ExposeHeaders": []
  }
]
```
