import os
from pathlib import Path

# Path to your dataset root (adjust if your folder structure differs)
DATASET_PATH = Path("ai/dataset/train")

def analyze_dataset(data_dir: Path):
    if not data_dir.exists():
        print(f"Error: Path '{data_dir}' does not exist.")
        return

    print("=" * 55)
    print("           DATASET DISTRIBUTION ANALYSIS          ")
    print("=" * 55)

    class_counts = {}
    for item in os.listdir(data_dir):
        item_path = data_dir / item
        if item_path.is_dir():
            # Count image files inside the directory
            images = [f for f in os.listdir(item_path) if f.lower().endswith(('.png', '.jpg', '.jpeg', '.webp'))]
            class_counts[item] = len(images)

    if not class_counts:
        print("No image folders found!")
        return

    total_images = sum(class_counts.values())
    max_count = max(class_counts.values())

    print(f"{'Class Name':<22} | {'Count':<8} | {'Percentage':<10} | {'Imbalance Ratio':<15}")
    print("-" * 65)

    for class_name, count in sorted(class_counts.items(), key=lambda x: x[1], reverse=True):
        pct = (count / total_images) * 100
        ratio = max_count / count if count > 0 else 0
        print(f"{class_name:<22} | {count:<8} | {pct:>8.2f}% | {ratio:>12.2f}x smaller")

    print("-" * 65)
    print(f"Total Images: {total_images}")
    print("=" * 65)

    # Key dataset health flags
    print("\n--- DIAGNOSTIC SUMMARY ---")
    if class_counts.get('TV_MONITOR', 0) < 500:
        print("CRITICAL: 'TV_MONITOR' is severely underrepresented (< 500 images). This explains CRT misclassification.")
    if class_counts.get('NOT_SURE', 0) < 500:
        print("WARNING: 'NOT_SURE' (negative class) is too small to handle out-of-distribution scrap items.")

if __name__ == "__main__":
    analyze_dataset(DATASET_PATH)