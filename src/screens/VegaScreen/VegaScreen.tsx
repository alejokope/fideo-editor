'use client'

import { useState } from 'react';
import { cn } from '@/lib/cn';
import { PageShell } from '@/components/Library/PageShell';
import { useVegaStore, type VegaSpec } from '@/store/vegaStore';
import { Button } from '@/components/ui/Button';

// ─── Search Input ────────────────────────────────────────────────────────────
function SearchInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <svg className="h-4 w-4 text-content-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
      </div>
      <input type="text" placeholder="Buscar especificaciones Vega..." value={value} onChange={(e) => onChange(e.target.value)} className={cn('w-full rounded-xl border border-border bg-surface py-2.5 pl-10 pr-4', 'text-sm text-content placeholder:text-content-muted', 'transition-all duration-200', 'focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-1 focus:ring-offset-surface', 'hover:border-accent-muted')} />
    </div>
  )
}

// ─── Spec Card ───────────────────────────────────────────────────────────────
function SpecCard({ spec, selected, onClick }: { spec: VegaSpec; selected: boolean; onClick: () => void }) {
  const [imgLoaded, setImgLoaded] = useState(false)
  return (
    <button onClick={onClick} className={cn('group relative flex w-full flex-col overflow-hidden rounded-2xl border text-left transition-all duration-300', selected ? 'border-accent bg-accent/5 shadow-card-hover' : 'border-border/60 bg-surface hover:border-accent-muted hover:shadow-card-hover hover:-translate-y-0.5')}>
      <div className="relative aspect-[3/2] overflow-hidden bg-surface-muted">
        {!imgLoaded && <div className="absolute inset-0 shimmer" />}
        <img src={spec.preview} alt={spec.name} className={cn('h-full w-full object-cover', imgLoaded ? 'opacity-100' : 'opacity-0')} onLoad={() => setImgLoaded(true)} />
        <div className="absolute left-3 top-3"><span className="inline-flex items-center rounded-full bg-surface/80 px-2.5 py-1 text-[10px] font-semibold text-content-secondary backdrop-blur-sm">{spec.category}</span></div>
      </div>
      <div className="flex flex-col gap-1 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className={cn('text-sm font-medium leading-tight', selected ? 'text-accent' : 'text-content')}>{spec.name}</h3>
          {selected && <span className="mt-0.5 shrink-0 rounded-full bg-accent px-2 py-0.5 text-[10px] font-semibold text-accent-foreground">Activo</span>}
        </div>
        <p className="line-clamp-2 text-xs leading-relaxed text-content-secondary">{spec.description}</p>
        <span className="mt-1 text-[11px] text-content-muted">{new Date(spec.lastUpdated).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
      </div>
    </button>
  )
}

// ─── Detail Panel ────────────────────────────────────────────────────────────
function DetailPanel({ spec }: { spec: VegaSpec }) {
  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-border/60 bg-surface p-6 animate-fade-in">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="mb-1 flex items-center gap-2"><span className="rounded-md bg-surface-muted px-2 py-0.5 text-[11px] text-content-muted">{spec.category}</span></div>
          <h2 className="text-xl font-semibold text-content">{spec.name}</h2>
          <p className="mt-2 text-sm leading-relaxed text-content-secondary">{spec.description}</p>
        </div>
      </div>
      <div className="relative aspect-[3/2] overflow-hidden rounded-xl bg-surface-muted"><img src={spec.preview} alt={spec.name} className="h-full w-full object-cover" /></div>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-border/60 bg-surface-muted/50 p-3"><p className="text-[11px] text-content-muted">Última actualización</p><p className="mt-0.5 text-sm font-medium text-content">{new Date(spec.lastUpdated).toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })}</p></div>
        <div className="rounded-xl border border-border/60 bg-surface-muted/50 p-3"><p className="text-[11px] text-content-muted">Categoría</p><p className="mt-0.5 text-sm font-medium text-content">{spec.category}</p></div>
      </div>
      <div className="flex flex-wrap gap-3">
        <Button className="gap-1.5"><svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>Abrir en editor</Button>
        <Button variant="outline" className="gap-1.5"><svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden><path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>Duplicar</Button>
      </div>
    </div>
  )
}

// ─── Skeleton Card ───────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-surface">
      <div className="aspect-[3/2] shimmer" />
      <div className="flex flex-col gap-2 p-4"><div className="h-4 w-3/4 rounded-md shimmer" /><div className="h-3 w-full rounded-md shimmer" /><div className="h-3 w-2/3 rounded-md shimmer" /></div>
    </div>
  )
}

// ─── VegaScreen ──────────────────────────────────────────────────────────────
export function VegaScreen() {
  const { specs, loading, search, setSearch, selectedSpecId, setSelectedSpecId } = useVegaStore()
  const filtered = specs.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()) || s.description.toLowerCase().includes(search.toLowerCase()) || s.category.toLowerCase().includes(search.toLowerCase()))
  const selectedSpec = specs.find((s) => s.id === selectedSpecId) ?? null
  return (
    <PageShell title="Vega" description="Visualizaciones de datos interactivas con Vega. Explora especificaciones, personaliza gráficos y exporta para integrar en tus reportes." storageBadge={`${specs.length} specs`} actions={<Button size="sm" className="gap-1.5"><svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>Nueva spec</Button>}>
      <div className="mb-6 max-w-sm animate-slide-up" style={{ animationDelay: '20ms' }}><SearchInput value={search} onChange={setSearch} /></div>
      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="w-full lg:w-80 xl:w-96">
          <div className="mb-3 flex items-center justify-between"><span className="text-[11px] font-semibold tracking-wide text-content-muted uppercase">Especificaciones</span><span className="text-[11px] text-content-muted">{filtered.length} resultado{filtered.length !== 1 ? 's' : ''}</span></div>
          <div className="flex flex-col gap-3">
            {loading ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />) : filtered.length === 0 ? (<div className="flex flex-col items-start border-t border-border py-10"><p className="text-base font-medium text-content">Sin resultados</p><p className="mt-1 text-sm text-content-secondary">No hay specs que coincidan con tu búsqueda.</p></div>) : filtered.map((spec, i) => (<div key={spec.id} className="animate-slide-up" style={{ animationDelay: `${i * 40}ms` }}><SpecCard spec={spec} selected={spec.id === selectedSpecId} onClick={() => setSelectedSpecId(spec.id === selectedSpecId ? null : spec.id)} /></div>))}
          </div>
        </div>
        <div className="min-w-0 flex-1 lg:sticky lg:top-6 lg:self-start">
          {selectedSpec ? <DetailPanel spec={selectedSpec} /> : (<div className="flex flex-col items-start rounded-2xl border border-dashed border-border bg-surface-muted/20 py-16 text-center"><div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-surface-muted text-content-muted"><svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden><path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg></div><p className="text-base font-medium text-content">Selecciona una especificación</p><p className="mt-1.5 max-w-xs text-sm text-content-secondary">Haz clic en una spec del catálogo para ver su detalle y acciones disponibles.</p></div>)}
        </div>
      </div>
    </PageShell>
  )
}