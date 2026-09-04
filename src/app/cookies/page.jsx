"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Cookie, CheckCircle2, Sliders } from "lucide-react";
export default function CookiePolicyPage() {
    const [cookieConsent, setCookieConsent] = useState({
        necessary: true,
        functional: true,
        analytics: true,
        marketing: false
    });
    const [savedSuccess, setSavedSuccess] = useState(false);
    const handleSavePreferences = () => {
        if (typeof window !== "undefined") {
            localStorage.setItem("sg_cookie_preferences", JSON.stringify(cookieConsent));
            setSavedSuccess(true);
            setTimeout(() => setSavedSuccess(false), 3000);
        }
    };
    return (<div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
      <main className="flex-grow pt-20 pb-20 relative z-10 overflow-x-hidden">
        {/* Background Radial Glow */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-amber-500/10 dark:bg-amber-500/15 rounded-full blur-[140px] pointer-events-none -z-10"/>

        {/* HERO BANNER */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 text-center space-y-4 max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 shadow-sm">
            <Cookie className="w-4 h-4"/>
            <span>Cookie & Tracking Transparency</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl sm:text-5xl font-extrabold tracking-tight font-display text-slate-900 dark:text-white">
            Cookie Policy
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Last Updated: <span className="font-semibold text-slate-900 dark:text-white">August 28, 2026</span> • Version 3.0
          </motion.p>
        </section>

        {/* CONTENT CONTAINER */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* INTRO CARD */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#0b1220] border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
            <h2 className="text-xl font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
              <Cookie className="w-5 h-5 text-amber-500"/> What Are Cookies?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Cookies are small text files stored on your device when you visit websites. They help websites remember your session login state, regional currency settings (INR ₹ / USD $), active language preferences (English, Hindi, Arabic, Tamil), and ensure fast, secure loading.
            </p>
          </div>

          {/* INTERACTIVE COOKIE PREFERENCE MANAGER */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#0b1220] border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h2 className="text-xl font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-amber-500"/> Manage Your Cookie Preferences
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Customize which cookies you allow on your device.
                </p>
              </div>

              <button onClick={handleSavePreferences} className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5 shrink-0">
                <CheckCircle2 className="w-4 h-4"/>
                <span>{savedSuccess ? "Preferences Saved!" : "Save Cookie Settings"}</span>
              </button>
            </div>

            {/* Cookie Categories List */}
            <div className="space-y-4">
              
              {/* Category 1: Strictly Necessary */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1 pr-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900 dark:text-white">Essential & Strictly Necessary</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold uppercase">Always Required</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Required for user authentication, security tokens, CSRF protection, and CRM session state. Cannot be disabled.
                  </p>
                </div>
                <div className="shrink-0">
                  <input type="checkbox" checked disabled className="w-5 h-5 accent-emerald-500 cursor-not-allowed"/>
                </div>
              </div>

              {/* Category 2: Functional */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1 pr-4">
                  <span className="text-sm font-bold text-slate-900 dark:text-white block">Functionality & Preferences</span>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Remembers your preferred language, dark/light theme mode, and auto-detected regional IP settings.
                  </p>
                </div>
                <div className="shrink-0">
                  <input type="checkbox" checked={cookieConsent.functional} onChange={(e) => setCookieConsent({ ...cookieConsent, functional: e.target.checked })} className="w-5 h-5 accent-amber-500 cursor-pointer"/>
                </div>
              </div>

              {/* Category 3: Analytics */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1 pr-4">
                  <span className="text-sm font-bold text-slate-900 dark:text-white block">Performance & Analytics</span>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Uses anonymized data (Google Analytics 4 & Microsoft Clarity) to measure page load speeds and feature utilization.
                  </p>
                </div>
                <div className="shrink-0">
                  <input type="checkbox" checked={cookieConsent.analytics} onChange={(e) => setCookieConsent({ ...cookieConsent, analytics: e.target.checked })} className="w-5 h-5 accent-amber-500 cursor-pointer"/>
                </div>
              </div>

              {/* Category 4: Marketing */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1 pr-4">
                  <span className="text-sm font-bold text-slate-900 dark:text-white block">Marketing & Targeting</span>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Used to measure campaign performance when you visit from promotional links or partner referrals.
                  </p>
                </div>
                <div className="shrink-0">
                  <input type="checkbox" checked={cookieConsent.marketing} onChange={(e) => setCookieConsent({ ...cookieConsent, marketing: e.target.checked })} className="w-5 h-5 accent-amber-500 cursor-pointer"/>
                </div>
              </div>

            </div>
          </div>

          {/* CONTACT INFO */}
          <div className="p-6 rounded-2xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs space-y-2 text-center">
            <p className="font-bold text-slate-900 dark:text-white">Questions about our Cookie Policy?</p>
            <p className="text-slate-500">Email our support team at <span className="text-amber-500 font-mono font-bold">privacy@sellgrow.io</span></p>
          </div>

        </section>
      </main>

      <Footer />
    </div>);
}
