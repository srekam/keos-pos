# Modern POS Interface

A clean, professional Point of Sale (POS) frontend interface built with Tailwind CSS. Designed for retail and restaurant environments with a focus on usability and modern design.

## 🚀 Quick Start

### Prerequisites
- Node.js (for Tailwind CSS build)
- Modern web browser

### Setup and Development

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Build CSS**
   ```bash
   # Build once
   npm run build
   
   # Watch for changes (development)
   npm run dev
   ```

3. **Start Development Server**
   ```bash
   # Serve files locally on port 8080
   npm run serve
   ```

4. **Access the POS System**
   - Open `index.html` in your browser, or
   - Visit `http://localhost:8080` if using the development server

## 🖥️ Screen Overview

### 1. Login / Shift Open (`index.html`)
- Simple login form (username + password/PIN)
- Opening cash balance entry
- Shift initialization

### 2. Main POS Screen (`pos-main.html`)
- Product search (barcode, text, categories)
- Product grid with quick-add buttons
- Interactive shopping cart
- Real-time total calculations

### 3. Checkout / Payment (`checkout.html`)
- Order summary display
- Multiple payment methods (Cash, Card, QR)
- Change calculation for cash payments
- Receipt options

### 4. Refund Screen (`refund.html`)
- Receipt number lookup
- Item selection for refunds
- Refund processing

### 5. Shift Close (`shift-close.html`)
- Cash reconciliation
- Sales summary
- Transaction history
- Shift reporting

## 🎨 Design Features

- **Large Touch-Friendly Buttons**: Optimized for tablet/touch use
- **Clean Typography**: Easy-to-read fonts and clear hierarchy
- **Professional Color Scheme**: Modern, business-appropriate styling
- **Responsive Layout**: Works on tablets and desktop displays
- **Real-time Updates**: Dynamic calculations and status changes

## 🛠️ Technical Details

### Technology Stack
- **HTML5**: Semantic markup
- **Tailwind CSS**: Utility-first CSS framework
- **Vanilla JavaScript**: No framework dependencies
- **CSS Grid/Flexbox**: Modern layout techniques

### Browser Support
- Chrome/Chromium (recommended)
- Firefox
- Safari
- Edge

### File Structure
```
mock-pos/
├── index.html              # Login/Shift Open
├── pos-main.html           # Main POS Interface
├── checkout.html           # Payment Processing
├── refund.html            # Refund Management
├── shift-close.html       # Shift Closing
├── pos-main.js            # Main POS functionality
├── checkout.js            # Payment processing logic
├── shift-close.js         # Shift management logic
├── refund.js              # Refund processing logic
├── src/
│   └── input.css          # Tailwind CSS source
├── dist/
│   └── output.css         # Compiled CSS
├── tailwind.config.js     # Tailwind configuration
├── package.json           # Dependencies and scripts
├── pos.md                 # Design requirements
└── README.md              # This file
```

## 🔧 Development

### Available Scripts
- `npm run dev` - Watch mode for CSS compilation
- `npm run build` - Build CSS for production
- `npm run serve` - Start local development server

### Customization
- Edit `src/input.css` for custom styles
- Modify `tailwind.config.js` for theme customization
- Update JavaScript files for functionality changes

### Mock Data
The system includes sample products and transactions for demonstration:
- Product catalog with various categories
- Sample receipt data for refund testing
- Mock transaction history for shift closing

## 🎯 Usage Flow

1. **Start Shift**: Login with username/password and enter opening cash
2. **Process Sales**: Search products, add to cart, checkout with payment
3. **Handle Refunds**: Look up receipts and process item-specific refunds
4. **Close Shift**: Reconcile cash and review sales summary

## 📱 Mobile/Tablet Optimization

- **Large Buttons**: Minimum 44px touch targets
- **Clear Text**: 16px minimum font size
- **Simplified Navigation**: One-handed operation support
- **Portrait/Landscape**: Responsive to orientation changes

## 🔒 Security Notes

This is a frontend-only demonstration. In a production environment:
- Implement proper authentication
- Add server-side validation
- Use HTTPS for all communications
- Implement proper session management
- Add audit logging

## 📝 License

MIT License - Feel free to use and modify for your projects.

---

**Built with ❤️ using Tailwind CSS**
