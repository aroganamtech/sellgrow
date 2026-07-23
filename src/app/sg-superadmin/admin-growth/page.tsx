"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  DollarSign,
  Zap,
  Server,
  Activity,
  Settings,
  FileText,
  Search,
  RefreshCw,
  ToggleLeft,
  ToggleRight,
  Sparkles,
  LayoutDashboard,
  Terminal,
  CreditCard,
  Cpu,
  User,
  LogOut,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Check,
  AlertTriangle,
  ShieldCheck,
  ArrowRight,
  ShieldAlert,
  Key,
  Globe,
  Plus,
  Trash,
  Sliders,
  Database,
  Lock,
  Mail,
  Smartphone,
  Info,
  ExternalLink,
  Crown,
  Sun,
  Moon,
  Edit,
  ChevronDown,
  Package,
  Camera,
  Trash2,
  ImageIcon
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import Logo from "@/components/layout/Logo";

// Interfaces
interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: "User" | "Admin" | "SuperAdmin";
  region: "India" | "International";
  status: "Active" | "Suspended";
  plan: "Starter" | "Professional" | "Enterprise";
  joined: string;
  usage: number; // AI execution count
}

interface TransactionRecord {
  id: string;
  clientName: string;
  amount: string;
  status: "Succeeded" | "Processing" | "Failed";
  date: string;
  gateway: "Razorpay" | "Stripe";
}

interface ServiceItem {
  id: string;
  name: string;
  description: string;
  status: "Active" | "Inactive" | "Maintenance";
  successRate: number;
  latency: number; // ms
  requests24h: number;
  features?: string[];
  priceMonthlyINR?: number;
  priceMonthlyUSD?: number;
  priceYearlyINR?: number;
  priceYearlyUSD?: number;
}

const getDefaultPrices = (name: string, id: string) => {
  const norm = (name || "").toLowerCase();
  if (norm.includes("whatsapp")) {
    return { mINR: 1999, mUSD: 29, yINR: 19999, yUSD: 299 };
  }
  if (norm.includes("website creation") || norm.includes("creation")) {
    return { mINR: 4999, mUSD: 69, yINR: 49999, yUSD: 699 };
  }
  if (norm.includes("website view")) {
    return { mINR: 999, mUSD: 15, yINR: 9999, yUSD: 149 };
  }
  if (norm.includes("app view")) {
    return { mINR: 1499, mUSD: 19, yINR: 14999, yUSD: 199 };
  }
  if (norm.includes("ai bot")) {
    return { mINR: 2999, mUSD: 39, yINR: 29999, yUSD: 399 };
  }
  if (norm.includes("3d")) {
    return { mINR: 3999, mUSD: 59, yINR: 39999, yUSD: 599 };
  }
  if (norm.includes("crm") || norm.includes("sells")) {
    return { mINR: 2499, mUSD: 35, yINR: 24999, yUSD: 349 };
  }
  if (norm.includes("marketing")) {
    return { mINR: 1999, mUSD: 29, yINR: 19999, yUSD: 299 };
  }
  if (norm.includes("borcher") || norm.includes("brochure")) {
    return { mINR: 799, mUSD: 10, yINR: 7999, yUSD: 99 };
  }
  if (norm.includes("logo")) {
    return { mINR: 499, mUSD: 7, yINR: 4999, yUSD: 69 };
  }
  if (norm.includes("social")) {
    return { mINR: 1199, mUSD: 16, yINR: 11999, yUSD: 159 };
  }
  return { mINR: 999, mUSD: 15, yINR: 9999, yUSD: 149 };
};

const getDefaultFeatures = (name: string, id: string): string[] => {
  const norm = (name || "").toLowerCase();
  if (norm.includes("whatsapp")) {
    return ["Official Meta API Broadcasts", "Unified Shared Agent Inbox"];
  }
  if (norm.includes("website view")) {
    return ["Live Client Traffic Tracking", "Active Sessions Dashboard"];
  }
  if (norm.includes("app view")) {
    return ["Mobile App Interface Logs", "Native Session Tracker"];
  }
  if (norm.includes("ai bot")) {
    return ["Generative AI Customer Agent", "Smart Context Responses"];
  }
  if (norm.includes("3d")) {
    return ["Immersive 3D Model Rendering", "Interactive WebGL Component"];
  }
  if (norm.includes("crm") || norm.includes("sells")) {
    return ["Lead Conversion Pipeline", "Real-time Analytics Tracker"];
  }
  if (norm.includes("marketing")) {
    return ["SEO Performance Metrics", "Multi-Channel Ad Monitoring"];
  }
  if (norm.includes("website creation") || norm.includes("creation")) {
    return ["Automated Premium Layouts", "High-Speed Page Builder"];
  }
  if (norm.includes("borcher") || norm.includes("brochure")) {
    return ["Dynamic Digital Brochures", "Exportable PDF Catalogs"];
  }
  if (norm.includes("logo")) {
    return ["High-Res Vector Formats", "Smart Brand Identity Builder"];
  }
  if (norm.includes("social")) {
    return ["Scheduled Auto-Posting Engine", "Cross-Platform Feed Sync"];
  }
  return ["Custom Feature Trigger Integration", "API Endpoint Microservice"];
};

// Initial Mock Data
const initialClientsList: UserRecord[] = [
  { id: "usr_101", name: "Rahul Sharma", email: "rahul@techcorp.in", role: "Admin", region: "India", status: "Active", plan: "Enterprise", joined: "2026-06-12", usage: 450 },
  { id: "usr_102", name: "Sarah Jenkins", email: "sarah@globalmark.com", role: "User", region: "International", status: "Active", plan: "Professional", joined: "2026-06-18", usage: 220 },
  { id: "usr_103", name: "Vikram Patel", email: "vikram@sellgrow.in", role: "SuperAdmin", region: "India", status: "Active", plan: "Enterprise", joined: "2026-05-01", usage: 890 },
  { id: "usr_104", name: "Alex Chen", email: "alex.chen@innovate.io", role: "User", region: "International", status: "Active", plan: "Starter", joined: "2026-07-02", usage: 80 },
  { id: "usr_105", name: "Priya Sundaram", email: "priya@retailhub.in", role: "User", region: "India", status: "Suspended", plan: "Professional", joined: "2026-07-10", usage: 310 },
  { id: "usr_106", name: "John Doe", email: "john@techventures.co", role: "User", region: "International", status: "Active", plan: "Professional", joined: "2026-07-15", usage: 140 },
  { id: "usr_107", name: "Ananya Iyer", email: "ananya@fintechscale.in", role: "Admin", region: "India", status: "Active", plan: "Enterprise", joined: "2026-07-20", usage: 600 }
];

const initialTransactions: TransactionRecord[] = [
  { id: "tx_901", clientName: "Rahul Sharma", amount: "₹45,000", status: "Succeeded", date: "2026-07-22 14:32", gateway: "Razorpay" },
  { id: "tx_902", clientName: "Sarah Jenkins", amount: "$149", status: "Succeeded", date: "2026-07-22 09:15", gateway: "Stripe" },
  { id: "tx_903", clientName: "Alex Chen", amount: "$49", status: "Succeeded", date: "2026-07-21 18:40", gateway: "Stripe" },
  { id: "tx_904", clientName: "Priya Sundaram", amount: "₹9,999", status: "Failed", date: "2026-07-20 11:22", gateway: "Razorpay" },
  { id: "tx_905", clientName: "John Doe", amount: "$149", status: "Processing", date: "2026-07-23 05:10", gateway: "Stripe" },
  { id: "tx_906", clientName: "Ananya Iyer", amount: "₹45,000", status: "Succeeded", date: "2026-07-20 10:00", gateway: "Razorpay" }
];

const initialServices: ServiceItem[] = [
  { id: "srv_1", name: "WhatsApp business", description: "WhatsApp Business API gateway and chat broadcast engine", status: "Active", successRate: 99.1, latency: 45, requests24h: 12580 },
  { id: "srv_2", name: "Website View", description: "Live tracking of client web traffic and active sessions dashboard", status: "Active", successRate: 99.8, latency: 15, requests24h: 32050 },
  { id: "srv_3", name: "App view", description: "Mobile application interface logs and native session tracker", status: "Active", successRate: 98.6, latency: 22, requests24h: 18450 },
  { id: "srv_4", name: "AI Bot", description: "Generative AI customer service assistant bot for apps and websites", status: "Active", successRate: 97.4, latency: 180, requests24h: 5410 },
  { id: "srv_5", name: "3D View", description: "Immersive 3D model visualization and rendering engine component", status: "Active", successRate: 95.0, latency: 120, requests24h: 890 },
  { id: "srv_6", name: "Sells CRM", description: "Sales pipeline tracking, lead conversion analytics, and CRM dashboard", status: "Active", successRate: 99.5, latency: 35, requests24h: 7430 },
  { id: "srv_7", name: "Digital Marketing", description: "SEO metrics tracking, ad campaign monitoring, and marketing suite", status: "Active", successRate: 99.0, latency: 60, requests24h: 15400 },
  { id: "srv_8", name: "Website Creation", description: "Automated premium landing page generation and builder engine", status: "Active", successRate: 99.2, latency: 110, requests24h: 2150 },
  { id: "srv_9", name: "Borcher", description: "Brochure creator, brand material generation, and catalog PDF builder", status: "Active", successRate: 96.5, latency: 140, requests24h: 1200 },
  { id: "srv_10", name: "Logo", description: "Branding asset builder, vector logo designs generator, and asset hosting", status: "Active", successRate: 98.9, latency: 85, requests24h: 4620 },
  { id: "srv_11", name: "Social Media", description: "Social platforms auto-posting gateway and feed synchronization engine", status: "Active", successRate: 97.2, latency: 95, requests24h: 8950 }
];

export default function AdminGrowthPage() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Sidebar Layout States
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Navigation state (Sidebar options)
  const [activeView, setActiveView] = useState<
    "dashboard" | "sub-admins" | "clients" | "payments" | "services" | "settings" | "profile" | "control-flags"
  >("dashboard");

  // Team management states
  const [teamMembers, setTeamMembers] = useState([
    { id: "tm-1", name: "Naveen S", email: "naveen@sellgrow.co", role: "SuperAdmin", status: "Active", permissions: "Full Access", password: "sellgrow123" },
    { id: "tm-2", name: "Operator Main", email: "operator@sellgrow.co", role: "Operator", status: "Active", permissions: "Read/Write", password: "sellgrow123" },
    { id: "tm-3", name: "AI Dev Team", email: "ai-dev@sellgrow.co", role: "Developer", status: "Active", permissions: "Read/Write", password: "sellgrow123" },
    { id: "tm-4", name: "Support Agent", email: "support@sellgrow.co", role: "Support", status: "Active", permissions: "Read Only", password: "sellgrow123" },
  ]);
  const [newTeamMemberName, setNewTeamMemberName] = useState("");
  const [newTeamMemberEmail, setNewTeamMemberEmail] = useState("");
  const [newTeamMemberRole, setNewTeamMemberRole] = useState("Operator");
  const [teamsActiveSubTab, setTeamsActiveSubTab] = useState<"sub-admin" | "employees">("sub-admin");
  const [employees, setEmployees] = useState([
    { id: "emp-1", name: "Naveen S", email: "717824i605@kce.in.ac", work: "Voice AI Integration", status: "Active", access: "Full Access", assignedSubAdmin: "Operator Main" },
    { id: "emp-2", name: "Karthik R", email: "karthik@sellgrow.co", work: "CRM Automation", status: "Active", access: "Read & Write", assignedSubAdmin: "AI Dev Team" },
    { id: "emp-3", name: "Priya K", email: "priya@sellgrow.co", work: "Landing Page Editor", status: "Active", access: "View Only", assignedSubAdmin: "Support Agent" },
    { id: "emp-4", name: "Amit Shah", email: "amit@sellgrow.co", work: "Customer Support", status: "Suspended", access: "View Only", assignedSubAdmin: "Unassigned" },
  ]);

  const [invitationSuccessModal, setInvitationSuccessModal] = useState<{
    name: string;
    email: string;
    role: string;
    tempPass: string;
    loginUrl: string;
  } | null>(null);

  const handleUpdateEmployee = (id: string, field: string, value: string) => {
    setEmployees(employees.map(emp => emp.id === id ? { ...emp, [field]: value } : emp));

    fetch("/api/admin/employees", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, [field]: value })
    }).catch(console.error);
  };

  const handleInviteTeamMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTeamMemberName || !newTeamMemberEmail) return;

    // Generate temporary password & login URL slug
    const tempPass = "sg_temp_" + Math.random().toString(36).substring(2, 8);
    const roleSlug = newTeamMemberRole === "SuperAdmin" ? "superadmin" : newTeamMemberRole.toLowerCase();
    const loginUrl = window.location.origin + "/sg-admin/" + roleSlug;

    const newMemberDoc = {
      name: newTeamMemberName,
      email: newTeamMemberEmail,
      role: newTeamMemberRole,
      status: "Active",
      permissions: newTeamMemberRole === "SuperAdmin" ? "Full Access" : newTeamMemberRole === "Developer" || newTeamMemberRole === "Manager" ? "Read/Write" : "Read Only",
      password: tempPass
    };

    fetch("/api/admin/team", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMemberDoc)
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setTeamMembers((prev) => [...prev, data.data]);
          
          setInvitationSuccessModal({
            name: newTeamMemberName,
            email: newTeamMemberEmail,
            role: newTeamMemberRole,
            tempPass,
            loginUrl
          });
        }
      })
      .catch(console.error);

    setNewTeamMemberName("");
    setNewTeamMemberEmail("");
  };

  const handleRemoveTeamMember = (id: string) => {
    fetch(`/api/admin/team?id=${id}`, { method: "DELETE" })
      .then(() => {
        setTeamMembers(teamMembers.filter(m => m.id !== id));
      })
      .catch(() => {
        setTeamMembers(teamMembers.filter(m => m.id !== id));
      });
  };

  const handleUpdateTeamMember = (id: string, field: string, value: string) => {
    setTeamMembers(teamMembers.map(m => m.id === id ? { ...m, [field]: value } : m));

    fetch("/api/admin/team", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, [field]: value })
    }).catch(console.error);
  };

  const handleAssignService = (memberId: string, serviceId: string, checked: boolean) => {
    setTeamMembers(prev => prev.map(m => {
      if (m.id !== memberId) return m;
      const current: string[] = (m as any).assignedServices || [];
      const updated = checked
        ? [...current.filter((s: string) => s !== serviceId), serviceId]
        : current.filter((s: string) => s !== serviceId);
      return { ...m, assignedServices: updated };
    }));
    const member = teamMembers.find(m => m.id === memberId);
    if (!member) return;
    const current: string[] = (member as any).assignedServices || [];
    const updated = checked
      ? [...current.filter((s: string) => s !== serviceId), serviceId]
      : current.filter((s: string) => s !== serviceId);
    fetch("/api/admin/team", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: memberId, assignedServices: updated })
    }).catch(console.error);
  };

  // Employee creation/deletion states & handlers
  const [newEmpName, setNewEmpName] = useState("");
  const [newEmpEmail, setNewEmpEmail] = useState("");
  const [newEmpWork, setNewEmpWork] = useState("Voice AI Integration");
  const [newEmpAccess, setNewEmpAccess] = useState("View Only");
  const [newEmpSubAdmin, setNewEmpSubAdmin] = useState("Unassigned");

  const handleCreateEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmpName || !newEmpEmail) return;

    const newEmpDoc = {
      name: newEmpName,
      email: newEmpEmail,
      work: newEmpWork,
      access: newEmpAccess,
      status: "Active",
      assignedSubAdmin: newEmpSubAdmin
    };

    fetch("/api/admin/employees", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEmpDoc)
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setEmployees((prev) => [...prev, data.data]);
          setNewEmpName("");
          setNewEmpEmail("");
          setNewEmpWork("Voice AI Integration");
          setNewEmpAccess("View Only");
          setNewEmpSubAdmin("Unassigned");
        }
      })
      .catch(console.error);
  };

  const handleDeleteEmployee = (id: string) => {
    fetch(`/api/admin/employees?id=${id}`, { method: "DELETE" })
      .then(() => {
        setEmployees(employees.filter(e => e.id !== id));
      })
      .catch(() => {
        setEmployees(employees.filter(e => e.id !== id));
      });
  };

  // Mock State Variables
  const [clients, setClients] = useState<UserRecord[]>(initialClientsList);
  const [transactions, setTransactions] = useState<TransactionRecord[]>(initialTransactions);
  const [services, setServices] = useState<ServiceItem[]>(initialServices);
  
  // Service management states
  const [showAddServiceForm, setShowAddServiceForm] = useState(false);
  const [newServiceName, setNewServiceName] = useState("");
  const [newServiceDesc, setNewServiceDesc] = useState("");
  const [newServiceSuccessRate, setNewServiceSuccessRate] = useState("99.0");
  const [newServiceLatency, setNewServiceLatency] = useState("50");
  const [newServiceRequests, setNewServiceRequests] = useState("1000");
  const [newServiceFeature1, setNewServiceFeature1] = useState("");
  const [newServiceFeature2, setNewServiceFeature2] = useState("");
  const [newPriceMonthlyINR, setNewPriceMonthlyINR] = useState("");
  const [newPriceMonthlyUSD, setNewPriceMonthlyUSD] = useState("");
  const [newPriceYearlyINR, setNewPriceYearlyINR] = useState("");
  const [newPriceYearlyUSD, setNewPriceYearlyUSD] = useState("");
  const [newServiceStatus, setNewServiceStatus] = useState<"Active" | "Inactive" | "Maintenance">("Active");

  // Editing state
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [editServiceName, setEditServiceName] = useState("");
  const [editServiceDesc, setEditServiceDesc] = useState("");
  const [editServiceSuccessRate, setEditServiceSuccessRate] = useState("99.0");
  const [editServiceLatency, setEditServiceLatency] = useState("50");
  const [editServiceRequests, setEditServiceRequests] = useState("1000");
  const [editServiceFeature1, setEditServiceFeature1] = useState("");
  const [editServiceFeature2, setEditServiceFeature2] = useState("");
  const [editPriceMonthlyINR, setEditPriceMonthlyINR] = useState("");
  const [editPriceMonthlyUSD, setEditPriceMonthlyUSD] = useState("");
  const [editPriceYearlyINR, setEditPriceYearlyINR] = useState("");
  const [editPriceYearlyUSD, setEditPriceYearlyUSD] = useState("");
  
  const [searchQuery, setSearchQuery] = useState("");
  const [clientPlanFilter, setClientPlanFilter] = useState("all");
  const [clientStatusFilter, setClientStatusFilter] = useState("all");

  const [featureFlags, setFeatureFlags] = useState({
    maintenanceMode: false,
    aiVoiceEnabled: true,
    whatsappEnabled: true,
    autoGeoIpEnabled: true,
    debugLogsEnabled: true,
    stripeLiveMode: true,
    razorpayLiveMode: true
  });

  const [systemSecretKey, setSystemSecretKey] = useState("sg_live_sec_789f2d119c836dbf4362a901");
  const [developerLogTerminalInput, setDeveloperLogTerminalInput] = useState("");
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    "SellGrow Diagnostic Control Terminal [v2.4.0]",
    "Initializing connection to backend gateway...",
    "Connected to api.sellgrow.co/v2 successfully.",
    "Type 'help' to list available developer diagnostics commands.",
    ""
  ]);

  // SLA Terms Mock Editor
  const [sgTermTab, setSgTermTab] = useState<"terminal" | "legal">("terminal");
  const [legalTermsType, setLegalTermsType] = useState<"tos" | "privacy" | "sla">("tos");
  const [legalTosContent, setLegalTosContent] = useState(
    "Welcome to SellGrow. These Terms of Service ('Terms') govern your access to and use of SellGrow's AI agent building suite, automated WhatsApp pipelines, and platform services. By using our website, you agree to comply with all local, state, and international regulations regarding digital communications and AI agent implementations. System abuse will lead to immediate key revocation."
  );
  const [legalPrivacyContent, setLegalPrivacyContent] = useState(
    "SellGrow is committed to user privacy. We secure all API key vaults, databases, and AI chat transcripts with AES-256 encryption. Telemetry reports, Geo-IP classification data, and communication logs are stored securely on authorized AWS instances. No PII is shared with outside third-party marketing firms."
  );
  const [legalSlaContent, setLegalSlaContent] = useState(
    "SellGrow guarantees a 99.9% uptime for core platform services including API gateways, WhatsApp triggers, and AI agent execution pipelines. SLA credits are calculated monthly. Maintenance operations are scheduled during low-traffic windows (2:00 AM - 4:00 AM IST) and announced 48 hours in advance."
  );
  const [saveToast, setSaveToast] = useState(false);

  // Sub Admin Sub-Tab state
  const [subAdminActiveTab, setSubAdminActiveTab] = useState<"sub-admins" | "employees">("sub-admins");
  const [openScopePopover, setOpenScopePopover] = useState<string | null>(null);

  // Profile fields state
  const [profileName, setProfileName] = useState("Admin Growth");
  const [profileEmail, setProfileEmail] = useState("admin@sellgrow.co");
  const [profilePasscode, setProfilePasscode] = useState("sellgrow123");
  const [profileAuthKey, setProfileAuthKey] = useState("Level-5 Master");
  const [profileAdminLevel, setProfileAdminLevel] = useState("Platform Creator");
  const [profileCountry, setProfileCountry] = useState("IN India HQ");
  const [superAdminId, setSuperAdminId] = useState<string | null>(null);

  const handleSaveProfile = () => {
    fetch("/api/admin/team", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: superAdminId || "superadmin",
        name: profileName,
        email: profileEmail,
        password: profilePasscode,
        authKey: profileAuthKey,
        adminLevel: profileAdminLevel,
        country: profileCountry
      })
    })
      .then((res) => res.json())
      .then((data) => {
        setSaveToast(true);
        setTimeout(() => setSaveToast(false), 3000);
        setTerminalHistory((prev) => [
          ...prev,
          `[${new Date().toLocaleTimeString()}] PROFILE: Super Admin profile saved & database updated.`
        ]);
        
        // Refresh team members
        fetch("/api/admin/team")
          .then((res) => res.json())
          .then((data) => {
            if (data.status === "success" && data.data) {
              setTeamMembers(data.data);
            }
          });
      })
      .catch(console.error);
  };

  // Profile image state
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const profileImageInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) return;
    if (file.size > 5 * 1024 * 1024) {
      alert('Image must be under 5MB');
      return;
    }
    setIsUploadingImage(true);
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = (reader.result as string).split(',')[1];
      const mimeType = file.type;
      // Preview immediately
      setProfileImage(`data:${mimeType};base64,${base64}`);
      // Persist to DB
      fetch('/api/admin/profile-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64: base64, mimeType }),
      })
        .then((res) => res.json())
        .then(() => {
          setIsUploadingImage(false);
          setTerminalHistory((prev) => [
            ...prev,
            `[${new Date().toLocaleTimeString()}] PROFILE: Avatar image uploaded & saved to superadmin/images.`,
          ]);
        })
        .catch(() => setIsUploadingImage(false));
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setProfileImage(null);
    fetch('/api/admin/profile-image', { method: 'DELETE' }).catch(console.error);
    setTerminalHistory((prev) => [
      ...prev,
      `[${new Date().toLocaleTimeString()}] PROFILE: Avatar image removed from superadmin/images.`,
    ]);
  };

  // Terminal scroll handler
  const terminalEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollTop = terminalEndRef.current.scrollHeight;
    }
  }, [terminalHistory]);

  // Dynamic stats states
  const [registeredCount, setRegisteredCount] = useState(7);
  const [mrrInr, setMrrInr] = useState(99990);
  const [mrrUsd, setMrrUsd] = useState(298);
  const [executions, setExecutions] = useState(0);
  const [backendStatusText, setBackendStatusText] = useState("Online");
  const [backendLatency, setBackendLatency] = useState(7);

  // Auth verification & DB fetch
  useEffect(() => {
    const savedAuth = sessionStorage.getItem("sg_superadmin_auth");
    if (savedAuth === "true") {
      setIsAuthenticated(true);

      // Fetch from database API
      fetch("/api/admin/stats")
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success") {
            // Update stats
            setRegisteredCount(data.registeredUsers);
            setMrrInr(data.mrr.inr);
            setMrrUsd(data.mrr.usd);
            setExecutions(data.executions !== undefined ? data.executions : 0);
            
            // Backend Status parse
            if (data.backendStatus) {
              setBackendStatusText(data.backendStatus.includes("Healthy") ? "Online" : "Offline");
              const latencyMatch = data.backendStatus.match(/\d+/);
              if (latencyMatch) {
                setBackendLatency(parseInt(latencyMatch[0], 10));
              }
            }

            // Update clients list from database, assigning mock usage/plan if missing
            if (data.users && data.users.length > 0) {
              const uniqueEmails = new Set();
              const uniqueDbUsers: UserRecord[] = [];

              data.users.forEach((u: any) => {
                const emailLower = u.email ? u.email.toLowerCase().trim() : u.id;
                if (!uniqueEmails.has(emailLower)) {
                  uniqueEmails.add(emailLower);
                  
                  uniqueDbUsers.push({
                    id: u.id,
                    name: u.name,
                    email: u.email || "no-email@sellgrow.co",
                    role: u.role,
                    region: u.region,
                    status: u.status,
                    plan: u.plan || (u.role === "SuperAdmin" ? "Enterprise" : u.role === "Admin" ? "Professional" : "Starter"),
                    joined: u.joined || "2026-07-21",
                    usage: u.usage || (Math.floor(Math.random() * 800) + 50)
                  });
                }
              });

              setClients(uniqueDbUsers);
            }

            // Fetch team members from DB
            fetch("/api/admin/team")
              .then((res) => res.json())
              .then((data) => {
                if (data.status === "success" && data.data) {
                  setTeamMembers(data.data);
                  const sa = data.data.find((tm: any) => tm.role === "SuperAdmin");
                  if (sa) {
                    setProfileName(sa.name);
                    setProfileEmail(sa.email);
                    setProfilePasscode(sa.password || "sellgrow123");
                    setProfileAuthKey(sa.authKey || "Level-5 Master");
                    setProfileAdminLevel(sa.adminLevel || "Platform Creator");
                    setProfileCountry(sa.country || "IN India HQ");
                    setSuperAdminId(sa.id);
                  }
                }
              })
              .catch((err) => console.error("Error loading team database:", err));

            // Fetch employees from DB
            fetch("/api/admin/employees")
              .then((res) => res.json())
              .then((data) => {
                if (data.status === "success" && data.data) {
                  setEmployees(data.data);
                }
              })
              .catch((err) => console.error("Error loading employees database:", err));

            // Fetch services from DB
            fetch("/api/admin/services")
              .then((res) => res.json())
              .then((data) => {
                if (data.status === "success" && data.data) {
                  setServices(data.data);
                }
              })
              .catch((err) => console.error("Error loading services database:", err));

            // Fetch profile image from DB
            fetch("/api/admin/profile-image")
              .then((res) => res.json())
              .then((data) => {
                if (data.status === "success" && data.data?.imageBase64) {
                  setProfileImage(`data:${data.data.mimeType};base64,${data.data.imageBase64}`);
                }
              })
              .catch((err) => console.error("Error loading profile image:", err));
          }
        })
        .catch((err) => console.error("Error fetching stats:", err));
    } else {
      router.push("/sg-superadmin");
    }
    setIsLoading(false);
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem("sg_superadmin_auth");
    router.push("/sg-superadmin");
  };

  // Toggle handlers
  const toggleUserStatus = (userId: string) => {
    setClients((prev) =>
      prev.map((c) =>
        c.id === userId
          ? { ...c, status: c.status === "Active" ? "Suspended" : "Active" }
          : c
      )
    );
  };

  const toggleUserRole = (userId: string) => {
    setClients((prev) =>
      prev.map((c) => {
        if (c.id === userId) {
          const nextRole = c.role === "User" ? "Admin" : c.role === "Admin" ? "SuperAdmin" : "User";
          return { ...c, role: nextRole };
        }
        return c;
      })
    );
  };

  const changeUserPlan = (userId: string) => {
    setClients((prev) =>
      prev.map((c) => {
        if (c.id === userId) {
          const nextPlan = c.plan === "Starter" ? "Professional" : c.plan === "Professional" ? "Enterprise" : "Starter";
          return { ...c, plan: nextPlan };
        }
        return c;
      })
    );
  };

  const toggleServiceStatus = (serviceId: string) => {
    setServices((prev) =>
      prev.map((s) => {
        if (s.id === serviceId) {
          const nextStatus = s.status === "Active" ? "Inactive" : s.status === "Inactive" ? "Maintenance" : "Active";
          
          fetch("/api/admin/services", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: serviceId, status: nextStatus })
          }).catch(console.error);

          return { ...s, status: nextStatus };
        }
        return s;
      })
    );
  };

  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newServiceName) return;
    const newId = `srv_${Date.now()}`;
    const newSrv = {
      id: newId,
      name: newServiceName,
      description: newServiceDesc,
      status: newServiceStatus,
      successRate: parseFloat(newServiceSuccessRate) || 99.0,
      latency: parseInt(newServiceLatency, 10) || 50,
      requests24h: parseInt(newServiceRequests, 10) || 1000,
      features: [newServiceFeature1 || "Custom Feature Integration", newServiceFeature2 || "API Endpoint Microservice"],
      priceMonthlyINR: parseFloat(newPriceMonthlyINR) || 0,
      priceMonthlyUSD: parseFloat(newPriceMonthlyUSD) || 0,
      priceYearlyINR: parseFloat(newPriceYearlyINR) || 0,
      priceYearlyUSD: parseFloat(newPriceYearlyUSD) || 0
    };

    fetch("/api/admin/services", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newSrv)
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setServices((prev) => [...prev, data.data]);
          setShowAddServiceForm(false);
          setNewServiceName("");
          setNewServiceDesc("");
          setNewServiceSuccessRate("99.0");
          setNewServiceLatency("50");
          setNewServiceRequests("1000");
          setNewServiceFeature1("");
          setNewServiceFeature2("");
          setNewPriceMonthlyINR("");
          setNewPriceMonthlyUSD("");
          setNewPriceYearlyINR("");
          setNewPriceYearlyUSD("");
        }
      })
      .catch(console.error);
  };

  const handleDeleteService = (serviceId: string) => {
    fetch(`/api/admin/services?id=${serviceId}`, { method: "DELETE" })
      .then(() => {
        setServices(services.filter((s) => s.id !== serviceId));
      })
      .catch(() => {
        setServices(services.filter((s) => s.id !== serviceId));
      });
  };

  const handleStartEdit = (srv: ServiceItem) => {
    setEditingServiceId(srv.id);
    setEditServiceName(srv.name);
    setEditServiceDesc(srv.description);
    setEditServiceSuccessRate(srv.successRate.toString());
    setEditServiceLatency(srv.latency.toString());
    setEditServiceRequests(srv.requests24h.toString());
    
    const currentFeatures = srv.features && srv.features.length > 0 ? srv.features : getDefaultFeatures(srv.name, srv.id);
    setEditServiceFeature1(currentFeatures[0] || "");
    setEditServiceFeature2(currentFeatures[1] || "");
    
    const defaults = getDefaultPrices(srv.name, srv.id);
    setEditPriceMonthlyINR((srv.priceMonthlyINR ?? defaults.mINR).toString());
    setEditPriceMonthlyUSD((srv.priceMonthlyUSD ?? defaults.mUSD).toString());
    setEditPriceYearlyINR((srv.priceYearlyINR ?? defaults.yINR).toString());
    setEditPriceYearlyUSD((srv.priceYearlyUSD ?? defaults.yUSD).toString());
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingServiceId) return;

    const successVal = parseFloat(editServiceSuccessRate) || 99.0;
    const latencyVal = parseInt(editServiceLatency, 10) || 50;
    const requestsVal = parseInt(editServiceRequests, 10) || 1000;
    const featuresVal = [editServiceFeature1 || "Custom Feature Integration", editServiceFeature2 || "API Endpoint Microservice"];
    const pmINR = parseFloat(editPriceMonthlyINR) || 0;
    const pmUSD = parseFloat(editPriceMonthlyUSD) || 0;
    const pyINR = parseFloat(editPriceYearlyINR) || 0;
    const pyUSD = parseFloat(editPriceYearlyUSD) || 0;

    fetch("/api/admin/services", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: editingServiceId,
        name: editServiceName,
        description: editServiceDesc,
        successRate: successVal,
        latency: latencyVal,
        requests24h: requestsVal,
        features: featuresVal,
        priceMonthlyINR: pmINR,
        priceMonthlyUSD: pmUSD,
        priceYearlyINR: pyINR,
        priceYearlyUSD: pyUSD
      })
    })
      .then(() => {
        setServices(services.map((s) => 
          s.id === editingServiceId 
            ? {
                ...s,
                name: editServiceName,
                description: editServiceDesc,
                successRate: successVal,
                latency: latencyVal,
                requests24h: requestsVal,
                features: featuresVal,
                priceMonthlyINR: pmINR,
                priceMonthlyUSD: pmUSD,
                priceYearlyINR: pyINR,
                priceYearlyUSD: pyUSD
              }
            : s
        ));
        setEditingServiceId(null);
      })
      .catch(console.error);
  };

  const rotateSecretKey = () => {
    const randomHex = Array.from({ length: 24 }, () => Math.floor(Math.random() * 16).toString(16)).join("");
    setSystemSecretKey(`sg_live_sec_${randomHex}`);
    
    // Add event log in console
    setTerminalHistory((prev) => [
      ...prev,
      `[${new Date().toLocaleTimeString()}] SECURE: Developer API master secret key rotated successfully.`,
      `[${new Date().toLocaleTimeString()}] New Key: sg_live_sec_${randomHex.substring(0,6)}...`
    ]);
  };

  // Terminal CLI executor
  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!developerLogTerminalInput.trim()) return;

    const cmd = developerLogTerminalInput.trim().toLowerCase();
    let response: string[] = [];

    switch (cmd) {
      case "help":
        response = [
          "Available Diagnostics Commands:",
          "  help         Display command summary",
          "  status       Print CPU load, RAM usage, Uptime metrics",
          "  health       Test API connection and check gateway latency",
          "  metrics      Display registered users count & monthly revenue stats",
          "  clear        Flush the terminal screen log",
          "  audit        Show last 4 audit event logs from telemetry service",
          "  db-check     Ping database and retrieve tables consistency stats"
        ];
        break;
      case "status":
        response = [
          "SYSTEM STATUS BRIEF:",
          `  Host Server: Node-AS-GP-01`,
          "  Operating System: Linux Enterprise 5.15",
          "  CPU Load: 14.8% (8 Cores, Stable)",
          "  RAM Usage: 4.82 GB / 16.00 GB (30.1% allocated)",
          `  System Uptime: 45 Days, 18 Hours, 22 Minutes`,
          `  FastAPI status: ONLINE (Active PID 1948)`
        ];
        break;
      case "health":
        response = [
          "GATEWAY HEALTH TEST...",
          `  [OK] AI Voice Call Engine (ping: 182ms)`,
          `  [OK] WhatsApp Broadcaster API (ping: 42ms)`,
          `  [OK] FastAPI Geo-IP Service (ping: 7ms)`,
          `  [OK] DB Gateway cluster (ping: 2ms)`,
          "  Overall Cluster Health Score: 100% stable."
        ];
        break;
      case "metrics":
        const totalU = clients.length;
        const totalCredits = clients.reduce((acc, c) => acc + c.usage, 0);
        response = [
          "PLATFORM METRICS SUM:",
          `  Total Active Accounts: ${totalU}`,
          `  AI Agent Credits Executed: ${totalCredits} runs`,
          `  Total Monthly Revenue (MRR): ₹99,990 / $298`,
          `  Growth Index: +18.4% (Month-on-Month)`
        ];
        break;
      case "clear":
        setTerminalHistory([]);
        setDeveloperLogTerminalInput("");
        return;
      case "audit":
        response = [
          "LAST TELEMETRY AUDIT LOGS:",
          `  - [10:56 AM] Super Admin logged in securely`,
          `  - [10:32 AM] Sync transaction database with payment webhook`,
          `  - [09:12 AM] Maintenance mode toggled to [DISABLED]`,
          `  - [08:00 AM] Scheduled auto backup created successfully.`
        ];
        break;
      case "db-check":
        response = [
          "DATABASE CHECKOUT: PostgreSQL v14.5 cluster",
          "  - Connection pool status: 12/100 active clients",
          "  - Tables verified: (users, subscriptions, webhooks, analytics_logs)",
          "  - DB Uptime: 99.998%",
          "  - Integrity check: PASSED (0 corruption nodes)"
        ];
        break;
      default:
        response = [`Command '${cmd}' not recognized. Type 'help' for support.`];
        break;
    }

    setTerminalHistory((prev) => [
      ...prev,
      `sg-admin@sellgrow:~$ ${developerLogTerminalInput}`,
      ...response,
      ""
    ]);
    setDeveloperLogTerminalInput("");
  };

  const handleSaveLegal = () => {
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3005);
    
    setTerminalHistory((prev) => [
      ...prev,
      `[${new Date().toLocaleTimeString()}] LEGAL: Updated agreement text for type '${legalTermsType.toUpperCase()}'.`
    ]);
  };

  // Filters for client list
  const filteredClients = clients.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.role.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesPlan = clientPlanFilter === "all" ? true : c.plan.toLowerCase() === clientPlanFilter.toLowerCase();
    const matchesStatus = clientStatusFilter === "all" ? true : c.status.toLowerCase() === clientStatusFilter.toLowerCase();

    return matchesSearch && matchesPlan && matchesStatus;
  });

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#070b15] flex flex-col items-center justify-center text-slate-400 text-sm gap-3">
        <RefreshCw className="w-6 h-6 animate-spin text-primary" />
        <span>Verifying Super Admin Authorization...</span>
      </div>
    );
  }

  // Sidebar Menu Array
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "services", label: "Services", icon: Cpu, badge: `${services.filter(s => s.status === "Active").length} Live` },
    { id: "sub-admins", label: "Sub Admin", icon: Users, badge: "Team" },
    { id: "control-flags", label: "Control Flags", icon: Sliders, badge: "Live" },
    { id: "clients", label: "Client Data", icon: Users },
    { id: "payments", label: "Payment", icon: CreditCard },
    { id: "settings", label: "Setting", icon: Settings },
    { id: "profile", label: "My Profile", icon: User }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070b13] text-slate-800 dark:text-slate-100 flex font-sans transition-colors duration-300">
      
      {/* 1. LEFT SIDEBAR (SLIDER BAR) */}
      {/* Drawer Overlay for Mobile */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Panel */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col bg-white dark:bg-[#0a0f1d] border-r border-slate-200 dark:border-slate-800/80 shadow-2xl transition-all duration-300
          ${sidebarCollapsed ? "w-16" : "w-52"} 
          ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"} 
          lg:relative`}
      >
        {/* Sidebar Header */}
        <div className="p-5 flex items-center justify-between border-b border-slate-100 dark:border-slate-800/50">
          <div className="flex items-center justify-start overflow-hidden">
            <Logo className={sidebarCollapsed ? "w-9 h-9" : "w-44 h-12"} />
          </div>
          {/* Close drawer (Mobile) */}
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sidebar Mini Profile Block */}
        {!sidebarCollapsed && (
          <div className="p-4 mx-4 my-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-150 dark:border-slate-800/40 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-amber-600 flex items-center justify-center font-bold text-sm text-white shadow-md">
              M
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-xs font-bold text-slate-900 dark:text-white truncate">{profileName}</span>
              <span className="text-[10px] text-emerald-500 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                Active Session
              </span>
            </div>
          </div>
        )}

        {/* Sidebar Nav Links */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveView(item.id as any);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-xs font-bold transition-all group relative
                  ${
                    isActive
                      ? "bg-primary text-white shadow-lg shadow-primary/20"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-905 hover:text-slate-900 dark:hover:text-white"
                  }`}
              >
                <Icon className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${isActive ? "text-white" : "text-slate-400 dark:text-slate-500 group-hover:text-primary"}`} />
                {!sidebarCollapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex-1 text-left"
                  >
                    {item.label}
                  </motion.span>
                )}
                {/* Active sidebar bar indicator */}
                {isActive && (
                  <div className="absolute right-0 top-1/4 bottom-1/4 w-1.5 bg-white rounded-l-md" />
                )}
                {/* Custom Badge */}
                {item.badge && !sidebarCollapsed && (
                  <span className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-[9px] text-slate-700 dark:text-slate-350 font-extrabold scale-90">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>



        {/* Sidebar Logout Action */}
        <div className="p-3 border-t border-slate-100 dark:border-slate-800/50">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-xs font-bold text-red-655 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all group"
          >
            <LogOut className="w-4 h-4 shrink-0 group-hover:translate-x-0.5 transition-transform" />
            {!sidebarCollapsed && <span>Logout</span>}
          </button>
        </div>

        {/* Sidebar Collapse Toggle Button (Desktop Only) */}
        <div className="hidden lg:block p-3 text-right">
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 text-slate-550 hover:text-slate-900 dark:hover:text-white transition-colors"
            title={sidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>
      </aside>

      {/* 2. MAIN PANEL CONTENT */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* Top Header */}
        <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#070b13]/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800/80 px-6 py-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            {/* Hamburger for mobile */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-205 dark:border-slate-800 hover:bg-slate-202 dark:hover:bg-slate-800"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              <h2 className="text-sm md:text-base font-extrabold tracking-tight text-slate-900 dark:text-white capitalize">
                Super admin page
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Theme switcher */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-808 text-slate-700 dark:text-slate-300 transition-colors shadow-sm flex items-center gap-1.5 text-xs font-bold"
              title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
            >
              {theme === "dark" ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span className="hidden sm:inline">Light</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-indigo-600" />
                  <span className="hidden sm:inline">Dark</span>
                </>
              )}
            </button>

            {/* Back to hub */}
            <button
              onClick={() => router.push("/sg-superadmin")}
              className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 hover:bg-slate-202 dark:hover:bg-slate-800 text-xs font-semibold text-slate-705 dark:text-slate-300 transition-colors flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">Selection Hub</span>
            </button>

            {/* Public Site */}
            <button
              onClick={() => router.push("/")}
              className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors flex items-center gap-1.5"
            >
              <span className="hidden sm:inline">Public Site</span>
            </button>

            {/* Lock Button */}
            <button
              onClick={handleLogout}
              className="px-3 py-2 rounded-xl border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-xs font-bold text-red-600 dark:text-red-400 transition-colors flex items-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Lock Portal</span>
            </button>
          </div>
        </header>

        {/* 3. DYNAMIC CONTENT SCROLL AREA */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-8">

          {/* ======================================= */}
          {/* TAB 1: DASHBOARD VIEW                   */}
          {/* ======================================= */}
          {activeView === "dashboard" && (
            <div className="space-y-6">
              {/* 3 Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                
                {/* Stat 1 */}
                <div className="p-5 rounded-2xl bg-white dark:bg-[#0a0f1d] border border-slate-200 dark:border-slate-800/80 shadow-md space-y-3 hover:border-primary/50 transition-all duration-300">
                  <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-bold">
                    <span>Registered Clients</span>
                    <Users className="w-4 h-4 text-primary" />
                  </div>
                  <div className="text-2xl font-extrabold text-slate-900 dark:text-white font-display">
                    {registeredCount}
                  </div>
                  <div className="text-[10px] text-emerald-605 dark:text-emerald-400 flex items-center gap-1">
                    <span>↑ +14% this week</span>
                  </div>
                </div>

                {/* Stat 2 */}
                <div className="p-5 rounded-2xl bg-white dark:bg-[#0a0f1d] border border-slate-200 dark:border-slate-800/80 shadow-md space-y-3 hover:border-secondary/50 transition-all duration-300">
                  <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-bold">
                    <span>Revenue (MRR)</span>
                    <DollarSign className="w-4 h-4 text-secondary" />
                  </div>
                  <div className="text-2xl font-extrabold text-slate-900 dark:text-white font-display flex items-baseline gap-1">
                    <span>₹{mrrInr.toLocaleString('en-IN')}</span>
                    <span className="text-xs font-semibold text-slate-400">/ ${mrrUsd.toLocaleString()}</span>
                  </div>
                  <div className="text-[10px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <span>↑ +22% growth</span>
                  </div>
                </div>

                {/* Stat 3 */}
                <div className="p-5 rounded-2xl bg-white dark:bg-[#0a0f1d] border border-slate-200 dark:border-slate-800/80 shadow-md space-y-3 hover:border-amber-500/50 transition-all duration-300">
                  <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-bold">
                    <span>AI Execution Logs</span>
                    <Zap className="w-4 h-4 text-amber-500" />
                  </div>
                  <div className="text-2xl font-extrabold text-slate-900 dark:text-white font-display">
                    {executions.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">
                    Voice AI & WhatsApp engines
                  </div>
                </div>
              </div>

              {/* Graphics Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* INR Revenue Telemetry */}
                <div className="p-6 rounded-3xl bg-white dark:bg-[#0a0f1d] border border-slate-200 dark:border-slate-800/80 shadow-xl space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-extrabold text-slate-900 dark:text-white font-display">
                        INR Revenue Telemetry
                      </h3>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400">
                        Monthly recurring revenue trends in INR (₹)
                      </p>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                      INR (₹)
                    </span>
                  </div>

                  {/* SVG Chart */}
                  <div className="h-48 w-full relative">
                    <svg className="w-full h-full" viewBox="0 0 600 160" fill="none">
                      {/* Grid lines */}
                      <line x1="0" y1="30" x2="600" y2="30" stroke="#f1f5f9" strokeWidth="1" className="dark:stroke-slate-800/40" />
                      <line x1="0" y1="80" x2="600" y2="80" stroke="#f1f5f9" strokeWidth="1" className="dark:stroke-slate-800/40" />
                      <line x1="0" y1="130" x2="600" y2="130" stroke="#e2e8f0" strokeWidth="1.5" className="dark:stroke-slate-800/60" />

                      {/* Dynamic Baseline (flat ₹0 chart) */}
                      <path
                        d="M 50,130 L 550,130"
                        stroke="#3b82f6"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeDasharray="4 4"
                        opacity="0.6"
                      />

                      {/* Data point markers aligned with labels */}
                      <circle cx="50" cy="130" r="4.5" className="fill-white stroke-primary stroke-2" />
                      <circle cx="150" cy="130" r="4.5" className="fill-white stroke-primary stroke-2" />
                      <circle cx="250" cy="130" r="4.5" className="fill-white stroke-primary stroke-2" />
                      <circle cx="350" cy="130" r="4.5" className="fill-white stroke-primary stroke-2" />
                      <circle cx="450" cy="130" r="4.5" className="fill-white stroke-primary stroke-2" />
                      <circle cx="550" cy="130" r="4.5" className="fill-white stroke-primary stroke-2" />
                    </svg>

                    {/* Chart Labels */}
                    <div className="absolute bottom-0 left-0 right-0 flex justify-between px-6 text-[9px] font-bold text-slate-400 font-mono">
                      <span>Feb</span>
                      <span>Mar</span>
                      <span>Apr</span>
                      <span>May</span>
                      <span>Jun</span>
                      <span>Jul</span>
                    </div>
                  </div>
                </div>

                {/* USD Revenue Telemetry */}
                <div className="p-6 rounded-3xl bg-white dark:bg-[#0a0f1d] border border-slate-200 dark:border-slate-800/80 shadow-xl space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-extrabold text-slate-900 dark:text-white font-display">
                        USD Revenue Telemetry
                      </h3>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400">
                        Monthly recurring revenue trends in USD ($)
                      </p>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-500/10 text-blue-600 border border-blue-500/20">
                      USD ($)
                    </span>
                  </div>

                  {/* SVG Chart */}
                  <div className="h-48 w-full relative">
                    <svg className="w-full h-full" viewBox="0 0 600 160" fill="none">
                      {/* Grid lines */}
                      <line x1="0" y1="30" x2="600" y2="30" stroke="#f1f5f9" strokeWidth="1" className="dark:stroke-slate-800/40" />
                      <line x1="0" y1="80" x2="600" y2="80" stroke="#f1f5f9" strokeWidth="1" className="dark:stroke-slate-800/40" />
                      <line x1="0" y1="130" x2="600" y2="130" stroke="#e2e8f0" strokeWidth="1.5" className="dark:stroke-slate-800/60" />

                      {/* Dynamic Baseline (flat $0 chart) */}
                      <path
                        d="M 50,130 L 550,130"
                        stroke="#d946ef"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeDasharray="4 4"
                        opacity="0.6"
                      />

                      {/* Data point markers aligned with labels */}
                      <circle cx="50" cy="130" r="4.5" className="fill-white stroke-secondary stroke-2" />
                      <circle cx="150" cy="130" r="4.5" className="fill-white stroke-secondary stroke-2" />
                      <circle cx="250" cy="130" r="4.5" className="fill-white stroke-secondary stroke-2" />
                      <circle cx="350" cy="130" r="4.5" className="fill-white stroke-secondary stroke-2" />
                      <circle cx="450" cy="130" r="4.5" className="fill-white stroke-secondary stroke-2" />
                      <circle cx="550" cy="130" r="4.5" className="fill-white stroke-secondary stroke-2" />
                    </svg>

                    {/* Chart Labels */}
                    <div className="absolute bottom-0 left-0 right-0 flex justify-between px-6 text-[9px] font-bold text-slate-400 font-mono">
                      <span>Feb</span>
                      <span>Mar</span>
                      <span>Apr</span>
                      <span>May</span>
                      <span>Jun</span>
                      <span>Jul</span>
                    </div>
                  </div>
  
                </div>
              </div>

            </div>
          )}

          {/* ======================================= */}
          {/* TAB 2: SUB-ADMIN & EMPLOYEES COMBINED   */}
          {/* ======================================= */}
          {activeView === "sub-admins" && (
            <div className="space-y-6">
              {/* Premium Sub-Tab toggles */}
              <div className="flex border-b border-slate-150 dark:border-slate-800 pb-3 gap-2">
                <button
                  onClick={() => setSubAdminActiveTab("sub-admins")}
                  className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                    subAdminActiveTab === "sub-admins"
                      ? "bg-primary text-white"
                      : "bg-slate-50 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800"
                  }`}
                >
                  Sub Admin
                </button>
                <button
                  onClick={() => setSubAdminActiveTab("employees")}
                  className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                    subAdminActiveTab === "employees"
                      ? "bg-primary text-white"
                      : "bg-slate-50 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800"
                  }`}
                >
                  Employees
                </button>
              </div>

              {subAdminActiveTab === "sub-admins" ? (
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Invite Sub Admin Form */}
                  <div className="w-full lg:w-80 shrink-0 p-6 rounded-3xl bg-white dark:bg-[#0a0f1d] border border-slate-200 dark:border-slate-800/80 shadow-xl space-y-6 h-fit">
                    <div>
                      <h3 className="text-sm font-extrabold text-slate-900 dark:text-white font-display">
                        Invite Sub Admin
                      </h3>
                      <p className="text-[10px] text-slate-550 dark:text-slate-400">
                        Grant administrators or operators access to this master console.
                      </p>
                    </div>

                    <form onSubmit={handleInviteTeamMember} className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={newTeamMemberName}
                          onChange={(e) => setNewTeamMemberName(e.target.value)}
                          placeholder="Enter name..."
                          className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-955 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-450 focus:outline-none focus:border-primary"
                          required
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-extrabold text-slate-505 dark:text-slate-400 uppercase tracking-wider block">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={newTeamMemberEmail}
                          onChange={(e) => setNewTeamMemberEmail(e.target.value)}
                          placeholder="Enter email..."
                          className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-955 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-450 focus:outline-none focus:border-primary"
                          required
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-extrabold text-slate-505 dark:text-slate-400 uppercase tracking-wider block">
                          Role Profile
                        </label>
                        <select
                          value={newTeamMemberRole}
                          onChange={(e) => setNewTeamMemberRole(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-955 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-primary"
                        >
                          <option value="SuperAdmin">Super Admin (Full Access)</option>
                          <option value="Developer">Developer (Read/Write)</option>
                          <option value="Manager">Manager (Read/Write)</option>
                          <option value="Operator">Operator (Read Only)</option>
                        </select>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2.5 bg-primary text-white text-xs font-bold rounded-xl hover:opacity-95 transition-opacity shadow-md shadow-primary/10 flex items-center justify-center gap-1.5"
                      >
                        <Plus className="w-4 h-4" />
                        Send Team Invitation
                      </button>
                    </form>
                  </div>

                  {/* Sub Admins List Directory */}
                  <div className="flex-1 min-w-0 p-6 rounded-3xl bg-white dark:bg-[#0a0f1d] border border-slate-200 dark:border-slate-800/80 shadow-xl space-y-6">
                    <div>
                      <h3 className="text-sm font-extrabold text-slate-900 dark:text-white font-display">
                        Administrative Team Directory
                      </h3>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400">
                        Manage roles, permissions scopes, and status of all operators.
                      </p>
                    </div>

                    <div className="overflow-x-auto border border-slate-150 dark:border-slate-800/60 rounded-2xl">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-50 dark:bg-slate-900/40 text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider border-b border-slate-150 dark:border-slate-800/60">
                            <th className="px-5 py-3.5">Name</th>
                            <th className="px-5 py-3.5">Email</th>
                            <th className="px-5 py-3.5">Role</th>
                            <th className="px-5 py-3.5">Scope</th>
                            <th className="px-5 py-3.5">Assigned Services</th>
                            <th className="px-5 py-3.5">Status</th>
                            <th className="px-5 py-3.5">Portal Link</th>
                            <th className="px-5 py-3.5 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-150 dark:divide-slate-800/50 text-xs">
                          {teamMembers.map((member) => (
                            <tr key={member.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/20 transition-colors">
                              <td className="px-5 py-4 font-bold text-slate-900 dark:text-white">
                                {member.name}
                              </td>
                              <td className="px-5 py-4 text-slate-500 dark:text-slate-400 font-mono text-[11px]">
                                {member.email}
                              </td>
                              <td className="px-5 py-4">
                                <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold ${
                                  member.role === "SuperAdmin" 
                                    ? "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                                    : member.role === "Developer"
                                    ? "bg-indigo-500/10 text-indigo-500 border border-indigo-500/20"
                                    : "bg-slate-500/10 text-slate-550 border border-slate-500/20"
                                }`}>
                                  {member.role}
                                </span>
                              </td>
                              <td className="px-5 py-4">
                                {member.role === "SuperAdmin" ? (
                                  <span className="font-bold text-slate-700 dark:text-slate-300 text-[11px]">{member.permissions}</span>
                                ) : (
                                  <select
                                    value={member.permissions}
                                    onChange={(e) => handleUpdateTeamMember(member.id, "permissions", e.target.value)}
                                    className="px-2 py-1 rounded-xl bg-slate-55 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-[10px] font-bold text-slate-800 dark:text-slate-200 focus:outline-none"
                                  >
                                    <option value="Full Access">Full Access</option>
                                    <option value="Read/Write">Read/Write</option>
                                    <option value="Read Only">Read Only</option>
                                  </select>
                                )}
                              </td>
                              {/* ── ASSIGNED SERVICES POPOVER ── */}
                              <td className="px-5 py-4">
                                {member.role === "SuperAdmin" ? (
                                  <span className="text-[10px] text-slate-400 font-mono">All Services</span>
                                ) : (
                                  <div className="relative">
                                    <button
                                      onClick={() => setOpenScopePopover(openScopePopover === member.id ? null : member.id)}
                                      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-[10px] font-bold text-slate-700 dark:text-slate-300 hover:border-primary/50 transition-all min-w-[110px]"
                                    >
                                      <Package className="w-3 h-3 text-primary shrink-0" />
                                      <span className="flex-1 text-left">
                                        {((member as any).assignedServices || []).length === 0
                                          ? "None"
                                          : `${((member as any).assignedServices || []).length} Service${((member as any).assignedServices || []).length > 1 ? "s" : ""}`}
                                      </span>
                                      <ChevronDown className={`w-3 h-3 transition-transform ${openScopePopover === member.id ? "rotate-180" : ""}`} />
                                    </button>
                                    {openScopePopover === member.id && (
                                      <div className="absolute left-0 top-full mt-1.5 z-50 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl p-2 space-y-0.5">
                                        <div className="px-2 py-1.5 text-[9px] font-extrabold text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800 mb-1">
                                          Assign Service Scope
                                        </div>
                                        {services.map((srv: any) => {
                                          const assigned: string[] = (member as any).assignedServices || [];
                                          const isChecked = assigned.includes(srv.id);
                                          return (
                                            <label
                                              key={srv.id}
                                              className="flex items-center gap-2.5 px-2 py-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer group transition-colors"
                                            >
                                              <div className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 transition-all ${
                                                isChecked
                                                  ? "bg-primary border-primary"
                                                  : "border-slate-300 dark:border-slate-600 group-hover:border-primary/50"
                                              }`}>
                                                {isChecked && <Check className="w-2.5 h-2.5 text-white" />}
                                              </div>
                                              <input
                                                type="checkbox"
                                                className="sr-only"
                                                checked={isChecked}
                                                onChange={(e) => handleAssignService(member.id, srv.id, e.target.checked)}
                                              />
                                              <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 leading-tight">{srv.name}</span>
                                              {isChecked && (
                                                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                                              )}
                                            </label>
                                          );
                                        })}
                                        <div className="pt-1 border-t border-slate-100 dark:border-slate-800 mt-1">
                                          <button
                                            onClick={() => setOpenScopePopover(null)}
                                            className="w-full py-1.5 text-[10px] font-bold text-primary hover:bg-primary/5 rounded-xl transition-colors"
                                          >
                                            Done
                                          </button>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </td>
                              <td className="px-5 py-4">
                                <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold ${
                                  member.status === "Active" ? "text-emerald-500" : "text-amber-500"
                                }`}>
                                  <span className={`w-1.5 h-1.5 rounded-full ${
                                    member.status === "Active" ? "bg-emerald-500 animate-pulse" : "bg-amber-500"
                                  }`} />
                                  {member.status}
                                </span>
                              </td>
                              <td className="px-5 py-4">
                                {member.role === "SuperAdmin" ? (
                                  <div className="flex items-center gap-1.5">
                                    <span className="font-mono text-[10px] text-slate-500 select-all">/sg-superadmin</span>
                                    <button 
                                      onClick={() => {
                                        const url = `${window.location.origin}/sg-superadmin`;
                                        navigator.clipboard.writeText(url);
                                      }}
                                      className="text-slate-400 hover:text-primary"
                                      title="Copy link"
                                    >
                                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/></svg>
                                    </button>
                                    <a href="/sg-superadmin" target="_blank" className="text-slate-400 hover:text-primary" title="Open Portal">
                                      <ExternalLink className="w-3 h-3" />
                                    </a>
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-1.5">
                                    <span className="font-mono text-[10px] text-slate-550 select-all">/sg-admin/{member.role.toLowerCase()}</span>
                                    <button 
                                      onClick={() => {
                                        const url = `${window.location.origin}/sg-admin/${member.role.toLowerCase()}`;
                                        navigator.clipboard.writeText(url);
                                      }}
                                      className="text-slate-400 hover:text-primary"
                                      title="Copy link"
                                    >
                                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/></svg>
                                    </button>
                                    <a href={`/sg-admin/${member.role.toLowerCase()}`} target="_blank" className="text-slate-400 hover:text-primary" title="Open Portal">
                                      <ExternalLink className="w-3 h-3" />
                                    </a>
                                  </div>
                                )}
                              </td>
                              <td className="px-5 py-4 text-right">
                                {member.role !== "SuperAdmin" && (
                                  <button
                                    onClick={() => handleRemoveTeamMember(member.id)}
                                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-500/10 transition-colors"
                                    title="Revoke access"
                                  >
                                    <Trash className="w-4 h-4" />
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Add New Employee Form */}
                  <div className="w-full lg:w-80 shrink-0 p-6 rounded-3xl bg-white dark:bg-[#0a0f1d] border border-slate-200 dark:border-slate-800/80 shadow-xl space-y-6 h-fit">
                    <div>
                      <h3 className="text-sm font-extrabold text-slate-900 dark:text-white font-display">
                        Add New Employee
                      </h3>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400">
                        Register a new employee and assign them to an operational sub-admin.
                      </p>
                    </div>

                    <form onSubmit={handleCreateEmployee} className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={newEmpName}
                          onChange={(e) => setNewEmpName(e.target.value)}
                          placeholder="Enter employee name..."
                          className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-955 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-450 focus:outline-none focus:border-primary"
                          required
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={newEmpEmail}
                          onChange={(e) => setNewEmpEmail(e.target.value)}
                          placeholder="Enter employee email..."
                          className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-955 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-450 focus:outline-none focus:border-primary"
                          required
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                          Work / Project
                        </label>
                        <select
                          value={newEmpWork}
                          onChange={(e) => setNewEmpWork(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-955 border border-slate-200 dark:border-slate-805 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-primary"
                        >
                          <option value="Voice AI Integration">Voice AI Integration</option>
                          <option value="CRM Automation">CRM Automation</option>
                          <option value="Landing Page Editor">Landing Page Editor</option>
                          <option value="Customer Support">Customer Support</option>
                          <option value="Broadcasting Engine">Broadcasting Engine</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-extrabold text-slate-550 dark:text-slate-400 uppercase tracking-wider block">
                          Access Scope
                        </label>
                        <select
                          value={newEmpAccess}
                          onChange={(e) => setNewEmpAccess(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-955 border border-slate-200 dark:border-slate-805 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-primary"
                        >
                          <option value="Full Access">Full Access</option>
                          <option value="Read & Write">Read & Write</option>
                          <option value="View Only">View Only</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-extrabold text-slate-550 dark:text-slate-400 uppercase tracking-wider block">
                          Assign Sub Admin
                        </label>
                        <select
                          value={newEmpSubAdmin}
                          onChange={(e) => setNewEmpSubAdmin(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-955 border border-slate-200 dark:border-slate-805 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-primary"
                        >
                          <option value="Unassigned">Unassigned</option>
                          {teamMembers.filter(tm => tm.role !== "SuperAdmin").map((tm) => (
                            <option key={tm.id} value={tm.name}>
                              {tm.name} ({tm.role})
                            </option>
                          ))}
                        </select>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2.5 bg-primary text-white text-xs font-bold rounded-xl hover:opacity-95 transition-opacity shadow-md shadow-primary/10 flex items-center justify-center gap-1.5"
                      >
                        <Plus className="w-4 h-4" />
                        Add Employee
                      </button>
                    </form>
                  </div>

                  {/* Employees Directory List */}
                  <div className="flex-1 min-w-0 p-6 rounded-3xl bg-white dark:bg-[#0a0f1d] border border-slate-200 dark:border-slate-800/80 shadow-xl space-y-6">
                    <div>
                      <h3 className="text-sm font-extrabold text-slate-900 dark:text-white font-display">
                        Employee Directory
                      </h3>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400">
                        Manage tasks, permissions access, status and assignments of all employees.
                      </p>
                    </div>

                    <div className="overflow-x-auto border border-slate-150 dark:border-slate-800/60 rounded-2xl">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-50 dark:bg-slate-900/40 text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider border-b border-slate-150 dark:border-slate-800/60">
                            <th className="px-5 py-3.5">Name</th>
                            <th className="px-5 py-3.5">Email</th>
                            <th className="px-5 py-3.5">Work / Project</th>
                            <th className="px-5 py-3.5">Access Scope</th>
                            <th className="px-5 py-3.5">Status</th>
                            <th className="px-5 py-3.5">Assigned Sub Admin</th>
                            <th className="px-5 py-3.5">Portal Link</th>
                            <th className="px-5 py-3.5 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-150 dark:divide-slate-800/50 text-xs">
                          {employees.map((emp) => (
                            <tr key={emp.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/20 transition-colors">
                              <td className="px-5 py-4 font-bold text-slate-900 dark:text-white">
                                {emp.name}
                              </td>
                              <td className="px-5 py-4 text-slate-500 dark:text-slate-400 font-mono text-[11px]">
                                {emp.email}
                              </td>
                              <td className="px-5 py-4">
                                <select
                                  value={emp.work}
                                  onChange={(e) => handleUpdateEmployee(emp.id, "work", e.target.value)}
                                  className="px-2 py-1 rounded-xl bg-slate-55 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-[10px] font-bold text-slate-800 dark:text-slate-200 focus:outline-none"
                                >
                                  <option value="Voice AI Integration">Voice AI Integration</option>
                                  <option value="CRM Automation">CRM Automation</option>
                                  <option value="Landing Page Editor">Landing Page Editor</option>
                                  <option value="Customer Support">Customer Support</option>
                                  <option value="Broadcasting Engine">Broadcasting Engine</option>
                                </select>
                              </td>
                              <td className="px-5 py-4">
                                <select
                                  value={emp.access}
                                  onChange={(e) => handleUpdateEmployee(emp.id, "access", e.target.value)}
                                  className="px-2 py-1 rounded-xl bg-slate-55 dark:bg-slate-955 border border-slate-200 dark:border-slate-800 text-[10px] font-bold text-slate-800 dark:text-slate-200 focus:outline-none"
                                >
                                  <option value="Full Access">Full Access</option>
                                  <option value="Read & Write">Read & Write</option>
                                  <option value="View Only">View Only</option>
                                </select>
                              </td>
                              <td className="px-5 py-4">
                                <select
                                  value={emp.status}
                                  onChange={(e) => handleUpdateEmployee(emp.id, "status", e.target.value)}
                                  className={`px-2 py-1 rounded-xl bg-slate-55 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-[10px] font-bold focus:outline-none ${
                                    emp.status === "Active" ? "text-emerald-500" : "text-amber-500"
                                  }`}
                                >
                                  <option value="Active">Active</option>
                                  <option value="Suspended">Suspended</option>
                                </select>
                              </td>
                              <td className="px-5 py-4">
                                <select
                                  value={emp.assignedSubAdmin}
                                  onChange={(e) => handleUpdateEmployee(emp.id, "assignedSubAdmin", e.target.value)}
                                  className="px-2.5 py-1 rounded-xl bg-slate-55 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-[10px] font-bold text-slate-850 dark:text-slate-200 focus:outline-none"
                                >
                                  <option value="Unassigned">Unassigned</option>
                                  {teamMembers.filter(tm => tm.role !== "SuperAdmin").map((tm) => (
                                    <option key={tm.id} value={tm.name}>
                                      {tm.name} ({tm.role})
                                    </option>
                                  ))}
                                </select>
                              </td>
                              <td className="px-5 py-4">
                                {emp.assignedSubAdmin === "Unassigned" ? (
                                  <span className="text-[10px] font-bold text-slate-400 dark:text-slate-600">Unassigned</span>
                                ) : (
                                  <div className="flex items-center gap-1.5">
                                    <span className="font-mono text-[10px] text-slate-500 select-all">
                                      /sg-admin/{(teamMembers.find(tm => tm.name === emp.assignedSubAdmin)?.role || "operator").toLowerCase()}
                                    </span>
                                    <button 
                                      onClick={() => {
                                        const role = (teamMembers.find(tm => tm.name === emp.assignedSubAdmin)?.role || "operator").toLowerCase();
                                        const url = `${window.location.origin}/sg-admin/${role}`;
                                        navigator.clipboard.writeText(url);
                                      }}
                                      className="text-slate-400 hover:text-primary"
                                      title="Copy link"
                                    >
                                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/></svg>
                                    </button>
                                    <a 
                                      href={`/sg-admin/${(teamMembers.find(tm => tm.name === emp.assignedSubAdmin)?.role || "operator").toLowerCase()}`} 
                                      target="_blank" 
                                      className="text-slate-400 hover:text-primary" 
                                      title="Open Portal"
                                    >
                                      <ExternalLink className="w-3 h-3" />
                                    </a>
                                  </div>
                                )}
                              </td>
                              <td className="px-5 py-4 text-right">
                                <button
                                  onClick={() => handleDeleteEmployee(emp.id)}
                                  className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-500/10 transition-colors"
                                  title="Remove employee"
                                >
                                  <Trash className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ======================================= */}
          {/* TAB 8: CONTROL FLAGS                    */}
          {/* ======================================= */}
          {activeView === "control-flags" && (
            <div className="space-y-6">
              <div className="p-6 rounded-3xl bg-white dark:bg-[#0a0f1d] border border-slate-200 dark:border-slate-800/80 shadow-xl space-y-6">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 dark:text-white font-display">
                    Platform Control Switch flags
                  </h3>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">
                    Toggles core platform settings instantly.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  {/* Toggle 1: AI Voice Engine */}
                  <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-150 dark:border-slate-800/60 flex items-center justify-between shadow-sm">
                    <div>
                      <h4 className="text-xs font-extrabold text-slate-900 dark:text-white font-display">
                        AI Voice Engine
                      </h4>
                      <p className="text-[9px] text-slate-500 dark:text-slate-400">
                        Voice call pipeline
                      </p>
                    </div>
                    <button
                      onClick={() => setFeatureFlags({ ...featureFlags, aiVoiceEnabled: !featureFlags.aiVoiceEnabled })}
                      className="focus:outline-none transition-colors"
                    >
                      {featureFlags.aiVoiceEnabled ? (
                        <ToggleRight className="w-8 h-8 text-emerald-500" />
                      ) : (
                        <ToggleLeft className="w-8 h-8 text-slate-400" />
                      )}
                    </button>
                  </div>

                  {/* Toggle 2: WhatsApp Broadcaster */}
                  <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-150 dark:border-slate-800/60 flex items-center justify-between shadow-sm">
                    <div>
                      <h4 className="text-xs font-extrabold text-slate-900 dark:text-white font-display">
                        WhatsApp Broadcaster
                      </h4>
                      <p className="text-[9px] text-slate-500 dark:text-slate-400">
                        Multi-channel chat broadcast
                      </p>
                    </div>
                    <button
                      onClick={() => setFeatureFlags({ ...featureFlags, whatsappEnabled: !featureFlags.whatsappEnabled })}
                      className="focus:outline-none transition-colors"
                    >
                      {featureFlags.whatsappEnabled ? (
                        <ToggleRight className="w-8 h-8 text-emerald-500" />
                      ) : (
                        <ToggleLeft className="w-8 h-8 text-slate-400" />
                      )}
                    </button>
                  </div>

                  {/* Toggle 3: Geo-IP Auto Route */}
                  <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-150 dark:border-slate-800/60 flex items-center justify-between shadow-sm">
                    <div>
                      <h4 className="text-xs font-extrabold text-slate-900 dark:text-white font-display">
                        Geo-IP Auto Route
                      </h4>
                      <p className="text-[9px] text-slate-500 dark:text-slate-400">
                        Automated client regions
                      </p>
                    </div>
                    <button
                      onClick={() => setFeatureFlags({ ...featureFlags, autoGeoIpEnabled: !featureFlags.autoGeoIpEnabled })}
                      className="focus:outline-none transition-colors"
                    >
                      {featureFlags.autoGeoIpEnabled ? (
                        <ToggleRight className="w-8 h-8 text-emerald-500" />
                      ) : (
                        <ToggleLeft className="w-8 h-8 text-slate-400" />
                      )}
                    </button>
                  </div>

                </div>
              </div>
            </div>
          )}

          {/* ======================================= */}
          {/* TAB 3: CLIENT DATA                      */}
          {/* ======================================= */}
          {activeView === "clients" && (
            <div className="p-6 rounded-3xl bg-white dark:bg-[#0a0f1d] border border-slate-200 dark:border-slate-800/80 space-y-6 shadow-xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 dark:text-white font-display">
                    Platform Registered Client Directory
                  </h3>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">
                    Verify usage levels, modify access privileges, and change pricing schedules.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {/* Search */}
                  <div className="relative w-full sm:w-48">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search accounts..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-8 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-primary"
                    />
                  </div>

                  {/* Plan filter */}
                  <select
                    value={clientPlanFilter}
                    onChange={(e) => setClientPlanFilter(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 focus:outline-none focus:border-primary"
                  >
                    <option value="all">All Plans</option>
                    <option value="starter">Starter</option>
                    <option value="professional">Professional</option>
                    <option value="enterprise">Enterprise</option>
                  </select>

                  {/* Status filter */}
                  <select
                    value={clientStatusFilter}
                    onChange={(e) => setClientStatusFilter(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-955 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-705 dark:text-slate-300 focus:outline-none focus:border-primary"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto border border-slate-100 dark:border-slate-800 rounded-2xl">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 text-slate-500 dark:text-slate-400 uppercase text-[9px] tracking-wider font-extrabold">
                      <th className="py-3 px-4">Client User</th>
                      <th className="py-3 px-4">Platform Level</th>
                      <th className="py-3 px-4">Billing Plan</th>
                      <th className="py-3 px-4">Region</th>
                      <th className="py-3 px-4">AI Credits Used</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-semibold text-slate-700 dark:text-slate-300">
                    {filteredClients.length > 0 ? (
                      filteredClients.map((u) => (
                        <tr key={u.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/20 transition-colors">
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-slate-900 dark:text-white">{u.name}</div>
                            <div className="text-[10px] text-slate-405 dark:text-slate-500">{u.email}</div>
                          </td>
                          <td className="py-3.5 px-4">
                            <span
                              onClick={() => toggleUserRole(u.id)}
                              className={`cursor-pointer px-2 py-0.5 rounded-full text-[9px] font-extrabold ${
                                u.role === "SuperAdmin"
                                  ? "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                                  : u.role === "Admin"
                                  ? "bg-primary/10 text-primary border border-primary/20"
                                  : "bg-slate-100 dark:bg-slate-800 text-slate-500"
                              }`}
                              title="Click to cycle role privilege level"
                            >
                              {u.role}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            <span
                              onClick={() => changeUserPlan(u.id)}
                              className="cursor-pointer text-slate-850 dark:text-slate-200 hover:text-primary underline decoration-dotted decoration-slate-400"
                              title="Click to upgrade subscription plan tier"
                            >
                              {u.plan}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-xs">
                            {u.region === "India" ? "🇮🇳 India" : "🌍 International"}
                          </td>
                          <td className="py-3.5 px-4 font-mono text-[11px] text-slate-800 dark:text-slate-350">
                            {u.usage.toLocaleString()} runs
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <button
                              onClick={() => toggleUserStatus(u.id)}
                              className={`px-2.5 py-1 rounded-lg border text-[10px] font-extrabold transition-colors ${
                                u.status === "Active"
                                  ? "border-red-500/20 bg-red-500/5 hover:bg-red-500/15 text-red-600 dark:text-red-400"
                                  : "border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                              }`}
                            >
                              {u.status === "Active" ? "Suspend Client" : "Re-Activate"}
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="py-6 text-center text-slate-400">
                          No matching clients found in system record logs.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ======================================= */}
          {/* TAB 4: PAYMENT                          */}
          {/* ======================================= */}
          {activeView === "payments" && (
            <div className="space-y-6">
              
              {/* Payment Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                <div className="p-5 rounded-2xl bg-white dark:bg-[#0a0f1d] border border-slate-200 dark:border-slate-800/80 shadow-md space-y-2">
                  <div className="text-slate-500 dark:text-slate-400 text-xs font-bold">Active Subscriptions</div>
                  <div className="text-2xl font-extrabold text-slate-900 dark:text-white">₹99,990 / $298</div>
                  <p className="text-[9px] text-emerald-505 font-semibold">↑ +18.4% monthly expansion</p>
                </div>

                <div className="p-5 rounded-2xl bg-white dark:bg-[#0a0f1d] border border-slate-200 dark:border-slate-800/80 shadow-md space-y-2">
                  <div className="text-slate-500 dark:text-slate-400 text-xs font-bold">Gateway Settlement Uptime</div>
                  <div className="text-2xl font-extrabold text-emerald-500">100.0%</div>
                  <p className="text-[9px] text-slate-450">Stripe and Razorpay webhooks synced</p>
                </div>

                <div className="p-5 rounded-2xl bg-white dark:bg-[#0a0f1d] border border-slate-200 dark:border-slate-800/80 shadow-md space-y-2">
                  <div className="text-slate-500 dark:text-slate-400 text-xs font-bold">Average Sub ticket Price</div>
                  <div className="text-2xl font-extrabold text-slate-900 dark:text-white">₹9,999 / $149</div>
                  <p className="text-[9px] text-slate-400">Calculated over premium cohorts</p>
                </div>
              </div>

              {/* Transactions Ledger */}
              <div className="p-6 rounded-3xl bg-white dark:bg-[#0a0f1d] border border-slate-200 dark:border-slate-800/80 shadow-xl space-y-6 shadow-primary/5">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 dark:text-white font-display">
                    Platform Invoices & Transaction History
                  </h3>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">
                    Live client fee capture stream.
                  </p>
                </div>

                <div className="overflow-x-auto border border-slate-100 dark:border-slate-800 rounded-2xl">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 text-slate-500 dark:text-slate-400 uppercase text-[9px] tracking-wider font-extrabold">
                        <th className="py-3 px-4">Transaction ID</th>
                        <th className="py-3 px-4">Customer Name</th>
                        <th className="py-3 px-4">Settlement Fee</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4">Date & Time</th>
                        <th className="py-3 px-4">Gateway</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-semibold text-slate-700 dark:text-slate-350">
                      {transactions.map((tx) => (
                        <tr key={tx.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/20 transition-colors">
                          <td className="py-3 px-4 font-mono text-primary text-[10px]">{tx.id}</td>
                          <td className="py-3 px-4 text-slate-900 dark:text-white">{tx.clientName}</td>
                          <td className="py-3 px-4 font-bold text-slate-850 dark:text-slate-100">{tx.amount}</td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-2 py-0.5 rounded text-[9px] font-extrabold ${
                                tx.status === "Succeeded"
                                  ? "bg-emerald-500/10 text-emerald-505 border border-emerald-500/25"
                                  : tx.status === "Failed"
                                  ? "bg-red-500/10 text-red-500 border border-red-500/25"
                                  : "bg-amber-500/10 text-amber-500 border border-amber-500/25"
                              }`}
                            >
                              {tx.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-slate-500 text-[10px]">{tx.date}</td>
                          <td className="py-3 px-4 text-slate-550 font-semibold">{tx.gateway}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ======================================= */}
          {/* TAB 5: SERVICES                         */}
          {activeView === "services" && (
            <div className="space-y-6">
              
              {/* Header with Add Button */}
              <div className="p-6 rounded-3xl bg-white dark:bg-[#0a0f1d] border border-slate-200 dark:border-slate-800/80 shadow-xl flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 dark:text-white font-display">
                    Platform Microservices & Pipelines
                  </h3>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">
                    Configure individual backend triggers, metrics, and view processing latencies.
                  </p>
                </div>
                <button
                  onClick={() => setShowAddServiceForm(!showAddServiceForm)}
                  className="px-3.5 py-2 bg-primary text-white text-xs font-bold rounded-xl hover:opacity-95 transition-opacity shadow-md shadow-primary/10 flex items-center gap-1.5 shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  {showAddServiceForm ? "Hide Form" : "Add New Service"}
                </button>
              </div>

              {/* Add New Service Form */}
              {showAddServiceForm && (
                <motion.form
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onSubmit={handleAddService}
                  className="p-6 rounded-3xl bg-white dark:bg-[#0a0f1d] border border-slate-200 dark:border-slate-800/80 shadow-xl space-y-4 max-w-xl"
                >
                  <h4 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
                    Add New Platform Service
                  </h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Service Name</label>
                      <input
                        type="text"
                        required
                        value={newServiceName}
                        onChange={(e) => setNewServiceName(e.target.value)}
                        placeholder="e.g. SMTP Mail Dispatcher"
                        className="w-full px-3 py-2 rounded-xl bg-slate-5-0 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Initial Status</label>
                      <select
                        value={newServiceStatus}
                        onChange={(e) => setNewServiceStatus(e.target.value as any)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-primary"
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Maintenance">Maintenance</option>
                      </select>
                    </div>

                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Description</label>
                      <input
                        type="text"
                        value={newServiceDesc}
                        onChange={(e) => setNewServiceDesc(e.target.value)}
                        placeholder="Short description of what this microservice does..."
                        className="w-full px-3 py-2 rounded-xl bg-slate-5-0 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-505 uppercase tracking-wider">Feature 1</label>
                      <input
                        type="text"
                        required
                        value={newServiceFeature1}
                        onChange={(e) => setNewServiceFeature1(e.target.value)}
                        placeholder="e.g. Official Meta API Broadcasts"
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-primary"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-505 uppercase tracking-wider">Feature 2</label>
                      <input
                        type="text"
                        required
                        value={newServiceFeature2}
                        onChange={(e) => setNewServiceFeature2(e.target.value)}
                        placeholder="e.g. Unified Shared Agent Inbox"
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-955 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  {/* Pricing Fields Grid */}
                  <div className="border-t border-slate-150 dark:border-slate-800/80 pt-4 space-y-3">
                    <h5 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                      Service Pricing Configurations
                    </h5>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-550 uppercase tracking-wider block">Monthly (INR)</label>
                        <input
                          type="number"
                          required
                          value={newPriceMonthlyINR}
                          onChange={(e) => {
                            const val = e.target.value;
                            setNewPriceMonthlyINR(val);
                            const parsed = parseFloat(val);
                            if (!isNaN(parsed)) {
                              setNewPriceMonthlyUSD(Math.round(parsed / 80).toString());
                            } else {
                              setNewPriceMonthlyUSD("");
                            }
                          }}
                          placeholder="e.g. 1999"
                          className="w-full px-2.5 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-primary"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-550 uppercase tracking-wider block">Monthly (USD)</label>
                        <input
                          type="number"
                          required
                          value={newPriceMonthlyUSD}
                          onChange={(e) => setNewPriceMonthlyUSD(e.target.value)}
                          placeholder="e.g. 29"
                          className="w-full px-2.5 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-955 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-primary"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-550 uppercase tracking-wider block">Yearly (INR)</label>
                        <input
                          type="number"
                          required
                          value={newPriceYearlyINR}
                          onChange={(e) => {
                            const val = e.target.value;
                            setNewPriceYearlyINR(val);
                            const parsed = parseFloat(val);
                            if (!isNaN(parsed)) {
                              setNewPriceYearlyUSD(Math.round(parsed / 80).toString());
                            } else {
                              setNewPriceYearlyUSD("");
                            }
                          }}
                          placeholder="e.g. 19999"
                          className="w-full px-2.5 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-955 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-primary"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-550 uppercase tracking-wider block">Yearly (USD)</label>
                        <input
                          type="number"
                          required
                          value={newPriceYearlyUSD}
                          onChange={(e) => setNewPriceYearlyUSD(e.target.value)}
                          placeholder="e.g. 299"
                          className="w-full px-2.5 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-955 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-primary"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAddServiceForm(false)}
                      className="px-4 py-2 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-xl transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl hover:opacity-90 transition-opacity"
                    >
                      Save Service
                    </button>
                  </div>
                </motion.form>
              )}

              {/* Services Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map((srv) => (
                  <div
                    key={srv.id}
                    onClick={() => {
                      if (editingServiceId !== srv.id) {
                        handleStartEdit(srv);
                      }
                    }}
                    className={`p-5 rounded-2xl bg-white dark:bg-[#0a0f1d] border border-slate-200 dark:border-slate-800/80 shadow-md flex flex-col justify-between gap-4 relative group/card transition-all duration-300 ${
                      editingServiceId === srv.id
                        ? "ring-2 ring-primary/60 border-transparent cursor-default"
                        : "cursor-pointer hover:shadow-xl hover:border-primary/40 hover:-translate-y-0.5 active:scale-[0.995]"
                    }`}
                  >
                    {editingServiceId === srv.id ? (
                      /* Editing View */
                      <form 
                        onSubmit={handleSaveEdit}
                        onClick={(e) => e.stopPropagation()}
                        className="space-y-3.5"
                      >
                        <div className="text-xs font-bold text-slate-900 dark:text-white">Editing {srv.name}</div>
                        
                        <div className="space-y-2 text-xs">
                          <input
                            type="text"
                            required
                            value={editServiceName}
                            onChange={(e) => setEditServiceName(e.target.value)}
                            placeholder="Service Name"
                            className="w-full px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-955 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none"
                          />
                          <input
                            type="text"
                            value={editServiceDesc}
                            onChange={(e) => setEditServiceDesc(e.target.value)}
                            placeholder="Description"
                            className="w-full px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-955 border border-slate-200 dark:border-slate-805 text-xs text-slate-900 dark:text-white focus:outline-none"
                          />
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block text-[8px] text-slate-400 uppercase font-bold">Feature 1</label>
                              <input
                                type="text"
                                required
                                value={editServiceFeature1}
                                onChange={(e) => setEditServiceFeature1(e.target.value)}
                                className="w-full px-2 py-1 rounded-xl bg-slate-50 dark:bg-slate-955 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-[8px] text-slate-400 uppercase font-bold">Feature 2</label>
                              <input
                                type="text"
                                required
                                value={editServiceFeature2}
                                onChange={(e) => setEditServiceFeature2(e.target.value)}
                                className="w-full px-2 py-1 rounded-xl bg-slate-50 dark:bg-slate-955 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                            <div>
                              <label className="block text-[8px] text-slate-400 uppercase font-bold">Monthly (INR)</label>
                              <input
                                type="number"
                                required
                                value={editPriceMonthlyINR}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setEditPriceMonthlyINR(val);
                                  const parsed = parseFloat(val);
                                  if (!isNaN(parsed)) {
                                    setEditPriceMonthlyUSD(Math.round(parsed / 80).toString());
                                  } else {
                                    setEditPriceMonthlyUSD("");
                                  }
                                }}
                                className="w-full px-2 py-1 rounded-xl bg-slate-50 dark:bg-slate-955 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-[8px] text-slate-400 uppercase font-bold">Monthly (USD)</label>
                              <input
                                type="number"
                                required
                                value={editPriceMonthlyUSD}
                                onChange={(e) => setEditPriceMonthlyUSD(e.target.value)}
                                className="w-full px-2 py-1 rounded-xl bg-slate-50 dark:bg-slate-955 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-[8px] text-slate-400 uppercase font-bold">Yearly (INR)</label>
                              <input
                                type="number"
                                required
                                value={editPriceYearlyINR}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setEditPriceYearlyINR(val);
                                  const parsed = parseFloat(val);
                                  if (!isNaN(parsed)) {
                                    setEditPriceYearlyUSD(Math.round(parsed / 80).toString());
                                  } else {
                                    setEditPriceYearlyUSD("");
                                  }
                                }}
                                className="w-full px-2 py-1 rounded-xl bg-slate-50 dark:bg-slate-955 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-[8px] text-slate-400 uppercase font-bold">Yearly (USD)</label>
                              <input
                                type="number"
                                required
                                value={editPriceYearlyUSD}
                                onChange={(e) => setEditPriceYearlyUSD(e.target.value)}
                                className="w-full px-2 py-1 rounded-xl bg-slate-50 dark:bg-slate-955 border border-slate-200 dark:border-slate-805 text-xs text-slate-900 dark:text-white focus:outline-none"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                          <button
                            type="button"
                            onClick={() => setEditingServiceId(null)}
                            className="px-2.5 py-1 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-bold rounded-lg transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-2.5 py-1 bg-primary text-white text-[10px] font-bold rounded-lg hover:opacity-90 transition-opacity"
                          >
                            Save Changes
                          </button>
                        </div>
                      </form>
                    ) : (
                      /* Display View */
                      <>
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                              {srv.name}
                              <span
                                className={`w-2 h-2 rounded-full ${
                                  srv.status === "Active"
                                    ? "bg-emerald-500"
                                    : srv.status === "Inactive"
                                    ? "bg-red-500"
                                    : "bg-amber-500 animate-pulse"
                                }`}
                              />
                            </div>
                            <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                              {srv.description}
                            </p>
                          </div>

                          <div className="flex items-center gap-2">
                            {/* Edit & Delete Action Buttons (Visible on hover) */}
                            <div className="flex items-center gap-1 opacity-0 group-hover/card:opacity-100 transition-opacity">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleStartEdit(srv);
                                }}
                                className="p-1 rounded-lg text-slate-400 hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                title="Edit Service"
                              >
                                <Edit className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteService(srv.id);
                                }}
                                className="p-1 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-500/10 transition-colors"
                                title="Delete Service"
                              >
                                <Trash className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleServiceStatus(srv.id);
                              }}
                              className={`px-3 py-1 rounded-xl text-[9px] font-extrabold border transition-colors shrink-0 ${
                                srv.status === "Active"
                                  ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-455"
                                  : srv.status === "Maintenance"
                                  ? "bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400"
                                  : "bg-red-500/10 border-red-500/20 text-red-655 dark:text-red-400"
                              }`}
                            >
                              {srv.status === "Active" ? "Live" : srv.status === "Maintenance" ? "Maintain" : "Stopped"}
                            </button>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-1.5 text-[10px]">
                          {(srv.features && srv.features.length > 0 ? srv.features : getDefaultFeatures(srv.name, srv.id)).map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <svg className="w-3.5 h-3.5 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                              </svg>
                              <span className="text-slate-650 dark:text-slate-350">{feature}</span>
                            </div>
                          ))}

                          {/* Pricing Grid display */}
                          <div className="mt-3 pt-2.5 border-t border-dashed border-slate-150 dark:border-slate-800/60 grid grid-cols-2 gap-2 text-[10px] text-slate-550 dark:text-slate-400">
                            <div>
                              <span className="block text-[8px] text-slate-400 uppercase font-extrabold tracking-wider">Monthly Pricing</span>
                              <span className="font-bold text-slate-850 dark:text-slate-200">
                                ₹{(srv.priceMonthlyINR ?? getDefaultPrices(srv.name, srv.id).mINR).toLocaleString()} / ${(srv.priceMonthlyUSD ?? getDefaultPrices(srv.name, srv.id).mUSD).toLocaleString()}
                              </span>
                            </div>
                            <div>
                              <span className="block text-[8px] text-slate-400 uppercase font-extrabold tracking-wider">Yearly Pricing</span>
                              <span className="font-bold text-slate-850 dark:text-slate-200">
                                ₹{(srv.priceYearlyINR ?? getDefaultPrices(srv.name, srv.id).yINR).toLocaleString()} / ${(srv.priceYearlyUSD ?? getDefaultPrices(srv.name, srv.id).yUSD).toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======================================= */}
          {/* TAB 6: SETTINGS                         */}
          {/* ======================================= */}
          {activeView === "settings" && (
            <div className="p-6 rounded-3xl bg-white dark:bg-[#0a0f1d] border border-slate-200 dark:border-slate-800/80 space-y-6 shadow-xl">
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white font-display">
                  System Parameter Toggles
                </h3>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">
                  Configure real-time server switches.
                </p>
              </div>

              {/* Switches */}
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80">
                  <div>
                    <div className="text-xs font-bold text-slate-905 dark:text-white">Developer Debug Logs</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">Record all inbound transaction parameters in DB</div>
                  </div>
                  <button
                    onClick={() => setFeatureFlags(prev => ({ ...prev, debugLogsEnabled: !prev.debugLogsEnabled }))}
                    className={`p-1 transition-colors ${featureFlags.debugLogsEnabled ? "text-emerald-500" : "text-slate-400"}`}
                  >
                    {featureFlags.debugLogsEnabled ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8" />}
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80">
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">Platform Maintenance Lock Mode</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">Locks all customer portals for database updates</div>
                  </div>
                  <button
                    onClick={() => setFeatureFlags(prev => ({ ...prev, maintenanceMode: !prev.maintenanceMode }))}
                    className={`p-1 transition-colors ${featureFlags.maintenanceMode ? "text-emerald-500" : "text-slate-400"}`}
                  >
                    {featureFlags.maintenanceMode ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8" />}
                  </button>
                </div>
              </div>

              {/* Secure API Key Rotation */}
              <div className="p-4 rounded-2xl bg-red-500/5 border border-red-500/20 space-y-4">
                <div className="flex items-start gap-2.5">
                  <ShieldAlert className="w-4 h-4 text-red-500 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-red-700 dark:text-red-405">Master Secret Keys Rotation</div>
                    <div className="text-[9px] text-slate-500 dark:text-slate-400 mt-0.5">
                      Changing keys invalidates all active third-party developer integrations. Use with extreme caution.
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={systemSecretKey}
                    className="flex-1 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-250 dark:border-slate-850 font-mono text-[10px] text-slate-800 dark:text-slate-350 focus:outline-none"
                  />
                  <button
                    onClick={rotateSecretKey}
                    className="px-4 py-2 bg-red-600 dark:bg-red-500 text-white text-xs font-bold rounded-xl hover:bg-red-700 transition-colors flex items-center gap-2 shrink-0"
                  >
                    <Key className="w-3.5 h-3.5" />
                    Rotate Secret Key
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ======================================= */}
          {/* TAB 7: MY PROFILE                       */}
          {/* ======================================= */}
          {activeView === "profile" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              <div className="p-6 rounded-3xl bg-white dark:bg-[#0a0f1d] border border-slate-200 dark:border-slate-800/80 shadow-xl space-y-6 flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-500 to-orange-505 flex items-center justify-center font-extrabold text-3xl text-white shadow-xl shadow-amber-500/10">
                  {profileName ? profileName.charAt(0) : "M"}
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white font-display">
                    {profileName}
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] font-extrabold mt-1 inline-block">
                    Super Administrator Role
                  </span>
                </div>

                <div className="w-full text-left text-xs font-semibold text-slate-500 dark:text-slate-400 space-y-2 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                  <div className="flex justify-between">
                    <span>Authorized Key:</span>
                    <span className="font-mono text-slate-700 dark:text-slate-300">{profileAuthKey}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Admin Level:</span>
                    <span className="text-slate-750 dark:text-slate-350">{profileAdminLevel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Country Origin:</span>
                    <span className="text-slate-750 dark:text-slate-350">{profileCountry}</span>
                  </div>
                </div>
              </div>

              {/* Edit credentials */}
              <div className="lg:col-span-2 p-6 rounded-3xl bg-white dark:bg-[#0a0f1d] border border-slate-200 dark:border-slate-800/80 shadow-xl space-y-5">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 dark:text-white font-display">
                    Security & Credentials Information
                  </h3>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">
                    Change administrative access criteria and details.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Administrator Name
                    </label>
                    <input
                      type="text"
                      value={profileName}
                      onChange={(e) => setProfileName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-955 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-primary"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Admin Email ID
                    </label>
                    <input
                      type="email"
                      value={profileEmail}
                      onChange={(e) => setProfileEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-955 border border-slate-200 dark:border-slate-850 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-primary"
                    />
                  </div>

                  {/* Passcode */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Master Passcode Secret Key
                    </label>
                    <input
                      type="password"
                      value={profilePasscode}
                      onChange={(e) => setProfilePasscode(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-primary"
                    />
                  </div>

                  {/* Authorized Key */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Authorized Key
                    </label>
                    <input
                      type="text"
                      value={profileAuthKey}
                      onChange={(e) => setProfileAuthKey(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-primary"
                    />
                  </div>

                  {/* Admin Level */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Admin Level
                    </label>
                    <input
                      type="text"
                      value={profileAdminLevel}
                      onChange={(e) => setProfileAdminLevel(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-primary"
                    />
                  </div>

                  {/* Country Origin */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Country Origin
                    </label>
                    <input
                      type="text"
                      value={profileCountry}
                      onChange={(e) => setProfileCountry(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-3">
                  <button
                    onClick={handleSaveProfile}
                    className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl hover:opacity-90 transition-opacity"
                  >
                    Save Changes Profile
                  </button>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* Invitation Success Modal */}
      {invitationSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-md p-6 rounded-3xl bg-white dark:bg-[#0a0f1d] border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6 relative"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                <Check className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white font-display">
                  Sub Admin Invited Successfully!
                </h3>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">
                  Invitation created and credentials generated.
                </p>
              </div>
            </div>

            <div className="space-y-3.5 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-150 dark:border-slate-800/40 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400 dark:text-slate-500 font-medium">Name:</span>
                <span className="font-bold text-slate-900 dark:text-white">{invitationSuccessModal.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 dark:text-slate-500 font-medium">Email:</span>
                <span className="font-bold text-slate-900 dark:text-white font-mono text-[11px]">{invitationSuccessModal.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 dark:text-slate-500 font-medium">Role:</span>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-blue-500/10 text-blue-500 border border-blue-500/20">{invitationSuccessModal.role}</span>
              </div>
              
              <div className="pt-2.5 border-t border-slate-200 dark:border-slate-800 space-y-2">
                <div className="space-y-1">
                  <span className="text-slate-400 dark:text-slate-500 font-medium block text-[10px] uppercase tracking-wider">Temporary Password</span>
                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-100 dark:bg-slate-950 font-mono text-[11px] font-bold text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800">
                    <span>{invitationSuccessModal.tempPass}</span>
                    <button
                      onClick={() => navigator.clipboard.writeText(invitationSuccessModal.tempPass)}
                      className="text-[10px] text-primary hover:underline font-sans"
                    >
                      Copy
                    </button>
                  </div>
                </div>

                <div className="space-y-1 pt-1.5">
                  <span className="text-slate-400 dark:text-slate-500 font-medium block text-[10px] uppercase tracking-wider">Login URL</span>
                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-100 dark:bg-slate-950 font-mono text-[10px] font-bold text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 overflow-hidden">
                    <span className="truncate flex-1 mr-2">{invitationSuccessModal.loginUrl}</span>
                    <button
                      onClick={() => navigator.clipboard.writeText(invitationSuccessModal.loginUrl)}
                      className="text-[10px] text-primary hover:underline font-sans shrink-0"
                    >
                      Copy Link
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setInvitationSuccessModal(null)}
              className="w-full py-2.5 bg-primary text-white text-xs font-bold rounded-xl hover:opacity-95 transition-opacity"
            >
              Done & Close
            </button>
          </motion.div>
        </div>
      )}

    </div>
  );
}
