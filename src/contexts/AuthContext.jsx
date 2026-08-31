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
            const data = await res.json();
            if (!res.ok || data.status !== "success") {
                throw new Error(data.message || "Login failed");
            }
            setUser(data.user);
            localStorage.setItem("sg_user", JSON.stringify(data.user));
            setIsLoading(false);
            const slug = getCompanySlug(data.user);
            router.push(`/${slug}/dashboard`);
        }
        catch (err) {
            setIsLoading(false);
            throw err;
        }
    };
    const register = async (payload) => {
        setIsLoading(true);
        try {
            const bodyPayload = typeof payload === "object" ? payload : { name: payload };
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bodyPayload),
            });
            const data = await res.json();
            if (!res.ok || data.status !== "success") {
                throw new Error(data.message || "Registration failed");
            }
            setUser(data.user);
            localStorage.setItem("sg_user", JSON.stringify(data.user));
            setIsLoading(false);
            const slug = getCompanySlug(data.user);
            router.push(`/${slug}/dashboard`);
        }
        catch (err) {
            setIsLoading(false);
            throw err;
        }
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
