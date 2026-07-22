import os
import sys

MONGODB_URI = "mongodb+srv://aroganamtech:ax1zJdu8KjCvFqnU@careerblitz.zkjrg.mongodb.net/sellgrow?retryWrites=true&w=majority"
DB_NAME = "sellgrow"

def init_database():
    try:
        from pymongo import MongoClient
    except ImportError:
        import subprocess
        print("Installing pymongo...")
        subprocess.check_call([sys.executable, "-m", "pip", "install", "pymongo", "dnspython"])
        from pymongo import MongoClient

    print(f"Connecting to MongoDB Atlas cluster...")
    client = MongoClient(MONGODB_URI)
    
    # Test connection with ping
    client.admin.command('ping')
    print("Successfully pinged MongoDB cluster!")

    # Select sellgrow database
    db = client[DB_NAME]

    # Create / update project initial metadata collection
    metadata_col = db["project_metadata"]
    metadata_doc = {
        "project_name": "sellgrow",
        "description": "SellGrow Web & Backend Platform Database",
        "database_name": DB_NAME,
        "status": "active",
        "initialized_at": "2026-07-21T11:05:38Z"
    }

    result = metadata_col.update_one(
        {"project_name": "sellgrow"},
        {"$set": metadata_doc},
        upsert=True
    )

    print(f"Database '{DB_NAME}' initialized successfully!")
    print(f"Collections present in '{DB_NAME}': {db.list_collection_names()}")

if __name__ == "__main__":
    init_database()
