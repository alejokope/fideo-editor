import type { ReactNode } from 'react';
import { AppLink } from '@/app/navigation';
import { PageShell } from '@/components/Library/PageShell';
import { cn } from '@/lib/cn';
import type { AppRouteId } from '@shared/appRoutes';

export { PageEmpty as LibraryEmpty, PageSectionHead as LibrarySectionHead } from '@/components/Library/PageShell';

type LibraryTab = 'designs' | 'templates' | 'components' | 'partners';


// Tab icons as inline SVGs
function DesignsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="1" y="1" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="9" y="1" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="1" y="9" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="9" y="9" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function TemplatesIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="1" y="2" width="14" height="3" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="1" y="7" width="14" height="3" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="1" y="12" width="14" height="3" rx="1" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function ComponentsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M8 1L14 5V11L8 15L2 11V5L8 1Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M8 5L14 9M8 5L2 9M8 5V11" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function PartnersIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="5" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="11" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M1 13C1 10.7909 2.79086 9 5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M15 13C15 10.7909 13.2091 9 11 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M5 9C5 9 6.5 7 8 7C9.5 7 11 9 11 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

const TABS: { id: LibraryTab; route: AppRouteId; label: string; Icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'designs', route: 'designs', label: 'Diseños', Icon: DesignsIcon },
  { id: 'templates', route: 'templates', label: 'Templates', Icon: TemplatesIcon },
  { id: 'components', route: 'components', label: 'Componentes', Icon: ComponentsIcon },
  { id: 'partners', route: 'partners', label: 'Partners', Icon: PartnersIcon },
];

interface LibraryShellProps {
  active: LibraryTab;
  title: string;
  description: string;
  storageBadge?: string;
  actions?: ReactNode;
  children: ReactNode;
}

/**
 * Chrome compartido Diseños / Templates / Componentes / Partners (= PageShell + tabs).
 */
export function LibraryShell({
  active,
  title,
  description,
  storageBadge,
  actions,
  children,
}: LibraryShellProps) {
  return (
    <PageShell
      title={title}
      description={description}
      storageBadge={storageBadge}
      actions={actions}
      belowHero={
        <nav
          aria-label="Biblioteca"
          className="mb-10 animate-slide-up"
          style={{ animationDelay: '40ms' }}
        >
          {/* Tab group with subtle container */}
          <div className="inline-flex items-center gap-1 rounded-xl bg-surface-muted/40 p-1 border border-border/40">
            {TABS.map((tab) => {
              const isActive = tab.id === active;
              const { Icon } = tab;
              return (
                <AppLink
                  key={tab.id}
                  to={tab.route}
                  className={cn(
                    'relative flex items-center gap-2 rounded-lg px-5 py-2.5 transition-all duration-200',
                    isActive
                      ? 'bg-accent text-accent-foreground shadow-sm'
                      : 'text-content-secondary hover:bg-surface-elevated hover:text-content'
                  )}
                >
                  <Icon className={cn(
                    'transition-colors',
                    isActive ? 'text-accent-foreground' : 'text-content-muted'
                  )} />
                  <span className="text-sm font-medium">{tab.label}</span>
                </AppLink>
              );
            })}
          </div>
        </nav>
      }
    >
      {children}
    </PageShell>
  );
}