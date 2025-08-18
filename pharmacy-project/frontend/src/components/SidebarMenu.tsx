import React from 'react';
import { 
  User, 
  ChevronDown, 
  ChevronUp,
  LogOut,
  BarChart3,
  ShoppingBag,
  Truck,
  UserCheck,
  Users2,
  Puzzle,
  Settings,
  HelpCircle
} from 'lucide-react';
import { Button } from './ui/button';
import { menuConfig } from '../config/menuConfig';
import { useMenu } from '../contexts/MenuContext';

export function SidebarMenu() {
  const { activeMenuItem, expandedMenus, setActiveMenuItem, toggleMenu } = useMenu();

  const handleMenuItemClick = (menuId: string, submenuId?: string) => {
    if (submenuId) {
      setActiveMenuItem(submenuId);
    } else {
      setActiveMenuItem(menuId);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    window.location.href = '/';
  };

  // Get icon for menu item
  const getMenuIcon = (menuId: string) => {
    const item = menuConfig.find(item => item.id === menuId);
    if (!item) return null;
    
    const Icon = item.icon;
    return <Icon className={`w-5 h-5 ${item.color}`} />;
  };

  return (
    <aside className="w-16 bg-white/95 backdrop-blur-xl shadow-2xl border-r border-gray-200/50 h-full transition-all duration-300 ease-out hover:w-64 group">
      <div className="p-3">
        {/* User Profile Section - Collapsed */}
        <div className="mb-6 pb-4 border-b border-gray-200/50">
          <div className="flex items-center justify-center group-hover:justify-start space-x-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center shadow-lg ring-2 ring-white/50">
              <User className="w-5 h-5 text-gray-600" />
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
              <h3 className="font-semibold text-gray-900 text-sm">Owner</h3>
              <p className="text-xs text-gray-500">srekam@gmail.com</p>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0" />
          </div>
        </div>

        {/* Navigation Menu - Icon Only */}
        <nav className="space-y-2">
          {menuConfig.map((item, index) => {
            const Icon = item.icon;
            const isExpanded = expandedMenus.includes(item.id);
            const isActive = activeMenuItem === item.id || 
              (item.submenuItems?.some(sub => sub.id === activeMenuItem));
            
            return (
              <div key={item.id} className="relative">
                {/* Main Menu Item */}
                <Button
                  variant="ghost"
                  className={`w-full h-12 px-3 rounded-xl transition-all duration-300 group/item ${
                    isActive 
                      ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-gray-900 shadow-lg shadow-blue-500/20 border border-blue-200/50' 
                      : 'text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 hover:shadow-md hover:scale-105'
                  }`}
                  onClick={() => {
                    if (item.hasSubmenu) {
                      toggleMenu(item.id);
                    } else {
                      handleMenuItemClick(item.id);
                    }
                  }}
                >
                  <div className="flex items-center justify-center group-hover:justify-start w-full">
                    <div className={`p-2 rounded-lg transition-all duration-300 ${
                      isActive 
                        ? 'bg-gradient-to-br from-blue-500 to-purple-500 shadow-lg' 
                        : 'bg-gray-100/50 group-hover:bg-white group-hover:shadow-md'
                    }`}>
                      <Icon className={`w-5 h-5 ${
                        isActive ? 'text-white' : item.color
                      }`} />
                    </div>
                    
                    {/* Label - Hidden by default, shown on hover */}
                    <span className="ml-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 whitespace-nowrap">
                      {item.label}
                    </span>
                    
                    {/* Chevron - Hidden by default, shown on hover */}
                    {item.hasSubmenu && (
                      <div className="ml-auto opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-gray-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-gray-400" />
                        )}
                      </div>
                    )}
                  </div>
                </Button>

                {/* Submenu Items - Floating Panel */}
                {item.hasSubmenu && isExpanded && item.submenuItems && (
                  <div className="absolute left-full top-0 ml-2 bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-200/50 p-2 min-w-48 z-50 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                    <div className="space-y-1">
                      {item.submenuItems.map((submenuItem) => (
                        <Button
                          key={submenuItem.id}
                          variant="ghost"
                          className={`w-full justify-start h-10 px-3 text-sm rounded-lg transition-all duration-200 ${
                            submenuItem.isActive || activeMenuItem === submenuItem.id
                              ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-gray-900 border border-blue-200/50' 
                              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                          }`}
                          onClick={() => handleMenuItemClick(item.id, submenuItem.id)}
                        >
                          {submenuItem.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Active Indicator */}
                {isActive && (
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-r-full shadow-lg"></div>
                )}

                {/* Separator line after certain menu items */}
                {index < menuConfig.length - 1 && (
                  <div className="border-t border-gray-200/30 my-2 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="mt-8 pt-6 border-t border-gray-200/30 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <Button
            variant="ghost"
            className="w-full h-12 px-3 rounded-xl text-red-600 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 hover:text-red-700 hover:shadow-md hover:scale-105 transition-all duration-300"
            onClick={handleLogout}
          >
            <div className="flex items-center justify-center group-hover:justify-start w-full">
              <div className="p-2 rounded-lg bg-red-100/50 group-hover:bg-white group-hover:shadow-md transition-all duration-300">
                <LogOut className="w-5 h-5" />
              </div>
              <span className="ml-3 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300 whitespace-nowrap">
                Logout
              </span>
            </div>
          </Button>
        </div>
      </div>

      {/* Magnetic Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </aside>
  );
}
