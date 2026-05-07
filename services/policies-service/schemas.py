from pydantic import BaseModel

class PolicyBase(BaseModel):
    user_id: int
    pet_name: str
    plan_type: str
    premium: float

class PolicyCreate(PolicyBase):
    pass

class Policy(PolicyBase):
    id: int

    class Config:
        from_attributes = True
