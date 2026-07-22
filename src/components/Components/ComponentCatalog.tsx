'use client'


import { useState } from 'react'
import { cn } from '@/lib/cn'
import { useComponentStore, type Component } from '@/store/componentStore'

// ─── Search Input ────────────────────────────────────────────────────────────
function SearchInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <svg className="h-4 w-4 text-content-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
      </div>
      <input
        type="text"
        placeholder="Buscar componentes..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          'w-full rounded-xl border border-border bg-surface py-2.5 pl-10 pr-4',
          'text-sm text-content placeholder:text-content-muted',
          'transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-1 focus:ring-offset-surface',
          'hover:border-accent-muted',
        )}
      />
    </div>
  )
}

// ─── Component Row ────────────────────────────────────────────────────────────
function ComponentRow({ component }: { component: Component }) {
  const [imgLoaded, setImgLoaded] = useState(false)

  return (
    <div className="group flex items-center gap-4 rounded-xl border border-border/60 bg-surface px-4 py-3 transition-all duration-200 hover:border-accent-muted hover:shadow-panel">
      {/* Preview thumbnail */}
      <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-lg bg-surface-muted">
        {!imgLoaded && <div className="absolute inset-0 shimmer" />}
        <img
          src={component.preview}
          alt={component.name}
          className={cn('h-full w-full object-cover', imgLoaded ? 'opacity-100' : 'opacity-0')}
          onLoad={() => setImgLoaded(true)}
        />
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-medium text-content">{component.name}</h3>
          {component.published ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-medium text-success">
              <span className="h-1 w-1 rounded-full bg-success" />
              Published
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 rounded-full bg-warning/10 px-2 py-0.5 text-[10px] font-medium text-warning">
              Draft
            </span>
          )}
        </div>
        <p className="mt-0.5 line-clamp-1 text-xs text-content-secondary">{component.description}</p>
      </div>

      {/* Category */}
      <div className="hidden shrink-0 sm:block">
        <span className="rounded-md bg-surface-muted px-2.5 py-1 text-[11px] text-content-muted">
          {component.category}
        </span>
      </div>

      {/* Last updated */}
      <div className="hidden shrink-0 md:block">
        <span className="text-[11px] text-content-muted">
          {new Date(component.lastUpdated).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })}
        </span>
      </div>

      {/* Actions */}
      <div className="flex shrink-0 gap-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <button
          className="rounded-lg border border-border bg-surface px-3 py-1.5 text-xs text-content-secondary transition-colors hover:border-accent hover:text-content"
          aria-label={`Ver ${component.name}`}
        >
          Ver
        </button>
        <button
          className="rounded-lg bg-accent px-3 py-1.5 text-xs font-medium text-accent-foreground transition-all hover:brightness-110"
          aria-label={`Usar ${component.name}`}
        >
          Usar
        </button>
      </div>
    </div>
  )
}

// ─── Skeleton Row ─────────────────────────────────────────────────────────────
function SkeletonRow() {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-border/60 bg-surface px-4 py-3">
      <div className="h-14 w-20 shrink-0 rounded-lg shimmer" />
      <div className="flex-1 space-y-1.5">
        <div className="h-3.5 w-40 rounded-md shimmer" />
        <div className="h-3 w-64 rounded-md shimmer" />
      </div>
      <div className="h-6 w-20 rounded-md shimmer" />
      <div className="h-6 w-16 rounded-md shimmer" />
    </div>
  )
}

// ─── ComponentCatalog ────────────────────────────────────────────────────────
export function ComponentCatalog() {
  const { components, loading, search, setSearch } = useComponentStore()


  const filtered = components.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className="flex flex-col gap-4">
      {/* Search */}
      <div className="max-w-sm">
        <SearchInput value={search} onChange={setSearch} />
      </div>

      {/* Table header — only visible on larger screens */}
      <div className="hidden grid-cols-[20rem_1fr_8rem_6rem_auto] items-center gap-4 px-4 text-[11px] font-semibold tracking-wide text-content-muted uppercase md:grid">
        <span>Componente</span>
        <span>Descripción</span>
        <span>Categoría</span>
        <span>Actualizado</span>
        <span className="text-right">Acciones</span>
      </div>


      {/* Rows */}
      <div className="flex flex-col gap-2">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <SkeletonRow key={i} />)
          : filtered.length === 0
          ? (
            <div className="flex flex-col items-start border-t border-border py-12 text-center">
              <p className="text-base font-medium text-content">No hay componentes</p>
              <p className="mt-1.5 text-sm text-content-secondary">
                Los componentes publicados aparecerán aquí.
              </p>
            </div>
          )
          : filtered.map((component, i) => (
            <div key={component.id} className="animate-slide-up" style={{ animationDelay: `${i * 40}ms` }}>
              <ComponentRow component={component} />
            </div>
          ))}
      </div>
    </div>
  )
}