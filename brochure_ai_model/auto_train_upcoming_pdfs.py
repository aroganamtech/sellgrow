import os
import json
import time
import argparse
from typing import List, Dict, Any
from brochure_ai_assistant import BrochureAIAssistant

class UpcomingPDFAutoTrainer:
    """
    Automated Continuous PDF Watcher & Trainer.
    Scans brochure_ai_model/PDF/ for any newly uploaded brochure PDF documents
    and automatically trains the Brochure AI Model on them.
    """
    def __init__(self, pdf_dir: str):
        self.pdf_dir = pdf_dir
        self.assistant = BrochureAIAssistant(company_brand="George Maijo Agri")
        self.dataset_file = "upcoming_pdfs_trained_dataset.json"
        self.processed_files = set()

    def train_all_upcoming_pdfs(self) -> Dict[str, Any]:
        if not os.path.exists(self.pdf_dir):
            os.makedirs(self.pdf_dir, exist_ok=True)
            print(f"[INFO] Created PDF directory at: {self.pdf_dir}")

        pdf_files = [f for f in os.listdir(self.pdf_dir) if f.lower().endswith(".pdf")]
        print(f"[INFO] Scanning '{self.pdf_dir}' for upcoming brochure PDFs...")
        print(f"[INFO] Found {len(pdf_files)} PDF brochures to train.")

        trained_results = []
        for pdf_file in pdf_files:
            pdf_path = os.path.join(self.pdf_dir, pdf_file)
            print(f"\n[TRAINING] Auto-Training Brochure AI Model on: {pdf_file}")
            
            analysis = self.assistant.analyze_brochure_document(pdf_path)
            specs = analysis.get("technical_specifications", {})
            
            trained_results.append({
                "file_name": pdf_file,
                "product_name": analysis.get("product_name"),
                "spec_count": len(specs),
                "specifications": specs,
                "highlights": analysis.get("highlights", [])
            })

            self.processed_files.add(pdf_file)
            print(f"[OK] Trained & Learned {len(specs)} Spec Attributes for '{analysis.get('product_name')}'")

        # Save trained dataset checkpoint
        with open(self.dataset_file, "w", encoding="utf-8") as f:
            json.dump(trained_results, f, indent=2, ensure_ascii=False)

        print("\n------------------------------------------------------------")
        print(f"[SUCCESS] Trained Brochure AI Model on all {len(pdf_files)} PDFs in '{self.pdf_dir}'!")
        print(f"[OK] Trained Dataset saved to {self.dataset_file}")
        print("------------------------------------------------------------")
        
        return {
            "trained_count": len(pdf_files),
            "files": list(self.processed_files)
        }

    def watch_and_auto_train(self, poll_interval_sec: int = 5):
        """Continuously watches directory for any newly uploaded PDF brochures and trains on them."""
        print(f"[WATCHER MODE] Active PDF watcher watching directory: {self.pdf_dir}")
        print(f"[WATCHER MODE] Polling every {poll_interval_sec} seconds for new PDF uploads...")
        print("Press Ctrl+C to stop continuous watcher.\n")

        try:
            while True:
                pdf_files = [f for f in os.listdir(self.pdf_dir) if f.lower().endswith(".pdf")]
                new_files = [f for f in pdf_files if f not in self.processed_files]

                if new_files:
                    print(f"\n⚡ [NEW PDF DETECTED] Found {len(new_files)} new PDF brochure(s): {new_files}")
                    self.train_all_upcoming_pdfs()

                time.sleep(poll_interval_sec)
        except KeyboardInterrupt:
            print("\n[INFO] Stopped PDF Watcher.")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Auto Train Brochure AI Model on Upcoming PDFs")
    parser.add_argument(
        "--pdf_dir",
        type=str,
        default=r"c:\Users\Naveen S\OneDrive\Desktop\SellGrow_Main\SellGrow_Web\sellgrow\brochure_ai_model\PDF",
        help="Path to PDF brochure directory"
    )
    parser.add_argument("--watch", action="store_true", help="Run in continuous directory watcher mode")
    args = parser.parse_args()

    trainer = UpcomingPDFAutoTrainer(args.pdf_dir)
    if args.watch:
        trainer.watch_and_auto_train()
    else:
        trainer.train_all_upcoming_pdfs()
