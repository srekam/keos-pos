import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  ArrowLeft,
  Search,
  User,
  CreditCard,
  DollarSign,
  Receipt
} from 'lucide-react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  total: number;
}

export function SalesForm() {
  const navigate = useNavigate();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');

  // Mock products - replace with API call
  const products = [
    { id: 1, name: 'Paracetamol 500mg', price: 15.00, stock: 100 },
    { id: 2, name: 'Amoxicillin 500mg', price: 45.00, stock: 150 },
    { id: 3, name: 'Vitamin C 1000mg', price: 25.00, stock: 80 },
    { id: 4, name: 'Ibuprofen 400mg', price: 18.00, stock: 120 },
    { id: 5, name: 'Cetirizine 10mg', price: 22.00, stock: 60 },
  ];

  const addToCart = () => {
    if (!selectedProduct || quantity <= 0) return;
    
    const product = products.find(p => p.id === parseInt(selectedProduct));
    if (!product) return;

    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + quantity, total: (item.quantity + quantity) * item.price }
          : item
      ));
    } else {
      const newItem: CartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity,
        total: product.price * quantity
      };
      setCart([...cart, newItem]);
    }
    
    setSelectedProduct('');
    setQuantity(1);
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
      return;
    }
    
    setCart(cart.map(item => 
      item.id === id 
        ? { ...item, quantity: newQuantity, total: newQuantity * item.price }
        : item
    ));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.total, 0);
  const vat = subtotal * 0.07; // 7% VAT
  const total = subtotal + vat;

  const handleCheckout = () => {
    if (cart.length === 0) return;
    
    // Here you would typically send the sale to your API
    console.log('Processing sale:', {
      customer: customerName,
      items: cart,
      subtotal,
      vat,
      total,
      paymentMethod
    });
    
    // For demo purposes, just show success and clear cart
    alert('Sale completed successfully!');
    setCart([]);
    setCustomerName('');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate('/dashboard')}
                className="mr-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <ShoppingCart className="h-8 w-8 text-pharmacy-primary mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">New Sale</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Plus className="h-5 w-5 mr-2" />
                Add Products
              </CardTitle>
              <CardDescription>
                Search and add products to the cart
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="product">Product</Label>
                <select
                  id="product"
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pharmacy-primary focus:border-transparent"
                >
                  <option value="">Select a product</option>
                  {products.map(product => (
                    <option key={product.id} value={product.id}>
                      {product.name} - {formatCurrency(product.price)} (Stock: {product.stock})
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                />
              </div>
              
              <Button 
                onClick={addToCart} 
                className="w-full bg-pharmacy-primary hover:bg-pharmacy-primary/90"
                disabled={!selectedProduct || quantity <= 0}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
            </CardContent>
          </Card>

          {/* Shopping Cart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Shopping Cart
              </CardTitle>
              <CardDescription>
                Review items and complete the sale
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Cart is empty</h3>
                  <p className="text-gray-500">
                    Add products to start a sale.
                  </p>
                </div>
              ) : (
                <>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{item.name}</p>
                          <p className="text-sm text-gray-500">
                            {formatCurrency(item.price)} × {item.quantity}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{formatCurrency(item.total)}</span>
                          <div className="flex items-center border rounded">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="h-8 w-8 p-0"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="px-2 text-sm">{item.quantity}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="h-8 w-8 p-0"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-600 hover:text-red-700 h-8 w-8 p-0"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Customer Information */}
                  <div className="space-y-2">
                    <Label htmlFor="customer">Customer Name (Optional)</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="customer"
                        placeholder="Enter customer name"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  {/* Payment Method */}
                  <div className="space-y-2">
                    <Label htmlFor="payment">Payment Method</Label>
                    <select
                      id="payment"
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pharmacy-primary focus:border-transparent"
                    >
                      <option value="cash">Cash</option>
                      <option value="card">Credit Card</option>
                      <option value="promptpay">PromptPay</option>
                      <option value="transfer">Bank Transfer</option>
                    </select>
                  </div>
                  
                  {/* Order Summary */}
                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>{formatCurrency(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>VAT (7%):</span>
                      <span>{formatCurrency(vat)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg border-t pt-2">
                      <span>Total:</span>
                      <span>{formatCurrency(total)}</span>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleCheckout}
                    className="w-full bg-green-600 hover:bg-green-700"
                    disabled={cart.length === 0}
                  >
                    <Receipt className="h-4 w-4 mr-2" />
                    Complete Sale
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
