import { NextResponse } from "next/server";
import { BrochureAiPipelineService } from "@/brochure_ai_model/brochure_ai_pipeline";
import { ProductPdfIntelligenceModel } from "@/services/pdfIntelligenceEngine";
export async function POST(req) {
    try {
        const body = await req.json();
        const { action, fileName, productName, category, specs, highlights, brand, image } = body;
        // Continuous Self-Training Endpoint
        if (action === "self-train") {
            ProductPdfIntelligenceModel.selfTrainOnNewBrochure(fileName || "brochure.pdf", productName || "Equipment", category || "Agricultural Machinery", specs || {}, highlights || [], brand || "George Maijo Agri", image || "");
            return NextResponse.json({ success: true, message: `🧠 Brochure AI Model trained on "${fileName || productName}" successfully!` }, { status: 200 });
        }
        if (!fileName && !productName) {
            return NextResponse.json({ error: "fileName or productName is required" }, { status: 400 });
        }
        const analysis = await BrochureAiPipelineService.processBrochureDocument(fileName || "brochure.pdf", productName, brand || "George Maijo Agri");
        return NextResponse.json(analysis, { status: 200 });
    }
    catch (err) {
        return NextResponse.json({ error: err.message || "Failed to process brochure PDF" }, { status: 500 });
    }
}
