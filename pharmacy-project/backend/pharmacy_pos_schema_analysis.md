# Pharmacy POS Schema Analysis & Adaptation
## Based on demasylabs Point-Of-Sale System

### Overview
This document analyzes the demasylabs Point-Of-Sale system and adapts it for pharmacy-specific needs, including Thai market requirements.

---

## 1. Demasylabs POS Core Schema Analysis

### Standard POS Tables (Based on demasylabs structure):

#### 1.1 User Management
```sql
-- Staff/Employee Management
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    phone VARCHAR(20),
    role ENUM('admin', 'manager', 'staff') DEFAULT 'staff',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- User Roles and Permissions
CREATE TABLE user_roles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    role_name VARCHAR(50) UNIQUE NOT NULL,
    permissions JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 1.2 Product/Inventory Management
```sql
-- Product Categories
CREATE TABLE categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    parent_id INT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_id) REFERENCES categories(id)
);

-- Products/Items
CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL,
    generic_name VARCHAR(200), -- For pharmacy: generic drug names
    description TEXT,
    category_id INT,
    sku VARCHAR(100) UNIQUE,
    barcode VARCHAR(100),
    price DECIMAL(10,2) NOT NULL,
    cost_price DECIMAL(10,2),
    tax_rate DECIMAL(5,2) DEFAULT 0.00,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Inventory/Stock Management
CREATE TABLE inventory (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT NOT NULL,
    quantity INT DEFAULT 0,
    reorder_level INT DEFAULT 10,
    max_stock INT,
    location VARCHAR(100) DEFAULT 'Main Store',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id)
);
```

#### 1.3 Customer Management
```sql
-- Customer/Patient Information
CREATE TABLE customers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    phone VARCHAR(20),
    address TEXT,
    date_of_birth DATE,
    gender ENUM('male', 'female', 'other'),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

#### 1.4 Sales & Transactions
```sql
-- Sales/Orders
CREATE TABLE sales (
    id INT PRIMARY KEY AUTO_INCREMENT,
    invoice_number VARCHAR(50) UNIQUE NOT NULL,
    customer_id INT NULL,
    user_id INT NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    tax_amount DECIMAL(10,2) DEFAULT 0.00,
    discount_amount DECIMAL(10,2) DEFAULT 0.00,
    total_amount DECIMAL(10,2) NOT NULL,
    payment_method ENUM('cash', 'card', 'promptpay', 'bank_transfer') NOT NULL,
    payment_status ENUM('pending', 'paid', 'refunded') DEFAULT 'pending',
    sale_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    notes TEXT,
    FOREIGN KEY (customer_id) REFERENCES customers(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Sale Items
CREATE TABLE sale_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    sale_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    discount_amount DECIMAL(10,2) DEFAULT 0.00,
    FOREIGN KEY (sale_id) REFERENCES sales(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);
```

#### 1.5 Supplier Management
```sql
-- Suppliers/Vendors
CREATE TABLE suppliers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL,
    contact_person VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(20),
    address TEXT,
    tax_id VARCHAR(50),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Purchase Orders
CREATE TABLE purchase_orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    supplier_id INT NOT NULL,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    order_date DATE NOT NULL,
    expected_delivery DATE,
    total_amount DECIMAL(10,2),
    status ENUM('draft', 'ordered', 'received', 'cancelled') DEFAULT 'draft',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (supplier_id) REFERENCES suppliers(id)
);
```

---

## 2. Pharmacy-Specific Adaptations

### 2.1 Enhanced Product Management for Drugs
```sql
-- Drug Information (extends products table)
CREATE TABLE drug_details (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT NOT NULL,
    active_ingredient VARCHAR(200),
    strength VARCHAR(50), -- e.g., "500mg", "10mg/ml"
    dosage_form ENUM('tablet', 'capsule', 'liquid', 'injection', 'cream', 'other'),
    manufacturer VARCHAR(200),
    fda_approval_number VARCHAR(100),
    requires_prescription BOOLEAN DEFAULT FALSE,
    controlled_substance BOOLEAN DEFAULT FALSE,
    storage_conditions TEXT, -- e.g., "Store in refrigerator"
    side_effects TEXT,
    contraindications TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Drug Categories (pharmacy-specific)
CREATE TABLE drug_categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL, -- e.g., "Antibiotics", "Pain Relief", "Vitamins"
    description TEXT,
    requires_prescription BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 2.2 Patient Management (extends customers)
```sql
-- Patient Medical Information
CREATE TABLE patient_medical_info (
    id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT NOT NULL,
    blood_type ENUM('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'),
    allergies TEXT,
    chronic_conditions TEXT,
    current_medications TEXT,
    emergency_contact VARCHAR(100),
    emergency_phone VARCHAR(20),
    insurance_provider VARCHAR(100),
    insurance_number VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id)
);
```

### 2.3 Prescription Management
```sql
-- Prescriptions
CREATE TABLE prescriptions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    prescription_number VARCHAR(50) UNIQUE NOT NULL,
    patient_id INT NOT NULL,
    doctor_name VARCHAR(200) NOT NULL,
    doctor_license VARCHAR(100),
    doctor_phone VARCHAR(20),
    clinic_name VARCHAR(200),
    prescription_date DATE NOT NULL,
    expiry_date DATE, -- When prescription expires
    status ENUM('active', 'filled', 'expired', 'cancelled') DEFAULT 'active',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES customers(id)
);

-- Prescription Items
CREATE TABLE prescription_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    prescription_id INT NOT NULL,
    product_id INT NOT NULL,
    dosage VARCHAR(100) NOT NULL, -- e.g., "500mg twice daily"
    frequency VARCHAR(100), -- e.g., "Every 8 hours"
    duration VARCHAR(100), -- e.g., "7 days"
    quantity_prescribed INT NOT NULL,
    quantity_dispensed INT DEFAULT 0,
    instructions TEXT,
    refills_allowed INT DEFAULT 0,
    refills_used INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (prescription_id) REFERENCES prescriptions(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);
```

### 2.4 Enhanced Inventory for Pharmacy
```sql
-- Drug Expiry Tracking
CREATE TABLE drug_expiry_tracking (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT NOT NULL,
    batch_number VARCHAR(100) NOT NULL,
    expiry_date DATE NOT NULL,
    quantity INT NOT NULL,
    location VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Drug Interactions
CREATE TABLE drug_interactions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    drug1_id INT NOT NULL,
    drug2_id INT NOT NULL,
    interaction_type ENUM('contraindicated', 'caution', 'monitor', 'safe'),
    severity ENUM('low', 'medium', 'high', 'critical'),
    description TEXT,
    recommendations TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (drug1_id) REFERENCES products(id),
    FOREIGN KEY (drug2_id) REFERENCES products(id)
);
```

### 2.5 Thai Market Specific Features
```sql
-- Thai Language Support
CREATE TABLE product_translations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT NOT NULL,
    language ENUM('th', 'en') DEFAULT 'th',
    name VARCHAR(200),
    description TEXT,
    instructions TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Thai Tax Configuration
CREATE TABLE tax_configuration (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tax_name VARCHAR(100) NOT NULL, -- e.g., "VAT", "Local Tax"
    tax_rate DECIMAL(5,2) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    applies_to ENUM('all', 'prescription', 'otc', 'medical_devices'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- PromptPay Integration
CREATE TABLE payment_methods (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL, -- e.g., "Cash", "Credit Card", "PromptPay"
    is_active BOOLEAN DEFAULT TRUE,
    requires_verification BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 3. Database Relationships & Indexes

### 3.1 Key Relationships
```sql
-- Add indexes for performance
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_barcode ON products(barcode);
CREATE INDEX idx_sales_customer ON sales(customer_id);
CREATE INDEX idx_sales_user ON sales(user_id);
CREATE INDEX idx_sales_date ON sales(sale_date);
CREATE INDEX idx_inventory_product ON inventory(product_id);
CREATE INDEX idx_prescriptions_patient ON prescriptions(patient_id);
CREATE INDEX idx_prescriptions_status ON prescriptions(status);
CREATE INDEX idx_drug_expiry_product ON drug_expiry_tracking(product_id);
CREATE INDEX idx_drug_expiry_date ON drug_expiry_tracking(expiry_date);
```

### 3.2 Foreign Key Constraints
```sql
-- Ensure data integrity
ALTER TABLE products ADD CONSTRAINT fk_products_category 
    FOREIGN KEY (category_id) REFERENCES categories(id);

ALTER TABLE sales ADD CONSTRAINT fk_sales_customer 
    FOREIGN KEY (customer_id) REFERENCES customers(id);

ALTER TABLE sales ADD CONSTRAINT fk_sales_user 
    FOREIGN KEY (user_id) REFERENCES users(id);

ALTER TABLE prescription_items ADD CONSTRAINT fk_prescription_items_prescription 
    FOREIGN KEY (prescription_id) REFERENCES prescriptions(id);
```

---

## 4. Implementation Strategy

### 4.1 Phase 1: Core POS (Weeks 1-4)
- User authentication and management
- Basic product/inventory management
- Simple sales transactions
- Basic reporting

### 4.2 Phase 2: Pharmacy Features (Weeks 5-8)
- Patient management
- Prescription system
- Drug expiry tracking
- Basic drug interactions

### 4.3 Phase 3: Advanced Features (Weeks 9-12)
- Drug interaction checking
- Advanced reporting
- Multi-location support
- Thai language support

### 4.4 Phase 4: Compliance & Integration (Weeks 13-16)
- Thai FDA compliance
- Insurance integration
- Advanced analytics
- API for external systems

---

## 5. Technology Stack Recommendation

### 5.1 Backend (Node.js)
- **Framework**: Express.js or Fastify
- **Database**: PostgreSQL (recommended) or MySQL
- **ORM**: Prisma or TypeORM
- **Authentication**: JWT with bcrypt
- **API**: RESTful with OpenAPI documentation

### 5.2 Frontend (Mobile App)
- **Framework**: React Native or Flutter
- **State Management**: Redux Toolkit or Zustand
- **UI Components**: Native Base or Material UI
- **Offline Storage**: SQLite with sync capabilities

### 5.3 Cloud & Infrastructure
- **Hosting**: AWS, Google Cloud, or Azure
- **Database**: Managed PostgreSQL service
- **File Storage**: S3 or similar for documents
- **CDN**: CloudFront or similar for static assets

---

## 6. Next Steps

### 6.1 Immediate Actions
1. **Set up development environment**
2. **Create database with core tables**
3. **Build basic API endpoints**
4. **Create simple mobile app interface**

### 6.2 Week 1 Goals
- Database setup and basic schema
- User authentication API
- Basic product management
- Simple sales interface

### 6.3 Success Metrics
- Database schema implemented
- Basic API working
- Simple mobile interface
- User can log in and view products

---

This schema provides a solid foundation based on proven POS systems while adding pharmacy-specific features for the Thai market. The modular approach allows you to build incrementally and add features as needed.
