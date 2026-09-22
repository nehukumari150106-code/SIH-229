import torch
from torchvision import models, transforms
from PIL import Image
from pathlib import Path

# -----------------------------
# Paths
# -----------------------------

BASE_DIR = Path(__file__).resolve().parents[1]

TEST_DIR = BASE_DIR / "data" / "real_world_test"

MODEL_PATH = (
    BASE_DIR
    / "ai"
    / "models"
    / "mobilenet_v3_small.pth"
)

# -----------------------------
# Classes
# -----------------------------

CLASSES = [
    "Battery",
    "CRT",
    "Cable",
    "LCD",
    "Mixed_Plastic",
    "Other",
    "PCB"
]

# -----------------------------
# Device
# -----------------------------

device = torch.device("cpu")

# -----------------------------
# Load model
# -----------------------------

model = models.mobilenet_v3_small(weights=None)

model.classifier[3] = torch.nn.Linear(
    model.classifier[3].in_features,
    len(CLASSES)
)

model.load_state_dict(
    torch.load(
        MODEL_PATH,
        map_location=device
    )
)

model = model.to(device)
model.eval()

# -----------------------------
# Image preprocessing
# -----------------------------

transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
])

# -----------------------------
# Evaluate
# -----------------------------

correct = 0
total = 0

print("\n==============================")
print("REAL-WORLD TEST")
print("==============================\n")

for true_class in CLASSES:

    class_dir = TEST_DIR / true_class

    if not class_dir.exists():
        print(f"Missing folder: {true_class}")
        continue

    print(f"\n--- {true_class} ---")

    for image_path in class_dir.iterdir():

        if image_path.suffix.lower() not in [
            ".jpg", ".jpeg", ".png", ".webp"
        ]:
            continue

        try:
            image = Image.open(image_path).convert("RGB")

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

            predicted_class = CLASSES[index.item()]
            confidence_value = confidence.item()

            is_correct = predicted_class == true_class

            if is_correct:
                correct += 1

            total += 1

            result = "✓" if is_correct else "✗"

            print(
                f"{result} "
                f"{image_path.name} → "
                f"{predicted_class} "
                f"({confidence_value:.2f})"
            )

        except Exception as e:
            print(
                f"ERROR: {image_path.name} → {e}"
            )

# -----------------------------
# Final result
# -----------------------------

print("\n==============================")
print("FINAL RESULT")
print("==============================")

if total > 0:
    accuracy = (correct / total) * 100

    print(f"Correct: {correct}/{total}")
    print(f"Accuracy: {accuracy:.2f}%")
else:
    print("No images were found.")