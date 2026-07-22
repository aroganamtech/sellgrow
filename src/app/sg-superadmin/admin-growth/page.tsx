"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Users,
  DollarSign,
  Zap,
  Server,
  Activity,
  Settings,
  FileText,
  Search,
  RefreshCw,
  ToggleLeft,
  ToggleRight,
  Sparkles,
} from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";

interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: "User" | "Admin" | "SuperAdmin";
  region: "India" | "International";
  status: "Active" | "Suspended";
  joined: string;
}

const initialUsersList: UserRecord[] = [
  { id: "usr_101", name: "Rahul Sharma", email: "rahul@techcorp.in", role: "Admin", region: "India", status: "Active", joined: "2026-06-12" },
  { id: "usr_102", name: "Sarah Jenkins", email: "sarah@globalmark.com", role: "User", region: "International", status: "Active", joined: "2026-06-18" },
  { id: "usr_103", name: "Vikram Patel", email: "vikram@sellgrow.in", role: "SuperAdmin", region: "India", status: "Active", joined: "2026-05-01" },
  { id: "usr_104", name: "Alex Chen", email: "alex.chen@innovate.io", role: "User", region: "International", status: "Active", joined: "2026-07-02" },
  { id: "usr_105", name: "Priya Sundaram", email: "priya@retailhub.in", role: "User", region: "India", status: "Suspended", joined: "2026-07-10" },
];

export default function AdminGrowthPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [activeTab, setActiveTab] = useState<"overview" | "users" | "features" | "logs">("overview");
  const [searchQuery, setSearchQuery] = useState("");

  const [users, setUsers] = useState<UserRecord[]>(initialUsersList);

  const [featureFlags, setFeatureFlags] = useState({
    maintenanceMode: false,
    aiVoiceEnabled: true,
    whatsappEnabled: true,
    autoGeoIpEnabled: true,
    debugLogsEnabled: true,
  });

  const [auditLogs, setAuditLogs] = useState([
    { id: 1, event: "Admin Growth Page Opened", user: "Master Admin", time: "Just now", status: "success" },
    { id: 2, event: "FastAPI Geo-IP Service Status Checked", user: "System Auto", time: "2 mins ago", status: "success" },
    { id: 3, event: "Pricing Plan Synchronized", user: "System", time: "15 mins ago", status: "info" },
    { id: 4, event: "User Account Suspended: priya@retailhub.in", user: "Admin", time: "1 hour ago", status: "warning" },
  ]);

  useEffect(() => {
    const savedAuth = sessionStorage.getItem("sg_superadmin_auth");
    if (savedAuth === "true") {
      setIsAuthenticated(true);
    } else {
      router.push("/sg-superadmin");
    }
    setIsLoading(false);
  }, [router]);

  const toggleUserStatus = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId
          ? { ...u, status: u.status === "Active" ? "Suspended" : "Active" }
          : u
      )
    );
  };

  const toggleUserRole = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const nextRole = u.role === "User" ? "Admin" : u.role === "Admin" ? "SuperAdmin" : "User";
          return { ...u, role: nextRole };
        }
        return u;
      })
    );
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center text-slate-500 dark:text-slate-400 text-sm">
        Verifying Super Admin Authorization...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      <AdminHeader title="Admin Growth" showBackHub />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        {/* 4 STAT CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-sm">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold">
              <span>Total Registered Users</span>
              <Users className="w-4 h-4 text-primary" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900 dark:text-white font-display">1,482</div>
            <div className="text-[11px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <span>↑ +14% this week</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-sm">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold">
              <span>Monthly Revenue (MRR)</span>
              <DollarSign className="w-4 h-4 text-secondary" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900 dark:text-white font-display">₹4,85,000 / $18.4k</div>
            <div className="text-[11px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <span>↑ +22% growth</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-sm">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold">
              <span>AI Agent Executions</span>
              <Zap className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900 dark:text-white font-display">12,450</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">Voice & WhatsApp automation</div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-sm">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold">
              <span>FastAPI Backend Status</span>
              <Server className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 font-display">Healthy (24ms)</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">IP Auto-Detection Active</div>
          </div>
        </div>

        {/* SUB-TABS NAVIGATION BAR */}
        <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
          {[
            { id: "overview", label: "Overview", icon: Activity },
            { id: "users", label: "User Management", icon: Users },
            { id: "features", label: "System Feature Flags", icon: Settings },
            { id: "logs", label: "Audit Logs", icon: FileText },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                    : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* OVERVIEW SUMMARY BOX */}
        {activeTab === "overview" && (
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-xl">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              SellGrow Master Control Center Summary
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
              Welcome to the Super Admin management suite. From this portal, you have full authority to modify landing copy, override pricing tiers, configure feature flags, manage user roles, and inspect live FastAPI Geo-IP performance logs.
            </p>
          </div>
        )}

        {/* USER MANAGEMENT TABLE */}
        {activeTab === "users" && (
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">User Accounts & Access Management</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">View, assign roles, and modify account status.</p>
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 uppercase text-[10px] tracking-wider">
                    <th className="py-3 px-4">User</th>
                    <th className="py-3 px-4">Role</th>
                    <th className="py-3 px-4">Region</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Joined</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800/60">
                  {filteredUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-900 dark:text-white">{u.name}</div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400">{u.email}</div>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          onClick={() => toggleUserRole(u.id)}
                          className={`cursor-pointer px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                            u.role === "SuperAdmin"
                              ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                              : u.role === "Admin"
                              ? "bg-primary/10 text-primary border border-primary/20"
                              : "bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-400"
                          }`}
                        >
                          {u.role}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-700 dark:text-slate-300">
                        {u.region === "India" ? "🇮🇳 India" : "🌍 International"}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            u.status === "Active"
                              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                              : "bg-red-500/10 text-red-600 dark:text-red-400"
                          }`}
                        >
                          {u.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-500 dark:text-slate-400">{u.joined}</td>
                      <td className="py-3 px-4 text-right space-x-2">
                        <button
                          onClick={() => toggleUserStatus(u.id)}
                          className="px-2.5 py-1 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-750 text-[10px] font-bold text-slate-700 dark:text-slate-300 transition-colors"
                        >
                          {u.status === "Active" ? "Suspend" : "Activate"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* FEATURE FLAGS */}
        {activeTab === "features" && (
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">System Feature Flags & Global Toggles</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Control platform capabilities in real time.</p>
            </div>

            <div className="space-y-4">
              {[
                { key: "maintenanceMode", label: "Maintenance Mode", desc: "Temporarily lock platform for maintenance" },
                { key: "aiVoiceEnabled", label: "AI Voice Assistant Integration", desc: "Enable automated AI phone calls" },
                { key: "whatsappEnabled", label: "WhatsApp Business API Engine", desc: "Enable multi-channel WhatsApp messaging" },
                { key: "autoGeoIpEnabled", label: "FastAPI IP Region Auto-Detection", desc: "Auto detect visitor country via client IP" },
                { key: "debugLogsEnabled", label: "System Debug Logging", desc: "Capture real-time operational telemetry" },
              ].map((flag) => {
                const isEnabled = (featureFlags as any)[flag.key];
                return (
                  <div
                    key={flag.key}
                    className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800"
                  >
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">{flag.label}</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">{flag.desc}</div>
                    </div>
                    <button
                      onClick={() =>
                        setFeatureFlags((prev) => ({
                          ...prev,
                          [flag.key]: !(prev as any)[flag.key],
                        }))
                      }
                      className={`p-1 rounded-full transition-colors ${
                        isEnabled ? "text-emerald-500" : "text-slate-400 dark:text-slate-600"
                      }`}
                    >
                      {isEnabled ? (
                        <ToggleRight className="w-8 h-8" />
                      ) : (
                        <ToggleLeft className="w-8 h-8" />
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* AUDIT LOGS */}
        {activeTab === "logs" && (
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">Platform Telemetry & Audit Event Stream</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Live operational log stream.</p>
              </div>
              <button
                onClick={() =>
                  setAuditLogs((prev) => [
                    { id: Date.now(), event: "Manual Log Stream Refreshed", user: "System", time: "Just now", status: "info" },
                    ...prev,
                  ])
                }
                className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-750 text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Refresh Logs</span>
              </button>
            </div>

            <div className="space-y-2">
              {auditLogs.map((log) => (
                <div
                  key={log.id}
                  className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        log.status === "success"
                          ? "bg-emerald-500"
                          : log.status === "warning"
                          ? "bg-amber-500"
                          : "bg-primary"
                      }`}
                    />
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white">{log.event}</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">Triggered by: {log.user}</div>
                    </div>
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono">{log.time}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
