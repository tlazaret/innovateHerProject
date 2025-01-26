from fastapi import FastAPI
from .routers import users, generate, misc, schedules

app = FastAPI()

#Routers for users
app.include_router(users.router)
app.include_router(generate.router)
app.include_router(schedules.router)

app.include_router(misc.router)

@app.get("/")
def index():
    return {"message": "Welcome to Her backend!"}

