"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export interface User {
  id: string;
  name: string;
  firstName?: string;
  email: string;
  phone?: string;
  businessName: string;
  businessType: string;
  businessCategory?: string;
  role: "admin" | "super-admin" | "operator";
}

export interface RegisterPayload {
  firstName: string;
  email: string;
  phone?: string;
  password: string;
  businessName: string;
  businessCategory: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password?: string) => Promise<void>;
  register: (payload: RegisterPayload | any) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const savedUser = localStorage.getItem("sg_user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem("sg_user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password?: string) => {
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
      router.push("/dashboard");
    } catch (err: any) {
      setIsLoading(false);
      throw err;
    }
  };

  const register = async (payload: any) => {
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
      router.push("/dashboard");
    } catch (err: any) {
      setIsLoading(false);
      throw err;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("sg_user");
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
