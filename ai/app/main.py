from io import BytesIO
from fastapi import FastAPI, UploadFile, File, HTTPException
from PIL import Image

from app.model import predict

app = FastAPI(title="Kabadiwala Connect - Customer AI Engine")

@app.get("/")
def home():
    return {"message": "AI service is running"}

@app.post("/analyze")
async def analyze(image: UploadFile = File(...)):
    if not image.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File uploaded is not an image.")
    
    try:
        image_data = await image.read()
        pil_image = Image.open(BytesIO(image_data))
        return predict(pil_image)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Inference error: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)