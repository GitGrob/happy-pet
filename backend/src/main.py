from fastapi import FastAPI
from routers import cat
from database import init_db

app = FastAPI()

# Initialisation of database
init_db()

# Add routes
app.include_router(cat.router, prefix="/api/v1/cats")
