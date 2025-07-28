// components/admin/ClientDetailsModal.tsx
'use client';

import { Booking } from '@/lib/types';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';

interface ClientDetailsModalProps {
  booking: Booking | null;
  onClose: () => void;
}

export const ClientDetailsModal = ({ booking, onClose }: ClientDetailsModalProps) => {
  if (!booking) return null;

  const getClientInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };



  return (
    <Modal isOpen={!!booking} onClose={onClose}>
      <div className="p-6 max-w-md mx-auto">
        <div className="flex items-center space-x-4 mb-6">
          <Avatar
            initials={getClientInitials(booking.client.name)}
            serviceType={booking.service.type}
            size="lg"
          />
          <div>
            <h2 className="heading-lg">Appointment Details</h2>
            <div className="flex items-center space-x-2 mt-1">
              <Badge
                variant={
                  booking.service.type === "one-time"
                    ? "service-onetime"
                    : "service-monthly"
                }
              >
                {booking.service.type === "one-time" ? "One-time" : "Monthly"}
              </Badge>
              <Badge variant={`status-${booking.status}`}>
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </Badge>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="card-dark">
            <h3 className="heading-md mb-3">Client Information</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-tertiary">Name:</span>
                <span className="text-body font-medium">{booking.client.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-tertiary">Phone:</span>
                <span className="text-body">{booking.client.phone}</span>
              </div>
              {booking.client.email && (
                <div className="flex justify-between">
                  <span className="text-tertiary">Email:</span>
                  <span className="text-body">{booking.client.email}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-tertiary">First Time:</span>
                <span className="text-body">{booking.client.isFirstTime ? 'Yes' : 'No'}</span>
              </div>
            </div>
          </div>

          <div className="card-dark">
            <h3 className="heading-md mb-3">Service Details</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-tertiary">Service:</span>
                <span className="text-body font-medium">{booking.service.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-tertiary">Price:</span>
                <span className="text-body font-semibold text-green-400">{'$' + booking.service.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-tertiary">Duration:</span>
                <span className="text-body">{booking.service.duration} minutes</span>
              </div>
            </div>
          </div>

          {booking.dateTime && (
            <div className="card-dark">
              <h3 className="heading-md mb-3">Appointment Time</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-tertiary">Date:</span>
                  <span className="text-body font-medium">
                    {new Date(booking.dateTime).toLocaleDateString([], {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-tertiary">Time:</span>
                  <span className="text-body font-medium">
                    {new Date(booking.dateTime).toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </span>
                </div>
              </div>
            </div>
          )}

          {booking.client.notes && (
            <div className="card-dark">
              <h3 className="heading-md mb-3">Notes</h3>
              <p className="text-body">{booking.client.notes}</p>
            </div>
          )}
        </div>
        
        <div className="mt-6 flex justify-end space-x-3">
          <Button onClick={onClose} variant="secondary">
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};
