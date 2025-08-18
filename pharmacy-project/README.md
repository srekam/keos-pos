# 🏥 Pharmacy Management System

A comprehensive pharmacy management solution built with modern web technologies, featuring a React frontend and Node.js backend, all containerized with Docker for easy deployment and management.

## 🟢 **Current Status: All Systems Operational**

- ✅ **Backend API**: Running on port 3000 (Healthy)
- ✅ **PostgreSQL Database**: Running on port 5432 (Healthy)  
- ✅ **React Frontend**: Running on port 40001 (Healthy)
- ✅ **React Backend**: Running on port 40002 (Healthy)
- ✅ **pgAdmin**: Running on port 48080
- ✅ **Mock HTML Interface**: Running on port 40005 (Healthy)
- ✅ **Modern POS Interface**: Running on port 40006 (Healthy)
- 🔧 **Nginx**: Disabled (can be enabled via docker-compose.yml)

## 🏗️ **Project Architecture**

This project is organized into two main directories for better separation of concerns and easier management:

```
pharmacy-project/
├── 📁 backend/              # Backend API and services
│   ├── 📁 controllers/      # API route controllers
│   ├── 📁 database/         # Database scripts and schemas
│   ├── 📁 middleware/       # Express middleware
│   ├── 📁 routes/           # API route definitions
│   ├── 📄 server.js         # Main Express server
│   ├── 📄 package.json      # Backend dependencies
│   ├── 📄 Dockerfile        # Backend container config
│   └── 📄 README.md         # Backend documentation
├── 📁 frontend/             # React frontend applications
│   ├── 📁 src/              # React source code
│   ├── 📁 components/       # UI components
│   ├── 📁 pages/            # Page components
│   ├── 📄 package.json      # Frontend dependencies
│   ├── 📄 Dockerfile        # Frontend container config
│   └── 📄 README.md         # Frontend documentation
├── 📁 assets/                # Static assets and HTML templates
├── 📁 mock-pos/              # Modern POS frontend interface
│   ├── 📄 index.html         # Login/Shift Open screen
│   ├── 📄 pos-main.html      # Main POS interface
│   ├── 📄 checkout.html      # Payment processing
│   ├── 📄 refund.html        # Refund management
│   ├── 📄 shift-close.html   # Shift closing
│   ├── 📄 *.js               # JavaScript functionality
│   ├── 📁 src/               # Tailwind CSS source
│   ├── 📁 dist/              # Compiled CSS output
│   ├── 📄 tailwind.config.js # Tailwind CSS configuration
│   ├── 📄 package.json       # Dependencies
│   └── 📄 pos.md             # POS design requirements
├── 📄 docker-compose.yml     # Multi-service orchestration
├── 📄 deploy-nginx.sh        # Main deployment script
├── 📄 deploy-react-backend.sh # React backend deployment
└── 📄 README.md              # This file
```

## 🚀 **Quick Start**

### **Prerequisites**
- Docker and Docker Compose
- PostgreSQL database
- Node.js (for development)

### **1. Clone and Setup**
```bash
git clone <repository-url>
cd pharmacy-project
```

### **2. Start All Services**
```bash
# Start all services with Docker Compose
./deploy-nginx.sh

# Or start individual services
docker-compose up -d
```

### **3. Access Applications**
- **Main Frontend**: http://localhost:40001
- **React Backend**: http://localhost:40002
- **Mock UI Interface**: http://localhost:40005/mock-ui.html ⭐ **(New!)**
- **Backend Viewer**: http://localhost:40005/index.html
- **Modern POS Interface**: http://localhost:40006 ⭐ **(New!)**
- **Backend API**: http://localhost:3000 (internal)
- **Database**: PostgreSQL on port 5432

## 🎯 **Key Features**

### **🏥 Pharmacy Management**
- **Product Catalog**: Complete inventory management
- **Sales Processing**: Point of sale with cart functionality
- **Employee Management**: Role-based access control
- **Customer Records**: Patient and customer management
- **Inventory Tracking**: Stock management and alerts
- **Reporting**: Comprehensive analytics and reports

### **💳 Modern POS Interface (New!)**
- **Clean UI Design**: Modern Tailwind CSS-based interface
- **Login/Shift Management**: Secure cashier authentication and shift tracking
- **Product Search**: Barcode scanning, text search, and category filtering
- **Shopping Cart**: Interactive cart with quantity controls and real-time totals
- **Payment Processing**: Support for Cash, Card, and QR payment methods
- **Receipt Management**: Print and email receipt options
- **Refund System**: Easy receipt lookup and item-specific refunds
- **Shift Reporting**: Cash reconciliation and sales summaries

### **👥 User Management**
- **Role-Based Access**: Owner, Pharmacist, Administrator roles
- **Authentication**: Secure JWT-based login system
- **Permissions**: Granular access control
- **User Profiles**: Account management and settings

### **📊 Business Intelligence**
- **Sales Analytics**: Performance overview and trends
- **Inventory Reports**: Stock levels and movements
- **Employee Performance**: Work timing and productivity
- **Financial Reports**: Revenue and payment analysis

## 🏗️ **Service Architecture**

### **Backend Services**
- **Node.js API Server**: Express.js REST API
- **PostgreSQL Database**: Reliable data storage
- **Authentication Middleware**: JWT token management
- **API Routes**: RESTful endpoints for all operations

### **Frontend Services**
- **React Frontend (Port 40001)**: Main pharmacy interface
- **React Backend (Port 40002)**: Alternative frontend instance
- **Mock HTML Interface (Port 40005)**: Backend data visualization and API testing
- **Modern POS Interface**: Standalone Tailwind CSS-based POS system
- **Nginx Reverse Proxy**: Load balancing and SSL termination
- **Responsive Design**: Mobile-first approach

### **Infrastructure**
- **Docker Containers**: Isolated service environments
- **Nginx Configuration**: Reverse proxy and static file serving
- **Health Checks**: Service monitoring and auto-restart
- **Volume Mounting**: Persistent data storage

### **Mock HTML Interface (Port 40005)**
- **Purpose**: Comprehensive HTML interface suite for backend visualization and API testing
- **Main Interfaces**:
  - **Backend Viewer** (`/index.html`) - Real-time backend data and API testing
  - **Mock UI Interface** (`/mock-ui.html`) - Complete system architecture visualization
  - **Login Testing** (`/login.html`) - Authentication endpoint testing
- **Key Features**: 
  - 🏗️ **Complete System Architecture Visualization** - Interactive service diagram
  - 🗄️ **Database Schema Explorer** - Expandable table structures with field details
  - 🔗 **Interactive API Endpoint Testing** - Click-to-test with live responses
  - 📊 **Real-time System Health Monitoring** - All services status dashboard
  - 🎯 **Port Mapping Visualization** - Clear service-to-port relationships
  - 💼 **Feature Overview Dashboard** - Business capabilities showcase
  - 🔄 **Live Status Updates** - Automatic health checks and refresh
  - 📱 **Responsive Design** - Works on all devices
- **Technical Design**: Pure HTML/CSS/JavaScript (no dependencies)
- **API Proxy**: Seamless backend integration via Nginx routing

### **Modern POS Interface**
- **Purpose**: Professional point-of-sale system for retail/restaurant environments
- **Main Screens**:
  - **Login/Shift Open** (`/index.html`) - Cashier authentication and shift initialization
  - **Main POS Screen** (`/pos-main.html`) - Product search, cart management, and checkout
  - **Payment Processing** (`/checkout.html`) - Multiple payment methods and receipt options
  - **Refund Management** (`/refund.html`) - Receipt lookup and item-specific refunds
  - **Shift Close** (`/shift-close.html`) - Cash reconciliation and sales reporting
- **Key Features**: 
  - 🛒 **Interactive Shopping Cart** - Real-time item management with quantity controls
  - 🔍 **Advanced Product Search** - Barcode scanning, text search, category filtering
  - 💳 **Multi-Payment Support** - Cash (with change calculation), Card, QR payments
  - 📄 **Receipt System** - Print/email options with transaction tracking
  - 🔄 **Refund Processing** - Easy receipt lookup and selective item refunds
  - 📊 **Shift Management** - Opening/closing cash, sales summaries, variance tracking
  - 📱 **Responsive Design** - Optimized for tablets and desktop POS terminals
  - 🎨 **Professional UI** - Large buttons, clear typography, modern Tailwind CSS styling
- **Technical Stack**: HTML5, Tailwind CSS, Vanilla JavaScript (no framework dependencies)
- **Development**: Built with Tailwind CSS build system and npm scripts

## 🔧 **Technology Stack**

### **Backend**
- **Runtime**: Node.js with Express.js
- **Database**: PostgreSQL with pg library
- **Authentication**: JWT tokens with bcrypt
- **Validation**: Input sanitization and validation
- **CORS**: Cross-origin resource sharing

### **Frontend**
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom components
- **Routing**: React Router DOM
- **State Management**: React Context API
- **UI Components**: shadcn/ui component library
- **Icons**: Lucide React icon set

### **DevOps**
- **Containerization**: Docker with multi-stage builds
- **Orchestration**: Docker Compose
- **Web Server**: Nginx with reverse proxy
- **Deployment**: Automated shell scripts
- **Monitoring**: Health check endpoints

## 📱 **User Interface**

### **Design System**
- **Modern UI**: Clean, professional pharmacy interface
- **Glass Morphism**: Contemporary visual effects
- **Responsive Layout**: Works on all device sizes
- **Accessibility**: WCAG compliant components
- **Color Scheme**: Healthcare-appropriate palette

### **Navigation**
- **Collapsible Sidebar**: macOS-style magnetic menu
- **Breadcrumb Navigation**: Clear navigation path
- **Quick Actions**: Dashboard shortcuts
- **Mobile Optimized**: Touch-friendly interface

### **Key Pages**
- **Dashboard**: Overview with metrics and quick actions
- **Login**: Secure authentication with glass morphism
- **Settings**: Comprehensive system configuration
- **Employees**: Staff management with role system
- **Products**: Inventory and catalog management
- **Inventory**: Stock and supply chain management
- **Reports**: Analytics and business intelligence
- **Owner/Account**: Profile and account management

## 🐳 **Docker Services**

### **Service Configuration**
```yaml
services:
  api:                    # Node.js backend API
    ports: ["3000:3000"]
    
  frontend:              # React main frontend
    ports: ["40001:80"]
    
  react-backend:         # React alternative frontend
    ports: ["40002:80"]
    
  postgres:              # PostgreSQL database
    ports: ["5432:5432"]
    
  mock-html:             # HTML mock data interface
    ports: ["40005:80"]
    
  mock-pos:              # Modern POS interface
    ports: ["40006:80"]
    
  nginx:                 # Reverse proxy and load balancer
    ports: ["80:80", "443:443"]
```

### **Deployment Options**
- **Full Stack**: All services with `./deploy-nginx.sh`
- **Frontend Only**: React apps with `./deploy-react-backend.sh`
- **Individual Services**: `docker-compose up [service-name]`
- **Development Mode**: Local development setup

## 📊 **Database Schema**

### **Core Tables**
- **users**: Authentication and user profiles
- **products**: Product catalog and inventory
- **sales**: Transaction records and history
- **employees**: Staff management and roles
- **categories**: Product classification
- **suppliers**: Vendor information
- **customers**: Patient and customer records

### **Relationships**
- **One-to-Many**: Users to Sales, Products to Sales
- **Many-to-Many**: Products to Categories
- **Hierarchical**: Employee roles and permissions

## 🔒 **Security Features**

### **Authentication & Authorization**
- **JWT Tokens**: Secure session management
- **Password Hashing**: bcrypt with salt rounds
- **Role-Based Access**: Granular permission system
- **Session Management**: Secure token storage

### **Data Protection**
- **Input Validation**: SQL injection prevention
- **CORS Configuration**: Controlled cross-origin access
- **Environment Variables**: Secure configuration management
- **HTTPS Ready**: SSL/TLS configuration support

## 🚀 **Deployment**

### **Production Deployment**
```bash
# 1. Set environment variables
cp backend/env.production backend/.env
# Edit .env with your production values

# 2. Deploy all services
./deploy-nginx.sh

# 3. Verify deployment
docker-compose ps
curl http://localhost/health
```

### **Development Setup**
```bash
# Backend development
cd backend
npm install
npm start

# Frontend development
cd frontend
npm install
npm start
```

### **Environment Configuration**
- **Development**: Local development with hot reload
- **Production**: Optimized builds with Docker
- **Staging**: Production-like environment for testing

## 📚 **Documentation**

### **Backend Documentation**
- **API Endpoints**: Complete REST API reference
- **Database Schema**: Table structures and relationships
- **Authentication**: JWT implementation details
- **Deployment**: Docker and production setup

### **Frontend Documentation**
- **Component Library**: UI component documentation
- **Page Implementations**: Detailed page guides
- **Navigation System**: Menu and routing documentation
- **Design System**: Styling and theming guide

### **Implementation Guides**
- **Settings Page**: Complete settings implementation
- **Employees Page**: Staff management system
- **Products Page**: Inventory management
- **Inventory Management**: Stock control system
- **Reports Page**: Analytics and reporting
- **Owner/Account Page**: Profile management

## 🧪 **Testing & Quality**

### **Testing Strategy**
- **Unit Tests**: Component and function testing
- **Integration Tests**: API endpoint testing
- **End-to-End Tests**: Complete user workflow testing
- **Performance Tests**: Load and stress testing

### **Code Quality**
- **TypeScript**: Full type safety
- **ESLint**: Code style enforcement
- **Prettier**: Code formatting
- **Git Hooks**: Pre-commit quality checks

## 🔄 **API Integration**

### **RESTful Endpoints**
- **Authentication**: `/api/auth/*`
- **Products**: `/api/products/*`
- **Sales**: `/api/sales/*`
- **Employees**: `/api/employees/*`
- **Inventory**: `/api/inventory/*`
- **Reports**: `/api/reports/*`

### **Data Formats**
- **Request**: JSON payloads
- **Response**: JSON with status codes
- **Authentication**: Bearer token headers
- **File Uploads**: Multipart form data

## 📱 **Mobile & Responsive**

### **Responsive Design**
- **Mobile First**: Touch-optimized interface
- **Breakpoints**: 640px, 1024px, 1280px
- **Flexible Layouts**: Adaptive grid systems
- **Touch Targets**: Adequate button sizes

### **Mobile Features**
- **Collapsible Navigation**: Space-efficient menus
- **Touch Gestures**: Swipe and tap interactions
- **Offline Support**: Service worker caching
- **Progressive Web App**: Installable web application

## 🚀 **Performance & Optimization**

### **Frontend Optimization**
- **Code Splitting**: Lazy-loaded components
- **Bundle Optimization**: Tree shaking and minification
- **Image Optimization**: WebP and responsive images
- **Caching Strategy**: Browser and service worker caching

### **Backend Optimization**
- **Database Indexing**: Optimized query performance
- **Connection Pooling**: Efficient database connections
- **Caching**: Redis integration ready
- **Load Balancing**: Multiple API instances

## 🔧 **Troubleshooting**

### **Common Issues**
- **Port Conflicts**: Check service port assignments
- **Database Connection**: Verify PostgreSQL credentials
- **Docker Issues**: Container startup and networking
- **Build Errors**: Node.js version compatibility
- **Nginx Port Mismatch**: Frontend services must listen on port 80 internally

### **Recent Fixes Applied**
- **Fixed nginx.conf port configuration**: Changed from port 40001/40002 to port 80 for internal container listening
- **Created separate Dockerfile.backend**: For react-backend service to use correct nginx configuration
- **Resolved Docker Compose ContainerConfig errors**: By cleaning up orphaned containers and rebuilding

### **Debug Commands**
```bash
# Check service status
docker-compose ps

# View service logs
docker-compose logs [service-name]

# Access container shell
docker-compose exec [service-name] sh

# Health check endpoints
curl http://localhost:3000/health          # Backend API
curl http://localhost:40001/health         # React Frontend
curl http://localhost:40002/health         # React Backend
curl http://localhost:40005/health         # Mock HTML Interface
curl http://localhost:40006/health         # Modern POS Interface

# Test database connection
curl http://localhost:3000/api/test-db

# Test API through mock interface
curl http://localhost:40005/api/test-db   # Via mock-html proxy

# Test login functionality
curl -X POST http://localhost:40005/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'

# Clean up and rebuild if needed
docker-compose down --remove-orphans
docker-compose up -d --build
```

## 🤝 **Contributing**

### **Development Workflow**
1. **Fork Repository**: Create your own fork
2. **Feature Branch**: Create feature-specific branches
3. **Code Standards**: Follow TypeScript and ESLint rules
4. **Testing**: Ensure all tests pass
5. **Documentation**: Update relevant documentation
6. **Pull Request**: Submit for review

### **Code Standards**
- **TypeScript**: Strict type checking enabled
- **ESLint**: Airbnb style guide
- **Prettier**: Consistent code formatting
- **Git Commits**: Conventional commit messages

## 📄 **License & Legal**

- **License**: MIT License
- **Copyright**: 2025 Pharmacy Management System
- **Contributors**: Development team and community
- **Third-Party**: Open source dependencies

## 📞 **Support & Community**

### **Getting Help**
- **Documentation**: Comprehensive guides and references
- **Issues**: GitHub issue tracking
- **Discussions**: Community forums and Q&A
- **Contributing**: Development guidelines and setup

### **Resources**
- **API Reference**: Complete endpoint documentation
- **Component Library**: UI component examples
- **Design System**: Visual design guidelines
- **Deployment Guide**: Production setup instructions

---

**Project Version**: 2.9.1 - Docker Issues Fixed  
**Last Updated**: August 17, 2025  
**Architecture**: Microservices with Docker  
**Frontend**: React + TypeScript + Tailwind CSS  
**Backend**: Node.js + Express + PostgreSQL  
**Deployment**: Docker + Nginx + Automated Scripts  
**Status**: ✅ All Docker services running successfully
