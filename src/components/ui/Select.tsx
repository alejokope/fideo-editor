import { cn } from '@/lib/cn';
import type { SelectHTMLAttributes } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
}

export function Select({ className, error, children, ...props }: SelectProps) {
  return (
    <select
      className={cn(
        'flex h-11 w-full rounded-xl border bg-surface px-4 py-2 text-sm text-content',
        'transition-all duration-200',
        'focus:outline-none focus:ring-1 focus:ring-accent focus:ring-offset-2 focus:ring-offset-surface',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'appearance-none bg-[length:16px_16px] bg-[right_12px_center] bg-no-repeat pr-10',
        error
          ? 'border-danger focus:ring-danger'
          : 'border-border hover:border-accent-muted',
        className
      )}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='rgb(var(--content-muted))' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
      }}
      {...props}
    >
      {children}
    </select>
  );
}