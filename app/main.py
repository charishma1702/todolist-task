from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from app.routes import route, home
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(home.router)
app.include_router(route.router, prefix="/api")

# Mount static files (this was missing!)
app.mount("/static", StaticFiles(directory="static"), name="static")
