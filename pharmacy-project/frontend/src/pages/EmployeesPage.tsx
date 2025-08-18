import React, { useState } from 'react';
import { 
  UserCheck, 
  Users, 
  Clock, 
  BarChart3,
  Plus,
  Search,
  ChevronLeft,
  ChevronRight,
  Calendar,
  AlertTriangle,
  Download,
  GripVertical,
  Edit,
  Trash2
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

export function EmployeesPage() {
  const [activeSection, setActiveSection] = useState('employee-list');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState('Jul 19, 2025 - Aug 17, 2025');
  const [selectedEmployee, setSelectedEmployee] = useState('All employees...');

  const employeeSections = [
    { id: 'employee-list', label: 'Employee list' },
    { id: 'access-rights', label: 'Access rights' },
    { id: 'timecards', label: 'Timecards' },
    { id: 'total-hours', label: 'Total hours worked' },
  ];

  const employees = [
    {
      id: '1',
      name: 'Owner',
      email: 'srekam@gmail.com',
      phone: '-',
      role: 'Owner',
      status: 'Active'
    },
    {
      id: '2',
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@pharmacy.com',
      phone: '+1-555-0123',
      role: 'Pharmacist',
      status: 'Active'
    },
    {
      id: '3',
      name: 'Mike Chen',
      email: 'mike.chen@pharmacy.com',
      phone: '+1-555-0124',
      role: 'Pharmacist',
      status: 'Active'
    }
  ];

  const roles = [
    {
      id: 'owner',
      name: 'Owner',
      icon: '👥',
      color: 'bg-orange-500',
      access: 'Back office and POS',
      employees: 1
    },
    {
      id: 'pharmacist',
      name: 'Pharmacist',
      icon: '👨‍⚕️',
      color: 'bg-emerald-500',
      access: 'Back office, POS, and Prescription Management',
      employees: 2
    },
    {
      id: 'administrator',
      name: 'Administrator',
      icon: '👥',
      color: 'bg-purple-500',
      access: 'Back office and POS',
      employees: 0
    },
    {
      id: 'manager',
      name: 'Manager',
      icon: '👥',
      color: 'bg-blue-500',
      access: 'Back office and POS',
      employees: 0
    },
    {
      id: 'cashier',
      name: 'Cashier',
      icon: '👥',
      color: 'bg-teal-500',
      access: 'POS',
      employees: 0
    }
  ];

  const handleSelectAll = (section: string) => {
    if (section === 'employee-list') {
      if (selectedEmployees.length === employees.length) {
        setSelectedEmployees([]);
      } else {
        setSelectedEmployees(employees.map(emp => emp.id));
      }
    } else if (section === 'access-rights') {
      if (selectedRoles.length === roles.length) {
        setSelectedRoles([]);
      } else {
        setSelectedRoles(roles.map(role => role.id));
      }
    }
  };

  const handleSelectItem = (section: string, id: string) => {
    if (section === 'employee-list') {
      setSelectedEmployees(prev => 
        prev.includes(id) 
          ? prev.filter(item => item !== id)
          : [...prev, id]
      );
    } else if (section === 'access-rights') {
      setSelectedRoles(prev => 
        prev.includes(id) 
          ? prev.filter(roleId => roleId !== id)
          : [...prev, id]
      );
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'employee-list':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                ADD EMPLOYEE
              </Button>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search employees..."
                  className="pl-10 pr-4 py-2 w-64"
                />
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg">
              <div className="p-4 border-b border-gray-200 bg-gray-50 grid grid-cols-6 gap-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedEmployees.length === employees.length}
                    onChange={() => handleSelectAll('employee-list')}
                    className="w-4 h-4 text-green-600 border-gray-300 rounded"
                  />
                </div>
                <span className="font-medium text-gray-700">Name</span>
                <span className="font-medium text-gray-700">Email</span>
                <span className="font-medium text-gray-700">Phone</span>
                <span className="font-medium text-gray-700">Role</span>
                <span className="font-medium text-gray-700">Actions</span>
              </div>

              <div className="divide-y divide-gray-200">
                {employees.map((employee) => (
                  <div key={employee.id} className="p-4 grid grid-cols-6 gap-4 items-center">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedEmployees.includes(employee.id)}
                        onChange={() => handleSelectItem('employee-list', employee.id)}
                        className="w-4 h-4 text-green-600 border-gray-300 rounded"
                      />
                    </div>
                    <span className="text-gray-900 font-medium">{employee.name}</span>
                    <span className="text-gray-900">{employee.email}</span>
                    <span className="text-gray-500">{employee.phone}</span>
                    <span className="text-gray-900">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        employee.role === 'Owner' ? 'bg-orange-100 text-orange-800' :
                        employee.role === 'Pharmacist' ? 'bg-emerald-100 text-emerald-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {employee.role}
                      </span>
                    </span>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" className="p-1 h-8 w-8">
                        <Edit className="w-4 h-4 text-gray-600" />
                      </Button>
                      <Button variant="ghost" size="sm" className="p-1 h-8 w-8">
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between mt-6">
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="p-2">
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="p-2">
                  <ChevronRight className="w-4 h-4" />
                </Button>
                <span className="text-sm text-gray-600">Page: {currentPage} of 1</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Rows per page:</span>
                <select
                  value={rowsPerPage}
                  onChange={(e) => setRowsPerPage(Number(e.target.value))}
                  className="border border-gray-300 rounded px-2 py-1 text-sm"
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 'access-rights':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                ADD ROLE
              </Button>
            </div>

            <div className="border border-gray-200 rounded-lg">
              <div className="p-4 border-b border-gray-200 bg-gray-50 grid grid-cols-4 gap-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedRoles.length === roles.length}
                    onChange={() => handleSelectAll('access-rights')}
                    className="w-4 h-4 text-green-600 border-gray-300 rounded"
                  />
                </div>
                <span className="font-medium text-gray-700">Role</span>
                <span className="font-medium text-gray-700">Access</span>
                <span className="font-medium text-gray-700">Employees</span>
              </div>

              <div className="divide-y divide-gray-200">
                {roles.map((role) => (
                  <div key={role.id} className="p-4 grid grid-cols-4 gap-4 items-center">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedRoles.includes(role.id)}
                        onChange={() => handleSelectItem('access-rights', role.id)}
                        className="w-4 h-4 text-green-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 ${role.color} rounded-full flex items-center justify-center text-white text-sm`}>
                        {role.icon}
                      </div>
                      <span className="text-gray-900">{role.name}</span>
                    </div>
                    <span className="text-gray-600">{role.access}</span>
                    <span className="text-gray-900">{role.employees}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between mt-6">
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="p-2">
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="p-2">
                  <ChevronRight className="w-4 h-4" />
                </Button>
                <span className="text-sm text-gray-600">Page: {currentPage} of 1</span>
              </div>
            </div>
          </div>
        );

      case 'timecards':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" className="p-2">
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <div className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700">{dateRange}</span>
                  </div>
                  <Button variant="ghost" size="sm" className="p-2">
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
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

            <Button className="bg-green-600 hover:bg-green-700 text-white mb-8">
              <Plus className="w-4 h-4 mr-2" />
              ADD TIMECARD
            </Button>

            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertTriangle className="w-12 h-12 text-gray-400" />
              </div>
              <p className="text-gray-600 text-lg">
                There are no timecards in the selected time period
              </p>
            </div>
          </div>
        );

      case 'total-hours':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" className="p-2">
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <div className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700">{dateRange}</span>
                  </div>
                  <Button variant="ghost" size="sm" className="p-2">
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
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

            <div className="mb-6">
              <span className="text-sm font-medium text-gray-700">EXPORT</span>
            </div>

            <div className="border border-gray-200 rounded-lg">
              <div className="p-4 border-b border-gray-200 bg-gray-50 grid grid-cols-3 gap-4">
                <span className="font-medium text-gray-700">Employee</span>
                <span className="font-medium text-gray-700">Store</span>
                <span className="font-medium text-gray-700">Total hours</span>
              </div>
            </div>

            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertTriangle className="w-12 h-12 text-gray-400" />
              </div>
              <p className="text-gray-600 text-lg">
                No data to display
              </p>
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
              <UserCheck className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-semibold">
              {employeeSections.find(section => section.id === activeSection)?.label || 'Employees'}
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

            {/* Employees Section - Active */}
            <div className="px-4 py-2 bg-green-50">
              <div className="flex items-center space-x-3 text-green-700">
                <UserCheck className="w-5 h-5" />
                <span className="text-sm font-medium">Employees</span>
                <div className="ml-auto w-4 h-4 text-green-600">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </div>
              </div>
              
              {/* Employee Submenu */}
              <div className="ml-6 mt-2 space-y-1">
                {employeeSections.map((section) => (
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
                <div className="w-5 h-5 bg-purple-500 rounded flex items-center justify-center">
                  <Users className="w-3 h-3 text-white" />
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
