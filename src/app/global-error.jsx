"use client";
import React from "react";
import Link from "next/link";
import { ShieldAlert, RotateCcw } from "lucide-react";
export default function GlobalError({ error, reset, }) {
    return (<html lang="en">
      <body className="min-h-screen flex items-center justify-center p-4 bg-[#070b13] text-white">
        <div className="w-full max-w-md p-8 rounded-2xl bg-[#0a0f1d] border border-slate-800 text-center space-y-6">
          <div className="w-12 h-12 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center mx-auto">
            <ShieldAlert className="w-6 h-6"/>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold font-display text-white">Application Global Exception</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              SellGrow encountered an unhandled system process exception.
            </p>
          </div>
          <div className="flex gap-4">
            <button onClick={() => reset()} className="flex-grow inline-flex items-center justify-center gap-1.5 py-2.5 px-4 bg-sky-500 hover:bg-sky-600 text-white rounded-xl text-xs font-semibold shadow-md transition-all">
              <RotateCcw className="w-3.5 h-3.5"/>
              Reset App
            </button>
            <Link href="/" className="flex-grow inline-flex items-center justify-center py-2.5 px-4 border border-slate-800 rounded-xl text-xs font-semibold hover:bg-white/5 text-slate-300 transition-all">
              Go Home
            </Link>
          </div>
        </div>
      </body>
    </html>);
}
