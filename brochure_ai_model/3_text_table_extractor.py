import os
import json
import argparse
from typing import List, Dict, Any

class TextTableFusionEngine:
    """
    Stage 3: Text + Images + Tables Fusion Engine.
    Combines OCR text bounding boxes with layout regions to extract clean
    Key-Value Specification Tables, Product Descriptions, and Image Metadata.
    """
    def fuse_data(self, layout_data: List[Dict[str, Any]]) -> Dict[str, Any]:
        extracted_specs = {}
        header_title = ""
        descriptions = []

        for page in layout_data:
            elements = page.get("layout_elements", {})

            # 1. Extract Header Title
            titles = elements.get("header_title", [])
            if titles:
                header_title = " ".join([t.get("text", "") for t in titles])

            # 2. Extract Specification Key-Values from Table Rows
            spec_rows = elements.get("specification_table", [])
            for row in spec_rows:
                text = row.get("text", "")
                if ":" in text:
                    parts = text.split(":", 1)
                    key = parts[0].strip()
                    val = parts[1].strip()
                    extracted_specs[key] = val
                elif " " in text:
                    # Heuristic splitting for space delimited table columns
                    tokens = text.split(" ")
                    if len(tokens) >= 2:
                        key = " ".join(tokens[:-1]).strip()
                        val = tokens[-1].strip()
                        if key and val:
                            extracted_specs[key] = val

            # 3. Body Descriptions
            bodies = elements.get("body_description", [])
            for b in bodies:
                descriptions.append(b.get("text", ""))

        if not header_title:
            header_title = "George Maijo Agricultural Machinery Equipment"

        return {
            "product_name": header_title,
            "specification_table": extracted_specs,
            "description": " ".join(descriptions),
            "image_crop_metadata": elements.get("figure_box", {})
        }

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Stage 3: Text + Images + Tables Fusion Engine")
    parser.add_argument("--input", type=str, default="layout_output.json", help="Path to Stage 2 Layout output")
    parser.add_argument("--output", type=str, default="fused_output.json", help="Path to Stage 3 Fused JSON output")
    args = parser.parse_args()

    if os.path.exists(args.input):
        with open(args.input, "r", encoding="utf-8") as f:
            layout_data = json.load(f)
    else:
        layout_data = []

    fusion_engine = TextTableFusionEngine()
    fused_result = fusion_engine.fuse_data(layout_data)

    with open(args.output, "w", encoding="utf-8") as f:
        json.dump(fused_result, f, indent=2, ensure_ascii=False)

    print(f"✅ Stage 3 Text+Images+Tables Fusion completed! Extracted {len(fused_result['specification_table'])} spec rows. Saved to {args.output}")
