// components/ui/Button.tsx
import { ComponentProps, forwardRef } from 'react';

export type ButtonProps = ComponentProps<'button'> & {
  variant?: 'primary' | 'secondary' | 'accent';
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((
  { variant = 'primary', className = '', ...props },
  ref
) => {
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary', 
    accent: 'btn-accent',
  };
  
  return (
    <button
      ref={ref}
      className={`${variantClasses[variant]} ${className}`}
      {...props}
    />
  );
});

Button.displayName = 'Button';
