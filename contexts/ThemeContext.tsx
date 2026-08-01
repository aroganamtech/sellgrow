"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setPageTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const getPageThemeKey = (pathname: string) => {
  if (!pathname) return "theme_public";
  if (pathname.startsWith("/sg-superadmin")) return "theme_sg_superadmin";
  if (pathname.startsWith("/sg-admin")) {
    const parts = pathname.split("/");
    const role = parts[2] || "subadmin";
    return `theme_sg_admin_${role}`;
  }
  if (pathname.startsWith("/dashboard")) return "theme_dashboard";
  if (pathname.startsWith("/login") || pathname.startsWith("/register")) return "theme_auth";
  if (pathname.startsWith("/service-person")) return "theme_service_person";
  if (pathname.startsWith("/pricing") || pathname.startsWith("/about")) return "theme_public_content";
  return "theme_public";
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const pageKey = getPageThemeKey(pathname || "");
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const savedTheme = localStorage.getItem(pageKey) as Theme | null;
    let activeTheme: Theme;
    if (savedTheme === "light" || savedTheme === "dark") {
      activeTheme = savedTheme;
    } else {
      activeTheme = document.documentElement.classList.contains("dark") ? "dark" : "light";
    }
    setTheme(activeTheme);
    document.documentElement.classList.toggle("dark", activeTheme === "dark");
  }, [pathname, pageKey]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    if (typeof window !== "undefined") {
      localStorage.setItem(pageKey, newTheme);
    }
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const setPageTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    if (typeof window !== "undefined") {
      localStorage.setItem(pageKey, newTheme);
    }
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setPageTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
