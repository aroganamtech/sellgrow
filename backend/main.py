from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import urllib.request
import json
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), "..", ".env.local"))

MONGODB_URI = os.getenv(
    "MONGODB_URI", 
    "mongodb+srv://aroganamtech:ax1zJdu8KjCvFqnU@careerblitz.zkjrg.mongodb.net/sellgrow?retryWrites=true&w=majority"
)
DB_NAME = os.getenv("MONGODB_DB", "sellgrow")

app = FastAPI(
    title="SellGrow API Service",
    description="FastAPI service for SellGrow with MongoDB Atlas integration and Geo-IP detection",
    version="1.0.0",
)

# Enable CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    try:
        from pymongo import MongoClient
        client = MongoClient(MONGODB_URI, serverSelectionTimeoutMS=5000)
        return client[DB_NAME]
    except Exception as e:
        print(f"MongoDB Connection Error: {e}")
        return None

@app.get("/")
def read_root():
    return {
        "status": "online", 
        "service": "SellGrow Web & API Backend Service",
        "database": DB_NAME
    }

@app.get("/api/db-health")
def db_health():
    """
    Check MongoDB database connection status.
    """
    db = get_db()
    if db is not None:
        try:
            db.command("ping")
            collections = db.list_collection_names()
            return {
                "status": "connected",
                "database": DB_NAME,
                "collections": collections
            }
        except Exception as e:
            return {"status": "error", "message": str(e)}
    return {"status": "disconnected", "message": "Could not connect to MongoDB"}

@app.get("/api/detect-region")
def detect_region(request: Request):
    """
    Detect client's country & region based on IP Address.
    Returns region: 'in' (India) or 'global' (International).
    """
    client_ip = request.headers.get("x-forwarded-for")
    if client_ip:
        client_ip = client_ip.split(",")[0].strip()
    else:
        client_ip = request.headers.get("x-real-ip") or (request.client.host if request.client else "")

    country_code = "IN"
    country_name = "India"
    detected_ip = client_ip

    # Query public Geo-IP service
    try:
        url = "https://ipapi.co/json/"
        req = urllib.request.Request(url, headers={"User-Agent": "SellGrow-GeoIP/1.0"})
        with urllib.request.urlopen(req, timeout=3) as response:
            if response.status == 200:
                data = json.loads(response.read().decode())
                country_code = data.get("country_code", "IN").upper()
                country_name = data.get("country_name", "India")
                detected_ip = data.get("ip", client_ip)
    except Exception as e:
        # Fallback to ip-api.com
        try:
            url = "http://ip-api.com/json/"
            req = urllib.request.Request(url, headers={"User-Agent": "SellGrow-GeoIP/1.0"})
            with urllib.request.urlopen(req, timeout=3) as response:
                if response.status == 200:
                    data = json.loads(response.read().decode())
                    country_code = data.get("countryCode", "IN").upper()
                    country_name = data.get("country", "India")
                    detected_ip = data.get("query", client_ip)
        except Exception as inner_e:
            pass

    region = "in" if country_code == "IN" else "global"

    return {
        "status": "success",
        "ip": detected_ip,
        "country_code": country_code,
        "country_name": country_name,
        "region": region,
        "mode": "auto"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
