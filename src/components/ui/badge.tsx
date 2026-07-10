import * as React from 'react';
import { cn } from '../../lib/utils';

type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline';

const badgeVariants: { variant: Record<BadgeVariant, string> } = {
  variant: {
    default: 'border-border text-foreground',
    secondary: 'border-transparent bg-secondary text-secondary-foreground',
    destructive: 'border-transparent bg-destructive text-destructive-foreground',
    outline: 'border-border text-foreground',
  },
};

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant;
}

function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-[11px] font-normal uppercase tracking-[0.1em] focus:outline-hidden focus:ring-1 focus:ring-ring focus:ring-offset-2',
        badgeVariants.variant[variant],
        className,
      )}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
