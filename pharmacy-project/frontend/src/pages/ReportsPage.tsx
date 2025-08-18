import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Package, 
  FolderOpen, 
  UserCheck, 
  CreditCard, 
  Receipt, 
  Plus, 
  Calendar,
  Clock,
  Users,
  Download,
  AlertTriangle,
  DollarSign,
  Percent,
  FileText
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

export function AnalysisPage() {
  const [activeSection, setActiveSection] = useState('performance-overview');
  const [dateRange, setDateRange] = useState('Jul 19, 2025 - Aug 17, 2025');
  const [selectedEmployee, setSelectedEmployee] = useState('All employees...');
  const [selectedTime, setSelectedTime] = useState('All day');

  const reportSections = [
    { id: 'performance-overview', label: 'Performance overview', icon: TrendingUp, description: 'Sales summary and performance metrics' },
    { id: 'item-analysis', label: 'Item Analysis', icon: Package, description: 'Sales analysis by individual items' },
    { id: 'category-analysis', label: 'Category Analysis', icon: FolderOpen, description: 'Sales performance by product categories' },
    { id: 'pharmacist-analysis', label: 'Pharmacist Analysis', icon: UserCheck, description: 'Sales performance by employees' },
    { id: 'payment-analysis', label: 'Payment Analysis', icon: CreditCard, description: 'Sales analysis by payment methods' },
    { id: 'billing', label: 'Billing', icon: Receipt, description: 'Receipt management and tracking' },
    { id: 'addon-analysis', label: 'Add-on Analysis', icon: Plus, description: 'Sales analysis by modifiers and add-ons' },
    { id: 'discount', label: 'Discount', icon: Percent, description: 'Discount analysis and tracking' },
    { id: 'vat', label: 'VAT', icon: DollarSign, description: 'Tax analysis and reporting' },
    { id: 'work-timing', label: 'Work Timing', icon: Clock, description: 'Shift management and timing analysis' }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'performance-overview':
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
                    <Clock className="w-4 h-4 text-gray-500" />
                    <select
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="border border-gray-300 rounded px-3 py-2 text-sm"
                    >
                      <option value="All day">All day</option>
                      <option value="Morning">Morning</option>
                      <option value="Afternoon">Afternoon</option>
                      <option value="Evening">Evening</option>
                    </select>
                  </div>
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
                </div>
              </div>

              {/* Summary Metrics */}
              <div className="grid grid-cols-5 gap-4 mb-8">
                {[
                  { label: 'Gross sales', value: '฿0.00', change: '฿0.00 (0%)' },
                  { label: 'Refunds', value: '฿0.00', change: '฿0.00 (0%)' },
                  { label: 'Discounts', value: '฿0.00', change: '฿0.00 (0%)' },
                  { label: 'Net sales', value: '฿0.00', change: '฿0.00 (0%)' },
                  { label: 'Gross profit', value: '฿0.00', change: '฿0.00 (0%)' }
                ].map((metric, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg text-center">
                    <h3 className="text-sm font-medium text-gray-600 mb-2">{metric.label}</h3>
                    <p className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</p>
                    <p className="text-sm text-gray-500">{metric.change}</p>
                  </div>
                ))}
              </div>

              {/* Gross Sales Graph */}
              <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Gross sales</h3>
                <div className="h-32 bg-white rounded border flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-2">
                      <TrendingUp className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500">No sales data available</p>
                  </div>
                </div>
              </div>

              {/* Data Table */}
              <div className="mb-6">
                <span className="text-sm font-medium text-gray-700">EXPORT</span>
              </div>

              <div className="border border-gray-200 rounded-lg">
                <div className="p-4 border-b border-gray-200 bg-gray-50 grid grid-cols-7 gap-4">
                  <span className="font-medium text-gray-700">Date</span>
                  <span className="font-medium text-gray-700">Gross sales</span>
                  <span className="font-medium text-gray-700">Refunds</span>
                  <span className="font-medium text-gray-700">Discounts</span>
                  <span className="font-medium text-gray-700">Net sales</span>
                  <span className="font-medium text-gray-700">Cost of goods</span>
                  <span className="font-medium text-gray-700">Gross profit</span>
                </div>
              </div>

              <div className="text-center py-20">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Receipt className="w-12 h-12 text-gray-400" />
                </div>
                <p className="text-gray-600 text-lg mb-2">No data to display</p>
                <p className="text-gray-500">There are no sales in the selected time period</p>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-6">
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" className="p-2">
                    <Calendar className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="p-2">
                    <Calendar className="w-4 h-4" />
                  </Button>
                  <span className="text-sm text-gray-600">Page: 1 of 3</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Rows per page:</span>
                  <select className="border border-gray-300 rounded px-2 py-1 text-sm">
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );

      case 'item-analysis':
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
                    <Clock className="w-4 h-4 text-gray-500" />
                    <select
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="border border-gray-300 rounded px-3 py-2 text-sm"
                    >
                      <option value="All day">All day</option>
                      <option value="Morning">Morning</option>
                      <option value="Afternoon">Afternoon</option>
                      <option value="Evening">Evening</option>
                    </select>
                  </div>
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
                </div>
              </div>

              {/* Top Items and Net Sales */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Top 5 items</h3>
                  <div className="text-center py-8">
                    <p className="text-gray-500">No data available</p>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Net sales</h3>
                  <div className="text-center py-8">
                    <p className="text-gray-500">No data available</p>
                  </div>
                </div>
              </div>

              {/* Sales Chart */}
              <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Sales by item chart</h3>
                  <div className="flex items-center space-x-2">
                    <select className="border border-gray-300 rounded px-2 py-1 text-sm">
                      <option value="bar">Bar</option>
                      <option value="line">Line</option>
                    </select>
                    <select className="border border-gray-300 rounded px-2 py-1 text-sm">
                      <option value="days">Days</option>
                      <option value="weeks">Weeks</option>
                      <option value="months">Months</option>
                    </select>
                  </div>
                </div>
                <div className="h-32 bg-white rounded border flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-2">
                      <TrendingUp className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500">No data to display</p>
                  </div>
                </div>
              </div>

              {/* Export and Table */}
              <div className="mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">EXPORT</span>
                  <Button variant="ghost" size="sm" className="p-2">
                    <FileText className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="text-center py-20">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Receipt className="w-12 h-12 text-gray-400" />
                </div>
                <p className="text-gray-600 text-lg mb-2">No data to display</p>
                <p className="text-gray-500">There are no sales in the selected time period</p>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-6">
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" className="p-2">
                    <Calendar className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="p-2">
                    <Calendar className="w-4 h-4" />
                  </Button>
                  <span className="text-sm text-gray-600">Page: 1 of 1</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Rows per page:</span>
                  <select className="border border-gray-300 rounded px-2 py-1 text-sm">
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <BarChart3 className="w-12 h-12 text-gray-400" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {reportSections.find(section => section.id === activeSection)?.label || 'Analysis'}
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                {reportSections.find(section => section.id === activeSection)?.description || 'Comprehensive analysis and reporting'}
              </p>
              
              <div className="text-center">
                <p className="text-gray-500">This section is under development</p>
                <p className="text-sm text-gray-400 mt-2">Coming soon with full functionality</p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-green-600 text-white shadow-md">
        <div className="flex items-center px-4 py-3">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white/20 rounded flex items-center justify-center">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-semibold">
              {reportSections.find(section => section.id === activeSection)?.label || 'Analysis'}
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
                <BarChart3 className="w-5 h-5 text-gray-600" />
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
            {/* Analysis Section - Active */}
            <div className="px-4 py-2 bg-green-50">
              <div className="flex items-center space-x-3 text-green-700">
                <BarChart3 className="w-5 h-5" />
                <span className="text-sm font-medium">Analysis</span>
                <div className="ml-auto w-4 h-4 text-green-600">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </div>
              </div>
              
              {/* Analysis Submenu */}
              <div className="ml-6 mt-2 space-y-1">
                {reportSections.map((section) => (
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

            {/* Other Menu Items */}
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

            <div className="px-4 py-2">
              <div className="flex items-center space-x-3 text-gray-600">
                <div className="w-5 h-5 bg-blue-500 rounded flex items-center justify-center">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-3 h-3 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
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
