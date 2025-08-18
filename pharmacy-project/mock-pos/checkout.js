let cart = [];
let selectedPaymentMethod = null;
let orderTotal = 0;

document.addEventListener('DOMContentLoaded', function() {
    // Load cart from session storage
    const cartData = sessionStorage.getItem('cart');
    if (!cartData) {
        alert('No items in cart');
        window.location.href = 'pos-main.html';
        return;
    }
    
    cart = JSON.parse(cartData);
    displayOrderSummary();
});

function displayOrderSummary() {
    const orderContainer = document.getElementById('orderItems');
    
    orderContainer.innerHTML = cart.map(item => `
        <div class="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
            <div class="flex items-center space-x-3">
                <div class="text-xl">${item.product.image}</div>
                <div>
                    <h4 class="font-medium text-gray-900">${item.product.name}</h4>
                    <p class="text-sm text-gray-600">$${item.product.price.toFixed(2)} × ${item.quantity}</p>
                </div>
            </div>
            <div class="text-lg font-bold">
                $${(item.product.price * item.quantity).toFixed(2)}
            </div>
        </div>
    `).join('');
    
    // Calculate totals
    const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const tax = subtotal * 0.085; // 8.5% tax
    const discount = 0; // Can be implemented later
    orderTotal = subtotal + tax - discount;
    
    document.getElementById('checkoutSubtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('checkoutTax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('discount').textContent = `-$${discount.toFixed(2)}`;
    document.getElementById('checkoutTotal').textContent = `$${orderTotal.toFixed(2)}`;
}

function selectPaymentMethod(method) {
    selectedPaymentMethod = method;
    
    // Reset all payment method buttons
    document.querySelectorAll('.payment-method').forEach(btn => {
        btn.className = 'payment-method btn-secondary';
    });
    
    // Highlight selected method
    event.target.className = 'payment-method btn-primary';
    
    // Hide all payment details
    document.getElementById('cashPayment').classList.add('hidden');
    document.getElementById('cardPayment').classList.add('hidden');
    document.getElementById('qrPayment').classList.add('hidden');
    
    // Show selected payment method details
    if (method === 'cash') {
        document.getElementById('cashPayment').classList.remove('hidden');
        document.getElementById('amountReceived').focus();
    } else if (method === 'card') {
        document.getElementById('cardPayment').classList.remove('hidden');
        enableConfirmButton();
    } else if (method === 'qr') {
        document.getElementById('qrPayment').classList.remove('hidden');
        enableConfirmButton();
    }
}

function calculateChange() {
    const amountReceived = parseFloat(document.getElementById('amountReceived').value) || 0;
    const change = amountReceived - orderTotal;
    
    document.getElementById('changeDue').textContent = `$${Math.max(0, change).toFixed(2)}`;
    
    // Enable confirm button if amount is sufficient
    if (amountReceived >= orderTotal) {
        enableConfirmButton();
    } else {
        disableConfirmButton();
    }
}

function enableConfirmButton() {
    document.getElementById('confirmPaymentBtn').disabled = false;
}

function disableConfirmButton() {
    document.getElementById('confirmPaymentBtn').disabled = true;
}

function processPayment() {
    if (!selectedPaymentMethod) {
        alert('Please select a payment method');
        return;
    }
    
    if (selectedPaymentMethod === 'cash') {
        const amountReceived = parseFloat(document.getElementById('amountReceived').value) || 0;
        if (amountReceived < orderTotal) {
            alert('Insufficient amount received');
            return;
        }
    }
    
    // Generate receipt number
    const receiptNumber = 'R' + Date.now().toString().slice(-8);
    
    // Store transaction data
    const transaction = {
        receiptNumber,
        items: cart,
        subtotal: cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0),
        tax: cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0) * 0.085,
        total: orderTotal,
        paymentMethod: selectedPaymentMethod,
        timestamp: new Date().toISOString(),
        cashier: sessionStorage.getItem('cashier')
    };
    
    if (selectedPaymentMethod === 'cash') {
        transaction.amountReceived = parseFloat(document.getElementById('amountReceived').value);
        transaction.change = transaction.amountReceived - orderTotal;
    }
    
    // Store in session for receipt display
    sessionStorage.setItem('lastTransaction', JSON.stringify(transaction));
    
    // Clear cart
    sessionStorage.removeItem('cart');
    
    // Show success message
    showPaymentSuccess(transaction);
}

function showPaymentSuccess(transaction) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-white rounded-xl p-8 max-w-md w-full mx-4">
            <div class="text-center">
                <div class="text-6xl text-success-500 mb-4">✓</div>
                <h2 class="text-2xl font-bold text-gray-900 mb-4">Payment Successful!</h2>
                <p class="text-gray-600 mb-2">Receipt #${transaction.receiptNumber}</p>
                <p class="text-xl font-bold text-success-600 mb-6">Total: $${transaction.total.toFixed(2)}</p>
                
                ${transaction.change ? `<p class="text-lg mb-4">Change: <span class="font-bold text-success-600">$${transaction.change.toFixed(2)}</span></p>` : ''}
                
                <div class="space-y-3">
                    <button onclick="printReceipt()" class="w-full btn-primary">Print Receipt</button>
                    <button onclick="goBackToPOS()" class="w-full btn-secondary">New Transaction</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

function printReceipt() {
    const transaction = JSON.parse(sessionStorage.getItem('lastTransaction'));
    
    // Simulate printing
    alert('Receipt printed successfully!\\n\\nReceipt #' + transaction.receiptNumber);
    goBackToPOS();
}

function goBack() {
    if (confirm('Are you sure you want to go back? All payment progress will be lost.')) {
        window.location.href = 'pos-main.html';
    }
}

function goBackToPOS() {
    window.location.href = 'pos-main.html';
}
