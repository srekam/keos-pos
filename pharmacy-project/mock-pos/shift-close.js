let openingBalance = 0;
let cashSales = 0;
let transactions = [];

document.addEventListener('DOMContentLoaded', function() {
    loadShiftData();
    displayShiftSummary();
});

function loadShiftData() {
    // Load opening balance
    openingBalance = parseFloat(sessionStorage.getItem('openingCash')) || 0;
    
    // Load transactions from localStorage (mock data for demo)
    const savedTransactions = localStorage.getItem('shiftTransactions');
    transactions = savedTransactions ? JSON.parse(savedTransactions) : generateMockTransactions();
    
    // Calculate cash sales
    cashSales = transactions
        .filter(t => t.paymentMethod === 'cash')
        .reduce((sum, t) => sum + t.total, 0);
}

function generateMockTransactions() {
    // Generate some mock transactions for demonstration
    const mockTransactions = [
        {
            receiptNumber: 'R12345001',
            timestamp: new Date(Date.now() - 3600000).toISOString(),
            items: [
                { product: { name: 'Apple', price: 1.50 }, quantity: 2 },
                { product: { name: 'Banana', price: 0.75 }, quantity: 3 }
            ],
            subtotal: 5.25,
            tax: 0.45,
            total: 5.70,
            paymentMethod: 'cash',
            cashier: sessionStorage.getItem('cashier') || 'Demo Cashier'
        },
        {
            receiptNumber: 'R12345002',
            timestamp: new Date(Date.now() - 2400000).toISOString(),
            items: [
                { product: { name: 'Coca Cola', price: 2.99 }, quantity: 1 },
                { product: { name: 'Chips', price: 3.50 }, quantity: 1 }
            ],
            subtotal: 6.49,
            tax: 0.55,
            total: 7.04,
            paymentMethod: 'card',
            cashier: sessionStorage.getItem('cashier') || 'Demo Cashier'
        },
        {
            receiptNumber: 'R12345003',
            timestamp: new Date(Date.now() - 1200000).toISOString(),
            items: [
                { product: { name: 'Milk', price: 3.75 }, quantity: 1 }
            ],
            subtotal: 3.75,
            tax: 0.32,
            total: 4.07,
            paymentMethod: 'qr',
            cashier: sessionStorage.getItem('cashier') || 'Demo Cashier'
        }
    ];
    
    return mockTransactions;
}

function displayShiftSummary() {
    // Display shift start time
    const shiftStart = sessionStorage.getItem('shiftStartTime');
    if (shiftStart) {
        document.getElementById('shiftStart').textContent = new Date(shiftStart).toLocaleString();
    }
    
    // Display opening balance
    document.getElementById('openingBalance').textContent = `$${openingBalance.toFixed(2)}`;
    
    // Calculate totals
    const totalSales = transactions.reduce((sum, t) => sum + t.total, 0);
    const totalTransactions = transactions.length;
    const cashSalesTotal = transactions.filter(t => t.paymentMethod === 'cash').reduce((sum, t) => sum + t.total, 0);
    const cardSalesTotal = transactions.filter(t => t.paymentMethod === 'card').reduce((sum, t) => sum + t.total, 0);
    const qrSalesTotal = transactions.filter(t => t.paymentMethod === 'qr').reduce((sum, t) => sum + t.total, 0);
    const taxCollected = transactions.reduce((sum, t) => sum + t.tax, 0);
    
    // Calculate expected cash
    const expectedCash = openingBalance + cashSalesTotal;
    
    // Update display
    document.getElementById('totalTransactions').textContent = totalTransactions;
    document.getElementById('totalSales').textContent = `$${totalSales.toFixed(2)}`;
    document.getElementById('cashSales').textContent = `$${cashSalesTotal.toFixed(2)}`;
    document.getElementById('cardSales').textContent = `$${cardSalesTotal.toFixed(2)}`;
    document.getElementById('qrSales').textContent = `$${qrSalesTotal.toFixed(2)}`;
    document.getElementById('taxCollected').textContent = `$${taxCollected.toFixed(2)}`;
    document.getElementById('expectedCash').textContent = `$${expectedCash.toFixed(2)}`;
    
    // Display transaction history
    displayTransactionHistory();
}

function displayTransactionHistory() {
    const tbody = document.getElementById('transactionHistory');
    
    if (transactions.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="text-center py-8 text-gray-500">No transactions recorded</td></tr>';
        return;
    }
    
    tbody.innerHTML = transactions.map(transaction => `
        <tr class="border-b border-gray-100">
            <td class="py-2">${transaction.receiptNumber}</td>
            <td class="py-2">${new Date(transaction.timestamp).toLocaleTimeString()}</td>
            <td class="py-2">${transaction.items.length} item(s)</td>
            <td class="py-2 capitalize">${transaction.paymentMethod}</td>
            <td class="py-2 text-right font-medium">$${transaction.total.toFixed(2)}</td>
        </tr>
    `).join('');
}

function calculateVariance() {
    const countedCash = parseFloat(document.getElementById('countedCash').value) || 0;
    const expectedCash = openingBalance + transactions.filter(t => t.paymentMethod === 'cash').reduce((sum, t) => sum + t.total, 0);
    const variance = countedCash - expectedCash;
    
    const varianceElement = document.getElementById('cashVariance');
    varianceElement.textContent = `$${variance.toFixed(2)}`;
    
    // Color code the variance
    if (variance > 0) {
        varianceElement.className = 'font-bold text-success-600';
    } else if (variance < 0) {
        varianceElement.className = 'font-bold text-danger-600';
    } else {
        varianceElement.className = 'font-bold text-gray-900';
    }
}

function printShiftReport() {
    const countedCash = parseFloat(document.getElementById('countedCash').value) || 0;
    const expectedCash = openingBalance + transactions.filter(t => t.paymentMethod === 'cash').reduce((sum, t) => sum + t.total, 0);
    const variance = countedCash - expectedCash;
    
    const report = `
SHIFT CLOSE REPORT
==================
Cashier: ${sessionStorage.getItem('cashier')}
Shift Start: ${new Date(sessionStorage.getItem('shiftStartTime')).toLocaleString()}
Shift End: ${new Date().toLocaleString()}

CASH SUMMARY
============
Opening Balance: $${openingBalance.toFixed(2)}
Cash Sales: $${transactions.filter(t => t.paymentMethod === 'cash').reduce((sum, t) => sum + t.total, 0).toFixed(2)}
Expected Cash: $${expectedCash.toFixed(2)}
Counted Cash: $${countedCash.toFixed(2)}
Variance: $${variance.toFixed(2)}

SALES SUMMARY
=============
Total Transactions: ${transactions.length}
Total Sales: $${transactions.reduce((sum, t) => sum + t.total, 0).toFixed(2)}
Tax Collected: $${transactions.reduce((sum, t) => sum + t.tax, 0).toFixed(2)}

PAYMENT BREAKDOWN
=================
Cash: $${transactions.filter(t => t.paymentMethod === 'cash').reduce((sum, t) => sum + t.total, 0).toFixed(2)}
Card: $${transactions.filter(t => t.paymentMethod === 'card').reduce((sum, t) => sum + t.total, 0).toFixed(2)}
QR: $${transactions.filter(t => t.paymentMethod === 'qr').reduce((sum, t) => sum + t.total, 0).toFixed(2)}
    `;
    
    alert('Shift report printed!\\n\\n' + report);
}

function closeShift() {
    const countedCash = parseFloat(document.getElementById('countedCash').value);
    
    if (isNaN(countedCash)) {
        alert('Please enter the counted cash balance before closing the shift.');
        return;
    }
    
    if (confirm('Are you sure you want to close this shift? This action cannot be undone.')) {
        // Clear session data
        sessionStorage.clear();
        localStorage.removeItem('shiftTransactions');
        
        alert('Shift closed successfully!');
        window.location.href = 'index.html';
    }
}

function goBack() {
    if (confirm('Are you sure you want to go back without closing the shift?')) {
        window.location.href = 'pos-main.html';
    }
}
