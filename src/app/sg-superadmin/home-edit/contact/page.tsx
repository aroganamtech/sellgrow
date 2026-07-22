"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Save, CheckCircle2 } from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";

export default function ContactEditPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [supportEmail, setSupportEmail] = useState("support@sellgrow.in");
  const [helplinePhone, setHelplinePhone] = useState("+91 98765 43210");
  const [officeAddress, setOfficeAddress] = useState("SellGrow HQ, Tech Park Campus, Bengaluru, Karnataka, India");

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("sg_superadmin_auth") === "true") {
      setIsAuthenticated(true);
    } else {
      router.push("/sg-superadmin");
    }
    setIsLoading(false);
  }, [router]);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (isLoading || !isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      <AdminHeader title="Contact Us Editor" showBackHub backHubHref="/sg-superadmin/home-edit" />

      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white font-display">
                Contact & Support Details Content
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Customize support email, phone helpline, and headquarters office address.
              </p>
            </div>

            <button
              onClick={handleSave}
              className="px-5 py-2.5 bg-gradient-to-r from-primary to-secondary text-white font-bold text-xs rounded-xl hover:opacity-95 transition-opacity flex items-center gap-2 shadow-lg shadow-primary/20"
            >
              <Save className="w-4 h-4" />
              <span>Save & Publish</span>
            </button>
          </div>

          {saved && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Contact & support info updated live!</span>
            </motion.div>
          )}

          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Support Email Address</label>
                <input
                  type="email"
                  value={supportEmail}
                  onChange={(e) => setSupportEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-primary font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Helpline Phone Number</label>
                <input
                  type="text"
                  value={helplinePhone}
                  onChange={(e) => setHelplinePhone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-primary font-mono"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Headquarters Office Address</label>
              <textarea
                rows={3}
                value={officeAddress}
                onChange={(e) => setOfficeAddress(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-primary leading-relaxed"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
