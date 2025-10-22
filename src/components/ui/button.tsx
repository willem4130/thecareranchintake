import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[3px] font-serif font-bold uppercase transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-[#1f638a] text-white hover:bg-[#05a7d4] shadow-sm',
        primary: 'bg-primary text-primary-foreground hover:bg-primary-hover shadow-sm',
        destructive: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline:
          'border border-editorial-black bg-transparent text-editorial-black hover:bg-editorial-veryLightGray',
        secondary:
          'bg-transparent border border-editorial-black text-editorial-black hover:bg-editorial-veryLightGray',
        ghost: 'hover:bg-editorial-veryLightGray hover:text-editorial-black',
        link: 'text-editorial-black underline hover:text-primary hover:shadow-[0_1px_0_0_hsl(var(--primary-red))]',
      },
      size: {
        default: 'h-auto px-3 py-3 text-[13.4px]',
        sm: 'h-auto px-3 py-2 text-[13px]',
        lg: 'h-auto px-4 py-3 text-sm',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
