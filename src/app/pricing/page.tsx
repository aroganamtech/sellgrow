"use client";

import React, { useState } from "react";
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

export default function PricingPage() {
  const { region } = useLanguage();
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("yearly");
  const [cart, setCart] = useState<string[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  // Calculate prices based on region & billing cycle (20% discount on yearly)
  const getPrice = (monthlyInr: number, monthlyUsd: number) => {
    if (region === "in") {
      return billingCycle === "yearly" ? Math.round(monthlyInr * 0.8) : monthlyInr;
    } else {
      return billingCycle === "yearly" ? Math.round(monthlyUsd * 0.8) : monthlyUsd;
    }
  };

  const formatPrice = (amount: number) => {
    if (region === "in") {
      return `₹${amount.toLocaleString("en-IN")}`;
    } else {
      return `$${amount}`;
    }
  };  // 6 Modular Services in exact requested order
  const moduleServices = [
    {
      id: "whatsapp-business",
      num: "01",
      title: "WhatsApp Business",
      monthlyInr: 1299,
      monthlyUsd: 19,
      icon: MessageSquare,
      gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
      borderColor: "border-emerald-500/40 hover:border-emerald-500",
      glowColor: "hover:shadow-[0_0_30px_rgba(16,185,129,0.2)]",
      iconBg: "bg-emerald-500/20 text-emerald-400 border-emerald-500/40",
      accentBtn: "from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-emerald-500/20",
      highlights: ["Official Meta API Broadcasts", "Unified Shared Agent Inbox"],
    },
    {
      id: "website-business",
      num: "02",
      title: "Website Business",
      monthlyInr: 1499,
      monthlyUsd: 24,
      icon: Globe,
      gradient: "from-amber-500/20 via-orange-500/10 to-transparent",
      borderColor: "border-amber-500/40 hover:border-amber-500",
      glowColor: "hover:shadow-[0_0_30px_rgba(245,158,11,0.2)]",
      iconBg: "bg-amber-500/20 text-amber-400 border-amber-500/40",
      accentBtn: "from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 shadow-amber-500/20",
      highlights: ["99+ Lighthouse SEO Score", "Dynamic Product Catalog Pages"],
    },
    {
      id: "app-business",
      num: "03",
      title: "App Business",
      monthlyInr: 2499,
      monthlyUsd: 39,
      icon: Smartphone,
      gradient: "from-indigo-500/20 via-purple-500/10 to-transparent",
      borderColor: "border-indigo-500/40 hover:border-indigo-500",
      glowColor: "hover:shadow-[0_0_30px_rgba(99,102,241,0.2)]",
      iconBg: "bg-indigo-500/20 text-indigo-400 border-indigo-500/40",
      accentBtn: "from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-indigo-500/20",
      highlights: ["Branded Android & iOS Apps", "Real-Time Push Notifications"],
    },
    {
      id: "3d-viewing",
      num: "04",
      title: "3D Viewing",
      monthlyInr: 1999,
      monthlyUsd: 29,
      icon: Box,
      gradient: "from-purple-500/20 via-fuchsia-500/10 to-transparent",
      borderColor: "border-purple-500/40 hover:border-purple-500",
      glowColor: "hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]",
      iconBg: "bg-purple-500/20 text-purple-400 border-purple-500/40",
      accentBtn: "from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 shadow-purple-500/20",
      highlights: ["Interactive 3D Product Renders", "AR Mobile Spatial View"],
    },
    {
      id: "ai-assistant",
      num: "05",
      title: "AI Assistant",
      monthlyInr: 2999,
      monthlyUsd: 49,
      icon: Bot,
      gradient: "from-sky-500/20 via-cyan-500/10 to-transparent",
      borderColor: "border-sky-500/40 hover:border-sky-500",
      glowColor: "hover:shadow-[0_0_30px_rgba(56,189,248,0.2)]",
      iconBg: "bg-sky-500/20 text-sky-400 border-sky-500/40",
      accentBtn: "from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 shadow-sky-500/20",
      highlights: ["Zero-Latency Speech & WebRTC", "Autonomous Calendar Booking"],
    },
    {
      id: "sales-crm",
      num: "06",
      title: "Sales CRM",
      monthlyInr: 1799,
      monthlyUsd: 29,
      icon: TrendingUp,
      gradient: "from-rose-500/20 via-pink-500/10 to-transparent",
      borderColor: "border-rose-500/40 hover:border-rose-500",
      glowColor: "hover:shadow-[0_0_30px_rgba(244,63,94,0.2)]",
      iconBg: "bg-rose-500/20 text-rose-400 border-rose-500/40",
      accentBtn: "from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 shadow-rose-500/20",
      highlights: ["Executive GPS Coordinate Logs", "Automated Sales Funnel Rules"],
    },
  ];

  const toggleCartItem = (id: string) => {
    setCart((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const selectedModules = moduleServices.filter((m) => cart.includes(m.id));
  const cartTotal = selectedModules.reduce(
    (sum, m) => sum + getPrice(m.monthlyInr, m.monthlyUsd),
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
      a: "Yes, you can launch our interactive Sandbox App anytime to test all 6 modules with pre-loaded demo data.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-foreground relative overflow-x-hidden">
      <Navbar />

      <main className="flex-grow pt-6 pb-14 md:pt-8 md:pb-24 relative z-10">
        {/* Background Radial Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          
          {/* HERO HEADER */}
          <div className="text-center space-y-5 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-primary/10 text-primary border border-primary/30 shadow-md shadow-primary/10"
            >
              <Sparkles className="w-4 h-4 animate-spin-slow" />
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
              className="text-4xl sm:text-5xl font-extrabold tracking-tight font-display text-white leading-tight"
            >
              Select Your Business Modules
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-base sm:text-lg text-slate-400 leading-relaxed"
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
                  billingCycle === "monthly" ? "text-white font-bold" : "text-slate-400 hover:text-slate-300"
                }`}
              >
                Monthly Billing
              </span>

              <button
                onClick={() =>
                  setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")
                }
                className="relative w-16 h-8 rounded-full bg-slate-900 border border-slate-700/80 p-1 transition-colors duration-300 focus:outline-none shadow-inner"
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
                  billingCycle === "yearly" ? "text-white font-bold" : "text-slate-400 hover:text-slate-300"
                }`}
              >
                Yearly Billing
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-extrabold uppercase border border-emerald-500/40 shadow-sm shadow-emerald-500/20">
                  Save 20%
                </span>
              </span>
            </motion.div>
          </div>

          {/* 6 MODULAR SERVICES CARDS GRID */}
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
            {moduleServices.map((mod) => {
              const Icon = mod.icon;
              const price = getPrice(mod.monthlyInr, mod.monthlyUsd);
              const isInCart = cart.includes(mod.id);

              return (
                <motion.div
                  key={mod.id}
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
                  className={`relative p-6 sm:p-7 rounded-3xl border text-left flex flex-col justify-between overflow-hidden backdrop-blur-2xl transition-all duration-300 shadow-2xl ${mod.glowColor} ${
                    isInCart
                      ? "border-emerald-400/80 bg-[#0a1b1a]/95 ring-2 ring-emerald-500/50 shadow-emerald-500/20"
                      : `border-slate-800/80 bg-[#090f1d]/90 ${mod.borderColor}`
                  }`}
                >
                  {/* Subtle Accent Gradient Overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${mod.gradient} pointer-events-none opacity-50`}
                  />

                  <div className="relative z-10 space-y-5">
                    {/* Header Icon & Number Badge */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-11 h-11 rounded-2xl flex items-center justify-center border shadow-lg backdrop-blur-md ${mod.iconBg}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-extrabold tracking-widest font-mono text-slate-400 uppercase px-2 py-0.5 rounded-md bg-white/5 border border-white/10">
                          MODULE {mod.num}
                        </span>
                      </div>

                      {isInCart ? (
                        <motion.span
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/40 shadow-sm"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" /> Added
                        </motion.span>
                      ) : null}
                    </div>

                    {/* Title */}
                    <div>
                      <h3 className="text-xl font-extrabold text-white font-display tracking-tight leading-snug">
                        {mod.title}
                      </h3>
                    </div>

                    {/* Key Highlights Bullets */}
                    <div className="space-y-2 pt-2 border-t border-white/10">
                      {mod.highlights.map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                          <Check className="w-3.5 h-3.5 text-secondary shrink-0" />
                          <span className="font-medium">{feat}</span>
                        </div>
                      ))}
                    </div>

                    {/* Price Display */}
                    <div className="pt-2">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-3xl font-black tracking-tight font-display text-white">
                          {formatPrice(price)}
                        </span>
                        <span className="text-xs text-slate-400 font-medium">
                          {billingCycle === "yearly" ? "/mo (billed annually)" : "/mo"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* ADD TO CART BUTTON */}
                  <div className="relative z-10 pt-6">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => toggleCartItem(mod.id)}
                      className={`w-full py-3.5 rounded-2xl text-xs sm:text-sm font-bold shadow-lg transition-all flex items-center justify-center gap-2 ${
                        isInCart
                          ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-500/30 border border-emerald-400/50"
                          : `bg-gradient-to-r ${mod.accentBtn} text-white border border-white/20`
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
              <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
                Got Questions? We Have Answers
              </h2>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div
                    key={idx}
                    className="border border-slate-800 rounded-2xl bg-[#0d1424]/80 backdrop-blur-xl overflow-hidden transition-all duration-200"
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 focus:outline-none"
                    >
                      <span className="text-sm font-bold text-white font-display">
                        {faq.q}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 transform transition-transform duration-200 shrink-0 ${
                          isOpen ? "rotate-180 text-primary" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-4 text-xs text-slate-400 leading-relaxed border-t border-slate-800/80 pt-3">
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
            <div className="p-4 rounded-3xl bg-slate-900/95 border border-primary/50 text-white shadow-2xl shadow-primary/20 backdrop-blur-2xl flex items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="relative">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white shadow-md">
                    <ShoppingCart className="w-5 h-5" />
                  </div>
                  <motion.span
                    key={cart.length}
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-emerald-500 text-white text-[10px] font-black flex items-center justify-center shadow-lg border border-slate-900"
                  >
                    {cart.length}
                  </motion.span>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>{cart.length} {cart.length === 1 ? "Module" : "Modules"} Selected</span>
                  </h4>
                  <p className="text-base font-black text-emerald-400">
                    {formatPrice(cartTotal)}
                    <span className="text-[10px] font-normal text-slate-400">
                      {billingCycle === "yearly" ? "/mo (billed annually)" : "/mo"}
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
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl">
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="w-full max-w-lg bg-[#090e1a]/95 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] backdrop-blur-2xl space-y-6 relative text-white overflow-hidden"
            >
              {/* Background ambient lighting */}
              <div className="absolute -top-20 -right-20 w-48 h-48 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

              {/* Modal Header */}
              <div className="flex items-start justify-between relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-primary via-indigo-600 to-secondary flex items-center justify-center text-white shadow-lg shadow-primary/25 border border-white/20">
                    <ShoppingCart className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold font-display text-white tracking-wide">
                      Selected Growth Modules
                    </h3>
                    <p className="text-xs text-slate-400">
                      Review your custom growth module configuration
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900/60 border border-slate-800 hover:bg-slate-800 transition-colors"
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
                  selectedModules.map((m) => {
                    const price = getPrice(m.monthlyInr, m.monthlyUsd);
                    return (
                      <motion.div
                        layout
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        key={m.id}
                        className="p-3.5 rounded-2xl border border-slate-800/90 bg-slate-900/70 hover:border-slate-700 flex items-center justify-between transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center border shadow-inner ${m.iconBg}`}>
                            <m.icon className="w-4 h-4" />
                          </div>
                          <span className="text-sm font-bold text-white font-display">
                            {m.title}
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-sm font-extrabold text-emerald-400 font-display">
                            {formatPrice(price)}
                          </span>
                          <button
                            onClick={() => toggleCartItem(m.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition-all"
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
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3 relative z-10">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Billing Frequency</span>
                  <span className="font-bold text-white uppercase flex items-center gap-1.5">
                    {billingCycle}
                    {billingCycle === "yearly" && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-extrabold border border-emerald-500/40">
                        20% Off
                      </span>
                    )}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Selected Items</span>
                  <span className="font-bold text-white">
                    {cart.length} {cart.length === 1 ? "Module" : "Modules"}
                  </span>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-sm font-bold text-white">
                    Total Subscription
                  </span>
                  <div className="text-right">
                    <span className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 font-display">
                      {formatPrice(cartTotal)}
                    </span>
                    <span className="text-[11px] font-medium text-slate-400 block">
                      {billingCycle === "yearly" ? "/mo (billed annually)" : "/mo"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Modal Action CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 pt-1 relative z-10">
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="flex-1 py-3.5 border border-slate-700/80 text-slate-300 hover:text-white hover:bg-slate-800/80 text-xs font-bold rounded-2xl transition-all"
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
