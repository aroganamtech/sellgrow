"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Bot, PhoneCall, PhoneOff, Calendar, Database, Globe, ArrowRight, ChevronRight, Volume2, Activity, BrainCircuit } from "lucide-react";
export default function AiAssistantPage() {
    // Interactive Voice Demo Simulator State
    const [callState, setCallState] = useState("idle");
    const [language, setLanguage] = useState("en");
    const [callDuration, setCallDuration] = useState(0);
    const [transcript, setTranscript] = useState([]);
    const sampleTranscripts = {
        en: [
            { speaker: "AI Receptionist", text: "Hello! Thank you for calling SellGrow. How can I assist your business today?" },
            { speaker: "Caller", text: "Hi, I would like to book a product demo for next Tuesday." },
            { speaker: "AI Receptionist", text: "Certainly! I have Tuesday at 2:00 PM available. Shall I confirm this into your calendar and sync with your CRM?" }
        ],
        hi: [
            { speaker: "AI Receptionist", text: "नमस्ते! सेलग्रो में कॉल करने के लिए धन्यवाद। आज मैं आपकी क्या सहायता कर सकता हूँ?" },
            { speaker: "Caller", text: "नमस्ते, मुझे मंगलवार के लिए डेमो बुक करना है।" },
            { speaker: "AI Receptionist", text: "बिल्कुल! मंगलवार दोपहर 2 बजे स्लॉट खाली है। क्या मैं आपकी मीटिंग कन्फर्म कर दूं?" }
        ],
        ar: [
            { speaker: "AI Receptionist", text: "مرحباً! شكراً لاتصالك بـ SellGrow. كيف يمكنني مساعدتك اليوم؟" },
            { speaker: "Caller", text: "أريد حجز موعد لعرض توضيحي يوم الثلاثاء القادم." },
            { speaker: "AI Receptionist", text: "بالتأكيد! لدينا موعد متاح يوم الثلاثاء الساعة 2 مساءً." }
        ],
        ta: [
            { speaker: "AI Receptionist", text: "வணக்கம்! SellGrow-வை தொடர்பு கொண்டதற்கு நன்றி. நான் உங்களுக்கு எவ்வாறு உதவட்டும்?" },
            { speaker: "Caller", text: "செவ்வாய்க்கிழமை அன்று டெமோ பதிவு செய்ய வேண்டும்." },
            { speaker: "AI Receptionist", text: "நிச்சயமாக! செவ்வாய்க்கிழமை மதியம் 2 மணிக்கு நேரம் காலியாக உள்ளது." }
        ]
    };
    const handleStartCall = () => {
        setCallState("calling");
        setTranscript([]);
        setTimeout(() => {
            setCallState("active");
            setCallDuration(0);
            setTranscript(sampleTranscripts[language]);
        }, 1500);
    };
    const handleEndCall = () => {
        setCallState("idle");
        setCallDuration(0);
    };
    useEffect(() => {
        let timer;
        if (callState === "active") {
            timer = setInterval(() => {
                setCallDuration((prev) => prev + 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [callState]);
    const formatDuration = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
    };
    return (<div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
      <main className="flex-grow pt-20 pb-20 relative z-10 overflow-x-hidden">
        {/* Background Glow */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-purple-500/10 dark:bg-purple-500/15 rounded-full blur-[140px] pointer-events-none -z-10"/>

        {/* HERO SECTION */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12 text-center space-y-6">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/30 shadow-sm">
            <Bot className="w-4 h-4"/>
            <span>AI Voice Receptionist & Agent</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-display max-w-4xl mx-auto leading-tight">
            24/7 Autonomous Real-Time Voice Agent & <span className="bg-gradient-to-r from-purple-500 via-indigo-600 to-sky-600 bg-clip-text text-transparent">AI Receptionist</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="text-base sm:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Empower your business with an AI receptionist that listens, speaks naturally, schedules calendar meetings, answers database queries, and tracks caller sentiment in real-time.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link href="/register" className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-purple-500 via-indigo-600 to-sky-600 text-white font-bold text-sm shadow-xl shadow-purple-500/20 hover:opacity-95 transition-all flex items-center gap-2">
              <span>Start Free 14-Day Trial</span>
              <ArrowRight className="w-4 h-4"/>
            </Link>

            <Link href="/pricing" className="px-6 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-bold text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-all flex items-center gap-2 shadow-sm">
              <span>Explore AI Voice Pricing</span>
              <ChevronRight className="w-4 h-4"/>
            </Link>
          </motion.div>

          {/* Languages supported pill */}
          <div className="pt-6 flex items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <Globe className="w-4 h-4 text-purple-500"/>
            <span>Multilingual Speech Engine: English, Hindi, Arabic, Tamil & 20+ Regional Dialects</span>
          </div>
        </section>

        {/* INTERACTIVE VOICE CALL SIMULATOR */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0b1220] border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${callState === "active" ? "bg-emerald-500 animate-ping" : "bg-amber-500"}`}/>
                  <h2 className="text-xl font-bold font-display text-slate-900 dark:text-white">
                    Interactive AI Voice Call Demo
                  </h2>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Test real-time VoIP voice conversation transcription and autonomous response.
                </p>
              </div>

              {/* Language Selector */}
              <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800">
                {["en", "hi", "ar", "ta"].map((lang) => (<button key={lang} onClick={() => setLanguage(lang)} className={`px-3 py-1 rounded-xl text-xs font-bold uppercase transition-all ${language === lang ? "bg-purple-500 text-white shadow-md" : "text-slate-500 hover:text-slate-800 dark:hover:text-white"}`}>
                    {lang === "en" ? "EN 🇺🇸" : lang === "hi" ? "HI 🇮🇳" : lang === "ar" ? "AR 🇦🇪" : "TA 🇮🇳"}
                  </button>))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Call Controls Widget */}
              <div className="lg:col-span-5 p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 text-white space-y-6 border border-slate-800 text-center shadow-xl">
                <div className="w-20 h-20 mx-auto rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center border border-purple-500/40 relative">
                  <Bot className="w-10 h-10"/>
                  {callState === "active" && (<div className="absolute inset-0 rounded-full border-2 border-purple-500 animate-ping"/>)}
                </div>

                <div>
                  <h3 className="text-base font-bold font-display">SellGrow Voice AI Receptionist</h3>
                  <p className="text-xs text-slate-400 font-mono mt-1">
                    {callState === "idle" && "Ready for Test Call"}
                    {callState === "calling" && "Initiating VoIP Connection..."}
                    {callState === "active" && `Call Active (${formatDuration(callDuration)})`}
                  </p>
                </div>

                {/* Animated Voice Waveform when active */}
                {callState === "active" && (<div className="flex items-center justify-center gap-1.5 h-8">
                    <span className="w-1.5 h-6 bg-purple-500 rounded-full animate-pulse"/>
                    <span className="w-1.5 h-8 bg-sky-400 rounded-full animate-bounce"/>
                    <span className="w-1.5 h-4 bg-emerald-400 rounded-full animate-pulse"/>
                    <span className="w-1.5 h-7 bg-indigo-500 rounded-full animate-bounce"/>
                    <span className="w-1.5 h-5 bg-purple-400 rounded-full animate-pulse"/>
                  </div>)}

                {/* Call Action Button */}
                <div>
                  {callState === "idle" ? (<button onClick={handleStartCall} className="px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-lg transition-all flex items-center gap-2 mx-auto">
                      <PhoneCall className="w-4 h-4"/>
                      <span>Start Voice Demo Call</span>
                    </button>) : (<button onClick={handleEndCall} className="px-6 py-3 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs shadow-lg transition-all flex items-center gap-2 mx-auto">
                      <PhoneOff className="w-4 h-4"/>
                      <span>End Call</span>
                    </button>)}
                </div>
              </div>

              {/* Real-time Call Transcript Log */}
              <div className="lg:col-span-7 p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 h-[340px] flex flex-col justify-between">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                  <span className="text-xs font-bold font-display text-slate-800 dark:text-slate-200 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-purple-500"/> Real-time Speech Transcription Log
                  </span>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400">
                    Sentiment: Highly Positive
                  </span>
                </div>

                <div className="flex-grow space-y-3 overflow-y-auto pr-1">
                  {transcript.length === 0 ? (<div className="text-center py-12 space-y-2 text-slate-400 text-xs font-medium">
                      <Volume2 className="w-8 h-8 text-slate-300 dark:text-slate-700 mx-auto"/>
                      <p>Click "Start Voice Demo Call" to listen & view live transcription.</p>
                    </div>) : (transcript.map((item, idx) => (<div key={idx} className={`p-3 rounded-xl border text-xs space-y-1 ${item.speaker === "AI Receptionist"
                ? "bg-purple-500/10 border-purple-500/30 text-purple-900 dark:text-purple-200"
                : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200"}`}>
                        <span className="font-bold font-mono text-[10px] block opacity-70">{item.speaker}</span>
                        <p className="leading-relaxed font-medium">{item.text}</p>
                      </div>)))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* VIDEO SHOWCASE SECTION */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0b1220] border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 dark:text-white">
                See Voice AI Receptionist in Action
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                Watch how SellGrow AI handles caller scheduling, checks inventory in real time, and logs details straight to CRM.
              </p>
            </div>

            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 bg-slate-900 aspect-video max-w-4xl mx-auto">
              <video src="/videos/Automated_VoIP_Receptionist_.mp4" autoPlay loop muted playsInline controls className="w-full h-full object-cover"/>
            </div>
          </div>
        </section>

        {/* CORE FEATURES GRID */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-200 dark:border-slate-800">
          <div className="text-center space-y-4 max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 dark:text-white">
              Enterprise Voice AI Capabilities
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-400">
              Built on sub-500ms real-time WebRTC audio architecture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-white dark:bg-[#0b1220] border border-slate-200 dark:border-slate-800 shadow-lg space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center border border-purple-500/20">
                <Calendar className="w-6 h-6"/>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">Autonomous Meeting Booking</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Connects directly to Google Calendar and Outlook to book sales appointments and send email invitations automatically.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-[#0b1220] border border-slate-200 dark:border-slate-800 shadow-lg space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center border border-indigo-500/20">
                <Database className="w-6 h-6"/>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">RAG Knowledge Base</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Upload PDFs, product brochures, and pricing tables so the AI answers callers accurately with zero hallucination.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-[#0b1220] border border-slate-200 dark:border-slate-800 shadow-lg space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-500 flex items-center justify-center border border-sky-500/20">
                <BrainCircuit className="w-6 h-6"/>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">Real-Time Sentiment Metrics</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Analyze caller tone, emotion, and satisfaction during the conversation to alert supervisors if escalation is needed.
              </p>
            </div>
          </div>
        </section>

        {/* CTA BANNER */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-purple-600 via-indigo-600 to-sky-700 text-white text-center space-y-6 shadow-2xl relative overflow-hidden">
            <div className="max-w-2xl mx-auto space-y-3 relative z-10">
              <h2 className="text-3xl sm:text-4xl font-black font-display tracking-tight">
                Never Miss a Business Phone Call Again
              </h2>
              <p className="text-sm sm:text-base text-purple-100 leading-relaxed">
                Deploy your automated AI Voice Receptionist in minutes.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-4 relative z-10">
              <Link href="/register" className="px-8 py-3.5 rounded-2xl bg-white text-slate-900 font-bold text-sm hover:bg-slate-100 transition-all shadow-lg">
                Start 14-Day Free Trial
              </Link>
              <Link href="/pricing" className="px-8 py-3.5 rounded-2xl bg-purple-500/20 border border-white/30 text-white font-bold text-sm hover:bg-purple-500/30 transition-all">
                View AI Voice Pricing
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>);
}
