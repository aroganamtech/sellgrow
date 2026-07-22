"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Mail, Lock, ArrowRight, Loader2, ArrowLeft } from "lucide-react";
import Logo from "@/components/layout/Logo";

export default function LoginPage() {
  const { login, isLoading } = useAuth();
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in email and password.");
      return;
    }
    try {
      setError("");
      await login(email, password);
    } catch (err: any) {
      setError(err.message || "Failed to sign in. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-slate-50 dark:bg-[#070b13]">
      {/* Back to Home Button (Top Left) */}
      <div className="absolute top-6 left-6 z-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-muted-foreground hover:text-foreground bg-white/60 dark:bg-black/30 border border-border backdrop-blur-md shadow-sm transition-all hover:-translate-x-0.5"
        >
          <ArrowLeft className="w-4 h-4 text-primary" />
          <span>{t("backToHome") || "Back to Home"}</span>
        </Link>
      </div>

      {/* Background gradients */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md glass-panel p-8 rounded-2xl shadow-xl space-y-6 relative border border-border">
        {/* Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex justify-center">
            <Logo className="w-24 h-24" />
          </Link>
          <h2 className="text-2xl font-bold font-display text-foreground mt-4">{t("loginWelcome")}</h2>
          <p className="text-xs text-muted-foreground">{t("loginSub")}</p>
        </div>

        {error && (
          <div className="p-3 text-xs bg-red-500/10 text-red-500 border border-red-500/20 rounded-lg">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-muted-foreground" htmlFor="email-input">{t("emailLabel")}</label>
            <div className="relative">
              <input
                id="email-input"
                type="email"
                required
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-2 text-sm glass-input focus:outline-none"
              />
              <Mail className="w-4 h-4 text-muted absolute left-3 top-3" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-muted-foreground" htmlFor="password-input">{t("passwordLabel")}</label>
            <div className="relative">
              <input
                id="password-input"
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3 py-2 text-sm glass-input focus:outline-none"
              />
              <Lock className="w-4 h-4 text-muted absolute left-3 top-3" />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-1.5 cursor-pointer text-muted-foreground select-none" htmlFor="remember-me">
              <input type="checkbox" id="remember-me" className="rounded border-border text-primary focus:ring-primary" />
              <span>{t("rememberMe")}</span>
            </label>
            <Link href="/forgot-password" className="text-primary hover:underline">
              {t("forgotPassword")}
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-primary to-secondary text-white text-sm font-semibold rounded-xl hover:opacity-95 disabled:opacity-50 transition-all shadow-md"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>{t("signingIn")}</span>
              </>
            ) : (
              <>
                <span>{t("signInBtn")}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="text-center text-xs text-muted-foreground pt-2 space-y-2">
          <div>
            <span>{t("noAccount")}{" "}</span>
            <Link href="/register" className="text-primary font-semibold hover:underline">
              {t("registerBusiness")}
            </Link>
          </div>
          <div className="pt-2 border-t border-border/40">
            <Link href="/" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-3 h-3" />
              <span>{t("backToHome") || "Back to Home"}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
