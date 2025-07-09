// components/ui/Card.tsx
import { ComponentProps, forwardRef } from 'react';

export type CardProps = ComponentProps<'div'>;

export const Card = forwardRef<HTMLDivElement, CardProps>(({ className = '', ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`card ${className}`}
      {...props}
    />
  );
});

Card.displayName = 'Card';
