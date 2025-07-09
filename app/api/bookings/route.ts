// app/api/bookings/route.ts
import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import { Booking } from '@/lib/types';

const jsonFilePath = path.join(process.cwd(), 'data', 'bookings.json');

async function getBookingsFromFile(): Promise<Booking[]> {
  try {
    const fileContents = await fs.readFile(jsonFilePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    // If the file doesn't exist or is empty, return an empty array
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

// GET /api/bookings
export async function GET() {
  try {
    const bookings = await getBookingsFromFile();
    return NextResponse.json(bookings);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error reading bookings' }, { status: 500 });
  }
}

// POST /api/bookings
export async function POST(request: Request) {
  try {
    const newBooking: Omit<Booking, 'id'> = await request.json();
    
    const bookingWithId: Booking = {
      ...newBooking,
      id: new Date().toISOString() + '-' + Math.random().toString(36).substr(2, 9) // More robust unique ID
    };

    const bookings = await getBookingsFromFile();
    bookings.push(bookingWithId);

    await fs.writeFile(jsonFilePath, JSON.stringify(bookings, null, 2));

    return NextResponse.json(bookingWithId, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error creating booking' }, { status: 500 });
  }
}
