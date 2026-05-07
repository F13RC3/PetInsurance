from pydantic import BaseModel

class PolicyBase(BaseModel):
    user_id: int
    pet_name: str
    pet_age: int
    pet_breed: str
    plan_type: str
    premium: float

class PolicyCreate(PolicyBase):
    pass

class Policy(PolicyBase):
    id: int

    class Config:
        from_attributes = True

class QuoteRequest(BaseModel):
    pet_age: int
    pet_breed: str
    plan_type: str

class QuoteResponse(BaseModel):
    premium: float
