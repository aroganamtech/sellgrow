"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Calendar, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  Video, 
  PhoneCall, 
  Trash2, 
  CheckCircle, 
  ChevronRight, 
  Search, 
  ArrowLeft, 
  MessageSquare, 
  Activity,
  FileText,
  Sparkles,
  ClipboardList
} from "lucide-react";

interface Booking {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  date: string;
  time: string;
  solutionId: string;
  solutionTitle: string;
  servicePerson: {
    name: string;
    role: string;
    avatar: string;
  };
  bookedAt: string;
  status?: "pending" | "completed" | "cancelled";
  notes?: string;
}

// Initial seed data if localStorage is empty to show a high-fidelity experience immediately
const SEED_BOOKINGS: Booking[] = [
  {
    id: "bk-seed-1",
    name: "Mohammad Al-Sudairi",
    email: "mohammad@riyadhtrading.com",
    whatsapp: "+966 50 882 1243",
    date: "Wednesday, July 22, 2026",
    time: "11:00 AM",
    solutionId: "voice",
    solutionTitle: "AI Voice Agent",
    servicePerson: {
      name: "Sarah Jenkins",
      role: "AI Voice Integration Lead",
      avatar: "SJ"
    },
    bookedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    status: "pending",
    notes: "Wants to integrate voice receptionist with Saudi SIP trunk provider."
  },
  {
    id: "bk-seed-2",
    name: "Rohan Gupta",
    email: "rohan.g@retailflow.in",
    whatsapp: "+91 98450 11234",
    date: "Thursday, July 23, 2026",
    time: "02:00 PM",
    solutionId: "whatsapp",
    solutionTitle: "WhatsApp Business",
    servicePerson: {
      name: "Carlos Rivera",
      role: "WhatsApp API Solution Architect",
      avatar: "CR"
    },
    bookedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    status: "pending",
    notes: "Requires automatic sync between WhatsApp catalog and Shopify inventory."
  },
  {
    id: "bk-seed-3",
    name: "Jessica Miller",
    email: "jess@millersboutique.com",
    whatsapp: "+1 (555) 234-5678",
    date: "Monday, July 20, 2026",
    time: "09:30 AM",
    solutionId: "app",
    solutionTitle: "App Business",
    servicePerson: {
      name: "Amina Al-Mansoor",
      role: "Mobile Product Architect",
      avatar: "AA"
    },
    bookedAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    status: "completed",
    notes: "Completed setup demonstration. Client excited about push notifications."
  }
];

export default function ServicePersonPortal() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [noteInput, setNoteInput] = useState<string>("");

  // Load bookings from localStorage or initialize with seed data
  useEffect(() => {
    const stored = localStorage.getItem("sellgrow_bookings");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Ensure status field exists
        const formatted = parsed.map((b: Booking) => ({
          ...b,
          status: b.status || "pending",
          notes: b.notes || ""
        }));
        setBookings(formatted);
      } catch (err) {
        console.error(err);
        setBookings(SEED_BOOKINGS);
      }
    } else {
      localStorage.setItem("sellgrow_bookings", JSON.stringify(SEED_BOOKINGS));
      setBookings(SEED_BOOKINGS);
    }
  }, []);

  // Update localStorage when local bookings list state changes
  const saveBookingsState = (updatedList: Booking[]) => {
    setBookings(updatedList);
    localStorage.setItem("sellgrow_bookings", JSON.stringify(updatedList));
  };

  // Mark status action
  const updateBookingStatus = (id: string, status: "pending" | "completed" | "cancelled") => {
    const updated = bookings.map(b => b.id === id ? { ...b, status } : b);
    saveBookingsState(updated);
    if (selectedBooking?.id === id) {
      setSelectedBooking(prev => prev ? { ...prev, status } : null);
    }
  };

  // Add notes to booking
  const handleSaveNotes = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBooking) return;
    const updated = bookings.map(b => b.id === selectedBooking.id ? { ...b, notes: noteInput } : b);
    saveBookingsState(updated);
    setSelectedBooking(prev => prev ? { ...prev, notes: noteInput } : null);
    alert("Appointment notes updated successfully.");
  };

  // Delete booking action
  const handleDeleteBooking = (id: string) => {
    if (confirm("Are you sure you want to delete this booking record?")) {
      const updated = bookings.filter(b => b.id !== id);
      saveBookingsState(updated);
      if (selectedBooking?.id === id) {
        setSelectedBooking(null);
      }
    }
  };

  // Set active booking for notes drawer
  const handleSelectBooking = (booking: Booking) => {
    setSelectedBooking(booking);
    setNoteInput(booking.notes || "");
  };

  // Filter bookings list
  const filteredBookings = bookings.filter(b => {
    // Stage check
    const matchesFilter = 
      filter === "all" || 
      (filter === "pending" && b.status === "pending") ||
      (filter === "completed" && b.status === "completed") ||
      (filter === "cancelled" && b.status === "cancelled");
      
    // Search query check
    const matchesSearch = 
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.whatsapp.includes(searchQuery) ||
      b.solutionTitle.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  // KPI calculations
  const pendingCount = bookings.filter(b => b.status === "pending").length;
  const completedCount = bookings.filter(b => b.status === "completed").length;
  const totalCount = bookings.length;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070b14] text-foreground transition-all duration-300 pb-12">
      {/* Top Sticky Header */}
      <header className="sticky top-0 z-40 w-full border-b border-border bg-white/80 dark:bg-[#0c1220]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link 
              href="/"
              className="p-2 rounded-xl border hover:bg-slate-100 dark:hover:bg-white/5 text-muted-foreground hover:text-foreground transition-all flex items-center gap-1.5 text-xs font-semibold"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Site
            </Link>
            <div className="h-4 w-px bg-border hidden sm:block" />
            <h1 className="text-sm sm:text-base font-extrabold tracking-tight font-display text-foreground flex items-center gap-1.5">
              <ClipboardList className="w-4 h-4 text-primary" />
              <span>Service Agent Hub</span>
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-xs font-semibold text-muted-foreground">Service Portal Active</span>
          </div>
        </div>
      </header>

      {/* Main content grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        
        {/* KPI Cards section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl border border-border bg-white dark:bg-[#0c1220] shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Total Bookings</p>
              <p className="text-2xl font-extrabold font-display mt-2">{totalCount}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
              {totalCount}
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-border bg-white dark:bg-[#0c1220] shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Pending Calls</p>
              <p className="text-2xl font-extrabold font-display mt-2 text-amber-500">{pendingCount}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold">
              {pendingCount}
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-border bg-white dark:bg-[#0c1220] shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Completed Sessions</p>
              <p className="text-2xl font-extrabold font-display mt-2 text-emerald-500">{completedCount}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold">
              {completedCount}
            </div>
          </div>
        </div>

        {/* Filters and search container */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center p-4 border border-border bg-white dark:bg-[#0c1220] rounded-2xl shadow-sm">
          {/* Tabs */}
          <div className="flex bg-slate-100 dark:bg-black/20 p-1 rounded-xl w-full md:w-auto">
            {[
              { id: "all", label: "All Bookings" },
              { id: "pending", label: "Pending" },
              { id: "completed", label: "Completed" },
              { id: "cancelled", label: "Cancelled" }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`flex-grow md:flex-grow-0 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  filter === tab.id
                    ? "bg-white dark:bg-[#0c1220] text-primary dark:text-sky-400 shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Search by customer name or product..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-border bg-slate-50 dark:bg-black/20 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            />
            <Search className="w-3.5 h-3.5 text-muted absolute left-3 top-3" />
          </div>
        </div>

        {/* Dashboard Grid split (Left: Bookings list, Right: Detail View / Notes panel) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* Bookings list panel */}
          <div className="lg:col-span-2 space-y-4">
            {filteredBookings.length === 0 ? (
              <div className="p-12 border border-dashed border-border bg-white dark:bg-[#0c1220] rounded-2xl text-center space-y-3">
                <ClipboardList className="w-10 h-10 text-muted mx-auto" />
                <h3 className="text-sm font-bold text-foreground">No bookings found</h3>
                <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                  {searchQuery || filter !== "all" 
                    ? "Try adjusting your search query or filter selectors." 
                    : "No client bookings logged. Navigate back to the homepage and click 'Book Demo' on any product page."}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredBookings.map((booking) => (
                  <div
                    key={booking.id}
                    onClick={() => handleSelectBooking(booking)}
                    className={`p-5 rounded-2xl border transition-all text-left space-y-4 cursor-pointer hover:shadow-md ${
                      selectedBooking?.id === booking.id
                        ? "border-primary bg-primary/5 dark:bg-primary/10 shadow-sm"
                        : "border-border bg-white dark:bg-[#0c1220]"
                    }`}
                  >
                    {/* Solution Tag & Status */}
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-slate-100 dark:bg-black/20 text-muted-foreground border border-border">
                        {booking.solutionTitle}
                      </span>
                      <span className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full ${
                        booking.status === "completed" 
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-300"
                          : booking.status === "cancelled"
                          ? "bg-red-500/10 text-red-600 dark:text-red-300"
                          : "bg-amber-500/10 text-amber-600 dark:text-amber-300"
                      }`}>
                        {booking.status || "pending"}
                      </span>
                    </div>

                    {/* Customer Info */}
                    <div className="space-y-1.5">
                      <h4 className="text-sm font-bold text-foreground flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-muted" /> {booking.name}
                      </h4>
                      <p className="text-xs text-muted-foreground flex items-center gap-1.5 truncate">
                        <Mail className="w-3.5 h-3.5 text-muted" /> {booking.email}
                      </p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-muted" /> {booking.whatsapp}
                      </p>
                    </div>

                    <hr className="border-border opacity-50" />

                    {/* Booking Schedule Details */}
                    <div className="flex justify-between items-center text-xs">
                      <div className="space-y-0.5">
                        <p className="text-[10px] font-bold text-muted uppercase tracking-wider">Scheduled Date & Time</p>
                        <p className="font-semibold text-foreground flex items-center gap-1 mt-1 text-[11px]">
                          <Calendar className="w-3.5 h-3.5 text-primary shrink-0" /> {booking.date.split(",")[1] || booking.date}
                        </p>
                        <p className="font-semibold text-foreground flex items-center gap-1 text-[11px]">
                          <Clock className="w-3.5 h-3.5 text-primary shrink-0" /> {booking.time}
                        </p>
                      </div>
                      
                      {/* Action buttons list */}
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteBooking(booking.id);
                        }}
                        className="p-2 rounded-xl text-muted-foreground hover:text-red-500 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all shrink-0"
                        aria-label="Delete booking"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Details & Notes panel */}
          <div className="lg:col-span-1">
            {selectedBooking ? (
              <div className="p-6 rounded-2xl border border-border bg-white dark:bg-[#0c1220] shadow-sm space-y-6 text-left animate-fade-in">
                
                {/* Header detail */}
                <div className="border-b pb-4">
                  <h3 className="text-sm font-bold font-display text-foreground">Appointment Workspace</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">Action operations & follow-up notes.</p>
                </div>

                {/* Status operations */}
                <div className="space-y-2">
                  <p className="text-[10px] font-bold text-muted uppercase tracking-wider">Modify Call Status</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => updateBookingStatus(selectedBooking.id, "completed")}
                      className={`flex-grow py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border transition-all ${
                        selectedBooking.status === "completed"
                          ? "bg-emerald-600 border-emerald-600 text-white"
                          : "border-border hover:bg-slate-100 dark:hover:bg-white/5 text-foreground"
                      }`}
                    >
                      <CheckCircle className="w-3.5 h-3.5" /> Complete
                    </button>
                    <button
                      onClick={() => updateBookingStatus(selectedBooking.id, "cancelled")}
                      className={`flex-grow py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border transition-all ${
                        selectedBooking.status === "cancelled"
                          ? "bg-red-600 border-red-600 text-white"
                          : "border-border hover:bg-slate-100 dark:hover:bg-white/5 text-foreground"
                      }`}
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Cancel
                    </button>
                  </div>
                </div>

                {/* Assigned Agent Details */}
                <div className="p-4 rounded-xl border border-border bg-slate-50 dark:bg-black/10 space-y-2">
                  <p className="text-[10px] font-bold text-muted uppercase tracking-wider">Assigned Agent</p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary text-white font-bold flex items-center justify-center text-xs">
                      {selectedBooking.servicePerson?.avatar || "SA"}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-foreground leading-none">{selectedBooking.servicePerson?.name}</p>
                      <p className="text-[10px] text-muted-foreground mt-1 leading-none">{selectedBooking.servicePerson?.role}</p>
                    </div>
                  </div>
                </div>

                {/* Call Simulation panel */}
                {selectedBooking.status === "pending" && (
                  <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 space-y-3">
                    <p className="text-xs font-bold text-primary dark:text-sky-400 flex items-center gap-1">
                      <Sparkles className="w-4 h-4" /> Live Demo Launcher
                    </p>
                    <p className="text-[11px] text-muted-foreground leading-normal">
                      Initiate the simulated call or web chat sandbox for this demonstration solution.
                    </p>
                    <button
                      onClick={() => alert(`Launching live simulation for ${selectedBooking.name} on ${selectedBooking.solutionTitle}...`)}
                      className="w-full py-2 bg-primary hover:opacity-90 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5"
                    >
                      <PhoneCall className="w-3.5 h-3.5" /> Trigger Call Simulator
                    </button>
                  </div>
                )}

                {/* Note Taking Form */}
                <form onSubmit={handleSaveNotes} className="space-y-2.5 pt-2">
                  <label className="text-[10px] font-bold text-muted uppercase tracking-wider block" htmlFor="appointment-notes">
                    Agent Consultation Notes
                  </label>
                  <textarea
                    id="appointment-notes"
                    rows={4}
                    value={noteInput}
                    onChange={(e) => setNoteInput(e.target.value)}
                    placeholder="Enter customer requests, specific configurations, or follow-up timelines..."
                    className="w-full p-3 text-xs rounded-xl border border-border bg-slate-50 dark:bg-black/20 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                  />
                  <button
                    type="submit"
                    className="w-full py-2 border border-primary text-primary hover:bg-primary/5 rounded-xl text-xs font-bold transition-all"
                  >
                    Save Notes Update
                  </button>
                </form>

              </div>
            ) : (
              <div className="p-6 rounded-2xl border border-border bg-white dark:bg-[#0c1220] shadow-sm text-center py-12 space-y-3">
                <ClipboardList className="w-10 h-10 text-muted mx-auto" />
                <h3 className="text-sm font-bold text-foreground">Select a booking card</h3>
                <p className="text-xs text-muted-foreground max-w-xs mx-auto leading-relaxed">
                  Click on any customer booking record on the left to activate the agent workspace panel, update statuses, or log consultation notes.
                </p>
              </div>
            )}
          </div>

        </div>

      </main>
    </div>
  );
}
