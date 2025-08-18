import React, { createContext, useContext, useState, ReactNode } from 'react';

interface MenuContextType {
  activeMenuItem: string;
  expandedMenus: string[];
  setActiveMenuItem: (id: string) => void;
  toggleMenu: (menuId: string) => void;
  isMenuExpanded: (menuId: string) => boolean;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

interface MenuProviderProps {
  children: ReactNode;
}

export function MenuProvider({ children }: MenuProviderProps) {
  const [activeMenuItem, setActiveMenuItem] = useState<string>('sales-by-employee');
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['reports']);

  const toggleMenu = (menuId: string) => {
    setExpandedMenus(prev => 
      prev.includes(menuId) 
        ? prev.filter(id => id !== menuId)
        : [...prev, menuId]
    );
  };

  const isMenuExpanded = (menuId: string) => {
    return expandedMenus.includes(menuId);
  };

  const value: MenuContextType = {
    activeMenuItem,
    expandedMenus,
    setActiveMenuItem,
    toggleMenu,
    isMenuExpanded
  };

  return (
    <MenuContext.Provider value={value}>
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
}
