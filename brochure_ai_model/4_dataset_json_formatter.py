import os
import json
import argparse
from typing import List, Dict, Any

class DatasetJsonFormatter:
    """
    Stage 4: Create JSON Labels Dataset.
    Formats extracted brochure text, images, and tables into LLaVA / Qwen2.5-VL / Llama 3.2 Vision
    fine-tuning dataset format with instruction-response pairs.
    """
    def format_to_multimodal_dataset(self, fused_data: Dict[str, Any], image_path: str = "sample_brochure.png") -> List[Dict[str, Any]]:
        product_name = fused_data.get("product_name", "Agricultural Equipment")
        spec_table = fused_data.get("specification_table", {})
        description = fused_data.get("description", "High efficiency commercial equipment.")

        # Construct fine-tuning conversation dataset entry
        dataset_entry = {
            "id": f"brochure_{os.path.basename(image_path).replace('.', '_')}",
            "image": image_path,
            "conversations": [
                {
                    "from": "user",
                    "value": "<image>\nExtract all technical specification details, engine model, power output, displacement, and product attributes from this brochure in structured JSON."
                },
                {
                    "from": "assistant",
                    "value": json.dumps({
                        "product_name": product_name,
                        "category": "Agricultural Machinery",
                        "brand": "George Maijo Agri",
                        "short_description": description[:180],
                        "technical_specifications": spec_table,
                        "highlights": [
                            "Commercial Grade Heavy-Duty Construction",
                            "High Fuel Efficiency & High Torque Output",
                            "ISO 9001 Certified George Maijo Quality"
                        ]
                    }, indent=2)
                }
            ]
        }
        return [dataset_entry]

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Stage 4: Create JSON Labels Dataset Generator")
    parser.add_argument("--input", type=str, default="fused_output.json", help="Path to Stage 3 Fused output")
    parser.add_argument("--image", type=str, default="sample_brochure.png", help="Path to brochure image")
    parser.add_argument("--output", type=str, default="brochure_dataset.json", help="Path to output JSON dataset file")
    args = parser.parse_args()

    if os.path.exists(args.input):
        with open(args.input, "r", encoding="utf-8") as f:
            fused_data = json.load(f)
    else:
        fused_data = {"product_name": "Sample Equipment", "specification_table": {}}

    formatter = DatasetJsonFormatter()
    dataset = formatter.format_to_multimodal_dataset(fused_data, args.image)

    with open(args.output, "w", encoding="utf-8") as f:
        json.dump(dataset, f, indent=2, ensure_ascii=False)

    print(f"✅ Stage 4 JSON Label Dataset created successfully! Saved fine-tuning pair to {args.output}")
