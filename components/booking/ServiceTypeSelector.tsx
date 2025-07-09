// components/booking/ServiceTypeSelector.tsx
'use client';

import React from 'react';

export type ServiceType = 'one-time' | 'monthly';

interface ServiceTypeSelectorProps {
  onSelectServiceType: (serviceType: ServiceType) => void;
}

export const ServiceTypeSelector = ({ onSelectServiceType }: ServiceTypeSelectorProps) => {
  return (
    <div className="px-4 sm:px-0">
      <div className="text-center mb-12">
        <h2 className="fade-club-heading text-3xl sm:text-4xl mb-4">Choose Your Service</h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Select between a one-time appointment or monthly membership to get started
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* One-Time Service */}
        <div 
          className="card cursor-pointer group hover:shadow-xl transition-all duration-300 hover:scale-105"
          onClick={() => onSelectServiceType('one-time')}
        >
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center group-hover:from-blue-200 group-hover:to-blue-300 transition-all duration-300">
              <svg className="w-10 h-10 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            
            <h3 className="fade-club-heading text-2xl mb-3">One-Time Haircut</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Book a single appointment for today or whenever you need it. Perfect for special occasions or when you&apos;re in town.
            </p>
            
            <div className="badge badge-primary text-base py-2 px-4">
              Starting at $50
            </div>
          </div>
        </div>

        {/* Monthly Membership */}
        <div 
          className="card cursor-pointer group hover:shadow-xl transition-all duration-300 hover:scale-105 relative"
          onClick={() => onSelectServiceType('monthly')}
        >
          {/* Popular badge */}
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <span className="badge badge-accent text-sm py-1 px-3">
              Most Popular
            </span>
          </div>
          
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center group-hover:from-green-200 group-hover:to-green-300 transition-all duration-300">
              <svg className="w-10 h-10 text-success-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            
            <h3 className="fade-club-heading text-2xl mb-3">Monthly Membership</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Unlimited access with recurring monthly subscription. Best value for regular clients who want consistent care.
            </p>
            
            <div className="badge badge-success text-base py-2 px-4">
              Starting at $150/month
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
