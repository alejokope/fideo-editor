'use client'

import { cn } from '@/lib/cn'
import { LibraryShell } from '@/components/Library/LibraryShell'
import { ComponentCatalog } from '@/components/Components/ComponentCatalog'
import { useComponentStore } from '@/store/componentStore'

export function ComponentsScreen() {
  const { components } = useComponentStore()
  const publishedCount = components.filter((c) => c.published).length
  const draftCount = components.filter((c) => !c.published).length

  return (
    <LibraryShell
      active="components"
      title="Componentes"
      description="Biblioteca de componentes visuales reutilizables. Explora, filtra y usa componentes publicados por tu equipo — listos para integrar en cualquier diseño."
      storageBadge={
        publishedCount > 0
          ? `${publishedCount} publicado${publishedCount !== 1 ? 's' : ''}`
          : undefined
      }
    >
      {/* Stats row */}
      <div className="mb-8 flex flex-wrap gap-4 animate-slide-up" style={{ animationDelay: '20ms' }}>
        <div className="inline-flex items-center gap-2 rounded-xl border border-border/40 bg-surface px-4 py-2">
          <span className="h-2 w-2 rounded-full bg-success" />
          <span className="text-xs text-content-secondary">
            <span className="font-semibold text-content">{publishedCount}</span> publicados
          </span>
        </div>
        {draftCount > 0 && (
          <div className="inline-flex items-center gap-2 rounded-xl border border-border/40 bg-surface px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-warning" />
            <span className="text-xs text-content-secondary">
              <span className="font-semibold text-content">{draftCount}</span> borradores
            </span>
          </div>
        )}
      </div>

      <ComponentCatalog />
    </LibraryShell>
  )
}