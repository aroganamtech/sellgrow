/**
 * Brochure AI Assistant - Web Application Integration Wrapper
 * Connects the 6-stage PaddleOCR -> PubLayNet -> Fine-tuned Vision Model
 * pipeline to the SellGrow Next.js web application.
 */

import { ProductPdfIntelligenceModel } from "@/services/pdfIntelligenceEngine";

export interface BrochureAiAnalysisResult {
  success: boolean;
  product_name: string;
  category: string;
  brand: string;
  short_description: string;
  full_description: string;
  technical_specifications: Record<string, string>;
  highlights: string[];
  pdf_file: string;
}

export class BrochureAiPipelineService {
  /**
   * Executes full Brochure AI Assistant analysis on an uploaded PDF/Image document
   */
  static async processBrochureDocument(
    fileName: string,
    fallbackProductName?: string,
    companyBrand: string = "George Maijo Agri"
  ): Promise<BrochureAiAnalysisResult> {
    // 1. Run PaddleOCR + Layout Detection + Vision LLM extraction model
    const extracted = ProductPdfIntelligenceModel.analyzePdfBrochure(
      fileName,
      fallbackProductName,
      companyBrand
    );

    return {
      success: true,
      product_name: extracted.name,
      category: extracted.category,
      brand: extracted.brand,
      short_description: extracted.shortDesc,
      full_description: extracted.fullDesc,
      technical_specifications: extracted.specs,
      highlights: extracted.highlights,
      pdf_file: fileName
    };
  }
}
