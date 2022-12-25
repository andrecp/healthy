import logging
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..schemas import UserCreate, User, WeightCreate, Weight, Weights
from ..repo import (
    create_user,
    get_user_by_email,
    get_user,
    add_weight_event_to_user,
    get_weights_for_user,
)
from ..dependencies import get_db

logger = logging.getLogger(__name__)

router = APIRouter()


@router.post("/signup", response_model=User)
async def signup(payload: UserCreate, db: Session = Depends(get_db)):
    db_user = create_user(db, payload)
    if db_user is None:
        raise HTTPException(status_code=400, detail="User already exists")

    return db_user


@router.post("/login", response_model=User)
async def login(payload: UserCreate, db: Session = Depends(get_db)):
    db_user = get_user_by_email(db, payload.email)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User does not exist")

    if not db_user.check_password(payload.password):
        raise HTTPException(status_code=400, detail="Invalid email or password")

    return db_user


@router.post("/{user_id}/weights", response_model=Weight, tags=["weight"])
async def add_weight(
    user_id: str, payload: WeightCreate, db: Session = Depends(get_db)
):
    db_user = get_user(db, user_id)
    if db_user is None:
        raise HTTPException(status_code=400, detail="User doesn't exist")

    db_weight = add_weight_event_to_user(db, db_user, payload)
    return db_weight


@router.get("/{user_id}/weights", response_model=Weights, tags=["weight"])
async def get_weights(user_id: str, db: Session = Depends(get_db)):
    db_user = get_user(db, user_id)
    if db_user is None:
        raise HTTPException(status_code=400, detail="User doesn't exist")

    weights = get_weights_for_user(db, db_user)
    return {"weights": weights}
