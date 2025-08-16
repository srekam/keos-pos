#!/bin/bash

# Pharmacy POS Nginx + Node.js Deployment Script
# This script deploys the complete system with Nginx web server

set -e  # Exit on any error

echo "🚀 Starting Pharmacy POS Nginx + Node.js Deployment..."

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
check_docker() {
    print_status "Checking Docker status..."
    if ! docker info > /dev/null 2>&1; then
        print_error "Docker is not running. Please start Docker first."
        exit 1
    fi
    print_success "Docker is running"
}

# Check if docker-compose is available
check_docker_compose() {
    print_status "Checking docker-compose availability..."
    if ! command -v docker-compose &> /dev/null; then
        print_error "docker-compose is not installed. Please install it first."
        exit 1
    fi
    print_success "docker-compose is available"
}

# Stop existing containers
stop_containers() {
    print_status "Stopping existing containers..."
    docker-compose down --remove-orphans
    print_success "Existing containers stopped"
}

# Build and start services
deploy_services() {
    print_status "Building and starting services..."
    
    # Build the API image
    print_status "Building Node.js API image..."
    docker-compose build --no-cache api
    
    # Start all services
    print_status "Starting all services (PostgreSQL, pgAdmin, API, Nginx)..."
    docker-compose up -d
    
    print_success "Services started successfully"
}

# Wait for services to be ready
wait_for_services() {
    print_status "Waiting for services to be ready..."
    
    # Wait for PostgreSQL
    print_status "Waiting for PostgreSQL..."
    timeout=60
    while [ $timeout -gt 0 ]; do
        if docker-compose exec -T postgres pg_isready -U pharmacy_user -d pharmacy_pos > /dev/null 2>&1; then
            print_success "PostgreSQL is ready"
            break
        fi
        sleep 2
        timeout=$((timeout - 2))
    done
    
    if [ $timeout -le 0 ]; then
        print_error "PostgreSQL failed to start within 60 seconds"
        exit 1
    fi
    
    # Wait for API
    print_status "Waiting for Node.js API..."
    timeout=60
    while [ $timeout -gt 0 ]; do
        if curl -f http://localhost:41300/health > /dev/null 2>&1; then
            print_success "Node.js API is ready"
            break
        fi
        sleep 2
        timeout=$((timeout - 2))
    done
    
    if [ $timeout -le 0 ]; then
        print_error "Node.js API failed to start within 60 seconds"
        exit 1
    fi
    
    # Wait for Nginx
    print_status "Waiting for Nginx web server..."
    timeout=60
    while [ $timeout -gt 0 ]; do
        if curl -f http://localhost:40080/health > /dev/null 2>&1; then
            print_success "Nginx web server is ready"
            break
        fi
        sleep 2
        timeout=$((timeout - 2))
    done
    
    if [ $timeout -le 0 ]; then
        print_error "Nginx web server failed to start within 60 seconds"
        exit 1
    fi
}

# Check service health
check_health() {
    print_status "Checking service health..."
    
    # Check container status
    print_status "Container status:"
    docker-compose ps
    
    # Check API health
    print_status "API health check..."
    if curl -f http://localhost:41300/health > /dev/null 2>&1; then
        print_success "API health check passed"
    else
        print_error "API health check failed"
        exit 1
    fi
    
    # Check Nginx health
    print_status "Nginx health check..."
    if curl -f http://localhost:40080/health > /dev/null 2>&1; then
        print_success "Nginx health check passed"
    else
        print_error "Nginx health check failed"
        exit 1
    fi
    
    # Check database connection through API
    print_status "Database connection test..."
    if curl -f http://localhost:41300/api/test-db > /dev/null 2>&1; then
        print_success "Database connection test passed"
    else
        print_error "Database connection test failed"
        exit 1
    fi
}

# Show service URLs
show_urls() {
    echo ""
    print_success "🎉 Deployment completed successfully!"
    echo ""
    echo "📊 Service URLs:"
    echo "   🌐 Web Dashboard: http://localhost:40080"
    echo "   🔍 API Health Check: http://localhost:41300/health"
    echo "   💊 Products: http://localhost:41300/api/products"
    echo "   👥 Customers: http://localhost:41300/api/customers"
    echo "   🔐 Auth: http://localhost:41300/api/auth"
    echo "   📊 pgAdmin: http://localhost:48080"
    echo ""
    echo "🔑 pgAdmin Credentials:"
    echo "   Email: admin@pharmacypos.com"
    echo "   Password: admin_password_2024"
    echo ""
    echo "📋 Useful Commands:"
    echo "   View logs: docker-compose logs -f"
    echo "   Stop services: docker-compose down"
    echo "   Restart API: docker-compose restart api"
    echo "   Restart Nginx: docker-compose restart nginx"
    echo "   Rebuild API: docker-compose up -d --build api"
    echo "   Rebuild Nginx: docker-compose up -d --build nginx"
}

# Main deployment function
main() {
    echo "🏥 Pharmacy POS System - Nginx + Node.js Deployment"
    echo "=================================================="
    echo ""
    
    check_docker
    check_docker_compose
    stop_containers
    deploy_services
    wait_for_services
    check_health
    show_urls
}

# Run main function
main "$@"
