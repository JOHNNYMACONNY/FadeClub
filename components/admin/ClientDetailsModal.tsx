// components/admin/ClientDetailsModal.tsx
'use client';

import { Booking } from '@/lib/types';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';

interface ClientDetailsModalProps {
  booking: Booking | null;
  onClose: () => void;
}

export const ClientDetailsModal = ({ booking, onClose }: ClientDetailsModalProps) => {
  if (!booking) return null;

  return (
    <Modal isOpen={!!booking} onClose={onClose}>
      <div className="p-2">
        <h2 className="text-2xl font-bold mb-4">Appointment Details</h2>
        <div className="space-y-3 text-gray-700">
          <p><strong>Client:</strong> {booking.client.name}</p>
          <p><strong>Phone:</strong> {booking.client.phone}</p>
          <p><strong>Service:</strong> {booking.service.name} (${booking.service.price})</p>
          <p><strong>Date:</strong> {booking.dateTime ? new Date(booking.dateTime).toLocaleDateString() : 'Not scheduled'}</p>
          <p><strong>Time:</strong> {booking.dateTime ? new Date(booking.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Not scheduled'}</p>
          <p><strong>First Time Client:</strong> {booking.client.isFirstTime ? 'Yes' : 'No'}</p>
          {booking.client.notes && <p><strong>Notes:</strong> {booking.client.notes}</p>}
        </div>
        <div className="mt-6 text-right">
          <Button onClick={onClose} variant="secondary">
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};
