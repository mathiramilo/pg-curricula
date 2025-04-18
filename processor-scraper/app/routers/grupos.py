import json
from pathlib import Path

from fastapi import APIRouter, HTTPException

router = APIRouter()


@router.get("/")
def get_grupos_padre():
    try:
        data_dir = Path(__file__).resolve().parents[2] / "data"
        parent_groups_file = data_dir / "parent_groups.json"
        child_groups_file = data_dir / "child_groups.json"

        with parent_groups_file.open("r", encoding="utf-8") as f:
            parent_groups = json.load(f)

        with child_groups_file.open("r", encoding="utf-8") as f:
            child_groups = json.load(f)

        return {"parent_groups": parent_groups, "child_groups": child_groups}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
