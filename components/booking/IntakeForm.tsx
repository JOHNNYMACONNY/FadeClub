// components/booking/IntakeForm.tsx
'use client';

import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { createBookingAction } from '@/lib/actions';
import { Service, Booking } from '@/lib/types';
import { TimeSlot } from './TimePreferenceSelector';

interface IntakeFormProps {
  selectedService: Service;
  selectedTimes: TimeSlot[];
  onBookingConfirmed: (booking: Booking) => void;
  onBack: () => void;
}

interface IFormInputs {
  name: string;
  email: string;
  phone: string;
  isFirstTime: boolean;
  notes: string;
}

export const IntakeForm = ({ 
  selectedService,
  selectedTimes,
  onBookingConfirmed,
  onBack
}: IntakeFormProps) => {
  const [isPending, startTransition] = useTransition();
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInputs>();

  const onSubmit = (data: IFormInputs) => {
    startTransition(async () => {
      const bookingData = {
        service: selectedService,
        client: data,
        preferredTimes: selectedTimes,
      };
      const result = await createBookingAction(bookingData);
      if (result.success && result.data) {
        onBookingConfirmed(result.data);
      } else {
        // Handle error, e.g., show a toast notification
        alert(`Error: ${result.error}`);
      }
    });
  };

  return (
    <div className="px-4 sm:px-0">
      <div className="text-center mb-12">
        <h2 className="fade-club-heading text-3xl sm:text-4xl mb-4 text-primary-gold">Your Details</h2>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Please provide your information to complete the booking. We&apos;ll contact you to confirm your appointment.
        </p>
      </div>
      
      {/* Show selected service and times */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="card-dark">
          <h4 className="fade-club-heading text-xl text-primary-gold mb-4">Booking Summary</h4>
          
          {/* Selected Service */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">Service:</span>
              <span className="text-primary-gold font-semibold">{selectedService.name}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Price:</span>
              <span className="text-2xl font-bold">
                ${selectedService.price}
                {selectedService.type === 'monthly' && <span className="text-sm text-gray-400">/month</span>}
              </span>
            </div>
          </div>
          
          {/* Selected Times */}
          {selectedTimes.length > 0 && (
            <div>
              <h5 className="font-medium text-primary-gold mb-3">Your Preferred Times:</h5>
              <div className="grid gap-2">
                {selectedTimes.map((time, index) => (
                  <div key={`${time.date}-${time.time}`} className="flex items-center">
                    <span className="badge badge-success mr-3 text-xs w-6 h-6 flex items-center justify-center">
                      {index + 1}
                    </span>
                    <span className="text-gray-300">
                      {time.displayDate} at {time.displayTime}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Form */}
      <div className="max-w-lg mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="name" className="form-label">Full Name *</label>
            <input
              id="name"
              type="text"
              {...register('name', { required: 'Name is required' })}
              className="form-input"
              placeholder="Enter your full name"
            />
            {errors.name && <p className="form-error">{errors.name.message}</p>}
          </div>

          <div>
            <label htmlFor="email" className="form-label">Email Address *</label>
            <input
              id="email"
              type="email"
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              className="form-input"
              placeholder="your@email.com"
            />
            {errors.email && <p className="form-error">{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="phone" className="form-label">Phone Number *</label>
            <input
              id="phone"
              type="tel"
              {...register('phone', { required: 'Phone number is required' })}
              className="form-input"
              placeholder="(555) 123-4567"
            />
            {errors.phone && <p className="form-error">{errors.phone.message}</p>}
          </div>

          <div>
            <label htmlFor="notes" className="form-label">Style Preferences or Notes</label>
            <textarea
              id="notes"
              {...register('notes')}
              rows={4}
              className="form-input resize-none"
              placeholder="Any specific style preferences, hair type information, or special requests..."
            />
            <p className="text-xs text-gray-400 mt-1">
              Help us give you the perfect cut by sharing any details about your desired style
            </p>
          </div>

          <div className="flex items-start space-x-3">
            <input
              id="isFirstTime"
              type="checkbox"
              {...register('isFirstTime')}
              className="mt-1 h-4 w-4 text-primary-gold border-dark-gray rounded focus:ring-primary-gold bg-dark-charcoal"
            />
            <label htmlFor="isFirstTime" className="text-sm text-gray-300 leading-5">
              <span className="font-medium">This is my first time at FadeClub</span>
              <br />
              <span className="text-gray-400">We&apos;ll add extra time for a consultation</span>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <button
              onClick={onBack}
              type="button"
              className="btn-secondary flex items-center justify-center hover:scale-105 transition-transform"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
            
            <button
              type="submit"
              disabled={isPending}
              className={`flex-1 flex items-center justify-center transition-all duration-200 ${
                isPending
                  ? 'btn-primary loading cursor-not-allowed'
                  : 'btn-primary hover:scale-105 transform'
              }`}
            >
              {isPending ? (
                <>
                  <div className="spinner mr-2"></div>
                  Booking...
                </>
              ) : (
                <>
                  Confirm Booking
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
