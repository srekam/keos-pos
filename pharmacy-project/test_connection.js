const { Client } = require('pg');

// Database connection configuration
const config = {
  host: 'localhost',
  port: 5432,
  database: 'pharmacy_pos',
  user: 'pharmacy_user',
  password: 'pharmacy_password_2024'
};

async function testConnection() {
  const client = new Client(config);
  
  try {
    console.log('🔌 Connecting to PostgreSQL database...');
    await client.connect();
    console.log('✅ Connected successfully!');
    
    // Test basic query
    console.log('\n📊 Testing basic queries...');
    
    // Test categories
    const categoriesResult = await client.query('SELECT COUNT(*) as count FROM categories');
    console.log(`📋 Categories: ${categoriesResult.rows[0].count}`);
    
    // Test products
    const productsResult = await client.query('SELECT COUNT(*) as count FROM products');
    console.log(`💊 Products: ${productsResult.rows[0].count}`);
    
    // Test customers
    const customersResult = await client.query('SELECT COUNT(*) as count FROM customers');
    console.log(`👥 Customers: ${customersResult.rows[0].count}`);
    
    // Test users
    const usersResult = await client.query('SELECT COUNT(*) as count FROM users');
    console.log(`👤 Users: ${usersResult.rows[0].count}`);
    
    // Test sample data
    console.log('\n🔍 Sample data queries...');
    
    // Get some sample products
    const sampleProducts = await client.query(`
      SELECT p.name, p.price, c.name as category 
      FROM products p 
      JOIN categories c ON p.category_id = c.id 
      LIMIT 5
    `);
    
    console.log('\n💊 Sample Products:');
    sampleProducts.rows.forEach(product => {
      console.log(`  - ${product.name} (${product.category}): ฿${product.price}`);
    });
    
    // Test pharmacy-specific views
    console.log('\n🏥 Testing pharmacy views...');
    
    const lowStock = await client.query('SELECT COUNT(*) as count FROM low_stock_products');
    console.log(`📦 Low stock products: ${lowStock.rows[0].count}`);
    
    const expiring = await client.query('SELECT COUNT(*) as count FROM expiring_drugs');
    console.log(`⏰ Expiring drugs: ${expiring.rows[0].count}`);
    
    // Test sales data
    const salesSummary = await client.query('SELECT * FROM daily_sales_summary LIMIT 1');
    if (salesSummary.rows.length > 0) {
      console.log(`💰 Sales data available: ${salesSummary.rows[0].total_sales} sales`);
    }
    
    console.log('\n🎉 All tests passed! Your database is ready for development.');
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    console.log('\n🔧 Troubleshooting tips:');
    console.log('1. Make sure Docker is running');
    console.log('2. Run: docker-compose up -d postgres');
    console.log('3. Wait 10-15 seconds for database to start');
    console.log('4. Check if port 5432 is available');
  } finally {
    await client.end();
  }
}

// Run the test
testConnection();
