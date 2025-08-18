# Pharmacy POS - Docker Deployment Guide

## 🐳 Docker Support for Node.js API

This guide covers the complete Docker setup for the Pharmacy POS Node.js API service.

## 🎯 **Port Configuration**

| Service | Internal Port | External Port | Purpose |
|---------|---------------|---------------|---------|
| **PostgreSQL** | 5432 | **None** | Database (internal only) |
| **pgAdmin** | 80 | **48080** | Database management |
| **Node.js API** | 3000 | **43000** | REST API endpoints |

## 🚀 **Quick Start**

### **1. Deploy Everything (Recommended)**
```bash
# Deploy all services with health checks
npm run docker-deploy
```

### **2. Manual Deployment**
```bash
# Start all services
npm run docker-up

# Build API image
npm run docker-build

# View logs
npm run docker-logs
```

## 🔧 **Docker Configuration Files**

### **Dockerfile**
- **Base Image**: Node.js 18 Alpine (lightweight)
- **Security**: Non-root user (nodejs:1001)
- **Health Check**: Built-in health monitoring
- **Signal Handling**: dumb-init for proper shutdown

### **docker-compose.yml**
- **PostgreSQL**: Internal database service
- **pgAdmin**: Database management interface
- **Node.js API**: Main application service
- **Networks**: Isolated pharmacy_network
- **Volumes**: Persistent data storage

### **.dockerignore**
- Excludes unnecessary files from build context
- Optimizes build performance
- Improves security (no sensitive files)

## 📋 **Available Commands**

### **NPM Scripts**
```bash
# Deployment
npm run docker-deploy      # Full deployment with health checks
npm run docker-up         # Start all services
npm run docker-down       # Stop all services
npm run docker-build      # Rebuild API image
npm run docker-restart    # Restart all services
npm run docker-clean      # Clean up volumes and containers
npm run docker-logs       # View service logs
```

### **Direct Docker Commands**
```bash
# Service management
docker-compose up -d              # Start in background
docker-compose down               # Stop services
docker-compose restart api        # Restart API only
docker-compose logs -f api        # Follow API logs

# Image management
docker-compose build api          # Build API image
docker-compose build --no-cache  # Force rebuild
docker image prune               # Clean unused images

# Container management
docker-compose ps                 # Show status
docker-compose exec api sh        # Access API container
docker-compose exec postgres psql # Access database
```

## 🌐 **Service URLs**

### **Local Development**
- **API Base**: http://localhost:43000
- **Health Check**: http://localhost:43000/health
- **pgAdmin**: http://localhost:48080

### **Remote Server (10.5.50.48)**
- **API Base**: http://10.5.50.48:43000
- **Health Check**: http://10.5.50.48:43000/health
- **pgAdmin**: http://10.5.50.48:48080

## 🔒 **Security Features**

### **Container Security**
- Non-root user execution
- Minimal base image (Alpine)
- No unnecessary packages
- Proper signal handling

### **Network Security**
- Isolated Docker network
- No direct database access
- Internal service communication
- Port range isolation (40001-41001)

### **Data Security**
- Encrypted passwords (bcrypt)
- JWT token authentication
- Role-based access control
- Input validation

## 📊 **Health Monitoring**

### **Built-in Health Checks**
```yaml
# PostgreSQL
healthcheck:
  test: ["CMD-SHELL", "pg_isready -U pharmacy_user -d pharmacy_pos"]
  interval: 30s
  timeout: 10s
  retries: 3

# Node.js API
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"
```

### **Manual Health Checks**
```bash
# API health
curl http://localhost:43000/health

# Database connection
curl http://localhost:43000/api/test-db

# Container status
docker-compose ps
```

## 🚨 **Troubleshooting**

### **Common Issues**

**❌ "Port already in use"**
```bash
# Check what's using the port
sudo netstat -tulpn | grep :43000

# Kill the process or change port in docker-compose.yml
```

**❌ "Database connection failed"**
```bash
# Check PostgreSQL container
docker-compose logs postgres

# Check network connectivity
docker-compose exec api ping postgres
```

**❌ "API won't start"**
```bash
# Check API logs
docker-compose logs api

# Check environment variables
docker-compose exec api env | grep DB_
```

### **Debug Commands**
```bash
# View all logs
docker-compose logs -f

# Check container resources
docker stats

# Inspect container
docker-compose exec api sh

# Check network
docker network ls
docker network inspect pharmacy-project_pharmacy_network
```

## 🔄 **Development Workflow**

### **1. Code Changes**
```bash
# Make your code changes
# Then rebuild and restart API
npm run docker-build
npm run docker-restart
```

### **2. Database Changes**
```bash
# Access database via pgAdmin
# Or directly via container
docker-compose exec postgres psql -U pharmacy_user -d pharmacy_pos
```

### **3. Environment Changes**
```bash
# Update env.production file
# Rebuild and restart
npm run docker-build
npm run docker-restart
```

## 📈 **Performance Optimization**

### **Build Optimization**
- Multi-stage builds (if needed)
- Layer caching
- Minimal dependencies
- Alpine base image

### **Runtime Optimization**
- Health check intervals
- Resource limits
- Log rotation
- Volume management

## 🚀 **Production Deployment**

### **Environment Variables**
```bash
# Copy production environment
cp env.production .env

# Or set directly in docker-compose.yml
environment:
  - NODE_ENV=production
  - DB_HOST=postgres
  - JWT_SECRET=your_secure_secret
```

### **Resource Limits**
```yaml
# Add to docker-compose.yml if needed
deploy:
  resources:
    limits:
      memory: 512M
      cpus: '0.5'
```

### **Monitoring**
```bash
# Resource usage
docker stats

# Log monitoring
docker-compose logs -f --tail=100

# Health status
curl http://localhost:43000/health
```

## 📚 **Additional Resources**

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Reference](https://docs.docker.com/compose/)
- [Node.js Docker Best Practices](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)
- [PostgreSQL Docker](https://hub.docker.com/_/postgres)

---

**🏥 Built for Thai Pharmacies with Docker & Node.js**
