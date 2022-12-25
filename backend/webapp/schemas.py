import datetime
from typing import List
from pydantic import BaseModel


class WeightBase(BaseModel):
    weight_kg: float
    date_time: datetime.date


class Weight(WeightBase):
    id: int
    user_id: int

    class Config:
        orm_mode = True


class Weights(BaseModel):
    weights: List[Weight]


class WeightCreate(WeightBase):
    pass


class UserBase(BaseModel):
    email: str


class UserCreate(UserBase):
    password: str


class User(UserBase):
    id: int
    is_active: bool

    class Config:
        orm_mode = True
