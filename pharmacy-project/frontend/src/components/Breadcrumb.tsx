import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { getBreadcrumbPath } from '../config/menuConfig';

interface BreadcrumbProps {
  activeId: string;
}

export function Breadcrumb({ activeId }: BreadcrumbProps) {
  const breadcrumbPath = getBreadcrumbPath(activeId);

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
      <a href="/dashboard" className="flex items-center hover:text-gray-700 transition-colors">
        <Home className="w-4 h-4 mr-1" />
        Dashboard
      </a>
      
      {breadcrumbPath.map((item, index) => (
        <React.Fragment key={item.id}>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className={index === breadcrumbPath.length - 1 ? 'text-gray-900 font-medium' : 'hover:text-gray-700 cursor-pointer'}>
            {item.label}
          </span>
        </React.Fragment>
      ))}
    </nav>
  );
}
