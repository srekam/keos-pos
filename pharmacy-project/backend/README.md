# Pharmacy Project - Backend

## 🏗️ **Backend Architecture**

This directory contains all backend-related components of the Pharmacy Management System, including the Node.js API server, database configurations, Docker configurations, and deployment scripts.

## 📁 **Directory Structure**

```
backend/
├── 📁 controllers/          # API route controllers
├── 📁 database/             # Database-related files and scripts
├── 📁 middleware/           # Express middleware functions
├── 📁 node_modules/         # Node.js dependencies
├── 📁 routes/               # API route definitions
├── 📄 config.js             # Database and application configuration
├── 📄 server.js             # Main Express server file
├── 📄 package.json          # Node.js dependencies and scripts
├── 📄 package-lock.json     # Locked dependency versions
├── 📄 database_schema.sql   # PostgreSQL database schema
├── 📄 env.production        # Production environment variables
├── 📄 .dockerignore         # Docker ignore file
├── 📄 Dockerfile            # Docker container configuration
├── 📄 nginx.conf            # Nginx configuration for backend
├── 📄 docker-deploy.sh      # Docker deployment script
├── 📄 optimize-docker.sh    # Docker optimization script
├── 📄 load_mock_products.sh # Database seeding script
├── 📄 test_connection.js    # Database connection test
├── 📄 test_login.js         # Login functionality test
├── 📄 create_admin_user.js  # Admin user creation script
├── 📄 setup_database.bat    # Windows database setup script
├── 📄 DOCKER_README.md      # Docker deployment documentation
├── 📄 DOCKER_MIGRATION_PROMPT.md # Docker migration guide
├── 📄 project_structure.md  # Project structure documentation
└── 📄 pharmacy_pos_schema_analysis.md # Database schema analysis
```

## 🚀 **Quick Start**

### **Prerequisites**
- Node.js (v14 or higher)
- PostgreSQL database
- Docker (optional, for containerized deployment)

### **Installation**
```bash
cd backend
npm install
```

### **Configuration**
1. Copy `env.production` to `.env` and update values
2. Update `config.js` with your database credentials
3. Ensure PostgreSQL is running and accessible

### **Database Setup**
```bash
# Run database schema
psql -U your_username -d your_database -f database_schema.sql

# Create admin user
node create_admin_user.js

# Test database connection
node test_connection.js
```

### **Start Development Server**
```bash
npm start
# or
node server.js
```

## 🔧 **API Endpoints**

### **Authentication**
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/verify` - Verify authentication token

### **Products**
- `GET /api/products` - Get all products
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### **Sales**
- `GET /api/sales` - Get sales records
- `POST /api/sales` - Create new sale
- `GET /api/sales/:id` - Get specific sale

### **Employees**
- `GET /api/employees` - Get all employees
- `POST /api/employees` - Create new employee
- `PUT /api/employees/:id` - Update employee
- `DELETE /api/employees/:id` - Delete employee

## 🐳 **Docker Deployment**

### **Build and Run**
```bash
# Build backend image
docker build -t pharmacy-backend .

# Run container
docker run -p 3000:3000 pharmacy-backend
```

### **Using Docker Compose**
```bash
# From project root
docker-compose up backend
```

## 📊 **Database Schema**

The system uses PostgreSQL with the following main tables:
- `users` - User authentication and profiles
- `products` - Product catalog and inventory
- `sales` - Sales transactions and history
- `employees` - Employee management
- `categories` - Product categorization
- `suppliers` - Supplier information

## 🔒 **Security Features**

- JWT-based authentication
- Password hashing with bcrypt
- Input validation and sanitization
- CORS configuration
- Rate limiting (configurable)

## 📝 **Environment Variables**

Create a `.env` file with the following variables:
```env
NODE_ENV=development
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=pharmacy_db
DB_USER=your_username
DB_PASSWORD=your_password
JWT_SECRET=your_jwt_secret
```

## 🧪 **Testing**

### **Test Database Connection**
```bash
node test_connection.js
```

### **Test Login Functionality**
```bash
node test_login.js
```

## 📚 **Documentation Files**

- **DOCKER_README.md** - Complete Docker deployment guide
- **DOCKER_MIGRATION_PROMPT.md** - Migration instructions
- **project_structure.md** - Detailed project architecture
- **pharmacy_pos_schema_analysis.md** - Database design analysis

## 🚀 **Deployment Scripts**

- **docker-deploy.sh** - Automated Docker deployment
- **optimize-docker.sh** - Docker image optimization
- **load_mock_products.sh** - Database seeding

## 🔄 **API Integration**

The backend API is designed to work seamlessly with:
- React frontend (port 40001)
- React backend (port 40002)
- Nginx reverse proxy
- PostgreSQL database

## 📞 **Support**

For backend-related issues or questions, refer to:
1. This README.md file
2. Individual documentation files in this directory
3. API endpoint documentation above
4. Database schema files

---

**Backend Version**: 2.9  
**Last Updated**: August 16, 2025  
**Node.js Version**: 14+  
**Database**: PostgreSQL  
**API Port**: 3000 (internal) / 40001-40002 (external)
