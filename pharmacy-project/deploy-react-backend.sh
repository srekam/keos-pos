#!/bin/bash

# React Backend Deployment Script for Pharmacy POS
# This script deploys the React Backend service on port 40002

set -e

echo "🚀 Deploying React Backend Service..."
echo "======================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    print_error "Docker is not running. Please start Docker and try again."
    exit 1
fi

# Check if docker-compose is available
if ! command -v docker-compose &> /dev/null; then
    print_error "docker-compose is not installed. Please install it and try again."
    exit 1
fi

# Navigate to project directory
cd "$(dirname "$0")"

print_status "Building and starting React Backend service..."

# Build and start only the React Backend service
docker-compose up -d --build react-backend

# Wait for service to be ready
print_status "Waiting for React Backend service to be ready..."
sleep 10

# Check service status
if docker-compose ps react-backend | grep -q "Up"; then
    print_success "React Backend service is running successfully!"
else
    print_error "React Backend service failed to start. Check logs with: docker-compose logs react-backend"
    exit 1
fi

# Check if port 40002 is accessible
print_status "Checking if port 40002 is accessible..."
if curl -s http://localhost:40002/health > /dev/null 2>&1; then
    print_success "Port 40002 is accessible locally"
else
    print_warning "Port 40002 is not accessible locally. This might be expected if running on remote host."
fi

# Display service information
echo ""
print_success "React Backend Service Deployed Successfully!"
echo "=================================================="
echo "🌐 Service URL: http://10.5.50.48:40002"
echo "🔌 API Proxy: http://10.5.50.48:40002/api/* -> http://10.5.50.48:41300"
echo "📊 Health Check: http://10.5.50.48:40002/health"
echo "🐳 Container: pharmacy_pos_react_backend"
echo ""

# Show running containers
print_status "Current service status:"
docker-compose ps react-backend

# Show logs
print_status "Recent logs (last 10 lines):"
docker-compose logs --tail=10 react-backend

echo ""
print_success "Deployment complete! React Backend is now running on port 40002"
echo ""
echo "📋 Next steps:"
echo "   • Access the React Backend: http://10.5.50.48:40002"
echo "   • Check logs: docker-compose logs -f react-backend"
echo "   • Stop service: docker-compose stop react-backend"
echo "   • Restart service: docker-compose restart react-backend"
echo ""
