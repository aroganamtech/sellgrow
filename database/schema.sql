-- =========================================================================
-- SellGrow MySQL Database Schema Blueprint
-- Host: 127.0.0.1 | Port: 3306 | Engine: InnoDB / MariaDB | Collation: utf8mb4_unicode_ci
-- phpMyAdmin Compatible Complete Export
-- =========================================================================

CREATE DATABASE IF NOT EXISTS `sellgrow` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `sellgrow`;

-- --------------------------------------------------------
-- 1. System Settings Table
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `system_settings` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `project` VARCHAR(255) NOT NULL DEFAULT 'sellgrow',
  `version` VARCHAR(50) DEFAULT '3.0.0',
  `description` TEXT,
  `status` VARCHAR(50) DEFAULT 'active',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 2. Users Table
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255),
  `first_name` VARCHAR(255),
  `email` VARCHAR(255) UNIQUE NOT NULL,
  `phone` VARCHAR(50),
  `password_hash` TEXT,
  `business_name` VARCHAR(255),
  `business_type` VARCHAR(255),
  `business_category` VARCHAR(255),
  `company_logo` TEXT,
  `is_email_verified` TINYINT(1) DEFAULT 1,
  `role` VARCHAR(50) DEFAULT 'admin',
  `status` VARCHAR(50) DEFAULT 'active',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `last_login` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 3. Registered Users Table
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `registered_users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255),
  `first_name` VARCHAR(255),
  `email` VARCHAR(255) UNIQUE NOT NULL,
  `phone` VARCHAR(50),
  `password_hash` TEXT,
  `business_name` VARCHAR(255),
  `business_type` VARCHAR(255),
  `business_category` VARCHAR(255),
  `company_logo` TEXT,
  `is_email_verified` TINYINT(1) DEFAULT 1,
  `role` VARCHAR(50) DEFAULT 'admin',
  `status` VARCHAR(50) DEFAULT 'active',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `last_login` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 4. Products Table (Includes Full Brochure Analysis Data)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `products` (
  `id` VARCHAR(255) PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `sku` VARCHAR(255),
  `price` VARCHAR(255) DEFAULT 'B2B Quote',
  `variants` VARCHAR(255) DEFAULT 'Single Variant',
  `category` VARCHAR(255),
  `brand` VARCHAR(255),
  `short_desc` TEXT,
  `full_desc` TEXT,
  `description` TEXT,
  `engine` VARCHAR(255),
  `displacement` VARCHAR(255),
  `power` VARCHAR(255),
  `weight` VARCHAR(255),
  `cutting_width` VARCHAR(255),
  `fuel_capacity` VARCHAR(255),
  `image_bg_color` VARCHAR(50) DEFAULT '#eefbf2',
  `image` TEXT,
  `gallery_images` JSON,
  `hologram_video` TEXT,
  `brochure` TEXT,
  `stock` INT DEFAULT 50,
  `highlights` JSON,
  `specs` JSON,
  `voice_greeting` JSON,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 5. Platform Services Table
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `services` (
  `id` VARCHAR(255) PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `description` TEXT,
  `status` VARCHAR(50) DEFAULT 'Active',
  `success_rate` FLOAT DEFAULT 99.0,
  `latency` INT DEFAULT 50,
  `requests_24h` INT DEFAULT 1000,
  `features` JSON,
  `price_monthly_inr` INT DEFAULT 0,
  `price_monthly_usd` INT DEFAULT 0,
  `price_yearly_inr` INT DEFAULT 0,
  `price_yearly_usd` INT DEFAULT 0,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 6. Employees Table
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `employees` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `work` VARCHAR(255),
  `status` VARCHAR(50) DEFAULT 'Active',
  `access` VARCHAR(100) DEFAULT 'View Only',
  `assigned_sub_admin` VARCHAR(255) DEFAULT 'Unassigned',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 7. Team & Sub-Admin Accounts Table
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `team` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `sg_id` VARCHAR(100) UNIQUE,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `role` VARCHAR(100),
  `status` VARCHAR(50) DEFAULT 'Active',
  `permissions` VARCHAR(100) DEFAULT 'Read Only',
  `password` VARCHAR(255),
  `auth_key` VARCHAR(100) DEFAULT 'Level-5 Master',
  `admin_level` VARCHAR(100) DEFAULT 'Platform Creator',
  `country` VARCHAR(100) DEFAULT '🇮🇳 India HQ',
  `assigned_services` JSON,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 8. Super Admin Profile Images Table
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `superadmin_images` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `type` VARCHAR(100) UNIQUE NOT NULL,
  `image_base64` LONGTEXT,
  `mime_type` VARCHAR(100) DEFAULT 'image/jpeg',
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 9. Subscriptions Table
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `subscriptions` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_email` VARCHAR(255),
  `plan` VARCHAR(100),
  `status` VARCHAR(50) DEFAULT 'active',
  `currency` VARCHAR(10) DEFAULT 'INR',
  `amount` INT DEFAULT 0,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 10. Database Meta & Seed State Tracking Table
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `_meta` (
  `meta_key` VARCHAR(255) PRIMARY KEY,
  `seeded` TINYINT(1) DEFAULT 1,
  `seeded_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =========================================================
-- INITIAL SEED DATA INSERTS
-- =========================================================

INSERT INTO `system_settings` (`project`, `version`, `description`, `status`)
VALUES ('sellgrow', '3.0.0', 'SellGrow Platform Core Database', 'active')
ON DUPLICATE KEY UPDATE `status`='active';

INSERT INTO `users` (`name`, `first_name`, `email`, `phone`, `business_name`, `business_type`, `business_category`, `role`, `status`)
VALUES ('Naveen S', 'Naveen S', 'admin@sellgrow.com', '', 'Aroganam Tech', 'FMCG Enterprise', 'FMCG Enterprise', 'admin', 'active')
ON DUPLICATE KEY UPDATE `name`=VALUES(`name`);

INSERT INTO `registered_users` (`name`, `first_name`, `email`, `phone`, `business_name`, `business_type`, `business_category`, `role`, `status`)
VALUES ('Naveen S', 'Naveen S', 'admin@sellgrow.com', '', 'Aroganam Tech', 'FMCG Enterprise', 'FMCG Enterprise', 'admin', 'active')
ON DUPLICATE KEY UPDATE `name`=VALUES(`name`);

INSERT INTO `_meta` (`meta_key`, `seeded`) VALUES
('products_seeded', 1),
('services_seeded', 1),
('employees_seeded', 1),
('team_seeded', 1)
ON DUPLICATE KEY UPDATE `seeded`=1;
