import torch
from torchvision import models, transforms
from PIL import Image
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parents[1]

TEST_DIR = BASE_DIR / "data" / "diagnostic_test"
MODEL_PATH = BASE_DIR / "ai" / "models" / "mobilenet_v3_small.pth"

CLASSES = [
    "Battery",
    "CRT",
    "Cable",
    "LCD",
    "Mixed_Plastic",
    "Other",
    "PCB"
]

device = torch.device("cpu")

model = models.mobilenet_v3_small(weights=None)

model.classifier[3] = torch.nn.Linear(
    model.classifier[3].in_features,
    len(CLASSES)
)

model.load_state_dict(
    torch.load(MODEL_PATH, map_location=device)
)

model.eval()

transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
])

print("\n==============================")
print("CONTROLLED DIAGNOSTIC TEST")
print("==============================\n")

for image_path in sorted(TEST_DIR.iterdir()):

    if image_path.suffix.lower() not in [".jpg", ".jpeg", ".png", ".webp"]:
        continue

    image = Image.open(image_path).convert("RGB")
    image = transform(image).unsqueeze(0)

    with torch.no_grad():
        output = model(image)
        probabilities = torch.softmax(output, dim=1)
        confidence, index = torch.max(probabilities, dim=1)

    predicted = CLASSES[index.item()]

    print(
        f"{image_path.stem:25} → "
        f"{predicted:15} "
        f"confidence={confidence.item():.2f}"
    )