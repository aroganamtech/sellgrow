"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  CATEGORIES,
  PRODUCTS_DATA,
  ProductItem,
} from "@/data/productsData";
import {
  Search,
  Filter,
  Mic,
  Sparkles,
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
  ListFilter
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
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
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
      return matchesCategory && matchesSearch;
    });
  }, [productsList, selectedCategory, searchQuery]);

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
    setAiHistory([
      { sender: "ai", text: product.voiceGreeting[voiceLang] },
    ]);
    setIsVoiceModalOpen(true);
    speakTTS(product.voiceGreeting[voiceLang], voiceLang);
  };

  // Open 3D Hologram Modal
  const open3DHologram = (e: React.MouseEvent, product: ProductItem) => {
    e.stopPropagation();
    setHologramProduct(product);
    setIs3DModalOpen(true);
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

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-100 dark:bg-[#070c14] text-foreground font-sans pb-16 transition-colors duration-300">
      
      {/* TOP BANNER - EXACT MATCH TO IMAGE 1 (GREEN HEADER BANNER) */}
      <header className="bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 text-white py-8 px-4 shadow-lg text-center relative overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-2 relative z-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-white drop-shadow-md">
            Products Catalog
          </h1>
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-emerald-100 opacity-90">
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
            
            {/* Category Filter Dropdown & Search Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              
              {/* Category Filter Dropdown (Exact match to Image 1: Category: All ▼) */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="relative inline-block w-full sm:w-64">
                  <div className="flex items-center gap-2 px-4 py-2.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/30 rounded-xl text-xs font-bold text-emerald-700 dark:text-emerald-400 cursor-pointer shadow-sm">
                    <Filter className="w-4 h-4 text-emerald-600" />
                    <span>Category:</span>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="bg-transparent font-bold text-emerald-800 dark:text-emerald-300 focus:outline-none cursor-pointer flex-1"
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat} className="bg-white dark:bg-slate-900 text-foreground">
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Search Bar */}
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search catalog models..."
                  className="w-full pl-9 pr-4 py-2 bg-slate-100 dark:bg-slate-800 text-xs rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* CATALOG PRODUCT GRID (IMAGE 1 GRID & IMAGE 2 HOVER ANIMATION) */}
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
            ) : (
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
                          ? "border-2 border-emerald-500 shadow-[0_15px_35px_rgba(16,185,129,0.25)] -translate-y-1.5"
                          : "border-slate-200 dark:border-slate-800/80 shadow-md hover:shadow-xl"
                      }`}
                    >
                      {/* Unified 4:3 Image Stage (Clean Static Background) */}
                      <div className="relative w-full aspect-[4/3] bg-slate-50 dark:bg-[#0a0f1d] overflow-hidden border-b border-slate-100 dark:border-slate-800/60 rounded-t-3xl flex items-center justify-center p-3">
                        
                        {/* Category Pill Tag */}
                        <div className="absolute top-3 left-3 z-20">
                          <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-600 text-white shadow-md">
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
                          <h3 className="text-base font-extrabold text-foreground font-display group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors mt-0.5">
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
                              className="w-10 h-10 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-600/30 transition-transform active:scale-95 shrink-0"
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

                          <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 group-hover:underline flex items-center gap-1">
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
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                  <ListFilter className="w-4 h-4 text-emerald-600" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-foreground font-display">
                    All Products List
                  </h4>
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

                {/* Categorized List */}
                <div className="space-y-4 text-xs">
                  {CATEGORIES.filter((c) => c !== "All").map((cat) => {
                    const catItems = PRODUCTS_DATA.filter((p) => p.category === cat);
                    if (catItems.length === 0) return null;

                    return (
                      <div key={cat} className="space-y-1.5">
                        <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block px-2">
                          {cat}
                        </span>
                        <div className="space-y-1">
                          {catItems.map((item) => {
                            const isSelected = item.id === activeProduct.id;
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-slate-950 text-white rounded-3xl border border-indigo-500/40 p-6 shadow-2xl space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">3D Hologram Interactive Model</h3>
                  <p className="text-[11px] text-indigo-400">{hologramProduct.name}</p>
                </div>
              </div>
              <button
                onClick={() => setIs3DModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-full hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 3D Interactive Canvas Container */}
            <div className="relative w-full aspect-[16/9] bg-[#030914] rounded-2xl overflow-hidden border border-indigo-500/30 flex items-center justify-center">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#6366f115_1px,transparent_1px),linear-gradient(to_bottom,#6366f115_1px,transparent_1px)] bg-[size:16px_16px]" />
              
              {/* Rotating Stand */}
              <div className="absolute bottom-6 w-64 h-16 rounded-[100%] bg-indigo-500/20 border border-indigo-400/40 shadow-[0_0_30px_rgba(99,102,241,0.6)] animate-pulse" />

              <div className="relative z-10 w-full h-full flex items-center justify-center animate-bounce duration-1000">
                <ProductGraphic product={hologramProduct} is3DHover={true} />
              </div>

              <div className="absolute top-3 left-3 bg-slate-900/80 px-2.5 py-1 rounded-lg text-[10px] font-mono text-indigo-300 border border-indigo-500/30">
                360° Rotatable Hologram Stand Active
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
              <span>Status: Holographic Specs Model Loaded</span>
              <button
                onClick={() => setIs3DModalOpen(false)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl"
              >
                Close 3D View
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
      <Footer />
    </>
  );
}
