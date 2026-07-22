"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Volume2,
  MessageSquare,
  Smartphone,
  Globe,
  CheckCircle2,
  Play,
  Pause,
  Sparkles,
  Calendar,
} from "lucide-react";
import BookingModal from "./BookingModal";

import { useLanguage } from "@/contexts/LanguageContext";

// Tab types
type SolutionTab = "voice" | "whatsapp" | "app" | "website";

interface SolutionItem {
  id: SolutionTab;
  title: string;
  shortDesc: string;
  longDesc: string;
  icon: React.ElementType;
  tagline: string;
  videoUrl: string;
  features: string[];
  colorClass: string;
  gradientClass: string;
}

export default function SolutionsShowcase() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<SolutionTab>("voice");
  const isManualScrolling = useRef(false);

  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingId, setBookingId] = useState<string>("voice");
  const [bookingTitle, setBookingTitle] = useState<string>("AI Assistant");

  const solutionsData: SolutionItem[] = [
    {
      id: "voice",
      title: t("showcaseVoiceTitle"),
      tagline: t("showcaseVoiceTagline"),
      shortDesc: t("showcaseVoiceShort"),
      longDesc: t("showcaseVoiceLong"),
      icon: Volume2,
      videoUrl: "/videos/Automated_VoIP_Receptionist_.mp4",
      features: [
        t("showcaseVoiceFeat1"),
        t("showcaseVoiceFeat2"),
        t("showcaseVoiceFeat3"),
        t("showcaseVoiceFeat4"),
      ],
      colorClass: "text-sky-500 bg-sky-500/10 dark:bg-sky-500/20",
      gradientClass: "from-sky-500/20 to-blue-600/5",
    },
    {
      id: "whatsapp",
      title: t("showcaseWhatsappTitle"),
      tagline: t("showcaseWhatsappTagline"),
      shortDesc: t("showcaseWhatsappShort"),
      longDesc: t("showcaseWhatsappLong"),
      icon: MessageSquare,
      videoUrl: "/videos/Official_API_Chat_Broadcast.mp4",
      features: [
        t("showcaseWhatsappFeat1"),
        t("showcaseWhatsappFeat2"),
        t("showcaseWhatsappFeat3"),
        t("showcaseWhatsappFeat4"),
      ],
      colorClass: "text-emerald-500 bg-emerald-500/10 dark:bg-emerald-500/20",
      gradientClass: "from-emerald-500/20 to-teal-600/5",
    },
    {
      id: "app",
      title: t("showcaseAppTitle"),
      tagline: t("showcaseAppTagline"),
      shortDesc: t("showcaseAppShort"),
      longDesc: t("showcaseAppLong"),
      icon: Smartphone,
      videoUrl: "/videos/Branded_Android_iOS_Mobile_E.mp4",
      features: [
        t("showcaseAppFeat1"),
        t("showcaseAppFeat2"),
        t("showcaseAppFeat3"),
        t("showcaseAppFeat4"),
      ],
      colorClass: "text-indigo-500 bg-indigo-500/10 dark:bg-indigo-500/20",
      gradientClass: "from-indigo-500/20 to-purple-600/5",
    },
    {
      id: "website",
      title: t("showcaseWebsiteTitle"),
      tagline: t("showcaseWebsiteTagline"),
      shortDesc: t("showcaseWebsiteShort"),
      longDesc: t("showcaseWebsiteLong"),
      icon: Globe,
      videoUrl: "/videos/SEO_Optimized_Enterprise_Landi.mp4",
      features: [
        t("showcaseWebsiteFeat1"),
        t("showcaseWebsiteFeat2"),
        t("showcaseWebsiteFeat3"),
        t("showcaseWebsiteFeat4"),
      ],
      colorClass: "text-amber-500 bg-amber-500/10 dark:bg-amber-500/20",
      gradientClass: "from-amber-500/20 to-orange-600/5",
    },
  ];

  const openBooking = (id: string, title: string) => {
    setBookingId(id);
    setBookingTitle(title);
    setIsBookingOpen(true);
  };

  // Smooth scroll handler with offset for sticky navbar + subheader
  const scrollToSection = (id: SolutionTab) => {
    isManualScrolling.current = true;
    setActiveTab(id);
    const element = document.getElementById(`showcase-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      
      // Release block after scroll completes
      setTimeout(() => {
        isManualScrolling.current = false;
      }, 800);
    }
  };

  // Observe which section is active to highlight corresponding button
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -40% 0px", // Trigger when section is in the center viewport area
      threshold: 0.1,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      if (isManualScrolling.current) return;
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id.replace("showcase-", "") as SolutionTab;
          setActiveTab(id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    solutionsData.forEach((solution) => {
      const el = document.getElementById(`showcase-${solution.id}`);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section id="solutions-showcase" className="pt-8 pb-20 bg-slate-50/20 dark:bg-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center space-y-4 mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-display text-foreground">
            {t("showcaseSectionTitle")}
          </h2>
        </div>

        {/* Sticky Buttons Navigation Subheader */}
        <div className="sticky top-20 z-30 flex justify-center mb-8 pointer-events-none">
          <div className="pointer-events-auto inline-flex flex-wrap justify-center items-center gap-2 p-2 rounded-full bg-[#080d1a]/95 dark:bg-[#050914]/95 border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.7)] backdrop-blur-2xl ring-1 ring-white/20">
            {solutionsData.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              const activeStyles: Record<SolutionTab, { bg: string; text: string; glow: string; line: string }> = {
                voice: {
                  bg: "from-sky-500 via-cyan-400 to-blue-600",
                  text: "text-sky-300",
                  glow: "shadow-[0_0_25px_rgba(56,189,248,0.6)]",
                  line: "from-sky-400 to-cyan-300 shadow-[0_0_15px_#38bdf8]",
                },
                whatsapp: {
                  bg: "from-emerald-500 via-teal-400 to-green-600",
                  text: "text-emerald-300",
                  glow: "shadow-[0_0_25px_rgba(52,211,153,0.6)]",
                  line: "from-emerald-400 to-teal-300 shadow-[0_0_15px_#34d399]",
                },
                app: {
                  bg: "from-indigo-500 via-purple-400 to-violet-600",
                  text: "text-purple-300",
                  glow: "shadow-[0_0_25px_rgba(192,132,252,0.6)]",
                  line: "from-purple-400 to-indigo-300 shadow-[0_0_15px_#c084fc]",
                },
                website: {
                  bg: "from-amber-500 via-orange-400 to-red-500",
                  text: "text-amber-300",
                  glow: "shadow-[0_0_25px_rgba(251,191,36,0.6)]",
                  line: "from-amber-400 to-orange-300 shadow-[0_0_15px_#fbbf24]",
                },
              };

              const style = activeStyles[tab.id];

              return (
                <motion.button
                  key={tab.id}
                  onClick={() => scrollToSection(tab.id)}
                  whileHover={{ y: -3, scale: 1.06 }}
                  whileTap={{ scale: 0.94 }}
                  className={`relative flex items-center gap-2.5 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 ${
                    isActive
                      ? "text-white shadow-xl"
                      : "text-slate-400 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {/* Glowing active background pill */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabPillBackground"
                      className={`absolute inset-0 rounded-full bg-gradient-to-r ${style.bg} ${style.glow} -z-10`}
                      transition={{ type: "spring", stiffness: 500, damping: 35 }}
                    />
                  )}

                  <Icon className={`w-4 h-4 transition-transform duration-300 ${isActive ? "text-white scale-110" : tab.colorClass.split(" ")[0]}`} />

                  <span className="tracking-wide">{tab.title}</span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Vertical Stacked Solutions Display */}
        <div className="space-y-12">
          {solutionsData.map((solution, index) => {
            const isReversed = index % 2 === 1; // Alternating layout
            return (
              <SolutionBlock
                key={solution.id}
                item={solution}
                isReversed={isReversed}
                onBookDemo={openBooking}
              />
            );
          })}
        </div>

      </div>

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        solutionId={bookingId}
        solutionTitle={bookingTitle}
      />
    </section>
  );
}

// Sub-component for individual solutions display to manage auto-play/pause dynamically
interface SolutionBlockProps {
  item: SolutionItem;
  isReversed: boolean;
  onBookDemo: (id: string, title: string) => void;
}

function SolutionBlock({ item, isReversed, onBookDemo }: SolutionBlockProps) {
  const { t } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  }, []);

  const handleVideoClick = () => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    if (videoElement.paused) {
      videoElement
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log(err));
    }
  };

  const Icon = item.icon;

  return (
    <motion.div
      id={`showcase-${item.id}`}
      initial={{ opacity: 0, y: 35, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="scroll-mt-[150px] bg-white dark:bg-[#0c121e] border border-border rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl transition-all duration-300 hover:shadow-2xl hover:border-border/80"
    >
      <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center`}>
        
        {/* Left/Right Column: Details */}
        <div className={`lg:col-span-5 space-y-6 text-start ${isReversed ? "lg:order-2" : "lg:order-1"}`}>
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${item.colorClass}`}>
            <Icon className="w-3.5 h-3.5" />
            {item.title}
          </span>
          
          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground font-display leading-tight">
              {item.tagline}
            </h3>
            <p className="text-base text-muted-foreground mt-3 leading-relaxed">
              {item.longDesc}
            </p>
          </div>

          {/* Feature list */}
          <div className="space-y-3 pt-2">
            {item.features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <span className="text-sm text-foreground font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right/Left Column: Video Player Container */}
        <div className={`lg:col-span-7 w-full ${isReversed ? "lg:order-1" : "lg:order-2"} flex flex-col gap-4`}>
          <div
            onClick={handleVideoClick}
            className="relative rounded-2xl overflow-hidden shadow-2xl border border-border bg-slate-900 aspect-[16/9] cursor-pointer"
          >
            {/* Simulated browser/player top bar */}
            <div className="absolute top-0 left-0 right-0 h-9 bg-slate-950/80 backdrop-blur-md border-b border-white/5 flex items-center px-4 justify-between z-20">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              </div>
            </div>

            {/* Video Tag */}
            <video
              ref={videoRef}
              className="w-full h-full object-cover pt-9"
              src={item.videoUrl}
              autoPlay
              loop
              muted
              playsInline
            />
          </div>

          {/* Book Demo Button (Compact, aligned to right side under video) */}
          <div className="flex justify-end pt-1">
            <button
              onClick={() => onBookDemo(item.id, item.title)}
              className="px-5 py-2.5 bg-gradient-to-r from-primary to-secondary hover:opacity-95 text-white rounded-xl text-xs font-bold shadow-md shadow-primary/20 transition-all flex items-center gap-2 transform hover:-translate-y-0.5 active:translate-y-0 shrink-0"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>{t("bookDemoBtn")} - {item.title}</span>
            </button>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
