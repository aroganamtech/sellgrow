"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { FileText, CheckCircle2, AlertTriangle, Scale, ShieldCheck, CreditCard, Ban, Clock } from "lucide-react";
export default function TermsOfServicePage() {
    const [activeSection, setActiveSection] = useState("acceptance");
    const sections = [
        { id: "acceptance", title: "1. Acceptance of Terms" },
        { id: "account", title: "2. Account & License" },
        { id: "acceptable-use", title: "3. Acceptable Use Policy" },
        { id: "billing", title: "4. Billing, Trials & Cancellation" },
        { id: "sla", title: "5. Service Level & Uptime SLA" },
        { id: "ip", title: "6. Intellectual Property Rights" },
        { id: "liability", title: "7. Limitation of Liability" },
        { id: "governing", title: "8. Governing Law & Dispute Resolution" }
    ];
    return (<div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
      <Navbar />

      <main className="flex-grow pt-20 pb-20 relative z-10 overflow-x-hidden">
        {/* Background Radial Glow */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-indigo-500/10 dark:bg-indigo-500/15 rounded-full blur-[140px] pointer-events-none -z-10"/>

        {/* HERO BANNER */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30 shadow-sm">
              <Scale className="w-4 h-4"/>
              <span>Legal Agreement & SaaS Terms</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl sm:text-5xl font-extrabold tracking-tight font-display text-slate-900 dark:text-white">
              Terms of Service
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              Last Updated: <span className="font-semibold text-slate-900 dark:text-white">August 28, 2026</span> • Version 3.0 Standard Contract
            </motion.p>
          </div>
        </section>

        {/* CONTENT CONTAINER */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* SIDEBAR NAVIGATION */}
            <div className="lg:col-span-4 sticky top-24">
              <div className="p-5 rounded-3xl bg-white dark:bg-[#0b1220] border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800 text-xs font-black uppercase text-slate-500 font-display">
                  <FileText className="w-4 h-4 text-indigo-500"/> Terms Navigation
                </div>

                <nav className="space-y-1">
                  {sections.map((sec) => (<a key={sec.id} href={`#${sec.id}`} onClick={() => setActiveSection(sec.id)} className={`block px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${activeSection === sec.id
                ? "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white"}`}>
                      {sec.title}
                    </a>))}
                </nav>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                    <CheckCircle2 className="w-4 h-4"/> 99.9% Service Level Guarantee
                  </div>
                  <div className="flex items-center gap-2 text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
                    <ShieldCheck className="w-4 h-4"/> Binding B2B SaaS Agreement
                  </div>
                </div>
              </div>
            </div>

            {/* MAIN TERMS CONTENT */}
            <div className="lg:col-span-8 space-y-8">
              <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#0b1220] border border-slate-200 dark:border-slate-800 shadow-xl space-y-10">

                {/* SUMMARY INTRO */}
                <div className="p-5 rounded-2xl bg-indigo-500/5 border border-indigo-500/20 space-y-2">
                  <h3 className="text-sm font-bold text-indigo-600 dark:text-indigo-400 font-display flex items-center gap-2">
                    <Scale className="w-4 h-4"/> Service Agreement Summary
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    By creating an account, launching a sandbox workspace, or utilizing SellGrow Systems Inc. software ("SellGrow", "Platform"), you agree to be legally bound by these Terms of Service. Please read them carefully.
                  </p>
                </div>

                {/* SECTION 1 */}
                <div id="acceptance" className="space-y-4 scroll-mt-28">
                  <h2 className="text-xl font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-indigo-500"/> 1. Acceptance of Terms
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    These Terms of Service govern your access to and use of SellGrow websites, CRM modules, Meta WhatsApp API connectors, VoIP voice receptionist services, and business management APIs. If you are entering into this agreement on behalf of a company or legal entity, you represent that you have the authority to bind such entity.
                  </p>
                </div>

                {/* SECTION 2 */}
                <div id="account" className="space-y-4 scroll-mt-28 border-t border-slate-100 dark:border-slate-800 pt-8">
                  <h2 className="text-xl font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-sky-500"/> 2. Account & License Grant
                  </h2>
                  <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed space-y-3">
                    <p>
                      SellGrow grants you a non-exclusive, non-transferable, revocable subscription license to access and use our modular SaaS platform during your active subscription term.
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li><strong className="text-slate-800 dark:text-slate-200">Account Security:</strong> You are responsible for maintaining the confidentiality of API keys, admin login passwords, and multi-factor authentication tokens.</li>
                      <li><strong className="text-slate-800 dark:text-slate-200">Sub-Admin Roles:</strong> Main tenant administrators are responsible for all actions taken by authorized sub-admins or team operators.</li>
                    </ul>
                  </div>
                </div>

                {/* SECTION 3 */}
                <div id="acceptable-use" className="space-y-4 scroll-mt-28 border-t border-slate-100 dark:border-slate-800 pt-8">
                  <h2 className="text-xl font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
                    <Ban className="w-5 h-5 text-rose-500"/> 3. Acceptable Use Policy
                  </h2>
                  <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed space-y-3">
                    <p>
                      You agree not to misuse the SellGrow platform or engage in prohibited activities:
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li><strong className="text-slate-800 dark:text-slate-200">No Unsolicited Spam:</strong> You must strictly adhere to Meta WhatsApp Business API Messaging Policies and local anti-spam regulations (e.g., TCPA, TRAI guidelines). Sending unsolicited promotional spam via automated bots will result in immediate account termination.</li>
                      <li><strong className="text-slate-800 dark:text-slate-200">No Reverse Engineering:</strong> You may not copy, decompile, scrape, or attempt to extract source code or underlying AI models of SellGrow.</li>
                      <li><strong className="text-slate-800 dark:text-slate-200">Illegal Activities:</strong> Users shall not use AI Voice Receptionists or Chatbots for fraudulent schemes, harassment, or illegal impersonation.</li>
                    </ul>
                  </div>
                </div>

                {/* SECTION 4 */}
                <div id="billing" className="space-y-4 scroll-mt-28 border-t border-slate-100 dark:border-slate-800 pt-8">
                  <h2 className="text-xl font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-emerald-500"/> 4. Billing, Trials & Cancellation
                  </h2>
                  <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed space-y-3">
                    <ul className="list-disc pl-5 space-y-2">
                      <li><strong className="text-slate-800 dark:text-slate-200">Modular Subscriptions:</strong> You are charged only for the specific growth modules selected (Sales CRM, WhatsApp API, AI Assistant, etc.) on a monthly or discounted annual cycle.</li>
                      <li><strong className="text-slate-800 dark:text-slate-200">14-Day Free Trial:</strong> Free trial periods grant 14 days of access. If no subscription is selected at trial expiry, your sandbox account transitions to read-only status.</li>
                      <li><strong className="text-slate-800 dark:text-slate-200">Cancellation & Refunds:</strong> You may cancel your subscription anytime via your admin dashboard. Cancellations take effect at the end of the current paid billing cycle. Paid subscription fees are non-refundable.</li>
                    </ul>
                  </div>
                </div>

                {/* SECTION 5 */}
                <div id="sla" className="space-y-4 scroll-mt-28 border-t border-slate-100 dark:border-slate-800 pt-8">
                  <h2 className="text-xl font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
                    <Clock className="w-5 h-5 text-amber-500"/> 5. Service Level Agreement (SLA)
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    SellGrow targets a 99.9% uptime availability for core CRM databases, WebRTC VoIP voice bridges, and WhatsApp API webhooks, excluding scheduled maintenance windows announced at least 24 hours in advance.
                  </p>
                </div>

                {/* SECTION 6 */}
                <div id="ip" className="space-y-4 scroll-mt-28 border-t border-slate-100 dark:border-slate-800 pt-8">
                  <h2 className="text-xl font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-purple-500"/> 6. Intellectual Property & Customer Data
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    You retain full ownership of all business catalogs, lead contacts, customer conversation histories, and uploaded PDF documents. SellGrow retains all rights, title, and interest in and to our proprietary SaaS code, AI algorithms, and brand trademarks.
                  </p>
                </div>

                {/* SECTION 7 */}
                <div id="liability" className="space-y-4 scroll-mt-28 border-t border-slate-100 dark:border-slate-800 pt-8">
                  <h2 className="text-xl font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-rose-500"/> 7. Limitation of Liability
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    To the maximum extent permitted by applicable law, SellGrow Systems Inc. shall not be liable for indirect, incidental, or consequential damages, loss of business revenue, or third-party API downtime (such as Meta API outages or telecom carrier network disruptions).
                  </p>
                </div>

                {/* SECTION 8 */}
                <div id="governing" className="space-y-4 scroll-mt-28 border-t border-slate-100 dark:border-slate-800 pt-8">
                  <h2 className="text-xl font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
                    <Scale className="w-5 h-5 text-indigo-500"/> 8. Governing Law & Contact
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    These Terms shall be governed by and construed in accordance with the laws of India. Any legal disputes shall be subject to the exclusive jurisdiction of the courts in Chennai, Tamil Nadu.
                  </p>
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs space-y-1">
                    <p className="font-bold text-slate-900 dark:text-white">Legal & Compliance Enquiries</p>
                    <p className="text-indigo-500 font-mono font-bold">Email: legal@sellgrow.io</p>
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
