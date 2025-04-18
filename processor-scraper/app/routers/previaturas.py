import json
from pathlib import Path

from fastapi import APIRouter, HTTPException

router = APIRouter()


@router.get("/")
def get_unidades_curriculares():
    try:
        data_dir = Path(__file__).resolve().parents[2] / "data"
        previatures_file = data_dir / "previatures.json"

        with previatures_file.open("r", encoding="utf-8") as f:
            previatures = json.load(f)

        return previatures
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
