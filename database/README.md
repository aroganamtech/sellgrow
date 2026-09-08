# SellGrow MySQL Database Hub (`/database`)

Welcome to the official **SellGrow Database Engine Directory**. All database configuration, SQL schemas, automated initialization scripts, connection pools, and diagnostic utilities are centralized in this dedicated `database/` folder.

---

## 📁 Directory Structure & File Map

| File / Module | Description & Usage |
| :--- | :--- |
| **`database/README.md`** | Complete documentation, schema guide, and database administration reference. |
| **`database/schema.sql`** | Raw SQL blueprint containing `CREATE DATABASE`, `CREATE TABLE` for all 10 tables, and default seed data. Importable via phpMyAdmin or MySQL CLI. |
| **`database/init_db.js`** | Automated Node.js initialization script. Creates database, applies table structures, updates schema columns, and seeds default records. |
| **`database/mysql_client.js`** | Production MySQL connection pool module powered by `mysql2/promise`. Manages pooled connections and query execution. |
| **`database/test_connection.js`** | Diagnostic script to test connection health, verify port availability, and report active tables. |

---

## ⚡ Quick Commands

Run these terminal commands from the project root (`c:\Users\Naveen S\OneDrive\Desktop\SellGrow_Main\SellGrow_Web\sellgrow`):

### 1. Initialize / Reset Database & Tables
```bash
npm run db:init
```
*Creates database `sellgrow`, generates all 10 tables, applies column migrations, and inserts initial seed data into MySQL.*

### 2. Test Connection & Health Check
```bash
npm run db:test
```
*Tests TCP connection to MySQL server at `127.0.0.1:3306` and lists all active tables.*

---

## 🗄️ Database Connection Details (phpMyAdmin / XAMPP)

- **Database Server**: Local MySQL / MariaDB (`127.0.0.1` / `localhost`)
- **Port**: `3306`
- **Default User**: `root`
- **Password**: *(empty by default)*
- **Database Name**: `sellgrow`
- **phpMyAdmin Interface**: `http://127.0.0.1/phpmyadmin/` or `http://localhost/phpmyadmin/`

---

## 📊 Database Tables Overview (10 Core Tables)

### 1. `products`
Stores product catalog records, brochure PDF references, and brochure AI analysis fields.
- `id` (VARCHAR 255 PRIMARY KEY)
- `name` (VARCHAR 255)
- `sku` (VARCHAR 255)
- `price` (VARCHAR 255)
- `variants` (VARCHAR 255)
- `category` (VARCHAR 255)
- `brand` (VARCHAR 255)
- `short_desc` (TEXT)
- `full_desc` (TEXT)
- `description` (TEXT)
- `engine` (VARCHAR 255)
- `displacement` (VARCHAR 255)
- `power` (VARCHAR 255)
- `weight` (VARCHAR 255)
- `cutting_width` (VARCHAR 255)
- `fuel_capacity` (VARCHAR 255)
- `image` (TEXT)
- `gallery_images` (JSON)
- `hologram_video` (TEXT)
- `brochure` (TEXT)
- `stock` (INT)
- `highlights` (JSON)
- `specs` (JSON)
- `voice_greeting` (JSON)

### 2. `users`
Stores registered customer, admin, and merchant account credentials.

### 3. `registered_users`
Duplicate/sync registered user accounts for authentication logging.

### 4. `services`
Platform microservices, pricing models, and backend trigger metrics.

### 5. `employees`
Employee records, assigned work modules, and sub-admin bindings.

### 6. `team`
Super Admin and Sub-Admin accounts, permissions, and assigned microservices.

### 7. `superadmin_images`
Super Admin avatar profile image stored in base64 format.

### 8. `subscriptions`
Customer subscription plans, currency (INR/USD), and payment amounts.

### 9. `system_settings`
Core platform metadata, database versioning, and system flags.

### 10. `_meta`
Tracking flags for database seeding operations.

---

## 🛠️ Manual Import via phpMyAdmin

If you prefer to import the database manually via the phpMyAdmin Web GUI:

1. Open phpMyAdmin at `http://127.0.0.1/phpmyadmin/`.
2. Click **Import** in the top navigation tab.
3. Click **Browse** and select `database/schema.sql` from your project folder.
4. Click **Go** at the bottom to execute the schema script.

---

## ⚙️ Environment Configuration

Database connection settings are stored in `.env.local`:

```env
MYSQL_HOST="127.0.0.1"
MYSQL_PORT="3306"
MYSQL_USER="root"
MYSQL_PASSWORD=""
MYSQL_DATABASE="sellgrow"
```
