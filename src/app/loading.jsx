import React from "react";
export default function Loading() {
    return (
        <div className="min-h-screen bg-[#070b13] flex flex-col items-center justify-center space-y-4">
            <div className="w-12 h-12 rounded-full border-2 border-sky-400/20 border-t-sky-400 animate-spin" />
            <p className="text-xs font-semibold text-slate-400 font-mono tracking-wider uppercase">Loading SellGrow...</p>
        </div>
    );
}
