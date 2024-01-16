import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-[5px] text-sm font-bold disabled:pointer-events-none disabled:opacity-50 hover:border-primary-blue transition-all duration-[250ms] ease-out",
  {
    variants: {
      variant: {
        primary: "bg-primaryColor hover:bg-primaryColor/10 text-white",
        secondary:
          "bg-transparent border text-primaryColor hover:text-white hover:bg-primaryColor border-primaryColor",
      },
      size: {
        sm: "w-[148px] h-11",
        lg: "w-[292px] h-[52px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "sm",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={buttonVariants({ variant, size, className })}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
