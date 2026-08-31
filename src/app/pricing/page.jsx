"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, ChevronDown, HelpCircle, ShoppingCart, MessageSquare, Globe, Smartphone, Box, Bot, TrendingUp, Trash2, CheckCircle2, Check, Zap, Search, Share2, FileText, ShieldCheck, CheckSquare, CreditCard, Info, X } from "lucide-react";
// Mapped helper functions for dynamic styling & icons
const getServiceIcon = (name) => {
    const norm = (name || "").toLowerCase();
    if (norm.includes("whatsapp"))
        return MessageSquare;
    if (norm.includes("website view"))
        return Globe;
    if (norm.includes("website") || norm.includes("creation"))
        return Globe;
    if (norm.includes("mobile") || norm.includes("app"))
        return Smartphone;
    if (norm.includes("ai") || norm.includes("bot") || norm.includes("agent"))
        return Bot;
    if (norm.includes("3d"))
        return Box;
    if (norm.includes("seo") || norm.includes("google") || norm.includes("ads") || norm.includes("marketing"))
        return Search;
    if (norm.includes("social"))
        return Share2;
    if (norm.includes("brochure") || norm.includes("logo"))
        return FileText;
    if (norm.includes("crm") || norm.includes("sells") || norm.includes("sales"))
        return TrendingUp;
    return Sparkles;
};
const getServiceStyles = (idx) => {
    const presets = [
        {
            gradient: "from-emerald-500/10 dark:from-emerald-500/20 via-teal-500/5 dark:via-teal-500/10 to-transparent",
            borderColor: "border-slate-200 dark:border-slate-800 hover:border-emerald-500/60 dark:hover:border-emerald-500",
            glowColor: "hover:shadow-[0_0_30px_rgba(16,185,129,0.12)]",
            iconBg: "bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
            accentBtn: "from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500",
        },
        {
            gradient: "from-sky-500/10 dark:from-sky-500/20 via-blue-500/5 dark:via-blue-500/10 to-transparent",
            borderColor: "border-slate-200 dark:border-slate-800 hover:border-sky-500/60 dark:hover:border-sky-500",
            glowColor: "hover:shadow-[0_0_30px_rgba(56,189,248,0.12)]",
            iconBg: "bg-sky-500/10 dark:bg-sky-500/20 text-sky-600 dark:text-sky-400 border-sky-500/20",
            accentBtn: "from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500",
        },
        {
            gradient: "from-purple-500/10 dark:from-purple-500/20 via-indigo-500/5 dark:via-indigo-500/10 to-transparent",
            borderColor: "border-slate-200 dark:border-slate-800 hover:border-purple-500/60 dark:hover:border-purple-500",
            glowColor: "hover:shadow-[0_0_30px_rgba(168,85,247,0.12)]",
            iconBg: "bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 border-purple-500/20",
            accentBtn: "from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500",
        },
        {
            gradient: "from-amber-500/10 dark:from-amber-500/20 via-orange-500/5 dark:via-orange-500/10 to-transparent",
            borderColor: "border-slate-200 dark:border-slate-800 hover:border-amber-500/60 dark:hover:border-amber-500",
            glowColor: "hover:shadow-[0_0_30px_rgba(245,158,11,0.12)]",
            iconBg: "bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/20",
            accentBtn: "from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500",
        },
        {
            gradient: "from-rose-500/10 dark:from-rose-500/20 via-pink-500/5 dark:via-pink-500/10 to-transparent",
            borderColor: "border-slate-200 dark:border-slate-800 hover:border-rose-500/60 dark:hover:border-rose-500",
            glowColor: "hover:shadow-[0_0_30px_rgba(244,63,94,0.12)]",
            iconBg: "bg-rose-500/10 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 border-rose-500/20",
            accentBtn: "from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500",
        },
    ];
    return presets[idx % presets.length];
};
const getDefaultFeatures = (name, id) => {
    const norm = (name || "").toLowerCase();
    if (norm.includes("whatsapp")) {
        return ["Official Meta API Broadcasts", "Unified Shared Agent Inbox"];
    }
    if (norm.includes("website view")) {
        return ["Live Client Traffic Tracking", "Active Sessions Dashboard"];
    }
    if (norm.includes("website") || norm.includes("creation")) {
        return ["Automated Premium Layouts", "High-Speed Page Builder"];
    }
    if (norm.includes("mobile") || norm.includes("app")) {
        return ["Mobile App Interface Logs", "Native Session Tracker"];
    }
    if (norm.includes("ai") || norm.includes("agent") || norm.includes("bot")) {
        return ["Generative AI Customer Agent", "Smart Context Responses"];
    }
    if (norm.includes("3d")) {
        return ["Immersive 3D Model Rendering", "Interactive WebGL Component"];
    }
    if (norm.includes("seo") || norm.includes("google") || norm.includes("ads")) {
        return ["SEO & GEO Performance Metrics", "Google Ads Campaign Manager"];
    }
    if (norm.includes("brochure") || norm.includes("logo")) {
        return ["High-Res Vector Formats", "Exportable PDF Catalogs"];
    }
    if (norm.includes("social")) {
        return ["Scheduled Auto-Posting Engine", "Cross-Platform Feed Sync"];
    }
    return ["Custom Service Integration", "API Endpoint Support"];
};
const getDefaultPrices = (name, id) => {
    const norm = (name || "").toLowerCase();
    if (norm.includes("website view")) {
        return { mINR: 999, mUSD: 15, yINR: 9999, yUSD: 149 };
    }
    if (norm.includes("website") || norm.includes("creation")) {
        return { mINR: 4999, mUSD: 69, yINR: 49999, yUSD: 699 };
    }
    if (norm.includes("brochure") || norm.includes("logo")) {
        return { mINR: 999, mUSD: 14, yINR: 9999, yUSD: 139 };
    }
    if (norm.includes("social")) {
        return { mINR: 1199, mUSD: 16, yINR: 11999, yUSD: 159 };
    }
    if (norm.includes("seo") || norm.includes("google") || norm.includes("ads")) {
        return { mINR: 1999, mUSD: 29, yINR: 19999, yUSD: 299 };
    }
    if (norm.includes("whatsapp")) {
        return { mINR: 1399, mUSD: 25, yINR: 13999, yUSD: 259 };
    }
    if (norm.includes("mobile") || norm.includes("app")) {
        return { mINR: 1499, mUSD: 19, yINR: 14999, yUSD: 199 };
    }
    if (norm.includes("3d")) {
        return { mINR: 3999, mUSD: 59, yINR: 39999, yUSD: 599 };
    }
    if (norm.includes("ai") || norm.includes("agent") || norm.includes("bot")) {
        return { mINR: 2999, mUSD: 39, yINR: 29999, yUSD: 399 };
    }
    return { mINR: 999, mUSD: 15, yINR: 9999, yUSD: 149 };
};
const STATIC_FALLBACK_SERVICES = [
    { id: "website", name: "Website", description: "Automated premium landing page generation and high-speed builder engine", status: "Active", priceMonthlyINR: 4999, priceMonthlyUSD: 69, priceYearlyINR: 49999, priceYearlyUSD: 699, features: ["Automated Premium Layouts", "High-Speed Page Builder"] },
    { id: "brochure-logo", name: "Brochure & Logo", description: "Brochure creator, brand material generation, and vector logo builder", status: "Active", priceMonthlyINR: 999, priceMonthlyUSD: 14, priceYearlyINR: 9999, priceYearlyUSD: 139, features: ["High-Res Vector Formats", "Exportable PDF Catalogs"] },
    { id: "social-media-creation", name: "Social Media Creation", description: "Social platforms auto-posting gateway and feed synchronization engine", status: "Active", priceMonthlyINR: 1199, priceMonthlyUSD: 16, priceYearlyINR: 11999, priceYearlyUSD: 159, features: ["Scheduled Auto-Posting Engine", "Cross-Platform Feed Sync"] },
    { id: "seo-aeo-geo-google-ads", name: "SEO/AEO/GEO, Google Ads", description: "Search engine metrics tracking, ad campaign monitoring, and AI optimization", status: "Active", priceMonthlyINR: 1999, priceMonthlyUSD: 29, priceYearlyINR: 19999, priceYearlyUSD: 299, features: ["SEO & GEO Performance Metrics", "Google Ads Campaign Manager"] },
    { id: "whatsapp-api", name: "WhatsApp API", description: "Official Meta WhatsApp Business API gateway and broadcast chat engine", status: "Active", priceMonthlyINR: 1399, priceMonthlyUSD: 25, priceYearlyINR: 13999, priceYearlyUSD: 259, features: ["Official Meta API Broadcasts", "Unified Shared Agent Inbox"] },
    { id: "mobile-view", name: "Mobile View", description: "Mobile application interface logs and native session tracker dashboard", status: "Active", priceMonthlyINR: 1499, priceMonthlyUSD: 19, priceYearlyINR: 14999, priceYearlyUSD: 199, features: ["Mobile App Interface Logs", "Native Session Tracker"] },
    { id: "website-view", name: "Website View", description: "Live tracking of client web traffic and active session analytics", status: "Active", priceMonthlyINR: 999, priceMonthlyUSD: 15, priceYearlyINR: 9999, priceYearlyUSD: 149, features: ["Live Client Traffic Tracking", "Active Sessions Dashboard"] },
    { id: "3d-view", name: "3D View", description: "Immersive 3D model visualization and interactive rendering engine", status: "Active", priceMonthlyINR: 3999, priceMonthlyUSD: 59, priceYearlyINR: 39999, priceYearlyUSD: 599, features: ["Immersive 3D Model Rendering", "Interactive WebGL Component"] },
    { id: "ai-agent", name: "AI Agent", description: "Generative AI customer service assistant bot for apps and websites", status: "Active", priceMonthlyINR: 2999, priceMonthlyUSD: 39, priceYearlyINR: 29999, priceYearlyUSD: 399, features: ["Generative AI Customer Agent", "Smart Context Responses"] },
];
export default function PricingPage() {
    const { region } = useLanguage();
    const [billingCycle, setBillingCycle] = useState("trial");
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [activeFaq, setActiveFaq] = useState(0);
    const [servicesList, setServicesList] = useState(STATIC_FALLBACK_SERVICES);
    const [expandedCards, setExpandedCards] = useState([]);
    const [activeDetailModal, setActiveDetailModal] = useState(null);
    useEffect(() => {
        fetch("/api/admin/services")
            .then((res) => {
            if (!res.ok)
                throw new Error("API offline");
            return res.json();
        })
            .then((data) => {
            if (data.status === "success" && Array.isArray(data.data) && data.data.length > 0) {
                const activeOnly = data.data.filter((s) => s.status === "Active");
                setServicesList(activeOnly);
            }
        })
            .catch(() => {
            const stored = typeof window !== "undefined" ? localStorage.getItem("sg_services_db") : null;
            if (stored) {
                try {
                    const parsed = JSON.parse(stored);
                    const activeOnly = parsed.filter((s) => s.status === "Active");
                    if (activeOnly.length > 0) {
                        setServicesList(activeOnly);
                        return;
                    }
                }
                catch (e) { }
            }
            setServicesList(STATIC_FALLBACK_SERVICES);
        });
    }, []);
    const toggleFaq = (idx) => {
        setActiveFaq(activeFaq === idx ? null : idx);
    };
    // Calculate prices based on region & billing cycle
    const getPrice = (srv) => {
        if (billingCycle === "trial")
            return 0;
        const isYearly = billingCycle === "yearly";
        const isINR = region === "in";
        const defaults = getDefaultPrices(srv.name, srv.id);
        const mINR = srv.priceMonthlyINR ?? defaults.mINR;
        const mUSD = srv.priceMonthlyUSD ?? defaults.mUSD;
        const yINR = srv.priceYearlyINR ?? defaults.yINR;
        const yUSD = srv.priceYearlyUSD ?? defaults.yUSD;
        if (isINR) {
            if (isYearly) {
                return yINR > 0 ? yINR : Math.round(mINR * 12 * 0.8);
            }
            return mINR;
        }
        else {
            if (isYearly) {
                return yUSD > 0 ? yUSD : Math.round(mUSD * 12 * 0.8);
            }
            return mUSD;
        }
    };
    const formatPrice = (amount) => {
        if (billingCycle === "trial") {
            return region === "in" ? "₹0" : "$0";
        }
        if (region === "in") {
            return `₹${amount.toLocaleString("en-IN")}`;
        }
        else {
            return `$${amount}`;
        }
    };
    const toggleCartItem = (id) => {
        setCart((prev) => prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]);
    };
    const selectedModules = servicesList.filter((s) => cart.includes(s.id));
    const cartTotal = selectedModules.reduce((sum, s) => sum + getPrice(s), 0);
    const faqs = [
        {
            q: "Can I choose only the specific services I need?",
            a: "Yes! You select exactly the services you want on the left panel. Your plan and total amount charged will include ONLY those selected services.",
        },
        {
            q: "How does the 14-Day Free Trial work?",
            a: "With the Free Trial option, you can test drive any or all selected growth services free for 14 days without requiring a credit card.",
        },
        {
            q: "Can I switch between Monthly and Yearly plans later?",
            a: "Absolutely! You can switch your billing frequency or add/remove services anytime from your SellGrow dashboard.",
        },
        {
            q: "How does billing work for selected services?",
            a: "All selected services are combined into a single simple monthly or discounted annual subscription invoice.",
        },
    ];
    return (<div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white relative transition-colors duration-300">
      <Navbar />

      <main className="flex-grow pt-20 pb-16 md:pt-24 md:pb-24 relative z-10 overflow-x-hidden">
        {/* Background Radial Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 dark:bg-primary/10 rounded-full blur-[140px] pointer-events-none"/>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* HERO HEADER */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-primary/10 text-primary border border-primary/30 shadow-md shadow-primary/10">
              <Sparkles className="w-4 h-4"/>
              <span>
                {region === "in"
            ? "🇮🇳 Regional Modular Pricing (INR ₹)"
            : "🌍 Global Modular Pricing (USD $)"}
              </span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-display text-slate-900 dark:text-white leading-tight">
              Select Your Business Services
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              Choose only the services you need on the left. You will be charged <span className="font-semibold text-emerald-600 dark:text-emerald-400">only for your selected services</span>.
            </motion.p>

            {/* 3-CATEGORY PLAN SELECTION SWITCHER */}
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="pt-3 flex flex-wrap items-center justify-center gap-2">
              <div className="p-1.5 rounded-2xl bg-slate-200/80 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 inline-flex flex-wrap items-center justify-center gap-1.5 shadow-inner">
                
                {/* Category 1: Free Trial */}
                <button onClick={() => setBillingCycle("trial")} className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${billingCycle === "trial"
            ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md shadow-emerald-500/20"
            : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"}`}>
                  <Sparkles className="w-4 h-4"/>
                  <span>Free Trial (14 Days)</span>
                </button>

                {/* Category 2: Monthly Billing */}
                <button onClick={() => setBillingCycle("monthly")} className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${billingCycle === "monthly"
            ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-md border border-slate-250 dark:border-slate-700"
            : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"}`}>
                  <span>Monthly Plan</span>
                </button>

                {/* Category 3: Yearly Billing */}
                <button onClick={() => setBillingCycle("yearly")} className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${billingCycle === "yearly"
            ? "bg-gradient-to-r from-primary to-indigo-600 text-white shadow-md shadow-primary/20"
            : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"}`}>
                  <Zap className="w-4 h-4"/>
                  <span>Yearly Plan</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 dark:bg-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-[10px] font-black uppercase border border-emerald-500/30">
                    Save 20%
                  </span>
                </button>

              </div>
            </motion.div>
          </div>

          {/* TWO COLUMN INTERACTIVE PRICING SECTION */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT COLUMN: AVAILABLE SERVICES LIST (Span 7-8 cols) */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-4">
              <div className="flex items-center justify-between px-1 pb-2 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <h2 className="text-xl font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
                    <span>Available Growth Services</span>
                    <span className="px-2.5 py-0.5 text-xs font-mono rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {servicesList.length} Services
                    </span>
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Click any service to select or unselect it for your custom plan.
                  </p>
                </div>

                <div className="hidden sm:block text-xs font-medium text-slate-500 dark:text-slate-400">
                  {cart.length} selected
                </div>
              </div>

              {/* SERVICES CARDS GRID - SQUARE GRID IN 3 HORIZONTAL COLUMNS */}
              <motion.div key={billingCycle} initial="hidden" animate="visible" variants={{
            hidden: { opacity: 0 },
            visible: {
                opacity: 1,
                transition: { staggerChildren: 0.04 },
            },
        }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {servicesList.map((srv, idx) => {
            const Icon = getServiceIcon(srv.name);
            const price = getPrice(srv);
            const isInCart = cart.includes(srv.id);
            const isExpanded = expandedCards.includes(srv.id);
            const styles = getServiceStyles(idx);
            const highlights = srv.features && srv.features.length > 0 ? srv.features : getDefaultFeatures(srv.name, srv.id);
            const numStr = String(idx + 1).padStart(2, "0");
            return (<motion.div key={srv.id} onClick={() => toggleCartItem(srv.id)} variants={{
                    hidden: { opacity: 0, y: 15, scale: 0.97 },
                    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3, ease: "easeOut" } },
                }} whileHover={{ y: -3, transition: { duration: 0.2, ease: "easeOut" } }} whileTap={{ scale: 0.98 }} className={`relative p-4 sm:p-4.5 rounded-2xl border text-left cursor-pointer flex flex-col justify-between aspect-square min-h-[190px] transition-all duration-200 select-none overflow-hidden ${isInCart
                    ? "border-emerald-500 dark:border-emerald-450 bg-emerald-500/10 dark:bg-[#0c2420] ring-2 ring-emerald-500/50 shadow-xl shadow-emerald-500/15"
                    : `border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-[#090f1d]/90 ${styles.borderColor} hover:shadow-lg`}`}>
                      {/* Top Header: Icon & Checkbox */}
                      <div className="flex items-start justify-between gap-2">
                        <div className={`w-9.5 h-9.5 rounded-xl flex items-center justify-center border shadow-sm shrink-0 ${styles.iconBg}`}>
                          <Icon className="w-5 h-5"/>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <span className="text-[9px] font-bold tracking-widest font-mono text-slate-400 dark:text-slate-500 uppercase">
                            #{numStr}
                          </span>
                          <AnimatePresence mode="wait">
                            {isInCart ? (<motion.div key="checked" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.6, opacity: 0 }} className="w-5.5 h-5.5 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md">
                                <Check className="w-3.5 h-3.5 stroke-[3]"/>
                              </motion.div>) : (<motion.div key="unchecked" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="w-5.5 h-5.5 rounded-full border-2 border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 transition-colors"/>)}
                          </AnimatePresence>
                        </div>
                      </div>

                      {/* Middle Body: Service Name & More Info Button */}
                      <div className="space-y-1.5 my-auto py-1">
                        <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display leading-tight line-clamp-2">
                          {srv.name}
                        </h3>
                        <button onClick={(e) => {
                    e.stopPropagation();
                    setActiveDetailModal(srv);
                }} className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-[10px] sm:text-[11px] font-bold text-sky-600 dark:text-sky-400 bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/20 transition-all cursor-pointer shadow-sm">
                          <Info className="w-3 h-3"/>
                          <span>More Info</span>
                        </button>
                      </div>

                      {/* Bottom Footer: Price Tag & Select Button */}
                      <div className="pt-2.5 border-t border-slate-150 dark:border-slate-800/80 flex items-center justify-between gap-1">
                        <div>
                          {billingCycle === "trial" ? (<div>
                              <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 font-display tracking-wide block">
                                FREE TRIAL
                              </span>
                              <span className="text-[9px] text-slate-500 dark:text-slate-400 font-medium block">
                                (14 Days)
                              </span>
                            </div>) : (<div>
                              <span className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white font-display block truncate">
                                {formatPrice(price)}
                              </span>
                              <span className="text-[9px] text-slate-500 dark:text-slate-400 font-medium block">
                                {billingCycle === "yearly" ? "/yr" : "/mo"}
                              </span>
                            </div>)}
                        </div>

                        <span className={`text-[11px] font-bold px-2.5 py-1 rounded-lg transition-all shrink-0 ${isInCart
                    ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-750"}`}>
                          {isInCart ? "Selected" : "+ Select"}
                        </span>
                      </div>
                    </motion.div>);
        })}
              </motion.div>
            </div>

            {/* RIGHT COLUMN: STICKY ORDER SUMMARY & TOTAL CHARGE (Span 5-4 cols) */}
            <div className="lg:col-span-5 xl:col-span-4">
              <div className="sticky top-28 space-y-4">
                
                <div className="p-7 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#090f1e] shadow-2xl backdrop-blur-2xl space-y-6">
                  
                  {/* Summary Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-150 dark:border-slate-800">
                    <div className="flex items-center gap-3.5">
                      <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white shadow-md shrink-0">
                        <ShoppingCart className="w-5.5 h-5.5"/>
                      </div>
                      <div>
                        <h3 className="text-lg font-black font-display text-slate-900 dark:text-white">
                          Selected Services
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
                          Charged only for what you select
                        </p>
                      </div>
                    </div>

                    <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-black border border-emerald-500/20">
                      {cart.length} {cart.length === 1 ? "Item" : "Items"}
                    </span>
                  </div>

                  {/* Selected Services Breakdown List */}
                  <div className="space-y-3 max-h-72 overflow-y-auto pr-1 custom-scrollbar">
                    {selectedModules.length === 0 ? (<div className="text-center py-10 space-y-2.5 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
                        <CheckSquare className="w-10 h-10 text-slate-300 dark:text-slate-700 mx-auto"/>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium px-4">
                          No services selected yet.<br />Click on the services on the left to add them to your plan.
                        </p>
                      </div>) : (selectedModules.map((s) => {
            const price = getPrice(s);
            return (<motion.div key={s.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="p-3.5 rounded-2xl border border-slate-150 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/70 flex items-center justify-between text-xs sm:text-sm">
                            <div className="flex items-center gap-2.5 pr-2 overflow-hidden">
                              <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500 shrink-0"/>
                              <span className="font-extrabold text-slate-900 dark:text-slate-100 truncate">
                                {s.name}
                              </span>
                            </div>

                            <div className="flex items-center gap-2.5 shrink-0">
                              <span className="font-mono font-black text-sm text-slate-900 dark:text-white">
                                {billingCycle === "trial" ? "FREE" : formatPrice(price)}
                              </span>
                              <button onClick={(e) => {
                    e.stopPropagation();
                    toggleCartItem(s.id);
                }} className="p-1 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors" title="Remove service">
                                <Trash2 className="w-4 h-4"/>
                              </button>
                            </div>
                          </motion.div>);
        }))}
                  </div>

                  {/* Pricing Total Summary Box */}
                  <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-3.5">
                    <div className="flex items-center justify-between text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                      <span className="font-medium">Category / Plan</span>
                      <span className="font-black text-slate-900 dark:text-slate-100 uppercase">
                        {billingCycle === "trial"
            ? "14-Day Free Trial"
            : billingCycle === "monthly"
                ? "Monthly Plan"
                : "Yearly Plan (20% Off)"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                      <span className="font-medium">Selected Services</span>
                      <span className="font-black text-slate-900 dark:text-slate-100">
                        {cart.length} Services
                      </span>
                    </div>

                    <div className="pt-3.5 border-t border-slate-200 dark:border-slate-800 flex items-baseline justify-between">
                      <div>
                        <span className="text-base font-black text-slate-900 dark:text-white font-display block">
                          Total Charge
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                          {billingCycle === "trial" ? "No credit card required" : "Charged only for selected items"}
                        </span>
                      </div>

                      <div className="text-right">
                        {billingCycle === "trial" ? (<div>
                            <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400 font-display">
                              FREE
                            </span>
                            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block">
                              14-Day Access
                            </span>
                          </div>) : (<div>
                            <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400 font-display">
                              {formatPrice(cartTotal)}
                            </span>
                            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block">
                              {billingCycle === "yearly" ? "/year" : "/month"}
                            </span>
                          </div>)}
                      </div>
                    </div>
                  </div>

                  {/* ACTION BUTTON */}
                  <Link href="/register" className={`w-full py-4.5 rounded-2xl text-sm sm:text-base font-extrabold text-white shadow-xl flex items-center justify-center gap-2.5 transition-all ${cart.length > 0
            ? "bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 shadow-emerald-500/25"
            : "bg-slate-300 dark:bg-slate-800 text-slate-500 dark:text-slate-500 cursor-not-allowed pointer-events-none"}`}>
                    <CreditCard className="w-5 h-5"/>
                    <span>
                      {cart.length === 0
            ? "Select Services to Continue"
            : billingCycle === "trial"
                ? "Start 14-Day Free Trial"
                : `Proceed with ${cart.length} Selected`}
                    </span>
                    <ArrowRight className="w-5 h-5"/>
                  </Link>

                  {/* Trust guarantees */}
                  <div className="pt-2 flex items-center justify-center gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-500 stroke-[2.5]"/>
                      <span>Instant Access</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5 text-amber-500"/>
                      <span>Cancel Anytime</span>
                    </div>
                  </div>

                </div>

              </div>
            </div>

          </div>

          {/* PRICING FAQ ACCORDION */}
          <div className="space-y-6 max-w-3xl mx-auto pt-12 border-t border-slate-200 dark:border-slate-800">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary">
                <HelpCircle className="w-4 h-4"/>
                <span>Frequently Asked Questions</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 dark:text-white">
                Got Questions? We Have Answers
              </h2>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (<div key={idx} className="border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-[#0d1424]/80 backdrop-blur-xl overflow-hidden transition-all duration-200">
                    <button onClick={() => toggleFaq(idx)} className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 focus:outline-none">
                      <span className="text-sm font-bold text-slate-800 dark:text-white font-display">
                        {faq.q}
                      </span>
                      <ChevronDown className={`w-4 h-4 text-slate-500 dark:text-slate-400 transform transition-transform duration-200 shrink-0 ${isOpen ? "rotate-180 text-primary" : ""}`}/>
                    </button>
                    {isOpen && (<div className="px-6 pb-4 text-xs text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/80 pt-3">
                        {faq.a}
                      </div>)}
                  </div>);
        })}
            </div>
          </div>

        </div>
      </main>

      {/* MOBILE FLOATING CART BAR (Visible on smaller screens when items selected) */}
      <AnimatePresence>
        {cart.length > 0 && (<motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }} className="lg:hidden fixed bottom-6 inset-x-0 mx-auto z-50 w-full max-w-lg px-4">
            <div className="p-4 rounded-3xl bg-white/95 dark:bg-slate-900/95 border border-primary/40 dark:border-primary/50 text-slate-900 dark:text-white shadow-2xl backdrop-blur-2xl flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white shadow-md">
                  <ShoppingCart className="w-5 h-5"/>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    {cart.length} {cart.length === 1 ? "Service" : "Services"} Selected
                  </h4>
                  <p className="text-sm font-black text-emerald-600 dark:text-emerald-400">
                    {billingCycle === "trial" ? "FREE (14 Days)" : formatPrice(cartTotal)}
                    {billingCycle !== "trial" && (<span className="text-[10px] font-normal text-slate-500 dark:text-slate-400">
                        {billingCycle === "yearly" ? "/yr" : "/mo"}
                      </span>)}
                  </p>
                </div>
              </div>

              <Link href="/register" className="px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold rounded-xl shadow-lg flex items-center gap-1.5">
                <span>{billingCycle === "trial" ? "Start Trial" : "Checkout"}</span>
                <ArrowRight className="w-4 h-4"/>
              </Link>
            </div>
          </motion.div>)}
      </AnimatePresence>

      {/* SERVICE DETAILS MODAL (Opens when clicking 'More Info') */}
      <AnimatePresence>
        {activeDetailModal && (<div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActiveDetailModal(null)} className="fixed inset-0 bg-slate-950/75 backdrop-blur-md"/>

            {/* Modal Dialog */}
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative w-full max-w-xl bg-white dark:bg-[#0c1324] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 overflow-hidden space-y-6">
              {/* Close Button */}
              <button onClick={() => setActiveDetailModal(null)} className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                <X className="w-5 h-5"/>
              </button>

              {/* Modal Header */}
              <div className="flex items-center gap-4 pr-8">
                {(() => {
                const ModalIcon = getServiceIcon(activeDetailModal.name);
                return (<div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary border border-primary/20 flex items-center justify-center shrink-0 shadow-md">
                      <ModalIcon className="w-7 h-7"/>
                    </div>);
            })()}
                <div>
                  <span className="text-xs font-black uppercase tracking-widest text-slate-400 font-mono">
                    Service Overview
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-display">
                    {activeDetailModal.name}
                  </h3>
                </div>
              </div>

              {/* Description */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-150 dark:border-slate-800 space-y-1">
                <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">
                  Module Function & Capabilities
                </span>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                  {activeDetailModal.description ||
                "Enterprise growth service engineered for automated client acquisition, lead tracking, and omnichannel customer communication."}
                </p>
              </div>

              {/* Highlights & Features */}
              <div className="space-y-3">
                <h4 className="text-sm font-extrabold text-slate-900 dark:text-white font-display">
                  Key Features & Included Capabilities
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {(activeDetailModal.features && activeDetailModal.features.length > 0
                ? activeDetailModal.features
                : getDefaultFeatures(activeDetailModal.name, activeDetailModal.id)).map((feat, fIdx) => (<div key={fIdx} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-150 dark:border-slate-800 flex items-center gap-2.5 text-xs font-semibold text-slate-800 dark:text-slate-200">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 stroke-[2.5]"/>
                      <span>{feat}</span>
                    </div>))}
                </div>
              </div>

              {/* Pricing & Selection Footer */}
              <div className="pt-4 border-t border-slate-150 dark:border-slate-800 flex items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold text-slate-400 block">
                    Service Plan Rate
                  </span>
                  {billingCycle === "trial" ? (<span className="text-lg font-black text-emerald-600 dark:text-emerald-400 font-display">
                      FREE TRIAL (14 Days)
                    </span>) : (<span className="text-xl font-black text-slate-900 dark:text-white font-display">
                      {formatPrice(getPrice(activeDetailModal))}
                      <span className="text-xs text-slate-500 font-normal ml-1">
                        {billingCycle === "yearly" ? "/year" : "/month"}
                      </span>
                    </span>)}
                </div>

                <button onClick={() => {
                toggleCartItem(activeDetailModal.id);
                setActiveDetailModal(null);
            }} className={`px-6 py-3 rounded-2xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 ${cart.includes(activeDetailModal.id)
                ? "bg-rose-500 hover:bg-rose-600 text-white shadow-lg shadow-rose-500/20"
                : "bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20"}`}>
                  <Check className="w-4 h-4"/>
                  <span>
                    {cart.includes(activeDetailModal.id) ? "Remove Service" : "Add to Plan"}
                  </span>
                </button>
              </div>
            </motion.div>
          </div>)}
      </AnimatePresence>

      <Footer />
    </div>);
}
