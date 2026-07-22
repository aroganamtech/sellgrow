import React from "react";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-[#070b13] space-y-8 select-none transition-colors duration-500">
      <div className="relative flex items-center justify-center">
        {/* Glow backdrop */}
        <div className="absolute w-40 h-40 bg-primary/20 rounded-full blur-2xl animate-pulse" />
        
        {/* Spinning Gradient Ring */}
        <div className="w-28 h-28 rounded-full border-2 border-transparent border-t-primary border-r-secondary border-b-accent-brand animate-spin duration-1000" />
        
        {/* Central Logo Image */}
        <div className="absolute w-20 h-20 flex items-center justify-center animate-pulse duration-2000">
          <img
            src="/logos/loading-logo.png"
            alt="SellGrow Loading..."
            className="w-full h-full object-contain"
          />
        </div>
      </div>
      
      {/* Loading copy */}
      <div className="text-center space-y-2">
        <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground animate-pulse">
          Connecting SellGrow
        </p>
        <div className="w-32 h-1 bg-slate-200 dark:bg-slate-800 rounded-full mx-auto overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full animate-progress" />
        </div>
      </div>
    </div>
  );
}
