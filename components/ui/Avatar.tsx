// components/ui/Avatar.tsx
import { ComponentProps, forwardRef } from "react";

export type AvatarProps = ComponentProps<"div"> & {
  initials: string;
  serviceType?: "one-time" | "monthly";
  size?: "sm" | "md" | "lg";
};

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      initials,
      serviceType = "one-time",
      size = "md",
      className = "",
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: "w-8 h-8 text-xs",
      md: "w-10 h-10 text-sm",
      lg: "w-12 h-12 text-base",
    };

    const serviceTypeClass =
      serviceType === "monthly" ? "avatar-initials-monthly" : "";

    return (
      <div
        ref={ref}
        className={`avatar-initials ${serviceTypeClass} ${sizeClasses[size]} ${className}`}
        {...props}
      >
        {initials.toUpperCase()}
      </div>
    );
  }
);

Avatar.displayName = "Avatar";
