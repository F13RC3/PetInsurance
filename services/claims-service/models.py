from sqlalchemy import Column, Integer, String, Float
from database import Base

class Claim(Base):
    __tablename__ = "claims"

    id = Column(Integer, primary_key=True, index=True)
    policy_id = Column(Integer, index=True)
    amount = Column(Float)
    status = Column(String, default="Pending")
