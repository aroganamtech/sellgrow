"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useRouter } from "next/navigation";
import Logo from "@/components/layout/Logo";
import { ProductPdfIntelligenceModel } from "@/services/pdfIntelligenceEngine";
import { TrendingUp, MessageSquare, Volume2, Workflow, Database, Layers, Activity, LogOut, Sun, Moon, Globe, Plus, Trash2, Send, Sparkles, PhoneCall, PhoneOff, Mic, MicOff, UserCheck, FileText, Search, ChevronRight, LayoutDashboard, FolderTree, DollarSign, Users, MessageCircle, Package, ShoppingCart, X, Cpu, Sliders, ExternalLink, FilePlus, CreditCard, Settings, User, CheckCircle2, Calendar, Clock, UserPlus, CalendarDays, Briefcase, Bell, BellRing, Image as ImageIcon, Upload, } from "lucide-react";
const TIME_SLOTS = [
    "08:00 AM", "08:30 AM", "09:00 AM", "09:30 AM",
    "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM",
    "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM",
    "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM",
    "06:00 PM", "06:30 PM", "07:00 PM", "07:30 PM",
    "08:00 PM"
];
const DEFAULT_DEMO_PRODUCTS = [
    {
        id: "gr-1",
        name: "Organic Extra Virgin Olive Oil 1L",
        sku: "GR-OIL-101",
        price: "$18.50",
        variants: "Single Variant",
        category: "Oils & Spices",
        brochure: "olive_oil_spec.pdf",
        stock: 140,
        description: "Cold-pressed 100% organic Italian extra virgin olive oil in a dark UV protective glass bottle.",
        image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&auto=format&fit=crop&q=80",
        productType: "grocery",
        totalSales: "$2,590.00"
    },
    {
        id: "gr-2",
        name: "Himalayan Long Grain Basmati Rice 5kg",
        sku: "GR-RICE-505",
        price: "$24.90",
        variants: "5kg Pack",
        category: "Grains & Rice",
        brochure: "basmati_rice_quality.pdf",
        stock: 85,
        description: "Aged 2 years, aromatic long-grain premium royal Basmati rice sourced directly from Himalayan foothills.",
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80",
        productType: "grocery",
        totalSales: "$2,116.50"
    },
    {
        id: "gr-3",
        name: "Fresh Organic Avocados (Pack of 4)",
        sku: "GR-AVO-404",
        price: "$6.99",
        variants: "Pack of 4",
        category: "Produce",
        brochure: "organic_produce_sheet.pdf",
        stock: 210,
        description: "Farm-fresh ripe Hass organic avocados, nutrient-dense and perfect for salads, dips, or toast.",
        image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=600&auto=format&fit=crop&q=80",
        productType: "grocery",
        totalSales: "$1,467.90"
    },
    {
        id: "gr-4",
        name: "Artisan Whole Wheat Sourdough Bread",
        sku: "GR-BRD-202",
        price: "$4.50",
        variants: "Fresh Loaf",
        category: "Bakery",
        brochure: "bakery_ingredients.pdf",
        stock: 65,
        description: "Naturally fermented 24-hour sourdough loaf baked fresh daily with organic whole wheat flour.",
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80",
        productType: "grocery",
        totalSales: "$292.50"
    },
    {
        id: "gr-5",
        name: "Gourmet Arabica Coffee Beans 500g",
        sku: "GR-COF-808",
        price: "$15.80",
        variants: "Whole Bean",
        category: "Beverages",
        brochure: "coffee_bean_roast.pdf",
        stock: 95,
        description: "Single-origin medium roasted 100% Arabica coffee beans with notes of dark chocolate and hazelnut.",
        image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&auto=format&fit=crop&q=80",
        productType: "grocery",
        totalSales: "$1,501.00"
    },
    {
        id: "gr-6",
        name: "Farm Fresh Organic Whole Milk 2L",
        sku: "GR-MLK-303",
        price: "$5.20",
        variants: "2 Litre Bottle",
        category: "Dairy & Eggs",
        brochure: "dairy_certifications.pdf",
        stock: 180,
        description: "Pasteurized organic full-cream milk from grass-fed cows with no added preservatives or hormones.",
        image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=600&auto=format&fit=crop&q=80",
        productType: "grocery",
        totalSales: "$936.00"
    },
    {
        id: "rt-1",
        name: "George Maijo BC 520 2SP",
        sku: "GM-BC-520-2SP",
        price: "$12.50",
        rentalRate: "$12.50 / Day",
        variants: "Single Variant",
        category: "Rental Tools",
        brochure: "brush_cutter_manual.pdf",
        stock: 50,
        description: "42.7cc 2-stroke air-cooled heavy-duty agricultural brush cutter.",
        image: "https://www.georgemaijoagri.com/wp-content/uploads/2024/10/2.5.BC-520@2x.png",
        productType: "rental",
        totalSales: "$1,250.00 (100 Days Rented)"
    },
    {
        id: "rt-2",
        name: "George Maijo BC 520 2SPR",
        sku: "GM-BC-520-2SPR",
        price: "$12.50",
        rentalRate: "$12.50 / Day",
        variants: "Single Variant",
        category: "Rental Tools",
        brochure: "brush_cutter_manual.pdf",
        stock: 50,
        description: "42.7cc 2-stroke backpack style ergonomic brush cutter.",
        image: "https://www.georgemaijoagri.com/wp-content/uploads/2024/10/2.4.BC-520-DLX@2x.png",
        productType: "rental",
        totalSales: "$1,250.00 (100 Days Rented)"
    },
    {
        id: "rt-3",
        name: "George Maijo BC 358 4SP",
        sku: "GM-BC-358-4SP",
        price: "$12.50",
        rentalRate: "$12.50 / Day",
        variants: "Single Variant",
        category: "Rental Tools",
        brochure: "cutter_spec.pdf",
        stock: 50,
        description: "35.8cc 4-stroke low-emission pure petrol brush cutter.",
        image: "https://www.georgemaijoagri.com/wp-content/uploads/2024/10/2.1.BC-4SP-E@2x.png",
        productType: "rental",
        totalSales: "$1,250.00 (100 Days Rented)"
    },
    {
        id: "rt-4",
        name: "George Maijo BC 358 4SPR",
        sku: "GM-BC-358-4SPR",
        price: "$12.50",
        rentalRate: "$12.50 / Day",
        variants: "Single Variant",
        category: "Rental Tools",
        brochure: "cutter_spec.pdf",
        stock: 50,
        description: "35.8cc 4-stroke backpack brush cutter for steep terrain.",
        image: "https://www.georgemaijoagri.com/wp-content/uploads/2024/10/2.2.BC-4SPR-E@2x.png",
        productType: "rental",
        totalSales: "$1,250.00 (100 Days Rented)"
    },
    {
        id: "rt-5",
        name: "George Maijo BC 358 4BPR",
        sku: "GM-BC-358-4BPR",
        price: "$12.50",
        rentalRate: "$12.50 / Day",
        variants: "Single Variant",
        category: "Rental Tools",
        brochure: "cutter_spec.pdf",
        stock: 50,
        description: "4-stroke commercial grade brush cutter with heavy steel blade.",
        image: "https://www.georgemaijoagri.com/wp-content/uploads/2024/10/2.3.BC-4BPR-E@2x.png",
        productType: "rental",
        totalSales: "$1,250.00 (100 Days Rented)"
    },
    {
        id: "rt-6",
        name: "George Maijo BC 358 4BP",
        sku: "GM-BC-358-4BP",
        price: "$12.50",
        rentalRate: "$12.50 / Day",
        variants: "Single Variant",
        category: "Rental Tools",
        brochure: "cutter_spec.pdf",
        stock: 50,
        description: "Straight shaft 4-stroke premium brush cutter.",
        image: "https://www.georgemaijoagri.com/wp-content/uploads/2024/10/Brush-Cutter-4SP@2x.png",
        productType: "rental",
        totalSales: "$1,250.00 (100 Days Rented)"
    },
    {
        id: "rt-7",
        name: "Maijo Wenovus MW-CH110",
        sku: "MW-CH110",
        price: "$12.50",
        rentalRate: "$12.50 / Day",
        variants: "Single Variant",
        category: "Rental Tools",
        brochure: "harvester_spec.pdf",
        stock: 50,
        description: "Track type mini combine harvester for paddy and wheat harvesting.",
        image: "https://www.georgemaijoagri.com/wp-content/uploads/2024/10/Combine-harvester-machine@2x.png",
        productType: "rental",
        totalSales: "$1,250.00 (100 Days Rented)"
    },
    {
        id: "rt-8",
        name: "Maijo Mahaveer 13HP",
        sku: "MJ-MHV-13HP",
        price: "$12.50",
        rentalRate: "$12.50 / Day",
        variants: "Single Variant",
        category: "Rental Tools",
        brochure: "tiller_13hp.pdf",
        stock: 50,
        description: "13HP heavy duty diesel power tiller with multi-speed rotary system.",
        image: "https://www.georgemaijoagri.com/wp-content/uploads/2024/10/power-tiller-13hp@2x.png",
        productType: "rental",
        totalSales: "$1,250.00 (100 Days Rented)"
    },
    {
        id: "rt-9",
        name: "WM 1100 A6",
        sku: "WM-1100-AG",
        price: "$12.50",
        rentalRate: "$12.50 / Day",
        variants: "Single Variant",
        category: "Rental Tools",
        brochure: "weeder_spec.pdf",
        stock: 50,
        description: "7HP petrol engine power weeder with gear driven transmission.",
        image: "https://www.georgemaijoagri.com/wp-content/uploads/2024/10/Power-weeder-WM-1100A6@2x.png",
        productType: "rental",
        totalSales: "$1,250.00 (100 Days Rented)"
    },
    {
        id: "rt-10",
        name: "WM 1100C6 DLX Plus Prime",
        sku: "WM-1100CC-DLX",
        price: "$12.50",
        rentalRate: "$12.50 / Day",
        variants: "Single Variant",
        category: "Rental Tools",
        brochure: "weeder_spec.pdf",
        stock: 50,
        description: "Premium 7HP petrol power weeder with 3 speed PTO gearbox.",
        image: "https://www.georgemaijoagri.com/wp-content/uploads/2024/10/1.1.WM1100-C6-DLX-PLUS-PRIME-600x400.png",
        productType: "rental",
        totalSales: "$1,250.00 (100 Days Rented)"
    },
    {
        id: "rt-11",
        name: "WM 1000 NAM",
        sku: "WM-1000-NAM",
        price: "$12.50",
        rentalRate: "$12.50 / Day",
        variants: "Single Variant",
        category: "Rental Tools",
        brochure: "weeder_spec.pdf",
        stock: 50,
        description: "Compact 7HP petrol power weeder for narrow row crops.",
        image: "https://www.georgemaijoagri.com/wp-content/uploads/2024/10/Power-weeder-WM-1000NAM@2x.png",
        productType: "rental",
        totalSales: "$1,250.00 (100 Days Rented)"
    },
    {
        id: "rt-12",
        name: "WM 1000 NAM Elite",
        sku: "WM-1000-ELITE",
        price: "$12.50",
        rentalRate: "$12.50 / Day",
        variants: "Single Variant",
        category: "Rental Tools",
        brochure: "weeder_spec.pdf",
        stock: 50,
        description: "7HP diesel engine power weeder for low operating cost.",
        image: "https://www.georgemaijoagri.com/wp-content/uploads/2024/10/WM-1000-NAM-ELITE@2x.png",
        productType: "rental",
        totalSales: "$1,250.00 (100 Days Rented)"
    },
    {
        id: "rt-13",
        name: "WM 1100CM",
        sku: "WM-1100CM",
        price: "$12.50",
        rentalRate: "$12.50 / Day",
        variants: "Single Variant",
        category: "Rental Tools",
        brochure: "weeder_spec.pdf",
        stock: 50,
        description: "Standard 7HP petrol power weeder with heavy gear transmission.",
        image: "https://www.georgemaijoagri.com/wp-content/uploads/2024/10/1.4.WM-1100CM-E-600x400.png",
        productType: "rental",
        totalSales: "$1,250.00 (100 Days Rented)"
    },
    {
        id: "rt-14",
        name: "WM 1100C Elite",
        sku: "WM-1100C-ELITE",
        price: "$12.50",
        rentalRate: "$12.50 / Day",
        variants: "Single Variant",
        category: "Rental Tools",
        brochure: "weeder_spec.pdf",
        stock: 50,
        description: "High performance 7.5HP petrol weeder with bumper guard.",
        image: "https://www.georgemaijoagri.com/wp-content/uploads/2024/10/1.5.WM-1100C-ELITE-600x400.png",
        productType: "rental",
        totalSales: "$1,250.00 (100 Days Rented)"
    },
    {
        id: "rt-15",
        name: "WM 990",
        sku: "WM-990",
        price: "$12.50",
        rentalRate: "$12.50 / Day",
        variants: "Single Variant",
        category: "Rental Tools",
        brochure: "weeder_spec.pdf",
        stock: 50,
        description: "Lightweight 7HP belt driven petrol power weeder.",
        image: "https://www.georgemaijoagri.com/wp-content/uploads/2024/10/Power-Weeder-WM-990@2x.png",
        productType: "rental",
        totalSales: "$1,250.00 (100 Days Rented)"
    },
    {
        id: "rt-16",
        name: "Maijo 5PR Paddy Reaper",
        sku: "MJ-5PR-REAP",
        price: "$14.50",
        rentalRate: "$14.50 / Day",
        variants: "Single Variant",
        category: "Rental Tools",
        brochure: "reaper_spec.pdf",
        stock: 35,
        description: "Self-propelled crop reaper binder for paddy, wheat, and sesame.",
        image: "https://www.georgemaijoagri.com/wp-content/uploads/2024/10/paddy-reaper-5pr@2x.png",
        productType: "rental",
        totalSales: "$1,450.00 (100 Days Rented)"
    },
    {
        id: "rt-17",
        name: "Maijo 7PR Paddy Reaper",
        sku: "MJ-7PR-REAP",
        price: "$16.00",
        rentalRate: "$16.00 / Day",
        variants: "Single Variant",
        category: "Rental Tools",
        brochure: "reaper_spec.pdf",
        stock: 25,
        description: "Heavy duty 7HP self-propelled vertical conveyor crop reaper.",
        image: "https://www.georgemaijoagri.com/wp-content/uploads/2024/10/paddy-reaper-7pr@2x.png",
        productType: "rental",
        totalSales: "$1,600.00 (100 Days Rented)"
    }
];
export default function DashboardPage() {
    const { user, updateUser, logout, isLoading: authLoading } = useAuth();
    const { language, setLanguage, t, dir } = useLanguage();
    const { theme, toggleTheme } = useTheme();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("overview");
    // Catalogue State & Product Management
    const [products, setProducts] = useState(DEFAULT_DEMO_PRODUCTS);
    // Services State (11 Live Services)
    const [servicesList, setServicesList] = useState([
        { id: "srv-1", name: "Equipment On-Site Maintenance", category: "Machinery Repairs", price: "$45.00", unit: "hour", status: "Active", description: "On-site diagnostic, blade sharpening & engine tuning for farm machinery." },
        { id: "srv-2", name: "Harvester & Tiller Fleet Dispatch", category: "Fleet Logistics", price: "$120.00", unit: "day", status: "Active", description: "Instant dispatch of heavy combine harvesters and diesel tillers with trained driver." },
        { id: "srv-3", name: "Agricultural Soil Testing & Consultation", category: "Agronomy Advisory", price: "$75.00", unit: "session", status: "Active", description: "Comprehensive NPK soil testing & crop yield optimization advisory." },
        { id: "srv-4", name: "Express Farm & Grocery Order Delivery", category: "FMCG Logistics", price: "$15.00", unit: "order", status: "Active", description: "Same-day doorstep delivery for retail grocery and bulk farm orders." },
        { id: "srv-5", name: "Heavy Machinery Operator Training", category: "Skill Training", price: "$150.00", unit: "person", status: "Active", description: "Certified hands-on training for brush cutters, power weeders & tillers." },
        { id: "srv-6", name: "Custom Tiller Setup & Blade Tuning", category: "Machinery Setup", price: "$35.00", unit: "unit", status: "Active", description: "Custom blade assembly and gearbox calibration for heavy power weeders." },
        { id: "srv-7", name: "Bulk Grocery Wholesale Logistics", category: "Freight Transport", price: "$250.00", unit: "trip", status: "Active", description: "Refrigerated transport for bulk grain, rice, Basmati, and fresh produce." },
        { id: "srv-8", name: "Solar Irrigation Pump Maintenance", category: "Green Tech", price: "$95.00", unit: "inspection", status: "Active", description: "Routine servicing and photovoltaic cell cleaning for solar irrigation pumps." },
        { id: "srv-9", name: "Pesticide Spraying Drone Operations", category: "Precision Farming", price: "$80.00", unit: "acre", status: "Active", description: "Autonomous aerial drone spraying for pest control and liquid fertilizer." },
        { id: "srv-10", name: "Pre-Rental Equipment Quality Inspection", category: "Fleet Safety", price: "$30.00", unit: "unit", status: "Active", description: "18-point safety check and oil change before machinery dispatch." },
        { id: "srv-11", name: "24/7 AI Receptionist Hotline Service", category: "AI Automation", price: "$49.00", unit: "month", status: "Active", description: "Automated WebRTC & PSTN call intake for booking farm equipment." },
    ]);
    // Sub Admin & Team Directory States (Super Admin | Sub Admin | Employees)
    const [clientSubAdminTab, setClientSubAdminTab] = useState("sub-admins");
    const [superAdminDirectory, setSuperAdminDirectory] = useState([
        { id: "sa-dir-1", name: user?.name || "Naveen S", email: user?.email || "naveen@sellgrow.co", role: "SuperAdmin", permissions: "Full Access", status: "Active", notificationEnabled: true, portalLink: "/nomo/sg-superadmin" }
    ]);
    const [subAdminDirectory, setSubAdminDirectory] = useState([
        { id: "sub-1", sgId: "SG-A-101", name: "Alex Rivera", email: "alex.rivera@georgemaijo.com", role: "Senior Account Executive", accessScope: "Full Access", avatar: "AR" },
        { id: "sub-2", sgId: "SG-A-102", name: "Rahul Kumar", email: "rahul.kumar@georgemaijo.com", role: "Field Sales Specialist", accessScope: "Read/Write", avatar: "RK" },
        { id: "sub-3", sgId: "SG-A-103", name: "Sarah Jenkins", email: "sarah.jenkins@georgemaijo.com", role: "Enterprise Sales Director", accessScope: "Read/Write", avatar: "SJ" },
        { id: "sub-4", sgId: "SG-A-104", name: "Marcus Vance", email: "marcus.vance@georgemaijo.com", role: "SDR & Demo Specialist", accessScope: "Read/Write", avatar: "MV" },
    ]);
    const [editingSubAdmin, setEditingSubAdmin] = useState(null);
    const [employeeDirectory, setEmployeeDirectory] = useState([
        { id: "emp-1", name: "Amit Shah", email: "amit@sellgrow.co", work: "Customer Support", assignedSubAdmin: "Operator Main", accessScope: "View Only", avatar: "A" },
        { id: "emp-2", name: "Karthik R", email: "karthik@sellgrow.co", work: "CRM Automation", assignedSubAdmin: "Operator Main", accessScope: "Read & Write", avatar: "K" },
        { id: "emp-3", name: "Priya K", email: "priya@sellgrow.co", work: "Landing Page Editor", assignedSubAdmin: "Operator Main", accessScope: "View Only", avatar: "P" },
    ]);
    // Control Flags State
    const [controlFlags, setControlFlags] = useState({
        aiVoice: true,
        whatsapp: true,
        posInventory: true,
        multiCurrency: true,
        workflows: true,
        ragVector: true,
        rentalAlerts: true,
    });
    // Client Data State
    const [clientRecords, setClientRecords] = useState([
        { id: "c-1", company: "Tesla India Retail", contact: "Elon Musk", email: "elon@tesla.com", phone: "+91 98765 43210", category: "E-Commerce & Retail", ordersCount: 14, totalSpent: 45000, status: "VIP Active" },
        { id: "c-2", company: "Apex Logistics Ltd.", contact: "Robert Ford", email: "robert@apexlog.com", phone: "+91 98123 45678", category: "Distributor & Logistics", ordersCount: 8, totalSpent: 18500, status: "Active" },
        { id: "c-3", company: "GreenField Agri Farms", contact: "Priya Ramesh", email: "priya@greenfield.in", phone: "+91 97654 32109", category: "Agriculture & Rental", ordersCount: 22, totalSpent: 32400, status: "VIP Active" },
        { id: "c-4", company: "Sunrise Grocery Supermarket", contact: "David Kumar", email: "david@sunrisegrocery.in", phone: "+91 96543 21098", category: "Grocery & FMCG", ordersCount: 31, totalSpent: 64200, status: "VIP Active" },
    ]);
    // Payment Transactions State
    const [transactions, setTransactions] = useState([
        { id: "TXN-9021", client: "Sunrise Grocery Supermarket", date: "2026-07-30", amount: 1250.00, method: "POS Terminal (Card)", status: "Paid & Fulfilled" },
        { id: "TXN-9020", client: "GreenField Agri Farms", date: "2026-07-29", amount: 350.00, method: "Razorpay / UPI", status: "Paid & Fulfilled" },
        { id: "TXN-9019", client: "Tesla India Retail", date: "2026-07-28", amount: 4500.00, method: "Stripe Card", status: "Paid & Fulfilled" },
        { id: "TXN-9018", client: "Apex Logistics Ltd.", date: "2026-07-27", amount: 820.00, method: "Bank Transfer", status: "Processing" },
    ]);
    // Settings Input State
    const [settingCompany, setSettingCompany] = useState(user?.businessName || "George Maijo Agri");
    const [settingType, setSettingType] = useState(user?.businessType || "Agricultural Equipment Manufacturer");
    const [settingEmail, setSettingEmail] = useState(user?.email || "enquirys@georgemaijo.com");
    const [settingPhone, setSettingPhone] = useState(user?.phone || "+91 91504 60651");
    const [settingDomain, setSettingDomain] = useState("george-maijo-agri.sellgrow.app");
    const [settingTheme, setSettingTheme] = useState(user?.themeColor || "emerald");
    useEffect(() => {
        if (user?.businessName) {
            setSettingCompany(user.businessName);
            const slug = user.businessName
                .toLowerCase()
                .trim()
                .replace(/[^a-z0-9]/g, "-")
                .replace(/-+/g, "-")
                .replace(/^-|-$/g, "") || "client";
            setSettingDomain(`${slug}.sellgrow.app`);
        }
        if (user?.businessType) {
            setSettingType(user.businessType);
        }
        if (user?.email) {
            setSettingEmail(user.email);
        }
        if (user?.themeColor) {
            setSettingTheme(user.themeColor);
        }
    }, [user]);
    const handleSaveCompanySettings = (e) => {
        e.preventDefault();
        if (!settingCompany.trim()) {
            alert("Please enter a valid company name.");
            return;
        }
        updateUser({
            businessName: settingCompany.trim(),
            businessType: settingType.trim(),
            themeColor: settingTheme,
        });
        const newSlug = settingCompany
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]/g, "-")
            .replace(/-+/g, "-")
            .replace(/^-|-$/g, "") || "client";
        alert(`✅ Business settings & brand theme saved successfully!\n\n- Business Name: "${settingCompany.trim()}"\n- Company Brand Theme: ${settingTheme.toUpperCase()}\n- Application URL: "/${newSlug}/dashboard"`);
    };
    // Profile Input State
    const [profileName, setProfileName] = useState(user?.name || "Naveen S");
    const [profileEmail, setProfileEmail] = useState(user?.email || "admin@nomo.com");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [twoFactorAuth, setTwoFactorAuth] = useState(true);
    // AI Forecasting & Month Selection State
    const [forecastMonth, setForecastMonth] = useState("aug-2026");
    const FORECAST_DATA = {
        "aug-2026": {
            label: "August 2026 (AI Forecast)",
            historicalMonths: ["Jan", "Mar", "May", "Jul (Current)", "Aug (AI Forecast)"],
            forecastMonthName: "August 2026",
            actualAmount: "$195,400",
            predictedAmount: "$248,500",
            rawPredicted: 248500,
            growth: "+27.1%",
            confidence: "95.4%",
            svgPathActual: "M 10 100 C 60 90, 110 50, 160 55 C 220 60, 270 35, 290 28",
            svgPathForecast: "M 290 28 C 320 22, 360 16, 390 10",
            endDotCx: 290,
            endDotCy: 28,
            forecastDotCx: 390,
            forecastDotCy: 10,
        },
        "sep-2026": {
            label: "September 2026 (AI Forecast)",
            historicalMonths: ["Jan", "Mar", "May", "Jul (Current)", "Sep (AI Forecast)"],
            forecastMonthName: "September 2026",
            actualAmount: "$195,400",
            predictedAmount: "$278,900",
            rawPredicted: 278900,
            growth: "+42.7%",
            confidence: "93.8%",
            svgPathActual: "M 10 100 C 60 90, 110 50, 160 55 C 220 60, 270 35, 290 28",
            svgPathForecast: "M 290 28 C 330 20, 365 12, 390 8",
            endDotCx: 290,
            endDotCy: 28,
            forecastDotCx: 390,
            forecastDotCy: 8,
        },
        "oct-2026": {
            label: "October 2026 (AI Forecast)",
            historicalMonths: ["Jan", "Mar", "May", "Jul (Current)", "Oct (AI Forecast)"],
            forecastMonthName: "October 2026",
            actualAmount: "$195,400",
            predictedAmount: "$312,000",
            rawPredicted: 312000,
            growth: "+59.6%",
            confidence: "91.2%",
            svgPathActual: "M 10 100 C 60 90, 110 50, 160 55 C 220 60, 270 35, 290 28",
            svgPathForecast: "M 290 28 C 330 18, 365 10, 390 5",
            endDotCx: 290,
            endDotCy: 28,
            forecastDotCx: 390,
            forecastDotCy: 5,
        },
        "jul-2026": {
            label: "July 2026 (Current Month)",
            historicalMonths: ["Jan", "Mar", "May", "Jul (Current)"],
            forecastMonthName: "July 2026",
            actualAmount: "$195,400",
            predictedAmount: "$195,400",
            rawPredicted: 195400,
            growth: "+14.8%",
            confidence: "99.1%",
            svgPathActual: "M 10 100 C 60 90, 110 50, 160 55 C 220 60, 290 35, 390 15",
            svgPathForecast: "",
            endDotCx: 390,
            endDotCy: 15,
            forecastDotCx: 390,
            forecastDotCy: 15,
        },
    };
    const activeForecast = FORECAST_DATA[forecastMonth] || FORECAST_DATA["aug-2026"];
    // Modal States
    const [isAddServiceOpen, setIsAddServiceOpen] = useState(false);
    const [isAddSubAdminOpen, setIsAddSubAdminOpen] = useState(false);
    const [isAddClientOpen, setIsAddClientOpen] = useState(false);
    // New Form Inputs
    const [srvName, setSrvName] = useState("");
    const [srvPrice, setSrvPrice] = useState("");
    const [srvCat, setSrvCat] = useState("Machinery Repairs");
    const [srvDesc, setSrvDesc] = useState("");
    const [subName, setSubName] = useState("");
    const [subEmail, setSubEmail] = useState("");
    const [subRole, setSubRole] = useState("Store Manager");
    const [cliComp, setCliComp] = useState("");
    const [cliContact, setCliContact] = useState("");
    const [cliEmail, setCliEmail] = useState("");
    const [cliPhone, setCliPhone] = useState("");
    // CRM state
    const [leads, setLeads] = useState([
        {
            id: "1",
            name: "Tesla India Retail",
            value: "$45,000",
            probability: 88,
            coordinates: "12.9716° N, 77.5946° E",
            summary: "Client requests immediate pricing and catalogue details for commercial EV chargers.",
            stage: "incoming",
        },
        {
            id: "2",
            name: "MedLife Clinic Group",
            value: "$18,500",
            probability: 95,
            coordinates: "19.0760° N, 72.8777° E",
            summary: "AI receptionist booked visit on Monday. Needs clinic receptionist workflow automation.",
            stage: "meeting",
        },
        {
            id: "3",
            name: "HyperMarket Dubai",
            value: "$92,000",
            probability: 74,
            coordinates: "25.2048° N, 55.2708° E",
            summary: "Acquiring WhatsApp Business Broadcast subscription and multi-language support details.",
            stage: "proposal",
        },
        {
            id: "4",
            name: "German Textile Co.",
            value: "$34,000",
            probability: 100,
            coordinates: "52.5200° N, 13.4050° E",
            summary: "Contract finalized. Order tracking API and inventory catalog sync activated.",
            stage: "closed",
        },
    ]);
    const [newLeadName, setNewLeadName] = useState("");
    const [newLeadValue, setNewLeadValue] = useState("");
    const [selectedLead, setSelectedLead] = useState(null);
    // Inbox state
    const [selectedChat, setSelectedChat] = useState("whatsapp");
    const [chatMessages, setChatMessages] = useState({
        whatsapp: [
            { sender: "client", text: "Hello! Can I set up automatic order tracking notifications?" },
            { sender: "agent", text: "Yes, you can configure an automated delay trigger node to send updates." },
        ],
        livechat: [
            { sender: "client", text: "Do you offer SOC 2 security compliance?" },
            { sender: "agent", text: "Yes, SellGrow has built-in enterprise multi-tenant SOC 2 policies." },
        ],
        messenger: [
            { sender: "client", text: "I want to request a demo of the AI Voice Agent integration." },
        ],
    });
    const [inboxInput, setInboxInput] = useState("");
    const [aiSuggestions, setAiSuggestions] = useState({
        whatsapp: [
            "Yes, order tracking syncs directly with Shopify & custom DBs.",
            "You can setup automated delays under the Workflow tab.",
        ],
        livechat: [
            "Our system is fully GDPR ready and SOC 2 audited.",
            "Check our security logs inside the Admin configuration.",
        ],
        messenger: [
            "Sure! Click the AI Voice Agent tab to try our live call simulator.",
            "We use WebRTC nodes for zero-latency communication.",
        ],
    });
    // Voice Platform State
    const [voiceCallState, setVoiceCallState] = useState("idle");
    const [voiceTranscripts, setVoiceTranscripts] = useState([]);
    const [isVoiceSpeaking, setIsVoiceSpeaking] = useState(false);
    // Workflow states
    const [workflowNodes, setWorkflowNodes] = useState([
        { id: "1", type: "trigger", label: "WhatsApp Lead Incoming", details: "Fires when customer initiates chat" },
        { id: "2", type: "delay", label: "Delay Node: 2 Minutes", details: "Prevents instant bot spam feeling" },
        { id: "3", type: "action", label: "Semantic RAG Answer", details: "Queries catalog PDF for solutions" },
        { id: "4", type: "action", label: "Provision CRM Ticket", details: "Sets status to Incoming Lead" },
    ]);
    const [newNodeType, setNewNodeType] = useState("action");
    const [newNodeLabel, setNewNodeLabel] = useState("");
    const [newNodeDetails, setNewNodeDetails] = useState("");
    // RAG / Knowledge Base State
    const [ragFiles, setRagFiles] = useState([
        { name: "return_policy_v3.pdf", size: "1.4 MB", date: "2026-07-10", chunks: 42 },
        { name: "ev_charger_manual.docx", size: "2.1 MB", date: "2026-07-12", chunks: 110 },
        { name: "faq_list_arabic.xlsx", size: "450 KB", date: "2026-07-15", chunks: 15 },
    ]);
    const [ragQuery, setRagQuery] = useState("");
    const [ragResult, setRagResult] = useState(null);
    // ------------------------------------------------------------------
    // Multi-Tenant Company Data Isolation & Persistence
    // ------------------------------------------------------------------
    const [isCompanyDataLoaded, setIsCompanyDataLoaded] = useState(false);
    useEffect(() => {
        if (authLoading)
            return;
        const rawName = user?.businessName || "";
        const slug = rawName
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]/g, "-")
            .replace(/-+/g, "-")
            .replace(/^-|-$/g, "");
        const isDemoAccount = !user || ["demo", "nomo", "apex", "retail-shop", "sellgrow"].includes(slug);
        if (!isDemoAccount && slug && user?.email) {
            const storageKey = `sg_company_data_${slug}_${user.email}`;
            const savedDataStr = typeof window !== "undefined" ? localStorage.getItem(storageKey) : null;
            if (savedDataStr) {
                try {
                    const parsed = JSON.parse(savedDataStr);
                    if (Array.isArray(parsed.subAdminDirectory) && parsed.subAdminDirectory.length > 0) {
                        setSubAdminDirectory(parsed.subAdminDirectory);
                    }
                    else {
                        setSubAdminDirectory([
                            { id: "sub-1", sgId: "SG-A-101", name: "Alex Rivera", email: "alex.rivera@georgemaijo.com", role: "Senior Account Executive", accessScope: "Full Access", avatar: "AR" },
                            { id: "sub-2", sgId: "SG-A-102", name: "Rahul Kumar", email: "rahul.kumar@georgemaijo.com", role: "Field Sales Specialist", accessScope: "Read/Write", avatar: "RK" },
                            { id: "sub-3", sgId: "SG-A-103", name: "Sarah Jenkins", email: "sarah.jenkins@georgemaijo.com", role: "Enterprise Sales Director", accessScope: "Read/Write", avatar: "SJ" },
                            { id: "sub-4", sgId: "SG-A-104", name: "Marcus Vance", email: "marcus.vance@georgemaijo.com", role: "SDR & Demo Specialist", accessScope: "Read/Write", avatar: "MV" },
                        ]);
                    }
                    if (Array.isArray(parsed.servicesList))
                        setServicesList(parsed.servicesList);
                    if (Array.isArray(parsed.employeeDirectory))
                        setEmployeeDirectory(parsed.employeeDirectory);
                    if (Array.isArray(parsed.clientRecords))
                        setClientRecords(parsed.clientRecords);
                    if (Array.isArray(parsed.transactions))
                        setTransactions(parsed.transactions);
                    if (Array.isArray(parsed.leads))
                        setLeads(parsed.leads);
                    if (Array.isArray(parsed.products))
                        setProducts(parsed.products);
                    if (Array.isArray(parsed.workflowNodes))
                        setWorkflowNodes(parsed.workflowNodes);
                    if (Array.isArray(parsed.ragFiles))
                        setRagFiles(parsed.ragFiles);
                    if (Array.isArray(parsed.superAdminDirectory)) {
                        setSuperAdminDirectory(parsed.superAdminDirectory);
                    }
                    else {
                        setSuperAdminDirectory([
                            {
                                id: "sa-dir-1",
                                name: user.name || "Company SuperAdmin",
                                email: user.email,
                                role: "SuperAdmin",
                                permissions: "Full Access",
                                status: "Active",
                                notificationEnabled: true,
                                portalLink: `/${slug}/sg-superadmin`
                            }
                        ]);
                    }
                }
                catch (e) {
                    console.error("Error loading company data:", e);
                }
            }
            else {
                // Newly Registered Company
                const defaultSubAdmins = [
                    { id: "sub-1", sgId: "SG-A-101", name: "Alex Rivera", email: "alex.rivera@georgemaijo.com", role: "Senior Account Executive", accessScope: "Full Access", avatar: "AR" },
                    { id: "sub-2", sgId: "SG-A-102", name: "Rahul Kumar", email: "rahul.kumar@georgemaijo.com", role: "Field Sales Specialist", accessScope: "Read/Write", avatar: "RK" },
                    { id: "sub-3", sgId: "SG-A-103", name: "Sarah Jenkins", email: "sarah.jenkins@georgemaijo.com", role: "Enterprise Sales Director", accessScope: "Read/Write", avatar: "SJ" },
                    { id: "sub-4", sgId: "SG-A-104", name: "Marcus Vance", email: "marcus.vance@georgemaijo.com", role: "SDR & Demo Specialist", accessScope: "Read/Write", avatar: "MV" },
                ];
                setServicesList([]);
                setSubAdminDirectory(defaultSubAdmins);
                setEmployeeDirectory([]);
                setClientRecords([]);
                setTransactions([]);
                setLeads([]);
                setProducts([]);
                setWorkflowNodes([]);
                setRagFiles([]);
                setSuperAdminDirectory([
                    {
                        id: "sa-dir-1",
                        name: user.name || "Company SuperAdmin",
                        email: user.email,
                        role: "SuperAdmin",
                        permissions: "Full Access",
                        status: "Active",
                        notificationEnabled: true,
                        portalLink: `/${slug}/sg-superadmin`
                    }
                ]);
                if (typeof window !== "undefined") {
                    localStorage.setItem(storageKey, JSON.stringify({
                        servicesList: [],
                        subAdminDirectory: defaultSubAdmins,
                        employeeDirectory: [],
                        clientRecords: [],
                        transactions: [],
                        leads: [],
                        products: [],
                        workflowNodes: [],
                        superAdminDirectory: [
                            {
                                id: "sa-dir-1",
                                name: user.name || "Company SuperAdmin",
                                email: user.email,
                                role: "SuperAdmin",
                                permissions: "Full Access",
                                status: "Active",
                                notificationEnabled: true,
                                portalLink: `/${slug}/sg-superadmin`
                            }
                        ]
                    }));
                }
            }
        }
        setIsCompanyDataLoaded(true);
    }, [user, authLoading]);
    // Auto-save changes to Company Store
    useEffect(() => {
        if (authLoading || !user || !isCompanyDataLoaded)
            return;
        const rawName = user.businessName || "";
        const slug = rawName
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]/g, "-")
            .replace(/-+/g, "-")
            .replace(/^-|-$/g, "");
        const isDemoAccount = ["demo", "nomo", "apex", "retail-shop", "sellgrow"].includes(slug);
        if (isDemoAccount || !slug || !user.email)
            return;
        const storageKey = `sg_company_data_${slug}_${user.email}`;
        const payload = {
            servicesList,
            subAdminDirectory,
            employeeDirectory,
            clientRecords,
            transactions,
            leads,
            products,
            workflowNodes,
            ragFiles,
            superAdminDirectory
        };
        if (typeof window !== "undefined") {
            localStorage.setItem(storageKey, JSON.stringify(payload));
        }
    }, [
        user,
        authLoading,
        isCompanyDataLoaded,
        servicesList,
        subAdminDirectory,
        employeeDirectory,
        clientRecords,
        transactions,
        leads,
        products,
        workflowNodes,
        ragFiles,
        superAdminDirectory
    ]);
    // Sync user profile & settings inputs when user changes
    useEffect(() => {
        if (user) {
            if (user.businessName)
                setSettingCompany(user.businessName);
            if (user.businessType || user.businessCategory)
                setSettingType(user.businessType || user.businessCategory || "");
            if (user.email) {
                setSettingEmail(user.email);
                setProfileEmail(user.email);
            }
            if (user.name)
                setProfileName(user.name);
            if (user.phone)
                setSettingPhone(user.phone);
            if (user.businessName) {
                const slug = user.businessName.toLowerCase().replace(/[^a-z0-9]/g, "");
                setSettingDomain(`${slug || "company"}.sellgrow.app`);
            }
        }
    }, [user]);
    // 🔄 Auto-sync externally booked demo slots into Dashboard CRM Leads & Schedules
    useEffect(() => {
        const syncBookedSlots = () => {
            if (typeof window === "undefined")
                return;
            // 1. Sync Booked Leads into CRM Kanban Board ("MEETING SCHEDULED" stage)
            try {
                const storedBooked = localStorage.getItem("sellgrow_booked_leads");
                if (storedBooked) {
                    const bookedLeads = JSON.parse(storedBooked);
                    if (Array.isArray(bookedLeads) && bookedLeads.length > 0) {
                        setLeads((prev) => {
                            const existingIds = new Set(prev.map((l) => l.id));
                            const newItems = bookedLeads.filter((l) => !existingIds.has(l.id));
                            return newItems.length > 0 ? [...newItems, ...prev] : prev;
                        });
                    }
                }
            }
            catch (err) {
                console.error("Error syncing booked leads", err);
            }
            // 2. Sync Booked Schedules into Demo Schedules tab
            try {
                const storedSchedules = localStorage.getItem("sellgrow_booked_schedules");
                if (storedSchedules) {
                    const bookedSchedules = JSON.parse(storedSchedules);
                    if (Array.isArray(bookedSchedules) && bookedSchedules.length > 0) {
                        setSalesSchedules((prev) => {
                            const existingIds = new Set(prev.map((s) => s.id));
                            const newItems = bookedSchedules.filter((s) => !existingIds.has(s.id));
                            return newItems.length > 0 ? [...newItems, ...prev] : prev;
                        });
                    }
                }
            }
            catch (err) {
                console.error("Error syncing booked schedules", err);
            }
        };
        syncBookedSlots();
        window.addEventListener("storage", syncBookedSlots);
        window.addEventListener("focus", syncBookedSlots);
        return () => {
            window.removeEventListener("storage", syncBookedSlots);
            window.removeEventListener("focus", syncBookedSlots);
        };
    }, []);
    // CRM Add Lead State & Handlers
    const [isAddLeadOpen, setIsAddLeadOpen] = useState(false);
    const [leadNameInput, setLeadNameInput] = useState("");
    const [leadValueInput, setLeadValueInput] = useState("");
    const [leadStageInput, setLeadStageInput] = useState("incoming");
    const [leadProbInput, setLeadProbInput] = useState("85");
    const [leadSummaryInput, setLeadSummaryInput] = useState("");
    const handleCreateLead = (e) => {
        e.preventDefault();
        if (!leadNameInput.trim() || !leadValueInput.trim())
            return;
        const newLead = {
            id: `lead_${Date.now()}`,
            name: leadNameInput.trim(),
            value: leadValueInput.trim().startsWith("$") ? leadValueInput.trim() : `$${leadValueInput.trim()}`,
            probability: parseInt(leadProbInput) || 75,
            coordinates: "13.0827° N, 80.2707° E",
            summary: leadSummaryInput.trim() || "New prospective lead created via Sales CRM console.",
            stage: leadStageInput
        };
        setLeads(prev => [newLead, ...prev]);
        setLeadNameInput("");
        setLeadValueInput("");
        setLeadStageInput("incoming");
        setLeadProbInput("85");
        setLeadSummaryInput("");
        setIsAddLeadOpen(false);
        alert(`Lead "${newLead.name}" added to CRM successfully!`);
    };
    // Sales Reps & Salesman Time Scheduling State
    const [salesReps, setSalesReps] = useState([
        {
            id: "rep-1",
            name: "Alex Rivera",
            role: "Senior Account Executive",
            email: "alex@nomo.com",
            phone: "+1 (555) 234-5678",
            shift: "09:00 AM - 05:00 PM",
            status: "On Duty",
            territory: "North America & UAE",
            avatar: "AR",
            targetMonthly: "$120,000",
            completedMeetingsToday: 4,
        },
        {
            id: "rep-2",
            name: "Rahul Kumar",
            role: "Field Sales Specialist",
            email: "rahul@nomo.com",
            phone: "+91 98765 43210",
            shift: "08:00 AM - 04:00 PM",
            status: "In Client Meeting",
            territory: "India & APAC",
            avatar: "RK",
            targetMonthly: "$95,000",
            completedMeetingsToday: 3,
        },
        {
            id: "rep-3",
            name: "Sarah Jenkins",
            role: "Enterprise Sales Director",
            email: "sarah@nomo.com",
            phone: "+44 20 7946 0912",
            shift: "10:00 AM - 06:00 PM",
            status: "On Duty",
            territory: "Europe & MENA",
            avatar: "SJ",
            targetMonthly: "$180,000",
            completedMeetingsToday: 5,
        },
        {
            id: "rep-4",
            name: "Marcus Vance",
            role: "SDR & Demo Specialist",
            email: "marcus@nomo.com",
            phone: "+1 (555) 876-5432",
            shift: "12:00 PM - 08:00 PM",
            status: "On Break",
            territory: "Global Remote",
            avatar: "MV",
            targetMonthly: "$75,000",
            completedMeetingsToday: 2,
        },
    ]);
    const [salesSchedules, setSalesSchedules] = useState([
        {
            id: "sch-1",
            leadName: "Tesla India Retail",
            salesmanId: "rep-2",
            salesmanName: "Rahul Kumar",
            date: "Today",
            startTime: "10:00 AM",
            endTime: "11:30 AM",
            meetingType: "GPS Field Visit",
            location: "Bangalore Tech Park, Hub 4",
            notes: "EV Charger bulk order catalog demo & pricing discussion",
            status: "In Progress",
        },
        {
            id: "sch-2",
            leadName: "MedLife Clinic Group",
            salesmanId: "rep-1",
            salesmanName: "Alex Rivera",
            date: "Today",
            startTime: "02:00 PM",
            endTime: "03:00 PM",
            meetingType: "Video Demo",
            location: "Google Meet / Remote",
            notes: "AI Receptionist integration & workflow automation walkthrough",
            status: "Scheduled",
        },
        {
            id: "sch-3",
            leadName: "HyperMarket Dubai",
            salesmanId: "rep-3",
            salesmanName: "Sarah Jenkins",
            date: "Today",
            startTime: "04:30 PM",
            endTime: "05:30 PM",
            meetingType: "Site Audit",
            location: "Downtown Dubai Retail Center",
            notes: "POS Inventory sync & WhatsApp API subscription deal",
            status: "Scheduled",
        },
        {
            id: "sch-4",
            leadName: "German Textile Co.",
            salesmanId: "rep-4",
            salesmanName: "Marcus Vance",
            date: "Tomorrow",
            startTime: "11:00 AM",
            endTime: "12:00 PM",
            meetingType: "Phone Call",
            location: "PSTN Direct Hotline",
            notes: "Contract sign-off & order tracking API setup",
            status: "Scheduled",
        },
    ]);
    const [crmSubTab, setCrmSubTab] = useState("pipeline");
    // Modals for Sales CRM & Scheduling
    const [isAddScheduleOpen, setIsAddScheduleOpen] = useState(false);
    const [isAddSalesmanOpen, setIsAddSalesmanOpen] = useState(false);
    // Form states for schedule modal
    const [schLeadName, setSchLeadName] = useState("");
    const [schSalesmanId, setSchSalesmanId] = useState("rep-1");
    const [schDate, setSchDate] = useState(() => new Date().toISOString().split("T")[0]);
    const [schStartTime, setSchStartTime] = useState("10:00 AM");
    const [schEndTime, setSchEndTime] = useState("11:00 AM");
    const [schMeetingType, setSchMeetingType] = useState("GPS Field Visit");
    const [schLocation, setSchLocation] = useState("");
    const [schNotes, setSchNotes] = useState("");
    // Form states for salesman modal
    const [repNameInput, setRepNameInput] = useState("");
    const [repRoleInput, setRepRoleInput] = useState("Sales Representative");
    const [repEmailInput, setRepEmailInput] = useState("");
    const [repPhoneInput, setRepPhoneInput] = useState("");
    const [repShiftInput, setRepShiftInput] = useState("09:00 AM - 05:00 PM");
    const [repTerritoryInput, setRepTerritoryInput] = useState("General Region");
    const handleCreateSchedule = (e) => {
        e.preventDefault();
        if (!schLeadName.trim())
            return;
        const rep = salesReps.find((r) => r.id === schSalesmanId) || salesReps[0];
        const newSch = {
            id: `sch_${Date.now()}`,
            leadName: schLeadName.trim(),
            salesmanId: rep.id,
            salesmanName: rep.name,
            date: schDate || new Date().toISOString().split("T")[0],
            startTime: schStartTime || "10:00 AM",
            endTime: schEndTime || "11:00 AM",
            meetingType: schMeetingType,
            location: schLocation.trim() || "Virtual / Client Site",
            notes: schNotes.trim() || "Scheduled sales follow-up & demo",
            status: "Scheduled",
        };
        setSalesSchedules((prev) => [newSch, ...prev]);
        setSchLeadName("");
        setSchLocation("");
        setSchNotes("");
        setSchDate(new Date().toISOString().split("T")[0]);
        setIsAddScheduleOpen(false);
        alert(`Sales time slot scheduled for ${rep.name} with "${newSch.leadName}"!`);
    };
    const handleCreateSalesman = (e) => {
        e.preventDefault();
        if (!repNameInput.trim())
            return;
        const initials = repNameInput
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
        const newRep = {
            id: `rep_${Date.now()}`,
            name: repNameInput.trim(),
            role: repRoleInput.trim() || "Sales Representative",
            email: repEmailInput.trim() || `${repNameInput.toLowerCase().replace(/\s+/g, ".")}@nomo.com`,
            phone: repPhoneInput.trim() || "+1 (555) 000-0000",
            shift: repShiftInput || "09:00 AM - 05:00 PM",
            status: "On Duty",
            territory: repTerritoryInput.trim() || "General Region",
            avatar: initials || "SR",
            targetMonthly: "$100,000",
            completedMeetingsToday: 0,
        };
        setSalesReps((prev) => [...prev, newRep]);
        setRepNameInput("");
        setRepEmailInput("");
        setRepPhoneInput("");
        setRepShiftInput("09:00 AM - 05:00 PM");
        setRepTerritoryInput("General Region");
        setIsAddSalesmanOpen(false);
        alert(`Sales Rep "${newRep.name}" added successfully!`);
    };
    // Demo Member Schedule Modal State
    const [isScheduleDemoOpen, setIsScheduleDemoOpen] = useState(false);
    const [demoSelectedLeadId, setDemoSelectedLeadId] = useState("");
    const [demoSelectedRepId, setDemoSelectedRepId] = useState("");
    const [demoDateInput, setDemoDateInput] = useState("2026-08-05");
    const [demoTimeSlotInput, setDemoTimeSlotInput] = useState("10:00 AM - 10:45 AM");
    const [demoTopicInput, setDemoTopicInput] = useState("AI Voice Assistant & Live Sales Demo");
    const [demoMeetingType, setDemoMeetingType] = useState("Google Meet (Auto-generated)");
    const [demoNotesInput, setDemoNotesInput] = useState("");
    const handleScheduleDemoSubmit = (e) => {
        e.preventDefault();
        const assignedRep = salesReps.find(r => r.id === demoSelectedRepId) || salesReps[0];
        const targetLead = leads.find(l => l.id === demoSelectedLeadId);
        const leadName = targetLead ? targetLead.name : "Booked Client";
        if (targetLead) {
            setLeads(prev => prev.map(l => {
                if (l.id === targetLead.id) {
                    return {
                        ...l,
                        stage: "meeting",
                        summary: `Demo scheduled on ${demoDateInput} @ ${demoTimeSlotInput} with Rep ${assignedRep.name} (${assignedRep.role}). Topic: ${demoTopicInput}`
                    };
                }
                return l;
            }));
        }
        // Add entry to sales schedules list
        const newSch = {
            id: `demo_${Date.now()}`,
            leadName: leadName,
            salesmanId: assignedRep ? assignedRep.id : "rep-1",
            salesmanName: assignedRep ? assignedRep.name : "Sales Rep",
            date: demoDateInput,
            startTime: demoTimeSlotInput.split(" - ")[0] || "10:00 AM",
            endTime: demoTimeSlotInput.split(" - ")[1] || "10:45 AM",
            status: "Scheduled",
            meetingType: "Video Demo",
            location: demoMeetingType,
            notes: `Demo Topic: ${demoTopicInput}. ${demoNotesInput}`
        };
        setSalesSchedules(prev => [newSch, ...prev]);
        setIsScheduleDemoOpen(false);
        alert(`Demo Scheduled Successfully!\n\n• Booked Person: ${leadName}\n• Assigned Sales Rep: ${assignedRep ? assignedRep.name : "Sales Rep"}\n• Date & Time: ${demoDateInput} @ ${demoTimeSlotInput}\n• Meeting Link: ${demoMeetingType}\n\nCalendar invite and notification sent to both client and sales rep!`);
    };
    const updateScheduleStatus = (id, newStatus) => {
        setSalesSchedules((prev) => {
            const updated = prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s));
            try {
                const stored = localStorage.getItem("sellgrow_booked_schedules");
                if (stored) {
                    const list = JSON.parse(stored);
                    const newList = list.map((s) => (s.id === id ? { ...s, status: newStatus } : s));
                    localStorage.setItem("sellgrow_booked_schedules", JSON.stringify(newList));
                }
            }
            catch (e) {
                console.error("Error saving updated status to localStorage", e);
            }
            return updated;
        });
    };
    const updateScheduleSalesman = (id, newSalesmanId) => {
        const rep = salesReps.find((r) => r.id === newSalesmanId);
        const salesmanName = rep ? rep.name : "Sales Rep";
        setSalesSchedules((prev) => {
            const updated = prev.map((s) => s.id === id ? { ...s, salesmanId: newSalesmanId, salesmanName } : s);
            try {
                const stored = localStorage.getItem("sellgrow_booked_schedules");
                if (stored) {
                    const list = JSON.parse(stored);
                    const newList = list.map((s) => s.id === id ? { ...s, salesmanId: newSalesmanId, salesmanName } : s);
                    localStorage.setItem("sellgrow_booked_schedules", JSON.stringify(newList));
                }
            }
            catch (e) {
                console.error("Error saving updated salesman to localStorage", e);
            }
            return updated;
        });
    };
    const deleteSchedule = (id) => {
        setSalesSchedules((prev) => {
            const updated = prev.filter((s) => s.id !== id);
            try {
                const stored = localStorage.getItem("sellgrow_booked_schedules");
                if (stored) {
                    const list = JSON.parse(stored);
                    const newList = list.filter((s) => s.id !== id);
                    localStorage.setItem("sellgrow_booked_schedules", JSON.stringify(newList));
                }
            }
            catch (e) {
                console.error("Error deleting schedule", e);
            }
            return updated;
        });
    };
    const clearAllSchedules = () => {
        if (window.confirm("Are you sure you want to clear all booked client demos & duty schedules?")) {
            setSalesSchedules([]);
            try {
                localStorage.removeItem("sellgrow_booked_schedules");
            }
            catch (e) {
                console.error("Error clearing booked schedules from localStorage", e);
            }
        }
    };
    // Saved Client Enquiries Data Store
    const [clientEnquiries, setClientEnquiries] = useState(() => {
        if (typeof window !== "undefined") {
            try {
                const saved = localStorage.getItem("sellgrow_client_enquiries");
                if (saved)
                    return JSON.parse(saved);
            }
            catch (e) {
                console.error("Error loading client enquiries", e);
            }
        }
        return [
            {
                id: "enq-101",
                scheduleId: "slot-sch-1785846271187",
                leadName: "Naveen S (George Maijo BC 358 4SP Demo)",
                salesmanId: "sub-1",
                salesmanName: "Alex Rivera",
                date: "Wed, Aug 5, 2026",
                startTime: "10:30 AM",
                location: "Google Meet / Live Demo Portal",
                transcript: [
                    { speaker: "client", text: "Hello Alex! We booked this product slot to discuss George Maijo BC 358 4SP. Can you clarify the warranty and engine fuel efficiency?", time: "10:30 AM" },
                    { speaker: "salesman", text: "Welcome! I am Alex Rivera. Glad to assist you. This equipment features 25% lower fuel consumption, a 2-year doorstep warranty, and free maintenance.", time: "10:30 AM" },
                    { speaker: "client", text: "Is the heavy-duty tiller blade attachment included in the ₹24,500 package price?", time: "10:31 AM" },
                    { speaker: "salesman", text: "Yes, absolute certainty! The tiller attachment and 3-tooth blade are fully bundled in the package.", time: "10:31 AM" },
                    { speaker: "client", text: "Wonderful! We are ready to move forward and purchase today. Please send the POS checkout link.", time: "10:32 AM" }
                ],
                summary: {
                    keyHighlights: [
                        "Client interested in bulk machinery ordering for farm operations.",
                        "Demonstrated 4-stroke engine fuel efficiency & low emissions.",
                        "Confirmed 2-year manufacturer doorstep warranty & maintenance policy."
                    ],
                    objectionsResolved: [
                        "Verified tiller blade attachment bundle inclusion at no extra cost.",
                        "Confirmed spare parts availability across India & UAE distribution hubs."
                    ],
                    agreedNextSteps: [
                        "Generate POS invoice link & dispatch equipment via courier.",
                        "Schedule post-delivery operation walkthrough video call."
                    ]
                },
                sentimentOutcome: "positive",
                buyingIntentScore: 88,
                comments: [
                    "Initial inquiry discussion logged by Alex Rivera.",
                    "Client verified 4-stroke engine specs and tiller blade attachment bundle.",
                    "High buying intent (88%). Requested POS invoice checkout link."
                ],
                savedAt: "8/5/2026, 10:35:00 AM"
            }
        ];
    });
    // Track expanded client enquiry IDs for accordion detail view
    const [expandedEnquiryIds, setExpandedEnquiryIds] = useState([]);
    // Active CRM Discuss & Voice AI Enquiry Session State
    const [activeEnquirySession, setActiveEnquirySession] = useState(null);
    const saveEnquiryToClientData = (session) => {
        if (!session)
            return;
        const newRecord = {
            id: `enq-${Date.now()}`,
            scheduleId: session.scheduleId,
            leadName: session.leadName,
            salesmanId: session.salesmanId,
            salesmanName: session.salesmanName,
            date: session.date,
            startTime: session.startTime,
            location: session.location,
            transcript: session.transcript,
            summary: session.summary,
            sentimentOutcome: session.sentimentOutcome,
            buyingIntentScore: session.buyingIntentScore,
            comments: session.comments && session.comments.length > 0 ? session.comments : [
                `Representative ${session.salesmanName} verified schedule & accepted discussion.`,
                `Transcribed ${session.transcript.length} turns of voice enquiry.`,
                `Conversion Sentiment Result: POSITIVE TO BUY THE PRODUCT (${session.buyingIntentScore}% Buy Intent).`
            ],
            savedAt: new Date().toLocaleString()
        };
        setClientEnquiries((prev) => {
            const updated = [newRecord, ...prev];
            try {
                localStorage.setItem("sellgrow_client_enquiries", JSON.stringify(updated));
            }
            catch (e) {
                console.error("Error saving client enquiries to localStorage", e);
            }
            return updated;
        });
        updateScheduleStatus(session.scheduleId, "Completed");
        setActiveEnquirySession(null);
        setCrmSubTab("enquiries");
    };
    // Real-time Voice AI Transcribe Timer Effect
    useEffect(() => {
        let interval = null;
        if (activeEnquirySession?.recordingStatus === "recording") {
            interval = setInterval(() => {
                setActiveEnquirySession((prev) => {
                    if (!prev)
                        return null;
                    const nextTime = prev.recordingTime + 1;
                    let newTranscript = [...prev.transcript];
                    if (nextTime === 3 && newTranscript.length === 2) {
                        newTranscript.push({
                            speaker: "client",
                            text: "Is the heavy-duty tiller blade attachment included in the ₹24,500 package price?",
                            time: "10:31 AM"
                        });
                    }
                    else if (nextTime === 6 && newTranscript.length === 3) {
                        newTranscript.push({
                            speaker: "salesman",
                            text: "Yes, absolute certainty! The tiller attachment and 3-tooth blade are fully bundled in the package.",
                            time: "10:31 AM"
                        });
                    }
                    else if (nextTime === 9 && newTranscript.length === 4) {
                        newTranscript.push({
                            speaker: "client",
                            text: "Wonderful! We are ready to move forward and purchase today. Please send the POS checkout link.",
                            time: "10:32 AM"
                        });
                    }
                    return {
                        ...prev,
                        recordingTime: nextTime,
                        transcript: newTranscript
                    };
                });
            }, 1000);
        }
        else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [activeEnquirySession?.recordingStatus]);
    const startEnquiryDiscussion = (sch) => {
        const rep = salesReps.find((r) => r.id === sch.salesmanId) || salesReps[0];
        const salesmanName = sch.salesmanName || (rep ? rep.name : "Alex Rivera");
        updateScheduleStatus(sch.id, "In Progress");
        setActiveEnquirySession({
            scheduleId: sch.id,
            leadName: sch.leadName,
            salesmanId: sch.salesmanId || (rep ? rep.id : "rep-1"),
            salesmanName: salesmanName,
            date: sch.date,
            startTime: sch.startTime,
            location: sch.location || "Google Meet / Live Demo Portal",
            notes: sch.notes || "",
            verificationStatus: "pending",
            recordingStatus: "idle",
            recordingTime: 0,
            transcript: [
                {
                    speaker: "client",
                    text: `Hello ${salesmanName.split(" ")[0]}! We booked this product slot to discuss ${sch.leadName}. Can you explain the warranty and engine fuel efficiency?`,
                    time: "10:30 AM"
                },
                {
                    speaker: "salesman",
                    text: `Welcome! I am ${salesmanName}. Glad to assist you. This equipment features 25% lower fuel consumption, a 2-year doorstep warranty, and free maintenance.`,
                    time: "10:30 AM"
                }
            ],
            summary: {
                keyHighlights: [
                    "Client interested in bulk machinery ordering for farm operations.",
                    "Demonstrated 4-stroke engine fuel efficiency & low emissions.",
                    "Confirmed 2-year manufacturer doorstep warranty & maintenance policy."
                ],
                objectionsResolved: [
                    "Verified tiller blade attachment bundle inclusion at no extra cost.",
                    "Confirmed spare parts availability across India & UAE distribution hubs."
                ],
                agreedNextSteps: [
                    "Generate POS invoice link & dispatch equipment via courier.",
                    "Schedule post-delivery operation walkthrough video call."
                ]
            },
            sentimentOutcome: "positive",
            buyingIntentScore: 88,
            comments: [
                `Initial inquiry session launched for ${sch.leadName}.`,
                `Assigned Representative: ${salesmanName}.`
            ],
            newCommentInput: ""
        });
    };
    const updateRepStatus = (id, newStatus) => {
        setSalesReps((prev) => prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r)));
    };
    const deleteSalesRep = (id) => {
        setSalesReps((prev) => prev.filter((r) => r.id !== id));
    };
    const clearAllSalesReps = () => {
        if (window.confirm("Are you sure you want to clear all sales representatives data?")) {
            setSalesReps([]);
        }
    };
    // Knowledge Base Document Upload State & Handlers
    const [isUploadDocOpen, setIsUploadDocOpen] = useState(false);
    const [docNameInput, setDocNameInput] = useState("");
    const handleUploadDocument = (e) => {
        e.preventDefault();
        if (!docNameInput.trim())
            return;
        const newFile = {
            name: docNameInput.endsWith(".pdf") || docNameInput.endsWith(".docx") ? docNameInput.trim() : `${docNameInput.trim()}.pdf`,
            size: `${(Math.random() * 3 + 0.5).toFixed(1)} MB`,
            date: new Date().toISOString().split("T")[0],
            chunks: Math.floor(Math.random() * 80 + 20)
        };
        setRagFiles(prev => [newFile, ...prev]);
        setDocNameInput("");
        setIsUploadDocOpen(false);
        alert(`Document "${newFile.name}" vector-indexed successfully into Knowledge Base!`);
    };
    // Omnichannel Broadcast State & Handlers
    const [isBroadcastOpen, setIsBroadcastOpen] = useState(false);
    const [broadcastTarget, setBroadcastTarget] = useState("All Active Leads");
    const [broadcastMessage, setBroadcastMessage] = useState("");
    const handleSendBroadcast = (e) => {
        e.preventDefault();
        if (!broadcastMessage.trim())
            return;
        setIsBroadcastOpen(false);
        setBroadcastMessage("");
        alert(`Omnichannel Broadcast queued! Message broadcasted to ${leads.length} active leads via WhatsApp API & SMS.`);
    };
    const [currency, setCurrency] = useState("USD");
    const currencyRates = {
        USD: { symbol: "$", rate: 1 },
        INR: { symbol: "₹", rate: 83.50 },
        EUR: { symbol: "€", rate: 0.92 },
        GBP: { symbol: "£", rate: 0.79 },
        AED: { symbol: "د.إ", rate: 3.67 },
    };
    const formatPrice = (usdVal) => {
        let rawUsd = 0;
        if (typeof usdVal === "number") {
            rawUsd = usdVal;
        }
        else {
            rawUsd = parseFloat(String(usdVal).replace(/[^0-9.]/g, "")) || 0;
        }
        const converted = rawUsd * currencyRates[currency].rate;
        const symbol = currencyRates[currency].symbol;
        if (currency === "INR") {
            return `${symbol}${converted.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;
        }
        return `${symbol}${converted.toFixed(2)}`;
    };
    const [productTypeSegment, setProductTypeSegment] = useState("all");
    const [catalogueSearch, setCatalogueSearch] = useState("");
    const [selectedCatFilter, setSelectedCatFilter] = useState("All");
    const [isAddProductOpen, setIsAddProductOpen] = useState(false);
    // Add Brochure Multi-Step Wizard State (Step 1: Upload PDF -> Step 2: Review AI Details & Save)
    const [isAddBrochureOpen, setIsAddBrochureOpen] = useState(false);
    const [brochureStep, setBrochureStep] = useState(1);
    const [isAnalyzingPdf, setIsAnalyzingPdf] = useState(false);
    const [brochureData, setBrochureData] = useState({
        name: "",
        shortDesc: "",
        category: "Brush Cutter",
        price: "B2B Quote / Enquiry",
        image: "",
        galleryImages: [],
        hologramVideo: "",
        pdfFile: "",
        pdfFileName: "",
        highlights: [],
        specs: {},
    });
    const handleOpenAddBrochure = () => {
        setBrochureStep(1);
        setBrochureData({
            name: "",
            shortDesc: "",
            category: "Brush Cutter",
            price: "B2B Quote / Enquiry",
            image: "",
            galleryImages: [],
            hologramVideo: "",
            pdfFile: "",
            pdfFileName: "",
            highlights: [],
            specs: {},
        });
        setIsAddBrochureOpen(true);
    };
    const handleAnalyzePdfBrochure = async (pdfName) => {
        setIsAnalyzingPdf(true);
        await new Promise((res) => setTimeout(res, 1200));
        const companyBrand = user?.businessName || "George Maijo Agri";
        const extractedData = ProductPdfIntelligenceModel.analyzePdfBrochure(pdfName, brochureData.name, companyBrand);
        let autoImage = extractedData.image || "";
        if (!autoImage) {
            const lower = pdfName.toLowerCase();
            if (lower.includes("4sp") || lower.includes("brush_cutter_4sp_pr")) {
                autoImage = "/assets/brochures/brush_cutter_4sp_pr_page_1_img_1.png";
            }
            else if (lower.includes("bc_520") || lower.includes("bc-520")) {
                autoImage = "https://www.georgemaijoagri.com/wp-content/uploads/2024/10/2.5.BC-520@2x.png";
            }
            else if (lower.includes("m700")) {
                autoImage = "/assets/brochures/brush_cutter_4sp_pr_page_1_img_1.png";
            }
            else if (lower.includes("m800")) {
                autoImage = "/assets/brochures/brush_cutter_4sp_pr_page_1_img_1.png";
            }
            else {
                autoImage = "https://www.georgemaijoagri.com/wp-content/uploads/2024/10/2.5.BC-520@2x.png";
            }
        }
        setBrochureData(prev => ({
            ...prev,
            name: extractedData.name || prev.name,
            category: extractedData.category || prev.category,
            shortDesc: extractedData.shortDesc || prev.shortDesc,
            image: autoImage || prev.image,
            highlights: extractedData.highlights,
            specs: extractedData.specs,
            pdfFileName: pdfName
        }));
        setIsAnalyzingPdf(false);
        setBrochureStep(2);
        return extractedData;
    };
    const handleSaveAddBrochure = async (e) => {
        e.preventDefault();
        if (!brochureData.name.trim() || !brochureData.shortDesc.trim()) {
            alert("Please provide Product Name and Short Description.");
            return;
        }
        const newProdId = `prod_brochure_${Date.now()}`;
        const generatedSku = `GM-${brochureData.name.toUpperCase().replace(/[^A-Z0-9]/g, "-").slice(0, 8)}-${Math.floor(100 + Math.random() * 900)}`;
        const companyBrand = user?.businessName || "George Maijo Agri";
        const pdfDocName = brochureData.pdfFileName || `${brochureData.name.toLowerCase().replace(/[^a-z0-9]/g, "_")}_brochure.pdf`;
        // Ensure rich default specs if none were extracted yet
        const finalSpecs = Object.keys(brochureData.specs || {}).length > 0 ? brochureData.specs : {
            "Model Name": brochureData.name.trim(),
            "Category": brochureData.category,
            "Brand Manufacturer": companyBrand,
            "Engine Specs": "Commercial 4-Stroke Air-Cooled Heavy Duty Engine",
            "Operating Power": "7.0 HP / 5.2 kW Output",
            "Working Capacity": "High Throughput Field Performance",
            "Brochure Spec Document": pdfDocName
        };
        const finalHighlights = (brochureData.highlights || []).length > 0 ? brochureData.highlights : [
            "Heavy-duty commercial grade industrial construction",
            "High efficiency fuel combustion & low emissions",
            "ISO 9001 certified George Maijo quality assurance"
        ];
        const newProduct = {
            id: newProdId,
            name: brochureData.name.trim(),
            sku: generatedSku,
            price: "B2B Quote",
            variants: "Single Variant",
            category: brochureData.category,
            brand: companyBrand,
            brochure: pdfDocName,
            stock: 50,
            description: brochureData.shortDesc.trim(),
            image: brochureData.image.trim() || "https://www.georgemaijoagri.com/wp-content/uploads/2024/10/2.5.BC-520@2x.png",
            galleryImages: brochureData.galleryImages,
            hologramVideo: brochureData.hologramVideo,
            highlights: finalHighlights,
            specs: finalSpecs
        };
        // Trigger continuous AI self-training on the new brochure & confirmed specs
        ProductPdfIntelligenceModel.selfTrainOnNewBrochure(pdfDocName, newProduct.name, newProduct.category, finalSpecs, finalHighlights, companyBrand);
        setProducts(prev => {
            const updated = [newProduct, ...prev];
            if (typeof window !== "undefined") {
                localStorage.setItem("sellgrow_catalog_products", JSON.stringify(updated));
                window.dispatchEvent(new Event("storage"));
            }
            return updated;
        });
        try {
            await fetch("/api/admin/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: newProduct.id,
                    name: newProduct.name,
                    category: newProduct.category,
                    brand: newProduct.brand,
                    shortDesc: newProduct.description,
                    price: newProduct.price,
                    stock: newProduct.stock,
                    image: newProduct.image,
                    brochure: newProduct.brochure,
                    sku: newProduct.sku,
                    highlights: newProduct.highlights,
                    specs: newProduct.specs
                }),
            });
            // Trigger Continuous Self-Training Loop for Brochure AI Model!
            ProductPdfIntelligenceModel.selfTrainOnNewBrochure(newProduct.brochure, newProduct.name, newProduct.category, finalSpecs, finalHighlights, companyBrand);
            await fetch("/api/admin/brochure-ai", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    action: "self-train",
                    fileName: newProduct.brochure,
                    productName: newProduct.name,
                    category: newProduct.category,
                    specs: finalSpecs,
                    highlights: finalHighlights,
                    brand: companyBrand
                })
            });
        }
        catch (err) { }
        setIsAddBrochureOpen(false);
        alert(`📄 Product Brochure for "${newProduct.name}" saved!\n\n🧠 Brochure AI Model self-trained on "${pdfDocName}" with ${Object.keys(finalSpecs).length} verified spec rows under ${companyBrand}!`);
    };
    // Product Details & Edit Modal State
    const [selectedDetailProduct, setSelectedDetailProduct] = useState(null);
    const [editProductData, setEditProductData] = useState({});
    const handleOpenProductDetails = (prod) => {
        setSelectedDetailProduct(prod);
        setEditProductData({ ...prod });
    };
    const handleSaveProductEdit = async (e) => {
        e.preventDefault();
        if (!selectedDetailProduct || !editProductData.name)
            return;
        const updatedProduct = {
            ...selectedDetailProduct,
            ...editProductData,
            name: editProductData.name.trim(),
            price: editProductData.price?.trim() || selectedDetailProduct.price,
            category: editProductData.category || selectedDetailProduct.category,
            description: editProductData.description?.trim() || selectedDetailProduct.description,
            image: editProductData.image?.trim() || selectedDetailProduct.image,
            stock: Number(editProductData.stock) || selectedDetailProduct.stock,
            sku: editProductData.sku?.trim() || selectedDetailProduct.sku,
            brochure: editProductData.brochure?.trim() || selectedDetailProduct.brochure,
        };
        setProducts((prev) => {
            const updated = prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p));
            if (typeof window !== "undefined") {
                localStorage.setItem("sellgrow_catalog_products", JSON.stringify(updated));
                window.dispatchEvent(new Event("storage"));
            }
            return updated;
        });
        try {
            await fetch("/api/admin/products", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: updatedProduct.id,
                    name: updatedProduct.name,
                    category: updatedProduct.category,
                    shortDesc: updatedProduct.description,
                    price: updatedProduct.price,
                    stock: updatedProduct.stock,
                    image: updatedProduct.image,
                    sku: updatedProduct.sku,
                    brochure: updatedProduct.brochure,
                }),
            });
        }
        catch (err) { }
        setSelectedDetailProduct(null);
        alert(`Product "${updatedProduct.name}" details updated successfully!`);
    };
    // Shopping Cart State
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const handleAddToCart = (prod) => {
        setCartItems(prev => {
            const existing = prev.find(item => item.product.id === prod.id);
            if (existing) {
                return prev.map(item => item.product.id === prod.id ? { ...item, quantity: item.quantity + 1 } : item);
            }
            return [...prev, { product: prod, quantity: 1 }];
        });
    };
    const handleUpdateCartQty = (id, delta) => {
        setCartItems(prev => prev
            .map(item => {
            if (item.product.id === id) {
                const newQty = item.quantity + delta;
                return newQty > 0 ? { ...item, quantity: newQty } : null;
            }
            return item;
        })
            .filter(Boolean));
    };
    // New product form inputs
    const [prodName, setProdName] = useState("");
    const [prodSku, setProdSku] = useState("");
    const [prodPrice, setProdPrice] = useState("");
    const [prodCategory, setProdCategory] = useState("Dairy & Eggs");
    const [prodVariants, setProdVariants] = useState("Single Variant");
    const [prodBrochure, setProdBrochure] = useState("");
    const [prodStock, setProdStock] = useState("50");
    const [prodDesc, setProdDesc] = useState("");
    const [prodImage, setProdImage] = useState("");
    const [isSavingProd, setIsSavingProd] = useState(false);
    const [qrModalProduct, setQrModalProduct] = useState(null);
    // Fetch initial products from API if available (Demo accounts only)
    useEffect(() => {
        async function loadProducts() {
            const rawName = user?.businessName || "";
            const slug = rawName
                .toLowerCase()
                .trim()
                .replace(/[^a-z0-9]/g, "-")
                .replace(/-+/g, "-")
                .replace(/^-|-$/g, "");
            const isDemoAccount = !user || ["demo", "nomo", "apex", "retail-shop", "sellgrow"].includes(slug);
            // Registered companies start with their own clean catalog
            if (!isDemoAccount)
                return;
            try {
                const deletedStored = typeof window !== "undefined" ? localStorage.getItem("sellgrow_deleted_product_ids") : null;
                let deletedIds = [];
                if (deletedStored) {
                    try {
                        deletedIds = JSON.parse(deletedStored);
                    }
                    catch (e) { }
                }
                const res = await fetch("/api/admin/products");
                if (res.ok) {
                    const json = await res.json();
                    if (json.status === "success" && Array.isArray(json.data)) {
                        const apiProds = json.data
                            .filter((item) => !deletedIds.includes(item.id) && !deletedIds.includes(String(item._id)))
                            .map((item) => {
                            const nameLower = (item.name || "").toLowerCase();
                            const catLower = (item.category || "").toLowerCase();
                            const isRental = item.productType === "rental" ||
                                /maijo|brush|cutter|tiller|weeder|wm\s?\d|harvester|1100|1000|990|mahaveer|wanovax|ch110|prime/i.test(nameLower) ||
                                /rental|machinery|equipment|tools/i.test(catLower);
                            const type = isRental ? "rental" : "grocery";
                            const priceStr = item.price || "$12.50";
                            return {
                                id: item.id || String(item._id),
                                name: item.name,
                                sku: item.id?.toUpperCase() || `SKU-${Math.floor(1000 + Math.random() * 9000)}`,
                                price: priceStr,
                                rentalRate: isRental ? `${priceStr} / Day` : undefined,
                                variants: item.variants || "Single Variant",
                                category: item.category || (isRental ? "Rental Tools" : "General Retail"),
                                brochure: `${item.name.toLowerCase().replace(/[^a-z0-9]/g, "_")}_brochure.pdf`,
                                stock: item.stock || 50,
                                description: item.shortDesc || item.fullDesc || (isRental ? "Heavy agricultural equipment for field operations." : "High quality retail product."),
                                image: item.image || "https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?w=600&auto=format&fit=crop&q=80",
                                productType: type,
                                totalSales: isRental ? `$${(parseFloat(priceStr.replace(/[^0-9.]/g, "")) * 100).toFixed(2)} (100 Days Rented)` : item.totalSales || priceStr
                            };
                        });
                        setProducts(apiProds);
                    }
                }
            }
            catch (e) { }
        }
        loadProducts();
    }, [user]);
    const handleCreateProduct = async (e) => {
        e.preventDefault();
        if (!prodName.trim()) {
            alert("Please provide a Product Name.");
            return;
        }
        setIsSavingProd(true);
        const generatedSku = prodSku.trim() || `SKU-${Math.floor(100000 + Math.random() * 900000)}`;
        const companyBrand = user?.businessName || "George Maijo Agri";
        const newProduct = {
            id: `prod_${Date.now()}`,
            name: prodName.trim(),
            sku: generatedSku,
            price: "B2B Quote",
            variants: prodVariants,
            category: prodCategory,
            brand: companyBrand,
            brochure: prodBrochure.trim() || `${prodName.toLowerCase().replace(/[^a-z0-9]/g, "_")}_spec.pdf`,
            stock: parseInt(prodStock) || 10,
            description: prodDesc.trim() || "No description provided.",
            image: prodImage.trim() || "https://www.georgemaijoagri.com/wp-content/uploads/2024/10/2.5.BC-520@2x.png"
        };
        try {
            await fetch("/api/admin/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: newProduct.id,
                    name: newProduct.name,
                    category: newProduct.category,
                    brand: newProduct.brand,
                    shortDesc: newProduct.description,
                    price: newProduct.price,
                    variants: newProduct.variants,
                    stock: newProduct.stock,
                    image: newProduct.image
                })
            });
        }
        catch (e) { }
        setProducts(prev => {
            const updated = [newProduct, ...prev];
            if (typeof window !== "undefined") {
                localStorage.setItem("sellgrow_catalog_products", JSON.stringify(updated));
                window.dispatchEvent(new Event("storage"));
            }
            return updated;
        });
        setProdName("");
        setProdSku("");
        setProdPrice("");
        setProdDesc("");
        setProdImage("");
        setProdCategory("Dairy & Eggs");
        setProdVariants("Single Variant");
        setProdBrochure("");
        setProdStock("50");
        setIsSavingProd(false);
        setIsAddProductOpen(false);
        alert(`Product "${newProduct.name}" created successfully and added to Catalogue!`);
    };
    const handleDeleteProduct = async (id, name) => {
        if (!confirm(`Are you sure you want to delete "${name}" from the product catalogue?`))
            return;
        try {
            await fetch(`/api/admin/products?id=${id}`, { method: "DELETE" });
        }
        catch (e) { }
        // 1. Remove from local products list
        setProducts(prev => {
            const updated = prev.filter(p => p.id !== id);
            if (typeof window !== "undefined") {
                localStorage.setItem("sellgrow_catalog_products", JSON.stringify(updated));
            }
            return updated;
        });
        // 2. Add to deleted product IDs list to remove from main public product page
        if (typeof window !== "undefined") {
            try {
                const deletedStored = localStorage.getItem("sellgrow_deleted_product_ids");
                let deletedIds = deletedStored ? JSON.parse(deletedStored) : [];
                if (!deletedIds.includes(id)) {
                    deletedIds.push(id);
                }
                localStorage.setItem("sellgrow_deleted_product_ids", JSON.stringify(deletedIds));
                window.dispatchEvent(new Event("storage"));
            }
            catch (e) { }
        }
    };
    const filteredProducts = products.filter(p => {
        const matchesSegment = productTypeSegment === "all" || (p.productType || "grocery") === productTypeSegment;
        const matchesSearch = p.name.toLowerCase().includes(catalogueSearch.toLowerCase()) || p.sku.toLowerCase().includes(catalogueSearch.toLowerCase());
        const matchesCategory = selectedCatFilter === "All"
            ? true
            : selectedCatFilter === "George Maijo"
                ? /maijo|george|bc\s?\d|wm\s?\d|wanovax|mahaveer|5pr|7pr|ktm/i.test(p.name) || /maijo|rental/i.test(p.category || "")
                : p.category === selectedCatFilter;
        return matchesSegment && matchesSearch && matchesCategory;
    });
    const cartTotalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const cartTotalAmount = cartItems.reduce((acc, item) => {
        const rawP = parseFloat(item.product.price.replace(/[^0-9.]/g, "")) || 0;
        return acc + rawP * item.quantity;
    }, 0);
    // Redirect if not authenticated or redirect to /[companySlug]/dashboard
    useEffect(() => {
        if (!authLoading) {
            if (!user) {
                router.push("/login");
            }
            else if (user.businessName) {
                const slug = user.businessName
                    .toLowerCase()
                    .trim()
                    .replace(/[^a-z0-9]/g, "-")
                    .replace(/-+/g, "-")
                    .replace(/^-|-$/g, "");
                if (slug && typeof window !== "undefined" && window.location.pathname === "/dashboard") {
                    router.replace(`/${slug}/dashboard`);
                }
            }
        }
    }, [user, authLoading, router]);
    // Voice synth helper
    const speak = (text) => {
        if (typeof window !== "undefined" && window.speechSynthesis) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.onstart = () => setIsVoiceSpeaking(true);
            utterance.onend = () => setIsVoiceSpeaking(false);
            utterance.onerror = () => setIsVoiceSpeaking(false);
            window.speechSynthesis.speak(utterance);
        }
    };
    const handleStartVoiceCall = () => {
        setVoiceCallState("ringing");
        setVoiceTranscripts([]);
        setTimeout(() => {
            setVoiceCallState("active");
            const msg = "Welcome back Naveen. This is your AI voice agent dialer. I am ready to route communications.";
            setVoiceTranscripts([{ sender: "ai", text: msg }]);
            speak(msg);
        }, 1200);
    };
    const handleVoiceResponse = (userText, aiText) => {
        setVoiceTranscripts(prev => [...prev, { sender: "user", text: userText }]);
        setIsVoiceSpeaking(true);
        setTimeout(() => {
            setVoiceTranscripts(prev => [...prev, { sender: "ai", text: aiText }]);
            speak(aiText);
        }, 600);
    };
    const handleEndVoiceCall = () => {
        if (typeof window !== "undefined" && window.speechSynthesis) {
            window.speechSynthesis.cancel();
        }
        setVoiceCallState("ended");
        setIsVoiceSpeaking(false);
        setTimeout(() => setVoiceCallState("idle"), 2000);
    };
    // Add lead action
    const handleAddLead = (e) => {
        e.preventDefault();
        if (!newLeadName)
            return;
        const newLead = {
            id: Math.random().toString(),
            name: newLeadName,
            value: newLeadValue || "$1,000",
            probability: Math.floor(Math.random() * 50) + 50,
            coordinates: "12.9716° N, 77.5946° E",
            summary: "Newly simulated workspace registration from the pipeline creator.",
            stage: "incoming",
        };
        setLeads([...leads, newLead]);
        setNewLeadName("");
        setNewLeadValue("");
    };
    // Add workflow node
    const handleAddWorkflowNode = (e) => {
        e.preventDefault();
        if (!newNodeLabel)
            return;
        const node = {
            id: Math.random().toString(),
            type: newNodeType,
            label: newNodeLabel,
            details: newNodeDetails || "Custom workflow logic executed",
        };
        setWorkflowNodes([...workflowNodes, node]);
        setNewNodeLabel("");
        setNewNodeDetails("");
    };
    // Run semantic search query
    const handleRagSearch = (e) => {
        e.preventDefault();
        if (!ragQuery.trim())
            return;
        // Simulated RAG result lookup
        setTimeout(() => {
            let answer = "The vector query found matching chunks inside return_policy_v3.pdf. Standard refund allows 14 business days, assuming products are in pristine shipping condition.";
            let source = "return_policy_v3.pdf (Chunk #12)";
            let confidence = 0.94;
            const lowerQ = ragQuery.toLowerCase();
            if (lowerQ.includes("manual") || lowerQ.includes("charger") || lowerQ.includes("ev")) {
                answer = "Found inside ev_charger_manual.docx: Connecting EV chargers requires checking the rated output (22kW). Secure installation relies on direct grid grounding and 3-phase grid infrastructure compatibility.";
                source = "ev_charger_manual.docx (Chunk #85)";
                confidence = 0.89;
            }
            else if (lowerQ.includes("arabic") || lowerQ.includes("translation")) {
                answer = "Found matching rows in faq_list_arabic.xlsx: Multi-language mapping matches LTR and RTL phrases dynamically for translation.";
                source = "faq_list_arabic.xlsx (Row #5)";
                confidence = 0.91;
            }
            setRagResult({ answer, confidence, source });
        }, 400);
    };
    // Send Chat message (Inbox)
    const handleSendInboxMessage = (e) => {
        e.preventDefault();
        if (!inboxInput.trim())
            return;
        const msgText = inboxInput;
        setChatMessages(prev => ({
            ...prev,
            [selectedChat]: [...prev[selectedChat], { sender: "agent", text: msgText }],
        }));
        setInboxInput("");
        // Simulated client response
        setTimeout(() => {
            setChatMessages(prev => ({
                ...prev,
                [selectedChat]: [...prev[selectedChat], { sender: "client", text: "Got it! Thanks for the support." }],
            }));
        }, 1000);
    };
    // Shift Lead Stage
    const shiftLeadStage = (leadId, direction) => {
        const stages = ["incoming", "meeting", "proposal", "closed"];
        setLeads(leads.map((l) => {
            if (l.id !== leadId)
                return l;
            const currIdx = stages.indexOf(l.stage);
            let newIdx = direction === "next" ? currIdx + 1 : currIdx - 1;
            if (newIdx >= 0 && newIdx < stages.length) {
                return { ...l, stage: stages[newIdx] };
            }
            return l;
        }));
    };
    if (authLoading || !user) {
        return (<div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#070b13]">
        <div className="text-center space-y-4">
          <Activity className="w-10 h-10 animate-spin text-primary mx-auto"/>
          <p className="text-sm font-semibold text-muted-foreground">Authenticating instance...</p>
        </div>
      </div>);
    }
    return (<div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#060a12] transition-colors duration-300">
      
      {/* Top Header Controls */}
      <header className="h-20 border-b border-border bg-white dark:bg-[#0c1220] flex items-center justify-between px-6 sticky top-0 z-40 shadow-sm">
        <div className="flex items-center gap-3">
          {/* Increased SellGrow Main Logo Size */}
          <Logo className="w-24 h-24 sm:w-28 sm:h-28 transition-transform hover:scale-105"/>
          <span className="text-[11px] bg-primary/10 text-primary px-2.5 py-1 rounded-lg font-mono font-bold border border-primary/20">
            Enterprise OS
          </span>
        </div>

        {/* Global info and selectors */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2.5 text-right">
            {user?.companyLogo ? (<div className="h-10 max-w-[150px] rounded-xl border border-border bg-white dark:bg-slate-900/80 p-1 flex items-center justify-center shadow-sm shrink-0">
                <img src={user.companyLogo} alt={user.businessName || "Company Logo"} className="max-h-full max-w-full w-auto h-auto object-contain"/>
              </div>) : (<div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 text-primary font-bold flex items-center justify-center text-xs shrink-0 font-display">
                {(user?.businessName || "SG").substring(0, 2).toUpperCase()}
              </div>)}
            <div className="flex flex-col text-right">
              <span className="text-xs font-bold text-foreground font-display">{user?.businessName || "NOMO"}</span>
              <span className="text-[10px] text-muted-foreground">{user?.businessType || "Retail Shop / Grocery"} Mode</span>
            </div>
          </div>

          <span className="w-px h-6 bg-border hidden sm:block"/>

          {/* Language Dropdown Select */}
          <div className="relative flex items-center">
            <Globe className="w-3.5 h-3.5 absolute left-2.5 text-muted-foreground pointer-events-none"/>
            <select value={language} onChange={(e) => setLanguage(e.target.value)} className="pl-8 pr-3 py-1.5 text-xs font-bold font-display rounded-xl border border-border bg-card text-foreground focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer hover:border-primary/50 transition-colors" aria-label="Select Language">
              <option value="en">English (EN)</option>
              <option value="hi">Hindi (हिन्दी)</option>
              <option value="ar">Arabic (العربية)</option>
              <option value="ta">Tamil (தமிழ்)</option>
            </select>
          </div>

          {/* Currency Dropdown Select (USD to INR / EUR / GBP / AED) */}
          <div className="relative flex items-center">
            <span className="absolute left-2.5 text-xs font-extrabold text-primary pointer-events-none flex items-center justify-center">
              {currencyRates[currency]?.symbol || "$"}
            </span>
            <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="pl-7 pr-3 py-1.5 text-xs font-bold font-display rounded-xl border border-border bg-card text-foreground focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer hover:border-primary/50 transition-colors" aria-label="Select Currency">
              <option value="USD">USD ($)</option>
              <option value="INR">INR (₹)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="AED">AED (د.إ)</option>
            </select>
          </div>

          <button onClick={logout} className="p-1.5 rounded-lg hover:bg-red-500/10 text-muted-foreground hover:text-red-500 transition-colors flex items-center gap-1.5 text-xs font-semibold" aria-label="Logout button">
            <LogOut className="w-4 h-4"/>
            <span className="hidden md:inline">Log Out</span>
          </button>
        </div>
      </header>

      {/* Main Workspace Body */}
      <div className="flex-grow flex flex-col md:flex-row">
        
        {/* Navigation Sidebar */}
        <aside className="w-full md:w-64 lg:w-72 border-b md:border-b-0 md:border-r border-slate-200/80 dark:border-slate-800/80 bg-white/95 dark:bg-[#0c1220]/95 backdrop-blur-md p-4 flex flex-col justify-between shrink-0 shadow-sm transition-all duration-300">
          <div className="space-y-5 overflow-y-auto max-h-[calc(100vh-5rem)] custom-scrollbar pr-0.5">
            {/* User Profile Header Card */}
            <div className="p-3 bg-slate-50/80 dark:bg-slate-900/60 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-xs flex items-center justify-between group hover:border-primary/30 transition-all">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="relative shrink-0">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 text-white font-bold flex items-center justify-center text-xs shadow-sm ring-2 ring-primary/20">
                    {(user?.name || "Naveen S").split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)}
                  </div>
                </div>
                <div className="overflow-hidden">
                  <p className="text-xs font-bold text-slate-900 dark:text-slate-100 leading-tight truncate">{user?.name || "Naveen S"}</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="inline-flex items-center px-1.5 py-0.2 text-[9px] font-semibold tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 rounded-md border border-indigo-200/60 dark:border-indigo-800/40 uppercase">
                      {user?.role || "Master Admin"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Featured Mode: Unified All-in-One Area */}
            <div>
              <button onClick={() => {
            setActiveTab("all_in_one");
            if (voiceCallState === "active")
                handleEndVoiceCall();
        }} className={`w-full relative flex items-center justify-between p-3 rounded-2xl text-xs font-bold transition-all duration-200 border ${activeTab === "all_in_one"
            ? "bg-gradient-to-r from-amber-500 via-orange-500 to-indigo-600 text-white border-amber-400/40 shadow-md shadow-amber-500/20"
            : "bg-gradient-to-r from-amber-500/10 via-indigo-500/10 to-blue-500/10 hover:from-amber-500/20 hover:to-indigo-500/20 text-slate-800 dark:text-slate-200 border-amber-500/20 dark:border-amber-400/20 hover:border-amber-400/40"}`}>
                <div className="flex items-center gap-2.5">
                  <div className={`p-1.5 rounded-lg ${activeTab === "all_in_one" ? "bg-white/20 text-white" : "bg-amber-500/20 text-amber-600 dark:text-amber-400"}`}>
                    <Sparkles className="w-4 h-4 animate-pulse"/>
                  </div>
                  <div className="text-left">
                    <span className="block text-xs font-bold leading-tight">Unified All-in-One</span>
                    <span className={`text-[10px] font-medium ${activeTab === "all_in_one" ? "text-amber-100" : "text-slate-500 dark:text-slate-400"}`}>Single Workspace Area</span>
                  </div>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${activeTab === "all_in_one"
            ? "bg-white/20 text-white border border-white/20"
            : "bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30"}`}>
                  8-in-1
                </span>
              </button>
            </div>

            {/* Categorized Navigation List */}
            <nav className="space-y-4">
              {[
            {
                section: "CORE WORKSPACE",
                items: [
                    { id: "overview", icon: LayoutDashboard, label: "Dashboard" },
                ]
            },
            {
                section: "BUSINESS & OPERATIONS",
                items: [
                    { id: "catalogue", icon: FolderTree, label: "Product Catalog", badge: `${products.length} Items` },
                    { id: "crm", icon: TrendingUp, label: "Sales CRM", badge: "Leads" },
                    { id: "services", icon: Cpu, label: "Services", badge: "11 Live", badgeColor: "emerald" },
                ]
            },
            {
                section: "ADMINISTRATION",
                items: [
                    { id: "sub_admin", icon: Users, label: "Sub Admin", badge: "Team" },
                    { id: "control_flags", icon: Sliders, label: "Control Flags", badge: "Live" },
                    { id: "client_data", icon: UserCheck, label: "Client Data" },
                    { id: "payment", icon: CreditCard, label: "Payment & Billing" },
                ]
            },
            {
                section: "PREFERENCES",
                items: [
                    { id: "setting", icon: Settings, label: "Settings" },
                    { id: "my_profile", icon: User, label: "My Profile" },
                ]
            }
        ].map((group) => (<div key={group.section} className="space-y-1">
                  <div className="px-3 py-1">
                    <span className="text-[10px] font-extrabold tracking-wider text-slate-400 dark:text-slate-500 uppercase">
                      {group.section}
                    </span>
                  </div>
                  {group.items.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (<button key={tab.id} onClick={() => {
                        setActiveTab(tab.id);
                        if (voiceCallState === "active")
                            handleEndVoiceCall();
                    }} className={`w-full group flex items-center justify-between px-3 py-2 text-xs rounded-xl font-semibold transition-all duration-200 border ${isActive
                        ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-700 border-indigo-500 text-white shadow-md shadow-indigo-500/20 font-bold translate-x-0.5"
                        : "border-transparent text-slate-600 dark:text-slate-300 hover:bg-slate-100/80 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white hover:translate-x-0.5"}`}>
                        <div className="flex items-center gap-2.5">
                          <Icon className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${isActive
                        ? "text-white"
                        : "text-slate-400 dark:text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400"}`}/>
                          <span>{tab.label}</span>
                        </div>
                        {tab.badge && (<span className={`text-[10px] px-2 py-0.5 rounded-full font-medium tracking-tight border ${isActive
                            ? "bg-white/20 text-white border-white/20 backdrop-blur-sm"
                            : tab.badgeColor === "emerald"
                                ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border-emerald-200/60 dark:border-emerald-800/40"
                                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200/60 dark:border-slate-700/60 group-hover:border-indigo-200 dark:group-hover:border-indigo-800/50"}`}>
                            {tab.badge}
                          </span>)}
                      </button>);
            })}
                </div>))}
            </nav>
          </div>

          {/* System Footer Card */}
          <div className="mt-6 pt-3 border-t border-slate-200/60 dark:border-slate-800/60 hidden md:block">
            <div className="p-3 bg-slate-50/80 dark:bg-slate-900/60 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-semibold">
                <span className="flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-slate-700 dark:text-slate-300">All Systems Live</span>
                </span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono font-bold">
                  v3.0.0
                </span>
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 flex justify-between pt-1 border-t border-slate-200/50 dark:border-slate-800/50 font-medium">
                <span>Cloud Multi-Tenant</span>
                <span className="font-mono text-[9px]">US-East / EU / IN</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Dynamic Panel Content */}
        <main className="flex-grow p-6 overflow-y-auto max-w-7xl mx-auto w-full space-y-12">
          
          {/* Quick-Jump Anchor Bar when viewing in Single Unified Area mode */}
          {activeTab === "all_in_one" && (<div className="sticky top-0 z-30 bg-card/95 backdrop-blur-md p-3 rounded-2xl border border-primary/30 shadow-lg flex flex-wrap items-center justify-between gap-3 animate-fadeIn">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary animate-pulse"/>
                <span className="text-xs font-bold text-foreground font-display">Single Unified Area (All 8 Modules Active)</span>
              </div>
              <div className="flex flex-wrap gap-1.5 text-xs font-semibold">
                <a href="#sec-overview" className="px-2.5 py-1 bg-primary/10 text-primary rounded-lg hover:bg-primary hover:text-white transition-all">📊 Dashboard</a>
                <a href="#sec-catalogue" className="px-2.5 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-lg hover:bg-emerald-500 hover:text-white transition-all">📦 Catalogue</a>
                <a href="#sec-crm" className="px-2.5 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-500 hover:text-white transition-all">📈 Sales CRM</a>
                <a href="#sec-inbox" className="px-2.5 py-1 bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-lg hover:bg-purple-500 hover:text-white transition-all">💬 Inbox</a>
                <a href="#sec-voice" className="px-2.5 py-1 bg-pink-500/10 text-pink-600 dark:text-pink-400 rounded-lg hover:bg-pink-500 hover:text-white transition-all">🎙️ AI Voice</a>
                <a href="#sec-workflow" className="px-2.5 py-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-lg hover:bg-amber-500 hover:text-white transition-all">⚡ Workflows</a>
                <a href="#sec-rag" className="px-2.5 py-1 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-lg hover:bg-indigo-500 hover:text-white transition-all">📚 RAG KB</a>
                <a href="#sec-analytics" className="px-2.5 py-1 bg-teal-500/10 text-teal-600 dark:text-teal-400 rounded-lg hover:bg-teal-500 hover:text-white transition-all">📉 Analytics</a>
              </div>
            </div>)}

          {/* TAB 1: OVERVIEW */}
          {(activeTab === "overview" || activeTab === "all_in_one") && (<div id="sec-overview" className="space-y-6 animate-fade-in scroll-mt-20">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h1 className="text-2xl font-bold font-display text-foreground">{t("welcomeBack")}</h1>
                  <p className="text-xs text-muted-foreground">Unified Operations Dashboard control panel overview.</p>
                </div>
                <div className="text-xs bg-card border px-3 py-1.5 rounded-lg flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"/>
                  <span className="font-semibold">Simulated Real-Time Sandbox Active</span>
                </div>
              </div>

              {/* KPI Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                { icon: DollarSign, label: t("totalRevenue"), value: formatPrice(12450), trend: "+12% this month", color: "text-emerald-500 bg-emerald-500/10" },
                { icon: Users, label: t("activeLeads"), value: leads.length.toString(), trend: `${leads.filter(l => l.stage === "closed").length} Deals Closed`, color: "text-blue-500 bg-blue-500/10" },
                { icon: MessageCircle, label: t("unreadMessages"), value: "8 Conversations", trend: "WhatsApp, FB, Live Chat", color: "text-purple-500 bg-purple-500/10" },
                { icon: Sparkles, label: t("aiResolution"), value: "89.2%", trend: "142 Deflected Queries", color: "text-pink-500 bg-pink-500/10" },
            ].map((stat, idx) => {
                const Icon = stat.icon;
                return (<div key={idx} className="p-5 rounded-2xl border border-border bg-card shadow-sm space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground font-semibold">{stat.label}</span>
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${stat.color}`}>
                          <Icon className="w-4 h-4"/>
                        </div>
                      </div>
                      <div>
                        <p className="text-2xl font-extrabold font-display">{stat.value}</p>
                        <p className="text-[10px] text-muted-foreground mt-1">{stat.trend}</p>
                      </div>
                    </div>);
            })}
              </div>

              {/* Business Analytics Section (Matching user screenshot) */}
              <div className="pt-2 space-y-6">
                <div>
                  <h2 className="text-xl font-bold font-display text-foreground">Business Analytics</h2>
                  <p className="text-xs text-muted-foreground">Track ROI conversions, AI support logs, and VoIP reception stats.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left Card: Sales Performance Conversion ($) with AI Forecasting */}
                  <div className="p-6 rounded-3xl border border-border bg-card shadow-sm space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/50 pb-3">
                      <div>
                        <h3 className="text-sm font-bold font-display text-foreground flex items-center gap-1.5">
                          <TrendingUp className="w-4 h-4 text-emerald-500"/>
                          <span>Sales Performance Conversion ($)</span>
                        </h3>
                        <p className="text-[11px] text-muted-foreground mt-0.5">
                          AI Model Revenue Prediction & Sales Trajectory
                        </p>
                      </div>

                      {/* Month Selection Dropdown */}
                      <div className="flex items-center gap-1.5 shrink-0">
                        <Calendar className="w-3.5 h-3.5 text-primary shrink-0"/>
                        <select value={forecastMonth} onChange={(e) => setForecastMonth(e.target.value)} className="py-1 px-2.5 text-xs font-bold bg-slate-100 dark:bg-slate-900 border border-border rounded-xl text-foreground focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer hover:border-primary/50 transition-colors">
                          <option value="aug-2026">August 2026 (AI Forecast)</option>
                          <option value="sep-2026">September 2026 (AI Forecast)</option>
                          <option value="oct-2026">October 2026 (AI Forecast)</option>
                          <option value="jul-2026">July 2026 (Current Month)</option>
                        </select>
                      </div>
                    </div>

                    {/* AI Prediction Stats Banner */}
                    <div className="p-3 bg-gradient-to-r from-primary/10 via-teal-500/10 to-emerald-500/10 border border-primary/20 rounded-2xl flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-primary text-white flex items-center justify-center text-xs font-bold shadow-sm">
                          <Sparkles className="w-4 h-4"/>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground block">
                            AI Forecast ({activeForecast.forecastMonthName})
                          </span>
                          <span className="text-sm font-extrabold text-foreground font-mono">
                            {formatPrice(activeForecast.rawPredicted)}
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                          {activeForecast.growth} Projected
                        </span>
                        <span className="text-[10px] text-muted-foreground block mt-0.5">
                          {activeForecast.confidence} Model Confidence
                        </span>
                      </div>
                    </div>

                    {/* SVG Chart with AI Forecast Extension Line */}
                    <div className="relative h-48 w-full pt-2 flex flex-col justify-between">
                      <svg className="w-full h-32 overflow-visible" viewBox="0 0 400 130" preserveAspectRatio="none">
                        {/* Horizontal Grid Lines */}
                        <line x1="0" y1="20" x2="400" y2="20" stroke="currentColor" className="text-border/30" strokeWidth="1" strokeDasharray="3 3"/>
                        <line x1="0" y1="65" x2="400" y2="65" stroke="currentColor" className="text-border/30" strokeWidth="1" strokeDasharray="3 3"/>
                        <line x1="0" y1="110" x2="400" y2="110" stroke="currentColor" className="text-border/30" strokeWidth="1" strokeDasharray="3 3"/>

                        <defs>
                          <linearGradient id="sales-line-grad-ov" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#2563eb"/>
                            <stop offset="50%" stopColor="#0284c7"/>
                            <stop offset="100%" stopColor="#10b981"/>
                          </linearGradient>
                          <linearGradient id="sales-fill-grad-ov" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#10b981" stopOpacity="0.12"/>
                            <stop offset="100%" stopColor="#2563eb" stopOpacity="0"/>
                          </linearGradient>
                        </defs>

                        {/* Area Fill */}
                        <path d="M 10 100 C 60 90, 110 50, 160 55 C 220 60, 270 35, 290 28 L 390 10 L 390 120 L 10 120 Z" fill="url(#sales-fill-grad-ov)"/>

                        {/* Actual Historical Line */}
                        <path d={activeForecast.svgPathActual} fill="none" stroke="url(#sales-line-grad-ov)" strokeWidth="4" strokeLinecap="round"/>

                        {/* AI Predicted Dashed Line */}
                        {activeForecast.svgPathForecast && (<path d={activeForecast.svgPathForecast} fill="none" stroke="#10b981" strokeWidth="3.5" strokeDasharray="5 5" strokeLinecap="round"/>)}

                        {/* Current Month Point */}
                        <circle cx={activeForecast.endDotCx} cy={activeForecast.endDotCy} r="5" fill="#0284c7"/>

                        {/* AI Forecast Target Point */}
                        {forecastMonth !== "jul-2026" && (<g>
                            <circle cx={activeForecast.forecastDotCx} cy={activeForecast.forecastDotCy} r="7" fill="#10b981" className="animate-pulse"/>
                            <circle cx={activeForecast.forecastDotCx} cy={activeForecast.forecastDotCy} r="3" fill="#ffffff"/>
                          </g>)}
                      </svg>

                      {/* X-Axis Labels */}
                      <div className="flex justify-between text-xs font-semibold text-muted-foreground px-2 pt-2 border-t border-border/30">
                        {activeForecast.historicalMonths.map((m, idx) => (<span key={idx} className={m.includes("AI Forecast") ? "text-emerald-600 dark:text-emerald-400 font-bold" : ""}>
                            {m}
                          </span>))}
                      </div>
                    </div>
                  </div>

                  {/* Right Card: AI Helpdesk Deflection Rate (%) */}
                  <div className="p-6 rounded-3xl border border-border bg-card shadow-sm space-y-6">
                    <h3 className="text-sm font-bold font-display text-foreground">AI Helpdesk Deflection Rate (%)</h3>
                    
                    <div className="space-y-6 pt-2">
                      {[
                { chan: "WhatsApp Autoreply", val: 88, color: "from-blue-600 via-teal-500 to-emerald-500" },
                { chan: "Website Chatbot RAG", val: 92, color: "from-blue-600 via-teal-400 to-emerald-400" },
                { chan: "VoIP AI Receptionist", val: 78, color: "from-blue-700 via-teal-500 to-emerald-500" }
            ].map((bar, idx) => (<div key={idx} className="space-y-2">
                          <div className="flex justify-between items-center text-xs font-bold">
                            <span className="text-foreground font-display">{bar.chan}</span>
                            <span className="text-blue-600 dark:text-sky-400 font-mono font-extrabold">{bar.val}% Deflected</span>
                          </div>
                          <div className="w-full h-3 bg-slate-100 dark:bg-slate-800/80 rounded-full overflow-hidden p-0.5 border border-border/30">
                            <div className={`h-full bg-gradient-to-r ${bar.color} rounded-full transition-all duration-1000 ease-out shadow-sm`} style={{ width: `${bar.val}%` }}/>
                          </div>
                        </div>))}
                    </div>
                  </div>
                </div>
              </div>
            </div>)}

          {/* TAB 2: SALES CRM & SALESMAN TIME SCHEDULING */}
          {(activeTab === "crm" || activeTab === "all_in_one") && (<div id="sec-crm" className="space-y-6 animate-fade-in text-left pt-6 border-t border-border scroll-mt-20">

              <div className="relative overflow-hidden p-6 rounded-3xl bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#0f172a] border border-indigo-900/50 shadow-2xl">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:22px_22px] pointer-events-none"/>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent"/>
                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                  <div>
                    <div className="inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-wider px-3 py-1.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 mb-3">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"/>
                      CRM Operations Active
                    </div>
                    <h1 className="text-2xl lg:text-3xl font-extrabold font-display text-white leading-tight">
                      Sales CRM &amp; Duty Scheduling Console
                    </h1>
                    <p className="text-sm text-slate-400 mt-1.5 max-w-xl">
                      Manage sales pipeline deals, salesman duty shifts, client appointment slots, and real-time meeting logs.
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                    <button onClick={() => setIsAddLeadOpen(true)} className="px-4 py-2.5 bg-primary hover:opacity-90 text-white font-extrabold rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-primary/30 transition-all active:scale-95">
                      <Plus className="w-4 h-4"/> Add Lead
                    </button>
                    <button onClick={() => setIsAddSalesmanOpen(true)} className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/15 font-extrabold rounded-xl text-xs flex items-center gap-2 backdrop-blur-sm transition-all">
                      <UserPlus className="w-4 h-4"/> Sales Rep
                    </button>
                    <button onClick={() => {
                if (leads.length > 0)
                    setDemoSelectedLeadId(leads[0].id);
                if (salesReps.length > 0)
                    setDemoSelectedRepId(salesReps[0].id);
                setIsScheduleDemoOpen(true);
            }} className="px-4 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 hover:opacity-95 text-white font-extrabold rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/25 transition-all active:scale-95">
                      <Calendar className="w-4 h-4"/> Schedule Demo Member
                    </button>
                  </div>
                </div>
              </div>

              {/* ── 4 KPI Stat Cards ── */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                {
                    label: "Pipeline Total Value",
                    value: formatPrice(leads.reduce((acc, l) => acc + (parseFloat(l.value.replace(/[^0-9.]/g, "")) || 0), 0)),
                    sub: "Active pipeline",
                    icon: DollarSign, accent: "bg-emerald-500",
                    iconBg: "bg-emerald-500/10 text-emerald-500", subColor: "text-emerald-500",
                    hoverBorder: "hover:border-emerald-500/40",
                },
                {
                    label: "Active Deals",
                    value: leads.length,
                    sub: "Accounts in pipeline",
                    icon: TrendingUp, accent: "bg-blue-500",
                    iconBg: "bg-blue-500/10 text-blue-500", subColor: "text-blue-500",
                    hoverBorder: "hover:border-blue-500/40",
                },
                {
                    label: "Sales Reps On Duty",
                    value: salesReps.length,
                    sub: "Team Reps active",
                    icon: Users, accent: "bg-purple-500",
                    iconBg: "bg-purple-500/10 text-purple-500", subColor: "text-emerald-500",
                    hoverBorder: "hover:border-purple-500/40",
                },
                {
                    label: "Booked Demo Schedules",
                    value: salesSchedules.length,
                    sub: "Sessions scheduled",
                    icon: Calendar, accent: "bg-amber-500",
                    iconBg: "bg-amber-500/10 text-amber-500", subColor: "text-amber-500",
                    hoverBorder: "hover:border-amber-500/40",
                },
            ].map((card, i) => {
                const Icon = card.icon;
                return (<div key={i} className={`relative overflow-hidden p-5 rounded-2xl bg-card border border-border shadow-sm group ${card.hoverBorder} transition-all duration-300`}>
                      <div className={`absolute top-0 left-0 bottom-0 w-1 rounded-l-2xl ${card.accent}`}/>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">{card.label}</span>
                        <div className={`w-9 h-9 rounded-xl ${card.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                          <Icon className="w-4 h-4"/>
                        </div>
                      </div>
                      <p className="text-2xl font-extrabold text-foreground font-display leading-none">{card.value}</p>
                      <p className={`text-[10px] font-bold mt-2 ${card.subColor}`}>↑ {card.sub}</p>
                    </div>);
            })}
              </div>

              {/* ── Sub Navigation Tabs ── */}
              <div className="flex items-center gap-1.5 p-1.5 bg-slate-100 dark:bg-slate-900/80 rounded-2xl border border-border flex-wrap">
                {[
                { id: "pipeline", icon: TrendingUp, label: "Lead Deals & Pipeline", count: leads.length, gradient: "from-primary to-indigo-600" },
                { id: "salesmen", icon: Briefcase, label: "Sales Team Roster", count: salesReps.length, gradient: "from-blue-600 to-cyan-500" },
                { id: "schedules", icon: Calendar, label: "Booked Demos & Schedules", count: salesSchedules.length, gradient: "from-emerald-600 to-teal-600" },
                { id: "enquiries", icon: FolderTree, label: "Client Enquiries & AI Data", count: clientEnquiries.length, gradient: "from-purple-600 to-violet-600" },
            ].map((tab) => {
                const Icon = tab.icon;
                const active = crmSubTab === tab.id;
                return (<button key={tab.id} onClick={() => setCrmSubTab(tab.id)} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 ${active
                        ? `bg-gradient-to-r ${tab.gradient} text-white shadow-md`
                        : "text-muted-foreground hover:text-foreground hover:bg-white dark:hover:bg-slate-800"}`}>
                      <Icon className="w-3.5 h-3.5 shrink-0"/>
                      <span className="hidden sm:inline">{tab.label}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-extrabold ${active ? "bg-white/20 text-white" : "bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400"}`}>{tab.count}</span>
                    </button>);
            })}
              </div>

              {/* ═══════════════════════════════════════════════ */}
              {/* SUB TAB 1: PIPELINE LEADS KANBAN               */}
              {/* ═══════════════════════════════════════════════ */}
              {crmSubTab === "pipeline" && (<div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {["incoming", "meeting", "proposal", "closed"].map((stage) => {
                    const stageLeads = leads.filter((l) => l.stage === stage);
                    const cfg = {
                        incoming: { label: "Incoming Lead", dot: "bg-blue-500", headerBg: "bg-blue-500/[0.05]", border: "border-blue-500/20", text: "text-blue-600 dark:text-blue-400" },
                        meeting: { label: "Meeting Scheduled", dot: "bg-amber-500", headerBg: "bg-amber-500/[0.05]", border: "border-amber-500/20", text: "text-amber-600 dark:text-amber-400" },
                        proposal: { label: "Proposal Sent", dot: "bg-purple-500", headerBg: "bg-purple-500/[0.05]", border: "border-purple-500/20", text: "text-purple-600 dark:text-purple-400" },
                        closed: { label: "Closed / Won", dot: "bg-emerald-500", headerBg: "bg-emerald-500/[0.05]", border: "border-emerald-500/20", text: "text-emerald-600 dark:text-emerald-400" },
                    };
                    const c = cfg[stage];
                    return (<div key={stage} className={`rounded-2xl border ${c.border} ${c.headerBg} min-h-[420px] flex flex-col`}>
                          <div className={`flex items-center justify-between px-4 py-3 border-b ${c.border}`}>
                            <div className="flex items-center gap-2">
                              <span className={`w-2.5 h-2.5 rounded-full ${c.dot}`}/>
                              <span className={`text-xs font-extrabold uppercase tracking-wider ${c.text}`}>{c.label}</span>
                            </div>
                            <span className={`text-[10px] font-mono font-extrabold px-2 py-0.5 rounded-full bg-white dark:bg-slate-900 border ${c.border} ${c.text}`}>{stageLeads.length}</span>
                          </div>
                          <div className="flex-1 p-3 space-y-3">
                            {stageLeads.length === 0 && (<div className="p-5 text-center text-xs text-muted-foreground border border-dashed border-border/50 rounded-xl mt-2">
                                No leads in this column
                              </div>)}
                            {stageLeads.map((lead) => {
                            const rawVal = parseFloat(lead.value.replace(/[^0-9.]/g, "")) || 0;
                            return (<div key={lead.id} onClick={() => setSelectedLead(lead)} className="p-4 rounded-2xl border border-border bg-white dark:bg-card shadow-sm hover:border-primary/40 hover:shadow-md cursor-pointer transition-all duration-200 space-y-3 group">
                                  <div className="flex items-start justify-between gap-2">
                                    <h4 className="text-xs font-extrabold text-foreground leading-snug font-display group-hover:text-primary transition-colors">{lead.name}</h4>
                                    <span className="text-xs text-emerald-500 font-extrabold font-mono shrink-0 bg-emerald-500/10 px-2 py-0.5 rounded-lg border border-emerald-500/20">{formatPrice(rawVal)}</span>
                                  </div>
                                  <div className="space-y-1">
                                    <div className="flex justify-between text-[10px] text-muted-foreground font-semibold">
                                      <span>Probability</span>
                                      <strong className="text-primary font-mono">{lead.probability}%</strong>
                                    </div>
                                    <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                      <div className="h-full bg-gradient-to-r from-primary to-indigo-500 rounded-full" style={{ width: `${lead.probability}%` }}/>
                                    </div>
                                  </div>
                                  <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed">{lead.summary}</p>
                                  {lead.scheduledTime && (<div className="px-2.5 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-[10px] font-bold flex items-center gap-1.5">
                                      <Clock className="w-3 h-3 shrink-0"/>
                                      <span className="truncate">Slot: {lead.scheduledTime}</span>
                                    </div>)}
                                  <div className="pt-2 border-t border-border/60 flex items-center justify-between">
                                    <button onClick={(e) => { e.stopPropagation(); setDemoSelectedLeadId(lead.id); setIsScheduleDemoOpen(true); }} className="px-2.5 py-1 rounded-lg bg-primary/10 text-primary text-[10px] font-extrabold hover:bg-primary hover:text-white transition-all flex items-center gap-1 active:scale-95">
                                      <Calendar className="w-3 h-3"/> Schedule
                                    </button>
                                    <div className="flex items-center gap-1">
                                      <button onClick={(e) => { e.stopPropagation(); shiftLeadStage(lead.id, "prev"); }} disabled={stage === "incoming"} className="px-2 py-1 text-[10px] font-bold border border-border rounded-lg disabled:opacity-20 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">◀</button>
                                      <button onClick={(e) => { e.stopPropagation(); shiftLeadStage(lead.id, "next"); }} disabled={stage === "closed"} className="px-2 py-1 text-[10px] font-bold border border-border rounded-lg disabled:opacity-20 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">▶</button>
                                    </div>
                                  </div>
                                </div>);
                        })}
                          </div>
                        </div>);
                })}
                  </div>

                  {/* Add Lead Form */}
                  <form onSubmit={handleAddLead} className="p-6 rounded-3xl border border-border bg-card shadow-sm space-y-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-extrabold font-display text-foreground flex items-center gap-2">
                          <span className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center"><Plus className="w-4 h-4"/></span>
                          Provision New Pipeline Lead
                        </h3>
                        <p className="text-[11px] text-muted-foreground mt-0.5 pl-9">Add prospective enterprise lead account directly to <span className="text-primary font-semibold">pipeline</span>.</p>
                      </div>
                      <button type="submit" className="px-5 py-2.5 bg-primary hover:opacity-90 text-white rounded-xl text-xs font-extrabold shadow-md flex items-center gap-1.5 transition-all active:scale-95">
                        <Plus className="w-4 h-4"/> Add Lead Account
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] text-muted-foreground font-extrabold uppercase tracking-wider" htmlFor="lead-name">Lead Account Name *</label>
                        <input id="lead-name" type="text" required placeholder="e.g. Saudi Distributors Co." value={newLeadName} onChange={(e) => setNewLeadName(e.target.value)} className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-border bg-background font-bold focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"/>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] text-muted-foreground font-extrabold uppercase tracking-wider" htmlFor="lead-value">Deal Value ($) *</label>
                        <input id="lead-value" type="text" required placeholder="e.g. 24000" value={newLeadValue} onChange={(e) => setNewLeadValue(e.target.value)} className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-border bg-background font-bold focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"/>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] text-muted-foreground font-extrabold uppercase tracking-wider">Initial Pipeline Stage</label>
                        <select value={leadStageInput} onChange={(e) => setLeadStageInput(e.target.value)} className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-border bg-background font-bold focus:outline-none focus:border-primary cursor-pointer">
                          <option value="incoming">Incoming Lead</option>
                          <option value="meeting">Meeting Scheduled</option>
                          <option value="proposal">Proposal Sent</option>
                          <option value="closed">Closed / Won</option>
                        </select>
                      </div>
                    </div>
                  </form>
                </div>)}

              {/* ═══════════════════════════════════════════════ */}
              {/* SUB TAB 2: SALES TEAM ROSTER                   */}
              {/* ═══════════════════════════════════════════════ */}
              {crmSubTab === "salesmen" && (<div className="space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
                    <div>
                      <h3 className="text-sm font-extrabold font-display text-foreground">Sales Representatives &amp; Team Roster</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">Manage sales rep shift times, contact phone numbers, and territory coverage.</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {salesReps.length > 0 && (<button onClick={clearAllSalesReps} className="px-3.5 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/30 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all">
                          <Trash2 className="w-3.5 h-3.5"/> Clear Data
                        </button>)}
                      <button onClick={() => setIsAddSalesmanOpen(true)} className="px-4 py-2 bg-gradient-to-r from-primary to-indigo-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 hover:opacity-90 transition-all shadow-md active:scale-95">
                        <UserPlus className="w-4 h-4"/> Add Sales Rep
                      </button>
                    </div>
                  </div>

                  {salesReps.length === 0 ? (<div className="p-14 text-center rounded-2xl bg-card border border-dashed border-border/80 space-y-4">
                      <div className="w-14 h-14 rounded-2xl bg-muted/60 flex items-center justify-center mx-auto"><User className="w-7 h-7 text-muted-foreground"/></div>
                      <div>
                        <h4 className="text-sm font-bold text-foreground">No Sales Representatives</h4>
                        <p className="text-xs text-muted-foreground max-w-sm mx-auto mt-1">Add a new sales rep to start assigning schedules and tracking duty shifts.</p>
                      </div>
                      <button onClick={() => setIsAddSalesmanOpen(true)} className="px-4 py-2 bg-primary text-white font-bold rounded-xl text-xs inline-flex items-center gap-1.5 shadow-md active:scale-95"><UserPlus className="w-4 h-4"/> Add Sales Rep</button>
                    </div>) : (<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {salesReps.map((rep) => (<div key={rep.id} className="group p-5 rounded-2xl border border-border bg-card shadow-sm hover:border-primary/30 hover:shadow-md transition-all duration-300 space-y-4">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-3.5">
                              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary to-indigo-600 text-white font-extrabold flex items-center justify-center text-sm shadow-md group-hover:scale-105 transition-transform shrink-0">{rep.avatar}</div>
                              <div>
                                <h4 className="text-sm font-extrabold text-foreground group-hover:text-primary transition-colors">{rep.name}</h4>
                                <p className="text-xs text-primary font-semibold">{rep.role}</p>
                                <p className="text-[10px] text-muted-foreground mt-0.5">📞 {rep.phone} &nbsp;·&nbsp; ✉️ {rep.email}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              <span className={`px-2.5 py-1 text-[10px] font-extrabold rounded-full border ${rep.status === "On Duty" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                            : rep.status === "In Client Meeting" ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30"
                                : "bg-slate-500/10 text-slate-500 border-slate-500/30"}`}>{rep.status}</span>
                              <button onClick={() => deleteSalesRep(rep.id)} className="p-1.5 rounded-lg hover:bg-rose-500/10 text-muted-foreground hover:text-rose-600 dark:hover:text-rose-400 transition-colors" title="Remove Sales Rep"><Trash2 className="w-3.5 h-3.5"/></button>
                            </div>
                          </div>
                          <div className="grid grid-cols-3 gap-2">
                            {[
                            { label: "Active Shift", val: rep.shift, color: "text-foreground" },
                            { label: "Territory", val: rep.territory, color: "text-foreground" },
                            { label: "Completed Today", val: `${rep.completedMeetingsToday} Meetings`, color: "text-emerald-500" },
                        ].map((stat, i) => (<div key={i} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-border/60 text-center">
                                <p className="text-[9px] text-muted-foreground uppercase tracking-wider font-bold">{stat.label}</p>
                                <p className={`font-extrabold text-[11px] mt-1 leading-tight truncate ${stat.color}`}>{stat.val}</p>
                              </div>))}
                          </div>
                        </div>))}
                    </div>)}
                </div>)}

              {/* ═══════════════════════════════════════════════ */}
              {/* SUB TAB 3: BOOKED DEMOS & SCHEDULES            */}
              {/* ═══════════════════════════════════════════════ */}
              {crmSubTab === "schedules" && (<div className="space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-card border border-border shadow-sm">
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0"><Calendar className="w-5 h-5"/></div>
                      <div>
                        <h3 className="text-base font-extrabold font-display text-foreground">Booked Client Demos &amp; Duty Schedules</h3>
                        <p className="text-xs text-muted-foreground mt-0.5">Track upcoming demo meetings, client appointments, and assigned sales representatives.</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {salesSchedules.length > 0 && (<button onClick={clearAllSchedules} className="px-3.5 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/30 font-bold rounded-xl text-xs flex items-center gap-1.5 transition-all">
                          <Trash2 className="w-3.5 h-3.5"/> Clear Data
                        </button>)}
                      <button onClick={() => { if (leads.length > 0)
                setDemoSelectedLeadId(leads[0].id); if (salesReps.length > 0)
                setDemoSelectedRepId(salesReps[0].id); setIsScheduleDemoOpen(true); }} className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-95 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-md active:scale-95 transition-all">
                        <Calendar className="w-4 h-4"/> + Schedule New Demo
                      </button>
                    </div>
                  </div>

                  {salesSchedules.length === 0 ? (<div className="p-14 text-center rounded-2xl bg-card border border-dashed border-border/80 space-y-4">
                      <div className="w-14 h-14 rounded-2xl bg-muted/60 flex items-center justify-center mx-auto"><Calendar className="w-7 h-7 text-muted-foreground"/></div>
                      <div>
                        <h4 className="text-sm font-bold text-foreground">No Schedules or Booked Demos</h4>
                        <p className="text-xs text-muted-foreground max-w-sm mx-auto mt-1">Schedule a new demo to populate this view.</p>
                      </div>
                      <button onClick={() => { if (leads.length > 0)
                    setDemoSelectedLeadId(leads[0].id); if (salesReps.length > 0)
                    setDemoSelectedRepId(salesReps[0].id); setIsScheduleDemoOpen(true); }} className="px-4 py-2 bg-primary text-white font-bold rounded-xl text-xs inline-flex items-center gap-2 shadow-md active:scale-95">
                        <Calendar className="w-4 h-4"/> + Schedule New Demo
                      </button>
                    </div>) : (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {salesSchedules.map((sch) => {
                        const rep = salesReps.find(r => r.id === sch.salesmanId);
                        const isCompleted = sch.status === "Completed" || clientEnquiries.some((e) => e.scheduleId === sch.id);
                        return (<div key={sch.id} className="p-5 rounded-2xl bg-card border border-border shadow-sm hover:border-primary/30 hover:shadow-md transition-all duration-300 flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">{sch.meetingType}</span>
                              <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full border ${sch.status === "Scheduled" ? "bg-blue-500/10 text-blue-500 border-blue-500/20" :
                                sch.status === "Completed" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
                                    "bg-amber-500/10 text-amber-500 border-amber-500/20"}`}>{sch.status}</span>
                            </div>
                            <div>
                              <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Booked Person / Client</p>
                              <h4 className="text-base font-extrabold text-foreground font-display mt-0.5 leading-snug">{sch.leadName}</h4>
                            </div>
                            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-border/60 space-y-2 text-xs">
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-muted-foreground flex items-center gap-1.5 shrink-0"><User className="w-3.5 h-3.5 text-primary"/> Assigned Rep:</span>
                                <select value={sch.salesmanId || (rep ? rep.id : salesReps[0]?.id || "rep-1")} onChange={(e) => updateScheduleSalesman(sch.id, e.target.value)} className="font-bold text-foreground bg-background border border-border/70 rounded-lg px-2 py-0.5 text-xs focus:ring-1 focus:ring-primary focus:outline-none cursor-pointer max-w-[150px] truncate">
                                  {salesReps.map((r) => <option key={r.id} value={r.id}>{r.name} ({r.role.split(" ")[0]})</option>)}
                                </select>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-muted-foreground flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-blue-500"/> Date &amp; Time:</span>
                                <span className="font-mono font-bold text-foreground">{sch.date} @ {sch.startTime}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-muted-foreground flex items-center gap-1.5"><Globe className="w-3.5 h-3.5 text-purple-500"/> Venue / Link:</span>
                                <span className="font-semibold text-primary truncate max-w-[140px]">{sch.location || "Google Meet"}</span>
                              </div>
                            </div>
                            {sch.notes && <p className="text-[11px] text-muted-foreground italic bg-muted/40 p-2.5 rounded-xl border border-border/40 leading-relaxed">"{sch.notes}"</p>}
                            <div className="pt-3 border-t border-border/80 flex flex-wrap items-center justify-between gap-2 text-xs">
                              <div className="flex items-center gap-2">
                                <button onClick={() => deleteSchedule(sch.id)} className="p-1.5 hover:bg-rose-500/10 text-muted-foreground hover:text-rose-600 dark:hover:text-rose-400 rounded-lg border border-border/40 transition-colors shrink-0" title="Delete schedule">
                                  <Trash2 className="w-3.5 h-3.5"/>
                                </button>
                                <span className="text-[10px] text-muted-foreground font-mono truncate max-w-[100px]" title={sch.id}>
                                  ID: {sch.id}
                                </span>
                              </div>

                              <div className="flex items-center gap-2 flex-wrap">
                                {isCompleted ? (<button onClick={() => setCrmSubTab("enquiries")} className="px-3 py-1.5 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 rounded-xl font-extrabold text-[11px] flex items-center gap-1.5 hover:bg-emerald-500/25 transition-all cursor-pointer shadow-sm">
                                    <CheckCircle2 className="w-3.5 h-3.5"/> Enquiry Completed
                                  </button>) : (<>
                                    <button onClick={() => startEnquiryDiscussion(sch)} className="px-3 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-95 text-white font-bold text-[11px] rounded-xl transition-all flex items-center gap-1.5 shadow-sm active:scale-95">
                                      <MessageSquare className="w-3.5 h-3.5"/> Start Enquiry
                                    </button>
                                    <button onClick={() => updateScheduleStatus(sch.id, "Completed")} className="px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 rounded-xl font-extrabold text-[11px] transition-all flex items-center gap-1.5 active:scale-95">
                                      <CheckCircle2 className="w-3.5 h-3.5"/> Mark Complete
                                    </button>
                                  </>)}
                              </div>
                            </div>
                          </div>);
                    })}
                    </div>)}
                </div>)}

              {/* ═══════════════════════════════════════════════ */}
              {/* SUB TAB 4: CLIENT ENQUIRIES & AI DATA           */}
              {/* ═══════════════════════════════════════════════ */}
              {crmSubTab === "enquiries" && (<div className="space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-card border border-border shadow-sm">
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0"><FolderTree className="w-5 h-5"/></div>
                      <div>
                        <h3 className="text-base font-extrabold font-display text-foreground">Client Data: Enquiries &amp; Discussion Records</h3>
                        <p className="text-xs text-muted-foreground mt-0.5">Stored voice-to-text transcripts, AI summaries, sentiment outcomes, and comments under client data.</p>
                      </div>
                    </div>
                    {clientEnquiries.length > 0 && (<button onClick={() => { if (confirm("Clear all saved client enquiry records?")) {
                    setClientEnquiries([]);
                    localStorage.removeItem("sellgrow_client_enquiries");
                } }} className="px-3.5 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/30 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 active:scale-95">
                        <Trash2 className="w-3.5 h-3.5"/> Clear All Enquiries
                      </button>)}
                  </div>

                  {clientEnquiries.length === 0 ? (<div className="p-14 text-center space-y-4 bg-card border border-dashed border-border rounded-2xl">
                      <div className="w-14 h-14 rounded-2xl bg-muted/60 flex items-center justify-center mx-auto"><FolderTree className="w-7 h-7 text-muted-foreground"/></div>
                      <div>
                        <h4 className="text-base font-bold text-foreground">No Stored Client Enquiries Yet</h4>
                        <p className="text-xs text-muted-foreground max-w-md mx-auto mt-1">
                          Launch an enquiry session from "Booked Demos &amp; Schedules" using the <strong className="text-primary">Start Enquiry</strong> button to record, transcribe, and save client discussion data here.
                        </p>
                      </div>
                    </div>) : (<div className="space-y-5">
                      {clientEnquiries.map((enq) => {
                        const isExpanded = expandedEnquiryIds.includes(enq.id);
                        const toggleExpand = () => {
                            setExpandedEnquiryIds((prev) => prev.includes(enq.id) ? prev.filter((id) => id !== enq.id) : [...prev, enq.id]);
                        };
                        return (<div key={enq.id} className="rounded-3xl bg-card border border-border shadow-sm overflow-hidden transition-all duration-300">
                            {/* Summary Card Header (Client Name & Product Name) */}
                            <div onClick={toggleExpand} className="p-5 bg-gradient-to-r from-slate-50 to-transparent dark:from-slate-900/50 dark:to-transparent flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:bg-slate-100/50 dark:hover:bg-slate-800/40 transition-colors">
                              <div className="flex items-center gap-3.5">
                                <div className="w-10 h-10 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 font-extrabold flex items-center justify-center text-lg shrink-0 border border-purple-500/20 shadow-sm">
                                  👤
                                </div>
                                <div>
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 text-[10px] font-extrabold uppercase tracking-wider">
                                      Client Enquiry Record
                                    </span>
                                    <span className="text-xs text-muted-foreground font-mono">ID: {enq.id}</span>
                                  </div>
                                  <h3 className="text-base sm:text-lg font-extrabold font-display text-foreground mt-1 leading-snug">
                                    {enq.leadName}
                                  </h3>
                                  <p className="text-xs text-muted-foreground mt-0.5">
                                    Assigned Representative: <strong className="text-foreground">{enq.salesmanName}</strong> | Scheduled: <span className="font-mono">{enq.date} @ {enq.startTime}</span>
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                                <div className="px-3.5 py-2 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-right">
                                  <div className="flex items-center justify-end gap-1.5 text-xs font-extrabold text-emerald-600 dark:text-emerald-400">
                                    <Sparkles className="w-3.5 h-3.5"/>
                                    <span>{enq.buyingIntentScore}% BUY INTENT</span>
                                  </div>
                                  <p className="text-[11px] font-extrabold text-foreground mt-0.5">🟢 POSITIVE TO BUY PRODUCT</p>
                                </div>

                                <button onClick={(e) => {
                                e.stopPropagation();
                                toggleExpand();
                            }} className={`px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all shadow-sm ${isExpanded
                                ? "bg-purple-600 text-white shadow-purple-600/20"
                                : "bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-white"}`}>
                                  <span>{isExpanded ? "Collapse ▲" : "View Discussion & AI Data ▼"}</span>
                                </button>
                              </div>
                            </div>

                            {/* Collapsible Details Panel */}
                            {isExpanded && (<div className="border-t border-border animate-fade-in">
                                {/* Content Grid */}
                                <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-5">
                                  <div className="space-y-3">
                                    <h4 className="text-xs font-extrabold text-foreground flex items-center gap-2 border-b border-border pb-2">
                                      <MessageSquare className="w-4 h-4 text-blue-500"/> Transcribed Voice-to-Text Feed
                                    </h4>
                                    <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
                                      {enq.transcript?.map((msg, idx) => (<div key={idx} className={`p-3 rounded-xl border text-xs ${msg.speaker === "client" ? "bg-blue-500/5 border-blue-500/20" : "bg-emerald-500/5 border-emerald-500/20"}`}>
                                          <div className="flex items-center justify-between font-bold mb-1 text-[11px]">
                                            <span className={msg.speaker === "client" ? "text-blue-600 dark:text-blue-400" : "text-emerald-600 dark:text-emerald-400"}>
                                              {msg.speaker === "client" ? "👤 Client" : `👔 ${enq.salesmanName}`}
                                            </span>
                                            <span className="text-[10px] text-muted-foreground font-mono">{msg.time}</span>
                                          </div>
                                          <p className="leading-relaxed text-foreground">{msg.text}</p>
                                        </div>))}
                                    </div>
                                  </div>
                                  <div className="space-y-3">
                                    <h4 className="text-xs font-extrabold text-foreground flex items-center gap-2 border-b border-border pb-2">
                                      <FileText className="w-4 h-4 text-emerald-500"/> AI Discussion Summary &amp; Objections
                                    </h4>
                                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-border space-y-3 text-xs">
                                      <div>
                                        <p className="font-extrabold text-foreground text-[11px] mb-1.5 uppercase tracking-wider">Key Highlights:</p>
                                        <ul className="space-y-1">
                                          {enq.summary?.keyHighlights?.map((hl, i) => (<li key={i} className="flex items-start gap-2 text-muted-foreground">
                                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"/>{hl}
                                            </li>))}
                                        </ul>
                                      </div>
                                      <div className="border-t border-border pt-3">
                                        <p className="font-extrabold text-foreground text-[11px] mb-1.5 uppercase tracking-wider">Resolved Objections:</p>
                                        <ul className="space-y-1">
                                          {enq.summary?.objectionsResolved?.map((obj, i) => (<li key={i} className="flex items-start gap-2 text-muted-foreground">
                                              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0"/>{obj}
                                            </li>))}
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Comments */}
                                <div className="px-5 pb-5 space-y-3 border-t border-border pt-4">
                                  <h4 className="text-xs font-extrabold text-foreground flex items-center gap-2">
                                    <MessageCircle className="w-4 h-4 text-purple-500"/> Stored Client Data Comments ({enq.comments?.length || 0})
                                  </h4>
                                  <div className="space-y-2">
                                    {enq.comments?.map((c, cIdx) => (<div key={cIdx} className="p-2.5 rounded-xl bg-muted/50 border border-border/60 text-xs font-medium text-foreground flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0"/><span>{c}</span>
                                      </div>))}
                                  </div>
                                  <div className="flex items-center gap-2 pt-1">
                                    <input type="text" placeholder="Add a new comment under client enquiry data..." onKeyDown={(e) => {
                                    if (e.key === "Enter" && e.currentTarget.value.trim()) {
                                        const val = e.currentTarget.value.trim();
                                        setClientEnquiries((prev) => prev.map((item) => item.id === enq.id ? { ...item, comments: [...(item.comments || []), val] } : item));
                                        e.currentTarget.value = "";
                                    }
                                }} className="flex-1 px-3.5 py-2 rounded-xl border border-border bg-background text-xs font-medium focus:ring-1 focus:ring-primary focus:outline-none"/>
                                    <button onClick={(e) => {
                                    const input = e.currentTarget.previousElementSibling;
                                    if (input && input.value.trim()) {
                                        const val = input.value.trim();
                                        setClientEnquiries((prev) => prev.map((item) => item.id === enq.id ? { ...item, comments: [...(item.comments || []), val] } : item));
                                        input.value = "";
                                    }
                                }} className="px-4 py-2 bg-gradient-to-r from-purple-600 to-violet-600 hover:opacity-90 text-white rounded-xl text-xs font-bold transition-all shadow-sm shrink-0 active:scale-95">
                                      Add Comment
                                    </button>
                                  </div>
                                </div>
                              </div>)}
                          </div>);
                    })}
                    </div>)}
                </div>)}
            </div>)}

          {/* TAB 3: UNIFIED OMNICHANNEL INBOX */}
          {(activeTab === "inbox" || activeTab === "all_in_one") && (<div id="sec-inbox" className="space-y-6 animate-fade-in text-left pt-6 border-t border-border scroll-mt-20">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border pb-4">
                <div>
                  <h1 className="text-2xl font-bold font-display text-foreground">{t("inbox")}</h1>
                  <p className="text-xs text-muted-foreground">Manage WhatsApp Business API, Facebook Messenger, Live Chat, and SMS broadcasts.</p>
                </div>
                <button onClick={() => setIsBroadcastOpen(true)} className="px-4 py-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white rounded-xl text-xs font-semibold shadow-md shadow-primary/20 transition-all flex items-center gap-1.5 shrink-0">
                  <Send className="w-4 h-4"/>
                  <span>Send Broadcast Message</span>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 rounded-2xl border border-border overflow-hidden bg-white dark:bg-[#0c1220] h-[500px]">
                {/* Channels selection */}
                <div className="col-span-1 border-r border-border p-4 space-y-4">
                  <h3 className="text-xs font-bold text-muted uppercase tracking-wider">Communication Channels</h3>
                  <div className="space-y-2">
                    {[
                { id: "whatsapp", title: "WhatsApp Business API", num: "2 msgs", icon: MessageCircle, color: "text-emerald-500 bg-emerald-500/10" },
                { id: "livechat", title: "Web Live Chat", num: "1 msg", icon: MessageSquare, color: "text-primary bg-primary/10" },
                { id: "messenger", title: "FB Messenger", num: "0 msgs", icon: Globe, color: "text-blue-500 bg-blue-500/10" },
            ].map((chan) => {
                const Icon = chan.icon;
                return (<button key={chan.id} onClick={() => setSelectedChat(chan.id)} className={`w-full text-left p-3 rounded-xl border flex items-center justify-between transition-all ${selectedChat === chan.id
                        ? "border-primary bg-primary/5"
                        : "border-transparent hover:bg-black/5 dark:hover:bg-white/5"}`}>
                          <div className="flex items-center gap-2.5">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${chan.color}`}>
                              <Icon className="w-4 h-4"/>
                            </div>
                            <div>
                              <p className="text-xs font-bold text-foreground leading-none">{chan.title}</p>
                              <p className="text-[10px] text-muted-foreground mt-1">API Node Active</p>
                            </div>
                          </div>
                          <span className="text-[9px] bg-border px-1.5 py-0.5 rounded-full font-bold">{chan.num}</span>
                        </button>);
            })}
                  </div>
                </div>

                {/* Conversation view */}
                <div className="col-span-2 flex flex-col justify-between h-full bg-slate-50/50 dark:bg-black/10">
                  {/* Chat logs */}
                  <div className="p-6 overflow-y-auto flex-grow space-y-4 max-h-[340px]">
                    {chatMessages[selectedChat]?.map((msg, idx) => (<div key={idx} className={`p-3 rounded-xl max-w-[75%] text-xs ${msg.sender === "agent"
                    ? "bg-primary text-white ml-auto"
                    : "bg-card border border-border text-foreground"}`}>
                        <p className="leading-relaxed">{msg.text}</p>
                      </div>))}
                    {chatMessages[selectedChat]?.length === 0 && (<p className="text-xs text-muted-foreground text-center py-10">No messages in this pipeline yet.</p>)}
                  </div>

                  {/* AI recommendations and Input */}
                  <div className="p-4 border-t border-border bg-white dark:bg-[#0c1220] space-y-3">
                    {/* Suggestions */}
                    <div className="flex flex-wrap gap-2 items-center">
                      <span className="text-[9px] font-bold text-primary flex items-center gap-1 shrink-0"><Sparkles className="w-3 h-3"/> AI Recommend:</span>
                      {aiSuggestions[selectedChat]?.map((sug, idx) => (<button key={idx} onClick={() => setInboxInput(sug)} className="px-2.5 py-1 bg-primary/5 hover:bg-primary/10 text-primary border border-primary/10 rounded-lg text-[10px] font-medium truncate max-w-xs">
                          {sug}
                        </button>))}
                    </div>

                    <form onSubmit={handleSendInboxMessage} className="flex gap-2">
                      <input type="text" value={inboxInput} onChange={(e) => setInboxInput(e.target.value)} placeholder="Write support reply..." className="flex-grow pl-3 pr-2 py-2 text-xs rounded-xl border border-border glass-input"/>
                      <button type="submit" className="px-4 bg-primary hover:opacity-90 text-white rounded-xl text-xs font-semibold flex items-center justify-center shrink-0">
                        <Send className="w-3.5 h-3.5"/>
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>)}

          {/* TAB 4: AI VOICE PLATFORM (Dialer) */}
          {(activeTab === "voice" || activeTab === "all_in_one") && (<div id="sec-voice" className="space-y-6 animate-fade-in text-left pt-6 border-t border-border scroll-mt-20">
              <div>
                <h1 className="text-2xl font-bold font-display text-foreground">{t("voice")}</h1>
                <p className="text-xs text-muted-foreground">Monitor and trigger simulated AI voice agent connections.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* VoIP Console widget */}
                <div className="lg:col-span-2 p-6 rounded-2xl border border-border bg-card shadow-sm text-center space-y-6">
                  <div className="flex justify-between items-center border-b pb-3">
                    <span className="text-sm font-bold flex items-center gap-2"><PhoneCall className="w-4 h-4 text-primary"/> AI VoIP Simulator</span>
                    <span className="text-xs font-mono bg-slate-100 dark:bg-slate-800 text-muted px-2 py-0.5 rounded">Endpoint: voice.sellgrow.io</span>
                  </div>

                  {voiceCallState === "idle" && (<div className="py-12 space-y-4">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto text-primary">
                        <PhoneCall className="w-8 h-8"/>
                      </div>
                      <p className="text-xs text-muted-foreground max-w-sm mx-auto leading-normal">
                        Click below to test out the AI voice agent dialer. This uses the browser&apos;s speech synthesizer to read agent lines out loud.
                      </p>
                      <button onClick={handleStartVoiceCall} className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl">
                        Connect & Dial Voice Agent
                      </button>
                    </div>)}

                  {voiceCallState === "ringing" && (<div className="py-12 space-y-4 animate-pulse">
                      <div className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center mx-auto text-white">
                        <PhoneCall className="w-8 h-8"/>
                      </div>
                      <p className="text-xs font-bold text-emerald-500">Establishing WebRTC channel...</p>
                    </div>)}

                  {voiceCallState === "active" && (<div className="space-y-6">
                      {/* Active wave */}
                      <div className="flex items-center justify-center gap-1.5 h-8">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (<span key={i} className="sound-bar" style={{
                        animationPlayState: isVoiceSpeaking ? "running" : "paused",
                        height: isVoiceSpeaking ? "100%" : "20%",
                    }}/>))}
                      </div>

                      {/* Transcripts scroll */}
                      <div className="bg-slate-50 dark:bg-black/20 p-4 rounded-xl border border-border max-h-[180px] overflow-y-auto space-y-2 text-xs text-left">
                        {voiceTranscripts.map((t, idx) => (<div key={idx} className={`p-2 rounded-lg ${t.sender === "ai" ? "bg-primary/10 text-foreground" : "bg-emerald-500/10 text-foreground"}`}>
                            <strong className="text-[10px] block uppercase text-muted-foreground">{t.sender === "ai" ? "Agent Dial" : "Operator (You)"}</strong>
                            <p className="mt-0.5 leading-relaxed">{t.text}</p>
                          </div>))}
                      </div>

                      {/* Manual text speech choices */}
                      <div className="text-left space-y-2">
                        <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Select Response choice:</p>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <button onClick={() => handleVoiceResponse("What is the average latency of this system?", "WebRTC channels connect with average peer-to-peer latency around 120ms.")} className="flex-grow text-left px-3 py-2 border rounded-xl text-xs hover:bg-black/5 dark:hover:bg-white/5">
                            &quot;System latency?&quot;
                          </button>
                          <button onClick={() => handleVoiceResponse("Do we have call logs and reports?", "Yes! Every single completed voice agent call compiles records, summaries, and transcripts.")} className="flex-grow text-left px-3 py-2 border rounded-xl text-xs hover:bg-black/5 dark:hover:bg-white/5">
                            &quot;Call logs/records?&quot;
                          </button>
                        </div>
                      </div>

                      <button onClick={handleEndVoiceCall} className="w-full flex items-center justify-center gap-2 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-semibold">
                        <PhoneOff className="w-4 h-4"/> End Active Call
                      </button>
                    </div>)}

                  {voiceCallState === "ended" && (<div className="py-12 space-y-4">
                      <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto text-red-500">
                        <PhoneOff className="w-8 h-8"/>
                      </div>
                      <p className="text-xs font-bold text-red-500">Call Finished. Data synced to CRM.</p>
                    </div>)}
                </div>

                {/* Call Analytics log logs */}
                <div className="p-6 rounded-2xl border border-border bg-card shadow-sm space-y-4">
                  <h3 className="text-sm font-bold font-display border-b pb-2">Recent Call Logs</h3>
                  <div className="space-y-3 text-xs">
                    {[
                { num: "+966 50 123 4567", time: "10 mins ago", stat: "Accepted", duration: "1m 45s", summary: "Acme Corp requested invoice." },
                { num: "+91 98765 43210", time: "1 hour ago", stat: "Missed", duration: "0s", summary: "Callback trigger created in workflow." },
                { num: "+1 (555) 987-6543", time: "Yesterday", stat: "Accepted", duration: "3m 12s", summary: "German Textile requested SIP trunk details." }
            ].map((call, idx) => (<div key={idx} className="p-3 border rounded-xl space-y-1.5">
                        <div className="flex justify-between font-bold">
                          <span>{call.num}</span>
                          <span className={call.stat === "Missed" ? "text-red-500" : "text-emerald-500"}>{call.stat}</span>
                        </div>
                        <div className="flex justify-between text-[10px] text-muted-foreground">
                          <span>{call.time}</span>
                          <span>{call.duration}</span>
                        </div>
                        <p className="text-[10px] text-muted-foreground border-t pt-1 border-dashed mt-1">{call.summary}</p>
                      </div>))}
                  </div>
                </div>
              </div>
            </div>)}

          {/* TAB 5: VISUAL WORKFLOW BUILDER */}
          {(activeTab === "workflow" || activeTab === "all_in_one") && (<div id="sec-workflow" className="space-y-6 animate-fade-in text-left pt-6 border-t border-border scroll-mt-20">
              <div>
                <h1 className="text-2xl font-bold font-display text-foreground">{t("workflow")}</h1>
                <p className="text-xs text-muted-foreground">Design automated pipelines connecting triggers, delays, and integrations.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Node display visualizer */}
                <div className="lg:col-span-2 p-6 rounded-2xl border border-border bg-card shadow-sm space-y-6">
                  <h3 className="text-sm font-bold font-display border-b pb-2">Visual Automation Pipeline Diagram</h3>

                  <div className="flex flex-col items-center space-y-4 relative py-6">
                    {workflowNodes.map((node, index) => (<React.Fragment key={node.id}>
                        {index > 0 && (<div className="w-0.5 h-6 bg-primary/30 dark:bg-primary/20 border-dashed border flex items-center justify-center font-mono text-[9px] text-muted">
                            ↓
                          </div>)}
                        <div className="w-full max-w-sm p-4 rounded-xl border border-border bg-white dark:bg-[#0c1220] flex items-center justify-between gap-3 shadow-sm hover:border-primary transition-all">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${node.type === "trigger" ? "bg-blue-500/10 text-blue-500" :
                    node.type === "delay" ? "bg-amber-500/10 text-amber-500" :
                        "bg-purple-500/10 text-purple-500"}`}>
                              {node.type === "trigger" ? <Plus className="w-4 h-4"/> :
                    node.type === "delay" ? <Activity className="w-4 h-4"/> :
                        <Workflow className="w-4 h-4"/>}
                            </div>
                            <div className="text-xs">
                              <p className="font-bold text-foreground">{node.label}</p>
                              <p className="text-[10px] text-muted-foreground mt-0.5">{node.details}</p>
                            </div>
                          </div>
                          <button onClick={() => setWorkflowNodes(workflowNodes.filter(n => n.id !== node.id))} className="p-1 rounded hover:bg-red-500/10 text-muted-foreground hover:text-red-500 transition-colors" aria-label="Remove node">
                            <Trash2 className="w-3.5 h-3.5"/>
                          </button>
                        </div>
                      </React.Fragment>))}
                  </div>
                </div>

                {/* Add block node form */}
                <form onSubmit={handleAddWorkflowNode} className="p-6 rounded-2xl border border-border bg-card shadow-sm space-y-4 h-fit">
                  <h3 className="text-sm font-bold font-display">Configure Automation Step</h3>

                  <div className="space-y-1">
                    <label className="text-[10px] text-muted-foreground font-semibold" htmlFor="node-type">Node Behavior Type</label>
                    <select id="node-type" value={newNodeType} onChange={(e) => setNewNodeType(e.target.value)} className="w-full px-3 py-2 text-xs glass-input focus:outline-none cursor-pointer">
                      <option value="trigger" className="bg-[#0c1220]">Trigger (Start Chain)</option>
                      <option value="delay" className="bg-[#0c1220]">Delay / Wait Timer</option>
                      <option value="action" className="bg-[#0c1220]">Action Node (CRM / VoIP / Webhook)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-muted-foreground font-semibold" htmlFor="node-title">Step Title</label>
                    <input id="node-title" type="text" placeholder="e.g. Sync Shopify Store" value={newNodeLabel} onChange={(e) => setNewNodeLabel(e.target.value)} className="w-full px-3 py-2 text-xs glass-input focus:outline-none"/>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-muted-foreground font-semibold" htmlFor="node-details">Execution Details</label>
                    <input id="node-details" type="text" placeholder="e.g. Delay execution for 10 minutes" value={newNodeDetails} onChange={(e) => setNewNodeDetails(e.target.value)} className="w-full px-3 py-2 text-xs glass-input focus:outline-none"/>
                  </div>

                  <button type="submit" className="w-full py-2 bg-primary hover:opacity-90 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5">
                    <Plus className="w-3.5 h-3.5"/> Append Step Node
                  </button>
                </form>
              </div>
            </div>)}

          {/* TAB 6: PRODUCT CATALOGUE (Superadmin Catalog Controller Structure) */}
          {(activeTab === "catalogue" || activeTab === "all_in_one") && (<div id="sec-catalogue" className="space-y-6 animate-fade-in text-left pt-6 border-t border-border scroll-mt-20">
              
              {/* Top Header Card Container */}
              <div className="p-6 rounded-3xl bg-gradient-to-r from-primary/5 via-teal-500/5 to-emerald-500/5 border border-primary/20 shadow-sm space-y-4">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 inline-flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3"/> CLIENT CATALOG CONTROLLER
                    </span>
                    <h1 className="text-2xl font-extrabold font-display text-foreground mt-2">
                      Product Catalog & Live Management
                    </h1>
                    <p className="text-xs text-muted-foreground mt-1">
                      Add new products, update specifications, manage catalog items, and view live changes synced instantly to the main customer page (<a href="/products" target="_blank" className="text-primary font-bold underline font-mono">/products</a>).
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                    <button onClick={() => setIsAddProductOpen(true)} className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-emerald-600/20 transition-all active:scale-95">
                      <Plus className="w-4 h-4"/>
                      <span>Add New Product</span>
                    </button>
                    <a href="/products" target="_blank" rel="noreferrer" className="px-4 py-2.5 bg-card hover:bg-muted text-foreground font-extrabold rounded-xl text-xs flex items-center gap-2 border border-border shadow-sm transition-all">
                      <ExternalLink className="w-4 h-4 text-primary"/>
                      <span>Preview Live /products</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* 4 Metrics Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-card border border-border shadow-sm space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">Total Equipment Models</span>
                    <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
                      <Package className="w-4 h-4"/>
                    </div>
                  </div>
                  <p className="text-2xl font-extrabold text-foreground font-display">{products.length} <span className="text-xs font-semibold text-muted-foreground">Models</span></p>
                </div>

                <div className="p-5 rounded-2xl bg-card border border-border shadow-sm space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-500">Categories</span>
                    <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                      <FolderTree className="w-4 h-4"/>
                    </div>
                  </div>
                  <p className="text-2xl font-extrabold text-foreground font-display">{new Set(products.map(p => p.category)).size} <span className="text-xs font-semibold text-muted-foreground">Active Groups</span></p>
                </div>

                <div className="p-5 rounded-2xl bg-card border border-border shadow-sm space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-sky-500">AI Voice Assistant</span>
                    <div className="w-8 h-8 rounded-xl bg-sky-500/10 text-sky-500 flex items-center justify-center">
                      <Volume2 className="w-4 h-4"/>
                    </div>
                  </div>
                  <p className="text-lg font-extrabold text-foreground font-display">Active <span className="text-xs font-semibold text-emerald-500">(EN, HI, TA, AR)</span></p>
                </div>

                <div className="p-5 rounded-2xl bg-card border border-border shadow-sm space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-500">Catalog Sync</span>
                    <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
                      <Layers className="w-4 h-4"/>
                    </div>
                  </div>
                  <p className="text-lg font-extrabold text-foreground font-display">Real-time <span className="text-xs font-semibold text-purple-500">Auto Sync</span></p>
                </div>
              </div>

              {/* Main Product Catalog Grid Container (Superadmin Structure) */}
              <div className="p-6 rounded-3xl bg-card border border-border shadow-sm space-y-6">
                
                {/* Header + Category Filter + Search + Add Brochure */}
                <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 pb-4 border-b border-border">
                  <div className="flex items-center gap-3 shrink-0">
                    <h2 className="text-sm font-extrabold uppercase tracking-wider text-foreground font-display">
                      ALL CATALOG EQUIPMENT MODELS
                    </h2>
                  </div>

                  <div className="flex items-center gap-2.5 flex-wrap">
                    {/* Category & Brand Filter Buttons */}
                    <button onClick={() => setSelectedCatFilter("All")} className={`px-3 py-1.5 text-xs font-extrabold rounded-xl border transition-all shrink-0 ${selectedCatFilter === "All"
                ? "bg-primary text-white border-primary shadow-sm"
                : "bg-slate-100 dark:bg-slate-800 text-muted-foreground border-border hover:bg-slate-200"}`}>
                      All ({products.length})
                    </button>

                    <select value={selectedCatFilter} onChange={(e) => setSelectedCatFilter(e.target.value)} className="px-3 py-1.5 bg-background text-xs rounded-xl border border-border font-bold focus:outline-none focus:border-primary cursor-pointer shrink-0">
                      <option value="All">All Categories ({products.length})</option>
                      {Array.from(new Set(products.map(p => p.category))).map(c => (<option key={c} value={c}>{c}</option>))}
                    </select>

                    {/* Search Input */}
                    <div className="relative w-44 sm:w-52 shrink-0">
                      <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-muted-foreground"/>
                      <input type="text" value={catalogueSearch} onChange={(e) => setCatalogueSearch(e.target.value)} placeholder="Search models..." className="w-full pl-9 pr-3 py-1.5 bg-background text-xs rounded-xl border border-border focus:outline-none focus:border-primary"/>
                    </div>

                    {/* Add Brochure Button */}
                    <button onClick={handleOpenAddBrochure} className="px-4 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center gap-1.5 shrink-0 active:scale-95">
                      <FilePlus className="w-3.5 h-3.5"/>
                      <span>Add Brochure</span>
                    </button>
                  </div>
                </div>

                {/* 4-Column Equipment Model Cards Grid matching user screenshot */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                  {filteredProducts.map((p) => {
                const categoryTag = p.name.includes("BC") ? "BRUSH CUTTER" :
                    p.name.includes("MW-CH") ? "COMBINE HARVESTER" :
                        p.name.includes("Mahaveer") ? "POWER TILLER" :
                            p.name.includes("WM") ? "POWER WEEDER" :
                                p.name.includes("Reaper") || p.name.includes("PR") ? "REAPER" : p.category.toUpperCase();
                return (<div key={p.id} className="p-4 rounded-2xl bg-card border border-border flex flex-col justify-between space-y-3 hover:border-primary/50 transition-all shadow-sm relative group">
                        <div className="space-y-2.5">
                          {/* Image Header with Category Tag top left */}
                          <div className="relative w-full h-36 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-900 border border-border p-2 flex items-center justify-center">
                            <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-[8px] font-extrabold bg-emerald-500 text-white shadow-sm uppercase tracking-wider">
                              {categoryTag}
                            </span>
                            <img src={p.image || "/assets/brochures/brush_cutter_4sp_pr_page_1_img_1.png"} alt={p.name} onError={(e) => { e.currentTarget.src = "/assets/brochures/brush_cutter_4sp_pr_page_1_img_1.png"; }} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"/>
                            <button type="button" onClick={() => handleDeleteProduct(p.id, p.name)} title="Delete Model" className="absolute top-2 right-2 w-6 h-6 rounded-full bg-red-600 hover:bg-red-500 text-white flex items-center justify-center shadow-md transition-transform active:scale-95 z-10">
                              <Trash2 className="w-3 h-3"/>
                            </button>
                          </div>

                          {/* Product Title */}
                          <div>
                            <h3 className="text-sm font-extrabold text-foreground font-display line-clamp-1">{p.name}</h3>
                            <p className="text-[10px] text-muted-foreground line-clamp-1 mt-0.5">{p.description}</p>
                          </div>
                        </div>

                        {/* Action Buttons Footer */}
                        <div className="flex items-center justify-between pt-2 border-t border-border gap-2">
                          <span className="text-[11px] font-mono text-muted-foreground font-semibold">
                            Stock: {p.stock} units
                          </span>

                          {/* View Details > Link */}
                          <button onClick={() => handleOpenProductDetails(p)} className="px-3 py-1.5 rounded-xl bg-primary/10 hover:bg-primary hover:text-white text-primary text-xs font-extrabold transition-all flex items-center gap-1 shrink-0">
                            <span>View Details</span>
                            <ChevronRight className="w-3.5 h-3.5"/>
                          </button>
                        </div>
                      </div>);
            })}
                </div>

              </div>

            </div>)}

          {/* TAB 7: KNOWLEDGE BASE (RAG Vector Database) */}
          {(activeTab === "rag" || activeTab === "all_in_one") && (<div id="sec-rag" className="space-y-6 animate-fade-in text-left pt-6 border-t border-border scroll-mt-20">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border pb-4">
                <div>
                  <h1 className="text-2xl font-bold font-display text-foreground">{t("rag")}</h1>
                  <p className="text-xs text-muted-foreground">Upload reference sources to compile semantic indices mapped to AI reply interfaces.</p>
                </div>
                <button onClick={() => setIsUploadDocOpen(true)} className="px-4 py-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white rounded-xl text-xs font-semibold shadow-md shadow-primary/20 transition-all flex items-center gap-1.5 shrink-0">
                  <Plus className="w-4 h-4"/>
                  <span>Upload Document</span>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Upload & Files list */}
                <div className="lg:col-span-2 space-y-6">
                  {/* File List */}
                  <div className="p-6 rounded-2xl border border-border bg-card shadow-sm space-y-4">
                    <h3 className="text-sm font-bold font-display border-b pb-2">Vector Indexed Documents</h3>
                    <div className="space-y-3">
                      {ragFiles.map((file, idx) => (<div key={idx} className="flex items-center justify-between p-3 border rounded-xl text-xs">
                          <div className="flex items-center gap-3">
                            <FileText className="w-4 h-4 text-primary shrink-0"/>
                            <div>
                              <p className="font-bold text-foreground">{file.name}</p>
                              <p className="text-[10px] text-muted-foreground mt-0.5">Chunks: {file.chunks} | Size: {file.size}</p>
                            </div>
                          </div>
                          <span className="text-[10px] text-muted-foreground">Uploaded: {file.date}</span>
                        </div>))}
                    </div>
                  </div>
                </div>

                {/* Live RAG Vector Search Tester */}
                <div className="p-6 rounded-2xl border border-border bg-card shadow-sm space-y-4 h-fit">
                  <h3 className="text-sm font-bold font-display">Semantic RAG Search Sandbox</h3>
                  <p className="text-[10px] text-muted-foreground">Type a prompt to query the mock vector indexes. Use keywords like &quot;refund&quot;, &quot;ev&quot;, or &quot;arabic&quot;.</p>

                  <form onSubmit={handleRagSearch} className="relative">
                    <input type="text" value={ragQuery} onChange={(e) => setRagQuery(e.target.value)} placeholder="Search vector documents..." className="w-full pl-9 pr-3 py-2 text-xs glass-input focus:outline-none"/>
                    <Search className="w-3.5 h-3.5 text-muted absolute left-3 top-3"/>
                  </form>

                  {ragResult && (<div className="p-3.5 border border-primary/20 bg-primary/5 rounded-xl space-y-2 text-xs">
                      <div className="flex justify-between items-center text-[10px] font-mono text-muted-foreground font-bold">
                        <span>Confidence: <strong className="text-primary">{(ragResult.confidence * 100).toFixed(0)}%</strong></span>
                        <span>{ragResult.source}</span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed text-[11px]">{ragResult.answer}</p>
                    </div>)}
                </div>
              </div>
            </div>)}

          {/* TAB 8: BUSINESS ANALYTICS */}
          {(activeTab === "analytics" || activeTab === "all_in_one") && (<div id="sec-analytics" className="space-y-6 animate-fade-in text-left pt-6 border-t border-border scroll-mt-20">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border pb-4">
                <div>
                  <h1 className="text-2xl font-bold font-display text-foreground">Business Analytics</h1>
                  <p className="text-xs text-muted-foreground">Track ROI conversions, AI support logs, and VoIP reception stats.</p>
                </div>
                <button onClick={() => alert("Exporting full Business Analytics PDF report for July 2026...")} className="px-4 py-2 border border-border hover:bg-black/5 dark:hover:bg-white/5 rounded-xl text-xs font-semibold text-foreground transition-all flex items-center gap-1.5 shrink-0">
                  <FileText className="w-4 h-4 text-primary"/>
                  <span>Export Report (PDF)</span>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Left Card: Sales Performance Conversion ($) with AI Forecasting */}
                <div className="p-6 rounded-3xl border border-border bg-card shadow-sm space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/50 pb-3">
                    <div>
                      <h3 className="text-sm font-bold font-display text-foreground flex items-center gap-1.5">
                        <TrendingUp className="w-4 h-4 text-emerald-500"/>
                        <span>Sales Performance Conversion ($)</span>
                      </h3>
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        AI Model Revenue Prediction & Sales Trajectory
                      </p>
                    </div>

                    {/* Month Selection Dropdown */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      <Calendar className="w-3.5 h-3.5 text-primary shrink-0"/>
                      <select value={forecastMonth} onChange={(e) => setForecastMonth(e.target.value)} className="py-1 px-2.5 text-xs font-bold bg-slate-100 dark:bg-slate-900 border border-border rounded-xl text-foreground focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer hover:border-primary/50 transition-colors">
                        <option value="aug-2026">August 2026 (AI Forecast)</option>
                        <option value="sep-2026">September 2026 (AI Forecast)</option>
                        <option value="oct-2026">October 2026 (AI Forecast)</option>
                        <option value="jul-2026">July 2026 (Current Month)</option>
                      </select>
                    </div>
                  </div>

                  {/* AI Prediction Stats Banner */}
                  <div className="p-3 bg-gradient-to-r from-primary/10 via-teal-500/10 to-emerald-500/10 border border-primary/20 rounded-2xl flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-primary text-white flex items-center justify-center text-xs font-bold shadow-sm">
                        <Sparkles className="w-4 h-4"/>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground block">
                          AI Forecast ({activeForecast.forecastMonthName})
                        </span>
                        <span className="text-sm font-extrabold text-foreground font-mono">
                          {formatPrice(activeForecast.rawPredicted)}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                        {activeForecast.growth} Projected
                      </span>
                      <span className="text-[10px] text-muted-foreground block mt-0.5">
                        {activeForecast.confidence} Model Confidence
                      </span>
                    </div>
                  </div>

                  {/* SVG Chart with AI Forecast Extension Line */}
                  <div className="relative h-52 w-full pt-2 flex flex-col justify-between">
                    <svg className="w-full h-36 overflow-visible" viewBox="0 0 400 130" preserveAspectRatio="none">
                      {/* Horizontal Grid Lines */}
                      <line x1="0" y1="20" x2="400" y2="20" stroke="currentColor" className="text-border/30" strokeWidth="1" strokeDasharray="3 3"/>
                      <line x1="0" y1="65" x2="400" y2="65" stroke="currentColor" className="text-border/30" strokeWidth="1" strokeDasharray="3 3"/>
                      <line x1="0" y1="110" x2="400" y2="110" stroke="currentColor" className="text-border/30" strokeWidth="1" strokeDasharray="3 3"/>

                      <defs>
                        <linearGradient id="sales-line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#2563eb"/>
                          <stop offset="50%" stopColor="#0284c7"/>
                          <stop offset="100%" stopColor="#10b981"/>
                        </linearGradient>
                        <linearGradient id="sales-fill-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#10b981" stopOpacity="0.12"/>
                          <stop offset="100%" stopColor="#2563eb" stopOpacity="0"/>
                        </linearGradient>
                      </defs>

                      {/* Area Fill */}
                      <path d="M 10 100 C 60 90, 110 50, 160 55 C 220 60, 290 35, 290 28 L 390 10 L 390 120 L 10 120 Z" fill="url(#sales-fill-grad)"/>

                      {/* Actual Historical Line */}
                      <path d={activeForecast.svgPathActual} fill="none" stroke="url(#sales-line-grad)" strokeWidth="4" strokeLinecap="round"/>

                      {/* AI Predicted Dashed Line */}
                      {activeForecast.svgPathForecast && (<path d={activeForecast.svgPathForecast} fill="none" stroke="#10b981" strokeWidth="3.5" strokeDasharray="5 5" strokeLinecap="round"/>)}

                      {/* Current Month Point */}
                      <circle cx={activeForecast.endDotCx} cy={activeForecast.endDotCy} r="5" fill="#0284c7"/>

                      {/* AI Forecast Target Point */}
                      {forecastMonth !== "jul-2026" && (<g>
                          <circle cx={activeForecast.forecastDotCx} cy={activeForecast.forecastDotCy} r="7" fill="#10b981" className="animate-pulse"/>
                          <circle cx={activeForecast.forecastDotCx} cy={activeForecast.forecastDotCy} r="3" fill="#ffffff"/>
                        </g>)}
                    </svg>

                    {/* X-Axis Labels */}
                    <div className="flex justify-between text-xs font-semibold text-muted-foreground px-2 pt-2 border-t border-border/30">
                      {activeForecast.historicalMonths.map((m, idx) => (<span key={idx} className={m.includes("AI Forecast") ? "text-emerald-600 dark:text-emerald-400 font-bold" : ""}>
                          {m}
                        </span>))}
                    </div>
                  </div>
                </div>

                {/* Right Card: AI Helpdesk Deflection Rate (%) */}
                <div className="p-6 rounded-3xl border border-border bg-card shadow-sm space-y-6">
                  <h3 className="text-sm font-bold font-display text-foreground">AI Helpdesk Deflection Rate (%)</h3>
                  
                  <div className="space-y-6 pt-2">
                    {[
                { chan: "WhatsApp Autoreply", val: 88, color: "from-blue-600 via-teal-500 to-emerald-500" },
                { chan: "Website Chatbot RAG", val: 92, color: "from-blue-600 via-teal-400 to-emerald-400" },
                { chan: "VoIP AI Receptionist", val: 78, color: "from-blue-700 via-teal-500 to-emerald-500" }
            ].map((bar, idx) => (<div key={idx} className="space-y-2">
                        <div className="flex justify-between items-center text-xs font-bold">
                          <span className="text-foreground font-display">{bar.chan}</span>
                          <span className="text-blue-600 dark:text-sky-400 font-mono font-extrabold">{bar.val}% Deflected</span>
                        </div>
                        <div className="w-full h-3 bg-slate-100 dark:bg-slate-800/80 rounded-full overflow-hidden p-0.5 border border-border/30">
                          <div className={`h-full bg-gradient-to-r ${bar.color} rounded-full transition-all duration-1000 ease-out shadow-sm`} style={{ width: `${bar.val}%` }}/>
                        </div>
                      </div>))}
                  </div>
                </div>

              </div>
            </div>)}

          {/* TAB: SERVICES (11 Live Services) */}
          {(activeTab === "services" || activeTab === "all_in_one") && (<div id="sec-services" className="space-y-6 animate-fade-in text-left pt-6 border-t border-border scroll-mt-20">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border pb-4">
                <div>
                  <h1 className="text-2xl font-bold font-display text-foreground flex items-center gap-2">
                    <Cpu className="w-6 h-6 text-primary"/>
                    <span>Company Services & Operations (11 Live)</span>
                  </h1>
                  <p className="text-xs text-muted-foreground">Manage active services, machinery dispatch, soil testing, and AI booking hotlines for {user?.businessName || "NOMO"}.</p>
                </div>
                <button onClick={() => setIsAddServiceOpen(true)} className="px-4 py-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white rounded-xl text-xs font-semibold shadow-md flex items-center gap-1.5 shrink-0">
                  <Plus className="w-4 h-4"/>
                  <span>+ Provision New Service</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {servicesList.map((srv) => (<div key={srv.id} className="p-5 rounded-2xl border border-border bg-card shadow-sm space-y-3 flex flex-col justify-between hover:border-primary transition-all">
                    <div className="space-y-2">
                      <div className="flex justify-between items-start gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
                          {srv.category}
                        </span>
                        <span className="text-xs font-mono font-bold text-emerald-500 bg-emerald-500/10 px-2.5 py-0.5 rounded-lg border border-emerald-500/20">
                          {formatPrice(srv.price)} / {srv.unit}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-foreground font-display">{srv.name}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{srv.description}</p>
                    </div>

                    <div className="pt-3 border-t border-border flex items-center justify-between">
                      <span className="text-xs flex items-center gap-1.5 text-emerald-500 font-bold">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"/>
                        <span>{srv.status}</span>
                      </span>
                      <button onClick={() => alert(`Service "${srv.name}" configuration updated!`)} className="px-3 py-1 text-[11px] border border-border rounded-lg font-semibold hover:bg-muted transition-colors">
                        Manage Service
                      </button>
                    </div>
                  </div>))}
              </div>
            </div>)}

          {/* TAB: SUB ADMIN (Super Admin / Sub Admin / Employees Directory) */}
          {(activeTab === "sub_admin" || activeTab === "all_in_one") && (<div id="sec-sub-admin" className="space-y-6 animate-fade-in text-left pt-6 border-t border-border scroll-mt-20">
              
              {/* Top Navigation Pills (Matching Screenshots 1, 2, 3) */}
              <div className="flex items-center gap-3">
                <button type="button" onClick={() => setClientSubAdminTab("super-admin")} className={`px-5 py-2 rounded-2xl text-xs font-bold transition-all shadow-sm ${clientSubAdminTab === "super-admin"
                ? "bg-blue-600 text-white shadow-blue-600/30"
                : "bg-muted/60 text-muted-foreground hover:bg-muted"}`}>
                  Super Admin
                </button>
                <button type="button" onClick={() => setClientSubAdminTab("sub-admins")} className={`px-5 py-2 rounded-2xl text-xs font-bold transition-all shadow-sm ${clientSubAdminTab === "sub-admins"
                ? "bg-blue-600 text-white shadow-blue-600/30"
                : "bg-muted/60 text-muted-foreground hover:bg-muted"}`}>
                  Sub Admin
                </button>
                <button type="button" onClick={() => setClientSubAdminTab("employees")} className={`px-5 py-2 rounded-2xl text-xs font-bold transition-all shadow-sm ${clientSubAdminTab === "employees"
                ? "bg-blue-600 text-white shadow-blue-600/30"
                : "bg-muted/60 text-muted-foreground hover:bg-muted"}`}>
                  Employees
                </button>
              </div>

              {/* Main Directory Container Card */}
              <div className="p-6 sm:p-8 rounded-3xl border border-border bg-card shadow-sm space-y-6">

                {/* ---------------------------------------------------- */}
                {/* 1. SUPER ADMIN DIRECTORY SUB-TAB                      */}
                {/* ---------------------------------------------------- */}
                {clientSubAdminTab === "super-admin" && (<div className="space-y-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <h2 className="text-xl font-bold font-display text-foreground flex items-center gap-2">
                          <span>Super Admin Directory</span>
                          <span className="text-amber-500 text-lg">👑</span>
                        </h2>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Manage master platform owners, security scopes, and notification alerts.
                        </p>
                      </div>
                      <button onClick={() => {
                    const name = prompt("Enter Super Admin Name:");
                    const email = prompt("Enter Super Admin Email:");
                    if (name && email) {
                        setSuperAdminDirectory(prev => [
                            ...prev,
                            { id: `sa-dir-${Date.now()}`, name, email, role: "SuperAdmin", permissions: "Full Access", status: "Active", notificationEnabled: true, portalLink: "/sg-superadmin" }
                        ]);
                    }
                }} className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-1.5 shrink-0">
                        <Plus className="w-4 h-4"/>
                        <span>Invite Super Admin</span>
                      </button>
                    </div>

                    {/* Table View Matching Image 1 */}
                    <div className="overflow-x-auto border border-border/60 rounded-2xl">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-border bg-muted/30 text-muted-foreground font-bold uppercase text-[10px] tracking-wider">
                            <th className="px-5 py-3.5">NAME</th>
                            <th className="px-5 py-3.5">EMAIL</th>
                            <th className="px-5 py-3.5">ROLE</th>
                            <th className="px-5 py-3.5">PERMISSIONS</th>
                            <th className="px-5 py-3.5">STATUS</th>
                            <th className="px-5 py-3.5">NOTIFICATIONS</th>
                            <th className="px-5 py-3.5">PORTAL LINK</th>
                            <th className="px-5 py-3.5 text-right">ACTIONS</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border/40">
                          {superAdminDirectory.map((admin) => (<tr key={admin.id} className="hover:bg-muted/20 transition-colors">
                              <td className="px-5 py-4 font-bold text-foreground">{admin.name}</td>
                              <td className="px-5 py-4 font-mono text-[11px] text-muted-foreground">{admin.email}</td>
                              <td className="px-5 py-4">
                                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-600 border border-amber-500/20 inline-flex items-center gap-1">
                                  <span>👑</span> {admin.role}
                                </span>
                              </td>
                              <td className="px-5 py-4 font-bold text-foreground">{admin.permissions}</td>
                              <td className="px-5 py-4">
                                <span className="text-emerald-500 font-bold flex items-center gap-1 text-[11px]">
                                  <span>●</span> {admin.status}
                                </span>
                              </td>
                              <td className="px-5 py-4">
                                <button onClick={() => {
                        setSuperAdminDirectory(prev => prev.map(item => item.id === admin.id ? { ...item, notificationEnabled: !item.notificationEnabled } : item));
                    }} className={`px-3 py-1 rounded-xl text-[11px] font-bold border transition-all inline-flex items-center gap-1.5 ${admin.notificationEnabled
                        ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                        : "bg-muted text-muted-foreground border-border"}`}>
                                  <Bell className="w-3 h-3"/>
                                  <span>{admin.notificationEnabled ? "Enabled" : "Muted"}</span>
                                </button>
                              </td>
                              <td className="px-5 py-4">
                                <div className="flex items-center gap-2 font-mono text-[11px] text-muted-foreground">
                                  <span>{admin.portalLink}</span>
                                  <button onClick={() => {
                        navigator.clipboard.writeText(`${window.location.origin}${admin.portalLink}`);
                        alert("SuperAdmin portal link copied to clipboard!");
                    }} className="p-1 hover:text-primary transition-colors" title="Copy link">
                                    <FileText className="w-3.5 h-3.5"/>
                                  </button>
                                  <a href={admin.portalLink} target="_blank" rel="noreferrer" className="p-1 hover:text-primary transition-colors" title="Open portal">
                                    <ExternalLink className="w-3.5 h-3.5"/>
                                  </a>
                                </div>
                              </td>
                              <td className="px-5 py-4 text-right">
                                <button onClick={() => alert(`Direct notification dispatched to ${admin.name}`)} className="p-2 rounded-xl text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors" title="Send Notification">
                                  <BellRing className="w-4 h-4"/>
                                </button>
                              </td>
                            </tr>))}
                        </tbody>
                      </table>
                    </div>
                  </div>)}

                {/* ---------------------------------------------------- */}
                {/* 2. SUB ADMIN DIRECTORY SUB-TAB                        */}
                {/* ---------------------------------------------------- */}
                {clientSubAdminTab === "sub-admins" && (<div className="space-y-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <h2 className="text-xl font-bold font-display text-foreground">
                          Administrative Team Directory
                        </h2>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Click any Sub Admin card to view or manage permissions, roles, and notification details.
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {subAdminDirectory.length < 4 && (<button onClick={() => {
                        setSubAdminDirectory([
                            { id: "sub-1", sgId: "SG-A-101", name: "Alex Rivera", email: "alex.rivera@georgemaijo.com", role: "Senior Account Executive", accessScope: "Full Access", avatar: "AR" },
                            { id: "sub-2", sgId: "SG-A-102", name: "Rahul Kumar", email: "rahul.kumar@georgemaijo.com", role: "Field Sales Specialist", accessScope: "Read/Write", avatar: "RK" },
                            { id: "sub-3", sgId: "SG-A-103", name: "Sarah Jenkins", email: "sarah.jenkins@georgemaijo.com", role: "Enterprise Sales Director", accessScope: "Read/Write", avatar: "SJ" },
                            { id: "sub-4", sgId: "SG-A-104", name: "Marcus Vance", email: "marcus.vance@georgemaijo.com", role: "SDR & Demo Specialist", accessScope: "Read/Write", avatar: "MV" },
                        ]);
                    }} className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-1.5 shrink-0">
                            <UserPlus className="w-4 h-4"/>
                            <span>+ Add 4 Sub Admins</span>
                          </button>)}
                        <button onClick={() => {
                    const name = prompt("Enter Sub Admin Name:");
                    const email = prompt("Enter Sub Admin Email:");
                    const role = prompt("Enter Role (Developer / Operator / Support):", "Operator") || "Operator";
                    if (name && email) {
                        const newCount = subAdminDirectory.length + 101;
                        setSubAdminDirectory(prev => [
                            ...prev,
                            { id: `sub-${Date.now()}`, sgId: `SG-A-${newCount}`, name, email, role, accessScope: "Read/Write", avatar: name.charAt(0).toUpperCase() }
                        ]);
                    }
                }} className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-1.5 shrink-0">
                          <Plus className="w-4 h-4"/>
                          <span>Invite Sub Admin</span>
                        </button>
                      </div>
                    </div>

                    {subAdminDirectory.length === 0 ? (<div className="p-12 text-center rounded-2xl bg-card border border-dashed border-border/80 space-y-4">
                        <div className="w-12 h-12 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center mx-auto">
                          <Users className="w-6 h-6"/>
                        </div>
                        <div>
                          <h4 className="text-base font-bold text-foreground">No Sub Admins Found</h4>
                          <p className="text-xs text-muted-foreground max-w-sm mx-auto mt-1">
                            Click below to populate the 4 default George Maijo sub admin team members.
                          </p>
                        </div>
                        <button onClick={() => {
                        setSubAdminDirectory([
                            { id: "sub-1", sgId: "SG-A-101", name: "Alex Rivera", email: "alex.rivera@georgemaijo.com", role: "Senior Account Executive", accessScope: "Full Access", avatar: "AR" },
                            { id: "sub-2", sgId: "SG-A-102", name: "Rahul Kumar", email: "rahul.kumar@georgemaijo.com", role: "Field Sales Specialist", accessScope: "Read/Write", avatar: "RK" },
                            { id: "sub-3", sgId: "SG-A-103", name: "Sarah Jenkins", email: "sarah.jenkins@georgemaijo.com", role: "Enterprise Sales Director", accessScope: "Read/Write", avatar: "SJ" },
                            { id: "sub-4", sgId: "SG-A-104", name: "Marcus Vance", email: "marcus.vance@georgemaijo.com", role: "SDR & Demo Specialist", accessScope: "Read/Write", avatar: "MV" },
                        ]);
                    }} className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs inline-flex items-center gap-2 shadow-md">
                          <UserPlus className="w-4 h-4"/>
                          <span>+ Populate 4 George Maijo Sub Admins</span>
                        </button>
                      </div>) : (
                /* Cards Grid Matching Image 2 */
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {subAdminDirectory.map((member) => (<div key={member.id} className="p-5 rounded-2xl border border-border bg-card hover:border-primary/40 transition-all shadow-sm flex flex-col justify-between space-y-4 hover:-translate-y-1">
                            {/* TOP: SG-ID Pill & Role Badge */}
                            <div className="flex items-center justify-between gap-2">
                              <span className="px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-600 font-mono text-[11px] font-extrabold border border-blue-500/20">
                                {member.sgId}
                              </span>
                              <span className={`px-2.5 py-1 rounded-md text-[10px] font-extrabold ${member.role.includes("Developer")
                            ? "bg-indigo-500/10 text-indigo-500 border border-indigo-500/20"
                            : member.role.includes("Support")
                                ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                                : "bg-blue-500/10 text-blue-500 border border-blue-500/20"}`}>
                                {member.role}
                              </span>
                            </div>

                            {/* MIDDLE: Big Avatar Circle & Name/Email */}
                            <div className="flex flex-col items-center justify-center py-2 space-y-2 text-center">
                              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-extrabold text-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                                {member.avatar}
                              </div>
                              <div className="w-full min-w-0">
                                <h4 className="text-sm font-extrabold text-foreground font-display truncate">
                                  {member.name}
                                </h4>
                                <p className="text-[10px] text-muted-foreground font-mono truncate mt-0.5">
                                  {member.email}
                                </p>
                              </div>
                            </div>

                            {/* BOTTOM: ACCESS SCOPE & Action Buttons */}
                            <div className="pt-3 border-t border-border flex flex-col space-y-2.5">
                              <div className="flex items-center justify-between text-[10px]">
                                <span className="font-extrabold text-muted-foreground uppercase tracking-wider">ACCESS SCOPE:</span>
                                <span className="px-2 py-0.5 rounded-md font-extrabold bg-blue-500/10 text-blue-500 border border-blue-500/20">
                                  {member.accessScope}
                                </span>
                              </div>

                              <div className="flex items-center gap-2">
                                <button type="button" onClick={() => setEditingSubAdmin(member)} className="flex-1 py-1.5 rounded-xl text-xs font-bold transition-all text-center bg-muted/60 hover:bg-primary hover:text-white text-foreground cursor-pointer">
                                  View & Edit Options
                                </button>
                                <button type="button" onClick={() => {
                            if (confirm(`Remove ${member.name} from sub-admin team?`)) {
                                setSubAdminDirectory(prev => prev.filter(item => item.id !== member.id));
                            }
                        }} className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/20 transition-all shrink-0" title={`Delete ${member.name}`}>
                                  <Trash2 className="w-3.5 h-3.5"/>
                                </button>
                              </div>
                            </div>
                          </div>))}
                      </div>)}
                  </div>)}

                {/* ---------------------------------------------------- */}
                {/* 3. EMPLOYEES DIRECTORY SUB-TAB                        */}
                {/* ---------------------------------------------------- */}
                {clientSubAdminTab === "employees" && (<div className="space-y-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <h2 className="text-xl font-bold font-display text-foreground">
                          Employee Directory
                        </h2>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Manage tasks, permissions access, status, notification options and assignments of all employees.
                        </p>
                      </div>
                      <button onClick={() => {
                    const name = prompt("Enter Employee Name:");
                    const email = prompt("Enter Employee Email:");
                    const work = prompt("Enter Employee Task / Service:", "Customer Support") || "Customer Support";
                    if (name && email) {
                        setEmployeeDirectory(prev => [
                            ...prev,
                            { id: `emp-${Date.now()}`, name, email, work, assignedSubAdmin: "Operator Main", accessScope: "View Only", avatar: name.charAt(0).toUpperCase() }
                        ]);
                    }
                }} className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-1.5 shrink-0">
                        <Plus className="w-4 h-4"/>
                        <span>Add New Employee</span>
                      </button>
                    </div>

                    {/* Employee Cards Grid Matching Image 3 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {employeeDirectory.map((emp) => (<div key={emp.id} className="p-5 rounded-2xl border border-border bg-card hover:border-primary/40 transition-all shadow-sm flex flex-col justify-between space-y-4 hover:-translate-y-1">
                          {/* TOP: Work Module & Assigned Sub-Admin Badges */}
                          <div className="flex items-center justify-between gap-2">
                            <span className="px-2 py-1 rounded-md bg-indigo-500/10 text-indigo-500 font-bold text-[10px] border border-indigo-500/20 truncate max-w-[110px]" title={emp.work}>
                              {emp.work}
                            </span>
                            <span className="px-2 py-1 rounded-md bg-muted text-muted-foreground font-bold text-[10px] border border-border truncate max-w-[100px]" title={emp.assignedSubAdmin}>
                              {emp.assignedSubAdmin}
                            </span>
                          </div>

                          {/* MIDDLE: Big Avatar Circle & Name/Email */}
                          <div className="flex flex-col items-center justify-center py-2 space-y-2 text-center">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white font-extrabold text-2xl flex items-center justify-center shadow-lg shadow-purple-500/20">
                              {emp.avatar}
                            </div>
                            <div className="w-full min-w-0">
                              <h4 className="text-sm font-extrabold text-foreground font-display truncate">
                                {emp.name}
                              </h4>
                              <p className="text-[10px] text-muted-foreground font-mono truncate mt-0.5">
                                {emp.email}
                              </p>
                            </div>
                          </div>

                          {/* BOTTOM: ACCESS SCOPE & Action Buttons */}
                          <div className="pt-3 border-t border-border flex flex-col space-y-2.5">
                            <div className="flex items-center justify-between text-[10px]">
                              <span className="font-extrabold text-muted-foreground uppercase tracking-wider">ACCESS SCOPE:</span>
                              <span className="px-2 py-0.5 rounded-md font-extrabold bg-blue-500/10 text-blue-500 border border-blue-500/20">
                                {emp.accessScope}
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              <button type="button" onClick={() => alert(`Employee Details:\nName: ${emp.name}\nEmail: ${emp.email}\nTask: ${emp.work}\nAssigned Sub-Admin: ${emp.assignedSubAdmin}`)} className="flex-1 py-1.5 rounded-xl text-xs font-bold transition-all text-center bg-muted/60 hover:bg-primary hover:text-white text-foreground">
                                View Options
                              </button>
                              <button type="button" onClick={() => {
                        if (confirm(`Remove ${emp.name} from employee directory?`)) {
                            setEmployeeDirectory(prev => prev.filter(item => item.id !== emp.id));
                        }
                    }} className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/20 transition-all shrink-0" title={`Delete ${emp.name}`}>
                                <Trash2 className="w-3.5 h-3.5"/>
                              </button>
                            </div>
                          </div>
                        </div>))}
                    </div>
                  </div>)}

              </div>
            </div>)}

          {/* TAB: CONTROL FLAGS (Feature Flags & Autopilot) */}
          {(activeTab === "control_flags" || activeTab === "all_in_one") && (<div id="sec-control-flags" className="space-y-6 animate-fade-in text-left pt-6 border-t border-border scroll-mt-20">
              <div className="border-b border-border pb-4">
                <h1 className="text-2xl font-bold font-display text-foreground flex items-center gap-2">
                  <Sliders className="w-6 h-6 text-primary"/>
                  <span>Control Flags & AI Autopilot Toggles</span>
                </h1>
                <p className="text-xs text-muted-foreground">Enable or disable real-time AI automation modules, PSTN dialers, and POS sync engines.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                { key: "aiVoice", title: "AI Voice Receptionist Auto-Dialer", desc: "Automated WebRTC speech synthesizer and phone call intake for equipment booking.", icon: Volume2 },
                { key: "whatsapp", title: "WhatsApp Business API Auto-Reply", desc: "Instant automated WhatsApp responses for product availability and pricing inquiries.", icon: MessageCircle },
                { key: "posInventory", title: "Real-Time POS Inventory Sync", desc: "Sync physical store checkout with online catalogue stock counts in real time.", icon: ShoppingCart },
                { key: "multiCurrency", title: "Dynamic Multi-Currency Converter", desc: "Real-time USD to INR / EUR / GBP / AED currency converter across all product cards.", icon: DollarSign },
                { key: "workflows", title: "Automated Lead Nurturing Pipelines", desc: "Visual automation node execution connecting incoming leads to CRM stages.", icon: Workflow },
                { key: "ragVector", title: "RAG Vector Knowledge Base Search", desc: "Semantic vector document retrieval engine powering support responses.", icon: Database },
            ].map((flag) => {
                const Icon = flag.icon;
                const isEnabled = controlFlags[flag.key];
                return (<div key={flag.key} className="p-5 rounded-2xl border border-border bg-card shadow-sm flex items-start justify-between gap-4">
                      <div className="flex gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                          <Icon className="w-5 h-5"/>
                        </div>
                        <div className="space-y-1">
                          <h3 className="text-sm font-bold text-foreground font-display">{flag.title}</h3>
                          <p className="text-xs text-muted-foreground leading-relaxed">{flag.desc}</p>
                        </div>
                      </div>
                      <button onClick={() => {
                        setControlFlags(prev => ({ ...prev, [flag.key]: !isEnabled }));
                        alert(`"${flag.title}" set to ${!isEnabled ? "ENABLED (Live)" : "DISABLED"}`);
                    }} className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${isEnabled
                        ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
                        : "bg-muted text-muted-foreground"}`}>
                        {isEnabled ? "LIVE (Active)" : "OFF"}
                      </button>
                    </div>);
            })}
              </div>
            </div>)}

          {/* TAB: CLIENT DATA (Customer Records & CRM Contacts) */}
          {(activeTab === "client_data" || activeTab === "all_in_one") && (<div id="sec-client-data" className="space-y-6 animate-fade-in text-left pt-6 border-t border-border scroll-mt-20">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border pb-4">
                <div>
                  <h1 className="text-2xl font-bold font-display text-foreground flex items-center gap-2">
                    <UserCheck className="w-6 h-6 text-primary"/>
                    <span>Client Data & Customer Directory</span>
                  </h1>
                  <p className="text-xs text-muted-foreground">Manage client company accounts, order history, and contact records.</p>
                </div>
                <button onClick={() => setIsAddClientOpen(true)} className="px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-xl text-xs font-semibold shadow-md flex items-center gap-1.5 shrink-0">
                  <Plus className="w-4 h-4"/>
                  <span>+ Add New Client Record</span>
                </button>
              </div>

              <div className="p-6 rounded-2xl border border-border bg-card shadow-sm overflow-x-auto space-y-4">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-border text-muted-foreground font-bold uppercase text-[10px]">
                      <th className="pb-3">Company Account</th>
                      <th className="pb-3">Key Contact</th>
                      <th className="pb-3">Phone & Email</th>
                      <th className="pb-3">Category</th>
                      <th className="pb-3">Orders</th>
                      <th className="pb-3">Total Value</th>
                      <th className="pb-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {clientRecords.map((cli) => (<tr key={cli.id} className="hover:bg-muted/30">
                        <td className="py-3 font-bold text-foreground">{cli.company}</td>
                        <td className="py-3">{cli.contact}</td>
                        <td className="py-3 font-mono text-[11px]">{cli.phone} <br /><span className="text-muted-foreground">{cli.email}</span></td>
                        <td className="py-3"><span className="px-2 py-0.5 bg-primary/10 text-primary rounded font-semibold text-[10px]">{cli.category}</span></td>
                        <td className="py-3 font-mono font-bold">{cli.ordersCount} Orders</td>
                        <td className="py-3 font-mono font-bold text-emerald-500">{formatPrice(cli.totalSpent)}</td>
                        <td className="py-3"><span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-500 rounded-full font-bold text-[10px]">{cli.status}</span></td>
                      </tr>))}
                  </tbody>
                </table>
              </div>
            </div>)}

          {/* TAB: PAYMENT (Gateway & POS Billing) */}
          {(activeTab === "payment" || activeTab === "all_in_one") && (<div id="sec-payment" className="space-y-6 animate-fade-in text-left pt-6 border-t border-border scroll-mt-20">
              <div className="border-b border-border pb-4">
                <h1 className="text-2xl font-bold font-display text-foreground flex items-center gap-2">
                  <CreditCard className="w-6 h-6 text-primary"/>
                  <span>Payment Gateways & Transaction History</span>
                </h1>
                <p className="text-xs text-muted-foreground">Manage POS payment terminals, Stripe, UPI / Razorpay gateways, and billing records.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                { name: "Stripe Credit Cards", status: "Live & Connected", desc: "Visa, MasterCard, Amex", color: "text-blue-500" },
                { name: "UPI / Razorpay Gateway", status: "Live & Connected", desc: "GPay, PhonePe, Paytm, BHIM", color: "text-emerald-500" },
                { name: "POS Terminal Hardware", status: "Active Device", desc: "Thermal Receipt Printer connected", color: "text-purple-500" },
                { name: "Cash on Delivery (COD)", status: "Enabled", desc: "Pay on fleet equipment delivery", color: "text-amber-500" },
            ].map((gate, idx) => (<div key={idx} className="p-5 rounded-2xl border border-border bg-card shadow-sm space-y-2">
                    <div className="flex justify-between items-center">
                      <CreditCard className={`w-5 h-5 ${gate.color}`}/>
                      <span className="text-[10px] font-bold bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded-full">{gate.status}</span>
                    </div>
                    <h3 className="text-sm font-bold text-foreground font-display">{gate.name}</h3>
                    <p className="text-xs text-muted-foreground">{gate.desc}</p>
                  </div>))}
              </div>

              {/* Transactions Table */}
              <div className="p-6 rounded-2xl border border-border bg-card shadow-sm space-y-4">
                <h3 className="text-sm font-bold font-display">Recent Completed Transactions</h3>
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-border text-muted-foreground font-bold uppercase text-[10px]">
                      <th className="pb-3">Txn ID</th>
                      <th className="pb-3">Client Account</th>
                      <th className="pb-3">Date</th>
                      <th className="pb-3">Payment Method</th>
                      <th className="pb-3">Amount</th>
                      <th className="pb-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {transactions.map((txn) => (<tr key={txn.id} className="hover:bg-muted/30">
                        <td className="py-3 font-mono font-bold text-primary">{txn.id}</td>
                        <td className="py-3 font-bold text-foreground">{txn.client}</td>
                        <td className="py-3 font-mono text-[11px] text-muted-foreground">{txn.date}</td>
                        <td className="py-3">{txn.method}</td>
                        <td className="py-3 font-mono font-bold text-emerald-500">{formatPrice(txn.amount)}</td>
                        <td className="py-3"><span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-500 rounded-full font-bold text-[10px]">{txn.status}</span></td>
                      </tr>))}
                  </tbody>
                </table>
              </div>
            </div>)}

          {/* TAB: SETTING (Company Profile Configuration) */}
          {(activeTab === "setting" || activeTab === "all_in_one") && (<div id="sec-setting" className="space-y-6 animate-fade-in text-left pt-6 border-t border-border scroll-mt-20">
              <div className="border-b border-border pb-4">
                <h1 className="text-2xl font-bold font-display text-foreground flex items-center gap-2">
                  <Settings className="w-6 h-6 text-primary"/>
                  <span>Company Settings & Preferences</span>
                </h1>
                <p className="text-xs text-muted-foreground">Configure business name, category, support contacts, and custom domain settings.</p>
              </div>

              <form onSubmit={handleSaveCompanySettings} className="p-6 rounded-2xl border border-border bg-card shadow-sm space-y-4 max-w-2xl">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-foreground">Registered Business Name</label>
                  <input type="text" value={settingCompany} onChange={(e) => setSettingCompany(e.target.value)} className="w-full p-2.5 text-xs rounded-xl border border-border bg-background focus:ring-1 focus:ring-primary font-bold"/>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-foreground">Business Operating Category</label>
                  <input type="text" value={settingType} onChange={(e) => setSettingType(e.target.value)} className="w-full p-2.5 text-xs rounded-xl border border-border bg-background focus:ring-1 focus:ring-primary"/>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-foreground">Support Email</label>
                    <input type="email" value={settingEmail} onChange={(e) => setSettingEmail(e.target.value)} className="w-full p-2.5 text-xs rounded-xl border border-border bg-background focus:ring-1 focus:ring-primary font-mono"/>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-foreground">Support Phone</label>
                    <input type="text" value={settingPhone} onChange={(e) => setSettingPhone(e.target.value)} className="w-full p-2.5 text-xs rounded-xl border border-border bg-background focus:ring-1 focus:ring-primary font-mono"/>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-foreground">Custom Application URL</label>
                  <input type="text" value={settingDomain} onChange={(e) => setSettingDomain(e.target.value)} className="w-full p-2.5 text-xs rounded-xl border border-border bg-background focus:ring-1 focus:ring-primary font-mono font-bold text-primary"/>
                </div>

                {/* Company Custom Brand Theme Selector */}
                <div className="space-y-2 pt-2 border-t border-border">
                  <label className="text-xs font-extrabold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-primary"/> Company Brand Color Theme
                  </label>
                  <p className="text-[11px] text-muted-foreground">
                    Customize your company&apos;s admin dashboard color palette and button accents.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                    {[
                { id: "emerald", name: "Agri Emerald", color: "bg-emerald-500", border: "border-emerald-500" },
                { id: "blue", name: "Sapphire Blue", color: "bg-blue-600", border: "border-blue-600" },
                { id: "indigo", name: "Royal Indigo", color: "bg-indigo-600", border: "border-indigo-600" },
                { id: "purple", name: "Imperial Purple", color: "bg-purple-600", border: "border-purple-600" },
            ].map((thm) => (<button key={thm.id} type="button" onClick={() => setSettingTheme(thm.id)} className={`p-3 rounded-xl border-2 text-left flex items-center gap-2.5 transition-all ${settingTheme === thm.id
                    ? `${thm.border} bg-primary/5 font-bold`
                    : "border-border hover:border-muted-foreground/30 bg-background"}`}>
                        <span className={`w-4 h-4 rounded-full ${thm.color} shrink-0 shadow-sm`}/>
                        <span className="text-xs font-semibold text-foreground truncate">{thm.name}</span>
                      </button>))}
                  </div>
                </div>

                <button type="submit" className="px-6 py-2.5 bg-primary text-white rounded-xl text-xs font-bold shadow-md hover:opacity-90 transition-all active:scale-95">
                  Save Business Settings & Brand Theme
                </button>
              </form>
            </div>)}

          {/* TAB: MY PROFILE (Admin Profile & Security) */}
          {(activeTab === "my_profile" || activeTab === "all_in_one") && (<div id="sec-my-profile" className="space-y-6 animate-fade-in text-left pt-6 border-t border-border scroll-mt-20">
              <div className="border-b border-border pb-4">
                <h1 className="text-2xl font-bold font-display text-foreground flex items-center gap-2">
                  <User className="w-6 h-6 text-primary"/>
                  <span>My Admin Profile & Security</span>
                </h1>
                <p className="text-xs text-muted-foreground">Manage personal profile details, change password, and configure 2FA authentication.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl border border-border bg-card shadow-sm text-center space-y-4">
                  <div className="w-20 h-20 rounded-full bg-primary text-white font-extrabold text-2xl flex items-center justify-center mx-auto shadow-lg">
                    NS
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-foreground font-display">{profileName}</h3>
                    <p className="text-xs text-primary font-semibold">{user?.role || "Master Admin"}</p>
                    <p className="text-xs text-muted-foreground font-mono mt-1">{profileEmail}</p>
                  </div>
                  <span className="inline-block px-3 py-1 bg-emerald-500/10 text-emerald-500 rounded-full text-xs font-bold">
                    Super Admin Access Granted
                  </span>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); alert("Security password updated!"); setCurrentPassword(""); setNewPassword(""); }} className="lg:col-span-2 p-6 rounded-2xl border border-border bg-card shadow-sm space-y-4">
                  <h3 className="text-sm font-bold font-display">Update Password & Security Credentials</h3>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-foreground">Current Password</label>
                    <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder="••••••••" className="w-full p-2.5 text-xs rounded-xl border border-border bg-background focus:ring-1 focus:ring-primary"/>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-foreground">New Password</label>
                    <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="••••••••" className="w-full p-2.5 text-xs rounded-xl border border-border bg-background focus:ring-1 focus:ring-primary"/>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-xl border border-border">
                    <div>
                      <p className="text-xs font-bold text-foreground">Two-Factor Authentication (2FA)</p>
                      <p className="text-[10px] text-muted-foreground">Require OTP code upon admin login.</p>
                    </div>
                    <button type="button" onClick={() => setTwoFactorAuth(!twoFactorAuth)} className={`px-3 py-1.5 rounded-xl text-xs font-bold ${twoFactorAuth ? "bg-emerald-500 text-white" : "bg-muted text-muted-foreground"}`}>
                      {twoFactorAuth ? "ENABLED" : "OFF"}
                    </button>
                  </div>

                  <button type="submit" className="px-6 py-2.5 bg-primary text-white rounded-xl text-xs font-bold shadow-md hover:opacity-90">
                    Update Security Password
                  </button>
                </form>
              </div>
            </div>)}

      {/* ADD PRODUCT MODAL FOR CLIENT ADMIN */}
      {isAddProductOpen && (<div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg bg-card border border-border rounded-2xl shadow-2xl p-6 space-y-5 animate-scaleUp text-left">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <Package className="w-4 h-4"/>
                </div>
                <div>
                  <h3 className="text-base font-bold font-display text-foreground">Add New Product</h3>
                  <p className="text-[11px] text-muted-foreground">Fill in details to list a new product in your catalogue.</p>
                </div>
              </div>
              <button onClick={() => setIsAddProductOpen(false)} className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors" aria-label="Close Modal">
                <X className="w-4 h-4"/>
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Product Name *</label>
                  <input type="text" required value={prodName} onChange={(e) => setProdName(e.target.value)} placeholder="e.g. George Maijo Power Weeder" className="w-full p-2.5 rounded-xl border border-border bg-background text-xs focus:ring-1 focus:ring-primary"/>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Category</label>
                  <select value={prodCategory} onChange={(e) => setProdCategory(e.target.value)} className="w-full p-2.5 rounded-xl border border-border bg-background text-xs focus:ring-1 focus:ring-primary">
                    <option value="Dairy & Eggs">Dairy & Eggs</option>
                    <option value="Grains & Rice">Grains & Rice</option>
                    <option value="Oils & Spices">Oils & Spices</option>
                    <option value="Beverages">Beverages</option>
                    <option value="Bakery">Bakery</option>
                    <option value="Produce">Produce</option>
                    <option value="General Retail">General Retail</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="font-semibold text-foreground">SKU Code</label>
                    <button type="button" onClick={() => setProdSku(`SKU-${Math.floor(100000 + Math.random() * 900000)}`)} className="text-[10px] text-primary hover:underline font-semibold">
                      Auto-generate
                    </button>
                  </div>
                  <input type="text" value={prodSku} onChange={(e) => setProdSku(e.target.value)} placeholder="e.g. GR-OIL-101" className="w-full p-2.5 rounded-xl border border-border bg-background text-xs font-mono focus:ring-1 focus:ring-primary"/>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Variant Option</label>
                  <select value={prodVariants} onChange={(e) => setProdVariants(e.target.value)} className="w-full p-2.5 rounded-xl border border-border bg-background text-xs focus:ring-1 focus:ring-primary">
                    <option value="Single Variant">Single Variant</option>
                    <option value="Pack of 4">Pack of 4</option>
                    <option value="1 Litre">1 Litre</option>
                    <option value="5kg Pack">5kg Pack</option>
                    <option value="Custom Variant">Custom Variant</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Stock Quantity</label>
                  <input type="number" value={prodStock} onChange={(e) => setProdStock(e.target.value)} placeholder="e.g. 50" className="w-full p-2.5 rounded-xl border border-border bg-background text-xs font-mono focus:ring-1 focus:ring-primary"/>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">Product Image URL (Optional)</label>
                <input type="url" value={prodImage} onChange={(e) => setProdImage(e.target.value)} placeholder="https://images.unsplash.com/photo-..." className="w-full p-2.5 rounded-xl border border-border bg-background text-xs font-mono focus:ring-1 focus:ring-primary"/>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">Product Description</label>
                <textarea rows={2} value={prodDesc} onChange={(e) => setProdDesc(e.target.value)} placeholder="Freshness guarantees, origin, or equipment specs..." className="w-full p-2.5 rounded-xl border border-border bg-background text-xs focus:ring-1 focus:ring-primary"/>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-border">
                <button type="button" onClick={() => setIsAddProductOpen(false)} className="px-4 py-2 border border-border rounded-xl hover:bg-muted text-muted-foreground text-xs font-semibold">
                  Cancel
                </button>
                <button type="submit" disabled={isSavingProd} className="px-4 py-2 bg-primary hover:opacity-90 text-white rounded-xl text-xs font-semibold shadow-md transition-all flex items-center gap-1.5">
                  {isSavingProd ? "Saving..." : "Save Product"}
                </button>
              </div>
            </form>
          </div>
        </div>)}

      {/* MULTI-STEP ADD BROCHURE WIZARD MODAL (2-STEP PDF-FIRST WORKFLOW) */}
      {isAddBrochureOpen && (<div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn overflow-y-auto">
          <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col bg-card border border-border rounded-3xl shadow-2xl my-auto text-left animate-scaleUp overflow-hidden">
            
            {/* Modal Header & Step Indicator */}
            <div className="flex flex-col gap-4 p-6 border-b border-border bg-card shrink-0">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/20 shrink-0">
                    <FilePlus className="w-6 h-6"/>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 font-mono">
                        Step {brochureStep} of 2
                      </span>
                      <span className="text-[11px] text-muted-foreground font-semibold">
                        {brochureStep === 1 && "1. Upload Product Brochure PDF"}
                        {brochureStep === 2 && "2. Review AI Details & Save Product"}
                      </span>
                    </div>
                    <h2 className="text-xl font-extrabold font-display text-foreground mt-1">
                      Add George Maijo Product Brochure
                    </h2>
                  </div>
                </div>

                <button type="button" onClick={() => setIsAddBrochureOpen(false)} className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-colors shrink-0">
                  <X className="w-5 h-5"/>
                </button>
              </div>

              {/* Step Progress Bar */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div className={`h-2 rounded-full transition-all duration-300 ${brochureStep >= 1 ? "bg-blue-600" : "bg-muted"}`}/>
                <div className={`h-2 rounded-full transition-all duration-300 ${brochureStep >= 2 ? "bg-blue-600" : "bg-muted"}`}/>
              </div>
            </div>

            {/* Form Steps - Scrollable */}
            <form onSubmit={handleSaveAddBrochure} className="flex-1 overflow-y-auto p-6 space-y-5 text-xs">

              {/* STEP 1: UPLOAD PRODUCT BROCHURE PDF FIRST */}
              {brochureStep === 1 && (<div className="space-y-4 animate-fadeIn">
                  
                  {/* PDF Upload Card */}
                  <div className="space-y-4 p-6 rounded-2xl border-2 border-dashed border-blue-500/40 bg-blue-500/5 text-center">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center mx-auto shadow-xl shadow-blue-500/30">
                      <FileText className="w-7 h-7"/>
                    </div>

                    <div>
                      <h4 className="text-base font-extrabold text-foreground font-display">
                        Upload Product Brochure PDF Document
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1 max-w-md mx-auto">
                        Upload your brochure PDF file. The AI model will automatically analyze the document, extract the product name, image, category, specifications table, and highlights.
                      </p>
                    </div>

                    <label className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-95 text-white text-xs font-extrabold rounded-xl cursor-pointer shadow-lg shadow-blue-500/25 transition-all active:scale-95">
                      <Upload className="w-4 h-4"/>
                      <span>Select & Upload Brochure PDF</span>
                      <input type="file" accept="application/pdf" className="hidden" onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                        setBrochureData(prev => ({
                            ...prev,
                            pdfFileName: file.name,
                            pdfFile: URL.createObjectURL(file)
                        }));
                        await handleAnalyzePdfBrochure(file.name);
                    }
                }}/>
                    </label>

                    {/* Pre-installed / Sample PDF selection */}
                    <div className="pt-3 border-t border-border/50 text-left space-y-2">
                      <label className="font-extrabold text-foreground text-[10px] uppercase tracking-wider">
                        Or Quick Select an Existing Brochure PDF
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {[
                    { title: "Brush Cutter 4SP PR", pdf: "Brush_Cutter_4SP_PR_Brochure.pdf" },
                    { title: "Power Weeder M700 ECO", pdf: "Power_Weeder_M700_ECO_Brochure.pdf" },
                    { title: "Power Weeder M800 ECO", pdf: "Power_Weeder_M800_ECO_Brochure.pdf" },
                    { title: "BC 520 2SP Brush Cutter", pdf: "George_Maijo_BC_520_2SP_Brochure.pdf" }
                ].map((item, idx) => (<button key={idx} type="button" disabled={isAnalyzingPdf} onClick={async () => {
                        setBrochureData(prev => ({ ...prev, pdfFileName: item.pdf }));
                        await handleAnalyzePdfBrochure(item.pdf);
                    }} className="flex items-center justify-between p-2.5 rounded-xl border border-border bg-background hover:border-blue-500 hover:bg-blue-500/5 transition-all text-left group">
                            <div className="flex items-center gap-2 truncate">
                              <FileText className="w-3.5 h-3.5 text-blue-500 shrink-0"/>
                              <span className="font-bold text-[11px] truncate group-hover:text-blue-600 dark:group-hover:text-blue-400">
                                {item.title}
                              </span>
                            </div>
                            <Sparkles className="w-3 h-3 text-muted-foreground group-hover:text-blue-500 shrink-0"/>
                          </button>))}
                      </div>
                    </div>

                    <div className="space-y-1.5 text-left pt-2">
                      <div className="flex items-center justify-between">
                        <label className="font-extrabold text-foreground text-[10px] uppercase tracking-wider">Type PDF File Name</label>
                        <button type="button" disabled={isAnalyzingPdf} onClick={async () => {
                    await handleAnalyzePdfBrochure(brochureData.pdfFileName || "Brush_Cutter_4SP_PR_Brochure.pdf");
                }} className="text-[10px] text-blue-600 dark:text-blue-400 font-extrabold hover:underline flex items-center gap-1">
                          <Sparkles className="w-3 h-3"/>
                          <span>{isAnalyzingPdf ? "Analyzing PDF..." : "✨ AI Extract & Analyze PDF"}</span>
                        </button>
                      </div>
                      <input type="text" value={brochureData.pdfFileName} onChange={(e) => setBrochureData(prev => ({ ...prev, pdfFileName: e.target.value }))} placeholder="e.g. Brush_Cutter_4SP_PR_Brochure.pdf" className="w-full p-2.5 rounded-xl border border-border bg-background text-xs font-mono font-bold focus:outline-none focus:border-primary"/>
                    </div>

                    {isAnalyzingPdf && (<div className="p-4 rounded-xl border border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-300 font-extrabold text-xs flex items-center justify-center gap-2 animate-pulse">
                        <Sparkles className="w-4 h-4 animate-spin"/>
                        <span>AI Engine is analyzing PDF, extracting product image, text & specs...</span>
                      </div>)}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border gap-3">
                    <button type="button" onClick={() => setIsAddBrochureOpen(false)} className="px-5 py-2.5 border border-border rounded-xl hover:bg-muted text-muted-foreground text-xs font-extrabold transition-all">
                      Cancel
                    </button>
                    <button type="button" disabled={isAnalyzingPdf} onClick={async () => {
                    await handleAnalyzePdfBrochure(brochureData.pdfFileName || "Brush_Cutter_4SP_PR_Brochure.pdf");
                }} className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-extrabold shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2 active:scale-95">
                      <span>Analyze PDF & Continue to Review</span>
                      <ChevronRight className="w-4 h-4"/>
                    </button>
                  </div>
                </div>)}

              {/* STEP 2: REVIEW AI DETAILS & SAVE PRODUCT */}
              {brochureStep === 2 && (<div className="space-y-4 animate-fadeIn">
                  
                  {/* Top Bar: Extracted Image + Basic Information */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl border border-blue-500/30 bg-blue-500/5 dark:bg-slate-900/60">
                    
                    {/* Extracted Product Image */}
                    <div className="space-y-2 flex flex-col items-center justify-center text-center p-2 rounded-xl border border-border bg-background">
                      <label className="font-extrabold text-foreground text-[10px] uppercase tracking-wider">
                        Extracted Product Image
                      </label>
                      <div className="h-28 w-full rounded-lg border border-border bg-slate-100 dark:bg-slate-900 flex items-center justify-center overflow-hidden p-1">
                        {brochureData.image ? (<img src={brochureData.image} alt="Extracted Product" className="max-h-full object-contain"/>) : (<div className="text-muted-foreground text-[10px]">No image</div>)}
                      </div>
                      <label className="px-2.5 py-1 bg-muted hover:bg-muted/80 text-foreground text-[10px] font-extrabold rounded-lg cursor-pointer transition-all flex items-center gap-1">
                        <Upload className="w-3 h-3"/>
                        <span>Change Image</span>
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                        const reader = new FileReader();
                        reader.onload = (evt) => {
                            setBrochureData(prev => ({ ...prev, image: evt.target?.result }));
                        };
                        reader.readAsDataURL(file);
                    }
                }}/>
                      </label>
                    </div>

                    {/* Basic Info Inputs */}
                    <div className="sm:col-span-2 space-y-3">
                      <div className="space-y-1">
                        <label className="font-extrabold text-foreground text-[10px] uppercase tracking-wider">Product Name *</label>
                        <input type="text" required value={brochureData.name} onChange={(e) => setBrochureData(prev => ({ ...prev, name: e.target.value }))} placeholder="e.g. George Maijo Brush Cutter 4SP PR" className="w-full p-2.5 rounded-xl border border-border bg-background text-xs font-bold focus:outline-none focus:border-primary"/>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                          <label className="font-extrabold text-foreground text-[10px] uppercase tracking-wider">Category</label>
                          <select value={brochureData.category} onChange={(e) => setBrochureData(prev => ({ ...prev, category: e.target.value }))} className="w-full p-2 rounded-xl border border-border bg-background text-xs font-bold focus:outline-none focus:border-primary">
                            <option value="Brush Cutter">Brush Cutter</option>
                            <option value="Power Weeder">Power Weeder</option>
                            <option value="Power Tiller">Power Tiller</option>
                            <option value="Combine Harvester">Combine Harvester</option>
                            <option value="Paddy Reaper">Paddy Reaper</option>
                            <option value="Agricultural Equipment">Agricultural Equipment</option>
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label className="font-extrabold text-foreground text-[10px] uppercase tracking-wider">PDF File</label>
                          <input type="text" readOnly value={brochureData.pdfFileName} className="w-full p-2 rounded-xl border border-border bg-muted text-xs font-mono font-bold text-muted-foreground"/>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="font-extrabold text-foreground text-[10px] uppercase tracking-wider">Product Description *</label>
                        <textarea rows={2} required value={brochureData.shortDesc} onChange={(e) => setBrochureData(prev => ({ ...prev, shortDesc: e.target.value }))} className="w-full p-2 rounded-xl border border-border bg-background text-[11px] leading-relaxed focus:outline-none focus:border-primary font-medium"/>
                      </div>
                    </div>

                  </div>

                  {/* Editable AI Extracted Specifications Table & Summary */}
                  <div className="p-4 rounded-2xl border border-blue-500/30 bg-blue-500/5 dark:bg-slate-900/80 text-xs space-y-4">
                    <div className="flex items-center justify-between border-b border-border pb-2">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400"/>
                        <h4 className="font-extrabold text-foreground text-xs uppercase tracking-wider font-display">
                          Editable AI Extracted Technical Specifications ({Object.keys(brochureData.specs || {}).length} Rows)
                        </h4>
                      </div>
                      <button type="button" onClick={() => {
                    const newKey = prompt("Enter new specification attribute name (e.g. Engine Model, Working Width, Fuel Capacity):");
                    if (newKey && newKey.trim()) {
                        const newVal = prompt(`Enter value for "${newKey.trim()}":`) || "Value";
                        setBrochureData(prev => ({
                            ...prev,
                            specs: { ...prev.specs, [newKey.trim()]: newVal.trim() }
                        }));
                    }
                }} className="px-2.5 py-1 bg-blue-600 text-white rounded-lg text-[10px] font-extrabold hover:bg-blue-700 transition-all flex items-center gap-1 shadow-sm active:scale-95">
                        <Plus className="w-3 h-3"/>
                        <span>Add Custom Spec Row</span>
                      </button>
                    </div>

                    {/* Interactive Specs Table */}
                    {Object.keys(brochureData.specs || {}).length > 0 ? (<div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                        {Object.entries(brochureData.specs).map(([key, val], idx) => (<div key={idx} className="flex items-center gap-2 p-2 rounded-xl bg-background border border-border hover:border-blue-500/40 transition-all">
                            <input type="text" value={key} onChange={(e) => {
                            const newKey = e.target.value;
                            setBrochureData(prev => {
                                const updated = { ...prev.specs };
                                delete updated[key];
                                if (newKey)
                                    updated[newKey] = val;
                                return { ...prev, specs: updated };
                            });
                        }} placeholder="Spec Parameter Name" className="w-1/3 p-1.5 rounded-lg border border-border bg-muted/40 font-bold text-foreground text-[11px] focus:outline-none focus:border-blue-500"/>
                            <input type="text" value={val} onChange={(e) => {
                            const newVal = e.target.value;
                            setBrochureData(prev => ({
                                ...prev,
                                specs: { ...prev.specs, [key]: newVal }
                            }));
                        }} placeholder="Spec Parameter Value" className="flex-1 p-1.5 rounded-lg border border-border bg-background text-[11px] font-medium text-foreground focus:outline-none focus:border-blue-500 font-mono"/>
                            <button type="button" onClick={() => {
                            setBrochureData(prev => {
                                const updated = { ...prev.specs };
                                delete updated[key];
                                return { ...prev, specs: updated };
                            });
                        }} className="p-1.5 text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors" title="Delete Row">
                              <Trash2 className="w-3.5 h-3.5"/>
                            </button>
                          </div>))}
                      </div>) : (<div className="p-3 text-center text-muted-foreground text-[11px] font-medium border border-dashed border-border rounded-xl">
                        No specifications extracted yet.
                      </div>)}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border gap-3">
                    <button type="button" onClick={() => setBrochureStep(1)} className="px-5 py-2.5 border border-border rounded-xl hover:bg-muted text-muted-foreground text-xs font-extrabold transition-all">
                      ⬅ Back to Upload PDF
                    </button>
                    <button type="submit" className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:opacity-95 text-white rounded-xl text-xs font-extrabold shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2 active:scale-95">
                      <CheckCircle2 className="w-4 h-4"/> Save Product & Publish to Catalog
                    </button>
                  </div>
                </div>)}

            </form>
          </div>
        </div>)}

      {/* FULL PRODUCT DETAILS & EDIT MODAL */}
      {selectedDetailProduct && (<div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn overflow-y-auto">
          <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col bg-card border border-border rounded-3xl shadow-2xl my-auto text-left animate-scaleUp overflow-hidden">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-border p-6 gap-4 bg-card shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center overflow-hidden shrink-0">
                  {editProductData.image ? (<img src={editProductData.image} alt="Preview" className="w-full h-full object-cover"/>) : (<Package className="w-6 h-6"/>)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-mono">
                      {editProductData.category || selectedDetailProduct.category}
                    </span>
                    <span className="text-[10px] text-muted-foreground font-mono">
                      SKU: {editProductData.sku || selectedDetailProduct.sku || "N/A"}
                    </span>
                  </div>
                  <h2 className="text-xl font-extrabold font-display text-foreground mt-1">
                    {selectedDetailProduct.name}
                  </h2>
                </div>
              </div>

              <button type="button" onClick={() => setSelectedDetailProduct(null)} className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-colors shrink-0">
                <X className="w-5 h-5"/>
              </button>
            </div>

            {/* Scrollable Form Body */}
            <form onSubmit={handleSaveProductEdit} className="flex-1 overflow-y-auto p-6 space-y-5 text-xs">
              
              {/* Product Live Image Preview Banner */}
              {editProductData.image && (<div className="w-full h-44 rounded-2xl border border-border bg-slate-100 dark:bg-slate-900/60 flex items-center justify-center overflow-hidden relative group">
                  <img src={editProductData.image} alt={editProductData.name || "Product"} className="max-h-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"/>
                  <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm text-white px-2.5 py-1 rounded-lg text-[10px] font-mono">
                    Live Image Preview
                  </div>
                </div>)}

              {/* Product Name & AI PDF Spec Analysis */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-extrabold text-foreground text-[11px] uppercase tracking-wider">Product Name *</label>
                  <input type="text" required value={editProductData.name || ""} onChange={(e) => setEditProductData(prev => ({ ...prev, name: e.target.value }))} className="w-full p-3 rounded-xl border border-border bg-background text-xs font-bold focus:outline-none focus:border-primary"/>
                </div>

                <div className="space-y-1.5">
                  <label className="font-extrabold text-foreground text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-blue-500"/> AI PDF Brochure Spec Extraction
                  </label>
                  <button type="button" disabled={isAnalyzingPdf} onClick={async () => {
                const res = await handleAnalyzePdfBrochure(editProductData.name || "");
                if (res) {
                    setEditProductData(prev => ({
                        ...prev,
                        description: res.shortDesc
                    }));
                }
            }} className="w-full p-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-95 text-white text-xs font-extrabold shadow-md transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50">
                    <Sparkles className="w-4 h-4 animate-spin-slow"/>
                    <span>{isAnalyzingPdf ? "Analyzing PDF Brochure..." : "✨ AI Extract Full Details from PDF"}</span>
                  </button>
                </div>
              </div>

              {/* Grid 2: Category, SKU, Stock */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="font-extrabold text-foreground text-[11px] uppercase tracking-wider">Category</label>
                  <input type="text" value={editProductData.category || ""} onChange={(e) => setEditProductData(prev => ({ ...prev, category: e.target.value }))} className="w-full p-3 rounded-xl border border-border bg-background text-xs font-bold focus:outline-none focus:border-primary"/>
                </div>

                <div className="space-y-1.5">
                  <label className="font-extrabold text-foreground text-[11px] uppercase tracking-wider">SKU / Model Code</label>
                  <input type="text" value={editProductData.sku || ""} onChange={(e) => setEditProductData(prev => ({ ...prev, sku: e.target.value }))} className="w-full p-3 rounded-xl border border-border bg-background text-xs font-mono focus:outline-none focus:border-primary"/>
                </div>

                <div className="space-y-1.5">
                  <label className="font-extrabold text-foreground text-[11px] uppercase tracking-wider">Stock Available</label>
                  <input type="number" value={editProductData.stock || 0} onChange={(e) => setEditProductData(prev => ({ ...prev, stock: Number(e.target.value) }))} className="w-full p-3 rounded-xl border border-border bg-background text-xs font-mono font-bold focus:outline-none focus:border-primary"/>
                </div>
              </div>

              {/* Primary Image Upload & URL */}
              <div className="space-y-2 p-4 rounded-2xl border border-border bg-slate-50/50 dark:bg-slate-900/40">
                <div className="flex items-center justify-between">
                  <label className="font-extrabold text-foreground text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5 text-primary"/> Primary Product Image
                  </label>
                  <label className="px-3 py-1 bg-primary/10 hover:bg-primary hover:text-white text-primary text-[11px] font-extrabold rounded-lg cursor-pointer transition-all flex items-center gap-1.5">
                    <Upload className="w-3 h-3"/>
                    <span>Upload Image File</span>
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (evt) => {
                        setEditProductData(prev => ({ ...prev, image: evt.target?.result }));
                    };
                    reader.readAsDataURL(file);
                }
            }}/>
                  </label>
                </div>
                <input type="url" value={editProductData.image || ""} onChange={(e) => setEditProductData(prev => ({ ...prev, image: e.target.value }))} placeholder="https://www.georgemaijoagri.com/wp-content/uploads/..." className="w-full p-2.5 rounded-xl border border-border bg-background text-xs font-mono focus:outline-none focus:border-primary"/>
              </div>

              {/* Multiple Gallery Images Uploader for Carousel Sliding */}
              <div className="space-y-3 p-4 rounded-2xl border border-border bg-slate-50/50 dark:bg-slate-900/40">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <label className="font-extrabold text-foreground text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-indigo-500"/> Multiple Gallery Photos (Sliding Carousel)
                    </label>
                    <p className="text-[10px] text-muted-foreground mt-0.5">
                      Upload multiple product images for sliding carousel view on the main page.
                    </p>
                  </div>
                  <label className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-extrabold rounded-xl cursor-pointer transition-all flex items-center gap-1.5 shrink-0 shadow-sm">
                    <Plus className="w-3.5 h-3.5"/>
                    <span>Upload Multiple Photos</span>
                    <input type="file" multiple accept="image/*" className="hidden" onChange={(e) => {
                const files = Array.from(e.target.files || []);
                files.forEach(file => {
                    const reader = new FileReader();
                    reader.onload = (evt) => {
                        const res = evt.target?.result;
                        setEditProductData(prev => ({
                            ...prev,
                            galleryImages: [...(prev.galleryImages || []), res]
                        }));
                    };
                    reader.readAsDataURL(file);
                });
            }}/>
                  </label>
                </div>

                {/* Uploaded Gallery Thumbnails Grid */}
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2.5 pt-1">
                  {(editProductData.galleryImages || []).map((imgUrl, idx) => (<div key={idx} className="relative aspect-square rounded-xl border border-border bg-background overflow-hidden group shadow-sm">
                      <img src={imgUrl} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover"/>
                      <button type="button" onClick={() => {
                    setEditProductData(prev => ({
                        ...prev,
                        galleryImages: (prev.galleryImages || []).filter((_, i) => i !== idx)
                    }));
                }} className="absolute top-1 right-1 w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center text-[10px] font-bold shadow-md opacity-90 hover:opacity-100 transition-opacity" title="Remove image">
                        ✕
                      </button>
                    </div>))}

                  {(editProductData.galleryImages || []).length === 0 && (<div className="col-span-full py-4 text-center text-[11px] text-muted-foreground border border-dashed border-border rounded-xl">
                      No carousel photos added yet. Click &quot;Upload Multiple Photos&quot; above to add images for sliding.
                    </div>)}
                </div>
              </div>

              {/* 3D Model / 360 Degree View Video Uploader */}
              <div className="space-y-2 p-4 rounded-2xl border border-border bg-slate-50/50 dark:bg-slate-900/40">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <label className="font-extrabold text-foreground text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-purple-500"/> 3D Model / 360° View Asset
                    </label>
                    <p className="text-[10px] text-muted-foreground mt-0.5">
                      Add a 360° video or 3D GLTF asset for interactive view on the main home page.
                    </p>
                  </div>
                  <label className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-[11px] font-extrabold rounded-xl cursor-pointer transition-all flex items-center gap-1.5 shrink-0 shadow-sm">
                    <Upload className="w-3.5 h-3.5"/>
                    <span>Upload 3D Asset</span>
                    <input type="file" accept="video/*,.gltf,.glb" className="hidden" onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (evt) => {
                        setEditProductData(prev => ({ ...prev, hologramVideo: evt.target?.result }));
                    };
                    reader.readAsDataURL(file);
                }
            }}/>
                  </label>
                </div>

                <input type="text" value={editProductData.hologramVideo || ""} onChange={(e) => setEditProductData(prev => ({ ...prev, hologramVideo: e.target.value }))} placeholder="e.g. /videos/remove_all_the_background.mp4 or 3D model URL" className="w-full p-2.5 rounded-xl border border-border bg-background text-xs font-mono focus:outline-none focus:border-primary"/>
              </div>

              {/* Grid 3: Brochure PDF Link */}
              <div className="space-y-1.5">
                <label className="font-extrabold text-foreground text-[11px] uppercase tracking-wider">Brochure PDF Link</label>
                <input type="text" value={editProductData.brochure || ""} onChange={(e) => setEditProductData(prev => ({ ...prev, brochure: e.target.value }))} placeholder="e.g. equipment_spec.pdf" className="w-full p-3 rounded-xl border border-border bg-background text-xs font-mono focus:outline-none focus:border-primary"/>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="font-extrabold text-foreground text-[11px] uppercase tracking-wider">Full Product Description</label>
                <textarea rows={3} value={editProductData.description || ""} onChange={(e) => setEditProductData(prev => ({ ...prev, description: e.target.value }))} className="w-full p-3 rounded-xl border border-border bg-background text-xs leading-relaxed focus:outline-none focus:border-primary font-medium"/>
              </div>
            </form>

            {/* Sticky Modal Actions Footer */}
            <div className="flex items-center justify-between p-6 border-t border-border bg-card shrink-0 gap-3">
              <button type="button" onClick={() => setSelectedDetailProduct(null)} className="px-5 py-2.5 border border-border rounded-xl hover:bg-muted text-muted-foreground text-xs font-extrabold transition-all">
                Cancel
              </button>

              <button type="button" onClick={handleSaveProductEdit} className="px-6 py-2.5 bg-primary hover:opacity-90 text-white rounded-xl text-xs font-extrabold shadow-lg shadow-primary/20 transition-all flex items-center gap-2 active:scale-95">
                <CheckCircle2 className="w-4 h-4"/> Save & Update Product Details
              </button>
            </div>
          </div>
        </div>)}

      {/* ADD LEAD MODAL FOR SALES CRM */}
      {isAddLeadOpen && (<div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl p-6 space-y-4 animate-scaleUp text-left">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <Users className="w-4 h-4"/>
                </div>
                <div>
                  <h3 className="text-base font-bold font-display text-foreground">Add New CRM Lead</h3>
                  <p className="text-[11px] text-muted-foreground">Provision a new prospect into the sales pipeline.</p>
                </div>
              </div>
              <button onClick={() => setIsAddLeadOpen(false)} className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted" aria-label="Close Modal">
                <X className="w-4 h-4"/>
              </button>
            </div>

            <form onSubmit={handleCreateLead} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-foreground">Lead Account Name *</label>
                <input type="text" required value={leadNameInput} onChange={(e) => setLeadNameInput(e.target.value)} placeholder="e.g. Apex Logistics Ltd." className="w-full p-2.5 rounded-xl border border-border bg-background text-xs focus:ring-1 focus:ring-primary"/>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Deal Value ($) *</label>
                  <input type="text" required value={leadValueInput} onChange={(e) => setLeadValueInput(e.target.value)} placeholder="e.g. $45,000" className="w-full p-2.5 rounded-xl border border-border bg-background text-xs focus:ring-1 focus:ring-primary"/>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Pipeline Stage</label>
                  <select value={leadStageInput} onChange={(e) => setLeadStageInput(e.target.value)} className="w-full p-2.5 rounded-xl border border-border bg-background text-xs focus:ring-1 focus:ring-primary">
                    <option value="incoming">Incoming Lead</option>
                    <option value="meeting">Meeting Scheduled</option>
                    <option value="proposal">Proposal Sent</option>
                    <option value="closed">Closed / Won</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">Win Probability (%)</label>
                <input type="number" value={leadProbInput} onChange={(e) => setLeadProbInput(e.target.value)} placeholder="e.g. 85" className="w-full p-2.5 rounded-xl border border-border bg-background text-xs font-mono focus:ring-1 focus:ring-primary"/>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">Meeting Notes & Summary</label>
                <textarea rows={2} value={leadSummaryInput} onChange={(e) => setLeadSummaryInput(e.target.value)} placeholder="Key notes from initial conversation or receptionist AI intake..." className="w-full p-2.5 rounded-xl border border-border bg-background text-xs focus:ring-1 focus:ring-primary"/>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-border">
                <button type="button" onClick={() => setIsAddLeadOpen(false)} className="px-4 py-2 border rounded-xl text-muted-foreground text-xs font-semibold">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-primary hover:opacity-90 text-white rounded-xl text-xs font-semibold shadow-md">
                  Add Lead to CRM
                </button>
              </div>
            </form>
          </div>
        </div>)}

      {/* SCHEDULE SALESMAN TIME SLOT MODAL */}
      {isAddScheduleOpen && (<div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl p-6 space-y-4 animate-scaleUp text-left">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <CalendarDays className="w-4 h-4"/>
                </div>
                <div>
                  <h3 className="text-base font-bold font-display text-foreground">Schedule Salesman Time Slot</h3>
                  <p className="text-[11px] text-muted-foreground">Book client appointment, field visit, or call for a sales rep.</p>
                </div>
              </div>
              <button onClick={() => setIsAddScheduleOpen(false)} className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted" aria-label="Close Modal">
                <X className="w-4 h-4"/>
              </button>
            </div>

            <form onSubmit={handleCreateSchedule} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-foreground">Client / Lead Account Name *</label>
                <input type="text" required value={schLeadName} onChange={(e) => setSchLeadName(e.target.value)} placeholder="e.g. Tesla India Retail" className="w-full p-2.5 rounded-xl border border-border bg-background text-xs focus:ring-1 focus:ring-primary"/>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">Assigned Sales Representative *</label>
                <select value={schSalesmanId} onChange={(e) => setSchSalesmanId(e.target.value)} className="w-full p-2.5 rounded-xl border border-border bg-background text-xs focus:ring-1 focus:ring-primary font-bold">
                  {salesReps.map((rep) => (<option key={rep.id} value={rep.id}>
                      {rep.name} ({rep.role} — Shift: {rep.shift})
                    </option>))}
                </select>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Date</label>
                  <input type="date" value={schDate} onChange={(e) => setSchDate(e.target.value)} className="w-full p-2.5 rounded-xl border border-border bg-background text-xs font-medium focus:ring-1 focus:ring-primary cursor-pointer"/>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Start Time</label>
                  <select value={schStartTime} onChange={(e) => setSchStartTime(e.target.value)} className="w-full p-2.5 rounded-xl border border-border bg-background text-xs font-mono focus:ring-1 focus:ring-primary cursor-pointer">
                    {TIME_SLOTS.map((slot) => (<option key={slot} value={slot}>
                        {slot}
                      </option>))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-foreground">End Time</label>
                  <select value={schEndTime} onChange={(e) => setSchEndTime(e.target.value)} className="w-full p-2.5 rounded-xl border border-border bg-background text-xs font-mono focus:ring-1 focus:ring-primary cursor-pointer">
                    {TIME_SLOTS.map((slot) => (<option key={slot} value={slot}>
                        {slot}
                      </option>))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Appointment Type</label>
                  <select value={schMeetingType} onChange={(e) => setSchMeetingType(e.target.value)} className="w-full p-2.5 rounded-xl border border-border bg-background text-xs focus:ring-1 focus:ring-primary font-medium">
                    <option value="GPS Field Visit">📍 GPS Field Visit</option>
                    <option value="Video Demo">💻 Video Demo</option>
                    <option value="Phone Call">📞 Phone Call</option>
                    <option value="Site Audit">🏗️ Site Audit</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Location / Link</label>
                  <input type="text" value={schLocation} onChange={(e) => setSchLocation(e.target.value)} placeholder="e.g. Google Meet or Client Office" className="w-full p-2.5 rounded-xl border border-border bg-background text-xs focus:ring-1 focus:ring-primary"/>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">Agenda & Meeting Notes</label>
                <textarea rows={2} value={schNotes} onChange={(e) => setSchNotes(e.target.value)} placeholder="Details of demo, catalog presentation, or pricing discussion..." className="w-full p-2.5 rounded-xl border border-border bg-background text-xs focus:ring-1 focus:ring-primary"/>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-border">
                <button type="button" onClick={() => setIsAddScheduleOpen(false)} className="px-4 py-2 border rounded-xl text-muted-foreground text-xs font-semibold">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-primary hover:opacity-90 text-white rounded-xl text-xs font-semibold shadow-md">
                  Save Time Schedule
                </button>
              </div>
            </form>
          </div>
        </div>)}

      {/* ADD SALES REPRESENTATIVE MODAL */}
      {isAddSalesmanOpen && (<div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl p-6 space-y-4 animate-scaleUp text-left">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <UserPlus className="w-4 h-4"/>
                </div>
                <div>
                  <h3 className="text-base font-bold font-display text-foreground">Add Sales Representative</h3>
                  <p className="text-[11px] text-muted-foreground">Register a new sales rep with duty shift and territory.</p>
                </div>
              </div>
              <button onClick={() => setIsAddSalesmanOpen(false)} className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted" aria-label="Close Modal">
                <X className="w-4 h-4"/>
              </button>
            </div>

            <form onSubmit={handleCreateSalesman} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-foreground">Sales Rep Full Name *</label>
                <input type="text" required value={repNameInput} onChange={(e) => setRepNameInput(e.target.value)} placeholder="e.g. Vikramaditya Singh" className="w-full p-2.5 rounded-xl border border-border bg-background text-xs focus:ring-1 focus:ring-primary font-bold"/>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Role Title</label>
                  <input type="text" value={repRoleInput} onChange={(e) => setRepRoleInput(e.target.value)} placeholder="Field Sales Rep" className="w-full p-2.5 rounded-xl border border-border bg-background text-xs focus:ring-1 focus:ring-primary"/>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Duty Shift Hours</label>
                  <input type="text" value={repShiftInput} onChange={(e) => setRepShiftInput(e.target.value)} placeholder="09:00 AM - 05:00 PM" className="w-full p-2.5 rounded-xl border border-border bg-background text-xs font-mono focus:ring-1 focus:ring-primary"/>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Work Email</label>
                  <input type="email" value={repEmailInput} onChange={(e) => setRepEmailInput(e.target.value)} placeholder="vikram@nomo.com" className="w-full p-2.5 rounded-xl border border-border bg-background text-xs font-mono focus:ring-1 focus:ring-primary"/>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Contact Phone</label>
                  <input type="text" value={repPhoneInput} onChange={(e) => setRepPhoneInput(e.target.value)} placeholder="+91 98765 00000" className="w-full p-2.5 rounded-xl border border-border bg-background text-xs font-mono focus:ring-1 focus:ring-primary"/>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">Assigned Territory / Region</label>
                <input type="text" value={repTerritoryInput} onChange={(e) => setRepTerritoryInput(e.target.value)} placeholder="e.g. South India & UAE Region" className="w-full p-2.5 rounded-xl border border-border bg-background text-xs focus:ring-1 focus:ring-primary"/>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-border">
                <button type="button" onClick={() => setIsAddSalesmanOpen(false)} className="px-4 py-2 border rounded-xl text-muted-foreground text-xs font-semibold">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-primary hover:opacity-90 text-white rounded-xl text-xs font-semibold shadow-md">
                  Add Sales Representative
                </button>
              </div>
            </form>
          </div>
        </div>)}

      {/* SCHEDULE DEMO MEMBER FOR BOOKED PERSON MODAL */}
      {isScheduleDemoOpen && (<div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg bg-card border border-border rounded-2xl shadow-2xl p-6 space-y-4 animate-scaleUp text-left">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                  <Calendar className="w-5 h-5 text-indigo-500"/>
                </div>
                <div>
                  <h3 className="text-base font-bold font-display text-foreground">Schedule Demo for Booked Client</h3>
                  <p className="text-[11px] text-muted-foreground">Assign a sales team member & set up a live product demonstration.</p>
                </div>
              </div>
              <button onClick={() => setIsScheduleDemoOpen(false)} className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted" aria-label="Close Modal">
                <X className="w-4 h-4"/>
              </button>
            </div>

            <form onSubmit={handleScheduleDemoSubmit} className="space-y-4 text-xs">
              {/* Select Booked Person / Lead */}
              <div className="space-y-1">
                <label className="font-semibold text-foreground flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-primary"/>
                  <span>Select Booked Person / Client Lead *</span>
                </label>
                <select required value={demoSelectedLeadId} onChange={(e) => setDemoSelectedLeadId(e.target.value)} className="w-full p-2.5 rounded-xl border border-border bg-background text-xs font-bold text-foreground focus:ring-1 focus:ring-primary cursor-pointer">
                  {leads.map((l) => (<option key={l.id} value={l.id}>
                      {l.name} ({l.value}) — Stage: {l.stage.toUpperCase()}
                    </option>))}
                </select>
              </div>

              {/* Select Assigned Sales Rep */}
              <div className="space-y-1">
                <label className="font-semibold text-foreground flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-emerald-500"/>
                  <span>Assign Sales Team Member / Rep *</span>
                </label>
                <select required value={demoSelectedRepId} onChange={(e) => setDemoSelectedRepId(e.target.value)} className="w-full p-2.5 rounded-xl border border-border bg-background text-xs font-bold text-foreground focus:ring-1 focus:ring-primary cursor-pointer">
                  {salesReps.map((r) => (<option key={r.id} value={r.id}>
                      {r.name} ({r.role}) — Status: {r.status}
                    </option>))}
                </select>
              </div>

              {/* Date & Time Slot Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-foreground flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-blue-500"/>
                    <span>Demo Date *</span>
                  </label>
                  <input type="date" required value={demoDateInput} onChange={(e) => setDemoDateInput(e.target.value)} className="w-full p-2.5 rounded-xl border border-border bg-background text-xs font-semibold focus:ring-1 focus:ring-primary"/>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-foreground flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-500"/>
                    <span>Time Slot *</span>
                  </label>
                  <select value={demoTimeSlotInput} onChange={(e) => setDemoTimeSlotInput(e.target.value)} className="w-full p-2.5 rounded-xl border border-border bg-background text-xs font-bold text-foreground focus:ring-1 focus:ring-primary cursor-pointer">
                    <option value="09:00 AM - 09:45 AM">09:00 AM - 09:45 AM</option>
                    <option value="10:00 AM - 10:45 AM">10:00 AM - 10:45 AM (Recommended)</option>
                    <option value="11:30 AM - 12:15 PM">11:30 AM - 12:15 PM</option>
                    <option value="02:00 PM - 02:45 PM">02:00 PM - 02:45 PM</option>
                    <option value="04:00 PM - 04:45 PM">04:00 PM - 04:45 PM</option>
                    <option value="06:00 PM - 06:45 PM">06:00 PM - 06:45 PM</option>
                  </select>
                </div>
              </div>

              {/* Product Demo Topic & Meeting Link Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Demo Module Focus</label>
                  <select value={demoTopicInput} onChange={(e) => setDemoTopicInput(e.target.value)} className="w-full p-2.5 rounded-xl border border-border bg-background text-xs font-semibold focus:ring-1 focus:ring-primary cursor-pointer">
                    <option value="AI Voice Assistant & Live Sales Demo">AI Voice Assistant & Live Sales</option>
                    <option value="Multi-channel WhatsApp Automation">Multi-channel WhatsApp API</option>
                    <option value="E-Commerce POS & Catalog Management">E-Commerce & POS Fleet</option>
                    <option value="RAG Vector Knowledge Base & Search">RAG AI Search & Chatbot</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Meeting Venue / Link</label>
                  <select value={demoMeetingType} onChange={(e) => setDemoMeetingType(e.target.value)} className="w-full p-2.5 rounded-xl border border-border bg-background text-xs font-semibold focus:ring-1 focus:ring-primary cursor-pointer">
                    <option value="Google Meet (Auto-generated)">Google Meet (Auto-generated)</option>
                    <option value="Zoom Meeting Room">Zoom Video Call</option>
                    <option value="In-Person Showroom Visit">In-Person Store/Office Visit</option>
                    <option value="Phone Consultation Call">Phone Call Demo</option>
                  </select>
                </div>
              </div>

              {/* Special Instructions / Notes */}
              <div className="space-y-1">
                <label className="font-semibold text-foreground">Special Client Requirements / Notes</label>
                <textarea rows={2} value={demoNotesInput} onChange={(e) => setDemoNotesInput(e.target.value)} placeholder="e.g. Client requested a walkthrough of POS hardware integration and multi-language support." className="w-full p-2.5 rounded-xl border border-border bg-background text-xs focus:ring-1 focus:ring-primary"/>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-border">
                <button type="button" onClick={() => setIsScheduleDemoOpen(false)} className="px-4 py-2 bg-muted hover:bg-muted/80 text-foreground rounded-xl text-xs font-semibold">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-700 hover:opacity-95 text-white font-extrabold rounded-xl text-xs shadow-lg shadow-indigo-600/20 flex items-center gap-2">
                  <Calendar className="w-4 h-4"/>
                  <span>Confirm & Schedule Demo</span>
                </button>
              </div>
            </form>
          </div>
        </div>)}

      {/* UPLOAD DOCUMENT MODAL FOR RAG KNOWLEDGE BASE */}
      {isUploadDocOpen && (<div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl p-6 space-y-4 animate-scaleUp text-left">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <FileText className="w-4 h-4"/>
                </div>
                <div>
                  <h3 className="text-base font-bold font-display text-foreground">Upload RAG Source Document</h3>
                  <p className="text-[11px] text-muted-foreground">Index reference manuals, FAQs, or price lists for AI grounding.</p>
                </div>
              </div>
              <button onClick={() => setIsUploadDocOpen(false)} className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted" aria-label="Close Modal">
                <X className="w-4 h-4"/>
              </button>
            </div>

            <form onSubmit={handleUploadDocument} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-foreground">Document File Name *</label>
                <input type="text" required value={docNameInput} onChange={(e) => setDocNameInput(e.target.value)} placeholder="e.g. enterprise_warranty_policy_2026.pdf" className="w-full p-2.5 rounded-xl border border-border bg-background text-xs font-mono focus:ring-1 focus:ring-primary"/>
              </div>

              <div className="p-4 border border-dashed border-primary/30 rounded-2xl bg-primary/5 text-center space-y-2">
                <FileText className="w-8 h-8 text-primary mx-auto opacity-70"/>
                <p className="text-xs font-bold text-foreground">Drag & drop source document file here</p>
                <p className="text-[10px] text-muted-foreground">Supports PDF, DOCX, XLSX, TXT (Max 50MB per file)</p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
                <button type="button" onClick={() => setIsUploadDocOpen(false)} className="px-4 py-2 border rounded-xl text-muted-foreground text-xs font-semibold">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-primary hover:opacity-90 text-white rounded-xl text-xs font-semibold shadow-md">
                  Start Vector Indexing
                </button>
              </div>
            </form>
          </div>
        </div>)}

      {/* OMNICHANNEL BROADCAST MODAL */}
      {isBroadcastOpen && (<div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl p-6 space-y-4 animate-scaleUp text-left">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <Send className="w-4 h-4"/>
                </div>
                <div>
                  <h3 className="text-base font-bold font-display text-foreground">Send Omnichannel Broadcast</h3>
                  <p className="text-[11px] text-muted-foreground">Broadcast promotional update or notification via Meta API & SMS.</p>
                </div>
              </div>
              <button onClick={() => setIsBroadcastOpen(false)} className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted" aria-label="Close Modal">
                <X className="w-4 h-4"/>
              </button>
            </div>

            <form onSubmit={handleSendBroadcast} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-foreground">Target Lead Segment</label>
                <select value={broadcastTarget} onChange={(e) => setBroadcastTarget(e.target.value)} className="w-full p-2.5 rounded-xl border border-border bg-background text-xs focus:ring-1 focus:ring-primary">
                  <option value="All Active Leads">All Active Leads ({leads.length} Contacts)</option>
                  <option value="Proposal Stage Only">Proposal Stage Leads Only</option>
                  <option value="Closed Deals">Closed / Won Clients</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">Broadcast Message Template *</label>
                <textarea rows={4} required value={broadcastMessage} onChange={(e) => setBroadcastMessage(e.target.value)} placeholder="Hello {{name}}, check out our latest product updates and special pricing options for this quarter..." className="w-full p-2.5 rounded-xl border border-border bg-background text-xs focus:ring-1 focus:ring-primary leading-relaxed"/>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
                <button type="button" onClick={() => setIsBroadcastOpen(false)} className="px-4 py-2 border rounded-xl text-muted-foreground text-xs font-semibold">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-xl text-xs font-semibold shadow-md flex items-center gap-1.5">
                  <Send className="w-3.5 h-3.5"/>
                  <span>Launch Broadcast</span>
                </button>
              </div>
            </form>
          </div>
        </div>)}

      {/* SHOPPING CART & POS CHECKOUT MODAL */}
      {isCartOpen && (<div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg bg-card border border-border rounded-2xl shadow-2xl p-6 space-y-5 animate-scaleUp text-left">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                  <ShoppingCart className="w-4 h-4"/>
                </div>
                <div>
                  <h3 className="text-base font-bold font-display text-foreground">Shopping Cart & POS Checkout</h3>
                  <p className="text-[11px] text-muted-foreground">{cartTotalCount} item(s) selected for order fulfillment.</p>
                </div>
              </div>
              <button onClick={() => setIsCartOpen(false)} className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted" aria-label="Close Cart">
                <X className="w-4 h-4"/>
              </button>
            </div>

            {cartItems.length === 0 ? (<div className="text-center py-10 space-y-3">
                <ShoppingCart className="w-12 h-12 text-muted-foreground mx-auto opacity-30"/>
                <p className="text-sm font-semibold text-foreground">Your shopping cart is currently empty.</p>
                <p className="text-xs text-muted-foreground">Add grocery products or rental equipment from the catalogue.</p>
              </div>) : (<div className="space-y-4 text-xs">
                <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
                  {cartItems.map((item) => (<div key={item.product.id} className="flex items-center justify-between p-3 border border-border rounded-xl bg-background/50">
                      <div className="flex items-center gap-3">
                        {item.product.image && (<img src={item.product.image} alt={item.product.name} className="w-10 h-10 object-cover rounded-lg shrink-0"/>)}
                        <div>
                          <h4 className="font-bold text-foreground truncate max-w-[180px]">{item.product.name}</h4>
                          <span className="text-[10px] text-muted-foreground font-mono">SKU: {item.product.sku} | Unit: {item.product.price}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center border border-border rounded-lg overflow-hidden bg-card">
                          <button onClick={() => handleUpdateCartQty(item.product.id, -1)} className="px-2 py-1 hover:bg-muted font-bold text-muted-foreground hover:text-foreground">
                            -
                          </button>
                          <span className="px-2.5 py-1 font-mono font-bold text-xs">{item.quantity}</span>
                          <button onClick={() => handleUpdateCartQty(item.product.id, 1)} className="px-2 py-1 hover:bg-muted font-bold text-muted-foreground hover:text-foreground">
                            +
                          </button>
                        </div>
                        <span className="font-mono font-bold text-emerald-500 shrink-0">
                          ${(parseFloat(item.product.price.replace(/[^0-9.]/g, "")) * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>))}
                </div>

                <div className="space-y-2 pt-3 border-t border-border text-xs">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal:</span>
                    <span className="font-mono text-foreground font-semibold">{formatPrice(cartTotalAmount)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Estimated Tax (5%):</span>
                    <span className="font-mono text-foreground font-semibold">{formatPrice(cartTotalAmount * 0.05)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-foreground pt-2 border-t border-border">
                    <span>Total Cart Value:</span>
                    <strong className="text-emerald-500 font-mono text-base">{formatPrice(cartTotalAmount * 1.05)}</strong>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
                  <button onClick={() => setCartItems([])} className="px-3 py-2 text-red-500 hover:bg-red-500/10 rounded-xl text-xs font-semibold">
                    Clear Cart
                  </button>
                  <button onClick={() => {
                    alert(`Order Processed Successfully!\n\nPOS Invoice Generated for total amount of ${formatPrice(cartTotalAmount * 1.05)}. Receipt sent to POS printer!`);
                    setCartItems([]);
                    setIsCartOpen(false);
                }} className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-500/20 flex items-center gap-1.5">
                    <ShoppingCart className="w-4 h-4"/>
                    <span>Proceed to POS Checkout</span>
                  </button>
                </div>
              </div>)}
          </div>
        </div>)}

      {/* EDIT SUB ADMIN DETAILS & PERMISSIONS MODAL */}
      {editingSubAdmin && (<div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg bg-card border border-border rounded-3xl shadow-2xl p-6 space-y-5 animate-scaleUp text-left">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-extrabold text-xl flex items-center justify-center shadow-md shrink-0">
                  {editingSubAdmin.avatar || editingSubAdmin.name?.charAt(0) || "U"}
                </div>
                <div>
                  <h3 className="text-base font-extrabold font-display text-foreground flex items-center gap-2">
                    <span>{editingSubAdmin.name}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-500 border border-blue-500/20 font-bold">
                      {editingSubAdmin.sgId}
                    </span>
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    View and edit sub admin details, role designation, and access scope.
                  </p>
                </div>
              </div>
              <button type="button" onClick={() => setEditingSubAdmin(null)} className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-colors" aria-label="Close Modal">
                <X className="w-5 h-5"/>
              </button>
            </div>

            {/* Form */}
            <form onSubmit={(e) => {
                e.preventDefault();
                setSubAdminDirectory((prev) => prev.map((item) => (item.id === editingSubAdmin.id ? editingSubAdmin : item)));
                setEditingSubAdmin(null);
            }} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* SG ID */}
                <div className="space-y-1">
                  <label className="text-[11px] font-extrabold text-foreground uppercase tracking-wider">Sub Admin ID (SG ID)</label>
                  <input type="text" required value={editingSubAdmin.sgId} onChange={(e) => setEditingSubAdmin({ ...editingSubAdmin, sgId: e.target.value })} className="w-full p-2.5 rounded-xl border border-border bg-background font-mono font-bold text-xs focus:ring-1 focus:ring-primary focus:outline-none"/>
                </div>

                {/* Avatar Initials */}
                <div className="space-y-1">
                  <label className="text-[11px] font-extrabold text-foreground uppercase tracking-wider">Avatar Initials</label>
                  <input type="text" required maxLength={3} value={editingSubAdmin.avatar} onChange={(e) => setEditingSubAdmin({ ...editingSubAdmin, avatar: e.target.value.toUpperCase() })} className="w-full p-2.5 rounded-xl border border-border bg-background font-mono font-bold text-xs focus:ring-1 focus:ring-primary focus:outline-none"/>
                </div>

                {/* Sub Admin Name */}
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-[11px] font-extrabold text-foreground uppercase tracking-wider">Full Name *</label>
                  <input type="text" required value={editingSubAdmin.name} onChange={(e) => setEditingSubAdmin({ ...editingSubAdmin, name: e.target.value })} className="w-full p-2.5 rounded-xl border border-border bg-background font-bold text-xs focus:ring-1 focus:ring-primary focus:outline-none"/>
                </div>

                {/* Email Address */}
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-[11px] font-extrabold text-foreground uppercase tracking-wider">Email Address *</label>
                  <input type="email" required value={editingSubAdmin.email} onChange={(e) => setEditingSubAdmin({ ...editingSubAdmin, email: e.target.value })} className="w-full p-2.5 rounded-xl border border-border bg-background font-mono font-medium text-xs focus:ring-1 focus:ring-primary focus:outline-none"/>
                </div>

                {/* Role Designation */}
                <div className="space-y-1">
                  <label className="text-[11px] font-extrabold text-foreground uppercase tracking-wider">Role Title *</label>
                  <input type="text" required value={editingSubAdmin.role} onChange={(e) => setEditingSubAdmin({ ...editingSubAdmin, role: e.target.value })} className="w-full p-2.5 rounded-xl border border-border bg-background font-bold text-xs focus:ring-1 focus:ring-primary focus:outline-none"/>
                </div>

                {/* Access Scope */}
                <div className="space-y-1">
                  <label className="text-[11px] font-extrabold text-foreground uppercase tracking-wider">Access Scope *</label>
                  <select value={editingSubAdmin.accessScope} onChange={(e) => setEditingSubAdmin({ ...editingSubAdmin, accessScope: e.target.value })} className="w-full p-2.5 rounded-xl border border-border bg-background font-bold text-xs focus:ring-1 focus:ring-primary focus:outline-none cursor-pointer">
                    <option value="Full Access">Full Access</option>
                    <option value="Read/Write">Read/Write</option>
                    <option value="Read Only">Read Only</option>
                    <option value="Admin Controls">Admin Controls</option>
                  </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <button type="button" onClick={() => {
                if (confirm(`Are you sure you want to delete ${editingSubAdmin.name}?`)) {
                    setSubAdminDirectory((prev) => prev.filter((item) => item.id !== editingSubAdmin.id));
                    setEditingSubAdmin(null);
                }
            }} className="px-4 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/30 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5">
                  <Trash2 className="w-3.5 h-3.5"/>
                  <span>Delete</span>
                </button>

                <div className="flex items-center gap-2.5">
                  <button type="button" onClick={() => setEditingSubAdmin(null)} className="px-4 py-2 bg-muted hover:bg-muted/80 text-foreground rounded-xl text-xs font-semibold">
                    Cancel
                  </button>
                  <button type="submit" className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-95 text-white font-extrabold rounded-xl text-xs shadow-lg shadow-blue-600/20 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4"/>
                    <span>Save & Update Details</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>)}

      {/* CRM DISCUSS & VOICE AI ENQUIRY PORTAL MODAL */}
      {activeEnquirySession && (<div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-card border border-border rounded-3xl shadow-2xl p-5 sm:p-7 animate-scaleUp text-left my-auto flex flex-col overflow-hidden">
            {/* Header Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4 shrink-0">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 text-white font-extrabold flex items-center justify-center text-xl shadow-lg shadow-blue-500/20 shrink-0">
                  <MessageSquare className="w-5 h-5"/>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20 text-[10px] font-extrabold uppercase tracking-wider">
                      CRM Discuss Portal
                    </span>
                    <span className="text-xs text-muted-foreground font-mono">ID: {activeEnquirySession.scheduleId}</span>
                  </div>
                  <h2 className="text-base sm:text-lg font-extrabold font-display text-foreground mt-0.5">
                    Client Enquiry Discussion: {activeEnquirySession.leadName}
                  </h2>
                </div>
              </div>
              <button type="button" onClick={() => setActiveEnquirySession(null)} className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-colors shrink-0" aria-label="Close Portal">
                <X className="w-5 h-5"/>
              </button>
            </div>

            {/* Scrollable Modal Content */}
            <div className="flex-1 overflow-y-auto py-4 pr-1 space-y-6">
              {/* STEP 1: SCHEDULED EMPLOYEE VERIFICATION CARD */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-border/80 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60 pb-3">
                  <div className="flex items-center gap-2.5">
                    <UserCheck className="w-5 h-5 text-blue-500 shrink-0"/>
                    <div>
                      <h3 className="text-sm font-bold text-foreground">Step 1: Scheduled Employee Verification</h3>
                      <p className="text-[11px] text-muted-foreground">Verify and confirm the assigned sales representative before launching voice enquiry recording.</p>
                    </div>
                  </div>

                  <span className={`px-3 py-1 rounded-full text-[11px] font-bold border shrink-0 flex items-center gap-1.5 ${activeEnquirySession.verificationStatus === "accepted"
                ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/30"
                : "bg-amber-500/10 text-amber-600 border-amber-500/30 animate-pulse"}`}>
                    {activeEnquirySession.verificationStatus === "accepted" ? (<>
                        <CheckCircle2 className="w-3.5 h-3.5"/> Employee Verified & Accepted
                      </>) : (<>
                        <Clock className="w-3.5 h-3.5"/> Verification Pending
                      </>)}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <span className="text-muted-foreground font-semibold">Scheduled Representative:</span>
                    <div className="mt-1">
                      <select value={activeEnquirySession.salesmanId} onChange={(e) => {
                const selectedRep = salesReps.find((r) => r.id === e.target.value);
                if (selectedRep) {
                    setActiveEnquirySession({
                        ...activeEnquirySession,
                        salesmanId: selectedRep.id,
                        salesmanName: selectedRep.name
                    });
                    updateScheduleSalesman(activeEnquirySession.scheduleId, selectedRep.id);
                }
            }} disabled={activeEnquirySession.verificationStatus === "accepted"} className="w-full font-bold text-foreground bg-background border border-border rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-primary focus:outline-none cursor-pointer disabled:opacity-80">
                        {salesReps.map((r) => (<option key={r.id} value={r.id}>
                            👤 {r.name} ({r.role})
                          </option>))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <span className="text-muted-foreground font-semibold">Demo Meeting Date & Time:</span>
                    <p className="font-mono font-bold text-foreground mt-2">
                      📅 {activeEnquirySession.date} @ {activeEnquirySession.startTime}
                    </p>
                  </div>

                  <div>
                    <span className="text-muted-foreground font-semibold">Venue / Meeting Link:</span>
                    <p className="font-bold text-primary truncate mt-2">
                      🌐 {activeEnquirySession.location}
                    </p>
                  </div>
                </div>

                {activeEnquirySession.verificationStatus === "pending" && (<div className="pt-2 flex justify-end">
                    <button type="button" onClick={() => {
                    setActiveEnquirySession({
                        ...activeEnquirySession,
                        verificationStatus: "accepted",
                        recordingStatus: "recording"
                    });
                }} className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:opacity-95 text-white font-extrabold rounded-xl text-xs shadow-md flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4"/>
                      <span>Accept Employee & Start Voice Recording</span>
                    </button>
                  </div>)}
              </div>

              {/* STEP 2: VOICE RECORDING & REAL-TIME SPEECH-TO-TEXT (OCR / VOICE AI MODEL TRANSCRIBE) */}
              {activeEnquirySession.verificationStatus === "accepted" && (<div className="space-y-5">
                  <div className="p-5 rounded-2xl bg-card border border-border shadow-sm space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-3">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-3.5 h-3.5 rounded-full ${activeEnquirySession.recordingStatus === "recording"
                    ? "bg-rose-500 animate-ping"
                    : "bg-emerald-500"}`}/>
                        <div>
                          <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                            <span>Step 2: Voice Recording & OCR / Voice AI Transcribe Engine</span>
                            <span className="px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 text-[10px] font-bold">
                              Voice-to-Text Model Active
                            </span>
                          </h3>
                          <p className="text-[11px] text-muted-foreground">
                            Real-time Speech Recognition & OCR transcript converting voice discussion into text stream.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        {activeEnquirySession.recordingStatus === "recording" && (<div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-rose-500/10 text-rose-500 border border-rose-500/20 font-mono font-bold text-xs">
                            <Mic className="w-3.5 h-3.5 animate-bounce"/>
                            <span>
                              REC 00:{activeEnquirySession.recordingTime < 10 ? `0${activeEnquirySession.recordingTime}` : activeEnquirySession.recordingTime}
                            </span>
                          </div>)}

                        {activeEnquirySession.recordingStatus === "recording" ? (<button type="button" onClick={() => {
                        setActiveEnquirySession({
                            ...activeEnquirySession,
                            recordingStatus: "analyzing"
                        });
                        setTimeout(() => {
                            setActiveEnquirySession((prev) => prev ? { ...prev, recordingStatus: "completed" } : null);
                        }, 1200);
                    }} className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-md">
                            <MicOff className="w-4 h-4"/> Stop & Process AI Analysis
                          </button>) : activeEnquirySession.recordingStatus === "analyzing" ? (<span className="px-4 py-2 bg-indigo-500/10 text-indigo-500 border border-indigo-500/20 font-bold rounded-xl text-xs flex items-center gap-2 animate-pulse">
                            <Sparkles className="w-4 h-4 animate-spin"/> Analyzing Voice Text...
                          </span>) : (<span className="px-3.5 py-1.5 bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 font-bold rounded-xl text-xs flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500"/> Transcribe Complete
                          </span>)}
                      </div>
                    </div>

                    {/* Audio Waveform Animation Bar */}
                    {activeEnquirySession.recordingStatus === "recording" && (<div className="flex items-center justify-center gap-1.5 py-2 px-4 rounded-xl bg-slate-900 text-white">
                        <Volume2 className="w-4 h-4 text-emerald-400 shrink-0"/>
                        <div className="flex items-center gap-1 h-5">
                          <div className="w-1 bg-emerald-400 h-3 animate-pulse"/>
                          <div className="w-1 bg-emerald-400 h-5 animate-pulse delay-75"/>
                          <div className="w-1 bg-emerald-400 h-2 animate-pulse delay-150"/>
                          <div className="w-1 bg-emerald-400 h-4 animate-pulse delay-100"/>
                          <div className="w-1 bg-emerald-400 h-5 animate-pulse delay-200"/>
                          <div className="w-1 bg-emerald-400 h-3 animate-pulse delay-300"/>
                        </div>
                        <span className="text-[11px] font-mono text-emerald-400 ml-2">Voice AI Engine capturing & converting audio to text...</span>
                      </div>)}

                    {/* Transcribed Speech-to-Text Conversation Stream */}
                    <div className="max-h-56 overflow-y-auto space-y-2.5 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-border/80 text-xs">
                      <p className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-wider mb-2">
                        Live OCR / Speech-to-Text Feed ({activeEnquirySession.transcript.length} turns logged):
                      </p>
                      {activeEnquirySession.transcript.map((msg, idx) => (<div key={idx} className={`p-3 rounded-xl border ${msg.speaker === "client"
                        ? "bg-blue-500/5 border-blue-500/20 text-foreground"
                        : "bg-emerald-500/5 border-emerald-500/20 text-foreground"}`}>
                          <div className="flex items-center justify-between font-bold mb-1">
                            <span className={msg.speaker === "client" ? "text-blue-600 dark:text-blue-400" : "text-emerald-600 dark:text-emerald-400"}>
                              {msg.speaker === "client" ? `👤 Client (${activeEnquirySession.leadName.split(" ")[0]})` : `👔 Representative (${activeEnquirySession.salesmanName})`}
                            </span>
                            <span className="text-[10px] text-muted-foreground font-mono">{msg.time}</span>
                          </div>
                          <p className="text-xs leading-relaxed">{msg.text}</p>
                        </div>))}
                    </div>
                  </div>

                  {/* STEP 3 & STEP 4: AI ANALYSIS, SUMMARY & SENTIMENT CONVERSION OUTCOME */}
                  {(activeEnquirySession.recordingStatus === "completed" || activeEnquirySession.recordingStatus === "analyzing") && (<div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-fadeIn">
                      {/* Summary Section */}
                      <div className="p-5 rounded-2xl bg-card border border-border shadow-sm space-y-3.5">
                        <div className="flex items-center gap-2 border-b border-border pb-2.5">
                          <FileText className="w-4 h-4 text-blue-500"/>
                          <h4 className="text-sm font-bold text-foreground">AI Discussion Summary</h4>
                        </div>

                        <div className="space-y-3 text-xs">
                          <div>
                            <p className="font-bold text-foreground mb-1">Key Highlights Discussed:</p>
                            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                              {activeEnquirySession.summary.keyHighlights.map((hl, i) => (<li key={i}>{hl}</li>))}
                            </ul>
                          </div>

                          <div>
                            <p className="font-bold text-foreground mb-1">Client Objections Resolved:</p>
                            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                              {activeEnquirySession.summary.objectionsResolved.map((obj, i) => (<li key={i}>{obj}</li>))}
                            </ul>
                          </div>

                          <div>
                            <p className="font-bold text-foreground mb-1">Agreed Next Steps:</p>
                            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                              {activeEnquirySession.summary.agreedNextSteps.map((step, i) => (<li key={i}>{step}</li>))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Conversion & Sentiment Review Outcome */}
                      <div className="p-5 rounded-2xl bg-card border border-border shadow-sm space-y-4 flex flex-col justify-between">
                        <div className="space-y-3.5">
                          <div className="flex items-center justify-between border-b border-border pb-2.5">
                            <div className="flex items-center gap-2">
                              <TrendingUp className="w-4 h-4 text-emerald-500"/>
                              <h4 className="text-sm font-bold text-foreground">Conversation & Conversion Analysis</h4>
                            </div>
                            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 text-[10px] font-extrabold">
                              Both Sides Review Completed
                            </span>
                          </div>

                          {/* Conversion Sentiment Outcome Card */}
                          <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                                <Sparkles className="w-4 h-4"/> CONVERSION SENTIMENT OUTCOME:
                              </span>
                              <span className="text-xs font-extrabold font-mono text-emerald-600 dark:text-emerald-400">
                                {activeEnquirySession.buyingIntentScore}% BUY INTENT
                              </span>
                            </div>
                            <h3 className="text-base font-extrabold text-foreground font-display">
                              🟢 POSITIVE TO BUY THE PRODUCT
                            </h3>
                            <p className="text-[11px] text-muted-foreground leading-relaxed">
                              Client verified specifications, expressed high buying intent, and requested direct POS invoice generation. Both sales rep and client sides are fully verified & completed.
                            </p>
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-center text-xs">
                            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-border/80">
                              <p className="text-[10px] text-muted-foreground font-semibold">Deal Likelihood</p>
                              <p className="font-extrabold text-emerald-500 text-sm mt-0.5">High (88%)</p>
                            </div>
                            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-border/80">
                              <p className="text-[10px] text-muted-foreground font-semibold">Review Status</p>
                              <p className="font-extrabold text-blue-500 text-sm mt-0.5">100% Completed</p>
                            </div>
                          </div>
                        </div>

                        {/* Interactive Session Comments */}
                        <div className="space-y-2 pt-2 border-t border-border">
                          <label className="text-[11px] font-bold text-foreground flex items-center gap-1.5">
                            <MessageCircle className="w-3.5 h-3.5 text-purple-500"/> Log Session Comment / Note:
                          </label>
                          <div className="flex items-center gap-2">
                            <input type="text" placeholder="Add comment to store under client enquiry data..." value={activeEnquirySession.newCommentInput || ""} onChange={(e) => setActiveEnquirySession({ ...activeEnquirySession, newCommentInput: e.target.value })} onKeyDown={(e) => {
                        if (e.key === "Enter" && activeEnquirySession.newCommentInput?.trim()) {
                            setActiveEnquirySession({
                                ...activeEnquirySession,
                                comments: [...(activeEnquirySession.comments || []), activeEnquirySession.newCommentInput.trim()],
                                newCommentInput: ""
                            });
                        }
                    }} className="flex-1 px-3 py-1.5 rounded-xl border border-border bg-background text-xs font-medium focus:ring-1 focus:ring-primary focus:outline-none"/>
                            <button type="button" onClick={() => {
                        if (activeEnquirySession.newCommentInput?.trim()) {
                            setActiveEnquirySession({
                                ...activeEnquirySession,
                                comments: [...(activeEnquirySession.comments || []), activeEnquirySession.newCommentInput.trim()],
                                newCommentInput: ""
                            });
                        }
                    }} className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold shrink-0 shadow-sm">
                              Add Note
                            </button>
                          </div>
                          {activeEnquirySession.comments && activeEnquirySession.comments.length > 0 && (<div className="space-y-1 max-h-24 overflow-y-auto">
                              {activeEnquirySession.comments.map((cm, cIdx) => (<p key={cIdx} className="text-[11px] text-muted-foreground italic bg-muted/30 px-2.5 py-1 rounded-lg border border-border/40">
                                  💬 {cm}
                                </p>))}
                            </div>)}
                        </div>

                        {/* Finish & Save to Client Data Button */}
                        <div className="pt-3 border-t border-border flex items-center gap-2.5">
                          <button type="button" onClick={() => saveEnquiryToClientData(activeEnquirySession)} className="flex-1 py-2.5 bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 hover:opacity-95 text-white font-extrabold rounded-xl text-xs shadow-lg flex items-center justify-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4"/> Save Analysis & Store under Client Data Enquiries
                          </button>
                        </div>
                      </div>
                    </div>)}
                </div>)}
            </div>
          </div>
        </div>)}

        </main>
      </div>
    </div>);
}
