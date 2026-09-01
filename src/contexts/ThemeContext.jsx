"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
const ThemeContext = createContext(undefined);
const getPageThemeKey = (pathname) => {
    if (!pathname)
        return "theme_public";
    if (pathname.startsWith("/sg-superadmin"))
        return "theme_sg_superadmin";
    if (pathname.startsWith("/sg-admin")) {
        const parts = pathname.split("/");
        const role = parts[2] || "subadmin";
        return `theme_sg_admin_${role}`;
    }
    if (pathname.startsWith("/dashboard"))
        return "theme_dashboard";
    if (pathname.startsWith("/login") || pathname.startsWith("/register"))
        return "theme_auth";
    if (pathname.startsWith("/service-person"))
        return "theme_service_person";
    if (pathname.startsWith("/pricing") || pathname.startsWith("/about"))
        return "theme_public_content";
    return "theme_public";
};
export const ThemeProvider = ({ children }) => {
    const pathname = usePathname();
    const pageKey = getPageThemeKey(pathname || "");
    const [theme, setTheme] = useState("light");
    useEffect(() => {
        if (typeof window === "undefined")
            return;
        setTheme("light");
        document.documentElement.classList.remove("dark");
        try {
            localStorage.setItem(pageKey, "light");
        } catch(e) {}
    }, [pathname, pageKey]);
    const toggleTheme = () => {
        setTheme("light");
        if (typeof window !== "undefined") {
            try { localStorage.setItem(pageKey, "light"); } catch(e) {}
        }
        document.documentElement.classList.remove("dark");
    };
    const setPageTheme = () => {
        setTheme("light");
        if (typeof window !== "undefined") {
            try { localStorage.setItem(pageKey, "light"); } catch(e) {}
        }
        document.documentElement.classList.remove("dark");
    };
    return (<ThemeContext.Provider value={{ theme, toggleTheme, setPageTheme }}>
      {children}
    </ThemeContext.Provider>);
};
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};
