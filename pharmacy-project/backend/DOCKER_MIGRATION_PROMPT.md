# AI Prompt: Migrate Thai Pharmacy POS to New Docker Environment

## 🎯 Objective
Help me migrate my Thai Pharmacy POS system from the current Docker environment to a new Docker environment (different server, cloud provider, or development machine).

## 📋 Project Overview

**Project Name**: Thai Pharmacy POS System  
**Current Status**: Database complete with Docker setup  
**Technology Stack**: PostgreSQL, Node.js, React Native  
**Current Environment**: Local Docker with PostgreSQL + pgAdmin  

## 🗄️ Current Database Status

### Database Details
- **Name**: pharmacy_pos
- **Type**: PostgreSQL 15
- **Size**: ~50MB (schema + sample data)
- **Tables**: 20+ tables including pharmacy-specific features
- **Sample Data**: 19 products, 8 customers, 5 prescriptions, 8 sales

### Current Docker Setup
```yaml
# Current docker-compose.yml
services:
  postgres:
    image: postgres:15
    container_name: pharmacy_pos_db
    ports: ["5432:5432"]
    environment:
      POSTGRES_DB: pharmacy_pos
      POSTGRES_USER: pharmacy_user
      POSTGRES_PASSWORD: pharmacy_password_2024
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./database/init:/docker-entrypoint-initdb.d
```

## 🚀 Migration Requirements

### 1. Data Preservation
- **Must Keep**: All database schema, data, and relationships
- **Must Keep**: Sample pharmacy data for testing
- **Must Keep**: Database functions, triggers, and views
- **Can Modify**: Passwords, ports, volume paths

### 2. New Environment Constraints
- **Target**: [Specify: AWS, Google Cloud, Azure, Local Server, etc.]
- **Resources**: [Specify: CPU, RAM, Storage limits]
- **Network**: [Specify: Internal/external access, firewall rules]
- **Security**: [Specify: SSL, VPN, access restrictions]

### 3. Performance Requirements
- **Database**: Fast queries for pharmacy operations
- **Concurrency**: Support 5-10 simultaneous users
- **Backup**: Daily automated backups
- **Monitoring**: Health checks and logging

## 🔧 Technical Requirements

### Database Migration
- Export current database completely
- Preserve all data integrity
- Handle any version differences
- Test data consistency after migration

### Docker Configuration
- Update docker-compose.yml for new environment
- Adjust resource limits if needed
- Update network configurations
- Handle volume mounting differences

### Environment Variables
- Update passwords and credentials
- Modify port mappings if needed
- Adjust file paths for new system
- Handle different operating systems

## 📝 Expected Deliverables

### 1. Migration Scripts
- Database export commands
- Database import commands
- Verification queries
- Rollback procedures

### 2. Updated Configuration Files
- Modified docker-compose.yml
- Environment variable templates
- Network configuration
- Volume mapping updates

### 3. Testing Procedures
- Connection verification
- Data integrity checks
- Performance validation
- Error handling

### 4. Documentation
- Step-by-step migration guide
- Troubleshooting common issues
- Performance optimization tips
- Maintenance procedures

## 🚨 Important Considerations

### Data Safety
- **No data loss** during migration
- **Backup before migration** (mandatory)
- **Test migration** on copy first
- **Rollback plan** if issues occur

### Pharmacy-Specific Requirements
- **Drug interaction data** must be preserved
- **Prescription history** cannot be lost
- **Inventory tracking** must remain accurate
- **Patient records** must be secure

### Thai Market Features
- **Local language support** must work
- **Thai VAT calculations** must be accurate
- **PromptPay integration** ready for development
- **Local compliance** features preserved

## 🔍 Current File Structure

```
thai-pharmacy-pos/
├── docker-compose.yml          # Docker configuration
├── database/
│   ├── init/
│   │   ├── 01_init_schema.sql # Database schema
│   │   └── 02_sample_data.sql # Sample data
│   └── backups/                # Backup directory
├── package.json                # Node.js dependencies
├── test_connection.js          # Database test script
└── README.md                   # Project documentation
```

## 📊 Database Schema Summary

### Core Tables
- `users` - Staff and pharmacists
- `products` - Drugs and medications
- `categories` - Product classifications
- `inventory` - Stock management
- `customers` - Patient information
- `sales` - Transaction records

### Pharmacy Tables
- `drug_details` - Medication information
- `prescriptions` - Doctor orders
- `prescription_items` - Prescription details
- `drug_expiry_tracking` - Expiration management
- `drug_interactions` - Safety checking

### Views & Functions
- `low_stock_products` - Inventory alerts
- `expiring_drugs` - Expiry warnings
- `daily_sales_summary` - Sales analytics
- `top_selling_products` - Product performance
- `customer_purchase_history` - Customer analytics

## 🎯 Success Criteria

### Migration Success
- [ ] Database starts successfully in new environment
- [ ] All tables and data are present
- [ ] All views and functions work correctly
- [ ] Sample data is accessible and accurate
- [ ] Performance is acceptable for development

### Testing Success
- [ ] Connection test passes
- [ ] Sample queries return correct results
- [ ] Pharmacy-specific features work
- [ ] No data corruption or loss
- [ ] Backup and restore procedures work

## 🆘 Support Requirements

### What I Need Help With
1. **Database Export**: Safe export of current database
2. **Environment Setup**: Configure new Docker environment
3. **Data Import**: Import data to new environment
4. **Verification**: Confirm everything works correctly
5. **Optimization**: Improve performance if needed

### What I Can Handle
- Basic Docker commands
- File editing and configuration
- Running scripts and commands
- Basic troubleshooting

## 📞 Contact Information

**Project**: Thai Pharmacy POS System  
**Current Phase**: Database migration to new environment  
**Priority**: High (need to move development to new machine)  
**Timeline**: [Specify: ASAP, This week, Next month, etc.]

---

**Please provide a comprehensive migration plan that ensures zero data loss and maintains all pharmacy-specific functionality.**
