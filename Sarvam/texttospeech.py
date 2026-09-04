from sarvamai import SarvamAI

client = SarvamAI(
    api_subscription_key="sk_8xaeu01n_9NNgIaWiPuxDz2s1fEc7Py7P",
)

response = client.text_to_speech.convert(
    model="bulbul:v3",
    text="नमस्ते, आज मैं आपकी क्या मदद कर सकता हूँ?",
    target_language_code="hi-IN",
    speaker="shubh",
)

print(response)