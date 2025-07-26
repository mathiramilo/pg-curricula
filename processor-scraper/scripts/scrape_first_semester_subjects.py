import json
import os

from app.services.scraper import scrape_current_subjects
from app.utils.print import print_success


def main():
    first_semester_subjects = scrape_current_subjects()

    if not first_semester_subjects or len(first_semester_subjects) == 0:
        return

    output_path = os.path.join("data", "first_semester_subjects.json")
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(
            first_semester_subjects,
            f,
            default=lambda o: o.model_dump() if hasattr(o, "model_dump") else o,
            indent=4,
            ensure_ascii=False,
        )
    print_success(f"First semester subjects saved to {output_path}")


if __name__ == "__main__":
    main()
