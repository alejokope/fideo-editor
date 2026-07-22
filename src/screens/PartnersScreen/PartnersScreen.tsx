'use client';

import { useState, useMemo, useCallback } from 'react';
import { PageShell } from '@/components/Library/PageShell';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { cn } from '@/lib/cn';

// ============================================================================
// Types
// ============================================================================

type PartnerStatus = 'active' | 'inactive' | 'pending';
type PartnerTier = 'bronze' | 'silver' | 'gold' | 'platinum';

interface Partner {
  id: string;
  name: string;
  email: string;
  company: string;
  status: PartnerStatus;
  tier: PartnerTier;
  revenue: number;
  users: number;
  joinedAt: string;
  lastActivity: string;
}

interface SortConfig {
  key: keyof Partner;
  direction: 'asc' | 'desc';
}

// ============================================================================
// Mock Data
// ============================================================================

const MOCK_PARTNERS: Partner[] = [
  { id: '1', name: 'TechCorp Solutions', email: 'contact@techcorp.io', company: 'TechCorp', status: 'active', tier: 'platinum', revenue: 125000, users: 250, joinedAt: '2023-06-15', lastActivity: '2024-07-20' },
  { id: '2', name: 'DesignStudio Pro', email: 'hello@designstudio.co', company: 'DesignStudio', status: 'active', tier: 'gold', revenue: 85000, users: 120, joinedAt: '2023-09-22', lastActivity: '2024-07-19' },
  { id: '3', name: 'Creative Agency', email: 'partners@creativeagency.com', company: 'CreativeAgency', status: 'active', tier: 'silver', revenue: 42000, users: 45, joinedAt: '2024-01-10', lastActivity: '2024-07-18' },
  { id: '4', name: 'MediaFlow Inc', email: 'team@mediaflow.net', company: 'MediaFlow', status: 'pending', tier: 'bronze', revenue: 0, users: 0, joinedAt: '2024-07-01', lastActivity: '2024-07-15' },
  { id: '5', name: 'CloudBase Systems', email: 'sales@cloudbase.tech', company: 'CloudBase', status: 'active', tier: 'platinum', revenue: 156000, users: 380, joinedAt: '2023-03-08', lastActivity: '2024-07-21' },
  { id: '6', name: 'PixelPerfect Studio', email: 'info@pixelperfect.studio', company: 'PixelPerfect', status: 'inactive', tier: 'gold', revenue: 32000, users: 25, joinedAt: '2023-11-15', lastActivity: '2024-05-10' },
  { id: '7', name: 'InnovateTech Labs', email: 'collab@innovatetech.io', company: 'InnovateTech', status: 'active', tier: 'silver', revenue: 55000, users: 65, joinedAt: '2024-02-28', lastActivity: '2024-07-17' },
  { id: '8', name: 'BrandForge Agency', email: 'partners@brandforge.co', company: 'BrandForge', status: 'active', tier: 'bronze', revenue: 18000, users: 15, joinedAt: '2024-04-12', lastActivity: '2024-07-16' },
  { id: '9', name: 'NextGen Software', email: 'hello@nextgensoftware.com', company: 'NextGen', status: 'pending', tier: 'silver', revenue: 0, users: 0, joinedAt: '2024-07-10', lastActivity: '2024-07-12' },
  { id: '10', name: 'WebCraft Studios', email: 'team@webcraft.dev', company: 'WebCraft', status: 'active', tier: 'gold', revenue: 72000, users: 90, joinedAt: '2023-08-20', lastActivity: '2024-07-20' },
];

// ============================================================================
// Utility Components
// ============================================================================

function TableSkeleton() {
  return (
    <div className="space-y-3">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex items-center gap-4 rounded-xl border border-border bg-surface p-5">
          <div className="h-4 w-32 rounded shimmer" />
          <div className="h-4 w-24 rounded shimmer" />
          <div className="h-4 w-20 rounded shimmer" />
          <div className="h-4 w-16 rounded shimmer" />
          <div className="h-4 w-24 rounded shimmer" />
        </div>
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-surface-muted/30 py-20">
      <svg className="h-14 w-14 text-content-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
      <p className="mt-4 text-base font-medium text-content">No se encontraron partners</p>
      <p className="mt-1 text-sm text-content-muted">Ajusta los filtros para ver más resultados</p>
    </div>
  );
}

function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-danger/30 bg-danger/5 py-20">
      <svg className="h-14 w-14 text-danger" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      <p className="mt-4 text-base font-medium text-danger">Error al cargar partners</p>
      <p className="mt-1 text-sm text-content-muted">No pudimos obtener la lista de partners</p>
      <Button variant="outline" size="sm" onClick={onRetry} className="mt-4">Reintentar</Button>
    </div>
  );
}

// ============================================================================
// Status Badge Component
// ============================================================================

function StatusBadge({ status }: { status: PartnerStatus }) {
  const styles: Record<PartnerStatus, string> = {
    active: 'bg-success-muted/70 text-success',
    inactive: 'bg-surface-muted/70 text-content-muted',
    pending: 'bg-warning-muted/70 text-warning',
  };
  const labels: Record<PartnerStatus, string> = {
    active: 'Activo',
    inactive: 'Inactivo',
    pending: 'Pendiente',
  };
  return (
    <span className={cn('inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium', styles[status])}>
      <span className={cn('h-1.5 w-1.5 rounded-full', status === 'active' ? 'bg-success' : status === 'pending' ? 'bg-warning' : 'bg-content-muted')} />
      {labels[status]}
    </span>
  );
}

// ============================================================================
// Tier Badge Component
// ============================================================================
function TierBadge({ tier }: { tier: PartnerTier }) {
  const styles: Record<PartnerTier, string> = {
    platinum: 'bg-zinc-200/70 text-zinc-800 dark:bg-zinc-700/70 dark:text-zinc-200',
    gold: 'bg-warning-muted/70 text-warning dark:text-warning-foreground',
    silver: 'bg-surface-muted/70 text-content-secondary',
    bronze: 'bg-amber-100/70 text-amber-800 dark:bg-amber-900/70 dark:text-amber-200',
  };
  return (
    <span className={cn('inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide', styles[tier])}>
      {tier}
    </span>
  );
}

// ============================================================================
// Sortable Header Component
// ============================================================================

interface SortableHeaderProps {
  label: string;
  sortKey: keyof Partner;
  sortConfig: SortConfig;
  onSort: (key: keyof Partner) => void;
  className?: string;
}

function SortableHeader({ label, sortKey, sortConfig, onSort, className }: SortableHeaderProps) {
  const isActive = sortConfig.key === sortKey;
  return (
    <button
      onClick={() => onSort(sortKey)}
      className={cn(
        'flex items-center gap-1.5 text-left text-xs font-semibold tracking-wide text-content-muted uppercase transition-colors hover:text-content',
        className
      )}
    >
      {label}
      <span className={cn('transition-transform', isActive && sortConfig.direction === 'desc' && 'rotate-180')}>
        <svg className={cn('h-3 w-3', isActive ? 'text-accent' : 'opacity-50')} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
        </svg>
      </span>
    </button>
  );
}

// ============================================================================
// Pagination Component
// ============================================================================

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}
function Pagination({ currentPage, totalPages, totalItems, itemsPerPage, onPageChange }: PaginationProps) {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);
  const getVisiblePages = () => {
    const pages: (number | '...')[] = [];
    if (totalPages <= 7) { for (let i = 1; i <= totalPages; i++) pages.push(i); }
    else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
      <p className="text-sm text-content-muted">
        Mostrando <span className="font-medium text-content">{startItem}-{endItem}</span> de <span className="font-medium text-content">{totalItems}</span> partners
      </p>
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="sm" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="h-8 w-8 p-0">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
        </Button>
        {getVisiblePages().map((page, index) =>
          page === '...' ? (<span key={`ellipsis-${index}`} className="px-2 text-content-muted">...</span>) : (
            <Button key={page} variant={currentPage === page ? 'default' : 'ghost'} size="sm" onClick={() => onPageChange(page)} className={cn('h-8 w-8 p-0 text-xs', currentPage === page && 'shadow-glow')}>{page}</Button>
          )
        )}
        <Button variant="ghost" size="sm" onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className="h-8 w-8 p-0">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
        </Button>
      </div>
    </div>
  );
}

// ============================================================================
// Main PartnersScreen Component
// ============================================================================

const ITEMS_PER_PAGE = 5;

export function PartnersScreen() {
  const [partners] = useState<Partner[]>(MOCK_PARTNERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<PartnerStatus | 'all'>('all');
  const [tierFilter, setTierFilter] = useState<PartnerTier | 'all'>('all');
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'name', direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);


  const filteredPartners = useMemo(() => {
    let result = partners.filter((partner) => {
      const matchesSearch = partner.name.toLowerCase().includes(searchQuery.toLowerCase()) || partner.email.toLowerCase().includes(searchQuery.toLowerCase()) || partner.company.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || partner.status === statusFilter;
      const matchesTier = tierFilter === 'all' || partner.tier === tierFilter;
      return matchesSearch && matchesStatus && matchesTier;
    });
    result.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      const modifier = sortConfig.direction === 'asc' ? 1 : -1;
      if (typeof aValue === 'string' && typeof bValue === 'string') return aValue.localeCompare(bValue) * modifier;
      if (typeof aValue === 'number' && typeof bValue === 'number') return (aValue - bValue) * modifier;
      return 0;
    });
    return result;
  }, [partners, searchQuery, statusFilter, tierFilter, sortConfig]);

  const paginatedPartners = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredPartners.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredPartners, currentPage]);

  const totalPages = Math.ceil(filteredPartners.length / ITEMS_PER_PAGE);

  const handleSort = useCallback((key: keyof Partner) => {
    setSortConfig((prev) => ({ key, direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc' }));
  }, []);

  const handleRetry = useCallback(() => {
    setHasError(false);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const formatCurrency = (value: number) => new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(value);
  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });

  return (
    <PageShell
      title="Partners"
      description="Gestiona partners, integraciones y conexiones externas."
      actions={<Button><svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>Nuevo partner</Button>}
    >
      {/* Filters */}
      <div className="mb-8 flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-[200px]">
          <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-content-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <Input placeholder="Buscar partners..." value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }} className="pl-10" />
        </div>
        <Select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value as PartnerStatus | 'all'); setCurrentPage(1); }} className="w-36">
          <option value="all">Todos estados</option>
          <option value="active">Activo</option>
          <option value="inactive">Inactivo</option>
          <option value="pending">Pendiente</option>
        </Select>
        <Select value={tierFilter} onChange={(e) => { setTierFilter(e.target.value as PartnerTier | 'all'); setCurrentPage(1); }} className="w-36">
          <option value="all">Todos los tiers</option>
          <option value="platinum">Platinum</option>
          <option value="gold">Gold</option>
          <option value="silver">Silver</option>
          <option value="bronze">Bronze</option>
        </Select>
      </div>

      {isLoading && <TableSkeleton />}
      {hasError && !isLoading && <ErrorState onRetry={handleRetry} />}
      {!isLoading && !hasError && filteredPartners.length === 0 && <EmptyState />}

      {!isLoading && !hasError && filteredPartners.length > 0 && (
        <>
          <div className="overflow-x-auto rounded-xl border border-border bg-surface">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b border-border bg-surface-muted/30">
                  <th className="p-5"><SortableHeader label="Partner" sortKey="name" sortConfig={sortConfig} onSort={handleSort} /></th>
                  <th className="p-5"><SortableHeader label="Estado" sortKey="status" sortConfig={sortConfig} onSort={handleSort} /></th>
                  <th className="p-5"><SortableHeader label="Tier" sortKey="tier" sortConfig={sortConfig} onSort={handleSort} /></th>
                  <th className="p-5 text-right"><SortableHeader label="Ingresos" sortKey="revenue" sortConfig={sortConfig} onSort={handleSort} className="justify-end" /></th>
                  <th className="p-5 text-right"><SortableHeader label="Usuarios" sortKey="users" sortConfig={sortConfig} onSort={handleSort} className="justify-end" /></th>
                  <th className="p-5"><SortableHeader label="Última actividad" sortKey="lastActivity" sortConfig={sortConfig} onSort={handleSort} /></th>
                  <th className="p-5 text-right"><span className="text-xs font-semibold tracking-wide text-content-muted uppercase">Acciones</span></th>
                </tr>
              </thead>
              <tbody>
                {paginatedPartners.map((partner, index) => (
                  <tr key={partner.id} className={cn('border-b border-border transition-colors hover:bg-surface-muted/20', index === paginatedPartners.length - 1 && 'border-b-0')}>
                    <td className="p-5"><div><p className="font-medium text-content">{partner.name}</p><p className="text-sm text-content-muted">{partner.email}</p></div></td>
                    <td className="p-5"><StatusBadge status={partner.status} /></td>
                    <td className="p-5"><TierBadge tier={partner.tier} /></td>
                    <td className="p-5 text-right font-medium text-content">{partner.revenue > 0 ? formatCurrency(partner.revenue) : '—'}</td>
                    <td className="p-5 text-right font-medium text-content">{partner.users > 0 ? partner.users.toLocaleString() : '—'}</td>
                    <td className="p-5 text-sm text-content-secondary">{formatDate(partner.lastActivity)}</td>
                    <td className="p-5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg></Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg></Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-danger hover:text-danger"><svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} totalItems={filteredPartners.length} itemsPerPage={ITEMS_PER_PAGE} onPageChange={setCurrentPage} />}
        </>
      )}
    </PageShell>
  );
}