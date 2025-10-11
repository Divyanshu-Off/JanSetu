from fastapi import FastAPI, Depends, UploadFile, File, Form
from sqlalchemy.orm import Session
import models
import schemas
import crud
from database import engine, SessionLocal
import shutil
import os

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/issues/", response_model=schemas.IssueResponse)
async def create_issue(
    description: str = Form(...),
    latitude: float = Form(...),
    longitude: float = Form(...),
    image: UploadFile = File(None),
    db: Session = Depends(get_db)
):
    image_path = None
    if image:
        file_location = f"{UPLOAD_DIR}/{image.filename}"
        with open(file_location, "wb") as buffer:
            shutil.copyfileobj(image.file, buffer)
        image_path = file_location

    return crud.create_issue(db, schemas.IssueCreate(
        description=description,
        latitude=latitude,
        longitude=longitude
    ), image_path)

@app.get("/issues/{issue_id}", response_model=schemas.IssueResponse)
def get_issue(issue_id: int, db: Session = Depends(get_db)):
    return crud.get_issue(db, issue_id)
