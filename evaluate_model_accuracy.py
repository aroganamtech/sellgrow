import os
import sys

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

root_dir = os.path.dirname(os.path.abspath(__file__))
brochure_model_dir = os.path.join(root_dir, "brochure_ai_model")

if brochure_model_dir not in sys.path:
    sys.path.insert(0, brochure_model_dir)

os.chdir(brochure_model_dir)

import evaluate_model_accuracy

if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser(description="Evaluate Brochure AI Model Accuracy")
    parser.add_argument(
        "--pdf_dir",
        type=str,
        default=os.path.join(brochure_model_dir, "PDF"),
        help="Path to PDF brochure directory"
    )
    args = parser.parse_args()

    evaluator = evaluate_model_accuracy.ModelAccuracyEvaluator(args.pdf_dir)
    evaluator.evaluate_accuracy()
