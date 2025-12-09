from enum import Enum
from sqlalchemy import Integer, String, Boolean, Float
from sqlalchemy import Enum as SAEnum
from sqlalchemy.orm import Mapped, mapped_column
from app.database import Base

class SexEnum(Enum):
    MALE = "Male"
    FEMALE = "Female"


class Cat(Base):
    __tablename__ = 'cats'

    id : Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    name : Mapped[str] = mapped_column(String, index=True)
    age : Mapped[int] = mapped_column(Integer)
    breed : Mapped[str] = mapped_column(String)
    sex : Mapped[SexEnum] = mapped_column(SAEnum(SexEnum, name="cat_sex_enum"))
    diabetes : Mapped[bool] = mapped_column(Boolean, default=False)
    color : Mapped[str] = mapped_column(String)
    weight : Mapped[float] = mapped_column(Float)

    
