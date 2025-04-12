from app.services import scraper
from fastapi import APIRouter, HTTPException

router = APIRouter()


@router.post("/grupos-y-unidades-curriculares")
def scrape_grupos_y_unidades_curriculares():
    try:
        parent_groups, child_groups, subjects = scraper.scrape_groups_and_subjects()

        return {
            "parent_groups": parent_groups,
            "child_groups": child_groups,
            "subjects": subjects,
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/previaturas")
def scrape_previaturas():
    try:
        previaturas = scraper.scrape_previatures()

        return previaturas
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
