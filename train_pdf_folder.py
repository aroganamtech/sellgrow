import os
import sys

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

# Add brochure_ai_model directory to sys.path
root_dir = os.path.dirname(os.path.abspath(__file__))
brochure_model_dir = os.path.join(root_dir, "brochure_ai_model")

if brochure_model_dir not in sys.path:
    sys.path.insert(0, brochure_model_dir)

os.chdir(brochure_model_dir)

import train_pdf_folder

if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser(description="Train Brochure AI Model on PDF folder")
    parser.add_argument(
        "--pdf_dir",
        type=str,
        default=os.path.join(brochure_model_dir, "PDF"),
        help="Path to PDF directory"
    )
    parser.add_argument("--epochs", type=int, default=5, help="Number of training epochs (multi-pass training)")
    parser.add_argument("--output_json", type=str, default="pdf_folder_training_dataset.json", help="Output JSON dataset path")
    args = parser.parse_args()

    trainer = train_pdf_folder.PDFFolderTrainer(args.pdf_dir, epochs=args.epochs)
    trainer.train_on_pdf_folder(args.output_json)
