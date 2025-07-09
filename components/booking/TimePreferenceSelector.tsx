// components/booking/TimePreferenceSelector.tsx
'use client';

import { useState } from 'react';

export interface TimeSlot {
  date: string; // YYYY-MM-DD format
  time: string; // HH:MM format
  displayDate: string; // e.g., "Mon, Jan 15"
  displayTime: string; // e.g., "10:00 AM"
}

interface TimePreferenceSelectorProps {
  onSelectTimes: (selectedTimes: TimeSlot[]) => void;
  onBack: () => void;
}

export const TimePreferenceSelector = ({ onSelectTimes, onBack }: TimePreferenceSelectorProps) => {
  const [selectedSlots, setSelectedSlots] = useState<TimeSlot[]>([]);

  // Generate time slots for next 2 weeks (excluding Sundays and Mondays)
  const generateTimeSlots = (): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    const today = new Date();
    const businessHours = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'];
    
    for (let dayOffset = 1; dayOffset <= 14; dayOffset++) {
      const date = new Date(today);
      date.setDate(today.getDate() + dayOffset);
      
      // Skip Sundays (day 0) and Mondays (day 1)
      if (date.getDay() === 0 || date.getDay() === 1) continue;
      
      const dateStr = date.toISOString().split('T')[0]; // YYYY-MM-DD
      const displayDate = date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      });
      
      businessHours.forEach(time => {
        const displayTime = new Date(`2000-01-01T${time}:00`).toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit'
        });
        
        slots.push({
          date: dateStr,
          time,
          displayDate,
          displayTime
        });
      });
    }
    
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const toggleSlot = (slot: TimeSlot) => {
    const isSelected = selectedSlots.some(s => s.date === slot.date && s.time === slot.time);
    
    if (isSelected) {
      setSelectedSlots(selectedSlots.filter(s => !(s.date === slot.date && s.time === slot.time)));
    } else if (selectedSlots.length < 3) {
      setSelectedSlots([...selectedSlots, slot]);
    }
  };

  const isSlotSelected = (slot: TimeSlot) => {
    return selectedSlots.some(s => s.date === slot.date && s.time === slot.time);
  };

  const handleContinue = () => {
    if (selectedSlots.length > 0) {
      onSelectTimes(selectedSlots);
    }
  };

  // Group slots by date for better display
  const slotsByDate = timeSlots.reduce((acc, slot) => {
    if (!acc[slot.date]) {
      acc[slot.date] = [];
    }
    acc[slot.date].push(slot);
    return acc;
  }, {} as Record<string, TimeSlot[]>);

  return (
    <div className="px-4 sm:px-0">
      <div className="flex items-center mb-8">
        <button 
          onClick={onBack} 
          className="btn-secondary mr-6 flex items-center hover:scale-105 transition-transform"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <div>
          <h2 className="fade-club-heading text-3xl sm:text-4xl mb-2 text-primary-gold">Choose Your Preferred Times</h2>
          <p className="text-gray-300 text-lg">
            Select up to 3 preferred appointment times. We&apos;ll contact you to confirm availability.
          </p>
        </div>
      </div>

      {/* Selection Status and Controls */}
      <div className="card-dark mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <span className="badge badge-primary">
              {selectedSlots.length}/3 selected
            </span>
            {selectedSlots.length === 3 && (
              <span className="text-sm text-success-green">✓ Maximum reached</span>
            )}
          </div>
          
          {selectedSlots.length > 0 && (
            <button 
              onClick={() => setSelectedSlots([])} 
              className="btn-secondary text-sm hover:scale-105 transition-transform"
            >
              Clear All
            </button>
          )}
        </div>
        
        {selectedSlots.length > 0 && (
          <div>
            <h4 className="font-medium text-primary-gold mb-3">Your Preferred Times:</h4>
            <div className="flex flex-wrap gap-3">
              {selectedSlots.map((slot, index) => (
                <div
                  key={`${slot.date}-${slot.time}`}
                  className="flex items-center badge badge-success text-sm py-2 px-3"
                >
                  <span className="mr-2">{index + 1}.</span>
                  <span>{slot.displayDate} at {slot.displayTime}</span>
                  <button
                    onClick={() => toggleSlot(slot)}
                    className="ml-2 text-red-400 hover:text-red-300 transition-colors"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Time Slots Grid */}
      <div className="space-y-6 mb-8">
        {Object.entries(slotsByDate).map(([date, slots]) => {
          const hasSelectedSlot = slots.some(slot => isSlotSelected(slot));
          
          return (
            <div 
              key={date} 
              className={`card-dark transition-all duration-300 ${
                hasSelectedSlot ? 'ring-2 ring-primary-gold ring-opacity-50' : ''
              }`}
            >
              <div className="flex items-center mb-4">
                <h3 className="fade-club-heading text-xl text-primary-gold">
                  {slots[0].displayDate}
                </h3>
                {hasSelectedSlot && (
                  <span className="badge badge-success ml-3 text-xs">
                    {slots.filter(slot => isSlotSelected(slot)).length} selected
                  </span>
                )}
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3">
                {slots.map(slot => {
                  const selected = isSlotSelected(slot);
                  const disabled = !selected && selectedSlots.length >= 3;
                  
                  return (
                    <button
                      key={`${slot.date}-${slot.time}`}
                      onClick={() => toggleSlot(slot)}
                      disabled={disabled}
                      className={`
                        px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
                        ${selected
                          ? 'bg-primary-gold text-dark-charcoal shadow-lg transform scale-105'
                          : disabled
                          ? 'bg-dark-gray text-gray-600 cursor-not-allowed'
                          : 'bg-dark-charcoal border-2 border-dark-gray text-gray-300 hover:border-primary-gold hover:text-primary-gold hover:shadow-md hover:scale-105'
                        }
                      `}
                    >
                      {slot.displayTime}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 sm:justify-between">
        <button 
          onClick={onBack} 
          className="btn-secondary flex items-center justify-center hover:scale-105 transition-transform"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        
        <button 
          onClick={handleContinue}
          disabled={selectedSlots.length === 0}
          className={`px-8 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center ${
            selectedSlots.length === 0
              ? 'bg-dark-gray text-gray-600 cursor-not-allowed'
              : 'btn-primary hover:scale-105 transform'
          }`}
        >
          Continue with {selectedSlots.length} time{selectedSlots.length !== 1 ? 's' : ''}
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};
