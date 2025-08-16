# Thai Pharmacy POS System

A modern, cloud-based Point of Sale system specifically designed for Thai pharmacies, built with Node.js backend and React Native mobile app.

## 📊 Current Project Status

**Last Updated**: August 2024  
**Development Phase**: Phase 1 - Database & Infrastructure  
**Current Status**: ✅ Database Complete, ✅ API Code Ready, 🚨 **DEPLOYMENT PENDING**

### 🎯 **IMMEDIATE NEXT ACTION REQUIRED**
**Deploy the Node.js API to the remote Docker server (10.5.50.48)**

### ✅ What's Completed
- **Database Schema**: Complete pharmacy POS database with 20+ tables
- **Docker Setup**: PostgreSQL + pgAdmin running locally
- **Sample Data**: 19 products, 8 customers, 5 prescriptions, 8 sales
- **Pharmacy Features**: Drug interactions, expiry tracking, prescriptions
- **Thai Market**: Local language support, PromptPay, VAT compliance

### 🚧 What's Next
- **Backend API**: Node.js Express server with authentication
- **Mobile App**: React Native app for tablets and phones
- **User Interface**: Login, dashboard, sales, inventory screens
- **Testing**: Database connection, API endpoints, mobile app

## 🏥 Features

### Core POS Functions
- **User Management** - Staff login, role-based access
- **Product Management** - Drug inventory, categories, pricing
- **Sales Processing** - Prescription and OTC sales
- **Customer Management** - Patient records and history
- **Inventory Tracking** - Stock levels, expiry dates, reorder alerts

### Pharmacy-Specific Features
- **Prescription Management** - Doctor orders, dosage tracking, refills
- **Drug Information** - Active ingredients, interactions, storage conditions
- **Patient Records** - Medical history, allergies, current medications
- **Expiry Tracking** - Batch management, expiration alerts
- **Thai Market Support** - Local language, PromptPay, VAT compliance

## 🚀 Technology Stack

### Backend
- **Node.js** - Server runtime
- **Express.js** - Web framework
- **PostgreSQL** - Primary database
- **JWT** - Authentication
- **Prisma** - Database ORM

### Mobile App
- **React Native** - Cross-platform mobile development
- **Redux Toolkit** - State management
- **SQLite** - Local offline storage
- **Native Base** - UI components

### Infrastructure
- **Cloud Hosting** - AWS/Google Cloud
- **Database** - Managed PostgreSQL
- **File Storage** - S3-compatible storage
- **CDN** - Content delivery network

## 📱 Screenshots

### Login Screen
- Clean, professional interface
- Role-based authentication
- Secure login system

### Main Dashboard
- Daily sales overview
- Quick access to key functions
- Real-time inventory status

### Sales Interface
- Product search and selection
- Prescription processing
- Multiple payment methods

## 🗄️ Database Schema

### Core Tables
- `users` - Staff and pharmacists
- `products` - Drugs and medications
- `categories` - Product classifications
- `inventory` - Stock management
- `customers` - Patient information
- `sales` - Transaction records
- `sale_items` - Individual sale items

### Pharmacy Tables
- `drug_details` - Medication information
- `prescriptions` - Doctor orders
- `prescription_items` - Prescription details
- `drug_expiry_tracking` - Expiration management

## 🛠️ Installation

### Prerequisites
- **Remote Docker Server**: Access to Docker server at `10.5.50.48`
- Node.js 18+ (for API development)
- React Native development environment

### Remote Development Setup
This project is configured for **remote development** where:
- **Your Development Machine**: `10.5.50.19` (Cursor app)
- **Docker Server**: `10.5.50.48` (Remote PostgreSQL + pgAdmin)
- **API Server**: Runs on your local machine, connects to remote database

**Configuration Files Updated**:
- `config.js`: Database host set to `10.5.50.48`
- `server.js`: API endpoints show correct local IP
- `docker-compose.yml`: Runs on remote server

### Current Docker Setup
The project is configured with Docker containers running on a **remote server**:

- **Remote Docker Server**: `10.5.50.48` (NOT localhost)
- **PostgreSQL Database**: Internal only (no port forwarding)
- **pgAdmin**: Web interface on port 48080
- **Node.js API**: Running on port 41300
- **Nginx Web**: Dashboard & API proxy on port 40080
- **Database**: `pharmacy_pos` with complete schema and sample data
- **Credentials**: See Docker section below

**⚠️ IMPORTANT**: This project uses a remote Docker server, not localhost!
**🚀 API**: The Node.js API runs in Docker on the remote server - no local resources needed!

### Docker Setup (Recommended for Development)
```bash
# Start all services (Database, pgAdmin, and API)
docker-compose up -d

# Check container status
docker-compose ps

# View logs for all services
docker-compose logs -f

# View logs for specific service
docker-compose logs -f api
docker-compose logs -f postgres
docker-compose logs -f pgadmin

# Stop all services
docker-compose down

# Rebuild and restart API only (after code changes)
docker-compose up -d --build api
```

### Database Access
- **PostgreSQL**: Internal access only (no external port)
- **Database**: pharmacy_pos
- **Username**: pharmacy_user
- **Password**: pharmacy_password_2024
- **pgAdmin**: http://10.5.50.48:48080 (admin@pharmacypos.com / admin_password_2024)

**⚠️ REMOTE ACCESS**: All Docker services run on remote server `10.5.50.48`

### Backend Setup (Docker-based - No Local Resources Needed!)

**🚀 The API runs in Docker on the remote server!**

```bash
# No local setup needed - everything runs on remote Docker server
# The API automatically connects to the PostgreSQL database

# To deploy API changes:
# 1. Update your code
# 2. Rebuild and restart the API container:
docker-compose up -d --build api

# To check API status:
curl http://10.5.50.48:3000/health

# To view API logs:
docker-compose logs -f api
```

**✅ Benefits of Docker-based API:**
- **Zero local resources** - API runs on remote server
- **Automatic scaling** - Easy to scale up/down
- **Consistent environment** - Same setup everywhere
- **Easy deployment** - Just rebuild container
- **Health monitoring** - Built-in health checks

### Mobile App Setup
```bash
cd mobile-app
npm install
npx react-native run-android
# or
npx react-native run-ios
```

## 📊 API Endpoints

**🌐 Base URL**: `http://10.5.50.48:41300`

### Health & Status
- `GET /health` - API health check
- `GET /api/test-db` - Database connection test

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/profile` - User profile

### Products
- `GET /api/products` - List all products
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/search/:query` - Search products
- `GET /api/products/category/:categoryId` - Get products by category
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Customers
- `GET /api/customers` - List all customers

### Sales
- `GET /api/sales` - List sales
- `POST /api/sales` - Create sale
- `GET /api/sales/:id` - Get sale details

### Prescriptions
- `GET /api/prescriptions` - List prescriptions
- `POST /api/prescriptions` - Create prescription
- `PUT /api/prescriptions/:id` - Update prescription

## 🔒 Security Features

- **JWT Authentication** - Secure token-based auth
- **Role-based Access** - Admin, Pharmacist, Assistant roles
- **Data Encryption** - Sensitive data protection
- **Audit Logging** - Track all system changes
- **Input Validation** - Prevent injection attacks

## 🌏 Thai Market Features

- **Local Language** - Thai and English support
- **PromptPay** - Local payment integration
- **VAT Compliance** - Thai tax calculations
- **Local Regulations** - FDA compliance features
- **Cultural Adaptation** - Thai business practices

## 📈 Business Benefits

### For Pharmacies
- **Increased Efficiency** - Faster prescription processing
- **Better Inventory** - Prevent stockouts and expiry
- **Patient Safety** - Drug interaction checking
- **Compliance** - Meet regulatory requirements
- **Analytics** - Business insights and reporting

### Revenue Model
- **Monthly Subscriptions** - $80-250/month per pharmacy
- **Hardware Sales** - Barcode scanners, printers, tablets
- **Training Services** - Staff onboarding and support
- **Custom Development** - Additional features and integrations

## 🚀 Docker Migration Guide

### Moving to Another Docker Environment

If you need to move this project to another Docker environment (different server, cloud provider, etc.), follow these steps:

#### 1. Export Current Database
```bash
# Export schema and data
docker exec pharmacy_pos_db pg_dump -U pharmacy_user -d pharmacy_pos > pharmacy_pos_backup.sql

# Export only schema (structure)
docker exec pharmacy_pos_db pg_dump -U pharmacy_user -d pharmacy_pos --schema-only > pharmacy_pos_schema.sql

# Export only data
docker exec pharmacy_pos_db pg_dump -U pharmacy_user -d pharmacy_pos --data-only > pharmacy_pos_data.sql
```

#### 2. Update Docker Configuration
- Modify `docker-compose.yml` for new environment
- Update ports if needed
- Adjust volume paths for new system
- Update environment variables

#### 3. Import to New Environment
```bash
# Start new PostgreSQL container
docker-compose up -d postgres

# Wait for container to be ready
docker-compose logs -f postgres

# Import data
docker exec -i pharmacy_pos_db psql -U pharmacy_user -d pharmacy_pos < pharmacy_pos_backup.sql
```

#### 4. Verify Migration
```bash
# Test connection
docker exec pharmacy_pos_db psql -U pharmacy_user -d pharmacy_pos -c "SELECT COUNT(*) FROM products;"

# Check sample data
docker exec pharmacy_pos_db psql -U pharmacy_user -d pharmacy_pos -c "SELECT name, price FROM products LIMIT 5;"
```

### Environment Variables
Key variables to update when migrating:
- `POSTGRES_PASSWORD`: Database password
- Port mappings (if different ports needed)
- Volume paths (for different file systems)
- Network configurations

## 🚧 Development Roadmap

### Phase 1: Core POS (Weeks 1-4) - **IN PROGRESS**
- [x] Database schema design
- [x] PostgreSQL database setup with Docker
- [x] Complete database schema with pharmacy tables
- [x] Sample data (19 products, 8 customers, 5 prescriptions, 8 sales)
- [x] Database views and functions for pharmacy operations
- [x] Node.js API structure created
- [x] Docker configuration for API service
- [x] Basic API endpoints (health, products, customers)
- [ ] **🚨 DEPLOY API TO REMOTE SERVER** ← **NEXT PRIORITY**
- [ ] User authentication system
- [ ] Basic product management
- [ ] Simple sales interface

### Phase 2: Pharmacy Features (Weeks 5-8)
- [ ] Patient management system
- [ ] Prescription processing
- [ ] Drug expiry tracking
- [ ] Basic reporting

### Phase 3: Advanced Features (Weeks 9-12)
- [ ] Drug interaction checking
- [ ] Advanced analytics
- [ ] Multi-location support
- [ ] Thai language support

### Phase 4: Compliance & Integration (Weeks 13-16)
- [ ] Thai FDA compliance
- [ ] Insurance integration
- [ ] Advanced reporting
- [ ] API for external systems

## 🚀 Quick Deployment Guide

### Deploy API to Remote Docker Server

**⚠️ CURRENT STATUS**: API configured for Docker but not yet deployed to remote server

**📋 NEXT STEPS REQUIRED**:

**1. Copy Project to Remote Server**
```bash
# Copy project files to remote Docker server (10.5.50.48)
scp -r /home/srekam/pharmacy-project user@10.5.50.48:/path/to/destination/

# OR use rsync (more efficient)
rsync -avz --exclude 'node_modules' --exclude '.git' /home/srekam/pharmacy-project/ user@10.5.50.48:/path/to/destination/pharmacy-project/
```

**2. Deploy on Remote Server**
```bash
# SSH to remote server
ssh user@10.5.50.48

# Navigate to project directory
cd /path/to/pharmacy-project

# Make deployment script executable
chmod +x deploy.sh

# Deploy everything (Database + pgAdmin + API)
./deploy.sh
```

**2. Check Service Status**
```bash
docker-compose ps
# Should show: postgres, pgadmin, and api containers running
```

**3. Test API Endpoints**
```bash
# Health check
curl http://10.5.50.48:3000/health

# Test database connection
curl http://10.5.50.48:3000/api/test-db

# List products
curl http://10.5.50.48:3000/api/products
```

**4. Deploy Code Changes**
```bash
# Option 1: Manual deployment
docker-compose up -d --build api

# Option 2: Use deployment script (recommended)
./deploy.sh

# Check logs for any errors
docker-compose logs -f api
```

**5. Verify Deployment**
```bash
# Check all containers are running
docker-compose ps

# Test API endpoints
curl http://10.5.50.48:3000/health
curl http://10.5.50.48:3000/api/test-db
curl http://10.5.50.48:3000/api/products
```

## 📋 **NEXT DEVELOPMENT PHASES**

### **Phase 1A: API Deployment & Testing (Current Priority)**
- [ ] **🚨 DEPLOY API TO REMOTE SERVER** ← **IMMEDIATE ACTION REQUIRED**
- [ ] Test all API endpoints on remote server
- [ ] Verify database connectivity from Docker containers
- [ ] Test pgAdmin access and database management
- [ ] Document API usage and testing procedures

### **Phase 1B: Core API Features (After Deployment)**
- [ ] Implement user authentication (JWT)
- [ ] Add product CRUD operations (POST, PUT, DELETE)
- [ ] Add customer management endpoints
- [ ] Implement basic sales processing
- [ ] Add inventory tracking endpoints

### **Phase 1C: Pharmacy-Specific Features**
- [ ] Prescription management API
- [ ] Drug expiry tracking endpoints
- [ ] Drug interaction checking
- [ ] Patient record management
- [ ] Basic reporting endpoints

### **Phase 2: Frontend Development**
- [ ] React Native mobile app setup
- [ ] Basic login and dashboard screens
- [ ] Product catalog interface
- [ ] Sales processing UI
- [ ] Customer management screens

## 🔧 Troubleshooting Remote Development

### Common Issues & Solutions

**❌ "Connection refused" or "Cannot connect to database"**
- **Problem**: Trying to connect to `localhost:5432` instead of remote server
- **Solution**: Ensure `config.js` has `host: '10.5.50.48'`
- **Check**: Run `docker-compose ps` on remote server to verify containers are running

**❌ "pgAdmin not accessible"**
- **Problem**: Trying to access `localhost:8080` instead of remote server
- **Solution**: Use `http://10.5.50.48:8080` for pgAdmin access
- **Check**: Verify firewall allows access to remote server ports

**❌ "API server can't start"**
- **Problem**: Port conflicts or network issues
- **Solution**: Check if port 3000 is available on your local machine
- **Check**: Ensure your machine can reach `10.5.50.48:5432`

**✅ Verification Commands**
```bash
# Check remote Docker status
ssh user@10.5.50.48 "cd /path/to/pharmacy-project && docker-compose ps"

# Test database connection from your machine
docker exec pharmacy_pos_db pg_isready -U pharmacy_user -d pharmacy_pos

# Test API server locally
curl http://10.5.50.19:43000/health
```

## 🚀 **QUICK ACTION CHECKLIST**

### **Right Now - Deploy API to Remote Server:**
1. **📁 Copy project to remote server (10.5.50.48)**
2. **🔧 Run deployment script: `./deploy.sh`**
3. **✅ Verify all containers are running**
4. **🧪 Test API endpoints**

### **After Deployment - Next Development:**
1. **🔐 Implement user authentication**
2. **💊 Add product management endpoints**
3. **👥 Expand customer management**
4. **💰 Add sales processing API**
5. **📱 Start React Native mobile app**

### **Current Blockers:**
- ❌ **API not deployed to remote server yet**
- ❌ **Need to copy project files to 10.5.50.48**
- ❌ **Docker containers not running on remote server**

**🎯 Priority: Get the API running on the remote Docker server first!**

## 🤝 Contributing

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

- **Email**: support@thaipharmacypos.com
- **Phone**: +66-2-XXX-XXXX
- **Documentation**: [docs.thaipharmacypos.com](https://docs.thaipharmacypos.com)

## 🙏 Acknowledgments

- **Demasylabs** - Base POS system inspiration
- **Thai Pharmacy Community** - Industry insights and feedback
- **Open Source Community** - Tools and libraries used

---

**Built with ❤️ for Thai Pharmacies**
