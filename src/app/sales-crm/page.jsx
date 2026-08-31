"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { TrendingUp, Target, BarChart3, CheckCircle2, ArrowRight, BrainCircuit, Clock, ChevronRight } from "lucide-react";
export default function SalesCrmPage() {
    const { region } = useLanguage();
    // Interactive Lead Scoring Demo State
    const [leadEngagement, setLeadEngagement] = useState(75);
    const [emailOpened, setEmailOpened] = useState(true);
    const [websiteVisits, setWebsiteVisits] = useState(4);
    const [demoRequested, setDemoRequested] = useState(true);
    // Dynamic calculated score
    const calculatedScore = Math.min(99, Math.round((leadEngagement * 0.4) +
        (emailOpened ? 15 : 0) +
        (websiteVisits * 5) +
        (demoRequested ? 25 : 0)));
    const getScoreBadge = (score) => {
        if (score >= 80)
            return { label: "Hot Prospect", color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30" };
        if (score >= 50)
            return { label: "Warm Lead", color: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30" };
        return { label: "Cold Lead", color: "bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/30" };
    };
    const samplePipeline = [
        {
            stage: "New Leads",
            count: 24,
            amount: region === "in" ? "₹4,20,000" : "$5,200",
            color: "border-sky-500/40 bg-sky-500/5",
            leads: [
                { name: "Acme Corp", score: 88, value: region === "in" ? "₹1,50,000" : "$1,800", owner: "Sarah M." },
                { name: "Apex Global", score: 72, value: region === "in" ? "₹2,70,000" : "$3,400", owner: "Alex K." },
            ]
        },
        {
            stage: "Qualified Contact",
            count: 18,
            amount: region === "in" ? "₹7,80,000" : "$9,500",
            color: "border-indigo-500/40 bg-indigo-500/5",
            leads: [
                { name: "Nexus Systems", score: 94, value: region === "in" ? "₹4,00,000" : "$5,000", owner: "David L." },
                { name: "Horizon Retail", score: 81, value: region === "in" ? "₹3,80,000" : "$4,500", owner: "Sarah M." },
            ]
        },
        {
            stage: "Proposal Sent",
            count: 12,
            amount: region === "in" ? "₹12,50,000" : "$15,200",
            color: "border-purple-500/40 bg-purple-500/5",
            leads: [
                { name: "Starlight Tech", score: 96, value: region === "in" ? "₹7,50,000" : "$9,000", owner: "Alex K." },
                { name: "BlueSky Logistics", score: 89, value: region === "in" ? "₹5,00,000" : "$6,200", owner: "David L." },
            ]
        },
        {
            stage: "Closed Won",
            count: 35,
            amount: region === "in" ? "₹28,90,000" : "$34,800",
            color: "border-emerald-500/40 bg-emerald-500/5",
            leads: [
                { name: "Vanguard Media", score: 99, value: region === "in" ? "₹14,00,000" : "$16,500", owner: "Sarah M." },
                { name: "Pulse Financial", score: 97, value: region === "in" ? "₹14,90,000" : "$18,300", owner: "Alex K." },
            ]
        }
    ];
    return (<div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
      <Navbar />

      <main className="flex-grow pt-20 pb-20 relative z-10 overflow-x-hidden">
        {/* Background Glow */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-sky-500/10 dark:bg-sky-500/15 rounded-full blur-[140px] pointer-events-none -z-10"/>

        {/* HERO SECTION */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12 text-center space-y-6">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/30 shadow-sm">
            <TrendingUp className="w-4 h-4"/>
            <span>AI-Driven Sales CRM Engine</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-display max-w-4xl mx-auto leading-tight">
            Turn Every Prospect into a High-Value Customer with <span className="bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 bg-clip-text text-transparent">SellGrow CRM</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="text-base sm:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Say goodbye to lost leads and manual spreadsheet tracking. SellGrow CRM automatically captures leads, scores purchasing probability with AI, and guides your sales team to close deals faster.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link href="/register" className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 text-white font-bold text-sm shadow-xl shadow-sky-500/20 hover:opacity-95 transition-all flex items-center gap-2">
              <span>Start Free 14-Day Trial</span>
              <ArrowRight className="w-4 h-4"/>
            </Link>

            <Link href="/pricing" className="px-6 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-bold text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-all flex items-center gap-2 shadow-sm">
              <span>Explore CRM Pricing</span>
              <ChevronRight className="w-4 h-4"/>
            </Link>
          </motion.div>

          {/* Quick Metrics Bar */}
          <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 backdrop-blur-xl">
              <span className="text-2xl font-black text-sky-500 font-display block">+45%</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Deal Win Rate</span>
            </div>
            <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 backdrop-blur-xl">
              <span className="text-2xl font-black text-emerald-500 font-display block">3.5x</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Faster Lead Follow-up</span>
            </div>
            <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 backdrop-blur-xl">
              <span className="text-2xl font-black text-indigo-500 font-display block">60%</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Admin Hours Saved</span>
            </div>
            <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 backdrop-blur-xl">
              <span className="text-2xl font-black text-purple-500 font-display block">99.4%</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Data Sync Accuracy</span>
            </div>
          </div>
        </section>

        {/* INTERACTIVE PIPELINE PREVIEW */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0b1220] border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping"/>
                  <h2 className="text-xl font-bold font-display text-slate-900 dark:text-white">
                    Live Deal Pipeline Kanban
                  </h2>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Real-time pipeline tracking with automated AI probability scoring per lead.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300">
                  Total Active Value: {region === "in" ? "₹53,40,000" : "$64,700"}
                </span>
              </div>
            </div>

            {/* Pipeline Columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {samplePipeline.map((col, idx) => (<div key={idx} className={`p-4 rounded-2xl border ${col.color} space-y-3`}>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 font-display">
                      {col.stage}
                    </h3>
                    <span className="px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-[10px] font-mono font-bold">
                      {col.count}
                    </span>
                  </div>

                  <div className="text-xs font-bold text-slate-500 dark:text-slate-400">
                    Total: {col.amount}
                  </div>

                  <div className="space-y-2.5 pt-1">
                    {col.leads.map((lead, lIdx) => (<div key={lIdx} className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2 hover:border-sky-500/50 transition-all cursor-pointer">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-slate-900 dark:text-white">{lead.name}</span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                            {lead.score}% AI Score
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                          <span className="font-mono font-bold text-slate-700 dark:text-slate-300">{lead.value}</span>
                          <span>{lead.owner}</span>
                        </div>
                      </div>))}
                  </div>
                </div>))}
            </div>
          </div>
        </section>

        {/* AI LEAD SCORING SIMULATOR */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30">
                <BrainCircuit className="w-4 h-4"/>
                <span>Predictive Sales AI</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 dark:text-white leading-tight">
                AI Lead Intent Scoring Simulator
              </h2>

              <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                Our machine learning algorithms analyze prospect behavior, email engagement, website visits, and direct responses to automatically rank your hottest leads so your reps focus on high-yield opportunities.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5"/>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Real-time intent score calculation based on multi-channel touchpoints.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5"/>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Automated task assignment to sales reps when a lead score spikes above 80%.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5"/>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Historical deal closure forecasting with 92%+ predictive accuracy.
                  </span>
                </div>
              </div>
            </div>

            {/* Simulator Controls Widget */}
            <div className="lg:col-span-6">
              <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0b1220] border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                  <h3 className="text-base font-bold font-display text-slate-900 dark:text-white">
                    Test Lead Scoring Factors
                  </h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getScoreBadge(calculatedScore).color}`}>
                    {getScoreBadge(calculatedScore).label}
                  </span>
                </div>

                <div className="space-y-5">
                  {/* Slider: Engagement Level */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-slate-700 dark:text-slate-300 font-bold">Base Engagement Level</span>
                      <span className="text-sky-500 font-mono font-bold">{leadEngagement}%</span>
                    </div>
                    <input type="range" min="10" max="100" value={leadEngagement} onChange={(e) => setLeadEngagement(Number(e.target.value))} className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500"/>
                  </div>

                  {/* Toggle: Email Opened */}
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Opened Sales Proposal Email</span>
                    <button onClick={() => setEmailOpened(!emailOpened)} className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${emailOpened ? "bg-emerald-500 text-white" : "bg-slate-200 dark:bg-slate-800 text-slate-500"}`}>
                      {emailOpened ? "Yes (+15 pts)" : "No (+0 pts)"}
                    </button>
                  </div>

                  {/* Website Visits Counter */}
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Website Page Views</span>
                    <div className="flex items-center gap-2">
                      <button onClick={() => setWebsiteVisits(Math.max(1, websiteVisits - 1))} className="w-7 h-7 rounded-lg bg-slate-200 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300">
                        -
                      </button>
                      <span className="text-xs font-mono font-bold w-6 text-center">{websiteVisits}</span>
                      <button onClick={() => setWebsiteVisits(websiteVisits + 1)} className="w-7 h-7 rounded-lg bg-slate-200 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300">
                        +
                      </button>
                    </div>
                  </div>

                  {/* Toggle: Demo Requested */}
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Requested Product Demo</span>
                    <button onClick={() => setDemoRequested(!demoRequested)} className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${demoRequested ? "bg-indigo-500 text-white" : "bg-slate-200 dark:bg-slate-800 text-slate-500"}`}>
                      {demoRequested ? "Yes (+25 pts)" : "No (+0 pts)"}
                    </button>
                  </div>
                </div>

                {/* Score Output Result */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-sky-500/10 via-indigo-500/10 to-purple-500/10 border border-sky-500/30 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">Calculated AI Buying Intent</span>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Recommended Action: High Priority Follow-up</span>
                  </div>
                  <div className="text-3xl font-black text-sky-500 font-mono">
                    {calculatedScore}%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CORE FEATURES GRID */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-200 dark:border-slate-800">
          <div className="text-center space-y-4 max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 dark:text-white">
              Everything Your Sales Team Needs to Scale
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-400">
              Built for speed, collaboration, and seamless deal progression.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-white dark:bg-[#0b1220] border border-slate-200 dark:border-slate-800 shadow-lg space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-500 flex items-center justify-center border border-sky-500/20">
                <Target className="w-6 h-6"/>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">Automated Lead Capture</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Sync leads instantly from web forms, WhatsApp messages, landing pages, and email campaigns straight into your CRM.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-[#0b1220] border border-slate-200 dark:border-slate-800 shadow-lg space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center border border-indigo-500/20">
                <BarChart3 className="w-6 h-6"/>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">Sales Analytics & Forecasts</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Track revenue targets, sales velocity, individual rep metrics, and conversion rates with interactive visual dashboards.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-[#0b1220] border border-slate-200 dark:border-slate-800 shadow-lg space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center border border-purple-500/20">
                <Clock className="w-6 h-6"/>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">Activity Timelines & Notes</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Keep every call, meeting note, email thread, and WhatsApp update organized chronologically under customer profiles.
              </p>
            </div>
          </div>
        </section>

        {/* CTA BANNER */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-700 text-white text-center space-y-6 shadow-2xl relative overflow-hidden">
            <div className="max-w-2xl mx-auto space-y-3 relative z-10">
              <h2 className="text-3xl sm:text-4xl font-black font-display tracking-tight">
                Ready to Supercharge Your Sales Pipeline?
              </h2>
              <p className="text-sm sm:text-base text-sky-100 leading-relaxed">
                Join thousands of fast-growing businesses using SellGrow CRM to automate sales and close deals faster.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-4 relative z-10">
              <Link href="/register" className="px-8 py-3.5 rounded-2xl bg-white text-slate-900 font-bold text-sm hover:bg-slate-100 transition-all shadow-lg">
                Start 14-Day Free Trial
              </Link>
              <Link href="/pricing" className="px-8 py-3.5 rounded-2xl bg-sky-500/20 border border-white/30 text-white font-bold text-sm hover:bg-sky-500/30 transition-all">
                View Modular Pricing
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>);
}
