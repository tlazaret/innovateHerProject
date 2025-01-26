from typing import List

from fastapi import APIRouter, HTTPException
from app.models import Day, Meals, Prompt, Workout
from app.groq.util import generate_text, generate_json
from app.db.util import db_update_schedule

router = APIRouter()

id = "6795888982e4d5e6e8869754"

@router.post("/generate_text")
async def handle_gen_text(pid: int, prompt: Prompt):
    response = await generate_text(prompt)
    return {"prompt_id": pid, "prompt": prompt, "response": response}

@router.post("/generate_json")
async def handle_gen_json(message: str):
    response = await generate_json(message)
    if not response:
        raise HTTPException(status_code=400, detail="Error generating json")

    # WARN
    # days : List[Day] = []
    # for day in response["days"]:
    #     days.append(
    #         Day(
    #             workout=Workout(content=day["workout"]["content"]),
    #             meals=Meals(content=day["meals"]["content"]),
    #             cycles="good"
    #         )
    #     )
    # await db_update_schedule(id, days)
    
    return response
