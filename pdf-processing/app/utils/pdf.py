from fastapi import File
import PyPDF2


def read(file: File) -> str:
    pdf_text = ""

    reader = PyPDF2.PdfReader(file.file)
    total_pages = len(reader.pages)

    for page_number in range(total_pages):
        page = reader.pages[page_number]
        page_text = page.extract_text()
        pdf_text += page_text

    return pdf_text
