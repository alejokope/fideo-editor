import Link from 'next/link';
import { cn } from '@/lib/cn';
import type { Module } from '@/app/modules';

interface IntentLinkProps {
  module: Module;
  featured?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function IntentLink({ module, featured = false, className, style }: IntentLinkProps) {
  return (
    <Link
      href={module.route}
      className={cn(
        'group relative flex flex-col gap-3 rounded-xl border border-border bg-surface p-5',
        'transition-all duration-300 ease-out',
        'hover:border-accent hover:shadow-card-hover hover:-translate-y-0.5',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
        featured && 'md:col-span-2 md:p-6',
        className
      )}
      style={style}
    >
      {/* Icon */}
      <div
        className={cn(
          'flex h-10 w-10 items-center justify-center rounded-lg text-2xl',
          'bg-accent-muted text-accent',
          featured && 'h-12 w-12 text-3xl md:h-14 md:w-14'
        )}
      >
        {module.icon}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-1.5">
        <h3
          className={cn(
            'font-semibold text-content text-balance leading-tight',
            featured ? 'text-xl md:text-2xl' : 'text-base md:text-lg'
          )}
        >
          {module.title}
        </h3>
        <p
          className={cn(
            'text-content-secondary text-sm leading-relaxed',
            featured && 'text-base'
          )}
        >
          {module.description}
        </p>
      </div>

      {/* Action label + arrow */}
      <div className="mt-auto flex items-center gap-1.5 text-sm font-medium text-accent">
        <span>{module.actionLabel}</span>
        <svg
          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </div>

      {/* Subtle accent glow on hover */}
      <div
        className={cn(
          'pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300',
          'bg-[radial-gradient(ellipse_at_top_right,rgb(var(--accent)/0.08),transparent_70%)]',
          'group-hover:opacity-100'
        )}
        aria-hidden
      />
    </Link>
  );
}