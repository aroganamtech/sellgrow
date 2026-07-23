"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  ChevronDown,
  HelpCircle,
  ShoppingCart,
  MessageSquare,
  Globe,
  Smartphone,
  Box,
  Bot,
  TrendingUp,
  Trash2,
  X,
  CheckCircle2,
  Plus,
  Check,
  Zap,
} from "lucide-react";

// Mapped helper functions for dynamic styling & icons
const getServiceIcon = (name: string) => {
  const norm = (name || "").toLowerCase();
  if (norm.includes("whatsapp")) return MessageSquare;
  if (norm.includes("website") || norm.includes("creation")) return Globe;
  if (norm.includes("app")) return Smartphone;
  if (norm.includes("ai") || norm.includes("bot")) return Bot;
  if (norm.includes("3d")) return Box;
  if (norm.includes("crm") || norm.includes("sells") || norm.includes("sales")) return TrendingUp;
  return Sparkles;
};

const getServiceStyles = (idx: number) => {
  const presets = [
    {
      gradient: "from-emerald-500/10 dark:from-emerald-500/20 via-teal-500/5 dark:via-teal-500/10 to-transparent",
      borderColor: "border-slate-200 dark:border-slate-800/80 hover:border-emerald-500/60 dark:hover:border-emerald-500",
      glowColor: "hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] dark:hover:shadow-[0_0_30px_rgba(16,185,129,0.2)]",
      iconBg: "bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 dark:border-emerald-500/40",
      accentBtn: "from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-emerald-500/20",
    },
    {
      gradient: "from-amber-500/10 dark:from-amber-500/20 via-orange-500/5 dark:via-orange-500/10 to-transparent",
      borderColor: "border-slate-200 dark:border-slate-800/80 hover:border-amber-500/60 dark:hover:border-amber-500",
      glowColor: "hover:shadow-[0_0_30px_rgba(245,158,11,0.1)] dark:hover:shadow-[0_0_30px_rgba(245,158,11,0.2)]",
      iconBg: "bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/20 dark:border-amber-500/40",
      accentBtn: "from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 shadow-amber-500/20",
    },
    {
      gradient: "from-indigo-500/10 dark:from-indigo-500/20 via-purple-500/5 dark:via-purple-500/10 to-transparent",
      borderColor: "border-slate-200 dark:border-slate-800/80 hover:border-indigo-500/60 dark:hover:border-indigo-500",
      glowColor: "hover:shadow-[0_0_30px_rgba(99,102,241,0.1)] dark:hover:shadow-[0_0_30px_rgba(99,102,241,0.2)]",
      iconBg: "bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border-indigo-500/20 dark:border-indigo-500/40",
      accentBtn: "from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-indigo-500/20",
    },
    {
      gradient: "from-purple-500/10 dark:from-purple-500/20 via-fuchsia-500/5 dark:via-fuchsia-500/10 to-transparent",
      borderColor: "border-slate-200 dark:border-slate-800/80 hover:border-purple-500/60 dark:hover:border-purple-500",
      glowColor: "hover:shadow-[0_0_30px_rgba(168,85,247,0.1)] dark:hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]",
      iconBg: "bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 border-purple-500/20 dark:border-purple-500/40",
      accentBtn: "from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 shadow-purple-500/20",
    },
    {
      gradient: "from-sky-500/10 dark:from-sky-500/20 via-cyan-500/5 dark:via-cyan-500/10 to-transparent",
      borderColor: "border-slate-200 dark:border-slate-800/80 hover:border-sky-500/60 dark:hover:border-sky-500",
      glowColor: "hover:shadow-[0_0_30px_rgba(56,189,248,0.1)] dark:hover:shadow-[0_0_30px_rgba(56,189,248,0.2)]",
      iconBg: "bg-sky-500/10 dark:bg-sky-500/20 text-sky-600 dark:text-sky-400 border-sky-500/20 dark:border-sky-500/40",
      accentBtn: "from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 shadow-sky-500/20",
    },
    {
      gradient: "from-rose-500/10 dark:from-rose-500/20 via-pink-500/5 dark:via-pink-500/10 to-transparent",
      borderColor: "border-slate-200 dark:border-slate-800/80 hover:border-rose-500/60 dark:hover:border-rose-500",
      glowColor: "hover:shadow-[0_0_30px_rgba(244,63,94,0.1)] dark:hover:shadow-[0_0_30px_rgba(244,63,94,0.2)]",
      iconBg: "bg-rose-500/10 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 border-rose-500/20 dark:border-rose-500/40",
      accentBtn: "from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 shadow-rose-500/20",
    }
  ];
  return presets[idx % presets.length];
};

const getDefaultFeatures = (name: string, id: string): string[] => {
  const norm = (name || "").toLowerCase();
  if (norm.includes("whatsapp")) {
    return ["Official Meta API Broadcasts", "Unified Shared Agent Inbox"];
  }
  if (norm.includes("website view")) {
    return ["Live Client Traffic Tracking", "Active Sessions Dashboard"];
  }
  if (norm.includes("app view")) {
    return ["Mobile App Interface Logs", "Native Session Tracker"];
  }
  if (norm.includes("ai bot")) {
    return ["Generative AI Customer Agent", "Smart Context Responses"];
  }
  if (norm.includes("3d")) {
    return ["Immersive 3D Model Rendering", "Interactive WebGL Component"];
  }
  if (norm.includes("crm") || norm.includes("sells")) {
    return ["Lead Conversion Pipeline", "Real-time Analytics Tracker"];
  }
  if (norm.includes("marketing")) {
    return ["SEO Performance Metrics", "Multi-Channel Ad Monitoring"];
  }
  if (norm.includes("website creation") || norm.includes("creation")) {
    return ["Automated Premium Layouts", "High-Speed Page Builder"];
  }
  if (norm.includes("borcher") || norm.includes("brochure")) {
    return ["Dynamic Digital Brochures", "Exportable PDF Catalogs"];
  }
  if (norm.includes("logo")) {
    return ["High-Res Vector Formats", "Smart Brand Identity Builder"];
  }
  if (norm.includes("social")) {
    return ["Scheduled Auto-Posting Engine", "Cross-Platform Feed Sync"];
  }
  return ["Custom Feature Trigger Integration", "API Endpoint Microservice"];
};

const getDefaultPrices = (name: string, id: string) => {
  const norm = (name || "").toLowerCase();
  if (norm.includes("whatsapp")) {
    return { mINR: 1999, mUSD: 29, yINR: 19999, yUSD: 299 };
  }
  if (norm.includes("website creation") || norm.includes("creation")) {
    return { mINR: 4999, mUSD: 69, yINR: 49999, yUSD: 699 };
  }
  if (norm.includes("website view")) {
    return { mINR: 999, mUSD: 15, yINR: 9999, yUSD: 149 };
  }
  if (norm.includes("app view")) {
    return { mINR: 1499, mUSD: 19, yINR: 14999, yUSD: 199 };
  }
  if (norm.includes("ai bot")) {
    return { mINR: 2999, mUSD: 39, yINR: 29999, yUSD: 399 };
  }
  if (norm.includes("3d")) {
    return { mINR: 3999, mUSD: 59, yINR: 39999, yUSD: 599 };
  }
  if (norm.includes("crm") || norm.includes("sells")) {
    return { mINR: 2499, mUSD: 35, yINR: 24999, yUSD: 349 };
  }
  if (norm.includes("marketing")) {
    return { mINR: 1999, mUSD: 29, yINR: 19999, yUSD: 299 };
  }
  if (norm.includes("borcher") || norm.includes("brochure")) {
    return { mINR: 799, mUSD: 10, yINR: 7999, yUSD: 99 };
  }
  if (norm.includes("logo")) {
    return { mINR: 499, mUSD: 7, yINR: 4999, yUSD: 69 };
  }
  if (norm.includes("social")) {
    return { mINR: 1199, mUSD: 16, yINR: 11999, yUSD: 159 };
  }
  return { mINR: 999, mUSD: 15, yINR: 9999, yUSD: 149 };
};

const STATIC_FALLBACK_SERVICES = [
  { id: "whatsapp-business", name: "WhatsApp Business", description: "WhatsApp Business API gateway and chat broadcast engine", status: "Active", priceMonthlyINR: 1999, priceMonthlyUSD: 29, priceYearlyINR: 19999, priceYearlyUSD: 299 },
  { id: "website-business", name: "Website Business", description: "Live tracking of client web traffic and active sessions dashboard", status: "Active", priceMonthlyINR: 999, priceMonthlyUSD: 15, priceYearlyINR: 9999, priceYearlyUSD: 149 },
  { id: "app-business", name: "App Business", description: "Mobile application interface logs and native session tracker", status: "Active", priceMonthlyINR: 1499, priceMonthlyUSD: 19, priceYearlyINR: 14999, priceYearlyUSD: 199 },
  { id: "3d-viewing", name: "3D Viewing", description: "Immersive 3D model visualization and rendering engine component", status: "Active", priceMonthlyINR: 3999, priceMonthlyUSD: 59, priceYearlyINR: 39999, priceYearlyUSD: 599 },
  { id: "ai-assistant", name: "AI Assistant", description: "Generative AI customer service assistant bot for apps and websites", status: "Active", priceMonthlyINR: 2999, priceMonthlyUSD: 39, priceYearlyINR: 29999, priceYearlyUSD: 399 },
  { id: "sales-crm", name: "Sales CRM", description: "Sales pipeline tracking, lead conversion analytics, and CRM dashboard", status: "Active", priceMonthlyINR: 2499, priceMonthlyUSD: 35, priceYearlyINR: 24999, priceYearlyUSD: 349 }
];

export default function PricingPage() {
  const { region } = useLanguage();
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("yearly");
  const [cart, setCart] = useState<string[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [servicesList, setServicesList] = useState<any[]>(STATIC_FALLBACK_SERVICES);

  useEffect(() => {
    fetch("/api/admin/services")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success" && data.data && data.data.length > 0) {
          // Filter to only display Active services
          const activeOnly = data.data.filter((s: any) => s.status === "Active");
          if (activeOnly.length > 0) {
            setServicesList(activeOnly);
          }
        }
      })
      .catch((err) => {
        console.error("Error loading dynamically added services:", err);
      });
  }, []);

  const toggleFaq = (idx: number) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  // Calculate prices based on region & billing cycle
  const getPrice = (srv: any) => {
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
    } else {
      if (isYearly) {
        return yUSD > 0 ? yUSD : Math.round(mUSD * 12 * 0.8);
      }
      return mUSD;
    }
  };

  const formatPrice = (amount: number) => {
    if (region === "in") {
      return `₹${amount.toLocaleString("en-IN")}`;
    } else {
      return `$${amount}`;
    }
  };

  const toggleCartItem = (id: string) => {
    setCart((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const selectedModules = servicesList.filter((s) => cart.includes(s.id));
  const cartTotal = selectedModules.reduce(
    (sum, s) => sum + getPrice(s),
    0
  );

  const faqs = [
    {
      q: "Can I choose only the specific modules I need?",
      a: "Yes! You can add only the individual modules (like WhatsApp Business or Sales CRM) to your cart and subscribe to just what your business requires.",
    },
    {
      q: "Can I add more modules to my subscription later?",
      a: "Absolutely! You can add or remove modules anytime directly from your SellGrow dashboard.",
    },
    {
      q: "How does billing work for added modules?",
      a: "All selected modules are combined into a single unified monthly or discounted annual invoice.",
    },
    {
      q: "Is there a free trial or sandbox environment?",
      a: "Yes, you can launch our interactive Sandbox App anytime to test all modules with pre-loaded demo data.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white relative overflow-x-hidden transition-colors duration-300">
      <Navbar />

      <main className="flex-grow pt-6 pb-14 md:pt-8 md:pb-24 relative z-10">
        {/* Background Radial Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 dark:bg-primary/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          
          {/* HERO HEADER */}
          <div className="text-center space-y-5 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-primary/10 text-primary border border-primary/30 shadow-md shadow-primary/10"
            >
              <Sparkles className="w-4 h-4" />
              <span>
                {region === "in"
                  ? "🇮🇳 Regional Modular Pricing (INR ₹)"
                  : "🌍 Global Modular Pricing (USD $)"}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl font-extrabold tracking-tight font-display text-slate-900 dark:text-white leading-tight"
            >
              Select Your Business Modules
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed"
            >
              Add only the growth modules your business needs into your custom plan.
            </motion.p>

            {/* BILLING TOGGLE SWITCH */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="pt-4 flex items-center justify-center gap-4"
            >
              <span
                onClick={() => setBillingCycle("monthly")}
                className={`text-xs sm:text-sm font-semibold cursor-pointer transition-colors ${
                  billingCycle === "monthly" ? "text-slate-900 dark:text-white font-bold" : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                }`}
              >
                Monthly Billing
              </span>

              <button
                onClick={() =>
                  setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")
                }
                className="relative w-16 h-8 rounded-full bg-slate-200 dark:bg-slate-900 border border-slate-350 dark:border-slate-700/80 p-1 transition-colors duration-300 focus:outline-none shadow-inner"
                aria-label="Toggle Billing Frequency"
              >
                <motion.div
                  animate={{ x: billingCycle === "yearly" ? 32 : 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="w-6 h-6 rounded-full bg-gradient-to-r from-primary to-secondary shadow-md flex items-center justify-center text-white"
                >
                  <Zap className="w-3 h-3" />
                </motion.div>
              </button>

              <span
                onClick={() => setBillingCycle("yearly")}
                className={`text-xs sm:text-sm font-semibold flex items-center gap-2 cursor-pointer transition-colors ${
                  billingCycle === "yearly" ? "text-slate-900 dark:text-white font-bold" : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                }`}
              >
                Yearly Billing
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-extrabold uppercase border border-emerald-500/30 dark:border-emerald-500/40 shadow-sm shadow-emerald-500/20">
                  Save 20%
                </span>
              </span>
            </motion.div>
          </div>

          {/* DYNAMIC MODULAR SERVICES CARDS GRID */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.08 },
              },
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto"
          >
            {servicesList.map((srv, idx) => {
              const Icon = getServiceIcon(srv.name);
              const price = getPrice(srv);
              const isInCart = cart.includes(srv.id);
              const styles = getServiceStyles(idx);
              const highlights = srv.features && srv.features.length > 0 ? srv.features : getDefaultFeatures(srv.name, srv.id);
              const numStr = String(idx + 1).padStart(2, "0");

              return (
                <motion.div
                  key={srv.id}
                  variants={{
                    hidden: { opacity: 0, y: 25, scale: 0.96 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
                    },
                  }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className={`relative p-6 sm:p-7 rounded-3xl border text-left flex flex-col justify-between overflow-hidden backdrop-blur-2xl transition-all duration-300 shadow-xl ${styles.glowColor} ${
                    isInCart
                      ? "border-emerald-400 dark:border-emerald-450 bg-emerald-500/5 dark:bg-[#0a1b1a]/95 ring-2 ring-emerald-500/30 dark:ring-emerald-500/50 shadow-emerald-500/5 dark:shadow-emerald-500/20"
                      : `border-slate-250 dark:border-slate-800/80 bg-white dark:bg-[#090f1d]/90 ${styles.borderColor}`
                  }`}
                >
                  {/* Subtle Accent Gradient Overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${styles.gradient} pointer-events-none opacity-50`}
                  />

                  <div className="relative z-10 space-y-3">
                    {/* Header Icon & Number Badge */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-11 h-11 rounded-2xl flex items-center justify-center border shadow-md backdrop-blur-md ${styles.iconBg}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-extrabold tracking-widest font-mono text-slate-500 dark:text-slate-400 uppercase px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                          MODULE {numStr}
                        </span>
                      </div>

                      {isInCart ? (
                        <motion.span
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-bold border border-emerald-500/30 dark:border-emerald-500/40 shadow-sm"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" /> Added
                        </motion.span>
                      ) : null}
                    </div>

                    {/* Title */}
                    <div>
                      <h3 className="text-xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight leading-snug">
                        {srv.name}
                      </h3>
                      <p className="text-[11px] text-slate-655 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                        {srv.description}
                      </p>
                    </div>

                    {/* Key Highlights Bullets */}
                    <div className="space-y-1.5 pt-1 border-t border-slate-100 dark:border-white/10">
                      {highlights.map((feat: string, idx: number) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                          <Check className="w-3.5 h-3.5 text-emerald-550 dark:text-secondary shrink-0" />
                          <span className="font-medium">{feat}</span>
                        </div>
                      ))}
                    </div>

                    {/* Price Display */}
                    <div className="pt-1">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-3xl font-black tracking-tight font-display text-slate-900 dark:text-white">
                          {formatPrice(price)}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                          {billingCycle === "yearly" ? "/yr" : "/mo"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* ADD TO CART BUTTON */}
                  <div className="relative z-10 pt-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => toggleCartItem(srv.id)}
                      className={`w-full py-3.5 rounded-2xl text-xs sm:text-sm font-bold shadow-lg transition-all flex items-center justify-center gap-2 ${
                        isInCart
                          ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-500/30 border border-emerald-400/50"
                          : `bg-gradient-to-r ${styles.accentBtn} text-white border border-white/20`
                      }`}
                    >
                      {isInCart ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Added to Cart</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4" />
                          <ShoppingCart className="w-4 h-4" />
                          <span>Add to Cart</span>
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* PRICING FAQ ACCORDION */}
          <div className="space-y-6 max-w-3xl mx-auto pt-10">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary">
                <HelpCircle className="w-4 h-4" />
                <span>Frequently Asked Questions</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 dark:text-white">
                Got Questions? We Have Answers
              </h2>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div
                    key={idx}
                    className="border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-[#0d1424]/80 backdrop-blur-xl overflow-hidden transition-all duration-200"
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 focus:outline-none"
                    >
                      <span className="text-sm font-bold text-slate-800 dark:text-white font-display">
                        {faq.q}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-500 dark:text-slate-400 transform transition-transform duration-200 shrink-0 ${
                          isOpen ? "rotate-180 text-primary" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-4 text-xs text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/80 pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </main>

      {/* FLOATING CART BAR (Shown when items are added to cart) */}
      <AnimatePresence>
        {cart.length > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="fixed bottom-6 inset-x-0 mx-auto z-50 w-full max-w-lg px-4"
          >
            <div className="p-4 rounded-3xl bg-white/95 dark:bg-slate-900/95 border border-primary/40 dark:border-primary/50 text-slate-900 dark:text-white shadow-2xl shadow-primary/10 dark:shadow-primary/20 backdrop-blur-2xl flex items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="relative">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white shadow-md">
                    <ShoppingCart className="w-5 h-5" />
                  </div>
                  <motion.span
                    key={cart.length}
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-emerald-500 text-white text-[10px] font-black flex items-center justify-center shadow-lg border border-slate-100 dark:border-slate-900"
                  >
                    {cart.length}
                  </motion.span>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <span>{cart.length} {cart.length === 1 ? "Module" : "Modules"} Selected</span>
                  </h4>
                  <p className="text-base font-black text-emerald-600 dark:text-emerald-400">
                    {formatPrice(cartTotal)}
                    <span className="text-[10px] font-normal text-slate-500 dark:text-slate-400">
                      {billingCycle === "yearly" ? "/yr" : "/mo"}
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsCartOpen(true)}
                  className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white text-xs font-bold rounded-2xl shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2"
                >
                  <span>View Cart & Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CART CHECKOUT DRAWER MODAL */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-slate-950/60 dark:bg-slate-955/80 backdrop-blur-xl">
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="w-full max-w-lg bg-white dark:bg-[#090e1a]/95 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-2xl space-y-6 relative text-slate-900 dark:text-white overflow-hidden"
            >
              {/* Background ambient lighting */}
              <div className="absolute -top-20 -right-20 w-48 h-48 bg-primary/10 dark:bg-primary/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

              {/* Modal Header */}
              <div className="flex items-start justify-between relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-primary via-indigo-600 to-secondary flex items-center justify-center text-white shadow-lg shadow-primary/25 border border-white/20">
                    <ShoppingCart className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white tracking-wide">
                      Selected Growth Modules
                    </h3>
                    <p className="text-xs text-slate-650 dark:text-slate-400">
                      Review your custom growth module configuration
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 rounded-xl text-slate-500 hover:text-slate-850 dark:hover:text-white bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                  aria-label="Close Modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Selected Modules List */}
              <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1 relative z-10 custom-scrollbar">
                {selectedModules.length === 0 ? (
                  <div className="text-center py-8 text-slate-500 text-xs font-semibold">
                    No modules selected yet.
                  </div>
                ) : (
                  selectedModules.map((s, idx) => {
                    const price = getPrice(s);
                    const Icon = getServiceIcon(s.name);
                    const styles = getServiceStyles(idx);
                    return (
                      <motion.div
                        layout
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        key={s.id}
                        className="p-3.5 rounded-2xl border border-slate-150 dark:border-slate-800/90 bg-slate-50 dark:bg-slate-900/70 hover:border-slate-250 dark:hover:border-slate-700 flex items-center justify-between transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center border shadow-inner ${styles.iconBg}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className="text-sm font-bold text-slate-900 dark:text-white font-display">
                            {s.name}
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400 font-display">
                            {formatPrice(price)}
                          </span>
                          <button
                            onClick={() => toggleCartItem(s.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition-all"
                            title="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </motion.div>
                    );
                  })
                )}
              </div>

              {/* Order Summary Receipt Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-3 relative z-10">
                <div className="flex items-center justify-between text-xs text-slate-650 dark:text-slate-400">
                  <span>Billing Frequency</span>
                  <span className="font-bold text-slate-850 dark:text-white uppercase flex items-center gap-1.5">
                    {billingCycle}
                    {billingCycle === "yearly" && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-extrabold border border-emerald-500/30 dark:border-emerald-500/40">
                        20% Off
                      </span>
                    )}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-650 dark:text-slate-400">
                  <span>Selected Items</span>
                  <span className="font-bold text-slate-850 dark:text-white">
                    {cart.length} {cart.length === 1 ? "Module" : "Modules"}
                  </span>
                </div>

                <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-900 dark:text-white">
                    Total Subscription
                  </span>
                  <div className="text-right">
                    <span className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600 dark:from-emerald-400 dark:via-teal-300 dark:to-emerald-400 font-display">
                      {formatPrice(cartTotal)}
                    </span>
                    <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 block">
                      {billingCycle === "yearly" ? "/yr" : "/mo"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Modal Action CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 pt-1 relative z-10">
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="flex-1 py-3.5 border border-slate-300 dark:border-slate-700/80 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 text-xs font-bold rounded-2xl transition-all"
                >
                  Add More Modules
                </button>

                <Link
                  href="/register"
                  className="flex-1 py-3.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-white text-xs font-bold rounded-2xl text-center shadow-xl shadow-emerald-500/25 border border-emerald-400/30 flex items-center justify-center gap-2 transition-all group"
                >
                  <span>Proceed to Register</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
