from pathlib import Path
import random
import shutil
from PIL import Image


# ============================================================
# 1. PATHS
# ============================================================

REPO = Path(r"C:\Users\sandi\C Tutorials\New folder\VS CODE FILES\SIH-229")

ROBOFLOW = Path(
    r"C:\Users\sandi\Downloads\E-Waste Dataset.v44-fix-annotations-of-some-bar-phones-incorrectly-labelled-as-smartphones.yolov8"
)

LAPTOP = Path(
    r"C:\Users\sandi\Downloads\Laptop Components Image Dataset to Classify Different Components"
    r"\Laptop Components Image Dataset to Classify Different Components"
    r"\Raw Data\Raw Data"
)

PLASTIC = Path(
    r"C:\Users\sandi\Downloads\archive\standardized_384\plastic"
)

OUTPUT = REPO / "ai" / "dataset"


# ============================================================
# 2. TARGET CLASSES
# ============================================================

CLASSES = [
    "PCB",
    "Cable",
    "Battery",
    "CRT",
    "LCD",
    "Mixed_Plastic",
    "Other",
]


# Roboflow class IDs from data.yml
ROBOFLOW_CLASSES = {
    2: "Battery",

    5: "CRT",
    6: "CRT",

    29: "LCD",
    30: "LCD",

    45: "PCB",
}


# Miscellaneous Roboflow classes used for Other
OTHER_IDS = {
    0,   # Air-Conditioner
    1,   # Bar-Phone
    7,   # Calculator
    8,   # Camera
    11,  # Clothes-Iron
    12,  # Coffee-Machine
    14,  # Computer-Keyboard
    15,  # Computer-Mouse
    19,  # Desktop-PC
    20,  # Digital-Oscilloscope
    22,  # Drone
    24,  # Electric-Guitar
    26,  # Electronic-Keyboard
    28,  # Flashlight
    32,  # Freezer
    34,  # Hair-Dryer
    36,  # Headphone
    38,  # Laptop
    40,  # Music-Player
    42,  # Network-Switch
    44,  # Oven
    49,  # Power-Adapter
    50,  # Printer
    51,  # Projector
    56,  # Router
    58,  # Server
    59,  # Smart-Watch
    60,  # Smartphone
    61,  # Smoke-Detector
    62,  # Soldering-Iron
    63,  # Speaker
    67,  # TV-Remote-Control
    68,  # Table-Lamp
    69,  # Tablet
    71,  # Toaster
    72,  # Tumble-Dryer
    73,  # USB-Flash-Drive
    74,  # Vacuum-Cleaner
    75,  # Washing-Machine
    76,  # Xbox-Series-X
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


def copy_split(items, class_name, prefix):
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
        f"{class_name}: "
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

        if class_id not in ROBOFLOW_CLASSES and class_id not in OTHER_IDS:
            continue

        if class_id in ROBOFLOW_CLASSES:
            target = ROBOFLOW_CLASSES[class_id]
        else:
            target = "Other"

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
# 6. PROCESS ROBOFLOW
# ============================================================

print("\nProcessing Roboflow dataset...")

roboflow_crops = {
    class_name: []
    for class_name in CLASSES
}

counter = 0

for split in ["train", "valid", "test"]:

    image_dir = ROBOFLOW / split / "images"
    label_dir = ROBOFLOW / split / "labels"

    images = get_images(image_dir)

    print(f"{split}: {len(images)} images found")

    for image_path in images:

        label_path = label_dir / f"{image_path.stem}.txt"

        for class_name in [
            "PCB",
            "Battery",
            "CRT",
            "LCD",
            "Other",
        ]:
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

for class_name in [
    "PCB",
    "Battery",
    "CRT",
    "LCD",
    "Other",
]:

    copy_split(
        roboflow_crops[class_name],
        class_name,
        "roboflow"
    )


# ============================================================
# 8. LAPTOP COMPONENTS
# ============================================================

print("\nProcessing Laptop Components...")

battery_images = get_images(LAPTOP / "1. Battery")
dccable_images = get_images(LAPTOP / "6. DCCable")
lcd_images = get_images(LAPTOP / "16. LCDScreen")
lvds_images = get_images(LAPTOP / "26. LVDSCable")

copy_split(
    battery_images,
    "Battery",
    "laptop_battery"
)

copy_split(
    dccable_images + lvds_images,
    "Cable",
    "laptop_cable"
)

copy_split(
    lcd_images,
    "LCD",
    "laptop_lcd"
)


# ============================================================
# 9. MIXED PLASTIC
# ============================================================

print("\nProcessing plastic dataset...")

plastic_images = get_images(PLASTIC)

copy_split(
    plastic_images,
    "Mixed_Plastic",
    "plastic"
)


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

        print(f"{class_name:15} {count}")

print("\nDataset creation complete.")
print(f"Location: {OUTPUT}")