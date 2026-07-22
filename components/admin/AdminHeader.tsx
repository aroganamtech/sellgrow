"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "@/contexts/ThemeContext";
import { Sun, Moon, Home, ArrowLeft, LogOut, ShieldCheck, Crown } from "lucide-react";
import Logo from "@/components/layout/Logo";

interface AdminHeaderProps {
  title: string;
  badgeText?: string;
  showBackHub?: boolean;
  backHubHref?: string;
}

export default function AdminHeader({
  title,
  badgeText = "SUPER ADMIN PORTAL",
  showBackHub = false,
  backHubHref = "/sg-superadmin",
}: AdminHeaderProps) {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    sessionStorage.removeItem("sg_superadmin_auth");
    router.push("/sg-superadmin");
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between shadow-sm transition-colors duration-200">
      <div className="flex items-center gap-4">
        <Logo className="w-24 h-12" />
        <span className="hidden sm:inline-block h-6 w-px bg-slate-200 dark:bg-slate-800" />
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 flex items-center gap-1.5">
            <Crown className="w-3.5 h-3.5 text-amber-500" />
            <span>{badgeText}</span>
          </span>
          <span className="hidden md:inline-block text-xs font-bold text-slate-700 dark:text-slate-300">
            {title}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2.5">
        {/* THEME SWITCHER BUTTON */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors shadow-sm flex items-center gap-1.5 text-xs font-semibold"
          title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
          aria-label="Toggle theme"
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

        {showBackHub && (
          <Link
            href={backHubHref}
            className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/60 hover:bg-slate-200 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Back</span>
          </Link>
        )}

        <Link
          href="/"
          className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/60 hover:bg-slate-200 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors flex items-center gap-1.5"
        >
          <Home className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Site</span>
        </Link>

        <button
          onClick={handleLogout}
          className="px-3 py-2 rounded-xl border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-xs font-semibold text-red-600 dark:text-red-400 transition-colors flex items-center gap-1.5"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Lock</span>
        </button>
      </div>
    </header>
  );
}
