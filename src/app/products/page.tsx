"use client";

import React, { useState, useMemo } from "react";
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
  Loader2
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

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
  const { t } = useLanguage();

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

  // AI Brochure Ingestion Wizard states
  const [isBrochureModalOpen, setIsBrochureModalOpen] = useState(false);
  const [brochureStep, setBrochureStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  
  // Step 1: Basic Info
  const [newProductName, setNewProductName] = useState("");
  const [newProductCategory, setNewProductCategory] = useState("");
  const [newProductBrand, setNewProductBrand] = useState("GEORGE MAIJO EQUIPMENT");

  // Step 2: Product Local Image
  const [newProductImage, setNewProductImage] = useState<string | null>(null);
  const [imageFileName, setImageFileName] = useState("");

  // Step 3: PDF Brochure File
  const [brochurePdfFile, setBrochurePdfFile] = useState<File | null>(null);
  const [pdfFileName, setPdfFileName] = useState("");
  const [brochureTextContent, setBrochureTextContent] = useState("");

  // Step 4: AI Analysis Progress
  const [aiAnalysisProgress, setAiAnalysisProgress] = useState(0);
  const [aiAnalysisStatus, setAiAnalysisStatus] = useState("");

  // Step 5: Extracted Product Specifications (Editable)
  const [extractedEngine, setExtractedEngine] = useState("");
  const [extractedDisplacement, setExtractedDisplacement] = useState("");
  const [extractedPower, setExtractedPower] = useState("");
  const [extractedCarburetor, setExtractedCarburetor] = useState("");
  const [extractedFuelTank, setExtractedFuelTank] = useState("");
  const [extractedDryWeight, setExtractedDryWeight] = useState("");
  const [extractedFeaturesText, setExtractedFeaturesText] = useState("");
  const [extractedApplicationsText, setExtractedApplicationsText] = useState("");
  const [brochureSaveSuccess, setBrochureSaveSuccess] = useState(false);

  // Voice AI Modal TTS states
  const [voiceLang, setVoiceLang] = useState<"en" | "ta">("en");
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
    const cat = (newProductCategory || "").toUpperCase();
    const name = (newProductName || "").toUpperCase();
    if (cat.includes("ELECTRONIC") || name.includes("SMARTPHONE") || name.includes("LAPTOP") || name.includes("WATCH") || name.includes("TV") || name.includes("EARBUDS")) return "ELECTRONICS";
    if (cat.includes("HOME") || cat.includes("KITCHEN") || cat.includes("REFRIGERATOR") || cat.includes("WASHING") || name.includes("REFRIGERATOR") || name.includes("OVEN") || name.includes("HEATER")) return "HOME_APPLIANCE";
    if (cat.includes("POWER TOOLS") || cat.includes("WASHER") || name.includes("DRILL") || name.includes("WASHER") || name.includes("COMPRESSOR")) return "POWER_TOOL";
    if (cat.includes("AUTOMOTIVE") || name.includes("SCOOTER")) return "AUTOMOTIVE";
    return "AGRICULTURE";
  }, [newProductName, newProductCategory]);

  // Check if current product is engine/power machinery vs general product/tool
  const isEngineProduct = useMemo(() => {
    const text = `${newProductName} ${newProductCategory} ${newProductBrand}`.toLowerCase();
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
  }, [newProductName, newProductCategory, newProductBrand]);

  React.useEffect(() => {
    const loadProducts = () => {
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem("sellgrow_catalog_products");
        if (stored) {
          try {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed) && parsed.length > 0) {
              const merged = PRODUCTS_DATA.map((defaultItem) => {
                const savedItem = parsed.find((p: ProductItem) => p.id === defaultItem.id);
                if (!savedItem) return defaultItem;
                return {
                  ...defaultItem,
                  ...savedItem,
                  image: savedItem.image || defaultItem.image,
                  hologramVideo: savedItem.hologramVideo || defaultItem.hologramVideo,
                };
              });

              const customNewProducts = parsed.filter(
                (p: ProductItem) => !PRODUCTS_DATA.some((d) => d.id === p.id)
              );

              setProductsList([...merged, ...customNewProducts]);
              return;
            }
          } catch (e) {}
        }
        setProductsList(PRODUCTS_DATA);
      }
    };

    loadProducts();

    window.addEventListener("storage", loadProducts);
    return () => window.removeEventListener("storage", loadProducts);
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

  // Open Detail View for a product (Image 3)
  const openProductDetail = (product: ProductItem) => {
    setActiveProduct(product);
    setViewMode("detail");
    setActiveTab("description");
    setFormSubmitted(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Open AI Voice Modal
  const openVoiceAssistant = (e: React.MouseEvent, product: ProductItem) => {
    e.stopPropagation();
    setVoiceModelProduct(product);
    const greetingMsg = product.voiceGreeting?.[voiceLang] || `Hello, I am the AI assistant for ${product.name}. How can I help you today?`;
    setAiHistory([
      { sender: "ai", text: greetingMsg },
    ]);
    setIsVoiceModalOpen(true);
    speakTTS(greetingMsg, voiceLang);
  };

  // Open 3D Hologram Modal
  const open3DHologram = (e: React.MouseEvent, product: ProductItem) => {
    e.stopPropagation();
    setHologramProduct(product);
    setIsHologramPlaying(true);
    setIsHologramMuted(true);
    setIsHologramFullscreen(false);
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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProductImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const isCleanHumanText = (str: string) => {
    const s = str.trim();
    if (!s || s.length < 2) return false;
    if (
      s.startsWith("%PDF") ||
      s.startsWith("<<") ||
      s.startsWith(">>") ||
      s.startsWith("/") ||
      s.includes("endobj") ||
      s.includes("stream") ||
      s.includes("xref") ||
      s.includes("FontDescriptor") ||
      s.includes("BaseFont") ||
      s.includes("Helvetica") ||
      s.includes("FlateDecode") ||
      s.includes("MediaBox") ||
      s.endsWith(".pdf") ||
      s.endsWith(".PDF")
    )
      return false;
    const specialCount = (s.match(/[%^\*?<>\=\[\]~\{\}\$\\_]/g) || []).length;
    if (specialCount > 2 || specialCount / s.length > 0.15) return false;
    return /^[a-zA-Z0-9\s.,()\-\/+:;%#&"'\u00C0-\u024F]+$/.test(s);
  };

  const extractTextFromPdfArrayBuffer = (buffer: ArrayBuffer, fileName: string): string => {
    try {
      const bytes = new Uint8Array(buffer);
      let rawStr = "";
      const chunkSize = 8192;
      for (let i = 0; i < bytes.length; i += chunkSize) {
        const chunk = bytes.subarray(i, i + chunkSize);
        rawStr += String.fromCharCode.apply(null, Array.from(chunk));
      }

      const textPieces: string[] = [];

      // Extract PDF text literals in (text) Tj and [(text)] TJ
      const tjRegex = /\(([^()]{2,150})\)\s*T[jJ]/g;
      let match: RegExpExecArray | null;
      while ((match = tjRegex.exec(rawStr)) !== null) {
        const cleaned = match[1].replace(/\\([()\\])/g, "$1").trim();
        if (isCleanHumanText(cleaned)) {
          textPieces.push(cleaned);
        }
      }

      // Extract printable ASCII string chunks from uncompressed PDF streams
      const asciiMatches = rawStr.match(/[\x20-\x7E]{4,150}/g);
      if (asciiMatches) {
        asciiMatches.forEach((m) => {
          const trimmed = m.trim();
          if (isCleanHumanText(trimmed)) {
            if (
              /engine|displac|power|hp|kw|rpm|stroke|weight|kg|tank|litre|fuel|carburetor|starter|weeder|tiller|blade|spec|model|type|width|mm|cc|output|capacity|transmission|speed|cylinder|processor|ram|storage|display|screen|camera|battery|volt|amp|inverter|compressor/i.test(trimmed)
            ) {
              textPieces.push(trimmed);
            }
          }
        });
      }

      return Array.from(new Set(textPieces)).join("\n");
    } catch (err) {
      return "";
    }
  };

  const handleBrochurePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBrochurePdfFile(file);
      setPdfFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        const buffer = event.target?.result as ArrayBuffer;
        if (buffer) {
          const text = extractTextFromPdfArrayBuffer(buffer, file.name);
          setBrochureTextContent(text);
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  // STRICT BROCHURE DOCUMENT OCR & TEXT EXTRACTION PARSER (Only takes details strictly from brochure & category type)
  const extractDetailsStrictlyFromBrochure = (
    productName: string,
    category: string,
    brand: string,
    pdfFile: File | null,
    documentText: string
  ) => {
    const pName = productName.trim();
    const pCat = (category || "").trim();
    const pBrand = (brand || "").trim();
    const fileName = pdfFile ? pdfFile.name : "";

    const brochureText = `${documentText}\n${pName}\n${pCat}\n${pBrand}`;
    const lines = brochureText.split(/\r?\n/).map((l) => l.trim()).filter((l) => isCleanHumanText(l));

    const isCategoryOrName = (str: string) => {
      const s = str.trim().toLowerCase();
      const catLower = pCat.toLowerCase();
      const nameLower = pName.toLowerCase();
      const brandLower = pBrand.toLowerCase();
      return (
        s === catLower ||
        s === nameLower ||
        s === brandLower ||
        s === "power weeder" ||
        s === "brush cutter" ||
        s === "electronics" ||
        s === "home appliances" ||
        s === "general"
      );
    };

    let extractedEngineStr = "";
    let extractedDispStr = "";
    let extractedPowerStr = "";
    let extractedCarbStr = "";
    let extractedTankStr = "";
    let extractedWeightStr = "";
    const extractedFeatureLines: string[] = [];
    const extractedAppLines: string[] = [];

    // Parse brochure document lines & table rows (Feature | Specification, Key: Value, Key - Value)
    lines.forEach((line) => {
      const lower = line.toLowerCase();
      if (isCategoryOrName(line)) return;

      // Extract key-value pairs if table line contains pipe, colon, tab, or dash
      let key = "";
      let val = "";
      if (line.includes("|")) {
        const parts = line.split("|").map((p) => p.trim()).filter(Boolean);
        if (parts.length >= 2) {
          key = parts[0];
          val = parts.slice(1).join(" ").trim();
        }
      } else if (line.includes(":")) {
        const parts = line.split(":");
        key = parts[0].trim();
        val = parts.slice(1).join(":").trim();
      } else if (line.includes("\t")) {
        const parts = line.split("\t").map((p) => p.trim()).filter(Boolean);
        if (parts.length >= 2) {
          key = parts[0];
          val = parts.slice(1).join(" ").trim();
        }
      }

      if (key && val && isCleanHumanText(key) && isCleanHumanText(val)) {
        const kLower = key.toLowerCase();
        if (kLower !== "feature" && kLower !== "specification" && kLower !== "specs" && kLower !== "property") {
          const bullet = `${key}: ${val}`;
          if (!extractedFeatureLines.includes(bullet) && extractedFeatureLines.length < 8) {
            extractedFeatureLines.push(bullet);
          }

          if (kLower.includes("processor") || kLower.includes("cpu") || kLower.includes("chipset") || kLower.includes("engine") || kLower.includes("motor")) {
            extractedEngineStr = val;
          } else if (kLower.includes("display") || kLower.includes("screen") || kLower.includes("displacement") || kLower.includes("chuck") || kLower.includes("bar")) {
            extractedDispStr = val;
          } else if (kLower.includes("graphics") || kLower.includes("gpu") || kLower.includes("ram") || kLower.includes("storage") || kLower.includes("power") || kLower.includes("output") || kLower.includes("speed")) {
            if (!extractedPowerStr) extractedPowerStr = `${key}: ${val}`;
            else if (!extractedPowerStr.includes(val)) extractedPowerStr += `, ${key}: ${val}`;
          } else if (kLower.includes("connectivity") || kLower.includes("os") || kLower.includes("operating system") || kLower.includes("camera") || kLower.includes("sensor") || kLower.includes("carburetor") || kLower.includes("control")) {
            if (!extractedCarbStr) extractedCarbStr = `${key}: ${val}`;
            else if (!extractedCarbStr.includes(val)) extractedCarbStr += `, ${key}: ${val}`;
          } else if (kLower.includes("battery") || kLower.includes("tank") || kLower.includes("fuel") || kLower.includes("capacity")) {
            extractedTankStr = val;
          } else if (kLower.includes("weight") || kLower.includes("mass") || kLower.includes("dimension")) {
            extractedWeightStr = val;
          }
        }
      }

      if (!extractedEngineStr && (lower.includes("engine") || lower.includes("motor") || lower.includes("processor") || lower.includes("compressor") || lower.includes("chipset"))) {
        const parts = line.split(/[:=\-]/);
        const val = parts.length > 1 ? parts.slice(1).join(" ").trim() : line;
        if (isCleanHumanText(val) && !isCategoryOrName(val)) extractedEngineStr = val;
      }

      if (!extractedDispStr && (lower.includes("displacement") || lower.includes("cc") || lower.includes("display") || lower.includes("screen") || lower.includes("capacity"))) {
        const parts = line.split(/[:=\-]/);
        const val = parts.length > 1 ? parts.slice(1).join(" ").trim() : line;
        if (isCleanHumanText(val) && !isCategoryOrName(val)) extractedDispStr = val;
      }

      if (!extractedPowerStr && (lower.includes("power") || lower.includes("output") || lower.includes("ram") || lower.includes("energy") || lower.includes("hp") || lower.includes("watt"))) {
        const parts = line.split(/[:=\-]/);
        const val = parts.length > 1 ? parts.slice(1).join(" ").trim() : line;
        if (isCleanHumanText(val) && !isCategoryOrName(val)) extractedPowerStr = val;
      }

      if (!extractedCarbStr && (lower.includes("carburetor") || lower.includes("camera") || lower.includes("control") || lower.includes("brake") || lower.includes("grip"))) {
        const parts = line.split(/[:=\-]/);
        const val = parts.length > 1 ? parts.slice(1).join(" ").trim() : line;
        if (isCleanHumanText(val) && !isCategoryOrName(val)) extractedCarbStr = val;
      }

      if (!extractedTankStr && (lower.includes("tank") || lower.includes("battery") || lower.includes("fuel") || lower.includes("dimension"))) {
        const parts = line.split(/[:=\-]/);
        const val = parts.length > 1 ? parts.slice(1).join(" ").trim() : line;
        if (isCleanHumanText(val) && !isCategoryOrName(val)) extractedTankStr = val;
      }

      if (!extractedWeightStr && (lower.includes("weight") || lower.includes("mass") || lower.includes("kg") || lower.includes("grams") || lower.includes("g"))) {
        const parts = line.split(/[:=\-]/);
        const val = parts.length > 1 ? parts.slice(1).join(" ").trim() : line;
        if (isCleanHumanText(val) && !isCategoryOrName(val)) extractedWeightStr = val;
      }

      if (
        (lower.includes("feature") ||
        lower.includes("system") ||
        lower.includes("control") ||
        lower.includes("smart") ||
        lower.includes("high") ||
        lower.includes("heavy") ||
        lower.includes("fast") ||
        lower.includes("energy")) &&
        !line.endsWith(".pdf") &&
        !line.endsWith(".PDF")
      ) {
        if (isCleanHumanText(line) && !isCategoryOrName(line) && extractedFeatureLines.length < 8 && !extractedFeatureLines.includes(line)) {
          extractedFeatureLines.push(line);
        }
      }

      if ((lower.includes("application") || lower.includes("use") || lower.includes("ideal for") || lower.includes("suitable")) && !line.endsWith(".pdf")) {
        if (isCleanHumanText(line) && !isCategoryOrName(line) && extractedAppLines.length < 3 && !extractedAppLines.includes(line)) {
          extractedAppLines.push(line);
        }
      }
    });

    // Provide Category-Smart Defaults ONLY if NO PDF document was uploaded
    const hasUploadedDocument = Boolean(pdfFile || (documentText && documentText.trim().length > 10));

    if (!hasUploadedDocument) {
      const pCatUpper = pCat.toUpperCase();
      const pNameUpper = pName.toUpperCase();

      if (pCatUpper.includes("ELECTRONICS") || pNameUpper.includes("SMARTPHONE") || pNameUpper.includes("LAPTOP") || pNameUpper.includes("TV") || pNameUpper.includes("EARBUDS")) {
        if (!extractedEngineStr) extractedEngineStr = "Octa-Core 5G High Performance Processor";
        if (!extractedDispStr) extractedDispStr = '6.7" FHD+ AMOLED Display (120Hz)';
        if (!extractedPowerStr) extractedPowerStr = "8GB RAM / 256GB Internal Storage";
        if (!extractedCarbStr) extractedCarbStr = "50MP Ultra-Clear Triple Camera System";
        if (!extractedTankStr) extractedTankStr = "5000 mAh Fast Charge";
        if (!extractedWeightStr) extractedWeightStr = "185 g";
        if (extractedFeatureLines.length === 0) {
          extractedFeatureLines.push(
            "High-Resolution Display with Vibrant Color Accuracy",
            "Advanced Fast Processing Unit & Thermal Control",
            "All-Day Battery Performance & Rapid Charging",
            "Premium Durable Chassis with Ultra-Sleek Ergonomics"
          );
        }
        if (extractedAppLines.length === 0) {
          extractedAppLines.push("Personal Use, Business Productivity, Media & Gaming");
        }
      } else if (pCatUpper.includes("HOME") || pCatUpper.includes("KITCHEN") || pCatUpper.includes("REFRIGERATOR") || pCatUpper.includes("WASHING")) {
        if (!extractedEngineStr) extractedEngineStr = "Smart Inverter Compressor / Quiet Motor";
        if (!extractedDispStr) extractedDispStr = "265 L Total Storage Capacity";
        if (!extractedPowerStr) extractedPowerStr = "5 Star Energy Saver / 1200W Output";
        if (!extractedCarbStr) extractedCarbStr = "Digital Touch Screen Control Panel";
        if (!extractedTankStr) extractedTankStr = "600 x 650 x 1700 mm";
        if (!extractedWeightStr) extractedWeightStr = "52 kg";
        if (extractedFeatureLines.length === 0) {
          extractedFeatureLines.push(
            "High Energy Efficiency Rating & Low Noise Operation",
            "Intelligent Smart Sensor Control & Multi-Mode Settings",
            "Heavy-Duty Stainless Steel Build & Anti-Bacterial Finish",
            "Rapid Performance Technology with Overload Protection"
          );
        }
        if (extractedAppLines.length === 0) {
          extractedAppLines.push("Household, Commercial Kitchen, Office & Hospitality");
        }
      } else if (pCatUpper.includes("POWER TOOLS") || pCatUpper.includes("WASHER") || pCatUpper.includes("CHAINSAW")) {
        if (!extractedEngineStr) extractedEngineStr = "Heavy-Duty Industrial Brushless Motor";
        if (!extractedDispStr) extractedDispStr = "13 mm Keyless Chuck / 400 mm Bar";
        if (!extractedPowerStr) extractedPowerStr = "0-1600 RPM High Impact Speed";
        if (!extractedCarbStr) extractedCarbStr = "Anti-Vibration Rubber Molded Grip";
        if (!extractedTankStr) extractedTankStr = "18V Li-Ion Battery";
        if (!extractedWeightStr) extractedWeightStr = "2.2 kg";
        if (extractedFeatureLines.length === 0) {
          extractedFeatureLines.push(
            "Heavy-Duty Industrial Motor with High Impact Torque",
            "Precision Electronic Speed & Depth Control",
            "Ergonomic Anti-Vibration Rubber Grip",
            "Reinforced Steel Housing for Maximum Durability"
          );
        }
        if (extractedAppLines.length === 0) {
          extractedAppLines.push("Construction, Maintenance, Workshops & DIY Projects");
        }
      } else if (pCatUpper.includes("AUTOMOTIVE")) {
        if (!extractedEngineStr) extractedEngineStr = "High Torque Electric Brushless Hub Motor";
        if (!extractedDispStr) extractedDispStr = "72V 30Ah Lithium Battery Pack";
        if (!extractedPowerStr) extractedPowerStr = "65 km/h Top Speed / 2500W Output";
        if (!extractedCarbStr) extractedCarbStr = "Dual Disc Brakes & Hydraulic Suspension";
        if (!extractedTankStr) extractedTankStr = "72V 30Ah Battery";
        if (!extractedWeightStr) extractedWeightStr = "78 kg";
        if (extractedFeatureLines.length === 0) {
          extractedFeatureLines.push(
            "High Efficiency Electric Drive Engine",
            "Smart Digital Dashboard & All-Weather Chassis",
            "Quick Charge Battery System with Extended Mileage Range",
            "Regenerative Braking & Safety Control Unit"
          );
        }
        if (extractedAppLines.length === 0) {
          extractedAppLines.push("Daily Commute, Urban Mobility, Personal Transport");
        }
      } else {
        if (!extractedEngineStr) extractedEngineStr = "42.7cc 2-Stroke Air-Cooled Engine";
        if (!extractedDispStr) extractedDispStr = "42.7 cc";
        if (!extractedPowerStr) extractedPowerStr = "1.25 kW / 1.7 HP @ 7000 RPM";
        if (!extractedCarbStr) extractedCarbStr = "Diaphragm Carburetor System";
        if (!extractedTankStr) extractedTankStr = "1.2 L Fuel Tank";
        if (!extractedWeightStr) extractedWeightStr = "7.5 kg";
        if (extractedFeatureLines.length === 0) {
          extractedFeatureLines.push(
            "Heavy-Duty Air-Cooled Agricultural Engine",
            "High RPM Cutting Speed & Durable Alloy Blade",
            "Ergonomic Shoulder Harness Support for Field Mobility",
            "Easy Recoil Starter System"
          );
        }
        if (extractedAppLines.length === 0) {
          extractedAppLines.push("Agriculture, Landscaping, Commercial & Field Operations");
        }
      }
    }

    return {
      engine: extractedEngineStr,
      displacement: extractedDispStr,
      power: extractedPowerStr,
      carburetor: extractedCarbStr,
      fuelTank: extractedTankStr,
      dryWeight: extractedWeightStr,
      features: extractedFeatureLines.join("\n"),
      applications: extractedAppLines.join(", "),
    };
  };

  const startBrochureAnalysis = async () => {
    setBrochureStep(4);
    setAiAnalysisProgress(20);
    setAiAnalysisStatus("Connecting to Gemini AI Engine (Google Cloud)...");

    const localSpecs = extractDetailsStrictlyFromBrochure(
      newProductName,
      newProductCategory,
      newProductBrand,
      brochurePdfFile,
      brochureTextContent
    );

    const applySpecs = (specs: typeof localSpecs) => {
      setExtractedEngine(specs.engine);
      setExtractedDisplacement(specs.displacement);
      setExtractedPower(specs.power);
      setExtractedCarburetor(specs.carburetor);
      setExtractedFuelTank(specs.fuelTank);
      setExtractedDryWeight(specs.dryWeight);
      setExtractedFeaturesText(specs.features);
      setExtractedApplicationsText(specs.applications);
    };

    const userGeminiApiKey = "AQ.Ab8RN6LGGO1qe-aPZiIPWP3LZJ5seFRftH7-BuYZg9PMS4EscA";
    const promptText = `
Product Name: ${newProductName}
Category: ${newProductCategory}
Brand: ${newProductBrand}
Brochure Document Text & Tables:
${brochureTextContent || localSpecs.features}
    `.trim();

    let aiExtractedSpecs: typeof localSpecs | null = null;

    // 1. Primary: Direct Google Gemini REST API
    try {
      setAiAnalysisProgress(50);
      setAiAnalysisStatus(`Analyzing Brochure Table Specs for "${newProductName || "Product"}" with Gemini...`);

      const geminiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${userGeminiApiKey}`;
      const geminiRes = await fetch(geminiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `You are an expert technical brochure specification table parser. Parse all key-value tables and specs from the provided brochure document. Return ONLY a valid JSON object with keys:
"engine" (Processor / CPU / Motor / Engine Model),
"displacement" (Display / Screen Size / Displacement / Capacity),
"power" (Graphics / GPU / RAM / Storage / Max Power Output),
"carburetor" (Connectivity / OS / Camera / Control System / Carburetor),
"fuelTank" (Battery / Fuel Tank / Dimensions),
"dryWeight" (Weight),
"features" (multiline bullet list of all extracted specs from the table),
"applications" (comma separated applications).

Document to parse:
${promptText}`,
                },
              ],
            },
          ],
          generationConfig: {
            responseMimeType: "application/json",
          },
        }),
      });

      if (geminiRes.ok) {
        const data = await geminiRes.json();
        const rawJsonText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (rawJsonText) {
          const json = JSON.parse(rawJsonText);
          aiExtractedSpecs = {
            engine: json.engine || localSpecs.engine,
            displacement: json.displacement || localSpecs.displacement,
            power: json.power || localSpecs.power,
            carburetor: json.carburetor || localSpecs.carburetor,
            fuelTank: json.fuelTank || localSpecs.fuelTank,
            dryWeight: json.dryWeight || localSpecs.dryWeight,
            features: json.features || localSpecs.features,
            applications: json.applications || localSpecs.applications,
          };
        }
      }
    } catch (err) {
      console.warn("Gemini REST API fetch error:", err);
    }

    // 2. Secondary: OpenRouter API Fallback
    if (!aiExtractedSpecs) {
      try {
        setAiAnalysisProgress(75);
        setAiAnalysisStatus("Connecting to OpenRouter AI Fallback Engine...");

        const openRouterKey = "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";
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${openRouterKey}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "https://sellgrow.web",
            "X-Title": "SellGrow Equipment Brochure Analyzer",
          },
          body: JSON.stringify({
            model: "google/gemini-2.5-flash",
            messages: [
              {
                role: "system",
                content:
                  "You are an expert technical brochure specification table parser. Parse all key-value tables and specs from the provided brochure document. Return ONLY a valid JSON object with keys: engine, displacement, power, carburetor, fuelTank, dryWeight, features, applications.",
              },
              {
                role: "user",
                content: promptText,
              },
            ],
            response_format: { type: "json_object" },
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const contentStr = data.choices?.[0]?.message?.content;
          if (contentStr) {
            const json = JSON.parse(contentStr);
            aiExtractedSpecs = {
              engine: json.engine || localSpecs.engine,
              displacement: json.displacement || localSpecs.displacement,
              power: json.power || localSpecs.power,
              carburetor: json.carburetor || localSpecs.carburetor,
              fuelTank: json.fuelTank || localSpecs.fuelTank,
              dryWeight: json.dryWeight || localSpecs.dryWeight,
              features: json.features || localSpecs.features,
              applications: json.applications || localSpecs.applications,
            };
          }
        }
      } catch (err) {
        console.warn("OpenRouter API fetch error:", err);
      }
    }

    setAiAnalysisProgress(85);
    setAiAnalysisStatus("Formatting Specification Fields & Table Rows...");

    applySpecs(aiExtractedSpecs || localSpecs);

    setAiAnalysisProgress(100);
    setTimeout(() => {
      setBrochureStep(5);
    }, 400);
  };

  const handleSaveAndPublishProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `gm-custom-${Date.now()}`;
    const featuresArr = extractedFeaturesText
      .split("\n")
      .map((f) => f.trim())
      .filter(Boolean);
    const appsArr = extractedApplicationsText
      .split(",")
      .map((a) => a.trim())
      .filter(Boolean);

    // Build specs object containing ONLY non-empty extracted values (NO default fake values)
    const rawSpecs: Record<string, string> = {};
    if (extractedEngine) rawSpecs["Engine Model"] = extractedEngine;
    if (extractedDisplacement) rawSpecs["Displacement"] = extractedDisplacement;
    if (extractedPower) rawSpecs["Max Output"] = extractedPower;
    if (extractedCarburetor) rawSpecs["Carburetor"] = extractedCarburetor;
    if (extractedFuelTank) rawSpecs["Fuel Tank"] = extractedFuelTank;
    if (extractedDryWeight) rawSpecs["Dry Weight"] = extractedDryWeight;

    const createdProduct: ProductItem = {
      id: newId,
      name: newProductName || "Custom Equipment",
      category: newProductCategory || "General",
      brand: newProductBrand || "Standard",
      shortDesc: `${newProductName || "Equipment"} - Professional Grade.`,
      fullDesc: `Commercial grade ${newProductName || "equipment"} ${extractedEngine ? "powered by " + extractedEngine : ""}. High performance for field operations.`,
      engine: extractedEngine || "",
      displacement: extractedDisplacement || "",
      power: extractedPower || "",
      weight: extractedDryWeight || "",
      cuttingWidth: "",
      fuelCapacity: extractedFuelTank || "",
      imageBgColor: "from-sky-500/10 to-indigo-500/10",
      image: newProductImage || "/logos/logo.png",
      hologramVideo: undefined,
      highlights: featuresArr.length > 0 ? featuresArr : [newProductName || "High Quality Build"],
      specs: rawSpecs,
      voiceGreeting: {
        en: `Hello, I am the AI assistant for ${newProductName || "this equipment"}. How can I assist you today?`,
        ta: `வணக்கம், ${newProductName || "இந்த சாதனம்"} பற்றிய விவரங்கள் தயாராக உள்ளன. நான் எவ்வாறு உதவ முடியும்?`,
      },
    };

    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("sellgrow_catalog_products");
        let parsed: ProductItem[] = [];
        if (stored) {
          parsed = JSON.parse(stored);
        }
        const updated = [createdProduct, ...parsed];
        localStorage.setItem("sellgrow_catalog_products", JSON.stringify(updated));
      } catch (err) {}
    }

    setProductsList((prev) => [createdProduct, ...prev]);
    setSelectedCategory("All");

    setBrochureSaveSuccess(true);
    setTimeout(() => {
      resetAddProductModal();
      setIsBrochureModalOpen(false);
    }, 1500);
  };

  const resetAddProductModal = () => {
    setBrochureStep(1);
    setNewProductName("");
    setNewProductCategory("");
    setNewProductBrand("GEORGE MAIJO EQUIPMENT");
    setNewProductImage(null);
    setImageFileName("");
    setBrochurePdfFile(null);
    setPdfFileName("");
    setBrochureTextContent("");
    setAiAnalysisProgress(0);
    setAiAnalysisStatus("");
    setExtractedEngine("");
    setExtractedDisplacement("");
    setExtractedPower("");
    setExtractedCarburetor("");
    setExtractedFuelTank("");
    setExtractedDryWeight("");
    setExtractedFeaturesText("");
    setExtractedApplicationsText("");
    setBrochureSaveSuccess(false);
  };

  // TTS Helper
  const speakTTS = (text: string, lang: "en" | "ta") => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === "ta" ? "ta-IN" : "en-US";
      utterance.rate = 0.95;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
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
      let reply = "";
      if (voiceLang === "ta") {
        reply = `${voiceModelProduct.name} - எஞ்சின்: ${voiceModelProduct.displacement}, ஆற்றல்: ${voiceModelProduct.power}. இது மிகவும் சக்திவாய்ந்த விவசாய சாதனம்.`;
      } else {
        reply = `${voiceModelProduct.name} is equipped with a ${voiceModelProduct.engine} (${voiceModelProduct.displacement}). Output power: ${voiceModelProduct.power}. Ideal for agricultural fields.`;
      }
      setAiHistory((prev) => [...prev, { sender: "ai", text: reply }]);
      speakTTS(reply, voiceLang);
    }, 500);
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
      
      {/* TOP BANNER - MATCHING SELLGROW MAIN LOGO BRAND THEME (PRIMARY DEEP BLUE & SECONDARY EMERALD) */}
      <header className="bg-gradient-to-r from-primary via-indigo-700 to-secondary text-white py-9 px-4 shadow-xl text-center relative overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-2 relative z-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-white drop-shadow-md">
            Products Catalog
          </h1>
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-sky-100 opacity-90">
            <Link href="/" className="hover:underline">Home</Link>
            <span>/</span>
            <span className="text-white font-bold">Products</span>
          </div>
        </div>

        {/* Decorative Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">

        {/* ======================================================== */}
        {/* VIEW 1: CATALOG GRID VIEW (MATCHING IMAGE 1 & IMAGE 2) */}
        {/* ======================================================== */}
        {viewMode === "catalog" && (
          <div className="space-y-8">

            {/* COMPANY STORES SELECTOR BAR */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-extrabold uppercase tracking-wider text-foreground font-display flex items-center gap-2">
                    <span>🏢 Registered Company Stores & Master Catalogs</span>
                  </h2>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Select a client company to view its products and machinery catalog.
                  </p>
                </div>
                {selectedCompany !== "All" && (
                  <button
                    onClick={() => setSelectedCompany("All")}
                    className="text-xs text-primary font-bold hover:underline flex items-center gap-1"
                  >
                    <span>← View All Companies</span>
                  </button>
                )}
              </div>

              {/* Company Tabs Bar */}
              <div className="flex flex-wrap items-center gap-2 bg-white dark:bg-slate-900 p-2 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                {[
                  { id: "All", name: "All Stores", icon: "🏢", count: productsList.length },
                  { id: "George Maijo Equipment", name: "George Maijo Equipment", icon: "🌿", count: 17, badge: "Superadmin Store" },
                  { id: "NOMO", name: "NOMO Retail & Fleet", icon: "🛒", count: 21, badge: "Client Company" },
                  { id: "Apex Logistics Ltd.", name: "Apex Logistics", icon: "🚚", count: 8 },
                  { id: "GreenField Agri Farms", name: "GreenField Agri", icon: "🌾", count: 14 },
                ].map((comp) => (
                  <button
                    key={comp.id}
                    onClick={() => setSelectedCompany(comp.id)}
                    className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 shadow-sm ${
                      selectedCompany === comp.id
                        ? "bg-primary text-white shadow-md shadow-primary/20 ring-2 ring-primary/30"
                        : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
                    }`}
                  >
                    <span className="text-sm">{comp.icon}</span>
                    <span>{comp.name}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                      selectedCompany === comp.id ? "bg-white/20 text-white" : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                    }`}>
                      {comp.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* Interactive Company Cards Grid (Shown when All Companies selected) */}
              {selectedCompany === "All" && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                  {[
                    { id: "George Maijo Equipment", name: "George Maijo Equipment", desc: "Superadmin Master Store — Agriculture Machinery, Brush Cutters & Power Weeders Fleet.", icon: "🌿", badge: "Superadmin Store", color: "from-emerald-600 to-teal-700", count: 17 },
                    { id: "NOMO", name: "NOMO Store & Fleet", desc: "Client Tenant Store — Retail Grocery Products & Agricultural Machinery Rentals.", icon: "🛒", badge: "Client Company", color: "from-blue-600 to-indigo-700", count: 21 },
                    { id: "Apex Logistics Ltd.", name: "Apex Logistics Store", desc: "Commercial Distribution Partner — Heavy Transport & Freight Equipment.", icon: "🚚", badge: "Verified Partner", color: "from-purple-600 to-violet-700", count: 8 },
                  ].map((compCard) => (
                    <div
                      key={compCard.id}
                      onClick={() => setSelectedCompany(compCard.id)}
                      className="p-5 rounded-2xl bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-slate-800 hover:border-primary/50 cursor-pointer transition-all shadow-sm hover:shadow-lg space-y-3 group"
                    >
                      <div className="flex justify-between items-start">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/10 to-emerald-500/10 border border-primary/20 text-2xl flex items-center justify-center shadow-sm">
                          {compCard.icon}
                        </div>
                        <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                          {compCard.badge}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-base font-extrabold text-foreground font-display group-hover:text-primary transition-colors">{compCard.name}</h3>
                        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{compCard.desc}</p>
                      </div>
                      <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-primary">
                        <span>Catalog ({compCard.count} Items)</span>
                        <span className="group-hover:translate-x-1 transition-transform">Explore Products →</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Active Selected Company Header Banner */}
              {selectedCompany !== "All" && (
                <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white border border-slate-700/60 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-primary text-white text-2xl font-bold flex items-center justify-center shadow-md">
                      {selectedCompany === "George Maijo Equipment" ? "🌿" : selectedCompany === "NOMO" ? "🛒" : "🏢"}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-extrabold font-display text-white">{selectedCompany} Catalog</h3>
                        <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-500 text-white">Verified Store</span>
                      </div>
                      <p className="text-xs text-slate-300 mt-0.5">
                        Showing all live products synced for <strong className="text-emerald-400">{selectedCompany}</strong>.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedCompany("All")}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold border border-white/20 transition-all shrink-0"
                  >
                    🔄 Switch Store Company
                  </button>
                </div>
              )}
            </div>
            
            {/* Category Filter Dropdown, Search Bar & Display Layout Toggles */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              
              {/* Category Filter Dropdown */}
              <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
                <div className="relative inline-block w-full sm:w-64">
                  <div className="flex items-center gap-2 px-4 py-2.5 bg-primary/10 dark:bg-primary/20 border border-primary/30 rounded-xl text-xs font-bold text-primary dark:text-sky-300 cursor-pointer shadow-sm">
                    <Filter className="w-4 h-4 text-primary dark:text-sky-400" />
                    <span>Category:</span>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="bg-transparent font-bold text-primary dark:text-sky-300 focus:outline-none cursor-pointer flex-1"
                    >
                      {availableCategories.map((cat) => (
                        <option key={cat} value={cat} className="bg-white dark:bg-slate-900 text-foreground">
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Search Bar & Add Brochure Button */}
              <div className="flex items-center gap-2.5 w-full lg:w-auto">
                <div className="relative w-full sm:w-56">
                  <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search catalog models..."
                    className="w-full pl-9 pr-4 py-2 bg-slate-100 dark:bg-slate-800 text-xs rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-primary"
                  />
                </div>

                {/* 📄 ADD BROCHURE BUTTON */}
                <button
                  onClick={() => setIsBrochureModalOpen(true)}
                  className="px-4 py-2 bg-gradient-to-r from-primary to-secondary hover:opacity-95 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all shadow-md shadow-primary/20 shrink-0 active:scale-95 border border-white/20"
                  title="Add or Download Product Brochure PDF"
                >
                  <FileText className="w-4 h-4 text-white" />
                  <span>Add Brochure</span>
                </button>
              </div>
            </div>

            {/* Global Keyframes for Horizontal Continuous Left-to-Right Moving Ticker */}
            <style jsx global>{`
              @keyframes marqueeMoveLeftToRight {
                0% { transform: translateX(-50%); }
                100% { transform: translateX(0%); }
              }
              .animate-marquee-continuous {
                display: flex;
                width: max-content;
                animation: marqueeMoveLeftToRight 90s linear infinite;
              }
              .animate-marquee-continuous:hover {
                animation-play-state: paused !important;
              }
            `}</style>

            {/* SINGLE-LINE HORIZONTAL CONTINUOUS MOVING SHOWCASE (AUTOMATICALLY SHOWN WHEN "ALL STORES" IS SELECTED) */}
            {selectedCompany === "All" && filteredProducts.length > 0 && (
              <div className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden py-6 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 border-y border-slate-800 shadow-2xl">
                  {/* Left & Right Edge Vignette Gradient Effects */}
                  <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-950 to-transparent z-20 pointer-events-none" />
                  <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-950 to-transparent z-20 pointer-events-none" />

                  {/* Single Line Moving Marquee Track */}
                  <div className="animate-marquee-continuous gap-6 px-6">
                    {[...filteredProducts, ...filteredProducts, ...filteredProducts, ...filteredProducts].map((product, idx) => (
                      <div
                        key={`${product.id}-marquee-${idx}`}
                        onClick={() => openProductDetail(product)}
                        className="w-72 sm:w-80 shrink-0 bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden cursor-pointer hover:border-primary hover:shadow-2xl transition-all flex flex-col justify-between p-4 space-y-3 group"
                      >
                        <div className="relative w-full h-36 rounded-2xl bg-slate-50 dark:bg-[#0a0f1d] border border-slate-100 dark:border-slate-800 p-2 flex items-center justify-center">
                          <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full text-[9px] font-extrabold bg-gradient-to-r from-primary to-secondary text-white uppercase tracking-wider shadow-sm">
                            {product.category}
                          </span>
                          <img
                            src={product.image || "https://www.georgemaijoagri.com/wp-content/uploads/2024/10/2.5.BC-520@2x.png"}
                            alt={product.name}
                            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>

                        <div>
                          <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider block">{product.brand}</span>
                          <h4 className="text-sm font-extrabold text-foreground font-display line-clamp-1 group-hover:text-primary transition-colors">{product.name}</h4>
                          <p className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5">{product.shortDesc || product.fullDesc}</p>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/80">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={(e) => openVoiceAssistant(e, product)}
                              className="w-8 h-8 rounded-full bg-primary hover:opacity-90 text-white flex items-center justify-center shadow-md transition-all shrink-0"
                              title="Play AI Voice Assistant"
                            >
                              <Mic className="w-4 h-4" />
                            </button>
                            <button
                              onClick={(e) => open3DHologram(e, product)}
                              className="w-8 h-8 rounded-full bg-indigo-600 hover:opacity-90 text-white flex items-center justify-center shadow-md transition-all shrink-0"
                              title="3D Hologram View"
                            >
                              <Hologram3DIcon className="w-4 h-4" />
                            </button>
                          </div>

                          <span className="text-xs font-bold text-primary dark:text-sky-400 flex items-center gap-1 group-hover:underline">
                            View Details <ChevronRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
            )}

            {/* CATALOG PRODUCT GRID VIEW (AUTOMATICALLY SHOWN WHEN A SPECIFIC COMPANY IS SELECTED) */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 space-y-4">
                <Box className="w-12 h-12 text-slate-400 mx-auto" />
                <h3 className="text-lg font-bold">No Products Found</h3>
                <p className="text-xs text-muted-foreground">Try clearing search filters or selecting another category.</p>
                <button
                  onClick={() => {
                    setSelectedCategory("All");
                    setSearchQuery("");
                  }}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold"
                >
                  Reset Filters
                </button>
              </div>
            ) : selectedCompany !== "All" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => {
                  const isHovered = hoveredProductId === product.id;

                  return (
                    <div
                      key={product.id}
                      onClick={() => openProductDetail(product)}
                      onMouseEnter={() => setHoveredProductId(product.id)}
                      onMouseLeave={() => setHoveredProductId(null)}
                      className={`group relative bg-white dark:bg-[#0c1322] border rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                        isHovered
                          ? "border-2 border-primary shadow-[0_15px_35px_rgba(37,99,235,0.25)] -translate-y-1.5"
                          : "border-slate-200 dark:border-slate-800/80 shadow-md hover:shadow-xl"
                      }`}
                    >
                      {/* Unified 4:3 Image Stage (Clean Static Background) */}
                      <div className="relative w-full aspect-[4/3] bg-slate-50 dark:bg-[#0a0f1d] overflow-hidden border-b border-slate-100 dark:border-slate-800/60 rounded-t-3xl flex items-center justify-center p-3">
                        
                        {/* Category Pill Tag */}
                        <div className="absolute top-3 left-3 z-20">
                          <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-gradient-to-r from-primary to-secondary text-white shadow-md">
                            {product.category}
                          </span>
                        </div>

                        {/* Product Image / Vector Graphic */}
                        <div className="relative z-10 w-full h-full flex items-center justify-center">
                          {product.image ? (
                            <img
                              src={product.image}
                              alt={product.name}
                              className="max-h-full max-w-full object-contain p-1 drop-shadow-xl"
                            />
                          ) : (
                            <ProductGraphic product={product} />
                          )}
                        </div>
                      </div>

                      {/* Card Footer Body - Stacked Layout for Full Title Width & Clean Actions */}
                      <div className="p-4 bg-white dark:bg-[#0c1322] border-t border-slate-100 dark:border-slate-800/80 space-y-3">
                        {/* Row 1: Brand & Product Title (Full Width) */}
                        <div>
                          <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
                            {product.brand}
                          </span>
                          <h3 className="text-base font-extrabold text-foreground font-display group-hover:text-primary dark:group-hover:text-sky-400 transition-colors mt-0.5">
                            {product.name}
                          </h3>
                        </div>

                        {/* Row 2: Action Controls & View Details */}
                        <div className="flex items-center justify-between pt-2.5 border-t border-slate-100 dark:border-slate-800/60">
                          <div className="flex items-center gap-2.5">
                            {/* 🎙️ Ask AI Voice Quick Trigger */}
                            <button
                              onClick={(e) => openVoiceAssistant(e, product)}
                              title="Ask AI Voice Assistant"
                              className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-indigo-600 hover:opacity-95 text-white flex items-center justify-center shadow-md shadow-primary/30 transition-transform active:scale-95 shrink-0"
                            >
                              <Mic className="w-5 h-5 stroke-[2.2]" />
                            </button>

                            {/* 🔮 3D Hologram Quick Trigger */}
                            <button
                              onClick={(e) => open3DHologram(e, product)}
                              title="3D Hologram View"
                              className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-600 via-indigo-500 to-sky-500 hover:opacity-95 text-white flex items-center justify-center shadow-md shadow-indigo-500/30 transition-transform active:scale-95 shrink-0"
                            >
                              <Hologram3DIcon className="w-5 h-5" />
                            </button>
                          </div>

                          <span className="text-xs font-extrabold text-primary dark:text-sky-400 group-hover:underline flex items-center gap-1">
                            View Details <ChevronRight className="w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
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
              onClick={() => setViewMode("catalog")}
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

                    {activeProduct.image ? (
                      <img
                        src={activeProduct.image}
                        alt={activeProduct.name}
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
                      {activeProduct.fullDesc}
                    </p>

                    {/* Interactive Assistant & Options Box (Clean Padded Layout) */}
                    <div className="p-4 sm:p-5 bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-500/30 rounded-2xl space-y-3">
                      <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 block">
                        ✨ Interactive Assistant & Options
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {/* 🎙️ Ask AI Voice Button */}
                        <button
                          onClick={(e) => openVoiceAssistant(e, activeProduct)}
                          className="h-11 px-4 py-2.5 bg-white dark:bg-slate-900 hover:bg-emerald-50 dark:hover:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 rounded-xl text-xs sm:text-sm font-bold border border-emerald-500/40 flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95"
                        >
                          <Mic className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>Ask AI Voice</span>
                        </button>

                        {/* 🔮 3D Hologram Button */}
                        <button
                          onClick={(e) => open3DHologram(e, activeProduct)}
                          className="h-11 px-4 py-2.5 bg-white dark:bg-slate-900 hover:bg-sky-50 dark:hover:bg-sky-950/80 text-sky-700 dark:text-sky-300 rounded-xl text-xs sm:text-sm font-bold border border-sky-500/40 flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95"
                        >
                          <Hologram3DIcon className="w-4 h-4 text-sky-500 shrink-0" />
                          <span>3D Hologram</span>
                        </button>
                      </div>
                    </div>

                    {/* Action CTAs */}
                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <a
                        href="#enquiry-form"
                        className="h-11 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition-transform active:scale-95"
                      >
                        <Send className="w-4 h-4" />
                        Send Enquiry
                      </a>
                      <a
                        href={`https://wa.me/?text=Hi,%20I%20am%20interested%20in%20${encodeURIComponent(activeProduct.name)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="h-11 px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-emerald-500/20 flex items-center justify-center gap-2 transition-transform active:scale-95"
                      >
                        <MessageSquare className="w-4 h-4" />
                        WhatsApp Chat
                      </a>
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
                      <p>{activeProduct.fullDesc}</p>
                      <h4 className="font-extrabold text-foreground text-sm pt-2">Key Highlights:</h4>
                      <div className="space-y-2">
                        {activeProduct.highlights.map((item, idx) => (
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
                          {Object.entries(activeProduct.specs).map(([key, val], idx) => (
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

            {/* Language Switch */}
            <div className="flex items-center justify-between bg-slate-900 p-2 rounded-xl border border-slate-800 text-xs">
              <span className="text-slate-400 font-bold">Voice Language:</span>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setVoiceLang("ta");
                    speakTTS(voiceModelProduct.voiceGreeting.ta, "ta");
                  }}
                  className={`px-3 py-1 rounded-lg font-bold text-xs ${voiceLang === "ta" ? "bg-emerald-500 text-white" : "text-slate-400"}`}
                >
                  🇮🇳 தமிழ்
                </button>
                <button
                  onClick={() => {
                    setVoiceLang("en");
                    speakTTS(voiceModelProduct.voiceGreeting.en, "en");
                  }}
                  className={`px-3 py-1 rounded-lg font-bold text-xs ${voiceLang === "en" ? "bg-emerald-500 text-white" : "text-slate-400"}`}
                >
                  🇺🇸 English
                </button>
              </div>
            </div>

            {/* Live Conversation Window */}
            <div className="h-48 overflow-y-auto space-y-2 p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-xs">
              {aiHistory.map((h, i) => (
                <div key={i} className={`flex ${h.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`p-2.5 rounded-xl max-w-[85%] ${h.sender === "user" ? "bg-emerald-600 text-white" : "bg-slate-800 text-slate-200 border border-slate-700"}`}>
                    {h.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSendVoiceQuery} className="flex gap-2">
              <input
                type="text"
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
                placeholder={voiceLang === "ta" ? "கேள்வி தட்டச்சு செய்க: எ.கா. 'வணக்கம், எப்படி இருக்கிறீர்கள்?'" : "Ask about specs, engine, or price..."}
                className="flex-1 px-3 py-2 bg-slate-900 text-white text-xs rounded-xl border border-slate-800 focus:outline-none focus:border-emerald-500"
              />
              <button type="submit" className="px-4 py-2 bg-emerald-500 text-white font-bold rounded-xl text-xs">
                Speak
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 2: 🔮 3D HOLOGRAM INTERACTIVE VIEWER MODAL */}
      {/* ======================================================== */}
      {is3DModalOpen && hologramProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/90 backdrop-blur-xl overflow-y-auto animate-in fade-in duration-300">
          <div className={`relative w-full ${isHologramFullscreen ? "max-w-7xl" : "max-w-5xl"} bg-slate-950 text-white rounded-3xl border border-sky-500/30 p-5 sm:p-7 shadow-[0_0_80px_rgba(14,165,233,0.15)] space-y-5 transition-all duration-300`}>
            
            {/* Modal Glass Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800/80 pb-4 gap-3">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-sky-500/20 to-indigo-500/20 text-sky-400 border border-sky-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(56,189,248,0.2)]">
                  <Sparkles className="w-6 h-6 animate-pulse text-sky-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-widest bg-sky-500/10 text-sky-400 border border-sky-500/30">
                      3D Spatial Hologram Stage
                    </span>
                    <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      Live Projection Sync
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-white tracking-tight mt-0.5">{hologramProduct.name}</h3>
                  <p className="text-xs text-slate-400 font-medium">{hologramProduct.brand} • {hologramProduct.category}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <button
                  onClick={() => setIsHologramFullscreen(!isHologramFullscreen)}
                  className="p-2 text-slate-400 hover:text-sky-400 rounded-xl hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-all flex items-center gap-1.5 text-xs"
                  title="Toggle Display Size"
                >
                  {isHologramFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                  <span className="hidden sm:inline">{isHologramFullscreen ? "Standard" : "Expand"}</span>
                </button>
                <button
                  onClick={() => setIs3DModalOpen(false)}
                  className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-900 border border-slate-800 transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Main Stage Grid Container */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              
              {/* Left Column: 3D Holographic Interactive Viewport */}
              <div className="lg:col-span-8 flex flex-col space-y-3">
                <div className="relative w-full aspect-[16/10] bg-[#020617] rounded-2xl overflow-hidden border border-sky-500/30 shadow-[inset_0_0_40px_rgba(2,6,23,0.9)] flex items-center justify-center group">
                  
                  {/* Futuristic Grid Matrix Backdrop */}
                  <div className="absolute inset-0 bg-[radial-gradient(#38bdf818_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
                  
                  {/* Glowing Sci-Fi Pedestal Floor */}
                  <div className="absolute bottom-2 w-72 h-14 rounded-[100%] bg-sky-500/15 border border-sky-400/30 shadow-[0_0_40px_rgba(56,189,248,0.5)] animate-pulse pointer-events-none" />

                  {/* Corner Sci-Fi Viewport Brackets */}
                  <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-sky-400/70 pointer-events-none" />
                  <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-sky-400/70 pointer-events-none" />
                  <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-sky-400/70 pointer-events-none" />
                  <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-sky-400/70 pointer-events-none" />

                  {/* Top HUD Stats Overlay */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-20">
                    <div className="bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-sky-500/30 text-[10px] font-mono text-sky-300 flex items-center gap-2 shadow-lg">
                      <Activity className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
                      <span>HUD MATRIX • 360° WIREFRAME</span>
                    </div>
                    <div className="bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-emerald-500/30 text-[10px] font-mono text-emerald-400 flex items-center gap-2 shadow-lg">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      <span>7000 RPM ENGINE SIM</span>
                    </div>
                  </div>

                  {/* Video or Graphic Player Container with 360 Degree Orbit Animation */}
                  <style jsx global>{`
                    @keyframes orbit360Stage {
                      0% { transform: perspective(1000px) rotateY(0deg); }
                      100% { transform: perspective(1000px) rotateY(360deg); }
                    }
                    .animate-360-stage-orbit {
                      animation: orbit360Stage 12s linear infinite;
                    }
                  `}</style>

                  {/* Interactive Mouse & Touch Drag 360° Rotation Viewport Stage */}
                  <div
                    onMouseDown={handleHologramMouseDown}
                    onMouseMove={handleHologramMouseMove}
                    onMouseUp={handleHologramMouseUp}
                    onMouseLeave={handleHologramMouseUp}
                    onTouchStart={handleHologramTouchStart}
                    onTouchMove={handleHologramTouchMove}
                    onTouchEnd={handleHologramTouchEnd}
                    className={`relative z-10 w-full h-full flex items-center justify-center p-1 select-none ${
                      isDraggingHologram ? "cursor-grabbing" : "cursor-grab"
                    }`}
                  >
                    {/* Floating Mouse Rotation Guidance Badge */}
                    <div className="absolute top-3 right-3 z-30 bg-slate-950/85 backdrop-blur-md px-3 py-1.5 rounded-xl border border-sky-500/40 text-[10px] font-mono text-sky-300 flex items-center gap-1.5 shadow-lg pointer-events-none">
                      <span className="text-sm">🖱️</span>
                      <span>{isDraggingHologram ? `360° Drag Angle: ${Math.round(dragRotationAngle)}°` : "Click & Drag mouse to rotate 360°"}</span>
                    </div>

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
                          className="w-full h-full object-contain rounded-xl filter drop-shadow-[0_0_25px_rgba(56,189,248,0.4)] pointer-events-none"
                        />
                      ) : (
                        <ProductGraphic product={hologramProduct} is3DHover={true} />
                      )}
                    </div>
                  </div>

                  {/* Floating Custom HUD Control Bar */}
                  <div className="absolute bottom-3 left-3 right-3 z-30 bg-slate-950/85 backdrop-blur-xl border border-sky-500/30 rounded-2xl p-2 sm:p-2.5 flex items-center justify-between shadow-2xl">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={toggleHologramPlay}
                        className="p-2 bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 rounded-xl border border-sky-500/30 transition-all flex items-center gap-1.5 text-xs font-bold"
                        title={isHologramPlaying ? "Pause Model" : "Play Model"}
                      >
                        {isHologramPlaying ? <Pause className="w-4 h-4 text-sky-400" /> : <Play className="w-4 h-4 text-sky-400 fill-sky-400" />}
                        <span className="hidden sm:inline">{isHologramPlaying ? "Pause" : "Play"}</span>
                      </button>

                      <button
                        onClick={toggleHologramMute}
                        className={`p-2 rounded-xl border transition-all flex items-center gap-1.5 text-xs font-bold ${
                          !isHologramMuted
                            ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                            : "bg-slate-900 text-slate-400 border-slate-800 hover:text-white"
                        }`}
                        title={isHologramMuted ? "Unmute Audio" : "Mute Audio"}
                      >
                        {!isHologramMuted ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4" />}
                        <span className="hidden sm:inline">{!isHologramMuted ? "Audio ON" : "Muted"}</span>
                      </button>

                      {/* Clean 360° Orbit Button */}
                      <button
                        onClick={() => setIs360Rotating(!is360Rotating)}
                        className={`p-2 rounded-xl border transition-all flex items-center gap-1.5 text-xs font-bold ${
                          is360Rotating
                            ? "bg-sky-500/20 text-sky-300 border-sky-500/40 shadow-sm"
                            : "bg-slate-900 text-slate-400 border-slate-800 hover:text-white"
                        }`}
                        title="Toggle 360° Orbit View"
                      >
                        <RotateCw className={`w-4 h-4 ${is360Rotating ? "animate-spin text-sky-400" : "text-slate-400"}`} />
                        <span className="hidden sm:inline">{is360Rotating ? "360° Orbit ON" : "360° Orbit OFF"}</span>
                      </button>
                    </div>

                    <div className="text-[11px] font-mono text-slate-400 hidden md:flex items-center gap-2">
                      <Cpu className="w-3.5 h-3.5 text-sky-400" />
                      <span>360° Spatial Telemetry Engine</span>
                    </div>

                    <button
                      onClick={() => setIsHologramFullscreen(!isHologramFullscreen)}
                      className="p-2 bg-slate-900 hover:bg-slate-800 text-sky-300 rounded-xl border border-slate-800 transition-all text-xs flex items-center gap-1"
                    >
                      {isHologramFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Holographic Specs & Telemetry Dashboard */}
              <div className="lg:col-span-4 flex flex-col justify-between bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 sm:p-5 space-y-4 backdrop-blur-md">
                
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                    <span className="text-xs font-black uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
                      <Cpu className="w-4 h-4 text-sky-400" />
                      System Telemetry
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      VERIFIED SPECS
                    </span>
                  </div>

                  {/* Telemetry Grid */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-0.5">
                      <span className="text-[10px] font-mono text-slate-400 uppercase block">Displacement</span>
                      <span className="font-bold text-white text-xs">{hologramProduct.displacement || "35.8 cc"}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-0.5">
                      <span className="text-[10px] font-mono text-slate-400 uppercase block">Engine Type</span>
                      <span className="font-bold text-white text-xs truncate block" title={hologramProduct.engine}>{hologramProduct.engine || "4-Stroke OHC"}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-0.5">
                      <span className="text-[10px] font-mono text-slate-400 uppercase block">Max Output</span>
                      <span className="font-bold text-white text-xs">{hologramProduct.power || "1.0 kW / 1.4 HP"}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-0.5">
                      <span className="text-[10px] font-mono text-slate-400 uppercase block">Dry Weight</span>
                      <span className="font-bold text-white text-xs">{hologramProduct.weight || "7.8 kg"}</span>
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Key Engineering Highlights</span>
                    <div className="flex flex-wrap gap-1.5">
                      {hologramProduct.highlights && hologramProduct.highlights.length > 0 ? (
                        hologramProduct.highlights.slice(0, 4).map((hl, idx) => (
                          <span key={idx} className="text-[10px] font-medium bg-sky-950/60 text-sky-300 border border-sky-800/60 px-2 py-1 rounded-lg flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3 text-sky-400 shrink-0" />
                            <span className="truncate max-w-[190px]">{hl.split("–")[0].trim()}</span>
                          </span>
                        ))
                      ) : (
                        <span className="text-[10px] text-slate-400">Pure Petrol 4-Stroke Technology</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <a
                    href={`https://wa.me/919444154944?text=${encodeURIComponent(`Hello George Maijo Team, I am interested in ${hologramProduct.name} after reviewing the 3D Hologram model. Please send full catalog and price quotation.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/30 transition-all"
                  >
                    <MessageSquare className="w-4 h-4 fill-white" />
                    <span>WhatsApp Quote & Order</span>
                  </a>

                  <button
                    onClick={(e) => {
                      setIs3DModalOpen(false);
                      openVoiceAssistant(e, hologramProduct);
                    }}
                    className="w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-sky-300 border border-slate-700 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-all"
                  >
                    <Mic className="w-4 h-4 text-sky-400" />
                    <span>Ask AI Voice Assistant</span>
                  </button>
                </div>

              </div>
            </div>

            {/* Modal Bottom Footer Status */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/80 gap-3">
              <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
                <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                <span>3D Spatial Hologram Projection Active • George Maijo Machinery</span>
              </div>
              
              <div className="flex items-center gap-2.5 self-end sm:self-auto">
                {/* 📡 CONNECT HOLO DEVICE BUTTON */}
                <button
                  onClick={handleConnectHolo}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border shadow-lg ${
                    isHoloConnected
                      ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-emerald-950/40"
                      : "bg-gradient-to-r from-sky-500/20 to-indigo-500/20 hover:from-sky-500/30 hover:to-indigo-500/30 text-sky-300 border-sky-500/40 shadow-sky-950/40"
                  }`}
                >
                  <Cast className={`w-4 h-4 ${isHoloConnected ? "text-emerald-400" : "text-sky-400 animate-pulse"}`} />
                  <span>{isHoloConnected ? "Holo Connected • Streaming" : "Connect Holo"}</span>
                </button>

                <button
                  onClick={() => setIs3DModalOpen(false)}
                  className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold rounded-xl text-xs transition-all"
                >
                  Close 3D View
                </button>
              </div>
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
      {/* MODAL 4: 📄 AI BROCHURE INGESTION & PRODUCT CREATOR WIZARD */}
      {/* ======================================================== */}
      {isBrochureModalOpen && (
        <div className="fixed inset-0 top-0 left-0 w-screen h-screen z-[99999] flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl bg-white dark:bg-slate-950 text-slate-900 dark:text-white rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            
            {/* Header with Step Stepper */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white flex items-center justify-center shadow-lg border border-slate-700/60 relative group">
                  <FilePlus className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
                  <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-950 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold font-display flex items-center gap-2">
                    <span>Add Product & Brochure</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      STEP {brochureStep} OF 5
                    </span>
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {brochureStep === 1 && "Step 1: Product Information & Category Selection"}
                    {brochureStep === 2 && "Step 2: Upload Product Image"}
                    {brochureStep === 3 && "Step 3: Upload Brochure PDF Document"}
                    {brochureStep === 4 && "Step 4: Document Analysis & Spec Extraction"}
                    {brochureStep === 5 && "Step 5: Review & Save Specifications"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsBrochureModalOpen(false);
                  resetAddProductModal();
                }}
                className="p-1.5 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {brochureSaveSuccess ? (
              <div className="p-8 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/30 rounded-2xl text-center space-y-3 animate-in zoom-in-95">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto animate-bounce" />
                <h4 className="text-lg font-extrabold text-emerald-800 dark:text-emerald-300">
                  Product Created & Saved Live!
                </h4>
                <p className="text-xs text-emerald-700 dark:text-emerald-400">
                  "{newProductName}" has been added to the catalog and is now displayed live on the products page!
                </p>
              </div>
            ) : (
              <>
                {/* STEP 1: Product Information & Category Selection */}
                {brochureStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-5"
                  >
                    {/* 1. Product Name Select Field */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200 flex items-center gap-2">
                          <span className="w-5 h-5 rounded-md bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center font-extrabold text-[11px]">
                            1
                          </span>
                          <span>Product Name *</span>
                        </label>
                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 flex items-center gap-1">
                          <Zap className="w-3 h-3 text-emerald-500" />
                          Auto-fills Category & Brand
                        </span>
                      </div>

                      {/* Single Sleek Corporate Select Dropdown */}
                      <div className="relative group">
                        <select
                          value={DAY_TO_DAY_PRODUCTS.some((p) => p.name === newProductName) ? newProductName : (newProductName ? "CUSTOM" : "")}
                          onChange={(e) => {
                            const val = e.target.value;
                            resetAddProductModal();
                            if (val === "CUSTOM") {
                              setNewProductName("");
                            } else if (val) {
                              setNewProductName(val);
                              const preset = DAY_TO_DAY_PRODUCTS.find((p) => p.name === val);
                              if (preset) {
                                setNewProductCategory(preset.category);
                                setNewProductBrand(preset.brand);
                              }
                            }
                          }}
                          className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-800 focus:border-emerald-500 font-semibold text-slate-900 dark:text-white shadow-sm transition-all appearance-none cursor-pointer pr-10"
                        >
                          <option value="">-- Select Product Name --</option>
                          {Array.from(new Set(DAY_TO_DAY_PRODUCTS.map((p) => p.group))).map((groupName) => (
                            <optgroup key={groupName} label={groupName} className="font-bold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-900">
                              {DAY_TO_DAY_PRODUCTS.filter((p) => p.group === groupName).map((prod) => (
                                <option key={prod.name} value={prod.name} className="font-normal text-slate-700 dark:text-slate-300 py-1">
                                  {prod.name}
                                </option>
                              ))}
                            </optgroup>
                          ))}
                          <option value="CUSTOM">Custom Product (Enter manually...)</option>
                        </select>
                        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 dark:text-slate-500">
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </div>

                      {/* Custom Input field - Only shows if user selects Custom */}
                      {(!DAY_TO_DAY_PRODUCTS.some((p) => p.name === newProductName) && newProductName !== "") && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="pt-1"
                        >
                          <input
                            type="text"
                            value={newProductName}
                            onChange={(e) => setNewProductName(e.target.value)}
                            placeholder="Enter custom product name..."
                            className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 text-xs rounded-xl border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-emerald-500 font-semibold text-slate-900 dark:text-white"
                          />
                        </motion.div>
                      )}
                    </div>

                    {/* Grid for Category & Brand Manufacturer */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* 2. Category Dropdown */}
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200 flex items-center gap-2">
                          <span className="w-5 h-5 rounded-md bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center font-extrabold text-[11px]">
                            2
                          </span>
                          <span>Category *</span>
                        </label>

                        <div className="relative group">
                          <select
                            value={newProductCategory}
                            onChange={(e) => setNewProductCategory(e.target.value)}
                            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-800 focus:border-emerald-500 font-semibold text-slate-900 dark:text-white shadow-sm transition-all appearance-none cursor-pointer pr-10"
                          >
                            <option value="">-- Select Category --</option>
                            <option value="BRUSH CUTTER">BRUSH CUTTER</option>
                            <option value="POWER WEEDER">POWER WEEDER</option>
                            <option value="ELECTRONICS">ELECTRONICS</option>
                            <option value="HOME APPLIANCES">HOME APPLIANCES</option>
                            <option value="KITCHEN APPLIANCES">KITCHEN APPLIANCES</option>
                            <option value="POWER TOOLS">POWER TOOLS</option>
                            <option value="AUTOMOTIVE">AUTOMOTIVE</option>
                            <option value="LAWN MOWER">LAWN MOWER</option>
                            <option value="WATER PUMP">WATER PUMP</option>
                            <option value="CHAINSAW">CHAINSAW</option>
                            <option value="PRESSURE WASHER">PRESSURE WASHER</option>
                            <option value="COMBINE HARVESTER">COMBINE HARVESTER</option>
                            <option value="POWER TILLER">POWER TILLER</option>
                            <option value="REAPER">REAPER</option>
                            <option value="SOLAR EQUIPMENT">SOLAR EQUIPMENT</option>
                          </select>
                          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 dark:text-slate-500">
                            <ChevronDown className="w-4 h-4" />
                          </div>
                        </div>
                      </div>

                      {/* 3. Brand Manufacturer Input */}
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200 flex items-center gap-2">
                          <span className="w-5 h-5 rounded-md bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center font-extrabold text-[11px]">
                            3
                          </span>
                          <span>Brand / Manufacturer</span>
                        </label>

                        <div className="relative">
                          <input
                            type="text"
                            value={newProductBrand}
                            onChange={(e) => setNewProductBrand(e.target.value)}
                            placeholder="e.g. GEORGE MAIJO EQUIPMENT"
                            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-800 focus:border-emerald-500 font-semibold text-slate-900 dark:text-white shadow-sm transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Corporate Product Summary Card */}
                    {newProductName && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-3 shadow-xs"
                      >
                        <div>
                          <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                            Selected Product Summary
                          </div>
                          <div className="text-sm font-bold text-slate-900 dark:text-white pt-0.5">
                            {newProductName}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="px-3 py-1 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 rounded-lg font-bold border border-emerald-200 dark:border-emerald-800/80 text-xs">
                            Category: {newProductCategory || "Not Set"}
                          </span>
                          <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg font-bold border border-slate-200 dark:border-slate-700 text-xs">
                            Brand: {newProductBrand || "Not Set"}
                          </span>
                        </div>
                      </motion.div>
                    )}

                    {/* Action Next CTA Button */}
                    <div className="flex justify-end pt-2">
                      <button
                        onClick={() => {
                          if (!newProductName.trim()) return;
                          setBrochureStep(2);
                        }}
                        disabled={!newProductName.trim()}
                        className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white font-bold rounded-xl text-xs sm:text-sm transition-all shadow-md flex items-center gap-2"
                      >
                        <span>Next: Upload Product Image</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: Upload Product Image from Local File */}
                {brochureStep === 2 && (
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Upload Product Image (From Local Storage)
                      </label>
                      <div className="relative border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-6 text-center hover:border-primary transition-colors bg-slate-50/50 dark:bg-slate-900/50">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <ImageIcon className="w-8 h-8 text-primary mx-auto mb-2" />
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                          {imageFileName ? imageFileName : "Click or drag & drop equipment image"}
                        </span>
                        <span className="text-[10px] text-slate-400 block mt-1">
                          Supports PNG, JPG, WEBP formats
                        </span>
                      </div>
                    </div>

                    {/* Image Preview Box */}
                    {newProductImage && (
                      <div className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center gap-4">
                        <img
                          src={newProductImage}
                          alt="Uploaded Preview"
                          className="w-16 h-16 object-contain rounded-xl bg-white dark:bg-slate-950 p-1 border border-slate-200 dark:border-slate-800"
                        />
                        <div>
                          <span className="text-xs font-bold block text-emerald-600 dark:text-emerald-400">
                            Image Uploaded Successfully!
                          </span>
                          <span className="text-[11px] text-slate-400 font-mono">{imageFileName}</span>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-2">
                      <button
                        onClick={() => setBrochureStep(1)}
                        className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-xl text-xs"
                      >
                        Back
                      </button>
                      <button
                        onClick={() => setBrochureStep(3)}
                        className="px-5 py-2.5 bg-gradient-to-r from-primary to-secondary hover:opacity-95 text-white font-bold rounded-xl text-xs transition-all shadow-md flex items-center gap-2"
                      >
                        <span>Next: Upload Brochure PDF</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3: Upload PDF Brochure */}
                {brochureStep === 3 && (
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Upload Product Brochure PDF Document
                      </label>
                      <div className="relative border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-6 text-center hover:border-primary transition-colors bg-slate-50/50 dark:bg-slate-900/50">
                        <input
                          type="file"
                          accept=".pdf"
                          onChange={handleBrochurePdfUpload}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <FileText className="w-8 h-8 text-primary mx-auto mb-2" />
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                          {pdfFileName ? pdfFileName : "Click or drag & drop Brochure PDF file"}
                        </span>
                        <span className="text-[10px] text-slate-400 block mt-1">
                          Supports .PDF technical datasheets up to 25MB
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <button
                        onClick={() => setBrochureStep(2)}
                        className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-xl text-xs"
                      >
                        Back
                      </button>
                      <button
                        onClick={startBrochureAnalysis}
                        className="px-5 py-2.5 bg-gradient-to-r from-primary to-secondary hover:opacity-95 text-white font-bold rounded-xl text-xs transition-all shadow-lg shadow-primary/25 flex items-center gap-2"
                      >
                        <Sparkles className="w-4 h-4 animate-spin" />
                        <span>Analyze Brochure PDF with AI 🪄</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 4: AI Analysis in Progress */}
                {brochureStep === 4 && (
                  <div className="py-10 text-center space-y-6">
                    <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
                      <Sparkles className="w-8 h-8 text-primary animate-pulse" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-base font-extrabold text-foreground">
                        Analyzing Brochure Specifications...
                      </h4>
                      <p className="text-xs text-primary font-mono animate-pulse">
                        {aiAnalysisStatus}
                      </p>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-primary to-secondary h-full transition-all duration-300"
                        style={{ width: `${aiAnalysisProgress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* STEP 5: Extracted Product Details & Full Edit Screen */}
                {brochureStep === 5 && (
                  <form onSubmit={handleSaveAndPublishProduct} className="space-y-4">
                    <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/30 rounded-2xl flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        <span className="font-bold text-emerald-800 dark:text-emerald-300">
                          AI Analysis Complete! Review & Edit Extracted Details:
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                          Product Name
                        </label>
                        <input
                          type="text"
                          value={newProductName}
                          onChange={(e) => setNewProductName(e.target.value)}
                          className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 text-xs rounded-xl border border-slate-200 dark:border-slate-800 font-semibold focus:border-primary"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                          Category
                        </label>
                        <input
                          type="text"
                          value={newProductCategory}
                          onChange={(e) => setNewProductCategory(e.target.value)}
                          className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 text-xs rounded-xl border border-slate-200 dark:border-slate-800 font-semibold focus:border-primary"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                          {categoryType === "ELECTRONICS" && "Processor / Chipset"}
                          {categoryType === "HOME_APPLIANCE" && "Compressor / Technology"}
                          {categoryType === "POWER_TOOL" && "Motor & Power Type"}
                          {categoryType === "AUTOMOTIVE" && "Motor Drive System"}
                          {categoryType === "AGRICULTURE" && "Engine Model / Motor"}
                        </label>
                        <input
                          type="text"
                          value={extractedEngine}
                          onChange={(e) => setExtractedEngine(e.target.value)}
                          placeholder={
                            categoryType === "ELECTRONICS"
                              ? "e.g. Octa-Core 5G High Performance Processor"
                              : categoryType === "HOME_APPLIANCE"
                              ? "e.g. Smart Inverter Compressor"
                              : categoryType === "POWER_TOOL"
                              ? "e.g. Heavy-Duty Industrial Brushless Motor"
                              : categoryType === "AUTOMOTIVE"
                              ? "e.g. High Torque Electric Hub Motor"
                              : "e.g. 42.7cc 2-Stroke Air-Cooled Engine"
                          }
                          className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 text-xs rounded-xl border border-slate-200 dark:border-slate-800 font-medium focus:border-primary"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                          {categoryType === "ELECTRONICS" && "Display / Screen Size"}
                          {categoryType === "HOME_APPLIANCE" && "Capacity / Volume"}
                          {categoryType === "POWER_TOOL" && "Chuck / Bar Size"}
                          {categoryType === "AUTOMOTIVE" && "Battery & Range"}
                          {categoryType === "AGRICULTURE" && "Displacement (cc)"}
                        </label>
                        <input
                          type="text"
                          value={extractedDisplacement}
                          onChange={(e) => setExtractedDisplacement(e.target.value)}
                          placeholder={
                            categoryType === "ELECTRONICS"
                              ? 'e.g. 6.7" FHD+ AMOLED Display (120Hz)'
                              : categoryType === "HOME_APPLIANCE"
                              ? "e.g. 265 L Total Storage Capacity"
                              : categoryType === "POWER_TOOL"
                              ? "e.g. 13 mm Keyless Chuck"
                              : categoryType === "AUTOMOTIVE"
                              ? "e.g. 72V 30Ah Lithium Battery / 90 km"
                              : "e.g. 42.7 cc"
                          }
                          className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 text-xs rounded-xl border border-slate-200 dark:border-slate-800 font-medium focus:border-primary"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                          {categoryType === "ELECTRONICS" && "RAM & Storage"}
                          {categoryType === "HOME_APPLIANCE" && "Energy Rating & Power"}
                          {categoryType === "POWER_TOOL" && "Speed & Impact Output"}
                          {categoryType === "AUTOMOTIVE" && "Max Speed & Output"}
                          {categoryType === "AGRICULTURE" && "Max Power Output"}
                        </label>
                        <input
                          type="text"
                          value={extractedPower}
                          onChange={(e) => setExtractedPower(e.target.value)}
                          placeholder={
                            categoryType === "ELECTRONICS"
                              ? "e.g. 8GB RAM / 256GB Internal Storage"
                              : categoryType === "HOME_APPLIANCE"
                              ? "e.g. 5 Star Energy Saver / 1200W"
                              : categoryType === "POWER_TOOL"
                              ? "e.g. 0-1600 RPM High Impact Speed"
                              : categoryType === "AUTOMOTIVE"
                              ? "e.g. 65 km/h Top Speed / 2500W"
                              : "e.g. 1.25 kW / 1.7 HP @ 7000 RPM"
                          }
                          className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 text-xs rounded-xl border border-slate-200 dark:border-slate-800 font-medium focus:border-primary"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                          {categoryType === "ELECTRONICS" && "Camera / Sensor System"}
                          {categoryType === "HOME_APPLIANCE" && "Control System"}
                          {categoryType === "POWER_TOOL" && "Grip & Ergonomics"}
                          {categoryType === "AUTOMOTIVE" && "Braking & Suspension"}
                          {categoryType === "AGRICULTURE" && "Carburetor / Fuel System"}
                        </label>
                        <input
                          type="text"
                          value={extractedCarburetor}
                          onChange={(e) => setExtractedCarburetor(e.target.value)}
                          placeholder={
                            categoryType === "ELECTRONICS"
                              ? "e.g. 50MP Ultra-Clear Triple Camera"
                              : categoryType === "HOME_APPLIANCE"
                              ? "e.g. Digital Touch Screen Control Panel"
                              : categoryType === "POWER_TOOL"
                              ? "e.g. Anti-Vibration Rubber Molded Grip"
                              : categoryType === "AUTOMOTIVE"
                              ? "e.g. Dual Disc Brakes & Hydraulic Suspension"
                              : "e.g. Diaphragm Carburetor System"
                          }
                          className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 text-xs rounded-xl border border-slate-200 dark:border-slate-800 font-medium focus:border-primary"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                          {categoryType === "ELECTRONICS" && "Battery & Weight"}
                          {categoryType === "HOME_APPLIANCE" && "Dimensions & Weight"}
                          {categoryType === "POWER_TOOL" && "Battery Source & Weight"}
                          {categoryType === "AUTOMOTIVE" && "Vehicle Weight & Payload"}
                          {categoryType === "AGRICULTURE" && "Fuel Tank & Dry Weight"}
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={extractedFuelTank}
                            onChange={(e) => setExtractedFuelTank(e.target.value)}
                            placeholder="Capacity / Dim"
                            className="w-1/2 px-3 py-2 bg-slate-50 dark:bg-slate-900 text-xs rounded-xl border border-slate-200 dark:border-slate-800 font-medium focus:border-primary"
                          />
                          <input
                            type="text"
                            value={extractedDryWeight}
                            onChange={(e) => setExtractedDryWeight(e.target.value)}
                            placeholder="Weight"
                            className="w-1/2 px-3 py-2 bg-slate-50 dark:bg-slate-900 text-xs rounded-xl border border-slate-200 dark:border-slate-800 font-medium focus:border-primary"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                        Key Features (One per line)
                      </label>
                      <textarea
                        rows={3}
                        value={extractedFeaturesText}
                        onChange={(e) => setExtractedFeaturesText(e.target.value)}
                        placeholder={isEngineProduct ? "e.g. Heavy Duty Blade\nEasy Recoil Start" : "e.g. Drop-forged steel head\nErgonomic anti-vibration grip"}
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 text-xs rounded-xl border border-slate-200 dark:border-slate-800 font-medium focus:border-primary"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                        Applications & Best Uses (Comma separated)
                      </label>
                      <input
                        type="text"
                        value={extractedApplicationsText}
                        onChange={(e) => setExtractedApplicationsText(e.target.value)}
                        placeholder={isEngineProduct ? "e.g. Agriculture, Field Clearing, Gardening" : "e.g. Woodworking, Construction, Framing, Home Repair"}
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 text-xs rounded-xl border border-slate-200 dark:border-slate-800 font-medium focus:border-primary"
                      />
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                      <button
                        type="button"
                        onClick={() => setBrochureStep(3)}
                        className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-xl text-xs"
                      >
                        Back to PDF
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-gradient-to-r from-primary via-indigo-600 to-secondary hover:opacity-95 text-white font-extrabold rounded-xl text-xs transition-all shadow-lg shadow-primary/25 flex items-center gap-2"
                      >
                        <FilePlus className="w-4 h-4" />
                        <span>Save & Publish Product 🚀</span>
                      </button>
                    </div>
                  </form>
                )}
              </>
            )}

          </div>
        </div>
      )}

    </div>
      <Footer />
    </>
  );
}
