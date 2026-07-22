"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { Mail, Github, Twitter, Linkedin, Instagram, Facebook, Youtube, Send } from "lucide-react";
import Logo from "@/components/layout/Logo";

export default function Footer() {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="border-t border-border/80 bg-white dark:bg-[#060a10] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Logo & Description */}
          <div className="lg:col-span-4 md:col-span-2 space-y-3">
            <Link href="/">
              <Logo className="w-48 h-24" />
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-sm">
              {t("footerDesc")}
            </p>
            <div className="flex items-center flex-wrap gap-2 pt-1">
              <a href="#" className="p-2 rounded-xl bg-slate-100 dark:bg-white/5 text-muted-foreground hover:text-blue-500 hover:bg-blue-500/10 border border-transparent hover:border-blue-500/20 transition-all" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-xl bg-slate-100 dark:bg-white/5 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all" aria-label="YouTube">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-xl bg-slate-100 dark:bg-white/5 text-muted-foreground hover:text-pink-500 hover:bg-pink-500/10 border border-transparent hover:border-pink-500/20 transition-all" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-xl bg-slate-100 dark:bg-white/5 text-muted-foreground hover:text-blue-400 hover:bg-blue-400/10 border border-transparent hover:border-blue-400/20 transition-all" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-xl bg-slate-100 dark:bg-white/5 text-muted-foreground hover:text-foreground hover:bg-white/10 border border-transparent hover:border-white/20 transition-all" aria-label="GitHub">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-xl bg-slate-100 dark:bg-white/5 text-muted-foreground hover:text-sky-400 hover:bg-sky-500/10 border border-transparent hover:border-sky-500/20 transition-all" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Core Modules Links */}
          <div id="footer-features" className="lg:col-span-2 md:col-span-1 space-y-3">
            <h4 className="text-xs font-bold text-foreground uppercase tracking-wider font-display">
              {t("features")}
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <Link href="/#features" className="hover:text-foreground transition-colors">
                  {t("crm")}
                </Link>
              </li>
              <li>
                <Link href="/#features" className="hover:text-foreground transition-colors">
                  {t("inbox")}
                </Link>
              </li>
              <li>
                <Link href="/#features" className="hover:text-foreground transition-colors">
                  {t("voice")}
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-foreground transition-colors">
                  {t("pricing")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal / Policy Links */}
          <div className="lg:col-span-2 md:col-span-1 space-y-3">
            <h4 className="text-xs font-bold text-foreground uppercase tracking-wider font-display">
              {t("footerResources")}
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <Link href="/privacy-policy" className="hover:text-foreground transition-colors">
                  {t("footerPrivacy")}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-foreground transition-colors">
                  {t("footerTerms")}
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-foreground transition-colors">
                  {t("footerCookies")}
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-foreground transition-colors">
                  {t("footerDisclaimer")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Input */}
          <div className="lg:col-span-4 md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-foreground uppercase tracking-wider font-display">
              {t("footerSubscribe")}
            </h4>
            <p className="text-xs text-muted-foreground">
              {t("footerSubDesc")}
            </p>
            <form onSubmit={handleSubscribe} className="relative mt-2 max-w-md">
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("footerEnterEmail")}
                required
                className="w-full pl-3 pr-10 py-2 text-xs rounded-xl border border-border glass-input focus:outline-none focus:border-primary"
              />
              <button
                type="submit"
                className="absolute right-1 top-1 bottom-1 px-3 rounded-lg bg-primary hover:opacity-90 text-white transition-all text-xs font-semibold flex items-center justify-center"
                aria-label="Submit Email"
              >
                {subscribed ? (
                  <span className="text-[10px] font-bold">{t("footerDone")}</span>
                ) : (
                  <Send className="w-3.5 h-3.5" />
                )}
              </button>
            </form>
          </div>
        </div>

        <hr className="border-border opacity-40 my-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-muted-foreground gap-4 pl-12 sm:pl-0">
          <p>© {new Date().getFullYear()} SellGrow Systems Inc. {t("footerRights")}</p>
        </div>
      </div>
    </footer>
  );
}
