import os
from pathlib import Path
from icrawler.builtin import BingImageCrawler, GoogleImageCrawler

DATASET_ROOT = Path("ai/dataset/train")

targets = [
    ("old CRT TV monitor bulky", DATASET_ROOT / "TV_MONITOR", 400),
    ("shredded plastic scrap waste", DATASET_ROOT / "NOT_SURE", 300),
    ("metal scrap pile junk", DATASET_ROOT / "NOT_SURE", 200),
    ("loose circuit board component scrap", DATASET_ROOT / "OTHER_ELECTRONICS", 300)
]

for query, save_path, count in targets:
    os.makedirs(save_path, exist_ok=True)
    print(f"\n[+] Fetching {count} images for '{query}' -> {save_path}")
    
    # Try Bing Crawler first
    crawler = BingImageCrawler(
        downloader_threads=4,
        storage={'root_dir': str(save_path)}
    )
    crawler.crawl(keyword=query, max_num=count)

print("\n[✓] Fast download finished successfully!")