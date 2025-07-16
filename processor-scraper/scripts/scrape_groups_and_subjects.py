import json
import os

from app.services.scraper import scrape_groups_and_subjects
from app.utils.print import print_success


def main():
    parent_groups, child_groups, subjects = scrape_groups_and_subjects()

    parent_groups_path = os.path.join("data", "parent_groups.json")
    with open(parent_groups_path, "w", encoding="utf-8") as f:
        json.dump(
            parent_groups,
            f,
            default=lambda o: o.model_dump() if hasattr(o, "model_dump") else o,
            indent=4,
            ensure_ascii=False,
        )
    print_success(f"Parent groups saved to {parent_groups_path}")

    child_groups_path = os.path.join("data", "child_groups.json")
    with open(child_groups_path, "w", encoding="utf-8") as f:
        json.dump(
            child_groups,
            f,
            default=lambda o: o.model_dump() if hasattr(o, "model_dump") else o,
            indent=4,
            ensure_ascii=False,
        )
    print_success(f"Child groups saved to {child_groups_path}")

    subjects_path = os.path.join("data", "subjects.json")
    with open(subjects_path, "w", encoding="utf-8") as f:
        json.dump(
            subjects,
            f,
            default=lambda o: o.model_dump() if hasattr(o, "model_dump") else o,
            indent=4,
            ensure_ascii=False,
        )
    print_success(f"Subjects saved to {subjects_path}")


if __name__ == "__main__":
    main()
