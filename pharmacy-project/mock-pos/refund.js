let currentReceipt = null;
let refundSelection = [];

document.addEventListener('DOMContentLoaded', function() {
    // Auto-focus on receipt input
    document.getElementById('receiptNumber').focus();
});

function handleReceiptInput() {
    const input = document.getElementById('receiptNumber').value;
    const status = document.getElementById('receiptStatus');
    
    if (input.length === 0) {
        status.textContent = 'Enter receipt number to search for transaction';
        status.className = 'text-sm text-gray-500';
    } else if (input.length < 8) {
        status.textContent = 'Receipt number should be at least 8 characters';
        status.className = 'text-sm text-warning-600';
    } else {
        status.textContent = 'Press Enter or click Search to find receipt';
        status.className = 'text-sm text-primary-600';
        
        // Allow Enter key to search
        if (event.key === 'Enter') {
            searchReceipt();
        }
    }
}

function searchReceipt() {
    const receiptNumber = document.getElementById('receiptNumber').value.trim();
    const status = document.getElementById('receiptStatus');
    
    if (!receiptNumber) {
        status.textContent = 'Please enter a receipt number';
        status.className = 'text-sm text-danger-600';
        return;
    }
    
    // Simulate receipt lookup (in real app, this would be an API call)
    currentReceipt = findReceipt(receiptNumber);
    
    if (currentReceipt) {
        displayReceiptDetails(currentReceipt);
        status.textContent = 'Receipt found successfully';
        status.className = 'text-sm text-success-600';
    } else {
        status.textContent = 'Receipt not found. Please check the number and try again.';
        status.className = 'text-sm text-danger-600';
        hideReceiptDetails();
    }
}

function findReceipt(receiptNumber) {
    // Mock receipt data - in real app this would come from a database
    const mockReceipts = {
        'R12345001': {
            receiptNumber: 'R12345001',
            timestamp: new Date(Date.now() - 3600000).toISOString(),
            items: [
                { id: 1, product: { name: 'Apple', price: 1.50, image: '🍎' }, quantity: 2, refunded: 0 },
                { id: 2, product: { name: 'Banana', price: 0.75, image: '🍌' }, quantity: 3, refunded: 1 }
            ],
            subtotal: 5.25,
            tax: 0.45,
            total: 5.70,
            paymentMethod: 'cash',
            cashier: 'Demo Cashier'
        },
        'R12345002': {
            receiptNumber: 'R12345002',
            timestamp: new Date(Date.now() - 2400000).toISOString(),
            items: [
                { id: 1, product: { name: 'Coca Cola', price: 2.99, image: '🥤' }, quantity: 1, refunded: 0 },
                { id: 2, product: { name: 'Chips', price: 3.50, image: '🍟' }, quantity: 1, refunded: 0 }
            ],
            subtotal: 6.49,
            tax: 0.55,
            total: 7.04,
            paymentMethod: 'card',
            cashier: 'Demo Cashier'
        },
        'R12345003': {
            receiptNumber: 'R12345003',
            timestamp: new Date(Date.now() - 1200000).toISOString(),
            items: [
                { id: 1, product: { name: 'Milk', price: 3.75, image: '🥛' }, quantity: 1, refunded: 1 }
            ],
            subtotal: 3.75,
            tax: 0.32,
            total: 4.07,
            paymentMethod: 'qr',
            cashier: 'Demo Cashier'
        }
    };
    
    return mockReceipts[receiptNumber] || null;
}

function displayReceiptDetails(receipt) {
    // Show receipt details section
    document.getElementById('receiptDetails').classList.remove('hidden');
    
    // Populate receipt information
    document.getElementById('foundReceiptNumber').textContent = receipt.receiptNumber;
    document.getElementById('receiptDate').textContent = new Date(receipt.timestamp).toLocaleString();
    document.getElementById('receiptCashier').textContent = receipt.cashier;
    document.getElementById('receiptPaymentMethod').textContent = receipt.paymentMethod.toUpperCase();
    document.getElementById('receiptTotal').textContent = `$${receipt.total.toFixed(2)}`;
    
    // Display receipt items
    const itemsContainer = document.getElementById('receiptItems');
    itemsContainer.innerHTML = receipt.items.map(item => `
        <div class="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
            <div class="flex items-center space-x-3">
                <div class="text-xl">${item.product.image}</div>
                <div>
                    <h4 class="font-medium text-gray-900">${item.product.name}</h4>
                    <p class="text-sm text-gray-600">$${item.product.price.toFixed(2)} × ${item.quantity}</p>
                    ${item.refunded > 0 ? `<p class="text-xs text-warning-600">Previously refunded: ${item.refunded}</p>` : ''}
                </div>
            </div>
            <div class="text-lg font-bold">
                $${(item.product.price * item.quantity).toFixed(2)}
            </div>
        </div>
    `).join('');
    
    // Display refund selection
    displayRefundSelection(receipt);
}

function displayRefundSelection(receipt) {
    const container = document.getElementById('refundItems');
    refundSelection = [];
    
    container.innerHTML = receipt.items.map((item, index) => {
        const availableQty = item.quantity - (item.refunded || 0);
        const isRefundable = availableQty > 0;
        
        return `
            <div class="flex items-center justify-between p-3 border border-gray-200 rounded-lg ${!isRefundable ? 'bg-gray-50' : ''}">
                <div class="flex items-center space-x-3">
                    <input type="checkbox" 
                           id="refund_${index}" 
                           ${!isRefundable ? 'disabled' : ''}
                           onchange="toggleItemRefund(${index}, this.checked)"
                           class="rounded border-gray-300 text-primary-600 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200">
                    <div class="text-xl">${item.product.image}</div>
                    <div>
                        <h4 class="font-medium text-gray-900">${item.product.name}</h4>
                        <p class="text-sm text-gray-600">$${item.product.price.toFixed(2)} each</p>
                        ${!isRefundable ? '<p class="text-xs text-gray-500">Fully refunded</p>' : ''}
                    </div>
                </div>
                <div class="flex items-center space-x-4">
                    ${isRefundable ? `
                        <div class="flex items-center space-x-2">
                            <label class="text-sm text-gray-600">Qty:</label>
                            <select id="qty_${index}" 
                                    onchange="updateRefundQuantity(${index}, this.value)"
                                    class="rounded border-gray-300 text-sm" 
                                    disabled>
                                ${Array.from({length: availableQty}, (_, i) => `
                                    <option value="${i + 1}">${i + 1}</option>
                                `).join('')}
                            </select>
                        </div>
                    ` : ''}
                    <div class="text-lg font-bold">
                        $${(item.product.price * availableQty).toFixed(2)}
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    updateRefundTotal();
}

function toggleItemRefund(itemIndex, isSelected) {
    const qtySelect = document.getElementById(`qty_${itemIndex}`);
    
    if (isSelected) {
        qtySelect.disabled = false;
        refundSelection[itemIndex] = {
            itemIndex,
            quantity: parseInt(qtySelect.value)
        };
    } else {
        qtySelect.disabled = true;
        delete refundSelection[itemIndex];
    }
    
    updateRefundTotal();
}

function updateRefundQuantity(itemIndex, quantity) {
    if (refundSelection[itemIndex]) {
        refundSelection[itemIndex].quantity = parseInt(quantity);
        updateRefundTotal();
    }
}

function updateRefundTotal() {
    let total = 0;
    
    Object.values(refundSelection).forEach(selection => {
        if (selection && currentReceipt) {
            const item = currentReceipt.items[selection.itemIndex];
            total += item.product.price * selection.quantity;
        }
    });
    
    document.getElementById('refundTotal').textContent = `$${total.toFixed(2)}`;
    document.getElementById('processRefundBtn').disabled = total === 0;
}

function scanReceipt() {
    // Simulate barcode scanning
    const mockReceiptNumbers = ['R12345001', 'R12345002', 'R12345003'];
    const randomReceipt = mockReceiptNumbers[Math.floor(Math.random() * mockReceiptNumbers.length)];
    
    document.getElementById('receiptNumber').value = randomReceipt;
    searchReceipt();
}

function processRefund() {
    if (!currentReceipt || Object.keys(refundSelection).length === 0) {
        alert('Please select items to refund');
        return;
    }
    
    let refundTotal = 0;
    const refundItems = [];
    
    Object.values(refundSelection).forEach(selection => {
        if (selection) {
            const item = currentReceipt.items[selection.itemIndex];
            const refundAmount = item.product.price * selection.quantity;
            refundTotal += refundAmount;
            
            refundItems.push({
                name: item.product.name,
                quantity: selection.quantity,
                price: item.product.price,
                total: refundAmount
            });
        }
    });
    
    const refundTax = refundTotal * 0.085; // Calculate tax on refund
    const totalRefund = refundTotal + refundTax;
    
    if (confirm(`Process refund of $${totalRefund.toFixed(2)} for ${refundItems.length} item(s)?`)) {
        // Show success modal
        showRefundSuccess({
            receiptNumber: currentReceipt.receiptNumber,
            items: refundItems,
            subtotal: refundTotal,
            tax: refundTax,
            total: totalRefund,
            paymentMethod: currentReceipt.paymentMethod
        });
    }
}

function showRefundSuccess(refundData) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-white rounded-xl p-8 max-w-md w-full mx-4">
            <div class="text-center">
                <div class="text-6xl text-success-500 mb-4">✓</div>
                <h2 class="text-2xl font-bold text-gray-900 mb-4">Refund Processed!</h2>
                <p class="text-gray-600 mb-2">Original Receipt: ${refundData.receiptNumber}</p>
                <p class="text-xl font-bold text-success-600 mb-6">Refund Amount: $${refundData.total.toFixed(2)}</p>
                
                <div class="text-left mb-6">
                    <h3 class="font-semibold mb-2">Refunded Items:</h3>
                    ${refundData.items.map(item => `
                        <p class="text-sm text-gray-600">${item.quantity}× ${item.name} - $${item.total.toFixed(2)}</p>
                    `).join('')}
                </div>
                
                <p class="text-sm text-gray-600 mb-6">Refund will be processed to original payment method: ${refundData.paymentMethod.toUpperCase()}</p>
                
                <div class="space-y-3">
                    <button onclick="printRefundReceipt()" class="w-full btn-primary">Print Refund Receipt</button>
                    <button onclick="newRefund()" class="w-full btn-secondary">New Refund</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

function printRefundReceipt() {
    alert('Refund receipt printed successfully!');
    goBack();
}

function newRefund() {
    document.querySelector('.fixed').remove();
    document.getElementById('receiptNumber').value = '';
    hideReceiptDetails();
    document.getElementById('receiptStatus').textContent = 'Enter receipt number to search for transaction';
    document.getElementById('receiptStatus').className = 'text-sm text-gray-500';
    document.getElementById('receiptNumber').focus();
}

function hideReceiptDetails() {
    document.getElementById('receiptDetails').classList.add('hidden');
    currentReceipt = null;
    refundSelection = [];
}

function cancelRefund() {
    if (confirm('Are you sure you want to cancel this refund?')) {
        hideReceiptDetails();
        document.getElementById('receiptNumber').value = '';
        document.getElementById('receiptStatus').textContent = 'Enter receipt number to search for transaction';
        document.getElementById('receiptStatus').className = 'text-sm text-gray-500';
    }
}

function goBack() {
    window.location.href = 'pos-main.html';
}
