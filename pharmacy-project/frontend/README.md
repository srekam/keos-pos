# Pharmacy Project - Frontend

## 🎨 **Frontend Architecture**

This directory contains all frontend-related components of the Pharmacy Management System, including React applications, UI components, styling, and frontend deployment configurations.

## 📁 **Directory Structure**

```
frontend/
├── 📁 src/                  # React source code
│   ├── 📁 components/       # Reusable UI components
│   ├── 📁 pages/            # Page components
│   ├── 📁 contexts/         # React context providers
│   ├── 📁 config/           # Configuration files
│   ├── 📁 lib/              # Utility libraries
│   ├── 📁 public/           # Static assets
│   └── 📄 App.tsx           # Main application component
├── 📁 build/                # Production build output
├── 📁 node_modules/         # Node.js dependencies
├── 📄 package.json          # Frontend dependencies and scripts
├── 📄 package-lock.json     # Locked dependency versions
├── 📄 tsconfig.json         # TypeScript configuration
├── 📄 tailwind.config.js    # Tailwind CSS configuration
├── 📄 postcss.config.js     # PostCSS configuration
├── 📄 Dockerfile            # Docker container configuration
├── 📄 .dockerignore         # Docker ignore file
├── 📄 nginx.conf            # Nginx configuration for frontend
├── 📄 nginx-backend.conf    # Nginx configuration for react-backend
├── 📄 env.production        # Production environment variables
├── 📄 env.development       # Development environment variables
├── 📄 deploy-frontend.sh    # Frontend deployment script
├── 📄 README.md             # This file
├── 📄 MACOS_MENU_DESIGN.md # macOS-style menu documentation
├── 📄 MENU_STRUCTURE.md     # Menu system documentation
├── 📄 SETTINGS_PAGE_IMPLEMENTATION.md # Settings page docs
├── 📄 EMPLOYEES_PAGE_IMPLEMENTATION.md # Employees page docs
├── 📄 PRODUCTS_PAGE_IMPLEMENTATION.md # Products page docs
├── 📄 INVENTORY_MANAGEMENT_PAGE_IMPLEMENTATION.md # Inventory docs
├── 📄 REPORTS_ANALYSIS_IMPLEMENTATION.md # Reports page docs
└── 📄 OWNER_ACCOUNT_IMPLEMENTATION.md # Owner/Account page docs
```

## 🚀 **Quick Start**

### **Prerequisites**
- Node.js (v16 or higher)
- npm or yarn package manager
- Docker (optional, for containerized deployment)

### **Installation**
```bash
cd frontend
npm install
```

### **Development Server**
```bash
npm start
# or
npm run dev
```

### **Build for Production**
```bash
npm run build
```

### **Type Checking**
```bash
npm run type-check
```

## 🎯 **React Applications**

### **Main Frontend (Port 40001)**
- **Route**: `/` (root)
- **Purpose**: Main pharmacy management interface
- **Features**: Dashboard, navigation, all management pages

### **React Backend (Port 40002)**
- **Route**: `/` (root)
- **Purpose**: Alternative frontend instance
- **Features**: Same functionality, different port for load balancing

## 🎨 **UI Components**

### **Core Components**
- **Button** - Reusable button component with variants
- **Input** - Form input fields with validation
- **Switch** - Toggle switch component
- **Label** - Form label component

### **Layout Components**
- **Dashboard** - Main dashboard layout
- **SidebarMenu** - Collapsible navigation menu
- **Breadcrumb** - Navigation breadcrumb component
- **MenuProvider** - Global menu state management

### **Page Components**
- **LoginForm** - Authentication form with glass morphism design
- **SettingsPage** - Comprehensive settings management
- **EmployeesPage** - Employee management with role system
- **ProductsPage** - Product catalog and management
- **InventoryManagementPage** - Stock and inventory management
- **ReportsPage** - Analytics and reporting interface
- **OwnerPage** - Account and profile management

## 🎨 **Design System**

### **Styling Framework**
- **Tailwind CSS** - Utility-first CSS framework
- **Custom Colors** - Pharmacy-themed color palette
- **Responsive Design** - Mobile-first approach
- **Glass Morphism** - Modern UI design elements

### **Theme Colors**
- **Primary**: Green (#16a34a, #15803d)
- **Secondary**: Blue (#3b82f6)
- **Accent**: Pink (#ec4899)
- **Neutral**: Gray scale (#f9fafb to #111827)

### **Typography**
- **Font Family**: System fonts (Inter, system-ui)
- **Font Weights**: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)
- **Text Sizes**: xs, sm, base, lg, xl, 2xl, 3xl

## 🔧 **Technical Features**

### **State Management**
- **React Context** - Global state for menu and navigation
- **useState Hooks** - Local component state
- **useEffect Hooks** - Side effects and lifecycle management

### **Routing**
- **React Router DOM** - Client-side routing
- **Protected Routes** - Authentication-based access control
- **Dynamic Routing** - Parameter-based page rendering

### **Form Handling**
- **Controlled Components** - React state-driven forms
- **Validation Ready** - Form validation framework
- **Edit Modes** - Toggle between view and edit states

## 🐳 **Docker Deployment**

### **Build and Run**
```bash
# Build frontend image
docker build -t pharmacy-frontend .

# Run container
docker run -p 40001:80 pharmacy-frontend
```

### **Using Docker Compose**
```bash
# From project root
docker-compose up frontend
docker-compose up react-backend
```

## 📱 **Responsive Design**

### **Breakpoints**
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

### **Mobile Features**
- **Collapsible Menu** - Touch-friendly navigation
- **Responsive Tables** - Scrollable data tables
- **Touch Targets** - Adequate button sizes
- **Mobile Navigation** - Optimized for small screens

## 🎯 **Key Features**

### **Navigation System**
- **Collapsible Sidebar** - macOS-style magnetic menu
- **Breadcrumb Navigation** - Clear navigation path
- **Quick Access Buttons** - Dashboard shortcuts
- **Responsive Menu** - Mobile-optimized navigation

### **Dashboard Interface**
- **Overview Cards** - Key metrics and statistics
- **Quick Actions** - Common task shortcuts
- **Recent Activity** - Latest system updates
- **Navigation Hub** - Central access point

### **Form Management**
- **Edit Modes** - Toggle between view and edit
- **Validation Ready** - Form validation framework
- **Auto-save** - Automatic data persistence
- **Cancel/Reset** - Form state management

## 🔗 **API Integration**

### **Backend Communication**
- **RESTful API** - Standard HTTP methods
- **Authentication** - JWT token management
- **Error Handling** - Graceful error display
- **Loading States** - User feedback during operations

### **Data Flow**
- **API Calls** - HTTP requests to backend
- **State Updates** - React state management
- **UI Updates** - Component re-rendering
- **Error Boundaries** - Error handling and recovery

## 📚 **Documentation Files**

### **Implementation Guides**
- **MACOS_MENU_DESIGN.md** - macOS-style menu implementation
- **MENU_STRUCTURE.md** - Menu system architecture
- **SETTINGS_PAGE_IMPLEMENTATION.md** - Settings page details
- **EMPLOYEES_PAGE_IMPLEMENTATION.md** - Employees page details
- **PRODUCTS_PAGE_IMPLEMENTATION.md** - Products page details
- **INVENTORY_MANAGEMENT_PAGE_IMPLEMENTATION.md** - Inventory details
- **REPORTS_ANALYSIS_IMPLEMENTATION.md** - Reports page details
- **OWNER_ACCOUNT_IMPLEMENTATION.md** - Owner/Account page details

## 🚀 **Deployment Scripts**

- **deploy-frontend.sh** - Automated frontend deployment
- **Dockerfile** - Container configuration
- **nginx.conf** - Web server configuration
- **nginx-backend.conf** - React backend configuration

## 🔄 **Integration Points**

The frontend is designed to work seamlessly with:
- **Backend API** (port 3000)
- **PostgreSQL Database**
- **Nginx Reverse Proxy**
- **Docker Containerization**

## 📞 **Support**

For frontend-related issues or questions, refer to:
1. This README.md file
2. Individual implementation documentation files
3. Component source code in `src/` directory
4. Tailwind CSS documentation

---

**Frontend Version**: 2.9  
**Last Updated**: August 16, 2025  
**React Version**: 18+  
**Node.js Version**: 16+  
**Ports**: 40001 (frontend), 40002 (react-backend)  
**Framework**: React + TypeScript + Tailwind CSS
