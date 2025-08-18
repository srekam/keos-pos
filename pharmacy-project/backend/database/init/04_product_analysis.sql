-- Product Analysis and Grouping Script
-- Comprehensive analysis of the 100 pharmacy products
-- Shows grouping by type, vendor, brand, and category

-- ========================================
-- 1. PRODUCT COUNT BY TYPE
-- ========================================
SELECT 
    type,
    COUNT(*) as product_count,
    ROUND(AVG(price), 2) as avg_price,
    MIN(price) as min_price,
    MAX(price) as max_price,
    ROUND(SUM(price), 2) as total_value
FROM products 
GROUP BY type 
ORDER BY product_count DESC;

-- ========================================
-- 2. PRODUCT COUNT BY VENDOR
-- ========================================
SELECT 
    vendor,
    COUNT(*) as product_count,
    ROUND(AVG(price), 2) as avg_price,
    MIN(price) as min_price,
    MAX(price) as max_price,
    ROUND(SUM(price), 2) as total_value
FROM products 
GROUP BY vendor 
ORDER BY product_count DESC;

-- ========================================
-- 3. PRODUCT COUNT BY BRAND
-- ========================================
SELECT 
    brand,
    COUNT(*) as product_count,
    ROUND(AVG(price), 2) as avg_price,
    MIN(price) as min_price,
    MAX(price) as max_price,
    ROUND(SUM(price), 2) as total_value
FROM products 
GROUP BY brand 
ORDER BY product_count DESC;

-- ========================================
-- 4. PRODUCT COUNT BY CATEGORY
-- ========================================
SELECT 
    category,
    COUNT(*) as product_count,
    ROUND(AVG(price), 2) as avg_price,
    MIN(price) as min_price,
    MAX(price) as max_price,
    ROUND(SUM(price), 2) as total_value
FROM products 
GROUP BY category 
ORDER BY product_count DESC;

-- ========================================
-- 5. PRICE RANGE ANALYSIS
-- ========================================
SELECT 
    'Low Price (0-50)' as price_range,
    COUNT(*) as product_count,
    ROUND(AVG(price), 2) as avg_price
FROM products 
WHERE price <= 50

UNION ALL

SELECT 
    'Medium Price (51-100)' as price_range,
    COUNT(*) as product_count,
    ROUND(AVG(price), 2) as avg_price
FROM products 
WHERE price > 50 AND price <= 100

UNION ALL

SELECT 
    'High Price (101-200)' as price_range,
    COUNT(*) as product_count,
    ROUND(AVG(price), 2) as avg_price
FROM products 
WHERE price > 100 AND price <= 200

UNION ALL

SELECT 
    'Premium Price (201+)' as price_range,
    COUNT(*) as product_count,
    ROUND(AVG(price), 2) as avg_price
FROM products 
WHERE price > 200

ORDER BY avg_price;

-- ========================================
-- 6. VENDOR-BRAND COMBINATION ANALYSIS
-- ========================================
SELECT 
    vendor,
    brand,
    COUNT(*) as product_count,
    ROUND(AVG(price), 2) as avg_price,
    ROUND(SUM(price), 2) as total_value
FROM products 
GROUP BY vendor, brand 
ORDER BY product_count DESC, total_value DESC;

-- ========================================
-- 7. TYPE-CATEGORY COMBINATION ANALYSIS
-- ========================================
SELECT 
    type,
    category,
    COUNT(*) as product_count,
    ROUND(AVG(price), 2) as avg_price,
    ROUND(SUM(price), 2) as total_value
FROM products 
GROUP BY type, category 
ORDER BY product_count DESC, total_value DESC;

-- ========================================
-- 8. TOP 10 MOST EXPENSIVE PRODUCTS
-- ========================================
SELECT 
    code,
    name,
    type,
    vendor,
    brand,
    category,
    price
FROM products 
ORDER BY price DESC 
LIMIT 10;

-- ========================================
-- 9. TOP 10 LEAST EXPENSIVE PRODUCTS
-- ========================================
SELECT 
    code,
    name,
    type,
    vendor,
    brand,
    category,
    price
FROM products 
ORDER BY price ASC 
LIMIT 10;

-- ========================================
-- 10. COMPREHENSIVE SUMMARY
-- ========================================
SELECT 
    'TOTAL PRODUCTS' as metric,
    COUNT(*) as value,
    '' as detail
FROM products

UNION ALL

SELECT 
    'UNIQUE TYPES' as metric,
    COUNT(DISTINCT type) as value,
    string_agg(DISTINCT type, ', ') as detail
FROM products

UNION ALL

SELECT 
    'UNIQUE VENDORS' as metric,
    COUNT(DISTINCT vendor) as value,
    string_agg(DISTINCT vendor, ', ') as detail
FROM products

UNION ALL

SELECT 
    'UNIQUE BRANDS' as metric,
    COUNT(DISTINCT brand) as value,
    string_agg(DISTINCT brand, ', ') as detail
FROM products

UNION ALL

SELECT 
    'UNIQUE CATEGORIES' as metric,
    COUNT(DISTINCT category) as value,
    string_agg(DISTINCT category, ', ') as detail
FROM products

UNION ALL

SELECT 
    'TOTAL INVENTORY VALUE' as metric,
    ROUND(SUM(price), 2) as value,
    'Based on current prices' as detail
FROM products

UNION ALL

SELECT 
    'AVERAGE PRODUCT PRICE' as metric,
    ROUND(AVG(price), 2) as value,
    'Mean price across all products' as detail
FROM products

UNION ALL

SELECT 
    'PRICE RANGE' as metric,
    ROUND(MAX(price) - MIN(price), 2) as value,
    CONCAT('From ', MIN(price), ' to ', MAX(price)) as detail
FROM products;
