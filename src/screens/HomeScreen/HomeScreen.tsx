'use client';
import { cn } from '@/lib/cn';
import { IntentLink } from './IntentLink';
import { getModulesByKind, type ModuleKind } from '@/app/modules';

const KIND_LABELS: Record<ModuleKind, string> = {
  primary: 'Principal',
  library: 'Biblioteca',
  admin: 'Administración',
};

const KIND_DESCRIPTIONS: Record<ModuleKind, string> = {
  primary: 'Herramientas principales de creación',
  library: 'Recursos y plantillas disponibles',
  admin: 'Gestión y configuración del sistema',
};
function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center py-12 md:py-16">
      {/* Background grid + gradient */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden
        style={{
          backgroundImage:
            'linear-gradient(rgb(var(--border) / 0.12) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--border) / 0.12) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse 80% 70% at 50% 0%, black 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 0%, black 40%, transparent 100%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 0%, rgb(var(--accent) / 0.06), transparent 70%)',
        }}
      />

      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center gap-6 px-4 text-center">
        {/* Badge */}
        <div
          className={cn(
            'animate-slide-up rounded-full border border-accent-muted bg-accent-muted/40 px-4 py-1.5',
            'text-sm font-medium text-accent'
          )}
          style={{ animationDelay: '0ms' }}
        >
          Plataforma de diseño generativo
        </div>

        {/* Title */}
        <h1
          className="animate-slide-up text-balance text-4xl font-bold tracking-tight text-content md:text-6xl"
          style={{ animationDelay: '80ms' }}
        >
          <span className="bg-gradient-to-r from-content via-content to-accent bg-clip-text text-transparent">
            Grilla
          </span>
        </h1>

        {/* Description */}
        <p
          className="animate-slide-up max-w-xl text-lg text-content-secondary md:text-xl"
          style={{ animationDelay: '160ms' }}
        >
          Diseña más rápido. Crea componentes, exporta y comparte — todo desde un solo lugar.
        </p>

        {/* CTAs */}
        <div
          className="animate-slide-up flex flex-wrap items-center justify-center gap-3"
          style={{ animationDelay: '240ms' }}
        >
          {/* Primary CTA — subtle glow */}
          <a
            href="/editor"
            className={cn(
              'relative inline-flex items-center gap-2 rounded-xl px-6 py-3',
              'bg-accent text-accent-foreground font-semibold text-base',
              'transition-all duration-300',
              'hover:brightness-110 hover:-translate-y-0.5 hover:shadow-[0_0_20px_-5px_rgb(var(--accent)/0.3)]',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface'
            )}
          >
            <span>Comenzar a diseñar</span>
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
              aria-hidden
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>

          {/* Secondary CTA — subtle */}
          <a
            href="/templates"
            className={cn(
              'inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-5 py-3',
              'text-sm font-medium text-content-secondary',
              'transition-all duration-200',
              'hover:border-accent-muted hover:bg-surface-muted hover:text-content',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface'
            )}
          >
            <span>Ver plantillas</span>
          </a>
        </div>
      </div>
    </section>
  );
}

interface ModuleSectionProps {
  kind: ModuleKind;
  animationDelay: number;
}

function ModuleSection({ kind, animationDelay }: ModuleSectionProps) {
  const sectionModules = getModulesByKind(kind);
  return (
    <section
      className="animate-slide-up"
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      {/* Section heading */}
      <div className="mb-5 flex flex-col gap-1">
        <h2 className="text-base font-semibold text-content">{KIND_LABELS[kind]}</h2>
        <p className="text-sm text-content-muted">{KIND_DESCRIPTIONS[kind]}</p>
      </div>

      {/* Card grid */}
      <div
        className={cn(
          'grid gap-4',
          kind === 'primary'
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
            : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
        )}
      >
        {sectionModules.map((module, index) => (
          <IntentLink
            key={module.id}
            module={module}
            featured={kind === 'primary' && index === 0}
            style={{
              animationDelay: `${animationDelay + 50 + index * 60}ms`,
            }}
          />
        ))}
      </div>
    </section>
  );
}

export function HomeScreen() {
  return (
    <main className="relative min-h-screen">
      {/* Full-page background accent */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        aria-hidden
        style={{
          background:
            'radial-gradient(ellipse 100% 80% at 50% 0%, rgb(var(--accent) / 0.06), transparent 60%)',
        }}
      />


      <div className="relative z-10 mx-auto max-w-6xl px-4 pb-20">
        <HeroSection />

        <div className="mt-10 flex flex-col gap-14">
          <ModuleSection kind="primary" animationDelay={200} />
          <ModuleSection kind="library" animationDelay={280} />
          <ModuleSection kind="admin" animationDelay={360} />
        </div>
      </div>
    </main>
  );
}