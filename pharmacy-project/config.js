// Configuration for Thai Pharmacy POS API
module.exports = {
  // Database Configuration
  database: {
    host: process.env.DB_HOST || '10.5.50.48', // Remote Docker server IP
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'pharmacy_pos',
    user: process.env.DB_USER || 'pharmacy_user',
    password: process.env.DB_PASSWORD || 'pharmacy_password_2024'
  },
  
  // Server Configuration
  server: {
    port: process.env.PORT || 3000,
    environment: process.env.NODE_ENV || 'development'
  },
  
  // JWT Configuration (for future authentication)
  jwt: {
    secret: process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production',
    expiresIn: process.env.JWT_EXPIRES_IN || '24h'
  }
};
