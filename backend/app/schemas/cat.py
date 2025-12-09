from typing import Annotated
from pydantic import BaseModel, Field
from app.models.cat import SexEnum


class CatCreate(BaseModel):
    name: Annotated[str, Field(min_length=1, max_length=20, example="Whiskers")]
    age: Annotated[int, Field(ge=0, le=25, example=3)]
    breed: Annotated[str, Field(min_length=1, max_length=30, example="Siamese")]
    sex: Annotated[SexEnum, Field(example=SexEnum.MALE)]
    diabetes: Annotated[bool, Field(default=False, example=False)]
    color: Annotated[str, Field(min_length=1, max_length=20, example="Black")]
    weight: Annotated[float, Field(gt=0, le=25, example=4.5)]
