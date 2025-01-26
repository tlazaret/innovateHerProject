from pydantic import BaseModel

class User(BaseModel):
    first : str = "John"
    last : str = "Doe"
    age: int
    weight: int

class Workout(BaseModel):
    content: str

class Meals(BaseModel):
    content: str

class Day(BaseModel):
    workout: Workout | None = None
    meals: Meals | None = None
    cycles: str = "This feature was implemented by a male who has no clue about this subject."

class Schedule(BaseModel):
    uid: str
    days: list[Day] | None = None

class Prompt(BaseModel):
    role : str    
    content: str

