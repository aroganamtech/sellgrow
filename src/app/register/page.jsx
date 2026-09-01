"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Mail, Lock, User, Briefcase, ChevronDown, Loader2, ArrowLeft, ArrowRight, Phone, CheckCircle2, AlertCircle, KeyRound, ShieldCheck, Upload, Sparkles, Check } from "lucide-react";
import Logo from "@/components/layout/Logo";

const PRESET_LOGOS = [
    { name: "Tech Growth", url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80" },
    { name: "Retail Hub", url: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=100&auto=format&fit=crop&q=80" },
    { name: "AI Automations", url: "https://images.unsplash.com/photo-1614680376593-902f749f7cfc?w=100&auto=format&fit=crop&q=80" },
    { name: "Enterprise Pro", url: "https://images.unsplash.com/photo-1516876437184-593fda40c7ce?w=100&auto=format&fit=crop&q=80" },
];

export default function RegisterPage() {
    const { register, isLoading } = useAuth();
    const { t } = useLanguage();
    const [step, setStep] = useState(1);
    const [firstName, setFirstName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [businessName, setBusinessName] = useState("");
    const [businessCategory, setBusinessCategory] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // Logo image state
    const [companyLogo, setCompanyLogo] = useState("");

    // OTP State
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [demoOtp, setDemoOtp] = useState("");
    const [enteredOtp, setEnteredOtp] = useState("");
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [sendingOtp, setSendingOtp] = useState(false);
    const [otpMessage, setOtpMessage] = useState("");
    const [error, setError] = useState("");

    // Password criteria helper
    const isMinLength = password.length >= 8;
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
    const isPasswordValid = isMinLength && hasUpper && hasNumber && hasSpecial;
    const doPasswordsMatch = password.length > 0 && password === confirmPassword;

    const businessCategories = [
        "Retail Shop / Grocery",
        "Tuition Centre / Training",
        "Clinic / Pharmacy",
        "Restaurant / Hotel",
        "Manufacturer / Dealer",
        "Logistics / Distributor",
        "FMCG Enterprise",
        "E-Commerce & Online Store",
        "Real Estate & Construction",
        "Technology & Software Services",
        "Professional Consulting",
    ];

    const handleSendOtp = async () => {
        if (!email || !email.includes("@")) {
            setError("Please enter a valid email address first.");
            return;
        }
        setError("");
        setSendingOtp(true);
        try {
            const res = await fetch("/api/auth/send-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            const data = await res.json();
            if (res.ok && data.status === "success") {
                setDemoOtp(data.otp);
                setIsOtpSent(true);
                setOtpMessage(`OTP sent to ${email}`);
            }
            else {
                setError(data.message || "Failed to send OTP.");
            }
        }
        catch (err) {
            setError("Error sending OTP. Please try again.");
        }
        finally {
            setSendingOtp(false);
        }
    };

    const handleVerifyOtp = () => {
        if (enteredOtp.trim() === demoOtp.trim() && demoOtp !== "") {
            setIsEmailVerified(true);
            setError("");
            setOtpMessage("Email verified successfully!");
        }
        else {
            setError("Invalid OTP code. Please enter the OTP displayed above.");
        }
    };

    const handleLogoFileUpload = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                setError("Logo image size should be under 2MB.");
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setCompanyLogo(reader.result);
                setError("");
            };
            reader.readAsDataURL(file);
        }
    };

    const handleNextStep = (e) => {
        e.preventDefault();
        setError("");
        if (!firstName || !email || !phone || !businessName || !businessCategory || !password || !confirmPassword) {
            setError("Please fill in all required fields.");
            return;
        }
        if (!isEmailVerified) {
            setError("Please verify your email address via OTP before continuing.");
            return;
        }
        if (!isPasswordValid) {
            setError("Password must be at least 8 characters long, contain an uppercase letter, a number, and a special character.");
            return;
        }
        if (!doPasswordsMatch) {
            setError("Password and Confirm Password do not match.");
            return;
        }
        setStep(2);
    };

    const handleSubmitRegistration = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await register({
                firstName,
                name: firstName,
                email,
                phone,
                businessName,
                businessCategory,
                businessType: businessCategory,
                password,
                companyLogo,
            });
        }
        catch (err) {
            setError(err.message || "Registration failed. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 py-8 relative overflow-hidden bg-slate-50 dark:bg-[#070b13]">
            {/* Back to Home Button (Top Left) */}
            <div className="absolute top-6 left-6 z-20">
                <Link href="/" className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 backdrop-blur-md shadow-sm transition-all hover:-translate-x-0.5">
                    <ArrowLeft className="w-4 h-4 text-blue-600"/>
                    <span>{t("backToHome") || "Back to Home"}</span>
                </Link>
            </div>

            {/* Subtle background glow */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"/>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"/>

            <div className="w-full max-w-lg bg-white/95 dark:bg-[#0d1423]/95 backdrop-blur-xl p-8 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-none space-y-6 relative border border-slate-200 dark:border-slate-800">
                {/* Header */}
                <div className="text-center space-y-2">
                    <Link href="/" className="inline-flex justify-center">
                        <Logo className="w-20 h-20"/>
                    </Link>
                    <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-white mt-2">
                        {step === 1 ? "Create Business Account" : "Upload Company Logo"}
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                        {step === 1
                            ? "Start scaling your revenue with AI automations."
                            : "Place your company logo image right next to your business name on the dashboard."}
                    </p>
                </div>

                {/* Step Indicator */}
                <div className="flex items-center justify-center gap-3 text-xs font-semibold pb-2 border-b border-slate-200 dark:border-slate-800">
                    <span className={`flex items-center gap-1.5 ${step === 1 ? "text-blue-600 dark:text-blue-400 font-bold" : "text-emerald-600 dark:text-emerald-400"}`}>
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 1 ? "bg-blue-600 text-white" : "bg-emerald-600 text-white"}`}>
                            {step > 1 ? <Check className="w-3 h-3"/> : "1"}
                        </span>
                        Account Info
                    </span>
                    <span className="w-8 h-px bg-slate-200 dark:bg-slate-800"/>
                    <span className={`flex items-center gap-1.5 ${step === 2 ? "text-blue-600 dark:text-blue-400 font-bold" : "text-slate-400"}`}>
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 2 ? "bg-blue-600 text-white" : "border border-slate-300 dark:border-slate-700 text-slate-500"}`}>
                            2
                        </span>
                        Company Logo
                    </span>
                </div>

                {error && (
                    <div className="p-3 text-xs bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 rounded-xl flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0"/>
                        <span>{error}</span>
                    </div>
                )}

                {/* STEP 1: Account Details */}
                {step === 1 && (
                    <form onSubmit={handleNextStep} className="space-y-4" autoComplete="off">
                        {/* First Name */}
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400" htmlFor="first-name-input">
                                First Name <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input id="first-name-input" name="first_name" type="text" required placeholder="Enter first name" value={firstName} onChange={(e) => setFirstName(e.target.value)} autoComplete="off" className="w-full pl-10 pr-3 py-2.5 text-sm bg-slate-50/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all shadow-sm"/>
                                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3.5"/>
                            </div>
                        </div>

                        {/* Email Address & OTP Section */}
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 flex items-center justify-between" htmlFor="email-input">
                                <span>Email Address <span className="text-red-500">*</span></span>
                                {isEmailVerified && (
                                    <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                                        <CheckCircle2 className="w-3.5 h-3.5"/> Email Verified
                                    </span>
                                )}
                            </label>
                            <div className="flex gap-2">
                                <div className="relative flex-1">
                                    <input id="email-input" name="email" type="email" required disabled={isEmailVerified} placeholder="Enter email address" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="off" className="w-full pl-10 pr-3 py-2.5 text-sm bg-slate-50/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all shadow-sm disabled:opacity-70"/>
                                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5"/>
                                </div>
                                {!isEmailVerified && (
                                    <button type="button" onClick={handleSendOtp} disabled={sendingOtp || !email} className="px-4 py-2.5 bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-900/50 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/60 text-xs font-semibold rounded-xl transition-all disabled:opacity-50 shrink-0 shadow-sm">
                                        {sendingOtp ? <Loader2 className="w-4 h-4 animate-spin"/> : isOtpSent ? "Resend OTP" : "Send OTP"}
                                    </button>
                                )}
                            </div>

                            {/* Display OTP Banner directly on registration page */}
                            {isOtpSent && !isEmailVerified && (
                                <div className="mt-2.5 p-3.5 bg-amber-500/10 border border-amber-500/30 rounded-xl space-y-2">
                                    <div className="flex items-center justify-between text-xs font-semibold text-amber-700 dark:text-amber-300">
                                        <span className="flex items-center gap-1.5">
                                            <KeyRound className="w-4 h-4"/> Email Verification OTP:
                                        </span>
                                        <span className="text-base font-mono tracking-widest bg-amber-500/20 px-2.5 py-0.5 rounded border border-amber-500/40 text-amber-800 dark:text-amber-200 select-all font-bold">
                                            {demoOtp}
                                        </span>
                                    </div>
                                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                                        Your verification code is displayed above. Enter it below to verify your email.
                                    </p>
                                    <div className="flex gap-2 pt-1">
                                        <input type="text" maxLength={6} placeholder="Enter 6-digit OTP" value={enteredOtp} onChange={(e) => setEnteredOtp(e.target.value)} className="flex-1 px-3 py-2 text-sm font-mono tracking-widest text-center bg-white dark:bg-slate-900 border border-amber-500/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/30 text-slate-900 dark:text-white"/>
                                        <button type="button" onClick={handleVerifyOtp} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl transition-all shadow-sm flex items-center gap-1">
                                            <ShieldCheck className="w-3.5 h-3.5"/>
                                            <span>Verify OTP</span>
                                        </button>
                                    </div>
                                </div>
                            )}

                            {otpMessage && isEmailVerified && (<p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium pt-0.5">{otpMessage}</p>)}
                        </div>

                        {/* Phone Number */}
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400" htmlFor="phone-input">
                                Phone Number <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input id="phone-input" name="phone" type="tel" required placeholder="Enter phone number" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="off" className="w-full pl-10 pr-3 py-2.5 text-sm bg-slate-50/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all shadow-sm"/>
                                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3.5"/>
                            </div>
                        </div>

                        {/* Business Name */}
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400" htmlFor="business-name-input">
                                Business Name <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input id="business-name-input" name="business_name" type="text" required placeholder="Enter business name" value={businessName} onChange={(e) => setBusinessName(e.target.value)} autoComplete="off" className="w-full pl-10 pr-3 py-2.5 text-sm bg-slate-50/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all shadow-sm"/>
                                <Briefcase className="w-4 h-4 text-slate-400 absolute left-3 top-3.5"/>
                            </div>
                        </div>

                        {/* Business Category Dropdown */}
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400" htmlFor="business-category-select">
                                Business Category <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <select id="business-category-select" required value={businessCategory} onChange={(e) => setBusinessCategory(e.target.value)} className="w-full pl-10 pr-10 py-2.5 text-sm bg-slate-50/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white appearance-none focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all shadow-sm cursor-pointer">
                                    <option value="" disabled className="bg-white dark:bg-[#070b13] text-slate-400">
                                        Select Business Category
                                    </option>
                                    {businessCategories.map((cat, idx) => (
                                        <option key={idx} value={cat} className="bg-white dark:bg-[#070b13] text-slate-900 dark:text-white">
                                            {cat}
                                        </option>
                                    ))}
                                </select>
                                <Briefcase className="w-4 h-4 text-slate-400 absolute left-3 top-3.5 pointer-events-none"/>
                                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3.5 pointer-events-none"/>
                            </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400" htmlFor="password-input">
                                Password <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input id="password-input" name="new_password" type="password" required placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" className="w-full pl-10 pr-3 py-2.5 text-sm bg-slate-50/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all shadow-sm"/>
                                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3.5"/>
                            </div>

                            {/* Live Password Criteria Indicators */}
                            {password.length > 0 && (
                                <div className="grid grid-cols-2 gap-1.5 pt-1.5 text-[11px]">
                                    <span className={isMinLength ? "text-emerald-600 dark:text-emerald-400 font-medium" : "text-slate-400"}>
                                        {isMinLength ? "✓" : "○"} At least 8 characters
                                    </span>
                                    <span className={hasUpper ? "text-emerald-600 dark:text-emerald-400 font-medium" : "text-slate-400"}>
                                        {hasUpper ? "✓" : "○"} 1 Uppercase letter (A-Z)
                                    </span>
                                    <span className={hasNumber ? "text-emerald-600 dark:text-emerald-400 font-medium" : "text-slate-400"}>
                                        {hasNumber ? "✓" : "○"} 1 Number (0-9)
                                    </span>
                                    <span className={hasSpecial ? "text-emerald-600 dark:text-emerald-400 font-medium" : "text-slate-400"}>
                                        {hasSpecial ? "✓" : "○"} 1 Special character (!@#$)
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400" htmlFor="confirm-password-input">
                                Confirm Password <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input id="confirm-password-input" name="confirm_password" type="password" required placeholder="••••••••" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} autoComplete="new-password" className="w-full pl-10 pr-3 py-2.5 text-sm bg-slate-50/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all shadow-sm"/>
                                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3.5"/>
                            </div>
                            {confirmPassword.length > 0 && (
                                <p className={`text-[11px] ${doPasswordsMatch ? "text-emerald-600 dark:text-emerald-400 font-medium" : "text-red-500"}`}>
                                    {doPasswordsMatch ? "✓ Passwords match" : "✗ Passwords do not match"}
                                </p>
                            )}
                        </div>

                        {/* Next Button */}
                        <button type="submit" disabled={!isEmailVerified} className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-semibold rounded-xl disabled:opacity-50 transition-all shadow-md shadow-blue-500/20 mt-2">
                            <span>Next: Upload Company Logo</span>
                            <ArrowRight className="w-4 h-4"/>
                        </button>
                    </form>
                )}

                {/* STEP 2: Company Logo Upload & Header Preview */}
                {step === 2 && (
                    <form onSubmit={handleSubmitRegistration} className="space-y-5">
                        {/* Header Live Placement Preview */}
                        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-white space-y-2">
                            <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider block">
                                Dashboard Header Preview
                            </span>
                            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center text-blue-400 text-xs font-bold">
                                        SG
                                    </div>
                                    <span className="text-[10px] text-slate-400">SellGrow</span>
                                </div>

                                <div className="flex items-center gap-2 text-right">
                                    {companyLogo ? (
                                        <img src={companyLogo} alt="Company Logo Preview" className="w-8 h-8 rounded-lg object-cover border border-sky-400/50 shadow-md"/>
                                    ) : (
                                        <div className="w-8 h-8 rounded-lg bg-slate-800 border border-dashed border-slate-600 flex items-center justify-center text-[10px] text-slate-400">
                                            Logo
                                        </div>
                                    )}
                                    <div className="flex flex-col text-right">
                                        <span className="text-xs font-bold text-white">{businessName || "Your Company"}</span>
                                        <span className="text-[9px] text-slate-400">{businessCategory || "Business"}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Custom Logo Image Upload Dropzone */}
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block">
                                Upload Custom Company Logo Image
                            </label>
                            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-200 dark:border-slate-800 hover:border-blue-500 bg-slate-50/50 dark:bg-slate-900/50 rounded-2xl cursor-pointer transition-all">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    {companyLogo ? (
                                        <div className="flex items-center gap-3">
                                            <div className="h-12 max-w-[120px] rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-1 flex items-center justify-center shadow-sm">
                                                <img src={companyLogo} alt="Logo" className="max-h-full max-w-full w-auto h-auto object-contain"/>
                                            </div>
                                            <div className="text-left">
                                                <p className="text-xs font-bold text-slate-900 dark:text-white">Logo Selected</p>
                                                <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">Click to change image</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <Upload className="w-8 h-8 text-blue-600 mb-2 opacity-80"/>
                                            <p className="text-xs font-bold text-slate-900 dark:text-white">Click to upload or drag logo image</p>
                                            <p className="text-[10px] text-slate-400 mt-0.5">PNG, JPG, SVG or WEBP (Max 2MB)</p>
                                        </>
                                    )}
                                </div>
                                <input type="file" accept="image/*" onChange={handleLogoFileUpload} className="hidden"/>
                            </label>
                        </div>

                        {/* Quick Sample Preset Corporate Logos */}
                        <div className="space-y-2">
                            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 block">
                                Or choose from sample corporate logos:
                            </span>
                            <div className="grid grid-cols-4 gap-2">
                                {PRESET_LOGOS.map((preset, idx) => (
                                    <button key={idx} type="button" onClick={() => {
                                        setCompanyLogo(preset.url);
                                        setError("");
                                    }} className={`p-2 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${companyLogo === preset.url
                                        ? "border-blue-600 bg-blue-50 dark:bg-blue-950/40 shadow-md"
                                        : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-400"}`}>
                                        <img src={preset.url} alt={preset.name} className="w-8 h-8 rounded-lg object-cover"/>
                                        <span className="text-[9px] font-bold text-slate-900 dark:text-white truncate w-full">{preset.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Submit & Navigation Action Buttons */}
                        <div className="flex gap-3 pt-2">
                            <button type="button" onClick={() => setStep(1)} className="w-1/3 py-3 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-xl transition-all">
                                ← Back
                            </button>
                            <button type="submit" disabled={isLoading} className="w-2/3 flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-bold rounded-xl disabled:opacity-50 transition-all shadow-md shadow-blue-500/20">
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin"/>
                                        <span>Registering Account...</span>
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="w-4 h-4"/>
                                        <span>Complete Setup & Go to Dashboard</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                )}

                <div className="text-center text-xs text-slate-500 dark:text-slate-400 pt-2 space-y-2">
                    <div>
                        <span>Already have an account?{" "}</span>
                        <Link href="/login" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                            Sign In
                        </Link>
                    </div>
                    <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                        <Link href="/" className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                            <ArrowLeft className="w-3 h-3"/>
                            <span>{t("backToHome") || "Back to Home"}</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
