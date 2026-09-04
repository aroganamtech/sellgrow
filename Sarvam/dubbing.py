import requests
import time

API_KEY = "sk_8xaeu01n_9NNgIaWiPuxDz2s1fEc7Py7P"
BASE_URL = "https://studio.sarvam.ai/api/dubbing"
HEADERS = {
    "api-subscription-key": API_KEY,
    "Content-Type": "application/json",
}

# Step 1: Create dubbing project
response = requests.post(
    f"{BASE_URL}/jobs",
    json={
        "src_lang": "en-IN",
        "target_langs": ["hi-IN"],
        "num_speakers": 1,
        "voice_cloning": True,
        "register": "auto",
        "editor_flow": False,
    },
    headers=HEADERS,
)
data = response.json()["data"]
job_id = data["job_id"]
upload_url = data["upload_url"]

# Step 2: Upload video
with open("your_video.mp4", "rb") as f:
    requests.put(
        upload_url,
        data=f,
        headers={"x-ms-blob-type": "BlockBlob", "Content-Type": "video/mp4"},
    )

# Step 3: Start processing
requests.post(
    f"{BASE_URL}/jobs/{job_id}/start",
    headers={"api-subscription-key": API_KEY},
)

# Step 4: Poll until completed
while True:
    status_data = requests.get(
        f"{BASE_URL}/jobs/{job_id}/live-status",
        headers={"api-subscription-key": API_KEY},
    ).json()["data"]
    print(f"Progress: {status_data['progress']}% — {status_data['current_step_label']}")
    if status_data["status"] == "completed":
        print(f"Done! Download: {status_data['export']['dubbed_video_url']}")
        break
    if status_data["status"] == "failed":
        raise RuntimeError(status_data.get("error_message"))
    time.sleep(10)