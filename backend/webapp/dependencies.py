import json
import logging
from datetime import datetime
from .database import SessionLocal
from . import config
from .repo import get_user
from jose import jwt, ExpiredSignatureError
from fastapi import Header, HTTPException, Depends

logger = logging.getLogger(__name__)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def get_current_user(authorization: str = Header(), db=Depends(get_db)):
    if "Bearer" not in authorization:
        raise HTTPException(
            status_code=400, detail="Authorization token missing Bearer string"
        )

    token = authorization.replace("Bearer ", "")
    try:
        payload = jwt.decode(
            token, config.JWT_SECRET_KEY, algorithms=[config.ALGORITHM]
        )
        sub = json.loads(payload.get("sub"))
        user = get_user(db, sub.get("id"))
    except ExpiredSignatureError:
        raise HTTPException(
            status_code=406,
            detail="Token expired",
            headers={"Authorization": "Bearer"},
        )
    except Exception:
        logger.exception("What happened")
        raise HTTPException(
            status_code=401,
            detail="Problem with JWT token",
            headers={"Authorization": "Bearer"},
        )
    if user is None:
        raise HTTPException(
            status_code=401,
            detail="Invaid user",
            headers={"Authorization": "Bearer"},
        )

    return user


def get_user_from_refresh_token(authorization: str = Header(), db=Depends(get_db)):
    if "Bearer" not in authorization:
        raise HTTPException(
            status_code=400, detail="Authorization token missing Bearer string"
        )

    token = authorization.replace("Bearer ", "")
    try:
        payload = jwt.decode(
            token, config.JWT_REFRESH_SECRET_KEY, algorithms=[config.ALGORITHM]
        )
        sub = json.loads(payload.get("sub"))
        user = get_user(db, sub.get("id"))
    except ExpiredSignatureError:
        raise HTTPException(
            status_code=406,
            detail="Token expired",
            headers={"Authorization": "Bearer"},
        )
    except Exception:
        logger.exception("What happened")
        raise HTTPException(
            status_code=401,
            detail="Problem with JWT token",
            headers={"Authorization": "Bearer"},
        )
    if user is None:
        raise HTTPException(
            status_code=401,
            detail="Invaid user",
            headers={"Authorization": "Bearer"},
        )

    return user
