"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { 
  X, 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  ChevronLeft, 
  ChevronRight,
  Sparkles
} from "lucide-react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  solutionId: string;
  solutionTitle: string;
}

const TIME_SLOTS = [
  "09:30 AM",
  "11:00 AM",
  "12:30 PM",
  "02:00 PM",
  "03:30 PM",
  "05:00 PM"
];

// Mapping of service people depending on solution selected
const SERVICE_PEOPLE: Record<string, { name: string; role: string; avatar: string }> = {
  voice: {
    name: "Sarah Jenkins",
    role: "AI Voice Integration Lead",
    avatar: "SJ"
  },
  whatsapp: {
    name: "Carlos Rivera",
    role: "WhatsApp API Solution Architect",
    avatar: "CR"
  },
  app: {
    name: "Amina Al-Mansoor",
    role: "Mobile Product Architect",
    avatar: "AA"
  },
  website: {
    name: "Kenji Sato",
    role: "SEO & Web Ecosystem Consultant",
    avatar: "KS"
  }
};

export default function BookingModal({ isOpen, onClose, solutionId, solutionTitle }: BookingModalProps) {
  const router = useRouter();
  
  // Step navigation (1: Contact, 2: Schedule)
  const [step, setStep] = useState(1);
  
  // Form values
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  
  // Calendar states
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  
  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setName("");
      setEmail("");
      setWhatsapp("");
      setSelectedDate(null);
      setSelectedTime(null);
      setErrors({});
      setCurrentDate(new Date());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Validate Step 1 info
  const handleNextStep = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = "Name is required";
    
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!whatsapp.trim()) {
      newErrors.whatsapp = "WhatsApp number is required";
    } else if (!/^\+?[0-9\s-]{8,15}$/.test(whatsapp.replace(/[^0-9]/g, ""))) {
      newErrors.whatsapp = "Please enter a valid phone number";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      setStep(2);
    }
  };

  // Handle month change
  const changeMonth = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + (direction === "next" ? 1 : -1), 1);
    // Don't go to past months before today's month
    const today = new Date();
    if (direction === "prev" && newDate.getFullYear() <= today.getFullYear() && newDate.getMonth() < today.getMonth()) {
      return;
    }
    setCurrentDate(newDate);
  };

  // Calendar rendering helper values
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  // Get days in current month
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  // Get starting day offset (0 = Sunday, 1 = Monday...)
  const firstDayIndex = new Date(year, month, 1).getDay();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDaysArray = Array.from({ length: firstDayIndex }, (_, i) => i);

  // Check if a day is in the past
  const isPastDay = (day: number) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkDate = new Date(year, month, day);
    return checkDate < today;
  };

  // Check if checkDate is same day as selectedDate
  const isSelectedDay = (day: number) => {
    if (!selectedDate) return false;
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === month &&
      selectedDate.getFullYear() === year
    );
  };

  const handleDaySelect = (day: number) => {
    if (isPastDay(day)) return;
    setSelectedDate(new Date(year, month, day));
  };

  // Confirm booking action
  const handleConfirmBooking = () => {
    if (!selectedDate || !selectedTime) return;

    // Assigned service person details
    const assignedPerson = SERVICE_PEOPLE[solutionId] || {
      name: "Alex Smith",
      role: "Solutions Consultant",
      avatar: "AS"
    };

    const formattedDate = selectedDate.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });

    const bookingPayload = {
      id: "bk-" + Date.now(),
      name,
      email,
      whatsapp,
      date: formattedDate,
      time: selectedTime,
      solutionId,
      solutionTitle,
      servicePerson: assignedPerson,
      bookedAt: new Date().toISOString()
    };

    // Store in localStorage
    const existingBookingsStr = localStorage.getItem("sellgrow_bookings");
    const existingBookings = existingBookingsStr ? JSON.parse(existingBookingsStr) : [];
    existingBookings.push(bookingPayload);
    localStorage.setItem("sellgrow_bookings", JSON.stringify(existingBookings));

    onClose();
    
    // Redirect to route only service-person dashboard
    router.push("/service-person");
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
        {/* Backdrop overlay */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 cursor-pointer"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 15 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-white dark:bg-[#0c1220] shadow-2xl z-10 flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="p-6 border-b border-border bg-slate-50/50 dark:bg-black/10 flex justify-between items-center shrink-0">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-primary dark:text-sky-400 mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>BOOK DEMO SESSION</span>
              </div>
              <h3 className="text-lg font-bold font-display text-foreground leading-tight">
                {solutionTitle} Demo
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg border border-transparent hover:border-border hover:bg-slate-100 dark:hover:bg-white/5 text-muted-foreground hover:text-foreground transition-all"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Progress Indicator */}
          <div className="px-6 py-3 bg-slate-100/40 dark:bg-black/5 border-b border-border flex items-center gap-3 justify-center text-xs font-semibold shrink-0">
            <span className={`flex items-center gap-1 ${step >= 1 ? "text-primary dark:text-sky-400" : "text-muted-foreground"}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center border text-[10px] ${
                step > 1 ? "bg-primary border-primary text-white" : "border-primary dark:border-sky-400"
              }`}>
                {step > 1 ? <Check className="w-3 h-3" /> : "1"}
              </span>
              Contact Info
            </span>
            <span className="w-8 h-px bg-border" />
            <span className={`flex items-center gap-1 ${step >= 2 ? "text-primary dark:text-sky-400" : "text-muted-foreground"}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center border text-[10px] ${
                step >= 2 ? "border-primary dark:border-sky-400" : "border-border"
              }`}>
                2
              </span>
              Select Schedule
            </span>
          </div>

          {/* Body Content */}
          <div className="p-6 overflow-y-auto flex-grow space-y-4">
            {step === 1 ? (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-4 text-left"
              >
                <div className="space-y-1">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider" htmlFor="booking-name">Full Name</label>
                  <div className="relative">
                    <input
                      id="booking-name"
                      type="text"
                      placeholder="e.g. John Doe"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name) setErrors(prev => ({ ...prev, name: "" }));
                      }}
                      className={`w-full pl-9 pr-3 py-2 text-sm rounded-xl border bg-white dark:bg-black/20 focus:outline-none transition-all ${
                        errors.name ? "border-red-500 focus:ring-1 focus:ring-red-500" : "border-border focus:border-primary"
                      }`}
                    />
                    <User className="w-4 h-4 text-muted absolute left-3 top-3" />
                  </div>
                  {errors.name && <p className="text-[10px] text-red-500 font-semibold">{errors.name}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider" htmlFor="booking-email">Email Address</label>
                  <div className="relative">
                    <input
                      id="booking-email"
                      type="email"
                      placeholder="e.g. john@company.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors(prev => ({ ...prev, email: "" }));
                      }}
                      className={`w-full pl-9 pr-3 py-2 text-sm rounded-xl border bg-white dark:bg-black/20 focus:outline-none transition-all ${
                        errors.email ? "border-red-500 focus:ring-1 focus:ring-red-500" : "border-border focus:border-primary"
                      }`}
                    />
                    <Mail className="w-4 h-4 text-muted absolute left-3 top-3" />
                  </div>
                  {errors.email && <p className="text-[10px] text-red-500 font-semibold">{errors.email}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider" htmlFor="booking-phone">WhatsApp Number</label>
                  <div className="relative">
                    <input
                      id="booking-phone"
                      type="tel"
                      placeholder="e.g. +91 98765 43210"
                      value={whatsapp}
                      onChange={(e) => {
                        setWhatsapp(e.target.value);
                        if (errors.whatsapp) setErrors(prev => ({ ...prev, whatsapp: "" }));
                      }}
                      className={`w-full pl-9 pr-3 py-2 text-sm rounded-xl border bg-white dark:bg-black/20 focus:outline-none transition-all ${
                        errors.whatsapp ? "border-red-500 focus:ring-1 focus:ring-red-500" : "border-border focus:border-primary"
                      }`}
                    />
                    <Phone className="w-4 h-4 text-muted absolute left-3 top-3" />
                  </div>
                  {errors.whatsapp && <p className="text-[10px] text-red-500 font-semibold">{errors.whatsapp}</p>}
                </div>

                <div className="bg-slate-50 dark:bg-black/10 p-3.5 rounded-xl border border-border border-dashed text-xs text-muted-foreground leading-normal flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-primary dark:text-sky-400 shrink-0 mt-0.5" />
                  <p>In the next step, you will select an active slot on our interactive schedule. This demo will connect you live with our dedicated systems expert.</p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left"
              >
                {/* Custom Calendar Column */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Select Date</span>
                    <div className="flex gap-1">
                      <button
                        onClick={() => changeMonth("prev")}
                        className="p-1 rounded hover:bg-slate-100 dark:hover:bg-white/5 border text-muted-foreground hover:text-foreground transition-all disabled:opacity-30"
                        disabled={
                          currentDate.getFullYear() === new Date().getFullYear() &&
                          currentDate.getMonth() === new Date().getMonth()
                        }
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => changeMonth("next")}
                        className="p-1 rounded hover:bg-slate-100 dark:hover:bg-white/5 border text-muted-foreground hover:text-foreground transition-all"
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="p-3.5 border border-border rounded-xl bg-slate-50/50 dark:bg-[#080d1a] shadow-inner text-center">
                    <p className="text-xs font-bold text-foreground mb-3">
                      {monthNames[month]} {year}
                    </p>
                    <div className="grid grid-cols-7 gap-1 text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">
                      <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                      {/* empty grids before 1st of month */}
                      {emptyDaysArray.map((idx) => (
                        <span key={`empty-${idx}`} />
                      ))}
                      {/* real calendar days */}
                      {daysArray.map((day) => {
                        const past = isPastDay(day);
                        const selected = isSelectedDay(day);
                        return (
                          <button
                            key={`day-${day}`}
                            disabled={past}
                            onClick={() => handleDaySelect(day)}
                            className={`w-7 h-7 mx-auto rounded-full text-xs font-semibold flex items-center justify-center transition-all ${
                              selected
                                ? "bg-primary text-white font-bold"
                                : past
                                ? "text-slate-300 dark:text-slate-700 cursor-not-allowed opacity-40"
                                : "text-foreground hover:bg-slate-200 dark:hover:bg-white/10"
                            }`}
                          >
                            {day}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Time Slots Column */}
                <div className="space-y-3">
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">Select Time</span>
                  {selectedDate ? (
                    <div className="grid grid-cols-2 gap-2">
                      {TIME_SLOTS.map((timeSlot) => {
                        const isSelected = selectedTime === timeSlot;
                        return (
                          <button
                            key={timeSlot}
                            onClick={() => setSelectedTime(timeSlot)}
                            className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all text-center ${
                              isSelected
                                ? "border-primary bg-primary/10 text-primary shadow-sm shadow-primary/15"
                                : "border-border bg-white dark:bg-black/10 hover:border-primary/50 text-foreground"
                            }`}
                          >
                            {timeSlot}
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="h-[148px] border border-dashed border-border rounded-xl flex items-center justify-center p-4 bg-slate-50/20 text-center">
                      <p className="text-xs text-muted-foreground">Select a date on the calendar first to view available time slots.</p>
                    </div>
                  )}

                  {selectedDate && selectedTime && (
                    <div className="mt-4 p-3 bg-primary/5 dark:bg-primary/10 border border-primary/20 rounded-xl space-y-1.5 text-xs text-left">
                      <p className="font-bold text-primary dark:text-sky-400">Assigned Consultant:</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-7 h-7 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                          {SERVICE_PEOPLE[solutionId]?.avatar || "AS"}
                        </div>
                        <div>
                          <p className="font-semibold text-foreground text-[11px] leading-none">
                            {SERVICE_PEOPLE[solutionId]?.name || "Alex Smith"}
                          </p>
                          <p className="text-[10px] text-muted-foreground mt-0.5 leading-none">
                            {SERVICE_PEOPLE[solutionId]?.role || "Expert Consultant"}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="p-6 border-t border-border bg-slate-50/50 dark:bg-black/10 flex justify-between items-center shrink-0">
            {step === 1 ? (
              <>
                <div />
                <button
                  onClick={handleNextStep}
                  className="px-5 py-2.5 bg-primary hover:opacity-90 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md shadow-primary/10"
                >
                  Next: Schedule <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 border border-border bg-white dark:bg-[#0c1220] hover:bg-slate-100 dark:hover:bg-white/5 text-foreground rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>
                <button
                  onClick={handleConfirmBooking}
                  disabled={!selectedDate || !selectedTime}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:hover:bg-emerald-600 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md shadow-emerald-600/10"
                >
                  Confirm Booking <Check className="w-3.5 h-3.5" />
                </button>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
