from pydantic import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str = "postgresql://postgres:postrgres@localhost:5432/happy-pet-db"

    class Config:
        env_file = ".env"

settings = Settings()
