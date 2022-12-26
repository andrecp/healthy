import logging
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..schemas import WeightCreate, Weight, Weights
from ..repo import (
    add_weight_event_to_user,
    get_weights_for_user,
)
from ..dependencies import get_db, get_current_user

logger = logging.getLogger(__name__)

router = APIRouter()


@router.post("/", response_model=Weight)
async def add_weight(
    payload: WeightCreate,
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):
    db_weight = add_weight_event_to_user(db, user, payload)
    return db_weight


@router.get("/", response_model=Weights)
async def get_weights(db: Session = Depends(get_db), user=Depends(get_current_user)):
    weights = get_weights_for_user(db, user)
    return {"weights": weights}
