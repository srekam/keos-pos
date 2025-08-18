import { 
  BarChart3, 
  ShoppingBag, 
  Truck, 
  UserCheck, 
  Users2, 
  Puzzle, 
  Settings, 
  HelpCircle,
  Receipt,
  Tag,
  Percent,
  FileText,
  Clock,
  Shield,
  Globe,
  MessageCircle,
  BookOpen,
  CreditCard,
  ShoppingCart,
  Package,
  User,
  Database,
  Zap,
  Key
} from 'lucide-react';

export interface SubmenuItem {
  id: string;
  label: string;
  icon?: React.ComponentType<any>;
  description?: string;
  isActive?: boolean;
  route?: string;
}

export interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  color: string;
  hasSubmenu: boolean;
  submenuItems?: SubmenuItem[];
  route?: string;
  description?: string;
}

export const menuConfig: MenuItem[] = [
  {
    id: 'reports',
    label: 'Analysis',
    icon: BarChart3,
    color: 'text-green-600',
    hasSubmenu: true,
    description: 'Sales and business analytics',
    submenuItems: [
      { 
        id: 'sales-summary', 
        label: 'Performance Overview', 
        icon: BarChart3,
        description: 'Overview of daily, weekly, and monthly sales',
        route: '/reports/sales-summary'
      },
      { 
        id: 'sales-by-item', 
        label: 'Item Analysis', 
        icon: Package,
        description: 'Detailed sales breakdown by product',
        route: '/reports/sales-by-item'
      },
      { 
        id: 'sales-by-category', 
        label: 'Category Analysis', 
        icon: Tag,
        description: 'Sales grouped by product categories',
        route: '/reports/sales-by-category'
      },
      { 
        id: 'sales-by-employee', 
        label: 'Pharmacist Analysis', 
        icon: User,
        description: 'Performance metrics by staff member',
        route: '/reports/sales-by-employee',
        isActive: true
      },
      { 
        id: 'sales-by-payment', 
        label: 'Payment Analysis', 
        icon: CreditCard,
        description: 'Payment method analysis',
        route: '/reports/sales-by-payment'
      },
      { 
        id: 'receipts', 
        label: 'Billing', 
        icon: Receipt,
        description: 'Transaction receipt management',
        route: '/reports/receipts'
      },
      { 
        id: 'sales-by-modifier', 
        label: 'Add-on Analysis', 
        icon: Tag,
        description: 'Sales with product modifications',
        route: '/reports/sales-by-modifier'
      },
      { 
        id: 'discounts', 
        label: 'Discount', 
        icon: Percent,
        description: 'Discount and promotion analysis',
        route: '/reports/discounts'
      },
      { 
        id: 'taxes', 
        label: 'VAT', 
        icon: FileText,
        description: 'Tax reporting and compliance',
        route: '/reports/taxes'
      },
      { 
        id: 'shifts', 
        label: 'Work Timing', 
        icon: Clock,
        description: 'Employee shift and time tracking',
        route: '/reports/shifts'
      }
    ]
  },
  {
    id: 'items',
    label: 'Items',
    icon: ShoppingBag,
    color: 'text-pink-600',
    hasSubmenu: true,
    description: 'Product and service management',
    submenuItems: [
      { 
        id: 'item-list', 
        label: 'Item list', 
        icon: Package,
        description: 'Complete product catalog',
        route: '/items/list'
      },
      { 
        id: 'categories', 
        label: 'Categories', 
        icon: Tag,
        description: 'Product categorization system',
        route: '/items/categories'
      },
      { 
        id: 'modifiers', 
        label: 'Modifiers', 
        icon: Tag,
        description: 'Product customization options',
        route: '/items/modifiers'
      },
      { 
        id: 'discounts', 
        label: 'Discounts', 
        icon: Percent,
        description: 'Product discount rules',
        route: '/items/discounts'
      }
    ]
  },
  {
    id: 'inventory',
    label: 'Inventory management',
    icon: Truck,
    color: 'text-blue-600',
    hasSubmenu: false,
    description: 'Stock control and management',
    route: '/inventory'
  },
  {
    id: 'employees',
    label: 'Employees',
    icon: UserCheck,
    color: 'text-green-600',
    hasSubmenu: true,
    description: 'Staff management and access control',
    submenuItems: [
      { 
        id: 'employee-list', 
        label: 'Employee list', 
        icon: User,
        description: 'Complete staff directory',
        route: '/employees/list'
      },
      { 
        id: 'access-rights', 
        label: 'Access rights', 
        icon: Shield,
        description: 'Permission and role management',
        route: '/employees/access-rights'
      },
      { 
        id: 'timecards', 
        label: 'Timecards', 
        icon: Clock,
        description: 'Time tracking and attendance',
        route: '/employees/timecards'
      },
      { 
        id: 'total-hours', 
        label: 'Total hours worked', 
        icon: Clock,
        description: 'Work hour summaries and reports',
        route: '/employees/total-hours'
      }
    ]
  },
  {
    id: 'customers',
    label: 'Customers',
    icon: Users2,
    color: 'text-purple-600',
    hasSubmenu: false,
    description: 'Customer relationship management',
    route: '/customers'
  },
  {
    id: 'integrations',
    label: 'Integrations',
    icon: Puzzle,
    color: 'text-amber-600',
    hasSubmenu: true,
    description: 'Third-party service connections',
    submenuItems: [
      { 
        id: 'apps', 
        label: 'Apps', 
        icon: Zap,
        description: 'Connected applications and services',
        route: '/integrations/apps'
      },
      { 
        id: 'access-tokens', 
        label: 'Access tokens', 
        icon: Key,
        description: 'API keys and authentication tokens',
        route: '/integrations/access-tokens'
      }
    ]
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    color: 'text-gray-600',
    hasSubmenu: false,
    description: 'System configuration and preferences',
    route: '/settings'
  },
  {
    id: 'help',
    label: 'Help',
    icon: HelpCircle,
    color: 'text-sky-600',
    hasSubmenu: true,
    description: 'Support and documentation',
    submenuItems: [
      { 
        id: 'help-center', 
        label: 'Help center', 
        icon: BookOpen,
        description: 'Knowledge base and tutorials',
        route: '/help/center'
      },
      { 
        id: 'community', 
        label: 'Community', 
        icon: Users2,
        description: 'User community and forums',
        route: '/help/community'
      },
      { 
        id: 'live-chat', 
        label: 'Live chat', 
        icon: MessageCircle,
        description: 'Real-time customer support',
        route: '/help/live-chat'
      }
    ]
  }
];

// Helper function to find menu item by ID
export const findMenuItem = (id: string): MenuItem | undefined => {
  return menuConfig.find(item => item.id === id);
};

// Helper function to find submenu item by ID
export const findSubmenuItem = (id: string): SubmenuItem | undefined => {
  for (const menuItem of menuConfig) {
    if (menuItem.submenuItems) {
      const submenuItem = menuItem.submenuItems.find(sub => sub.id === id);
      if (submenuItem) return submenuItem;
    }
  }
  return undefined;
};

// Helper function to get breadcrumb path
export const getBreadcrumbPath = (activeId: string): Array<{ id: string; label: string }> => {
  const path: Array<{ id: string; label: string }> = [];
  
  for (const menuItem of menuConfig) {
    if (menuItem.id === activeId) {
      path.push({ id: menuItem.id, label: menuItem.label });
      return path;
    }
    
    if (menuItem.submenuItems) {
      const submenuItem = menuItem.submenuItems.find(sub => sub.id === activeId);
      if (submenuItem) {
        path.push({ id: menuItem.id, label: menuItem.label });
        path.push({ id: submenuItem.id, label: submenuItem.label });
        return path;
      }
    }
  }
  
  return path;
};
