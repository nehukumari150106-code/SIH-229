import torch
from torchvision import models, transforms
from PIL import Image

MATERIALS = [
    "PCB",
    "Cable",
    "Battery",
    "Motor",
    "CRT",
    "LCD",
    "Mixed Plastic",
    "Other"
]

device = torch.device("cpu")

model = models.mobilenet_v3_small(weights="DEFAULT")
model.classifier[3] = torch.nn.Linear(
    model.classifier[3].in_features,
    len(MATERIALS)
)

model = model.to(device)
model.eval()

transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
])


def predict(image: Image.Image):
    image = image.convert("RGB")
    image = transform(image).unsqueeze(0).to(device)

    with torch.no_grad():
        output = model(image)
        probabilities = torch.softmax(output, dim=1)
        confidence, index = torch.max(probabilities, dim=1)

    return {
        "material": MATERIALS[index.item()],
        "confidence": round(confidence.item(), 4)
    }