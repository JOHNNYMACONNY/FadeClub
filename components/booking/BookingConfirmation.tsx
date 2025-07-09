// components/booking/BookingConfirmation.tsx
'use client';

import { Booking } from '@/lib/types';

interface BookingConfirmationProps {
  booking: Booking;
  onBookAnother: () => void;
}

export const BookingConfirmation = ({ booking, onBookAnother }: BookingConfirmationProps) => {
  if (!booking) return null;

  const isOneTime = booking.service.type === 'one-time';
  const priceText = isOneTime ? `$${booking.service.price}` : `$${booking.service.price}/month`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Success Animation */}
        <div className="mb-8">
          <div className="relative mx-auto w-24 h-24">
            <svg 
              className="w-24 h-24 text-success-green animate-pulse" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" strokeWidth={2} />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 12l2 2 4-4" />
            </svg>
          </div>
        </div>

        {/* Main Message */}
        <div className="mb-12">
          <h1 className="fade-club-heading text-4xl sm:text-5xl text-brand-primary mb-4">
            {isOneTime ? 'Booking Submitted!' : 'Welcome to FadeClub!'}
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed max-w-xl mx-auto">
            Thanks, <span className="font-semibold text-brand-primary">{booking.client.name}</span>. 
            We&apos;ve received your information{booking.preferredTimes?.length ? ' and preferred times' : ''} and will contact you shortly to {isOneTime ? 'confirm your appointment time' : 'schedule your first appointment'}.
          </p>
        </div>

        {/* Booking Details Card */}
        <div className="card mb-8 text-left">
          <div className="text-center mb-6">
            <h3 className="fade-club-heading text-2xl text-brand-primary">
              {isOneTime ? 'Your Service Details' : 'Your Membership Details'}
            </h3>
          </div>
          
          <div className="grid gap-6">
            {/* Service Info */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <span className="text-sm text-gray-500 uppercase tracking-wide">
                  {isOneTime ? 'Service' : 'Membership Tier'}
                </span>
                <p className="font-semibold text-lg text-gray-900">{booking.service.name}</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-brand-primary">{priceText}</span>
                <p className="text-sm text-gray-500">{booking.service.duration} minutes</p>
              </div>
            </div>

            {/* Client Info */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-gray-500 uppercase tracking-wide">Contact</span>
                <p className="font-medium">{booking.client.name}</p>
                <p className="text-sm text-gray-600">{booking.client.email}</p>
                <p className="text-sm text-gray-600">{booking.client.phone}</p>
              </div>
              
              {booking.client.isFirstTime && (
                <div className="flex items-center">
                  <div className="badge badge-accent">First Visit</div>
                  <span className="text-sm text-gray-600 ml-2">Extra consultation time included</span>
                </div>
              )}
            </div>
            
            {/* Preferred Times */}
            {booking.preferredTimes && booking.preferredTimes.length > 0 && (
              <div>
                <span className="text-sm text-gray-500 uppercase tracking-wide">Your Preferred Times</span>
                <div className="mt-2 grid gap-2">
                  {booking.preferredTimes.map((time, index) => (
                    <div key={`${time.date}-${time.time}`} className="flex items-center">
                      <span className="badge badge-primary mr-3 text-xs w-6 h-6 flex items-center justify-center">
                        {index + 1}
                      </span>
                      <span className="text-gray-700">
                        {time.displayDate} at {time.displayTime}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Notes */}
            {booking.client.notes && (
              <div>
                <span className="text-sm text-gray-500 uppercase tracking-wide">Style Notes</span>
                <p className="text-gray-700 mt-1 italic">&ldquo;{booking.client.notes}&rdquo;</p>
              </div>
            )}
          </div>
        </div>

        {/* Next Steps */}
        <div className="card mb-8 bg-blue-50">
          <h4 className="fade-club-heading text-xl text-brand-primary mb-4">What&apos;s Next?</h4>
          <div className="grid sm:grid-cols-2 gap-4 text-left">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-brand-primary rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">1</span>
              </div>
              <div>
                <p className="font-medium">Confirmation Call</p>
                <p className="text-sm text-gray-600">We&apos;ll call you within 24 hours to confirm your appointment</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-brand-primary rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">2</span>
              </div>
              <div>
                <p className="font-medium">Your Visit</p>
                <p className="text-sm text-gray-600">Arrive 10 minutes early for your premium experience</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={onBookAnother}
            className="btn-secondary hover:scale-105 transition-transform"
          >
            Book Another Appointment
          </button>
          
          <button 
            onClick={() => window.print()}
            className="btn-primary hover:scale-105 transition-transform no-print"
          >
            Save Details
          </button>
        </div>

        {/* Footer Message */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            Questions? Call us at <span className="font-medium">(615) 555-FADE</span> or email 
            <span className="font-medium"> hello@fadeclub.com</span>
          </p>
        </div>
      </div>
    </div>
  );
};