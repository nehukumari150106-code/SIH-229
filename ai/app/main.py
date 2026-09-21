from fastapi import FastAPI, UploadFile, File
from PIL import Image
from io import BytesIO

from ai.app.model import predict


app = FastAPI(title="Kabadiwala Connect AI")


@app.get("/")
def home():
    return {"message": "AI service is running"}


@app.post("/analyze")
async def analyze(image: UploadFile = File(...)):
    image_data = await image.read()
    pil_image = Image.open(BytesIO(image_data))

    result = predict(pil_image)

    return result