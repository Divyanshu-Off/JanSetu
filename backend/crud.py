from sqlalchemy.orm import Session
import models
import schemas

def create_issue(db: Session, issue: schemas.IssueCreate, image_path: str):
    db_issue = models.Issue(
        description=issue.description,
        latitude=issue.latitude,
        longitude=issue.longitude,
        image_path=image_path
    )
    db.add(db_issue)
    db.commit()
    db.refresh(db_issue)
    return db_issue

def get_issues(db: Session):
    return db.query(models.Issue).all()
