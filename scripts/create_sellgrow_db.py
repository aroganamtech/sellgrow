import sys
from datetime import datetime, timezone

MONGODB_URI = "mongodb+srv://aroganamtech:ax1zJdu8KjCvFqnU@careerblitz.zkjrg.mongodb.net/sellgrow?retryWrites=true&w=majority"
DB_NAME = "sellgrow"

def main():
    try:
        from pymongo import MongoClient
    except ImportError:
        import subprocess
        subprocess.check_call([sys.executable, "-m", "pip", "install", "pymongo", "dnspython"])
        from pymongo import MongoClient

    print("Connecting to MongoDB Atlas...")
    client = MongoClient(MONGODB_URI)
    db = client[DB_NAME]

    print("Inserting initial collections & documents for 'sellgrow' database...")

    # Insert into system_settings
    db["system_settings"].update_one(
        {"project": "sellgrow"},
        {"$set": {
            "project": "sellgrow",
            "version": "3.0.0",
            "description": "SellGrow Platform Core Database",
            "status": "active",
            "createdAt": datetime.now(timezone.utc)
        }},
        upsert=True
    )

    # Insert into users collection
    import hashlib, os
    salt = os.urandom(16).hex()
    pwd_hash = hashlib.pbkdf2_hmac('sha512', 'password123'.encode('utf-8'), salt.encode('utf-8'), 1000).hex()
    stored_hash = f"{salt}:{pwd_hash}"

    # Insert into users collection with embedded registered_business details
    now = datetime.now(timezone.utc)
    db["users"].update_one(
        {"email": "admin@sellgrow.com"},
        {"$set": {
            "name": "Naveen S",
            "email": "admin@sellgrow.com",
            "passwordHash": stored_hash,
            "businessName": "Aroganam Tech",
            "businessType": "FMCG Enterprise",
            "registered_business": {
                "businessName": "Aroganam Tech",
                "businessType": "FMCG Enterprise",
                "registeredAt": now,
                "status": "active"
            },
            "role": "admin",
            "status": "active",
            "createdAt": now,
            "updatedAt": now,
            "lastLogin": now
        }},
        upsert=True
    )

    # Insert sample product
    db["products"].update_one(
        {"title": "Sample SellGrow Product"},
        {"$set": {
            "title": "Sample SellGrow Product",
            "category": "General",
            "price": 0,
            "isSample": True,
            "createdAt": datetime.now(timezone.utc)
        }},
        upsert=True
    )

    print("\n==========================================")
    print("SUCCESS! Database 'sellgrow' collections updated on MongoDB Atlas!")
    print("Collections present:", db.list_collection_names())
    print("==========================================")

if __name__ == "__main__":
    main()
