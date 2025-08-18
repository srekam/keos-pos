#!/bin/bash

# Load Mock Products Script for Pharmacy POS
# This script loads 100 realistic pharmacy products into the database

echo "🏥 Loading Mock Products for Pharmacy POS System..."
echo "=================================================="

# Check if Docker containers are running
if ! docker compose ps | grep -q "pharmacy_pos_db"; then
    echo "❌ Error: Database container is not running!"
    echo "Please start the system first: docker compose up -d"
    exit 1
fi

# Load the mock products data
echo "📦 Loading 100 pharmacy products..."
docker compose exec -T postgres psql -U pharmacy_user -d pharmacy_pos < database/init/03_mock_products_100.sql

if [ $? -eq 0 ]; then
    echo "✅ Successfully loaded mock products!"
    
    # Show product count
    echo "📊 Current product count:"
    docker compose exec -T postgres psql -U pharmacy_user -d pharmacy_pos -c "SELECT COUNT(*) as total_products FROM products;"
    
    # Show sample products
    echo "🔍 Sample products loaded:"
    docker compose exec -T postgres psql -U pharmacy_user -d pharmacy_pos -c "SELECT code, name, type, price FROM products LIMIT 5;"
    
    echo ""
    echo "🎉 Mock products loaded successfully!"
    echo "📋 You can now run the analysis script: database/init/04_product_analysis.sql"
    
else
    echo "❌ Error loading mock products!"
    exit 1
fi
