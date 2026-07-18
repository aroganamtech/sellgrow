"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  ShieldCheck,
  TrendingUp,
  MessageSquare,
  Volume2,
  Workflow,
  Database,
  Layers,
  ArrowRight,
  PhoneCall,
  PhoneOff,
  Sparkles,
  Play,
  Check,
  CheckCircle,
  FolderTree,
  Languages,
  Activity,
} from "lucide-react";

export default function HomePage() {
  const { t, language, dir } = useLanguage();
  const [activeTab, setActiveTab] = useState<"crm" | "inbox" | "voice" | "workflow">("crm");
  
  // Voice Simulation State
  const [callState, setCallState] = useState<"idle" | "ringing" | "active" | "ended">("idle");
  const [transcripts, setTranscripts] = useState<{ sender: "ai" | "user"; text: string }[]>([]);
  const [isAiSpeaking, setIsAiSpeaking] = useState(false);
  const audioRingRef = useRef<HTMLAudioElement | null>(null);

  // Chatbot State
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ sender: "ai" | "user"; text: string }[]>([
    { sender: "ai", text: "Hi there! I am the SellGrow AI. Ask me anything about our Operating System modules!" },
  ]);
  const [chatInput, setChatInput] = useState("");

  const speak = (text: string) => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      // Cancel ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Attempt to find a suitable voice matching the local language
      const voices = window.speechSynthesis.getVoices();
      let selectedVoice = voices.find(v => v.lang.startsWith(language));
      if (!selectedVoice && language === "ta") {
        selectedVoice = voices.find(v => v.name.includes("Tamil") || v.lang.includes("ta"));
      }
      if (!selectedVoice && language === "hi") {
        selectedVoice = voices.find(v => v.name.includes("Hindi") || v.lang.includes("hi"));
      }
      if (!selectedVoice && language === "ar") {
        selectedVoice = voices.find(v => v.name.includes("Arabic") || v.lang.includes("ar"));
      }
      
      if (selectedVoice) utterance.voice = selectedVoice;
      
      utterance.onstart = () => setIsAiSpeaking(true);
      utterance.onend = () => setIsAiSpeaking(false);
      utterance.onerror = () => setIsAiSpeaking(false);
      
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleStartCall = () => {
    setCallState("ringing");
    setTranscripts([]);
    // Simulate ring delay, then auto-accept or trigger ringing
    setTimeout(() => {
      // Auto accept for UX ease
      handleAcceptCall();
    }, 1500);
  };

  const handleAcceptCall = () => {
    setCallState("active");
    const welcome = t("heroSubtitle").split(".")[0] + ". " + "I am your automated AI business assistant. How can I help you?";
    setTranscripts([{ sender: "ai", text: welcome }]);
    speak(welcome);
  };

  const handleUserSpeech = (replyText: string, aiText: string) => {
    setTranscripts(prev => [
      ...prev,
      { sender: "user", text: replyText }
    ]);
    
    // Simulate AI processing delay
    setIsAiSpeaking(true);
    setTimeout(() => {
      setTranscripts(prev => [
        ...prev,
        { sender: "ai", text: aiText }
      ]);
      speak(aiText);
    }, 800);
  };

  const handleEndCall = () => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setCallState("ended");
    setIsAiSpeaking(false);
    setTimeout(() => setCallState("idle"), 2500);
  };

  const handleSendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput;
    setChatMessages(prev => [...prev, { sender: "user", text: userText }]);
    setChatInput("");

    // Simple keyword chatbot response matching SellGrow modules
    setTimeout(() => {
      let reply = "SellGrow is a unified Business Operating System. You can control leads, check chats from WhatsApp, customize workflows, and schedule AI voice calls in one place.";
      const lowerText = userText.toLowerCase();
      if (lowerText.includes("pricing") || lowerText.includes("cost")) {
        reply = "Pricing is modular! Choose monthly, quarterly, or yearly packages starting at $29/mo, enabling only the components you need (CRM, Voice, or Catalog).";
      } else if (lowerText.includes("crm") || lowerText.includes("sales")) {
        reply = "Our CRM automates sales pipelines, records client follow-ups, saves location GPS visit coordinates, and generates meeting notes.";
      } else if (lowerText.includes("voice") || lowerText.includes("call") || lowerText.includes("livekit")) {
        reply = "AI Voice utilizes LiveKit WebRTC for lightning-fast speech response, call records, translation, and auto receptionist scheduling.";
      } else if (lowerText.includes("whatsapp") || lowerText.includes("communication")) {
        reply = "Unified Inbox connects WhatsApp Business API, Facebook Messenger, Live Chat, and SMS. Includes custom automated replies.";
      } else if (lowerText.includes("workflow") || lowerText.includes("automate")) {
        reply = "The visual workflow builder connects webhooks, database actions, email reminders, and API routes with simple drag-drop configurations.";
      }
      setChatMessages(prev => [...prev, { sender: "ai", text: reply }]);
      speak(reply);
    }, 600);
  };

  // Pre-load voices on client
  useEffect(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.getVoices();
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-grow">
        
        {/* HERO SECTION */}
        <section className="relative overflow-hidden pt-20 pb-16 md:pt-28 md:pb-24">
          {/* Radial Light Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-indigo-500/10 via-purple-500/5 to-transparent blur-3xl pointer-events-none -z-10" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 border border-indigo-500/20 animate-pulse">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Version 3.0 Sandbox Release</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-display max-w-4xl mx-auto leading-tight">
              <span className="gradient-text">{t("heroTitle")}</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {t("heroSubtitle")}
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/dashboard"
                id="launch-sandbox-btn"
                className="px-8 py-3.5 text-base font-semibold text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl hover:opacity-95 shadow-xl shadow-indigo-500/20 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                {t("launchSandbox")}
              </Link>
              <button
                onClick={() => setChatOpen(true)}
                className="px-8 py-3.5 text-base font-semibold text-foreground glass-panel hover:bg-black/5 dark:hover:bg-white/5 rounded-xl border transition-all duration-200"
              >
                Explore Modules
              </button>
            </div>

            {/* Dashboard Mockup Preview */}
            <div className="relative max-w-5xl mx-auto pt-8">
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-border bg-white dark:bg-[#0c121e] aspect-[16/9] overflow-y-auto">
                <div className="h-10 bg-slate-100 dark:bg-slate-900 border-b border-border flex items-center px-4 gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-400" />
                    <span className="w-3 h-3 rounded-full bg-amber-400" />
                    <span className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="text-xs text-muted-foreground mx-auto font-mono bg-white dark:bg-black/20 px-4 py-1 rounded-md border border-border border-opacity-50">
                    https://app.sellgrow.io/dashboard
                  </div>
                </div>
                {/* Simulator Interface */}
                <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100%-40px)]">
                  {/* Quick features select */}
                  <div className="space-y-3 col-span-1 border-r border-border border-opacity-50 pr-4">
                    <h3 className="text-xs font-bold text-muted uppercase tracking-wider mb-2">Operating System Modules</h3>
                    {[
                      { id: "crm", icon: TrendingUp, title: t("crm"), desc: "Pipelines, visit logging, target tracking" },
                      { id: "inbox", icon: MessageSquare, title: t("inbox"), desc: "WhatsApp, Meta chats, Web Live chat" },
                      { id: "voice", icon: Volume2, title: t("voice"), desc: "LiveKit VoIP, speech transcription, metrics" },
                      { id: "workflow", icon: Workflow, title: t("workflow"), desc: "Visual automation blocks" }
                    ].map((tab) => {
                      const Icon = tab.icon;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id as any)}
                          className={`w-full text-left p-3 rounded-xl border transition-all flex items-start gap-3 ${
                            activeTab === tab.id
                              ? "border-indigo-500 bg-indigo-500/5 text-foreground"
                              : "border-transparent text-muted-foreground hover:bg-black/5 dark:hover:bg-white/5"
                          }`}
                        >
                          <Icon className={`w-5 h-5 mt-0.5 ${activeTab === tab.id ? "text-indigo-500" : "text-muted"}`} />
                          <div>
                            <p className="text-sm font-semibold">{tab.title}</p>
                            <p className="text-xs text-muted-foreground leading-tight mt-0.5">{tab.desc}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Feature preview visualization */}
                  <div className="col-span-2 flex flex-col justify-between h-full min-h-[250px] bg-slate-50 dark:bg-black/10 p-4 rounded-xl border border-border">
                    {activeTab === "crm" && (
                      <div className="space-y-4">
                        <div className="flex justify-between items-center border-b border-border pb-2">
                          <span className="text-sm font-bold flex items-center gap-1.5"><TrendingUp className="w-4 h-4 text-indigo-500" /> Sales Funnel & Pipeline</span>
                          <span className="text-xs bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded-full font-semibold">Active Mode</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { title: "Incoming Leads", value: "$45,200", count: "12 Leads", color: "border-blue-500" },
                            { title: "Meeting Booked", value: "$18,500", count: "4 Meetings", color: "border-purple-500" },
                            { title: "Proposal Sent", value: "$95,000", count: "8 Offers", color: "border-pink-500" }
                          ].map((col, idx) => (
                            <div key={idx} className={`p-3 rounded-lg bg-card border-l-4 ${col.color} border shadow-sm`}>
                              <p className="text-xs text-muted-foreground">{col.title}</p>
                              <p className="text-sm font-bold mt-1">{col.value}</p>
                              <p className="text-[10px] text-muted-foreground mt-0.5">{col.count}</p>
                            </div>
                          ))}
                        </div>
                        {/* Visit log coordinate summary */}
                        <div className="p-3 rounded-lg border border-dashed border-border bg-card text-left space-y-1">
                          <p className="text-xs font-semibold flex items-center gap-1"><Activity className="w-3.5 h-3.5 text-emerald-500" /> Lead Probability & Target Insights</p>
                          <p className="text-[11px] text-muted-foreground">Lead: Acme Corp | Probability: <strong className="text-emerald-500">89%</strong> | AI Meeting Summary: client interested in LiveKit VoIP and WhatsApp CRM integrations.</p>
                        </div>
                      </div>
                    )}

                    {activeTab === "inbox" && (
                      <div className="space-y-4 text-left">
                        <div className="flex justify-between items-center border-b border-border pb-2">
                          <span className="text-sm font-bold flex items-center gap-1.5"><MessageSquare className="w-4 h-4 text-indigo-500" /> Unified Inbox Simulator</span>
                          <span className="text-xs bg-indigo-500/10 text-indigo-500 px-2 py-0.5 rounded-full font-semibold">WhatsApp Business API</span>
                        </div>
                        <div className="space-y-2 max-h-[140px] overflow-y-auto">
                          <div className="bg-slate-200 dark:bg-slate-800 p-2.5 rounded-lg max-w-[80%] text-xs">
                            Hi, I want to integrate SellGrow catalog with my Shopify inventory. Can you help?
                          </div>
                          <div className="bg-indigo-600 text-white p-2.5 rounded-lg max-w-[80%] ml-auto text-xs">
                            Sure! SellGrow syncs orders, commissioning, and tracking in real-time. Here is our setup guide.
                          </div>
                        </div>
                        <div className="bg-emerald-500/10 p-2 rounded-lg text-xs text-emerald-600 dark:text-emerald-300 flex items-center gap-1.5">
                          <Sparkles className="w-4 h-4 shrink-0" />
                          <span>AI Suggestion: &quot;Yes, we support automatic sync with standard APIs.&quot;</span>
                        </div>
                      </div>
                    )}

                    {activeTab === "voice" && (
                      <div className="space-y-4">
                        <div className="flex justify-between items-center border-b border-border pb-2">
                          <span className="text-sm font-bold flex items-center gap-1.5"><Volume2 className="w-4 h-4 text-indigo-500" /> LiveKit Speech Agent</span>
                          <span className="text-xs bg-red-500/10 text-red-500 px-2 py-0.5 rounded-full font-semibold">WebRTC Connected</span>
                        </div>
                        <div className="flex items-center justify-center gap-1 h-14">
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
                            <span
                              key={i}
                              className="w-1.5 bg-indigo-500 rounded-full animation-pulse-slow"
                              style={{
                                height: `${Math.sin(i) * 20 + 30}px`,
                                animationDelay: `${i * 0.1}s`,
                              }}
                            />
                          ))}
                        </div>
                        <div className="text-xs bg-card p-2 rounded-md border border-border font-mono text-muted-foreground text-center">
                          Speech VAD Active | Latency: 120ms | Voice: Outfit AI
                        </div>
                      </div>
                    )}

                    {activeTab === "workflow" && (
                      <div className="space-y-4">
                        <div className="flex justify-between items-center border-b border-border pb-2">
                          <span className="text-sm font-bold flex items-center gap-1.5"><Workflow className="w-4 h-4 text-indigo-500" /> Automation Nodes</span>
                          <span className="text-xs bg-blue-500/10 text-blue-500 px-2 py-0.5 rounded-full font-semibold">Live Builder</span>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                          <div className="px-3 py-1.5 bg-card border rounded-lg text-xs font-mono">Incoming WhatsApp Lead</div>
                          <span className="text-muted-foreground font-mono">→</span>
                          <div className="px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/30 text-indigo-500 rounded-lg text-xs font-mono">AI RAG Reply (3s Delay)</div>
                          <span className="text-muted-foreground font-mono">→</span>
                          <div className="px-3 py-1.5 bg-card border rounded-lg text-xs font-mono">Create CRM Ticket</div>
                        </div>
                        <p className="text-[10px] text-muted-foreground text-center">Visual Builder saves workflow as JSON API instructions.</p>
                      </div>
                    )}

                    <div className="mt-4 pt-2 border-t border-border flex justify-end">
                      <Link href="/dashboard" className="text-xs font-semibold text-indigo-500 hover:text-indigo-600 flex items-center gap-1">
                        Go to Control Panel <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* VOICE CALL EXPERIENCE AREA */}
        <section id="demo" className="py-16 border-t border-border bg-slate-50/50 dark:bg-black/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 border border-emerald-500/20">
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Interactive VoIP Demonstration</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display text-foreground">
                  Experience our LiveKit AI Voice Assistant Right Now
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  SellGrow integrates LiveKit-powered real-time voice intelligence. Standard businesses can set up automated voice receptionists to book appointments, route calls, and record notes.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    <span>Real-time Speech-to-Text transcription.</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    <span>Dynamic Web Speech API voice rendering.</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    <span>Zero latency AI dialog simulator.</span>
                  </div>
                </div>
              </div>

              {/* Call console device */}
              <div className="rounded-2xl border border-border p-6 bg-white dark:bg-[#0c121e] shadow-xl space-y-6 text-center max-w-md mx-auto w-full">
                <div className="flex justify-between items-center border-b border-border pb-3">
                  <span className="text-sm font-bold flex items-center gap-2"><PhoneCall className="w-4 h-4 text-emerald-500" /> AI Receptionist Core</span>
                  <span className="text-xs bg-slate-100 dark:bg-slate-800 text-muted px-2 py-0.5 rounded">Active Line</span>
                </div>

                {callState === "idle" && (
                  <div className="py-10 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-indigo-500/10 flex items-center justify-center mx-auto text-indigo-500">
                      <PhoneCall className="w-8 h-8" />
                    </div>
                    <p className="text-sm text-muted-foreground">Click the button below to initiate an incoming voice call simulation directly in your browser.</p>
                    <button
                      onClick={handleStartCall}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold text-sm shadow-md transition-all"
                    >
                      {t("simulateCall")}
                    </button>
                  </div>
                )}

                {callState === "ringing" && (
                  <div className="py-10 space-y-4 animate-bounce">
                    <div className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center mx-auto text-white">
                      <PhoneCall className="w-8 h-8" />
                    </div>
                    <p className="text-sm font-bold text-emerald-500">Ringing... Connecting AI Agent</p>
                    <button
                      onClick={handleAcceptCall}
                      className="px-6 py-2.5 bg-emerald-500 text-white rounded-xl font-semibold text-sm shadow-md"
                    >
                      Accept Call
                    </button>
                  </div>
                )}

                {callState === "active" && (
                  <div className="py-6 space-y-6 text-left">
                    {/* Speech wave */}
                    <div className="flex items-center justify-center gap-1.5 h-8">
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                        <span
                          key={i}
                          className="sound-bar"
                          style={{
                            animationPlayState: isAiSpeaking ? "running" : "paused",
                            height: isAiSpeaking ? "100%" : "20%",
                          }}
                        />
                      ))}
                    </div>

                    {/* Transcript log */}
                    <div className="bg-slate-50 dark:bg-black/20 p-4 rounded-xl border border-border min-h-[140px] max-h-[180px] overflow-y-auto space-y-2 text-xs">
                      <p className="font-semibold text-[10px] text-muted uppercase tracking-wider mb-2">{t("callTranscript")}</p>
                      {transcripts.map((t, idx) => (
                        <div key={idx} className={`p-2 rounded-lg ${t.sender === "ai" ? "bg-indigo-500/10 text-foreground" : "bg-emerald-500/10 text-foreground"}`}>
                          <strong className="text-[10px] block uppercase text-muted-foreground">{t.sender === "ai" ? "AI Agent" : "You"}</strong>
                          <p className="mt-0.5 leading-relaxed">{t.text}</p>
                        </div>
                      ))}
                    </div>

                    {/* Dialog options */}
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-muted-foreground">Choose your response:</p>
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => handleUserSpeech("Tell me about the CRM module.", "Our Sales CRM automates pipelines, maps coordinates, and generates meetings summary.")}
                          className="w-full text-left px-3 py-2 text-xs border rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-all font-medium"
                        >
                          &quot;Tell me about the CRM module.&quot;
                        </button>
                        <button
                          onClick={() => handleUserSpeech("How does the Voice Agent work?", "It runs on LiveKit WebRTC. It connects to SIP providers, records and transcribes calls.")}
                          className="w-full text-left px-3 py-2 text-xs border rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-all font-medium"
                        >
                          &quot;How does the Voice Agent work?&quot;
                        </button>
                        <button
                          onClick={() => handleUserSpeech("Is it multi-lingual?", "Yes, SellGrow translates to English, Hindi, Arabic, and Tamil dynamically.")}
                          className="w-full text-left px-3 py-2 text-xs border rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-all font-medium"
                        >
                          &quot;Is it multi-lingual?&quot;
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={handleEndCall}
                      className="w-full flex items-center justify-center gap-2 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-semibold transition-all"
                    >
                      <PhoneOff className="w-4 h-4" />
                      {t("endCall")}
                    </button>
                  </div>
                )}

                {callState === "ended" && (
                  <div className="py-10 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto text-red-500">
                      <PhoneOff className="w-8 h-8" />
                    </div>
                    <p className="text-sm font-bold text-red-500">Call Terminated</p>
                    <div className="text-xs bg-slate-50 dark:bg-black/20 p-3 rounded-lg border border-border border-dashed text-left space-y-1">
                      <p className="font-semibold text-[10px] text-muted uppercase">AI Meeting Note Generated:</p>
                      <p className="text-muted-foreground text-[10px]">Caller inquired about CRM, Voice capability, and Multi-language support. Status: Qualified Lead.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* CORE PLATFORM FEATURES */}
        <section id="features" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display text-foreground">
              Everything Needed to Scale Digital Operations
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Instead of paying for 10 separate softwares, SellGrow integrates all core business services into one single secure cloud tenant.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: ShieldCheck,
                title: "Business Website & Catalog",
                desc: "Generate mobile-responsive landing pages, multi-variant catalogue products, and download brochures instantly.",
              },
              {
                icon: TrendingUp,
                title: "AI CRM & GPS Logs",
                desc: "Record real-time field executive coordinate check-ins, sales goals, targets, and automatic meeting transcriptions.",
              },
              {
                icon: MessageSquare,
                title: "Unified Omnichannel Inbox",
                desc: "Respond to chats from WhatsApp Business API, Instagram, FB Messenger, Telegram, and Live Chat from a single page.",
              },
              {
                icon: Volume2,
                title: "AI LiveKit Voice Agents",
                desc: "Run voice recognition receptionists using WebRTC, transcription, voice activity detection, and automatic summaries.",
              },
              {
                icon: Workflow,
                title: "AI Workflows Automation",
                desc: "Create complex event-driven automation chains (IF/ELSE, delay nodes, webhook posts, calendar updates) visually.",
              },
              {
                icon: Database,
                title: "RAG Vector Knowledge Base",
                desc: "Upload PDFs, Word docs, spreadsheets, policy terms, and let SellGrow semantic search feed answers to chatbot interfaces.",
              },
            ].map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div key={idx} className="p-6 rounded-2xl border border-border bg-card glass-card text-left space-y-4 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground font-display">{feat.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feat.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* PRICING SECTION */}
        <section id="pricing" className="py-16 border-t border-border bg-slate-50/50 dark:bg-black/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="space-y-4 mb-12">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display text-foreground">
                Flexible Module-Based Subscription
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                No complex contracts. Choose the scale that fits your enterprise and select only the modules you need.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  title: "Starter Pack",
                  price: "$29",
                  desc: "Ideal for retail shops & local businesses",
                  features: ["Website & Catalog Builder", "Email & SMS Marketing", "Unified Inbox (1 Channel)", "Single Executive Sales CRM", "Basic RAG FAQ Search"],
                  cta: "Launch Sandbox",
                },
                {
                  title: "Professional",
                  price: "$79",
                  desc: "Perfect for manufacturers, dealers & clinics",
                  features: ["Unlimited Catalog Variants", "Omnichannel (All Channels)", "Visual Workflow Builder", "AI Product Assistant Widget", "AI Voice Receptionist (100 mins)", "GPS Visit Log Tracking"],
                  cta: "Launch Sandbox",
                  featured: true,
                },
                {
                  title: "Enterprise Ecosystem",
                  price: "Custom",
                  desc: "For FMCG, Automobiles & Hospitals",
                  features: ["Multi-Tenant Sub-Accounts", "SIP voice integration support", "Dedicated LiveKit media rooms", "Custom API Webhooks & DB access", "SLA Helpdesk Ticket routing", "Dedicated RAG Vector Database"],
                  cta: "Contact Support",
                },
              ].map((tier, idx) => (
                <div
                  key={idx}
                  className={`p-8 rounded-2xl border text-left flex flex-col justify-between relative ${
                    tier.featured
                      ? "border-indigo-500 bg-white dark:bg-[#0c1220] glow-indigo shadow-lg scale-105 z-10"
                      : "border-border bg-card"
                  }`}
                >
                  {tier.featured && (
                    <span className="absolute top-0 right-6 -translate-y-1/2 px-3 py-1 bg-indigo-500 text-white text-[10px] font-bold uppercase rounded-full tracking-wider">
                      Recommended
                    </span>
                  )}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-bold text-foreground font-display">{tier.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{tier.desc}</p>
                    </div>

                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-extrabold tracking-tight font-display">{tier.price}</span>
                      {tier.price !== "Custom" && <span className="text-sm text-muted-foreground">/mo</span>}
                    </div>

                    <hr className="border-border" />

                    <ul className="space-y-3">
                      {tier.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2.5 text-xs text-muted-foreground leading-normal">
                          <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8">
                    {tier.cta === "Launch Sandbox" ? (
                      <Link
                        href="/dashboard"
                        className={`w-full inline-flex items-center justify-center py-2.5 rounded-xl text-sm font-semibold text-center transition-all ${
                          tier.featured
                            ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md"
                            : "bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400"
                        }`}
                      >
                        {tier.cta}
                      </Link>
                    ) : (
                      <Link
                        href="/contact"
                        className="w-full inline-flex items-center justify-center py-2.5 rounded-xl text-sm font-semibold text-center border border-border hover:bg-black/5 dark:hover:bg-white/5 text-foreground"
                      >
                        {tier.cta}
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* FLOATING CHATBOT WIDGET */}
      <div className="fixed bottom-6 right-6 z-40">
        {!chatOpen ? (
          <button
            onClick={() => setChatOpen(true)}
            className="w-14 h-14 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30 hover:scale-105 active:scale-95 transition-all"
            aria-label="Open Chatbot"
          >
            <MessageSquare className="w-6 h-6" />
          </button>
        ) : (
          <div className="w-80 sm:w-96 rounded-2xl border border-border bg-white dark:bg-[#0d1322] shadow-2xl overflow-hidden flex flex-col justify-between max-h-[480px]">
            {/* Chat header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 text-white flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 animate-pulse" />
                <div>
                  <h4 className="text-sm font-bold leading-tight">SellGrow AI Assistant</h4>
                  <p className="text-[10px] text-white/80">Active in {language.toUpperCase()}</p>
                </div>
              </div>
              <button
                onClick={() => setChatOpen(false)}
                className="text-white/80 hover:text-white text-xs font-semibold"
              >
                Close
              </button>
            </div>

            {/* Chat Messages */}
            <div className="p-4 space-y-3 overflow-y-auto flex-grow h-72 text-xs">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`p-2.5 rounded-xl max-w-[85%] ${
                  msg.sender === "ai"
                    ? "bg-slate-100 dark:bg-slate-800 text-foreground"
                    : "bg-indigo-600 text-white ml-auto"
                }`}>
                  <p className="leading-relaxed">{msg.text}</p>
                </div>
              ))}
            </div>

            {/* Chat input */}
            <form onSubmit={handleSendChatMessage} className="p-3 border-t border-border bg-slate-50 dark:bg-black/10 flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder={t("chatbotHelp")}
                className="flex-grow pl-3 pr-2 py-1.5 text-xs rounded-lg border border-border glass-input"
              />
              <button
                type="submit"
                className="px-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold"
              >
                Send
              </button>
            </form>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
