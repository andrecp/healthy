import os
from datetime import datetime, timedelta
from typing import Union, Any
from jose import jwt
from . import config


def create_access_token(subject: str, expires_delta: int = None) -> str:
    if expires_delta is not None:
        expires_delta = datetime.utcnow() + expires_delta
    else:
        expires_delta = datetime.utcnow() + timedelta(
            minutes=config.ACCESS_TOKEN_EXPIRE_MINUTES
        )

    to_encode = {"exp": expires_delta, "sub": subject}
    encoded_jwt = jwt.encode(to_encode, config.JWT_SECRET_KEY, config.ALGORITHM)
    return encoded_jwt


def create_refresh_token(subject: str, expires_delta: int = None) -> str:
    if expires_delta is not None:
        expires_delta = datetime.utcnow() + expires_delta
    else:
        expires_delta = datetime.utcnow() + timedelta(
            minutes=config.REFRESH_TOKEN_EXPIRE_MINUTES
        )

    to_encode = {"exp": expires_delta, "sub": subject}
    encoded_jwt = jwt.encode(to_encode, config.JWT_REFRESH_SECRET_KEY, config.ALGORITHM)
    return encoded_jwt
