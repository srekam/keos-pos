import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Pharmacy POS specific utilities
export function formatCurrency(amount: number, currency: string = 'THB'): string {
  return new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

export function formatDate(date: Date | string): string {
  const d = new Date(date)
  return new Intl.DateTimeFormat('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(d)
}

export function formatDateTime(date: Date | string): string {
  const d = new Date(date)
  return new Intl.DateTimeFormat('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d)
}

export function getStockStatus(quantity: number, reorderLevel: number = 10): {
  status: 'in-stock' | 'low-stock' | 'out-of-stock'
  color: string
  text: string
} {
  if (quantity === 0) {
    return {
      status: 'out-of-stock',
      color: 'text-red-600 bg-red-100',
      text: 'Out of Stock'
    }
  }
  
  if (quantity <= reorderLevel) {
    return {
      status: 'low-stock',
      color: 'text-yellow-600 bg-yellow-100',
      text: 'Low Stock'
    }
  }
  
  return {
    status: 'in-stock',
    color: 'text-green-600 bg-green-100',
    text: 'In Stock'
  }
}

export function generateProductCode(category: string, id: number): string {
  const prefix = category.substring(0, 2).toUpperCase()
  return `${prefix}${id.toString().padStart(3, '0')}`
}

export function calculateVAT(amount: number, rate: number = 0.07): number {
  return amount * rate
}

export function calculateTotal(amount: number, vat: number = 0, discount: number = 0): number {
  return amount + vat - discount
}

// Validation utilities
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validatePhone(phone: string): boolean {
  const phoneRegex = /^(\+66|66|0)[0-9]{8,9}$/
  return phoneRegex.test(phone)
}

export function validateThaiID(id: string): boolean {
  const idRegex = /^[0-9]{13}$/
  if (!idRegex.test(id)) return false
  
  // Thai ID validation algorithm
  let sum = 0
  for (let i = 0; i < 12; i++) {
    sum += parseInt(id[i]) * (13 - i)
  }
  const checkDigit = (11 - (sum % 11)) % 10
  return checkDigit === parseInt(id[12])
}

// API utilities
export async function apiRequest<T>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<T> {
  const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:41300'
  const url = `${baseUrl}${endpoint}`
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  }
  
  // Add auth token if available
  const token = localStorage.getItem('authToken')
  if (token) {
    config.headers = {
      ...config.headers,
      'Authorization': `Bearer ${token}`,
    }
  }
  
  try {
    const response = await fetch(url, config)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('API request failed:', error)
    throw error
  }
}

// Local storage utilities
export function setLocalStorage(key: string, value: any): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error('Failed to save to localStorage:', error)
  }
}

export function getLocalStorage<T>(key: string, defaultValue?: T): T | null {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue || null
  } catch (error) {
    console.error('Failed to read from localStorage:', error)
    return defaultValue || null
  }
}

export function removeLocalStorage(key: string): void {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error('Failed to remove from localStorage:', error)
  }
}

// Debounce utility
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// Throttle utility
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}
