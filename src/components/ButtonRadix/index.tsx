import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:
          'bg-[#00b56b] text-white border border-[#00b56b] hover:bg-[#00995a] hover:border-[#00995a] active:bg-[#007a48] active:border-[#007a48] disabled:bg-[#e0e0e0] disabled:border-[#e0e0e0] disabled:text-[#9e9e9e]',
        secondary:
          'bg-transparent text-[#312e4d] border border-[#00b56b] hover:bg-[#e6f8ef] hover:border-[#00995a] active:bg-[#00b56b]/10 active:border-[#007a48] disabled:bg-transparent disabled:border-[#e0e0e0] disabled:text-[#9e9e9e]',
        alert:
          'bg-[#ff305f] text-white border border-[#a80023] hover:bg-[#d4002c] hover:border-[#a80023] active:bg-[#a80023] active:border-[#a80023] disabled:bg-[#e0e0e0] disabled:border-[#e0e0e0] disabled:text-[#9e9e9e]',
        ghost:
          'bg-transparent text-[#00995a] border-0 hover:bg-[#e6f8ef] hover:text-[#00995a] active:bg-[#00b56b]/10 active:text-[#007a48] disabled:bg-transparent disabled:text-[#9e9e9e]',
        plain:
          'bg-transparent text-[#00995a] border-0 p-0 h-auto hover:text-[#00995a] hover:underline active:text-[#007a48] disabled:text-[#9e9e9e] disabled:no-underline',
      },
      size: {
        small: 'h-8 px-3 py-2 text-sm',
        medium: 'h-9 px-4 py-2 text-sm',
        large: 'h-11 px-5 py-2.5 text-base',
      },
      iconOnly: {
        true: 'aspect-square',
      },
    },
    compoundVariants: [
      {
        size: 'small',
        iconOnly: true,
        className: 'h-8 w-8 p-0',
      },
      {
        size: 'medium',
        iconOnly: true,
        className: 'h-10 w-10 p-0',
      },
      {
        size: 'large',
        iconOnly: true,
        className: 'h-11 w-11 p-0',
      },
      {
        variant: 'plain',
        size: 'small',
        className: 'h-auto px-0 py-0',
      },
      {
        variant: 'plain',
        size: 'medium',
        className: 'h-auto px-0 py-0',
      },
      {
        variant: 'plain',
        size: 'large',
        className: 'h-auto px-0 py-0',
      },
    ],
    defaultVariants: {
      variant: 'primary',
      size: 'medium',
      iconOnly: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      iconOnly,
      asChild = false,
      leftIcon,
      rightIcon,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';
    
    // When using asChild, we render children directly without wrapping
    if (asChild) {
      return (
        <Comp
          className={cn(buttonVariants({ variant, size, iconOnly, className }))}
          ref={ref}
          {...props}
        >
          {children}
        </Comp>
      );
    }
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, iconOnly, className }))}
        ref={ref}
        {...props}
      >
        {leftIcon && !iconOnly && (
          <span className="inline-flex shrink-0">{leftIcon}</span>
        )}
        {iconOnly ? leftIcon || children : children}
        {rightIcon && !iconOnly && (
          <span className="inline-flex shrink-0">{rightIcon}</span>
        )}
      </Comp>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };

