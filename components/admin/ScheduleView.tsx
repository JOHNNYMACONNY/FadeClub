// components/admin/ScheduleView.tsx
'use client';

import { useState, useMemo } from 'react';
import { Booking } from '@/lib/types';
import { ClientDetailsModal } from './ClientDetailsModal';

interface ScheduleViewProps {
  bookings: Booking[];
}

export const ScheduleView = ({ bookings }: ScheduleViewProps) => {
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const groupedBookings = useMemo(() => {
    return bookings
      .filter(booking => booking.dateTime) // Only include bookings with scheduled times
      .sort((a, b) => new Date(a.dateTime!).getTime() - new Date(b.dateTime!).getTime())
      .reduce((acc, booking) => {
        const date = new Date(booking.dateTime!).toLocaleDateString([], {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(booking);
        return acc;
      }, {} as Record<string, Booking[]>);
  }, [bookings]);

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">All Appointments</h2>
      <div className="space-y-8">
        {Object.keys(groupedBookings).length > 0 ? (
          Object.entries(groupedBookings).map(([date, dayBookings]) => (
            <div key={date}>
              <h3 className="font-semibold text-lg mb-3 sticky top-0 bg-white py-2">{date}</h3>
              <div className="space-y-4">
                {dayBookings.map(booking => (
                  <div
                    key={booking.id}
                    className="p-4 bg-gray-50 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => setSelectedBooking(booking)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-bold text-blue-700">{booking.service.name}</p>
                        <p className="text-sm text-gray-800">{booking.client.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{new Date(booking.dateTime!).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                        <p className="text-sm text-gray-500">{booking.service.duration} min</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 py-8">No appointments booked yet.</p>
        )}
      </div>
      <ClientDetailsModal
        booking={selectedBooking}
        onClose={() => setSelectedBooking(null)}
      />
    </div>
  );
};
