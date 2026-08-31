"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ShieldCheck, Lock, FileText, CheckCircle2, Mail, Database, Globe, UserCheck, Key, Server } from "lucide-react";
export default function PrivacyPolicyPage() {
    const [activeSection, setActiveSection] = useState("collection");
    const sections = [
        { id: "collection", title: "1. Information We Collect" },
        { id: "usage", title: "2. How We Use Data" },
        { id: "sharing", title: "3. Data Sharing & Third Parties" },
        { id: "security", title: "4. Encryption & Security" },
        { id: "rights", title: "5. Your Privacy Rights" },
        { id: "cookies", title: "6. Cookies & Tracking" },
        { id: "contact", title: "7. Contact Privacy Officer" }
    ];
    return (<div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
      <Navbar />

      <main className="flex-grow pt-20 pb-20 relative z-10 overflow-x-hidden">
        {/* Background Radial Glow */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-primary/10 dark:bg-primary/15 rounded-full blur-[140px] pointer-events-none -z-10"/>

        {/* HERO BANNER */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-primary/10 text-primary border border-primary/30 shadow-sm">
              <ShieldCheck className="w-4 h-4"/>
              <span>Trust & Legal Transparency</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl sm:text-5xl font-extrabold tracking-tight font-display text-slate-900 dark:text-white">
              Privacy Policy
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              Last Updated: <span className="font-semibold text-slate-900 dark:text-white">August 28, 2026</span> • Effective Version 3.0
            </motion.p>
          </div>
        </section>

        {/* POLICY CONTENT CONTAINER */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* SIDEBAR NAVIGATION */}
            <div className="lg:col-span-4 sticky top-24">
              <div className="p-5 rounded-3xl bg-white dark:bg-[#0b1220] border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800 text-xs font-black uppercase text-slate-500 font-display">
                  <FileText className="w-4 h-4 text-primary"/> Table of Contents
                </div>

                <nav className="space-y-1">
                  {sections.map((sec) => (<a key={sec.id} href={`#${sec.id}`} onClick={() => setActiveSection(sec.id)} className={`block px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${activeSection === sec.id
                ? "bg-primary/10 text-primary border border-primary/30"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white"}`}>
                      {sec.title}
                    </a>))}
                </nav>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                    <CheckCircle2 className="w-4 h-4"/> GDPR & DPDP Act Compliant
                  </div>
                  <div className="flex items-center gap-2 text-xs text-sky-600 dark:text-sky-400 font-semibold">
                    <Lock className="w-4 h-4"/> End-to-End Encrypted Data
                  </div>
                </div>
              </div>
            </div>

            {/* MAIN POLICY CONTENT */}
            <div className="lg:col-span-8 space-y-8">
              <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#0b1220] border border-slate-200 dark:border-slate-800 shadow-xl space-y-10">

                {/* SUMMARY INTRO */}
                <div className="p-5 rounded-2xl bg-primary/5 border border-primary/20 space-y-2">
                  <h3 className="text-sm font-bold text-primary font-display flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4"/> Executive Summary
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    SellGrow Systems Inc. ("SellGrow", "we", "our", or "us") respects your business and personal privacy. This Privacy Policy details how we collect, store, process, and protect your information across our CRM, WhatsApp Business API gateway, AI Voice Assistants, and modular SaaS tools.
                  </p>
                </div>

                {/* SECTION 1 */}
                <div id="collection" className="space-y-4 scroll-mt-28">
                  <h2 className="text-xl font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
                    <Database className="w-5 h-5 text-primary"/> 1. Information We Collect
                  </h2>
                  <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed space-y-3">
                    <p>
                      We collect information to provide, personalize, and improve our digital operating system:
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>
                        <strong className="text-slate-800 dark:text-slate-200">Account & Profile Information:</strong> Name, email address, phone number, company name, billing details, and login credentials provided during account creation.
                      </li>
                      <li>
                        <strong className="text-slate-800 dark:text-slate-200">Customer Communication Data:</strong> Messages, chat logs, media attachments, and transcripts routed through Meta WhatsApp API, live website chat, and shared team inboxes.
                      </li>
                      <li>
                        <strong className="text-slate-800 dark:text-slate-200">VoIP & AI Voice Recordings:</strong> Audio snippets, real-time speech-to-text transcripts, and caller sentiment metrics generated during automated AI Voice Receptionist calls.
                      </li>
                      <li>
                        <strong className="text-slate-800 dark:text-slate-200">Technical & Telemetry Data:</strong> IP address, browser type, device identifiers, system performance logs, and regional location metrics.
                      </li>
                    </ul>
                  </div>
                </div>

                {/* SECTION 2 */}
                <div id="usage" className="space-y-4 scroll-mt-28 border-t border-slate-100 dark:border-slate-800 pt-8">
                  <h2 className="text-xl font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
                    <Server className="w-5 h-5 text-emerald-500"/> 2. How We Use Data
                  </h2>
                  <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed space-y-3">
                    <p>
                      Your data is processed strictly for legitimate operational purposes:
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>To deliver and maintain our SaaS services, CRM pipeline tracking, and automated workflows.</li>
                      <li>To train tenant-isolated AI models for automated speech recognition and generative responses without cross-tenant data leaks.</li>
                      <li>To process subscription payments, issue invoices, and prevent fraud.</li>
                      <li>To send critical system alerts, maintenance notifications, and product updates.</li>
                    </ul>
                  </div>
                </div>

                {/* SECTION 3 */}
                <div id="sharing" className="space-y-4 scroll-mt-28 border-t border-slate-100 dark:border-slate-800 pt-8">
                  <h2 className="text-xl font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
                    <Globe className="w-5 h-5 text-sky-500"/> 3. Data Sharing & Third Parties
                  </h2>
                  <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed space-y-3">
                    <p>
                      We never sell, rent, or trade your personal or business data to third parties. Data is shared only with trusted infrastructure providers bound by strict confidentiality agreements:
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li><strong className="text-slate-800 dark:text-slate-200">Meta Platforms Inc.:</strong> Official WhatsApp Cloud API transmission.</li>
                      <li><strong className="text-slate-800 dark:text-slate-200">Payment Processors:</strong> Stripe and Razorpay for PCI-DSS compliant payment processing.</li>
                      <li><strong className="text-slate-800 dark:text-slate-200">Cloud Host Providers:</strong> AWS, Vercel, and Google Cloud Platform for encrypted database hosting.</li>
                    </ul>
                  </div>
                </div>

                {/* SECTION 4 */}
                <div id="security" className="space-y-4 scroll-mt-28 border-t border-slate-100 dark:border-slate-800 pt-8">
                  <h2 className="text-xl font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
                    <Lock className="w-5 h-5 text-indigo-500"/> 4. Encryption & Security
                  </h2>
                  <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed space-y-3">
                    <p>
                      We implement multi-layered enterprise security controls:
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>AES-256 bit encryption at rest for database storage and TLS 1.3 encryption in transit.</li>
                      <li>Strict Role-Based Access Control (RBAC) preventing unauthorized employee access.</li>
                      <li>Continuous vulnerability scanning and annual SOC-2 audit compliance checks.</li>
                    </ul>
                  </div>
                </div>

                {/* SECTION 5 */}
                <div id="rights" className="space-y-4 scroll-mt-28 border-t border-slate-100 dark:border-slate-800 pt-8">
                  <h2 className="text-xl font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
                    <UserCheck className="w-5 h-5 text-purple-500"/> 5. Your Privacy Rights
                  </h2>
                  <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed space-y-3">
                    <p>
                      Depending on your jurisdiction (including GDPR in Europe, CCPA in California, and DPDP Act in India), you hold the following rights:
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li><strong className="text-slate-800 dark:text-slate-200">Right of Access:</strong> Request a copy of all personal data held under your tenant account.</li>
                      <li><strong className="text-slate-800 dark:text-slate-200">Right to Erasure (Right to be Forgotten):</strong> Request full deletion of customer records and AI speech logs.</li>
                      <li><strong className="text-slate-800 dark:text-slate-200">Data Portability:</strong> Export your CRM contacts and conversation logs in standard JSON or CSV format.</li>
                    </ul>
                  </div>
                </div>

                {/* SECTION 6 */}
                <div id="cookies" className="space-y-4 scroll-mt-28 border-t border-slate-100 dark:border-slate-800 pt-8">
                  <h2 className="text-xl font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
                    <Key className="w-5 h-5 text-amber-500"/> 6. Cookies & Tracking
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    We use cookies and local storage tokens to maintain user sessions, remember language and regional pricing preferences, and analyze platform traffic. For detailed options, review our dedicated <Link href="/cookies" className="text-primary underline font-bold">Cookie Policy</Link>.
                  </p>
                </div>

                {/* SECTION 7 */}
                <div id="contact" className="space-y-4 scroll-mt-28 border-t border-slate-100 dark:border-slate-800 pt-8">
                  <h2 className="text-xl font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
                    <Mail className="w-5 h-5 text-rose-500"/> 7. Contact Privacy Officer
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    If you have questions, data request inquiries, or security concerns, contact our Data Protection Officer:
                  </p>
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs space-y-1">
                    <p className="font-bold text-slate-900 dark:text-white">Data Protection Officer (DPO)</p>
                    <p className="text-slate-600 dark:text-slate-400">SellGrow Systems Inc. Headquarters</p>
                    <p className="text-primary font-mono font-bold">Email: privacy@sellgrow.io</p>
                    <p className="text-slate-500 font-mono">Address: Grand Tower, 4th Floor, Chennai, TN 600001, India</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>);
}
