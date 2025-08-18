const express = require('express');
const router = express.Router();
const { Client } = require('pg');
const config = require('../config');

// Create database client
const dbClient = new Client(config.database);

// Connect to database
dbClient.connect().catch(console.error);

// GET /api/products - Get all products
router.get('/', async (req, res) => {
  try {
    const result = await dbClient.query(`
      SELECT 
        p.*, 
        c.name as category_name,
        i.quantity as stock_quantity,
        i.expiry_date
      FROM products p 
      JOIN categories c ON p.category_id = c.id 
      LEFT JOIN inventory i ON p.id = i.product_id
      ORDER BY p.name
    `);
    
    res.json({ 
      success: true, 
      data: result.rows,
      count: result.rows.length
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch products',
      error: error.message 
    });
  }
});

// GET /api/products/:id - Get product by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await dbClient.query(`
      SELECT 
        p.*, 
        c.name as category_name,
        i.quantity as stock_quantity,
        i.expiry_date
      FROM products p 
      JOIN categories c ON p.category_id = c.id 
      LEFT JOIN inventory i ON p.id = i.product_id
      WHERE p.id = $1
    `, [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Product not found' 
      });
    }
    
    res.json({ 
      success: true, 
      data: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch product',
      error: error.message 
    });
  }
});

// GET /api/products/search/:query - Search products
router.get('/search/:query', async (req, res) => {
  try {
    const { query } = req.params;
    const searchQuery = `%${query}%`;
    
    const result = await dbClient.query(`
      SELECT 
        p.*, 
        c.name as category_name,
        i.quantity as stock_quantity
      FROM products p 
      JOIN categories c ON p.category_id = c.id 
      LEFT JOIN inventory i ON p.id = i.product_id
      WHERE p.name ILIKE $1 OR p.description ILIKE $1
      ORDER BY p.name
    `, [searchQuery]);
    
    res.json({ 
      success: true, 
      data: result.rows,
      count: result.rows.length
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to search products',
      error: error.message 
    });
  }
});

// GET /api/products/category/:categoryId - Get products by category
router.get('/category/:categoryId', async (req, res) => {
  try {
    const { categoryId } = req.params;
    
    const result = await dbClient.query(`
      SELECT 
        p.*, 
        c.name as category_name,
        i.quantity as stock_quantity
      FROM products p 
      JOIN categories c ON p.category_id = c.id 
      LEFT JOIN inventory i ON p.id = i.product_id
      WHERE p.category_id = $1
      ORDER BY p.name
    `, [categoryId]);
    
    res.json({ 
      success: true, 
      data: result.rows,
      count: result.rows.length
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch products by category',
      error: error.message 
    });
  }
});

module.exports = router;
