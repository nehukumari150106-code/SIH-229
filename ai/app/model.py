import torch
from torchvision import models, transforms
from PIL import Image
from pathlib import Path

# Match class list alphabetical ordering (PyTorch ImageFolder defaults to alphabetical)
CATEGORIES = [
    "CABLE_WIRE",
    "COMPUTER_LAPTOP",
    "FRIDGE_AC",
    "MOBILE_TABLET",
    "NOT_SURE",
    "OTHER_ELECTRONICS",
    "TV_MONITOR",
    "WASHING_APPLIANCE"
]

device = torch.device("cpu")

# Model Initialization
model = models.mobilenet_v3_small(weights=None)
model.classifier[3] = torch.nn.Linear(
    model.classifier[3].in_features,
    len(CATEGORIES)
)

MODEL_PATH = Path(__file__).resolve().parents[1] / "models" / "mobilenet_v3_small.pth"

if MODEL_PATH.exists():
    model.load_state_dict(torch.load(MODEL_PATH, map_location=device))

model = model.to(device)
model.eval()

# Standard ImageNet Transforms
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])

CONFIDENCE_THRESHOLD = 0.60

def predict(image: Image.Image) -> dict:
    image = image.convert("RGB")
    tensor_image = transform(image).unsqueeze(0).to(device)

    with torch.no_grad():
        output = model(tensor_image)
        probabilities = torch.softmax(output, dim=1)
        confidence, index = torch.max(probabilities, dim=1)

    score = round(confidence.item(), 4)
    predicted_category = CATEGORIES[index.item()]

    # Fallback trigger if confidence is below operating threshold
    if score < CONFIDENCE_THRESHOLD:
        return {
            "category": "NOT_SURE",
            "confidence": score,
            "low_confidence_flag": True
        }

    return {
        "category": predicted_category,
        "confidence": score,
        "low_confidence_flag": False
    }