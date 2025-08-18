// Mock product data
const products = [
    { id: 1, name: "Apple", price: 1.50, category: "food", image: "🍎", barcode: "123456789" },
    { id: 2, name: "Banana", price: 0.75, category: "food", image: "🍌", barcode: "123456790" },
    { id: 3, name: "Coca Cola", price: 2.99, category: "beverages", image: "🥤", barcode: "123456791" },
    { id: 4, name: "Water Bottle", price: 1.25, category: "beverages", image: "💧", barcode: "123456792" },
    { id: 5, name: "Chips", price: 3.50, category: "snacks", image: "🍟", barcode: "123456793" },
    { id: 6, name: "Chocolate Bar", price: 2.25, category: "snacks", image: "🍫", barcode: "123456794" },
    { id: 7, name: "Bread", price: 2.50, category: "food", image: "🍞", barcode: "123456795" },
    { id: 8, name: "Milk", price: 3.75, category: "beverages", image: "🥛", barcode: "123456796" },
    { id: 9, name: "Soap", price: 4.99, category: "household", image: "🧼", barcode: "123456797" },
    { id: 10, name: "Tissue", price: 6.50, category: "household", image: "🧻", barcode: "123456798" }
];

let cart = [];
let currentCategory = 'all';

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const cashier = sessionStorage.getItem('cashier');
    if (!cashier) {
        window.location.href = 'index.html';
        return;
    }
    
    document.getElementById('cashierName').textContent = `Cashier: ${cashier}`;
    updateTime();
    setInterval(updateTime, 1000);
    
    displayProducts();
    updateCartDisplay();
});

function updateTime() {
    const now = new Date();
    document.getElementById('currentTime').textContent = now.toLocaleTimeString();
}

function displayProducts(filteredProducts = products) {
    const grid = document.getElementById('productGrid');
    grid.innerHTML = '';
    
    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="text-center">
                <div class="text-4xl mb-2">${product.image}</div>
                <h3 class="font-semibold text-gray-900 mb-1">${product.name}</h3>
                <p class="text-xl font-bold text-primary-600 mb-3">$${product.price.toFixed(2)}</p>
                <button onclick="addToCart(${product.id})" class="w-full btn-primary">Add to Cart</button>
            </div>
        `;
        grid.appendChild(productCard);
    });
}

function searchProducts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    let filtered = products;
    
    if (searchTerm) {
        filtered = products.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.barcode.includes(searchTerm)
        );
    }
    
    if (currentCategory !== 'all') {
        filtered = filtered.filter(product => product.category === currentCategory);
    }
    
    displayProducts(filtered);
}

function filterByCategory(category) {
    currentCategory = category;
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    let filtered = products;
    
    if (category !== 'all') {
        filtered = products.filter(product => product.category === category);
    }
    
    if (searchTerm) {
        filtered = filtered.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.barcode.includes(searchTerm)
        );
    }
    
    displayProducts(filtered);
    
    // Update button styles
    document.querySelectorAll('button[onclick^="filterByCategory"]').forEach(btn => {
        btn.className = 'btn-secondary';
    });
    event.target.className = 'btn-primary';
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.product.id === productId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ product, quantity: 1 });
    }
    
    updateCartDisplay();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.product.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartDisplay();
        }
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.product.id !== productId);
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartContainer = document.getElementById('cartItems');
    
    if (cart.length === 0) {
        cartContainer.innerHTML = '<div class="text-center text-gray-500 py-8">Cart is empty</div>';
        document.getElementById('checkoutBtn').disabled = true;
    } else {
        cartContainer.innerHTML = cart.map(item => `
            <div class="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                <div class="text-2xl">${item.product.image}</div>
                <div class="flex-1">
                    <h4 class="font-medium text-gray-900">${item.product.name}</h4>
                    <p class="text-sm text-gray-600">$${item.product.price.toFixed(2)} each</p>
                </div>
                <div class="flex items-center space-x-2">
                    <button onclick="updateQuantity(${item.product.id}, -1)" class="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center">-</button>
                    <span class="w-8 text-center font-medium">${item.quantity}</span>
                    <button onclick="updateQuantity(${item.product.id}, 1)" class="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center">+</button>
                </div>
                <div class="text-right">
                    <p class="font-bold">$${(item.product.price * item.quantity).toFixed(2)}</p>
                    <button onclick="removeFromCart(${item.product.id})" class="text-xs text-danger-500 hover:text-danger-600">Remove</button>
                </div>
            </div>
        `).join('');
        document.getElementById('checkoutBtn').disabled = false;
    }
    
    // Update totals
    const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const tax = subtotal * 0.085; // 8.5% tax
    const total = subtotal + tax;
    
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}

function proceedToCheckout() {
    if (cart.length === 0) return;
    
    // Store cart data for checkout
    sessionStorage.setItem('cart', JSON.stringify(cart));
    window.location.href = 'checkout.html';
}

function closeShift() {
    if (confirm('Are you sure you want to close your shift?')) {
        window.location.href = 'shift-close.html';
    }
}
