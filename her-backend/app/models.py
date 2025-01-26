from pydantic import BaseModel

class User(BaseModel):
    first : str = "Jane"
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
    cycles: str = "good"

class Schedule(BaseModel):
    uid: str
    days: list[Day] | None = None

class Prompt(BaseModel):
    role : str    
    content: str

