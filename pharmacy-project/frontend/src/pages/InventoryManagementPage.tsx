import React, { useState } from 'react';
import { 
  ShoppingCart, 
  FileText, 
  ArrowLeftRight, 
  ClipboardList, 
  Barcode, 
  Settings, 
  Truck, 
  History, 
  DollarSign,
  Plus,
  Calendar,
  Users,
  Filter,
  Download,
  AlertTriangle,
  Clock,
  TrendingUp
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

export function InventoryManagementPage() {
  const [activeSection, setActiveSection] = useState('overview');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dateRange, setDateRange] = useState('Jul 19, 2025 - Aug 17, 2025');
  const [selectedEmployee, setSelectedEmployee] = useState('All employees...');
  const [selectedReason, setSelectedReason] = useState('All reasons...');

  const inventorySections = [
    { id: 'overview', label: 'Advanced inventory', icon: ShoppingCart, description: 'Gain deeper insight into your inventory' },
    { id: 'purchase-orders', label: 'Purchase orders', icon: FileText, description: 'Plan purchases, send orders to suppliers and track stock receipts' },
    { id: 'transfer-orders', label: 'Transfer orders', icon: ArrowLeftRight, description: 'Create transfer orders and move stock between your stores' },
    { id: 'stock-adjustments', label: 'Stock adjustments', icon: ClipboardList, description: 'Increase and decrease stock levels for received items, damages and loss' },
    { id: 'inventory-counts', label: 'Inventory counts', icon: Barcode, description: 'Perform full or partial stocktakes with a barcode scanner or manually' },
    { id: 'productions', label: 'Productions', icon: Settings, description: 'Track stock of items produced out of ingredients' },
    { id: 'suppliers', label: 'Suppliers', icon: Truck, description: 'Add suppliers to create purchase orders and get quick access to contacts' },
    { id: 'inventory-history', label: 'Inventory history', icon: History, description: 'Gain insights into the flow of your inventory by viewing adjustment log' },
    { id: 'inventory-valuation', label: 'Inventory valuation', icon: DollarSign, description: 'View report on the cost and potential profit of your inventory' }
  ];

  const features = [
    {
      id: 'purchase-orders',
      title: 'Purchase orders',
      icon: FileText,
      description: 'Plan purchases, export records to suppliers, track stock receipts and manage vendor relationships.',
      color: 'text-blue-600'
    },
    {
      id: 'stock-adjustments',
      title: 'Stock adjustments',
      icon: ClipboardList,
      description: 'Increase and decrease stock levels for received items, damages and loss.',
      color: 'text-green-600'
    },
    {
      id: 'productions',
      title: 'Production',
      icon: Settings,
      description: 'Track stock of items produced out of ingredients.',
      color: 'text-purple-600'
    },
    {
      id: 'inventory-valuation',
      title: 'Inventory valuation report',
      icon: DollarSign,
      description: 'View report on the cost and potential profit of your inventory.',
      color: 'text-orange-600'
    },
    {
      id: 'transfer-orders',
      title: 'Transfer orders',
      icon: ArrowLeftRight,
      description: 'Easily create transfer orders and move stock between your stores.',
      color: 'text-indigo-600'
    },
    {
      id: 'inventory-counts',
      title: 'Inventory counts',
      icon: Barcode,
      description: 'Perform full or partial stocktakes with a barcode scanner or manually.',
      color: 'text-teal-600'
    },
    {
      id: 'inventory-history',
      title: 'Inventory history',
      icon: History,
      description: 'Gain insights into the flow of your inventory by viewing adjustment log.',
      color: 'text-gray-600'
    },
    {
      id: 'label-printing',
      title: 'Label printing',
      icon: Barcode,
      description: 'Print barcode labels to effortlessly add items to sales, purchase orders or inventory counts.',
      color: 'text-pink-600'
    }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingCart className="w-12 h-12 text-blue-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Advanced inventory</h1>
              <p className="text-lg text-gray-600 mb-8">Gain deeper insight into your inventory.</p>
              
              <Button className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-4 mb-12">
                START 14 DAY FREE TRIAL
              </Button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {features.map((feature) => (
                  <div key={feature.id} className="text-left p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <feature.icon className={`w-6 h-6 ${feature.color}`} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'purchase-orders':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="w-12 h-12 text-gray-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Purchase orders</h1>
              <p className="text-lg text-gray-600 mb-8">
                Plan purchases, send orders to suppliers and track stock receipts.{' '}
                <span className="text-green-600 cursor-pointer hover:underline">Learn more</span>
              </p>
              
              <Button className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-4">
                <Plus className="w-5 h-5 mr-2" />
                ADD PURCHASE ORDER
              </Button>
            </div>
          </div>
        );

      case 'transfer-orders':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <ArrowLeftRight className="w-12 h-12 text-gray-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Transfer orders</h1>
              <p className="text-lg text-gray-600 mb-8">
                Create transfer orders and move stock between your stores.{' '}
                <span className="text-green-600 cursor-pointer hover:underline">Learn more</span>
              </p>
              
              <Button className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-4">
                <Plus className="w-5 h-5 mr-2" />
                ADD TRANSFER ORDER
              </Button>
            </div>
          </div>
        );

      case 'stock-adjustments':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <ClipboardList className="w-12 h-12 text-gray-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Stock adjustments</h1>
              <p className="text-lg text-gray-600 mb-8">
                Increase and decrease stock levels for received items, damages and loss.{' '}
                <span className="text-green-600 cursor-pointer hover:underline">Learn more</span>
              </p>
              
              <Button className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-4">
                <Plus className="w-5 h-5 mr-2" />
                ADD STOCK ADJUSTMENT
              </Button>
            </div>
          </div>
        );

      case 'inventory-counts':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Barcode className="w-12 h-12 text-gray-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Inventory counts</h1>
              <p className="text-lg text-gray-600 mb-8">
                Perform full or partial stocktakes with a barcode scanner or manually.{' '}
                <span className="text-green-600 cursor-pointer hover:underline">Learn more</span>
              </p>
              
              <Button className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-4">
                <Plus className="w-5 h-5 mr-2" />
                ADD INVENTORY COUNT
              </Button>
            </div>
          </div>
        );

      case 'productions':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Settings className="w-12 h-12 text-gray-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Productions</h1>
              <p className="text-lg text-gray-600 mb-8">
                Track stock of items produced out of ingredients.{' '}
                <span className="text-green-600 cursor-pointer hover:underline">Learn more</span>
              </p>
              
              <Button className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-4">
                <Plus className="w-5 h-5 mr-2" />
                ADD PRODUCTION
              </Button>
            </div>
          </div>
        );

      case 'suppliers':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Truck className="w-12 h-12 text-gray-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Suppliers</h1>
              <p className="text-lg text-gray-600 mb-8">
                Add suppliers to create purchase orders and get quick access to contacts.{' '}
                <span className="text-green-600 cursor-pointer hover:underline">Learn more</span>
              </p>
              
              <Button className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-4">
                <Plus className="w-5 h-5 mr-2" />
                ADD SUPPLIER
              </Button>
            </div>
          </div>
        );

      case 'inventory-history':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" className="p-2">
                      <Calendar className="w-4 h-4" />
                    </Button>
                    <div className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-700">{dateRange}</span>
                    </div>
                    <Button variant="ghost" size="sm" className="p-2">
                      <Calendar className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-gray-500" />
                    <select
                      value={selectedEmployee}
                      onChange={(e) => setSelectedEmployee(e.target.value)}
                      className="border border-gray-300 rounded px-3 py-2 text-sm"
                    >
                      <option value="All employees...">All employees...</option>
                      <option value="Owner">Owner</option>
                      <option value="Dr. Sarah Johnson">Dr. Sarah Johnson</option>
                      <option value="Mike Chen">Mike Chen</option>
                    </select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Filter className="w-4 h-4 text-gray-500" />
                    <select
                      value={selectedReason}
                      onChange={(e) => setSelectedReason(e.target.value)}
                      className="border border-gray-300 rounded px-3 py-2 text-sm"
                    >
                      <option value="All reasons...">All reasons...</option>
                      <option value="Received">Received</option>
                      <option value="Damaged">Damaged</option>
                      <option value="Lost">Lost</option>
                      <option value="Sold">Sold</option>
                    </select>
                  </div>
                </div>
              </div>

              <Button className="mb-6">
                <Download className="w-4 h-4 mr-2" />
                EXPORT
              </Button>

              <div className="border border-gray-200 rounded-lg">
                <div className="p-4 border-b border-gray-200 bg-gray-50 grid grid-cols-7 gap-4">
                  <span className="font-medium text-gray-700">Date</span>
                  <span className="font-medium text-gray-700">Item</span>
                  <span className="font-medium text-gray-700">Store</span>
                  <span className="font-medium text-gray-700">Employee</span>
                  <span className="font-medium text-gray-700">Reason</span>
                  <span className="font-medium text-gray-700">Adjustment</span>
                  <span className="font-medium text-gray-700">Stock after</span>
                </div>
              </div>

              <div className="text-center py-20">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Clock className="w-12 h-12 text-gray-400" />
                </div>
                <p className="text-gray-600 text-lg mb-2">No data to display</p>
                <p className="text-gray-500">There are no stock movements in the selected time period</p>
              </div>
            </div>
          </div>
        );

      case 'inventory-valuation':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-6">
                <Button>
                  <Download className="w-4 h-4 mr-2" />
                  EXPORT
                </Button>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" className="p-2">
                    <Calendar className="w-4 h-4" />
                  </Button>
                  <div className="px-3 py-2 border border-gray-300 rounded-lg">
                    <span className="text-sm text-gray-700">Aug 17, 2025</span>
                  </div>
                  <Button variant="ghost" size="sm" className="p-2">
                    <Calendar className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg">
                <div className="p-4 border-b border-gray-200 bg-gray-50 grid grid-cols-7 gap-4">
                  <span className="font-medium text-gray-700">Item</span>
                  <span className="font-medium text-gray-700">In stock</span>
                  <span className="font-medium text-gray-700">Cost</span>
                  <span className="font-medium text-gray-700">Inventory value</span>
                  <span className="font-medium text-gray-700">Retail value</span>
                  <span className="font-medium text-gray-700">Potential profit</span>
                  <span className="font-medium text-gray-700">Margin</span>
                </div>
              </div>

              <div className="text-center py-20">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="w-12 h-12 text-gray-400" />
                </div>
                <p className="text-gray-600 text-lg mb-2">No data to display</p>
                <p className="text-gray-500">You have not enabled stock tracking for items yet</p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-green-600 text-white shadow-md">
        <div className="flex items-center px-4 py-3">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white/20 rounded flex items-center justify-center">
              <ShoppingCart className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-semibold">
              {inventorySections.find(section => section.id === activeSection)?.label || 'Stock Manage'}
            </h1>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Left Sidebar */}
        <aside className="w-64 bg-white shadow-md flex-shrink-0 min-h-screen">
          {/* User Profile Section */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                <ShoppingCart className="w-5 h-5 text-gray-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">Owner</h3>
                <p className="text-sm text-gray-500">srekam@gmail.com</p>
              </div>
              <div className="w-4 h-4 text-gray-400">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="py-2">
            <div className="px-4 py-2">
              <div className="flex items-center space-x-3 text-gray-600">
                <div className="w-5 h-5 bg-green-500 rounded flex items-center justify-center">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-3 h-3 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <span className="text-sm">Analysis</span>
                <div className="ml-auto w-4 h-4 text-gray-400">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="px-4 py-2">
              <div className="flex items-center space-x-3 text-gray-600">
                <div className="w-5 h-5 bg-pink-500 rounded flex items-center justify-center">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-3 h-3 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <span className="text-sm">Items</span>
                <div className="ml-auto w-4 h-4 text-gray-400">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Inventory Management Section - Active */}
            <div className="px-4 py-2 bg-blue-50">
              <div className="flex items-center space-x-3 text-blue-700">
                <ShoppingCart className="w-5 h-5" />
                <span className="text-sm font-medium">Inventory management</span>
                <div className="ml-auto w-4 h-4 text-blue-600">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </div>
              </div>
              
              {/* Inventory Submenu */}
              <div className="ml-6 mt-2 space-y-1">
                {inventorySections.map((section) => (
                  <div
                    key={section.id}
                    className={`px-3 py-2 rounded cursor-pointer transition-colors ${
                      activeSection === section.id 
                        ? 'bg-green-100 text-green-700' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                    onClick={() => setActiveSection(section.id)}
                  >
                    <span className="text-sm">{section.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="px-4 py-2">
              <div className="flex items-center space-x-3 text-gray-600">
                <div className="w-5 h-5 bg-green-500 rounded flex items-center justify-center">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-3 h-3 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <span className="text-sm">Employees</span>
                <div className="ml-auto w-4 h-4 text-gray-400">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="px-4 py-2">
              <div className="flex items-center space-x-3 text-gray-600">
                <div className="w-5 h-5 bg-purple-500 rounded flex items-center justify-center">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-3 h-3 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
                <span className="text-sm">Customers</span>
                <div className="ml-auto w-4 h-4 text-gray-400">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="px-4 py-2">
              <div className="flex items-center space-x-3 text-gray-600">
                <div className="w-5 h-5 bg-amber-500 rounded flex items-center justify-center">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-3 h-3 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                  </svg>
                </div>
                <span className="text-sm">Integrations</span>
                <div className="ml-auto w-4 h-4 text-gray-400">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="px-4 py-2">
              <div className="flex items-center space-x-3 text-gray-600">
                <div className="w-5 h-5 bg-gray-500 rounded flex items-center justify-center">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-3 h-3 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span className="text-sm">Settings</span>
                <div className="ml-auto w-4 h-4 text-gray-400">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="px-4 py-2">
              <div className="flex items-center space-x-3 text-gray-600">
                <div className="w-5 h-5 bg-sky-500 rounded flex items-center justify-center">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-3 h-3 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-sm">Help</span>
                <div className="ml-auto w-4 h-4 text-gray-400">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
