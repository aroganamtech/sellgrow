"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { ShieldCheck, Mail, Lock, ArrowRight, Loader2 } from "lucide-react";

export default function LoginPage() {
  const { login, isLoading } = useAuth();
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Please fill in all fields.");
      return;
    }
    try {
      setError("");
      await login(email, "Acme Retail Co.", "Retail Shop");
    } catch (err) {
      setError("Failed to sign in. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-slate-50 dark:bg-[#070b13]">
      {/* Background gradients */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md glass-panel p-8 rounded-2xl shadow-xl space-y-6 relative border border-border">
        {/* Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-300 dark:to-purple-300 bg-clip-text text-transparent font-display">
              SellGrow
            </span>
          </Link>
          <h2 className="text-2xl font-bold font-display text-foreground">Welcome Back</h2>
          <p className="text-xs text-muted-foreground">Sign in to manage your digital operating system.</p>
        </div>

        {error && (
          <div className="p-3 text-xs bg-red-500/10 text-red-500 border border-red-500/20 rounded-lg">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-muted-foreground" htmlFor="email-input">Email Address</label>
            <div className="relative">
              <input
                id="email-input"
                type="email"
                required
                placeholder="operator@sellgrow.io"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-2 text-sm glass-input focus:outline-none"
              />
              <Mail className="w-4 h-4 text-muted absolute left-3 top-3" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-muted-foreground" htmlFor="password-input">Password</label>
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
              <input type="checkbox" id="remember-me" className="rounded border-border text-indigo-600 focus:ring-indigo-500" />
              <span>Remember me</span>
            </label>
            <Link href="/forgot-password" className="text-indigo-500 hover:underline">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-semibold rounded-xl hover:opacity-95 disabled:opacity-50 transition-all shadow-md"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Signing in...</span>
              </>
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="text-center text-xs text-muted-foreground pt-2">
          <span>Don&apos;t have an account? </span>
          <Link href="/register" className="text-indigo-500 font-semibold hover:underline">
            Register Business
          </Link>
        </div>
      </div>
    </div>
  );
}
