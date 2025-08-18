import React, { useState } from 'react';
import { 
  ShoppingBag, 
  BarChart3,
  Truck,
  UserCheck,
  Users,
  Puzzle,
  Settings,
  HelpCircle,
  Plus,
  Package,
  Tag,
  Percent,
  FileText,
  Grid3X3,
  AlertTriangle
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

export function ProductsPage() {
  const [activeSection, setActiveSection] = useState('item-list');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedModifiers, setSelectedModifiers] = useState<string[]>([]);
  const [selectedDiscounts, setSelectedDiscounts] = useState<string[]>([]);

  const productSections = [
    { id: 'item-list', label: 'Item list' },
    { id: 'categories', label: 'Categories' },
    { id: 'modifiers', label: 'Modifiers' },
    { id: 'discounts', label: 'Discounts' },
  ];

  const items = [
    {
      id: '1',
      name: 'Sample Product',
      category: 'General',
      price: '$9.99',
      stock: 50,
      status: 'Active'
    }
  ];

  const categories = [
    {
      id: '1',
      name: 'General',
      description: 'General category for miscellaneous items',
      items: 1
    }
  ];

  const modifiers = [
    {
      id: '1',
      name: 'Size Options',
      description: 'Small, Medium, Large',
      items: 3
    }
  ];

  const discounts = [
    {
      id: '1',
      name: 'Holiday Sale',
      description: '20% off selected items',
      active: true
    }
  ];

  const handleSelectAll = (section: string) => {
    switch (section) {
      case 'item-list':
        if (selectedItems.length === items.length) {
          setSelectedItems([]);
        } else {
          setSelectedItems(items.map(item => item.id));
        }
        break;
      case 'categories':
        if (selectedCategories.length === categories.length) {
          setSelectedCategories([]);
        } else {
          setSelectedCategories(categories.map(cat => cat.id));
        }
        break;
      case 'modifiers':
        if (selectedModifiers.length === modifiers.length) {
          setSelectedModifiers([]);
        } else {
          setSelectedModifiers(modifiers.map(mod => mod.id));
        }
        break;
      case 'discounts':
        if (selectedDiscounts.length === discounts.length) {
          setSelectedDiscounts([]);
        } else {
          setSelectedDiscounts(discounts.map(disc => disc.id));
        }
        break;
    }
  };

  const handleSelectItem = (section: string, id: string) => {
    switch (section) {
      case 'item-list':
        setSelectedItems(prev => 
          prev.includes(id) 
            ? prev.filter(item => item !== id)
            : [...prev, id]
        );
        break;
      case 'categories':
        setSelectedCategories(prev => 
          prev.includes(id) 
            ? prev.filter(item => item !== id)
            : [...prev, id]
        );
        break;
      case 'modifiers':
        setSelectedModifiers(prev => 
          prev.includes(id) 
            ? prev.filter(item => item !== id)
            : [...prev, id]
        );
        break;
      case 'discounts':
        setSelectedDiscounts(prev => 
          prev.includes(id) 
            ? prev.filter(item => item !== id)
            : [...prev, id]
        );
        break;
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'item-list':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="w-12 h-12 text-gray-400" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Products</h2>
              <p className="text-gray-600 mb-8">
                Here you can manage your products. <a href="#" className="text-green-600 hover:underline">Learn more</a>
              </p>
              <div className="flex justify-center space-x-4">
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  ADD PRODUCT
                </Button>
                <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                  <Package className="w-4 h-4 mr-2" />
                  IMPORT PRODUCTS
                </Button>
              </div>
            </div>
          </div>
        );

      case 'categories':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Grid3X3 className="w-12 h-12 text-gray-400" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Categories</h2>
              <p className="text-gray-600 mb-8">
                Categories help you organize products. <a href="#" className="text-green-600 hover:underline">Learn more</a>
              </p>
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                ADD CATEGORY
              </Button>
            </div>
          </div>
        );

      case 'modifiers':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="w-12 h-12 text-gray-400" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Product Modifiers</h2>
              <p className="text-gray-600 mb-8">
                Create sets of options that can be applied to products. <a href="#" className="text-green-600 hover:underline">Learn more</a>
              </p>
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                ADD MODIFIER
              </Button>
            </div>
          </div>
        );

      case 'discounts':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Percent className="w-12 h-12 text-gray-400" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Discounts</h2>
              <p className="text-gray-600 mb-8">
                Create discounts that can be applied at the time of sale. <a href="#" className="text-green-600 hover:underline">Learn more</a>
              </p>
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                ADD DISCOUNT
              </Button>
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
              <ShoppingBag className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-semibold">
              {productSections.find(section => section.id === activeSection)?.label || 'Products'}
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
                <UserCheck className="w-5 h-5 text-gray-600" />
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
                <BarChart3 className="w-5 h-5 text-green-600" />
                <span className="text-sm">Analysis</span>
                <div className="ml-auto w-4 h-4 text-gray-400">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Products Section - Active */}
            <div className="px-4 py-2 bg-pink-50 border-l-4 border-pink-500">
              <div className="flex items-center space-x-3 text-pink-700">
                <ShoppingBag className="w-5 h-5" />
                <span className="text-sm font-medium">Products</span>
                <div className="ml-auto w-4 h-4 text-pink-600">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </div>
              </div>
              
              {/* Products Submenu */}
              <div className="ml-6 mt-2 space-y-1">
                {productSections.map((section) => (
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
                <Truck className="w-5 h-5 text-blue-600" />
                <span className="text-sm">Inventory management</span>
                <div className="ml-auto w-4 h-4 text-gray-400">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="px-4 py-2">
              <div className="flex items-center space-x-3 text-gray-600">
                <UserCheck className="w-5 h-5 text-green-600" />
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
                <Users className="w-5 h-5 text-purple-600" />
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
                <Puzzle className="w-5 h-5 text-amber-600" />
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
                <Settings className="w-5 h-5 text-gray-600" />
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
                <HelpCircle className="w-5 h-5 text-sky-600" />
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
