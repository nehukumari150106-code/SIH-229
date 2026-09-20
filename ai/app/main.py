from fastapi import FastAPI, UploadFile, File

app = FastAPI(title="Kabadiwala Connect AI")


@app.get("/")
def home():
    return {"message": "AI service is running"}


@app.post("/analyze")
async def analyze(image: UploadFile = File(...)):
    return {
    "material": "PCB",
    "confidence": 0.91,
    "simulated": True
}