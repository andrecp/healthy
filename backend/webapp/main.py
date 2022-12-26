from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import users, weights


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(users.router, prefix="/api/v1/users", tags=["users"])
app.include_router(weights.router, prefix="/api/v1/weights", tags=["weights"])
