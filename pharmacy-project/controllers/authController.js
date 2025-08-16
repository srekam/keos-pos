const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Client } = require('pg');

const JWT_SECRET = process.env.JWT_SECRET || 'pharmacy_pos_secret_key_2024';

// Database connection configuration
const dbConfig = {
  host: process.env.DB_HOST || '10.5.50.48', // Use remote host IP
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'pharmacy_pos',
  user: process.env.DB_USER || 'pharmacy_user',
  password: process.env.DB_PASSWORD || 'pharmacy_password_2024'
};

// Create database client
const dbClient = new Client(dbConfig);

// Connect to database
dbClient.connect().catch(console.error);

// User Login
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username and password are required'
      });
    }

    // Find user by username
    const userQuery = 'SELECT * FROM users WHERE username = $1 AND is_active = true';
    const userResult = await dbClient.query(userQuery, [username]);

    if (userResult.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid username or password'
      });
    }

    const user = userResult.rows[0];

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid username or password'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        role: user.role,
        full_name: user.full_name
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: userWithoutPassword,
        token
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// User Registration (Admin only)
const register = async (req, res) => {
  try {
    const { username, password, full_name, email, phone, role } = req.body;

    // Validate input
    if (!username || !password || !full_name) {
      return res.status(400).json({
        success: false,
        message: 'Username, password, and full name are required'
      });
    }

    // Check if username already exists
    const existingUser = await dbClient.query(
      'SELECT id FROM users WHERE username = $1',
      [username]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Username already exists'
      });
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert new user
    const insertQuery = `
      INSERT INTO users (username, password, full_name, email, phone, role)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id, username, full_name, email, phone, role, is_active, created_at
    `;

    const newUser = await dbClient.query(insertQuery, [
      username,
      hashedPassword,
      full_name,
      email || null,
      phone || null,
      role || 'assistant'
    ]);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: newUser.rows[0]
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Get current user profile
const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const userQuery = 'SELECT id, username, full_name, email, phone, role, is_active, created_at FROM users WHERE id = $1';
    const userResult = await dbClient.query(userQuery, [userId]);

    if (userResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: userResult.rows[0]
    });

  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// Change password
const changePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Current password and new password are required'
      });
    }

    // Get current user with password
    const userQuery = 'SELECT password FROM users WHERE id = $1';
    const userResult = await dbClient.query(userQuery, [userId]);

    if (userResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Verify current password
    const isValidPassword = await bcrypt.compare(currentPassword, userResult.rows[0].password);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    // Hash new password
    const saltRounds = 12;
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update password
    await dbClient.query(
      'UPDATE users SET password = $1 WHERE id = $2',
      [hashedNewPassword, userId]
    );

    res.json({
      success: true,
      message: 'Password changed successfully'
    });

  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

module.exports = {
  login,
  register,
  getProfile,
  changePassword
};
