-- Thai Pharmacy POS Database Initialization
-- This script runs automatically when PostgreSQL container starts

-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- 1. CORE POS TABLES
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    phone VARCHAR(20),
    role VARCHAR(20) CHECK (role IN ('admin', 'pharmacist', 'assistant')) DEFAULT 'assistant',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    generic_name VARCHAR(200),
    category_id INTEGER REFERENCES categories(id),
    sku VARCHAR(100) UNIQUE,
    barcode VARCHAR(100),
    price DECIMAL(10,2) NOT NULL,
    cost_price DECIMAL(10,2),
    tax_rate DECIMAL(5,2) DEFAULT 7.00, -- Thai VAT
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE inventory (
    id SERIAL PRIMARY KEY,
    product_id INTEGER NOT NULL REFERENCES products(id),
    quantity INTEGER DEFAULT 0,
    reorder_level INTEGER DEFAULT 10,
    location VARCHAR(100) DEFAULT 'Main Store',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    date_of_birth DATE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sales (
    id SERIAL PRIMARY KEY,
    invoice_number VARCHAR(50) UNIQUE NOT NULL,
    customer_id INTEGER REFERENCES customers(id),
    user_id INTEGER NOT NULL REFERENCES users(id),
    subtotal DECIMAL(10,2) NOT NULL,
    tax_amount DECIMAL(10,2) DEFAULT 0.00,
    total_amount DECIMAL(10,2) NOT NULL,
    payment_method VARCHAR(20) CHECK (payment_method IN ('cash', 'card', 'promptpay')) NOT NULL,
    payment_status VARCHAR(20) CHECK (payment_status IN ('pending', 'paid', 'refunded')) DEFAULT 'pending',
    sale_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    notes TEXT
);

CREATE TABLE sale_items (
    id SERIAL PRIMARY KEY,
    sale_id INTEGER NOT NULL REFERENCES sales(id),
    product_id INTEGER NOT NULL REFERENCES products(id),
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL
);

-- 2. PHARMACY-SPECIFIC TABLES
CREATE TABLE drug_details (
    id SERIAL PRIMARY KEY,
    product_id INTEGER NOT NULL REFERENCES products(id),
    active_ingredient VARCHAR(200),
    strength VARCHAR(50),
    dosage_form VARCHAR(20) CHECK (dosage_form IN ('tablet', 'capsule', 'liquid', 'injection', 'cream')),
    manufacturer VARCHAR(200),
    requires_prescription BOOLEAN DEFAULT FALSE,
    controlled_substance BOOLEAN DEFAULT FALSE,
    storage_conditions TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE prescriptions (
    id SERIAL PRIMARY KEY,
    prescription_number VARCHAR(50) UNIQUE NOT NULL,
    patient_id INTEGER NOT NULL REFERENCES customers(id),
    doctor_name VARCHAR(200) NOT NULL,
    prescription_date DATE NOT NULL,
    expiry_date DATE,
    status VARCHAR(20) CHECK (status IN ('active', 'filled', 'expired')) DEFAULT 'active',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE prescription_items (
    id SERIAL PRIMARY KEY,
    prescription_id INTEGER NOT NULL REFERENCES prescriptions(id),
    product_id INTEGER NOT NULL REFERENCES products(id),
    dosage VARCHAR(100) NOT NULL,
    frequency VARCHAR(100),
    duration VARCHAR(100),
    quantity_prescribed INTEGER NOT NULL,
    quantity_dispensed INTEGER DEFAULT 0,
    instructions TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE drug_expiry_tracking (
    id SERIAL PRIMARY KEY,
    product_id INTEGER NOT NULL REFERENCES products(id),
    batch_number VARCHAR(100) NOT NULL,
    expiry_date DATE NOT NULL,
    quantity INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. INDEXES FOR PERFORMANCE
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_barcode ON products(barcode);
CREATE INDEX idx_products_name_gin ON products USING gin(name gin_trgm_ops);
CREATE INDEX idx_sales_customer ON sales(customer_id);
CREATE INDEX idx_sales_date ON sales(sale_date);
CREATE INDEX idx_sales_user ON sales(user_id);
CREATE INDEX idx_inventory_product ON inventory(product_id);
CREATE INDEX idx_prescriptions_patient ON prescriptions(patient_id);
CREATE INDEX idx_prescriptions_status ON prescriptions(status);
CREATE INDEX idx_drug_expiry_date ON drug_expiry_tracking(expiry_date);
CREATE INDEX idx_drug_expiry_product ON drug_expiry_tracking(product_id);

-- 4. SAMPLE DATA
INSERT INTO categories (name, description) VALUES 
('Antibiotics', 'Antibacterial medications'),
('Pain Relief', 'Pain management drugs'),
('Vitamins', 'Nutritional supplements'),
('OTC', 'Over-the-counter medications'),
('Cardiovascular', 'Heart and blood pressure medications'),
('Diabetes', 'Blood sugar management'),
('Respiratory', 'Lung and breathing medications');

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_inventory_updated_at BEFORE UPDATE ON inventory FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create a function to generate invoice numbers
CREATE OR REPLACE FUNCTION generate_invoice_number()
RETURNS TRIGGER AS $$
BEGIN
    NEW.invoice_number := 'INV-' || TO_CHAR(CURRENT_DATE, 'YYYYMMDD') || '-' || LPAD(NEW.id::TEXT, 4, '0');
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for invoice numbers
CREATE TRIGGER generate_invoice_number_trigger BEFORE INSERT ON sales FOR EACH ROW EXECUTE FUNCTION generate_invoice_number();

-- Create a function to check drug interactions
CREATE OR REPLACE FUNCTION check_drug_interactions(patient_id INTEGER, new_drug_id INTEGER)
RETURNS TABLE(
    interaction_type VARCHAR(50),
    severity VARCHAR(20),
    description TEXT,
    recommendations TEXT
) AS $$
BEGIN
    -- This is a placeholder for drug interaction checking
    -- In a real system, this would query a drug interaction database
    RETURN QUERY
    SELECT 
        'caution'::VARCHAR(50) as interaction_type,
        'medium'::VARCHAR(20) as severity,
        'Please consult with pharmacist'::TEXT as description,
        'Monitor patient for adverse effects'::TEXT as recommendations
    WHERE EXISTS (
        SELECT 1 FROM prescriptions pr 
        JOIN prescription_items pi ON pr.id = pi.prescription_id 
        WHERE pr.patient_id = $1 AND pr.status = 'active'
    );
END;
$$ language 'plpgsql';

-- Grant permissions
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO pharmacy_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO pharmacy_user;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO pharmacy_user;

-- Create a view for low stock products
CREATE VIEW low_stock_products AS
SELECT 
    p.id,
    p.name,
    p.sku,
    c.name as category,
    i.quantity,
    i.reorder_level,
    i.location
FROM products p
JOIN categories c ON p.category_id = c.id
JOIN inventory i ON p.id = i.product_id
WHERE i.quantity <= i.reorder_level
AND p.is_active = true
ORDER BY i.quantity ASC;

-- Create a view for expiring drugs
CREATE VIEW expiring_drugs AS
SELECT 
    p.id,
    p.name,
    det.batch_number,
    det.expiry_date,
    det.quantity,
    det.expiry_date - CURRENT_DATE as days_until_expiry
FROM products p
JOIN drug_expiry_tracking det ON p.id = det.product_id
WHERE det.expiry_date <= CURRENT_DATE + INTERVAL '90 days'
ORDER BY det.expiry_date ASC;

-- Grant permissions on views
GRANT SELECT ON low_stock_products TO pharmacy_user;
GRANT SELECT ON expiring_drugs TO pharmacy_user;
