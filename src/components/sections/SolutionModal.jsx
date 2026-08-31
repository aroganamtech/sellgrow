"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, CheckCircle2, Volume2, Mic, PhoneCall, PhoneOff, Smartphone, Calendar, Zap, Activity, Cpu, ShieldCheck, ArrowRight, Send, BarChart3, Bot, Code2, VolumeX } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
export default function SolutionModal({ isOpen, onClose, solution, onBookDemo, }) {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState("demo");
    // Voice simulator state
    const [isCalling, setIsCalling] = useState(false);
    const [callDuration, setCallDuration] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const [voiceLang, setVoiceLang] = useState("ta");
    const [customInput, setCustomInput] = useState("");
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [transcript, setTranscript] = useState([]);
    // WhatsApp simulator state
    const [chatMessages, setChatMessages] = useState([
        { sender: "ai", text: "Hello! Welcome to SellGrow. How can I assist your business today?" },
    ]);
    const [inputMsg, setInputMsg] = useState("");
    // App simulator tab state
    const [appTab, setAppTab] = useState("home");
    // TTS Helper using Web Speech API
    const speakText = (text, lang) => {
        if (typeof window !== "undefined" && "speechSynthesis" in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            const langCodes = {
                en: "en-US",
                ta: "ta-IN",
                hi: "hi-IN",
                ar: "ar-SA",
            };
            utterance.lang = langCodes[lang] || "en-US";
            utterance.rate = 0.95;
            utterance.onstart = () => setIsSpeaking(true);
            utterance.onend = () => setIsSpeaking(false);
            utterance.onerror = () => setIsSpeaking(false);
            window.speechSynthesis.speak(utterance);
        }
    };
    // Reset simulator on modal open
    useEffect(() => {
        if (isOpen) {
            setActiveTab("demo");
            setIsCalling(false);
            setCallDuration(0);
            setIsSpeaking(false);
            setIsListening(false);
            setCustomInput("");
            const defaultInitialText = {
                ta: "வணக்கம்! SellGrow AI குரல் உதவிமையத்திற்கு நல்வரவு. உங்களுக்கு நான் எவ்வாறு உதவ வேண்டும்?",
                en: "Hello! Thank you for calling SellGrow AI Assistant. How can I assist your business today?",
                hi: "नमस्ते! सेलग्रो एआई वॉयस असिस्टेंट में आपका स्वागत है। मैं आपकी क्या सहायता कर सकता हूँ?",
                ar: "مرحباً بكم في مساعد الصوت الذكي من SellGrow. كيف يمكنني مساعدتك اليوم؟",
            };
            setTranscript([
                { sender: "ai", text: defaultInitialText[voiceLang], time: "00:01" },
            ]);
            setChatMessages([
                { sender: "ai", text: "Hello! Welcome to SellGrow WhatsApp Assistant. How can I help you today?" },
            ]);
        }
        else {
            if (typeof window !== "undefined" && "speechSynthesis" in window) {
                window.speechSynthesis.cancel();
            }
        }
    }, [isOpen, solution, voiceLang]);
    // Voice call timer
    useEffect(() => {
        let timer;
        if (isCalling) {
            timer = setInterval(() => {
                setCallDuration((prev) => prev + 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isCalling]);
    if (!isOpen || !solution)
        return null;
    const Icon = solution.icon;
    const startVoiceCall = () => {
        setIsCalling(true);
        setCallDuration(0);
        const greetingText = {
            ta: "வணக்கம்! SellGrow AI குரல் உதவிமையம் இணைக்கப்பட்டது. நீங்கள் பேசலாம்!",
            en: "Connecting WebRTC Voice Stream... Hello! I am your AI Voice Receptionist. Please speak to test me!",
            hi: "सेलग्रो एआई वॉयस असिस्टेंट कनेक्ट हो गया है। कृपया बोलकर टेस्ट करें!",
            ar: "تم الاتصال بالمساعد الذكي الصوتي. يرجى التحدث للتجربة!",
        };
        const text = greetingText[voiceLang];
        setTranscript([{ sender: "ai", text, time: "00:01" }]);
        speakText(text, voiceLang);
    };
    const endVoiceCall = () => {
        setIsCalling(false);
        setIsSpeaking(false);
        setIsListening(false);
        if (typeof window !== "undefined" && "speechSynthesis" in window) {
            window.speechSynthesis.cancel();
        }
    };
    const sendVoiceQuery = (textToSend) => {
        const text = (textToSend || customInput).trim();
        if (!text)
            return;
        setCustomInput("");
        const timeStr = `00:${callDuration < 10 ? "0" : ""}${callDuration}`;
        const newTranscript = [
            ...transcript,
            { sender: "user", text, time: timeStr },
        ];
        setTranscript(newTranscript);
        // AI Speech & Text Response logic
        setTimeout(() => {
            let responseText = "";
            if (voiceLang === "ta") {
                if (text.includes("வணக்கம்") || text.includes("இருக்கிறீர்கள்")) {
                    responseText = "வணக்கம்! நான் சிறப்பாக இருக்கிறேன், நன்றி! உங்கள் வணிகத்திற்கான தானியங்கி முன்பதிவுகளை என்னால் உடனடியாக மேற்கொள்ள முடியும்.";
                }
                else if (text.includes("விலை") || text.includes("கட்டணம்")) {
                    responseText = "எங்கள் திட்டங்கள் மிகவும் எளிதானவை. உங்கள் மின்னஞ்சலுக்கு விவரங்களை உடனடியாக அனுப்புகிறேன்.";
                }
                else {
                    responseText = "வணக்கம்! உங்கள் கேள்விகளுக்கு எங்களது AI குரல் முகவர் 24/7 பதில் அளிக்கும்.";
                }
            }
            else if (voiceLang === "hi") {
                if (text.includes("नमस्ते") || text.includes("कैसे")) {
                    responseText = "नमस्ते! मैं बहुत अच्छा हूँ, धन्यवाद! मैं रियल-टाइम वीओआईपी और स्वचालित मीटिंग्स शेड्यूल कर सकता हूँ।";
                }
                else {
                    responseText = "सेलग्रो एआई वॉयस एजेंट आपके कॉल्स को 24/7 संभालता है।";
                }
            }
            else if (voiceLang === "ar") {
                responseText = "مرحباً بك! يمكنني جدولة المواعيد وإدارة قواعد البيانات المباشرة فورياً.";
            }
            else {
                if (text.toLowerCase().includes("how are you") || text.toLowerCase().includes("hello")) {
                    responseText = "Hello! I am doing great, thank you! I can schedule CRM meetings, track caller sentiment, and answer your business queries naturally.";
                }
                else if (text.toLowerCase().includes("price") || text.toLowerCase().includes("cost")) {
                    responseText = "Our pricing starts with flexible monthly tiers. I can send a custom quote directly to your inbox!";
                }
                else {
                    responseText = "I can book a demo directly with our Integration Lead right now. Which date suits you best?";
                }
            }
            setTranscript((prev) => [
                ...prev,
                { sender: "ai", text: responseText, time: `00:${callDuration + 2}` },
            ]);
            if (!isMuted) {
                speakText(responseText, voiceLang);
            }
        }, 600);
    };
    // Browser Mic Speech Recognition Toggle
    const toggleMicListening = () => {
        if (typeof window === "undefined")
            return;
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert("Browser Speech Recognition is not supported in this browser. You can type text in the box below to test!");
            return;
        }
        if (isListening) {
            setIsListening(false);
            return;
        }
        try {
            const recognition = new SpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = false;
            const langMap = {
                en: "en-US",
                ta: "ta-IN",
                hi: "hi-IN",
                ar: "ar-SA"
            };
            recognition.lang = langMap[voiceLang] || "en-US";
            recognition.onstart = () => setIsListening(true);
            recognition.onend = () => setIsListening(false);
            recognition.onerror = () => setIsListening(false);
            recognition.onresult = (event) => {
                const spokenText = event.results[0][0].transcript;
                if (spokenText) {
                    sendVoiceQuery(spokenText);
                }
            };
            recognition.start();
        }
        catch (err) {
            console.error(err);
            setIsListening(false);
        }
    };
    const handleSendChat = (e) => {
        e.preventDefault();
        if (!inputMsg.trim())
            return;
        const userText = inputMsg;
        setInputMsg("");
        setChatMessages((prev) => [...prev, { sender: "user", text: userText }]);
        setTimeout(() => {
            let reply = "Thanks for your inquiry! Our automated WhatsApp bot can process orders and update CRMs instantly.";
            if (userText.toLowerCase().includes("hi") || userText.toLowerCase().includes("hello")) {
                reply = "Hello! How can I assist your business growth today?";
            }
            else if (userText.toLowerCase().includes("catalog") || userText.toLowerCase().includes("product")) {
                reply = "Here is our instant product catalog. Select items directly within WhatsApp!";
            }
            setChatMessages((prev) => [...prev, { sender: "ai", text: reply }]);
        }, 800);
    };
    return (<AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"/>

        {/* Modal Dialog */}
        <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} transition={{ type: "spring", duration: 0.5, bounce: 0.1 }} className="relative w-full max-w-4xl bg-white dark:bg-[#0b1120] border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden z-10 my-8 max-h-[90vh] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl ${solution.colorClass}`}>
                <Icon className="w-6 h-6"/>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">
                    Solution Architecture
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                    WebRTC & Piper Voice AI
                  </span>
                </div>
                <h3 className="text-xl font-extrabold text-foreground font-display">
                  {solution.title}
                </h3>
              </div>
            </div>

            <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-full hover:bg-slate-200/50 dark:hover:bg-slate-800 transition-colors">
              <X className="w-5 h-5"/>
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-slate-200 dark:border-slate-800 px-6 bg-slate-100/50 dark:bg-slate-950/40">
            <button onClick={() => setActiveTab("demo")} className={`py-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${activeTab === "demo"
            ? "border-primary text-primary"
            : "border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-300"}`}>
              <Sparkles className="w-4 h-4"/>
              Interactive Model & Voice AI
            </button>

            <button onClick={() => setActiveTab("code")} className={`py-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${activeTab === "code"
            ? "border-primary text-primary"
            : "border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-300"}`}>
              <Code2 className="w-4 h-4"/>
              Piper TTS Code (Tamil & EN)
            </button>

            <button onClick={() => setActiveTab("overview")} className={`py-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${activeTab === "overview"
            ? "border-primary text-primary"
            : "border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-300"}`}>
              <Activity className="w-4 h-4"/>
              Capabilities & Features
            </button>

            <button onClick={() => setActiveTab("specs")} className={`py-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${activeTab === "specs"
            ? "border-primary text-primary"
            : "border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-300"}`}>
              <Cpu className="w-4 h-4"/>
              Tech Stack & Performance
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 overflow-y-auto flex-1 space-y-6">
            {/* TAB 1: INTERACTIVE MODEL & VOICE AI */}
            {activeTab === "demo" && (<div className="space-y-6">
                {/* Voice Assistant Interactive Model */}
                {solution.id === "voice" && (<div className="bg-slate-950 text-white rounded-2xl p-6 border border-slate-800 space-y-6 shadow-inner">
                    
                    {/* Language Selector & Engine Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className={`w-3 h-3 rounded-full ${isCalling ? "bg-emerald-500 animate-ping" : "bg-slate-600"}`}/>
                          <div className={`w-3 h-3 rounded-full absolute top-0 left-0 ${isCalling ? "bg-emerald-500" : "bg-slate-600"}`}/>
                        </div>
                        <div>
                          <p className="text-xs text-slate-400">Piper TTS & WebRTC Speech Model</p>
                          <p className="text-sm font-bold text-white">Status: {isCalling ? `Connected (${callDuration}s)` : "Idle - Ready to Call"}</p>
                        </div>
                      </div>

                      {/* Language Selection */}
                      <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
                        <span className="text-[10px] font-bold text-slate-400 px-2">Voice:</span>
                        <button onClick={() => setVoiceLang("ta")} className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${voiceLang === "ta" ? "bg-sky-500 text-white" : "text-slate-400 hover:text-white"}`}>
                          🇮🇳 தமிழ் (Tamil)
                        </button>
                        <button onClick={() => setVoiceLang("en")} className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${voiceLang === "en" ? "bg-sky-500 text-white" : "text-slate-400 hover:text-white"}`}>
                          🇺🇸 English
                        </button>
                        <button onClick={() => setVoiceLang("hi")} className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${voiceLang === "hi" ? "bg-sky-500 text-white" : "text-slate-400 hover:text-white"}`}>
                          🇮🇳 हिंदी
                        </button>
                        <button onClick={() => setVoiceLang("ar")} className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${voiceLang === "ar" ? "bg-sky-500 text-white" : "text-slate-400 hover:text-white"}`}>
                          🇸🇦 العربية
                        </button>
                      </div>
                    </div>

                    {/* Call Visualizer */}
                    <div className="flex flex-col items-center justify-center py-6 bg-slate-900/60 rounded-xl border border-slate-800/80 relative overflow-hidden">
                      <div className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${isSpeaking
                    ? "bg-gradient-to-tr from-cyan-400 via-sky-500 to-blue-600 ring-4 ring-sky-400/50 scale-105"
                    : "bg-gradient-to-tr from-sky-500 to-blue-600 shadow-sky-500/30"}`}>
                        <Bot className="w-10 h-10 text-white"/>
                      </div>

                      <h4 className="text-lg font-bold text-white mt-3 mb-0.5">SellGrow AI Receptionist</h4>
                      <p className="text-xs text-slate-400 mb-3">
                        {isSpeaking ? "🗣️ Speaking AI Audio Stream..." : "Real-time Speech Synthesis & Natural Dialog"}
                      </p>

                      {/* Animated Audio Spectrum */}
                      {(isCalling || isSpeaking) && (<div className="flex items-center gap-1.5 h-8 my-2">
                          {[40, 70, 30, 90, 50, 80, 40, 100, 60, 30, 80, 40].map((h, i) => (<motion.div key={i} animate={{ height: isSpeaking ? ["20%", `${h}%`, "20%"] : ["10%", "30%", "10%"] }} transition={{ repeat: Infinity, duration: 0.5 + (i % 5) * 0.1 }} className="w-1.5 bg-gradient-to-t from-sky-500 via-cyan-400 to-blue-300 rounded-full"/>))}
                        </div>)}

                      {/* Controls */}
                      <div className="flex items-center gap-4 mt-3">
                        {!isCalling ? (<button onClick={startVoiceCall} className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full font-bold text-xs shadow-lg shadow-emerald-500/30 flex items-center gap-2 transition-transform active:scale-95">
                            <PhoneCall className="w-4 h-4"/>
                            Start Simulated AI Voice Call
                          </button>) : (<>
                            <button onClick={toggleMicListening} className={`p-3 rounded-full text-white transition-all ${isListening ? "bg-red-500 animate-pulse ring-4 ring-red-500/40" : "bg-sky-600 hover:bg-sky-500"}`} title={isListening ? "Listening... Speak into microphone" : "Click to speak via Mic"}>
                              <Mic className="w-5 h-5"/>
                            </button>
                            
                            <button onClick={() => setIsMuted(!isMuted)} className={`p-3 rounded-full text-white ${isMuted ? "bg-amber-500" : "bg-slate-700 hover:bg-slate-600"}`} title={isMuted ? "Muted" : "Unmute Speech TTS"}>
                              {isMuted ? <VolumeX className="w-5 h-5"/> : <Volume2 className="w-5 h-5"/>}
                            </button>
                            
                            <button onClick={endVoiceCall} className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-full font-bold text-xs shadow-lg shadow-red-500/30 flex items-center gap-2 transition-transform active:scale-95">
                              <PhoneOff className="w-4 h-4"/>
                              End Call
                            </button>
                          </>)}
                      </div>
                    </div>

                    {/* Simulated Live Transcript & Input Box */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span>Live Conversation Transcript Stream</span>
                        <span>{isListening ? "🔴 Listening to microphone..." : "Type custom text or click sample inputs"}</span>
                      </div>

                      <div className="space-y-2.5 max-h-48 overflow-y-auto p-4 bg-slate-900/80 rounded-xl border border-slate-800 text-xs">
                        {transcript.map((item, idx) => (<div key={idx} className={`flex flex-col ${item.sender === "user" ? "items-end" : "items-start"}`}>
                            <span className="text-[10px] text-slate-500 mb-0.5">{item.sender === "user" ? "You" : "AI Voice"} • {item.time}</span>
                            <div className={`p-3 rounded-xl max-w-[85%] leading-relaxed ${item.sender === "user"
                        ? "bg-sky-600 text-white font-medium"
                        : "bg-slate-800 text-slate-200 border border-slate-700"}`}>
                              {item.text}
                            </div>
                          </div>))}
                      </div>

                      {/* Text Input Box to test Tamil / English user input */}
                      {isCalling && (<div className="space-y-2 pt-1">
                          <form onSubmit={(e) => {
                        e.preventDefault();
                        sendVoiceQuery();
                    }} className="flex gap-2">
                            <input type="text" value={customInput} onChange={(e) => setCustomInput(e.target.value)} placeholder={voiceLang === "ta"
                        ? "உள்ளீடு தட்டச்சு செய்க: (எ.கா: 'வணக்கம், எப்படி இருக்கிறீர்கள்?')"
                        : "Type input (e.g. 'Hello, how are you?' or 'Book demo')"} className="flex-1 px-4 py-2.5 bg-slate-900 text-white text-xs rounded-xl border border-slate-800 focus:outline-none focus:border-sky-500"/>
                            <button type="submit" className="px-4 py-2.5 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-md shadow-sky-500/20">
                              <Send className="w-3.5 h-3.5"/>
                              Speak & Send
                            </button>
                          </form>

                          {/* Quick Sample Prompts */}
                          <div className="flex flex-wrap gap-2 pt-1">
                            {voiceLang === "ta" ? (<>
                                <button onClick={() => sendVoiceQuery("வணக்கம், எப்படி இருக்கிறீர்கள்?")} className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-sky-300 text-xs rounded-lg border border-slate-800 font-semibold">
                                  🗣️ "வணக்கம், எப்படி இருக்கிறீர்கள்?"
                                </button>
                                <button onClick={() => sendVoiceQuery("உங்கள் சேவையின் கட்டண விவரங்கள் என்ன?")} className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs rounded-lg border border-slate-800">
                                  🗣️ "கட்டண விவரங்கள் என்ன?"
                                </button>
                              </>) : (<>
                                <button onClick={() => sendVoiceQuery("Hello, how are you?")} className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-sky-300 text-xs rounded-lg border border-slate-800 font-semibold">
                                  🗣️ "Hello, how are you?"
                                </button>
                                <button onClick={() => sendVoiceQuery("Can I book an appointment for tomorrow?")} className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs rounded-lg border border-slate-800">
                                  🗣️ "Book an appointment for tomorrow"
                                </button>
                              </>)}
                          </div>
                        </div>)}
                    </div>
                  </div>)}

                {/* WhatsApp Interactive Model */}
                {solution.id === "whatsapp" && (<div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                          WA
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-white">WhatsApp Business API Assistant</h4>
                          <p className="text-xs text-emerald-400">● Online | Instant Auto-Reply Engine</p>
                        </div>
                      </div>
                    </div>

                    <div className="h-56 overflow-y-auto space-y-3 p-4 bg-[#0b141a] rounded-xl border border-slate-800 text-xs">
                      {chatMessages.map((msg, idx) => (<div key={idx} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                          <div className={`p-3 rounded-xl max-w-[75%] ${msg.sender === "user"
                        ? "bg-emerald-700 text-white rounded-tr-none"
                        : "bg-[#202c33] text-slate-200 rounded-tl-none border border-slate-700"}`}>
                            {msg.text}
                          </div>
                        </div>))}
                    </div>

                    <form onSubmit={handleSendChat} className="flex gap-2">
                      <input type="text" value={inputMsg} onChange={(e) => setInputMsg(e.target.value)} placeholder="Type a WhatsApp query (e.g. 'Show catalog' or 'Hi')..." className="flex-1 px-4 py-2.5 bg-slate-800 text-white text-xs rounded-xl border border-slate-700 focus:outline-none focus:border-emerald-500"/>
                      <button type="submit" className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold flex items-center gap-1">
                        <Send className="w-3.5 h-3.5"/>
                        Send
                      </button>
                    </form>
                  </div>)}

                {/* App Business Interactive Model */}
                {solution.id === "app" && (<div className="bg-slate-950 text-white rounded-2xl p-6 border border-slate-800 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    <div className="md:col-span-6 space-y-4">
                      <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Mobile App Architecture</span>
                      <h4 className="text-xl font-bold text-white">Branded iOS & Android App Engine</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Deploy your enterprise mobile app with native push notifications, offline catalog cache, and biometric authentication out of the box.
                      </p>

                      <div className="flex gap-2 pt-2">
                        <button onClick={() => setAppTab("home")} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${appTab === "home" ? "bg-indigo-600 text-white" : "bg-slate-800 text-slate-400"}`}>
                          Home Feed
                        </button>
                        <button onClick={() => setAppTab("products")} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${appTab === "products" ? "bg-indigo-600 text-white" : "bg-slate-800 text-slate-400"}`}>
                          E-Commerce
                        </button>
                        <button onClick={() => setAppTab("notification")} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${appTab === "notification" ? "bg-indigo-600 text-white" : "bg-slate-800 text-slate-400"}`}>
                          Push Preview
                        </button>
                      </div>
                    </div>

                    <div className="md:col-span-6 flex justify-center">
                      <div className="w-56 h-[340px] bg-slate-900 border-4 border-slate-800 rounded-[36px] shadow-2xl p-3 flex flex-col justify-between relative overflow-hidden">
                        <div className="w-20 h-4 bg-slate-800 rounded-full mx-auto mb-2"/>

                        {appTab === "home" && (<div className="space-y-2 text-center my-auto">
                            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto">
                              <Smartphone className="w-6 h-6"/>
                            </div>
                            <p className="text-xs font-bold text-white">SellGrow Mobile</p>
                            <p className="text-[10px] text-slate-400">Native Performance Ready</p>
                          </div>)}

                        {appTab === "products" && (<div className="space-y-2 text-xs">
                            <p className="text-center font-bold text-indigo-300">Fast Mobile Checkout</p>
                            <div className="p-2 bg-slate-800 rounded-lg text-[10px]">📦 Premium Product A - $49</div>
                            <div className="p-2 bg-slate-800 rounded-lg text-[10px]">📦 Enterprise Add-on - $99</div>
                          </div>)}

                        {appTab === "notification" && (<div className="p-2.5 bg-indigo-950/80 border border-indigo-500/40 rounded-xl text-left space-y-1 my-auto">
                            <p className="text-[10px] font-bold text-indigo-300">🔔 Push Notification</p>
                            <p className="text-[9px] text-slate-300">Flash Sale live! Tap to order with 1-click checkout.</p>
                          </div>)}

                        <div className="w-16 h-1 bg-slate-700 rounded-full mx-auto"/>
                      </div>
                    </div>
                  </div>)}

                {/* Website Business Interactive Model */}
                {solution.id === "website" && (<div className="bg-slate-950 text-white rounded-2xl p-6 border border-slate-800 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <div>
                        <h4 className="text-sm font-bold text-white">High-Speed Web Ecosystem Audit</h4>
                        <p className="text-xs text-amber-400">SEO-Optimized & 100/100 Core Web Vitals Performance</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                      <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-center">
                        <span className="text-2xl font-extrabold text-emerald-400">99</span>
                        <p className="text-xs text-slate-400 mt-1">Performance</p>
                      </div>
                      <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-center">
                        <span className="text-2xl font-extrabold text-sky-400">100</span>
                        <p className="text-xs text-slate-400 mt-1">Accessibility</p>
                      </div>
                      <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-center">
                        <span className="text-2xl font-extrabold text-amber-400">100</span>
                        <p className="text-xs text-slate-400 mt-1">Best Practices</p>
                      </div>
                      <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-center">
                        <span className="text-2xl font-extrabold text-indigo-400">100</span>
                        <p className="text-xs text-slate-400 mt-1">SEO Score</p>
                      </div>
                    </div>
                  </div>)}
              </div>)}

            {/* TAB: PIPER TTS CODE SETUP (TAMIL & ENGLISH MODELS) */}
            {activeTab === "code" && (<div className="space-y-4">
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-white space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div>
                      <h4 className="text-sm font-bold text-sky-400">Piper Neural Voice Model (Tamil & English Synthesis)</h4>
                      <p className="text-xs text-slate-400">Model: ta_IN-ValluvaNeural-medium ONNX</p>
                    </div>
                  </div>

                  {/* Shell Command Code Block */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-300">1. CLI Command Pipeline:</span>
                    <pre className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-[11px] font-mono text-emerald-400 overflow-x-auto">
            {`echo "வணக்கம், எப்படி இருக்கிறீர்கள்?" | piper \\
  --model ta_IN-ValluvaNeural-medium/ta_IN-ValluvaNeural-medium.onnx.onnx \\
  --config ta_IN-ValluvaNeural-medium/ta_IN-ValluvaNeural-medium.onnx.json \\
  --output_file output.wav`}
                    </pre>
                  </div>

                  {/* Python Code Block */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-300">2. Python WebRTC Integration Code:</span>
                    <pre className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-[11px] font-mono text-sky-300 overflow-x-auto">
            {`import wave
from piper import PiperVoice

# Load Tamil / English Neural ONNX Voice Model
model_name = "ta_IN-ValluvaNeural-medium"
model_path = f"{model_name}/{model_name}.onnx.onnx"
config_path = f"{model_name}/{model_name}.onnx.json"

voice = PiperVoice.load(model_path, config_path=config_path)

# Synthesize user text directly into WAV stream
text = "வணக்கம், எப்படி இருக்கிறீர்கள்?"

with wave.open("output.wav", "wb") as wav_file:
    voice.synthesize(text, wav_file)`}
                    </pre>
                  </div>
                </div>
              </div>)}

            {/* TAB 2: CAPABILITIES & FEATURES */}
            {activeTab === "overview" && (<div className="space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {solution.longDesc}
                </p>

                <h4 className="text-sm font-bold text-foreground pt-2">Key Features:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {solution.features.map((feat, idx) => (<div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5"/>
                      <span className="text-xs font-semibold text-foreground">{feat}</span>
                    </div>))}
                </div>
              </div>)}

            {/* TAB 3: TECH STACK & PERFORMANCE */}
            {activeTab === "specs" && (<div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <Zap className="w-5 h-5 text-amber-500 mb-2"/>
                    <h5 className="text-xs font-bold text-foreground">Response Speed</h5>
                    <p className="text-xs text-muted-foreground mt-1">&lt;50ms Real-time Execution</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <ShieldCheck className="w-5 h-5 text-emerald-500 mb-2"/>
                    <h5 className="text-xs font-bold text-foreground">Security</h5>
                    <p className="text-xs text-muted-foreground mt-1">SOC-2 & End-to-End Encrypted</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <BarChart3 className="w-5 h-5 text-sky-500 mb-2"/>
                    <h5 className="text-xs font-bold text-foreground">Scale Capacity</h5>
                    <p className="text-xs text-muted-foreground mt-1">100,000+ Parallel Operations</p>
                  </div>
                </div>
              </div>)}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex flex-wrap items-center justify-between gap-4">
            <button onClick={onClose} className="px-5 py-2.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800 rounded-xl transition-colors">
              Close Preview
            </button>

            <button onClick={() => {
            onClose();
            onBookDemo(solution.id, solution.title);
        }} className="px-6 py-2.5 bg-gradient-to-r from-primary to-secondary hover:opacity-95 text-white rounded-xl text-xs font-bold shadow-lg shadow-primary/20 transition-all flex items-center gap-2 transform hover:-translate-y-0.5 active:translate-y-0">
              <Calendar className="w-4 h-4"/>
              Book Live Demo for {solution.title}
              <ArrowRight className="w-3.5 h-3.5 ml-1"/>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>);
}
