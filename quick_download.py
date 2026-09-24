from bing_image_downloader import downloader

# Correct path: data/train/
DOWNLOAD_CONFIG = [
    ("old CRT monitor bulky", "data/train/TV_MONITOR", 400),
    ("shredded plastic scrap waste", "data/train/NOT_SURE", 300),
    ("metal scrap pile junk", "data/train/NOT_SURE", 200),
    ("loose circuit board component scrap", "data/train/OTHER_ELECTRONICS", 300)
]

for query, target_path, count in DOWNLOAD_CONFIG:
    print(f"\n[+] Scraping {count} images for: '{query}' -> {target_path}")
    downloader.download(
        query,
        limit=count,
        output_dir=target_path,
        adult_filter_off=True,
        force_replace=False,
        timeout=30
    )

print("\n[✓] Downloads complete!")