// components/layout/BrandHeader.tsx
import React from 'react';
import Image from 'next/image';

export const BrandHeader = () => {
  return (
    <header className="text-center py-8 sm:py-12">
      <div className="container">
        {/* Main Logo/Brand */}
        <div className="flex justify-center mb-4">
          <Image
            src="/FadeClubLogo.png"
            alt="Fade Club Logo"
            width={300}
            height={150}
            className="w-auto h-24 sm:h-32 lg:h-40"
            priority
          />
        </div>
        
        {/* Tagline */}
        <p className="text-gray-600 text-lg sm:text-xl max-w-2xl mx-auto mb-8">
          Where precision meets style. Book your next cut with LA&apos;s premier barber.
        </p>
      </div>
    </header>
  );
};
