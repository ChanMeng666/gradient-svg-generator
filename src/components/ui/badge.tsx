import * as React from 'react';
import { cn } from '../../lib/utils';

type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline';

const badgeVariants: { variant: Record<BadgeVariant, string> } = {
  variant: {
    default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
    secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
    destructive:
      'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
    outline: 'text-foreground',
  },
};

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant;
}

function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2',
        badgeVariants.variant[variant],
        className,
      )}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
