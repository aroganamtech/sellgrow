"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
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
} from "lucide-react";
import Logo from "@/components/layout/Logo";
import AdminHeader from "@/components/admin/AdminHeader";
import { useTheme } from "@/contexts/ThemeContext";

export default function SuperAdminChoicePage() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    const savedAuth = sessionStorage.getItem("sg_superadmin_auth");
    if (savedAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === "admin123" || passcode === "sellgrow-admin") {
      setIsAuthenticated(true);
      sessionStorage.setItem("sg_superadmin_auth", "true");
      setAuthError("");
    } else {
      setAuthError("Invalid Super Admin Secret Key! Access Denied.");
    }
  };

  // PASSCODE LOCK SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex items-center justify-center p-4 transition-colors duration-200">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="w-full max-w-md bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6 relative overflow-hidden backdrop-blur-xl"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-gradient-to-b from-primary/20 via-secondary/10 to-transparent blur-2xl pointer-events-none" />

          <div className="text-center space-y-3 relative z-10">
            <div className="flex justify-center mb-2">
              <Logo className="w-24 h-16" />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>RESTRICTED SUPER ADMIN PORTAL</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white font-display">Enter Secret Key</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Enter master passcode to unlock the Super Admin Management Portal.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 relative z-10">
            <div>
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-primary" />
                Master Passcode
              </label>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter secret key..."
                className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:border-primary transition-colors"
                autoFocus
              />
            </div>

            {authError && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-primary to-secondary text-white font-bold text-sm rounded-xl hover:opacity-95 transition-opacity shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              Unlock Master Portal
            </button>
          </form>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 text-center relative z-10 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <Link href="/" className="hover:text-slate-900 dark:hover:text-white transition-colors inline-flex items-center gap-1.5">
              <Home className="w-3.5 h-3.5" />
              Return to Public Site
            </Link>

            <button
              onClick={toggleTheme}
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Theme: {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // UNLOCKED CHOICE SELECTION HUB
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      <AdminHeader title="Selection Hub" />

      {/* MAIN SELECTION HUB */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col justify-center space-y-8">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary border border-primary/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AUTHORIZED SUPER ADMIN WORKSPACE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-display">
            Select Admin Portal View
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Choose whether to edit the live Home Page content or inspect platform growth, user management, and operational analytics.
          </p>
        </div>

        {/* 2 GIANT CHOICE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          {/* CARD 1: HOME WORK (EDIT HOME PAGE) */}
          <Link href="/sg-superadmin/home-edit">
            <motion.div
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="group h-full p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-all duration-300 shadow-xl flex flex-col justify-between space-y-6 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all" />

              <div className="space-y-4 relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white shadow-lg shadow-primary/20">
                  <Edit3 className="w-7 h-7" />
                </div>
                <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white font-display group-hover:text-primary transition-colors flex items-center justify-between">
                  <span>Home Work (Edit Home Page)</span>
                  <ArrowRight className="w-5 h-5 text-slate-400 dark:text-slate-500 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </h2>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Access live editing tools for landing page headlines, hero release badges, core feature cards, solution copy, and regional pricing rates (INR ₹ & USD $).
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80 flex items-center text-xs font-extrabold text-primary gap-1 relative z-10">
                <span>Enter Home Work Editor</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </motion.div>
          </Link>

          {/* CARD 2: ADMIN GROWTH */}
          <Link href="/sg-superadmin/admin-growth">
            <motion.div
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="group h-full p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-500/50 transition-all duration-300 shadow-xl flex flex-col justify-between space-y-6 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl group-hover:bg-amber-500/20 transition-all" />

              <div className="space-y-4 relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-emerald-500 flex items-center justify-center text-white shadow-lg shadow-amber-500/20">
                  <TrendingUp className="w-7 h-7" />
                </div>
                <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white font-display group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors flex items-center justify-between">
                  <span>Admin Growth</span>
                  <ArrowRight className="w-5 h-5 text-slate-400 dark:text-slate-500 group-hover:text-amber-500 dark:group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                </h2>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Inspect monthly revenue metrics, total registered users, AI agent execution counts, FastAPI Geo-IP health status, user accounts management, feature flags, and live audit logs.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80 flex items-center text-xs font-extrabold text-amber-600 dark:text-amber-400 gap-1 relative z-10">
                <span>View Admin Growth Analytics</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </motion.div>
          </Link>
        </div>
      </main>
    </div>
  );
}
