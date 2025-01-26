from typing import List
import pymongo
from pymongo.collection import ObjectId
from ..models import Day, Schedule, User

week = 7
uri = "mongodb+srv://herdb:a6cqBpkkoACHvq6x@her-cluster.04a4m.mongodb.net/?retryWrites=true&w=majority&appName=her-cluster"

# Create a new client and connect to the server
client = pymongo.MongoClient(uri)
db = client.herdb

#Add new user to mongo
async def db_insert_user(user: User):
    col = db["users"]
    res = col.insert_one(user.model_dump())
    return res.inserted_id

#Get document
async def db_get_doc(collection: str, id: str):
    col = db[collection]
    oid = {'_id': ObjectId(id)}

    res = col.find_one(filter=oid)
    return res

#Init schedule for user
async def db_init_schedule_per_user(uid):
    col = db["schedules"]
    days = [Day(workout=None, meals=None).model_dump() for _ in range(week)]
    col.insert_one({"uid":uid, 
                    "days": days})

#Update Schedule
async def db_update_schedule(id, days: List[Day]):
    col = db["schedules"]
    query_filter = {'_id': ObjectId(id)}
    new_days = [d.model_dump() for d in days]
    col.update_one(query_filter, {"$set": {
        "days": new_days }
    })

#Ping mongodb
async def db_ping():
    res = ""
    try:
        client.admin.command('ping')
        res = "Pinged your deployment. You successfully connected to MongoDB!"
    except Exception as e:
        print(e)
    return res

if __name__ == "__main__":
    user_collection = db["users"]

    res = user_collection.find_one()
    if res:
        print(res["_id"])

    # drop the collection in case it already exists
    try:
        client.admin.command('ping')
        print("Pinged your deployment. You successfully connected to MongoDB!")
    except Exception as e:
        print(e)

    pass
