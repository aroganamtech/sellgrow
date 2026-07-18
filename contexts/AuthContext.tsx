"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export interface User {
  id: string;
  name: string;
  email: string;
  businessName: string;
  businessType: string;
  role: "admin" | "super-admin" | "operator";
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, businessName: string, businessType: string) => Promise<void>;
  register: (name: string, email: string, businessName: string, businessType: string) => Promise<void>;
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
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, businessName: string, businessType: string) => {
    setIsLoading(true);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    const mockUser: User = {
      id: "usr_" + Math.random().toString(36).substr(2, 9),
      name: "Naveen S",
      email: email || "operator@sellgrow.io",
      businessName: businessName || "SellGrow Sandbox",
      businessType: businessType || "Retail",
      role: "admin",
    };
    setUser(mockUser);
    localStorage.setItem("sg_user", JSON.stringify(mockUser));
    setIsLoading(false);
    router.push("/dashboard");
  };

  const register = async (name: string, email: string, businessName: string, businessType: string) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const mockUser: User = {
      id: "usr_" + Math.random().toString(36).substr(2, 9),
      name: name || "Naveen S",
      email: email || "operator@sellgrow.io",
      businessName: businessName || "SellGrow Enterprise",
      businessType: businessType || "Retail",
      role: "admin",
    };
    setUser(mockUser);
    localStorage.setItem("sg_user", JSON.stringify(mockUser));
    setIsLoading(false);
    router.push("/dashboard");
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
