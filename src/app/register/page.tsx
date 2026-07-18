"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { ShieldCheck, Mail, Lock, User, Briefcase, ChevronDown, Loader2 } from "lucide-react";

export default function RegisterPage() {
  const { register, isLoading } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [businessType, setBusinessType] = useState("Retail Shop");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !businessName) {
      setError("Please fill in all required fields.");
      return;
    }
    try {
      setError("");
      await register(name, email, businessName, businessType);
    } catch (err) {
      setError("Registration failed. Please try again.");
    }
  };

  const businessTypes = [
    "Retail Shop / Grocery",
    "Tuition Centre / Training",
    "Clinic / Pharmacy",
    "Restaurant / Hotel",
    "Manufacturer / Dealer",
    "Logistics / Distributor",
    "FMCG Enterprise",
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-slate-50 dark:bg-[#070b13]">
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md glass-panel p-8 rounded-2xl shadow-xl space-y-6 relative border border-border">
        {/* Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-300 dark:via-purple-300 dark:to-pink-300 bg-clip-text text-transparent font-display">
              SellGrow
            </span>
          </Link>
          <h2 className="text-2xl font-bold font-display text-foreground">Launch Business</h2>
          <p className="text-xs text-muted-foreground">Provision a new multi-tenant SaaS workspace instantly.</p>
        </div>

        {error && (
          <div className="p-3 text-xs bg-red-500/10 text-red-500 border border-red-500/20 rounded-lg">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-muted-foreground" htmlFor="name-input">Full Name</label>
            <div className="relative">
              <input
                id="name-input"
                type="text"
                required
                placeholder="Naveen S"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-3 py-2 text-sm glass-input focus:outline-none"
              />
              <User className="w-4 h-4 text-muted absolute left-3 top-3" />
            </div>
          </div>

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
            <label className="text-xs font-semibold text-muted-foreground" htmlFor="business-name-input">Business Name</label>
            <div className="relative">
              <input
                id="business-name-input"
                type="text"
                required
                placeholder="Aroganam Tech"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full pl-10 pr-3 py-2 text-sm glass-input focus:outline-none"
              />
              <Briefcase className="w-4 h-4 text-muted absolute left-3 top-3" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-muted-foreground" htmlFor="business-type-select">Industry Type</label>
            <div className="relative">
              <select
                id="business-type-select"
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
                className="w-full pl-10 pr-10 py-2 text-sm glass-input appearance-none focus:outline-none cursor-pointer"
              >
                {businessTypes.map((t, idx) => (
                  <option key={idx} value={t} className="bg-white dark:bg-[#070b13] text-foreground">
                    {t}
                  </option>
                ))}
              </select>
              <Briefcase className="w-4 h-4 text-muted absolute left-3 top-3 pointer-events-none" />
              <ChevronDown className="w-4 h-4 text-muted absolute right-3 top-3 pointer-events-none" />
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
                className="w-full pl-10 pr-3 py-2 text-sm glass-input focus:outline-none"
              />
              <Lock className="w-4 h-4 text-muted absolute left-3 top-3" />
            </div>
          </div>

          <p className="text-[10px] text-muted-foreground leading-normal">
            By creating an account, you agree to provision a secure cloud instance compliant with GDPR rules.
          </p>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-semibold rounded-xl hover:opacity-95 disabled:opacity-50 transition-all shadow-md"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Creating Workspace...</span>
              </>
            ) : (
              <span>Create Free Account</span>
            )}
          </button>
        </form>

        <div className="text-center text-xs text-muted-foreground pt-2">
          <span>Already have an account? </span>
          <Link href="/login" className="text-indigo-500 font-semibold hover:underline">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}
