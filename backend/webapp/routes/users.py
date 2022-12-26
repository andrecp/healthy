import json
import logging
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..schemas import UserCreate, AuthToken
from ..repo import (
    create_user,
    get_user_by_email,
)
from ..dependencies import get_db, get_user_from_refresh_token
from ..jwt import create_access_token, create_refresh_token

logger = logging.getLogger(__name__)

router = APIRouter()


@router.post("/signup", response_model=AuthToken)
async def signup(payload: UserCreate, db: Session = Depends(get_db)):
    db_user = create_user(db, payload)
    if db_user is None:
        raise HTTPException(status_code=400, detail="User already exists")

    return {
        "access_token": create_access_token(
            json.dumps({"email": db_user.email, "id": db_user.id})
        ),
        "refresh_token": create_refresh_token(
            json.dumps({"email": db_user.email, "id": db_user.id})
        ),
    }


@router.post("/login", response_model=AuthToken)
async def login(payload: UserCreate, db: Session = Depends(get_db)):
    db_user = get_user_by_email(db, payload.email)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User does not exist")

    if not db_user.check_password(payload.password):
        raise HTTPException(status_code=400, detail="Invalid email or password")

    return {
        "access_token": create_access_token(
            json.dumps({"email": db_user.email, "id": db_user.id})
        ),
        "refresh_token": create_refresh_token(
            json.dumps({"email": db_user.email, "id": db_user.id})
        ),
    }


@router.post("/refresh", response_model=AuthToken)
def refresh(user=Depends(get_user_from_refresh_token)):
    return {
        "refresh_token": "",
        "access_token": create_access_token({"email": user.email, "id": user.id}),
    }
