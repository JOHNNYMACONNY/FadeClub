// lib/types.ts

export interface OneTimeService {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: number; // Duration in minutes (1 hour = 60)
  type: 'one-time';
}

export interface MonthlyService {
  id: number;
  name: string;
  description: string;
  price: number; // Monthly price
  duration: number; // Typical appointment duration
  type: 'monthly';
}

export type Service = OneTimeService | MonthlyService;

export interface Booking {
  id: string; // Unique ID for the submission
  service: Service;
  client: {
    name: string;
    email: string;
    phone: string;
    isFirstTime: boolean;
    notes: string;
  };
  preferredTimes?: {
    date: string; // YYYY-MM-DD format
    time: string; // HH:MM format
    displayDate: string; // e.g., "Mon, Jan 15"
    displayTime: string; // e.g., "10:00 AM"
  }[]; // Client's preferred appointment times
  submissionDate: Date; // When the user submitted the form
  dateTime?: Date; // Optional: To be set by the admin later
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'; // Booking status
}
