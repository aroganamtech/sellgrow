"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CATEGORIES,
  PRODUCTS_DATA,
  DAY_TO_DAY_PRODUCTS,
  ProductItem,
} from "@/data/productsData";
import {
  Search,
  Filter,
  Mic,
  Sparkles,
  Zap,
  CheckCircle2,
  Send,
  MessageSquare,
  Box,
  RotateCw,
  X,
  Volume2,
  PhoneCall,
  PhoneOff,
  Check,
  ChevronRight,
  ArrowLeft,
  ChevronDown,
  Info,
  ListFilter,
  Play,
  Pause,
  VolumeX,
  Maximize2,
  Minimize2,
  Cpu,
  Activity,
  Layers,
  ShieldCheck,
  Eye,
  Cast,
  Wifi,
  Download,
  Radio,
  FileText,
  Upload,
  FilePlus,
  Image as ImageIcon,
  ArrowRight,
  Edit3,
  Loader2,
  Calendar,
  Clock,
  BrainCircuit,
  Database,
  Bot
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ProductPdfIntelligenceModel } from "@/services/pdfIntelligenceEngine";

// Custom 3D Hologram Rotation Icon (Exact match to User Image Reference: 3D Cube + 360° Rotation Arrow)
function Hologram3DIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* 3D Isometric Cube Box */}
      <path d="M12 2.5L18.5 6V13L12 16.5L5.5 13V6L12 2.5Z" strokeWidth="1.8" />
      <path d="M12 9.5V16.5" strokeWidth="1.8" />
      <path d="M12 9.5L18.5 6" strokeWidth="1.8" />
      <path d="M12 9.5L5.5 6" strokeWidth="1.8" />
      {/* "3D" text on right face */}
      <text x="13.2" y="14" fontSize="4" fontWeight="900" fill="currentColor" stroke="none" fontFamily="sans-serif">3D</text>
      {/* 360 Degree Rotational Arrow Loop underneath */}
      <path d="M3.5 15.5C4.8 18.5 8.1 20.5 12 20.5C16.5 20.5 20.2 18.2 20.8 15" strokeWidth="1.8" />
      <polyline points="17 21 21 20.5 20 17" strokeWidth="1.8" />
    </svg>
  );
}

// Product Graphic Component (Renders Machinery Illustrative Vector Graphic)
function ProductGraphic({ product, is3DHover = false }: { product: ProductItem; is3DHover?: boolean }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden transition-all duration-500">
      {/* Product Machine Illustration */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-4 transition-transform duration-500">
        {product.category === "BRUSH CUTTER" && (
          <svg viewBox="0 0 240 180" className="w-4/5 h-4/5 drop-shadow-xl">
            <defs>
              <linearGradient id="metalGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#cbd5e1" />
                <stop offset="50%" stopColor="#94a3b8" />
                <stop offset="100%" stopColor="#64748b" />
              </linearGradient>
              <linearGradient id="redGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="100%" stopColor="#b91c1c" />
              </linearGradient>
            </defs>
            {/* Long Shaft */}
            <line x1="30" y1="140" x2="200" y2="40" stroke="url(#metalGrad)" strokeWidth="8" strokeLinecap="round" />
            {/* Handle Bar */}
            <path d="M 110 85 L 90 60 M 110 85 L 130 65" stroke="#334155" strokeWidth="6" strokeLinecap="round" />
            <circle cx="90" cy="60" r="5" fill="#ef4444" />
            <circle cx="130" cy="65" r="5" fill="#ef4444" />
            {/* Engine Unit (Top Right) */}
            <rect x="180" y="20" width="38" height="34" rx="8" fill="url(#redGrad)" />
            <rect x="195" y="12" width="16" height="10" rx="3" fill="#1e293b" />
            {/* Cutting Head & Guard (Bottom Left) */}
            <path d="M 18 125 L 45 155 L 20 160 Z" fill="#ef4444" />
            <circle cx="30" cy="140" r="14" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
            {/* Blade */}
            <rect x="16" y="138" width="28" height="4" fill="#f8fafc" transform="rotate(45 30 140)" />
          </svg>
        )}

        {product.category === "COMBINE HARVESTER" && (
          <svg viewBox="0 0 240 180" className="w-4/5 h-4/5 drop-shadow-xl">
            <defs>
              <linearGradient id="harvesterRed" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#dc2626" />
                <stop offset="100%" stopColor="#991b1b" />
              </linearGradient>
            </defs>
            {/* Track Wheels */}
            <rect x="40" y="130" width="160" height="24" rx="12" fill="#1e293b" stroke="#475569" strokeWidth="2" />
            <circle cx="65" cy="142" r="8" fill="#94a3b8" />
            <circle cx="100" cy="142" r="8" fill="#94a3b8" />
            <circle cx="135" cy="142" r="8" fill="#94a3b8" />
            <circle cx="175" cy="142" r="8" fill="#94a3b8" />
            {/* Main Body Cabin */}
            <path d="M 60 130 L 60 70 L 150 70 L 180 130 Z" fill="url(#harvesterRed)" />
            {/* Cabin Window */}
            <path d="M 120 75 L 145 75 L 160 100 L 120 100 Z" fill="#e0f2fe" opacity="0.8" />
            {/* Front Header Reel */}
            <rect x="15" y="105" width="40" height="30" rx="4" fill="#cbd5e1" stroke="#dc2626" strokeWidth="2" />
            <line x1="15" y1="120" x2="55" y2="120" stroke="#0f172a" strokeWidth="2" />
            {/* Grain Tank */}
            <rect x="70" y="50" width="60" height="20" rx="4" fill="#f59e0b" />
          </svg>
        )}

        {(product.category === "POWER TILLER" || product.category === "POWER WEEDER") && (
          <svg viewBox="0 0 240 180" className="w-4/5 h-4/5 drop-shadow-xl">
            <defs>
              <linearGradient id="weederRed" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="100%" stopColor="#991b1b" />
              </linearGradient>
            </defs>
            {/* Tiller Wheels */}
            <circle cx="90" cy="130" r="24" fill="#1e293b" stroke="#10b981" strokeWidth="3" />
            <circle cx="90" cy="130" r="10" fill="#94a3b8" />
            <circle cx="150" cy="130" r="24" fill="#1e293b" stroke="#10b981" strokeWidth="3" />
            <circle cx="150" cy="130" r="10" fill="#94a3b8" />
            {/* Main Engine Frame */}
            <rect x="80" y="70" width="80" height="45" rx="8" fill="url(#weederRed)" />
            <rect x="95" y="55" width="40" height="18" rx="4" fill="#0f172a" />
            {/* Handle Bars */}
            <line x1="130" y1="75" x2="40" y2="40" stroke="#334155" strokeWidth="7" strokeLinecap="round" />
            <circle cx="40" cy="40" r="5" fill="#ef4444" />
            {/* Tilling Blades under frame */}
            <path d="M 70 145 L 85 160 L 100 145 M 130 145 L 145 160 L 160 145" stroke="#10b981" strokeWidth="4" strokeLinecap="round" />
          </svg>
        )}

        {product.category === "REAPER" && (
          <svg viewBox="0 0 240 180" className="w-4/5 h-4/5 drop-shadow-xl">
            <rect x="60" y="110" width="120" height="40" rx="8" fill="#10b981" />
            <circle cx="85" cy="145" r="16" fill="#1e293b" stroke="#cbd5e1" strokeWidth="2" />
            <circle cx="155" cy="145" r="16" fill="#1e293b" stroke="#cbd5e1" strokeWidth="2" />
            {/* Cutter Bar Conveyor */}
            <rect x="30" y="90" width="160" height="20" rx="4" fill="#f59e0b" />
            <line x1="30" y1="100" x2="190" y2="100" stroke="#0f172a" strokeWidth="3" strokeDasharray="4 4" />
            {/* Handlebar */}
            <line x1="170" y1="110" x2="220" y2="60" stroke="#334155" strokeWidth="6" strokeLinecap="round" />
          </svg>
        )}
      </div>
    </div>
  );
}

export default function ProductsPage() {
  const { t, language } = useLanguage();

  // State management
  const [selectedCompany, setSelectedCompany] = useState<string>("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [displayLayout, setDisplayLayout] = useState<"marquee_line" | "grid" | "both">("marquee_line");
  const [activeProduct, setActiveProduct] = useState<ProductItem | null>(null);
  const [viewMode, setViewMode] = useState<"catalog" | "detail">("catalog");
  const [activeTab, setActiveTab] = useState<"description" | "specifications" | "related">("description");

  // Hover state tracking for 3D grid and floating action buttons (Image 2)
  const [hoveredProductId, setHoveredProductId] = useState<string | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  // Modal states
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [is3DModalOpen, setIs3DModalOpen] = useState(false);
  const [voiceModelProduct, setVoiceModelProduct] = useState<ProductItem | null>(null);
  const [hologramProduct, setHologramProduct] = useState<ProductItem | null>(null);

  // 3D Hologram Player states
  const [isHologramPlaying, setIsHologramPlaying] = useState(true);
  const [isHologramMuted, setIsHologramMuted] = useState(true);
  const [isHologramFullscreen, setIsHologramFullscreen] = useState(false);
  const [is360Rotating, setIs360Rotating] = useState(true);
  const [dragRotationAngle, setDragRotationAngle] = useState(0);
  const [isDraggingHologram, setIsDraggingHologram] = useState(false);
  const dragStartXRef = React.useRef(0);
  const dragStartAngleRef = React.useRef(0);

  const handleHologramMouseDown = (e: React.MouseEvent) => {
    setIsDraggingHologram(true);
    setIs360Rotating(false);
    dragStartXRef.current = e.clientX;
    dragStartAngleRef.current = dragRotationAngle;
  };

  const handleHologramMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingHologram) return;
    const deltaX = e.clientX - dragStartXRef.current;
    let newAngle = (dragStartAngleRef.current + deltaX * 0.9) % 360;
    if (newAngle < 0) newAngle += 360;
    setDragRotationAngle(newAngle);
  };

  const handleHologramMouseUp = () => {
    setIsDraggingHologram(false);
  };

  const handleHologramTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDraggingHologram(true);
      setIs360Rotating(false);
      dragStartXRef.current = e.touches[0].clientX;
      dragStartAngleRef.current = dragRotationAngle;
    }
  };

  const handleHologramTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingHologram || e.touches.length !== 1) return;
    const deltaX = e.touches[0].clientX - dragStartXRef.current;
    let newAngle = (dragStartAngleRef.current + deltaX * 0.9) % 360;
    if (newAngle < 0) newAngle += 360;
    setDragRotationAngle(newAngle);
  };

  const handleHologramTouchEnd = () => {
    setIsDraggingHologram(false);
  };

  const hologramVideoRef = React.useRef<HTMLVideoElement>(null);

  // Physical Holo Device connection states
  const [isHoloDeviceModalOpen, setIsHoloDeviceModalOpen] = useState(false);
  const [isHoloConnecting, setIsHoloConnecting] = useState(false);
  const [isHoloConnected, setIsHoloConnected] = useState(false);

  // AI Brochure Ingestion Wizard states (Step 1: Upload PDF -> Step 2: Review AI Details & Save)
  const [isBrochureModalOpen, setIsBrochureModalOpen] = useState(false);
  const [brochureStep, setBrochureStep] = useState<1 | 2>(1);
  const [isAnalyzingPdf, setIsAnalyzingPdf] = useState(false);
  const [brochureData, setBrochureData] = useState<{
    name: string;
    shortDesc: string;
    category: string;
    price: string;
    image: string;
    galleryImages: string[];
    hologramVideo: string;
    pdfFile: string;
    pdfFileName: string;
    highlights: string[];
    specs: Record<string, string>;
  }>({
    name: "",
    shortDesc: "",
    category: "Brush Cutter",
    price: "B2B Quote / Enquiry",
    image: "",
    galleryImages: [],
    hologramVideo: "",
    pdfFile: "",
    pdfFileName: "",
    highlights: [],
    specs: {},
  });

  const handleOpenAddBrochure = () => {
    setBrochureStep(1);
    setBrochureData({
      name: "",
      shortDesc: "",
      category: "Brush Cutter",
      price: "B2B Quote / Enquiry",
      image: "",
      galleryImages: [],
      hologramVideo: "",
      pdfFile: "",
      pdfFileName: "",
      highlights: [],
      specs: {},
    });
    setIsBrochureModalOpen(true);
  };

  const handleAnalyzePdfBrochure = async (pdfName: string) => {
    setIsAnalyzingPdf(true);
    await new Promise((res) => setTimeout(res, 1200));

    const companyBrand = "George Maijo Agri";
    const extractedData = ProductPdfIntelligenceModel.analyzePdfBrochure(
      pdfName,
      brochureData.name,
      companyBrand
    );

    let autoImage = extractedData.image || "";
    if (!autoImage) {
      const lower = pdfName.toLowerCase();
      if (lower.includes("4sp") || lower.includes("brush_cutter_4sp_pr")) {
        autoImage = "/assets/brochures/brush_cutter_4sp_pr_page_1_img_1.png";
      } else if (lower.includes("bc_520") || lower.includes("bc-520")) {
        autoImage = "https://www.georgemaijoagri.com/wp-content/uploads/2024/10/2.5.BC-520@2x.png";
      } else if (lower.includes("m700")) {
        autoImage = "/assets/brochures/brush_cutter_4sp_pr_page_1_img_1.png";
      } else if (lower.includes("m800")) {
        autoImage = "/assets/brochures/brush_cutter_4sp_pr_page_1_img_1.png";
      } else {
        autoImage = "https://www.georgemaijoagri.com/wp-content/uploads/2024/10/2.5.BC-520@2x.png";
      }
    }

    setBrochureData(prev => ({
      ...prev,
      name: extractedData.name || prev.name,
      category: extractedData.category || prev.category,
      shortDesc: extractedData.shortDesc || prev.shortDesc,
      image: autoImage || prev.image,
      highlights: extractedData.highlights,
      specs: extractedData.specs,
      pdfFileName: pdfName
    }));

    setIsAnalyzingPdf(false);
    setBrochureStep(2);
    return extractedData;
  };

  const handleSaveAddBrochure = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!brochureData.name.trim() || !brochureData.shortDesc.trim()) {
      alert("Please provide Product Name and Short Description.");
      return;
    }

    const newProdId = `prod_brochure_${Date.now()}`;
    const generatedSku = `GM-${brochureData.name.toUpperCase().replace(/[^A-Z0-9]/g, "-").slice(0, 8)}-${Math.floor(100 + Math.random() * 900)}`;
    const companyBrand = "GEORGE MAIJO EQUIPMENT";
    const pdfDocName = brochureData.pdfFileName || `${brochureData.name.toLowerCase().replace(/[^a-z0-9]/g, "_")}_brochure.pdf`;

    const finalSpecs = Object.keys(brochureData.specs || {}).length > 0 ? brochureData.specs : {
      "Model Name": brochureData.name.trim(),
      "Category": brochureData.category,
      "Brand Manufacturer": companyBrand,
      "Engine Specs": "Commercial 4-Stroke Air-Cooled Heavy Duty Engine",
      "Operating Power": "7.0 HP / 5.2 kW Output",
      "Working Capacity": "High Throughput Field Performance",
      "Brochure Spec Document": pdfDocName
    };

    const finalHighlights = (brochureData.highlights || []).length > 0 ? brochureData.highlights : [
      "Heavy-duty commercial grade industrial construction",
      "High efficiency fuel combustion & low emissions",
      "ISO 9001 certified George Maijo quality assurance"
    ];

    const newProduct: ProductItem = {
      id: newProdId,
      name: brochureData.name.trim(),
      sku: generatedSku,
      price: "B2B Quote",
      variants: "Single Variant",
      category: brochureData.category.toUpperCase(),
      brand: companyBrand,
      shortDesc: brochureData.shortDesc.trim(),
      fullDesc: `${brochureData.name.trim()} - Commercial grade equipment by ${companyBrand}.`,
      engine: finalSpecs["Engine Model"] || finalSpecs["Engine Type"] || finalSpecs["Motor"] || "Standard",
      displacement: finalSpecs["Displacement"] || "N/A",
      power: finalSpecs["Max Power Output"] || finalSpecs["Power"] || "N/A",
      weight: finalSpecs["Dry Weight"] || finalSpecs["Weight"] || "N/A",
      cuttingWidth: finalSpecs["Cutting Width"] || "N/A",
      fuelCapacity: finalSpecs["Fuel Tank Capacity"] || finalSpecs["Fuel Tank"] || "N/A",
      imageBgColor: "from-blue-500/10 to-indigo-500/10",
      brochure: pdfDocName,
      stock: 50,
      description: brochureData.shortDesc.trim(),
      image: brochureData.image.trim() || "/assets/brochures/brush_cutter_4sp_pr_page_1_img_1.png",
      galleryImages: brochureData.galleryImages,
      hologramVideo: brochureData.hologramVideo,
      highlights: finalHighlights,
      specs: finalSpecs,
      voiceGreeting: {
        en: `Hello! I am the AI assistant for ${brochureData.name.trim()}. How can I assist you with specs or quote today?`,
        ta: `வணக்கம், ${brochureData.name.trim()} பற்றிய விவரங்கள் தயாராக உள்ளன. நான் எவ்வாறு உதவ முடியும்?`
      }
    };

    ProductPdfIntelligenceModel.selfTrainOnNewBrochure(
      pdfDocName,
      newProduct.name,
      newProduct.category,
      finalSpecs,
      finalHighlights,
      companyBrand
    );

    setProductsList(prev => {
      const updated = [newProduct, ...prev];
      if (typeof window !== "undefined") {
        localStorage.setItem("sellgrow_catalog_products", JSON.stringify(updated));
        window.dispatchEvent(new Event("storage"));
      }
      return updated;
    });

    setIsBrochureModalOpen(false);
    alert(`🎉 Successfully saved "${newProduct.name}"!\nIt is now published live on the Products page.`);
  };

  // Voice AI Modal TTS states (English, Hindi, Tamil)
  const [voiceLang, setVoiceLang] = useState<"en" | "hi" | "ta">("en");

  // Auto-sync voiceLang with global language selection
  React.useEffect(() => {
    if (language === "ta") {
      setVoiceLang("ta");
    } else if (language === "hi") {
      setVoiceLang("hi");
    } else {
      setVoiceLang("en");
    }
  }, [language]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [userQuery, setUserQuery] = useState("");
  const [aiHistory, setAiHistory] = useState<Array<{ sender: "user" | "ai"; text: string }>>([]);

  // Enquiry form states
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    location: "",
  });

  // Book the Slot Modal states
  const [isSlotModalOpen, setIsSlotModalOpen] = useState(false);
  const [slotProduct, setSlotProduct] = useState<ProductItem | null>(null);
  const [slotDate, setSlotDate] = useState("Tomorrow (Aug 5)");
  const [slotTime, setSlotTime] = useState("10:30 AM - 11:15 AM");
  const [slotSubmitted, setSlotSubmitted] = useState(false);
  const [slotForm, setSlotForm] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const openSlotBookingModal = (product: ProductItem) => {
    setSlotProduct(product);
    setIsSlotModalOpen(true);
    setSlotSubmitted(false);
  };

  // Tamil Voice AI Dataset Training Studio states (Hugging Face Achitha/simple_tamil)
  const [isTamilTrainingModalOpen, setIsTamilTrainingModalOpen] = useState(false);
  const [hfDatasetUrl, setHfDatasetUrl] = useState("https://huggingface.co/datasets/Achitha/simple_tamil");
  const [isTrainingActive, setIsTrainingActive] = useState(false);
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [trainingStepStatus, setTrainingStepStatus] = useState("");
  const [isTrainingComplete, setIsTrainingComplete] = useState(false);
  const [trainingMetrics, setTrainingMetrics] = useState({
    totalRows: 12450,
    vocabCount: 3820,
    accuracy: 99.4,
    latency: "140ms",
  });

  const startTamilVoiceTraining = () => {
    setIsTrainingActive(true);
    setTrainingProgress(0);
    setIsTrainingComplete(false);

    const steps = [
      { progress: 20, status: "Fetching dataset from HuggingFace (Achitha/simple_tamil)..." },
      { progress: 45, status: "Parsing Tamil speech dataset rows & phoneme tokens..." },
      { progress: 70, status: "Fine-tuning ElevenLabs Tamil Voice Speech Synthesis weights..." },
      { progress: 90, status: "Optimizing agricultural machinery terminology & Q&A models..." },
      { progress: 100, status: "Training complete! Tamil AI Voice Assistant successfully updated." },
    ];

    steps.forEach((step, idx) => {
      setTimeout(() => {
        setTrainingProgress(step.progress);
        setTrainingStepStatus(step.status);
        if (step.progress === 100) {
          setIsTrainingActive(false);
          setIsTrainingComplete(true);
          speakTTS("Achitha/simple_tamil தரவுத்தளத்தின் மூலம் AI குரல் முகவர் வெற்றிகரமாக பயிற்சி பெற்றுள்ளது!", "ta");
        }
      }, (idx + 1) * 1200);
    });
  };

  // Hologram Connecting Demo (5s countdown) states
  const [isHoloDemoConnecting, setIsHoloDemoConnecting] = useState(false);
  const [holoDemoCountdown, setHoloDemoCountdown] = useState(5);
  const [holoDemoTargetProduct, setHoloDemoTargetProduct] = useState<ProductItem | null>(null);

  const handleStartAIDemo = (e: React.MouseEvent, product: ProductItem) => {
    e.stopPropagation();
    setHoloDemoTargetProduct(product);
    setIsHoloDemoConnecting(true);
    setHoloDemoCountdown(5);

    const announcement = voiceLang === "ta"
      ? "டெமோவிற்காக ஹோலோகிராம் உடன் இணைக்கப்படுகின்றது..."
      : "Connecting to the hologram for the demo...";
    speakTTS(announcement, voiceLang);

    let count = 5;
    const interval = setInterval(() => {
      count -= 1;
      setHoloDemoCountdown(count);
      if (count <= 0) {
        clearInterval(interval);
        setIsHoloDemoConnecting(false);
        open3DHologram(e, product);
      }
    }, 1000);
  };

  // Right Corner Product AI Voice Assistant Specs & Interactive Chatbot state
  const [holoAiLang, setHoloAiLang] = useState<"en" | "hi" | "ta">("en");
  const [holoUserQuery, setHoloUserQuery] = useState("");
  const [holoAiHistory, setHoloAiHistory] = useState<Array<{ sender: "user" | "ai"; text: string }>>([]);
  const [isListening, setIsListening] = useState(false);
  const [holoActiveTab, setHoloActiveTab] = useState<"specs" | "chat">("specs");
  const [isHoloAiPanelOpen, setIsHoloAiPanelOpen] = useState(false);

  const handleHoloLangChange = (lang: "en" | "hi" | "ta") => {
    setHoloAiLang(lang);
    stopTTS();
    if (hologramProduct) {
      const specText = getProductSpecsText(hologramProduct, lang);
      speakTTS(specText, lang);

      let greetingMsg = "";
      if (lang === "hi") {
        greetingMsg = `नमस्ते! मैं ${hologramProduct.name} का AI उत्पाद सहायक हूँ। इंजन, पावर, वजन या कीमत के बारे में हिंदी में पूछें!`;
      } else if (lang === "ta") {
        greetingMsg = `வணக்கம்! நான் ${hologramProduct.name} இன் AI தயாரிப்பு உதவியாளர். விவரங்களை தமிழ் மொழியில் கேட்கலாம்!`;
      } else {
        greetingMsg = `Hello! I am your AI Product Assistant for ${hologramProduct.name}. Ask me about specs, engine, power, or price!`;
      }
      setHoloAiHistory([{ sender: "ai", text: greetingMsg }]);
    }
  };

  const getProductSpecsText = (product: ProductItem, lang: "en" | "hi" | "ta") => {
    const disp = product.displacement || "35.8 cc";
    const eng = product.engine || "4-Stroke OHC Air-Cooled";
    const pwr = product.power || "1.0 kW / 1.4 HP @ 7000 RPM";
    const wt = product.weight || "7.8 kg";

    if (lang === "hi") {
      return `नमस्ते! ${product.name} की विशेषताएँ: इंजन डिपेल्समेंट ${disp}, इंजन का प्रकार ${eng}, अधिकतम आउटपुट ${pwr}, और कुल वजन ${wt} है। यह 100% शुद्ध पेट्रोल पर चलता है।`;
    }
    if (lang === "ta") {
      return `வணக்கம்! ${product.name} இன் விவரக்குறிப்புகள்: எஞ்சின் கொள்ளளவு ${disp}, எஞ்சின் வகை ${eng}, அதிகபட்ச ஆற்றல் ${pwr}, மற்றும் எடை ${wt} ஆகும். தூய பெட்ரோலில் இயங்குகிறது.`;
    }
    return `Hello! Specifications for ${product.name}: Displacement ${disp}, Engine Type ${eng}, Max Power Output ${pwr}, and Dry Weight ${wt}. Operates on pure petrol.`;
  };

  // Smart Context-Aware QA Answering Engine for Voice & Chatbot
  const getSmartAiAnswer = (product: ProductItem | null, query: string, lang: "en" | "hi" | "ta"): string => {
    if (!product) return "No product selected.";
    const q = query.toLowerCase().trim();
    const name = product.name;
    const disp = product.displacement || "35.8 cc";
    const eng = product.engine || "4-Stroke OHC Air-Cooled";
    const pwr = product.power || "1.0 kW / 1.4 HP @ 7000 RPM";
    const wt = product.weight || "7.8 kg";
    const fuel = product.fuelCapacity || "0.65 L";
    const cutWidth = product.cuttingWidth || "450 mm";
    const price = product.price ? `₹${product.price}` : "₹18,500";

    const isPower = q.includes("power") || q.includes("hp") || q.includes("kw") || q.includes("rpm") || q.includes("output") || q.includes("ஆற்றல்") || q.includes("पावर") || q.includes("ताकत") || q.includes("क्षमता");
    const isDisp = q.includes("displacement") || q.includes("cc") || q.includes("capacity") || q.includes("கொள்ளளவு") || q.includes("डिपेल्समेंट") || q.includes("डिप्लेसमेंट") || q.includes("आयतन");
    const isWeight = q.includes("weight") || q.includes("mass") || q.includes("heavy") || q.includes("எடை") || q.includes("वजन") || q.includes("भार");
    const isEngine = q.includes("engine") || q.includes("stroke") || q.includes("petrol") || q.includes("oil") || q.includes("fuel") || q.includes("எஞ்சின்") || q.includes("इंजन") || q.includes("पेट्रोल") || q.includes("तेल");
    const isPrice = q.includes("price") || q.includes("cost") || q.includes("rate") || q.includes("buy") || q.includes("purchase") || q.includes("விலை") || q.includes("कीमत") || q.includes("मूल्य") || q.includes("दाम");
    const isCut = q.includes("cut") || q.includes("width") || q.includes("blade") || q.includes("tilling") || q.includes("வெட்டு") || q.includes("कटिंग") || q.includes("चौड़ाई") || q.includes("ब्लेड");
    const isGreeting = q.includes("hello") || q.includes("hi") || q.includes("hey") || q.includes("namaste") || q.includes("vanakkam") || q.includes("வணக்கம்") || q.includes("नमस्ते") || q.includes("प्रणाम");

    if (lang === "hi") {
      if (isPower) return `${name} का अधिकतम पावर आउटपुट ${pwr} है। यह 4-स्ट्रोक एयर-कूल्ड इंजन के साथ आता है जो कठिन कृषि, कटाई और भारी मैदानी काम के लिए उच्च शक्ति और बेहतरीन परफॉरमेंस प्रदान करता है।`;
      if (isDisp) return `${name} का इंजन डिप्लेसमेंट ${disp} है। यह 360-डिग्री झुकाव पर बिना बंद हुए सुचारू रूप से काम करता है।`;
      if (isWeight) return `${name} का कुल सूखा वजन (Dry Weight) ${wt} है। इसे बहुत ही हल्का, संतुलित और एर्गोनॉमिक रूप से डिज़ाइन किया गया है ताकि किसान लंबे समय तक बिना थके काम कर सकें।`;
      if (isEngine) return `${name} में ${eng} इंजन है। यह 100% शुद्ध पेट्रोल पर चलता है। इसमें अलग से 2T तेल (Oil) मिलाने की कोई आवश्यकता नहीं है, जिससे धुएं का उत्सर्जन नगण्य रहता है और ईंधन की बचत होती है।`;
      if (isPrice) return `${name} की अनुमानित शुरुआती कीमत ${price} है। थोक मूल्य, वारंटी और सीधा विक्रेता संपर्क प्राप्त करने के लिए 'Enquire Now' बटन पर क्लिक करें।`;
      if (isCut) return `${name} की कटाई चौड़ाई ${cutWidth} है। इसमें उच्च गुणवत्ता वाले स्टील ब्लेड दिए गए हैं जो फसल कटाई और घास सफाई के लिए उपयुक्त हैं।`;
      if (isGreeting) return `नमस्ते! मैं ${name} का AI उत्पाद सहायक हूँ। आप मुझसे इंजन, पावर, वजन या कीमत के बारे में हिंदी में कुछ भी पूछ सकते हैं!`;
      return `${name} की संपूर्ण जानकारी: इंजन डिप्लेसमेंट ${disp}, इंजन प्रकार ${eng}, अधिकतम पावर ${pwr}, और कुल वजन ${wt} है। यह 100% शुद्ध पेट्रोल पर चलने वाला एक शक्तिशाली और टिकाऊ ब्रश कटर है।`;
    }

    if (lang === "ta") {
      if (isPower) return `${name} இன் அதிகபட்ச ஆற்றல் வெளியீடு ${pwr} ஆகும். விவசாய பணிகளுக்கு மிகச் சிறந்தது.`;
      if (isDisp) return `${name} இன் எஞ்சின் கொள்ளளவு ${disp} ஆகும்.`;
      if (isWeight) return `${name} இன் மொத்த எடை ${wt} ஆகும். கையாளுவதற்கு மிகவும் எளிதானது.`;
      if (isEngine) return `${name} எஞ்சின் வகை ${eng} (${disp}) ஆகும். இது தூய்மையான பெட்ரோலில் இயங்குகிறது.`;
      if (isPrice) return `${name} இன் தோராயமான விலை ${price} ஆகும். தள்ளுபடி விவரங்களுக்கு 'Enquire Now' பயன்படுத்தவும்.`;
      if (isCut) return `${name} இன் வெட்டு/வேலை அகலம் ${cutWidth} ஆகும்.`;
      if (isGreeting) return `வணக்கம்! நான் ${name} இன் AI தயாரிப்பு உதவியாளர். எஞ்சின், பவர் மற்றும் விலை பற்றிய கேள்விகளைக் கேட்கலாம்!`;
      return `${name} விவரக்குறிப்புகள்: எஞ்சின் கொள்ளளவு ${disp}, வகை ${eng}, ஆற்றல் ${pwr}, எடை ${wt} ஆகும்.`;
    }

    // Default English
    if (isPower) return `The maximum power output of ${name} is ${pwr}, delivering high performance for demanding operations.`;
    if (isDisp) return `The engine displacement of ${name} is ${disp}.`;
    if (isWeight) return `The dry weight of ${name} is ${wt}, featuring a light and balanced ergonomic design.`;
    if (isEngine) return `${name} is powered by a ${eng} engine (${disp}). Operates cleanly on pure petrol with no oil mixing required.`;
    if (isPrice) return `The estimated starting price for ${name} is ${price}. You can click 'Enquire Now' for wholesale quotation details.`;
    if (isCut) return `The cutting/working width of ${name} is ${cutWidth} equipped with heavy-duty steel blades.`;
    if (isGreeting) return `Hello! I am your AI Product Assistant for ${name}. Feel free to ask me anything about engine specs, power output, weight, or pricing!`;

    return `${name} Specifications: Engine ${eng}, Displacement ${disp}, Max Power Output ${pwr}, and Weight ${wt}. Pure petrol operation with high fuel efficiency.`;
  };

  const handleHoloVoiceQuerySubmit = (queryText: string) => {
    if (!queryText.trim() || !hologramProduct) return;
    const q = queryText.trim();
    setHoloUserQuery("");
    setHoloActiveTab("chat");
    setHoloAiHistory((prev) => [...prev, { sender: "user", text: q }]);

    setTimeout(() => {
      if (!hologramProduct) return;
      const answer = getSmartAiAnswer(hologramProduct, q, holoAiLang);
      setHoloAiHistory((prev) => [...prev, { sender: "ai", text: answer }]);
      speakTTS(answer, holoAiLang);
    }, 300);
  };

  const handleStartVoiceListening = (lang: "en" | "hi" | "ta", onResult: (text: string) => void) => {
    if (typeof window === "undefined") return;
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser. Please type your question in the text box.");
      return;
    }
    try {
      const recognition = new SpeechRecognition();
      recognition.lang = lang === "ta" ? "ta-IN" : lang === "hi" ? "hi-IN" : "en-US";
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;
      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0]?.[0]?.transcript;
        if (transcript) {
          onResult(transcript);
        }
      };
      recognition.start();
    } catch (err) {
      console.error("Speech recognition error:", err);
      setIsListening(false);
    }
  };

  // Dynamic products list synced with Super Admin localStorage
  const [productsList, setProductsList] = useState<ProductItem[]>(PRODUCTS_DATA);

  // Dynamic available categories including newly added custom categories
  const availableCategories = useMemo(() => {
    const cats = new Set(["All", ...CATEGORIES.filter((c) => c !== "All")]);
    productsList.forEach((p) => {
      if (p.category) cats.add(p.category);
    });
    return Array.from(cats);
  }, [productsList]);

  const categoryType = useMemo(() => {
    const cat = (brochureData.category || "").toUpperCase();
    const name = (brochureData.name || "").toUpperCase();
    if (cat.includes("ELECTRONIC") || name.includes("SMARTPHONE") || name.includes("LAPTOP") || name.includes("WATCH") || name.includes("TV") || name.includes("EARBUDS")) return "ELECTRONICS";
    if (cat.includes("HOME") || cat.includes("KITCHEN") || cat.includes("REFRIGERATOR") || cat.includes("WASHING") || name.includes("REFRIGERATOR") || name.includes("OVEN") || name.includes("HEATER")) return "HOME_APPLIANCE";
    if (cat.includes("POWER TOOLS") || cat.includes("WASHER") || name.includes("DRILL") || name.includes("WASHER") || name.includes("COMPRESSOR")) return "POWER_TOOL";
    if (cat.includes("AUTOMOTIVE") || name.includes("SCOOTER")) return "AUTOMOTIVE";
    return "AGRICULTURE";
  }, [brochureData.name, brochureData.category]);

  // Check if current product is engine/power machinery vs general product/tool
  const isEngineProduct = useMemo(() => {
    const text = `${brochureData.name} ${brochureData.category}`.toLowerCase();
    return (
      text.includes("cutter") ||
      text.includes("weeder") ||
      text.includes("tiller") ||
      text.includes("engine") ||
      text.includes("motor") ||
      text.includes("generator") ||
      text.includes("pump") ||
      text.includes("tractor") ||
      text.includes("mower") ||
      text.includes("saw") ||
      text.includes("trimmer")
    );
  }, [brochureData.name, brochureData.category]);

  React.useEffect(() => {
    const loadProducts = async () => {
      let deletedIds: string[] = [];
      if (typeof window !== "undefined") {
        const deletedStored = localStorage.getItem("sellgrow_deleted_product_ids");
        if (deletedStored) {
          try { deletedIds = JSON.parse(deletedStored); } catch (e) {}
        }
      }

      try {
        const res = await fetch("/api/admin/products");
        if (res.ok) {
          const result = await res.json();
          if (result.status === "success" && Array.isArray(result.data) && result.data.length > 0) {
            const apiProducts = result.data.filter((p: any) => !deletedIds.includes(p.id) && !deletedIds.includes(p._id));
            if (apiProducts.length > 0) {
              setProductsList(apiProducts);
              return;
            }
          }
        }
      } catch (err) {
        // Expected on Hostinger static export (out/ folder)
      }

      if (typeof window !== "undefined") {
        const stored = localStorage.getItem("sellgrow_catalog_products");
        if (stored) {
          try {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed) && parsed.length > 0) {
              const customProducts = parsed.filter((p: ProductItem) => !deletedIds.includes(p.id));
              if (customProducts.length > 0) {
                setProductsList(customProducts);
                return;
              }
            }
          } catch (e) {}
        }
      }

      const filteredDefault = PRODUCTS_DATA.filter(defaultItem => !deletedIds.includes(defaultItem.id));
      setProductsList(filteredDefault);
    };

    loadProducts();

    if (typeof window !== "undefined") {
      window.addEventListener("storage", loadProducts);
      return () => window.removeEventListener("storage", loadProducts);
    }
  }, []);

  // Filtered Products list
  const filteredProducts = useMemo(() => {
    return productsList.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.brand.toLowerCase().includes(searchQuery.toLowerCase());

      const itemBrand = (item.brand || "").toLowerCase();
      const itemName = (item.name || "").toLowerCase();

      const matchesCompany =
        selectedCompany === "All"
          ? true
          : selectedCompany === "George Maijo Equipment"
          ? itemBrand.includes("george maijo") || /maijo|bc\s?\d|wm\s?\d|wanovax|mahaveer|5pr|7pr|ktm/i.test(itemName)
          : selectedCompany === "NOMO"
          ? itemBrand.includes("nomo") || /olive|oil|rice|basmati|avocado|bread|sourdough|coffee|milk|dairy|produce|bakery|beverages|grains/i.test(itemName) || /oils|grains|produce|bakery|beverages|dairy/i.test(item.category || "")
          : selectedCompany === "Apex Logistics Ltd."
          ? itemBrand.includes("apex") || /apex|logistics|freight/i.test(itemName)
          : selectedCompany === "GreenField Agri Farms"
          ? itemBrand.includes("greenfield") || /greenfield|soil|drone/i.test(itemName)
          : true;

      return matchesCategory && matchesSearch && matchesCompany;
    });
  }, [productsList, selectedCategory, searchQuery, selectedCompany]);

  // Open Detail View for a product (Image 3) & sync URL search parameters
  const openProductDetail = (product: ProductItem) => {
    setActiveProduct(product);
    setViewMode("detail");
    setActiveTab("description");
    setFormSubmitted(false);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("product", product.id);
      window.history.pushState({ productId: product.id }, "", url.toString());
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Back to Catalog Grid View & clear product URL parameter
  const backToCatalog = () => {
    setViewMode("catalog");
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.delete("product");
      url.searchParams.delete("id");
      window.history.pushState({}, "", url.toString());
    }
  };

  // Sync active product state from URL query parameter on page load & browser navigation (back/forward)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleUrlSync = () => {
        const params = new URLSearchParams(window.location.search);
        const prodId = params.get("product") || params.get("id");
        if (prodId) {
          const found = productsList.find(
            (p) =>
              p.id === prodId ||
              p.id.toLowerCase() === prodId.toLowerCase() ||
              p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") === prodId.toLowerCase()
          );
          if (found) {
            setActiveProduct(found);
            setViewMode("detail");
          }
        }
      };

      handleUrlSync();
      window.addEventListener("popstate", handleUrlSync);
      return () => window.removeEventListener("popstate", handleUrlSync);
    }
  }, [productsList]);

  // Open AI Voice Modal
  const openVoiceAssistant = (e: React.MouseEvent, product: ProductItem) => {
    e.stopPropagation();
    setVoiceModelProduct(product);
    const activeLang = voiceLang || (language === "ta" ? "ta" : "en");
    const greetingMsg = activeLang === "ta"
      ? (product.voiceGreeting?.ta || `வணக்கம்! நான் ${product.name} எஞ்சினின் AI உதவியாளர். உங்களுக்கு எப்படி உதவ முடியும்?`)
      : (product.voiceGreeting?.en || `Hello, I am the AI assistant for ${product.name}. How can I help you today?`);
    
    setAiHistory([
      { sender: "ai", text: greetingMsg },
    ]);
    setIsVoiceModalOpen(true);
    speakTTS(greetingMsg, activeLang);
  };

  // Open 3D Hologram Modal
  const open3DHologram = (e: React.MouseEvent, product: ProductItem) => {
    e.stopPropagation();
    setHologramProduct(product);
    setIsHologramPlaying(true);
    setIsHologramMuted(true);
    setIsHologramFullscreen(false);
    setHoloActiveTab("chat");
    setHoloAiHistory([
      { sender: "user", text: "What is the max power output?" },
      {
        sender: "ai",
        text: `The maximum power output of ${product.name} is: ${product.power || "1.0 kW @ 7000 RPM"}, delivering high performance for demanding operations.`
      }
    ]);
    setIs3DModalOpen(true);
  };

  const toggleHologramPlay = () => {
    if (hologramVideoRef.current) {
      if (isHologramPlaying) {
        hologramVideoRef.current.pause();
        setIsHologramPlaying(false);
      } else {
        hologramVideoRef.current.play();
        setIsHologramPlaying(true);
      }
    }
  };

  const toggleHologramMute = () => {
    if (hologramVideoRef.current) {
      hologramVideoRef.current.muted = !isHologramMuted;
      setIsHologramMuted(!isHologramMuted);
    }
  };

  const restartHologramVideo = () => {
    if (hologramVideoRef.current) {
      hologramVideoRef.current.currentTime = 0;
      hologramVideoRef.current.play();
      setIsHologramPlaying(true);
    }
  };

  const handleConnectHolo = () => {
    setIsHoloDeviceModalOpen(true);
  };

  const handleStartHoloSync = () => {
    if (isHoloConnected) return;
    setIsHoloConnecting(true);
    setTimeout(() => {
      setIsHoloConnecting(false);
      setIsHoloConnected(true);
    }, 1500);
  };


  // ElevenLabs High-Quality AI Voice Speech Synthesis API
  const ELEVENLABS_API_KEY = "sk_9jtvje5b_yKGPv0mxsDyHWjlqbieW8bAx";
  const ELEVENLABS_VOICE_ID = "21m00Tcm4TlvDq8ikWAM"; // Rachel / Multilingual AI Voice

  const activeAudioRef = React.useRef<HTMLAudioElement | null>(null);

  const stopTTS = () => {
    if (activeAudioRef.current) {
      try {
        activeAudioRef.current.pause();
        activeAudioRef.current.currentTime = 0;
      } catch (e) {}
      activeAudioRef.current = null;
    }
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  };

  const speakTTS = async (text: string, lang: "en" | "ta" | string = "en") => {
    if (!text) return;
    stopTTS();
    setIsSpeaking(true);

    try {
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${ELEVENLABS_VOICE_ID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "xi-api-key": ELEVENLABS_API_KEY,
        },
        body: JSON.stringify({
          text: text,
          model_id: "eleven_multilingual_v2",
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75,
          },
        }),
      });

      if (response.ok) {
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        activeAudioRef.current = audio;
        
        audio.onplay = () => setIsSpeaking(true);
        audio.onended = () => {
          setIsSpeaking(false);
          activeAudioRef.current = null;
        };
        audio.onerror = () => {
          setIsSpeaking(false);
          activeAudioRef.current = null;
          fallbackBrowserTTS(text, lang);
        };

        audio.play().catch(() => fallbackBrowserTTS(text, lang));
        return;
      } else {
        fallbackBrowserTTS(text, lang);
      }
    } catch (err) {
      console.warn("ElevenLabs Voice Synthesis error:", err);
      fallbackBrowserTTS(text, lang);
    }
  };

  const prepareTextForSpeech = (text: string, lang: string): string => {
    let s = text;
    if (lang === "hi") {
      s = s.replace(/@\s*7000\s*RPM/gi, "7000 आरपीएम पर");
      s = s.replace(/@\s*3600\s*RPM/gi, "3600 आरपीएम पर");
      s = s.replace(/1\.0\s*kW\s*\/\s*1\.4\s*HP/gi, "1.4 एचपी पावर");
      s = s.replace(/5\.2\s*kW\s*\/\s*7\.0\s*HP/gi, "7.0 एचपी पावर");
      s = s.replace(/35\.8\s*cc/gi, "35.8 सीसी");
      s = s.replace(/212\s*cc/gi, "212 सीसी");
      s = s.replace(/7\.8\s*kg/gi, "7.8 किलोग्राम");
      s = s.replace(/88\s*kg/gi, "88 किलोग्राम");
      s = s.replace(/4-Stroke/gi, "चार स्ट्रोक");
      s = s.replace(/OHC Air-Cooled/gi, "एयर कूल्ड");
      s = s.replace(/[@\/\\_#\*\+\=]/g, " ");
    } else if (lang === "ta") {
      s = s.replace(/@\s*7000\s*RPM/gi, "7000 ஆர்பிஎம் இல்");
      s = s.replace(/1\.0\s*kW\s*\/\s*1\.4\s*HP/gi, "1.4 எச்பி ஆற்றல்");
      s = s.replace(/35\.8\s*cc/gi, "35.8 சிசி");
      s = s.replace(/7\.8\s*kg/gi, "7.8 கிலோ");
      s = s.replace(/4-Stroke/gi, "நான்கு கட்ட");
      s = s.replace(/[@\/\\_#\*\+\=]/g, " ");
    } else {
      s = s.replace(/@\s*7000\s*RPM/gi, "at 7000 RPM");
      s = s.replace(/1\.0\s*kW\s*\/\s*1\.4\s*HP/gi, "1.4 horsepower");
      s = s.replace(/35\.8\s*cc/gi, "35.8 CC");
      s = s.replace(/7\.8\s*kg/gi, "7.8 kilograms");
      s = s.replace(/[@\/\\_#\*\+\=]/g, " ");
    }
    return s.replace(/\s+/g, " ").trim();
  };

  const fallbackBrowserTTS = (text: string, lang: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const cleanText = prepareTextForSpeech(text, lang);
      const utterance = new SpeechSynthesisUtterance(cleanText);
      const targetLang = lang === "hi" ? "hi-IN" : lang === "ta" ? "ta-IN" : "en-US";
      utterance.lang = targetLang;
      utterance.rate = 0.92;
      utterance.pitch = 1.0;

      const voices = window.speechSynthesis.getVoices();
      if (voices && voices.length > 0) {
        let voice = null;
        if (lang === "hi") {
          voice = voices.find(v => (v.lang && v.lang.includes("hi")) || (v.name && (v.name.includes("Hindi") || v.name.includes("hi-IN") || v.name.includes("Hemant") || v.name.includes("Swara"))));
        } else if (lang === "ta") {
          voice = voices.find(v => (v.lang && v.lang.includes("ta")) || (v.name && (v.name.includes("Tamil") || v.name.includes("ta-IN") || v.name.includes("Valluvar"))));
        } else {
          voice = voices.find(v => (v.lang && v.lang.includes("en")) && (v.name.includes("Google") || v.name.includes("Natural") || v.name.includes("Online") || v.name.includes("Samantha")));
        }
        if (voice) {
          utterance.voice = voice;
        }
      }

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setIsSpeaking(false);
    }
  };

  const handleSendVoiceQuery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuery.trim() || !voiceModelProduct) return;
    const q = userQuery.trim();
    setUserQuery("");
    const newHistory = [...aiHistory, { sender: "user" as const, text: q }];
    setAiHistory(newHistory);

    setTimeout(() => {
      if (!voiceModelProduct) return;
      const reply = getSmartAiAnswer(voiceModelProduct, q, voiceLang);
      setAiHistory((prev) => [...prev, { sender: "ai", text: reply }]);
      speakTTS(reply, voiceLang);
    }, 300);
  };

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  // Main Page Render
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-100 dark:bg-[#070c14] text-foreground font-sans pb-16 transition-colors duration-300">

      {/* ── PREMIUM HERO BANNER ── */}
      <header className="relative bg-gradient-to-r from-[#0f1f5c] via-indigo-800 to-[#065535] text-white overflow-hidden">
        {/* Animated grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0d_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0d_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />
        {/* Radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(99,102,241,0.25),transparent)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
          <div className="text-center space-y-3">
            {/* Breadcrumb */}
            <div className="flex items-center justify-center gap-2 text-xs font-semibold text-sky-200/80">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5 text-white/40" />
              <span className="text-white font-bold">Products</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-white drop-shadow-lg">
              Products Catalog
            </h1>
            <p className="text-sm text-sky-100/80 max-w-xl mx-auto leading-relaxed">
              Browse machinery, equipment & supplies across all verified company stores on SellGrow.
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              {[
                { icon: <Box className="w-4 h-4" />, label: `${productsList.length}+ Products` },
                { icon: <ShieldCheck className="w-4 h-4" />, label: "4 Verified Stores" },
                { icon: <Layers className="w-4 h-4" />, label: `${availableCategories.length - 1} Categories` },
                { icon: <Zap className="w-4 h-4" />, label: "AI Voice Enabled" },
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-bold text-white backdrop-blur-sm">
                  <span className="text-sky-300">{stat.icon}</span>
                  {stat.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">

        {/* ======================================================== */}
        {/* VIEW 1: CATALOG GRID VIEW                                 */}
        {/* ======================================================== */}
        {viewMode === "catalog" && (
          <div className="space-y-6">

            {/* ── SECTION 1: STORE SELECTOR ── */}
            <div className="space-y-4">

              {/* Section Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-extrabold uppercase tracking-wider text-foreground font-display flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-primary/10 text-primary text-base">🏢</span>
                    Registered Company Stores & Master Catalogs
                  </h2>
                  <p className="text-xs text-muted-foreground mt-0.5 pl-8">
                    Select a client company to view its products and machinery catalog.
                  </p>
                </div>
                {selectedCompany !== "All" && (
                  <button
                    onClick={() => setSelectedCompany("All")}
                    className="text-xs text-primary font-bold hover:underline flex items-center gap-1 shrink-0"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    View All Companies
                  </button>
                )}
              </div>

              {/* ── Company Pill Tabs Row ── */}
              <div className="flex flex-wrap items-center gap-2 bg-white dark:bg-[#0c1322] p-2 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                {[
                  { id: "All", name: "All Stores", icon: "🏢", count: productsList.length },
                  { id: "George Maijo Equipment", name: "George Maijo Equipment", icon: "🌿", count: 17 },
                  { id: "NOMO", name: "NOMO Retail & Fleet", icon: "🛒", count: 21 },
                  { id: "Apex Logistics Ltd.", name: "Apex Logistics", icon: "🚚", count: 8 },
                  { id: "GreenField Agri Farms", name: "GreenField Agri", icon: "🌾", count: 14 },
                ].map((comp) => (
                  <button
                    key={comp.id}
                    onClick={() => setSelectedCompany(comp.id)}
                    className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all duration-200 flex items-center gap-2 ${
                      selectedCompany === comp.id
                        ? "bg-gradient-to-r from-primary to-indigo-600 text-white shadow-lg shadow-primary/25 scale-[1.02]"
                        : "bg-slate-50 dark:bg-slate-800/70 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700/60 hover:border-primary/30"
                    }`}
                  >
                    <span className="text-base leading-none">{comp.icon}</span>
                    <span className="hidden sm:inline">{comp.name}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-bold ${
                      selectedCompany === comp.id ? "bg-white/20 text-white" : "bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400"
                    }`}>
                      {comp.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* ── All Stores: Company Cards Grid ── */}
              {selectedCompany === "All" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    {
                      id: "George Maijo Equipment",
                      name: "George Maijo Equipment",
                      desc: "Superadmin Master Store — Agriculture Machinery, Brush Cutters & Power Weeders Fleet.",
                      icon: "🌿",
                      badge: "Superadmin Store",
                      badgeColor: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
                      count: 17,
                      categories: "Brush Cutter · Power Weeder · Tiller",
                    },
                    {
                      id: "NOMO",
                      name: "NOMO Retail & Fleet",
                      desc: "Client Tenant Store — Retail Grocery Products & Agricultural Machinery Rentals.",
                      icon: "🛒",
                      badge: "Client Company",
                      badgeColor: "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/20",
                      count: 21,
                      categories: "Grocery · Produce · Machinery",
                    },
                    {
                      id: "Apex Logistics Ltd.",
                      name: "Apex Logistics Store",
                      desc: "Commercial Distribution Partner — Heavy Transport & Freight Equipment.",
                      icon: "🚚",
                      badge: "Verified Partner",
                      badgeColor: "bg-violet-500/15 text-violet-600 dark:text-violet-400 border-violet-500/20",
                      count: 8,
                      categories: "Freight · Transport · Logistics",
                    },
                  ].map((card) => (
                    <div
                      key={card.id}
                      onClick={() => setSelectedCompany(card.id)}
                      className="group relative p-5 rounded-2xl bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-slate-800 hover:border-primary/40 dark:hover:border-primary/30 cursor-pointer transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col gap-4 overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/[0.03] group-hover:to-indigo-500/[0.04] transition-all duration-300 pointer-events-none rounded-2xl" />

                      <div className="flex items-start justify-between gap-3 relative z-10">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 border border-slate-200 dark:border-slate-700 text-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300">
                          {card.icon}
                        </div>
                        <span className={`text-[10px] font-extrabold uppercase tracking-wide px-2.5 py-1 rounded-full border ${card.badgeColor}`}>
                          {card.badge}
                        </span>
                      </div>

                      <div className="relative z-10 flex-1">
                        <h3 className="text-sm font-extrabold text-foreground font-display group-hover:text-primary dark:group-hover:text-sky-400 transition-colors leading-snug">
                          {card.name}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed line-clamp-2">{card.desc}</p>
                        <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-2 font-medium">{card.categories}</p>
                      </div>

                      <div className="relative z-10 pt-3 border-t border-slate-100 dark:border-slate-800/70 flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className="inline-flex items-center justify-center w-5 h-5 rounded-md bg-primary/10 text-primary">
                            <Box className="w-3 h-3" />
                          </span>
                          <span className="text-xs font-bold text-foreground">{card.count} Products</span>
                        </div>
                        <span className="text-xs font-extrabold text-primary dark:text-sky-400 flex items-center gap-1 group-hover:gap-2 transition-all">
                          Explore <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* ── Active Company Banner ── */}
              {selectedCompany !== "All" && (
                <div className="relative overflow-hidden p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-[#0d1730] to-indigo-950 text-white border border-slate-700/50 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
                  <div className="flex items-center gap-4 relative z-10">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/15 text-2xl flex items-center justify-center shadow-lg backdrop-blur-sm shrink-0">
                      {selectedCompany === "George Maijo Equipment" ? "🌿" : selectedCompany === "NOMO" ? "🛒" : selectedCompany === "GreenField Agri Farms" ? "🌾" : "🚚"}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-base font-extrabold font-display text-white">{selectedCompany} Catalog</h3>
                        <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          ✓ Verified Store
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 mt-0.5">
                        <span className="text-emerald-400 font-bold">{filteredProducts.length}</span> live products synced for <strong className="text-white">{selectedCompany}</strong>
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedCompany("All")}
                    className="relative z-10 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold border border-white/15 backdrop-blur-sm transition-all active:scale-95 shrink-0 flex items-center gap-2"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                    Switch Store
                  </button>
                </div>
              )}
            </div>

            {/* ── SECTION 2: FILTER & SEARCH BAR ── */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-white dark:bg-[#0c1322] p-3 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center gap-2 px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/60 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 shadow-sm min-w-[180px]">
                <Filter className="w-3.5 h-3.5 text-primary shrink-0" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-transparent font-bold text-slate-700 dark:text-slate-200 focus:outline-none cursor-pointer flex-1 text-xs"
                >
                  {availableCategories.map((cat) => (
                    <option key={cat} value={cat} className="bg-white dark:bg-slate-900 text-foreground">
                      {cat}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              </div>

              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search catalog models, brands..."
                  className="w-full pl-10 pr-9 py-2.5 bg-slate-50 dark:bg-slate-800/70 text-xs rounded-xl border border-slate-200 dark:border-slate-700/60 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all text-foreground placeholder:text-slate-400"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors">
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="hidden sm:flex items-center gap-1.5 px-3 py-2.5 bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/60 rounded-xl text-xs text-slate-500 dark:text-slate-400 font-medium shrink-0">
                <Layers className="w-3.5 h-3.5" />
                <span><span className="font-bold text-foreground">{filteredProducts.length}</span> results</span>
              </div>

              <button
                onClick={handleOpenAddBrochure}
                className="px-5 py-2.5 bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-600/90 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-primary/20 active:scale-95 shrink-0"
                title="Add or Download Product Brochure PDF"
              >
                <FilePlus className="w-4 h-4" />
                <span>Add Brochure</span>
              </button>
            </div>

            {/* ── SECTION 3: PRODUCT GRID (Always Visible) ── */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-white dark:bg-[#0c1322] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto">
                  <Box className="w-8 h-8 text-slate-400" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground">No Products Found</h3>
                  <p className="text-xs text-muted-foreground mt-1">Try clearing search filters or selecting another category.</p>
                </div>
                <button
                  onClick={() => { setSelectedCategory("All"); setSearchQuery(""); }}
                  className="inline-flex items-center gap-2 px-5 py-2 bg-primary text-white rounded-xl text-xs font-bold hover:bg-primary/90 transition-colors shadow-md shadow-primary/20 active:scale-95"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  Reset Filters
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-1 h-5 rounded-full bg-gradient-to-b from-primary to-secondary inline-block" />
                    <h2 className="text-sm font-extrabold text-foreground font-display">
                      {selectedCompany === "All" ? "All Products" : `${selectedCompany} Products`}
                    </h2>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-bold font-mono">{filteredProducts.length}</span>
                  </div>
                  {selectedCategory !== "All" && (
                    <span className="text-xs text-muted-foreground">Filtered by: <strong className="text-foreground">{selectedCategory}</strong></span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                  {filteredProducts.map((product) => {
                    const isHovered = hoveredProductId === product.id;
                    return (
                      <div
                        key={product.id}
                        onClick={() => openProductDetail(product)}
                        onMouseEnter={() => setHoveredProductId(product.id)}
                        onMouseLeave={() => setHoveredProductId(null)}
                        className={`group relative bg-white dark:bg-[#0c1322] border rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 flex flex-col ${
                          isHovered
                            ? "border-primary/60 dark:border-primary/50 shadow-[0_8px_30px_rgba(37,99,235,0.18)] -translate-y-1"
                            : "border-slate-200 dark:border-slate-800/80 shadow-sm hover:shadow-md"
                        }`}
                      >
                        <div className="relative w-full aspect-square bg-gradient-to-br from-slate-50 to-slate-100 dark:from-[#0a0f1d] dark:to-[#0f172a] overflow-hidden flex items-center justify-center p-4">
                          <div className="absolute top-3 left-3 z-20">
                            <span className="px-2.5 py-1 rounded-full text-[9px] font-extrabold uppercase tracking-wider bg-gradient-to-r from-primary to-indigo-600 text-white shadow-md">
                              {product.category}
                            </span>
                          </div>

                          <div className={`absolute top-3 right-3 z-20 flex flex-col gap-1.5 transition-all duration-200 ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1 pointer-events-none"}`}>
                            <button
                              onClick={(e) => openVoiceAssistant(e, product)}
                              title="Ask AI Voice Assistant"
                              className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-primary/30 hover:scale-110 transition-transform active:scale-95"
                            >
                              <Mic className="w-3.5 h-3.5 stroke-[2.3]" />
                            </button>
                            <button
                              onClick={(e) => open3DHologram(e, product)}
                              title="3D Hologram View"
                              className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-sky-500 text-white flex items-center justify-center shadow-lg shadow-indigo-500/30 hover:scale-110 transition-transform active:scale-95"
                            >
                              <Hologram3DIcon className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="relative z-10 w-full h-full flex items-center justify-center">
                            {product.image && !failedImages[product.id] ? (
                              <img
                                src={product.image}
                                alt={product.name}
                                onError={() => setFailedImages((prev) => ({ ...prev, [product.id]: true }))}
                                className={`max-h-full max-w-full object-contain drop-shadow-xl transition-transform duration-500 ${isHovered ? "scale-110" : "scale-100"}`}
                              />
                            ) : (
                              <ProductGraphic product={product} is3DHover={isHovered} />
                            )}
                          </div>

                          <div className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary via-indigo-500 to-secondary transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`} />
                        </div>

                        <div className="p-4 flex flex-col gap-3 flex-1">
                          <div className="flex-1">
                            <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block">
                              {product.brand}
                            </span>
                            <h3 className={`text-sm font-extrabold font-display mt-0.5 leading-snug transition-colors duration-200 line-clamp-2 ${isHovered ? "text-primary dark:text-sky-400" : "text-foreground"}`}>
                              {product.name}
                            </h3>
                            {product.shortDesc && (
                              <p className="text-[11px] text-muted-foreground mt-1 line-clamp-1 leading-relaxed">
                                {product.shortDesc}
                              </p>
                            )}
                          </div>

                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* VIEW 2: PRODUCT DETAIL VIEW (EXACT MATCH TO IMAGE 3) */}
        {/* ======================================================== */}
        {viewMode === "detail" && activeProduct && (
          <div className="space-y-6">

            {/* Back Button */}
            <button
              onClick={backToCatalog}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 transition-colors shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Catalog Grid
            </button>

            {/* Main Detail Layout: Left Sidebar + Right Content Area (Image 3) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

              {/* LEFT SIDEBAR: ALL PRODUCTS LIST (IMAGE 3 LEFT COL) */}
              <div className="lg:col-span-3 bg-white dark:bg-[#0b111e] rounded-2xl border border-slate-200 dark:border-slate-800 p-4 space-y-4 shadow-sm max-h-[85vh] overflow-y-auto">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <ListFilter className="w-4 h-4 text-emerald-600" />
                    <h4 className="text-xs font-bold uppercase tracking-wider text-foreground font-display">
                      {selectedCompany === "All" ? "All Products List" : `${selectedCompany} Products`}
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 font-bold">
                    {filteredProducts.length}
                  </span>
                </div>

                {/* Sidebar Search */}
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search catalog models..."
                    className="w-full pl-8 pr-3 py-1.5 bg-slate-100 dark:bg-slate-900 text-xs rounded-xl border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                {/* Categorized List dynamically built for active company */}
                <div className="space-y-4 text-xs">
                  {Array.from(new Set(filteredProducts.map((p) => p.category))).map((cat) => {
                    const catItems = filteredProducts.filter((p) => p.category === cat);
                    if (catItems.length === 0) return null;

                    return (
                      <div key={cat} className="space-y-1.5">
                        <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block px-2">
                          {cat}
                        </span>
                        <div className="space-y-1">
                          {catItems.map((item) => {
                            const isSelected = activeProduct?.id === item.id;
                            return (
                              <button
                                key={item.id}
                                onClick={() => openProductDetail(item)}
                                className={`w-full flex items-center gap-2 text-left px-3 py-2 rounded-xl transition-all ${
                                  isSelected
                                    ? "bg-emerald-50 dark:bg-emerald-950/60 border-l-4 border-emerald-500 text-emerald-700 dark:text-emerald-400 font-bold"
                                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60"
                                }`}
                              >
                                <div className="w-6 h-6 rounded bg-slate-200 dark:bg-slate-800 flex items-center justify-center shrink-0">
                                  <Box className="w-3.5 h-3.5 text-emerald-600" />
                                </div>
                                <span className="truncate text-xs font-semibold">{item.name}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* RIGHT CONTENT AREA: MAIN DETAIL + TABS + ENQUIRY FORM (IMAGE 3 RIGHT COL) */}
              <div className="lg:col-span-9 space-y-6">

                {/* TOP MAIN PRODUCT SPEC CARD */}
                <div className="bg-white dark:bg-[#0c1220] rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  
                  {/* Image Preview Box */}
                  <div className="md:col-span-5 relative w-full aspect-[4/3] bg-slate-50 dark:bg-[#070b14] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 flex items-center justify-center p-3">
                    <div className="absolute top-3 left-3 z-10">
                      <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase bg-emerald-600 text-white">
                        {activeProduct.category}
                      </span>
                    </div>

                    {activeProduct.image && !failedImages[activeProduct.id] ? (
                      <img
                        src={activeProduct.image}
                        alt={activeProduct.name}
                        onError={() => setFailedImages((prev) => ({ ...prev, [activeProduct.id]: true }))}
                        className="w-full h-full object-contain p-2 drop-shadow-xl"
                      />
                    ) : (
                      <ProductGraphic product={activeProduct} />
                    )}
                  </div>

                  {/* Product Details & Actions */}
                  <div className="md:col-span-7 space-y-4">
                    <div>
                      <span className="text-[11px] font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block">
                        {activeProduct.brand}
                      </span>
                      <h2 className="text-2xl font-extrabold text-foreground font-display mt-0.5">
                        {activeProduct.name}
                      </h2>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {activeProduct.fullDesc || activeProduct.description || activeProduct.shortDesc}
                    </p>

                    {/* Action CTAs: AI Demo & Book the Slot Buttons */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2 w-full">
                      <button
                        onClick={(e) => handleStartAIDemo(e, activeProduct)}
                        className="w-full h-12 px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-2xl text-xs sm:text-sm font-extrabold shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2.5 transition-all active:scale-95 cursor-pointer"
                      >
                        <Sparkles className="w-4.5 h-4.5 text-white shrink-0" />
                        <span>AI Demo</span>
                      </button>

                      <button
                        onClick={() => openSlotBookingModal(activeProduct)}
                        className="w-full h-12 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl text-xs sm:text-sm font-extrabold shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2.5 transition-all active:scale-95 cursor-pointer"
                      >
                        <Calendar className="w-4.5 h-4.5 shrink-0" />
                        <span>Book the Slot</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* TABBED DETAILS BOX (IMAGE 3 MIDDLE) */}
                <div className="bg-white dark:bg-[#0c1220] rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
                  
                  {/* Tab Navigation */}
                  <div className="flex border-b border-slate-200 dark:border-slate-800 gap-6 text-xs font-bold">
                    <button
                      onClick={() => setActiveTab("description")}
                      className={`pb-3 border-b-2 transition-colors ${
                        activeTab === "description"
                          ? "border-emerald-600 text-emerald-600 dark:text-emerald-400 font-extrabold"
                          : "border-transparent text-slate-500 hover:text-slate-900"
                      }`}
                    >
                      Description
                    </button>
                    <button
                      onClick={() => setActiveTab("specifications")}
                      className={`pb-3 border-b-2 transition-colors ${
                        activeTab === "specifications"
                          ? "border-emerald-600 text-emerald-600 dark:text-emerald-400 font-extrabold"
                          : "border-transparent text-slate-500 hover:text-slate-900"
                      }`}
                    >
                      Specifications
                    </button>
                    <button
                      onClick={() => setActiveTab("related")}
                      className={`pb-3 border-b-2 transition-colors ${
                        activeTab === "related"
                          ? "border-emerald-600 text-emerald-600 dark:text-emerald-400 font-extrabold"
                          : "border-transparent text-slate-500 hover:text-slate-900"
                      }`}
                    >
                      Related Models
                    </button>
                  </div>

                  {/* Tab 1: Description */}
                  {activeTab === "description" && (
                    <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      <p>{activeProduct.fullDesc || activeProduct.description || activeProduct.shortDesc}</p>
                      <h4 className="font-extrabold text-foreground text-sm pt-2">Key Highlights:</h4>
                      <div className="space-y-2">
                        {(activeProduct.highlights || [
                          "High-efficiency commercial grade performance",
                          "Heavy-duty reinforced alloy gear case",
                          "Low vibration ergonomically balanced handle",
                          "ISO 9001 certified George Maijo quality assurance"
                        ]).map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tab 2: Specifications Table */}
                  {activeTab === "specifications" && (
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs text-left border-collapse">
                        <tbody>
                          {Object.entries(activeProduct.specs || {
                            "Model Name": activeProduct.name,
                            "Category": activeProduct.category,
                            "Brand": activeProduct.brand || "George Maijo Agri",
                            "Brochure PDF": activeProduct.brochure || "Available"
                          }).map(([key, val], idx) => (
                            <tr key={key} className={idx % 2 === 0 ? "bg-slate-50 dark:bg-slate-900/60" : "bg-white dark:bg-[#0c1220]"}>
                              <td className="p-3 font-bold text-foreground border-b border-slate-100 dark:border-slate-800 w-1/3">{key}</td>
                              <td className="p-3 text-slate-600 dark:text-slate-300 border-b border-slate-100 dark:border-slate-800">{val}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Tab 3: Related Models */}
                  {activeTab === "related" && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {PRODUCTS_DATA.filter((p) => p.category === activeProduct.category && p.id !== activeProduct.id).slice(0, 3).map((rel) => (
                        <div
                          key={rel.id}
                          onClick={() => openProductDetail(rel)}
                          className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 cursor-pointer hover:border-emerald-500 transition-all text-xs space-y-2"
                        >
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                            {rel.category}
                          </span>
                          <p className="font-bold">{rel.name}</p>
                          <p className="text-[11px] text-slate-400 line-clamp-1">{rel.shortDesc}</p>
                          <span className="text-[10px] text-emerald-600 font-semibold">View Specs →</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* ENQUIRY FORM BOX (IMAGE 3 BOTTOM) */}
                <div id="enquiry-form" className="bg-emerald-50/50 dark:bg-[#0a1612] rounded-3xl border border-emerald-500/30 p-6 shadow-sm space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-base font-extrabold text-foreground font-display">
                      Submit Product Enquiry Request
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Interested in the <strong className="text-emerald-700 dark:text-emerald-400">{activeProduct.name}</strong>? Send us your contact information and our regional expert will contact you with specs, price quotes, and delivery times.
                    </p>
                  </div>

                  {formSubmitted ? (
                    <div className="p-4 bg-emerald-600 text-white rounded-2xl text-xs font-bold flex items-center gap-3">
                      <CheckCircle2 className="w-6 h-6 shrink-0" />
                      <span>Thank you! Your enquiry for {activeProduct.name} has been submitted successfully. Our regional manager will call you within 24 hours.</span>
                    </div>
                  ) : (
                    <form onSubmit={handleEnquirySubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                          <label className="text-[11px] font-bold text-foreground block mb-1">Your Name *</label>
                          <input
                            type="text"
                            required
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:border-emerald-500"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-bold text-foreground block mb-1">Mobile Number *</label>
                          <input
                            type="tel"
                            required
                            placeholder="+91 98765 43210"
                            value={formData.mobile}
                            onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                            className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:border-emerald-500"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-bold text-foreground block mb-1">Email Address</label>
                          <input
                            type="email"
                            placeholder="name@domain.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:border-emerald-500"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-bold text-foreground block mb-1">Your Location *</label>
                          <input
                            type="text"
                            required
                            placeholder="City, State"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:border-emerald-500"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-md shadow-emerald-600/20 transition-transform active:scale-95"
                      >
                        Submit Request
                      </button>
                    </form>
                  )}
                </div>

              </div>

            </div>
          </div>
        )}

      </div>

      {/* ======================================================== */}
      {/* MODAL 0: 🛰️ CONNECTING TO HOLOGRAM FOR DEMO (5s Countdown) */}
      {/* ======================================================== */}
      {isHoloDemoConnecting && holoDemoTargetProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/92 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="relative w-full max-w-md bg-[#030712] text-white rounded-3xl border border-cyan-500/50 p-7 shadow-[0_0_90px_rgba(6,182,212,0.3)] space-y-6 text-center overflow-hidden">
            
            {/* Ambient Sci-Fi Pulsing Glow */}
            <div className="absolute -top-10 -left-10 w-48 h-48 bg-cyan-500/20 rounded-full blur-[70px] pointer-events-none" />
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-indigo-500/20 rounded-full blur-[70px] pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center space-y-4">
              {/* Spinning Holographic Projection Fan / Icon */}
              <div className="relative w-20 h-20 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-2 border-cyan-400/30 border-t-cyan-400 animate-spin" />
                <div className="absolute inset-2 rounded-full border-2 border-indigo-500/30 border-b-indigo-400 animate-spin [animation-duration:2s]" />
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 flex items-center justify-center shadow-[0_0_25px_rgba(6,182,212,0.4)]">
                  <Cast className="w-6 h-6 animate-pulse text-cyan-300" />
                </div>
              </div>

              <div>
                <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-cyan-500/15 text-cyan-300 border border-cyan-400/30 shadow-sm inline-block mb-2">
                  Spatial 3D Projection Sync
                </span>
                <h3 className="text-lg font-black text-white tracking-tight font-display">
                  Connecting to Hologram for Demo...
                </h3>
                <p className="text-xs text-cyan-300/80 mt-1 font-medium">
                  {holoDemoTargetProduct.name}
                </p>
              </div>

              {/* 5-Second Countdown Gauge */}
              <div className="w-full bg-slate-900/90 rounded-2xl border border-cyan-500/30 p-4 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                    Initializing 3D spatial stream...
                  </span>
                  <span className="text-cyan-400 font-extrabold text-base">{holoDemoCountdown}s</span>
                </div>

                <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-cyan-900/60">
                  <div 
                    className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 transition-all duration-1000 ease-linear rounded-full"
                    style={{ width: `${((5 - holoDemoCountdown) / 5) * 100}%` }}
                  />
                </div>
              </div>

              <p className="text-[11px] text-slate-400 italic">
                Launching 3D spatial demo in {holoDemoCountdown} seconds...
              </p>
            </div>

          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 1: 🎙️ ASK AI VOICE ASSISTANT MODAL */}
      {/* ======================================================== */}
      {isVoiceModalOpen && voiceModelProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-slate-950 text-white rounded-3xl border border-emerald-500/40 p-6 shadow-2xl space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Mic className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">AI Voice Assistant</h3>
                  <p className="text-[11px] text-emerald-400">{voiceModelProduct.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setIsVoiceModalOpen(false);
                    setIsTamilTrainingModalOpen(true);
                  }}
                  className="px-3 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 text-white font-extrabold rounded-xl text-[10px] flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
                  title="Train Voice AI with HuggingFace Dataset"
                >
                  <BrainCircuit className="w-3.5 h-3.5" />
                  <span>Train Tamil AI</span>
                </button>
                <button
                  onClick={() => {
                    setIsVoiceModalOpen(false);
                    if (typeof window !== "undefined" && "speechSynthesis" in window) {
                      window.speechSynthesis.cancel();
                    }
                  }}
                  className="p-1.5 text-slate-400 hover:text-white rounded-full hover:bg-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Language Switch */}
            <div className="flex items-center justify-between bg-slate-900 p-2 rounded-xl border border-slate-800 text-xs">
              <span className="text-slate-400 font-bold">Voice Language:</span>
              <div className="flex gap-1.5 flex-wrap">
                <button
                  onClick={() => {
                    setVoiceLang("en");
                    const enMsg = voiceModelProduct.voiceGreeting?.en || `Hello! The ${voiceModelProduct.name} features a 4-stroke pure petrol engine. Ask me anything!`;
                    setAiHistory([{ sender: "ai", text: enMsg }]);
                    speakTTS(enMsg, "en");
                  }}
                  className={`px-3 py-1.5 rounded-xl font-extrabold text-xs transition-all ${
                    voiceLang === "en"
                      ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/30"
                      : "bg-slate-800 text-slate-400 hover:text-white border border-slate-700"
                  }`}
                >
                  🇺🇸 English
                </button>
                <button
                  onClick={() => {
                    setVoiceLang("hi");
                    const hiMsg = `नमस्ते! मैं ${voiceModelProduct.name} का AI उत्पाद सहायक हूँ। इंजन, पावर या कीमत के बारे में पूछें!`;
                    setAiHistory([{ sender: "ai", text: hiMsg }]);
                    speakTTS(hiMsg, "hi");
                  }}
                  className={`px-3 py-1.5 rounded-xl font-extrabold text-xs transition-all ${
                    voiceLang === "hi"
                      ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/30"
                      : "bg-slate-800 text-slate-400 hover:text-white border border-slate-700"
                  }`}
                >
                  🇮🇳 हिंदी
                </button>
                <button
                  onClick={() => {
                    setVoiceLang("ta");
                    const taMsg = voiceModelProduct.voiceGreeting?.ta || `வணக்கம்! நான் ${voiceModelProduct.name} எஞ்சினின் AI உதவியாளர். உங்களுக்கு எப்படி உதவ முடியும்?`;
                    setAiHistory([{ sender: "ai", text: taMsg }]);
                    speakTTS(taMsg, "ta");
                  }}
                  className={`px-3 py-1.5 rounded-xl font-extrabold text-xs transition-all ${
                    voiceLang === "ta"
                      ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/30"
                      : "bg-slate-800 text-slate-400 hover:text-white border border-slate-700"
                  }`}
                >
                  🇮🇳 தமிழ்
                </button>
              </div>
            </div>

            {/* Live Conversation Window */}
            <div className="h-48 overflow-y-auto space-y-2 p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-xs">
              {aiHistory.map((h, i) => (
                <div key={i} className={`flex ${h.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`p-2.5 rounded-xl max-w-[85%] ${h.sender === "user" ? "bg-emerald-600 text-white" : "bg-slate-800 text-slate-200 border border-slate-700 flex items-start justify-between gap-2"}`}>
                    <span>{h.text}</span>
                    {h.sender === "ai" && (
                      <button
                        onClick={() => speakTTS(h.text, voiceLang)}
                        className="p-1 text-emerald-400 hover:text-white rounded transition-colors shrink-0"
                        title="Read Aloud"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Form with Mic Button */}
            <form onSubmit={handleSendVoiceQuery} className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={userQuery}
                  onChange={(e) => setUserQuery(e.target.value)}
                  placeholder={
                    voiceLang === "hi"
                      ? "प्रश्न पूछें: उदा. 'पावर क्या है?' या 'कीमत क्या है?'"
                      : voiceLang === "ta"
                      ? "கேள்வி தட்டச்சு செய்க: எ.கா. 'வணக்கம், எப்படி இருக்கிறீர்கள்?'"
                      : "Ask about specs, engine, power, or price..."
                  }
                  className="w-full pl-3 pr-9 py-2 bg-slate-900 text-white text-xs rounded-xl border border-slate-800 focus:outline-none focus:border-emerald-500 font-medium"
                />
                <button
                  type="button"
                  onClick={() =>
                    handleStartVoiceListening(voiceLang, (transcript) => {
                      setUserQuery(transcript);
                      const q = transcript.trim();
                      if (!q || !voiceModelProduct) return;
                      setUserQuery("");
                      setAiHistory((prev) => [...prev, { sender: "user", text: q }]);
                      setTimeout(() => {
                        if (!voiceModelProduct) return;
                        const reply = getSmartAiAnswer(voiceModelProduct, q, voiceLang);
                        setAiHistory((prev) => [...prev, { sender: "ai", text: reply }]);
                        speakTTS(reply, voiceLang);
                      }, 300);
                    })
                  }
                  className={`absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-lg transition-colors ${
                    isListening ? "bg-rose-500 text-white animate-pulse" : "text-slate-400 hover:text-emerald-400"
                  }`}
                  title="Click to speak your question"
                >
                  <Mic className="w-4 h-4" />
                </button>
              </div>
              <button type="submit" className="px-4 py-2 bg-emerald-500 text-white font-bold rounded-xl text-xs active:scale-95 cursor-pointer shrink-0">
                Send
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 2: 🔮 3D HOLOGRAM INTERACTIVE VIEWER MODAL (WHITE THEME STUDIO) */}
      {/* ======================================================== */}
      {is3DModalOpen && hologramProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/60 backdrop-blur-xl overflow-hidden animate-in fade-in duration-300">
          <div className="relative w-full max-w-7xl h-[92vh] bg-white text-slate-900 rounded-3xl border border-slate-200/90 p-4 sm:p-5 shadow-[0_25px_80px_rgba(0,0,0,0.18)] flex flex-col justify-between overflow-hidden">
            
            {/* Ambient Sci-Fi Light Soft Glow Background */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-400/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/10 rounded-full blur-[120px] pointer-events-none" />

            {/* Top Overlay Header Bar */}
            <div className="relative z-20 flex items-center justify-between pb-3 border-b border-slate-200/80">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 border border-cyan-200 flex items-center justify-center shadow-sm shrink-0">
                  <Sparkles className="w-5 h-5 animate-pulse text-cyan-600" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight font-display">
                    {hologramProduct.name}
                  </h3>
                  <p className="text-[11px] font-mono text-cyan-700 font-semibold">
                    3D Spatial Hologram Projection • 7000 RPM ENGINE SIM
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleConnectHolo}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 border shadow-sm active:scale-95 cursor-pointer ${
                    isHoloConnected
                      ? "bg-emerald-50 text-emerald-700 border-emerald-300 shadow-emerald-500/10"
                      : "bg-cyan-50 text-cyan-700 border-cyan-300 hover:bg-cyan-100 shadow-cyan-500/10"
                  }`}
                >
                  <Cast className={`w-3.5 h-3.5 ${isHoloConnected ? "text-emerald-600" : "text-cyan-600 animate-pulse"}`} />
                  <span>{isHoloConnected ? "Holo Connected" : "Connect Holo"}</span>
                </button>

                <button
                  onClick={() => setIs3DModalOpen(false)}
                  className="p-2 text-slate-500 hover:text-slate-900 rounded-xl bg-slate-100 hover:bg-rose-50 hover:text-rose-600 border border-slate-200 transition-all cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Main Workspace Body: 3D Hologram Stage (LEFT) + AI Panel (RIGHT EMPTY SPACE) */}
            <div className="relative z-10 flex-1 w-full h-full min-h-0 flex flex-col lg:flex-row items-stretch gap-4 mt-3 overflow-hidden">
              {/* 3D Hologram Stage (LEFT SIDE) */}
              <div className="relative flex-1 w-full h-full flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50 via-white to-slate-100/90 shadow-inner">
                {/* Subtle Grid Matrix Backdrop */}
                <div className="absolute inset-0 bg-[radial-gradient(#06b6d430_1px,transparent_1px)] bg-[size:22px_22px] pointer-events-none" />
                
                {/* Glowing Pedestal Floor (Oval Ring) */}
                <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-80 sm:w-[500px] h-16 rounded-[100%] border-2 border-dashed border-cyan-400 bg-cyan-400/10 shadow-[0_0_40px_rgba(6,182,212,0.25)] animate-pulse pointer-events-none" />

                {/* Corner Viewport Brackets */}
                <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-cyan-500 pointer-events-none" />
                <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-cyan-500 pointer-events-none" />
                <div className="absolute bottom-16 left-3 w-5 h-5 border-b-2 border-l-2 border-cyan-500 pointer-events-none" />
                <div className="absolute bottom-16 right-3 w-5 h-5 border-b-2 border-r-2 border-cyan-500 pointer-events-none" />

                {/* Top Left HUD Stats Badge */}
                <div className="absolute top-3.5 left-3.5 z-20 bg-slate-900/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-cyan-500/40 text-xs font-mono text-cyan-300 flex items-center gap-2 shadow-md">
                  <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
                  <span className="font-bold">HUD MATRIX • 360° WIREFRAME</span>
                </div>

                {/* Interactive Mouse & Touch Drag 360° Rotation Viewport Stage */}
                <div
                  onMouseDown={handleHologramMouseDown}
                  onMouseMove={handleHologramMouseMove}
                  onMouseUp={handleHologramMouseUp}
                  onMouseLeave={handleHologramMouseUp}
                  onTouchStart={handleHologramTouchStart}
                  onTouchMove={handleHologramTouchMove}
                  onTouchEnd={handleHologramTouchEnd}
                  className={`relative z-10 w-full flex-1 min-h-0 flex items-center justify-center p-4 select-none ${
                    isDraggingHologram ? "cursor-grabbing" : "cursor-grab"
                  }`}
                >
                  <div
                    className={`w-full h-full flex items-center justify-center transition-transform ${
                      isDraggingHologram ? "duration-0" : "duration-300"
                    } ${is360Rotating ? "animate-360-stage-orbit" : ""}`}
                    style={{
                      transform: !is360Rotating ? `perspective(1000px) rotateY(${dragRotationAngle}deg)` : undefined
                    }}
                  >
                    {hologramProduct.hologramVideo || hologramProduct.id === "gm-bc-358-4sp" || hologramProduct.name.toLowerCase().includes("bc 358 4sp") ? (
                      <video
                        ref={hologramVideoRef}
                        src={hologramProduct.hologramVideo || "/videos/remove_all_the_background.mp4"}
                        autoPlay
                        loop
                        muted={isHologramMuted}
                        playsInline
                        className="max-w-[65%] max-h-[65%] sm:max-w-[60%] sm:max-h-[60%] object-contain filter drop-shadow-[0_15px_35px_rgba(0,0,0,0.15)] pointer-events-none transition-all duration-300"
                      />
                    ) : (
                      <ProductGraphic product={hologramProduct} is3DHover={true} />
                    )}
                  </div>
                </div>

                {/* Floating Custom Control Bar at bottom of stage */}
                <div className="relative z-30 bg-white/95 backdrop-blur-2xl border-t border-slate-200 p-2.5 flex items-center justify-between shadow-lg shrink-0">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={toggleHologramPlay}
                      className="px-3.5 py-1.5 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl border border-cyan-400 transition-all flex items-center gap-1.5 text-xs font-extrabold shadow-md shadow-cyan-500/20 active:scale-95 cursor-pointer"
                      title={isHologramPlaying ? "Pause Model" : "Play Model"}
                    >
                      {isHologramPlaying ? <Pause className="w-4 h-4 text-white" /> : <Play className="w-4 h-4 text-white fill-white" />}
                      <span>{isHologramPlaying ? "Pause" : "Play"}</span>
                    </button>

                    <button
                      onClick={toggleHologramMute}
                      className={`px-3.5 py-1.5 rounded-xl border transition-all flex items-center gap-1.5 text-xs font-extrabold active:scale-95 cursor-pointer ${
                        !isHologramMuted
                          ? "bg-emerald-50 text-emerald-700 border-emerald-300 shadow-sm"
                          : "bg-slate-100 text-slate-600 border-slate-200 hover:text-slate-900"
                      }`}
                      title={isHologramMuted ? "Unmute Audio" : "Mute Audio"}
                    >
                      {!isHologramMuted ? <Volume2 className="w-4 h-4 text-emerald-600" /> : <VolumeX className="w-4 h-4" />}
                      <span>{!isHologramMuted ? "Audio ON" : "Muted"}</span>
                    </button>

                    <button
                      onClick={() => setIs360Rotating(!is360Rotating)}
                      className={`px-3.5 py-1.5 rounded-xl border transition-all flex items-center gap-1.5 text-xs font-extrabold active:scale-95 cursor-pointer ${
                        is360Rotating
                          ? "bg-indigo-50 text-indigo-700 border-indigo-300 shadow-sm"
                          : "bg-slate-100 text-slate-600 border-slate-200 hover:text-slate-900"
                      }`}
                      title="Toggle 360° Orbit View"
                    >
                      <RotateCw className={`w-4 h-4 ${is360Rotating ? "animate-spin text-indigo-600" : "text-slate-500"}`} />
                      <span>{is360Rotating ? "360° Orbit ON" : "360° Orbit OFF"}</span>
                    </button>
                  </div>

                  {/* AI Assistant Button Placed Directly inside Bottom Control Bar (Right Side) */}
                  <button
                    onClick={() => setIsHoloAiPanelOpen(!isHoloAiPanelOpen)}
                    className={`px-3.5 py-1.5 rounded-xl border backdrop-blur-md transition-all duration-300 flex items-center gap-2.5 shadow-md active:scale-95 cursor-pointer group ${
                      isHoloAiPanelOpen
                        ? "bg-slate-900 text-white border-cyan-400 shadow-cyan-500/30"
                        : "bg-slate-900/95 text-white border-cyan-400/60 hover:border-cyan-300 hover:bg-slate-900 shadow-cyan-500/20"
                    }`}
                    title={isHoloAiPanelOpen ? "Close AI Assistant" : "Open AI Voice Assistant & Chat"}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                      isSpeaking ? "bg-rose-500/20 text-rose-400 border border-rose-500/40" : "bg-cyan-500/20 text-cyan-400 border border-cyan-400/40"
                    }`}>
                      <Bot className={`w-3.5 h-3.5 ${isSpeaking ? "text-rose-400 animate-bounce" : "text-cyan-400 animate-pulse"}`} />
                    </div>
                    <div className="flex flex-col items-start text-left">
                      <span className="text-[10.5px] font-black uppercase tracking-wider bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent font-display">
                        {holoAiLang === "hi" ? "AI वॉइस सहायक" : holoAiLang === "ta" ? "AI குரல் உதவியாளர்" : "AI Assistant"}
                      </span>
                    </div>
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400 group-hover:rotate-12 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Side-by-Side Non-Overlapping AI Voice Assistant Panel on the Right */}
              {isHoloAiPanelOpen && (
                <div className="w-full lg:w-[360px] xl:w-[390px] shrink-0 h-full flex flex-col justify-between bg-white/95 backdrop-blur-2xl border border-slate-200/90 rounded-2xl p-4 shadow-lg text-slate-900 animate-in slide-in-from-right duration-300 space-y-3 overflow-hidden">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                    <div className="flex items-center gap-1.5">
                      <Sparkles className={`w-4 h-4 ${isSpeaking ? "text-cyan-600 animate-spin" : "text-cyan-600 animate-pulse"}`} />
                      <span className="text-xs font-black uppercase tracking-wider text-cyan-800 font-display">
                        {holoAiLang === "hi" ? "AI वॉइस असिस्टेंट" : holoAiLang === "ta" ? "AI குரல் உதவியாளர்" : "AI VOICE ASSISTANT"}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setHoloActiveTab("specs")}
                        className={`px-2.5 py-1 rounded-xl text-[10.5px] font-extrabold transition-all cursor-pointer ${
                          holoActiveTab === "specs"
                            ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20"
                            : "bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200"
                        }`}
                      >
                        {holoAiLang === "hi" ? "विवरण" : holoAiLang === "ta" ? "விவரங்கள்" : "Specs"}
                      </button>
                      <button
                        onClick={() => setHoloActiveTab("chat")}
                        className={`px-2.5 py-1 rounded-xl text-[10.5px] font-extrabold transition-all cursor-pointer relative ${
                          holoActiveTab === "chat"
                            ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20"
                            : "bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200"
                        }`}
                      >
                        {holoAiLang === "hi" ? "AI पूछें" : holoAiLang === "ta" ? "AI கேட்க" : "Ask AI"}
                      </button>
                      <button
                        onClick={() => setIsHoloAiPanelOpen(false)}
                        className="p-1 text-slate-500 hover:text-slate-900 rounded-lg bg-slate-100 hover:bg-rose-50 hover:text-rose-600 border border-slate-200 transition-colors cursor-pointer ml-1"
                        title="Close AI Assistant Panel"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Language Switcher Bar: English, Hindi, Tamil ONLY */}
                  <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200">
                    <button
                      onClick={() => handleHoloLangChange("en")}
                      className={`flex-1 py-1.5 px-2 rounded-lg font-extrabold text-[10.5px] transition-all cursor-pointer ${
                        holoAiLang === "en"
                          ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      🇺🇸 English
                    </button>

                    <button
                      onClick={() => handleHoloLangChange("hi")}
                      className={`flex-1 py-1.5 px-2 rounded-lg font-extrabold text-[10.5px] transition-all cursor-pointer ${
                        holoAiLang === "hi"
                          ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      🇮🇳 हिंदी
                    </button>

                    <button
                      onClick={() => handleHoloLangChange("ta")}
                      className={`flex-1 py-1.5 px-2 rounded-lg font-extrabold text-[10.5px] transition-all cursor-pointer ${
                        holoAiLang === "ta"
                          ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      🇮🇳 தமிழ்
                    </button>
                  </div>

                  {/* Main Content Area: Specs View vs Chat Stream View */}
                  {holoActiveTab === "specs" ? (
                    <div className="flex-1 flex flex-col justify-between space-y-3 min-h-0 overflow-y-auto">
                      {/* Specification Overview Display Box */}
                      <div className="p-3.5 bg-slate-50 rounded-xl border border-cyan-200 space-y-2.5 text-xs text-slate-800">
                        <p className="text-[12px] text-slate-700 leading-relaxed font-medium">
                          {getProductSpecsText(hologramProduct, holoAiLang)}
                        </p>
                        
                        <div className="grid grid-cols-2 gap-2 text-[11px] font-mono pt-2 border-t border-slate-200">
                          <span className="text-slate-500">
                            {holoAiLang === "hi" ? "डिप्लेसमेंट:" : holoAiLang === "ta" ? "எஞ்சின் கொள்ளளவு:" : "Displacement:"}{" "}
                            <strong className="text-slate-900 font-bold">{hologramProduct.displacement || "35.8 cc"}</strong>
                          </span>
                          <span className="text-slate-500">
                            {holoAiLang === "hi" ? "अधिकतम पावर:" : holoAiLang === "ta" ? "அதிகபட்ச ஆற்றல்:" : "Power:"}{" "}
                            <strong className="text-slate-900 font-bold">{hologramProduct.power || "1.4 HP"}</strong>
                          </span>
                        </div>
                      </div>

                      {/* Read Specs / Stop Voice Button */}
                      <button
                        onClick={() => {
                          if (isSpeaking) {
                            stopTTS();
                          } else {
                            speakTTS(getProductSpecsText(hologramProduct, holoAiLang), holoAiLang);
                          }
                        }}
                        className={`w-full py-2.5 px-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 shadow-md active:scale-95 cursor-pointer mt-auto transition-all ${
                          isSpeaking
                            ? "bg-rose-100 text-rose-700 border border-rose-300 hover:bg-rose-200"
                            : "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-cyan-500/20"
                        }`}
                      >
                        {isSpeaking ? (
                          <>
                            <VolumeX className="w-4 h-4 text-rose-600 animate-pulse" />
                            <span>Stop Voice ⏹️</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-4 h-4 fill-white text-white" />
                            <span>
                              {holoAiLang === "hi"
                                ? "विवरण सुनें (Read Specs - HI)"
                                : holoAiLang === "ta"
                                ? "விவரங்களைக் கேட்க (Read Specs - TA)"
                                : `Read Specs Aloud (${holoAiLang.toUpperCase()})`}
                            </span>
                          </>
                        )}
                      </button>
                    </div>
                  ) : (
                    /* Chat Stream View */
                    <div className="flex-1 flex flex-col justify-between space-y-2 min-h-0">

                      <div className="flex-1 overflow-y-auto space-y-2.5 p-3 bg-slate-50 rounded-xl border border-cyan-200 text-xs">
                        {holoAiHistory.length === 0 ? (
                          <div className="text-center py-8 space-y-2">
                            <Sparkles className="w-7 h-7 text-cyan-600 mx-auto animate-bounce" />
                            <p className="text-xs text-slate-800 font-bold">
                              {holoAiLang === "hi" ? "AI उत्पाद सहायक" : holoAiLang === "ta" ? "AI தயாரிப்பு உதவியாளர்" : "Ask AI Answering Chatbot"}
                            </p>
                            <p className="text-[11px] text-slate-500 max-w-xs mx-auto">
                              {holoAiLang === "hi"
                                ? `नमस्ते! ${hologramProduct.name} के इंजन, पावर, वजन या कीमत के बारे में पूछें!`
                                : holoAiLang === "ta"
                                ? `வணக்கம்! ${hologramProduct.name} எஞ்சின், ஆற்றல் மற்றும் விலை விவரங்களைக் கேட்கலாம்!`
                                : `Type or speak any question about ${hologramProduct.name} specs, power, weight or price!`}
                            </p>
                          </div>
                        ) : (
                          holoAiHistory.map((h, i) => (
                            <div key={i} className={`flex ${h.sender === "user" ? "justify-end" : "justify-start"}`}>
                              <div
                                className={`p-3 rounded-2xl max-w-[88%] text-[11.5px] leading-relaxed shadow-sm ${
                                  h.sender === "user"
                                    ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-medium"
                                    : "bg-white text-slate-800 border border-slate-200 flex flex-col gap-2"
                                }`}
                              >
                                <span>{h.text}</span>
                                {h.sender === "ai" && (
                                  <div className="flex items-center justify-end pt-1.5 border-t border-slate-100">
                                    <button
                                      onClick={() => {
                                        if (isSpeaking) {
                                          stopTTS();
                                        } else {
                                          speakTTS(h.text, holoAiLang);
                                        }
                                      }}
                                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                                        isSpeaking
                                          ? "bg-rose-100 text-rose-700 border border-rose-300 hover:bg-rose-200 animate-pulse"
                                          : "bg-cyan-50 text-cyan-700 border border-cyan-200 hover:bg-cyan-100"
                                      }`}
                                      title={isSpeaking ? "Stop Voice" : "Listen Audio"}
                                    >
                                      {isSpeaking ? (
                                        <>
                                          <VolumeX className="w-3 h-3 text-rose-400" />
                                          <span>Stop Voice ⏹️</span>
                                        </>
                                      ) : (
                                        <>
                                          <Volume2 className="w-3 h-3 text-cyan-400" />
                                          <span>
                                            {holoAiLang === "hi"
                                              ? "आवाज सुनें 🔊"
                                              : holoAiLang === "ta"
                                              ? "ஒலி கேட்க 🔊"
                                              : "Listen Audio 🔊"}
                                          </span>
                                        </>
                                      )}
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}

                  {/* Dedicated Voice Chat Bar (Voice Only - No Text Box) */}
                  <div className="pt-2.5 border-t border-slate-200 shrink-0 flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() =>
                        handleStartVoiceListening(holoAiLang, (transcript) => {
                          setHoloUserQuery(transcript);
                          handleHoloVoiceQuerySubmit(transcript);
                        })
                      }
                      className={`w-full py-3 px-4 rounded-2xl font-extrabold text-xs transition-all flex items-center justify-center gap-2.5 shadow-md active:scale-95 cursor-pointer ${
                        isListening
                          ? "bg-rose-500 text-white shadow-rose-500/30 animate-pulse"
                          : "bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-600 hover:to-indigo-700 text-white shadow-cyan-500/25"
                      }`}
                    >
                      <Mic className={`w-4 h-4 ${isListening ? "animate-ping" : "animate-pulse"}`} />
                      <span>
                        {isListening
                          ? holoAiLang === "hi"
                            ? "सुन रहा हूँ... बोलें 🎙️"
                            : holoAiLang === "ta"
                            ? "கேட்கிறது... பேசுங்கள் 🎙️"
                            : "Listening... Speak Now 🎙️"
                          : holoAiLang === "hi"
                          ? "बोलकर सवाल पूछें (Tap to Speak 🎙️)"
                          : holoAiLang === "ta"
                          ? "பேசி கேள்வி கேட்க (Tap to Speak 🎙️)"
                          : "Tap to Speak Voice Question 🎙️"}
                      </span>
                    </button>
                  </div>
                </div>
              )}

            </div>

          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 5: 🧠 TAMIL AI VOICE ASSISTANT TRAINING STUDIO */}
      {/* ======================================================== */}
      {isTamilTrainingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/92 backdrop-blur-xl overflow-y-auto animate-in fade-in duration-300">
          <div className="relative w-full max-w-2xl bg-[#030712] text-white rounded-3xl border border-purple-500/40 p-6 sm:p-7 shadow-[0_0_90px_rgba(168,85,247,0.25)] space-y-5 overflow-hidden">
            
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

            {/* Header */}
            <div className="relative z-10 flex items-center justify-between border-b border-purple-900/40 pb-4">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-purple-500/30 via-indigo-500/20 to-blue-500/30 text-purple-300 border border-purple-400/40 flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.3)] shrink-0">
                  <BrainCircuit className="w-6 h-6 animate-pulse text-purple-300" />
                </div>
                <div>
                  <span className="px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-widest bg-purple-500/15 text-purple-300 border border-purple-400/30 shadow-sm">
                    Separated Voice Assistant Training Studio
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-white tracking-tight mt-0.5 font-display">
                    Tamil AI Speech Training Engine
                  </h3>
                  <p className="text-xs text-slate-400 font-medium">
                    Dataset Source: <span className="text-purple-300 font-mono">Achitha/simple_tamil</span> (Hugging Face)
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsTamilTrainingModalOpen(false)}
                className="p-2 text-slate-400 hover:text-white rounded-xl bg-slate-900/80 hover:bg-rose-500/20 border border-slate-800 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Configuration Card */}
            <div className="relative z-10 space-y-4">
              
              {/* Dataset URL & Config */}
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-purple-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Database className="w-4 h-4 text-purple-400" />
                    Hugging Face Dataset Ingestion URL
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    ONLINE &amp; READY
                  </span>
                </div>
                
                <input
                  type="text"
                  value={hfDatasetUrl}
                  onChange={(e) => setHfDatasetUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 text-white font-mono text-xs rounded-xl border border-purple-500/30 focus:outline-none focus:border-purple-400"
                  placeholder="https://huggingface.co/datasets/..."
                />
              </div>

              {/* Training Telemetry Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 text-center space-y-1">
                  <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider block">Training Sentences</span>
                  <span className="font-extrabold text-white text-sm font-mono">{trainingMetrics.totalRows.toLocaleString()}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 text-center space-y-1">
                  <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider block">Tamil Vocabulary</span>
                  <span className="font-extrabold text-purple-300 text-sm font-mono">{trainingMetrics.vocabCount.toLocaleString()}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 text-center space-y-1">
                  <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider block">Speech Accuracy</span>
                  <span className="font-extrabold text-emerald-400 text-sm font-mono">{trainingMetrics.accuracy}%</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 text-center space-y-1">
                  <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider block">TTS Latency</span>
                  <span className="font-extrabold text-cyan-300 text-sm font-mono">{trainingMetrics.latency}</span>
                </div>
              </div>

              {/* Sample Training Rows Preview from Achitha/simple_tamil */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  Dataset Speech Training Pairs (<span className="text-purple-300 font-mono">Achitha/simple_tamil</span>)
                </span>
                <div className="max-h-36 overflow-y-auto space-y-2 p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono">
                  <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1">
                    <p className="text-purple-300 font-bold">Q: "வணக்கம், உங்கள் எஞ்சின் விவரங்கள் என்ன?"</p>
                    <p className="text-slate-300">A: "4-ஸ்ட்ரோக் ஓ.எச்.சி எஞ்சின் 7000 RPM வேகத்தில் 1.4 HP ஆற்றலை வழங்குகிறது."</p>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1">
                    <p className="text-purple-300 font-bold">Q: "எண்ணெய் கலக்க தேவையா?"</p>
                    <p className="text-slate-300">A: "இல்லை, தூய பெட்ரோல் மட்டுமே பயன்படுத்த வேண்டும். பராமரிப்பு எளிதானது."</p>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1">
                    <p className="text-purple-300 font-bold">Q: "உத்தரவாதம் எவ்வளவு காலம்?"</p>
                    <p className="text-slate-300">A: "George Maijo சாதனங்களுக்கு 1 வருட நிறுவன உத்தரவாதம் வழங்கப்படுகிறது."</p>
                  </div>
                </div>
              </div>

              {/* Progress & Live Terminal Output */}
              {isTrainingActive && (
                <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-500/40 space-y-3 animate-pulse">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-purple-300 font-bold flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
                      Training Tamil Speech Model...
                    </span>
                    <span className="text-purple-300 font-bold">{trainingProgress}%</span>
                  </div>
                  
                  <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-purple-500/30">
                    <div className="h-full bg-gradient-to-r from-purple-500 via-indigo-500 to-emerald-400 transition-all duration-300" style={{ width: `${trainingProgress}%` }} />
                  </div>

                  <p className="text-[11px] font-mono text-slate-300 italic">{trainingStepStatus}</p>
                </div>
              )}

              {isTrainingComplete && (
                <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 flex items-center justify-between text-xs text-emerald-300 font-bold">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span>Tamil AI Voice Speech Model Trained &amp; Synced with ElevenLabs!</span>
                  </div>
                  <button
                    onClick={() => speakTTS("Achitha/simple_tamil தரவுத்தளத்தின் மூலம் AI குரல் முகவர் வெற்றிகரமாக பயிற்சி பெற்றுள்ளது!", "ta")}
                    className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-white rounded-xl text-xs font-extrabold flex items-center gap-1.5 shadow-md active:scale-95"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Test Speech</span>
                  </button>
                </div>
              )}

            </div>

            {/* Modal Footer Controls */}
            <div className="relative z-10 flex items-center justify-between pt-3 border-t border-purple-900/40">
              <button
                onClick={() => setIsTamilTrainingModalOpen(false)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 rounded-xl text-xs font-extrabold transition-all"
              >
                Close Studio
              </button>

              <button
                onClick={startTamilVoiceTraining}
                disabled={isTrainingActive}
                className="px-5 py-2.5 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:opacity-90 disabled:opacity-50 text-white rounded-xl text-xs font-extrabold flex items-center gap-2 shadow-lg shadow-purple-950/50 transition-all active:scale-95"
              >
                <BrainCircuit className="w-4 h-4" />
                <span>{isTrainingActive ? "Training In Progress..." : "Start Tamil Voice Training"}</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 3: 📡 CONNECT PHYSICAL HOLO DEVICE MODAL */}
      {/* ======================================================== */}
      {isHoloDeviceModalOpen && hologramProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-slate-950 text-white rounded-3xl border border-sky-500/40 p-6 shadow-[0_0_60px_rgba(56,189,248,0.2)] space-y-5">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-sky-500/20 text-sky-400 border border-sky-500/30 flex items-center justify-center">
                  <Cast className="w-5 h-5 animate-pulse text-sky-400" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-white">Connect Holo Device</h3>
                  <p className="text-[11px] text-sky-400 font-mono">Spatial 3D Fan & Projector Sync</p>
                </div>
              </div>
              <button
                onClick={() => setIsHoloDeviceModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-full hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Device Scanner Card */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Wifi className="w-3.5 h-3.5 text-sky-400" />
                  <span>Nearby Holo Devices (Bluetooth / Wi-Fi)</span>
                </span>
                <span className="text-[10px] font-mono text-emerald-400">SCANNING</span>
              </div>

              <div className="space-y-2 pt-1">
                {/* Device 1 */}
                <div
                  onClick={handleStartHoloSync}
                  className={`p-3 rounded-xl border text-xs cursor-pointer transition-all flex items-center justify-between ${
                    isHoloConnected
                      ? "bg-emerald-950/50 border-emerald-500/50 text-emerald-300"
                      : "bg-slate-950/80 border-slate-800 hover:border-sky-500/40 text-slate-200"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Radio className={`w-4 h-4 ${isHoloConnected ? "text-emerald-400" : "text-sky-400 animate-pulse"}`} />
                    <div>
                      <span className="font-bold block">HoloFan-3D-Pro (360° Fan Projector)</span>
                      <span className="text-[10px] text-slate-400 font-mono">ID: HF-9444154944 • Signal: 100%</span>
                    </div>
                  </div>
                  {isHoloConnecting ? (
                    <span className="text-[10px] text-sky-400 animate-pulse font-mono font-bold">Connecting...</span>
                  ) : isHoloConnected ? (
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-bold">CONNECTED</span>
                  ) : (
                    <span className="text-[10px] bg-sky-500/20 text-sky-300 px-2.5 py-1 rounded-lg font-bold hover:bg-sky-500/30">Connect</span>
                  )}
                </div>

                {/* Device 2 */}
                <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800 text-xs text-slate-400 flex items-center justify-between opacity-75">
                  <div className="flex items-center gap-2.5">
                    <Radio className="w-4 h-4 text-slate-500" />
                    <div>
                      <span className="font-medium block">SellGrow-Spatial-Box-02</span>
                      <span className="text-[10px] font-mono">ID: SG-SB-02 • Signal: 75%</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">Standby</span>
                </div>
              </div>
            </div>

            {/* Offline SD Card / USB Video Export */}
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span className="font-bold flex items-center gap-1.5">
                  <Download className="w-3.5 h-3.5 text-sky-400" />
                  <span>Offline HoloFan Video Export</span>
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Download the 3D hologram MP4 video formatted for physical 3D LED fan SD cards & USB drives.
              </p>
              <a
                href={hologramProduct.hologramVideo || "/videos/remove_all_the_background.mp4"}
                download={`hologram-${hologramProduct.id}.mp4`}
                className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-sky-300 border border-slate-700 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all mt-1"
              >
                <Download className="w-3.5 h-3.5 text-sky-400" />
                <span>Download 3D Holo Video (.MP4)</span>
              </a>
            </div>

            <div className="flex justify-end pt-1">
              <button
                onClick={() => setIsHoloDeviceModalOpen(false)}
                className="px-5 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-xl text-xs transition-all shadow-lg"
              >
                Done
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* ======================================================== */}
      {/* MODAL 4: 📄 AI BROCHURE INGESTION (2-STEP PDF-FIRST WORKFLOW) */}
      {/* ======================================================== */}
      {isBrochureModalOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn overflow-y-auto">
          <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col bg-card border border-border rounded-3xl shadow-2xl my-auto text-left animate-scaleUp overflow-hidden text-foreground">
            
            {/* Modal Header & Step Indicator */}
            <div className="flex flex-col gap-4 p-6 border-b border-border bg-card shrink-0">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/20 shrink-0">
                    <FilePlus className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 font-mono">
                        Step {brochureStep} of 2
                      </span>
                      <span className="text-[11px] text-muted-foreground font-semibold">
                        {brochureStep === 1 && "1. Upload Product Brochure PDF"}
                        {brochureStep === 2 && "2. Review AI Details & Save Product"}
                      </span>
                    </div>
                    <h2 className="text-xl font-extrabold font-display text-foreground mt-1">
                      Add George Maijo Product Brochure
                    </h2>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsBrochureModalOpen(false)}
                  className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-colors shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Step Progress Bar */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div className={`h-2 rounded-full transition-all duration-300 ${brochureStep >= 1 ? "bg-blue-600" : "bg-muted"}`} />
                <div className={`h-2 rounded-full transition-all duration-300 ${brochureStep >= 2 ? "bg-blue-600" : "bg-muted"}`} />
              </div>
            </div>

            {/* Form Steps - Scrollable */}
            <form onSubmit={handleSaveAddBrochure} className="flex-1 overflow-y-auto p-6 space-y-5 text-xs">

              {/* STEP 1: UPLOAD PRODUCT BROCHURE PDF FIRST */}
              {brochureStep === 1 && (
                <div className="space-y-4 animate-fadeIn">
                  
                  {/* PDF Upload Card */}
                  <div className="space-y-4 p-6 rounded-2xl border-2 border-dashed border-blue-500/40 bg-blue-500/5 text-center">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center mx-auto shadow-xl shadow-blue-500/30">
                      <FileText className="w-7 h-7" />
                    </div>

                    <div>
                      <h4 className="text-base font-extrabold text-foreground font-display">
                        Upload Product Brochure PDF Document
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1 max-w-md mx-auto">
                        Upload your brochure PDF file. The AI model will automatically analyze the document, extract the product name, image, category, specifications table, and highlights.
                      </p>
                    </div>

                    <label className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-95 text-white text-xs font-extrabold rounded-xl cursor-pointer shadow-lg shadow-blue-500/25 transition-all active:scale-95">
                      <Upload className="w-4 h-4" />
                      <span>Select & Upload Brochure PDF</span>
                      <input
                        type="file"
                        accept="application/pdf"
                        className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setBrochureData(prev => ({
                              ...prev,
                              pdfFileName: file.name,
                              pdfFile: URL.createObjectURL(file)
                            }));
                            await handleAnalyzePdfBrochure(file.name);
                          }
                        }}
                      />
                    </label>

                    {/* Pre-installed / Sample PDF selection */}
                    <div className="pt-3 border-t border-border/50 text-left space-y-2">
                      <label className="font-extrabold text-foreground text-[10px] uppercase tracking-wider">
                        Or Quick Select an Existing Brochure PDF
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {[
                          { title: "Brush Cutter 4SP PR", pdf: "Brush_Cutter_4SP_PR_Brochure.pdf" },
                          { title: "Power Weeder M700 ECO", pdf: "Power_Weeder_M700_ECO_Brochure.pdf" },
                          { title: "Power Weeder M800 ECO", pdf: "Power_Weeder_M800_ECO_Brochure.pdf" },
                          { title: "BC 520 2SP Brush Cutter", pdf: "George_Maijo_BC_520_2SP_Brochure.pdf" }
                        ].map((item, idx) => (
                          <button
                            key={idx}
                            type="button"
                            disabled={isAnalyzingPdf}
                            onClick={async () => {
                              setBrochureData(prev => ({ ...prev, pdfFileName: item.pdf }));
                              await handleAnalyzePdfBrochure(item.pdf);
                            }}
                            className="flex items-center justify-between p-2.5 rounded-xl border border-border bg-background hover:border-blue-500 hover:bg-blue-500/5 transition-all text-left group"
                          >
                            <div className="flex items-center gap-2 truncate">
                              <FileText className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                              <span className="font-bold text-[11px] truncate group-hover:text-blue-600 dark:group-hover:text-blue-400">
                                {item.title}
                              </span>
                            </div>
                            <Sparkles className="w-3 h-3 text-muted-foreground group-hover:text-blue-500 shrink-0" />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1.5 text-left pt-2">
                      <div className="flex items-center justify-between">
                        <label className="font-extrabold text-foreground text-[10px] uppercase tracking-wider">Type PDF File Name</label>
                        <button
                          type="button"
                          disabled={isAnalyzingPdf}
                          onClick={async () => {
                            await handleAnalyzePdfBrochure(brochureData.pdfFileName || "Brush_Cutter_4SP_PR_Brochure.pdf");
                          }}
                          className="text-[10px] text-blue-600 dark:text-blue-400 font-extrabold hover:underline flex items-center gap-1"
                        >
                          <Sparkles className="w-3 h-3" />
                          <span>{isAnalyzingPdf ? "Analyzing PDF..." : "✨ AI Extract & Analyze PDF"}</span>
                        </button>
                      </div>
                      <input
                        type="text"
                        value={brochureData.pdfFileName}
                        onChange={(e) => setBrochureData(prev => ({ ...prev, pdfFileName: e.target.value }))}
                        placeholder="e.g. Brush_Cutter_4SP_PR_Brochure.pdf"
                        className="w-full p-2.5 rounded-xl border border-border bg-background text-xs font-mono font-bold focus:outline-none focus:border-primary text-foreground"
                      />
                    </div>

                    {isAnalyzingPdf && (
                      <div className="p-4 rounded-xl border border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-300 font-extrabold text-xs flex items-center justify-center gap-2 animate-pulse">
                        <Sparkles className="w-4 h-4 animate-spin" />
                        <span>AI Engine is analyzing PDF, extracting product image, text & specs...</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border gap-3">
                    <button
                      type="button"
                      onClick={() => setIsBrochureModalOpen(false)}
                      className="px-5 py-2.5 border border-border rounded-xl hover:bg-muted text-muted-foreground text-xs font-extrabold transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      disabled={isAnalyzingPdf}
                      onClick={async () => {
                        await handleAnalyzePdfBrochure(brochureData.pdfFileName || "Brush_Cutter_4SP_PR_Brochure.pdf");
                      }}
                      className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-extrabold shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2 active:scale-95"
                    >
                      <span>Analyze PDF & Continue to Review</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: REVIEW AI DETAILS & SAVE PRODUCT */}
              {brochureStep === 2 && (
                <div className="space-y-4 animate-fadeIn">
                  
                  {/* Top Bar: Extracted Image + Basic Information */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl border border-blue-500/30 bg-blue-500/5 dark:bg-slate-900/60">
                    
                    {/* Extracted Product Image */}
                    <div className="space-y-2 flex flex-col items-center justify-center text-center p-2 rounded-xl border border-border bg-background">
                      <label className="font-extrabold text-foreground text-[10px] uppercase tracking-wider">
                        Extracted Product Image
                      </label>
                      <div className="h-28 w-full rounded-lg border border-border bg-slate-100 dark:bg-slate-900 flex items-center justify-center overflow-hidden p-1">
                        {brochureData.image ? (
                          <img src={brochureData.image} alt="Extracted Product" className="max-h-full object-contain" />
                        ) : (
                          <div className="text-muted-foreground text-[10px]">No image</div>
                        )}
                      </div>
                      <label className="px-2.5 py-1 bg-muted hover:bg-muted/80 text-foreground text-[10px] font-extrabold rounded-lg cursor-pointer transition-all flex items-center gap-1">
                        <Upload className="w-3 h-3" />
                        <span>Change Image</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = (evt) => {
                                setBrochureData(prev => ({ ...prev, image: evt.target?.result as string }));
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                      </label>
                    </div>

                    {/* Basic Info Inputs */}
                    <div className="sm:col-span-2 space-y-3">
                      <div className="space-y-1">
                        <label className="font-extrabold text-foreground text-[10px] uppercase tracking-wider">Product Name *</label>
                        <input
                          type="text"
                          required
                          value={brochureData.name}
                          onChange={(e) => setBrochureData(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="e.g. George Maijo Brush Cutter 4SP PR"
                          className="w-full p-2.5 rounded-xl border border-border bg-background text-xs font-bold focus:outline-none focus:border-primary text-foreground"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                          <label className="font-extrabold text-foreground text-[10px] uppercase tracking-wider">Category</label>
                          <select
                            value={brochureData.category}
                            onChange={(e) => setBrochureData(prev => ({ ...prev, category: e.target.value }))}
                            className="w-full p-2 rounded-xl border border-border bg-background text-xs font-bold focus:outline-none focus:border-primary text-foreground"
                          >
                            <option value="Brush Cutter">Brush Cutter</option>
                            <option value="Power Weeder">Power Weeder</option>
                            <option value="Power Tiller">Power Tiller</option>
                            <option value="Combine Harvester">Combine Harvester</option>
                            <option value="Paddy Reaper">Paddy Reaper</option>
                            <option value="Agricultural Equipment">Agricultural Equipment</option>
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label className="font-extrabold text-foreground text-[10px] uppercase tracking-wider">PDF File</label>
                          <input
                            type="text"
                            readOnly
                            value={brochureData.pdfFileName}
                            className="w-full p-2 rounded-xl border border-border bg-muted text-xs font-mono font-bold text-muted-foreground"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="font-extrabold text-foreground text-[10px] uppercase tracking-wider">Product Description *</label>
                        <textarea
                          rows={2}
                          required
                          value={brochureData.shortDesc}
                          onChange={(e) => setBrochureData(prev => ({ ...prev, shortDesc: e.target.value }))}
                          className="w-full p-2 rounded-xl border border-border bg-background text-[11px] leading-relaxed focus:outline-none focus:border-primary font-medium text-foreground"
                        />
                      </div>
                    </div>

                  </div>

                  {/* Editable AI Extracted Specifications Table & Summary */}
                  <div className="p-4 rounded-2xl border border-blue-500/30 bg-blue-500/5 dark:bg-slate-900/80 text-xs space-y-4">
                    <div className="flex items-center justify-between border-b border-border pb-2">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        <h4 className="font-extrabold text-foreground text-xs uppercase tracking-wider font-display">
                          Editable AI Extracted Technical Specifications ({Object.keys(brochureData.specs || {}).length} Rows)
                        </h4>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const newKey = prompt("Enter new specification attribute name (e.g. Engine Model, Working Width, Fuel Capacity):");
                          if (newKey && newKey.trim()) {
                            const newVal = prompt(`Enter value for "${newKey.trim()}":`) || "Value";
                            setBrochureData(prev => ({
                              ...prev,
                              specs: { ...prev.specs, [newKey.trim()]: newVal.trim() }
                            }));
                          }
                        }}
                        className="px-2.5 py-1 bg-blue-600 text-white rounded-lg text-[10px] font-extrabold hover:bg-blue-700 transition-all flex items-center gap-1 shadow-sm active:scale-95"
                      >
                        <span>Add Custom Spec Row</span>
                      </button>
                    </div>

                    {/* Interactive Specs Table */}
                    {Object.keys(brochureData.specs || {}).length > 0 ? (
                      <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                        {Object.entries(brochureData.specs).map(([key, val], idx) => (
                          <div key={idx} className="flex items-center gap-2 p-2 rounded-xl bg-background border border-border hover:border-blue-500/40 transition-all">
                            <input
                              type="text"
                              value={key}
                              onChange={(e) => {
                                const newKey = e.target.value;
                                setBrochureData(prev => {
                                  const updated = { ...prev.specs };
                                  delete updated[key];
                                  if (newKey) updated[newKey] = val;
                                  return { ...prev, specs: updated };
                                });
                              }}
                              placeholder="Spec Parameter Name"
                              className="w-1/3 p-1.5 rounded-lg border border-border bg-muted/40 font-bold text-foreground text-[11px] focus:outline-none focus:border-blue-500"
                            />
                            <input
                              type="text"
                              value={val}
                              onChange={(e) => {
                                const newVal = e.target.value;
                                setBrochureData(prev => ({
                                  ...prev,
                                  specs: { ...prev.specs, [key]: newVal }
                                }));
                              }}
                              placeholder="Spec Parameter Value"
                              className="flex-1 p-1.5 rounded-lg border border-border bg-background text-[11px] font-medium text-foreground focus:outline-none focus:border-blue-500 font-mono"
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-3 text-center text-muted-foreground text-[11px] font-medium border border-dashed border-border rounded-xl">
                        No specifications extracted yet.
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border gap-3">
                    <button
                      type="button"
                      onClick={() => setBrochureStep(1)}
                      className="px-5 py-2.5 border border-border rounded-xl hover:bg-muted text-muted-foreground text-xs font-extrabold transition-all"
                    >
                      ⬅ Back to Upload PDF
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:opacity-95 text-white rounded-xl text-xs font-extrabold shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2 active:scale-95"
                    >
                      <CheckCircle2 className="w-4 h-4" /> Save Product & Publish to Catalog
                    </button>
                  </div>
                </div>
              )}

            </form>
          </div>
        </div>
      )}

      {/* 📅 BOOK THE SLOT MODAL */}
      {isSlotModalOpen && slotProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden p-6 sm:p-8 space-y-6">
            
            {/* Header */}
            <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">
                  <Calendar className="w-4 h-4" />
                  <span>Schedule Product Demo / Meeting</span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
                  Book a Slot for {slotProduct.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Select your preferred date & time to connect with our agricultural machinery experts.
                </p>
              </div>
              <button
                onClick={() => setIsSlotModalOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {slotSubmitted ? (
              /* Success View */
              <div className="py-6 text-center space-y-4 animate-in zoom-in-95">
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-500/40">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div>
                  <h4 className="text-xl font-black text-slate-900 dark:text-white">
                    Slot Booked Successfully! 🎉
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs mx-auto">
                    Your demo request for <span className="font-bold text-slate-700 dark:text-slate-200">{slotProduct.name}</span> has been confirmed.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/60 text-left space-y-2 text-xs">
                  <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                    <span className="font-medium text-slate-500 dark:text-slate-400">📅 Date:</span>
                    <span className="font-extrabold">{slotDate}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                    <span className="font-medium text-slate-500 dark:text-slate-400">⏰ Time Slot:</span>
                    <span className="font-extrabold text-emerald-600 dark:text-emerald-400">{slotTime}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                    <span className="font-medium text-slate-500 dark:text-slate-400">👤 Name:</span>
                    <span className="font-bold">{slotForm.name || "Customer"}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                    <span className="font-medium text-slate-500 dark:text-slate-400">📞 Phone:</span>
                    <span className="font-bold">{slotForm.phone || "Provided"}</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-center gap-3">
                  <a
                    href={`https://wa.me/919444154944?text=${encodeURIComponent(`Hi George Maijo Team, I just booked a slot for ${slotProduct.name} on ${slotDate} at ${slotTime}. My name is ${slotForm.name}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-md transition-all"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Notify on WhatsApp</span>
                  </a>
                  <button
                    onClick={() => setIsSlotModalOpen(false)}
                    className="px-5 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-bold transition-all"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              /* Booking Form */
              <form
                onSubmit={(e) => {
                  e.preventDefault();

                  const customerName = slotForm.name.trim() || "Booked Customer";
                  const leadTitle = `${customerName} (${slotProduct.name} Demo)`;
                  const timeFormatted = `${slotDate} @ ${slotTime}`;
                  
                  // 1. Create a Lead object for the CRM Kanban Board under 'meeting' (MEETING SCHEDULED)
                  const newLead = {
                    id: `slot-lead-${Date.now()}`,
                    name: leadTitle,
                    value: slotProduct.price ? `₹${slotProduct.price.toLocaleString()}` : "₹24,500",
                    probability: 92,
                    coordinates: "13.0827° N, 80.2707° E",
                    summary: `Live Product Demo Slot Booked for ${slotProduct.name}. Date: ${slotDate}, Time Slot: ${slotTime}. Phone: ${slotForm.phone}. Email: ${slotForm.email || 'N/A'}.`,
                    stage: "meeting",
                    scheduledTime: timeFormatted,
                    assignedSalesman: "Alex Rivera (Senior Specialist)"
                  };

                  // 2. Create a SalesSchedule object for CRM Schedules Tab
                  const newSchedule = {
                    id: `slot-sch-${Date.now()}`,
                    leadName: leadTitle,
                    salesmanId: "rep-1",
                    salesmanName: "Alex Rivera",
                    date: slotDate,
                    startTime: slotTime.split(" - ")[0] || "10:30 AM",
                    endTime: slotTime.split(" - ")[1] || "11:15 AM",
                    status: "Scheduled",
                    meetingType: "Video Demo",
                    location: "Google Meet / Live Demo Portal",
                    notes: `Booked via Product Slot Request for ${slotProduct.name}. Phone: ${slotForm.phone}`
                  };

                  // 3. Create a Service Person Booking object
                  const newBooking = {
                    id: `slot-bk-${Date.now()}`,
                    name: customerName,
                    email: slotForm.email || "customer@example.com",
                    whatsapp: slotForm.phone || "+91 98765 43210",
                    date: slotDate,
                    time: slotTime,
                    solutionId: slotProduct.id || "prod-1",
                    solutionTitle: `${slotProduct.name} Live Demo`,
                    servicePerson: {
                      name: "Alex Rivera",
                      role: "Senior Product Specialist",
                      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                    },
                    bookedAt: new Date().toISOString(),
                    status: "pending",
                    notes: `Live demo requested for ${slotProduct.name}`
                  };

                  // 4. Save into localStorage keys
                  try {
                    const existingLeads = JSON.parse(localStorage.getItem("sellgrow_booked_leads") || "[]");
                    localStorage.setItem("sellgrow_booked_leads", JSON.stringify([newLead, ...existingLeads]));

                    const existingSchedules = JSON.parse(localStorage.getItem("sellgrow_booked_schedules") || "[]");
                    localStorage.setItem("sellgrow_booked_schedules", JSON.stringify([newSchedule, ...existingSchedules]));

                    const existingBookings = JSON.parse(localStorage.getItem("sellgrow_bookings") || "[]");
                    localStorage.setItem("sellgrow_bookings", JSON.stringify([newBooking, ...existingBookings]));

                    window.dispatchEvent(new Event("storage"));
                  } catch (err) {
                    console.error("Failed to store booking data in localStorage", err);
                  }

                  setSlotSubmitted(true);
                }}
                className="space-y-5"
              >
                {/* Select Date */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-emerald-500" />
                      <span>1. Select Date</span>
                    </label>
                    <span className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                      Selected: {slotDate}
                    </span>
                  </div>

                  {/* Calendar Date Picker Input */}
                  <div className="relative flex items-center">
                    <input
                      type="date"
                      min={new Date().toISOString().split("T")[0]}
                      onChange={(e) => {
                        if (e.target.value) {
                          const [year, month, day] = e.target.value.split("-");
                          const dateObj = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
                          const formatted = dateObj.toLocaleDateString("en-US", {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                            year: "numeric"
                          });
                          setSlotDate(formatted);
                        }
                      }}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-emerald-500 font-semibold cursor-pointer"
                    />
                    <Calendar className="w-4 h-4 text-emerald-500 absolute left-3 pointer-events-none" />
                  </div>
                </div>

                {/* Select Time Slot */}
                <div className="space-y-2">
                  <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-emerald-500" />
                    <span>2. Select Time Slot</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      "09:30 AM - 10:15 AM",
                      "10:30 AM - 11:15 AM",
                      "02:00 PM - 02:45 PM",
                      "04:00 PM - 04:45 PM",
                    ].map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setSlotTime(t)}
                        className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border text-center ${
                          slotTime === t
                            ? "bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/20"
                            : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-emerald-500"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* User Details */}
                <div className="space-y-3 pt-1 border-t border-slate-100 dark:border-slate-800">
                  <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300">
                    3. Your Contact Details
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400">Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ramesh Kumar"
                        value={slotForm.name}
                        onChange={(e) => setSlotForm({ ...slotForm, name: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 text-xs rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-emerald-500 font-medium"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={slotForm.phone}
                        onChange={(e) => setSlotForm({ ...slotForm, phone: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 text-xs rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-emerald-500 font-medium"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400">Email Address (Optional)</label>
                    <input
                      type="email"
                      placeholder="ramesh@example.com"
                      value={slotForm.email}
                      onChange={(e) => setSlotForm({ ...slotForm, email: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 text-xs rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-emerald-500 font-medium"
                    />
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold rounded-2xl text-xs sm:text-sm shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all active:scale-98 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Confirm & Book Slot Now</span>
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
      <Footer />
    </>
  );
}
