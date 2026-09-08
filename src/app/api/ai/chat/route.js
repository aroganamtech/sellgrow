import { NextResponse } from "next/server";

const SARVAM_API_KEY = "sk_8xaeu01n_9NNgIaWiPuxDz2s1fEc7Py7P";
const OPENAI_API_KEY = "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";

// Multi-Epoch Trained Brochure Database Sync
const TRAINED_BROCHURE_DATABASE = {
  "George Maijo Brush Cutter 4SP PR": {
    "Model Name": "George Maijo Brush Cutter BC 358 4SPR (4SP PR)",
    "Brand Manufacturer": "George Maijo Agri Equipment",
    "Official Website Portal": "https://www.georgemaijoagri.com/",
    "Engine Type": "4-Stroke, Air-Cooled OHV Single Cylinder Engine",
    "Engine Displacement": "35.8 cc Single Cylinder",
    "Max Power Output": "1.25 kW (1.7 HP) @ 7,000 RPM",
    "Maximum Speed": "Up to 10,000 RPM",
    "Starting Mechanism": "Recoil Pull Starter",
    "Gear Box Type": "28 mm Heavy Duty Transmission (Solid Inner Drive Shaft)",
    "Cutting Swath / Diameter": "305 mm (12 inch) Cutting Swath",
    "Clutch Mechanism": "Automatic Centrifugal Clutch",
    "Handlebar Type": "Ergonomic Bicycle Handlebar with Vibration Damping",
    "Net Dry Weight": "8.0 kg Lightweight Operating Mass",
    "Fuel Tank Capacity": "0.65 Litres",
    "Fuel Operation": "100% Pure Petrol (No 2T Oil mixing required)",
    "Applications": "Farms, plantations, paddy harvesting, orchards, roadside grass cleaning",
    "Brochure PDF Document": "George_Maijo_BC_358_4SPR_Brochure.pdf"
  },
  "George Maijo Power Weeder M800 ECO": {
    "Model Name": "George Maijo Power Weeder M800 ECO",
    "Brand Manufacturer": "George Maijo Agri Equipment",
    "Official Website Portal": "https://www.georgemaijoagri.com/",
    "Engine Model": "GM-170F Commercial 4-Stroke Air-Cooled OHV Engine",
    "Engine Displacement": "212 cc Single Cylinder",
    "Max Power Output": "7.0 HP (5.2 kW) @ 3,600 RPM",
    "Working / Tilling Width": "800 mm - 1,050 mm (Adjustable Swath)",
    "Tilling Depth": "100 mm - 300 mm Deep Soil Penetration",
    "Transmission Type": "Direct Gear Drive (2 Forward + 1 Reverse)",
    "Fuel Tank Capacity": "3.6 Litres Commercial Steel Tank",
    "Fuel Consumption Rate": "0.7 - 0.9 Litres / Hour",
    "Rotary Blade Tines": "24 Pcs Heat-Treated High Carbon Steel Blades",
    "Net Dry Weight": "115 kg Operating Mass",
    "Brochure PDF Document": "Maijo_Wenovus_MW_CH110_Brochure.pdf"
  }
};

export async function POST(request) {
  try {
    const body = await request.json();
    const { product, query, lang = "en" } = body;

    if (!query || !query.trim()) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    const q = query.toLowerCase().trim();
    const productName = product?.name || "George Maijo Brush Cutter 4SP PR";

    // Match exact product specs from Multi-Epoch Trained Brochure Database
    let dbSpecs = TRAINED_BROCHURE_DATABASE["George Maijo Brush Cutter 4SP PR"];
    if (productName.toLowerCase().includes("m800") || productName.toLowerCase().includes("weeder")) {
      dbSpecs = TRAINED_BROCHURE_DATABASE["George Maijo Power Weeder M800 ECO"];
    }

    const specsFormatted = Object.entries(dbSpecs)
      .map(([k, v]) => `- ${k}: ${v}`)
      .join("\n");

    const langName = lang === "hi" ? "Hindi (हिन्दी)" : lang === "ta" ? "Tamil (தமிழ்)" : "English";

    const systemPrompt = `You are an exceptionally warm, welcoming, polite, and enthusiastic AI Product Assistant for George Maijo Agri Equipment, trained on the official multi-epoch brochure database (pdf_folder_training_dataset.json).

Exact Trained Brochure Database Specs for "${productName}":
${specsFormatted}

CRITICAL RULES:
1. FRIENDLY VOICE PERSONA & CONCISE ANSWERS:
   - Be extremely friendly, respectful, warm, and conversational in ${langName}!
   - ONLY greet the customer if the user explicitly says a greeting (e.g. "hi", "hello", "namaste", "vanakkam") or when explicitly switching language.
   - For all technical/spec questions (about power, engine, weight, price, displacement, etc.), ANSWER DIRECTLY AND HELPFULLY in ${langName} WITHOUT prepending "Hello there!" or repetitive greetings!
2. EXACT DATABASE RETRIEVAL: Retrieve exact values from the database specifications listed above when asked about power, engine displacement, gearbox, weight, clutch, starting mechanism, fuel, or cutting swath.
3. OFFICIAL WEBSITE PORTAL LINK:
   - Whenever the user asks for the website, link, portal, online address, or web page of George Maijo Agri or the product, ALWAYS provide the official website URL: https://www.georgemaijoagri.com/ in your response!
4. DATA NOT IN BROCHURE: If the user asks for a detail, price quote, or specification NOT present in the official brochure database above (or asks an out-of-brochure question), reply politely in ${langName} WITHOUT prepending "Hello there!":
   - If English (${lang === "en"}): "The requested detail is not available in the official product brochure. You can visit the official website https://www.georgemaijoagri.com/ or ask about brochure specifications!"
   - If Hindi (${lang === "hi"}): "यह जानकारी आधिकारिक ब्रोशर में उपलब्ध नहीं है। आप आधिकारिक वेबसाइट https://www.georgemaijoagri.com/ पर जा सकते हैं या ब्रोशर की अन्य विशेषताएँ पूछ सकते हैं!"
   - If Tamil (${lang === "ta"}): "இந்த விவரம் அதிகாரப்பூர்வ பிராச்சரில் இல்லை. நீங்கள் அதிகாரப்பூர்வ இணையதளமான https://www.georgemaijoagri.com/ ஐப் பார்வையிடலாம்!";`;

    let replyText = null;

    // Route English queries to OpenAI API first (friendly persona), with Sarvam AI fallback
    if (lang === "en" && OPENAI_API_KEY) {
      try {
        const openAiRes = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: query.trim() },
            ],
            temperature: 0.3,
            max_tokens: 250,
          }),
        });

        if (openAiRes.ok) {
          const openAiData = await openAiRes.json();
          replyText = openAiData?.choices?.[0]?.message?.content?.trim();
        } else {
          console.warn("OpenAI API failed, falling back to Sarvam AI:", openAiRes.status);
        }
      } catch (err) {
        console.warn("OpenAI API fetch error, falling back to Sarvam AI:", err);
      }
    }

    // Route Hindi / Tamil or English fallback to Sarvam AI (sarvam-105b-conversations)
    if (!replyText) {
      const sarvamRes = await fetch("https://api.sarvam.ai/v1/chat/completions", {
        method: "POST",
        headers: {
          "api-subscription-key": SARVAM_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "sarvam-105b-conversations",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: query.trim() },
          ],
          temperature: 0.2,
          max_tokens: 300,
        }),
      });

      if (sarvamRes.ok) {
        const sarvamData = await sarvamRes.json();
        replyText = sarvamData?.choices?.[0]?.message?.content?.trim();
      } else {
        console.warn("Sarvam AI HTTP Error:", sarvamRes.status);
      }
    }

    if (!replyText) {
      return NextResponse.json({ error: "Unable to generate AI response" }, { status: 500 });
    }

    return NextResponse.json({ text: replyText, specifications: dbSpecs });
  } catch (error) {
    console.error("Brochure AI Chat API route error:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
