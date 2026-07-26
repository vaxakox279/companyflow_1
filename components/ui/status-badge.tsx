import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const statusBadgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors',
  {
    variants: {
      tone: {
        neutral:
          'border-border bg-muted text-muted-foreground',
        primary:
          'border-primary/20 bg-primary/10 text-primary',
        success:
          'border-success/20 bg-success/10 text-success',
        warning:
          'border-warning/20 bg-warning/10 text-warning',
        danger:
          'border-destructive/20 bg-destructive/10 text-destructive',
        info:
          'border-blue-400/20 bg-blue-400/10 text-blue-600 dark:text-blue-400',
      },
    },
    defaultVariants: { tone: 'neutral' },
  }
);

export interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof statusBadgeVariants> {
  dot?: boolean;
}

export function StatusBadge({
  className,
  tone,
  dot = true,
  children,
  ...props
}: StatusBadgeProps) {
  return (
    <span className={cn(statusBadgeVariants({ tone }), className)} {...props}>
      {dot && (
        <span
          className={cn(
            'h-1.5 w-1.5 rounded-full',
            tone === 'success' && 'bg-success',
            tone === 'warning' && 'bg-warning',
            tone === 'danger' && 'bg-destructive',
            tone === 'primary' && 'bg-primary',
            tone === 'info' && 'bg-blue-500',
            (!tone || tone === 'neutral') && 'bg-muted-foreground'
          )}
        />
      )}
      {children}
    </span>
  );
}
