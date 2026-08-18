# Brochure AI Assistant - Training & Inference Pipeline

An end-to-end Machine Learning and Document Vision AI pipeline for parsing, layout understanding, dataset labeling, and fine-tuning Vision-Language Models (**Qwen2.5-VL / Llama 3.2 Vision**) on agricultural and industrial product brochures.

---

## 🏗️ Architecture Workflow

```
Brochure PDF / Image
          │
          ▼
     PaddleOCR  (Stage 1)
          │
          ▼
 Layout Detection (PubLayNet / DocLayNet) (Stage 2)
          │
          ▼
 Text + Images + Tables Fusion (Stage 3)
          │
          ▼
 Create JSON Labels (Stage 4)
          │
          ▼
 Fine-tune Qwen2.5-VL / Llama 3.2 Vision (Stage 5)
          │
          ▼
 Brochure AI Assistant Inference API (Stage 6)
```

---

## 📁 Pipeline Components

1. **`1_paddle_ocr_engine.py`**: Runs PaddleOCR to extract text bounding boxes, words, confidence scores, and raw OCR tables from brochure PDFs or images.
2. **`2_layout_detector.py`**: PubLayNet & DocLayNet layout parser that segments documents into `title`, `text`, `table`, `figure`, `header`, and `list` regions.
3. **`3_text_table_extractor.py`**: Fuses PaddleOCR output with layout detection boxes to reconstruct full structured data tables, image crops, and text blocks.
4. **`4_dataset_json_formatter.py`**: Formats parsed document components into JSON LLaVA / Qwen2.5-VL conversation dataset format with ground truth specification labels.
5. **`5_qwen_llama_fine_tuner.py`**: Fine-tunes **Qwen2.5-VL-7B-Instruct** or **Llama-3.2-11B-Vision-Instruct** using PEFT / LoRA on GPU.
6. **`6_brochure_ai_assistant.py`**: FastAPI / PyTorch serving engine providing instant brochure PDF analysis, spec table extraction, and Q&A inference.
7. **`brochure_ai_pipeline.ts`**: TypeScript wrapper connecting the Brochure AI Assistant to the SellGrow web application.

---

## 🚀 Quick Start

### Install Dependencies
```bash
pip install -r requirements.txt
```

### Run Stage 1 & 2: OCR & Layout Analysis
```bash
python 1_paddle_ocr_engine.py --input sample_brochure.pdf
python 2_layout_detector.py --input sample_brochure.pdf
```

### Run Full End-to-End Extraction
```bash
python 6_brochure_ai_assistant.py --input sample_brochure.pdf
```
