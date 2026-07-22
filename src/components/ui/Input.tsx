import { cn } from '@/lib/cn';
import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export function Input({ className, error, ...props }: InputProps) {
  return (
    <input
      className={cn(
        'flex h-10 w-full rounded-xl border bg-surface px-4 py-2 text-sm text-content',
        'placeholder:text-content-muted',
        'transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-surface',
        'disabled:cursor-not-allowed disabled:opacity-50',
        error
          ? 'border-danger focus:ring-danger'
          : 'border-border hover:border-accent-muted',
        className
      )}
      {...props}
    />
  );
}