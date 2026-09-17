"""Generate public, pixel-sanitised screenshots from ignored local originals.

Run from the repository root with Pillow available:
    python scripts/sanitize-media.py

The source captures remain under Assets/raw and are never copied to public.
Each box below covers only the sensitive text or point-in-time figure named
beside it; navigation, labels, charts, maps and controls remain untouched.
"""

from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]


def pixelate(image: Image.Image, box: tuple[int, int, int, int]) -> None:
    """Replace a box with a coarse, irreversible mosaic contained by the box."""

    crop = image.crop(box)
    width, height = crop.size
    reduced = crop.resize(
        (max(1, min(6, width // 16)), max(1, min(3, height // 12))),
        Image.Resampling.BOX,
    )
    image.paste(reduced.resize(crop.size, Image.Resampling.NEAREST), box)


CAPTURES = {
    "p001-terraldata-platform.webp": {
        "source": ROOT / "Assets/raw/TerralData/PortadaTerralData.png",
        "size": (2485, 1333),
        "boxes": [
            # Signed-in person.
            (2262, 20, 2292, 50),
            (2320, 20, 2434, 49),
            # General operational indicators and live service identifier.
            (519, 378, 593, 408),
            (748, 378, 798, 408),
            (518, 458, 578, 493),
            (714, 457, 792, 493),
            (505, 553, 747, 593),
            (948, 574, 1051, 599),
            (1095, 552, 1176, 596),
            # Current performance figures and snapshot date.
            (1878, 174, 1992, 198),
            (1886, 224, 1966, 255),
            (1878, 294, 1974, 326),
            (1882, 364, 1972, 396),
            (1882, 434, 1970, 467),
            # Station percentages, leaving station names and bars visible.
            (2288, 412, 2354, 436),
            (2268, 441, 2336, 465),
            (2247, 468, 2317, 492),
            (2228, 493, 2299, 517),
            (2210, 518, 2280, 542),
            (2192, 543, 2262, 567),
            (2176, 569, 2265, 593),
            (2161, 594, 2252, 640),
            # Consolidation date, time saving and chart summary.
            (1530, 596, 1662, 623),
            (1818, 586, 1911, 627),
            (951, 675, 1050, 701),
            # Passenger snapshots, update time and peak/valley values.
            (1238, 691, 1334, 712),
            (1188, 721, 1399, 783),
            (1418, 768, 1472, 794),
            (1348, 801, 1444, 824),
            (1172, 887, 1450, 936),
            (1315, 946, 1455, 972),
            (1553, 767, 1683, 806),
            (1560, 803, 1705, 848),
            (1553, 874, 1683, 911),
            (1558, 905, 1697, 953),
            # Profile snapshot date and daily average.
            (2280, 696, 2423, 719),
            (701, 1207, 784, 1232),
        ],
    },
    "p002-live-operations-display.webp": {
        "source": ROOT / "Assets/raw/PantallaLiveData.png",
        "size": (1920, 1021),
        "boxes": [
            # Point-in-time header values and service identifier.
            (806, 23, 852, 46),
            (442, 63, 522, 98),
            (1181, 46, 1249, 78),
            (1368, 46, 1451, 79),
            (1647, 14, 1903, 72),
            (1769, 78, 1905, 102),
            # Passenger indicators and comparisons.
            (222, 262, 493, 337),
            (548, 364, 616, 392),
            (697, 210, 827, 249),
            (699, 252, 764, 276),
            (985, 210, 1170, 249),
            (986, 252, 1057, 276),
            (696, 348, 899, 385),
            (983, 347, 1122, 385),
            (983, 389, 1101, 413),
            # Energy indicators; graph geometry and labels stay visible.
            (60, 530, 171, 563),
            (684, 531, 796, 563),
            (995, 642, 1098, 681),
            (890, 806, 1001, 840),
            (1076, 806, 1190, 840),
            (61, 803, 171, 837),
            (329, 803, 410, 837),
            (593, 788, 689, 821),
            (593, 820, 679, 847),
            (1197, 974, 1258, 1002),
            # Numeric train identifiers on the map; markers and map remain.
            (1356, 643, 1373, 660),
            (1485, 658, 1501, 675),
            (1504, 658, 1525, 675),
            (1645, 643, 1663, 660),
            (1668, 712, 1685, 729),
            (1716, 736, 1733, 753),
            (1604, 853, 1621, 871),
            (1588, 915, 1605, 933),
            (1756, 689, 1779, 707),
            (1768, 671, 1791, 689),
            (1803, 653, 1823, 671),
        ],
    },
}


def main() -> None:
    output = ROOT / "public/media"
    output.mkdir(parents=True, exist_ok=True)
    for filename, capture in CAPTURES.items():
        image = Image.open(capture["source"]).convert("RGB")
        if image.size != capture["size"]:
            raise ValueError(
                f"Unexpected source dimensions for {capture['source']}: {image.size}"
            )
        for box in capture["boxes"]:
            if not (
                0 <= box[0] < box[2] <= image.width
                and 0 <= box[1] < box[3] <= image.height
            ):
                raise ValueError(f"Out-of-bounds privacy box in {filename}: {box}")
            pixelate(image, box)
        destination = output / filename
        image.save(destination, "WEBP", quality=92, method=6)
        print(f"{destination.relative_to(ROOT)}: {image.width}x{image.height}")


if __name__ == "__main__":
    main()
