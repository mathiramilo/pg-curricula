import json
from pathlib import Path

from fastapi import APIRouter, HTTPException

router = APIRouter()


@router.get("/")
def get_unidades_curriculares():
    try:
        data_dir = Path(__file__).resolve().parents[2] / "data"
        subjects_file = data_dir / "subjects.json"

        with subjects_file.open("r", encoding="utf-8") as f:
            subjects = json.load(f)

        return subjects
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
