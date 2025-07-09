// components/admin/ScheduleView.tsx
'use client';

import { useState, useMemo } from 'react';
import { Booking } from '@/lib/types';
import { ClientDetailsModal } from './ClientDetailsModal';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';

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

  const getServiceBadgeClass = (service: { type: string }) => {
    return service.type === 'monthly' 
      ? 'badge-service-monthly' 
      : 'badge-service-onetime';
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'badge-status-pending';
      case 'confirmed':
        return 'badge-status-confirmed';
      case 'completed':
        return 'badge-status-completed';
      case 'cancelled':
        return 'badge-status-cancelled';
      default:
        return 'badge-status-pending';
    }
  };

  const getClientInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="card-dark">
      <h2 className="heading-xl mb-6">All Appointments</h2>
      <div className="space-y-8">
        {Object.keys(groupedBookings).length > 0 ? (
          Object.entries(groupedBookings).map(([date, dayBookings], index) => (
            <div key={date} className="animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
              <h3 className="heading-md mb-4 sticky top-0 bg-bg-primary py-2 z-10">
                {date}
                <div className="h-px bg-gradient-to-r from-blue-500/30 to-transparent mt-2"></div>
              </h3>
              <div className="grid gap-4">
                {dayBookings.map((booking, bookingIndex) => (
                  <div
                    key={booking.id}
                    className="card-dark card-interactive animate-slide-up"
                    style={{ animationDelay: `${(index * 100) + (bookingIndex * 50)}ms` }}
                    onClick={() => setSelectedBooking(booking)}
                  >
                    <div className="flex items-center justify-between">                        <div className="flex items-center space-x-4">
                          <Avatar
                            initials={getClientInitials(booking.client.name)}
                            serviceType={booking.service.type}
                            size="md"
                          />
                          <div>
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="heading-md">{booking.service.name}</span>
                              <Badge
                                variant={
                                  booking.service.type === "one-time"
                                    ? "service-onetime"
                                    : "service-monthly"
                                }
                              >
                                {booking.service.type === "one-time" ? "One-time" : "Monthly"}
                              </Badge>
                            </div>
                            <p className="text-body">{booking.client.name}</p>
                            <p className="text-small">
                              Phone: {booking.client.phone || 'Not provided'}
                            </p>
                          </div>
                        </div>
                      <div className="text-right">                          <div className="flex items-center space-x-2 mb-2">
                            <p className="heading-md">
                              {new Date(booking.dateTime!).toLocaleTimeString([], { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}
                            </p>
                            <Badge variant={`status-${booking.status}`}>
                              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </Badge>
                          </div>
                        <p className="text-small">{booking.service.duration} min</p>
                        <p className="text-caption">${booking.service.price}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <div className="animate-pulse">
              <p className="text-body mb-2">No appointments scheduled yet</p>
              <p className="text-small">Bookings will appear here once clients make appointments</p>
            </div>
          </div>
        )}
      </div>
      <ClientDetailsModal
        booking={selectedBooking}
        onClose={() => setSelectedBooking(null)}
      />
    </div>
  );
};
