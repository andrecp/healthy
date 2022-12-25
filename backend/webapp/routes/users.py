from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

router = APIRouter()

from ..schemas import UserCreate, User
from ..repo import create_user, get_user_by_email
from ..dependencies import get_db


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
