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
    def normalize_key(self, raw_key: str) -> str:
        k = raw_key.lower().strip()
        if "engine" in k and "displacement" not in k and "power" not in k: return "Engine Model"
        if "power" in k or "hp" in k or "kw" in k: return "Max Power Output"
        if "displacement" in k or "cc" in k: return "Engine Displacement"
        if "width" in k or "tilling" in k or "working" in k: return "Working / Tilling Width"
        if "depth" in k or "soil" in k: return "Tilling Depth"
        if "gear" in k or "transmission" in k or "drive" in k: return "Transmission Type"
        if "fuel" in k and "consumption" not in k: return "Fuel Tank Capacity"
        if "consumption" in k or "rate" in k: return "Fuel Consumption Rate"
        if "weight" in k or "mass" in k or "kg" in k: return "Net Dry Weight"
        if "tine" in k or "blade" in k: return "Rotary Blade Tines"
        if "starter" in k or "recoil" in k: return "Starting Mechanism"
        if "tire" in k or "wheel" in k: return "Tire / Wheel Size"
        return raw_key.strip()

    def fuse_data(self, layout_data: List[Dict[str, Any]]) -> Dict[str, Any]:
        extracted_specs = {}
        header_title = ""
        descriptions = []

        for page in layout_data:
            elements = page.get("layout_elements", {})

            titles = elements.get("header_title", [])
            if titles:
                header_title = " ".join([t.get("text", "") for t in titles])

            spec_rows = elements.get("specification_table", [])
            for row in spec_rows:
                text = row.get("text", "")
                if ":" in text:
                    parts = text.split(":", 1)
                    raw_key = parts[0].strip()
                    val = parts[1].strip()
                    norm_key = self.normalize_key(raw_key)
                    extracted_specs[norm_key] = val
                elif " " in text:
                    tokens = text.split(" ")
                    if len(tokens) >= 2:
                        raw_key = " ".join(tokens[:-1]).strip()
                        val = tokens[-1].strip()
                        if raw_key and val:
                            norm_key = self.normalize_key(raw_key)
                            extracted_specs[norm_key] = val

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

    print(f"[OK] Stage 3 Text+Images+Tables Fusion completed! Saved to {args.output}")
