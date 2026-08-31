"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  ChevronDown,
  HelpCircle,
  Zap,
  Check,
  ShieldCheck,
  Star,
  Crown,
  Shield,
  Building2,
  CheckCircle2,
  Mail,
} from "lucide-react";

export default function PricingPage() {
  const { region } = useLanguage();
  const [billingCycle, setBillingCycle] = useState("yearly"); // "monthly" | "yearly"
  const [activeFaq, setActiveFaq] = useState(0);

  const toggleFaq = (idx) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  const isINR = region === "in";

  const plans = [
    {
      id: "gold",
      name: "Gold Plan",
      badge: "Starter Package",
      description:
        "Essential commerce services to launch your brand online, generate marketing assets, and track basic sessions.",
      priceMonthly: isINR ? 1499 : 19,
      priceYearly: isINR ? 1199 : 15,
      period: "/month",
      billingNote: isINR
        ? "Billed annually (₹14,388/yr)"
        : "Billed annually ($180/yr)",
      accentGradient: "from-amber-500 via-amber-400 to-yellow-500",
      badgeStyle: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30",
      borderStyle: "border-amber-200 dark:border-amber-900/40 hover:border-amber-500/60",
      glowStyle: "hover:shadow-[0_0_35px_rgba(245,158,11,0.15)]",
      buttonStyle:
        "bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-white shadow-lg shadow-amber-500/20",
      icon: Shield,
      popular: false,
      buttonText: "Start 14-Day Free Trial",
      link: "/register?plan=gold",
      features: [
        { text: "Website (Page Builder Engine)", highlight: true },
        { text: "Brochure Logo (Brand Materials)", highlight: true },
        { text: "Mobile View (Interface Logs)", highlight: false },
        { text: "Website View (Traffic Tracker)", highlight: false },
        { text: "Up to 1,000 Leads & Contacts", highlight: false },
        { text: "Standard Email Support", highlight: false },
        { text: "14-Day Free Trial Included", highlight: true },
      ],
    },
    {
      id: "elite",
      name: "Elite Plan",
      badge: "Most Popular",
      description:
        "Comprehensive growth suite with official WhatsApp API, Generative AI Agent, and multi-channel marketing.",
      priceMonthly: isINR ? 3999 : 49,
      priceYearly: isINR ? 3199 : 39,
      period: "/month",
      billingNote: isINR
        ? "Billed annually (₹38,388/yr)"
        : "Billed annually ($468/yr)",
      accentGradient: "from-emerald-500 via-teal-500 to-emerald-600",
      badgeStyle: "bg-emerald-500 text-white font-black",
      borderStyle: "border-emerald-500 dark:border-emerald-450 ring-2 ring-emerald-500/40",
      glowStyle: "shadow-[0_0_40px_rgba(16,185,129,0.2)]",
      buttonStyle:
        "bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-white shadow-xl shadow-emerald-500/30",
      icon: Zap,
      popular: true,
      buttonText: "Start 14-Day Free Trial",
      link: "/register?plan=elite",
      features: [
        { text: "Everything in Gold Plan", highlight: true },
        { text: "WhatsApp API (Meta Business Gateway)", highlight: true },
        { text: "AI Agent (Generative Customer Bot)", highlight: true },
        { text: "Social Media Creation (Auto-Posting)", highlight: true },
        { text: "SEO/AEO/GEO, Google Ads (Metrics)", highlight: true },
        { text: "Up to 10,000 Leads & Contacts", highlight: false },
        { text: "24/7 Priority Support", highlight: true },
        { text: "14-Day Free Trial Included", highlight: true },
      ],
    },
    {
      id: "platinum",
      name: "Platinum Plan",
      badge: "Enterprise Tier",
      description:
        "Maximum growth power featuring immersive 3D View rendering, custom fine-tuned AI Agents, and VIP care.",
      priceMonthly: isINR ? 8999 : 119,
      priceYearly: isINR ? 7199 : 95,
      period: "/month",
      billingNote: isINR
        ? "Billed annually (₹86,388/yr)"
        : "Billed annually ($1,140/yr)",
      accentGradient: "from-purple-600 via-indigo-600 to-slate-900",
      badgeStyle: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30",
      borderStyle: "border-purple-200 dark:border-purple-900/40 hover:border-purple-500/60",
      glowStyle: "hover:shadow-[0_0_35px_rgba(168,85,247,0.15)]",
      buttonStyle:
        "bg-gradient-to-r from-purple-600 via-indigo-600 to-slate-900 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-500/20",
      icon: Crown,
      popular: false,
      buttonText: "Start 14-Day Free Trial",
      link: "/register?plan=platinum",
      features: [
        { text: "Everything in Elite Plan", highlight: true },
        { text: "3D View (Immersive WebGL Engine)", highlight: true },
        { text: "AI Agent (Custom Fine-Tuned Model)", highlight: true },
        { text: "Unlimited Leads & Broadcasts", highlight: false },
        { text: "Custom Webhooks & API Access", highlight: false },
        { text: "Dedicated Account Manager & VIP Onboarding", highlight: true },
        { text: "14-Day Free Trial Included", highlight: true },
      ],
    },
    {
      id: "custom",
      name: "Custom Plan",
      badge: "Tailored Architecture",
      description:
        "Bespoke enterprise setup, dedicated cloud/on-premise deployment, custom AI agents, and SLA guarantees.",
      isCustomPrice: true,
      priceLabel: "Custom Quote",
      period: "/tailored",
      billingNote: "Flexible monthly, annual or contract billing",
      accentGradient: "from-sky-500 via-blue-600 to-indigo-700",
      badgeStyle: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/30",
      borderStyle: "border-sky-200 dark:border-sky-900/40 hover:border-sky-500/60",
      glowStyle: "hover:shadow-[0_0_35px_rgba(14,165,233,0.15)]",
      buttonStyle:
        "bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-700 hover:from-sky-400 hover:to-blue-500 text-white shadow-lg shadow-sky-500/20",
      icon: Building2,
      popular: false,
      buttonText: "Contact Sales",
      link: "/about#contact",
      features: [
        { text: "Everything in Platinum Plan", highlight: true },
        { text: "Custom Website, Mobile View & Website View Specs", highlight: true },
        { text: "Dedicated WhatsApp API Instance & Multi-Agent Inbox", highlight: false },
        { text: "Custom AI Agent Engine & Fine-Tuned Datasets", highlight: true },
        { text: "Bespoke 3D View Renderings & Custom Assets", highlight: false },
        { text: "Dedicated Solution Architect & SOC2 Compliance", highlight: false },
        { text: "Strict SLA Guarantees & 24/7 VIP Phone Support", highlight: true },
      ],
    },
  ];

  const comparisonFeatures = [
    {
      category: "Growth Services Included",
      items: [
        { name: "Website", gold: true, elite: true, platinum: true, custom: "Custom Specs" },
        { name: "Brochure Logo", gold: true, elite: true, platinum: true, custom: true },
        { name: "Mobile View", gold: true, elite: true, platinum: true, custom: true },
        { name: "Website View", gold: true, elite: true, platinum: true, custom: true },
        { name: "Social Media Creation", gold: false, elite: true, platinum: true, custom: true },
        { name: "SEO/AEO/GEO, Google Ads", gold: false, elite: true, platinum: true, custom: true },
        { name: "WhatsApp API", gold: false, elite: true, platinum: true, custom: "Dedicated Instance" },
        { name: "AI Agent", gold: false, elite: "Standard Agent", platinum: "Custom Trained", custom: "Fine-Tuned Model" },
        { name: "3D View", gold: false, elite: false, platinum: true, custom: "Custom Assets" },
      ],
    },
    {
      category: "Capacity, SLAs & Support",
      items: [
        { name: "Leads & Contacts Capacity", gold: "1,000", elite: "10,000", platinum: "Unlimited", custom: "Unlimited + Isolated DB" },
        { name: "14-Day Free Trial / Proof of Concept", gold: true, elite: true, platinum: true, custom: "Custom PoC / Demo" },
        { name: "Support Service Level", gold: "Standard Email", elite: "24/7 Priority", platinum: "VIP & Dedicated Manager", custom: "24/7 Dedicated SLA & Architect" },
      ],
    },
  ];

  const faqs = [
    {
      q: "Which services are included in each plan?",
      a: "Gold Plan includes Website, Brochure Logo, Mobile View, and Website View. Elite Plan adds WhatsApp API, AI Agent, Social Media Creation, and SEO/AEO/GEO, Google Ads. Platinum Plan includes all of the above plus 3D View rendering and custom AI Agent training.",
    },
    {
      q: "Can I try any plan for free before committing?",
      a: "Yes! All SellGrow standard plans (Gold, Elite, and Platinum) come with a 14-Day Free Trial with no credit card required. For Custom Plans, our sales team can set up a personalized Proof of Concept.",
    },
    {
      q: "What is included in the Custom Plan?",
      a: "The Custom Plan is tailored for enterprise organizations needing custom integrations, dedicated cloud/on-premise deployment, bespoke AI model training, SLA guarantees, and a dedicated solution architect.",
    },
    {
      q: "Can I switch plans or upgrade anytime?",
      a: "Absolutely! You can easily upgrade from Gold to Elite, Platinum, or request a Custom tier upgrade anytime directly from your dashboard.",
    },
    {
      q: "How does the annual billing discount work?",
      a: "When you choose Annual Billing, you get a 20% discount on every month's equivalent plan rate, billed once per year.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white relative transition-colors duration-300">
      <Navbar />

      <main className="flex-grow pt-20 pb-16 md:pt-24 md:pb-24 relative z-10 overflow-x-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/5 dark:bg-primary/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* HERO HEADER */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-primary/10 text-primary border border-primary/30 shadow-md shadow-primary/10"
            >
              <Sparkles className="w-4 h-4" />
              <span>
                {isINR
                  ? "🇮🇳 India Pricing (INR ₹)"
                  : "🌍 Global Pricing (USD $)"}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-display text-slate-900 dark:text-white leading-tight"
            >
              Simple, Transparent Plans for Every Business
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed"
            >
              Choose between <span className="font-bold text-amber-500">Gold</span>,{" "}
              <span className="font-bold text-emerald-500">Elite</span>,{" "}
              <span className="font-bold text-purple-500">Platinum</span>, and{" "}
              <span className="font-bold text-sky-500">Custom</span> plans. Test drive standard plans free for 14 days.
            </motion.p>

            {/* MONTHLY / YEARLY BILLING TOGGLE */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="pt-4 flex items-center justify-center"
            >
              <div className="p-1.5 rounded-2xl bg-slate-200/80 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 inline-flex items-center gap-2 shadow-inner">
                <button
                  onClick={() => setBillingCycle("monthly")}
                  className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                    billingCycle === "monthly"
                      ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-md border border-slate-250 dark:border-slate-700"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  Monthly Billing
                </button>

                <button
                  onClick={() => setBillingCycle("yearly")}
                  className={`px-5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                    billingCycle === "yearly"
                      ? "bg-gradient-to-r from-primary to-indigo-600 text-white shadow-md shadow-primary/20"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <Zap className="w-4 h-4" />
                  <span>Annual Billing</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-[10px] font-black uppercase border border-emerald-500/30">
                    Save 20%
                  </span>
                </button>
              </div>
            </motion.div>
          </div>

          {/* 4 PLAN CARDS GRID (GOLD, ELITE, PLATINUM, CUSTOM) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch pt-4">
            {plans.map((plan, idx) => {
              const Icon = plan.icon;
              const price = plan.isCustomPrice
                ? plan.priceLabel
                : billingCycle === "yearly"
                ? plan.priceYearly
                : plan.priceMonthly;
              const formattedPrice = plan.isCustomPrice
                ? plan.priceLabel
                : isINR
                ? `₹${price.toLocaleString("en-IN")}`
                : `$${price}`;

              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * idx }}
                  className={`relative p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#090f1d] border flex flex-col justify-between transition-all duration-300 ${
                    plan.borderStyle
                  } ${plan.glowStyle} ${
                    plan.popular ? "lg:-translate-y-3" : ""
                  }`}
                >
                  {/* POPULAR BADGE */}
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-[11px] font-black uppercase tracking-wider shadow-lg shadow-emerald-500/30 flex items-center gap-1.5">
                      <Star className="w-3.5 h-3.5 fill-white" />
                      <span>{plan.badge}</span>
                    </div>
                  )}

                  <div className="space-y-6">
                    {/* Header */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="space-y-1">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${plan.badgeStyle}`}
                        >
                          {plan.badge}
                        </span>
                        <h2 className="text-xl font-black text-slate-900 dark:text-white font-display">
                          {plan.name}
                        </h2>
                      </div>
                      <div
                        className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${plan.accentGradient} flex items-center justify-center text-white shadow-md shrink-0`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-400 font-medium min-h-[48px]">
                      {plan.description}
                    </p>

                    {/* Pricing Display */}
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-150 dark:border-slate-800 space-y-1">
                      <div className="flex items-baseline gap-1.5">
                        <span className={`font-black text-slate-900 dark:text-white font-display ${plan.isCustomPrice ? "text-2xl" : "text-3xl"}`}>
                          {formattedPrice}
                        </span>
                        {!plan.isCustomPrice && (
                          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                            {plan.period}
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 block">
                        {plan.isCustomPrice
                          ? plan.billingNote
                          : billingCycle === "yearly"
                          ? plan.billingNote
                          : "Billed monthly"}
                      </span>
                    </div>

                    {/* CTA BUTTON */}
                    <Link
                      href={plan.link}
                      className={`w-full py-3.5 px-4 rounded-2xl text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 transition-all ${plan.buttonStyle}`}
                    >
                      <span>{plan.buttonText}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>

                    {/* Features List */}
                    <div className="space-y-3 pt-2">
                      <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block font-mono">
                        Included Capabilities:
                      </span>
                      <ul className="space-y-2.5">
                        {plan.features.map((feat, fIdx) => (
                          <li
                            key={fIdx}
                            className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 font-medium"
                          >
                            <CheckCircle2
                              className={`w-3.5 h-3.5 mt-0.5 shrink-0 stroke-[2.5] ${
                                feat.highlight
                                  ? "text-emerald-500"
                                  : "text-slate-400 dark:text-slate-500"
                              }`}
                            />
                            <span
                              className={
                                feat.highlight
                                  ? "font-bold text-slate-900 dark:text-white"
                                  : ""
                              }
                            >
                              {feat.text}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Trust Footer inside card */}
                  <div className="pt-5 border-t border-slate-150 dark:border-slate-800/80 mt-6 text-center">
                    <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                      {plan.isCustomPrice
                        ? "🤝 Dedicated Solutions Architect"
                        : "⚡ Instant setup • Cancel anytime"}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* TRUST GUARANTEES BAR */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#090f1e] border border-slate-200 dark:border-slate-800 shadow-xl flex flex-wrap items-center justify-around gap-6 text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
              <span>14-Day Free Trial on Standard Plans</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500" />
              <span>No Credit Card Required</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-sky-500" />
              <span>Custom Enterprise Contracts Available</span>
            </div>
          </div>

          {/* DETAILED PLAN COMPARISON MATRIX */}
          <div className="space-y-6 pt-10">
            <div className="text-center space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Detailed Breakdown
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 dark:text-white">
                Compare Plan Capabilities
              </h2>
            </div>

            <div className="overflow-x-auto rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#090f1e] shadow-xl">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80">
                    <th className="p-4 font-black text-slate-900 dark:text-white">
                      Service Name
                    </th>
                    <th className="p-4 font-black text-amber-600 dark:text-amber-400 text-center w-[20%]">
                      Gold
                    </th>
                    <th className="p-4 font-black text-emerald-600 dark:text-emerald-400 text-center w-[20%] bg-emerald-500/5">
                      Elite
                    </th>
                    <th className="p-4 font-black text-purple-600 dark:text-purple-400 text-center w-[20%]">
                      Platinum
                    </th>
                    <th className="p-4 font-black text-sky-600 dark:text-sky-400 text-center w-[20%]">
                      Custom
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-150 dark:divide-slate-800">
                  {comparisonFeatures.map((sec, sIdx) => (
                    <React.Fragment key={sIdx}>
                      <tr className="bg-slate-100/60 dark:bg-slate-900/40">
                        <td
                          colSpan={5}
                          className="px-4 py-2.5 font-mono text-[11px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400"
                        >
                          {sec.category}
                        </td>
                      </tr>
                      {sec.items.map((item, iIdx) => (
                        <tr key={iIdx} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/20">
                          <td className="p-4 font-bold text-slate-800 dark:text-slate-200">
                            {item.name}
                          </td>
                          <td className="p-4 text-center">
                            {typeof item.gold === "boolean" ? (
                              item.gold ? (
                                <Check className="w-4 h-4 text-emerald-500 mx-auto stroke-[3]" />
                              ) : (
                                <span className="text-slate-300 dark:text-slate-700 font-bold">—</span>
                              )
                            ) : (
                              <span className="font-bold text-slate-700 dark:text-slate-300">
                                {item.gold}
                              </span>
                            )}
                          </td>
                          <td className="p-4 text-center bg-emerald-500/5">
                            {typeof item.elite === "boolean" ? (
                              item.elite ? (
                                <Check className="w-4 h-4 text-emerald-500 mx-auto stroke-[3]" />
                              ) : (
                                <span className="text-slate-300 dark:text-slate-700 font-bold">—</span>
                              )
                            ) : (
                              <span className="font-bold text-slate-700 dark:text-slate-300">
                                {item.elite}
                              </span>
                            )}
                          </td>
                          <td className="p-4 text-center">
                            {typeof item.platinum === "boolean" ? (
                              item.platinum ? (
                                <Check className="w-4 h-4 text-emerald-500 mx-auto stroke-[3]" />
                              ) : (
                                <span className="text-slate-300 dark:text-slate-700 font-bold">—</span>
                              )
                            ) : (
                              <span className="font-bold text-slate-700 dark:text-slate-300">
                                {item.platinum}
                              </span>
                            )}
                          </td>
                          <td className="p-4 text-center">
                            {typeof item.custom === "boolean" ? (
                              item.custom ? (
                                <Check className="w-4 h-4 text-emerald-500 mx-auto stroke-[3]" />
                              ) : (
                                <span className="text-slate-300 dark:text-slate-700 font-bold">—</span>
                              )
                            ) : (
                              <span className="font-bold text-sky-600 dark:text-sky-400">
                                {item.custom}
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* PRICING FAQ ACCORDION */}
          <div className="space-y-6 max-w-3xl mx-auto pt-8 border-t border-slate-200 dark:border-slate-800">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary">
                <HelpCircle className="w-4 h-4" />
                <span>Frequently Asked Questions</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 dark:text-white">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div
                    key={idx}
                    className="border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-[#0d1424]/80 backdrop-blur-xl overflow-hidden transition-all duration-200"
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 focus:outline-none"
                    >
                      <span className="text-sm font-bold text-slate-800 dark:text-white font-display">
                        {faq.q}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-500 dark:text-slate-400 transform transition-transform duration-200 shrink-0 ${
                          isOpen ? "rotate-180 text-primary" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-4 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/80 pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
