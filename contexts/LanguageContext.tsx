"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Language = "en" | "hi" | "ar" | "ta";

export interface Translations {
  [key: string]: string;
}

const translations: Record<Language, Translations> = {
  en: {
    dashboard: "Dashboard",
    crm: "Sales CRM",
    inbox: "Unified Inbox",
    voice: "AI Voice Agent",
    workflow: "Workflow Builder",
    catalogue: "Product Catalogue",
    rag: "Knowledge Base (RAG)",
    analytics: "Business Analytics",
    features: "Features",
    pricing: "Pricing",
    about: "About Us",
    contact: "Contact Support",
    login: "Log In",
    register: "Get Started",
    heroTitle: "The Intelligent Operating System for Digital Businesses",
    heroSubtitle: "Sell Grow automates everything: sales pipelines, WhatsApp business API, multi-channel support, visual workflows, and LiveKit AI voice call agents—all from one beautiful workspace.",
    launchSandbox: "Launch Sandbox App",
    language: "Language",
    customerSupport: "AI Helpdesk",
    logout: "Log Out",
    welcomeBack: "Welcome back, Operator",
    activeLeads: "Active Leads",
    buyingProbability: "Buying Probability",
    unreadMessages: "Unread Messages",
    aiResolution: "AI Chat Resolution Rate",
    totalRevenue: "Monthly Revenue",
    simulateCall: "Simulate AI Voice Call",
    endCall: "End Active Call",
    callTranscript: "Live Call Transcription",
    chatbotHelp: "Need help? Ask SellGrow AI",
    workflowsRunning: "Active Automations",
  },
  hi: {
    dashboard: "डैशबोर्ड",
    crm: "बिक्री CRM",
    inbox: "एकीकृत इनबॉक्स",
    voice: "एआई वॉयस एजेंट",
    workflow: "वर्कफ़्लो निर्माता",
    catalogue: "उत्पाद सूची",
    rag: "ज्ञान आधार (RAG)",
    analytics: "व्यापार विश्लेषिकी",
    features: "विशेषताएं",
    pricing: "मूल्य निर्धारण",
    about: "हमारे बारे में",
    contact: "सहायता केंद्र",
    login: "लॉग इन",
    register: "शुरू करें",
    heroTitle: "डिजिटल व्यवसायों के लिए बुद्धिमान ऑपरेटिंग सिस्टम",
    heroSubtitle: "सेल ग्रो सब कुछ स्वचालित करता है: बिक्री पाइपलाइन, व्हाट्सएप बिजनेस एपीआई, मल्टी-चैनल सपोर्ट, विजुअल वर्कफ़्लो और लाइवकिट एआई वॉयस कॉल एजेंट - सभी एक सुंदर कार्यक्षेत्र से।",
    launchSandbox: "सैंडबॉक्स ऐप लॉन्च करें",
    language: "भाषा",
    customerSupport: "एआई हेल्पडेस्क",
    logout: "लॉग आउट",
    welcomeBack: "आपका स्वागत है, ऑपरेटर",
    activeLeads: "सक्रिय लीड्स",
    buyingProbability: "खरीदने की संभावना",
    unreadMessages: "अपठित संदेश",
    aiResolution: "एआई चैट समाधान दर",
    totalRevenue: "मासिक राजस्व",
    simulateCall: "एआई वॉयस कॉल सिम्युलेट करें",
    endCall: "कॉल समाप्त करें",
    callTranscript: "लाइव कॉल ट्रांसक्रिप्शन",
    chatbotHelp: "मदद चाहिए? सेलग्रो एआई से पूछें",
    workflowsRunning: "सक्रिय स्वचालन",
  },
  ar: {
    dashboard: "لوحة التحكم",
    crm: "إدارة علاقات العملاء",
    inbox: "صندوق الوارد الموحد",
    voice: "وكيل الصوت الذكي",
    workflow: "مخطط سير العمل",
    catalogue: "كتالوج المنتجات",
    rag: "قاعدة المعرفة (RAG)",
    analytics: "تحليلات الأعمال",
    features: "المميزات",
    pricing: "الأسعار",
    about: "من نحن",
    contact: "الدعم الفني",
    login: "تسجيل الدخول",
    register: "ابدأ الآن",
    heroTitle: "نظام التشغيل الذكي للأعمال الرقمية",
    heroSubtitle: "تقوم منصة SellGrow بأتمتة كل شيء: خطوط المبيعات، وواجهة WhatsApp Business API، والدعم متعدد القنوات، وسير العمل المرئي، ووكلاء المكالمات الصوتية بالذكاء الاصطناعي من LiveKit - كل ذلك من مساحة عمل واحدة مذهلة.",
    launchSandbox: "تشغيل التطبيق التجريبي",
    language: "اللغة",
    customerSupport: "مكتب المساعدة الذكي",
    logout: "تسجيل الخروج",
    welcomeBack: "مرحباً بك، المشغل",
    activeLeads: "العملاء المحتملون النشطون",
    buyingProbability: "احتمالية الشراء",
    unreadMessages: "الرسائل غير المقروءة",
    aiResolution: "معدل حل محادثات الذكاء الاصطناعي",
    totalRevenue: "الإيرادات الشهرية",
    simulateCall: "محاكاة مكالمة صوتية بالذكاء الاصطناعي",
    endCall: "إنهاء المكالمة",
    callTranscript: "نسخ المكالمة المباشر",
    chatbotHelp: "هل تحتاج مساعدة؟ اسأل ذكاء SellGrow",
    workflowsRunning: "الأتمتة النشطة",
  },
  ta: {
    dashboard: "டாஷ்போர்டு",
    crm: "விற்பனை CRM",
    inbox: "ஒருங்கிணைந்த இன்பாக்ஸ்",
    voice: "AI குரல் முகவர்",
    workflow: "பணிப்பாய்வு உருவாக்கம்",
    catalogue: "தயாரிப்பு பட்டியல்",
    rag: "அறிவு தளம் (RAG)",
    analytics: "வணிக பகுப்பாய்வு",
    features: "அம்சங்கள்",
    pricing: "கட்டணங்கள்",
    about: "எங்களைப் பற்றி",
    contact: "ஆதரவு மையம்",
    login: "உள்நுழைக",
    register: "தொடங்குங்கள்",
    heroTitle: "டிஜிட்டல் வணிகங்களுக்கான அறிவார்ந்த இயக்க முறைமை",
    heroSubtitle: "செல் குரோ அனைத்தையும் தானியங்குபடுத்துகிறது: விற்பனைப் பாதைகள், வாட்ஸ்அப் வணிக API, மல்டி-சேனல் ஆதரவு, காட்சி பணிப்பாய்வுகள் மற்றும் லைவ்கிட் AI குரல் அழைப்பு முகவர்கள் - அனைத்தும் ஒரே அழகான பணியிடத்திலிருந்து.",
    launchSandbox: "சாண்ட்பாக்ஸ் பயன்பாட்டைத் தொடங்கு",
    language: "மொழி",
    customerSupport: "AI ஹெல்ப் டெஸ்க்",
    logout: "வெளியேறு",
    welcomeBack: "வணக்கம், ஆபரேட்டர்",
    activeLeads: "செயலில் உள்ள வாடிக்கையாளர்கள்",
    buyingProbability: "வாங்கும் சாத்தியம்",
    unreadMessages: "படிக்காத செய்திகள்",
    aiResolution: "AI அரட்டை தீர்வு விகிதம்",
    totalRevenue: "மாதாந்திர வருவாய்",
    simulateCall: "AI குரல் அழைப்பை உருவகப்படுத்து",
    endCall: "அழைப்பை முடி",
    callTranscript: "நேரடி அழைப்பு டிரான்ஸ்கிரிப்ஷன்",
    chatbotHelp: "உதவி தேவையா? SellGrow AI ஐக் கேளுங்கள்",
    workflowsRunning: "செயலில் உள்ள ஆட்டோமேஷன்கள்",
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguageState] = useState<Language>("en");
  const [dir, setDir] = useState<"ltr" | "rtl">("ltr");

  useEffect(() => {
    const savedLang = localStorage.getItem("language") as Language | null;
    if (savedLang && translations[savedLang]) {
      setLanguageState(savedLang);
      const isRtl = savedLang === "ar";
      setDir(isRtl ? "rtl" : "ltr");
      document.documentElement.dir = isRtl ? "rtl" : "ltr";
      document.documentElement.lang = savedLang;
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
    const isRtl = lang === "ar";
    setDir(isRtl ? "rtl" : "ltr");
    document.documentElement.dir = isRtl ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  };

  const t = (key: string): string => {
    return translations[language][key] || translations["en"][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
