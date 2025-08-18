import React, { useState } from 'react';
import { 
  User, 
  BarChart3, 
  ShoppingBag, 
  ShoppingCart, 
  Users, 
  UserCheck, 
  Settings, 
  HelpCircle,
  ChevronDown,
  Edit,
  Trash2
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Switch } from '../components/ui/switch';
import { Label } from '../components/ui/label';

export function OwnerPage() {
  const [isOwnerDropdownOpen, setIsOwnerDropdownOpen] = useState(true);
  const [formData, setFormData] = useState({
    businessName: 'WTK',
    email: 'srekam@gmail.com',
    password: '••••••••',
    currency: 'Thai Baht (THB)',
    useSatang: true,
    timezone: '(UTC+07:00) Bangkok, Hanoi, Jakarta',
    uiLanguage: 'English'
  });
  const [isEditing, setIsEditing] = useState({
    businessName: false,
    email: false,
    password: false
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleToggleEdit = (field: string) => {
    setIsEditing(prev => ({
      ...prev,
      [field]: !prev[field as keyof typeof prev]
    }));
  };

  const handleSave = () => {
    // Handle save logic here
    console.log('Saving form data:', formData);
    setIsEditing({
      businessName: false,
      email: false,
      password: false
    });
  };

  const handleCancel = () => {
    // Reset form data to original values
    setFormData({
      businessName: 'WTK',
      email: 'srekam@gmail.com',
      password: '••••••••',
      currency: 'Thai Baht (THB)',
      useSatang: true,
      timezone: '(UTC+07:00) Bangkok, Hanoi, Jakarta',
      uiLanguage: 'English'
    });
    setIsEditing({
      businessName: false,
      email: false,
      password: false
    });
  };

  const handleDeleteAccount = () => {
    // Handle delete account logic here
    if (window.confirm('Are you sure you want to permanently delete your account? This action cannot be undone.')) {
      console.log('Deleting account...');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-green-600 text-white shadow-md">
        <div className="flex items-center px-4 py-3">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white/20 rounded flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-semibold">Account</h1>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Left Sidebar */}
        <aside className="w-64 bg-white shadow-md flex-shrink-0 min-h-screen border-r border-gray-200">
          {/* Owner Section */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-gray-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">Owner</h3>
                <p className="text-sm text-gray-500">srekam@gmail.com</p>
              </div>
              <button
                onClick={() => setIsOwnerDropdownOpen(!isOwnerDropdownOpen)}
                className="w-4 h-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <ChevronDown className={`w-4 h-4 transition-transform ${isOwnerDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>
            
            {/* Owner Dropdown */}
            {isOwnerDropdownOpen && (
              <div className="mt-3 bg-gray-50 rounded-lg p-2 space-y-1">
                <div className="px-3 py-2 bg-gray-200 rounded text-sm font-medium text-gray-700">
                  Account
                </div>
                <button className="w-full px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded text-left">
                  Sign out
                </button>
              </div>
            )}
          </div>

          {/* Navigation Menu */}
          <nav className="py-2">
            <div className="px-4 py-2">
              <div className="flex items-center space-x-3 text-gray-600">
                <BarChart3 className="w-5 h-5 text-green-600" />
                <span className="text-sm">Analysis</span>
              </div>
            </div>

            <div className="px-4 py-2">
              <div className="flex items-center space-x-3 text-gray-600">
                <ShoppingBag className="w-5 h-5 text-pink-500" />
                <span className="text-sm">Items</span>
                <div className="ml-auto w-4 h-4 text-gray-400">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>

            <div className="px-4 py-2">
              <div className="flex items-center space-x-3 text-gray-600">
                <ShoppingCart className="w-5 h-5 text-blue-500" />
                <span className="text-sm">Inventory management</span>
                <div className="ml-auto w-4 h-4 text-gray-400">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>

            <div className="px-4 py-2">
              <div className="flex items-center space-x-3 text-gray-600">
                <UserCheck className="w-5 h-5 text-green-500" />
                <span className="text-sm">Employees</span>
                <div className="ml-auto w-4 h-4 text-gray-400">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>

            <div className="px-4 py-2">
              <div className="flex items-center space-x-3 text-gray-600">
                <Users className="w-5 h-5 text-purple-500" />
                <span className="text-sm">Customers</span>
                <div className="ml-auto w-4 h-4 text-gray-400">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>

            <div className="px-4 py-2">
              <div className="flex items-center space-x-3 text-gray-600">
                <div className="w-5 h-5 bg-amber-500 rounded flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
                <span className="text-sm">Integrations</span>
                <div className="ml-auto w-4 h-4 text-gray-400">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>

            <div className="px-4 py-2">
              <div className="flex items-center space-x-3 text-gray-600">
                <Settings className="w-5 h-5 text-gray-500" />
                <span className="text-sm">Settings</span>
              </div>
            </div>

            <div className="px-4 py-2">
              <div className="flex items-center space-x-3 text-gray-600">
                <HelpCircle className="w-5 h-5 text-sky-500" />
                <span className="text-sm">Help</span>
                <div className="ml-auto w-4 h-4 text-gray-400">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-6">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h2>
            
            <form className="space-y-6">
              {/* Business Name */}
              <div className="space-y-2">
                <Label htmlFor="businessName" className="text-sm font-medium text-gray-700">
                  Business name
                </Label>
                <div className="relative">
                  <Input
                    id="businessName"
                    type="text"
                    value={formData.businessName}
                    onChange={(e) => handleInputChange('businessName', e.target.value)}
                    disabled={!isEditing.businessName}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => handleToggleEdit('businessName')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    disabled={!isEditing.email}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => handleToggleEdit('email')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={isEditing.password ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    disabled={!isEditing.password}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => handleToggleEdit('password')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Currency */}
              <div className="space-y-2">
                <Label htmlFor="currency" className="text-sm font-medium text-gray-700">
                  Currency
                </Label>
                <div className="relative">
                  <select
                    id="currency"
                    value={formData.currency}
                    onChange={(e) => handleInputChange('currency', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="Thai Baht (THB)">Thai Baht (THB)</option>
                    <option value="US Dollar (USD)">US Dollar (USD)</option>
                    <option value="Euro (EUR)">Euro (EUR)</option>
                    <option value="British Pound (GBP)">British Pound (GBP)</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Use Satang */}
              <div className="flex items-center justify-between">
                <Label htmlFor="useSatang" className="text-sm font-medium text-gray-700">
                  Use satang
                </Label>
                <Switch
                  id="useSatang"
                  checked={formData.useSatang}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, useSatang: checked }))}
                />
              </div>

              {/* Timezone */}
              <div className="space-y-2">
                <Label htmlFor="timezone" className="text-sm font-medium text-gray-700">
                  Timezone
                </Label>
                <div className="relative">
                  <select
                    id="timezone"
                    value={formData.timezone}
                    onChange={(e) => handleInputChange('timezone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="(UTC+07:00) Bangkok, Hanoi, Jakarta">(UTC+07:00) Bangkok, Hanoi, Jakarta</option>
                    <option value="(UTC+00:00) London, Lisbon">(UTC+00:00) London, Lisbon</option>
                    <option value="(UTC-05:00) New York, Toronto">(UTC-05:00) New York, Toronto</option>
                    <option value="(UTC+08:00) Singapore, Kuala Lumpur">(UTC+08:00) Singapore, Kuala Lumpur</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* UI Language */}
              <div className="space-y-2">
                <Label htmlFor="uiLanguage" className="text-sm font-medium text-gray-700">
                  UI language
                </Label>
                <div className="relative">
                  <select
                    id="uiLanguage"
                    value={formData.uiLanguage}
                    onChange={(e) => handleInputChange('uiLanguage', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="English">English</option>
                    <option value="Thai">Thai</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Delete Account Section */}
              <div className="pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Delete account</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      You can permanently delete your Loyverse account and all its data
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={handleDeleteAccount}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    DELETE
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  className="px-6 py-2 border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  CANCEL
                </Button>
                <Button
                  type="button"
                  onClick={handleSave}
                  className="px-6 py-2 bg-green-600 text-white hover:bg-green-700"
                >
                  SAVE
                </Button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
