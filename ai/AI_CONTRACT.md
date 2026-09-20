# AI API Contract

## Endpoint

POST /analyze

## Input

Multipart form-data:

- image: uploaded scrap/e-waste image

## Output

```json
{
  "material": "PCB",
  "confidence": 0.91
}