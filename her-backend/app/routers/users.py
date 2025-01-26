from fastapi import APIRouter

from app.models import User
from app.db.util import db_insert_user, db_init_schedule_per_user, db_update_schedule

router = APIRouter()

@router.put("/users/create")
async def create_user(user: User):
    uid = await db_insert_user(user)
    await db_init_schedule_per_user(uid)
    return "Created new user!"

@router.put("/users/{user_id}")
async def update_user(user_id :int, user: User):
    return {"user_id": user_id, "user": user}
