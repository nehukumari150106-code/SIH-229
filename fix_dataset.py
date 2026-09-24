import os
import shutil
from pathlib import Path
from bing_image_downloader import downloader

# Your confirmed training dataset root
DATASET_ROOT = Path("ai/dataset/train")

print(f"✓ Target dataset root: {DATASET_ROOT.resolve()}\n")

# 1. Scrape missing images directly into target folders
DOWNLOAD_CONFIG = [
    ("old CRT monitor bulky", DATASET_ROOT / "TV_MONITOR", 400),
    ("shredded plastic scrap waste", DATASET_ROOT / "NOT_SURE", 300),
    ("metal scrap pile junk", DATASET_ROOT / "NOT_SURE", 200),
    ("loose circuit board component scrap", DATASET_ROOT / "OTHER_ELECTRONICS", 300)
]

for query, target_path, count in DOWNLOAD_CONFIG:
    print(f"[+] Scraping {count} images for: '{query}' -> {target_path}")
    downloader.download(
        query,
        limit=count,
        output_dir=str(target_path),
        adult_filter_off=True,
        force_replace=False,
        timeout=30
    )

# 2. Flatten subfolders created by bing_image_downloader into class root folders
print("\n[+] Flattening downloaded subfolders...")
for cls_folder in DATASET_ROOT.iterdir():
    if cls_folder.is_dir():
        for item in list(cls_folder.iterdir()):
            if item.is_dir():
                for img in item.iterdir():
                    if img.is_file():
                        target_file = cls_folder / img.name
                        if target_file.exists():
                            target_file = cls_folder / f"dl_{img.name}"
                        shutil.move(str(img), str(target_file))
                shutil.rmtree(str(item))

print("\n[✓] Downloads and dataset reorganization complete!")