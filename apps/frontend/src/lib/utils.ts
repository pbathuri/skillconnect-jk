import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date));
}

export function formatPercentage(value: number): string {
  return `${value.toFixed(1)}%`;
}

export function generateApplicationNumber(): string {
  return `SCJK${Date.now().toString(36).toUpperCase()}`;
}

// Loan status colors
export const loanStatusColors: Record<string, string> = {
  draft: 'bg-gray-100 text-gray-700',
  submitted: 'bg-blue-100 text-blue-700',
  under_review: 'bg-yellow-100 text-yellow-700',
  bank_approved: 'bg-green-100 text-green-700',
  bank_rejected: 'bg-red-100 text-red-700',
  active: 'bg-emerald-100 text-emerald-700',
  in_repayment: 'bg-purple-100 text-purple-700',
  closed: 'bg-gray-100 text-gray-700',
};

// Sector icons
export const sectorIcons: Record<string, string> = {
  it_ites: '💻',
  electronics: '🔌',
  tourism_hospitality: '🏨',
  healthcare: '🏥',
  retail: '🛒',
  manufacturing: '🏭',
  agriculture: '🌾',
  handicrafts: '🎨',
  beauty_wellness: '💅',
  apparel: '👗',
};

