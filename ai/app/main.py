from fastapi import FastAPI

app = FastAPI(title="Kabadiwala Connect AI")


@app.get("/")
def home():
    return {"message": "AI service is running"}


@app.post("/analyze")
def analyze():
    return {
        "material": "PCB",
        "confidence": 0.91
    }