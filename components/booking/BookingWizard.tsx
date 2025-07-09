// components/booking/BookingWizard.tsx
'use client';

import { useState } from 'react';
import { Service, Booking } from '@/lib/types';

import { StepIndicator } from './StepIndicator';
import { ServiceTypeSelector, ServiceType } from './ServiceTypeSelector';
import { ServiceSelector } from './ServiceSelector';
import { TimePreferenceSelector, TimeSlot } from './TimePreferenceSelector';
import { IntakeForm } from './IntakeForm';
import { BookingConfirmation } from './BookingConfirmation';

const WIZARD_STEPS = ['Service Type', 'Choose Service', 'Preferred Times', 'Your Details', 'Confirmation'];

export const BookingWizard = () => {
  const [step, setStep] = useState(1);
  const [selectedServiceType, setSelectedServiceType] = useState<ServiceType | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedTimes, setSelectedTimes] = useState<TimeSlot[]>([]);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  const handleSelectServiceType = (serviceType: ServiceType) => {
    setSelectedServiceType(serviceType);
    setStep(2);
  };

  const handleSelectService = (service: Service) => {
    setSelectedService(service);
    setStep(3);
  };

  const handleSelectTimes = (times: TimeSlot[]) => {
    setSelectedTimes(times);
    setStep(4);
  };

  const handleBookingConfirmed = (booking: Booking) => {
    setConfirmedBooking(booking);
    setStep(5);
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  
  const handleBookAnother = () => {
    setSelectedServiceType(null);
    setSelectedService(null);
    setSelectedTimes([]);
    setConfirmedBooking(null);
    setStep(1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <ServiceTypeSelector onSelectServiceType={handleSelectServiceType} />;
      case 2:
        if (!selectedServiceType) return null;
        return (
          <ServiceSelector
            serviceType={selectedServiceType}
            onSelectService={handleSelectService}
            onBack={handleBack}
          />
        );
      case 3:
        return (
          <TimePreferenceSelector
            onSelectTimes={handleSelectTimes}
            onBack={handleBack}
          />
        );
      case 4:
        if (!selectedService) return null;
        return (
          <IntakeForm
            selectedService={selectedService}
            selectedTimes={selectedTimes}
            onBookingConfirmed={handleBookingConfirmed}
            onBack={handleBack}
          />
        );
      case 5:
        if (!confirmedBooking) return null;
        return <BookingConfirmation booking={confirmedBooking} onBookAnother={handleBookAnother} />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      {/* Hide step indicator on final confirmation screen */}
      {step < 5 && <StepIndicator currentStep={step} totalSteps={5} steps={WIZARD_STEPS} />}
      
      {/* Main content area with dark theme styling */}
      <div className="mt-8 animate-slide-up">
        {renderStep()}
      </div>
    </div>
  );
};