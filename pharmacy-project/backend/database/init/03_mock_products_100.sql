-- Mock Product Data for Pharmacy POS System
-- 100 realistic pharmacy products with proper categorization
-- Generated for testing and demonstration purposes

-- Clear existing products first
DELETE FROM products;

-- Reset sequence
ALTER SEQUENCE products_id_seq RESTART WITH 1;

-- Insert 100 realistic pharmacy products
INSERT INTO products (code, name, description, type, vendor, brand, price, category, created_at, updated_at) VALUES

-- ========================================
-- ANTIBIOTICS (20 products)
-- ========================================
('AB001', 'Amoxicillin 500mg Capsule', 'Broad-spectrum antibiotic for bacterial infections', 'Antibiotic', 'Bangkok Drug Co.', 'Bangkok Pharma', 45.00, 'Antibiotics', NOW(), NOW()),
('AB002', 'Azithromycin 250mg Tablet', 'Macrolide antibiotic for respiratory infections', 'Antibiotic', 'Thai Pharmaceutical', 'ThaiMed', 85.00, 'Antibiotics', NOW(), NOW()),
('AB003', 'Ciprofloxacin 500mg Tablet', 'Fluoroquinolone antibiotic for urinary tract infections', 'Antibiotic', 'Bangkok Drug Co.', 'Bangkok Pharma', 65.00, 'Antibiotics', NOW(), NOW()),
('AB004', 'Doxycycline 100mg Capsule', 'Tetracycline antibiotic for acne and infections', 'Antibiotic', 'Siam Medicine', 'SiamMed', 55.00, 'Antibiotics', NOW(), NOW()),
('AB005', 'Clarithromycin 500mg Tablet', 'Macrolide antibiotic for respiratory infections', 'Antibiotic', 'Thai Pharmaceutical', 'ThaiMed', 95.00, 'Antibiotics', NOW(), NOW()),
('AB006', 'Metronidazole 400mg Tablet', 'Antibiotic for anaerobic bacterial infections', 'Antibiotic', 'Bangkok Drug Co.', 'Bangkok Pharma', 35.00, 'Antibiotics', NOW(), NOW()),
('AB007', 'Cephalexin 500mg Capsule', 'First-generation cephalosporin antibiotic', 'Antibiotic', 'Siam Medicine', 'SiamMed', 75.00, 'Antibiotics', NOW(), NOW()),
('AB008', 'Erythromycin 250mg Tablet', 'Macrolide antibiotic for skin infections', 'Antibiotic', 'Thai Pharmaceutical', 'ThaiMed', 45.00, 'Antibiotics', NOW(), NOW()),
('AB009', 'Tetracycline 250mg Capsule', 'Broad-spectrum antibiotic for various infections', 'Antibiotic', 'Bangkok Drug Co.', 'Bangkok Pharma', 40.00, 'Antibiotics', NOW(), NOW()),
('AB010', 'Sulfamethoxazole 400mg Tablet', 'Sulfonamide antibiotic for urinary infections', 'Antibiotic', 'Siam Medicine', 'SiamMed', 30.00, 'Antibiotics', NOW(), NOW()),
('AB011', 'Gentamicin 80mg Injection', 'Aminoglycoside antibiotic for severe infections', 'Antibiotic', 'Thai Pharmaceutical', 'ThaiMed', 120.00, 'Antibiotics', NOW(), NOW()),
('AB012', 'Vancomycin 500mg Injection', 'Glycopeptide antibiotic for MRSA infections', 'Antibiotic', 'Bangkok Drug Co.', 'Bangkok Pharma', 250.00, 'Antibiotics', NOW(), NOW()),
('AB013', 'Rifampin 300mg Capsule', 'Antibiotic for tuberculosis treatment', 'Antibiotic', 'Siam Medicine', 'SiamMed', 180.00, 'Antibiotics', NOW(), NOW()),
('AB014', 'Isoniazid 300mg Tablet', 'Antibiotic for tuberculosis prevention', 'Antibiotic', 'Thai Pharmaceutical', 'ThaiMed', 90.00, 'Antibiotics', NOW(), NOW()),
('AB015', 'Pyrazinamide 500mg Tablet', 'Antibiotic for tuberculosis treatment', 'Antibiotic', 'Bangkok Drug Co.', 'Bangkok Pharma', 110.00, 'Antibiotics', NOW(), NOW()),
('AB016', 'Ethambutol 400mg Tablet', 'Antibiotic for tuberculosis treatment', 'Antibiotic', 'Siam Medicine', 'SiamMed', 95.00, 'Antibiotics', NOW(), NOW()),
('AB017', 'Streptomycin 1g Injection', 'Aminoglycoside antibiotic for TB', 'Antibiotic', 'Thai Pharmaceutical', 'ThaiMed', 200.00, 'Antibiotics', NOW(), NOW()),
('AB018', 'Chloramphenicol 250mg Capsule', 'Broad-spectrum antibiotic for eye infections', 'Antibiotic', 'Bangkok Drug Co.', 'Bangkok Pharma', 50.00, 'Antibiotics', NOW(), NOW()),
('AB019', 'Nitrofurantoin 100mg Capsule', 'Antibiotic for urinary tract infections', 'Antibiotic', 'Siam Medicine', 'SiamMed', 60.00, 'Antibiotics', NOW(), NOW()),
('AB020', 'Fosfomycin 3g Sachet', 'Antibiotic for uncomplicated UTI', 'Antibiotic', 'Thai Pharmaceutical', 'ThaiMed', 150.00, 'Antibiotics', NOW(), NOW()),

-- ========================================
-- PAIN RELIEVERS (15 products)
-- ========================================
('PR001', 'Paracetamol 500mg Tablet', 'Pain reliever and fever reducer', 'Pain Relief', 'Bangkok Drug Co.', 'Bangkok Pharma', 15.00, 'Pain Management', NOW(), NOW()),
('PR002', 'Ibuprofen 400mg Tablet', 'Non-steroidal anti-inflammatory drug', 'Pain Relief', 'Thai Pharmaceutical', 'ThaiMed', 25.00, 'Pain Management', NOW(), NOW()),
('PR003', 'Aspirin 300mg Tablet', 'Pain reliever and blood thinner', 'Pain Relief', 'Siam Medicine', 'SiamMed', 20.00, 'Pain Management', NOW(), NOW()),
('PR004', 'Diclofenac 50mg Tablet', 'NSAID for arthritis and pain', 'Pain Relief', 'Bangkok Drug Co.', 'Bangkok Pharma', 35.00, 'Pain Management', NOW(), NOW()),
('PR005', 'Naproxen 500mg Tablet', 'NSAID for chronic pain conditions', 'Pain Relief', 'Thai Pharmaceutical', 'ThaiMed', 40.00, 'Pain Management', NOW(), NOW()),
('PR006', 'Tramadol 50mg Tablet', 'Opioid pain medication', 'Pain Relief', 'Siam Medicine', 'SiamMed', 85.00, 'Pain Management', NOW(), NOW()),
('PR007', 'Codeine 30mg Tablet', 'Opioid pain medication and cough suppressant', 'Pain Relief', 'Bangkok Drug Co.', 'Bangkok Pharma', 75.00, 'Pain Management', NOW(), NOW()),
('PR008', 'Morphine 10mg Tablet', 'Strong opioid pain medication', 'Pain Relief', 'Thai Pharmaceutical', 'ThaiMed', 120.00, 'Pain Management', NOW(), NOW()),
('PR009', 'Oxycodone 5mg Tablet', 'Semi-synthetic opioid pain medication', 'Pain Relief', 'Siam Medicine', 'SiamMed', 95.00, 'Pain Management', NOW(), NOW()),
('PR010', 'Fentanyl 25mcg Patch', 'Transdermal opioid pain medication', 'Pain Relief', 'Bangkok Drug Co.', 'Bangkok Pharma', 180.00, 'Pain Management', NOW(), NOW()),
('PR011', 'Ketorolac 10mg Tablet', 'NSAID for moderate to severe pain', 'Pain Relief', 'Thai Pharmaceutical', 'ThaiMed', 45.00, 'Pain Management', NOW(), NOW()),
('PR012', 'Celecoxib 200mg Capsule', 'COX-2 selective NSAID', 'Pain Relief', 'Siam Medicine', 'SiamMed', 65.00, 'Pain Management', NOW(), NOW()),
('PR013', 'Meloxicam 15mg Tablet', 'NSAID for osteoarthritis and rheumatoid arthritis', 'Pain Relief', 'Bangkok Drug Co.', 'Bangkok Pharma', 55.00, 'Pain Management', NOW(), NOW()),
('PR014', 'Piroxicam 20mg Capsule', 'NSAID for arthritis and pain', 'Pain Relief', 'Thai Pharmaceutical', 'ThaiMed', 50.00, 'Pain Management', NOW(), NOW()),
('PR015', 'Indomethacin 25mg Capsule', 'NSAID for gout and arthritis', 'Pain Relief', 'Siam Medicine', 'SiamMed', 60.00, 'Pain Management', NOW(), NOW()),

-- ========================================
-- CARDIOVASCULAR MEDICATIONS (15 products)
-- ========================================
('CV001', 'Amlodipine 5mg Tablet', 'Calcium channel blocker for hypertension', 'Cardiovascular', 'Bangkok Drug Co.', 'Bangkok Pharma', 45.00, 'Cardiovascular', NOW(), NOW()),
('CV002', 'Lisinopril 10mg Tablet', 'ACE inhibitor for hypertension', 'Cardiovascular', 'Thai Pharmaceutical', 'ThaiMed', 55.00, 'Cardiovascular', NOW(), NOW()),
('CV003', 'Metoprolol 50mg Tablet', 'Beta blocker for hypertension and angina', 'Cardiovascular', 'Siam Medicine', 'SiamMed', 40.00, 'Cardiovascular', NOW(), NOW()),
('CV004', 'Atorvastatin 20mg Tablet', 'Statin for cholesterol reduction', 'Cardiovascular', 'Bangkok Drug Co.', 'Bangkok Pharma', 75.00, 'Cardiovascular', NOW(), NOW()),
('CV005', 'Simvastatin 40mg Tablet', 'Statin for cholesterol reduction', 'Cardiovascular', 'Thai Pharmaceutical', 'ThaiMed', 65.00, 'Cardiovascular', NOW(), NOW()),
('CV006', 'Losartan 50mg Tablet', 'Angiotensin II receptor blocker', 'Cardiovascular', 'Siam Medicine', 'SiamMed', 60.00, 'Cardiovascular', NOW(), NOW()),
('CV007', 'Valsartan 80mg Tablet', 'Angiotensin II receptor blocker', 'Cardiovascular', 'Bangkok Drug Co.', 'Bangkok Pharma', 70.00, 'Cardiovascular', NOW(), NOW()),
('CV008', 'Carvedilol 25mg Tablet', 'Beta blocker for heart failure', 'Cardiovascular', 'Thai Pharmaceutical', 'ThaiMed', 80.00, 'Cardiovascular', NOW(), NOW()),
('CV009', 'Diltiazem 90mg Capsule', 'Calcium channel blocker for angina', 'Cardiovascular', 'Siam Medicine', 'SiamMed', 50.00, 'Cardiovascular', NOW(), NOW()),
('CV010', 'Verapamil 120mg Tablet', 'Calcium channel blocker for arrhythmias', 'Cardiovascular', 'Bangkok Drug Co.', 'Bangkok Pharma', 55.00, 'Cardiovascular', NOW(), NOW()),
('CV011', 'Digoxin 0.25mg Tablet', 'Cardiac glycoside for heart failure', 'Cardiovascular', 'Thai Pharmaceutical', 'ThaiMed', 35.00, 'Cardiovascular', NOW(), NOW()),
('CV012', 'Warfarin 5mg Tablet', 'Anticoagulant for blood thinning', 'Cardiovascular', 'Siam Medicine', 'SiamMed', 25.00, 'Cardiovascular', NOW(), NOW()),
('CV013', 'Clopidogrel 75mg Tablet', 'Anti-platelet medication', 'Cardiovascular', 'Bangkok Drug Co.', 'Bangkok Pharma', 85.00, 'Cardiovascular', NOW(), NOW()),
('CV014', 'Aspirin 100mg Tablet', 'Low-dose aspirin for heart protection', 'Cardiovascular', 'Thai Pharmaceutical', 'ThaiMed', 15.00, 'Cardiovascular', NOW(), NOW()),
('CV015', 'Nitroglycerin 0.4mg Tablet', 'Vasodilator for angina', 'Cardiovascular', 'Siam Medicine', 'SiamMed', 30.00, 'Cardiovascular', NOW(), NOW()),

-- ========================================
-- DIABETES MEDICATIONS (10 products)
-- ========================================
('DM001', 'Metformin 500mg Tablet', 'First-line medication for type 2 diabetes', 'Diabetes', 'Bangkok Drug Co.', 'Bangkok Pharma', 25.00, 'Diabetes Care', NOW(), NOW()),
('DM002', 'Gliclazide 80mg Tablet', 'Sulfonylurea for diabetes control', 'Diabetes', 'Thai Pharmaceutical', 'ThaiMed', 35.00, 'Diabetes Care', NOW(), NOW()),
('DM003', 'Glimepiride 2mg Tablet', 'Sulfonylurea for diabetes control', 'Diabetes', 'Siam Medicine', 'SiamMed', 40.00, 'Diabetes Care', NOW(), NOW()),
('DM004', 'Pioglitazone 30mg Tablet', 'Thiazolidinedione for diabetes', 'Diabetes', 'Bangkok Drug Co.', 'Bangkok Pharma', 65.00, 'Diabetes Care', NOW(), NOW()),
('DM005', 'Sitagliptin 100mg Tablet', 'DPP-4 inhibitor for diabetes', 'Diabetes', 'Thai Pharmaceutical', 'ThaiMed', 95.00, 'Diabetes Care', NOW(), NOW()),
('DM006', 'Insulin Regular 100IU/ml', 'Short-acting insulin injection', 'Diabetes', 'Siam Medicine', 'SiamMed', 150.00, 'Diabetes Care', NOW(), NOW()),
('DM007', 'Insulin NPH 100IU/ml', 'Intermediate-acting insulin', 'Diabetes', 'Bangkok Drug Co.', 'Bangkok Pharma', 140.00, 'Diabetes Care', NOW(), NOW()),
('DM008', 'Insulin Glargine 100IU/ml', 'Long-acting insulin analog', 'Diabetes', 'Thai Pharmaceutical', 'ThaiMed', 280.00, 'Diabetes Care', NOW(), NOW()),
('DM009', 'Acarbose 100mg Tablet', 'Alpha-glucosidase inhibitor', 'Diabetes', 'Siam Medicine', 'SiamMed', 55.00, 'Diabetes Care', NOW(), NOW()),
('DM010', 'Repaglinide 1mg Tablet', 'Meglitinide for diabetes control', 'Diabetes', 'Bangkok Drug Co.', 'Bangkok Pharma', 75.00, 'Diabetes Care', NOW(), NOW()),

-- ========================================
-- RESPIRATORY MEDICATIONS (10 products)
-- ========================================
('RS001', 'Salbutamol 100mcg Inhaler', 'Short-acting beta agonist for asthma', 'Respiratory', 'Bangkok Drug Co.', 'Bangkok Pharma', 85.00, 'Respiratory Care', NOW(), NOW()),
('RS002', 'Budesonide 200mcg Inhaler', 'Inhaled corticosteroid for asthma', 'Respiratory', 'Thai Pharmaceutical', 'ThaiMed', 120.00, 'Respiratory Care', NOW(), NOW()),
('RS003', 'Formoterol 12mcg Inhaler', 'Long-acting beta agonist for asthma', 'Respiratory', 'Siam Medicine', 'SiamMed', 150.00, 'Respiratory Care', NOW(), NOW()),
('RS004', 'Tiotropium 18mcg Inhaler', 'Long-acting anticholinergic for COPD', 'Respiratory', 'Bangkok Drug Co.', 'Bangkok Pharma', 180.00, 'Respiratory Care', NOW(), NOW()),
('RS005', 'Theophylline 200mg Tablet', 'Methylxanthine for asthma and COPD', 'Respiratory', 'Thai Pharmaceutical', 'ThaiMed', 45.00, 'Respiratory Care', NOW(), NOW()),
('RS006', 'Montelukast 10mg Tablet', 'Leukotriene receptor antagonist', 'Respiratory', 'Siam Medicine', 'SiamMed', 95.00, 'Respiratory Care', NOW(), NOW()),
('RS007', 'Ipratropium 20mcg Inhaler', 'Short-acting anticholinergic', 'Respiratory', 'Bangkok Drug Co.', 'Bangkok Pharma', 75.00, 'Respiratory Care', NOW(), NOW()),
('RS008', 'Beclomethasone 100mcg Inhaler', 'Inhaled corticosteroid for asthma', 'Respiratory', 'Thai Pharmaceutical', 'ThaiMed', 110.00, 'Respiratory Care', NOW(), NOW()),
('RS009', 'Salmeterol 50mcg Inhaler', 'Long-acting beta agonist for asthma', 'Respiratory', 'Siam Medicine', 'SiamMed', 140.00, 'Respiratory Care', NOW(), NOW()),
('RS010', 'Cromolyn 20mg Inhaler', 'Mast cell stabilizer for asthma', 'Respiratory', 'Bangkok Drug Co.', 'Bangkok Pharma', 90.00, 'Respiratory Care', NOW(), NOW()),

-- ========================================
-- GASTROINTESTINAL MEDICATIONS (10 products)
-- ========================================
('GI001', 'Omeprazole 20mg Capsule', 'Proton pump inhibitor for acid reflux', 'Gastrointestinal', 'Bangkok Drug Co.', 'Bangkok Pharma', 55.00, 'Gastrointestinal', NOW(), NOW()),
('GI002', 'Ranitidine 150mg Tablet', 'H2 blocker for acid reflux', 'Gastrointestinal', 'Thai Pharmaceutical', 'ThaiMed', 35.00, 'Gastrointestinal', NOW(), NOW()),
('GI003', 'Lansoprazole 30mg Capsule', 'Proton pump inhibitor for ulcers', 'Gastrointestinal', 'Siam Medicine', 'SiamMed', 65.00, 'Gastrointestinal', NOW(), NOW()),
('GI004', 'Pantoprazole 40mg Tablet', 'Proton pump inhibitor for GERD', 'Gastrointestinal', 'Bangkok Drug Co.', 'Bangkok Pharma', 70.00, 'Gastrointestinal', NOW(), NOW()),
('GI005', 'Esomeprazole 40mg Capsule', 'Proton pump inhibitor for acid control', 'Gastrointestinal', 'Thai Pharmaceutical', 'ThaiMed', 85.00, 'Gastrointestinal', NOW(), NOW()),
('GI006', 'Famotidine 40mg Tablet', 'H2 blocker for acid reduction', 'Gastrointestinal', 'Siam Medicine', 'SiamMed', 40.00, 'Gastrointestinal', NOW(), NOW()),
('GI007', 'Cimetidine 400mg Tablet', 'H2 blocker for acid control', 'Gastrointestinal', 'Bangkok Drug Co.', 'Bangkok Pharma', 30.00, 'Gastrointestinal', NOW(), NOW()),
('GI008', 'Sucralfate 1g Tablet', 'Cytoprotective agent for ulcers', 'Gastrointestinal', 'Thai Pharmaceutical', 'ThaiMed', 45.00, 'Gastrointestinal', NOW(), NOW()),
('GI009', 'Misoprostol 200mcg Tablet', 'Prostaglandin analog for ulcer prevention', 'Gastrointestinal', 'Siam Medicine', 'SiamMed', 75.00, 'Gastrointestinal', NOW(), NOW()),
('GI010', 'Bismuth Subsalicylate 262mg Tablet', 'Antacid and anti-diarrheal', 'Gastrointestinal', 'Bangkok Drug Co.', 'Bangkok Pharma', 25.00, 'Gastrointestinal', NOW(), NOW()),

-- ========================================
-- MENTAL HEALTH MEDICATIONS (10 products)
-- ========================================
('MH001', 'Sertraline 50mg Tablet', 'SSRI antidepressant', 'Mental Health', 'Bangkok Drug Co.', 'Bangkok Pharma', 65.00, 'Mental Health', NOW(), NOW()),
('MH002', 'Fluoxetine 20mg Capsule', 'SSRI antidepressant', 'Mental Health', 'Thai Pharmaceutical', 'ThaiMed', 55.00, 'Mental Health', NOW(), NOW()),
('MH003', 'Escitalopram 10mg Tablet', 'SSRI antidepressant', 'Mental Health', 'Siam Medicine', 'SiamMed', 75.00, 'Mental Health', NOW(), NOW()),
('MH004', 'Paroxetine 20mg Tablet', 'SSRI antidepressant', 'Mental Health', 'Bangkok Drug Co.', 'Bangkok Pharma', 60.00, 'Mental Health', NOW(), NOW()),
('MH005', 'Venlafaxine 75mg Capsule', 'SNRI antidepressant', 'Mental Health', 'Thai Pharmaceutical', 'ThaiMed', 85.00, 'Mental Health', NOW(), NOW()),
('MH006', 'Duloxetine 60mg Capsule', 'SNRI antidepressant', 'Mental Health', 'Siam Medicine', 'SiamMed', 95.00, 'Mental Health', NOW(), NOW()),
('MH007', 'Bupropion 150mg Tablet', 'Atypical antidepressant', 'Mental Health', 'Bangkok Drug Co.', 'Bangkok Pharma', 70.00, 'Mental Health', NOW(), NOW()),
('MH008', 'Mirtazapine 30mg Tablet', 'Tetracyclic antidepressant', 'Mental Health', 'Thai Pharmaceutical', 'ThaiMed', 80.00, 'Mental Health', NOW(), NOW()),
('MH009', 'Trazodone 100mg Tablet', 'Serotonin antagonist and reuptake inhibitor', 'Mental Health', 'Siam Medicine', 'SiamMed', 65.00, 'Mental Health', NOW(), NOW()),
('MH010', 'Amitriptyline 25mg Tablet', 'Tricyclic antidepressant', 'Mental Health', 'Bangkok Drug Co.', 'Bangkok Pharma', 45.00, 'Mental Health', NOW(), NOW()),

-- ========================================
-- DERMATOLOGICAL PRODUCTS (10 products)
-- ========================================
('DP001', 'Betamethasone 0.1% Cream', 'Topical corticosteroid for skin conditions', 'Dermatological', 'Bangkok Drug Co.', 'Bangkok Pharma', 45.00, 'Dermatology', NOW(), NOW()),
('DP002', 'Clotrimazole 1% Cream', 'Antifungal cream for skin infections', 'Dermatological', 'Thai Pharmaceutical', 'ThaiMed', 35.00, 'Dermatology', NOW(), NOW()),
('DP003', 'Miconazole 2% Cream', 'Antifungal cream for athlete\'s foot', 'Dermatological', 'Siam Medicine', 'SiamMed', 40.00, 'Dermatology', NOW(), NOW()),
('DP004', 'Ketoconazole 2% Shampoo', 'Antifungal shampoo for dandruff', 'Dermatological', 'Bangkok Drug Co.', 'Bangkok Pharma', 55.00, 'Dermatology', NOW(), NOW()),
('DP005', 'Terbinafine 1% Cream', 'Antifungal cream for nail infections', 'Dermatological', 'Thai Pharmaceutical', 'ThaiMed', 65.00, 'Dermatology', NOW(), NOW()),
('DP006', 'Hydrocortisone 1% Cream', 'Mild topical corticosteroid', 'Dermatological', 'Siam Medicine', 'SiamMed', 30.00, 'Dermatology', NOW(), NOW()),
('DP007', 'Calamine Lotion 8%', 'Topical medication for skin irritation', 'Dermatological', 'Bangkok Drug Co.', 'Bangkok Pharma', 25.00, 'Dermatology', NOW(), NOW()),
('DP008', 'Zinc Oxide 20% Ointment', 'Protective barrier for skin', 'Dermatological', 'Thai Pharmaceutical', 'ThaiMed', 35.00, 'Dermatology', NOW(), NOW()),
('DP009', 'Salicylic Acid 6% Gel', 'Topical treatment for warts and calluses', 'Dermatological', 'Siam Medicine', 'SiamMed', 40.00, 'Dermatology', NOW(), NOW()),
('DP010', 'Benzoyl Peroxide 5% Gel', 'Topical treatment for acne', 'Dermatological', 'Bangkok Drug Co.', 'Bangkok Pharma', 50.00, 'Dermatology', NOW(), NOW());

-- Update the products count
SELECT COUNT(*) as total_products FROM products;
