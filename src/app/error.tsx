"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { ShieldAlert, RotateCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 dark:bg-[#070b13]">
      <div className="w-full max-w-md glass-panel p-8 rounded-2xl shadow-xl border border-border text-center space-y-6">
        <div className="w-12 h-12 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center mx-auto">
          <ShieldAlert className="w-6 h-6" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-bold font-display text-foreground">Something went wrong</h2>
          <p className="text-xs text-muted-foreground leading-relaxed">
            SellGrow encountered an unexpected process exception. The error has been logged to the administrative console.
          </p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => reset()}
            className="flex-grow inline-flex items-center justify-center gap-1.5 py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-md transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Try Again
          </button>
          <Link
            href="/"
            className="flex-grow inline-flex items-center justify-center py-2 px-4 border border-border rounded-xl text-xs font-semibold hover:bg-black/5 dark:hover:bg-white/5 text-foreground transition-all"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
