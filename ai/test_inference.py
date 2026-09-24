from pathlib import Path
import torch
import torch.nn.functional as F
from torchvision import models, transforms
from PIL import Image

BASE_DIR = Path(__file__).resolve().parent
MODEL_PATH = BASE_DIR / "models" / "mobilenet_v3_small.pth"

# Exact path to your folder with underscores
TEST_DIR = BASE_DIR.parent / "data" / "real_world_test"

# Alphabetical order matching PyTorch train_dataset.class_to_idx
CLASSES = [
    "CABLE_WIRE",
    "COMPUTER_LAPTOP",
    "FRIDGE_AC",
    "MOBILE_TABLET",
    "NOT_SURE",
    "OTHER_ELECTRONICS",
    "TV_MONITOR",
    "WASHING_APPLIANCE"
]

CONFIDENCE_THRESHOLD = 0.60

transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
])

# Load Model Architecture
model = models.mobilenet_v3_small()
model.classifier[3] = torch.nn.Linear(model.classifier[3].in_features, len(CLASSES))
model.load_state_dict(torch.load(MODEL_PATH, map_location="cpu"))
model.eval()

print("--- RUNNING REAL-WORLD INFERENCE TEST ---")
print(f"Scanning directory: {TEST_DIR}\n")

# Recursively search for images across all subfolders (battery, cable, crt, lcd, etc.)
extensions = ["*.jpg", "*.jpeg", "*.png", "*.JPG", "*.JPEG", "*.PNG", "*.webp"]
test_images = []
for ext in extensions:
    test_images.extend(list(TEST_DIR.rglob(ext)))

if not test_images:
    print(f"Error: No image files found in {TEST_DIR} or its subfolders!")
else:
    print(f"Found {len(test_images)} test images across subfolders.\n")
    for img_path in test_images:
        try:
            image = Image.open(img_path).convert("RGB")
            tensor = transform(image).unsqueeze(0)

            with torch.no_grad():
                outputs = model(tensor)
                probs = F.softmax(outputs, dim=1)[0]
                conf, pred_idx = torch.max(probs, dim=0)

            category = CLASSES[pred_idx.item()]
            low_confidence = conf.item() < CONFIDENCE_THRESHOLD

            if low_confidence:
                category = "NOT_SURE"

            # Display parent folder name (e.g., battery/img1.jpg) for context
            relative_name = f"{img_path.parent.name}/{img_path.name}"
            print(f"File: {relative_name:<35} | Pred: {category:<18} | Conf: {conf.item():.4f}")

        except Exception as e:
            print(f"Could not process {img_path.name}: {e}")