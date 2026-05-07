from sqlalchemy import Column, Integer, String, Float
from database import Base

class Policy(Base):
    __tablename__ = "policies"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, index=True)
    pet_name = Column(String, index=True)
    plan_type = Column(String)
    premium = Column(Float)
