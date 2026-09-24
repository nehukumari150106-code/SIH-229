# AI Service API Contract

## Endpoint
`POST /analyze`

## Input
`multipart/form-data`
- `image`: Uploaded image file (e-waste object or scene)

## Output Response (200 OK)
```json
{
  "category": "TV_MONITOR",
  "confidence": 0.8942,
  "low_confidence_flag": false
}