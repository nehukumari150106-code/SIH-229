from pathlib import Path
import random
import shutil
from PIL import Image


# ============================================================
# 1. PATHS
# ============================================================

REPO = Path(r"C:\Users\sandi\C Tutorials\New folder\VS CODE FILES\SIH-229")

ROBOFLOW = Path(
    r"C:\Users\sandi\Downloads\E-Waste Dataset.v1i.yolov8"
)

LAPTOP = Path(
    r"C:\Users\sandi\Downloads\Laptop Components Image Dataset to Classify Different Components"
    r"\Laptop Components Image Dataset to Classify Different Components"
    r"\Raw Data\Raw Data"
)

PLASTIC = Path(
    r"C:\Users\sandi\Downloads\archive\standardized_384\plastic"
)

# Directory containing non-electronic background images (cardboard, shoes, bottles, etc.)
NON_EWASTE_PATH = Path(
    r"C:\Users\sandi\C Tutorials\New folder\VS CODE FILES\SIH-229\data\non_ewaste_dataset"
)
OUTPUT = REPO / "ai" / "dataset"


# ============================================================
# 2. TARGET CLASSES & ROBOFLOW ID MAPPINGS
# ============================================================

CLASSES = [
    "CABLE_WIRE",          # Index 0
    "COMPUTER_LAPTOP",     # Index 1
    "FRIDGE_AC",           # Index 2
    "MOBILE_TABLET",       # Index 3
    "NOT_SURE",            # Index 4
    "OTHER_ELECTRONICS",   # Index 5
    "TV_MONITOR",          # Index 6
    "WASHING_APPLIANCE"    # Index 7           
]

# Roboflow class IDs directly mapped to target categories
ROBOFLOW_CLASSES = {
    # TV_MONITOR
    5: "TV_MONITOR", 6: "TV_MONITOR", 29: "TV_MONITOR", 30: "TV_MONITOR",
    
    # COMPUTER_LAPTOP
    14: "COMPUTER_LAPTOP", 15: "COMPUTER_LAPTOP", 19: "COMPUTER_LAPTOP", 
    38: "COMPUTER_LAPTOP", 50: "COMPUTER_LAPTOP", 56: "COMPUTER_LAPTOP", 58: "COMPUTER_LAPTOP",
    
    # MOBILE_TABLET
    1: "MOBILE_TABLET", 60: "MOBILE_TABLET", 69: "MOBILE_TABLET",
    
    # FRIDGE_AC (Added additional UNU-Key IDs for fridges/coolers)
    0: "FRIDGE_AC", 3: "FRIDGE_AC", 4: "FRIDGE_AC", 32: "FRIDGE_AC",
    
    # WASHING_APPLIANCE
    11: "WASHING_APPLIANCE", 12: "WASHING_APPLIANCE", 34: "WASHING_APPLIANCE", 
    44: "WASHING_APPLIANCE", 71: "WASHING_APPLIANCE", 72: "WASHING_APPLIANCE", 
    74: "WASHING_APPLIANCE", 75: "WASHING_APPLIANCE",
    
    # CABLE_WIRE (Added wiring/cable class extensions)
    10: "CABLE_WIRE", 48: "CABLE_WIRE", 49: "CABLE_WIRE",
    
    # OTHER_ELECTRONICS
    2: "OTHER_ELECTRONICS", 7: "OTHER_ELECTRONICS", 8: "OTHER_ELECTRONICS", 
    20: "OTHER_ELECTRONICS", 22: "OTHER_ELECTRONICS", 24: "OTHER_ELECTRONICS", 
    26: "OTHER_ELECTRONICS", 28: "OTHER_ELECTRONICS", 36: "OTHER_ELECTRONICS", 
    40: "OTHER_ELECTRONICS", 42: "OTHER_ELECTRONICS", 45: "OTHER_ELECTRONICS", 
    51: "OTHER_ELECTRONICS", 59: "OTHER_ELECTRONICS", 61: "OTHER_ELECTRONICS", 
    62: "OTHER_ELECTRONICS", 63: "OTHER_ELECTRONICS", 67: "OTHER_ELECTRONICS", 
    68: "OTHER_ELECTRONICS", 73: "OTHER_ELECTRONICS", 76: "OTHER_ELECTRONICS"
}
# ============================================================
# 3. SETTINGS
# ============================================================

random.seed(42)

TRAIN_RATIO = 0.70
VAL_RATIO = 0.20
TEST_RATIO = 0.10

IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".bmp", ".webp"}


# ============================================================
# 4. CREATE OUTPUT FOLDERS
# ============================================================

if OUTPUT.exists():
    print("Removing previous generated dataset...")
    shutil.rmtree(OUTPUT)

for split in ["train", "val", "test"]:
    for class_name in CLASSES:
        (OUTPUT / split / class_name).mkdir(
            parents=True,
            exist_ok=True
        )


# ============================================================
# 5. HELPER FUNCTIONS
# ============================================================

def get_images(folder):
    if not folder.exists():
        return []

    return [
        p for p in folder.rglob("*")
        if p.is_file() and p.suffix.lower() in IMAGE_EXTENSIONS
    ]


def split_items(items):
    random.shuffle(items)

    total = len(items)

    train_end = int(total * TRAIN_RATIO)
    val_end = train_end + int(total * VAL_RATIO)

    return (
        items[:train_end],
        items[train_end:val_end],
        items[val_end:]
    )


def copy_split(items, class_name, prefix, max_items=None):
    items = list(items)

    # Limit oversized classes before splitting
    if max_items is not None and len(items) > max_items:
        random.shuffle(items)
        items = items[:max_items]

    train, val, test = split_items(items)

    for index, source in enumerate(train):
        destination = (
            OUTPUT / "train" / class_name /
            f"{prefix}_{index:05d}{source.suffix.lower()}"
        )
        shutil.copy2(source, destination)

    for index, source in enumerate(val):
        destination = (
            OUTPUT / "val" / class_name /
            f"{prefix}_{index:05d}{source.suffix.lower()}"
        )
        shutil.copy2(source, destination)

    for index, source in enumerate(test):
        destination = (
            OUTPUT / "test" / class_name /
            f"{prefix}_{index:05d}{source.suffix.lower()}"
        )
        shutil.copy2(source, destination)

    print(
        f"{class_name} ({prefix}): "
        f"{len(train)} train, "
        f"{len(val)} val, "
        f"{len(test)} test"
    )


def crop_yolo_image(image_path, label_path, class_name, counter):
    results = []

    try:
        image = Image.open(image_path).convert("RGB")
    except Exception:
        print(f"Could not open: {image_path}")
        return results

    width, height = image.size

    if not label_path.exists():
        return results

    try:
        lines = label_path.read_text().splitlines()
    except Exception:
        return results

    object_number = 0

    for line in lines:
        parts = line.split()

        if len(parts) != 5:
            continue

        try:
            class_id = int(parts[0])
            x_center = float(parts[1])
            y_center = float(parts[2])
            box_width = float(parts[3])
            box_height = float(parts[4])
        except ValueError:
            continue

        if class_id not in ROBOFLOW_CLASSES:
            continue

        target = ROBOFLOW_CLASSES[class_id]

        if target != class_name:
            continue

        x1 = int((x_center - box_width / 2) * width)
        y1 = int((y_center - box_height / 2) * height)
        x2 = int((x_center + box_width / 2) * width)
        y2 = int((y_center + box_height / 2) * height)

        x1 = max(0, x1)
        y1 = max(0, y1)
        x2 = min(width, x2)
        y2 = min(height, y2)

        if x2 <= x1 or y2 <= y1:
            continue

        crop = image.crop((x1, y1, x2, y2))

        output_path = (
            OUTPUT
            / "TEMP"
            / class_name
            / f"{counter:06d}_{object_number}.jpg"
        )

        output_path.parent.mkdir(parents=True, exist_ok=True)

        crop.save(output_path, quality=95)

        results.append(output_path)

        object_number += 1

    return results


# ============================================================
# 6. PROCESS ROBOFLOW DATASET
# ============================================================

print("\nProcessing Roboflow dataset...")

roboflow_target_classes = [
    "TV_MONITOR",
    "COMPUTER_LAPTOP",
    "MOBILE_TABLET",
    "FRIDGE_AC",
    "WASHING_APPLIANCE",
    "CABLE_WIRE",
    "OTHER_ELECTRONICS"
]

roboflow_crops = {
    class_name: []
    for class_name in roboflow_target_classes
}

counter = 0

for split in ["train", "valid", "test"]:

    image_dir = ROBOFLOW / split / "images"
    label_dir = ROBOFLOW / split / "labels"

    images = get_images(image_dir)

    print(f"{split}: {len(images)} images found")

    for image_path in images:

        label_path = label_dir / f"{image_path.stem}.txt"

        for class_name in roboflow_target_classes:
            crops = crop_yolo_image(
                image_path,
                label_path,
                class_name,
                counter
            )

            roboflow_crops[class_name].extend(crops)

        counter += 1


# ============================================================
# 7. COPY ROBOFLOW CROPS INTO FINAL DATASET
# ============================================================

print("\nAdding Roboflow crops...")

for class_name in roboflow_target_classes:
    if class_name == "OTHER_ELECTRONICS":
        copy_split(
            roboflow_crops[class_name],
            class_name,
            "roboflow",
            max_items=800
        )
    else:
        copy_split(
            roboflow_crops[class_name],
            class_name,
            "roboflow"
        )


# ============================================================
# 8. LAPTOP COMPONENTS
# ============================================================

print("\nProcessing Laptop Components...")

dccable_images = get_images(LAPTOP / "6. DCCable")
lcd_images = get_images(LAPTOP / "16. LCDScreen")
lvds_images = get_images(LAPTOP / "26. LVDSCable")

copy_split(
    dccable_images + lvds_images,
    "CABLE_WIRE",
    "laptop_cable"
)

copy_split(
    lcd_images,
    "TV_MONITOR",
    "laptop_lcd"
)


# ============================================================
# 9. NON-EWASTE / NOT_SURE DATASET
# ============================================================

print("\nProcessing Non-E-Waste images for NOT_SURE...")

non_ewaste_images = get_images(NON_EWASTE_PATH)

if non_ewaste_images:
    copy_split(
        non_ewaste_images,
        "NOT_SURE",
        "non_ewaste",
        max_items=600
    )
else:
    print(f"WARNING: No non-e-waste images found at path {NON_EWASTE_PATH}. Please populate this path.")


# ============================================================
# 10. CLEAN TEMPORARY FILES
# ============================================================

temp_folder = OUTPUT / "TEMP"

if temp_folder.exists():
    shutil.rmtree(temp_folder)


# ============================================================
# 11. FINAL COUNTS
# ============================================================

print("\n===================================")
print("FINAL DATASET")
print("===================================")

for split in ["train", "val", "test"]:

    print(f"\n{split.upper()}")

    for class_name in CLASSES:

        folder = OUTPUT / split / class_name

        count = len(get_images(folder))

        print(f"{class_name:20} {count}")

print("\nDataset creation complete.")
print(f"Location: {OUTPUT}")