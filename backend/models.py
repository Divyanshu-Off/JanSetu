from sqlalchemy import Column, Integer, String, Float
from database import Base

class Issue(Base):
    __tablename__ = "issues"

    id = Column(Integer, primary_key=True, index=True)
    description = Column(String, nullable=False)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    image_path = Column(String, nullable=True)
    status = Column(String, default="Pending")
