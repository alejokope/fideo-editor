import type { ReactNode } from 'react';
import { AppLink } from '@/app/navigation';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';

// Simple grid icon SVG for the Grilla brand
function GrillaIcon({ className }: { className?: string }) {
  return (
    <svg
      className={cn('text-accent', className)}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="1" y="1" width="7" height="7" rx="1.5" fill="currentColor" opacity="0.9" />
      <rect x="10" y="1" width="7" height="7" rx="1.5" fill="currentColor" opacity="0.6" />
      <rect x="1" y="10" width="7" height="7" rx="1.5" fill="currentColor" opacity="0.6" />
      <rect x="10" y="10" width="7" height="7" rx="1.5" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

interface PageShellProps {
  title: string;
  description: string;
  storageBadge?: string;
  actions?: ReactNode;
  /** Ancho del contenido. Default 5xl. */
  maxWidth?: '3xl' | '5xl';
  /** Contenido entre el hero y el main (ej. tabs de biblioteca). */
  belowHero?: ReactNode;
  children: ReactNode;
}

/**
 * Chrome de páginas internas (misma atmósfera que la home):
 * grilla + degradé, header Grilla, hero con título/CTA, área de contenido.
 */
export function PageShell({
  title,
  description,
  storageBadge,
  actions,
  maxWidth = '5xl',
  belowHero,
  children,
}: PageShellProps) {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const widthClass = maxWidth === '3xl' ? 'max-w-3xl' : 'max-w-5xl';

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-surface font-sans text-content">
      {/* Subtle grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35] dark:opacity-20"
        aria-hidden
        style={{
          backgroundImage: `
            linear-gradient(to right, rgb(var(--border) / 0.4) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(var(--border) / 0.4) 1px, transparent 1px)
          `,
          backgroundSize: '56px 56px',
          maskImage: 'linear-gradient(to bottom, black 0%, black 30%, transparent 72%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 30%, transparent 72%)',
        }}
      />
      {/* Refined top gradient */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[18rem] bg-gradient-to-b from-accent-muted/40 via-surface/20 to-transparent dark:from-accent-muted/15"
        aria-hidden
      />

      {/* Glassmorphism header */}
      <header className="relative z-10 glass border-b border-border/50">
        <div className="mx-auto flex items-center justify-between px-6 py-3 sm:px-10 lg:px-12">
          {/* Left: Logo + Breadcrumb */}
          <div className="flex items-center gap-3">
            <AppLink
              to="home"
              className="flex items-center gap-2 text-[13px] font-semibold tracking-[0.14em] text-content uppercase transition-all hover:opacity-70"
            >
              <GrillaIcon className="h-5 w-5" />
              <span className="hidden sm:inline">Grilla</span>
            </AppLink>
            <span className="text-content-muted/40 text-sm" aria-hidden>/</span>
            <span className="text-sm font-medium text-content-secondary">{title}</span>
          </div>

          {/* Right: User + Logout + Theme */}
          <div className="flex items-center gap-4">
            {user && (
              <div className="hidden items-center gap-2 sm:flex">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-accent text-accent-foreground text-xs font-semibold">
                  {user.username.charAt(0).toUpperCase()}
                </div>
                <span className="text-xs text-content-secondary">{user.username}</span>
              </div>
            )}
            <Button variant="ghost" size="sm" onClick={logout} className="text-xs">
              Salir
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main content area */}
      <div
        className={cn(
          'relative z-10 mx-auto flex w-full flex-1 flex-col px-6 pb-20 sm:px-10 lg:px-12',
          widthClass
        )}
      >
        {/* Hero section */}
        <section className="mb-8 animate-slide-up sm:mb-10">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="min-w-0 max-w-xl">
              {storageBadge && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-muted px-2.5 py-1 text-[11px] font-semibold tracking-wide text-accent">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
                  {storageBadge}
                </span>
              )}
              <h1 className={cn(
                'mt-3 font-semibold leading-tight tracking-tight text-content',
                storageBadge ? 'text-[1.75rem] sm:text-[2rem]' : 'text-[2rem] sm:text-[2.25rem]'
              )}>
                {title}
              </h1>
              <p className="mt-3 text-[15px] leading-relaxed text-content-secondary">
                {description}
              </p>
            </div>
            {actions && (
              <div className="flex shrink-0 flex-wrap items-center gap-2 animate-fade-in">
                {actions}
              </div>
            )}
          </div>
        </section>

        {belowHero}

        <main className="flex min-h-0 flex-1 flex-col animate-slide-up" style={{ animationDelay: '80ms' }}>
          {children}
        </main>
      </div>
    </div>
  );
}

interface PageEmptyProps {
  title: string;
  body: string;
  children?: ReactNode;
}

/** Estado vacío alineado con la home. */
export function PageEmpty({ title, body, children }: PageEmptyProps) {
  return (
    <div className="flex flex-col items-start border-t border-border py-14 sm:py-16">
      <p className="text-lg font-medium tracking-tight text-content">{title}</p>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-content-secondary">{body}</p>
      {children && <div className="mt-6 flex flex-wrap gap-3">{children}</div>}
    </div>
  );
}

interface PageSectionHeadProps {
  label: string;
  hint?: string;
}

export function PageSectionHead({ label, hint }: PageSectionHeadProps) {
  return (
    <div className="mb-4 flex items-baseline justify-between gap-3">
      <h2 className="text-[11px] font-semibold tracking-[0.16em] text-content-muted uppercase">
        {label}
      </h2>
      {hint && <p className="text-[11px] text-content-muted">{hint}</p>}
    </div>
  );
}

/** @deprecated alias — preferí PageEmpty */
export const LibraryEmpty = PageEmpty;
/** @deprecated alias — preferí PageSectionHead */
export const LibrarySectionHead = PageSectionHead;