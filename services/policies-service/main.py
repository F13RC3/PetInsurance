from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

import models, schemas
from database import engine, get_db

# Create database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Policies Service")

@app.post("/quote", response_model=schemas.QuoteResponse)
def generate_quote(quote_req: schemas.QuoteRequest):
    # Base premium
    base = 20.0
    
    # Age factor
    if quote_req.pet_age > 8:
        base += 15.0
    elif quote_req.pet_age > 3:
        base += 5.0
        
    # Plan multiplier
    multiplier = 1.0
    if quote_req.plan_type.lower() == "comprehensive":
        multiplier = 2.0
    elif quote_req.plan_type.lower() == "accident only":
        multiplier = 0.8
        
    final_premium = round(base * multiplier, 2)
    return {"premium": final_premium}

@app.post("/", response_model=schemas.Policy)
def create_policy(policy: schemas.PolicyCreate, db: Session = Depends(get_db)):
    new_policy = models.Policy(**policy.model_dump())
    db.add(new_policy)
    db.commit()
    db.refresh(new_policy)
    return new_policy

@app.get("/", response_model=List[schemas.Policy])
def get_policies(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    policies = db.query(models.Policy).offset(skip).limit(limit).all()
    return policies

@app.get("/{policy_id}", response_model=schemas.Policy)
def get_policy(policy_id: int, db: Session = Depends(get_db)):
    policy = db.query(models.Policy).filter(models.Policy.id == policy_id).first()
    if not policy:
        raise HTTPException(status_code=404, detail="Policy not found")
    return policy

@app.get("/health")
def health_check():
    return {"status": "ok", "service": "policies-service"}
