// components/booking/ServiceSelector.tsx
'use client';

import { useEffect, useState } from 'react';
import { Service } from '@/lib/types';
import { getOneTimeServices, getMonthlyServices } from '@/lib/data';
import { ServiceType } from './ServiceTypeSelector';

interface ServiceSelectorProps {
  serviceType: ServiceType;
  onSelectService: (service: Service) => void;
  onBack: () => void;
}

export const ServiceSelector = ({ serviceType, onSelectService, onBack }: ServiceSelectorProps) => {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      setIsLoading(true);
      const fetchedServices = serviceType === 'one-time' 
        ? await getOneTimeServices() 
        : await getMonthlyServices();
      setServices(fetchedServices);
      setIsLoading(false);
    };
    fetchServices();
  }, [serviceType]);

  if (isLoading) {
    return (
      <div className="px-4 sm:px-0">
        <div className="flex items-center mb-8">
          <button 
            onClick={onBack} 
            className="btn-secondary mr-6 flex items-center"
            disabled
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <div className="spinner mr-4"></div>
          <span className="text-gray-600">Loading services...</span>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="card loading">
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
              <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-10 bg-gray-300 rounded w-full"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

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
          <h2 className="fade-club-heading text-3xl sm:text-4xl mb-2">
            {serviceType === 'one-time' ? 'One-Time Services' : 'Monthly Memberships'}
          </h2>
          <p className="text-gray-600 text-lg">
            {serviceType === 'one-time' 
              ? 'Choose your perfect haircut service' 
              : 'Select your membership tier and unlock exclusive benefits'
            }
          </p>
        </div>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div 
            key={service.id} 
            className="card cursor-pointer group hover:shadow-xl transition-all duration-300 hover:scale-105 flex flex-col"
            onClick={() => onSelectService(service)}
          >
            <div className="flex-grow">
              <div className="flex items-start justify-between mb-4">
                <h3 className="fade-club-heading text-xl text-brand-primary group-hover:text-brand-accent transition-colors">
                  {service.name}
                </h3>
                {index === 1 && serviceType === 'monthly' && (
                  <span className="badge badge-accent text-xs">Popular</span>
                )}
              </div>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                {service.description}
              </p>
              
              <div className="mb-6">
                <span className="text-3xl font-bold text-gray-900">
                  ${service.price}
                </span>
                {service.type === 'monthly' && (
                  <span className="text-lg text-gray-500 ml-1">/month</span>
                )}
              </div>
            </div>
            
            <button className="btn-primary w-full group-hover:bg-brand-accent transition-colors">
              Select & Continue
              <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
