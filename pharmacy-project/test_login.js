const axios = require('axios');

const API_BASE_URL = 'http://10.5.50.48:43000/api';

// Test login function
async function testLogin() {
  try {
    console.log('🔐 Testing Login API...\n');

    // Test 1: Login with valid credentials
    console.log('1️⃣ Testing valid login...');
    const loginResponse = await axios.post(`${API_BASE_URL}/auth/login`, {
      username: 'admin',
      password: 'admin123'
    });

    if (loginResponse.data.success) {
      console.log('✅ Login successful!');
      console.log(`   User: ${loginResponse.data.data.user.full_name}`);
      console.log(`   Role: ${loginResponse.data.data.user.role}`);
      console.log(`   Token: ${loginResponse.data.data.token.substring(0, 20)}...`);
      
      const token = loginResponse.data.data.token;
      
      // Test 2: Get profile with token
      console.log('\n2️⃣ Testing profile access with token...');
      const profileResponse = await axios.get(`${API_BASE_URL}/auth/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (profileResponse.data.success) {
        console.log('✅ Profile access successful!');
        console.log(`   Username: ${profileResponse.data.data.username}`);
        console.log(`   Email: ${profileResponse.data.data.email}`);
      }
      
      // Test 3: Test protected route
      console.log('\n3️⃣ Testing protected route access...');
      const productsResponse = await axios.get(`${API_BASE_URL}/products`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (productsResponse.data.success) {
        console.log('✅ Protected route access successful!');
        console.log(`   Products count: ${productsResponse.data.data.length}`);
      }
      
    } else {
      console.log('❌ Login failed:', loginResponse.data.message);
    }

  } catch (error) {
    if (error.response) {
      console.log('❌ API Error:', error.response.data);
    } else {
      console.log('❌ Network Error:', error.message);
    }
  }
}

// Test invalid login
async function testInvalidLogin() {
  try {
    console.log('\n4️⃣ Testing invalid login...');
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      username: 'wronguser',
      password: 'wrongpass'
    });
    
    console.log('❌ This should have failed but got:', response.data);
    
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.log('✅ Invalid login correctly rejected');
    } else {
      console.log('❌ Unexpected error:', error.message);
    }
  }
}

// Run tests
async function runTests() {
  console.log('🚀 Starting Login API Tests...\n');
  
  await testLogin();
  await testInvalidLogin();
  
  console.log('\n✨ Tests completed!');
}

// Check if axios is available
try {
  require('axios');
  runTests();
} catch (error) {
  console.log('❌ Axios not found. Install it with: npm install axios');
  console.log('Or test manually using curl or Postman:');
  console.log('\n🔑 Test Login:');
  console.log(`curl -X POST ${API_BASE_URL}/auth/login \\`);
  console.log('  -H "Content-Type: application/json" \\');
  console.log('  -d \'{"username": "admin", "password": "admin123"}\'');
}
