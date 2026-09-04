import { NextResponse } from "next/server";

const SARVAM_API_KEY = "sk_8xaeu01n_9NNgIaWiPuxDz2s1fEc7Py7P";

export async function POST(request) {
  try {
    const body = await request.json();
    const { text, lang = "en" } = body;

    if (!text || !text.trim()) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    const targetLangCode = lang === "hi" ? "hi-IN" : lang === "ta" ? "ta-IN" : "en-IN";
    const speaker = lang === "hi" ? "shubh" : lang === "ta" ? "ratan" : "meera";

    const sarvamRes = await fetch("https://api.sarvam.ai/text-to-speech", {
      method: "POST",
      headers: {
        "api-subscription-key": SARVAM_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: [text.trim()],
        target_language_code: targetLangCode,
        speaker: speaker,
        model: "bulbul:v3",
      }),
    });

    if (!sarvamRes.ok) {
      const errText = await sarvamRes.text();
      console.warn("Sarvam AI TTS API HTTP error:", sarvamRes.status, errText);
      return NextResponse.json({ error: "Sarvam AI TTS service unavailable" }, { status: 502 });
    }

    const data = await sarvamRes.json();
    const base64Audio = data?.audios?.[0];

    if (!base64Audio) {
      return NextResponse.json({ error: "No audio generated from Sarvam AI" }, { status: 500 });
    }

    const audioUrl = `data:audio/wav;base64,${base64Audio}`;
    return NextResponse.json({ audioUrl });
  } catch (error) {
    console.error("Sarvam AI TTS API route error:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
