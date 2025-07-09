// components/layout/BrandHeader.tsx
import React from 'react';

export const BrandHeader = () => {
  return (
    <header className="text-center py-8 sm:py-12">
      <div className="container">
        {/* Main Logo/Brand */}
        <h1 className="fade-club-heading text-4xl sm:text-5xl lg:text-6xl mb-2">
          Fade<span className="fade-club-heading-script text-brand-accent">Club</span>
        </h1>
        
        {/* Tagline */}
        <p className="text-gray-600 text-lg sm:text-xl max-w-2xl mx-auto mb-8">
          Where precision meets style. Book your next cut with Nashville&apos;s premier barbers.
        </p>
        
        {/* Decorative Barber Pole Element */}
        <div className="flex justify-center mb-8">
          <div className="w-1 h-16 barber-pole-accent rounded-full opacity-80"></div>
        </div>
      </div>
    </header>
  );
};
