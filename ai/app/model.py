import torch
from torchvision import models, transforms
from PIL import Image
from pathlib import Path


# ============================================================
# 1. MATERIAL CLASSES
# ============================================================

MATERIALS = [
    "Battery",
    "CRT",
    "Cable",
    "LCD",
    "Mixed_Plastic",
    "Other",
    "PCB"
]


# ============================================================
# 2. DEVICE
# ============================================================

device = torch.device("cpu")


# ============================================================
# 3. MODEL
# ============================================================

model = models.mobilenet_v3_small(weights=None)

model.classifier[3] = torch.nn.Linear(
    model.classifier[3].in_features,
    len(MATERIALS)
)


# ============================================================
# 4. LOAD TRAINED WEIGHTS
# ============================================================

MODEL_PATH = (
    Path(__file__).resolve().parents[1]
    / "models"
    / "mobilenet_v3_small.pth"
)

model.load_state_dict(
    torch.load(
        MODEL_PATH,
        map_location=device
    )
)

model = model.to(device)
model.eval()


# ============================================================
# 5. IMAGE PREPROCESSING
# ============================================================

transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
])


# ============================================================
# 6. PREDICTION
# ============================================================

def predict(image: Image.Image):

    image = image.convert("RGB")

    image = transform(image)

    image = image.unsqueeze(0).to(device)

    with torch.no_grad():

        output = model(image)

        probabilities = torch.softmax(
            output,
            dim=1
        )

        confidence, index = torch.max(
            probabilities,
            dim=1
        )

    return {
        "material": MATERIALS[index.item()],
        "confidence": round(
            confidence.item(),
            4
        )
    }