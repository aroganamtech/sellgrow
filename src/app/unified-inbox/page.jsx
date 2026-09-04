"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { MessageSquare, Send, Bot, Users, ArrowRight, ChevronRight, Globe, Mail } from "lucide-react";
export default function UnifiedInboxPage() {
    // Interactive Chat Simulator State
    const [messages, setMessages] = useState([
        { sender: "customer", text: "Hi! Can I get pricing for the WhatsApp Business integration?", time: "10:42 AM" },
        { sender: "ai", text: "Hello! Our WhatsApp Business API starts at ₹1,399/mo ($25/mo), including shared agent inbox and broadcast campaigns.", time: "10:42 AM" },
    ]);
    const [inputText, setInputText] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!inputText.trim())
            return;
        const userMsg = { sender: "customer", text: inputText, time: "Just now" };
        setMessages((prev) => [...prev, userMsg]);
        setInputText("");
        setIsTyping(true);
        // AI Reply Simulation
        setTimeout(() => {
            setIsTyping(false);
            setMessages((prev) => [
                ...prev,
                {
                    sender: "ai",
                    text: "Thanks for reaching out! SellGrow Unified Inbox routes all customer messages directly to your team or automated AI. Would you like to schedule a quick demo?",
                    time: "Just now"
                }
            ]);
        }, 1200);
    };
    const sampleThreads = [
        { name: "Rahul Sharma", channel: "WhatsApp", snippet: "Awesome, please send the invoice link.", status: "Assigned: Sarah", unread: 0, avatar: "RS", color: "bg-emerald-500" },
        { name: "Anita Tech Solutions", channel: "Website Chat", snippet: "Is bulk messaging included?", status: "AI Bot Active", unread: 2, avatar: "AT", color: "bg-sky-500" },
        { name: "Global Enterprise", channel: "Email", snippet: "Looking forward to our integration call tomorrow.", status: "Assigned: Alex", unread: 0, avatar: "GE", color: "bg-indigo-500" },
    ];
    return (<div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
      <main className="flex-grow pt-20 pb-20 relative z-10 overflow-x-hidden">
        {/* Background Glow */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-emerald-500/10 dark:bg-emerald-500/15 rounded-full blur-[140px] pointer-events-none -z-10"/>

        {/* HERO SECTION */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12 text-center space-y-6">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 shadow-sm">
            <MessageSquare className="w-4 h-4"/>
            <span>Omnichannel Shared Agent Inbox</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-display max-w-4xl mx-auto leading-tight">
            Unite WhatsApp, Webchat & Email into One <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-600 bg-clip-text text-transparent">Unified Inbox</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="text-base sm:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
            No more switching tabs or missing customer inquiries. Deliver 10x faster support responses, send official WhatsApp API broadcasts, and empower your support team with generative AI suggested replies.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link href="/register" className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-600 text-white font-bold text-sm shadow-xl shadow-emerald-500/20 hover:opacity-95 transition-all flex items-center gap-2">
              <span>Start Free 14-Day Trial</span>
              <ArrowRight className="w-4 h-4"/>
            </Link>

            <Link href="/pricing" className="px-6 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-bold text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-all flex items-center gap-2 shadow-sm">
              <span>View Inbox Pricing</span>
              <ChevronRight className="w-4 h-4"/>
            </Link>
          </motion.div>

          {/* Supported Channels Bar */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-slate-600 dark:text-slate-400 text-xs font-bold">
            <span className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <MessageSquare className="w-4 h-4 text-emerald-500"/> WhatsApp Official API
            </span>
            <span className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <Globe className="w-4 h-4 text-sky-500"/> Live Website Widget
            </span>
            <span className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <Mail className="w-4 h-4 text-indigo-500"/> Shared Email Inbox
            </span>
          </div>
        </section>

        {/* INTERACTIVE INBOX DEMO WIDGET */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="p-4 sm:p-6 rounded-3xl bg-white dark:bg-[#0b1220] border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 px-2">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500"/>
                <h2 className="text-base font-bold font-display text-slate-900 dark:text-white">
                  Live Unified Shared Inbox Dashboard
                </h2>
              </div>
              <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                Meta Official API Active
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-[480px]">
              {/* Left Sidebar: Threads List */}
              <div className="lg:col-span-4 p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 overflow-y-auto">
                <div className="flex items-center justify-between px-2 py-1">
                  <span className="text-xs font-black uppercase text-slate-500">Active Conversations</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800">3 Threads</span>
                </div>

                {sampleThreads.map((th, idx) => (<div key={idx} className={`p-3 rounded-xl border transition-all cursor-pointer space-y-1.5 ${idx === 0
                ? "border-emerald-500/50 bg-emerald-500/10 dark:bg-emerald-950/40"
                : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"}`}>
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <div className={`w-7 h-7 rounded-full ${th.color} text-white font-bold text-[10px] flex items-center justify-center`}>
                          {th.avatar}
                        </div>
                        <span className="font-bold text-slate-900 dark:text-white">{th.name}</span>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">{th.channel}</span>
                    </div>

                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{th.snippet}</p>

                    <div className="flex items-center justify-between pt-1 text-[10px]">
                      <span className="px-2 py-0.5 rounded-md bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium">
                        {th.status}
                      </span>
                    </div>
                  </div>))}
              </div>

              {/* Middle: Active Chat Window */}
              <div className="lg:col-span-8 flex flex-col p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 justify-between">
                {/* Chat Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-emerald-500 text-white font-bold text-xs flex items-center justify-center">
                      RS
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-slate-900 dark:text-white">Rahul Sharma</h3>
                      <p className="text-[10px] text-emerald-500 font-semibold">Channel: WhatsApp Business API</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      AI Assist Active
                    </span>
                  </div>
                </div>

                {/* Messages Container */}
                <div className="flex-grow py-4 space-y-3 overflow-y-auto pr-1">
                  {messages.map((msg, idx) => (<div key={idx} className={`flex flex-col ${msg.sender === "customer" ? "items-start" : "items-end"}`}>
                      <div className={`max-w-md p-3 rounded-2xl text-xs space-y-1 ${msg.sender === "customer"
                ? "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-tl-none"
                : "bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-tr-none shadow-md"}`}>
                        <p className="leading-relaxed">{msg.text}</p>
                        <span className="text-[9px] opacity-70 block text-right font-mono">{msg.time}</span>
                      </div>
                    </div>))}

                  {isTyping && (<div className="flex items-center gap-2 text-xs text-slate-400 font-medium italic pt-1">
                      <Bot className="w-4 h-4 text-emerald-500 animate-spin"/>
                      <span>SellGrow AI Assistant is generating response...</span>
                    </div>)}
                </div>

                {/* Message Input Form */}
                <form onSubmit={handleSendMessage} className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
                  <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder="Type a response or let AI reply automatically..." className="flex-grow px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none focus:border-emerald-500"/>
                  <button type="submit" className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5">
                    <span>Send</span>
                    <Send className="w-3.5 h-3.5"/>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* CORE FEATURES GRID */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-200 dark:border-slate-800">
          <div className="text-center space-y-4 max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 dark:text-white">
              Supercharge Customer Support & Sales Messaging
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-400">
              Designed for modern support teams managing high conversational volume.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-white dark:bg-[#0b1220] border border-slate-200 dark:border-slate-800 shadow-lg space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center border border-emerald-500/20">
                <MessageSquare className="w-6 h-6"/>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">WhatsApp API Broadcasts</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Send official Meta verified bulk promotional messages, order notifications, and discount announcements with 98% open rates.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-[#0b1220] border border-slate-200 dark:border-slate-800 shadow-lg space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-500 flex items-center justify-center border border-teal-500/20">
                <Users className="w-6 h-6"/>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">Multi-Agent Team Routing</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Route incoming customer chats to available support reps automatically based on department, language, or workload balance.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-[#0b1220] border border-slate-200 dark:border-slate-800 shadow-lg space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-500 flex items-center justify-center border border-sky-500/20">
                <Bot className="w-6 h-6"/>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">Automated AI Chatbot</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Let generative AI handle FAQs, collect lead phone numbers, send product catalogs, and hand over complex queries smoothly to human agents.
              </p>
            </div>
          </div>
        </section>

        {/* CTA BANNER */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-700 text-white text-center space-y-6 shadow-2xl relative overflow-hidden">
            <div className="max-w-2xl mx-auto space-y-3 relative z-10">
              <h2 className="text-3xl sm:text-4xl font-black font-display tracking-tight">
                Ready to Upgrade Your Customer Support?
              </h2>
              <p className="text-sm sm:text-base text-emerald-100 leading-relaxed">
                Connect your official WhatsApp Business API and website live chat in under 5 minutes.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-4 relative z-10">
              <Link href="/register" className="px-8 py-3.5 rounded-2xl bg-white text-slate-900 font-bold text-sm hover:bg-slate-100 transition-all shadow-lg">
                Start 14-Day Free Trial
              </Link>
              <Link href="/pricing" className="px-8 py-3.5 rounded-2xl bg-emerald-500/20 border border-white/30 text-white font-bold text-sm hover:bg-emerald-500/30 transition-all">
                View Inbox Pricing
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>);
}
