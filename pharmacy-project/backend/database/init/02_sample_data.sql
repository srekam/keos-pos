-- Sample Data for Thai Pharmacy POS
-- This script adds sample data after the schema is created

-- Insert sample users (passwords are hashed - in production use bcrypt)
INSERT INTO users (username, password, full_name, email, phone, role) VALUES 
('admin', '$2b$10$encrypted_password_hash_here', 'System Administrator', 'admin@pharmacypos.com', '+66-2-123-4567', 'admin'),
('pharmacist1', '$2b$10$encrypted_password_hash_here', 'Dr. Somchai Jaidee', 'somchai@pharmacypos.com', '+66-2-123-4568', 'pharmacist'),
('pharmacist2', '$2b$10$encrypted_password_hash_here', 'Dr. Nid Noi', 'nid@pharmacypos.com', '+66-2-123-4569', 'pharmacist'),
('assistant1', '$2b$10$encrypted_password_hash_here', 'Nurse Pim', 'pim@pharmacypos.com', '+66-2-123-4570', 'assistant'),
('assistant2', '$2b$10$encrypted_password_hash_here', 'Nurse Mai', 'mai@pharmacypos.com', '+66-2-123-4571', 'assistant');

-- Insert sample products (drugs)
INSERT INTO products (name, generic_name, category_id, sku, barcode, price, cost_price) VALUES 
-- Antibiotics
('Amoxicillin 500mg', 'Amoxicillin', 1, 'AMX-500-001', '8851234567890', 45.00, 25.00),
('Azithromycin 250mg', 'Azithromycin', 1, 'AZI-250-001', '8851234567891', 120.00, 80.00),
('Ciprofloxacin 500mg', 'Ciprofloxacin', 1, 'CIP-500-001', '8851234567892', 85.00, 55.00),

-- Pain Relief
('Paracetamol 500mg', 'Paracetamol', 2, 'PAR-500-001', '8851234567893', 15.00, 8.00),
('Ibuprofen 400mg', 'Ibuprofen', 2, 'IBU-400-001', '8851234567894', 25.00, 15.00),
('Diclofenac 50mg', 'Diclofenac', 2, 'DIC-50-001', '8851234567895', 35.00, 22.00),

-- Vitamins
('Vitamin C 1000mg', 'Ascorbic Acid', 3, 'VIT-C-1000-001', '8851234567896', 180.00, 120.00),
('Vitamin D3 1000IU', 'Cholecalciferol', 3, 'VIT-D3-1000-001', '8851234567897', 220.00, 150.00),
('Multivitamin', 'Multivitamin Complex', 3, 'MULTI-001', '8851234567898', 350.00, 250.00),

-- OTC
('Antacid Tablets', 'Aluminum Hydroxide', 4, 'ANT-001', '8851234567899', 45.00, 25.00),
('Cough Syrup', 'Dextromethorphan', 4, 'COUGH-001', '8851234567900', 65.00, 40.00),
('Eye Drops', 'Tetrahydrozoline', 4, 'EYE-001', '8851234567901', 85.00, 55.00),

-- Cardiovascular
('Amlodipine 5mg', 'Amlodipine', 5, 'AML-5-001', '8851234567902', 95.00, 65.00),
('Metoprolol 50mg', 'Metoprolol', 5, 'MET-50-001', '8851234567903', 75.00, 50.00),
('Lisinopril 10mg', 'Lisinopril', 5, 'LIS-10-001', '8851234567904', 85.00, 60.00),

-- Diabetes
('Metformin 500mg', 'Metformin', 6, 'MET-500-001', '8851234567905', 45.00, 30.00),
('Gliclazide 80mg', 'Gliclazide', 6, 'GLI-80-001', '8851234567906', 65.00, 45.00),

-- Respiratory
('Salbutamol Inhaler', 'Salbutamol', 7, 'SAL-INH-001', '8851234567907', 125.00, 85.00),
('Budesonide Inhaler', 'Budesonide', 7, 'BUD-INH-001', '8851234567908', 185.00, 125.00);

-- Insert sample customers (patients)
INSERT INTO customers (first_name, last_name, phone, address, date_of_birth) VALUES 
('Somsri', 'Rattanakul', '+66-2-987-6543', '123 Sukhumvit Road, Bangkok 10110', '1985-03-15'),
('Prasert', 'Srisai', '+66-2-987-6544', '456 Silom Road, Bangkok 10500', '1978-07-22'),
('Wanida', 'Chaiyaporn', '+66-2-987-6545', '789 Rama IV Road, Bangkok 10500', '1992-11-08'),
('Somchai', 'Thongdee', '+66-2-987-6546', '321 Sathorn Road, Bangkok 10120', '1980-05-12'),
('Ratree', 'Pongprapan', '+66-2-987-6547', '654 Petchburi Road, Bangkok 10400', '1988-09-30'),
('Anan', 'Srisuwan', '+66-2-987-6548', '987 Ladphrao Road, Bangkok 10900', '1975-12-03'),
('Siriporn', 'Rattanachai', '+66-2-987-6549', '147 Ratchadaphisek Road, Bangkok 10400', '1990-04-18'),
('Pichai', 'Srisuk', '+66-2-987-6550', '258 Vibhavadi Road, Bangkok 10900', '1983-08-25');

-- Insert sample drug details
INSERT INTO drug_details (product_id, active_ingredient, strength, dosage_form, manufacturer, requires_prescription, controlled_substance, storage_conditions) VALUES 
(1, 'Amoxicillin', '500mg', 'tablet', 'Siam Pharmaceutical Co., Ltd.', true, false, 'Store at room temperature'),
(2, 'Azithromycin', '250mg', 'tablet', 'Bangkok Drug Co., Ltd.', true, false, 'Store at room temperature'),
(3, 'Ciprofloxacin', '500mg', 'tablet', 'Thai Pharmaceutical Co., Ltd.', true, false, 'Store at room temperature'),
(4, 'Paracetamol', '500mg', 'tablet', 'Siam Pharmaceutical Co., Ltd.', false, false, 'Store at room temperature'),
(5, 'Ibuprofen', '400mg', 'tablet', 'Bangkok Drug Co., Ltd.', false, false, 'Store at room temperature'),
(6, 'Diclofenac', '50mg', 'tablet', 'Thai Pharmaceutical Co., Ltd.', true, false, 'Store at room temperature'),
(7, 'Ascorbic Acid', '1000mg', 'tablet', 'Siam Pharmaceutical Co., Ltd.', false, false, 'Store at room temperature'),
(8, 'Cholecalciferol', '1000IU', 'tablet', 'Bangkok Drug Co., Ltd.', false, false, 'Store at room temperature'),
(9, 'Multivitamin Complex', 'Various', 'tablet', 'Thai Pharmaceutical Co., Ltd.', false, false, 'Store at room temperature'),
(10, 'Aluminum Hydroxide', 'Various', 'tablet', 'Siam Pharmaceutical Co., Ltd.', false, false, 'Store at room temperature'),
(11, 'Dextromethorphan', 'Various', 'liquid', 'Bangkok Drug Co., Ltd.', false, false, 'Store at room temperature'),
(12, 'Tetrahydrozoline', 'Various', 'liquid', 'Thai Pharmaceutical Co., Ltd.', false, false, 'Store at room temperature'),
(13, 'Amlodipine', '5mg', 'tablet', 'Siam Pharmaceutical Co., Ltd.', true, false, 'Store at room temperature'),
(14, 'Metoprolol', '50mg', 'tablet', 'Bangkok Drug Co., Ltd.', true, false, 'Store at room temperature'),
(15, 'Lisinopril', '10mg', 'tablet', 'Thai Pharmaceutical Co., Ltd.', true, false, 'Store at room temperature'),
(16, 'Metformin', '500mg', 'tablet', 'Siam Pharmaceutical Co., Ltd.', true, false, 'Store at room temperature'),
(17, 'Gliclazide', '80mg', 'tablet', 'Bangkok Drug Co., Ltd.', true, false, 'Store at room temperature'),
(18, 'Salbutamol', 'Various', 'inhaler', 'Thai Pharmaceutical Co., Ltd.', true, false, 'Store at room temperature'),
(19, 'Budesonide', 'Various', 'inhaler', 'Siam Pharmaceutical Co., Ltd.', true, false, 'Store at room temperature');

-- Insert sample inventory
INSERT INTO inventory (product_id, quantity, reorder_level, location) VALUES 
(1, 150, 50, 'Main Store'),
(2, 80, 30, 'Main Store'),
(3, 120, 40, 'Main Store'),
(4, 500, 100, 'Main Store'),
(5, 300, 80, 'Main Store'),
(6, 200, 60, 'Main Store'),
(7, 250, 70, 'Main Store'),
(8, 180, 50, 'Main Store'),
(9, 120, 40, 'Main Store'),
(10, 400, 100, 'Main Store'),
(11, 150, 50, 'Main Store'),
(12, 100, 30, 'Main Store'),
(13, 90, 25, 'Main Store'),
(14, 110, 35, 'Main Store'),
(15, 95, 30, 'Main Store'),
(16, 200, 60, 'Main Store'),
(17, 85, 25, 'Main Store'),
(18, 75, 20, 'Main Store'),
(19, 60, 15, 'Main Store');

-- Insert sample drug expiry tracking
INSERT INTO drug_expiry_tracking (product_id, batch_number, expiry_date, quantity) VALUES 
(1, 'AMX-2024-001', '2025-12-31', 150),
(2, 'AZI-2024-001', '2025-10-31', 80),
(3, 'CIP-2024-001', '2025-11-30', 120),
(4, 'PAR-2024-001', '2026-06-30', 500),
(5, 'IBU-2024-001', '2026-05-31', 300),
(6, 'DIC-2024-001', '2025-09-30', 200),
(7, 'VIT-C-2024-001', '2026-12-31', 250),
(8, 'VIT-D3-2024-001', '2026-11-30', 180),
(9, 'MULTI-2024-001', '2026-10-31', 120),
(10, 'ANT-2024-001', '2026-08-31', 400),
(11, 'COUGH-2024-001', '2025-12-31', 150),
(12, 'EYE-2024-001', '2025-11-30', 100),
(13, 'AML-2024-001', '2025-10-31', 90),
(14, 'MET-2024-001', '2025-12-31', 110),
(15, 'LIS-2024-001', '2025-11-30', 95),
(16, 'MET-500-2024-001', '2026-01-31', 200),
(17, 'GLI-2024-001', '2025-12-31', 85),
(18, 'SAL-INH-2024-001', '2025-10-31', 75),
(19, 'BUD-INH-2024-001', '2025-11-30', 60);

-- Insert sample prescriptions
INSERT INTO prescriptions (prescription_number, patient_id, doctor_name, prescription_date, expiry_date, status, notes) VALUES 
('PRES-2024-001', 1, 'Dr. Somchai Jaidee', '2024-01-15', '2024-02-15', 'active', 'Patient has allergy to penicillin'),
('PRES-2024-002', 2, 'Dr. Nid Noi', '2024-01-16', '2024-02-16', 'active', 'Monitor blood pressure'),
('PRES-2024-003', 3, 'Dr. Somchai Jaidee', '2024-01-17', '2024-02-17', 'active', 'Take with food'),
('PRES-2024-004', 4, 'Dr. Nid Noi', '2024-01-18', '2024-02-18', 'active', 'Avoid alcohol'),
('PRES-2024-005', 5, 'Dr. Somchai Jaidee', '2024-01-19', '2024-02-19', 'active', 'Regular blood tests required');

-- Insert sample prescription items
INSERT INTO prescription_items (prescription_id, product_id, dosage, frequency, duration, quantity_prescribed, instructions) VALUES 
(1, 2, '250mg', 'Once daily', '5 days', 5, 'Take 1 tablet daily for 5 days'),
(2, 13, '5mg', 'Once daily', '30 days', 30, 'Take 1 tablet daily in the morning'),
(3, 16, '500mg', 'Twice daily', '30 days', 60, 'Take 1 tablet twice daily with meals'),
(4, 14, '50mg', 'Twice daily', '30 days', 60, 'Take 1 tablet twice daily'),
(5, 7, '1000mg', 'Once daily', '30 days', 30, 'Take 1 tablet daily with breakfast');

-- Insert sample sales
INSERT INTO sales (customer_id, user_id, subtotal, tax_amount, total_amount, payment_method, payment_status, notes) VALUES 
(1, 3, 120.00, 8.40, 128.40, 'promptpay', 'paid', 'Prescription filled'),
(2, 3, 95.00, 6.65, 101.65, 'cash', 'paid', 'Regular medication'),
(3, 4, 45.00, 3.15, 48.15, 'card', 'paid', 'OTC purchase'),
(4, 4, 180.00, 12.60, 192.60, 'promptpay', 'paid', 'Vitamin supplement'),
(5, 3, 65.00, 4.55, 69.55, 'cash', 'paid', 'Pain relief'),
(6, 4, 85.00, 5.95, 90.95, 'card', 'paid', 'Eye drops'),
(7, 3, 350.00, 24.50, 374.50, 'promptpay', 'paid', 'Multivitamin'),
(8, 4, 125.00, 8.75, 133.75, 'cash', 'paid', 'Inhaler');

-- Insert sample sale items
INSERT INTO sale_items (sale_id, product_id, quantity, unit_price, total_price) VALUES 
(1, 2, 1, 120.00, 120.00),
(2, 13, 1, 95.00, 95.00),
(3, 4, 3, 15.00, 45.00),
(4, 7, 1, 180.00, 180.00),
(5, 5, 1, 65.00, 65.00),
(6, 12, 1, 85.00, 85.00),
(7, 9, 1, 350.00, 350.00),
(8, 18, 1, 125.00, 125.00);

-- Create some additional useful views
CREATE VIEW daily_sales_summary AS
SELECT 
    DATE(sale_date) as sale_date,
    COUNT(*) as total_sales,
    SUM(total_amount) as total_revenue,
    AVG(total_amount) as average_sale,
    COUNT(DISTINCT customer_id) as unique_customers
FROM sales 
WHERE payment_status = 'paid'
GROUP BY DATE(sale_date)
ORDER BY sale_date DESC;

CREATE VIEW top_selling_products AS
SELECT 
    p.name,
    p.sku,
    c.name as category,
    SUM(si.quantity) as total_sold,
    SUM(si.total_price) as total_revenue
FROM sale_items si
JOIN products p ON si.product_id = p.id
JOIN categories c ON p.category_id = c.id
JOIN sales s ON si.sale_id = s.id
WHERE s.payment_status = 'paid'
GROUP BY p.id, p.name, p.sku, c.name
ORDER BY total_sold DESC;

CREATE VIEW customer_purchase_history AS
SELECT 
    c.first_name,
    c.last_name,
    c.phone,
    COUNT(s.id) as total_purchases,
    SUM(s.total_amount) as total_spent,
    MAX(s.sale_date) as last_purchase_date
FROM customers c
LEFT JOIN sales s ON c.id = s.customer_id AND s.payment_status = 'paid'
GROUP BY c.id, c.first_name, c.last_name, c.phone
ORDER BY total_spent DESC;

-- Grant permissions on new views
GRANT SELECT ON daily_sales_summary TO pharmacy_user;
GRANT SELECT ON top_selling_products TO pharmacy_user;
GRANT SELECT ON customer_purchase_history TO pharmacy_user;
