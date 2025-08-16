# Thai Pharmacy POS - Project Structure

## 📁 Directory Organization

```
thai-pharmacy-pos/
├── 📁 backend/                    # Node.js API Server
│   ├── 📁 src/
│   │   ├── 📁 controllers/        # API route handlers
│   │   ├── 📁 models/             # Database models
│   │   ├── 📁 routes/             # API endpoints
│   │   ├── 📁 middleware/         # Authentication, validation
│   │   ├── 📁 services/           # Business logic
│   │   ├── 📁 utils/              # Helper functions
│   │   └── 📁 config/             # Configuration files
│   ├── 📁 prisma/                 # Database schema & migrations
│   ├── 📁 tests/                  # API tests
│   ├── package.json
│   └── server.js
│
├── 📁 mobile-app/                 # React Native Mobile App
│   ├── 📁 src/
│   │   ├── 📁 components/         # Reusable UI components
│   │   ├── 📁 screens/            # App screens
│   │   ├── 📁 navigation/         # Navigation setup
│   │   ├── 📁 store/              # Redux state management
│   │   ├── 📁 services/           # API calls
│   │   ├── 📁 utils/              # Helper functions
│   │   └── 📁 assets/             # Images, icons, fonts
│   ├── 📁 android/                # Android-specific files
│   ├── 📁 ios/                    # iOS-specific files
│   └── package.json
│
├── 📁 database/                    # Database files
│   ├── schema.sql                  # Main database schema
│   ├── migrations/                 # Database changes
│   └── seeds/                      # Sample data
│
├── 📁 docs/                        # Documentation
│   ├── api-docs.md                 # API documentation
│   ├── database-design.md          # Database design notes
│   └── deployment-guide.md         # Deployment instructions
│
├── 📁 scripts/                     # Utility scripts
│   ├── setup-database.sh           # Database setup
│   ├── deploy.sh                   # Deployment script
│   └── backup.sh                   # Backup script
│
└── README.md                       # Project overview
```

## 🏗️ Backend Structure

### Controllers
```
📁 controllers/
├── authController.js        # Login, logout, user management
├── productController.js     # Product CRUD operations
├── inventoryController.js   # Stock management
├── salesController.js       # Sales transactions
├── prescriptionController.js # Prescription management
├── customerController.js    # Patient management
└── reportController.js      # Analytics and reporting
```

### Models
```
📁 models/
├── User.js                  # Staff/pharmacist users
├── Product.js               # Drugs and medications
├── Category.js              # Product categories
├── Inventory.js             # Stock levels
├── Customer.js              # Patient information
├── Sale.js                  # Sales transactions
├── Prescription.js          # Doctor orders
└── DrugInteraction.js       # Drug safety
```

### Routes
```
📁 routes/
├── auth.js                  # Authentication endpoints
├── products.js              # Product management
├── inventory.js             # Stock operations
├── sales.js                 # Sales processing
├── prescriptions.js         # Prescription handling
├── customers.js             # Patient management
├── reports.js               # Analytics endpoints
└── index.js                 # Route registration
```

## 📱 Mobile App Structure

### Screens
```
📁 screens/
├── 📁 Auth/
│   ├── LoginScreen.js       # User login
│   └── SplashScreen.js      # App loading
├── 📁 Dashboard/
│   ├── DashboardScreen.js   # Main dashboard
│   └── StatsScreen.js       # Sales statistics
├── 📁 Sales/
│   ├── SalesScreen.js       # Sales interface
│   ├── CartScreen.js        # Shopping cart
│   └── PaymentScreen.js     # Payment processing
├── 📁 Products/
│   ├── ProductListScreen.js # Product catalog
│   ├── ProductDetailScreen.js # Product information
│   └── AddProductScreen.js  # Add new products
├── 📁 Inventory/
│   ├── InventoryScreen.js   # Stock management
│   ├── StockInScreen.js     # Receive stock
│   └── StockOutScreen.js    # Issue stock
├── 📁 Prescriptions/
│   ├── PrescriptionListScreen.js # Prescription list
│   ├── PrescriptionDetailScreen.js # Prescription details
│   └── AddPrescriptionScreen.js # New prescription
├── 📁 Customers/
│   ├── CustomerListScreen.js # Patient list
│   ├── CustomerDetailScreen.js # Patient information
│   └── AddCustomerScreen.js  # New patient
└── 📁 Settings/
    ├── SettingsScreen.js    # App settings
    ├── UserProfileScreen.js # User profile
    └── SystemSettingsScreen.js # System configuration
```

### Components
```
📁 components/
├── 📁 Common/
│   ├── Button.js            # Reusable buttons
│   ├── Input.js             # Form inputs
│   ├── Card.js              # Content cards
│   └── Modal.js             # Popup modals
├── 📁 Forms/
│   ├── ProductForm.js       # Product entry form
│   ├── SaleForm.js          # Sales form
│   └── PrescriptionForm.js  # Prescription form
├── 📁 Tables/
│   ├── ProductTable.js      # Product listing
│   ├── SalesTable.js        # Sales history
│   └── InventoryTable.js    # Stock table
└── 📁 Charts/
    ├── SalesChart.js        # Sales visualization
    ├── InventoryChart.js    # Stock charts
    └── RevenueChart.js      # Revenue graphs
```

## 🗄️ Database Structure

### Core Tables
```
📁 database/
├── schema.sql               # Complete database schema
├── 📁 migrations/           # Database changes
│   ├── 001_initial_schema.sql
│   ├── 002_add_prescriptions.sql
│   └── 003_add_drug_interactions.sql
└── 📁 seeds/                # Sample data
    ├── categories.sql        # Product categories
    ├── products.sql          # Sample products
    ├── users.sql             # Sample users
    └── customers.sql         # Sample patients
```

## 🔧 Configuration Files

### Environment Variables
```
📁 backend/
├── .env.example             # Environment template
├── .env                     # Local environment (gitignored)
└── 📁 config/
    ├── database.js          # Database configuration
    ├── auth.js              # Authentication settings
    └── app.js               # App configuration
```

### Mobile App Config
```
📁 mobile-app/
├── .env.example             # Environment template
├── metro.config.js          # Metro bundler config
├── babel.config.js          # Babel configuration
└── 📁 android/
    └── app/
        └── build.gradle     # Android build config
```

## 🚀 Deployment Structure

### Production Setup
```
📁 deployment/
├── 📁 docker/
│   ├── Dockerfile.backend   # Backend container
│   ├── Dockerfile.mobile    # Mobile build
│   └── docker-compose.yml   # Multi-container setup
├── 📁 nginx/
│   └── nginx.conf           # Web server configuration
├── 📁 scripts/
│   ├── deploy.sh            # Deployment script
│   ├── backup.sh            # Database backup
│   └── monitor.sh           # System monitoring
└── 📁 ssl/
    ├── certificate.crt      # SSL certificate
    └── private.key          # Private key
```

## 📊 API Structure

### Endpoint Organization
```
📁 backend/src/routes/
├── /api/auth/               # Authentication
│   ├── POST /login          # User login
│   ├── POST /logout         # User logout
│   └── GET /profile         # User profile
├── /api/products/           # Product management
│   ├── GET /                # List products
│   ├── POST /               # Create product
│   ├── GET /:id             # Get product
│   ├── PUT /:id             # Update product
│   └── DELETE /:id          # Delete product
├── /api/sales/              # Sales operations
│   ├── GET /                # List sales
│   ├── POST /               # Create sale
│   └── GET /:id             # Get sale details
├── /api/prescriptions/      # Prescription management
│   ├── GET /                # List prescriptions
│   ├── POST /               # Create prescription
│   └── PUT /:id             # Update prescription
└── /api/reports/            # Analytics
    ├── GET /sales           # Sales reports
    ├── GET /inventory       # Inventory reports
    └── GET /revenue         # Revenue analytics
```

## 🔒 Security Structure

### Authentication & Authorization
```
📁 backend/src/middleware/
├── auth.js                  # JWT verification
├── roleCheck.js             # Role-based access
├── inputValidation.js       # Data validation
├── rateLimit.js             # API rate limiting
└── auditLog.js              # Activity logging
```

### Data Protection
```
📁 backend/src/services/
├── encryption.js            # Data encryption
├── backup.js                # Data backup
├── monitoring.js            # System monitoring
└── compliance.js            # Regulatory compliance
```

## 📈 Monitoring & Analytics

### System Monitoring
```
📁 monitoring/
├── 📁 logs/                 # Application logs
├── 📁 metrics/              # Performance metrics
├── 📁 alerts/               # System alerts
└── 📁 dashboards/           # Monitoring dashboards
```

### Business Analytics
```
📁 analytics/
├── 📁 reports/              # Business reports
├── 📁 dashboards/           # Analytics dashboards
└── 📁 exports/              # Data exports
```

---

This structure provides a scalable foundation for your Thai Pharmacy POS system, following industry best practices and enabling easy maintenance and future expansion.
