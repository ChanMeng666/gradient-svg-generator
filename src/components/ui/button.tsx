import * as React from 'react';
import { cn } from '../../lib/utils';

type ButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';

const buttonVariants: { variant: Record<ButtonVariant, string>; size: Record<ButtonSize, string> } =
  {
    variant: {
      default: 'bg-primary text-primary-foreground hover:bg-primary/85',
      destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/85',
      outline: 'border border-border bg-transparent hover:bg-accent hover:text-accent-foreground',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-accent',
      ghost: 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
      link: 'text-foreground underline-offset-4 hover:underline',
    },
    size: {
      default: 'h-10 px-5',
      sm: 'h-9 px-4',
      lg: 'h-12 px-7',
      icon: 'h-10 w-10',
    },
  };

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center whitespace-nowrap rounded-lg font-mono text-[13px] font-normal uppercase tracking-[0.08em] ring-offset-background transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
          buttonVariants.variant[variant],
          buttonVariants.size[size],
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
