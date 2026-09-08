const mysql = require('mysql2/promise');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });

const PRODUCTS_DATA = [
  {
    id: "gm-bc-358-4sp",
    name: "GM BC 358 4SP (BRUSH CUTTER)",
    sku: "GM-BC-358-4SP",
    price: "B2B Quote",
    variants: "Single Variant",
    category: "BRUSH CUTTER",
    brand: "GEORGE MAIJO EQUIPMENT",
    shortDesc: "High efficiency 4-stroke side pack brush cutter for effortless agricultural weed control.",
    fullDesc: "The GM BC 358 4SP Brush Cutter is engineered with advanced 4-stroke technology, delivering superior fuel economy, reduced vibration, and high torque output for agricultural clearing and commercial lawn maintenance.",
    description: "High efficiency 4-stroke side pack brush cutter for effortless agricultural weed control.",
    engine: "GX35 / 4-Stroke OHC Engine",
    displacement: "35.8 cc",
    power: "1.5 HP @ 7000 RPM",
    weight: "7.8 kg",
    cuttingWidth: "415 mm",
    fuelCapacity: "0.63 Liters",
    imageBgColor: "#eefbf2",
    image: "/products/gm-bc-358-4sp.png",
    galleryImages: ["/products/gm-bc-358-4sp.png"],
    hologramVideo: "/videos/remove_all_the_background.mp4",
    brochure: "Brush_Cutter_4SP_PR_Brochure.pdf",
    stock: 50,
    highlights: ["4-Stroke Engine Efficiency", "Low Noise & Vibration", "Side Pack Ergonomic Harness", "High Output Cutting Blade"],
    specs: { EngineType: "4-Stroke, Air-Cooled", FuelType: "Petrol (Unleaded)", IgnitionSystem: "Transistorized Magneto", StartingSystem: "Recoil Starter" },
    voiceGreeting: { en: "GM BC 358 4SP is a high performance 4-stroke brush cutter.", ta: "GM BC 358 4SP ஒரு சிறந்த 4-ஸ்ட்ரோக் விவசாய சாதனம்." }
  },
  {
    id: "gm-wp-80",
    name: "GM WP 80 (WATER PUMP)",
    sku: "GM-WP-80",
    price: "B2B Quote",
    variants: "Single Variant",
    category: "WATER PUMP",
    brand: "GEORGE MAIJO EQUIPMENT",
    shortDesc: "Heavy-duty 3-inch agricultural water pump built for high-volume irrigation and field drainage.",
    fullDesc: "The GM WP 80 is designed for demanding agricultural irrigation tasks, offering massive water discharge capacity, robust alloy construction, and dependable engine performance.",
    description: "Heavy-duty 3-inch agricultural water pump built for high-volume irrigation and field drainage.",
    engine: "7.0 HP 4-Stroke Commercial Engine",
    displacement: "212 cc",
    power: "7.0 HP @ 3600 RPM",
    weight: "24.5 kg",
    cuttingWidth: "3-Inch (80mm) Port",
    fuelCapacity: "3.6 Liters",
    imageBgColor: "#ebf5ff",
    image: "/products/gm-wp-80.png",
    galleryImages: ["/products/gm-wp-80.png"],
    hologramVideo: "/videos/george-maijo-bc-358-4sp-3d.mp4",
    brochure: "Water_Pump_WP_80_Brochure.pdf",
    stock: 50,
    highlights: ["3-Inch High Discharge Port", "7.0 HP Heavy Engine", "Self-Priming Pump Housing", "Cast Iron Impeller"],
    specs: { PumpType: "Centrifugal Self-Priming", MaxHead: "30 Meters", MaxSuction: "8 Meters", DischargeCapacity: "1000 L/min" },
    voiceGreeting: { en: "GM WP 80 is a heavy duty 3-inch agricultural water pump.", ta: "GM WP 80 ஒரு சக்திவாய்ந்த விவசாய தண்ணீர் பம்ப்." }
  }
];

const DEFAULT_SERVICES = [
  { id: "srv_website", name: "Website", description: "Automated premium landing page generation and builder engine", status: "Active", priceMonthlyINR: 4999, priceMonthlyUSD: 69, priceYearlyINR: 49999, priceYearlyUSD: 699, features: ["Automated Premium Layouts", "High-Speed Page Builder"] },
  { id: "srv_brochure_logo", name: "Brochure & Logo", description: "Brochure creator, brand material generation, and vector logo builder", status: "Active", priceMonthlyINR: 999, priceMonthlyUSD: 14, priceYearlyINR: 9999, priceYearlyUSD: 139, features: ["High-Res Vector Formats", "Exportable PDF Catalogs"] },
  { id: "srv_social_media", name: "Social Media Creation", description: "Social platforms auto-posting gateway and feed synchronization engine", status: "Active", priceMonthlyINR: 1199, priceMonthlyUSD: 16, priceYearlyINR: 11999, priceYearlyUSD: 159, features: ["Scheduled Auto-Posting Engine", "Cross-Platform Feed Sync"] },
  { id: "srv_seo_ads", name: "SEO/AEO/GEO, Google Ads", description: "Search engine metrics tracking, ad campaign monitoring, and AI optimization", status: "Active", priceMonthlyINR: 1999, priceMonthlyUSD: 29, priceYearlyINR: 19999, priceYearlyUSD: 299, features: ["SEO & GEO Performance Metrics", "Google Ads Campaign Manager"] },
  { id: "srv_whatsapp_api", name: "WhatsApp API", description: "Official Meta WhatsApp Business API gateway and broadcast engine", status: "Active", priceMonthlyINR: 1399, priceMonthlyUSD: 25, priceYearlyINR: 13999, priceYearlyUSD: 259, features: ["Official Meta API Broadcasts", "Unified Shared Agent Inbox"] },
  { id: "srv_mobile_view", name: "Mobile View", description: "Mobile application interface logs and native session tracker", status: "Active", priceMonthlyINR: 1499, priceMonthlyUSD: 19, priceYearlyINR: 14999, priceYearlyUSD: 199, features: ["Mobile App Interface Logs", "Native Session Tracker"] },
  { id: "srv_website_view", name: "Website View", description: "Live tracking of client web traffic and active sessions dashboard", status: "Active", priceMonthlyINR: 999, priceMonthlyUSD: 15, priceYearlyINR: 9999, priceYearlyUSD: 149, features: ["Live Client Traffic Tracking", "Active Sessions Dashboard"] },
  { id: "srv_3d_view", name: "3D View", description: "Immersive 3D model visualization and rendering engine component", status: "Active", priceMonthlyINR: 3999, priceMonthlyUSD: 59, priceYearlyINR: 39999, priceYearlyUSD: 599, features: ["Immersive 3D Model Rendering", "Interactive WebGL Component"] },
  { id: "srv_ai_agent", name: "AI Agent", description: "Generative AI customer service assistant bot for apps and websites", status: "Active", priceMonthlyINR: 2999, priceMonthlyUSD: 39, priceYearlyINR: 29999, priceYearlyUSD: 399, features: ["Generative AI Customer Agent", "Smart Context Responses"] },
  { id: "srv_sells_crm", name: "Sells CRM", description: "Sales pipeline tracking, lead conversion analytics, and CRM dashboard", status: "Active", priceMonthlyINR: 2499, priceMonthlyUSD: 35, priceYearlyINR: 24999, priceYearlyUSD: 349, features: ["Lead Conversion Pipeline", "Real-time Analytics Tracker"] }
];

const DEFAULT_EMPLOYEES = [
  { name: "Naveen S", email: "717824i605@kce.in.ac", work: "Voice AI Integration", status: "Active", access: "Full Access", assignedSubAdmin: "Operator Main" },
  { name: "Karthik R", email: "karthik@sellgrow.io", work: "CRM Automation", status: "Active", access: "Read & Write", assignedSubAdmin: "AI Dev Team" },
  { name: "Priya K", email: "priya@sellgrow.io", work: "Landing Page Editor", status: "Active", access: "View Only", assignedSubAdmin: "Support Agent" },
  { name: "Amit Shah", email: "amit@sellgrow.io", work: "Customer Support", status: "Suspended", access: "View Only", assignedSubAdmin: "Unassigned" }
];

const DEFAULT_TEAM = [
  { sgId: "SG-SA-100", name: "Naveen S", email: "naveen@sellgrow.io", role: "SuperAdmin", status: "Active", permissions: "Full Access", password: "sellgrow123", assignedServices: ["srv_website", "srv_brochure_logo", "srv_social_media", "srv_seo_ads", "srv_whatsapp_api"] },
  { sgId: "SG-A-101", name: "Operator Main", email: "operator@sellgrow.io", role: "Operator", status: "Active", permissions: "Read/Write", password: "operator123", assignedServices: ["srv_website", "srv_brochure_logo"] },
  { sgId: "SG-A-102", name: "AI Dev Team", email: "developer@sellgrow.io", role: "Developer", status: "Active", permissions: "Read/Write", password: "developer123", assignedServices: ["srv_seo_ads", "srv_whatsapp_api"] },
  { sgId: "SG-A-103", name: "Manager Ops", email: "manager@sellgrow.io", role: "Manager", status: "Active", permissions: "Full Access", password: "manager123", assignedServices: ["srv_mobile_view", "srv_website_view"] },
  { sgId: "SG-A-104", name: "Support Agent", email: "support@sellgrow.io", role: "Support", status: "Active", permissions: "Read Only", password: "support123", assignedServices: ["srv_website"] },
  { sgId: "SG-A-105", name: "Admin Lead", email: "admin@sellgrow.io", role: "Admin", status: "Active", permissions: "Full Access", password: "admin123", assignedServices: ["srv_website", "srv_brochure_logo", "srv_social_media"] }
];

async function initializeDatabase() {
  const host = process.env.MYSQL_HOST || '127.0.0.1';
  const port = parseInt(process.env.MYSQL_PORT || '3306', 10);
  const user = process.env.MYSQL_USER || 'root';
  const password = process.env.MYSQL_PASSWORD || '';
  const dbName = process.env.MYSQL_DATABASE || 'sellgrow';

  console.log(`\n=============================================================`);
  console.log(`SellGrow Database Setup & Initialization Engine`);
  console.log(`Connecting to local MySQL server at ${host}:${port} as user '${user}'...`);

  let connection;
  try {
    connection = await mysql.createConnection({ host, port, user, password });
    console.log('✔ Connected to MySQL server successfully.');

    // 1. Create database
    console.log(`\n1. Creating database '${dbName}' if not exists...`);
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
    await connection.query(`USE \`${dbName}\`;`);
    console.log(`✔ Database '${dbName}' active.`);

    // 2. Create tables
    console.log('\n2. Creating database tables...');

    await connection.query(`
      CREATE TABLE IF NOT EXISTS system_settings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        project VARCHAR(255) NOT NULL DEFAULT 'sellgrow',
        version VARCHAR(50) DEFAULT '3.0.0',
        description TEXT,
        status VARCHAR(50) DEFAULT 'active',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        first_name VARCHAR(255),
        email VARCHAR(255) UNIQUE NOT NULL,
        phone VARCHAR(50),
        password_hash TEXT,
        business_name VARCHAR(255),
        business_type VARCHAR(255),
        business_category VARCHAR(255),
        company_logo TEXT,
        is_email_verified TINYINT(1) DEFAULT 1,
        role VARCHAR(50) DEFAULT 'admin',
        status VARCHAR(50) DEFAULT 'active',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        last_login DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS registered_users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        first_name VARCHAR(255),
        email VARCHAR(255) UNIQUE NOT NULL,
        phone VARCHAR(50),
        password_hash TEXT,
        business_name VARCHAR(255),
        business_type VARCHAR(255),
        business_category VARCHAR(255),
        company_logo TEXT,
        is_email_verified TINYINT(1) DEFAULT 1,
        role VARCHAR(50) DEFAULT 'admin',
        status VARCHAR(50) DEFAULT 'active',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        last_login DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS products (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        sku VARCHAR(255),
        price VARCHAR(255) DEFAULT 'B2B Quote',
        variants VARCHAR(255) DEFAULT 'Single Variant',
        category VARCHAR(255),
        brand VARCHAR(255),
        short_desc TEXT,
        full_desc TEXT,
        description TEXT,
        engine VARCHAR(255),
        displacement VARCHAR(255),
        power VARCHAR(255),
        weight VARCHAR(255),
        cutting_width VARCHAR(255),
        fuel_capacity VARCHAR(255),
        image_bg_color VARCHAR(50) DEFAULT '#eefbf2',
        image TEXT,
        gallery_images JSON,
        hologram_video TEXT,
        brochure TEXT,
        stock INT DEFAULT 50,
        highlights JSON,
        specs JSON,
        voice_greeting JSON,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Ensure all columns exist on products table if table was created previously
    const alterQueries = [
      "ALTER TABLE products ADD COLUMN IF NOT EXISTS sku VARCHAR(255)",
      "ALTER TABLE products ADD COLUMN IF NOT EXISTS price VARCHAR(255)",
      "ALTER TABLE products ADD COLUMN IF NOT EXISTS variants VARCHAR(255)",
      "ALTER TABLE products ADD COLUMN IF NOT EXISTS description TEXT",
      "ALTER TABLE products ADD COLUMN IF NOT EXISTS gallery_images JSON",
      "ALTER TABLE products ADD COLUMN IF NOT EXISTS brochure TEXT",
      "ALTER TABLE products ADD COLUMN IF NOT EXISTS stock INT DEFAULT 50"
    ];

    for (const q of alterQueries) {
      try {
        await connection.query(q);
      } catch (e) { }
    }

    await connection.query(`
      CREATE TABLE IF NOT EXISTS services (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        status VARCHAR(50) DEFAULT 'Active',
        success_rate FLOAT DEFAULT 99.0,
        latency INT DEFAULT 50,
        requests_24h INT DEFAULT 1000,
        features JSON,
        price_monthly_inr INT DEFAULT 0,
        price_monthly_usd INT DEFAULT 0,
        price_yearly_inr INT DEFAULT 0,
        price_yearly_usd INT DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS employees (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        work VARCHAR(255),
        status VARCHAR(50) DEFAULT 'Active',
        access VARCHAR(100) DEFAULT 'View Only',
        assigned_sub_admin VARCHAR(255) DEFAULT 'Unassigned',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS team (
        id INT AUTO_INCREMENT PRIMARY KEY,
        sg_id VARCHAR(100) UNIQUE,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        role VARCHAR(100),
        status VARCHAR(50) DEFAULT 'Active',
        permissions VARCHAR(100) DEFAULT 'Read Only',
        password VARCHAR(255),
        auth_key VARCHAR(100) DEFAULT 'Level-5 Master',
        admin_level VARCHAR(100) DEFAULT 'Platform Creator',
        country VARCHAR(100) DEFAULT '🇮🇳 India HQ',
        assigned_services JSON,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS superadmin_images (
        id INT AUTO_INCREMENT PRIMARY KEY,
        type VARCHAR(100) UNIQUE NOT NULL,
        image_base64 LONGTEXT,
        mime_type VARCHAR(100) DEFAULT 'image/jpeg',
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS subscriptions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_email VARCHAR(255),
        plan VARCHAR(100),
        status VARCHAR(50) DEFAULT 'active',
        currency VARCHAR(10) DEFAULT 'INR',
        amount INT DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS _meta (
        meta_key VARCHAR(255) PRIMARY KEY,
        seeded TINYINT(1) DEFAULT 1,
        seeded_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✔ All 10 database tables created / verified.');

    // 3. Seed initial data
    console.log('\n3. Seeding default records & system settings...');

    // System Settings
    await connection.query(`
      INSERT INTO system_settings (project, version, description, status)
      VALUES ('sellgrow', '3.0.0', 'SellGrow Platform Core Database', 'active');
    `);

    // Admin User
    await connection.query(`
      INSERT INTO users (name, first_name, email, phone, business_name, business_type, business_category, role, status)
      VALUES ('Naveen S', 'Naveen S', 'admin@sellgrow.com', '', 'Aroganam Tech', 'FMCG Enterprise', 'FMCG Enterprise', 'admin', 'active')
      ON DUPLICATE KEY UPDATE name=VALUES(name);
    `);

    // Registered User default
    await connection.query(`
      INSERT INTO registered_users (name, first_name, email, phone, business_name, business_type, business_category, role, status)
      VALUES ('Naveen S', 'Naveen S', 'admin@sellgrow.com', '', 'Aroganam Tech', 'FMCG Enterprise', 'FMCG Enterprise', 'admin', 'active')
      ON DUPLICATE KEY UPDATE name=VALUES(name);
    `);

    // Products
    for (const p of PRODUCTS_DATA) {
      await connection.query(`
        INSERT INTO products (id, name, sku, price, variants, category, brand, short_desc, full_desc, description, engine, displacement, power, weight, cutting_width, fuel_capacity, image_bg_color, image, gallery_images, hologram_video, brochure, stock, highlights, specs, voice_greeting)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE name=VALUES(name);
      `, [
        p.id, p.name, p.sku, p.price, p.variants, p.category, p.brand, p.shortDesc, p.fullDesc, p.description, p.engine, p.displacement, p.power, p.weight, p.cuttingWidth, p.fuelCapacity, p.imageBgColor, p.image, JSON.stringify(p.galleryImages || []), p.hologramVideo || null, p.brochure || null, p.stock || 50,
        JSON.stringify(p.highlights || []), JSON.stringify(p.specs || {}), JSON.stringify(p.voiceGreeting || {})
      ]);
    }

    // Services
    for (const s of DEFAULT_SERVICES) {
      await connection.query(`
        INSERT INTO services (id, name, description, status, price_monthly_inr, price_monthly_usd, price_yearly_inr, price_yearly_usd, features)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE name=VALUES(name);
      `, [
        s.id, s.name, s.description, s.status, s.priceMonthlyINR, s.priceMonthlyUSD, s.priceYearlyINR, s.priceYearlyUSD, JSON.stringify(s.features || [])
      ]);
    }

    // Employees
    const [empCount] = await connection.query(`SELECT COUNT(*) as cnt FROM employees;`);
    if (empCount[0].cnt === 0) {
      for (const e of DEFAULT_EMPLOYEES) {
        await connection.query(`
          INSERT INTO employees (name, email, work, status, access, assigned_sub_admin)
          VALUES (?, ?, ?, ?, ?, ?);
        `, [e.name, e.email, e.work, e.status, e.access, e.assignedSubAdmin]);
      }
    }

    // Team
    for (const t of DEFAULT_TEAM) {
      await connection.query(`
        INSERT INTO team (sg_id, name, email, role, status, permissions, password, assigned_services)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE name=VALUES(name);
      `, [
        t.sgId, t.name, t.email, t.role, t.status, t.permissions, t.password, JSON.stringify(t.assignedServices || [])
      ]);
    }

    // Seed Meta
    await connection.query(`INSERT INTO _meta (meta_key, seeded) VALUES ('products_seeded', 1) ON DUPLICATE KEY UPDATE seeded=1;`);
    await connection.query(`INSERT INTO _meta (meta_key, seeded) VALUES ('services_seeded', 1) ON DUPLICATE KEY UPDATE seeded=1;`);
    await connection.query(`INSERT INTO _meta (meta_key, seeded) VALUES ('employees_seeded', 1) ON DUPLICATE KEY UPDATE seeded=1;`);
    await connection.query(`INSERT INTO _meta (meta_key, seeded) VALUES ('team_seeded', 1) ON DUPLICATE KEY UPDATE seeded=1;`);

    console.log('✔ Initial seed data successfully inserted.');

    console.log('\n=============================================================');
    console.log(`SUCCESS! Database '${dbName}' and all tables initialized in MySQL!`);
    console.log('Location: database/ folder');
    console.log('=============================================================\n');

  } catch (err) {
    console.error('❌ MySQL Initialization Error:', err);
    process.exit(1);
  } finally {
    if (connection) await connection.end();
  }
}

initializeDatabase();
