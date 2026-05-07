from pydantic import BaseModel

class ClaimBase(BaseModel):
    policy_id: int
    amount: float
    status: str = "Pending"

class ClaimCreate(ClaimBase):
    pass

class Claim(ClaimBase):
    id: int

    class Config:
        from_attributes = True
