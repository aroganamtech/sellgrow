"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Lock,
  Key,
  Edit3,
  TrendingUp,
  Home,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Eye,
  EyeOff,
  Sun,
  Moon,
  Layers,
  BarChart3,
  Users,
  Cpu,
  Shield,
  Globe,
  Zap,
} from "lucide-react";
import Logo from "@/components/layout/Logo";
import AdminHeader from "@/components/admin/AdminHeader";
import { useTheme } from "@/contexts/ThemeContext";

/* ─────────────────────── tiny helpers ─────────────────────── */
const FloatingOrb = ({
  cx,
  cy,
  size,
  color,
  delay,
}: {
  cx: string;
  cy: string;
  size: string;
  color: string;
  delay: number;
}) => (
  <motion.div
    className={`absolute rounded-full blur-3xl pointer-events-none ${size} ${color}`}
    style={{ left: cx, top: cy }}
    animate={{ scale: [1, 1.18, 1], opacity: [0.35, 0.55, 0.35] }}
    transition={{ duration: 6 + delay, repeat: Infinity, ease: "easeInOut", delay }}
  />
);

const StatBadge = ({
  icon: Icon,
  label,
  value,
  color,
  delay,
}: {
  icon: any;
  label: string;
  value: string;
  color: string;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-700/60 backdrop-blur-xl shadow-sm"
  >
    <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${color}`}>
      <Icon className="w-4 h-4" />
    </div>
    <div>
      <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 leading-none">
        {label}
      </p>
      <p className="text-sm font-extrabold text-slate-900 dark:text-white leading-tight mt-0.5">
        {value}
      </p>
    </div>
  </motion.div>
);

/* ─────────────────────── main component ─────────────────────── */
export default function SuperAdminChoicePage() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [authError, setAuthError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    const savedAuth = sessionStorage.getItem("sg_superadmin_auth");
    if (savedAuth === "true") setIsAuthenticated(true);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === "admin123" || passcode === "sellgrow-admin") {
      setIsAuthenticated(true);
      sessionStorage.setItem("sg_superadmin_auth", "true");
      setAuthError("");
    } else {
      setAuthError("Invalid Super Admin Secret Key. Access Denied.");
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 600);
    }
  };

  /* ─── LOCK SCREEN ─── */
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 dark:from-slate-950 dark:via-indigo-950/20 dark:to-slate-950 flex items-center justify-center p-4 transition-colors duration-300 overflow-hidden relative">

        {/* Ambient orbs */}
        <FloatingOrb cx="10%" cy="10%" size="w-64 h-64" color="bg-primary/15 dark:bg-primary/25" delay={0} />
        <FloatingOrb cx="70%" cy="60%" size="w-80 h-80" color="bg-secondary/10 dark:bg-secondary/20" delay={2} />
        <FloatingOrb cx="40%" cy="80%" size="w-48 h-48" color="bg-indigo-400/10 dark:bg-indigo-500/15" delay={1.5} />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className={`w-full max-w-md relative z-10 ${isShaking ? "animate-[wiggle_0.5s_ease]" : ""}`}
          style={isShaking ? { animation: "shake 0.5s ease" } : {}}
        >
          {/* Card */}
          <div className="bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-700/60 rounded-3xl shadow-2xl shadow-slate-900/10 dark:shadow-slate-950/50 overflow-hidden backdrop-blur-2xl">

            {/* Top gradient bar */}
            <div className="h-1.5 w-full bg-gradient-to-r from-primary via-secondary to-indigo-500" />

            <div className="p-7 sm:p-9 space-y-7">
              {/* Header */}
              <div className="text-center space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex justify-center"
                >
                  <div className="relative">
                    <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-primary via-indigo-500 to-secondary flex items-center justify-center shadow-xl shadow-primary/30">
                      <ShieldCheck className="w-10 h-10 text-white" />
                    </div>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                      className="absolute -inset-1 rounded-3xl border-2 border-dashed border-primary/30 dark:border-primary/50"
                    />
                    <span className="absolute -bottom-1.5 -right-1.5 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900 flex items-center justify-center">
                      <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    </span>
                  </div>
                </motion.div>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold tracking-widest uppercase bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 dark:border-amber-500/30 mb-3">
                    <ShieldCheck className="w-3 h-3" />
                    Restricted Super Admin Portal
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight">
                    Enter Secret Key
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed mt-1.5">
                    Enter your master passcode to unlock the Super Admin Management Portal.
                  </p>
                </motion.div>
              </div>

              {/* Form */}
              <motion.form
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                onSubmit={handleLogin}
                className="space-y-4"
              >
                <div>
                  <label className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-widest flex items-center gap-1.5 mb-2">
                    <Key className="w-3.5 h-3.5 text-primary" />
                    Master Passcode
                  </label>
                  <div className="relative">
                    <input
                      type={showPass ? "text" : "password"}
                      value={passcode}
                      onChange={(e) => setPasscode(e.target.value)}
                      placeholder="Enter secret key..."
                      className="w-full pr-12 pl-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-sm sm:text-base text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                      tabIndex={-1}
                    >
                      {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <AnimatePresence>
                  {authError && (
                    <motion.div
                      initial={{ opacity: 0, y: -6, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="p-3 rounded-xl bg-red-500/10 border border-red-500/25 text-red-600 dark:text-red-400 text-xs flex items-center gap-2"
                    >
                      <AlertTriangle className="w-4 h-4 shrink-0" />
                      <span>{authError}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  className="w-full py-4 bg-gradient-to-r from-primary via-indigo-600 to-secondary text-white font-extrabold text-sm sm:text-base rounded-2xl shadow-xl shadow-primary/25 hover:shadow-primary/40 flex items-center justify-center gap-2.5 transition-all duration-300 border border-white/10"
                >
                  <Lock className="w-4 h-4" />
                  Unlock Master Portal
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </motion.form>

              {/* Footer */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <Link
                  href="/"
                  className="hover:text-slate-900 dark:hover:text-white transition-colors inline-flex items-center gap-1.5 group font-medium"
                >
                  <Home className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                  Return to Site
                </Link>
                <button
                  onClick={toggleTheme}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors inline-flex items-center gap-1.5 font-medium"
                >
                  {theme === "dark" ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
                  {theme === "dark" ? "Dark Mode" : "Light Mode"}
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        <style jsx global>{`
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            15%       { transform: translateX(-8px); }
            30%       { transform: translateX(8px); }
            45%       { transform: translateX(-6px); }
            60%       { transform: translateX(6px); }
            75%       { transform: translateX(-3px); }
            90%       { transform: translateX(3px); }
          }
        `}</style>
      </div>
    );
  }

  /* ─── UNLOCKED SELECTION HUB ─── */
  const cards = [
    {
      href: "/sg-superadmin/home-edit",
      icon: Edit3,
      label: "Home Work",
      subtitle: "Edit Live Home Page",
      description:
        "Customise hero sections, feature banners, testimonials, CTAs and every public-facing block of the SellGrow marketing homepage in real time.",
      cta: "Enter Home Work Editor",
      accent: "from-primary via-indigo-500 to-secondary",
      glow: "bg-primary/15 dark:bg-primary/25",
      glowHover: "group-hover:bg-primary/25 dark:group-hover:bg-primary/40",
      border: "hover:border-primary/50 dark:hover:border-primary/50",
      ring: "hover:ring-primary/20",
      ctaColor: "text-primary",
      shadowColor: "shadow-primary/10 hover:shadow-primary/20",
      badgeBg: "bg-primary/10 text-primary border-primary/20",
      badge: "CONTENT EDITOR",
      features: [
        { icon: Layers, text: "Hero & Banner Sections" },
        { icon: Globe, text: "Live Page Renderer" },
        { icon: Zap, text: "Instant Preview Sync" },
      ],
    },
    {
      href: "/sg-superadmin/admin-growth",
      icon: TrendingUp,
      label: "Admin Growth",
      subtitle: "Super Admin Dashboard",
      description:
        "Manage platform services, inspect user growth analytics, handle sub-admin teams, employee accounts, and global operational KPIs.",
      cta: "Enter Super Admin Dashboard",
      accent: "from-amber-500 via-orange-500 to-emerald-500",
      glow: "bg-amber-500/15 dark:bg-amber-500/20",
      glowHover: "group-hover:bg-amber-500/25 dark:group-hover:bg-amber-500/35",
      border: "hover:border-amber-500/50 dark:hover:border-amber-400/50",
      ring: "hover:ring-amber-500/20",
      ctaColor: "text-amber-600 dark:text-amber-400",
      shadowColor: "shadow-amber-500/10 hover:shadow-amber-500/20",
      badgeBg: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
      badge: "ADMIN DASHBOARD",
      features: [
        { icon: BarChart3, text: "Growth & Analytics" },
        { icon: Users, text: "Team Management" },
        { icon: Cpu, text: "Platform Services" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/10 dark:from-slate-950 dark:via-indigo-950/15 dark:to-slate-950 text-slate-900 dark:text-white flex flex-col font-sans transition-colors duration-300 relative overflow-hidden">

      {/* Ambient background orbs */}
      <FloatingOrb cx="5%"  cy="15%" size="w-96 h-96" color="bg-primary/8 dark:bg-primary/15"   delay={0}   />
      <FloatingOrb cx="65%" cy="5%"  size="w-72 h-72" color="bg-secondary/8 dark:bg-secondary/12" delay={2.5} />
      <FloatingOrb cx="80%" cy="60%" size="w-80 h-80" color="bg-amber-500/6 dark:bg-amber-500/10" delay={1}   />
      <FloatingOrb cx="20%" cy="75%" size="w-64 h-64" color="bg-indigo-400/6 dark:bg-indigo-500/10" delay={3} />

      {/* Dot-grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025] dark:opacity-[0.05]"
        style={{
          backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <AdminHeader title="Selection Hub" />

      <main className="flex-1 flex flex-col justify-center max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-14 space-y-10 sm:space-y-14 relative z-10">

        {/* ── HERO TITLE ── */}
        <div className="text-center space-y-4 sm:space-y-5 max-w-3xl mx-auto">

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-extrabold tracking-widest uppercase bg-primary/10 text-primary border border-primary/25 shadow-sm shadow-primary/10"
          >
            <Shield className="w-3.5 h-3.5" />
            Authorized Super Admin Workspace
            <Sparkles className="w-3.5 h-3.5" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight font-display text-slate-900 dark:text-white leading-[1.15]"
          >
            Select{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-indigo-500 to-secondary">
              Admin
            </span>{" "}
            Portal View
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl mx-auto"
          >
            Choose whether to edit the live Home Page content or inspect platform growth, user management, and operational analytics.
          </motion.p>

          {/* Live stat badges */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="flex flex-wrap items-center justify-center gap-2.5 pt-2"
          >
            <StatBadge icon={Shield}    label="Access Level"  value="Super Admin"  color="bg-primary/15 text-primary"        delay={0.4}  />
            <StatBadge icon={Cpu}       label="System Status" value="Operational"  color="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" delay={0.5} />
            <StatBadge icon={BarChart3} label="Session"       value="Active"       color="bg-amber-500/15 text-amber-600 dark:text-amber-400"  delay={0.6}  />
          </motion.div>
        </div>

        {/* ── CHOICE CARDS ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-7">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.href}
                initial={{ opacity: 0, y: 35, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.45 + i * 0.12, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link href={card.href} className="block group h-full">
                  <motion.div
                    whileHover={{ y: -8, scale: 1.015 }}
                    whileTap={{ scale: 0.975 }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                    className={`relative h-full p-6 sm:p-8 rounded-3xl bg-white/90 dark:bg-slate-900/85 border border-slate-200/80 dark:border-slate-700/60 ${card.border} ring-1 ring-transparent ${card.ring} transition-all duration-300 shadow-xl ${card.shadowColor} flex flex-col justify-between overflow-hidden backdrop-blur-2xl`}
                  >
                    {/* Card ambient glow */}
                    <div className={`absolute top-0 right-0 w-52 h-52 ${card.glow} ${card.glowHover} rounded-full blur-3xl transition-all duration-500 pointer-events-none -translate-y-1/3 translate-x-1/3`} />
                    <div className="absolute bottom-0 left-0 w-36 h-36 bg-slate-100/50 dark:bg-white/2 rounded-full blur-2xl pointer-events-none translate-y-1/3 -translate-x-1/3" />

                    {/* Top section */}
                    <div className="relative z-10 space-y-5 sm:space-y-6">

                      {/* Badge + Icon row */}
                      <div className="flex items-start justify-between">
                        <motion.div
                          whileHover={{ rotate: [0, -8, 8, 0] }}
                          transition={{ duration: 0.5 }}
                          className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr ${card.accent} flex items-center justify-center text-white shadow-xl`}
                        >
                          <Icon className="w-7 h-7 sm:w-8 sm:h-8" />
                        </motion.div>
                        <span className={`px-2.5 py-1 rounded-full text-[9px] sm:text-[10px] font-extrabold tracking-widest uppercase border ${card.badgeBg}`}>
                          {card.badge}
                        </span>
                      </div>

                      {/* Title */}
                      <div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight leading-snug group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-secondary dark:group-hover:from-primary dark:group-hover:to-secondary transition-all duration-300 flex items-center justify-between gap-3">
                          {card.label}
                          <ArrowRight className={`w-5 h-5 sm:w-6 sm:h-6 shrink-0 text-slate-400 dark:text-slate-500 group-hover:translate-x-1.5 group-hover:${card.ctaColor} transition-all duration-200`} />
                        </h2>
                        <p className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-500 mt-0.5">
                          {card.subtitle}
                        </p>
                      </div>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        {card.description}
                      </p>

                      {/* Feature bullets */}
                      <div className="space-y-2 pt-1">
                        {card.features.map(({ icon: FIcon, text }, fi) => (
                          <motion.div
                            key={fi}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 + i * 0.1 + fi * 0.07 }}
                            className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300"
                          >
                            <div className={`w-5 h-5 rounded-lg flex items-center justify-center bg-gradient-to-tr ${card.accent} text-white shrink-0 shadow-sm`}>
                              <FIcon className="w-3 h-3" />
                            </div>
                            <span className="font-medium">{text}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* CTA footer */}
                    <div className={`relative z-10 mt-7 pt-5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between`}>
                      <span className={`text-xs sm:text-sm font-extrabold ${card.ctaColor} flex items-center gap-1.5 group-hover:gap-2.5 transition-all`}>
                        {card.cta}
                        <ArrowRight className="w-4 h-4" />
                      </span>
                      <motion.div
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className={`${card.ctaColor} opacity-50`}
                      >
                        <Zap className="w-4 h-4" />
                      </motion.div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* ── FOOTER META ROW ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[10px] sm:text-xs text-slate-400 dark:text-slate-500 font-medium pb-4"
        >
          <Link href="/" className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors inline-flex items-center gap-1.5">
            <Home className="w-3.5 h-3.5" />
            Return to Public Site
          </Link>
          <span className="w-px h-3.5 bg-slate-300 dark:bg-slate-700 hidden sm:block" />
          <button
            onClick={toggleTheme}
            className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors inline-flex items-center gap-1.5"
          >
            {theme === "dark" ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
            {theme === "dark" ? "Dark Mode" : "Light Mode"}
          </button>
          <span className="w-px h-3.5 bg-slate-300 dark:bg-slate-700 hidden sm:block" />
          <span className="inline-flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            All Systems Operational
          </span>
        </motion.div>
      </main>
    </div>
  );
}
