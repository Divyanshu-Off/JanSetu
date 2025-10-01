from pydantic import BaseModel

class IssueBase(BaseModel):
    description: str
    latitude: float
    longitude: float

class IssueCreate(IssueBase):
    pass

class IssueResponse(IssueBase):
    id: int
    image_path: str | None
    status: str

    class Config:
        orm_mode = True
