#!/bin/bash

# Pharmacy POS Frontend Deployment Script
# Follows port configuration: 40000-45000 range

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
FRONTEND_PORT=40001
API_PORT=41300
DOCKER_SERVER_IP="10.5.50.48"
LOCAL_IP="10.5.50.19"

echo -e "${BLUE}🏥 Pharmacy POS Frontend Deployment${NC}"
echo -e "${BLUE}================================${NC}"

# Check if we're on the right machine
CURRENT_IP=$(hostname -I | awk '{print $1}')
echo -e "${YELLOW}Current IP: ${CURRENT_IP}${NC}"

if [[ "$CURRENT_IP" == *"$DOCKER_SERVER_IP"* ]]; then
    echo -e "${GREEN}✅ Running on Docker server (${DOCKER_SERVER_IP})${NC}"
    ENVIRONMENT="production"
    API_URL="http://localhost:${API_PORT}"
elif [[ "$CURRENT_IP" == *"$LOCAL_IP"* ]]; then
    echo -e "${GREEN}✅ Running on development machine (${LOCAL_IP})${NC}"
    ENVIRONMENT="development"
    API_URL="http://${DOCKER_SERVER_IP}:${API_PORT}"
else
    echo -e "${YELLOW}⚠️  Running on unknown machine, using development config${NC}"
    ENVIRONMENT="development"
    API_URL="http://${DOCKER_SERVER_IP}:${API_PORT}"
fi

echo -e "${BLUE}Environment: ${ENVIRONMENT}${NC}"
echo -e "${BLUE}Frontend Port: ${FRONTEND_PORT}${NC}"
echo -e "${BLUE}API URL: ${API_URL}${NC}"

# Check if port is available
if lsof -Pi :${FRONTEND_PORT} -sTCP:LISTEN -t >/dev/null ; then
    echo -e "${RED}❌ Port ${FRONTEND_PORT} is already in use!${NC}"
    echo -e "${YELLOW}Available ports in range 40000-45000:${NC}"
    for port in {40000..45000}; do
        if ! lsof -Pi :$port -sTCP:LISTEN -t >/dev/null ; then
            echo -e "${GREEN}  ✅ Port ${port} is available${NC}"
        fi
    done
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed!${NC}"
    echo -e "${YELLOW}Please install Node.js first:${NC}"
    echo -e "${BLUE}  curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -${NC}"
    echo -e "${BLUE}  sudo apt-get install -y nodejs${NC}"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is not installed!${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Node.js and npm are available${NC}"

# Install dependencies
echo -e "${BLUE}📦 Installing dependencies...${NC}"
npm install

# Set environment variables
export REACT_APP_API_URL="${API_URL}"
export REACT_APP_ENVIRONMENT="${ENVIRONMENT}"
export PORT="${FRONTEND_PORT}"

echo -e "${GREEN}✅ Dependencies installed${NC}"
echo -e "${GREEN}✅ Environment configured${NC}"

# Build the app
echo -e "${BLUE}🔨 Building the app...${NC}"
npm run build

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Build successful${NC}"
else
    echo -e "${RED}❌ Build failed${NC}"
    exit 1
fi

# Start the app
echo -e "${BLUE}🚀 Starting the frontend...${NC}"
echo -e "${GREEN}✅ Frontend will be available at:${NC}"
echo -e "${BLUE}  🌐 http://${CURRENT_IP}:${FRONTEND_PORT}${NC}"
echo -e "${BLUE}  🔌 API: ${API_URL}${NC}"
echo -e "${YELLOW}Press Ctrl+C to stop the server${NC}"

# Start the development server
npm start
