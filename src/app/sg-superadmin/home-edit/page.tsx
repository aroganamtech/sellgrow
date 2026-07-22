"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Edit3,
  Home,
  Zap,
  Tag,
  Info,
  PhoneCall,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";

export default function HomeEditSelectionPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedAuth = sessionStorage.getItem("sg_superadmin_auth");
    if (savedAuth === "true") {
      setIsAuthenticated(true);
    } else {
      router.push("/sg-superadmin");
    }
    setIsLoading(false);
  }, [router]);

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center text-slate-500 dark:text-slate-400 text-sm">
        Verifying Super Admin Authorization...
      </div>
    );
  }

  const sections = [
    {
      id: "hero",
      title: "Home Page (Hero & Banner)",
      desc: "Edit live hero headlines, release badges, subtitle descriptions, and call-to-action buttons.",
      icon: Home,
      href: "/sg-superadmin/home-edit/hero",
      color: "from-primary to-secondary",
    },
    {
      id: "features",
      title: "Features Section",
      desc: "Edit features headline, subtitle, and individual feature cards for Voice AI, WhatsApp, and Geo-IP.",
      icon: Zap,
      href: "/sg-superadmin/home-edit/features",
      color: "from-secondary to-accent-brand",
    },
    {
      id: "pricing",
      title: "Pricing Tiers",
      desc: "Override regional pricing rates for India (₹ INR), International ($ USD), and Enterprise tiers.",
      icon: Tag,
      href: "/sg-superadmin/home-edit/pricing",
      color: "from-emerald-500 to-teal-400",
    },
    {
      id: "about",
      title: "About Us Content",
      desc: "Update company mission statement, future vision, and founder's note.",
      icon: Info,
      href: "/sg-superadmin/home-edit/about",
      color: "from-amber-500 to-orange-400",
    },
    {
      id: "contact",
      title: "Contact Us Info",
      desc: "Edit support email address, helpline phone numbers, and office headquarters location.",
      icon: PhoneCall,
      href: "/sg-superadmin/home-edit/contact",
      color: "from-purple-500 to-indigo-500",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      <AdminHeader title="Home Work Sections" showBackHub />

      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-8 flex flex-col justify-center">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary border border-primary/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>HOME WORK SECTION EDITORS</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-display">
            Select Section to Edit
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Each section has its own dedicated page for editing content, copy, titles, and localized parameters.
          </p>
        </div>

        {/* 5 SEPARATE SECTION CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          {sections.map((sec) => {
            const Icon = sec.icon;
            return (
              <Link key={sec.id} href={sec.href}>
                <motion.div
                  whileHover={{ scale: 1.02, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  className="group h-full p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-all duration-300 shadow-xl flex flex-col justify-between space-y-5 relative overflow-hidden"
                >
                  <div className="space-y-4">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${sec.color} flex items-center justify-center text-white shadow-md`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-extrabold text-slate-900 dark:text-white font-display group-hover:text-primary transition-colors flex items-center justify-between">
                      <span>{sec.title}</span>
                      <ArrowRight className="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {sec.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-200 dark:border-slate-800/80 flex items-center text-xs font-extrabold text-primary gap-1">
                    <span>Edit {sec.title}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}
