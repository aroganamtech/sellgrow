"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Sliders,
  LogOut,
  RefreshCw,
  ToggleLeft,
  ToggleRight,
  User,
  SlidersHorizontal,
  Lock,
  Mail,
  ShieldCheck,
  Check,
  ArrowRight,
  Plus,
  Trash,
  Package,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Wrench,
  Eye,
  EyeOff,
} from "lucide-react";

// Types
interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  permissions: string;
  password?: string;
  assignedServices?: string[];
}

interface Employee {
  id: string;
  name: string;
  email: string;
  work: string;
  status: string;
  access: string;
  assignedSubAdmin: string;
}

interface ServiceItem {
  id: string;
  name: string;
  description: string;
  status: string;
  features?: string[];
}

export default function SubAdminPortal() {
  const router = useRouter();
  const params = useParams();
  const rawRole = params.role as string;
  
  const roleSlug = rawRole ? rawRole.toLowerCase() : "";
  const roleName = roleSlug === "superadmin" 
    ? "Super Admin" 
    : roleSlug.charAt(0).toUpperCase() + roleSlug.slice(1);

  // States
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  
  const [loggedInUser, setLoggedInUser] = useState<TeamMember | null>(null);
  const [assignedEmployees, setAssignedEmployees] = useState<Employee[]>([]);
  const [assignedServices, setAssignedServices] = useState<ServiceItem[]>([]);
  const [featureFlags, setFeatureFlags] = useState({
    maintenanceMode: false,
    aiVoiceEnabled: true,
    whatsappEnabled: true,
    autoGeoIpEnabled: true
  });
  
  const [activeTab, setActiveTab] = useState<"dashboard" | "services" | "employees" | "flags">("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Load data on init
  useEffect(() => {
    if (typeof window !== "undefined") {
      const authState = sessionStorage.getItem(`sg_subadmin_auth_${roleSlug}`);
      const savedUser = sessionStorage.getItem(`sg_subadmin_user_${roleSlug}`);
      
      if (authState === "true" && savedUser) {
        setIsAuthenticated(true);
        setLoggedInUser(JSON.parse(savedUser));
      }
      setIsLoading(false);
    }
  }, [roleSlug]);

  // Load employees, services and flags when authenticated
  useEffect(() => {
    if (isAuthenticated && loggedInUser) {
      // Load employees
      fetch("/api/admin/employees")
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success" && data.data) {
            const allEmps: Employee[] = data.data;
            const filtered = allEmps.filter(
              (emp) => emp.assignedSubAdmin.toLowerCase() === loggedInUser.name.toLowerCase()
            );
            setAssignedEmployees(filtered);
          }
        })
        .catch(console.error);

      // Load assigned services — re-fetch team to get latest assignedServices
      fetch("/api/admin/team")
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success" && data.data) {
            const me = data.data.find((m: TeamMember) => m.id === loggedInUser.id);
            if (me) {
              // Update session with latest data
              const updatedUser = { ...loggedInUser, assignedServices: me.assignedServices || [] };
              setLoggedInUser(updatedUser);
              sessionStorage.setItem(`sg_subadmin_user_${roleSlug}`, JSON.stringify(updatedUser));

              // Fetch all services then filter to assigned ones
              if ((me.assignedServices || []).length > 0) {
                fetch("/api/admin/services")
                  .then((res) => res.json())
                  .then((srvData) => {
                    if (srvData.status === "success" && srvData.data) {
                      const filtered = srvData.data.filter((s: ServiceItem) =>
                        (me.assignedServices || []).includes(s.id)
                      );
                      setAssignedServices(filtered);
                    }
                  })
                  .catch(console.error);
              } else {
                setAssignedServices([]);
              }
            }
          }
        })
        .catch(console.error);

      // Load feature flags
      const storedFlags = localStorage.getItem("sg_feature_flags");
      if (storedFlags) {
        try {
          setFeatureFlags(JSON.parse(storedFlags));
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, [isAuthenticated, loggedInUser?.id]);

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    fetch("/api/admin/team")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success" && data.data) {
          const teamList: TeamMember[] = data.data;
          const match = teamList.find(
            (tm) => 
              tm.email.toLowerCase() === email.toLowerCase() && 
              tm.password === password && 
              (tm.role.toLowerCase() === roleSlug || (roleSlug === "superadmin" && tm.role === "SuperAdmin"))
          );

          if (match) {
            setIsAuthenticated(true);
            setLoggedInUser(match);
            sessionStorage.setItem(`sg_subadmin_auth_${roleSlug}`, "true");
            sessionStorage.setItem(`sg_subadmin_user_${roleSlug}`, JSON.stringify(match));
          } else {
            setLoginError("Invalid credentials or role mismatch for this portal.");
          }
        } else {
          setLoginError("Failed to fetch sub-admin database records.");
        }
      })
      .catch((err) => {
        setLoginError("Network error: " + err.message);
      });
  };

  // Handle Logout
  const handleLogout = () => {
    sessionStorage.removeItem(`sg_subadmin_auth_${roleSlug}`);
    sessionStorage.removeItem(`sg_subadmin_user_${roleSlug}`);
    setIsAuthenticated(false);
    setLoggedInUser(null);
    setEmail("");
    setPassword("");
  };

  // Update employee detail
  const handleUpdateEmployee = (empId: string, field: keyof Employee, value: string) => {
    if (loggedInUser?.permissions === "Read Only" || loggedInUser?.permissions === "View Only") return;
    
    const updatedLocal = assignedEmployees.map((emp) => 
      emp.id === empId ? { ...emp, [field]: value } : emp
    );
    setAssignedEmployees(updatedLocal);

    fetch("/api/admin/employees", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: empId, [field]: value })
    }).catch(console.error);
  };

  // Toggle Feature Flags
  const handleToggleFlag = (key: keyof typeof featureFlags) => {
    if (loggedInUser?.permissions === "Read Only" || loggedInUser?.permissions === "View Only") return;
    
    const updatedFlags = { ...featureFlags, [key]: !featureFlags[key] };
    setFeatureFlags(updatedFlags);
    localStorage.setItem("sg_feature_flags", JSON.stringify(updatedFlags));
  };

  const getServiceStatusIcon = (status: string) => {
    if (status === "Active") return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
    if (status === "Maintenance") return <Wrench className="w-4 h-4 text-amber-500" />;
    return <AlertCircle className="w-4 h-4 text-slate-400" />;
  };

  const getServiceStatusColor = (status: string) => {
    if (status === "Active") return "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
    if (status === "Maintenance") return "text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20";
    return "text-slate-500 bg-slate-500/10 border-slate-500/20";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#070b15] flex flex-col items-center justify-center text-slate-400 text-sm gap-3">
        <RefreshCw className="w-6 h-6 animate-spin text-primary" />
        <span>Loading Sub Admin Portal...</span>
      </div>
    );
  }

  // LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/10 dark:from-[#070b15] dark:via-indigo-950/10 dark:to-[#070b15] flex items-center justify-center p-4 relative overflow-hidden font-sans">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/8 dark:bg-primary/15 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/8 dark:bg-secondary/15 rounded-full blur-3xl" />

        <motion.div 
          initial={{ opacity: 0, y: 16, scale: 0.97 }} 
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md relative z-10"
        >
          <div className="bg-white/90 dark:bg-[#0a0f1d]/90 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-2xl">
            <div className="h-1 w-full bg-gradient-to-r from-primary via-secondary to-indigo-500" />
            <div className="p-8 space-y-6">
              {/* Header */}
              <div className="text-center space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white mx-auto shadow-lg shadow-primary/25">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <div>
                  <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white font-display">
                    Sub Admin Portal
                  </h1>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Access level: <span className="text-primary font-bold">{roleName} Workspace</span>
                  </p>
                </div>
              </div>

              {loginError && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {loginError}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@sellgrow.co"
                      className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                    Temporary Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPass ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-600 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                      tabIndex={-1}
                    >
                      {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  className="w-full py-3.5 bg-gradient-to-r from-primary to-secondary text-white text-sm font-bold rounded-2xl shadow-lg shadow-primary/20 flex items-center justify-center gap-2 transition-all"
                >
                  <ShieldCheck className="w-4 h-4" />
                  Authorize & Enter Portal
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // MAIN WORKSPACE INTERFACE
  const navItems: { id: "dashboard" | "services" | "employees" | "flags"; label: string; icon: any; badge?: number }[] = [
    { id: "dashboard", label: "Dashboard", icon: User },
    { id: "services", label: "My Services", icon: Package, badge: (loggedInUser?.assignedServices || []).length || undefined },
    { id: "employees", label: "Employees", icon: Users },
    { id: "flags", label: "Feature Settings", icon: Sliders },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070b15] text-slate-900 dark:text-slate-100 flex font-sans transition-colors duration-300">
      
      {/* SIDEBAR */}
      <aside className={`shrink-0 bg-white dark:bg-[#0a0f1d] border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between transition-all duration-300 ${
        sidebarCollapsed ? "w-16" : "w-60"
      }`}>
        <div className="flex flex-col flex-1">
          {/* Logo Header */}
          <div className="p-4 border-b border-slate-100 dark:border-slate-800/60 flex items-center gap-2 overflow-hidden h-16">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white shrink-0 font-bold text-xs shadow-md">
              SG
            </div>
            {!sidebarCollapsed && (
              <span className="font-extrabold text-sm font-display tracking-wide text-slate-900 dark:text-white truncate">
                {roleName} Panel
              </span>
            )}
          </div>

          {/* Profile overview */}
          {!sidebarCollapsed && loggedInUser && (
            <div className="p-4 border-b border-slate-100 dark:border-slate-800/60 bg-primary/5 dark:bg-primary/10">
              <div className="text-xs font-bold text-slate-900 dark:text-white truncate">{loggedInUser.name}</div>
              <div className="text-[9px] text-slate-500 truncate mt-0.5">{loggedInUser.email}</div>
              <span className="mt-1.5 inline-block px-2 py-0.5 rounded-full bg-primary/15 border border-primary/25 text-primary text-[8px] font-extrabold">
                {loggedInUser.permissions}
              </span>
            </div>
          )}

          {/* Nav items */}
          <nav className="flex-1 p-2 space-y-0.5">
            {navItems.map(({ id, label, icon: Icon, badge }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all relative ${
                  activeTab === id
                    ? "bg-primary text-white shadow-md shadow-primary/20"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900/50 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {!sidebarCollapsed && <span className="flex-1 text-left">{label}</span>}
                {!sidebarCollapsed && badge !== undefined && badge > 0 && (
                  <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-full ${
                    activeTab === id ? "bg-white/20 text-white" : "bg-primary/15 text-primary"
                  }`}>
                    {badge}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Logout */}
        <div className="p-3 border-t border-slate-100 dark:border-slate-800/60">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-red-500 hover:bg-red-500/10 transition-all group"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {!sidebarCollapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* CONTENT PANEL */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Header toolbar */}
        <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0a0f1d] flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
            <div>
              <h2 className="text-sm font-extrabold text-slate-900 dark:text-white font-display">
                Sub Admin Workspace
              </h2>
              <p className="text-[9px] text-slate-400 font-mono">
                Access Scope: {loggedInUser?.permissions}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Live</span>
          </div>
        </header>

        {/* Main sections */}
        <main className="flex-1 p-5 sm:p-6 space-y-6 overflow-y-auto max-w-6xl w-full mx-auto">
          
          {/* ── TAB 1: DASHBOARD ── */}
          {activeTab === "dashboard" && loggedInUser && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Welcome banner */}
              <div className="p-6 rounded-3xl bg-gradient-to-r from-primary/10 via-secondary/10 to-transparent border border-primary/20 dark:border-primary/30 relative overflow-hidden shadow-xl shadow-primary/5">
                <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
                <div className="relative z-10 space-y-1.5">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-primary">Workspace Overview</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-display">
                    Welcome back, {loggedInUser.name}!
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
                    You are logged in as <strong>{roleName}</strong>. Your access scope is <strong>{loggedInUser.permissions}</strong>. You have {assignedServices.length} service{assignedServices.length !== 1 ? "s" : ""} and {assignedEmployees.length} employee{assignedEmployees.length !== 1 ? "s" : ""} assigned to you.
                  </p>
                </div>
              </div>

              {/* Status cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="p-5 rounded-2xl bg-white dark:bg-[#0a0f1d] border border-slate-200 dark:border-slate-800/80 shadow-md space-y-2">
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wide flex items-center gap-1.5">
                    <Package className="w-3.5 h-3.5 text-primary" />
                    Assigned Services
                  </div>
                  <div className="text-3xl font-extrabold text-slate-900 dark:text-white font-display">{assignedServices.length}</div>
                  <div className="text-[10px] text-slate-400 font-mono">Platform modules scoped to you</div>
                </div>

                <div className="p-5 rounded-2xl bg-white dark:bg-[#0a0f1d] border border-slate-200 dark:border-slate-800/80 shadow-md space-y-2">
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wide flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-indigo-500" />
                    Employees Under You
                  </div>
                  <div className="text-3xl font-extrabold text-slate-900 dark:text-white font-display">{assignedEmployees.length}</div>
                  <div className="text-[10px] text-slate-400 font-mono">Direct staff resources</div>
                </div>

                <div className="p-5 rounded-2xl bg-white dark:bg-[#0a0f1d] border border-slate-200 dark:border-slate-800/80 shadow-md space-y-2">
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wide flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    Account Status
                  </div>
                  <div className="text-lg font-extrabold text-emerald-500 font-display flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    {loggedInUser.status}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">Profile active & verified</div>
                </div>
              </div>

              {/* Quick service preview */}
              {assignedServices.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wide flex items-center gap-1.5">
                    <Package className="w-3.5 h-3.5 text-primary" />
                    Your Service Scope (Quick View)
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {assignedServices.map(srv => (
                      <div key={srv.id} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold ${getServiceStatusColor(srv.status)}`}>
                        {getServiceStatusIcon(srv.status)}
                        {srv.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* ── TAB 2: MY SERVICES ── */}
          {activeTab === "services" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-5"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white font-display flex items-center gap-2">
                    <Package className="w-5 h-5 text-primary" />
                    My Assigned Services
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Platform services assigned to your scope by the Super Admin.
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-extrabold border border-primary/20">
                  {assignedServices.length} Active
                </span>
              </div>

              {assignedServices.length === 0 ? (
                <div className="p-12 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0a0f1d] text-center space-y-3">
                  <Package className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto" />
                  <p className="text-sm font-bold text-slate-500 dark:text-slate-400">No Services Assigned Yet</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500 max-w-xs mx-auto">
                    The Super Admin has not yet assigned any platform services to your scope. Check back after your next briefing.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {assignedServices.map((srv, idx) => (
                    <motion.div
                      key={srv.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.06 }}
                      className="p-5 rounded-3xl bg-white dark:bg-[#0a0f1d] border border-slate-200 dark:border-slate-800 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 space-y-4 group"
                    >
                      {/* Service Header */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary/80 to-secondary/80 flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform">
                          <Package className="w-5 h-5" />
                        </div>
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-extrabold border ${getServiceStatusColor(srv.status)}`}>
                          {getServiceStatusIcon(srv.status)}
                          {srv.status}
                        </span>
                      </div>

                      {/* Service Info */}
                      <div>
                        <h4 className="text-sm font-extrabold text-slate-900 dark:text-white font-display">{srv.name}</h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed line-clamp-2">
                          {srv.description}
                        </p>
                      </div>

                      {/* Features */}
                      {srv.features && srv.features.length > 0 && (
                        <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                          {srv.features.slice(0, 2).map((feat, fi) => (
                            <div key={fi} className="flex items-center gap-2 text-[11px] text-slate-600 dark:text-slate-400">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                              <span className="font-medium">{feat}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Scope badge */}
                      <div className="pt-1 flex items-center gap-1.5 text-[10px] text-primary font-bold">
                        <ShieldCheck className="w-3 h-3" />
                        <span>Scoped to your workspace</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* ── TAB 3: ASSIGNED EMPLOYEES ── */}
          {activeTab === "employees" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-3xl bg-white dark:bg-[#0a0f1d] border border-slate-200 dark:border-slate-800/80 shadow-xl space-y-5"
            >
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white font-display flex items-center gap-2">
                  <Users className="w-4 h-4 text-indigo-500" />
                  Assigned Employee Resources
                </h3>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                  All staff assigned to your oversight by the Super Admin.
                </p>
              </div>

              {assignedEmployees.length > 0 ? (
                <div className="overflow-x-auto border border-slate-150 dark:border-slate-800/60 rounded-2xl">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-50 dark:bg-slate-900/40 text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider border-b border-slate-150 dark:border-slate-800/60">
                        <th className="px-5 py-3.5">Name</th>
                        <th className="px-5 py-3.5">Email</th>
                        <th className="px-5 py-3.5">Work / Project</th>
                        <th className="px-5 py-3.5">Access Level</th>
                        <th className="px-5 py-3.5">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-150 dark:divide-slate-800/50">
                      {assignedEmployees.map((emp) => (
                        <tr key={emp.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/20 transition-colors">
                          <td className="px-5 py-4 font-bold text-slate-900 dark:text-white">{emp.name}</td>
                          <td className="px-5 py-4 text-slate-500 dark:text-slate-400 font-mono text-[11px]">{emp.email}</td>
                          <td className="px-5 py-4">
                            {loggedInUser?.permissions === "Read Only" || loggedInUser?.permissions === "View Only" ? (
                              <span className="font-bold text-slate-700 dark:text-slate-300">{emp.work}</span>
                            ) : (
                              <select
                                value={emp.work}
                                onChange={(e) => handleUpdateEmployee(emp.id, "work", e.target.value)}
                                className="px-2.5 py-1 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-[10px] font-bold text-slate-800 dark:text-slate-200 focus:outline-none"
                              >
                                <option>Voice AI Integration</option>
                                <option>CRM Automation</option>
                                <option>Landing Page Editor</option>
                                <option>Customer Support</option>
                                <option>Broadcasting Engine</option>
                              </select>
                            )}
                          </td>
                          <td className="px-5 py-4">
                            {loggedInUser?.permissions === "Read Only" || loggedInUser?.permissions === "View Only" ? (
                              <span className="font-bold text-slate-700 dark:text-slate-300">{emp.access}</span>
                            ) : (
                              <select
                                value={emp.access}
                                onChange={(e) => handleUpdateEmployee(emp.id, "access", e.target.value)}
                                className="px-2.5 py-1 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-[10px] font-bold text-slate-800 dark:text-slate-200 focus:outline-none"
                              >
                                <option>Full Access</option>
                                <option>Read & Write</option>
                                <option>View Only</option>
                              </select>
                            )}
                          </td>
                          <td className="px-5 py-4">
                            {loggedInUser?.permissions === "Read Only" || loggedInUser?.permissions === "View Only" ? (
                              <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold ${
                                emp.status === "Active" ? "text-emerald-500" : "text-amber-500"
                              }`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${emp.status === "Active" ? "bg-emerald-500 animate-pulse" : "bg-amber-500"}`} />
                                {emp.status}
                              </span>
                            ) : (
                              <select
                                value={emp.status}
                                onChange={(e) => handleUpdateEmployee(emp.id, "status", e.target.value)}
                                className={`px-2.5 py-1 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-[10px] font-bold focus:outline-none ${
                                  emp.status === "Active" ? "text-emerald-500" : "text-amber-500"
                                }`}
                              >
                                <option value="Active">Active</option>
                                <option value="Suspended">Suspended</option>
                              </select>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-8 text-center text-xs text-slate-500 border border-dashed border-slate-250 dark:border-slate-800 rounded-2xl">
                  No employees are currently assigned to your management record by the Super Admin.
                </div>
              )}
            </motion.div>
          )}

          {/* ── TAB 4: FEATURE SETTINGS ── */}
          {activeTab === "flags" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-3xl bg-white dark:bg-[#0a0f1d] border border-slate-200 dark:border-slate-800/80 shadow-xl space-y-5"
            >
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white font-display flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-amber-500" />
                  Platform Control Flags
                </h3>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                  Configure feature flags live. Requires Read/Write or Full Access scope.
                </p>
              </div>

              {(loggedInUser?.permissions === "Read Only" || loggedInUser?.permissions === "View Only") && (
                <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 text-xs flex items-center gap-2 font-semibold">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  View Only Mode — You don't have permission to toggle platform switches.
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {[
                  { key: "aiVoiceEnabled" as const, label: "AI Voice Engine", desc: "Voice call pipeline" },
                  { key: "whatsappEnabled" as const, label: "WhatsApp Broadcaster", desc: "Multi-channel chat broadcast" },
                  { key: "autoGeoIpEnabled" as const, label: "Geo-IP Auto Route", desc: "Automated client regions" },
                ].map(({ key, label, desc }) => (
                  <div key={key} className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-150 dark:border-slate-800/60 flex items-center justify-between shadow-sm">
                    <div>
                      <h4 className="text-xs font-extrabold text-slate-900 dark:text-white font-display">{label}</h4>
                      <p className="text-[9px] text-slate-500 dark:text-slate-400 mt-0.5">{desc}</p>
                    </div>
                    <button
                      disabled={loggedInUser?.permissions === "Read Only" || loggedInUser?.permissions === "View Only"}
                      onClick={() => handleToggleFlag(key)}
                      className="focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {featureFlags[key] ? (
                        <ToggleRight className="w-8 h-8 text-emerald-500" />
                      ) : (
                        <ToggleLeft className="w-8 h-8 text-slate-400" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
}
