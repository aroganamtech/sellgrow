"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Target,
  Compass,
  Calendar,
  ArrowRight,
  Sparkles,
  Cpu,
  Award,
  Shield,
  Heart,
  TrendingUp,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

export default function AboutPage() {
  const { language, t } = useLanguage();
  const [activeMilestone, setActiveMilestone] = useState(2);

  // Set document title and meta description dynamically
  useEffect(() => {
    document.title = "About Us | SellGrow Digital Operating System";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "Learn about SellGrow, our mission to build the world's most intelligent autonomous business CRM, VoIP, and communication engine."
      );
    }
  }, []);

  // Translated local contents
  const localContent = {
    en: {
      headline: "Reimagining Commerce with Autonomous Intelligence",
      subHeadline: "We are building the unified digital operating system to run, automate, and grow modern businesses anywhere.",
      mission: "Empowering global businesses to scale revenue using multi-channel autonomous AI agents.",
      vision: "To build the world's fastest, most intelligent sales & support infrastructure for modern enterprises.",
      founderNote: "Built with passion by the SellGrow DeepTech engineering team.",
      coreValuesTitle: "Our Core Operating Values",
      timelineTitle: "The Journey of SellGrow",
      timelineDesc: "Follow our major engineering breakthroughs and roadmap to version 3.0.",
      teamTitle: "Meet Our Engineers & Visionaries",
      teamDesc: "A dedicated squad of DeepTech developers, AI architects, and customer success agents.",
    },
    hi: {
      headline: "स्वायत्त बुद्धिमत्ता के साथ वाणिज्य की नई कल्पना",
      subHeadline: "हम कहीं भी आधुनिक व्यवसायों को चलाने, स्वचालित करने और विकसित करने के लिए एक एकीकृत डिजिटल ऑपरेटिंग सिस्टम का निर्माण कर रहे हैं।",
      mission: "मल्टी-चैनल स्वायत्त एआई एजेंटों का उपयोग करके वैश्विक व्यवसायों को राजस्व बढ़ाने के लिए सशक्त बनाना।",
      vision: "आधुनिक उद्यमों के लिए दुनिया का सबसे तेज़, सबसे बुद्धिमान बिक्री और सहायता बुनियादी ढांचा तैयार करना।",
      founderNote: "सेलग्रो डीपटेक इंजीनियरिंग टीम द्वारा जुनून के साथ निर्मित।",
      coreValuesTitle: "हमारे मूल मार्गदर्शक सिद्धांत",
      timelineTitle: "सेलग्रो की विकास यात्रा",
      timelineDesc: "हमारे प्रमुख इंजीनियरिंग मील के पत्थर और संस्करण 3.0 का रोडमैप देखें।",
      teamTitle: "हमारे इंजीनियरों और विचारकों से मिलें",
      teamDesc: "डीपटेक डेवलपर्स, एआई आर्किटेक्ट्स और ग्राहक सफलता एजेंटों की एक समर्पित टीम।",
    },
    ar: {
      headline: "إعادة تصور التجارة باستخدام الذكاء المستقل",
      subHeadline: "نحن نبني نظام تشغيل رقمي موحد لتشغيل وأتمتة وتنمية الشركات الحديثة في أي مكان.",
      mission: "تمكين الشركات العالمية من زيادة الإيرادات باستخدام وكلاء الذكاء الاصطناعي المستقلين متعددي القنوات.",
      vision: "بناء البنية التحتية للمبيعات والدعم الأسرع والأكثر ذكاءً في العالم للمؤسسات الحديثة.",
      founderNote: "بُني بشغف بواسطة فريق هندسة التقنيات العميقة في SellGrow.",
      coreValuesTitle: "قيمنا الأساسية للتشغيل",
      timelineTitle: "مسيرة وجدول أعمال SellGrow",
      timelineDesc: "تابع أهم إنجازاتنا الهندسية ومخطط الطريق نحو الإصدار 3.0.",
      teamTitle: "تعرف على مهندسينا ومبدعينا",
      teamDesc: "فريق مخصص من مطوري التقنيات العميقة، ومهندسي الذكاء الاصطناعي، ووكلاء نجاح العملاء.",
    },
    ta: {
      headline: "சுயாட்சி நுண்ணறிவுடன் வர்த்தகத்தை மறுவடிவமைத்தல்",
      subHeadline: "நவீன வணிகங்களை எங்கிருந்தும் இயக்க, தானியக்கமாக்க மற்றும் வளர்க்க ஒருங்கிணைந்த டிஜிட்டல் இயக்க முறைமையை உருவாக்குகிறோம்.",
      mission: "மல்டி-சேனல் சுயாட்சி AI முகவர்களைப் பயன்படுத்தி உலகளாவிய வணிகங்களை வருவாயை உயர்த்த அதிகாரம் அளித்தல்.",
      vision: "நவீன நிறுவனங்களுக்கு உலகின் அதிவேக, மிக அறிவார்ந்த விற்பனை & ஆதரவு உள்கட்டமைப்பை உருவாக்குதல்.",
      founderNote: "SellGrow டீப்டெக் பொறியியல் குழுவால் மிகுந்த ஆர்வத்துடன் உருவாக்கப்பட்டது.",
      coreValuesTitle: "எங்கள் முக்கிய செயல்பாட்டு மதிப்புகள்",
      timelineTitle: "SellGrow-இன் பயணப்பாதை",
      timelineDesc: "எங்கள் முக்கிய பொறியியல் மைல்கற்கள் மற்றும் பதிப்பு 3.0-க்கான திட்டவரைவை ஆராயுங்கள்.",
      teamTitle: "எங்கள் பொறியாளர்கள் & தொலைநோக்கு பார்வையாளர்களை சந்தியுங்கள்",
      teamDesc: "டீப்டெக் டெவலப்பர்கள், AI வடிவமைப்பாளர்கள் மற்றும் வாடிக்கையாளர் வெற்றி முகவர்களின் அர்ப்பணிப்புள்ள குழு.",
    },
  };

  const copy = localContent[language as keyof typeof localContent] || localContent.en;

  const coreValues = [
    {
      id: "val-1",
      icon: Cpu,
      title: language === "hi" ? "एआई-प्रथम वास्तुकला" : language === "ar" ? "هندسة الذكاء الاصطناعي أولاً" : language === "ta" ? "AI-முதன்மை வடிவமைப்பு" : "AI-First Architecture",
      desc: language === "hi" ? "हम शून्य-विलंबता के साथ आवाज, पाठ और डेटा प्रवाह को एकीकृत करने वाले कोर एल्गोरिदम का निर्माण करते हैं।" : language === "ar" ? "نحن نبني خوارزميات أساسية لتوحيد الصوت والنص وتدفق البيانات بزمن انتقال صفر." : language === "ta" ? "குறைந்த தாமதத்தில் குரல், உரை மற்றும் தரவு ஓட்டங்களை இணைக்கும் முக்கிய அல்காரிதம்களை உருவாக்குகிறோம்." : "We build core algorithms unifying voice, text, and data flows with zero latency.",
      color: "text-sky-500 bg-sky-500/10 border-sky-500/20",
    },
    {
      id: "val-2",
      icon: Shield,
      title: language === "hi" ? "अखंडता और गोपनीयता" : language === "ar" ? "النزاهة والخصوصية المدمجة" : language === "ta" ? "நேர்மை & தனியுரிமை பாதுகாப்பு" : "Privacy by Design",
      desc: language === "hi" ? "डेटा एन्क्रिप्शन और संप्रभुता हमारी प्राथमिकता है। आपका ग्राहक डेटा हमेशा सुरक्षित और पृथक रहता है।" : language === "ar" ? "تشفير البيانات وسيادتها هما أولويتنا القصوى. بيانات عملائك دائماً آمنة ومعزولة." : language === "ta" ? "தரவு குறியாக்கம் மற்றும் பாதுகாப்பு எங்கள் முதன்மை முன்னுரிமை. வாடிக்கையாளர் தரவு எப்போதும் பாதுகாப்பானது." : "Data encryption and sovereignty are our top priority. Your client data is always isolated and secure.",
      color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    },
    {
      id: "val-3",
      icon: TrendingUp,
      title: language === "hi" ? "व्यावसायिक मापनीयता" : language === "ar" ? "التوسع السلس للأعمال" : language === "ta" ? "வணிக அளவிடுதல்" : "Scalable Growth",
      desc: language === "hi" ? "छोटे रिटेल व्यवसायों से लेकर बड़े उद्यमों तक, हमारा मॉड्यूलर सिस्टम आपके व्यवसाय के साथ बढ़ता है।" : language === "ar" ? "من المتاجر الصغيرة إلى المؤسسات الكبرى، ينمو نظامنا التراكبي معك بسلاسة." : language === "ta" ? "சிறு சில்லறை கடைகள் முதல் பெரிய நிறுவனங்கள் வரை, எங்கள் மட்டு அமைப்பு உங்களுடன் வளர்கிறது." : "From small retail shops to large enterprises, our modular system grows with your business.",
    },
  ];

  const milestones = [
    {
      year: "2025",
      title: language === "hi" ? "स्थापना और अनुसंधान" : language === "ar" ? "التأسيس والبحث العلمي" : language === "ta" ? "துவக்கம் & ஆராய்ச்சி" : "Genesis & R&D",
      desc: language === "hi" ? "सेलग्रो का जन्म डीपटेक और वेबआरटीसी वीओआईपी संचार बुनियादी ढांचे पर ध्यान केंद्रित करते हुए हुआ।" : language === "ar" ? "ولادة فكرة SellGrow مع التركيز على اتصالات الويب الحية WebRTC والتقنيات العميقة." : language === "ta" ? "LiveKit WebRTC மற்றும் டீப்டெக் உள்கட்டமைப்பை மையமாகக் கொண்டு SellGrow தொடங்கப்பட்டது." : "SellGrow was conceived with a heavy focus on real-time WebRTC VoIP communication infrastructure.",
    },
    {
      year: "Early 2026",
      title: language === "hi" ? "व्हाट्सएप एपीआई एकीकरण" : language === "ar" ? "دمج واجهة واتساب الرسمية" : language === "ta" ? "வாட்ஸ்அப் API ஒருங்கிணைப்பு" : "WhatsApp Business Integration",
      desc: language === "hi" ? "आधिकारिक फेसबुक मेटा एपीआई को एकीकृत किया गया, जिससे एकीकृत टीम इनबॉक्स का निर्माण संभव हुआ।" : language === "ar" ? "دمج واجهة واتساب الرسمية من Meta وبناء صندوق الوارد المشترك للفرق." : language === "ta" ? "அதிகாரப்பூர்வ மெட்டா API உடன் ஒருங்கிணைக்கப்பட்டு, ஒருங்கிணைந்த இன்பாக்ஸ் உருவாக்கப்பட்டது." : "Integrated Meta's official API to launch the unified omnichannel broadcasts and shared team inbox.",
    },
    {
      year: "Mid 2026",
      title: language === "hi" ? "संस्करण 3.0 सैंडबॉक्स" : language === "ar" ? "إصدار ساندبوكس 3.0" : language === "ta" ? "பதிப்பு 3.0 சாண்ட்பாக்ஸ்" : "Version 3.0 Sandbox Release",
      desc: language === "hi" ? "सभी छह प्रमुख व्यापार मॉड्यूल (सीआरएम, वॉयस, चैट, वर्कफ़्लो, 3डी, कैटलॉग) का सफल एकीकरण।" : language === "ar" ? "التوحيد الناجح لجميع الوحدات الست (إدارة العملاء، الصوت، الواتساب، الأتمتة، الـ 3D، الكتالوج)." : language === "ta" ? "CRM, குரல், அரட்டை, பணிப்பாய்வு, 3D, பட்டியல் ஆகிய 6 தொகுதிகளின் வெற்றிகரமான ஒருங்கிணைப்பு." : "Successful launch of all 6 modules (CRM, Voice, Chat, Workflows, 3D, Catalog) in a unified environment.",
    },
  ];

  const team = [
    {
      name: "Vikram Patel",
      role: language === "hi" ? "मुख्य सॉफ्टवेयर आर्किटेक्ट" : language === "ar" ? "رئيس هندسة البرمجيات" : language === "ta" ? "தலைமை மென்பொருள் வடிவமைப்பாளர்" : "Chief Software Architect",
      specialty: "WebRTC & Web systems",
      avatar: "VP",
      gradient: "from-sky-500 to-blue-600",
    },
    {
      name: "Rahul Sharma",
      role: language === "hi" ? "एआई वॉयस इंजीनियर" : language === "ar" ? "مهندس كلام الذكاء الاصطناعي" : language === "ta" ? "AI குரல் பொறியாளர்" : "Lead AI Speech Architect",
      specialty: "Large Language Models & Audio",
      avatar: "RS",
      gradient: "from-amber-500 to-orange-600",
    },
    {
      name: "Sarah Jenkins",
      role: language === "hi" ? "वैश्विक विकास निदेशक" : language === "ar" ? "مديرة النمو العالمي" : language === "ta" ? "உலகளாவிய வளர்ச்சி இயக்குனர்" : "Global Growth Director",
      specialty: "SaaS Ecosystems & Strategy",
      avatar: "SJ",
      gradient: "from-emerald-500 to-teal-600",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#070b13] text-slate-100 font-sans transition-colors duration-200">
      <Navbar />

      <main className="flex-grow">
        
        {/* HERO SECTION */}
        <section className="relative overflow-hidden pt-12 pb-16 md:pt-16 md:pb-24 border-b border-white/5">
          {/* Radial ambient lighting */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[450px] bg-gradient-to-b from-primary/15 via-secondary/5 to-transparent blur-3xl pointer-events-none -z-10" />

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary border border-primary/20"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t("about").toUpperCase()}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-display max-w-4xl mx-auto leading-tight"
            >
              <span className="gradient-text">{copy.headline}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed"
            >
              {copy.subHeadline}
            </motion.p>

            {/* Generated Banner Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="relative rounded-3xl overflow-hidden aspect-[21/9] max-w-5xl mx-auto border border-white/10 shadow-2xl bg-slate-900 group"
            >
              <img
                src="/images/about/about_hero.jpg"
                alt="SellGrow futuristic AI development office"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070b13] via-transparent to-transparent opacity-90" />
            </motion.div>
          </div>
        </section>

        {/* MISSION & VISION */}
        <section className="py-16 md:py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Card 1: Mission */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 sm:p-10 rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-xl relative overflow-hidden flex flex-col justify-between space-y-6"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
              
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white shadow-md">
                  <Target className="w-6 h-6" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
                  {language === "hi" ? "हमारा मिशन" : language === "ar" ? "رسالتنا" : language === "ta" ? "எங்கள் நோக்கம்" : "Our Core Mission"}
                </h2>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  {copy.mission}
                </p>
              </div>

              <div className="text-xs font-semibold text-primary/80 tracking-wide uppercase">
                // Driven by impact
              </div>
            </motion.div>

            {/* Card 2: Vision */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 sm:p-10 rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-xl relative overflow-hidden flex flex-col justify-between space-y-6"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/10 rounded-full blur-2xl" />
              
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-secondary to-accent-brand flex items-center justify-center text-white shadow-md">
                  <Compass className="w-6 h-6" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
                  {language === "hi" ? "हमारा दृष्टिकोण" : language === "ar" ? "رؤيتنا المستقبليّة" : language === "ta" ? "எங்கள் பார்வை" : "Our Future Vision"}
                </h2>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  {copy.vision}
                </p>
              </div>

              <div className="text-xs font-semibold text-secondary/80 tracking-wide uppercase">
                // Innovation is standard
              </div>
            </motion.div>

          </div>

          {/* Founder's note tag */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <p className="text-xs sm:text-sm text-slate-400 italic font-medium">
              "{copy.founderNote}"
            </p>
          </motion.div>
        </section>

        {/* CORE VALUES */}
        <section className="py-16 bg-slate-950/40 border-y border-white/5">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white text-center font-display mb-12">
              {copy.coreValuesTitle}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {coreValues.map((val) => {
                const Icon = val.icon;
                return (
                  <motion.div
                    key={val.id}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="p-6 sm:p-8 rounded-3xl border border-white/5 bg-white/[0.01] hover:border-primary/40 hover:bg-white/[0.02] transition-all duration-300 text-left space-y-4 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-105 transition-transform duration-300">
                      <Icon className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white font-display">
                      {val.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                      {val.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* INTERACTIVE TIMELINE / ROADMAP */}
        <section className="py-16 md:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              {copy.timelineTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
              {copy.timelineDesc}
            </p>
          </div>

          {/* Stepper buttons bar */}
          <div className="flex justify-center items-center gap-2 sm:gap-4 mb-8">
            {milestones.map((ms, idx) => {
              const isActive = activeMilestone === idx;
              return (
                <button
                  key={idx}
                  id={`milestone-btn-${idx}`}
                  onClick={() => setActiveMilestone(idx)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? "bg-primary text-white shadow-lg shadow-primary/25 border border-primary/45"
                      : "bg-white/5 hover:bg-white/10 text-slate-400 border border-white/5"
                  }`}
                >
                  {ms.year}
                </button>
              );
            })}
          </div>

          {/* Milestone Details Card */}
          <div className="min-h-[160px] relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMilestone}
                initial={{ opacity: 0, y: 12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="p-6 sm:p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.02] to-transparent backdrop-blur-xl text-center space-y-4 max-w-2xl mx-auto shadow-xl"
              >
                <div className="inline-flex items-center gap-1 text-[10px] font-extrabold text-secondary uppercase bg-secondary/15 px-3 py-1 rounded-full border border-secondary/35">
                  <Award className="w-3.5 h-3.5" />
                  <span>{milestones[activeMilestone].year} Milestone</span>
                </div>
                <h3 className="text-xl font-bold text-white font-display">
                  {milestones[activeMilestone].title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed max-w-xl mx-auto">
                  {milestones[activeMilestone].desc}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* TEAM SECTION */}
        <section className="py-16 md:py-24 bg-slate-950/40 border-t border-white/5">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-14">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                {copy.teamTitle}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
                {copy.teamDesc}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {team.map((t, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.97 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="p-6 rounded-3xl border border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent space-y-4 hover:border-primary/30 transition-all duration-300 flex flex-col items-center text-center shadow-lg"
                >
                  {/* Initials profile bubble */}
                  <div className={`w-14 h-14 rounded-full bg-gradient-to-tr ${t.gradient} flex items-center justify-center text-white text-base font-black shadow-lg shadow-black/40`}>
                    {t.avatar}
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white font-display">{t.name}</h3>
                    <p className="text-[11px] font-bold text-slate-400 tracking-wider uppercase mt-1">
                      {t.role}
                    </p>
                  </div>
                  <div className="text-xs text-primary/80 font-semibold px-3 py-1 rounded-xl bg-primary/10 border border-primary/20">
                    {t.specialty}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* BOTTOM CALL TO ACTION */}
        <section className="py-16 md:py-20 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-tr from-primary/10 via-[#070b13] to-secondary/5 border border-white/10 shadow-2xl space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
            
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              {language === "hi" ? "सेलग्रो के साथ अपना व्यवसाय बढ़ाएं" : language === "ar" ? "ابدأ رحلة النمو مع SellGrow" : language === "ta" ? "SellGrow உடன் உங்கள் வணிகத்தை மேம்படுத்துங்கள்" : "Experience the Digital Commerce OS"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
              {language === "hi" ? "स्वचालित एआई वॉयस एजेंट्स और एकीकृत ओमनीचैनल इनबॉक्स का उपयोग करके अपनी बिक्री बढ़ाएं।" : language === "ar" ? "زد مبيعاتك وقنوات اتصالك باستخدام وكلاء الصوت بالذكاء الاصطناعي وصندوق الوارد الموحد." : language === "ta" ? "தானியங்கி AI குரல் முகவர்கள் மற்றும் ஒருங்கிணைந்த இன்பாக்ஸ் மூலம் உங்கள் வணிகத்தை வளர்க்கத் தொடங்குங்கள்." : "Unify CRM, WebRTC Voice receptionists, and WhatsApp business API broadcasting under one dashboard."}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                href="/register"
                id="btn-about-register"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold text-xs sm:text-sm hover:opacity-95 shadow-md shadow-primary/20 transition-all flex items-center justify-center gap-2"
              >
                <span>Get Started Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/pricing"
                id="btn-about-pricing"
                className="w-full sm:w-auto px-6 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white font-bold text-xs sm:text-sm transition-all"
              >
                View Modular Pricing
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
