const express = require('express');
const cors = require('cors');
const { Client } = require('pg');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Database connection configuration - Use environment variables for Docker
const dbConfig = {
  host: process.env.DB_HOST || '10.5.50.48', // Use remote host IP
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'pharmacy_pos',
  user: process.env.DB_USER || 'pharmacy_user',
  password: process.env.DB_PASSWORD || 'pharmacy_password_2024'
};

// Create database client
const dbClient = new Client(dbConfig);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    database: 'Connected',
    message: 'Thai Pharmacy POS API is running'
  });
});

// Database connection test endpoint
app.get('/api/test-db', async (req, res) => {
  try {
    const result = await dbClient.query('SELECT COUNT(*) as count FROM products');
    res.json({ 
      success: true, 
      message: 'Database connection successful',
      productCount: result.rows[0].count
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Database connection failed',
      error: error.message 
    });
  }
});

// Import routes
const productsRoutes = require('./routes/products');
const authRoutes = require('./routes/auth');

// Use routes
app.use('/api/products', productsRoutes);
app.use('/api/auth', authRoutes);

// Basic customers endpoint
app.get('/api/customers', async (req, res) => {
  try {
    const result = await dbClient.query('SELECT * FROM customers ORDER BY name');
    res.json({ 
      success: true, 
      data: result.rows,
      count: result.rows.length
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch customers',
      error: error.message 
    });
  }
});

// Database connection and server startup
async function startServer() {
  try {
    console.log('🔌 Connecting to PostgreSQL database...');
    await dbClient.connect();
    console.log('✅ Database connected successfully!');
    
    // Test database connection
    const testResult = await dbClient.query('SELECT COUNT(*) as count FROM products');
    console.log(`📊 Database ready with ${testResult.rows[0].count} products`);
    
    // Start the server
    app.listen(PORT, () => {
      console.log(`🚀 Thai Pharmacy POS API server running on port ${PORT}`);
      console.log(`🌐 Health check: http://10.5.50.48:41300/health`);
      console.log(`🔍 Test DB: http://10.5.50.48:41300/api/test-db`);
      console.log(`💊 Products: http://10.5.50.48:41300/api/products`);
      console.log(`👥 Customers: http://10.5.50.48:41300/api/customers`);
      console.log(`🔐 Auth: http://10.5.50.48:41300/api/auth`);
      console.log(`📊 pgAdmin: http://10.5.50.48:48080`);
      console.log(`🌐 Web Dashboard: http://10.5.50.48:40080`);
    });
    
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    console.log('\n🔧 Troubleshooting tips:');
    console.log('1. Make sure Docker is running: docker-compose ps');
    console.log('2. Check database connection: docker exec pharmacy_pos_db pg_isready');
    console.log('3. Verify database credentials in .env file');
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down server...');
  await dbClient.end();
  process.exit(0);
});

// Start the server
startServer();
