"use client";

import React, { useState } from "react";
import { useLanguage, Region, Language, RegionMode } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Globe, MapPin, CheckCircle2, ArrowRight } from "lucide-react";
import Logo from "@/components/layout/Logo";

export default function OnboardingModal() {
  const { hasSelectedPreferences, savePreferences, region: activeRegion, detectedCountry } = useLanguage();
  const [selectedMode, setSelectedMode] = useState<RegionMode>("auto");
  const [selectedRegion, setSelectedRegion] = useState<Region>(activeRegion);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>("en");

  if (hasSelectedPreferences) {
    return null;
  }

  const handleConfirm = () => {
    savePreferences(selectedRegion, selectedLanguage, selectedMode);
  };

  const regions: { id: Region; title: string; subtitle: string; flag: string; badge: string }[] = [
    {
      id: "in",
      title: "India Region",
      subtitle: "Localized services & pricing in Indian Rupees (INR ₹)",
      flag: "🇮🇳",
      badge: "India Edition",
    },
    {
      id: "global",
      title: "International / Global",
      subtitle: "Worldwide services & pricing in US Dollars (USD $)",
      flag: "🌍",
      badge: "Global Edition",
    },
  ];

  const languages: { code: Language; label: string; nativeLabel: string; flag: string }[] = [
    { code: "en", label: "English", nativeLabel: "English", flag: "🇬🇧" },
    { code: "hi", label: "Hindi", nativeLabel: "हिन्दी", flag: "🇮🇳" },
    { code: "ar", label: "Arabic", nativeLabel: "العربية (RTL)", flag: "🇸🇦" },
    { code: "ta", label: "Tamil", nativeLabel: "தமிழ்", flag: "🇮🇳" },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-xl animate-fade-in select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-xl bg-white dark:bg-[#0c1220] border border-border rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 relative overflow-hidden"
        >
          {/* Top subtle glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-primary/20 via-secondary/10 to-transparent blur-2xl pointer-events-none" />

          {/* Header */}
          <div className="text-center space-y-3 relative z-10">
            <div className="flex justify-center">
              <Logo className="w-24 h-16" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Welcome to SellGrow</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display text-foreground">
              Customize Your Workspace
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
              Before exploring our Operating System, please select your region and preferred language to tailor your experience.
            </p>
          </div>

          <div className="space-y-5 relative z-10">
            {/* STEP 1: REGION SELECTION */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-primary" />
                  1. Select Region Mode
                </span>
                <span className="text-[10px] text-primary font-semibold">Auto IP or Manual</span>
              </label>

              {/* Auto IP Mode Option */}
              <button
                type="button"
                onClick={() => setSelectedMode("auto")}
                className={`w-full p-3.5 rounded-2xl border text-left transition-all duration-200 flex items-center justify-between ${
                  selectedMode === "auto"
                    ? "border-primary bg-primary/10 text-foreground ring-2 ring-primary/30 shadow-md"
                    : "border-border bg-slate-50/50 dark:bg-black/20 text-muted-foreground hover:bg-slate-100 dark:hover:bg-white/5 hover:text-foreground"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🌐</span>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-foreground font-display flex items-center gap-2">
                      <span>Auto Detect Region (IP-Based)</span>
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        Geo-IP Auto
                      </span>
                    </h4>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      Automatically detects your country ({detectedCountry}) via client IP address.
                    </p>
                  </div>
                </div>
                {selectedMode === "auto" && (
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 ml-2" />
                )}
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {regions.map((r) => {
                  const isSelected = selectedMode === "manual" && selectedRegion === r.id;
                  return (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => {
                        setSelectedMode("manual");
                        setSelectedRegion(r.id);
                      }}
                      className={`p-3.5 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between relative ${
                        isSelected
                          ? "border-primary bg-primary/10 text-foreground ring-2 ring-primary/30 shadow-md"
                          : "border-border bg-slate-50/50 dark:bg-black/20 text-muted-foreground hover:bg-slate-100 dark:hover:bg-white/5 hover:text-foreground"
                      }`}
                    >
                      <div className="flex items-center justify-between w-full mb-1.5">
                        <span className="text-xl">{r.flag}</span>
                        {isSelected && (
                          <CheckCircle2 className="w-4 h-4 text-primary" />
                        )}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-foreground font-display">Manual: {r.title}</h4>
                        <p className="text-[10px] text-muted-foreground mt-0.5 leading-snug">{r.subtitle}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* STEP 2: LANGUAGE SELECTION */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-primary" />
                2. Select Language
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {languages.map((l) => {
                  const isSelected = selectedLanguage === l.code;
                  return (
                    <button
                      key={l.code}
                      type="button"
                      onClick={() => setSelectedLanguage(l.code)}
                      className={`p-3 rounded-xl border text-center transition-all duration-200 flex flex-col items-center gap-1 ${
                        isSelected
                          ? "border-primary bg-primary/10 text-primary font-bold ring-2 ring-primary/30"
                          : "border-border bg-slate-50/50 dark:bg-black/20 text-muted-foreground hover:bg-slate-100 dark:hover:bg-white/5 hover:text-foreground"
                      }`}
                    >
                      <span className="text-lg">{l.flag}</span>
                      <span className="text-xs font-bold">{l.nativeLabel}</span>
                      <span className="text-[10px] text-muted-foreground">{l.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* CONFIRM ACTION */}
          <div className="pt-2 relative z-10">
            <button
              onClick={handleConfirm}
              className="w-full py-3.5 bg-gradient-to-r from-primary to-secondary hover:opacity-95 text-white text-sm font-bold rounded-2xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Explore SellGrow Platform</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
