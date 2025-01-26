from fastapi import APIRouter

from app.db.util import db_ping

router = APIRouter()

@router.get("/misc/pingdb")
async def get_mongo_ping():
    res = await db_ping()
    return res

