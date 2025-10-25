from motor.motor_asyncio import AsyncIOMotorClient
from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

MONGODB_URL = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
DATABASE_NAME = os.getenv("DATABASE_NAME", "nagpur_accidents")

# For now, we'll use in-memory data
# Uncomment below when MongoDB is set up

# client = AsyncIOMotorClient(MONGODB_URL)
# database = client[DATABASE_NAME]
# accidents_collection = database.get_collection("accidents")
# predictions_collection = database.get_collection("predictions")
# blackspots_collection = database.get_collection("blackspots")

# In-memory data for demo
BLACKSPOTS_DATA = [
    {
        "name": "Prakash High School to Kapsi Bridge (Pardi)",
        "location": {"lat": 21.0891, "lng": 79.0641, "address": "Pardi, Nagpur"},
        "accident_count": 15,
        "zone": "Pardi",
        "description": "Highest accident rate in city"
    },
    {
        "name": "Maruti Showroom Square (Indora)",
        "location": {"lat": 21.1258, "lng": 79.0882, "address": "Indora, Nagpur"},
        "accident_count": 12,
        "zone": "Indora",
        "description": "High traffic intersection"
    },
    {
        "name": "Old Pardi Naka Square",
        "location": {"lat": 21.0935, "lng": 79.0595, "address": "Pardi Naka, Nagpur"},
        "accident_count": 8,
        "zone": "Pardi",
        "description": "Frequent collision point"
    },
    {
        "name": "Hanuman Mandir Square (Pardi)",
        "location": {"lat": 21.0889, "lng": 79.0658, "address": "Pardi, Nagpur"},
        "accident_count": 5,
        "zone": "Pardi",
        "description": "Temple area with heavy pedestrian traffic"
    },
    {
        "name": "8th Mile Square, Amravati Road (Wadi)",
        "location": {"lat": 21.2008, "lng": 79.0426, "address": "Wadi, Nagpur"},
        "accident_count": 5,
        "zone": "Wadi",
        "description": "Highway junction"
    }
]

STATS_DATA = {
    "total_accidents": 327,
    "total_blackspots": 23,
    "zones": {
        "MIDC": 52,
        "Indora": 44,
        "Sitabuldi": 40,
        "Ajni": 46,
        "Sakkardara": 24
    },
    "last_updated": "2025-10-22"
}
