from typing import List, Optional

import bcrypt
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError


from . import models, schemas


def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()


def get_user_by_email(db: Session, email: str) -> Optional[models.User]:
    return db.query(models.User).filter(models.User.email == email).first()


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()


def create_user(db: Session, user: schemas.UserCreate) -> Optional[models.User]:
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(user.password.encode("utf-8"), salt)
    db_user = models.User(email=user.email, hashed_password=hashed.decode("utf-8"))
    db.add(db_user)
    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        return None

    db.refresh(db_user)
    return db_user


def add_weight_event_to_user(
    db: Session, user: models.User, weight_event: schemas.WeightCreate
) -> models.Weight:
    db_weight = models.Weight(**weight_event.dict(), user=user)
    db.add(db_weight)
    db.commit()
    db.refresh(db_weight)
    return db_weight


def get_weights_for_user(db: Session, user: models.User) -> List[models.Weight]:
    return user.weights
