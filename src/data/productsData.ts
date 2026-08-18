export interface ProductItem {
  id: string;
  name: string;
  category: string;
  brand: string;
  sku?: string;
  variants?: string;
  stock?: number;
  shortDesc: string;
  fullDesc: string;
  engine: string;
  displacement: string;
  power: string;
  weight: string;
  cuttingWidth: string;
  fuelCapacity: string;
  imageBgColor: string;
  image?: string;
  galleryImages?: string[];
  hologramVideo?: string;
  description?: string;
  brochure?: string;
  price?: number | string;
  highlights: string[];
  specs: Record<string, string>;
  voiceGreeting: {
    en: string;
    ta: string;
  };
}

export const CATEGORIES = [
  "All",
  "BRUSH CUTTER",
  "POWER TILLER",
] as const;

export interface ProductPreset {
  name: string;
  category: string;
  brand: string;
  group: string;
}

export const DAY_TO_DAY_PRODUCTS: ProductPreset[] = [
  { name: "George Maijo BC 358 4SP 4-Stroke Brush Cutter", category: "BRUSH CUTTER", brand: "GEORGE MAIJO EQUIPMENT", group: "Agriculture & Gardening" },
  { name: "M700_ECO Commercial Power Tiller & Weeder", category: "POWER TILLER", brand: "GEORGE MAIJO", group: "Agriculture & Gardening" },
];

export const PRODUCTS_DATA: ProductItem[] = [
  {
    id: "gm-bc-358-4sp",
    name: "George Maijo BC 358 4SP",
    category: "BRUSH CUTTER",
    brand: "GEORGE MAIJO EQUIPMENT",
    shortDesc: "35.8cc 4-stroke low-emission pure petrol brush cutter.",
    fullDesc: "Powered by a quiet 35.8cc 4-stroke engine that requires no oil mixing. Runs cleanly on pure petrol with high fuel efficiency, low smoke emission, and easy 360-degree inclinable operation.",
    engine: "4-Stroke OHC Air-Cooled",
    displacement: "35.8 cc",
    power: "1.0 kW / 1.4 HP @ 7000 RPM",
    weight: "7.8 kg",
    cuttingWidth: "450 mm",
    fuelCapacity: "0.65 L",
    imageBgColor: "#eefbf2",
    image: "https://www.georgemaijoagri.com/wp-content/uploads/2024/10/2.1.BC-4SP-E@2x.png",
    hologramVideo: "/videos/remove_all_the_background.mp4",
    highlights: [
      "Pure Petrol Operation – No petrol-oil mixing required.",
      "Low Smoke & Quiet Engine – Eco-friendly 4-stroke technology.",
      "360-Degree Inclinable – Operates at any angle without stall.",
      "High Fuel Efficiency – Up to 40% fuel savings compared to 2-stroke models."
    ],
    specs: {
      "Engine Type": "4-Stroke OHC Air-Cooled",
      "Displacement": "35.8 cc",
      "Fuel": "Unleaded Petrol",
      "Oil Capacity": "0.1 L (SAE 10W-30)",
      "Fuel Tank": "0.65 L",
      "Weight": "7.8 kg"
    },
    voiceGreeting: {
      en: "Hello! The BC 358 4SP features a 4-stroke pure petrol engine with zero oil mixing required. Ask me anything!",
      ta: "வணக்கம்! BC 358 4SP நான்கு கட்ட எஞ்சின் கொண்ட தூய்மையான பெட்ரோல் பிரஷ் கட்டர். விவரங்களைக் கேட்கலாம்!"
    }
  },
  {
    id: "gm-m700-eco",
    name: "M700_ECO",
    category: "BRUSH CUTTER",
    brand: "GEORGE MAIJO",
    shortDesc: "Commercial agricultural 4-stroke prime diesel power tiller and weeder machine.",
    fullDesc: "The M700_ECO is a commercial agricultural 4-stroke power tiller and weeder engineered for deep tilling, inter-crop weeding, and soil aeration. Built with heavy-duty steel tilling blades, direct gear transmission, and adjustable 180-degree handlebars for optimal operator comfort.",
    engine: "7.0 HP 4-Stroke Air-Cooled",
    displacement: "212 cc",
    power: "5.2 kW / 7.0 HP @ 3600 RPM",
    weight: "88 kg",
    cuttingWidth: "800 - 1050 mm",
    fuelCapacity: "3.6 L",
    imageBgColor: "#f0fdf4",
    image: "https://www.georgemaijoagri.com/wp-content/uploads/2024/10/5.1.WM-700-ECO@2x.png",
    hologramVideo: "/videos/remove_all_the_background.mp4",
    highlights: [
      "7.0 HP High Torque Engine – Powerful 4-stroke performance for tough agricultural terrain.",
      "Direct Gear Transmission – Heavy-duty alloy gear system without belts or chains.",
      "Multi-Blade Rotary Tiller – High-carbon steel blades for fine soil preparation.",
      "Ergonomic Adjustable Handlebar – 180-degree rotating handlebar for easy maneuvering."
    ],
    specs: {
      "Engine Type": "7.0 HP 4-Stroke Single Cylinder",
      "Displacement": "212 cc",
      "Transmission": "Direct Gear Drive (2 Forward + 1 Reverse)",
      "Tilling Width": "800 - 1050 mm",
      "Tilling Depth": "100 - 200 mm",
      "Fuel Tank Capacity": "3.6 Liters",
      "Dry Weight": "88 kg"
    },
    voiceGreeting: {
      en: "Hello! I am the AI Assistant for M700_ECO power tiller and weeder. Ask me about specs, engine performance, or price!",
      ta: "வணக்கம்! M700_ECO பவர் டில்லர் மற்றும் வீடர் AI குரல் உதவியாளர். எஞ்சின் மற்றும் விலை விவரங்களைக் கேட்கலாம்!"
    }
  }
];
