import os
import torch
import torch.nn as nn
import torch.optim as optim
from torchvision import datasets, models, transforms
from torch.utils.data import DataLoader
from pathlib import Path

def main():
    # ==========================================
    # 1. CONFIGURATION & PATHS
    # ==========================================
    TRAIN_DIR = Path("ai/dataset/train")
    VAL_DIR = Path("ai/dataset/val")
    MODEL_SAVE_PATH = Path("ai/models/mobilenet_v3_e_waste.pth")

    BATCH_SIZE = 32
    NUM_EPOCHS = 15
    LEARNING_RATE = 0.0003
    NUM_CLASSES = 8

    os.makedirs("ai/models", exist_ok=True)
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    print(f"[+] Running training on device: {device}")

    # ==========================================
    # 2. DATA AUGMENTATION & LOADERS
    # ==========================================
    train_transforms = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.RandomHorizontalFlip(),
        transforms.RandomRotation(15),
        transforms.ColorJitter(brightness=0.2, contrast=0.2),
        transforms.ToTensor(),
        transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
    ])

    val_transforms = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
    ])

    train_dataset = datasets.ImageFolder(root=str(TRAIN_DIR), transform=train_transforms)
    val_dataset = datasets.ImageFolder(root=str(VAL_DIR), transform=val_transforms)

    # Set num_workers=0 to completely prevent Windows multiprocessing crashes on CPU
    train_loader = DataLoader(train_dataset, batch_size=BATCH_SIZE, shuffle=True, num_workers=0)
    val_loader = DataLoader(val_dataset, batch_size=BATCH_SIZE, shuffle=False, num_workers=0)

    print(f"[+] Classes detected ({len(train_dataset.classes)}): {train_dataset.classes}")

    # ==========================================
    # 3. DYNAMIC INVERSE CLASS WEIGHTS
    # ==========================================
    class_counts = []
    for cls_name in train_dataset.classes:
        cls_path = TRAIN_DIR / cls_name
        count = len(list(cls_path.glob("*.*"))) if cls_path.exists() else 1
        class_counts.append(count)

    total_samples = sum(class_counts)
    class_weights = [total_samples / c for c in class_counts]
    weights_tensor = torch.FloatTensor(class_weights).to(device)

    print(f"[+] Computed Class Weights: {[round(w, 2) for w in class_weights]}")

    # ==========================================
    # 4. MODEL INITIALIZATION & LOSS
    # ==========================================
    model = models.mobilenet_v3_small(weights=models.MobileNet_V3_Small_Weights.DEFAULT)
    model.classifier[3] = nn.Linear(model.classifier[3].in_features, NUM_CLASSES)
    model = model.to(device)

    criterion = nn.CrossEntropyLoss(weight=weights_tensor)
    optimizer = optim.AdamW(model.parameters(), lr=LEARNING_RATE, weight_decay=1e-4)

    # ==========================================
    # 5. TRAINING LOOP
    # ==========================================
    best_val_acc = 0.0

    for epoch in range(NUM_EPOCHS):
        print(f"\n--- Epoch {epoch+1}/{NUM_EPOCHS} ---")
        
        # --- Training Phase ---
        model.train()
        running_loss = 0.0
        correct = 0
        total = 0
        
        for inputs, labels in train_loader:
            inputs, labels = inputs.to(device), labels.to(device)
            
            optimizer.zero_grad()
            outputs = model(inputs)
            loss = criterion(outputs, labels)
            loss.backward()
            optimizer.step()
            
            running_loss += loss.item() * inputs.size(0)
            _, preds = torch.max(outputs, 1)
            correct += torch.sum(preds == labels.data)
            total += labels.size(0)
            
        train_loss = running_loss / total
        train_acc = correct.double() / total
        print(f"Train Loss: {train_loss:.4f} | Train Acc: {train_acc:.4f}")
        
        # --- Validation Phase ---
        model.eval()
        val_loss = 0.0
        val_correct = 0
        val_total = 0
        
        with torch.no_grad():
            for inputs, labels in val_loader:
                inputs, labels = inputs.to(device), labels.to(device)
                outputs = model(inputs)
                loss = criterion(outputs, labels)
                
                val_loss += loss.item() * inputs.size(0)
                _, preds = torch.max(outputs, 1)
                val_correct += torch.sum(preds == labels.data)
                val_total += labels.size(0)
                
        epoch_val_loss = val_loss / val_total
        epoch_val_acc = val_correct.double() / val_total
        print(f"Val Loss:   {epoch_val_loss:.4f} | Val Acc:   {epoch_val_acc:.4f}")
        
        # Save best model checkpoint
        if epoch_val_acc > best_val_acc:
            best_val_acc = epoch_val_acc
            torch.save(model.state_dict(), MODEL_SAVE_PATH)
            print(f" [✓] Best model saved to {MODEL_SAVE_PATH} (Acc: {best_val_acc:.4f})")

    print(f"\n[✓] Training complete! Highest Validation Accuracy: {best_val_acc:.4f}")

if __name__ == '__main__':
    main()