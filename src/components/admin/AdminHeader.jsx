"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "@/contexts/ThemeContext";
import { Sun, Moon, Home, ArrowLeft, LogOut } from "lucide-react";
export default function AdminHeader({ title, badgeText = "SUPER ADMIN PORTAL", showBackHub = false, backHubHref = "/sg-superadmin", }) {
    const router = useRouter();
    const { theme, toggleTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => {
        setMounted(true);
    }, []);
    const handleLogout = () => {
        sessionStorage.removeItem("sg_superadmin_auth");
        router.push("/sg-superadmin");
    };
    return (<header className="sticky top-0 z-40 bg-white/90 dark:bg-[#070c14]/90 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800/80 px-6 py-3.5 flex items-center justify-between shadow-sm transition-colors duration-300">
      <div className="flex items-center gap-3">
        {showBackHub && (<Link href={backHubHref} className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors" title="Return to Master Admin Hub">
            <ArrowLeft className="w-4 h-4"/>
          </Link>)}
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
              {badgeText}
            </span>
          </div>
          <h1 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight font-display">
            {title}
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-2.5">
        {/* THEME SWITCHER BUTTON */}
        <button onClick={toggleTheme} className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors shadow-sm flex items-center gap-1.5 text-xs font-semibold" title={`Switch to ${mounted && theme === "dark" ? "Light" : "Dark"} Mode`} aria-label="Toggle theme">
          {mounted && theme === "light" ? (<>
              <Moon className="w-4 h-4 text-indigo-600"/>
              <span className="hidden sm:inline">Dark</span>
            </>) : (<>
              <Sun className="w-4 h-4 text-amber-400"/>
              <span className="hidden sm:inline">Light</span>
            </>)}
        </button>

        {showBackHub && (<Link href={backHubHref} className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/60 hover:bg-slate-200 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors flex items-center gap-1.5">
            <ArrowLeft className="w-3.5 h-3.5"/>
            <span className="hidden sm:inline">Back</span>
          </Link>)}

        <Link href="/" className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/60 hover:bg-slate-200 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors flex items-center gap-1.5">
          <Home className="w-3.5 h-3.5"/>
          <span className="hidden sm:inline">Site</span>
        </Link>

        <button onClick={handleLogout} className="px-3 py-2 rounded-xl border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-xs font-semibold text-red-600 dark:text-red-400 transition-colors flex items-center gap-1.5">
          <LogOut className="w-3.5 h-3.5"/>
          <span>Lock</span>
        </button>
      </div>
    </header>);
}
