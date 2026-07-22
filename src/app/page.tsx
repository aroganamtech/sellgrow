"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SolutionsShowcase from "@/components/sections/SolutionsShowcase";
import OnboardingModal from "@/components/modals/OnboardingModal";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
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
  Video,
  X,
} from "lucide-react";

const heroContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    }
  }
};

const heroItemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const heroMockupVariants = {
  hidden: { opacity: 0, scale: 0.96, y: 35 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

const cardContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    }
  }
};

const cardItemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

export default function HomePage() {
  const { t, language, dir, region } = useLanguage();
  const [pageLoading, setPageLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"crm" | "inbox" | "voice" | "workflow">("crm");
  const [activeVideo, setActiveVideo] = useState<{ title: string; desc: string; videoUrl: string; tag: string } | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);
  
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
      } else if (lowerText.includes("voice") || lowerText.includes("call")) {
        reply = "AI Voice uses real-time WebRTC for lightning-fast speech response, call records, translation, and auto receptionist scheduling.";
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
    <div className="relative min-h-screen flex flex-col">
      <OnboardingModal />
      {/* Loading Splash Screen Overlay */}
      <div 
        className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-50 dark:bg-[#070b13] space-y-8 select-none transition-all duration-500 ${
          pageLoading ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="relative flex items-center justify-center">
          {/* Glow backdrop */}
          <div className="absolute w-40 h-40 bg-primary/20 rounded-full blur-2xl animate-pulse" />
          
          {/* Spinning Gradient Ring */}
          <div className="w-28 h-28 rounded-full border-2 border-transparent border-t-primary border-r-secondary border-b-accent-brand animate-spin duration-1000" />
          
          {/* Central Logo Image */}
          <div className="absolute w-20 h-20 flex items-center justify-center animate-pulse duration-2000">
            <img
              src="/logos/loading-logo.png"
              alt="SellGrow Loading..."
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        
        {/* Loading copy */}
        <div className="text-center space-y-2">
          <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground animate-pulse">
            {t("connectingSellgrow")}
          </p>
          <div className="w-32 h-1 bg-slate-200 dark:bg-slate-800 rounded-full mx-auto overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full animate-progress" />
          </div>
        </div>
      </div>

      <Navbar />

      {/* Main Content Area */}
      <main className="flex-grow">
        
        {/* HERO SECTION */}
        <section className="relative overflow-hidden pt-8 pb-4 md:pt-10 md:pb-6">
          {/* Radial Light Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-primary/10 via-secondary/5 to-transparent blur-3xl pointer-events-none -z-10" />

          <motion.div
            variants={heroContainerVariants}
            initial="hidden"
            animate={pageLoading ? "hidden" : "visible"}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6"
          >
            <motion.div variants={heroItemVariants} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 animate-pulse">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t("heroBadge")}</span>
            </motion.div>

            <motion.h1 variants={heroItemVariants} className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-display max-w-4xl mx-auto leading-tight">
              <span className="gradient-text">{t("heroTitle")}</span>
            </motion.h1>

            <motion.p variants={heroItemVariants} className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t("heroSubtitle")}
            </motion.p>
          </motion.div>
        </section>

        {/* SOLUTIONS SHOWCASE (TABBED INTERACTIVE AGENTS) */}
        <SolutionsShowcase />

        {/* CORE PLATFORM FEATURES */}
        <section id="features" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4 mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display text-foreground">
              {t("featuresTitle")}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("featuresSubtitle")}
            </p>
          </motion.div>

          <motion.div
            variants={cardContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              {
                icon: ShieldCheck,
                title: t("feat1Title"),
                desc: t("feat1Desc"),
                videoUrl: "/videos/SEO_Optimized_Enterprise_Landi.mp4",
                tag: "Website & Catalog Demo",
              },
              {
                icon: TrendingUp,
                title: t("feat2Title"),
                desc: t("feat2Desc"),
                videoUrl: "/videos/intro.mp4",
                tag: "AI CRM & GPS Logs Demo",
              },
              {
                icon: MessageSquare,
                title: t("feat3Title"),
                desc: t("feat3Desc"),
                videoUrl: "/videos/Official_API_Chat_Broadcast.mp4",
                tag: "Omnichannel Inbox Demo",
              },
              {
                icon: Volume2,
                title: t("feat4Title"),
                desc: t("feat4Desc"),
                videoUrl: "/videos/Automated_VoIP_Receptionist_.mp4",
                tag: "AI Voice Agent Demo",
              },
              {
                icon: Workflow,
                title: t("feat5Title"),
                desc: t("feat5Desc"),
                videoUrl: "/videos/Branded_Android_iOS_Mobile_E.mp4",
                tag: "Workflows Automation Demo",
              },
              {
                icon: Database,
                title: t("feat6Title"),
                desc: t("feat6Desc"),
                videoUrl: "/videos/intro.mp4",
                tag: "Vector RAG Knowledge Base Demo",
              },
            ].map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <motion.div
                  key={idx}
                  variants={cardItemVariants}
                  onClick={() => setActiveVideo(feat)}
                  className="relative rounded-2xl border border-border/80 bg-slate-950 overflow-hidden shadow-lg hover:shadow-2xl hover:border-primary/80 transition-all duration-500 cursor-pointer min-h-[260px] group flex flex-col justify-between"
                >
                  {/* Clear Video Background (Default: Fully Visible) */}
                  <div className="absolute inset-0 z-0 overflow-hidden">
                    <video
                      src={feat.videoUrl}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-40"
                    />
                    {/* Top gradient mask to ensure top title is crystal clear */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/40 group-hover:opacity-0 transition-opacity duration-500" />
                  </div>

                  {/* Top Title Bar (Shown by default on top of video) */}
                  <div className="relative z-10 p-4 flex items-center justify-start transition-opacity duration-500 group-hover:opacity-0">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/20 text-white shadow-md">
                      <div className="w-5 h-5 rounded-lg bg-primary/30 flex items-center justify-center text-primary">
                        <Icon className="w-3.5 h-3.5 text-primary-foreground" />
                      </div>
                      <span className="text-xs font-bold font-display tracking-wide">{feat.title}</span>
                    </div>
                  </div>

                  {/* Hover Content Overlay (Reveals on mouse cursor hover) */}
                  <div className="absolute inset-0 z-20 p-6 flex flex-col justify-between bg-slate-950/90 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0 border border-primary/30 rounded-2xl">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary border border-primary/30 shadow-md">
                          <Icon className="w-5 h-5" />
                        </div>
                        <h3 className="text-base font-bold text-white font-display">{feat.title}</h3>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed pt-1">
                        {feat.desc}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-primary font-semibold">
                      <span className="flex items-center gap-1.5">
                        <Play className="w-3.5 h-3.5 fill-current" /> Watch Video with Audio
                      </span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </section>
      </main>

      {/* SAMPLE VIDEO PLAYER MODAL */}
      {activeVideo && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-4xl bg-white dark:bg-[#0c101d] border border-border rounded-3xl shadow-2xl overflow-hidden flex flex-col space-y-4 p-6 sm:p-8 animate-scaleUp">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-border/60 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <Video className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground font-display">{activeVideo.title}</h3>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-semibold border border-primary/20">
                    {activeVideo.tag}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setActiveVideo(null)}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-muted-foreground hover:text-foreground hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                aria-label="Close Video Modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player */}
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black border border-border/80 shadow-inner group">
              <video
                src={activeVideo.videoUrl}
                controls
                autoPlay
                playsInline
                className="w-full h-full object-contain"
              />
            </div>

            {/* Modal Footer / Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <p className="text-xs text-muted-foreground text-center sm:text-left max-w-lg">
                {activeVideo.desc}
              </p>
              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() => setActiveVideo(null)}
                  className="px-4 py-2 text-xs font-semibold rounded-xl border border-border text-muted-foreground hover:text-foreground hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                >
                  Close
                </button>
                <Link
                  href="/register"
                  className="px-4 py-2 text-xs font-semibold rounded-xl bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 shadow-md transition-all flex items-center gap-1.5"
                >
                  <span>Get Started Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FLOATING CHATBOT WIDGET */}
      <div className="fixed bottom-6 right-6 z-40">
        {!chatOpen ? (
          <button
            onClick={() => setChatOpen(true)}
            className="w-14 h-14 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white shadow-lg shadow-primary/30 hover:scale-105 active:scale-95 transition-all"
            aria-label="Open Chatbot"
          >
            <MessageSquare className="w-6 h-6" />
          </button>
        ) : (
          <div className="w-80 sm:w-96 rounded-2xl border border-border bg-white dark:bg-[#0d1322] shadow-2xl overflow-hidden flex flex-col justify-between max-h-[480px]">
            {/* Chat header */}
            <div className="bg-gradient-to-r from-primary to-secondary p-4 text-white flex justify-between items-center">
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
                    : "bg-primary text-white ml-auto"
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
                className="px-3 bg-primary hover:opacity-90 text-white rounded-lg text-xs font-semibold"
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
