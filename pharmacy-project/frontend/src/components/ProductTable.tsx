import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { 
  Package, 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  ArrowLeft,
  Filter,
  MoreHorizontal
} from 'lucide-react';

interface Product {
  id: number;
  code: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  reorderLevel: number;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
}

export function ProductTable() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock data - replace with API call
  const products: Product[] = [
    { id: 1, code: 'AB001', name: 'Amoxicillin 500mg Capsule', category: 'Antibiotics', price: 45.00, stock: 150, reorderLevel: 10, status: 'in-stock' },
    { id: 2, code: 'PR002', name: 'Paracetamol 500mg Tablet', category: 'Pain Relief', price: 15.00, stock: 8, reorderLevel: 10, status: 'low-stock' },
    { id: 3, code: 'VT003', name: 'Vitamin C 1000mg Tablet', category: 'Vitamins', price: 25.00, stock: 0, reorderLevel: 20, status: 'out-of-stock' },
    { id: 4, code: 'AB004', name: 'Azithromycin 250mg Tablet', category: 'Antibiotics', price: 85.00, stock: 75, reorderLevel: 15, status: 'in-stock' },
    { id: 5, code: 'PR005', name: 'Ibuprofen 400mg Tablet', category: 'Pain Relief', price: 18.00, stock: 120, reorderLevel: 12, status: 'in-stock' },
    { id: 6, code: 'VT006', name: 'Vitamin D3 1000IU Capsule', category: 'Vitamins', price: 35.00, stock: 45, reorderLevel: 25, status: 'in-stock' },
    { id: 7, code: 'DP007', name: 'Cetirizine 10mg Tablet', category: 'Dermatology', price: 22.00, stock: 3, reorderLevel: 8, status: 'low-stock' },
    { id: 8, code: 'CV008', name: 'Amlodipine 5mg Tablet', category: 'Cardiovascular', price: 55.00, stock: 60, reorderLevel: 20, status: 'in-stock' },
  ];

  const categories = ['all', 'Antibiotics', 'Pain Relief', 'Vitamins', 'Dermatology', 'Cardiovascular'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStockStatus = (product: Product) => {
    if (product.stock === 0) {
      return { variant: 'danger' as const, text: 'Out of Stock' };
    }
    if (product.stock <= product.reorderLevel) {
      return { variant: 'warning' as const, text: 'Low Stock' };
    }
    return { variant: 'success' as const, text: 'In Stock' };
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
              <Package className="h-8 w-8 text-pharmacy-primary mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Product Management</h1>
            </div>
            
            <Button className="bg-pharmacy-primary hover:bg-pharmacy-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search products by name or code..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-pharmacy-primary focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Products Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Products Inventory</span>
              <span className="text-sm font-normal text-gray-500">
                {filteredProducts.length} of {products.length} products
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => {
                  const stockStatus = getStockStatus(product);
                  return (
                    <TableRow key={product.id} className="hover:bg-gray-50">
                      <TableCell className="font-mono font-medium">
                        {product.code}
                      </TableCell>
                      <TableCell className="font-medium">
                        {product.name}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {product.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">
                        {formatCurrency(product.price)}
                      </TableCell>
                      <TableCell>
                        <div className="text-center">
                          <span className="font-medium">{product.stock}</span>
                          <div className="text-xs text-gray-500">
                            Reorder: {product.reorderLevel}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={stockStatus.variant}>
                          {stockStatus.text}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-500">
                  Try adjusting your search or filter criteria.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
