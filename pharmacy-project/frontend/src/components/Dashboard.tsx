import React, { useState } from 'react';
import { 
  Menu, 
  User, 
  Bell,
  Search,
  BarChart3,
  Settings,
  UserCheck,
  ShoppingBag,
  ShoppingCart
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { SidebarMenu } from './SidebarMenu';
import { Breadcrumb } from './Breadcrumb';
import { MenuProvider, useMenu } from '../contexts/MenuContext';
import { Link } from 'react-router-dom';

function DashboardContent() {
  const { activeMenuItem } = useMenu();
  
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-green-600 text-white shadow-md">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-white hover:bg-green-700 p-2">
              <Menu className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-semibold">Dashboard</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 w-64 bg-white/10 border-white/20 text-white placeholder-white/70"
              />
            </div>
            
            <Button variant="ghost" size="sm" className="text-white hover:bg-green-700 p-2">
              <Bell className="w-5 h-5" />
            </Button>
            
            <Link to="/reports">
              <Button variant="ghost" size="sm" className="text-white hover:bg-green-700 p-2">
                <BarChart3 className="w-5 h-5" />
              </Button>
            </Link>
            
            <Link to="/items">
              <Button variant="ghost" size="sm" className="text-white hover:bg-green-700 p-2">
                <ShoppingBag className="w-5 h-5" />
              </Button>
            </Link>
            
            <Link to="/inventory">
              <Button variant="ghost" size="sm" className="text-white hover:bg-green-700 p-2">
                <ShoppingCart className="w-5 h-5" />
              </Button>
            </Link>
            
            <Link to="/employees">
              <Button variant="ghost" size="sm" className="text-white hover:bg-green-700 p-2">
                <UserCheck className="w-5 h-5" />
              </Button>
            </Link>
            
            <Link to="/settings">
              <Button variant="ghost" size="sm" className="text-white hover:bg-green-700 p-2">
                <Settings className="w-5 h-5" />
              </Button>
            </Link>
            
            <Link to="/owner">
              <Button variant="ghost" size="sm" className="text-white hover:bg-green-700 p-2">
                <User className="w-5 h-5" />
              </Button>
            </Link>
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-gray-600" />
              </div>
              <span className="text-sm font-medium">Owner</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Left Sidebar Menu - Always visible, collapsed by default */}
        <SidebarMenu />
        
        {/* Main Content Area */}
        <div className="flex-1">
          {/* Breadcrumb */}
          <Breadcrumb activeId={activeMenuItem} />
          
          <div className="bg-white rounded-lg shadow-sm p-6 min-h-[calc(100vh-200px)]">
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <BarChart3 className="w-12 h-12 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome to Your Dashboard</h1>
              <p className="text-lg text-gray-600 mb-8">
                Manage your pharmacy operations, view analysis, handle customers, and more.
              </p>
              <div className="mt-6 flex justify-center space-x-4">
                <Link to="/reports">
                  <Button className="bg-green-600 hover:bg-green-700 text-white">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Analysis
                  </Button>
                </Link>
                <Link to="/items">
                  <Button className="bg-green-600 hover:bg-green-700 text-white">
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Manage Products
                  </Button>
                </Link>
                <Link to="/inventory">
                  <Button className="bg-green-600 hover:bg-green-700 text-white">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Stock Manage
                  </Button>
                </Link>
                <Link to="/employees">
                  <Button className="bg-green-600 hover:bg-green-700 text-white">
                    <UserCheck className="w-4 h-4 mr-2" />
                    Manage Employees
                  </Button>
                </Link>
                <Link to="/settings">
                  <Button className="bg-green-600 hover:bg-green-700 text-white">
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </Button>
                </Link>
                <Link to="/owner">
                  <Button className="bg-green-600 hover:bg-green-700 text-white">
                    <User className="w-4 h-4 mr-2" />
                    Account
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Dashboard() {
  return (
    <MenuProvider>
      <DashboardContent />
    </MenuProvider>
  );
}
