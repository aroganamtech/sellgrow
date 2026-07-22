"use client";

import { useEffect } from "react";

export default function ScrollRestoration() {
  useEffect(() => {
    // Disable automatic browser scroll restoration on refresh
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Instantly scroll to the top of the page on refresh / load
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });

    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return null;
}
