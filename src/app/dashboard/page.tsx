"use client";

import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useRouter } from "next/navigation";
import Logo from "@/components/layout/Logo";
import {
  TrendingUp,
  MessageSquare,
  Volume2,
  Workflow,
  Database,
  Layers,
  Activity,
  LogOut,
  Sun,
  Moon,
  Globe,
  Plus,
  Trash2,
  Check,
  Send,
  Sparkles,
  PhoneCall,
  PhoneOff,
  UserCheck,
  MapPin,
  Play,
  FileText,
  Search,
  ChevronRight,
  ShieldCheck,
  LayoutDashboard,
  FolderTree,
  DollarSign,
  Users,
  MessageCircle,
} from "lucide-react";

interface Lead {
  id: string;
  name: string;
  value: string;
  probability: number;
  coordinates: string;
  summary: string;
  stage: "incoming" | "meeting" | "proposal" | "closed";
}

interface WorkflowNode {
  id: string;
  type: "trigger" | "delay" | "action";
  label: string;
  details: string;
}

export default function DashboardPage() {
  const { user, logout, isLoading: authLoading } = useAuth();
  const { language, setLanguage, t, dir } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<
    "overview" | "crm" | "inbox" | "voice" | "workflow" | "catalogue" | "rag" | "analytics"
  >("overview");

  // CRM state
  const [leads, setLeads] = useState<Lead[]>([
    {
      id: "1",
      name: "Tesla India Retail",
      value: "$45,000",
      probability: 88,
      coordinates: "12.9716° N, 77.5946° E",
      summary: "Client requests immediate pricing and catalogue details for commercial EV chargers.",
      stage: "incoming",
    },
    {
      id: "2",
      name: "MedLife Clinic Group",
      value: "$18,500",
      probability: 95,
      coordinates: "19.0760° N, 72.8777° E",
      summary: "AI receptionist booked visit on Monday. Needs clinic receptionist workflow automation.",
      stage: "meeting",
    },
    {
      id: "3",
      name: "HyperMarket Dubai",
      value: "$92,000",
      probability: 74,
      coordinates: "25.2048° N, 55.2708° E",
      summary: "Acquiring WhatsApp Business Broadcast subscription and multi-language support details.",
      stage: "proposal",
    },
    {
      id: "4",
      name: "German Textile Co.",
      value: "$34,000",
      probability: 100,
      coordinates: "52.5200° N, 13.4050° E",
      summary: "Contract finalized. Order tracking API and inventory catalog sync activated.",
      stage: "closed",
    },
  ]);
  const [newLeadName, setNewLeadName] = useState("");
  const [newLeadValue, setNewLeadValue] = useState("");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  // Inbox state
  const [selectedChat, setSelectedChat] = useState<"whatsapp" | "livechat" | "messenger">("whatsapp");
  const [chatMessages, setChatMessages] = useState<Record<string, { sender: "client" | "agent"; text: string }[]>>({
    whatsapp: [
      { sender: "client", text: "Hello! Can I set up automatic order tracking notifications?" },
      { sender: "agent", text: "Yes, you can configure an automated delay trigger node to send updates." },
    ],
    livechat: [
      { sender: "client", text: "Do you offer SOC 2 security compliance?" },
      { sender: "agent", text: "Yes, SellGrow has built-in enterprise multi-tenant SOC 2 policies." },
    ],
    messenger: [
      { sender: "client", text: "I want to request a demo of the AI Voice Agent integration." },
    ],
  });
  const [inboxInput, setInboxInput] = useState("");
  const [aiSuggestions, setAiSuggestions] = useState<Record<string, string[]>>({
    whatsapp: [
      "Yes, order tracking syncs directly with Shopify & custom DBs.",
      "You can setup automated delays under the Workflow tab.",
    ],
    livechat: [
      "Our system is fully GDPR ready and SOC 2 audited.",
      "Check our security logs inside the Admin configuration.",
    ],
    messenger: [
      "Sure! Click the AI Voice Agent tab to try our live call simulator.",
      "We use WebRTC nodes for zero-latency communication.",
    ],
  });

  // Voice Platform State
  const [voiceCallState, setVoiceCallState] = useState<"idle" | "ringing" | "active" | "ended">("idle");
  const [voiceTranscripts, setVoiceTranscripts] = useState<{ sender: "ai" | "user"; text: string }[]>([]);
  const [isVoiceSpeaking, setIsVoiceSpeaking] = useState(false);

  // Workflow states
  const [workflowNodes, setWorkflowNodes] = useState<WorkflowNode[]>([
    { id: "1", type: "trigger", label: "WhatsApp Lead Incoming", details: "Fires when customer initiates chat" },
    { id: "2", type: "delay", label: "Delay Node: 2 Minutes", details: "Prevents instant bot spam feeling" },
    { id: "3", type: "action", label: "Semantic RAG Answer", details: "Queries catalog PDF for solutions" },
    { id: "4", type: "action", label: "Provision CRM Ticket", details: "Sets status to Incoming Lead" },
  ]);
  const [newNodeType, setNewNodeType] = useState<"trigger" | "delay" | "action">("action");
  const [newNodeLabel, setNewNodeLabel] = useState("");
  const [newNodeDetails, setNewNodeDetails] = useState("");

  // RAG / Knowledge Base State
  const [ragFiles, setRagFiles] = useState([
    { name: "return_policy_v3.pdf", size: "1.4 MB", date: "2026-07-10", chunks: 42 },
    { name: "ev_charger_manual.docx", size: "2.1 MB", date: "2026-07-12", chunks: 110 },
    { name: "faq_list_arabic.xlsx", size: "450 KB", date: "2026-07-15", chunks: 15 },
  ]);
  const [ragQuery, setRagQuery] = useState("");
  const [ragResult, setRagResult] = useState<{ answer: string; confidence: number; source: string } | null>(null);

  // Redirect if not authenticated (using client check)
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  // Voice synth helper
  const speak = (text: string) => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onstart = () => setIsVoiceSpeaking(true);
      utterance.onend = () => setIsVoiceSpeaking(false);
      utterance.onerror = () => setIsVoiceSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleStartVoiceCall = () => {
    setVoiceCallState("ringing");
    setVoiceTranscripts([]);
    setTimeout(() => {
      setVoiceCallState("active");
      const msg = "Welcome back Naveen. This is your AI voice agent dialer. I am ready to route communications.";
      setVoiceTranscripts([{ sender: "ai", text: msg }]);
      speak(msg);
    }, 1200);
  };

  const handleVoiceResponse = (userText: string, aiText: string) => {
    setVoiceTranscripts(prev => [...prev, { sender: "user", text: userText }]);
    setIsVoiceSpeaking(true);
    setTimeout(() => {
      setVoiceTranscripts(prev => [...prev, { sender: "ai", text: aiText }]);
      speak(aiText);
    }, 600);
  };

  const handleEndVoiceCall = () => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setVoiceCallState("ended");
    setIsVoiceSpeaking(false);
    setTimeout(() => setVoiceCallState("idle"), 2000);
  };

  // Add lead action
  const handleAddLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadName) return;
    const newLead: Lead = {
      id: Math.random().toString(),
      name: newLeadName,
      value: newLeadValue || "$1,000",
      probability: Math.floor(Math.random() * 50) + 50,
      coordinates: "12.9716° N, 77.5946° E",
      summary: "Newly simulated workspace registration from the pipeline creator.",
      stage: "incoming",
    };
    setLeads([...leads, newLead]);
    setNewLeadName("");
    setNewLeadValue("");
  };

  // Add workflow node
  const handleAddWorkflowNode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNodeLabel) return;
    const node: WorkflowNode = {
      id: Math.random().toString(),
      type: newNodeType,
      label: newNodeLabel,
      details: newNodeDetails || "Custom workflow logic executed",
    };
    setWorkflowNodes([...workflowNodes, node]);
    setNewNodeLabel("");
    setNewNodeDetails("");
  };

  // Run semantic search query
  const handleRagSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ragQuery.trim()) return;

    // Simulated RAG result lookup
    setTimeout(() => {
      let answer = "The vector query found matching chunks inside return_policy_v3.pdf. Standard refund allows 14 business days, assuming products are in pristine shipping condition.";
      let source = "return_policy_v3.pdf (Chunk #12)";
      let confidence = 0.94;

      const lowerQ = ragQuery.toLowerCase();
      if (lowerQ.includes("manual") || lowerQ.includes("charger") || lowerQ.includes("ev")) {
        answer = "Found inside ev_charger_manual.docx: Connecting EV chargers requires checking the rated output (22kW). Secure installation relies on direct grid grounding and 3-phase grid infrastructure compatibility.";
        source = "ev_charger_manual.docx (Chunk #85)";
        confidence = 0.89;
      } else if (lowerQ.includes("arabic") || lowerQ.includes("translation")) {
        answer = "Found matching rows in faq_list_arabic.xlsx: Multi-language mapping matches LTR and RTL phrases dynamically for translation.";
        source = "faq_list_arabic.xlsx (Row #5)";
        confidence = 0.91;
      }

      setRagResult({ answer, confidence, source });
    }, 400);
  };

  // Send Chat message (Inbox)
  const handleSendInboxMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inboxInput.trim()) return;

    const msgText = inboxInput;
    setChatMessages(prev => ({
      ...prev,
      [selectedChat]: [...prev[selectedChat], { sender: "agent", text: msgText }],
    }));
    setInboxInput("");

    // Simulated client response
    setTimeout(() => {
      setChatMessages(prev => ({
        ...prev,
        [selectedChat]: [...prev[selectedChat], { sender: "client", text: "Got it! Thanks for the support." }],
      }));
    }, 1000);
  };

  // Shift Lead Stage
  const shiftLeadStage = (leadId: string, direction: "next" | "prev") => {
    const stages: Lead["stage"][] = ["incoming", "meeting", "proposal", "closed"];
    setLeads(
      leads.map((l) => {
        if (l.id !== leadId) return l;
        const currIdx = stages.indexOf(l.stage);
        let newIdx = direction === "next" ? currIdx + 1 : currIdx - 1;
        if (newIdx >= 0 && newIdx < stages.length) {
          return { ...l, stage: stages[newIdx] };
        }
        return l;
      })
    );
  };

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#070b13]">
        <div className="text-center space-y-4">
          <Activity className="w-10 h-10 animate-spin text-primary mx-auto" />
          <p className="text-sm font-semibold text-muted-foreground">Authenticating instance...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#060a12] transition-colors duration-300">
      
      {/* Top Header Controls */}
      <header className="h-16 border-b border-border bg-white dark:bg-[#0c1220] flex items-center justify-between px-6 sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <Logo className="w-12 h-12" />
          <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded font-mono font-semibold">
            Enterprise OS
          </span>
        </div>

        {/* Global info and selectors */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex flex-col text-right">
            <span className="text-xs font-bold text-foreground font-display">{user.businessName}</span>
            <span className="text-[10px] text-muted-foreground">{user.businessType} Mode</span>
          </div>

          <span className="w-px h-6 bg-border hidden sm:block" />

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Language Toggle */}
          <div className="flex gap-1.5 bg-slate-100 dark:bg-black/20 p-1 rounded-lg">
            {(["en", "hi", "ar", "ta"] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-2 py-0.5 text-[10px] rounded font-bold uppercase transition-all ${
                  language === lang
                    ? "bg-primary text-white shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          <button
            onClick={logout}
            className="p-1.5 rounded-lg hover:bg-red-500/10 text-muted-foreground hover:text-red-500 transition-colors flex items-center gap-1.5 text-xs font-semibold"
            aria-label="Logout button"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden md:inline">Log Out</span>
          </button>
        </div>
      </header>

      {/* Main Workspace Body */}
      <div className="flex-grow flex flex-col md:flex-row">
        
        {/* Navigation Sidebar */}
        <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-border bg-white dark:bg-[#0c1220] p-4 flex flex-col justify-between shrink-0">
          <div className="space-y-4">
            <div className="flex items-center gap-2 p-2 bg-slate-50 dark:bg-black/20 rounded-xl border border-border border-opacity-50">
              <div className="w-8 h-8 rounded-full bg-primary text-white font-bold flex items-center justify-center text-xs">
                NS
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-foreground leading-tight truncate">{user.name}</p>
                <p className="text-[10px] text-muted-foreground leading-none mt-0.5 capitalize">{user.role}</p>
              </div>
            </div>

            <nav className="space-y-1">
              {[
                { id: "overview", icon: LayoutDashboard, label: t("dashboard") },
                { id: "crm", icon: TrendingUp, label: t("crm") },
                { id: "inbox", icon: MessageSquare, label: t("inbox") },
                { id: "voice", icon: Volume2, label: t("voice") },
                { id: "workflow", icon: Workflow, label: t("workflow") },
                { id: "catalogue", icon: FolderTree, label: t("catalogue") },
                { id: "rag", icon: Database, label: t("rag") },
                { id: "analytics", icon: Activity, label: t("analytics") },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id as any);
                      // Reset call if switching tabs
                      if (voiceCallState === "active") handleEndVoiceCall();
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 text-xs rounded-xl font-semibold border transition-all ${
                      activeTab === tab.id
                        ? "bg-primary border-primary text-white shadow-md shadow-primary/10"
                        : "border-transparent text-muted-foreground hover:bg-black/5 dark:hover:bg-white/5"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="mt-8 pt-4 border-t border-border hidden md:block text-[10px] text-muted-foreground space-y-1">
            <p>Deployment: Multi-Tenant Cloud</p>
            <p>Region: US-East / EU / India</p>
            <p>Status: All Services Operational</p>
          </div>
        </aside>

        {/* Dynamic Panel Content */}
        <main className="flex-grow p-6 overflow-y-auto max-w-7xl mx-auto w-full">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h1 className="text-2xl font-bold font-display text-foreground">{t("welcomeBack")}</h1>
                  <p className="text-xs text-muted-foreground">Unified Operations Dashboard control panel overview.</p>
                </div>
                <div className="text-xs bg-card border px-3 py-1.5 rounded-lg flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                  <span className="font-semibold">Simulated Real-Time Sandbox Active</span>
                </div>
              </div>

              {/* KPI Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { icon: DollarSign, label: t("totalRevenue"), value: "$12,450", trend: "+12% this month", color: "text-emerald-500 bg-emerald-500/10" },
                  { icon: Users, label: t("activeLeads"), value: leads.length.toString(), trend: `${leads.filter(l => l.stage === "closed").length} Deals Closed`, color: "text-blue-500 bg-blue-500/10" },
                  { icon: MessageCircle, label: t("unreadMessages"), value: "8 Conversations", trend: "WhatsApp, FB, Live Chat", color: "text-purple-500 bg-purple-500/10" },
                  { icon: Sparkles, label: t("aiResolution"), value: "89.2%", trend: "142 Deflected Queries", color: "text-pink-500 bg-pink-500/10" },
                ].map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <div key={idx} className="p-5 rounded-2xl border border-border bg-card shadow-sm space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground font-semibold">{stat.label}</span>
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${stat.color}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                      </div>
                      <div>
                        <p className="text-2xl font-extrabold font-display">{stat.value}</p>
                        <p className="text-[10px] text-muted-foreground mt-1">{stat.trend}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Quick Simulator Highlight */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Active Calls & Voice Box */}
                <div className="lg:col-span-2 p-6 rounded-2xl border border-border bg-card shadow-sm space-y-4">
                  <h3 className="text-sm font-bold font-display flex items-center gap-2 border-b pb-2"><Volume2 className="w-4 h-4 text-primary" /> Active AI Voice Status</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl border bg-slate-50 dark:bg-black/10 text-center space-y-3 flex flex-col justify-between">
                      <p className="text-xs text-muted-foreground leading-normal">Test the AI Voice agent by starting a quick local line simulation.</p>
                      <button
                        onClick={() => setActiveTab("voice")}
                        className="w-full py-2 bg-primary hover:opacity-90 text-white rounded-xl text-xs font-semibold"
                      >
                        Open Voice Console
                      </button>
                    </div>
                    <div className="p-4 rounded-xl border bg-slate-50 dark:bg-black/10 space-y-2">
                      <p className="text-[10px] font-bold text-muted uppercase">Voice System Status</p>
                      <ul className="space-y-1.5 text-[11px] text-muted-foreground">
                        <li className="flex justify-between"><span>VAD Engine:</span> <strong className="text-emerald-500">Ready</strong></li>
                        <li className="flex justify-between"><span>Speech-to-Text:</span> <strong>Google Cloud API</strong></li>
                        <li className="flex justify-between"><span>Active Rooms:</span> <strong>2 Callers</strong></li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Automation Running Workflows summary */}
                <div className="p-6 rounded-2xl border border-border bg-card shadow-sm space-y-4">
                  <h3 className="text-sm font-bold font-display flex items-center gap-2 border-b pb-2"><Workflow className="w-4 h-4 text-primary" /> {t("workflowsRunning")}</h3>
                  <div className="space-y-3">
                    {workflowNodes.slice(0, 3).map((node, index) => (
                      <div key={index} className="flex justify-between items-center text-xs">
                        <div className="flex gap-2 items-center">
                          <span className={`w-2 h-2 rounded-full ${node.type === "trigger" ? "bg-blue-500" : node.type === "delay" ? "bg-amber-500" : "bg-purple-500"}`} />
                          <span className="font-semibold">{node.label}</span>
                        </div>
                        <span className="text-[10px] text-muted-foreground uppercase">{node.type}</span>
                      </div>
                    ))}
                    <button
                      onClick={() => setActiveTab("workflow")}
                      className="w-full text-center text-xs font-bold text-primary hover:underline pt-2 block"
                    >
                      Configure visual workflow builder
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SALES CRM */}
          {activeTab === "crm" && (
            <div className="space-y-6 animate-fade-in text-left">
              <div>
                <h1 className="text-2xl font-bold font-display text-foreground">{t("crm")}</h1>
                <p className="text-xs text-muted-foreground">Control and drag leads through standard marketing pipeline steps.</p>
              </div>

              {/* CRM Pipeline Drag Mock */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {(["incoming", "meeting", "proposal", "closed"] as const).map((stage) => (
                  <div key={stage} className="p-4 rounded-2xl border border-border bg-slate-50 dark:bg-black/10 min-h-[380px] space-y-4">
                    <div className="flex justify-between items-center border-b pb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        {stage === "incoming" && "Incoming Lead"}
                        {stage === "meeting" && "Meeting Scheduled"}
                        {stage === "proposal" && "Proposal Sent"}
                        {stage === "closed" && "Closed / Won"}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 bg-border rounded-full font-bold">
                        {leads.filter((l) => l.stage === stage).length}
                      </span>
                    </div>

                    <div className="space-y-3">
                      {leads
                        .filter((l) => l.stage === stage)
                        .map((lead) => (
                          <div
                            key={lead.id}
                            onClick={() => setSelectedLead(lead)}
                            className="p-3.5 rounded-xl border border-border bg-card shadow-sm hover:border-primary cursor-pointer transition-all space-y-3"
                          >
                            <div className="flex justify-between items-start gap-1">
                              <h4 className="text-xs font-bold text-foreground truncate">{lead.name}</h4>
                              <span className="text-[10px] text-emerald-500 font-bold shrink-0">{lead.value}</span>
                            </div>

                            <div className="flex justify-between items-center text-[10px] text-muted-foreground">
                              <span>Probability: <strong className="text-primary">{lead.probability}%</strong></span>
                              <span className="flex items-center gap-0.5"><MapPin className="w-2.5 h-2.5" /> GPS</span>
                            </div>

                            {/* Control Shift */}
                            <div className="flex justify-between gap-1 pt-1">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  shiftLeadStage(lead.id, "prev");
                                }}
                                disabled={stage === "incoming"}
                                className="px-2 py-0.5 text-[9px] border rounded disabled:opacity-30 hover:bg-slate-100 dark:hover:bg-slate-800"
                              >
                                ◀
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  shiftLeadStage(lead.id, "next");
                                }}
                                disabled={stage === "closed"}
                                className="px-2 py-0.5 text-[9px] border rounded disabled:opacity-30 hover:bg-slate-100 dark:hover:bg-slate-800"
                              >
                                ▶
                              </button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* CRM Lead details and Add Lead */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4">
                {/* Add lead form */}
                <form onSubmit={handleAddLead} className="p-6 rounded-2xl border border-border bg-card shadow-sm space-y-4">
                  <h3 className="text-sm font-bold font-display">Provision New Pipeline Lead</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] text-muted-foreground font-semibold" htmlFor="lead-name">Lead Account Name</label>
                      <input
                        id="lead-name"
                        type="text"
                        placeholder="Saudi Distributors"
                        value={newLeadName}
                        onChange={(e) => setNewLeadName(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs glass-input focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] text-muted-foreground font-semibold" htmlFor="lead-value">Deal Value ($)</label>
                      <input
                        id="lead-value"
                        type="text"
                        placeholder="$24,000"
                        value={newLeadValue}
                        onChange={(e) => setNewLeadValue(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs glass-input focus:outline-none"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary hover:opacity-90 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 ml-auto"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Lead
                  </button>
                </form>

                {/* Selected Lead details */}
                <div className="p-6 rounded-2xl border border-border bg-card shadow-sm space-y-3">
                  <h3 className="text-sm font-bold font-display">Lead Activity & AI Checkpoint</h3>
                  {selectedLead ? (
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <strong className="text-foreground">{selectedLead.name}</strong>
                        <span className="text-emerald-500 font-bold">{selectedLead.value}</span>
                      </div>
                      <p className="text-[10px] text-muted-foreground">Coordinates visit log: {selectedLead.coordinates}</p>
                      <hr className="border-border opacity-50" />
                      <div className="bg-primary/5 p-3 rounded-lg border border-primary/10">
                        <p className="text-[10px] font-bold text-primary flex items-center gap-1"><Sparkles className="w-3.5 h-3.5" /> AI Meeting Summary:</p>
                        <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">{selectedLead.summary}</p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground">Select a lead card above to view coordinate logs and AI meeting transcript summaries.</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: UNIFIED INBOX */}
          {activeTab === "inbox" && (
            <div className="space-y-6 animate-fade-in text-left">
              <div>
                <h1 className="text-2xl font-bold font-display text-foreground">{t("inbox")}</h1>
                <p className="text-xs text-muted-foreground">Control customer support requests from Meta API and web chat interfaces.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 rounded-2xl border border-border overflow-hidden bg-white dark:bg-[#0c1220] h-[500px]">
                {/* Channels selection */}
                <div className="col-span-1 border-r border-border p-4 space-y-4">
                  <h3 className="text-xs font-bold text-muted uppercase tracking-wider">Communication Channels</h3>
                  <div className="space-y-2">
                    {[
                      { id: "whatsapp", title: "WhatsApp Business API", num: "2 msgs", icon: MessageCircle, color: "text-emerald-500 bg-emerald-500/10" },
                      { id: "livechat", title: "Web Live Chat", num: "1 msg", icon: MessageSquare, color: "text-primary bg-primary/10" },
                      { id: "messenger", title: "FB Messenger", num: "0 msgs", icon: Globe, color: "text-blue-500 bg-blue-500/10" },
                    ].map((chan) => {
                      const Icon = chan.icon;
                      return (
                        <button
                          key={chan.id}
                          onClick={() => setSelectedChat(chan.id as any)}
                          className={`w-full text-left p-3 rounded-xl border flex items-center justify-between transition-all ${
                            selectedChat === chan.id
                              ? "border-primary bg-primary/5"
                              : "border-transparent hover:bg-black/5 dark:hover:bg-white/5"
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${chan.color}`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-foreground leading-none">{chan.title}</p>
                              <p className="text-[10px] text-muted-foreground mt-1">API Node Active</p>
                            </div>
                          </div>
                          <span className="text-[9px] bg-border px-1.5 py-0.5 rounded-full font-bold">{chan.num}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Conversation view */}
                <div className="col-span-2 flex flex-col justify-between h-full bg-slate-50/50 dark:bg-black/10">
                  {/* Chat logs */}
                  <div className="p-6 overflow-y-auto flex-grow space-y-4 max-h-[340px]">
                    {chatMessages[selectedChat]?.map((msg, idx) => (
                      <div key={idx} className={`p-3 rounded-xl max-w-[75%] text-xs ${
                        msg.sender === "agent"
                          ? "bg-primary text-white ml-auto"
                          : "bg-card border border-border text-foreground"
                      }`}>
                        <p className="leading-relaxed">{msg.text}</p>
                      </div>
                    ))}
                    {chatMessages[selectedChat]?.length === 0 && (
                      <p className="text-xs text-muted-foreground text-center py-10">No messages in this pipeline yet.</p>
                    )}
                  </div>

                  {/* AI recommendations and Input */}
                  <div className="p-4 border-t border-border bg-white dark:bg-[#0c1220] space-y-3">
                    {/* Suggestions */}
                    <div className="flex flex-wrap gap-2 items-center">
                      <span className="text-[9px] font-bold text-primary flex items-center gap-1 shrink-0"><Sparkles className="w-3 h-3" /> AI Recommend:</span>
                      {aiSuggestions[selectedChat]?.map((sug, idx) => (
                        <button
                          key={idx}
                          onClick={() => setInboxInput(sug)}
                          className="px-2.5 py-1 bg-primary/5 hover:bg-primary/10 text-primary border border-primary/10 rounded-lg text-[10px] font-medium truncate max-w-xs"
                        >
                          {sug}
                        </button>
                      ))}
                    </div>

                    <form onSubmit={handleSendInboxMessage} className="flex gap-2">
                      <input
                        type="text"
                        value={inboxInput}
                        onChange={(e) => setInboxInput(e.target.value)}
                        placeholder="Write support reply..."
                        className="flex-grow pl-3 pr-2 py-2 text-xs rounded-xl border border-border glass-input"
                      />
                      <button
                        type="submit"
                        className="px-4 bg-primary hover:opacity-90 text-white rounded-xl text-xs font-semibold flex items-center justify-center shrink-0"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: AI VOICE PLATFORM (Dialer) */}
          {activeTab === "voice" && (
            <div className="space-y-6 animate-fade-in text-left">
              <div>
                <h1 className="text-2xl font-bold font-display text-foreground">{t("voice")}</h1>
                <p className="text-xs text-muted-foreground">Monitor and trigger simulated AI voice agent connections.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* VoIP Console widget */}
                <div className="lg:col-span-2 p-6 rounded-2xl border border-border bg-card shadow-sm text-center space-y-6">
                  <div className="flex justify-between items-center border-b pb-3">
                    <span className="text-sm font-bold flex items-center gap-2"><PhoneCall className="w-4 h-4 text-primary" /> AI VoIP Simulator</span>
                    <span className="text-xs font-mono bg-slate-100 dark:bg-slate-800 text-muted px-2 py-0.5 rounded">Endpoint: voice.sellgrow.io</span>
                  </div>

                  {voiceCallState === "idle" && (
                    <div className="py-12 space-y-4">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto text-primary">
                        <PhoneCall className="w-8 h-8" />
                      </div>
                      <p className="text-xs text-muted-foreground max-w-sm mx-auto leading-normal">
                        Click below to test out the AI voice agent dialer. This uses the browser&apos;s speech synthesizer to read agent lines out loud.
                      </p>
                      <button
                        onClick={handleStartVoiceCall}
                        className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl"
                      >
                        Connect & Dial Voice Agent
                      </button>
                    </div>
                  )}

                  {voiceCallState === "ringing" && (
                    <div className="py-12 space-y-4 animate-pulse">
                      <div className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center mx-auto text-white">
                        <PhoneCall className="w-8 h-8" />
                      </div>
                      <p className="text-xs font-bold text-emerald-500">Establishing WebRTC channel...</p>
                    </div>
                  )}

                  {voiceCallState === "active" && (
                    <div className="space-y-6">
                      {/* Active wave */}
                      <div className="flex items-center justify-center gap-1.5 h-8">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                          <span
                            key={i}
                            className="sound-bar"
                            style={{
                              animationPlayState: isVoiceSpeaking ? "running" : "paused",
                              height: isVoiceSpeaking ? "100%" : "20%",
                            }}
                          />
                        ))}
                      </div>

                      {/* Transcripts scroll */}
                      <div className="bg-slate-50 dark:bg-black/20 p-4 rounded-xl border border-border max-h-[180px] overflow-y-auto space-y-2 text-xs text-left">
                        {voiceTranscripts.map((t, idx) => (
                          <div key={idx} className={`p-2 rounded-lg ${t.sender === "ai" ? "bg-primary/10 text-foreground" : "bg-emerald-500/10 text-foreground"}`}>
                            <strong className="text-[10px] block uppercase text-muted-foreground">{t.sender === "ai" ? "Agent Dial" : "Operator (You)"}</strong>
                            <p className="mt-0.5 leading-relaxed">{t.text}</p>
                          </div>
                        ))}
                      </div>

                      {/* Manual text speech choices */}
                      <div className="text-left space-y-2">
                        <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Select Response choice:</p>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <button
                            onClick={() => handleVoiceResponse("What is the average latency of this system?", "WebRTC channels connect with average peer-to-peer latency around 120ms.")}
                            className="flex-grow text-left px-3 py-2 border rounded-xl text-xs hover:bg-black/5 dark:hover:bg-white/5"
                          >
                            &quot;System latency?&quot;
                          </button>
                          <button
                            onClick={() => handleVoiceResponse("Do we have call logs and reports?", "Yes! Every single completed voice agent call compiles records, summaries, and transcripts.")}
                            className="flex-grow text-left px-3 py-2 border rounded-xl text-xs hover:bg-black/5 dark:hover:bg-white/5"
                          >
                            &quot;Call logs/records?&quot;
                          </button>
                        </div>
                      </div>

                      <button
                        onClick={handleEndVoiceCall}
                        className="w-full flex items-center justify-center gap-2 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-semibold"
                      >
                        <PhoneOff className="w-4 h-4" /> End Active Call
                      </button>
                    </div>
                  )}

                  {voiceCallState === "ended" && (
                    <div className="py-12 space-y-4">
                      <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto text-red-500">
                        <PhoneOff className="w-8 h-8" />
                      </div>
                      <p className="text-xs font-bold text-red-500">Call Finished. Data synced to CRM.</p>
                    </div>
                  )}
                </div>

                {/* Call Analytics log logs */}
                <div className="p-6 rounded-2xl border border-border bg-card shadow-sm space-y-4">
                  <h3 className="text-sm font-bold font-display border-b pb-2">Recent Call Logs</h3>
                  <div className="space-y-3 text-xs">
                    {[
                      { num: "+966 50 123 4567", time: "10 mins ago", stat: "Accepted", duration: "1m 45s", summary: "Acme Corp requested invoice." },
                      { num: "+91 98765 43210", time: "1 hour ago", stat: "Missed", duration: "0s", summary: "Callback trigger created in workflow." },
                      { num: "+1 (555) 987-6543", time: "Yesterday", stat: "Accepted", duration: "3m 12s", summary: "German Textile requested SIP trunk details." }
                    ].map((call, idx) => (
                      <div key={idx} className="p-3 border rounded-xl space-y-1.5">
                        <div className="flex justify-between font-bold">
                          <span>{call.num}</span>
                          <span className={call.stat === "Missed" ? "text-red-500" : "text-emerald-500"}>{call.stat}</span>
                        </div>
                        <div className="flex justify-between text-[10px] text-muted-foreground">
                          <span>{call.time}</span>
                          <span>{call.duration}</span>
                        </div>
                        <p className="text-[10px] text-muted-foreground border-t pt-1 border-dashed mt-1">{call.summary}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: VISUAL WORKFLOW BUILDER */}
          {activeTab === "workflow" && (
            <div className="space-y-6 animate-fade-in text-left">
              <div>
                <h1 className="text-2xl font-bold font-display text-foreground">{t("workflow")}</h1>
                <p className="text-xs text-muted-foreground">Design automated pipelines connecting triggers, delays, and integrations.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Node display visualizer */}
                <div className="lg:col-span-2 p-6 rounded-2xl border border-border bg-card shadow-sm space-y-6">
                  <h3 className="text-sm font-bold font-display border-b pb-2">Visual Automation Pipeline Diagram</h3>

                  <div className="flex flex-col items-center space-y-4 relative py-6">
                    {workflowNodes.map((node, index) => (
                      <React.Fragment key={node.id}>
                        {index > 0 && (
                          <div className="w-0.5 h-6 bg-primary/30 dark:bg-primary/20 border-dashed border flex items-center justify-center font-mono text-[9px] text-muted">
                            ↓
                          </div>
                        )}
                        <div className="w-full max-w-sm p-4 rounded-xl border border-border bg-white dark:bg-[#0c1220] flex items-center justify-between gap-3 shadow-sm hover:border-primary transition-all">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                              node.type === "trigger" ? "bg-blue-500/10 text-blue-500" :
                              node.type === "delay" ? "bg-amber-500/10 text-amber-500" :
                              "bg-purple-500/10 text-purple-500"
                            }`}>
                              {node.type === "trigger" ? <Plus className="w-4 h-4" /> :
                               node.type === "delay" ? <Activity className="w-4 h-4" /> :
                               <Workflow className="w-4 h-4" />}
                            </div>
                            <div className="text-xs">
                              <p className="font-bold text-foreground">{node.label}</p>
                              <p className="text-[10px] text-muted-foreground mt-0.5">{node.details}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => setWorkflowNodes(workflowNodes.filter(n => n.id !== node.id))}
                            className="p-1 rounded hover:bg-red-500/10 text-muted-foreground hover:text-red-500 transition-colors"
                            aria-label="Remove node"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* Add block node form */}
                <form onSubmit={handleAddWorkflowNode} className="p-6 rounded-2xl border border-border bg-card shadow-sm space-y-4 h-fit">
                  <h3 className="text-sm font-bold font-display">Configure Automation Step</h3>

                  <div className="space-y-1">
                    <label className="text-[10px] text-muted-foreground font-semibold" htmlFor="node-type">Node Behavior Type</label>
                    <select
                      id="node-type"
                      value={newNodeType}
                      onChange={(e) => setNewNodeType(e.target.value as any)}
                      className="w-full px-3 py-2 text-xs glass-input focus:outline-none cursor-pointer"
                    >
                      <option value="trigger" className="bg-[#0c1220]">Trigger (Start Chain)</option>
                      <option value="delay" className="bg-[#0c1220]">Delay / Wait Timer</option>
                      <option value="action" className="bg-[#0c1220]">Action Node (CRM / VoIP / Webhook)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-muted-foreground font-semibold" htmlFor="node-title">Step Title</label>
                    <input
                      id="node-title"
                      type="text"
                      placeholder="e.g. Sync Shopify Store"
                      value={newNodeLabel}
                      onChange={(e) => setNewNodeLabel(e.target.value)}
                      className="w-full px-3 py-2 text-xs glass-input focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-muted-foreground font-semibold" htmlFor="node-details">Execution Details</label>
                    <input
                      id="node-details"
                      type="text"
                      placeholder="e.g. Delay execution for 10 minutes"
                      value={newNodeDetails}
                      onChange={(e) => setNewNodeDetails(e.target.value)}
                      className="w-full px-3 py-2 text-xs glass-input focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2 bg-primary hover:opacity-90 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" /> Append Step Node
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* TAB 6: PRODUCT CATALOGUE */}
          {activeTab === "catalogue" && (
            <div className="space-y-6 animate-fade-in text-left">
              <div>
                <h1 className="text-2xl font-bold font-display text-foreground">{t("catalogue")}</h1>
                <p className="text-xs text-muted-foreground">Manage variants, specifications, QR codes, and PDF brochure configurations.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { name: "Commercial EV Charger", sku: "EV-CH-22KW", price: "$2,400", variants: "2 Variants", brochure: "ev_charger_manual.docx" },
                  { name: "Smart Retail POS System", sku: "POS-RT-400", price: "$590", variants: "Single Variant", brochure: "pos_guide.pdf" },
                  { name: "3-Phase Power Inverter", sku: "INV-3PH-10K", price: "$1,850", variants: "4 Variants", brochure: "inverter_spec.pdf" }
                ].map((item, idx) => (
                  <div key={idx} className="p-5 rounded-2xl border border-border bg-card shadow-sm space-y-4">
                    <div className="flex justify-between items-start gap-1">
                      <div>
                        <h4 className="text-sm font-bold text-foreground truncate">{item.name}</h4>
                        <p className="text-[10px] text-muted-foreground font-mono mt-0.5">SKU: {item.sku}</p>
                      </div>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded font-mono font-semibold">{item.variants}</span>
                    </div>

                    <div className="flex justify-between items-center text-xs">
                      <span>Inventory Value:</span>
                      <strong className="text-emerald-500 font-display text-sm">{item.price}</strong>
                    </div>

                    <hr className="border-border opacity-50" />

                    <div className="flex gap-2">
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          alert(`Downloading PDF brochure template for ${item.brochure}`);
                        }}
                        className="flex-grow text-center py-2 border rounded-xl text-xs hover:bg-black/5 dark:hover:bg-white/5 font-semibold text-muted-foreground hover:text-foreground flex items-center justify-center gap-1"
                      >
                        <FileText className="w-3.5 h-3.5" /> Brochure PDF
                      </a>
                      <button
                        onClick={() => alert(`Generated Dynamic QR Code matching product variants routing to: https://sellgrow.io/product/${item.sku.toLowerCase()}`)}
                        className="p-2 border rounded-xl hover:bg-black/5 dark:hover:bg-white/5 text-muted-foreground hover:text-foreground"
                        aria-label="Generate QR Code"
                      >
                        <Globe className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: KNOWLEDGE BASE (RAG Vector Database) */}
          {activeTab === "rag" && (
            <div className="space-y-6 animate-fade-in text-left">
              <div>
                <h1 className="text-2xl font-bold font-display text-foreground">{t("rag")}</h1>
                <p className="text-xs text-muted-foreground">Upload reference sources to compile semantic indices mapped to AI reply interfaces.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Upload & Files list */}
                <div className="lg:col-span-2 space-y-6">
                  {/* File List */}
                  <div className="p-6 rounded-2xl border border-border bg-card shadow-sm space-y-4">
                    <h3 className="text-sm font-bold font-display border-b pb-2">Vector Indexed Documents</h3>
                    <div className="space-y-3">
                      {ragFiles.map((file, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 border rounded-xl text-xs">
                          <div className="flex items-center gap-3">
                            <FileText className="w-4 h-4 text-primary shrink-0" />
                            <div>
                              <p className="font-bold text-foreground">{file.name}</p>
                              <p className="text-[10px] text-muted-foreground mt-0.5">Chunks: {file.chunks} | Size: {file.size}</p>
                            </div>
                          </div>
                          <span className="text-[10px] text-muted-foreground">Uploaded: {file.date}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Live RAG Vector Search Tester */}
                <div className="p-6 rounded-2xl border border-border bg-card shadow-sm space-y-4 h-fit">
                  <h3 className="text-sm font-bold font-display">Semantic RAG Search Sandbox</h3>
                  <p className="text-[10px] text-muted-foreground">Type a prompt to query the mock vector indexes. Use keywords like &quot;refund&quot;, &quot;ev&quot;, or &quot;arabic&quot;.</p>

                  <form onSubmit={handleRagSearch} className="relative">
                    <input
                      type="text"
                      value={ragQuery}
                      onChange={(e) => setRagQuery(e.target.value)}
                      placeholder="Search vector documents..."
                      className="w-full pl-9 pr-3 py-2 text-xs glass-input focus:outline-none"
                    />
                    <Search className="w-3.5 h-3.5 text-muted absolute left-3 top-3" />
                  </form>

                  {ragResult && (
                    <div className="p-3.5 border border-primary/20 bg-primary/5 rounded-xl space-y-2 text-xs">
                      <div className="flex justify-between items-center text-[10px] font-mono text-muted-foreground font-bold">
                        <span>Confidence: <strong className="text-primary">{(ragResult.confidence * 100).toFixed(0)}%</strong></span>
                        <span>{ragResult.source}</span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed text-[11px]">{ragResult.answer}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: BUSINESS ANALYTICS */}
          {activeTab === "analytics" && (
            <div className="space-y-6 animate-fade-in text-left">
              <div>
                <h1 className="text-2xl font-bold font-display text-foreground">{t("analytics")}</h1>
                <p className="text-xs text-muted-foreground">Track ROI conversions, AI support logs, and VoIP reception stats.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* SVG Revenue Line Graph */}
                <div className="p-6 rounded-2xl border border-border bg-card shadow-sm space-y-4">
                  <h3 className="text-sm font-bold font-display">Sales Performance Conversion ($)</h3>
                  <div className="relative h-48 w-full pt-4">
                    <svg className="w-full h-full" viewBox="0 0 400 150">
                      {/* Grid Lines */}
                      <line x1="0" y1="30" x2="400" y2="30" stroke="rgba(148, 163, 184, 0.1)" strokeWidth="1" />
                      <line x1="0" y1="75" x2="400" y2="75" stroke="rgba(148, 163, 184, 0.1)" strokeWidth="1" />
                      <line x1="0" y1="120" x2="400" y2="120" stroke="rgba(148, 163, 184, 0.1)" strokeWidth="1" />

                      {/* Smooth Path Graph */}
                      <path
                        d="M 10 130 C 80 120, 100 80, 160 90 C 220 100, 280 40, 390 15"
                        fill="none"
                        stroke="url(#brand-grad)"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                      />

                      {/* Gradients */}
                      <defs>
                        <linearGradient id="brand-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="var(--primary)" />
                          <stop offset="100%" stopColor="var(--secondary)" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="flex justify-between text-[10px] text-muted-foreground mt-2 px-1">
                      <span>Jan</span>
                      <span>Mar</span>
                      <span>May</span>
                      <span>Jul (Current)</span>
                    </div>
                  </div>
                </div>

                {/* AI Resolution Deflection ROI Bar */}
                <div className="p-6 rounded-2xl border border-border bg-card shadow-sm space-y-4">
                  <h3 className="text-sm font-bold font-display">AI Helpdesk Deflection Rate (%)</h3>
                  <div className="space-y-4">
                    {[
                      { chan: "WhatsApp Autoreply", val: 88 },
                      { chan: "Website Chatbot RAG", val: 92 },
                      { chan: "VoIP AI Receptionist", val: 78 }
                    ].map((bar, idx) => (
                      <div key={idx} className="space-y-1.5">
                        <div className="flex justify-between text-xs font-semibold">
                          <span>{bar.chan}</span>
                          <span className="text-primary">{bar.val}% Deflected</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full" style={{ width: `${bar.val}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
