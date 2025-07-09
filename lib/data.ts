// lib/data.ts
import { Service, Booking, OneTimeService, MonthlyService } from './types';

// One-time services
const oneTimeServices: OneTimeService[] = [
  { 
    id: 1, 
    name: 'Regular Haircut', 
    description: 'Professional haircut and styling', 
    price: 50, 
    duration: 60, 
    type: 'one-time' 
  },
  { 
    id: 2, 
    name: 'Haircut + Beard', 
    description: 'Haircut with beard trim and styling', 
    price: 60, 
    duration: 60, 
    type: 'one-time' 
  },
];

// Monthly subscription services
const monthlyServices: MonthlyService[] = [
  { 
    id: 3, 
    name: 'Tier 1', 
    description: 'Unlimited weekly haircuts.', 
    price: 150, 
    duration: 30, 
    type: 'monthly' 
  },
  { 
    id: 4, 
    name: 'Tier 2', 
    description: 'Unlimited haircuts & beard line-ups.', 
    price: 180, 
    duration: 45, 
    type: 'monthly' 
  },
  { 
    id: 5, 
    name: 'Tier 3', 
    description: 'Haircuts, beards, plus 2 facials/month.', 
    price: 200, 
    duration: 60, 
    type: 'monthly' 
  },
];

// All services combined
const services: Service[] = [...oneTimeServices, ...monthlyServices];

export async function getServices(): Promise<Service[]> {
  // Simulate a network delay
  await new Promise(resolve => setTimeout(resolve, 100));
  return services;
}

export async function getOneTimeServices(): Promise<OneTimeService[]> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return oneTimeServices;
}

export async function getMonthlyServices(): Promise<MonthlyService[]> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return monthlyServices;
}

export async function getBookings(): Promise<Booking[]> {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
  try {
    const res = await fetch(`${apiBaseUrl}/api/bookings`, { cache: 'no-store' });
    if (!res.ok) {
      console.error('Failed to fetch bookings:', res.status, res.statusText);
      return []; // Return empty array on error
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return []; // Return empty array on network error
  }
}
