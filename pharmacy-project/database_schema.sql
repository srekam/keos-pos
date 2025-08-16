-- Pharmacy POS Database Schema
-- Based on demasylabs Point-Of-Sale System
-- Adapted for Thai pharmacy market

-- 1. CORE POS TABLES
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    phone VARCHAR(20),
    role ENUM('admin', 'pharmacist', 'assistant') DEFAULT 'assistant',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL,
    generic_name VARCHAR(200),
    category_id INT,
    sku VARCHAR(100) UNIQUE,
    barcode VARCHAR(100),
    price DECIMAL(10,2) NOT NULL,
    cost_price DECIMAL(10,2),
    tax_rate DECIMAL(5,2) DEFAULT 7.00, -- Thai VAT
    is_active BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE inventory (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT NOT NULL,
    quantity INT DEFAULT 0,
    reorder_level INT DEFAULT 10,
    location VARCHAR(100) DEFAULT 'Main Store',
    FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE customers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    date_of_birth DATE,
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE sales (
    id INT PRIMARY KEY AUTO_INCREMENT,
    invoice_number VARCHAR(50) UNIQUE NOT NULL,
    customer_id INT NULL,
    user_id INT NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    tax_amount DECIMAL(10,2) DEFAULT 0.00,
    total_amount DECIMAL(10,2) NOT NULL,
    payment_method ENUM('cash', 'card', 'promptpay') NOT NULL,
    payment_status ENUM('pending', 'paid', 'refunded') DEFAULT 'pending',
    sale_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE sale_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    sale_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (sale_id) REFERENCES sales(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- 2. PHARMACY-SPECIFIC TABLES
CREATE TABLE drug_details (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT NOT NULL,
    active_ingredient VARCHAR(200),
    strength VARCHAR(50),
    dosage_form ENUM('tablet', 'capsule', 'liquid', 'injection', 'cream'),
    manufacturer VARCHAR(200),
    requires_prescription BOOLEAN DEFAULT FALSE,
    controlled_substance BOOLEAN DEFAULT FALSE,
    storage_conditions TEXT,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE prescriptions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    prescription_number VARCHAR(50) UNIQUE NOT NULL,
    patient_id INT NOT NULL,
    doctor_name VARCHAR(200) NOT NULL,
    prescription_date DATE NOT NULL,
    expiry_date DATE,
    status ENUM('active', 'filled', 'expired') DEFAULT 'active',
    FOREIGN KEY (patient_id) REFERENCES customers(id)
);

CREATE TABLE prescription_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    prescription_id INT NOT NULL,
    product_id INT NOT NULL,
    dosage VARCHAR(100) NOT NULL,
    frequency VARCHAR(100),
    duration VARCHAR(100),
    quantity_prescribed INT NOT NULL,
    quantity_dispensed INT DEFAULT 0,
    instructions TEXT,
    FOREIGN KEY (prescription_id) REFERENCES prescriptions(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE drug_expiry_tracking (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT NOT NULL,
    batch_number VARCHAR(100) NOT NULL,
    expiry_date DATE NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- 3. INDEXES FOR PERFORMANCE
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_barcode ON products(barcode);
CREATE INDEX idx_sales_customer ON sales(customer_id);
CREATE INDEX idx_sales_date ON sales(sale_date);
CREATE INDEX idx_inventory_product ON inventory(product_id);
CREATE INDEX idx_prescriptions_patient ON prescriptions(patient_id);
CREATE INDEX idx_drug_expiry_date ON drug_expiry_tracking(expiry_date);

-- 4. SAMPLE DATA
INSERT INTO categories (name, description) VALUES 
('Antibiotics', 'Antibacterial medications'),
('Pain Relief', 'Pain management drugs'),
('Vitamins', 'Nutritional supplements'),
('OTC', 'Over-the-counter medications');

INSERT INTO users (username, password, full_name, role) VALUES 
('admin', '$2b$10$encrypted_password', 'System Administrator', 'admin'),
('pharmacist1', '$2b$10$encrypted_password', 'Dr. Somchai', 'pharmacist'),
('assistant1', '$2b$10$encrypted_password', 'Nurse Nid', 'assistant');
