from sarvamai import SarvamAI

client = SarvamAI(
    api_subscription_key="sk_8xaeu01n_9NNgIaWiPuxDz2s1fEc7Py7P",
)

response = client.speech_to_text.transcribe(
    file=open("audio.wav", "rb"),
    model="saaras:v3",
    mode="transcribe"
)

print(response)