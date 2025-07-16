import json
import os

from app.services.scraper import scrape_previatures
from app.utils.print import print_success


def main():
    previatures = scrape_previatures()

    output_path = os.path.join("data", "previatures.json")
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(
            previatures,
            f,
            default=lambda o: o.model_dump() if hasattr(o, "model_dump") else o,
            indent=4,
            ensure_ascii=False,
        )
    print_success(f"Previatures saved to {output_path}")


if __name__ == "__main__":
    main()
