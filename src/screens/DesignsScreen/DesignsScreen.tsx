'use client'

import { useState } from 'react'
import { cn } from '@/lib/cn'
import { LibraryShell } from '@/components/Library/LibraryShell'
import { useDesignStore, type Design } from '@/store/designStore'
import { Button } from '@/components/ui/Button'

function formatRelativeDate(dateStr: string): string {
  const date = new Date(dateStr)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  if (diffDays === 0) return 'Hoy'
  if (diffDays === 1) return 'Ayer'
  if (diffDays < 7) return `Hace ${diffDays} días`
  if (diffDays < 30) return `Hace ${Math.floor(diffDays / 7)} sem`
  return `Hace ${Math.floor(diffDays / 30)} mes${diffDays >= 60 ? 'es' : ''}`
}


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
        placeholder="Buscar diseños..."
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

// ─── Design Card ─────────────────────────────────────────────────────────────
function DesignCard({ design, onDelete }: { design: Design; onDelete: (id: string) => void }) {
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
      {/* Thumbnail area */}
      <div className="relative aspect-[16/10] overflow-hidden bg-surface-muted">
        {/* Shimmer skeleton while loading */}
        {!imgLoaded && <div className="absolute inset-0 shimmer" />}
        <img
          src={design.thumbnail}
          alt={design.name}
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
            'absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent',
            'transition-opacity duration-300',
            hovered ? 'opacity-100' : 'opacity-0',
          )}
        />
        {/* "En uso" badge */}
        {design.inUse && (
          <div className="absolute left-3 top-3">
            <span className="inline-flex items-center gap-1 rounded-full bg-success/90 px-2.5 py-1 text-[10px] font-semibold text-success-foreground backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-success-foreground animate-pulse" />
              En uso
            </span>
          </div>
        )}
        {/* Delete button — subtle, appears on hover */}
        <button
          onClick={() => onDelete(design.id)}
          className={cn(
            'absolute right-2 top-2 rounded-lg p-1.5',
            'bg-black/40 text-white/70 backdrop-blur-sm',
            'transition-all duration-200',
            'opacity-0 group-hover:opacity-100',
            'hover:bg-danger hover:text-danger-foreground hover:opacity-100',
            'focus:outline-none focus:ring-2 focus:ring-danger',
          )}
          aria-label={`Eliminar ${design.name}`}
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>

      {/* Card info */}
      <div className="flex flex-1 flex-col gap-1.5 p-3.5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-medium leading-tight text-content line-clamp-1">{design.name}</h3>
          <span className="shrink-0 text-[11px] text-content-muted">{formatRelativeDate(design.createdAt)}</span>
        </div>
        {design.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {design.tags.map((tag) => (
              <span key={tag} className="rounded-md bg-surface-muted px-2 py-0.5 text-[10px] text-content-muted">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ─── New Design Card (dashed) ─────────────────────────────────────────────────
function NewDesignCard() {
  return (
    <button
      className={cn(
        'group relative flex aspect-[16/10] w-full flex-col items-center justify-center gap-3',
        'rounded-2xl border-2 border-dashed border-border bg-surface-muted/30',
        'transition-all duration-300',
        'hover:border-accent hover:bg-surface-muted/60 hover:-translate-y-0.5',
        'focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-surface',
      )}
      aria-label="Crear nuevo diseño"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent transition-all duration-300 group-hover:bg-accent group-hover:text-accent-foreground group-hover:scale-110">
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      </div>
      <div className="text-center">
        <p className="text-sm font-medium text-content-secondary transition-colors group-hover:text-content">
          Nuevo diseño
        </p>
        <p className="mt-0.5 text-[11px] text-content-muted">Empieza desde cero</p>
      </div>
    </button>
  )
}

// ─── Skeleton Card ────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-surface">
      <div className="aspect-[16/10] shimmer" />
      <div className="flex flex-col gap-2 p-3.5">
        <div className="h-4 w-3/4 rounded-md shimmer" />
        <div className="flex gap-1.5">
          <div className="h-5 w-16 rounded-md shimmer" />
          <div className="h-5 w-14 rounded-md shimmer" />
        </div>
      </div>
    </div>
  )
}

// ─── Designs Grid ─────────────────────────────────────────────────────────────
function DesignsGrid({ designs, loading, onDelete }: { designs: Design[]; loading: boolean; onDelete: (id: string) => void }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    )
  }

  if (designs.length === 0) {
    return (
      <div className="flex flex-col items-start border-t border-border py-14 text-center">
        <p className="text-lg font-medium tracking-tight text-content">No hay diseños</p>
        <p className="mt-2 max-w-md text-sm text-content-secondary">
          Crea tu primer diseño para empezar a construir tu biblioteca.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <NewDesignCard />
      {designs.map((design, i) => (
        <div key={design.id} className="animate-slide-up" style={{ animationDelay: `${i * 50}ms` }}>
          <DesignCard design={design} onDelete={onDelete} />
        </div>
      ))}
    </div>
  )
}

// ─── DesignsScreen ───────────────────────────────────────────────────────────
export function DesignsScreen() {
  const { designs, loading, search, setSearch, deleteDesign } = useDesignStore()

  const filtered = designs.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.tags.some((t) => t.toLowerCase().includes(search.toLowerCase())),
  )

  const inUseCount = designs.filter((d) => d.inUse).length

  return (
    <LibraryShell
      active="designs"
      title="Diseños"
      description="Gestiona todos tus diseños. Cada borrador guarda el estado actual para que puedas retomarlo cuando quieras."
      storageBadge={inUseCount > 0 ? `${inUseCount} en uso` : undefined}
      actions={
        <Button size="sm" className="gap-1.5">
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Nuevo diseño
        </Button>
      }
    >
      <div className="mb-6 animate-slide-up" style={{ animationDelay: '20ms' }}>
        <div className="max-w-sm">
          <SearchInput value={search} onChange={setSearch} />
        </div>
      </div>

      <DesignsGrid designs={filtered} loading={loading} onDelete={deleteDesign} />
    </LibraryShell>
  )
}