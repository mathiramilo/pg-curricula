from fastapi import APIRouter, UploadFile, File, HTTPException

from app.services import escolaridades

router = APIRouter()

@router.post("/procesar-escolaridad")
def procesar_escolaridad(file: UploadFile = File(...)):
		if not file.filename.endswith(".pdf"):
			raise HTTPException(status_code=400, detail="Solo se permiten archivos PDF")
		
		try:
			return escolaridades.get_student_data(file)
		except Exception as e:
			raise HTTPException(status_code=500, detail=str(e))
