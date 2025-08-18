import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Store, 
  Clock, 
  FileText, 
  Printer, 
  Monitor, 
  Utensils, 
  Mail, 
  ShoppingBag, 
  Scale,
  CreditCard,
  Receipt,
  Users,
  Building,
  Plus,
  GripVertical
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Switch } from '../components/ui/switch';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

export function SettingsPage() {
  const [activeSetting, setActiveSetting] = useState('features');
  const [usePredefinedTickets, setUsePredefinedTickets] = useState(false);
  const [showCustomerInfo, setShowCustomerInfo] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [receiptLanguage, setReceiptLanguage] = useState('thai');
  const [pointsPercentage, setPointsPercentage] = useState('0.00');
  const [usePredefinedTicketsOpen, setUsePredefinedTicketsOpen] = useState(false);

  const systemSettingsItems = [
    { id: 'features', label: 'Features' },
    { id: 'billing-subscriptions', label: 'Billing & subscriptions' },
    { id: 'payment-types', label: 'Payment types' },
    { id: 'loyalty', label: 'Loyalty' },
    { id: 'taxes', label: 'Taxes' },
    { id: 'receipt', label: 'Receipt' },
    { id: 'open-tickets', label: 'Open tickets' },
    { id: 'kitchen-printers', label: 'Kitchen printers' },
    { id: 'dining-options', label: 'Dining options' },
  ];

  const storeSettingsItems = [
    { id: 'stores', label: 'Stores' },
    { id: 'pos-devices', label: 'POS devices' },
  ];

  const renderContent = () => {
    switch (activeSetting) {
      case 'features':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Features</h2>
            
            <div className="space-y-6">
              {/* Shifts */}
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Shifts</h3>
                    <p className="text-gray-600">Track cash that goes in and out of your drawer. <a href="#" className="text-green-600 hover:underline">Learn more</a></p>
                  </div>
                </div>
                <Switch checked={true} />
              </div>

              {/* Time clock */}
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Time clock</h3>
                    <p className="text-gray-600">Track employees' clock in/out time and calculate their total work hours. <a href="#" className="text-green-600 hover:underline">Learn more</a></p>
                  </div>
                </div>
                <Switch checked={true} />
              </div>

              {/* Open tickets */}
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Open tickets</h3>
                    <p className="text-gray-600">Allow to save and edit orders before completing a payment. <a href="#" className="text-green-600 hover:underline">Learn more</a></p>
                  </div>
                </div>
                <Switch checked={true} />
              </div>

              {/* Kitchen printers */}
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Printer className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Kitchen printers</h3>
                    <p className="text-gray-600">Send orders to kitchen printer or display. <a href="#" className="text-green-600 hover:underline">Learn more</a></p>
                  </div>
                </div>
                <Switch checked={true} />
              </div>

              {/* Customer displays */}
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <Monitor className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Customer displays</h3>
                    <p className="text-gray-600">Display order information to customers at the time of purchase. <a href="#" className="text-green-600 hover:underline">Learn more</a></p>
                  </div>
                </div>
                <Switch checked={true} />
              </div>

              {/* Dining options */}
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                    <Utensils className="w-6 h-6 text-pink-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Dining options</h3>
                    <p className="text-gray-600">Mark orders as dine in, takeout or for delivery. <a href="#" className="text-green-600 hover:underline">Learn more</a></p>
                  </div>
                </div>
                <Switch checked={true} />
              </div>

              {/* Low stock notifications */}
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Low stock notifications</h3>
                    <p className="text-gray-600">Get daily email on items that are low or out of stock. <a href="#" className="text-green-600 hover:underline">Learn more</a></p>
                  </div>
                </div>
                <Switch checked={true} />
              </div>

              {/* Negative stock alerts */}
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <ShoppingBag className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Negative stock alerts</h3>
                    <p className="text-gray-600">Warn cashiers attempting to sell more inventory than available in stock. <a href="#" className="text-green-600 hover:underline">Learn more</a></p>
                  </div>
                </div>
                <Switch checked={true} />
              </div>

              {/* Weight embedded barcodes */}
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                    <Scale className="w-6 h-6 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Weight embedded barcodes</h3>
                    <p className="text-gray-600">Allow to scan barcodes with embedded weight. <a href="#" className="text-green-600 hover:underline">Learn more</a></p>
                  </div>
                </div>
                <Switch checked={true} />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-gray-200">
              <Button variant="ghost" className="text-gray-700">CANCEL</Button>
              <Button className="bg-green-600 hover:bg-green-700 text-white">SAVE</Button>
            </div>
          </div>
        );

      case 'billing-subscriptions':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Billing & subscriptions</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Subscriptions</h3>
                <div className="grid gap-4">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">Unlimited sales history</h4>
                        <p className="text-gray-600">View sales analysis for any time period and export data to spreadsheets.</p>
                        <p className="text-sm text-green-600 mt-1">14 day free trial</p>
                      </div>
                      <Button className="bg-green-600 hover:bg-green-700 text-white">TRY FOR FREE</Button>
                    </div>
                  </div>

                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <Users className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">Employee management</h4>
                        <p className="text-gray-600">Manage access rights, track timecards and sales by employee.</p>
                        <p className="text-sm text-green-600 mt-1">14 day free trial</p>
                      </div>
                      <Button className="bg-green-600 hover:bg-green-700 text-white">TRY FOR FREE</Button>
                    </div>
                  </div>

                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <ShoppingBag className="w-6 h-6 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">Advanced inventory</h4>
                        <p className="text-gray-600">Create purchase orders, view inventory valuation report and manage stock.</p>
                        <p className="text-sm text-green-600 mt-1">14 day free trial</p>
                      </div>
                      <Button className="bg-green-600 hover:bg-green-700 text-white">TRY FOR FREE</Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Payment method</h3>
                <div className="flex items-center space-x-3 mb-4">
                  <CreditCard className="w-6 h-6 text-gray-400" />
                  <span className="text-gray-600">No card currently on file</span>
                </div>
                <Button className="bg-green-600 hover:bg-green-700 text-white mb-4">ADD PAYMENT METHOD</Button>
                <p className="text-gray-600 mb-4">Edit your business name, add a billing contact or other information you want to include on your invoices</p>
                <Button className="bg-green-600 hover:bg-green-700 text-white">EDIT BILLING DETAILS</Button>
              </div>
            </div>
          </div>
        );

      case 'payment-types':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">Payment types</h2>
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                ADD PAYMENT TYPE
              </Button>
            </div>
            
            <div className="border border-gray-200 rounded-lg">
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center space-x-4">
                  <input type="checkbox" className="w-4 h-4 text-green-600 border-gray-300 rounded" />
                  <span className="font-medium text-gray-700">Name</span>
                </div>
              </div>
              
              <div className="divide-y divide-gray-200">
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <input type="checkbox" className="w-4 h-4 text-green-600 border-gray-300 rounded" />
                    <span className="text-gray-900">Cash</span>
                  </div>
                  <GripVertical className="w-5 h-5 text-gray-400 cursor-move" />
                </div>
                
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <input type="checkbox" className="w-4 h-4 text-green-600 border-gray-300 rounded" />
                    <span className="text-gray-900">Card</span>
                  </div>
                  <GripVertical className="w-5 h-5 text-gray-400 cursor-move" />
                </div>
              </div>
            </div>
          </div>
        );

      case 'loyalty':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Loyalty settings</h2>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="points" className="text-sm font-medium text-gray-700">Points earning percentage</Label>
                <Input
                  id="points"
                  type="number"
                  value={pointsPercentage}
                  onChange={(e) => setPointsPercentage(e.target.value)}
                  className="mt-1 w-32"
                  step="0.01"
                  min="0"
                  max="100"
                />
                <p className="mt-2 text-sm text-gray-600">
                  Percentage of the purchase amount to be credited to the points account of the customer.
                </p>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-gray-200">
              <Button variant="ghost" className="text-gray-700">CANCEL</Button>
              <Button className="bg-green-600 hover:bg-green-700 text-white">SAVE</Button>
            </div>
          </div>
        );

      case 'taxes':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Building className="w-12 h-12 text-gray-400" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Taxes</h2>
              <p className="text-gray-600 mb-6">
                Taxes can be applied to specific items and are calculated at the time of sale. <a href="#" className="text-green-600 hover:underline">Learn more</a>
              </p>
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                ADD TAX
              </Button>
            </div>
          </div>
        );

      case 'receipt':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Receipt settings</h2>
            
            <div className="space-y-6">
              <div>
                <Label className="text-sm font-medium text-gray-700">Logo</Label>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded mx-auto mb-2 flex items-center justify-center">
                      <Building className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-600">Emailed receipt</p>
                  </div>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded mx-auto mb-2 flex items-center justify-center">
                      <Building className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-600">Printed receipt</p>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="header" className="text-sm font-medium text-gray-700">Header</Label>
                <div className="mt-1 relative">
                  <Input
                    id="header"
                    placeholder="Enter receipt header text"
                    className="pr-16"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">
                    0/500
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="footer" className="text-sm font-medium text-gray-700">Footer</Label>
                <div className="mt-1 relative">
                  <Input
                    id="footer"
                    placeholder="Enter receipt footer text"
                    className="pr-16"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">
                    0/500
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium text-gray-700">Show customer info</Label>
                  <Switch checked={showCustomerInfo} onCheckedChange={setShowCustomerInfo} />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium text-gray-700">Show comments</Label>
                  <Switch checked={showComments} onCheckedChange={setShowComments} />
                </div>
              </div>

              <div>
                <Label htmlFor="language" className="text-sm font-medium text-gray-700">Receipt language</Label>
                <select
                  id="language"
                  value={receiptLanguage}
                  onChange={(e) => setReceiptLanguage(e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                >
                  <option value="thai">ภาษาไทย</option>
                  <option value="english">English</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-gray-200">
              <Button variant="ghost" className="text-gray-700">CANCEL</Button>
              <Button className="bg-green-600 hover:bg-green-700 text-white">SAVE</Button>
            </div>
          </div>
        );

      case 'open-tickets':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Open tickets</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Use predefined tickets</h3>
                  <p className="text-gray-600 mt-1">
                    This feature allows you to quickly assign names to open tickets. For example, Table 1, Table 2, etc. <a href="#" className="text-green-600 hover:underline">Learn more</a>
                  </p>
                </div>
                <Switch checked={usePredefinedTicketsOpen} onCheckedChange={setUsePredefinedTicketsOpen} />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-gray-200">
              <Button variant="ghost" className="text-gray-700">CANCEL</Button>
              <Button className="bg-green-600 hover:bg-green-700 text-white">SAVE</Button>
            </div>
          </div>
        );

      case 'kitchen-printers':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Printer className="w-12 h-12 text-gray-400" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Kitchen printers</h2>
              <p className="text-gray-600 mb-6">
                Add a printer group to print orders for the kitchen.
              </p>
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                ADD PRINTER GROUP
              </Button>
            </div>
          </div>
        );

      case 'dining-options':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">Dining options</h2>
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                ADD DINING OPTION
              </Button>
            </div>
            
            <div className="border border-gray-200 rounded-lg">
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <span className="font-medium text-gray-700">Name</span>
              </div>
              
              <div className="divide-y divide-gray-200">
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-900">Dine in</span>
                    <span className="text-sm text-gray-500">Default dining option</span>
                  </div>
                  <GripVertical className="w-5 h-5 text-gray-400 cursor-move" />
                </div>
                
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-900">Takeout</span>
                  </div>
                  <GripVertical className="w-5 h-5 text-gray-400 cursor-move" />
                </div>
                
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-900">Delivery</span>
                  </div>
                  <GripVertical className="w-5 h-5 text-gray-400 cursor-move" />
                </div>
              </div>
            </div>
          </div>
        );

      case 'stores':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">Stores</h2>
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                ADD STORE
              </Button>
            </div>
            
            <div className="border border-gray-200 rounded-lg">
              <div className="p-4 border-b border-gray-200 bg-gray-50 grid grid-cols-3 gap-4">
                <span className="font-medium text-gray-700">Name</span>
                <span className="font-medium text-gray-700">Address</span>
                <span className="font-medium text-gray-700">Number of POS</span>
              </div>
              
              <div className="p-4 grid grid-cols-3 gap-4">
                <span className="text-gray-900">WTK</span>
                <span className="text-gray-500">-</span>
                <span className="text-gray-900">1</span>
              </div>
            </div>
          </div>
        );

      case 'pos-devices':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">POS devices</h2>
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                ADD POS
              </Button>
            </div>
            
            <div className="border border-gray-200 rounded-lg">
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center space-x-4">
                  <input type="checkbox" className="w-4 h-4 text-green-600 border-gray-300 rounded" />
                  <span className="font-medium text-gray-700">Name</span>
                  <span className="font-medium text-gray-700 ml-auto">Status</span>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-center space-x-4">
                  <input type="checkbox" className="w-4 h-4 text-green-600 border-gray-300 rounded" />
                  <span className="text-gray-900">POS 1</span>
                  <span className="text-gray-500 ml-auto">Not activated</span>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {systemSettingsItems.find(item => item.id === activeSetting)?.label || 
               storeSettingsItems.find(item => item.id === activeSetting)?.label || 
               'Settings'}
            </h2>
            <div className="text-gray-500">
              Content for {systemSettingsItems.find(item => item.id === activeSetting)?.label || 
                          storeSettingsItems.find(item => item.id === activeSetting)?.label || 
                          'selected setting'} will go here.
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left Sidebar */}
      <aside className="w-64 bg-white shadow-md flex-shrink-0">
        {/* Settings Header */}
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center space-x-3">
            <SettingsIcon className="w-6 h-6 text-gray-600" />
            <div>
              <h1 className="text-lg font-semibold text-gray-800">Settings</h1>
              <p className="text-sm text-gray-500">System settings</p>
            </div>
          </div>
        </div>

        {/* System Settings Menu */}
        <nav className="py-2">
          {systemSettingsItems.map((item) => (
            <div
              key={item.id}
              className={`flex items-center px-4 py-3 cursor-pointer hover:bg-gray-100 transition-colors ${
                activeSetting === item.id ? 'bg-gray-100' : ''
              }`}
              onClick={() => setActiveSetting(item.id)}
            >
              <span className={`text-sm ${activeSetting === item.id ? 'text-gray-900' : 'text-gray-700'}`}>
                {item.label}
              </span>
            </div>
          ))}

          {/* Stores Section */}
          <div className="p-4 border-t border-gray-200 mt-2 bg-gray-50">
            <div className="flex items-center space-x-3">
              <Store className="w-6 h-6 text-gray-600" />
              <div>
                <h2 className="text-lg font-semibold text-gray-800">Stores</h2>
                <p className="text-sm text-gray-500">Store & POS settings</p>
              </div>
            </div>
          </div>

          {storeSettingsItems.map((item) => (
            <div
              key={item.id}
              className={`flex items-center px-4 py-3 cursor-pointer hover:bg-gray-100 transition-colors ${
                activeSetting === item.id ? 'bg-gray-100' : ''
              }`}
              onClick={() => setActiveSetting(item.id)}
            >
              <span className={`text-sm ${activeSetting === item.id ? 'text-gray-900' : 'text-gray-700'}`}>
                {item.label}
              </span>
            </div>
          ))}
        </nav>
      </aside>

      {/* Right Content Area */}
      <main className="flex-1 p-6">
        {renderContent()}
      </main>
    </div>
  );
}
