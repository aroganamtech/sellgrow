"use client";

import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useRouter } from "next/navigation";
import Logo from "@/components/layout/Logo";
import {
  TrendingUp,
  MessageSquare,
  Volume2,
  Workflow,
  Database,
  Layers,
  Activity,
  LogOut,
  Sun,
  Moon,
  Globe,
  Plus,
  Trash2,
  Check,
  Send,
  Sparkles,
  PhoneCall,
  PhoneOff,
  UserCheck,
  MapPin,
  Play,
  FileText,
  Search,
  ChevronRight,
  ShieldCheck,
  LayoutDashboard,
  FolderTree,
  DollarSign,
  Users,
  MessageCircle,
  Package,
  ShoppingCart,
  X,
  Cpu,
  Sliders,
  ExternalLink,
  FilePlus,
  CreditCard,
  Settings,
  User,
  Key,
  Lock,
  Building,
  CheckCircle2,
  ToggleLeft,
  ToggleRight,
  Calendar,
  Clock,
  UserPlus,
  CalendarDays,
  Briefcase,
  CheckSquare,
  Filter,
  Bell,
  BellRing,
} from "lucide-react";

interface Lead {
  id: string;
  name: string;
  value: string;
  probability: number;
  coordinates: string;
  summary: string;
  stage: "incoming" | "meeting" | "proposal" | "closed";
  assignedSalesman?: string;
  scheduledTime?: string;
}

interface SalesRep {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  shift: string;
  status: "On Duty" | "In Client Meeting" | "Off Duty" | "On Break";
  territory: string;
  avatar: string;
  targetMonthly: string;
  completedMeetingsToday: number;
}

interface SalesSchedule {
  id: string;
  leadId?: string;
  leadName: string;
  salesmanId: string;
  salesmanName: string;
  date: string;
  startTime: string;
  endTime: string;
  meetingType: "GPS Field Visit" | "Video Demo" | "Phone Call" | "Site Audit";
  location: string;
  notes: string;
  status: "Scheduled" | "In Progress" | "Completed" | "Cancelled";
}

interface WorkflowNode {
  id: string;
  type: "trigger" | "delay" | "action";
  label: string;
  details: string;
}

interface ProductItem {
  id: string;
  name: string;
  sku: string;
  price: string;
  variants: string;
  category: string;
  brochure: string;
  stock: number;
  description: string;
  image?: string;
  productType?: "grocery" | "rental";
  totalSales?: string;
  rentalRate?: string;
}

const DEFAULT_DEMO_PRODUCTS: ProductItem[] = [
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
    image: "https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?w=600&auto=format&fit=crop&q=80",
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
    image: "https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?w=600&auto=format&fit=crop&q=80",
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
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&auto=format&fit=crop&q=80",
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
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&auto=format&fit=crop&q=80",
    productType: "rental",
    totalSales: "$1,250.00 (100 Days Rented)"
  },
  {
    id: "rt-5",
    name: "George Maijo BC 358 4GPR",
    sku: "GM-BC-358-4GPR",
    price: "$12.50",
    rentalRate: "$12.50 / Day",
    variants: "Single Variant",
    category: "Rental Tools",
    brochure: "cutter_spec.pdf",
    stock: 50,
    description: "4-stroke commercial grade brush cutter with heavy steel blade.",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&auto=format&fit=crop&q=80",
    productType: "rental",
    totalSales: "$1,250.00 (100 Days Rented)"
  },
  {
    id: "rt-6",
    name: "George Maijo BC 358 4DP",
    sku: "GM-BC-358-4DP",
    price: "$12.50",
    rentalRate: "$12.50 / Day",
    variants: "Single Variant",
    category: "Rental Tools",
    brochure: "cutter_spec.pdf",
    stock: 50,
    description: "Straight shaft 4-stroke premium brush cutter.",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&auto=format&fit=crop&q=80",
    productType: "rental",
    totalSales: "$1,250.00 (100 Days Rented)"
  },
  {
    id: "rt-7",
    name: "Maijo Wanovax MW-CH110",
    sku: "MW-CH110",
    price: "$12.50",
    rentalRate: "$12.50 / Day",
    variants: "Single Variant",
    category: "Rental Tools",
    brochure: "harvester_spec.pdf",
    stock: 50,
    description: "Track type mini combine harvester for paddy and wheat harvesting.",
    image: "https://images.unsplash.com/photo-1617575521317-864339cdde1a?w=600&auto=format&fit=crop&q=80",
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
    image: "https://images.unsplash.com/photo-1617575521317-864339cdde1a?w=600&auto=format&fit=crop&q=80",
    productType: "rental",
    totalSales: "$1,250.00 (100 Days Rented)"
  },
  {
    id: "rt-9",
    name: "WM 1100 AG",
    sku: "WM-1100-AG",
    price: "$12.50",
    rentalRate: "$12.50 / Day",
    variants: "Single Variant",
    category: "Rental Tools",
    brochure: "weeder_spec.pdf",
    stock: 50,
    description: "7HP petrol engine power weeder with gear driven transmission.",
    image: "https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?w=600&auto=format&fit=crop&q=80",
    productType: "rental",
    totalSales: "$1,250.00 (100 Days Rented)"
  },
  {
    id: "rt-10",
    name: "WM 1100CC DLX Plus Prime",
    sku: "WM-1100CC-DLX",
    price: "$12.50",
    rentalRate: "$12.50 / Day",
    variants: "Single Variant",
    category: "Rental Tools",
    brochure: "weeder_spec.pdf",
    stock: 50,
    description: "Premium 7HP petrol power weeder with 3 speed PTO gearbox.",
    image: "https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?w=600&auto=format&fit=crop&q=80",
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
    image: "https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?w=600&auto=format&fit=crop&q=80",
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
    image: "https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?w=600&auto=format&fit=crop&q=80",
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
    image: "https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?w=600&auto=format&fit=crop&q=80",
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
    image: "https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?w=600&auto=format&fit=crop&q=80",
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
    image: "https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?w=600&auto=format&fit=crop&q=80",
    productType: "rental",
    totalSales: "$1,250.00 (100 Days Rented)"
  }
];

export default function DashboardPage() {
  const { user, logout, isLoading: authLoading } = useAuth();
  const { language, setLanguage, t, dir } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<
    "all_in_one" | "overview" | "catalogue" | "services" | "sub_admin" | "control_flags" | "client_data" | "payment" | "setting" | "my_profile" | "crm" | "inbox" | "voice" | "workflow" | "rag" | "analytics"
  >("overview");

  // Catalogue State & Product Management
  const [products, setProducts] = useState<ProductItem[]>(DEFAULT_DEMO_PRODUCTS);

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
  const [clientSubAdminTab, setClientSubAdminTab] = useState<"super-admin" | "sub-admins" | "employees">("sub-admins");

  const [superAdminDirectory, setSuperAdminDirectory] = useState([
    { id: "sa-dir-1", name: user?.name || "Naveen S", email: user?.email || "naveen@sellgrow.co", role: "SuperAdmin", permissions: "Full Access", status: "Active", notificationEnabled: true, portalLink: "/nomo/sg-superadmin" }
  ]);

  const [subAdminDirectory, setSubAdminDirectory] = useState([
    { id: "sub-1", sgId: "SG-A-101", name: "user2", email: "naveensenthi11396@gmail.com", role: "Developer", accessScope: "Read/Write", avatar: "U" },
    { id: "sub-2", sgId: "SG-A-102", name: "user1", email: "7178241605@kce.in.ac", role: "Operator", accessScope: "Read/Write", avatar: "U" },
    { id: "sub-3", sgId: "SG-A-103", name: "Support Agent", email: "support@sellgrow.co", role: "Support", accessScope: "Read Only", avatar: "S" },
    { id: "sub-4", sgId: "SG-A-105", name: "nomo", email: "operator@sellgrow.co", role: "Operator", accessScope: "Read Only", avatar: "N" },
    { id: "sub-5", sgId: "SG-A-106", name: "AI Dev Team", email: "ai-dev@sellgrow.co", role: "Developer", accessScope: "Read/Write", avatar: "A" },
    { id: "sub-6", sgId: "SG-A-107", name: "user 3", email: "senthilkumar6890@kce.in.ac", role: "Operator", accessScope: "Read Only", avatar: "U" },
  ]);

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
  const [settingCompany, setSettingCompany] = useState(user?.businessName || "NOMO");
  const [settingType, setSettingType] = useState(user?.businessType || "Retail Shop / Grocery");
  const [settingEmail, setSettingEmail] = useState(user?.email || "support@nomo.com");
  const [settingPhone, setSettingPhone] = useState("+91 98765 43210");
  const [settingDomain, setSettingDomain] = useState("nomo.sellgrow.app");

  // Profile Input State
  const [profileName, setProfileName] = useState(user?.name || "Naveen S");
  const [profileEmail, setProfileEmail] = useState(user?.email || "admin@nomo.com");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);

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
  const [leads, setLeads] = useState<Lead[]>([
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
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  // Inbox state
  const [selectedChat, setSelectedChat] = useState<"whatsapp" | "livechat" | "messenger">("whatsapp");
  const [chatMessages, setChatMessages] = useState<Record<string, { sender: "client" | "agent"; text: string }[]>>({
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
  const [aiSuggestions, setAiSuggestions] = useState<Record<string, string[]>>({
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
  const [voiceCallState, setVoiceCallState] = useState<"idle" | "ringing" | "active" | "ended">("idle");
  const [voiceTranscripts, setVoiceTranscripts] = useState<{ sender: "ai" | "user"; text: string }[]>([]);
  const [isVoiceSpeaking, setIsVoiceSpeaking] = useState(false);

  // Workflow states
  const [workflowNodes, setWorkflowNodes] = useState<WorkflowNode[]>([
    { id: "1", type: "trigger", label: "WhatsApp Lead Incoming", details: "Fires when customer initiates chat" },
    { id: "2", type: "delay", label: "Delay Node: 2 Minutes", details: "Prevents instant bot spam feeling" },
    { id: "3", type: "action", label: "Semantic RAG Answer", details: "Queries catalog PDF for solutions" },
    { id: "4", type: "action", label: "Provision CRM Ticket", details: "Sets status to Incoming Lead" },
  ]);
  const [newNodeType, setNewNodeType] = useState<"trigger" | "delay" | "action">("action");
  const [newNodeLabel, setNewNodeLabel] = useState("");
  const [newNodeDetails, setNewNodeDetails] = useState("");

  // RAG / Knowledge Base State
  const [ragFiles, setRagFiles] = useState([
    { name: "return_policy_v3.pdf", size: "1.4 MB", date: "2026-07-10", chunks: 42 },
    { name: "ev_charger_manual.docx", size: "2.1 MB", date: "2026-07-12", chunks: 110 },
    { name: "faq_list_arabic.xlsx", size: "450 KB", date: "2026-07-15", chunks: 15 },
  ]);
  const [ragQuery, setRagQuery] = useState("");
  const [ragResult, setRagResult] = useState<{ answer: string; confidence: number; source: string } | null>(null);

  // ------------------------------------------------------------------
  // Multi-Tenant Company Data Isolation & Persistence
  // ------------------------------------------------------------------
  const [isCompanyDataLoaded, setIsCompanyDataLoaded] = useState(false);

  useEffect(() => {
    if (authLoading) return;

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
          if (Array.isArray(parsed.servicesList)) setServicesList(parsed.servicesList);
          if (Array.isArray(parsed.subAdminDirectory)) setSubAdminDirectory(parsed.subAdminDirectory);
          if (Array.isArray(parsed.employeeDirectory)) setEmployeeDirectory(parsed.employeeDirectory);
          if (Array.isArray(parsed.clientRecords)) setClientRecords(parsed.clientRecords);
          if (Array.isArray(parsed.transactions)) setTransactions(parsed.transactions);
          if (Array.isArray(parsed.leads)) setLeads(parsed.leads);
          if (Array.isArray(parsed.products)) setProducts(parsed.products);
          if (Array.isArray(parsed.workflowNodes)) setWorkflowNodes(parsed.workflowNodes);
          if (Array.isArray(parsed.ragFiles)) setRagFiles(parsed.ragFiles);
          if (Array.isArray(parsed.superAdminDirectory)) {
            setSuperAdminDirectory(parsed.superAdminDirectory);
          } else {
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
        } catch (e) {
          console.error("Error loading company data:", e);
        }
      } else {
        // Newly Registered Company: Start completely CLEAN & EMPTY
        setServicesList([]);
        setSubAdminDirectory([]);
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
          localStorage.setItem(
            storageKey,
            JSON.stringify({
              servicesList: [],
              subAdminDirectory: [],
              employeeDirectory: [],
              clientRecords: [],
              transactions: [],
              leads: [],
              products: [],
              workflowNodes: [],
              ragFiles: [],
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
            })
          );
        }
      }
    }
    setIsCompanyDataLoaded(true);
  }, [user, authLoading]);

  // Auto-save changes to Company Store
  useEffect(() => {
    if (authLoading || !user || !isCompanyDataLoaded) return;

    const rawName = user.businessName || "";
    const slug = rawName
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

    const isDemoAccount = ["demo", "nomo", "apex", "retail-shop", "sellgrow"].includes(slug);
    if (isDemoAccount || !slug || !user.email) return;

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
      if (user.businessName) setSettingCompany(user.businessName);
      if (user.businessType || user.businessCategory) setSettingType(user.businessType || user.businessCategory || "");
      if (user.email) {
        setSettingEmail(user.email);
        setProfileEmail(user.email);
      }
      if (user.name) setProfileName(user.name);
      if (user.phone) setSettingPhone(user.phone);
      if (user.businessName) {
        const slug = user.businessName.toLowerCase().replace(/[^a-z0-9]/g, "");
        setSettingDomain(`${slug || "company"}.sellgrow.app`);
      }
    }
  }, [user]);

  // CRM Add Lead State & Handlers
  const [isAddLeadOpen, setIsAddLeadOpen] = useState(false);
  const [leadNameInput, setLeadNameInput] = useState("");
  const [leadValueInput, setLeadValueInput] = useState("");
  const [leadStageInput, setLeadStageInput] = useState<Lead["stage"]>("incoming");
  const [leadProbInput, setLeadProbInput] = useState("85");
  const [leadSummaryInput, setLeadSummaryInput] = useState("");

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadNameInput.trim() || !leadValueInput.trim()) return;

    const newLead: Lead = {
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
  const [salesReps, setSalesReps] = useState<SalesRep[]>([
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

  const [salesSchedules, setSalesSchedules] = useState<SalesSchedule[]>([
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

  const [crmSubTab, setCrmSubTab] = useState<"scheduling" | "pipeline" | "salesmen">("scheduling");

  // Modals for Sales CRM & Scheduling
  const [isAddScheduleOpen, setIsAddScheduleOpen] = useState(false);
  const [isAddSalesmanOpen, setIsAddSalesmanOpen] = useState(false);

  // Form states for schedule modal
  const [schLeadName, setSchLeadName] = useState("");
  const [schSalesmanId, setSchSalesmanId] = useState("rep-1");
  const [schDate, setSchDate] = useState("Today");
  const [schStartTime, setSchStartTime] = useState("10:00 AM");
  const [schEndTime, setSchEndTime] = useState("11:00 AM");
  const [schMeetingType, setSchMeetingType] = useState<SalesSchedule["meetingType"]>("GPS Field Visit");
  const [schLocation, setSchLocation] = useState("");
  const [schNotes, setSchNotes] = useState("");

  // Form states for salesman modal
  const [repNameInput, setRepNameInput] = useState("");
  const [repRoleInput, setRepRoleInput] = useState("Sales Representative");
  const [repEmailInput, setRepEmailInput] = useState("");
  const [repPhoneInput, setRepPhoneInput] = useState("");
  const [repShiftInput, setRepShiftInput] = useState("09:00 AM - 05:00 PM");
  const [repTerritoryInput, setRepTerritoryInput] = useState("General Region");

  const handleCreateSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!schLeadName.trim()) return;

    const rep = salesReps.find((r) => r.id === schSalesmanId) || salesReps[0];

    const newSch: SalesSchedule = {
      id: `sch_${Date.now()}`,
      leadName: schLeadName.trim(),
      salesmanId: rep.id,
      salesmanName: rep.name,
      date: schDate || "Today",
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
    setIsAddScheduleOpen(false);

    alert(`Sales time slot scheduled for ${rep.name} with "${newSch.leadName}"!`);
  };

  const handleCreateSalesman = (e: React.FormEvent) => {
    e.preventDefault();
    if (!repNameInput.trim()) return;

    const initials = repNameInput
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

    const newRep: SalesRep = {
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
    setIsAddSalesmanOpen(false);

    alert(`Sales Representative "${newRep.name}" added to the sales team!`);
  };

  const updateScheduleStatus = (id: string, newStatus: SalesSchedule["status"]) => {
    setSalesSchedules((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s))
    );
  };

  const updateRepStatus = (id: string, newStatus: SalesRep["status"]) => {
    setSalesReps((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
  };

  // Knowledge Base Document Upload State & Handlers
  const [isUploadDocOpen, setIsUploadDocOpen] = useState(false);
  const [docNameInput, setDocNameInput] = useState("");

  const handleUploadDocument = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docNameInput.trim()) return;

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

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastMessage.trim()) return;

    setIsBroadcastOpen(false);
    setBroadcastMessage("");
    alert(`Omnichannel Broadcast queued! Message broadcasted to ${leads.length} active leads via WhatsApp API & SMS.`);
  };



  // Currency State & Formatting Helper
  type CurrencyCode = "USD" | "INR" | "EUR" | "GBP" | "AED";
  const [currency, setCurrency] = useState<CurrencyCode>("USD");

  const currencyRates: Record<CurrencyCode, { symbol: string; rate: number }> = {
    USD: { symbol: "$", rate: 1 },
    INR: { symbol: "₹", rate: 83.50 },
    EUR: { symbol: "€", rate: 0.92 },
    GBP: { symbol: "£", rate: 0.79 },
    AED: { symbol: "د.إ", rate: 3.67 },
  };

  const formatPrice = (usdVal: string | number) => {
    let rawUsd = 0;
    if (typeof usdVal === "number") {
      rawUsd = usdVal;
    } else {
      rawUsd = parseFloat(String(usdVal).replace(/[^0-9.]/g, "")) || 0;
    }

    const converted = rawUsd * currencyRates[currency].rate;
    const symbol = currencyRates[currency].symbol;

    if (currency === "INR") {
      return `${symbol}${converted.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;
    }
    return `${symbol}${converted.toFixed(2)}`;
  };

  const [productTypeSegment, setProductTypeSegment] = useState<"grocery" | "rental" | "all">("grocery");
  const [catalogueSearch, setCatalogueSearch] = useState("");
  const [selectedCatFilter, setSelectedCatFilter] = useState("All");
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);

  // Shopping Cart State
  const [cartItems, setCartItems] = useState<{ product: ProductItem; quantity: number }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleAddToCart = (prod: ProductItem) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === prod.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === prod.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product: prod, quantity: 1 }];
    });
  };

  const handleUpdateCartQty = (id: string, delta: number) => {
    setCartItems(prev =>
      prev
        .map(item => {
          if (item.product.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as { product: ProductItem; quantity: number }[]
    );
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
  const [qrModalProduct, setQrModalProduct] = useState<ProductItem | null>(null);

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
      if (!isDemoAccount) return;

      try {
        const res = await fetch("/api/admin/products");
        if (res.ok) {
          const json = await res.json();
          if (json.status === "success" && Array.isArray(json.data) && json.data.length > 0) {
            const apiProds: ProductItem[] = json.data.map((item: any) => {
              const nameLower = (item.name || "").toLowerCase();
              const catLower = (item.category || "").toLowerCase();
              const isRental =
                item.productType === "rental" ||
                /maijo|brush|cutter|tiller|weeder|wm\s?\d|harvester|1100|1000|990|mahaveer|wanovax|ch110|prime/i.test(nameLower) ||
                /rental|machinery|equipment|tools/i.test(catLower);

              const type: "grocery" | "rental" = isRental ? "rental" : "grocery";
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
            setProducts(prev => {
              const combined = [...prev];
              apiProds.forEach(p => {
                const existingIdx = combined.findIndex(c => c.id === p.id || c.name === p.name);
                if (existingIdx >= 0) {
                  combined[existingIdx] = { ...combined[existingIdx], productType: p.productType, rentalRate: p.rentalRate };
                } else {
                  combined.push(p);
                }
              });
              return combined;
            });
          }
        }
      } catch (e) {}
    }
    loadProducts();
  }, [user]);

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodName.trim() || !prodPrice.trim()) {
      alert("Please provide a Product Name and Price.");
      return;
    }

    setIsSavingProd(true);

    const generatedSku = prodSku.trim() || `SKU-${Math.floor(100000 + Math.random() * 900000)}`;
    const newProduct: ProductItem = {
      id: `prod_${Date.now()}`,
      name: prodName.trim(),
      sku: generatedSku,
      price: prodPrice.trim().startsWith("$") ? prodPrice.trim() : `$${prodPrice.trim()}`,
      variants: prodVariants,
      category: prodCategory,
      brochure: prodBrochure.trim() || `${prodName.toLowerCase().replace(/[^a-z0-9]/g, "_")}_spec.pdf`,
      stock: parseInt(prodStock) || 10,
      description: prodDesc.trim() || "No description provided.",
      image: prodImage.trim() || "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop&q=80"
    };

    try {
      await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: newProduct.id,
          name: newProduct.name,
          category: newProduct.category,
          shortDesc: newProduct.description,
          price: newProduct.price,
          variants: newProduct.variants,
          stock: newProduct.stock,
          image: newProduct.image
        })
      });
    } catch (e) {}

    setProducts(prev => [newProduct, ...prev]);

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

  const handleDeleteProduct = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}" from the product catalogue?`)) return;

    try {
      await fetch(`/api/admin/products?id=${id}`, { method: "DELETE" });
    } catch (e) {}

    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const filteredProducts = products.filter(p => {
    const matchesSegment = productTypeSegment === "all" || (p.productType || "grocery") === productTypeSegment;
    const matchesSearch = p.name.toLowerCase().includes(catalogueSearch.toLowerCase()) || p.sku.toLowerCase().includes(catalogueSearch.toLowerCase());
    const matchesCategory =
      selectedCatFilter === "All"
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
      } else if (user.businessName) {
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
  const speak = (text: string) => {
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

  const handleVoiceResponse = (userText: string, aiText: string) => {
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
  const handleAddLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadName) return;
    const newLead: Lead = {
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
  const handleAddWorkflowNode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNodeLabel) return;
    const node: WorkflowNode = {
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
  const handleRagSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ragQuery.trim()) return;

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
      } else if (lowerQ.includes("arabic") || lowerQ.includes("translation")) {
        answer = "Found matching rows in faq_list_arabic.xlsx: Multi-language mapping matches LTR and RTL phrases dynamically for translation.";
        source = "faq_list_arabic.xlsx (Row #5)";
        confidence = 0.91;
      }

      setRagResult({ answer, confidence, source });
    }, 400);
  };

  // Send Chat message (Inbox)
  const handleSendInboxMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inboxInput.trim()) return;

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
  const shiftLeadStage = (leadId: string, direction: "next" | "prev") => {
    const stages: Lead["stage"][] = ["incoming", "meeting", "proposal", "closed"];
    setLeads(
      leads.map((l) => {
        if (l.id !== leadId) return l;
        const currIdx = stages.indexOf(l.stage);
        let newIdx = direction === "next" ? currIdx + 1 : currIdx - 1;
        if (newIdx >= 0 && newIdx < stages.length) {
          return { ...l, stage: stages[newIdx] };
        }
        return l;
      })
    );
  };

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#070b13]">
        <div className="text-center space-y-4">
          <Activity className="w-10 h-10 animate-spin text-primary mx-auto" />
          <p className="text-sm font-semibold text-muted-foreground">Authenticating instance...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#060a12] transition-colors duration-300">
      
      {/* Top Header Controls */}
      <header className="h-16 border-b border-border bg-white dark:bg-[#0c1220] flex items-center justify-between px-6 sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <Logo className="w-12 h-12" />
          <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded font-mono font-semibold">
            Enterprise OS
          </span>
        </div>

        {/* Global info and selectors */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex flex-col text-right">
            <span className="text-xs font-bold text-foreground font-display">{user?.businessName || "NOMO"}</span>
            <span className="text-[10px] text-muted-foreground">{user?.businessType || "Retail Shop / Grocery"} Mode</span>
          </div>

          <span className="w-px h-6 bg-border hidden sm:block" />

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Language Dropdown Select */}
          <div className="relative flex items-center">
            <Globe className="w-3.5 h-3.5 absolute left-2.5 text-muted-foreground pointer-events-none" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as any)}
              className="pl-8 pr-3 py-1.5 text-xs font-bold font-display rounded-xl border border-border bg-card text-foreground focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer hover:border-primary/50 transition-colors"
              aria-label="Select Language"
            >
              <option value="en">English (EN)</option>
              <option value="hi">Hindi (हिन्दी)</option>
              <option value="ar">Arabic (العربية)</option>
              <option value="ta">Tamil (தமிழ்)</option>
            </select>
          </div>

          {/* Currency Dropdown Select (USD to INR / EUR / GBP / AED) */}
          <div className="relative flex items-center">
            <DollarSign className="w-3.5 h-3.5 absolute left-2.5 text-muted-foreground pointer-events-none" />
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
              className="pl-8 pr-3 py-1.5 text-xs font-bold font-display rounded-xl border border-border bg-card text-foreground focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer hover:border-primary/50 transition-colors"
              aria-label="Select Currency"
            >
              <option value="USD">USD ($)</option>
              <option value="INR">INR (₹)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="AED">AED (د.إ)</option>
            </select>
          </div>

          <button
            onClick={logout}
            className="p-1.5 rounded-lg hover:bg-red-500/10 text-muted-foreground hover:text-red-500 transition-colors flex items-center gap-1.5 text-xs font-semibold"
            aria-label="Logout button"
          >
            <LogOut className="w-4 h-4" />
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
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white dark:border-[#0c1220] ring-1 ring-emerald-500/20"></span>
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
              <button
                onClick={() => {
                  setActiveTab("all_in_one");
                  if (voiceCallState === "active") handleEndVoiceCall();
                }}
                className={`w-full relative flex items-center justify-between p-3 rounded-2xl text-xs font-bold transition-all duration-200 border ${
                  activeTab === "all_in_one"
                    ? "bg-gradient-to-r from-amber-500 via-orange-500 to-indigo-600 text-white border-amber-400/40 shadow-md shadow-amber-500/20"
                    : "bg-gradient-to-r from-amber-500/10 via-indigo-500/10 to-blue-500/10 hover:from-amber-500/20 hover:to-indigo-500/20 text-slate-800 dark:text-slate-200 border-amber-500/20 dark:border-amber-400/20 hover:border-amber-400/40"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className={`p-1.5 rounded-lg ${activeTab === "all_in_one" ? "bg-white/20 text-white" : "bg-amber-500/20 text-amber-600 dark:text-amber-400"}`}>
                    <Sparkles className="w-4 h-4 animate-pulse" />
                  </div>
                  <div className="text-left">
                    <span className="block text-xs font-bold leading-tight">Unified All-in-One</span>
                    <span className={`text-[10px] font-medium ${activeTab === "all_in_one" ? "text-amber-100" : "text-slate-500 dark:text-slate-400"}`}>Single Workspace Area</span>
                  </div>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                  activeTab === "all_in_one"
                    ? "bg-white/20 text-white border border-white/20"
                    : "bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30"
                }`}>
                  8-in-1
                </span>
              </button>
            </div>

            {/* Categorized Navigation List */}
            <nav className="space-y-4">
              {(
                [
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
                ] as Array<{
                  section: string;
                  items: Array<{ id: string; icon: any; label: string; badge?: string; badgeColor?: string }>;
                }>
              ).map((group) => (
                <div key={group.section} className="space-y-1">
                  <div className="px-3 py-1">
                    <span className="text-[10px] font-extrabold tracking-wider text-slate-400 dark:text-slate-500 uppercase">
                      {group.section}
                    </span>
                  </div>
                  {group.items.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => {
                          setActiveTab(tab.id as any);
                          if (voiceCallState === "active") handleEndVoiceCall();
                        }}
                        className={`w-full group flex items-center justify-between px-3 py-2 text-xs rounded-xl font-semibold transition-all duration-200 border ${
                          isActive
                            ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-700 border-indigo-500 text-white shadow-md shadow-indigo-500/20 font-bold translate-x-0.5"
                            : "border-transparent text-slate-600 dark:text-slate-300 hover:bg-slate-100/80 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white hover:translate-x-0.5"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                            isActive
                              ? "text-white"
                              : "text-slate-400 dark:text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400"
                          }`} />
                          <span>{tab.label}</span>
                        </div>
                        {tab.badge && (
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium tracking-tight border ${
                            isActive
                              ? "bg-white/20 text-white border-white/20 backdrop-blur-sm"
                              : tab.badgeColor === "emerald"
                                ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border-emerald-200/60 dark:border-emerald-800/40"
                                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200/60 dark:border-slate-700/60 group-hover:border-indigo-200 dark:group-hover:border-indigo-800/50"
                          }`}>
                            {tab.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              ))}
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
          {activeTab === "all_in_one" && (
            <div className="sticky top-0 z-30 bg-card/95 backdrop-blur-md p-3 rounded-2xl border border-primary/30 shadow-lg flex flex-wrap items-center justify-between gap-3 animate-fadeIn">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary animate-pulse" />
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
            </div>
          )}

          {/* TAB 1: OVERVIEW */}
          {(activeTab === "overview" || activeTab === "all_in_one") && (
            <div id="sec-overview" className="space-y-6 animate-fade-in scroll-mt-20">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h1 className="text-2xl font-bold font-display text-foreground">{t("welcomeBack")}</h1>
                  <p className="text-xs text-muted-foreground">Unified Operations Dashboard control panel overview.</p>
                </div>
                <div className="text-xs bg-card border px-3 py-1.5 rounded-lg flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                  <span className="font-semibold">Simulated Real-Time Sandbox Active</span>
                </div>
              </div>

              {/* KPI Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { icon: DollarSign, label: t("totalRevenue"), value: "$12,450", trend: "+12% this month", color: "text-emerald-500 bg-emerald-500/10" },
                  { icon: Users, label: t("activeLeads"), value: leads.length.toString(), trend: `${leads.filter(l => l.stage === "closed").length} Deals Closed`, color: "text-blue-500 bg-blue-500/10" },
                  { icon: MessageCircle, label: t("unreadMessages"), value: "8 Conversations", trend: "WhatsApp, FB, Live Chat", color: "text-purple-500 bg-purple-500/10" },
                  { icon: Sparkles, label: t("aiResolution"), value: "89.2%", trend: "142 Deflected Queries", color: "text-pink-500 bg-pink-500/10" },
                ].map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <div key={idx} className="p-5 rounded-2xl border border-border bg-card shadow-sm space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground font-semibold">{stat.label}</span>
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${stat.color}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                      </div>
                      <div>
                        <p className="text-2xl font-extrabold font-display">{stat.value}</p>
                        <p className="text-[10px] text-muted-foreground mt-1">{stat.trend}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Business Analytics Section (Matching user screenshot) */}
              <div className="pt-2 space-y-6">
                <div>
                  <h2 className="text-xl font-bold font-display text-foreground">Business Analytics</h2>
                  <p className="text-xs text-muted-foreground">Track ROI conversions, AI support logs, and VoIP reception stats.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left Card: Sales Performance Conversion ($) */}
                  <div className="p-6 rounded-3xl border border-border bg-card shadow-sm space-y-4">
                    <h3 className="text-sm font-bold font-display text-foreground">Sales Performance Conversion ($)</h3>
                    <div className="relative h-52 w-full pt-4 flex flex-col justify-between">
                      <svg className="w-full h-36 overflow-visible" viewBox="0 0 400 130" preserveAspectRatio="none">
                        {/* Horizontal Grid Lines */}
                        <line x1="0" y1="20" x2="400" y2="20" stroke="currentColor" className="text-border/30" strokeWidth="1" strokeDasharray="3 3" />
                        <line x1="0" y1="65" x2="400" y2="65" stroke="currentColor" className="text-border/30" strokeWidth="1" strokeDasharray="3 3" />
                        <line x1="0" y1="110" x2="400" y2="110" stroke="currentColor" className="text-border/30" strokeWidth="1" strokeDasharray="3 3" />

                        <defs>
                          <linearGradient id="sales-line-grad-ov" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#2563eb" />
                            <stop offset="50%" stopColor="#0284c7" />
                            <stop offset="100%" stopColor="#10b981" />
                          </linearGradient>
                          <linearGradient id="sales-fill-grad-ov" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#10b981" stopOpacity="0.12" />
                            <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
                          </linearGradient>
                        </defs>

                        {/* Area Fill */}
                        <path
                          d="M 10 100 C 60 90, 110 50, 160 55 C 220 60, 290 35, 390 15 L 390 120 L 10 120 Z"
                          fill="url(#sales-fill-grad-ov)"
                        />

                        {/* Smooth Bezier Line */}
                        <path
                          d="M 10 100 C 60 90, 110 50, 160 55 C 220 60, 290 35, 390 15"
                          fill="none"
                          stroke="url(#sales-line-grad-ov)"
                          strokeWidth="4"
                          strokeLinecap="round"
                        />

                        {/* End Point Indicator */}
                        <circle cx="390" cy="15" r="5" fill="#10b981" />
                      </svg>

                      {/* X-Axis Labels */}
                      <div className="flex justify-between text-xs font-semibold text-muted-foreground px-2 pt-2 border-t border-border/30">
                        <span>Jan</span>
                        <span>Mar</span>
                        <span>May</span>
                        <span>Jul (Current)</span>
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
                      ].map((bar, idx) => (
                        <div key={idx} className="space-y-2">
                          <div className="flex justify-between items-center text-xs font-bold">
                            <span className="text-foreground font-display">{bar.chan}</span>
                            <span className="text-blue-600 dark:text-sky-400 font-mono font-extrabold">{bar.val}% Deflected</span>
                          </div>
                          <div className="w-full h-3 bg-slate-100 dark:bg-slate-800/80 rounded-full overflow-hidden p-0.5 border border-border/30">
                            <div
                              className={`h-full bg-gradient-to-r ${bar.color} rounded-full transition-all duration-1000 ease-out shadow-sm`}
                              style={{ width: `${bar.val}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Simulator Highlight */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Active Calls & Voice Box */}
                <div className="lg:col-span-2 p-6 rounded-2xl border border-border bg-card shadow-sm space-y-4">
                  <h3 className="text-sm font-bold font-display flex items-center gap-2 border-b pb-2"><Volume2 className="w-4 h-4 text-primary" /> Active AI Voice Status</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl border bg-slate-50 dark:bg-black/10 text-center space-y-3 flex flex-col justify-between">
                      <p className="text-xs text-muted-foreground leading-normal">Test the AI Voice agent by starting a quick local line simulation.</p>
                      <button
                        onClick={() => setActiveTab("voice")}
                        className="w-full py-2 bg-primary hover:opacity-90 text-white rounded-xl text-xs font-semibold"
                      >
                        Open Voice Console
                      </button>
                    </div>
                    <div className="p-4 rounded-xl border bg-slate-50 dark:bg-black/10 space-y-2">
                      <p className="text-[10px] font-bold text-muted uppercase">Voice System Status</p>
                      <ul className="space-y-1.5 text-[11px] text-muted-foreground">
                        <li className="flex justify-between"><span>VAD Engine:</span> <strong className="text-emerald-500">Ready</strong></li>
                        <li className="flex justify-between"><span>Speech-to-Text:</span> <strong>Google Cloud API</strong></li>
                        <li className="flex justify-between"><span>Active Rooms:</span> <strong>2 Callers</strong></li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Automation Running Workflows summary */}
                <div className="p-6 rounded-2xl border border-border bg-card shadow-sm space-y-4">
                  <h3 className="text-sm font-bold font-display flex items-center gap-2 border-b pb-2"><Workflow className="w-4 h-4 text-primary" /> {t("workflowsRunning")}</h3>
                  <div className="space-y-3">
                    {workflowNodes.slice(0, 3).map((node, index) => (
                      <div key={index} className="flex justify-between items-center text-xs">
                        <div className="flex gap-2 items-center">
                          <span className={`w-2 h-2 rounded-full ${node.type === "trigger" ? "bg-blue-500" : node.type === "delay" ? "bg-amber-500" : "bg-purple-500"}`} />
                          <span className="font-semibold">{node.label}</span>
                        </div>
                        <span className="text-[10px] text-muted-foreground uppercase">{node.type}</span>
                      </div>
                    ))}
                    <button
                      onClick={() => setActiveTab("workflow")}
                      className="w-full text-center text-xs font-bold text-primary hover:underline pt-2 block"
                    >
                      Configure visual workflow builder
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SALES CRM & SALESMAN TIME SCHEDULING */}
          {(activeTab === "crm" || activeTab === "all_in_one") && (
            <div id="sec-crm" className="space-y-6 animate-fade-in text-left pt-6 border-t border-border scroll-mt-20">
              {/* Top Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold font-display text-foreground">Sales CRM & Time Scheduling</h1>
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      Live Scheduling Active
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Manage sales pipeline deals, salesman duty shifts, client appointment slots, and real-time meeting logs.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => setIsAddScheduleOpen(true)}
                    className="px-3.5 py-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white rounded-xl text-xs font-semibold shadow-md shadow-primary/20 transition-all flex items-center gap-1.5 shrink-0"
                  >
                    <CalendarDays className="w-4 h-4" />
                    <span>Schedule Time Slot</span>
                  </button>
                  <button
                    onClick={() => setIsAddLeadOpen(true)}
                    className="px-3.5 py-2 bg-card hover:bg-muted text-foreground border border-border rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Lead</span>
                  </button>
                  <button
                    onClick={() => setIsAddSalesmanOpen(true)}
                    className="px-3.5 py-2 bg-card hover:bg-muted text-foreground border border-border rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 shrink-0"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>+ Sales Rep</span>
                  </button>
                </div>
              </div>

              {/* Quick Metrics Bar */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl border border-border bg-card shadow-sm space-y-1">
                  <div className="flex justify-between items-center text-muted-foreground text-xs font-medium">
                    <span>Pipeline Value</span>
                    <DollarSign className="w-4 h-4 text-emerald-500" />
                  </div>
                  <p className="text-xl font-black text-foreground">$189,500</p>
                  <p className="text-[10px] text-emerald-500 font-bold">↑ 14% vs last week</p>
                </div>

                <div className="p-4 rounded-2xl border border-border bg-card shadow-sm space-y-1">
                  <div className="flex justify-between items-center text-muted-foreground text-xs font-medium">
                    <span>On-Duty Sales Reps</span>
                    <Users className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-xl font-black text-foreground">
                    {salesReps.filter((r) => r.status === "On Duty" || r.status === "In Client Meeting").length} / {salesReps.length} Active
                  </p>
                  <p className="text-[10px] text-muted-foreground">Active Shift Duty</p>
                </div>

                <div className="p-4 rounded-2xl border border-border bg-card shadow-sm space-y-1">
                  <div className="flex justify-between items-center text-muted-foreground text-xs font-medium">
                    <span>Scheduled Today</span>
                    <Clock className="w-4 h-4 text-amber-500" />
                  </div>
                  <p className="text-xl font-black text-foreground">
                    {salesSchedules.filter((s) => s.date === "Today").length} Meetings
                  </p>
                  <p className="text-[10px] text-amber-500 font-bold">4 Field Visits + 4 Demos</p>
                </div>

                <div className="p-4 rounded-2xl border border-border bg-card shadow-sm space-y-1">
                  <div className="flex justify-between items-center text-muted-foreground text-xs font-medium">
                    <span>Meeting Completion</span>
                    <CheckCircle2 className="w-4 h-4 text-blue-500" />
                  </div>
                  <p className="text-xl font-black text-foreground">
                    {salesReps.reduce((sum, r) => sum + r.completedMeetingsToday, 0)} Done
                  </p>
                  <p className="text-[10px] text-blue-500 font-bold">98% Target Rate</p>
                </div>
              </div>

              {/* Sub Navigation Switcher inside CRM */}
              <div className="flex items-center gap-2 border-b border-border pb-3 flex-wrap">
                <button
                  onClick={() => setCrmSubTab("scheduling")}
                  className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 ${
                    crmSubTab === "scheduling"
                      ? "bg-primary text-white shadow-md shadow-primary/20"
                      : "bg-card text-muted-foreground border border-border hover:text-foreground"
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  <span>Salesman Time Scheduling & Duty Shifts</span>
                  <span className="px-1.5 py-0.2 text-[10px] bg-white/20 rounded-full font-mono">
                    {salesSchedules.length}
                  </span>
                </button>

                <button
                  onClick={() => setCrmSubTab("pipeline")}
                  className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 ${
                    crmSubTab === "pipeline"
                      ? "bg-primary text-white shadow-md shadow-primary/20"
                      : "bg-card text-muted-foreground border border-border hover:text-foreground"
                  }`}
                >
                  <TrendingUp className="w-4 h-4" />
                  <span>Lead Deals & Pipeline</span>
                  <span className="px-1.5 py-0.2 text-[10px] bg-white/20 rounded-full font-mono">
                    {leads.length}
                  </span>
                </button>

                <button
                  onClick={() => setCrmSubTab("salesmen")}
                  className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 ${
                    crmSubTab === "salesmen"
                      ? "bg-primary text-white shadow-md shadow-primary/20"
                      : "bg-card text-muted-foreground border border-border hover:text-foreground"
                  }`}
                >
                  <Briefcase className="w-4 h-4" />
                  <span>Sales Team Roster</span>
                  <span className="px-1.5 py-0.2 text-[10px] bg-white/20 rounded-full font-mono">
                    {salesReps.length}
                  </span>
                </button>
              </div>

              {/* SUB TAB 1: SALESMAN TIME SCHEDULING */}
              {crmSubTab === "scheduling" && (
                <div className="space-y-6">
                  {/* Salesman Duty Shift & Live Status Bar */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-primary" /> Sales Reps Shift Schedule & Availability
                      </h3>
                      <button
                        onClick={() => setIsAddSalesmanOpen(true)}
                        className="text-[11px] font-bold text-primary hover:underline flex items-center gap-1"
                      >
                        + Add Sales Rep
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {salesReps.map((rep) => (
                        <div
                          key={rep.id}
                          className="p-3.5 rounded-xl border border-border bg-card shadow-sm space-y-3 relative overflow-hidden"
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex items-center gap-2.5">
                              <div className="w-9 h-9 rounded-full bg-primary/10 text-primary font-extrabold flex items-center justify-center text-xs shrink-0 border border-primary/20">
                                {rep.avatar}
                              </div>
                              <div className="overflow-hidden">
                                <h4 className="text-xs font-bold text-foreground truncate">{rep.name}</h4>
                                <p className="text-[10px] text-muted-foreground truncate">{rep.role}</p>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-1.5 text-[11px] border-t border-border/50 pt-2">
                            <div className="flex justify-between items-center text-muted-foreground">
                              <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-amber-500" /> Shift:</span>
                              <span className="font-semibold text-foreground">{rep.shift}</span>
                            </div>
                            <div className="flex justify-between items-center text-muted-foreground">
                              <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-emerald-500" /> Territory:</span>
                              <span className="font-semibold text-foreground truncate max-w-[110px]">{rep.territory}</span>
                            </div>
                          </div>

                          {/* Duty Status Dropdown Toggle */}
                          <div className="flex justify-between items-center pt-1 border-t border-border/40">
                            <span className="text-[10px] text-muted-foreground font-medium">Status:</span>
                            <select
                              value={rep.status}
                              onChange={(e) => updateRepStatus(rep.id, e.target.value as SalesRep["status"])}
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-lg border focus:outline-none cursor-pointer ${
                                rep.status === "On Duty"
                                  ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/30 dark:text-emerald-400"
                                  : rep.status === "In Client Meeting"
                                  ? "bg-amber-500/10 text-amber-600 border-amber-500/30 dark:text-amber-400"
                                  : rep.status === "On Break"
                                  ? "bg-blue-500/10 text-blue-600 border-blue-500/30 dark:text-blue-400"
                                  : "bg-slate-500/10 text-slate-500 border-slate-500/30"
                              }`}
                            >
                              <option value="On Duty">🟢 On Duty</option>
                              <option value="In Client Meeting">🟡 In Client Meeting</option>
                              <option value="On Break">🔵 On Break</option>
                              <option value="Off Duty">⚪ Off Duty</option>
                            </select>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Interactive Time Schedule & Appointment Slot Matrix */}
                  <div className="p-6 rounded-2xl border border-border bg-card shadow-sm space-y-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border pb-3">
                      <div>
                        <h3 className="text-sm font-bold font-display text-foreground flex items-center gap-2">
                          <CalendarDays className="w-4 h-4 text-primary" /> Today & Upcoming Salesman Appointment Slots
                        </h3>
                        <p className="text-[11px] text-muted-foreground">
                          Scheduled client GPS visits, video demos, site audits, and call time slots.
                        </p>
                      </div>
                      <button
                        onClick={() => setIsAddScheduleOpen(true)}
                        className="px-3 py-1.5 bg-primary text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shrink-0 hover:opacity-90 transition-opacity"
                      >
                        <Plus className="w-3.5 h-3.5" /> Book Time Slot
                      </button>
                    </div>

                    {/* Time Slot Schedule Cards List */}
                    <div className="space-y-3">
                      {salesSchedules.length === 0 ? (
                        <p className="text-xs text-muted-foreground py-6 text-center">No time slots scheduled yet. Click "Book Time Slot" above.</p>
                      ) : (
                        salesSchedules.map((sch) => (
                          <div
                            key={sch.id}
                            className="p-4 rounded-xl border border-border bg-slate-50 dark:bg-black/20 hover:border-primary/50 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                          >
                            <div className="flex items-start gap-3.5">
                              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-sm shrink-0 border border-primary/20 mt-0.5">
                                <Clock className="w-5 h-5 text-primary" />
                              </div>
                              <div className="space-y-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <h4 className="text-xs font-bold text-foreground">{sch.leadName}</h4>
                                  <span className="px-2 py-0.5 text-[9px] font-bold rounded-full bg-primary/10 text-primary border border-primary/20">
                                    {sch.meetingType}
                                  </span>
                                  <span className="text-[10px] text-muted-foreground font-mono">
                                    📅 {sch.date} ({sch.startTime} - {sch.endTime})
                                  </span>
                                </div>
                                <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                                  <span>Assigned Salesman: <strong className="text-foreground">{sch.salesmanName}</strong></span>
                                  <span className="mx-1">•</span>
                                  <MapPin className="w-3 h-3 text-emerald-500 inline" />
                                  <span>{sch.location}</span>
                                </p>
                                <p className="text-[11px] text-slate-600 dark:text-slate-400 italic">"{sch.notes}"</p>
                              </div>
                            </div>

                            {/* Schedule Status Controller */}
                            <div className="flex items-center gap-2 shrink-0 border-t md:border-t-0 pt-2 md:pt-0 border-border">
                              <select
                                value={sch.status}
                                onChange={(e) => updateScheduleStatus(sch.id, e.target.value as SalesSchedule["status"])}
                                className={`text-xs font-bold px-3 py-1.5 rounded-xl border focus:outline-none cursor-pointer ${
                                  sch.status === "In Progress"
                                    ? "bg-amber-500/10 text-amber-600 border-amber-500/30"
                                    : sch.status === "Completed"
                                    ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/30"
                                    : sch.status === "Cancelled"
                                    ? "bg-red-500/10 text-red-600 border-red-500/30"
                                    : "bg-blue-500/10 text-blue-600 border-blue-500/30"
                                }`}
                              >
                                <option value="Scheduled">📅 Scheduled</option>
                                <option value="In Progress">⚡ In Progress</option>
                                <option value="Completed">✅ Completed</option>
                                <option value="Cancelled">❌ Cancelled</option>
                              </select>

                              <button
                                onClick={() => {
                                  if (confirm(`Remove appointment for "${sch.leadName}"?`)) {
                                    setSalesSchedules((prev) => prev.filter((s) => s.id !== sch.id));
                                  }
                                }}
                                className="p-1.5 rounded-lg text-muted-foreground hover:text-red-500 hover:bg-red-500/10"
                                title="Delete Schedule"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* SUB TAB 2: PIPELINE LEADS */}
              {crmSubTab === "pipeline" && (
                <div className="space-y-6">
                  {/* CRM Pipeline Drag Mock */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {(["incoming", "meeting", "proposal", "closed"] as const).map((stage) => (
                      <div key={stage} className="p-4 rounded-2xl border border-border bg-slate-50 dark:bg-black/10 min-h-[380px] space-y-4">
                        <div className="flex justify-between items-center border-b pb-2">
                          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                            {stage === "incoming" && "Incoming Lead"}
                            {stage === "meeting" && "Meeting Scheduled"}
                            {stage === "proposal" && "Proposal Sent"}
                            {stage === "closed" && "Closed / Won"}
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 bg-border rounded-full font-bold">
                            {leads.filter((l) => l.stage === stage).length}
                          </span>
                        </div>

                        <div className="space-y-3">
                          {leads
                            .filter((l) => l.stage === stage)
                            .map((lead) => (
                              <div
                                key={lead.id}
                                onClick={() => setSelectedLead(lead)}
                                className="p-3.5 rounded-xl border border-border bg-card shadow-sm hover:border-primary cursor-pointer transition-all space-y-3"
                              >
                                <div className="flex justify-between items-start gap-1">
                                  <h4 className="text-xs font-bold text-foreground truncate">{lead.name}</h4>
                                  <span className="text-[10px] text-emerald-500 font-bold shrink-0">{lead.value}</span>
                                </div>

                                <div className="flex justify-between items-center text-[10px] text-muted-foreground">
                                  <span>Probability: <strong className="text-primary">{lead.probability}%</strong></span>
                                  <span className="flex items-center gap-0.5"><MapPin className="w-2.5 h-2.5" /> GPS</span>
                                </div>

                                <div className="pt-1 flex items-center justify-between gap-2 text-[10px]">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setSchLeadName(lead.name);
                                      setIsAddScheduleOpen(true);
                                    }}
                                    className="px-2 py-0.5 rounded bg-primary/10 text-primary font-semibold hover:bg-primary hover:text-white transition-all flex items-center gap-1"
                                  >
                                    <Clock className="w-2.5 h-2.5" /> Schedule
                                  </button>

                                  <div className="flex gap-1">
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        shiftLeadStage(lead.id, "prev");
                                      }}
                                      disabled={stage === "incoming"}
                                      className="px-2 py-0.5 text-[9px] border rounded disabled:opacity-30 hover:bg-slate-100 dark:hover:bg-slate-800"
                                    >
                                      ◀
                                    </button>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        shiftLeadStage(lead.id, "next");
                                      }}
                                      disabled={stage === "closed"}
                                      className="px-2 py-0.5 text-[9px] border rounded disabled:opacity-30 hover:bg-slate-100 dark:hover:bg-slate-800"
                                    >
                                      ▶
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Lead Details & AI Activity */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4">
                    <form onSubmit={handleAddLead} className="p-6 rounded-2xl border border-border bg-card shadow-sm space-y-4">
                      <h3 className="text-sm font-bold font-display">Provision New Pipeline Lead</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] text-muted-foreground font-semibold" htmlFor="lead-name">Lead Account Name</label>
                          <input
                            id="lead-name"
                            type="text"
                            placeholder="Saudi Distributors"
                            value={newLeadName}
                            onChange={(e) => setNewLeadName(e.target.value)}
                            className="w-full px-3 py-1.5 text-xs glass-input focus:outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] text-muted-foreground font-semibold" htmlFor="lead-value">Deal Value ($)</label>
                          <input
                            id="lead-value"
                            type="text"
                            placeholder="$24,000"
                            value={newLeadValue}
                            onChange={(e) => setNewLeadValue(e.target.value)}
                            className="w-full px-3 py-1.5 text-xs glass-input focus:outline-none"
                          />
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-primary hover:opacity-90 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 ml-auto"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Lead
                      </button>
                    </form>

                    <div className="p-6 rounded-2xl border border-border bg-card shadow-sm space-y-3">
                      <h3 className="text-sm font-bold font-display">Lead Activity & AI Checkpoint</h3>
                      {selectedLead ? (
                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between">
                            <strong className="text-foreground">{selectedLead.name}</strong>
                            <span className="text-emerald-500 font-bold">{selectedLead.value}</span>
                          </div>
                          <p className="text-[10px] text-muted-foreground">Coordinates visit log: {selectedLead.coordinates}</p>
                          <hr className="border-border opacity-50" />
                          <div className="bg-primary/5 p-3 rounded-lg border border-primary/10">
                            <p className="text-[10px] font-bold text-primary flex items-center gap-1"><Sparkles className="w-3.5 h-3.5" /> AI Meeting Summary:</p>
                            <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">{selectedLead.summary}</p>
                          </div>
                        </div>
                      ) : (
                        <p className="text-xs text-muted-foreground">Select a lead card above to view coordinate logs and AI meeting transcript summaries.</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* SUB TAB 3: SALES TEAM ROSTER */}
              {crmSubTab === "salesmen" && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-border pb-3">
                    <div>
                      <h3 className="text-sm font-bold font-display text-foreground">Sales Representatives & Team Roster</h3>
                      <p className="text-xs text-muted-foreground">Manage sales rep shift times, contact phone numbers, and territory coverage.</p>
                    </div>
                    <button
                      onClick={() => setIsAddSalesmanOpen(true)}
                      className="px-3 py-2 bg-primary text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 hover:opacity-90 transition-opacity"
                    >
                      <UserPlus className="w-4 h-4" /> Add Sales Rep
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {salesReps.map((rep) => (
                      <div key={rep.id} className="p-5 rounded-2xl border border-border bg-card shadow-sm space-y-4">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary to-secondary text-white font-extrabold flex items-center justify-center text-sm shadow-md">
                              {rep.avatar}
                            </div>
                            <div>
                              <h4 className="text-sm font-bold text-foreground">{rep.name}</h4>
                              <p className="text-xs text-primary font-semibold">{rep.role}</p>
                              <p className="text-[10px] text-muted-foreground mt-0.5">📞 {rep.phone} • ✉️ {rep.email}</p>
                            </div>
                          </div>
                          <span className={`px-2.5 py-1 text-[10px] font-bold rounded-full border ${
                            rep.status === "On Duty"
                              ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/30"
                              : rep.status === "In Client Meeting"
                              ? "bg-amber-500/10 text-amber-600 border-amber-500/30"
                              : "bg-slate-500/10 text-slate-500 border-slate-500/30"
                          }`}>
                            {rep.status}
                          </span>
                        </div>

                        <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-slate-50 dark:bg-black/20 text-center text-xs">
                          <div>
                            <p className="text-[10px] text-muted-foreground">Active Shift</p>
                            <p className="font-bold text-foreground text-[11px]">{rep.shift}</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-muted-foreground">Territory</p>
                            <p className="font-bold text-foreground text-[11px] truncate">{rep.territory}</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-muted-foreground">Completed Today</p>
                            <p className="font-bold text-emerald-500 text-[11px]">{rep.completedMeetingsToday} Meetings</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: UNIFIED OMNICHANNEL INBOX */}
          {(activeTab === "inbox" || activeTab === "all_in_one") && (
            <div id="sec-inbox" className="space-y-6 animate-fade-in text-left pt-6 border-t border-border scroll-mt-20">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border pb-4">
                <div>
                  <h1 className="text-2xl font-bold font-display text-foreground">{t("inbox")}</h1>
                  <p className="text-xs text-muted-foreground">Manage WhatsApp Business API, Facebook Messenger, Live Chat, and SMS broadcasts.</p>
                </div>
                <button
                  onClick={() => setIsBroadcastOpen(true)}
                  className="px-4 py-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white rounded-xl text-xs font-semibold shadow-md shadow-primary/20 transition-all flex items-center gap-1.5 shrink-0"
                >
                  <Send className="w-4 h-4" />
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
                      return (
                        <button
                          key={chan.id}
                          onClick={() => setSelectedChat(chan.id as any)}
                          className={`w-full text-left p-3 rounded-xl border flex items-center justify-between transition-all ${
                            selectedChat === chan.id
                              ? "border-primary bg-primary/5"
                              : "border-transparent hover:bg-black/5 dark:hover:bg-white/5"
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${chan.color}`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-foreground leading-none">{chan.title}</p>
                              <p className="text-[10px] text-muted-foreground mt-1">API Node Active</p>
                            </div>
                          </div>
                          <span className="text-[9px] bg-border px-1.5 py-0.5 rounded-full font-bold">{chan.num}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Conversation view */}
                <div className="col-span-2 flex flex-col justify-between h-full bg-slate-50/50 dark:bg-black/10">
                  {/* Chat logs */}
                  <div className="p-6 overflow-y-auto flex-grow space-y-4 max-h-[340px]">
                    {chatMessages[selectedChat]?.map((msg, idx) => (
                      <div key={idx} className={`p-3 rounded-xl max-w-[75%] text-xs ${
                        msg.sender === "agent"
                          ? "bg-primary text-white ml-auto"
                          : "bg-card border border-border text-foreground"
                      }`}>
                        <p className="leading-relaxed">{msg.text}</p>
                      </div>
                    ))}
                    {chatMessages[selectedChat]?.length === 0 && (
                      <p className="text-xs text-muted-foreground text-center py-10">No messages in this pipeline yet.</p>
                    )}
                  </div>

                  {/* AI recommendations and Input */}
                  <div className="p-4 border-t border-border bg-white dark:bg-[#0c1220] space-y-3">
                    {/* Suggestions */}
                    <div className="flex flex-wrap gap-2 items-center">
                      <span className="text-[9px] font-bold text-primary flex items-center gap-1 shrink-0"><Sparkles className="w-3 h-3" /> AI Recommend:</span>
                      {aiSuggestions[selectedChat]?.map((sug, idx) => (
                        <button
                          key={idx}
                          onClick={() => setInboxInput(sug)}
                          className="px-2.5 py-1 bg-primary/5 hover:bg-primary/10 text-primary border border-primary/10 rounded-lg text-[10px] font-medium truncate max-w-xs"
                        >
                          {sug}
                        </button>
                      ))}
                    </div>

                    <form onSubmit={handleSendInboxMessage} className="flex gap-2">
                      <input
                        type="text"
                        value={inboxInput}
                        onChange={(e) => setInboxInput(e.target.value)}
                        placeholder="Write support reply..."
                        className="flex-grow pl-3 pr-2 py-2 text-xs rounded-xl border border-border glass-input"
                      />
                      <button
                        type="submit"
                        className="px-4 bg-primary hover:opacity-90 text-white rounded-xl text-xs font-semibold flex items-center justify-center shrink-0"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: AI VOICE PLATFORM (Dialer) */}
          {(activeTab === "voice" || activeTab === "all_in_one") && (
            <div id="sec-voice" className="space-y-6 animate-fade-in text-left pt-6 border-t border-border scroll-mt-20">
              <div>
                <h1 className="text-2xl font-bold font-display text-foreground">{t("voice")}</h1>
                <p className="text-xs text-muted-foreground">Monitor and trigger simulated AI voice agent connections.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* VoIP Console widget */}
                <div className="lg:col-span-2 p-6 rounded-2xl border border-border bg-card shadow-sm text-center space-y-6">
                  <div className="flex justify-between items-center border-b pb-3">
                    <span className="text-sm font-bold flex items-center gap-2"><PhoneCall className="w-4 h-4 text-primary" /> AI VoIP Simulator</span>
                    <span className="text-xs font-mono bg-slate-100 dark:bg-slate-800 text-muted px-2 py-0.5 rounded">Endpoint: voice.sellgrow.io</span>
                  </div>

                  {voiceCallState === "idle" && (
                    <div className="py-12 space-y-4">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto text-primary">
                        <PhoneCall className="w-8 h-8" />
                      </div>
                      <p className="text-xs text-muted-foreground max-w-sm mx-auto leading-normal">
                        Click below to test out the AI voice agent dialer. This uses the browser&apos;s speech synthesizer to read agent lines out loud.
                      </p>
                      <button
                        onClick={handleStartVoiceCall}
                        className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl"
                      >
                        Connect & Dial Voice Agent
                      </button>
                    </div>
                  )}

                  {voiceCallState === "ringing" && (
                    <div className="py-12 space-y-4 animate-pulse">
                      <div className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center mx-auto text-white">
                        <PhoneCall className="w-8 h-8" />
                      </div>
                      <p className="text-xs font-bold text-emerald-500">Establishing WebRTC channel...</p>
                    </div>
                  )}

                  {voiceCallState === "active" && (
                    <div className="space-y-6">
                      {/* Active wave */}
                      <div className="flex items-center justify-center gap-1.5 h-8">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                          <span
                            key={i}
                            className="sound-bar"
                            style={{
                              animationPlayState: isVoiceSpeaking ? "running" : "paused",
                              height: isVoiceSpeaking ? "100%" : "20%",
                            }}
                          />
                        ))}
                      </div>

                      {/* Transcripts scroll */}
                      <div className="bg-slate-50 dark:bg-black/20 p-4 rounded-xl border border-border max-h-[180px] overflow-y-auto space-y-2 text-xs text-left">
                        {voiceTranscripts.map((t, idx) => (
                          <div key={idx} className={`p-2 rounded-lg ${t.sender === "ai" ? "bg-primary/10 text-foreground" : "bg-emerald-500/10 text-foreground"}`}>
                            <strong className="text-[10px] block uppercase text-muted-foreground">{t.sender === "ai" ? "Agent Dial" : "Operator (You)"}</strong>
                            <p className="mt-0.5 leading-relaxed">{t.text}</p>
                          </div>
                        ))}
                      </div>

                      {/* Manual text speech choices */}
                      <div className="text-left space-y-2">
                        <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Select Response choice:</p>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <button
                            onClick={() => handleVoiceResponse("What is the average latency of this system?", "WebRTC channels connect with average peer-to-peer latency around 120ms.")}
                            className="flex-grow text-left px-3 py-2 border rounded-xl text-xs hover:bg-black/5 dark:hover:bg-white/5"
                          >
                            &quot;System latency?&quot;
                          </button>
                          <button
                            onClick={() => handleVoiceResponse("Do we have call logs and reports?", "Yes! Every single completed voice agent call compiles records, summaries, and transcripts.")}
                            className="flex-grow text-left px-3 py-2 border rounded-xl text-xs hover:bg-black/5 dark:hover:bg-white/5"
                          >
                            &quot;Call logs/records?&quot;
                          </button>
                        </div>
                      </div>

                      <button
                        onClick={handleEndVoiceCall}
                        className="w-full flex items-center justify-center gap-2 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-semibold"
                      >
                        <PhoneOff className="w-4 h-4" /> End Active Call
                      </button>
                    </div>
                  )}

                  {voiceCallState === "ended" && (
                    <div className="py-12 space-y-4">
                      <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto text-red-500">
                        <PhoneOff className="w-8 h-8" />
                      </div>
                      <p className="text-xs font-bold text-red-500">Call Finished. Data synced to CRM.</p>
                    </div>
                  )}
                </div>

                {/* Call Analytics log logs */}
                <div className="p-6 rounded-2xl border border-border bg-card shadow-sm space-y-4">
                  <h3 className="text-sm font-bold font-display border-b pb-2">Recent Call Logs</h3>
                  <div className="space-y-3 text-xs">
                    {[
                      { num: "+966 50 123 4567", time: "10 mins ago", stat: "Accepted", duration: "1m 45s", summary: "Acme Corp requested invoice." },
                      { num: "+91 98765 43210", time: "1 hour ago", stat: "Missed", duration: "0s", summary: "Callback trigger created in workflow." },
                      { num: "+1 (555) 987-6543", time: "Yesterday", stat: "Accepted", duration: "3m 12s", summary: "German Textile requested SIP trunk details." }
                    ].map((call, idx) => (
                      <div key={idx} className="p-3 border rounded-xl space-y-1.5">
                        <div className="flex justify-between font-bold">
                          <span>{call.num}</span>
                          <span className={call.stat === "Missed" ? "text-red-500" : "text-emerald-500"}>{call.stat}</span>
                        </div>
                        <div className="flex justify-between text-[10px] text-muted-foreground">
                          <span>{call.time}</span>
                          <span>{call.duration}</span>
                        </div>
                        <p className="text-[10px] text-muted-foreground border-t pt-1 border-dashed mt-1">{call.summary}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: VISUAL WORKFLOW BUILDER */}
          {(activeTab === "workflow" || activeTab === "all_in_one") && (
            <div id="sec-workflow" className="space-y-6 animate-fade-in text-left pt-6 border-t border-border scroll-mt-20">
              <div>
                <h1 className="text-2xl font-bold font-display text-foreground">{t("workflow")}</h1>
                <p className="text-xs text-muted-foreground">Design automated pipelines connecting triggers, delays, and integrations.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Node display visualizer */}
                <div className="lg:col-span-2 p-6 rounded-2xl border border-border bg-card shadow-sm space-y-6">
                  <h3 className="text-sm font-bold font-display border-b pb-2">Visual Automation Pipeline Diagram</h3>

                  <div className="flex flex-col items-center space-y-4 relative py-6">
                    {workflowNodes.map((node, index) => (
                      <React.Fragment key={node.id}>
                        {index > 0 && (
                          <div className="w-0.5 h-6 bg-primary/30 dark:bg-primary/20 border-dashed border flex items-center justify-center font-mono text-[9px] text-muted">
                            ↓
                          </div>
                        )}
                        <div className="w-full max-w-sm p-4 rounded-xl border border-border bg-white dark:bg-[#0c1220] flex items-center justify-between gap-3 shadow-sm hover:border-primary transition-all">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                              node.type === "trigger" ? "bg-blue-500/10 text-blue-500" :
                              node.type === "delay" ? "bg-amber-500/10 text-amber-500" :
                              "bg-purple-500/10 text-purple-500"
                            }`}>
                              {node.type === "trigger" ? <Plus className="w-4 h-4" /> :
                               node.type === "delay" ? <Activity className="w-4 h-4" /> :
                               <Workflow className="w-4 h-4" />}
                            </div>
                            <div className="text-xs">
                              <p className="font-bold text-foreground">{node.label}</p>
                              <p className="text-[10px] text-muted-foreground mt-0.5">{node.details}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => setWorkflowNodes(workflowNodes.filter(n => n.id !== node.id))}
                            className="p-1 rounded hover:bg-red-500/10 text-muted-foreground hover:text-red-500 transition-colors"
                            aria-label="Remove node"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* Add block node form */}
                <form onSubmit={handleAddWorkflowNode} className="p-6 rounded-2xl border border-border bg-card shadow-sm space-y-4 h-fit">
                  <h3 className="text-sm font-bold font-display">Configure Automation Step</h3>

                  <div className="space-y-1">
                    <label className="text-[10px] text-muted-foreground font-semibold" htmlFor="node-type">Node Behavior Type</label>
                    <select
                      id="node-type"
                      value={newNodeType}
                      onChange={(e) => setNewNodeType(e.target.value as any)}
                      className="w-full px-3 py-2 text-xs glass-input focus:outline-none cursor-pointer"
                    >
                      <option value="trigger" className="bg-[#0c1220]">Trigger (Start Chain)</option>
                      <option value="delay" className="bg-[#0c1220]">Delay / Wait Timer</option>
                      <option value="action" className="bg-[#0c1220]">Action Node (CRM / VoIP / Webhook)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-muted-foreground font-semibold" htmlFor="node-title">Step Title</label>
                    <input
                      id="node-title"
                      type="text"
                      placeholder="e.g. Sync Shopify Store"
                      value={newNodeLabel}
                      onChange={(e) => setNewNodeLabel(e.target.value)}
                      className="w-full px-3 py-2 text-xs glass-input focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-muted-foreground font-semibold" htmlFor="node-details">Execution Details</label>
                    <input
                      id="node-details"
                      type="text"
                      placeholder="e.g. Delay execution for 10 minutes"
                      value={newNodeDetails}
                      onChange={(e) => setNewNodeDetails(e.target.value)}
                      className="w-full px-3 py-2 text-xs glass-input focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2 bg-primary hover:opacity-90 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" /> Append Step Node
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* TAB 6: PRODUCT CATALOGUE (Superadmin Catalog Controller Structure) */}
          {(activeTab === "catalogue" || activeTab === "all_in_one") && (
            <div id="sec-catalogue" className="space-y-6 animate-fade-in text-left pt-6 border-t border-border scroll-mt-20">
              
              {/* Top Header Card Container */}
              <div className="p-6 rounded-3xl bg-card border border-border shadow-sm space-y-4">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      CLIENT CATALOG CONTROLLER
                    </span>
                    <h1 className="text-2xl font-extrabold font-display text-foreground mt-2">
                      Product Catalog & Live Management
                    </h1>
                    <p className="text-xs text-muted-foreground mt-1">
                      Add new products, update specifications, manage catalog items, and view live changes synced instantly to the main customer page (<a href="/products" target="_blank" className="text-primary font-bold underline font-mono">/products</a>).
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                    <button
                      onClick={() => setIsAddProductOpen(true)}
                      className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-emerald-600/20 transition-all active:scale-95"
                    >
                      <Plus className="w-4 h-4" />
                      <span>+ Add New Product</span>
                    </button>
                    <a
                      href="/products"
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2.5 bg-muted hover:bg-muted/80 text-foreground font-extrabold rounded-xl text-xs flex items-center gap-2 border border-border transition-all"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Preview Live /products</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* 4 Metrics Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-card border border-border shadow-sm space-y-1">
                  <span className="text-[10px] font-bold uppercase text-muted-foreground">Total Models Live</span>
                  <p className="text-2xl font-extrabold text-foreground font-display">{products.length} Equipment Models</p>
                </div>
                <div className="p-5 rounded-2xl bg-card border border-border shadow-sm space-y-1">
                  <span className="text-[10px] font-bold uppercase text-emerald-500">Categories</span>
                  <p className="text-2xl font-extrabold text-foreground font-display">{new Set(products.map(p => p.category)).size} Active Groups</p>
                </div>
                <div className="p-5 rounded-2xl bg-card border border-border shadow-sm space-y-1">
                  <span className="text-[10px] font-bold uppercase text-sky-500">AI Voice Assistant</span>
                  <p className="text-2xl font-extrabold text-foreground font-display">Active (EN & TA)</p>
                </div>
                <div className="p-5 rounded-2xl bg-card border border-border shadow-sm space-y-1">
                  <span className="text-[10px] font-bold uppercase text-purple-500">3D Hologram Stage</span>
                  <p className="text-2xl font-extrabold text-foreground font-display">360° Rotatable</p>
                </div>
              </div>

              {/* Main Product Catalog Grid Container (Superadmin Structure) */}
              <div className="p-6 rounded-3xl bg-card border border-border shadow-sm space-y-6">
                
                {/* Header + Category Filter + Search + Add Brochure */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-border">
                  <div>
                    <h2 className="text-sm font-extrabold uppercase tracking-wider text-foreground font-display">
                      ALL CATALOG EQUIPMENT MODELS ({filteredProducts.length})
                    </h2>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      Manage live models, specs, and custom equipment images.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    {/* Category & Brand Filter Buttons */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <button
                        onClick={() => setSelectedCatFilter("George Maijo")}
                        className={`px-4 py-2 text-xs font-extrabold rounded-xl border transition-all flex items-center gap-1.5 shrink-0 ${
                          selectedCatFilter === "George Maijo"
                            ? "bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/20 ring-2 ring-emerald-500/30"
                            : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20"
                        }`}
                      >
                        <span>🌿 George Maijo Products</span>
                        <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-mono">17</span>
                      </button>

                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-muted-foreground shrink-0">Category:</span>
                        <select
                          value={selectedCatFilter}
                          onChange={(e) => setSelectedCatFilter(e.target.value)}
                          className="px-3 py-2 bg-background text-xs rounded-xl border border-border font-bold focus:outline-none focus:border-primary"
                        >
                          <option value="All">All Categories ({products.length})</option>
                          <option value="George Maijo">George Maijo Machinery Fleet (17)</option>
                          {Array.from(new Set(products.map(p => p.category))).map(c => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Search Input */}
                    <div className="relative w-full sm:w-56">
                      <Search className="w-4 h-4 absolute left-3 top-2.5 text-muted-foreground" />
                      <input
                        type="text"
                        value={catalogueSearch}
                        onChange={(e) => setCatalogueSearch(e.target.value)}
                        placeholder="Search models..."
                        className="w-full pl-9 pr-4 py-2 bg-background text-xs rounded-xl border border-border focus:outline-none focus:border-primary"
                      />
                    </div>

                    {/* Add Brochure Button */}
                    <button
                      onClick={() => {
                        alert("Product Brochure Uploader triggered!");
                      }}
                      className="px-5 py-2.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 hover:opacity-95 text-white text-xs font-extrabold rounded-full shadow-md transition-all flex items-center gap-2 shrink-0 border border-white/10"
                    >
                      <FilePlus className="w-4 h-4" />
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

                    return (
                      <div
                        key={p.id}
                        className="p-4 rounded-2xl bg-card border border-border flex flex-col justify-between space-y-3 hover:border-primary/50 transition-all shadow-sm relative group"
                      >
                        <div className="space-y-2.5">
                          {/* Image Header with Category Tag top left */}
                          <div className="relative w-full h-36 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-900 border border-border p-2 flex items-center justify-center">
                            <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-[8px] font-extrabold bg-emerald-500 text-white shadow-sm uppercase tracking-wider">
                              {categoryTag}
                            </span>
                            <img
                              src={p.image || "https://www.georgemaijoagri.com/wp-content/uploads/2024/10/2.5.BC-520@2x.png"}
                              alt={p.name}
                              className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                            />
                            <button
                              type="button"
                              onClick={() => handleDeleteProduct(p.id, p.name)}
                              title="Delete Model"
                              className="absolute top-2 right-2 w-6 h-6 rounded-full bg-red-600 hover:bg-red-500 text-white flex items-center justify-center shadow-md transition-transform active:scale-95 z-10"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>

                          {/* Product Title */}
                          <div>
                            <h3 className="text-sm font-extrabold text-foreground font-display line-clamp-1">{p.name}</h3>
                            <p className="text-[10px] text-muted-foreground line-clamp-1 mt-0.5">{p.description}</p>
                          </div>
                        </div>

                        {/* Action Buttons Footer matching user screenshot */}
                        <div className="flex items-center justify-between pt-2 border-t border-border gap-2">
                          <div className="flex items-center gap-1.5">
                            {/* Blue Microphone Voice Preview Button */}
                            <button
                              onClick={() => {
                                if (typeof window !== "undefined" && "speechSynthesis" in window) {
                                  window.speechSynthesis.cancel();
                                  const text = `Hello! This is the George Maijo AI Voice Assistant for ${p.name}. Powered by 4-stroke air cooled engine. How can I help you today?`;
                                  const utterance = new SpeechSynthesisUtterance(text);
                                  utterance.rate = 1.0;
                                  window.speechSynthesis.speak(utterance);
                                }
                                alert(`🎙️ Playing AI Voice line for "${p.name}"`);
                              }}
                              className="w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-md transition-all active:scale-95 shrink-0"
                              title="Play AI Voice Preview"
                            >
                              <Volume2 className="w-4 h-4" />
                            </button>

                            {/* Blue Document Brochure Button */}
                            <button
                              onClick={() => {
                                alert(`📄 Opening brochure PDF spec sheet for "${p.name}"`);
                              }}
                              className="w-8 h-8 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center shadow-md transition-all active:scale-95 shrink-0"
                              title="Download Brochure / Specs"
                            >
                              <FileText className="w-4 h-4" />
                            </button>
                          </div>

                          {/* View Details > Link */}
                          <button
                            onClick={() => alert(`Showing detailed specs and pricing for ${p.name}:\n\n- Model: ${p.name}\n- Price: ${formatPrice(p.price)}\n- Category: ${p.category}\n- Description: ${p.description}`)}
                            className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-0.5"
                          >
                            <span>View Details</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>

            </div>
          )}

          {/* TAB 7: KNOWLEDGE BASE (RAG Vector Database) */}
          {(activeTab === "rag" || activeTab === "all_in_one") && (
            <div id="sec-rag" className="space-y-6 animate-fade-in text-left pt-6 border-t border-border scroll-mt-20">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border pb-4">
                <div>
                  <h1 className="text-2xl font-bold font-display text-foreground">{t("rag")}</h1>
                  <p className="text-xs text-muted-foreground">Upload reference sources to compile semantic indices mapped to AI reply interfaces.</p>
                </div>
                <button
                  onClick={() => setIsUploadDocOpen(true)}
                  className="px-4 py-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white rounded-xl text-xs font-semibold shadow-md shadow-primary/20 transition-all flex items-center gap-1.5 shrink-0"
                >
                  <Plus className="w-4 h-4" />
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
                      {ragFiles.map((file, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 border rounded-xl text-xs">
                          <div className="flex items-center gap-3">
                            <FileText className="w-4 h-4 text-primary shrink-0" />
                            <div>
                              <p className="font-bold text-foreground">{file.name}</p>
                              <p className="text-[10px] text-muted-foreground mt-0.5">Chunks: {file.chunks} | Size: {file.size}</p>
                            </div>
                          </div>
                          <span className="text-[10px] text-muted-foreground">Uploaded: {file.date}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Live RAG Vector Search Tester */}
                <div className="p-6 rounded-2xl border border-border bg-card shadow-sm space-y-4 h-fit">
                  <h3 className="text-sm font-bold font-display">Semantic RAG Search Sandbox</h3>
                  <p className="text-[10px] text-muted-foreground">Type a prompt to query the mock vector indexes. Use keywords like &quot;refund&quot;, &quot;ev&quot;, or &quot;arabic&quot;.</p>

                  <form onSubmit={handleRagSearch} className="relative">
                    <input
                      type="text"
                      value={ragQuery}
                      onChange={(e) => setRagQuery(e.target.value)}
                      placeholder="Search vector documents..."
                      className="w-full pl-9 pr-3 py-2 text-xs glass-input focus:outline-none"
                    />
                    <Search className="w-3.5 h-3.5 text-muted absolute left-3 top-3" />
                  </form>

                  {ragResult && (
                    <div className="p-3.5 border border-primary/20 bg-primary/5 rounded-xl space-y-2 text-xs">
                      <div className="flex justify-between items-center text-[10px] font-mono text-muted-foreground font-bold">
                        <span>Confidence: <strong className="text-primary">{(ragResult.confidence * 100).toFixed(0)}%</strong></span>
                        <span>{ragResult.source}</span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed text-[11px]">{ragResult.answer}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: BUSINESS ANALYTICS */}
          {(activeTab === "analytics" || activeTab === "all_in_one") && (
            <div id="sec-analytics" className="space-y-6 animate-fade-in text-left pt-6 border-t border-border scroll-mt-20">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border pb-4">
                <div>
                  <h1 className="text-2xl font-bold font-display text-foreground">Business Analytics</h1>
                  <p className="text-xs text-muted-foreground">Track ROI conversions, AI support logs, and VoIP reception stats.</p>
                </div>
                <button
                  onClick={() => alert("Exporting full Business Analytics PDF report for July 2026...")}
                  className="px-4 py-2 border border-border hover:bg-black/5 dark:hover:bg-white/5 rounded-xl text-xs font-semibold text-foreground transition-all flex items-center gap-1.5 shrink-0"
                >
                  <FileText className="w-4 h-4 text-primary" />
                  <span>Export Report (PDF)</span>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Left Card: Sales Performance Conversion ($) */}
                <div className="p-6 rounded-3xl border border-border bg-card shadow-sm space-y-4">
                  <h3 className="text-sm font-bold font-display text-foreground">Sales Performance Conversion ($)</h3>
                  <div className="relative h-56 w-full pt-4 flex flex-col justify-between">
                    <svg className="w-full h-40 overflow-visible" viewBox="0 0 400 130" preserveAspectRatio="none">
                      {/* Horizontal Grid Lines */}
                      <line x1="0" y1="20" x2="400" y2="20" stroke="currentColor" className="text-border/30" strokeWidth="1" strokeDasharray="3 3" />
                      <line x1="0" y1="65" x2="400" y2="65" stroke="currentColor" className="text-border/30" strokeWidth="1" strokeDasharray="3 3" />
                      <line x1="0" y1="110" x2="400" y2="110" stroke="currentColor" className="text-border/30" strokeWidth="1" strokeDasharray="3 3" />

                      <defs>
                        <linearGradient id="sales-line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#2563eb" />
                          <stop offset="50%" stopColor="#0284c7" />
                          <stop offset="100%" stopColor="#10b981" />
                        </linearGradient>
                        <linearGradient id="sales-fill-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#10b981" stopOpacity="0.12" />
                          <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
                        </linearGradient>
                      </defs>

                      {/* Area Fill */}
                      <path
                        d="M 10 100 C 60 90, 110 50, 160 55 C 220 60, 290 35, 390 15 L 390 120 L 10 120 Z"
                        fill="url(#sales-fill-grad)"
                      />

                      {/* Smooth Bezier Line */}
                      <path
                        d="M 10 100 C 60 90, 110 50, 160 55 C 220 60, 290 35, 390 15"
                        fill="none"
                        stroke="url(#sales-line-grad)"
                        strokeWidth="4"
                        strokeLinecap="round"
                      />

                      {/* End Point Indicator */}
                      <circle cx="390" cy="15" r="5" fill="#10b981" />
                    </svg>

                    {/* X-Axis Labels */}
                    <div className="flex justify-between text-xs font-semibold text-muted-foreground px-2 pt-2 border-t border-border/30">
                      <span>Jan</span>
                      <span>Mar</span>
                      <span>May</span>
                      <span>Jul (Current)</span>
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
                    ].map((bar, idx) => (
                      <div key={idx} className="space-y-2">
                        <div className="flex justify-between items-center text-xs font-bold">
                          <span className="text-foreground font-display">{bar.chan}</span>
                          <span className="text-blue-600 dark:text-sky-400 font-mono font-extrabold">{bar.val}% Deflected</span>
                        </div>
                        <div className="w-full h-3 bg-slate-100 dark:bg-slate-800/80 rounded-full overflow-hidden p-0.5 border border-border/30">
                          <div
                            className={`h-full bg-gradient-to-r ${bar.color} rounded-full transition-all duration-1000 ease-out shadow-sm`}
                            style={{ width: `${bar.val}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB: SERVICES (11 Live Services) */}
          {(activeTab === "services" || activeTab === "all_in_one") && (
            <div id="sec-services" className="space-y-6 animate-fade-in text-left pt-6 border-t border-border scroll-mt-20">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border pb-4">
                <div>
                  <h1 className="text-2xl font-bold font-display text-foreground flex items-center gap-2">
                    <Cpu className="w-6 h-6 text-primary" />
                    <span>Company Services & Operations (11 Live)</span>
                  </h1>
                  <p className="text-xs text-muted-foreground">Manage active services, machinery dispatch, soil testing, and AI booking hotlines for {user?.businessName || "NOMO"}.</p>
                </div>
                <button
                  onClick={() => setIsAddServiceOpen(true)}
                  className="px-4 py-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white rounded-xl text-xs font-semibold shadow-md flex items-center gap-1.5 shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Provision New Service</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {servicesList.map((srv) => (
                  <div key={srv.id} className="p-5 rounded-2xl border border-border bg-card shadow-sm space-y-3 flex flex-col justify-between hover:border-primary transition-all">
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
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span>{srv.status}</span>
                      </span>
                      <button
                        onClick={() => alert(`Service "${srv.name}" configuration updated!`)}
                        className="px-3 py-1 text-[11px] border border-border rounded-lg font-semibold hover:bg-muted transition-colors"
                      >
                        Manage Service
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: SUB ADMIN (Super Admin / Sub Admin / Employees Directory) */}
          {(activeTab === "sub_admin" || activeTab === "all_in_one") && (
            <div id="sec-sub-admin" className="space-y-6 animate-fade-in text-left pt-6 border-t border-border scroll-mt-20">
              
              {/* Top Navigation Pills (Matching Screenshots 1, 2, 3) */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setClientSubAdminTab("super-admin")}
                  className={`px-5 py-2 rounded-2xl text-xs font-bold transition-all shadow-sm ${
                    clientSubAdminTab === "super-admin"
                      ? "bg-blue-600 text-white shadow-blue-600/30"
                      : "bg-muted/60 text-muted-foreground hover:bg-muted"
                  }`}
                >
                  Super Admin
                </button>
                <button
                  type="button"
                  onClick={() => setClientSubAdminTab("sub-admins")}
                  className={`px-5 py-2 rounded-2xl text-xs font-bold transition-all shadow-sm ${
                    clientSubAdminTab === "sub-admins"
                      ? "bg-blue-600 text-white shadow-blue-600/30"
                      : "bg-muted/60 text-muted-foreground hover:bg-muted"
                  }`}
                >
                  Sub Admin
                </button>
                <button
                  type="button"
                  onClick={() => setClientSubAdminTab("employees")}
                  className={`px-5 py-2 rounded-2xl text-xs font-bold transition-all shadow-sm ${
                    clientSubAdminTab === "employees"
                      ? "bg-blue-600 text-white shadow-blue-600/30"
                      : "bg-muted/60 text-muted-foreground hover:bg-muted"
                  }`}
                >
                  Employees
                </button>
              </div>

              {/* Main Directory Container Card */}
              <div className="p-6 sm:p-8 rounded-3xl border border-border bg-card shadow-sm space-y-6">

                {/* ---------------------------------------------------- */}
                {/* 1. SUPER ADMIN DIRECTORY SUB-TAB                      */}
                {/* ---------------------------------------------------- */}
                {clientSubAdminTab === "super-admin" && (
                  <div className="space-y-6">
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
                      <button
                        onClick={() => {
                          const name = prompt("Enter Super Admin Name:");
                          const email = prompt("Enter Super Admin Email:");
                          if (name && email) {
                            setSuperAdminDirectory(prev => [
                              ...prev,
                              { id: `sa-dir-${Date.now()}`, name, email, role: "SuperAdmin", permissions: "Full Access", status: "Active", notificationEnabled: true, portalLink: "/sg-superadmin" }
                            ]);
                          }
                        }}
                        className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-1.5 shrink-0"
                      >
                        <Plus className="w-4 h-4" />
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
                          {superAdminDirectory.map((admin) => (
                            <tr key={admin.id} className="hover:bg-muted/20 transition-colors">
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
                                <button
                                  onClick={() => {
                                    setSuperAdminDirectory(prev =>
                                      prev.map(item => item.id === admin.id ? { ...item, notificationEnabled: !item.notificationEnabled } : item)
                                    );
                                  }}
                                  className={`px-3 py-1 rounded-xl text-[11px] font-bold border transition-all inline-flex items-center gap-1.5 ${
                                    admin.notificationEnabled
                                      ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                                      : "bg-muted text-muted-foreground border-border"
                                  }`}
                                >
                                  <Bell className="w-3 h-3" />
                                  <span>{admin.notificationEnabled ? "Enabled" : "Muted"}</span>
                                </button>
                              </td>
                              <td className="px-5 py-4">
                                <div className="flex items-center gap-2 font-mono text-[11px] text-muted-foreground">
                                  <span>{admin.portalLink}</span>
                                  <button
                                    onClick={() => {
                                      navigator.clipboard.writeText(`${window.location.origin}${admin.portalLink}`);
                                      alert("SuperAdmin portal link copied to clipboard!");
                                    }}
                                    className="p-1 hover:text-primary transition-colors"
                                    title="Copy link"
                                  >
                                    <FileText className="w-3.5 h-3.5" />
                                  </button>
                                  <a href={admin.portalLink} target="_blank" rel="noreferrer" className="p-1 hover:text-primary transition-colors" title="Open portal">
                                    <ExternalLink className="w-3.5 h-3.5" />
                                  </a>
                                </div>
                              </td>
                              <td className="px-5 py-4 text-right">
                                <button
                                  onClick={() => alert(`Direct notification dispatched to ${admin.name}`)}
                                  className="p-2 rounded-xl text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                                  title="Send Notification"
                                >
                                  <BellRing className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* ---------------------------------------------------- */}
                {/* 2. SUB ADMIN DIRECTORY SUB-TAB                        */}
                {/* ---------------------------------------------------- */}
                {clientSubAdminTab === "sub-admins" && (
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <h2 className="text-xl font-bold font-display text-foreground">
                          Administrative Team Directory
                        </h2>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Click any Sub Admin card to view or manage permissions, roles, and notification details.
                        </p>
                      </div>
                      <button
                        onClick={() => {
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
                        }}
                        className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-1.5 shrink-0"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Invite Sub Admin</span>
                      </button>
                    </div>

                    {/* Cards Grid Matching Image 2 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                      {subAdminDirectory.map((member) => (
                        <div
                          key={member.id}
                          className="p-5 rounded-2xl border border-border bg-card hover:border-primary/40 transition-all shadow-sm flex flex-col justify-between space-y-4 hover:-translate-y-1"
                        >
                          {/* TOP: SG-ID Pill & Role Badge */}
                          <div className="flex items-center justify-between gap-2">
                            <span className="px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-600 font-mono text-[11px] font-extrabold border border-blue-500/20">
                              {member.sgId}
                            </span>
                            <span className={`px-2.5 py-1 rounded-md text-[10px] font-extrabold ${
                              member.role === "Developer"
                                ? "bg-indigo-500/10 text-indigo-500 border border-indigo-500/20"
                                : member.role === "Support"
                                ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                                : "bg-muted text-muted-foreground border border-border"
                            }`}>
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
                              <button
                                type="button"
                                onClick={() => alert(`Sub-Admin Details:\nName: ${member.name}\nEmail: ${member.email}\nRole: ${member.role}\nAccess: ${member.accessScope}`)}
                                className="flex-1 py-1.5 rounded-xl text-xs font-bold transition-all text-center bg-muted/60 hover:bg-primary hover:text-white text-foreground"
                              >
                                View Options
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  if (confirm(`Remove ${member.name} from sub-admin team?`)) {
                                    setSubAdminDirectory(prev => prev.filter(item => item.id !== member.id));
                                  }
                                }}
                                className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/20 transition-all shrink-0"
                                title={`Delete ${member.name}`}
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ---------------------------------------------------- */}
                {/* 3. EMPLOYEES DIRECTORY SUB-TAB                        */}
                {/* ---------------------------------------------------- */}
                {clientSubAdminTab === "employees" && (
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <h2 className="text-xl font-bold font-display text-foreground">
                          Employee Directory
                        </h2>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Manage tasks, permissions access, status, notification options and assignments of all employees.
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          const name = prompt("Enter Employee Name:");
                          const email = prompt("Enter Employee Email:");
                          const work = prompt("Enter Employee Task / Service:", "Customer Support") || "Customer Support";
                          if (name && email) {
                            setEmployeeDirectory(prev => [
                              ...prev,
                              { id: `emp-${Date.now()}`, name, email, work, assignedSubAdmin: "Operator Main", accessScope: "View Only", avatar: name.charAt(0).toUpperCase() }
                            ]);
                          }
                        }}
                        className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-1.5 shrink-0"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add New Employee</span>
                      </button>
                    </div>

                    {/* Employee Cards Grid Matching Image 3 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {employeeDirectory.map((emp) => (
                        <div
                          key={emp.id}
                          className="p-5 rounded-2xl border border-border bg-card hover:border-primary/40 transition-all shadow-sm flex flex-col justify-between space-y-4 hover:-translate-y-1"
                        >
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
                              <button
                                type="button"
                                onClick={() => alert(`Employee Details:\nName: ${emp.name}\nEmail: ${emp.email}\nTask: ${emp.work}\nAssigned Sub-Admin: ${emp.assignedSubAdmin}`)}
                                className="flex-1 py-1.5 rounded-xl text-xs font-bold transition-all text-center bg-muted/60 hover:bg-primary hover:text-white text-foreground"
                              >
                                View Options
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  if (confirm(`Remove ${emp.name} from employee directory?`)) {
                                    setEmployeeDirectory(prev => prev.filter(item => item.id !== emp.id));
                                  }
                                }}
                                className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/20 transition-all shrink-0"
                                title={`Delete ${emp.name}`}
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>
          )}

          {/* TAB: CONTROL FLAGS (Feature Flags & Autopilot) */}
          {(activeTab === "control_flags" || activeTab === "all_in_one") && (
            <div id="sec-control-flags" className="space-y-6 animate-fade-in text-left pt-6 border-t border-border scroll-mt-20">
              <div className="border-b border-border pb-4">
                <h1 className="text-2xl font-bold font-display text-foreground flex items-center gap-2">
                  <Sliders className="w-6 h-6 text-primary" />
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
                  const isEnabled = (controlFlags as any)[flag.key];
                  return (
                    <div key={flag.key} className="p-5 rounded-2xl border border-border bg-card shadow-sm flex items-start justify-between gap-4">
                      <div className="flex gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="space-y-1">
                          <h3 className="text-sm font-bold text-foreground font-display">{flag.title}</h3>
                          <p className="text-xs text-muted-foreground leading-relaxed">{flag.desc}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setControlFlags(prev => ({ ...prev, [flag.key]: !isEnabled }));
                          alert(`"${flag.title}" set to ${!isEnabled ? "ENABLED (Live)" : "DISABLED"}`);
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                          isEnabled
                            ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {isEnabled ? "LIVE (Active)" : "OFF"}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB: CLIENT DATA (Customer Records & CRM Contacts) */}
          {(activeTab === "client_data" || activeTab === "all_in_one") && (
            <div id="sec-client-data" className="space-y-6 animate-fade-in text-left pt-6 border-t border-border scroll-mt-20">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border pb-4">
                <div>
                  <h1 className="text-2xl font-bold font-display text-foreground flex items-center gap-2">
                    <UserCheck className="w-6 h-6 text-primary" />
                    <span>Client Data & Customer Directory</span>
                  </h1>
                  <p className="text-xs text-muted-foreground">Manage client company accounts, order history, and contact records.</p>
                </div>
                <button
                  onClick={() => setIsAddClientOpen(true)}
                  className="px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-xl text-xs font-semibold shadow-md flex items-center gap-1.5 shrink-0"
                >
                  <Plus className="w-4 h-4" />
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
                    {clientRecords.map((cli) => (
                      <tr key={cli.id} className="hover:bg-muted/30">
                        <td className="py-3 font-bold text-foreground">{cli.company}</td>
                        <td className="py-3">{cli.contact}</td>
                        <td className="py-3 font-mono text-[11px]">{cli.phone} <br/><span className="text-muted-foreground">{cli.email}</span></td>
                        <td className="py-3"><span className="px-2 py-0.5 bg-primary/10 text-primary rounded font-semibold text-[10px]">{cli.category}</span></td>
                        <td className="py-3 font-mono font-bold">{cli.ordersCount} Orders</td>
                        <td className="py-3 font-mono font-bold text-emerald-500">{formatPrice(cli.totalSpent)}</td>
                        <td className="py-3"><span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-500 rounded-full font-bold text-[10px]">{cli.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: PAYMENT (Gateway & POS Billing) */}
          {(activeTab === "payment" || activeTab === "all_in_one") && (
            <div id="sec-payment" className="space-y-6 animate-fade-in text-left pt-6 border-t border-border scroll-mt-20">
              <div className="border-b border-border pb-4">
                <h1 className="text-2xl font-bold font-display text-foreground flex items-center gap-2">
                  <CreditCard className="w-6 h-6 text-primary" />
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
                ].map((gate, idx) => (
                  <div key={idx} className="p-5 rounded-2xl border border-border bg-card shadow-sm space-y-2">
                    <div className="flex justify-between items-center">
                      <CreditCard className={`w-5 h-5 ${gate.color}`} />
                      <span className="text-[10px] font-bold bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded-full">{gate.status}</span>
                    </div>
                    <h3 className="text-sm font-bold text-foreground font-display">{gate.name}</h3>
                    <p className="text-xs text-muted-foreground">{gate.desc}</p>
                  </div>
                ))}
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
                    {transactions.map((txn) => (
                      <tr key={txn.id} className="hover:bg-muted/30">
                        <td className="py-3 font-mono font-bold text-primary">{txn.id}</td>
                        <td className="py-3 font-bold text-foreground">{txn.client}</td>
                        <td className="py-3 font-mono text-[11px] text-muted-foreground">{txn.date}</td>
                        <td className="py-3">{txn.method}</td>
                        <td className="py-3 font-mono font-bold text-emerald-500">{formatPrice(txn.amount)}</td>
                        <td className="py-3"><span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-500 rounded-full font-bold text-[10px]">{txn.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: SETTING (Company Profile Configuration) */}
          {(activeTab === "setting" || activeTab === "all_in_one") && (
            <div id="sec-setting" className="space-y-6 animate-fade-in text-left pt-6 border-t border-border scroll-mt-20">
              <div className="border-b border-border pb-4">
                <h1 className="text-2xl font-bold font-display text-foreground flex items-center gap-2">
                  <Settings className="w-6 h-6 text-primary" />
                  <span>Company Settings & Preferences</span>
                </h1>
                <p className="text-xs text-muted-foreground">Configure business name, category, support contacts, and custom domain settings.</p>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); alert("Company Settings updated successfully!"); }} className="p-6 rounded-2xl border border-border bg-card shadow-sm space-y-4 max-w-2xl">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-foreground">Registered Business Name</label>
                  <input
                    type="text"
                    value={settingCompany}
                    onChange={(e) => setSettingCompany(e.target.value)}
                    className="w-full p-2.5 text-xs rounded-xl border border-border bg-background focus:ring-1 focus:ring-primary font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-foreground">Business Operating Category</label>
                  <input
                    type="text"
                    value={settingType}
                    onChange={(e) => setSettingType(e.target.value)}
                    className="w-full p-2.5 text-xs rounded-xl border border-border bg-background focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-foreground">Support Email</label>
                    <input
                      type="email"
                      value={settingEmail}
                      onChange={(e) => setSettingEmail(e.target.value)}
                      className="w-full p-2.5 text-xs rounded-xl border border-border bg-background focus:ring-1 focus:ring-primary font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-foreground">Support Phone</label>
                    <input
                      type="text"
                      value={settingPhone}
                      onChange={(e) => setSettingPhone(e.target.value)}
                      className="w-full p-2.5 text-xs rounded-xl border border-border bg-background focus:ring-1 focus:ring-primary font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-foreground">Custom Application URL</label>
                  <input
                    type="text"
                    value={settingDomain}
                    onChange={(e) => setSettingDomain(e.target.value)}
                    className="w-full p-2.5 text-xs rounded-xl border border-border bg-background focus:ring-1 focus:ring-primary font-mono font-bold text-primary"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-primary text-white rounded-xl text-xs font-bold shadow-md hover:opacity-90"
                >
                  Save Business Settings
                </button>
              </form>
            </div>
          )}

          {/* TAB: MY PROFILE (Admin Profile & Security) */}
          {(activeTab === "my_profile" || activeTab === "all_in_one") && (
            <div id="sec-my-profile" className="space-y-6 animate-fade-in text-left pt-6 border-t border-border scroll-mt-20">
              <div className="border-b border-border pb-4">
                <h1 className="text-2xl font-bold font-display text-foreground flex items-center gap-2">
                  <User className="w-6 h-6 text-primary" />
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
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full p-2.5 text-xs rounded-xl border border-border bg-background focus:ring-1 focus:ring-primary"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-foreground">New Password</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full p-2.5 text-xs rounded-xl border border-border bg-background focus:ring-1 focus:ring-primary"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-xl border border-border">
                    <div>
                      <p className="text-xs font-bold text-foreground">Two-Factor Authentication (2FA)</p>
                      <p className="text-[10px] text-muted-foreground">Require OTP code upon admin login.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setTwoFactorAuth(!twoFactorAuth)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold ${twoFactorAuth ? "bg-emerald-500 text-white" : "bg-muted text-muted-foreground"}`}
                    >
                      {twoFactorAuth ? "ENABLED" : "OFF"}
                    </button>
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-primary text-white rounded-xl text-xs font-bold shadow-md hover:opacity-90"
                  >
                    Update Security Password
                  </button>
                </form>
              </div>
            </div>
          )}

      {/* ADD PRODUCT MODAL FOR CLIENT ADMIN */}
      {isAddProductOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg bg-card border border-border rounded-2xl shadow-2xl p-6 space-y-5 animate-scaleUp text-left">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <Package className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold font-display text-foreground">Add New Product</h3>
                  <p className="text-[11px] text-muted-foreground">Fill in details to list a new product in your catalogue.</p>
                </div>
              </div>
              <button
                onClick={() => setIsAddProductOpen(false)}
                className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                aria-label="Close Modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={prodName}
                    onChange={(e) => setProdName(e.target.value)}
                    placeholder="e.g. Smart AI Camera Hub"
                    className="w-full p-2.5 rounded-xl border border-border bg-background text-xs focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Price / Value *</label>
                  <input
                    type="text"
                    required
                    value={prodPrice}
                    onChange={(e) => setProdPrice(e.target.value)}
                    placeholder="e.g. $1,450"
                    className="w-full p-2.5 rounded-xl border border-border bg-background text-xs focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Category</label>
                  <select
                    value={prodCategory}
                    onChange={(e) => setProdCategory(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-border bg-background text-xs focus:ring-1 focus:ring-primary"
                  >
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
                    <button
                      type="button"
                      onClick={() => setProdSku(`SKU-${Math.floor(100000 + Math.random() * 900000)}`)}
                      className="text-[10px] text-primary hover:underline font-semibold"
                    >
                      Auto-generate
                    </button>
                  </div>
                  <input
                    type="text"
                    value={prodSku}
                    onChange={(e) => setProdSku(e.target.value)}
                    placeholder="e.g. GR-OIL-101"
                    className="w-full p-2.5 rounded-xl border border-border bg-background text-xs font-mono focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Variant Option</label>
                  <select
                    value={prodVariants}
                    onChange={(e) => setProdVariants(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-border bg-background text-xs focus:ring-1 focus:ring-primary"
                  >
                    <option value="Single Variant">Single Variant</option>
                    <option value="Pack of 4">Pack of 4</option>
                    <option value="1 Litre">1 Litre</option>
                    <option value="5kg Pack">5kg Pack</option>
                    <option value="Custom Variant">Custom Variant</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Stock Quantity</label>
                  <input
                    type="number"
                    value={prodStock}
                    onChange={(e) => setProdStock(e.target.value)}
                    placeholder="e.g. 50"
                    className="w-full p-2.5 rounded-xl border border-border bg-background text-xs font-mono focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">Product Image URL (Optional)</label>
                <input
                  type="url"
                  value={prodImage}
                  onChange={(e) => setProdImage(e.target.value)}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full p-2.5 rounded-xl border border-border bg-background text-xs font-mono focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">Product Description</label>
                <textarea
                  rows={2}
                  value={prodDesc}
                  onChange={(e) => setProdDesc(e.target.value)}
                  placeholder="Freshness guarantees, origin, or dietary details..."
                  className="w-full p-2.5 rounded-xl border border-border bg-background text-xs focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-border">
                <button
                  type="button"
                  onClick={() => setIsAddProductOpen(false)}
                  className="px-4 py-2 border border-border rounded-xl hover:bg-muted text-muted-foreground text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingProd}
                  className="px-4 py-2 bg-primary hover:opacity-90 text-white rounded-xl text-xs font-semibold shadow-md transition-all flex items-center gap-1.5"
                >
                  {isSavingProd ? "Saving..." : "Save & Publish Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD LEAD MODAL FOR SALES CRM */}
      {isAddLeadOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl p-6 space-y-4 animate-scaleUp text-left">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold font-display text-foreground">Add New CRM Lead</h3>
                  <p className="text-[11px] text-muted-foreground">Provision a new prospect into the sales pipeline.</p>
                </div>
              </div>
              <button
                onClick={() => setIsAddLeadOpen(false)}
                className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted"
                aria-label="Close Modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateLead} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-foreground">Lead Account Name *</label>
                <input
                  type="text"
                  required
                  value={leadNameInput}
                  onChange={(e) => setLeadNameInput(e.target.value)}
                  placeholder="e.g. Apex Logistics Ltd."
                  className="w-full p-2.5 rounded-xl border border-border bg-background text-xs focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Deal Value ($) *</label>
                  <input
                    type="text"
                    required
                    value={leadValueInput}
                    onChange={(e) => setLeadValueInput(e.target.value)}
                    placeholder="e.g. $45,000"
                    className="w-full p-2.5 rounded-xl border border-border bg-background text-xs focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Pipeline Stage</label>
                  <select
                    value={leadStageInput}
                    onChange={(e) => setLeadStageInput(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-border bg-background text-xs focus:ring-1 focus:ring-primary"
                  >
                    <option value="incoming">Incoming Lead</option>
                    <option value="meeting">Meeting Scheduled</option>
                    <option value="proposal">Proposal Sent</option>
                    <option value="closed">Closed / Won</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">Win Probability (%)</label>
                <input
                  type="number"
                  value={leadProbInput}
                  onChange={(e) => setLeadProbInput(e.target.value)}
                  placeholder="e.g. 85"
                  className="w-full p-2.5 rounded-xl border border-border bg-background text-xs font-mono focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">Meeting Notes & Summary</label>
                <textarea
                  rows={2}
                  value={leadSummaryInput}
                  onChange={(e) => setLeadSummaryInput(e.target.value)}
                  placeholder="Key notes from initial conversation or receptionist AI intake..."
                  className="w-full p-2.5 rounded-xl border border-border bg-background text-xs focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-border">
                <button
                  type="button"
                  onClick={() => setIsAddLeadOpen(false)}
                  className="px-4 py-2 border rounded-xl text-muted-foreground text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary hover:opacity-90 text-white rounded-xl text-xs font-semibold shadow-md"
                >
                  Add Lead to CRM
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SCHEDULE SALESMAN TIME SLOT MODAL */}
      {isAddScheduleOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl p-6 space-y-4 animate-scaleUp text-left">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <CalendarDays className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold font-display text-foreground">Schedule Salesman Time Slot</h3>
                  <p className="text-[11px] text-muted-foreground">Book client appointment, field visit, or call for a sales rep.</p>
                </div>
              </div>
              <button
                onClick={() => setIsAddScheduleOpen(false)}
                className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted"
                aria-label="Close Modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateSchedule} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-foreground">Client / Lead Account Name *</label>
                <input
                  type="text"
                  required
                  value={schLeadName}
                  onChange={(e) => setSchLeadName(e.target.value)}
                  placeholder="e.g. Tesla India Retail"
                  className="w-full p-2.5 rounded-xl border border-border bg-background text-xs focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">Assigned Sales Representative *</label>
                <select
                  value={schSalesmanId}
                  onChange={(e) => setSchSalesmanId(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-border bg-background text-xs focus:ring-1 focus:ring-primary font-bold"
                >
                  {salesReps.map((rep) => (
                    <option key={rep.id} value={rep.id}>
                      {rep.name} ({rep.role} — Shift: {rep.shift})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Date</label>
                  <input
                    type="text"
                    value={schDate}
                    onChange={(e) => setSchDate(e.target.value)}
                    placeholder="Today"
                    className="w-full p-2.5 rounded-xl border border-border bg-background text-xs focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Start Time</label>
                  <input
                    type="text"
                    value={schStartTime}
                    onChange={(e) => setSchStartTime(e.target.value)}
                    placeholder="10:00 AM"
                    className="w-full p-2.5 rounded-xl border border-border bg-background text-xs font-mono focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-foreground">End Time</label>
                  <input
                    type="text"
                    value={schEndTime}
                    onChange={(e) => setSchEndTime(e.target.value)}
                    placeholder="11:30 AM"
                    className="w-full p-2.5 rounded-xl border border-border bg-background text-xs font-mono focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Appointment Type</label>
                  <select
                    value={schMeetingType}
                    onChange={(e) => setSchMeetingType(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-border bg-background text-xs focus:ring-1 focus:ring-primary font-medium"
                  >
                    <option value="GPS Field Visit">📍 GPS Field Visit</option>
                    <option value="Video Demo">💻 Video Demo</option>
                    <option value="Phone Call">📞 Phone Call</option>
                    <option value="Site Audit">🏗️ Site Audit</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Location / Link</label>
                  <input
                    type="text"
                    value={schLocation}
                    onChange={(e) => setSchLocation(e.target.value)}
                    placeholder="e.g. Google Meet or Client Office"
                    className="w-full p-2.5 rounded-xl border border-border bg-background text-xs focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">Agenda & Meeting Notes</label>
                <textarea
                  rows={2}
                  value={schNotes}
                  onChange={(e) => setSchNotes(e.target.value)}
                  placeholder="Details of demo, catalog presentation, or pricing discussion..."
                  className="w-full p-2.5 rounded-xl border border-border bg-background text-xs focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-border">
                <button
                  type="button"
                  onClick={() => setIsAddScheduleOpen(false)}
                  className="px-4 py-2 border rounded-xl text-muted-foreground text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary hover:opacity-90 text-white rounded-xl text-xs font-semibold shadow-md"
                >
                  Save Time Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD SALES REPRESENTATIVE MODAL */}
      {isAddSalesmanOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl p-6 space-y-4 animate-scaleUp text-left">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <UserPlus className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold font-display text-foreground">Add Sales Representative</h3>
                  <p className="text-[11px] text-muted-foreground">Register a new sales rep with duty shift and territory.</p>
                </div>
              </div>
              <button
                onClick={() => setIsAddSalesmanOpen(false)}
                className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted"
                aria-label="Close Modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateSalesman} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-foreground">Sales Rep Full Name *</label>
                <input
                  type="text"
                  required
                  value={repNameInput}
                  onChange={(e) => setRepNameInput(e.target.value)}
                  placeholder="e.g. Vikramaditya Singh"
                  className="w-full p-2.5 rounded-xl border border-border bg-background text-xs focus:ring-1 focus:ring-primary font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Role Title</label>
                  <input
                    type="text"
                    value={repRoleInput}
                    onChange={(e) => setRepRoleInput(e.target.value)}
                    placeholder="Field Sales Rep"
                    className="w-full p-2.5 rounded-xl border border-border bg-background text-xs focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Duty Shift Hours</label>
                  <input
                    type="text"
                    value={repShiftInput}
                    onChange={(e) => setRepShiftInput(e.target.value)}
                    placeholder="09:00 AM - 05:00 PM"
                    className="w-full p-2.5 rounded-xl border border-border bg-background text-xs font-mono focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Work Email</label>
                  <input
                    type="email"
                    value={repEmailInput}
                    onChange={(e) => setRepEmailInput(e.target.value)}
                    placeholder="vikram@nomo.com"
                    className="w-full p-2.5 rounded-xl border border-border bg-background text-xs font-mono focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Contact Phone</label>
                  <input
                    type="text"
                    value={repPhoneInput}
                    onChange={(e) => setRepPhoneInput(e.target.value)}
                    placeholder="+91 98765 00000"
                    className="w-full p-2.5 rounded-xl border border-border bg-background text-xs font-mono focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">Assigned Territory / Region</label>
                <input
                  type="text"
                  value={repTerritoryInput}
                  onChange={(e) => setRepTerritoryInput(e.target.value)}
                  placeholder="e.g. South India & UAE Region"
                  className="w-full p-2.5 rounded-xl border border-border bg-background text-xs focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-border">
                <button
                  type="button"
                  onClick={() => setIsAddSalesmanOpen(false)}
                  className="px-4 py-2 border rounded-xl text-muted-foreground text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary hover:opacity-90 text-white rounded-xl text-xs font-semibold shadow-md"
                >
                  Add Sales Representative
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* UPLOAD DOCUMENT MODAL FOR RAG KNOWLEDGE BASE */}
      {isUploadDocOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl p-6 space-y-4 animate-scaleUp text-left">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold font-display text-foreground">Upload RAG Source Document</h3>
                  <p className="text-[11px] text-muted-foreground">Index reference manuals, FAQs, or price lists for AI grounding.</p>
                </div>
              </div>
              <button
                onClick={() => setIsUploadDocOpen(false)}
                className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted"
                aria-label="Close Modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleUploadDocument} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-foreground">Document File Name *</label>
                <input
                  type="text"
                  required
                  value={docNameInput}
                  onChange={(e) => setDocNameInput(e.target.value)}
                  placeholder="e.g. enterprise_warranty_policy_2026.pdf"
                  className="w-full p-2.5 rounded-xl border border-border bg-background text-xs font-mono focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="p-4 border border-dashed border-primary/30 rounded-2xl bg-primary/5 text-center space-y-2">
                <FileText className="w-8 h-8 text-primary mx-auto opacity-70" />
                <p className="text-xs font-bold text-foreground">Drag & drop source document file here</p>
                <p className="text-[10px] text-muted-foreground">Supports PDF, DOCX, XLSX, TXT (Max 50MB per file)</p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
                <button
                  type="button"
                  onClick={() => setIsUploadDocOpen(false)}
                  className="px-4 py-2 border rounded-xl text-muted-foreground text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary hover:opacity-90 text-white rounded-xl text-xs font-semibold shadow-md"
                >
                  Start Vector Indexing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* OMNICHANNEL BROADCAST MODAL */}
      {isBroadcastOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl p-6 space-y-4 animate-scaleUp text-left">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <Send className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold font-display text-foreground">Send Omnichannel Broadcast</h3>
                  <p className="text-[11px] text-muted-foreground">Broadcast promotional update or notification via Meta API & SMS.</p>
                </div>
              </div>
              <button
                onClick={() => setIsBroadcastOpen(false)}
                className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted"
                aria-label="Close Modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSendBroadcast} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-foreground">Target Lead Segment</label>
                <select
                  value={broadcastTarget}
                  onChange={(e) => setBroadcastTarget(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-border bg-background text-xs focus:ring-1 focus:ring-primary"
                >
                  <option value="All Active Leads">All Active Leads ({leads.length} Contacts)</option>
                  <option value="Proposal Stage Only">Proposal Stage Leads Only</option>
                  <option value="Closed Deals">Closed / Won Clients</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">Broadcast Message Template *</label>
                <textarea
                  rows={4}
                  required
                  value={broadcastMessage}
                  onChange={(e) => setBroadcastMessage(e.target.value)}
                  placeholder="Hello {{name}}, check out our latest product updates and special pricing options for this quarter..."
                  className="w-full p-2.5 rounded-xl border border-border bg-background text-xs focus:ring-1 focus:ring-primary leading-relaxed"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
                <button
                  type="button"
                  onClick={() => setIsBroadcastOpen(false)}
                  className="px-4 py-2 border rounded-xl text-muted-foreground text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-xl text-xs font-semibold shadow-md flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Launch Broadcast</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SHOPPING CART & POS CHECKOUT MODAL */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg bg-card border border-border rounded-2xl shadow-2xl p-6 space-y-5 animate-scaleUp text-left">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                  <ShoppingCart className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold font-display text-foreground">Shopping Cart & POS Checkout</h3>
                  <p className="text-[11px] text-muted-foreground">{cartTotalCount} item(s) selected for order fulfillment.</p>
                </div>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted"
                aria-label="Close Cart"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {cartItems.length === 0 ? (
              <div className="text-center py-10 space-y-3">
                <ShoppingCart className="w-12 h-12 text-muted-foreground mx-auto opacity-30" />
                <p className="text-sm font-semibold text-foreground">Your shopping cart is currently empty.</p>
                <p className="text-xs text-muted-foreground">Add grocery products or rental equipment from the catalogue.</p>
              </div>
            ) : (
              <div className="space-y-4 text-xs">
                <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
                  {cartItems.map((item) => (
                    <div key={item.product.id} className="flex items-center justify-between p-3 border border-border rounded-xl bg-background/50">
                      <div className="flex items-center gap-3">
                        {item.product.image && (
                          <img src={item.product.image} alt={item.product.name} className="w-10 h-10 object-cover rounded-lg shrink-0" />
                        )}
                        <div>
                          <h4 className="font-bold text-foreground truncate max-w-[180px]">{item.product.name}</h4>
                          <span className="text-[10px] text-muted-foreground font-mono">SKU: {item.product.sku} | Unit: {item.product.price}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center border border-border rounded-lg overflow-hidden bg-card">
                          <button
                            onClick={() => handleUpdateCartQty(item.product.id, -1)}
                            className="px-2 py-1 hover:bg-muted font-bold text-muted-foreground hover:text-foreground"
                          >
                            -
                          </button>
                          <span className="px-2.5 py-1 font-mono font-bold text-xs">{item.quantity}</span>
                          <button
                            onClick={() => handleUpdateCartQty(item.product.id, 1)}
                            className="px-2 py-1 hover:bg-muted font-bold text-muted-foreground hover:text-foreground"
                          >
                            +
                          </button>
                        </div>
                        <span className="font-mono font-bold text-emerald-500 shrink-0">
                          ${(parseFloat(item.product.price.replace(/[^0-9.]/g, "")) * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
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
                  <button
                    onClick={() => setCartItems([])}
                    className="px-3 py-2 text-red-500 hover:bg-red-500/10 rounded-xl text-xs font-semibold"
                  >
                    Clear Cart
                  </button>
                  <button
                    onClick={() => {
                      alert(`Order Processed Successfully!\n\nPOS Invoice Generated for total amount of ${formatPrice(cartTotalAmount * 1.05)}. Receipt sent to POS printer!`);
                      setCartItems([]);
                      setIsCartOpen(false);
                    }}
                    className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-500/20 flex items-center gap-1.5"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Proceed to POS Checkout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

        </main>
      </div>
    </div>
  );
}
