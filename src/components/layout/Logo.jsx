import React from "react";
export default function Logo({ className = "w-16 h-16" }) {
    return (<div className="flex items-center justify-start select-none">
      <img src="/logos/logo.png" alt="SellGrow Logo" className={`${className} object-contain`}/>
    </div>);
}
