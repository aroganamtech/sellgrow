# pip install sarvamai==0.1.31a4
from sarvamai import SarvamAI

client = SarvamAI(
    api_subscription_key="sk_8xaeu01n_9NNgIaWiPuxDz2s1fEc7Py7P"
)

response = client.chat.completions(
    model="sarvam-105b-conversations",
    messages=[
        {"role": "user", "content": "What is the capital of India?"}
    ],
    temperature=0.2,
    top_p=1,
    max_tokens=2000,
)

print(response.choices[0].message.content)