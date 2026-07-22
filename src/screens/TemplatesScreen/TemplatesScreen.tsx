'use client'

import { useState } from 'react'
import { cn } from '@/lib/cn'
import { LibraryShell } from '@/components/Library/LibraryShell'
import { useTemplateStore, type Template } from '@/store/templateStore'
import { Button } from '@/components/ui/Button'

// ─── Search Input ────────────────────────────────────────────────────────────
function SearchInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <svg
          className="h-4 w-4 text-content-muted"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
      </div>
      <input
        type="text"
        placeholder="Buscar plantillas..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          'w-full rounded-xl border border-border bg-surface py-3 pl-10 pr-4',
          'text-sm text-content placeholder:text-content-muted placeholder:text-xs',
          'transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-1 focus:ring-offset-surface',
          'hover:border-accent-muted',
        )}
      />
    </div>
  )
}

// ─── Template Card ────────────────────────────────────────────────────────────
function TemplateCard({ template }: { template: Template }) {
  const [hovered, setHovered] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)

  return (
    <div
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-surface',
        'transition-all duration-300',
        'hover:border-accent-muted hover:shadow-card-hover hover:-translate-y-0.5',
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Preview area */}
      <div className="relative aspect-[3/2] overflow-hidden bg-surface-muted">
        {!imgLoaded && <div className="absolute inset-0 shimmer" />}
        <img
          src={template.preview}
          alt={template.name}
          className={cn(
            'h-full w-full object-cover transition-all duration-500',
            hovered ? 'scale-105' : 'scale-100',
            imgLoaded ? 'opacity-100' : 'opacity-0',
          )}
          onLoad={() => setImgLoaded(true)}
        />
        {/* Gradient overlay on hover */}
        <div
          className={cn(
            'absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent',
            'transition-opacity duration-300',
            hovered ? 'opacity-100' : 'opacity-0',
          )}
        />
        {/* Category badge */}
        <div className="absolute left-3 top-3">
          <span className="inline-flex items-center rounded-full bg-surface/60 px-2.5 py-1 text-[10px] font-semibold text-content-secondary backdrop-blur-sm">
            {template.category}
          </span>
        </div>
      </div>

      {/* Card info */}
      <div className="flex flex-1 flex-col gap-2 p-5">
        <div>
          <h3 className="text-sm font-medium leading-tight text-content">{template.name}</h3>
          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-content-muted">
            {template.description}
          </p>
        </div>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-[11px] text-content-muted/80">
            {template.usageCount.toLocaleString('es-ES')} usos
          </span>
          <Button size="sm" variant="outline" className="gap-1.5 text-xs">
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Usar template
          </Button>
        </div>
      </div>
    </div>
  )
}

// ─── Skeleton Card ────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-surface">
      <div className="aspect-[3/2] shimmer" />
      <div className="flex flex-col gap-2.5 p-5">
        <div className="h-4 w-2/3 rounded-md shimmer" />
        <div className="space-y-1.5">
          <div className="h-3 w-full rounded-md shimmer" />
          <div className="h-3 w-4/5 rounded-md shimmer" />
        </div>
        <div className="mt-2 flex items-center justify-between pt-1">
          <div className="h-3 w-16 rounded-md shimmer" />
          <div className="h-7 w-24 rounded-lg shimmer" />
        </div>
      </div>
    </div>
  )
}

// ─── Templates Grid ───────────────────────────────────────────────────────────
function TemplatesGrid({ templates, loading }: { templates: Template[]; loading: boolean }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    )
  }

  if (templates.length === 0) {
    return (
      <div className="flex flex-col items-start border-t border-border py-16 text-center">
        <p className="text-lg font-medium tracking-tight text-content">No hay plantillas</p>
        <p className="mt-2 max-w-md text-sm text-content-secondary">
          Explora la biblioteca de plantillas para acelerar tu flujo de trabajo.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {templates.map((template, i) => (
        <div key={template.id} className="animate-slide-up" style={{ animationDelay: `${i * 30}ms` }}>
          <TemplateCard template={template} />
        </div>
      ))}
    </div>
  )
}

// ─── TemplatesScreen ─────────────────────────────────────────────────────────
export function TemplatesScreen() {
  const { templates, loading, search, setSearch } = useTemplateStore()

  const filtered = templates.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase()) ||
      t.category.toLowerCase().includes(search.toLowerCase()),
  )

  const totalUsages = templates.reduce((sum, t) => sum + t.usageCount, 0)

  return (
    <LibraryShell
      active="templates"
      title="Plantillas"
      description="Plantillas profesionales listas para usar. Acelera tu flujo de trabajo comenzando desde una base probada."
      storageBadge={totalUsages > 0 ? `${totalUsages.toLocaleString('es-ES')} usos totales` : undefined}
    >
      <div className="mb-6 animate-slide-up" style={{ animationDelay: '20ms' }}>
        <div className="max-w-sm">
          <SearchInput value={search} onChange={setSearch} />
        </div>
      </div>

      <TemplatesGrid templates={filtered} loading={loading} />
    </LibraryShell>
  )
}