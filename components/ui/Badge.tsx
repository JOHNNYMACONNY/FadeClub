// components/ui/Badge.tsx
import { ComponentProps, forwardRef } from "react";

export type BadgeProps = ComponentProps<"span"> & {
  variant:
    | "service-onetime"
    | "service-monthly"
    | "status-pending"
    | "status-confirmed"
    | "status-completed"
    | "status-cancelled";
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant, className = "", children, ...props }, ref) => {
    const variantClasses = {
      "service-onetime": "badge-service-onetime",
      "service-monthly": "badge-service-monthly",
      "status-pending": "badge-status-pending",
      "status-confirmed": "badge-status-confirmed",
      "status-completed": "badge-status-completed",
      "status-cancelled": "badge-status-cancelled",
    };

    return (
      <span
        ref={ref}
        className={`${variantClasses[variant]} ${className}`}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";
