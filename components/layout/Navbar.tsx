"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage, Language, Region } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Sun, Moon, Globe, Menu, X, ArrowRight, MapPin, Check } from "lucide-react";
import Logo from "@/components/layout/Logo";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { language, setLanguage, region, setRegion, regionMode, setRegionMode, t, dir } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [regionDropdownOpen, setRegionDropdownOpen] = useState(false);

  const languagesList: { code: Language; label: string }[] = [
    { code: "en", label: "English" },
    { code: "hi", label: "हिन्दी" },
    { code: "ar", label: "العربية" },
    { code: "ta", label: "தமிழ்" },
  ];

  const regionsList: { code: Region; label: string; flag: string; currency: string }[] = [
    { code: "in", label: "India", flag: "🇮🇳", currency: "INR (₹)" },
    { code: "global", label: "International", flag: "🌍", currency: "USD ($)" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-opacity-10 shadow-sm transition-all duration-300">
      <div className="w-full px-6 md:px-10">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <Logo className="w-24 h-16" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              href="#features"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {t("features")}
            </Link>
            <Link
              href="/pricing"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {t("pricing")}
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {t("about")}
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {t("contact")}
            </Link>
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Toggle Theme"
              title="Toggle Light/Dark Theme"
            >
              {theme === "dark" ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Region Selector (Auto IP vs Manual) */}
            <div className="relative">
              <button
                onClick={() => {
                  setRegionDropdownOpen(!regionDropdownOpen);
                  setLangDropdownOpen(false);
                }}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-border/60 hover:bg-black/5 dark:hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors text-xs font-semibold"
                aria-label="Select Region"
              >
                {regionMode === "auto" ? (
                  <span>🌐 Auto ({region === "in" ? "🇮🇳 IN" : "🌍 Global"})</span>
                ) : (
                  <span>{region === "in" ? "🇮🇳 India" : "🌍 International"}</span>
                )}
              </button>

              {regionDropdownOpen && (
                <div className={`absolute ${dir === "rtl" ? "left-0" : "right-0"} mt-2 w-56 origin-top-right rounded-xl glass-panel shadow-lg ring-1 ring-black/5 dark:ring-white/5 z-50 p-1.5 space-y-1.5`}>
                  <div className="px-2 py-1 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                    Region Selection Mode
                  </div>

                  {/* Auto IP Mode Button */}
                  <button
                    onClick={() => {
                      setRegionMode("auto");
                      setRegionDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors ${
                      regionMode === "auto" ? "text-primary font-bold bg-primary/10" : "text-muted-foreground"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Globe className="w-3.5 h-3.5 text-primary" />
                      <span>Auto Detect IP</span>
                    </span>
                    <span className="text-[10px] text-emerald-500 font-semibold">Geo-IP</span>
                  </button>

                  <div className="border-t border-border/40 my-1" />

                  <div className="px-2 py-0.5 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                    Manual Selection
                  </div>

                  {regionsList.map((r) => (
                    <button
                      key={r.code}
                      onClick={() => {
                        setRegion(r.code);
                        setRegionDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors ${
                        regionMode === "manual" && region === r.code ? "text-primary font-bold bg-primary/10" : "text-muted-foreground"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{r.flag}</span>
                        <span>{r.label}</span>
                      </span>
                      <span className="text-[10px] opacity-75">{r.currency}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => {
                  setLangDropdownOpen(!langDropdownOpen);
                  setRegionDropdownOpen(false);
                }}
                className="flex items-center gap-1.5 p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
              >
                <Globe className="w-4 h-4" />
                <span className="uppercase">{language}</span>
              </button>

              {langDropdownOpen && (
                <div className={`absolute ${dir === "rtl" ? "left-0" : "right-0"} mt-2 w-40 origin-top-right rounded-xl glass-panel shadow-lg ring-1 ring-black/5 dark:ring-white/5 z-50 p-1`}>
                  {languagesList.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors ${
                        language === lang.code ? "text-primary font-semibold" : "text-muted-foreground"
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Login / Auth */}
            {user ? (
              <div className="flex items-center gap-4">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-primary to-secondary rounded-xl hover:opacity-95 shadow-md shadow-primary/10 transition-all duration-200"
                >
                  {t("dashboard")}
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Link>
                <button
                  onClick={logout}
                  className="text-sm font-medium text-red-500 hover:text-red-600 transition-colors"
                >
                  {t("logout")}
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="text-sm font-semibold text-muted-foreground hover:text-foreground px-3 py-2 transition-colors"
                >
                  {t("login")}
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-muted-foreground hover:text-foreground"
            >
              {theme === "dark" ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-muted-foreground hover:text-foreground"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-opacity-5 animate-fade-in p-4 space-y-4">
          <nav className="flex flex-col space-y-3">
            <Link
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-muted-foreground hover:text-foreground py-1"
            >
              {t("features")}
            </Link>
            <Link
              href="/pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-muted-foreground hover:text-foreground py-1"
            >
              {t("pricing")}
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-muted-foreground hover:text-foreground py-1"
            >
              {t("about")}
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-muted-foreground hover:text-foreground py-1"
            >
              {t("contact")}
            </Link>
          </nav>

          <hr className="border-border opacity-50" />

          {/* Region Mobile Select */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-primary" />
                Region Mode
              </span>
              <button
                onClick={() => setRegionMode("auto")}
                className={`px-2.5 py-1 text-xs rounded-lg border flex items-center gap-1 transition-all ${
                  regionMode === "auto"
                    ? "border-primary text-primary font-bold bg-primary/10"
                    : "border-border text-muted-foreground"
                }`}
              >
                <span>🌐 Auto IP</span>
              </button>
            </div>
            <div className="flex justify-end gap-2">
              {regionsList.map((r) => (
                <button
                  key={r.code}
                  onClick={() => setRegion(r.code)}
                  className={`px-2.5 py-1 text-xs rounded-lg border flex items-center gap-1 transition-all ${
                    regionMode === "manual" && region === r.code
                      ? "border-primary text-primary font-bold bg-primary/10"
                      : "border-border text-muted-foreground"
                  }`}
                >
                  <span>{r.flag}</span>
                  <span>{r.label}</span>
                </button>
              ))}
            </div>
          </div>

          <hr className="border-border opacity-50" />

          {/* Language Mobile Select */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground flex items-center gap-1.5">
              <Globe className="w-4 h-4" />
              {t("language")}
            </span>
            <div className="flex gap-2">
              {languagesList.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code);
                  }}
                  className={`px-2.5 py-1 text-xs rounded-lg border ${
                    language === lang.code
                      ? "border-primary text-primary font-bold bg-primary/10"
                      : "border-border text-muted-foreground"
                  }`}
                >
                  {lang.code.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <hr className="border-border opacity-50" />

          {/* Mobile Auth Button */}
          {user ? (
            <div className="flex flex-col gap-3">
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 text-sm font-semibold text-white bg-primary rounded-xl shadow-md"
              >
                {t("dashboard")}
              </Link>
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-center py-2 text-sm font-medium text-red-500"
              >
                {t("logout")}
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2 text-sm font-semibold text-muted-foreground hover:text-foreground"
              >
                {t("login")}
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
