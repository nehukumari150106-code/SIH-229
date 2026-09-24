from pathlib import Path
import torch
from torch import nn, optim
from torch.utils.data import DataLoader
from torchvision import datasets, models, transforms

# ============================================================
# 1. CONFIGURATION & PATHS (DYNAMIC RESOLUTION)
# ============================================================

BASE_DIR = Path(__file__).resolve().parent
DATASET = BASE_DIR / "dataset"
MODEL_OUTPUT = BASE_DIR / "models" / "mobilenet_v3_small.pth"

BATCH_SIZE = 32
EPOCHS = 15
LEARNING_RATE = 0.0005

# Automatically leverage CUDA GPU if available, otherwise default to CPU
DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print(f"Using device: {DEVICE}")
print(f"Target dataset path: {DATASET}")


# ============================================================
# 2. TRANSFORMS
# ============================================================

train_transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.RandomHorizontalFlip(),
    transforms.RandomRotation(15),
    transforms.ColorJitter(brightness=0.2, contrast=0.2),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])

val_test_transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])


# ============================================================
# 3. DATASETS & DATALOADERS
# ============================================================

train_dataset = datasets.ImageFolder(
    DATASET / "train",
    transform=train_transform
)
val_dataset = datasets.ImageFolder(
    DATASET / "val",
    transform=val_test_transform
)
test_dataset = datasets.ImageFolder(
    DATASET / "test",
    transform=val_test_transform
)

print("\nDetected Classes (Alphabetical):", train_dataset.classes)
print("Class Mapping:", train_dataset.class_to_idx)
print(f"Total Samples -> Train: {len(train_dataset)} | Val: {len(val_dataset)} | Test: {len(test_dataset)}\n")

train_loader = DataLoader(
    train_dataset,
    batch_size=BATCH_SIZE,
    shuffle=True,
    num_workers=0,  # Set to 0 for Windows CPU compatibility
    pin_memory=True if DEVICE.type == "cuda" else False
)
val_loader = DataLoader(
    val_dataset,
    batch_size=BATCH_SIZE,
    shuffle=False,
    num_workers=0,
    pin_memory=True if DEVICE.type == "cuda" else False
)
test_loader = DataLoader(
    test_dataset,
    batch_size=BATCH_SIZE,
    shuffle=False,
    num_workers=0,
    pin_memory=True if DEVICE.type == "cuda" else False
)


# ============================================================
# 4. MODEL INITIALIZATION
# ============================================================

model = models.mobilenet_v3_small(weights="DEFAULT")

# Replace classifier head for 8 classes
num_classes = len(train_dataset.classes)
model.classifier[3] = nn.Linear(model.classifier[3].in_features, num_classes)
model = model.to(DEVICE)

criterion = nn.CrossEntropyLoss()
optimizer = optim.AdamW(model.parameters(), lr=LEARNING_RATE, weight_decay=1e-4)

# Decay learning rate by 0.5 every 5 epochs
scheduler = optim.lr_scheduler.StepLR(optimizer, step_size=5, gamma=0.5)


# ============================================================
# 5. TRAINING & VALIDATION LOOP
# ============================================================

best_val_acc = 0.0
MODEL_OUTPUT.parent.mkdir(parents=True, exist_ok=True)

print("Starting Model Training...\n" + "=" * 60)

for epoch in range(EPOCHS):
    # Training Phase
    model.train()
    running_loss, correct, total = 0.0, 0, 0

    for images, labels in train_loader:
        images, labels = images.to(DEVICE), labels.to(DEVICE)

        optimizer.zero_grad()
        outputs = model(images)
        loss = criterion(outputs, labels)
        loss.backward()
        optimizer.step()

        running_loss += loss.item()
        _, predicted = torch.max(outputs, 1)
        total += labels.size(0)
        correct += (predicted == labels).sum().item()

    train_accuracy = 100 * correct / total
    avg_train_loss = running_loss / len(train_loader)

    # Validation Phase
    model.eval()
    val_correct, val_total, val_running_loss = 0, 0, 0.0

    with torch.no_grad():
        for images, labels in val_loader:
            images, labels = images.to(DEVICE), labels.to(DEVICE)
            outputs = model(images)
            loss = criterion(outputs, labels)

            val_running_loss += loss.item()
            _, predicted = torch.max(outputs, 1)
            val_total += labels.size(0)
            val_correct += (predicted == labels).sum().item()

    val_accuracy = 100 * val_correct / val_total
    avg_val_loss = val_running_loss / len(val_loader)

    # Step learning rate scheduler
    scheduler.step()

    # Save best performing checkpoint
    saved_flag = ""
    if val_accuracy > best_val_acc:
        best_val_acc = val_accuracy
        torch.save(model.state_dict(), MODEL_OUTPUT)
        saved_flag = " --> [BEST MODEL SAVED]"

    print(
        f"Epoch {epoch + 1:02d}/{EPOCHS} | "
        f"Train Loss: {avg_train_loss:.4f} | Train Acc: {train_accuracy:.2f}% | "
        f"Val Loss: {avg_val_loss:.4f} | Val Acc: {val_accuracy:.2f}%"
        f"{saved_flag}"
    )


# ============================================================
# 6. FINAL TEST EVALUATION
# ============================================================

print("=" * 60)
print(f"Training Complete. Best Validation Accuracy: {best_val_acc:.2f}%")
print("Evaluating Best Model Weights on Test Split...\n")

# Load best checkpoint for test evaluation
model.load_state_dict(torch.load(MODEL_OUTPUT))
model.eval()

test_correct, test_total = 0, 0
with torch.no_grad():
    for images, labels in test_loader:
        images, labels = images.to(DEVICE), labels.to(DEVICE)
        outputs = model(images)
        _, predicted = torch.max(outputs, 1)
        test_total += labels.size(0)
        test_correct += (predicted == labels).sum().item()

test_accuracy = 100 * test_correct / test_total
print(f"FINAL TEST ACCURACY: {test_accuracy:.2f}%")
print(f"Model saved to: {MODEL_OUTPUT.resolve()}\n")