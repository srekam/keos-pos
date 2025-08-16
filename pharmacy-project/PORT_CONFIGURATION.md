# Pharmacy POS Port Configuration

## 🎯 **New Port Scheme (Updated August 2024)**

### **Service Ports:**
- **PostgreSQL Database**: Internal only (no port forwarding)
- **pgAdmin**: Port 48080 (was 8080)
- **Node.js API**: Port 43000 (was 3000)
- **Additional Services**: Port range 40001-41001

### **Why This Configuration?**

1. **PostgreSQL Internal Only**: 
   - More secure - no direct external database access
   - Access only via pgAdmin or API
   - Prevents unauthorized database connections

2. **Port 48080 for pgAdmin**:
   - Avoids conflicts with other services
   - Easy to remember (48 + 080)
   - Clear separation from standard ports

3. **Port 41300 for Node.js API**:
   - High port number to avoid conflicts
   - Easy to remember (41 + 300)
   - Room for additional API services

4. **Port 40080 for Nginx Web**:
   - Serves HTML dashboard and proxies API requests
   - Easy to remember (40 + 080)
   - Web interface for users

4. **Port Range 40001-41001**:
   - Reserved for future services
   - Microservices, monitoring, etc.
   - Clear organization

## 🔧 **Updated Configuration Files**

### **docker-compose.yml Changes:**
```yaml
postgres:
  # Removed: ports: - "5432:5432"
  # Now internal only

pgadmin:
  ports:
    - "48080:80"  # Was 8080:80

api:
  ports:
    - "41300:3000"  # Was 43000:3000

nginx:
  ports:
    - "40080:80"  # New: Web dashboard & API proxy
```

### **server.js Changes:**
```javascript
// Updated console logs to show new ports
console.log(`🌐 Health check: http://10.5.50.48:41300/health`);
console.log(`📊 pgAdmin: http://10.5.50.48:48080`);
console.log(`🌐 Web Dashboard: http://10.5.50.48:40080`);
```

## 🌐 **Access URLs**

### **Production (Remote Server 10.5.50.48):**
- **API Base**: http://10.5.50.48:41300
- **Web Dashboard**: http://10.5.50.48:40080
- **pgAdmin**: http://10.5.50.48:48080
- **Health Check**: http://10.5.50.48:41300/health

### **Local Development:**
- **API Base**: http://localhost:41300
- **Web Dashboard**: http://localhost:40080
- **pgAdmin**: http://localhost:48080
- **Health Check**: http://localhost:41300/health

## 🚀 **Deployment Commands**

### **Start All Services:**
```bash
docker-compose up -d
```

### **Check Status:**
```bash
docker-compose ps
```

### **View Logs:**
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f api
docker-compose logs -f postgres
docker-compose logs -f pgadmin
```

### **Rebuild API (after code changes):**
```bash
docker-compose up -d --build api
```

## 🔒 **Security Benefits**

1. **Database Isolation**: PostgreSQL not directly accessible from outside
2. **Port Separation**: Clear distinction between services
3. **Conflict Avoidance**: No port conflicts with standard services
4. **Future-Proof**: Room for additional services in 40001-41001 range

## 📋 **Port Usage Summary**

| Service | Internal Port | External Port | Purpose |
|---------|---------------|---------------|---------|
| PostgreSQL | 5432 | None | Database (internal only) |
| pgAdmin | 80 | 48080 | Database management |
| Node.js API | 3000 | 41300 | REST API endpoints |
| Nginx Web | 80 | 40080 | Login Page, Dashboard & API Proxy |
| Future Service 1 | TBD | 40001-41001 | Reserved range |
| Future Service 2 | TBD | 40001-41001 | Reserved range |

## 🚨 **Important Notes**

- **PostgreSQL is now internal only** - access via pgAdmin or API
- **Update any hardcoded port references** in your code
- **Test all endpoints** after deployment
- **Update firewall rules** if needed for new ports
