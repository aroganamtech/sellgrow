import json
import time

from sarvamai import SarvamAI

client = SarvamAI(api_subscription_key="sk_8xaeu01n_9NNgIaWiPuxDz2s1fEc7Py7P")

# Define the fields you want back
schema = {
    "type": "object",
    "properties": {
        "policy_number": {"type": "string", "description": "Insurance policy number"},
        "insured_name": {"type": "string", "description": "Name of the insured person"},
        "sum_insured": {"type": "number", "description": "Total sum insured, in INR"},
    },
}

# Create and submit an extract job in one call
with open("insurance-policy.pdf", "rb") as f:
    job = client.doc_ai.extract(
        file=[("insurance-policy.pdf", f, "application/pdf")],
        schema=json.dumps(schema),  # or: config_id="cfg_abc123"
        language="en-IN",
        output_format="json",
    )
print(f"Job created: {job.job_id}")

# Poll until the job reaches a terminal state
TERMINAL = {"completed", "partially_completed", "failed", "rejected"}
while True:
    status = client.doc_ai.get_status(job_id=job.job_id)
    if status.status.lower() in TERMINAL:
        break
    time.sleep(5)

# Fetch the extracted fields
results = client.doc_ai.get_results(job_id=job.job_id)
print(results.result)