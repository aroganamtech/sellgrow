import React from "react";
import Link from "next/link";
import { ShieldCheck, HelpCircle, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 dark:bg-[#070b13]">
      <div className="w-full max-w-md glass-panel p-8 rounded-2xl shadow-xl border border-border text-center space-y-6">
        <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
          <HelpCircle className="w-6 h-6 animate-bounce" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-bold font-display text-foreground">Route Not Found</h2>
          <p className="text-xs text-muted-foreground leading-relaxed">
            The workspace page or API resource you are trying to reach doesn&apos;t exist or is still undergoing compilation in this sandbox version.
          </p>
        </div>
        <Link
          href="/"
          className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 bg-gradient-to-r from-primary to-secondary text-white rounded-xl text-xs font-semibold shadow-md transition-all"
        >
          Return to Platform Homepage
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
