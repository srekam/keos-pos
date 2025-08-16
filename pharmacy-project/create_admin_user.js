const bcrypt = require('bcryptjs');
const { Client } = require('pg');

// Database connection configuration
const dbConfig = {
  host: process.env.DB_HOST || '10.5.50.48', // Use remote host IP
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'pharmacy_pos',
  user: process.env.DB_USER || 'pharmacy_user',
  password: process.env.DB_PASSWORD || 'pharmacy_password_2024'
};

async function createAdminUser() {
  const client = new Client(dbConfig);
  
  try {
    console.log('🔌 Connecting to database...');
    await client.connect();
    console.log('✅ Connected to database');

    // Check if admin user already exists
    const existingUser = await client.query(
      'SELECT id FROM users WHERE username = $1',
      ['admin']
    );

    if (existingUser.rows.length > 0) {
      console.log('⚠️  Admin user already exists');
      return;
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 12);
    
    const insertQuery = `
      INSERT INTO users (username, password, full_name, email, role, is_active)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id, username, full_name, role
    `;

    const result = await client.query(insertQuery, [
      'admin',
      hashedPassword,
      'System Administrator',
      'admin@pharmacypos.com',
      'admin',
      true
    ]);

    console.log('✅ Admin user created successfully:');
    console.log(`   ID: ${result.rows[0].id}`);
    console.log(`   Username: ${result.rows[0].username}`);
    console.log(`   Full Name: ${result.rows[0].full_name}`);
    console.log(`   Role: ${result.rows[0].role}`);
    console.log('\n🔑 Login credentials:');
    console.log('   Username: admin');
    console.log('   Password: admin123');
    console.log('\n⚠️  IMPORTANT: Change this password after first login!');

  } catch (error) {
    console.error('❌ Error creating admin user:', error.message);
  } finally {
    await client.end();
  }
}

// Run the script
createAdminUser();
