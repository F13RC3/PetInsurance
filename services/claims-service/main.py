from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import requests

import models, schemas
from database import engine, get_db

# Create database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Claims Service")

POLICIES_SERVICE_URL = "http://policies-service:8000"

@app.post("/", response_model=schemas.Claim)
def create_claim(claim: schemas.ClaimCreate, db: Session = Depends(get_db)):
    # Verify policy exists via API call
    try:
        response = requests.get(f"{POLICIES_SERVICE_URL}/{claim.policy_id}")
        if response.status_code != 200:
            raise HTTPException(status_code=400, detail="Invalid Policy ID or Policy does not exist")
    except requests.RequestException:
        raise HTTPException(status_code=503, detail="Could not reach Policies Service to verify policy")

    new_claim = models.Claim(**claim.model_dump())
    db.add(new_claim)
    db.commit()
    db.refresh(new_claim)
    return new_claim

@app.get("/", response_model=List[schemas.Claim])
def get_claims(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    claims = db.query(models.Claim).offset(skip).limit(limit).all()
    return claims

@app.get("/health")
def health_check():
    return {"status": "ok", "service": "claims-service"}
