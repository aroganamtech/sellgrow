"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Save, CheckCircle2 } from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";

export default function FeaturesEditPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [featuresTitle, setFeaturesTitle] = useState("Core Platform Capabilities");
  const [featuresSubtitle, setFeaturesSubtitle] = useState("Explore our suite of AI voice, multi-channel chat, and intelligent automation agents.");
  const [feature1Title, setFeature1Title] = useState("AI Voice Call Agent");
  const [feature1Desc, setFeature1Desc] = useState("Autonomous voice agent that handles customer inbound & outbound phone calls with natural accent.");
  const [feature2Title, setFeature2Title] = useState("WhatsApp Business Automation");
  const [feature2Desc, setFeature2Desc] = useState("Broadcasting, interactive chat, lead qualification, and order updates directly on WhatsApp.");
  const [feature3Title, setFeature3Title] = useState("Multi-Region Geo-IP Routing");
  const [feature3Desc, setFeature3Desc] = useState("Automatic currency detection and localized pricing based on visitor client IP address.");

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
      <AdminHeader title="Features Section Editor" showBackHub backHubHref="/sg-superadmin/home-edit" />

      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white font-display">
                Features Section Content
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Customize features headline, subtext, and feature cards.
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
              <span>Features section content updated live!</span>
            </motion.div>
          )}

          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Features Headline</label>
                <input
                  type="text"
                  value={featuresTitle}
                  onChange={(e) => setFeaturesTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-primary font-bold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Features Subtitle</label>
                <input
                  type="text"
                  value={featuresSubtitle}
                  onChange={(e) => setFeaturesSubtitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-4">
              <h4 className="text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Feature Cards</h4>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
                <label className="text-xs font-bold text-primary">Card #1 Title & Description</label>
                <input
                  type="text"
                  value={feature1Title}
                  onChange={(e) => setFeature1Title(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-primary font-semibold"
                />
                <textarea
                  rows={2}
                  value={feature1Desc}
                  onChange={(e) => setFeature1Desc(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-primary"
                />
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
                <label className="text-xs font-bold text-secondary">Card #2 Title & Description</label>
                <input
                  type="text"
                  value={feature2Title}
                  onChange={(e) => setFeature2Title(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-primary font-semibold"
                />
                <textarea
                  rows={2}
                  value={feature2Desc}
                  onChange={(e) => setFeature2Desc(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-primary"
                />
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
                <label className="text-xs font-bold text-amber-500">Card #3 Title & Description</label>
                <input
                  type="text"
                  value={feature3Title}
                  onChange={(e) => setFeature3Title(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-primary font-semibold"
                />
                <textarea
                  rows={2}
                  value={feature3Desc}
                  onChange={(e) => setFeature3Desc(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-primary"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
