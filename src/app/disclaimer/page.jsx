"use client";
import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { AlertCircle, Bot, MessageSquare, ShieldAlert, HelpCircle } from "lucide-react";
export default function DisclaimerPage() {
    return (<div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
      <main className="flex-grow pt-20 pb-20 relative z-10 overflow-x-hidden">
        {/* Background Radial Glow */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-rose-500/10 dark:bg-rose-500/15 rounded-full blur-[140px] pointer-events-none -z-10"/>

        {/* HERO BANNER */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 text-center space-y-4 max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/30 shadow-sm">
            <AlertCircle className="w-4 h-4"/>
            <span>Platform & AI Disclaimers</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl sm:text-5xl font-extrabold tracking-tight font-display text-slate-900 dark:text-white">
            Legal Disclaimer
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Last Updated: <span className="font-semibold text-slate-900 dark:text-white">August 28, 2026</span> • Version 3.0
          </motion.p>
        </section>

        {/* CONTENT CONTAINER */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#0b1220] border border-slate-200 dark:border-slate-800 shadow-xl space-y-8">

            {/* 1. GENERAL PLATFORM DISCLAIMER */}
            <div className="space-y-3">
              <h2 className="text-xl font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-rose-500"/> 1. General Platform Information
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                The information provided by SellGrow Systems Inc. ("SellGrow") on our website, CRM tools, and SaaS platform is for general operational and informational purposes only. All information is provided in good faith; however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, completeness, or reliability of any metrics displayed.
              </p>
            </div>

            {/* 2. AI ASSISTANT & GENERATIVE AI DISCLAIMER */}
            <div className="space-y-3 border-t border-slate-100 dark:border-slate-800 pt-6">
              <h2 className="text-xl font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
                <Bot className="w-5 h-5 text-purple-500"/> 2. AI Assistant & Automated Speech Disclaimer
              </h2>
              <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed space-y-2">
                <p>
                  SellGrow incorporates generative AI models for real-time speech transcription, AI Voice Receptionist calls, and automated chat replies:
                </p>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li><strong className="text-slate-800 dark:text-slate-200">No Professional Advice:</strong> AI Assistants provide automated automated responses and do not constitute legal, medical, or financial advice.</li>
                  <li><strong className="text-slate-800 dark:text-slate-200">User Verification:</strong> While our RAG (Retrieval-Augmented Generation) knowledge engine minimizes errors, tenant administrators are responsible for reviewing automated responses and product catalog pricing configured in their sandbox.</li>
                </ul>
              </div>
            </div>

            {/* 3. THIRD-PARTY WHATSAPP API & META DISCLAIMER */}
            <div className="space-y-3 border-t border-slate-100 dark:border-slate-800 pt-6">
              <h2 className="text-xl font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-emerald-500"/> 3. Third-Party Meta API Integration Disclaimer
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                SellGrow connects with Meta Official WhatsApp Business API. SellGrow is an independent SaaS vendor and is not directly endorsed or sponsored by Meta Platforms Inc. Users must comply with Meta's Business Messaging Terms. Message delivery rates are subject to telecom network availability and Meta template approvals.
              </p>
            </div>

            {/* 4. REVENUE & EARNINGS DISCLAIMER */}
            <div className="space-y-3 border-t border-slate-100 dark:border-slate-800 pt-6">
              <h2 className="text-xl font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-500"/> 4. Earnings & Sales Performance Disclaimer
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Case studies, performance metrics (+45% win rate, 3.5x faster response time), and testimonials presented on SellGrow pages reflect results reported by specific users under individual business conditions. They do not guarantee that every business will achieve identical revenue growth.
              </p>
            </div>

            {/* 5. CONTACT */}
            <div className="space-y-3 border-t border-slate-100 dark:border-slate-800 pt-6">
              <h2 className="text-xl font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-sky-500"/> 5. Questions & Legal Inquiries
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                For questions regarding this Disclaimer or platform operational policies, contact <span className="text-primary font-mono font-bold">legal@sellgrow.io</span>.
              </p>
            </div>

          </div>

        </section>
      </main>

      <Footer />
    </div>);
}
