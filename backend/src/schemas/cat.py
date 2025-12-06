from pydantic import BaseModel, Field
from src.schemas.cat import SexEnum


class CatBase(BaseModel):
    name: Annotation[str, Field(min_length=1, max_length=20, example="Whiskers")]
    age: Annotation[int, Field(ge=0, le=25, example=3)]
    breed: Annotation[str, Field(min_length=1, max_length=30, example="Siamese")]
    sex: Annotation[SexEnum]
    diabetes: Annotation[bool, Field(default=False, example=False)]
    color: Annotation[str, Field(min_length=1, max_length=20, example="Black")]
    weight: Annotation[float, Field(gt=0, le=25, example=4.5)]

