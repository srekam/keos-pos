#!/bin/bash

# Pharmacy POS Docker Performance Optimization Script
# This script optimizes Docker performance and cleans up resources

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Docker Performance Optimization${NC}"
echo -e "${BLUE}================================${NC}"

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

# Check Docker status
check_docker() {
    print_status "Checking Docker status..."
    if ! docker info > /dev/null 2>&1; then
        print_error "Docker is not running. Please start Docker first."
        exit 1
    fi
    print_success "Docker is running"
}

# Clean up Docker system
cleanup_docker() {
    print_status "Cleaning up Docker system..."
    
    # Remove unused containers
    print_status "Removing unused containers..."
    docker container prune -f
    
    # Remove unused images
    print_status "Removing unused images..."
    docker image prune -f
    
    # Remove unused volumes
    print_status "Removing unused volumes..."
    docker volume prune -f
    
    # Remove unused networks
    print_status "Removing unused networks..."
    docker network prune -f
    
    # Remove build cache
    print_status "Removing build cache..."
    docker builder prune -f
    
    print_success "Docker cleanup completed"
}

# Show current Docker usage
show_usage() {
    print_status "Current Docker system usage:"
    docker system df
    
    echo ""
    print_status "Current container status:"
    docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
}

# Optimize Docker daemon
optimize_daemon() {
    print_status "Optimizing Docker daemon configuration..."
    
    # Check if daemon.json exists
    if [ -f /etc/docker/daemon.json ]; then
        print_status "Docker daemon configuration found"
        cat /etc/docker/daemon.json
    else
        print_warning "Docker daemon configuration not found"
        print_status "Consider creating /etc/docker/daemon.json with:"
        echo '{
  "max-concurrent-downloads": 10,
  "max-concurrent-uploads": 5,
  "storage-driver": "overlay2",
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  }
}'
    fi
}

# Enable BuildKit
enable_buildkit() {
    print_status "Enabling Docker BuildKit..."
    
    # Set environment variables
    export DOCKER_BUILDKIT=1
    export COMPOSE_DOCKER_CLI_BUILD=1
    
    print_success "BuildKit enabled for this session"
    print_status "To make permanent, add to ~/.bashrc:"
    echo 'export DOCKER_BUILDKIT=1'
    echo 'export COMPOSE_DOCKER_CLI_BUILD=1'
}

# Show build performance tips
show_tips() {
    print_status "Build Performance Tips:"
    echo "1. Use .dockerignore files to reduce build context"
    echo "2. Order Dockerfile instructions from least to most frequently changing"
    echo "3. Use multi-stage builds for smaller final images"
    echo "4. Leverage Docker layer caching"
    echo "5. Use BuildKit for parallel builds"
    echo "6. Consider using docker-compose build --parallel"
}

# Main execution
main() {
    check_docker
    cleanup_docker
    show_usage
    optimize_daemon
    enable_buildkit
    show_tips
    
    echo ""
    print_success "Docker optimization completed!"
    print_status "You can now rebuild your containers with:"
    echo "  docker compose up -d --build"
}

# Run main function
main "$@"
