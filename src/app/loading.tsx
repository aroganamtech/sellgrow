"use client";

import React from "react";
import { Activity } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-[#070b13] space-y-4">
      <div className="relative flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-indigo-500/20 border-t-indigo-600 animate-spin" />
        <Activity className="w-5 h-5 text-indigo-500 absolute animate-pulse" />
      </div>
      <p className="text-xs font-semibold text-muted-foreground animate-pulse">
        Connecting SellGrow Intelligence...
      </p>
    </div>
  );
}
