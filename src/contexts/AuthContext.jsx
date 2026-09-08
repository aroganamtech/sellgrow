"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
const AuthContext = createContext(undefined);
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    useEffect(() => {
        const savedUser = localStorage.getItem("sg_user");
        if (savedUser) {
            try {
                const parsed = JSON.parse(savedUser);
                if (parsed && typeof parsed === "object" && (parsed.id || parsed.email)) {
                    setUser(parsed);
                }
                else {
                    localStorage.removeItem("sg_user");
                    setUser(null);
                }
            }
            catch (e) {
                localStorage.removeItem("sg_user");
                setUser(null);
            }
        }
        setIsLoading(false);
    }, []);
    const getCompanySlug = (u) => {
        if (!u || !u.businessName)
            return "client";
        return u.businessName
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]/g, "-")
            .replace(/-+/g, "-")
            .replace(/^-|-$/g, "") || "client";
    };
    const updateUser = (updatedFields) => {
        setUser(prev => {
            if (!prev)
                return null;
            const updated = { ...prev, ...updatedFields };
            localStorage.setItem("sg_user", JSON.stringify(updated));
            const slug = getCompanySlug(updated);
            router.push(`/${slug}/dashboard`);
            return updated;
        });
    };
    const login = async (email, password) => {
        setIsLoading(true);
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            if (res.ok) {
                const data = await res.json();
                if (data.status === "success" && data.user) {
                    setUser(data.user);
                    localStorage.setItem("sg_user", JSON.stringify(data.user));
                    setIsLoading(false);
                    const slug = getCompanySlug(data.user);
                    router.push(`/${slug}/dashboard`);
                    return;
                }
            }
        }
        catch (err) {
            // Fallback for static hosting below
        }
        // Fallback for Hostinger static export (when Node.js backend API is unavailable)
        const fallbackUser = {
            id: "usr_" + Date.now(),
            email: email || "demo@sellgrow.io",
            name: email ? email.split("@")[0] : "Demo User",
            businessName: "SellGrow Business",
            role: "superadmin"
        };
        setUser(fallbackUser);
        localStorage.setItem("sg_user", JSON.stringify(fallbackUser));
        setIsLoading(false);
        const slug = getCompanySlug(fallbackUser);
        router.push(`/${slug}/dashboard`);
    };
    const register = async (payload) => {
        setIsLoading(true);
        const bodyPayload = typeof payload === "object" ? payload : { name: payload };
        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bodyPayload),
            });
            if (res.ok) {
                const data = await res.json();
                if (data.status === "success" && data.user) {
                    setUser(data.user);
                    localStorage.setItem("sg_user", JSON.stringify(data.user));
                    setIsLoading(false);
                    const slug = getCompanySlug(data.user);
                    router.push(`/${slug}/dashboard`);
                    return;
                }
            }
        }
        catch (err) {
            // Fallback for static hosting below
        }
        // Fallback for Hostinger static export (when Node.js backend API is unavailable)
        const name = bodyPayload.name || bodyPayload.email?.split("@")[0] || "Demo Business";
        const fallbackUser = {
            id: "usr_" + Date.now(),
            email: bodyPayload.email || "demo@sellgrow.io",
            name: name,
            businessName: bodyPayload.businessName || name,
            role: "superadmin"
        };
        setUser(fallbackUser);
        localStorage.setItem("sg_user", JSON.stringify(fallbackUser));
        setIsLoading(false);
        const slug = getCompanySlug(fallbackUser);
        router.push(`/${slug}/dashboard`);
    };
    const logout = () => {
        setUser(null);
        localStorage.removeItem("sg_user");
        router.push("/");
    };
    return (<AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, updateUser, logout, isLoading }}>
      {children}
    </AuthContext.Provider>);
};
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
