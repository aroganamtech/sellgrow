import os
import json
import argparse
from brochure_ai_assistant import BrochureAIAssistant

class PDFFolderTrainer:
    """
    Train Brochure AI Model on all PDF files inside brochure_ai_model/PDF directory.
    """
    def __init__(self, pdf_dir: str):
        self.pdf_dir = pdf_dir
        self.assistant = BrochureAIAssistant(company_brand="George Maijo Agri")

    def train_on_pdf_folder(self, output_json: str = "pdf_folder_training_dataset.json"):
        if not os.path.exists(self.pdf_dir):
            print(f"[WARN] Directory {self.pdf_dir} does not exist.")
            return

        pdf_files = [f for f in os.listdir(self.pdf_dir) if f.endswith(".pdf")]
        print(f"[INFO] Found {len(pdf_files)} PDF brochures in {self.pdf_dir}:")
        for f in pdf_files:
            print(f"   - {f}")

        trained_results = []
        for pdf_file in pdf_files:
            pdf_path = os.path.join(self.pdf_dir, pdf_file)
            print(f"\n[START] Processing & Training on: {pdf_file}")
            result = self.assistant.analyze_brochure_document(pdf_path)
            trained_results.append(result)

            specs = result.get("technical_specifications", {})
            print(f"[OK] Extracted {len(specs)} Technical Specification Rows for {result.get('product_name')}")

        with open(output_json, "w", encoding="utf-8") as f:
            json.dump(trained_results, f, indent=2, ensure_ascii=False)

        print("\n------------------------------------------------------------")
        print(f"[SUCCESS] Trained Brochure AI Model on {len(pdf_files)} PDF brochures!")
        print(f"[OK] Training dataset saved to {output_json}")
        print("------------------------------------------------------------")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Train Brochure AI Model on PDF folder")
    parser.add_argument(
        "--pdf_dir",
        type=str,
        default=r"c:\Users\Naveen S\OneDrive\Desktop\SellGrow_Main\SellGrow_Web\sellgrow\brochure_ai_model\PDF",
        help="Path to PDF directory"
    )
    args = parser.parse_args()

    trainer = PDFFolderTrainer(args.pdf_dir)
    trainer.train_on_pdf_folder()
