import React from "react";

interface LogoProps {
  className?: string;
}

export default function Logo({ className = "w-16 h-16" }: LogoProps) {
  return (
    <div className="flex items-center justify-start select-none">
      <img
        src="/logos/logo.png"
        alt="SellGrow Logo"
        className={`${className} object-contain`}
      />
    </div>
  );
}
