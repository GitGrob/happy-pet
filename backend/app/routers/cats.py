from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.dependencies import get_db
from app.schemas.cat import CatCreate
from app.services.cat import create_cat

router = APIRouter(prefix="/cats", tags=["cats"])

@router.post("/", response_model=CatCreate)
def create_new_cat(cat: CatCreate, db: Session = Depends(get_db)):
    return create_cat(db, cat)
