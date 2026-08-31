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
        if (!firstName || !email || !phone || !businessName || !password || !confirmPassword) {
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
    return (<div className="min-h-screen flex flex-col items-center justify-center p-4 py-8 relative overflow-hidden bg-slate-50 dark:bg-[#070b13]">
      {/* Back to Home Button (Top Left) */}
      <div className="absolute top-6 left-6 z-20">
        <Link href="/" className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-muted-foreground hover:text-foreground bg-white/60 dark:bg-black/30 border border-border backdrop-blur-md shadow-sm transition-all hover:-translate-x-0.5">
          <ArrowLeft className="w-4 h-4 text-primary"/>
          <span>{t("backToHome") || "Back to Home"}</span>
        </Link>
      </div>

      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none"/>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl pointer-events-none"/>

      <div className="w-full max-w-lg glass-panel p-8 rounded-2xl shadow-xl space-y-6 relative border border-border">
        {/* Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex justify-center">
            <Logo className="w-20 h-20"/>
          </Link>
          <h2 className="text-2xl font-bold font-display text-foreground mt-2">
            {step === 1 ? "Create Business Account" : "Upload Company Logo"}
          </h2>
          <p className="text-xs text-muted-foreground">
            {step === 1
            ? "Start scaling your revenue with AI automations."
            : "Place your company logo image right next to your business name on the dashboard."}
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-3 text-xs font-semibold pb-2 border-b border-border/60">
          <span className={`flex items-center gap-1.5 ${step === 1 ? "text-primary font-bold" : "text-emerald-500"}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 1 ? "bg-primary text-white" : "bg-emerald-500 text-white"}`}>
              {step > 1 ? <Check className="w-3 h-3"/> : "1"}
            </span>
            Account Info
          </span>
          <span className="w-8 h-px bg-border"/>
          <span className={`flex items-center gap-1.5 ${step === 2 ? "text-primary font-bold" : "text-muted-foreground"}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 2 ? "bg-primary text-white" : "border border-border"}`}>
              2
            </span>
            Company Logo
          </span>
        </div>

        {error && (<div className="p-3 text-xs bg-red-500/10 text-red-500 border border-red-500/20 rounded-xl flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0"/>
            <span>{error}</span>
          </div>)}

        {/* STEP 1: Account Details */}
        {step === 1 && (<form onSubmit={handleNextStep} className="space-y-4">
            {/* First Name */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-muted-foreground" htmlFor="first-name-input">
                First Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input id="first-name-input" type="text" required placeholder="Enter first name" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full pl-10 pr-3 py-2 text-sm glass-input focus:outline-none rounded-xl"/>
                <User className="w-4 h-4 text-muted absolute left-3 top-3"/>
              </div>
            </div>

            {/* Email Address & OTP Section */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-muted-foreground flex items-center justify-between" htmlFor="email-input">
                <span>Email Address <span className="text-red-500">*</span></span>
                {isEmailVerified && (<span className="text-[11px] text-emerald-500 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5"/> Email Verified
                  </span>)}
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input id="email-input" type="email" required disabled={isEmailVerified} placeholder="Enter email address" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-10 pr-3 py-2 text-sm glass-input focus:outline-none rounded-xl disabled:opacity-70"/>
                  <Mail className="w-4 h-4 text-muted absolute left-3 top-3"/>
                </div>
                {!isEmailVerified && (<button type="button" onClick={handleSendOtp} disabled={sendingOtp || !email} className="px-3.5 py-2 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 text-xs font-semibold rounded-xl transition-all disabled:opacity-50 shrink-0">
                    {sendingOtp ? <Loader2 className="w-4 h-4 animate-spin"/> : isOtpSent ? "Resend OTP" : "Send OTP"}
                  </button>)}
              </div>

              {/* Display OTP Banner directly on registration page */}
              {isOtpSent && !isEmailVerified && (<div className="mt-2.5 p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-amber-600 dark:text-amber-400">
                    <span className="flex items-center gap-1.5">
                      <KeyRound className="w-4 h-4"/> Email Verification OTP:
                    </span>
                    <span className="text-base font-mono tracking-widest bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/40 text-amber-700 dark:text-amber-300 select-all">
                      {demoOtp}
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    Your verification code is displayed above. Enter it below to verify your email.
                  </p>
                  <div className="flex gap-2 pt-1">
                    <input type="text" maxLength={6} placeholder="Enter 6-digit OTP" value={enteredOtp} onChange={(e) => setEnteredOtp(e.target.value)} className="flex-1 px-3 py-1.5 text-sm font-mono tracking-widest text-center glass-input focus:outline-none rounded-xl"/>
                    <button type="button" onClick={handleVerifyOtp} className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl transition-all shadow-sm flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5"/>
                      <span>Verify OTP</span>
                    </button>
                  </div>
                </div>)}

              {otpMessage && isEmailVerified && (<p className="text-[11px] text-emerald-500 font-medium pt-0.5">{otpMessage}</p>)}
            </div>

            {/* Phone Number */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-muted-foreground" htmlFor="phone-input">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input id="phone-input" type="tel" required placeholder="Enter phone number" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full pl-10 pr-3 py-2 text-sm glass-input focus:outline-none rounded-xl"/>
                <Phone className="w-4 h-4 text-muted absolute left-3 top-3"/>
              </div>
            </div>

            {/* Business Name */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-muted-foreground" htmlFor="business-name-input">
                Business Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input id="business-name-input" type="text" required placeholder="Enter business name" value={businessName} onChange={(e) => setBusinessName(e.target.value)} className="w-full pl-10 pr-3 py-2 text-sm glass-input focus:outline-none rounded-xl"/>
                <Briefcase className="w-4 h-4 text-muted absolute left-3 top-3"/>
              </div>
            </div>

            {/* Business Category Dropdown */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-muted-foreground" htmlFor="business-category-select">
                Business Category <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select id="business-category-select" required value={businessCategory} onChange={(e) => setBusinessCategory(e.target.value)} className="w-full pl-10 pr-10 py-2 text-sm glass-input appearance-none focus:outline-none cursor-pointer rounded-xl">
                  <option value="" disabled className="bg-white dark:bg-[#070b13] text-muted-foreground">
                    Select Business Category
                  </option>
                  {businessCategories.map((cat, idx) => (<option key={idx} value={cat} className="bg-white dark:bg-[#070b13] text-foreground">
                      {cat}
                    </option>))}
                </select>
                <Briefcase className="w-4 h-4 text-muted absolute left-3 top-3 pointer-events-none"/>
                <ChevronDown className="w-4 h-4 text-muted absolute right-3 top-3 pointer-events-none"/>
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-muted-foreground" htmlFor="password-input">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input id="password-input" type="password" required placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-10 pr-3 py-2 text-sm glass-input focus:outline-none rounded-xl"/>
                <Lock className="w-4 h-4 text-muted absolute left-3 top-3"/>
              </div>

              {/* Live Password Criteria Indicators */}
              {password.length > 0 && (<div className="grid grid-cols-2 gap-1.5 pt-1.5 text-[11px]">
                  <span className={isMinLength ? "text-emerald-500 font-medium" : "text-muted-foreground"}>
                    {isMinLength ? "✓" : "○"} At least 8 characters
                  </span>
                  <span className={hasUpper ? "text-emerald-500 font-medium" : "text-muted-foreground"}>
                    {hasUpper ? "✓" : "○"} 1 Uppercase letter (A-Z)
                  </span>
                  <span className={hasNumber ? "text-emerald-500 font-medium" : "text-muted-foreground"}>
                    {hasNumber ? "✓" : "○"} 1 Number (0-9)
                  </span>
                  <span className={hasSpecial ? "text-emerald-500 font-medium" : "text-muted-foreground"}>
                    {hasSpecial ? "✓" : "○"} 1 Special character (!@#$)
                  </span>
                </div>)}
            </div>

            {/* Confirm Password */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-muted-foreground" htmlFor="confirm-password-input">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input id="confirm-password-input" type="password" required placeholder="••••••••" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full pl-10 pr-3 py-2 text-sm glass-input focus:outline-none rounded-xl"/>
                <Lock className="w-4 h-4 text-muted absolute left-3 top-3"/>
              </div>
              {confirmPassword.length > 0 && (<p className={`text-[11px] ${doPasswordsMatch ? "text-emerald-500" : "text-red-500"}`}>
                  {doPasswordsMatch ? "✓ Passwords match" : "✗ Passwords do not match"}
                </p>)}
            </div>

            {/* Next Button */}
            <button type="submit" disabled={!isEmailVerified} className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-primary to-secondary text-white text-sm font-semibold rounded-xl hover:opacity-95 disabled:opacity-50 transition-all shadow-md mt-2">
              <span>Next: Upload Company Logo</span>
              <ArrowRight className="w-4 h-4"/>
            </button>
          </form>)}

        {/* STEP 2: Company Logo Upload & Header Preview */}
        {step === 2 && (<form onSubmit={handleSubmitRegistration} className="space-y-5">
            {/* Header Live Placement Preview */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-white space-y-2">
              <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider block">
                Dashboard Header Preview
              </span>
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">
                    SG
                  </div>
                  <span className="text-[10px] text-slate-400">SellGrow</span>
                </div>

                <div className="flex items-center gap-2 text-right">
                  {companyLogo ? (<img src={companyLogo} alt="Company Logo Preview" className="w-8 h-8 rounded-lg object-cover border border-sky-400/50 shadow-md"/>) : (<div className="w-8 h-8 rounded-lg bg-slate-800 border border-dashed border-slate-600 flex items-center justify-center text-[10px] text-slate-400">
                      Logo
                    </div>)}
                  <div className="flex flex-col text-right">
                    <span className="text-xs font-bold text-white">{businessName || "Your Company"}</span>
                    <span className="text-[9px] text-slate-400">{businessCategory || "Business"}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Custom Logo Image Upload Dropzone */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground block">
                Upload Custom Company Logo Image
              </label>
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border hover:border-primary/60 bg-slate-50/50 dark:bg-black/20 rounded-2xl cursor-pointer transition-all">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {companyLogo ? (<div className="flex items-center gap-3">
                      <div className="h-12 max-w-[120px] rounded-xl border border-border bg-white dark:bg-slate-900 p-1 flex items-center justify-center shadow-sm">
                        <img src={companyLogo} alt="Logo" className="max-h-full max-w-full w-auto h-auto object-contain"/>
                      </div>
                      <div className="text-left">
                        <p className="text-xs font-bold text-foreground">Logo Selected</p>
                        <p className="text-[10px] text-emerald-500 font-semibold">Click to change image</p>
                      </div>
                    </div>) : (<>
                      <Upload className="w-8 h-8 text-primary mb-2 opacity-80"/>
                      <p className="text-xs font-bold text-foreground">Click to upload or drag logo image</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">PNG, JPG, SVG or WEBP (Max 2MB)</p>
                    </>)}
                </div>
                <input type="file" accept="image/*" onChange={handleLogoFileUpload} className="hidden"/>
              </label>
            </div>

            {/* Quick Sample Preset Corporate Logos */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-muted-foreground block">
                Or choose from sample corporate logos:
              </span>
              <div className="grid grid-cols-4 gap-2">
                {PRESET_LOGOS.map((preset, idx) => (<button key={idx} type="button" onClick={() => {
                    setCompanyLogo(preset.url);
                    setError("");
                }} className={`p-2 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${companyLogo === preset.url
                    ? "border-primary bg-primary/10 shadow-md"
                    : "border-border bg-card hover:border-primary/40"}`}>
                    <img src={preset.url} alt={preset.name} className="w-8 h-8 rounded-lg object-cover"/>
                    <span className="text-[9px] font-bold text-foreground truncate w-full">{preset.name}</span>
                  </button>))}
              </div>
            </div>

            {/* Submit & Navigation Action Buttons */}
            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => setStep(1)} className="w-1/3 py-3 border border-border bg-card hover:bg-muted text-foreground text-xs font-semibold rounded-xl transition-all">
                ← Back
              </button>
              <button type="submit" disabled={isLoading} className="w-2/3 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold rounded-xl hover:opacity-95 disabled:opacity-50 transition-all shadow-md">
                {isLoading ? (<>
                    <Loader2 className="w-4 h-4 animate-spin"/>
                    <span>Registering Account...</span>
                  </>) : (<>
                    <Sparkles className="w-4 h-4"/>
                    <span>Complete Setup & Go to Dashboard</span>
                  </>)}
              </button>
            </div>
          </form>)}

        <div className="text-center text-xs text-muted-foreground pt-2 space-y-2">
          <div>
            <span>Already have an account?{" "}</span>
            <Link href="/login" className="text-primary font-semibold hover:underline">
              Sign In
            </Link>
          </div>
          <div className="pt-2 border-t border-border/40">
            <Link href="/" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-3 h-3"/>
              <span>{t("backToHome") || "Back to Home"}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>);
}
