from fastapi import APIRouter, HTTPException
from app.db.util import db_get_doc

router = APIRouter()

@router.get("/schedules/{id}")
async def get_schedule(id: str):
    res = await db_get_doc("schedules", id)
    if res is None:
        HTTPException(status_code=404, detail="Could not find schedules")

    return {'days' : res['days']}
