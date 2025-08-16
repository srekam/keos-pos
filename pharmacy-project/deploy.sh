#!/bin/bash

# Thai Pharmacy POS API Deployment Script
# Run this on the remote Docker server (10.5.50.48)

echo "🚀 Deploying Thai Pharmacy POS API..."

# Check if docker-compose is available
if ! command -v docker-compose &> /dev/null; then
    echo "❌ docker-compose not found. Please install Docker Compose first."
    exit 1
fi

# Check if we're in the right directory
if [ ! -f "docker-compose.yml" ]; then
    echo "❌ docker-compose.yml not found. Please run this script from the project root."
    exit 1
fi

echo "📦 Building and starting all services..."
docker-compose up -d --build

echo "⏳ Waiting for services to start..."
sleep 10

echo "🔍 Checking service status..."
docker-compose ps

echo "🧪 Testing API endpoints..."

# Test health endpoint
echo "Testing health endpoint..."
HEALTH_RESPONSE=$(curl -s http://localhost:3000/health)
if [[ $HEALTH_RESPONSE == *"OK"* ]]; then
    echo "✅ Health check passed"
else
    echo "❌ Health check failed"
fi

# Test database connection
echo "Testing database connection..."
DB_RESPONSE=$(curl -s http://localhost:3000/api/test-db)
if [[ $DB_RESPONSE == *"success"* ]]; then
    echo "✅ Database connection successful"
else
    echo "❌ Database connection failed"
fi

echo ""
echo "🎉 Deployment complete!"
echo ""
echo "📊 Service URLs:"
echo "  - API Health: http://10.5.50.48:3000/health"
echo "  - API Test DB: http://10.5.50.48:3000/api/test-db"
echo "  - Products: http://10.5.50.48:3000/api/products"
echo "  - Customers: http://10.5.50.48:3000/api/customers"
echo "  - pgAdmin: http://10.5.50.48:8080"
echo ""
echo "📝 Useful commands:"
echo "  - View logs: docker-compose logs -f"
echo "  - Restart API: docker-compose restart api"
echo "  - Rebuild API: docker-compose up -d --build api"
echo "  - Stop all: docker-compose down"


