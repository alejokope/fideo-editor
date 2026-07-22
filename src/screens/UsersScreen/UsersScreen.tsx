'use client'

import { useState, useCallback } from 'react';
import { PageShell } from '@/components/Library/PageShell';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Switch } from '@/components/ui/Switch';
import { cn } from '@/lib/cn';

// ============================================================================
// Types
// ============================================================================

type UserRole = 'Usuario' | 'Editor' | 'Admin';

interface UserFeature {
  id: string;
  label: string;
  enabled: boolean;
}

interface AILimit {
  id: string;
  label: string;
  value: number;
  max: number;
}

interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  features: UserFeature[];
  aiLimits: AILimit[];
  createdAt: string;
  status: 'active' | 'inactive';
}

interface Notice {
  type: 'success' | 'error' | 'warning';
  message: string;
}

// ============================================================================
// Mock Data
// ============================================================================

const MOCK_USERS: User[] = [
  { id: '1', username: 'maria.garcia', email: 'maria.garcia@empresa.com', role: 'Admin', features: [{ id: 'f1', label: 'Exportar SVG', enabled: true }, { id: 'f2', label: 'Exportar PNG', enabled: true }, { id: 'f3', label: 'Templates', enabled: true }, { id: 'f4', label: 'API Access', enabled: true }], aiLimits: [{ id: 'l1', label: 'Generaciones/mes', value: 500, max: 500 }, { id: 'l2', label: 'Tokens/mes', value: 25000, max: 50000 }], createdAt: '2024-01-15', status: 'active' },
  { id: '2', username: 'carlos.rodriguez', email: 'carlos.r@empresa.com', role: 'Editor', features: [{ id: 'f1', label: 'Exportar SVG', enabled: true }, { id: 'f2', label: 'Exportar PNG', enabled: true }, { id: 'f3', label: 'Templates', enabled: false }, { id: 'f4', label: 'API Access', enabled: false }], aiLimits: [{ id: 'l1', label: 'Generaciones/mes', value: 150, max: 200 }, { id: 'l2', label: 'Tokens/mes', value: 10000, max: 20000 }], createdAt: '2024-02-20', status: 'active' },
  { id: '3', username: 'ana.martinez', email: 'ana.martinez@empresa.com', role: 'Usuario', features: [{ id: 'f1', label: 'Exportar SVG', enabled: true }, { id: 'f2', label: 'Exportar PNG', enabled: false }, { id: 'f3', label: 'Templates', enabled: false }, { id: 'f4', label: 'API Access', enabled: false }], aiLimits: [{ id: 'l1', label: 'Generaciones/mes', value: 25, max: 50 }, { id: 'l2', label: 'Tokens/mes', value: 5000, max: 10000 }], createdAt: '2024-03-10', status: 'active' },
  { id: '4', username: 'juan.perez', email: 'juan.perez@empresa.com', role: 'Usuario', features: [{ id: 'f1', label: 'Exportar SVG', enabled: true }, { id: 'f2', label: 'Exportar PNG', enabled: true }, { id: 'f3', label: 'Templates', enabled: false }, { id: 'f4', label: 'API Access', enabled: false }], aiLimits: [{ id: 'l1', label: 'Generaciones/mes', value: 48, max: 50 }, { id: 'l2', label: 'Tokens/mes', value: 9500, max: 10000 }], createdAt: '2024-03-15', status: 'inactive' },
  { id: '5', username: 'sofia.lopez', email: 'sofia.lopez@empresa.com', role: 'Editor', features: [{ id: 'f1', label: 'Exportar SVG', enabled: true }, { id: 'f2', label: 'Exportar PNG', enabled: true }, { id: 'f3', label: 'Templates', enabled: true }, { id: 'f4', label: 'API Access', enabled: false }], aiLimits: [{ id: 'l1', label: 'Generaciones/mes', value: 180, max: 200 }, { id: 'l2', label: 'Tokens/mes', value: 18000, max: 20000 }], createdAt: '2024-04-01', status: 'active' },
];

const ALL_FEATURES: UserFeature['id'][] = ['f1', 'f2', 'f3', 'f4'];
const FEATURE_LABELS: Record<UserFeature['id'], string> = { f1: 'Exportar SVG', f2: 'Exportar PNG', f3: 'Templates', f4: 'API Access' };
const ALL_AI_LIMITS: AILimit['id'][] = ['l1', 'l2'];
const AI_LIMIT_LABELS: Record<AILimit['id'], string> = { l1: 'Generaciones/mes', l2: 'Tokens/mes' };


// ============================================================================
// Utility Components
// ============================================================================

function LoadingSkeleton() {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-center gap-4 rounded-xl border border-border bg-surface p-4">
          <div className="h-10 w-10 rounded-full shimmer" />
          <div className="flex-1 space-y-2"><div className="h-4 w-32 rounded shimmer" /><div className="h-3 w-48 rounded shimmer" /></div>
          <div className="h-8 w-20 rounded-lg shimmer" />
        </div>
      ))}
    </div>
  );
}

function NoticeBanner({ notice, onDismiss }: { notice: Notice; onDismiss: () => void }) {
  const styles = { success: 'bg-success-muted border-success text-success', error: 'bg-danger/10 border-danger text-danger', warning: 'bg-warning-muted border-warning text-warning' };
  const icons = {
    success: <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>,
    error: <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>,
    warning: <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>,
  };
  return (
    <div className={cn('flex items-center justify-between gap-3 rounded-xl border px-4 py-3 text-sm font-medium animate-fade-in', styles[notice.type])}>
      <div className="flex items-center gap-2">{icons[notice.type]}<span>{notice.message}</span></div>
      <button onClick={onDismiss} className="opacity-70 transition-opacity hover:opacity-100" aria-label="Dismiss">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
      </button>
    </div>
  );
}

// ============================================================================
// User Card Component
// ============================================================================

interface UserCardProps {
  user: User;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

function UserCard({ user, isExpanded, onToggleExpand, onEdit, onDelete }: UserCardProps) {
  const roleColors: Record<UserRole, string> = { Admin: 'bg-accent-muted text-accent', Editor: 'bg-warning-muted text-warning', Usuario: 'bg-surface-muted text-content-secondary' };
  return (
    <div className={cn('group relative rounded-xl border border-border bg-surface transition-all duration-200', 'hover:border-accent-muted hover:shadow-card-hover', isExpanded && 'border-accent shadow-panel-lg')}>
      <div className="flex items-center gap-4 p-4">
        <div className="relative">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground text-sm font-semibold">{user.username.charAt(0).toUpperCase()}</div>
          <span className={cn('absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-surface', user.status === 'active' ? 'bg-success' : 'bg-content-muted')} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2"><span className="font-medium text-content truncate">{user.username}</span><span className={cn('rounded-full px-2 py-0.5 text-[11px] font-medium', roleColors[user.role])}>{user.role}</span></div>
          <p className="mt-0.5 text-sm text-content-muted truncate">{user.email}</p>
        </div>
        <div className="hidden items-center gap-6 sm:flex">
          <div className="text-center"><p className="text-xs text-content-muted">Features</p><p className="text-sm font-medium text-content">{user.features.filter((f) => f.enabled).length}/{user.features.length}</p></div>
          <div className="text-center"><p className="text-xs text-content-muted">AI Usage</p><p className="text-sm font-medium text-content">{Math.round((user.aiLimits[0]?.value / user.aiLimits[0]?.max) * 100) || 0}%</p></div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={onEdit} className="opacity-0 group-hover:opacity-100"><svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg></Button>
          <Button variant="ghost" size="sm" onClick={onDelete} className="opacity-0 group-hover:opacity-100 text-danger hover:text-danger"><svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></Button>
          <Button variant="ghost" size="sm" onClick={onToggleExpand} className={cn('transition-transform', isExpanded && 'rotate-180')}><svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></Button>
        </div>
      </div>
      {isExpanded && (
        <div className="border-t border-border bg-surface-muted/50 p-4 animate-fade-in">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <h4 className="mb-3 text-xs font-semibold tracking-wide text-content-muted uppercase">Features activos</h4>
              <div className="flex flex-wrap gap-2">
                {user.features.map((feature) => (
                  <span key={feature.id} className={cn('inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium', feature.enabled ? 'bg-success-muted text-success' : 'bg-surface-muted text-content-muted')}>
                    {feature.enabled && <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                    {feature.label}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="mb-3 text-xs font-semibold tracking-wide text-content-muted uppercase">Límites AI</h4>
              <div className="space-y-2">
                {user.aiLimits.map((limit) => (
                  <div key={limit.id}>
                    <div className="mb-1 flex justify-between text-xs"><span className="text-content-secondary">{limit.label}</span><span className="font-medium text-content">{limit.value.toLocaleString()} / {limit.max.toLocaleString()}</span></div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-surface-muted"><div className={cn('h-full rounded-full transition-all duration-500', (limit.value / limit.max) > 0.8 ? 'bg-danger' : (limit.value / limit.max) > 0.5 ? 'bg-warning' : 'bg-success')} style={{ width: `${(limit.value / limit.max) * 100}%` }} /></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-4 border-t border-border/50 pt-4 text-xs text-content-muted"><span>Creado: {new Date(user.createdAt).toLocaleDateString('es-ES')}</span><span>•</span><span>ID: {user.id}</span></div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// Features Editor Component
// ============================================================================

interface FeaturesEditorProps {
  features: UserFeature[];
  onToggle: (id: string) => void;
  onPresetSelect: (preset: UserRole) => void;
  selectedRole: UserRole;
}

function FeaturesEditor({ features, onToggle, onPresetSelect, selectedRole }: FeaturesEditorProps) {
  const presets: { role: UserRole; features: Record<string, boolean> }[] = [
    { role: 'Usuario', features: { f1: true, f2: false, f3: false, f4: false } },
    { role: 'Editor', features: { f1: true, f2: true, f3: false, f4: false } },
    { role: 'Admin', features: { f1: true, f2: true, f3: true, f4: true } },
  ];
  return (
    <div className="space-y-4">
      <div>
        <label className="mb-2 block text-xs font-medium text-content-muted">Presets rápidos</label>
        <div className="flex flex-wrap gap-2">
          {presets.map(({ role, features: presetFeatures }) => (
            <button key={role} onClick={() => onPresetSelect(role)} className={cn('rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-200', selectedRole === role ? 'bg-accent text-accent-foreground shadow-glow' : 'bg-surface-muted text-content-secondary hover:bg-surface-elevated hover:text-content')}>{role}</button>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <label className="block text-xs font-medium text-content-muted">Features individuales</label>
        <div className="space-y-2 rounded-xl border border-border bg-surface-muted/30 p-3">
          {features.map((feature) => (
            <div key={feature.id} className="flex items-center justify-between"><span className="text-sm text-content">{feature.label}</span><Switch checked={feature.enabled} onChange={() => onToggle(feature.id)} /></div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// AI Limits Editor Component
// ============================================================================

interface AILimitsEditorProps {
  limits: AILimit[];
  onChange: (id: string, value: number) => void;
}
function AILimitsEditor({ limits, onChange }: AILimitsEditorProps) {
  return (
    <div className="space-y-4">
      <label className="block text-xs font-medium text-content-muted">Límites de consumo AI</label>
      <div className="space-y-4 rounded-xl border border-border bg-surface-muted/30 p-4">
        {limits.map((limit) => (
          <div key={limit.id}>
            <div className="mb-2 flex items-center justify-between"><label className="text-sm font-medium text-content">{limit.label}</label><span className="text-sm text-content-muted">{limit.value.toLocaleString()} / {limit.max.toLocaleString()}</span></div>
            <div className="relative">
              <input type="range" min={0} max={limit.max} value={limit.value} onChange={(e) => onChange(limit.id, parseInt(e.target.value, 10))} className="h-2 w-full appearance-none rounded-full bg-surface-muted cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-panel [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-accent [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer" style={{ background: `linear-gradient(to right, rgb(var(--accent)) 0%, rgb(var(--accent)) ${(limit.value / limit.max) * 100}%, rgb(var(--surface-muted)) ${(limit.value / limit.max) * 100}%, rgb(var(--surface-muted)) 100%)` }} />
            </div>
            <div className="mt-2 flex items-center gap-2"><Input type="number" value={limit.value} onChange={(e) => onChange(limit.id, parseInt(e.target.value || '0', 10))} className="h-8 w-28 text-xs" /><span className="text-xs text-content-muted">/ {limit.max.toLocaleString()}</span></div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// Inline Edit Panel Component
// ============================================================================

interface InlineEditPanelProps {
  user: User;
  onSave: (user: User) => void;
  onCancel: () => void;
}

function InlineEditPanel({ user, onSave, onCancel }: InlineEditPanelProps) {
  const [editedUser, setEditedUser] = useState<User>(user);
  const [selectedRole, setSelectedRole] = useState<UserRole>(user.role);
  const handleFeatureToggle = (id: string) => { setEditedUser((prev) => ({ ...prev, features: prev.features.map((f) => (f.id === id ? { ...f, enabled: !f.enabled } : f)) })); };
  const handlePresetSelect = (role: UserRole) => {
    setSelectedRole(role);
    const presetFeatures: Record<UserRole, Record<string, boolean>> = { Usuario: { f1: true, f2: false, f3: false, f4: false }, Editor: { f1: true, f2: true, f3: false, f4: false }, Admin: { f1: true, f2: true, f3: true, f4: true } };
    setEditedUser((prev) => ({ ...prev, features: prev.features.map((f) => ({ ...f, enabled: presetFeatures[role][f.id] ?? f.enabled })) }));
  };
  const handleAILimitChange = (id: string, value: number) => { setEditedUser((prev) => ({ ...prev, aiLimits: prev.aiLimits.map((l) => (l.id === id ? { ...l, value } : l)) })); };
  return (
    <div className="rounded-xl border border-accent bg-surface-elevated p-6 shadow-panel-lg animate-scale-in">
      <div className="mb-6 flex items-center justify-between"><h3 className="text-lg font-semibold text-content">Editar usuario</h3><div className="flex items-center gap-2"><Button variant="ghost" size="sm" onClick={onCancel}>Cancelar</Button><Button size="sm" onClick={() => onSave(editedUser)}>Guardar cambios</Button></div></div>
      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        <div><label className="mb-2 block text-xs font-medium text-content-muted">Usuario</label><Input value={editedUser.username} onChange={(e) => setEditedUser((prev) => ({ ...prev, username: e.target.value }))} /></div>
        <div><label className="mb-2 block text-xs font-medium text-content-muted">Email</label><Input type="email" value={editedUser.email} onChange={(e) => setEditedUser((prev) => ({ ...prev, email: e.target.value }))} /></div>
        <div><label className="mb-2 block text-xs font-medium text-content-muted">Rol</label><Select value={editedUser.role} onChange={(e) => { const newRole = e.target.value as UserRole; setEditedUser((prev) => ({ ...prev, role: newRole })); setSelectedRole(newRole); }}><option value="Usuario">Usuario</option><option value="Editor">Editor</option><option value="Admin">Admin</option></Select></div>
        <div><label className="mb-2 block text-xs font-medium text-content-muted">Estado</label><Select value={editedUser.status} onChange={(e) => setEditedUser((prev) => ({ ...prev, status: e.target.value as 'active' | 'inactive' }))}><option value="active">Activo</option><option value="inactive">Inactivo</option></Select></div>
      </div>
      <div className="mb-6"><FeaturesEditor features={editedUser.features} onToggle={handleFeatureToggle} onPresetSelect={handlePresetSelect} selectedRole={selectedRole} /></div>
      <AILimitsEditor limits={editedUser.aiLimits} onChange={handleAILimitChange} />
    </div>
  );
}

// ============================================================================
// Main UsersScreen Component
// ============================================================================

export function UsersScreen() {
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<UserRole | 'all'>('all');
  const [expandedUserId, setExpandedUserId] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [notice, setNotice] = useState<Notice | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.username.toLowerCase().includes(searchQuery.toLowerCase()) || user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleDeleteUser = useCallback((userId: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== userId));
    setNotice({ type: 'success', message: 'Usuario eliminado correctamente' });
    setTimeout(() => setNotice(null), 3000);
  }, []);

  const handleSaveUser = useCallback((updatedUser: User) => {
    setUsers((prev) => prev.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
    setEditingUser(null);
    setNotice({ type: 'success', message: 'Usuario actualizado correctamente' });
    setTimeout(() => setNotice(null), 3000);
  }, []);
  const handleDismissNotice = useCallback(() => setNotice(null), []);

  return (
    <PageShell title="Usuarios" description="Gestiona usuarios, permisos y configuraciones de acceso al sistema." actions={<Button><svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>Nuevo usuario</Button>}>
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-content-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <Input placeholder="Buscar por nombre o email..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
        </div>
        <Select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value as UserRole | 'all')} className="w-40"><option value="all">Todos los roles</option><option value="Usuario">Usuario</option><option value="Editor">Editor</option><option value="Admin">Admin</option></Select>
      </div>
      {notice && <NoticeBanner notice={notice} onDismiss={handleDismissNotice} />}
      {isLoading && <LoadingSkeleton />}
      {editingUser && <div className="mb-6"><InlineEditPanel user={editingUser} onSave={handleSaveUser} onCancel={() => setEditingUser(null)} /></div>}
      {!isLoading && (
        <div className="space-y-3">
          {filteredUsers.length === 0 ? (
            <div className="rounded-xl border border-border bg-surface-muted/30 py-12 text-center">
              <svg className="mx-auto h-12 w-12 text-content-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>
              <p className="mt-4 text-sm font-medium text-content">No se encontraron usuarios</p>
              <p className="mt-1 text-sm text-content-muted">Intenta ajustar tu búsqueda o filtros</p>
            </div>
          ) : (
            filteredUsers.map((user) => (
              <UserCard key={user.id} user={user} isExpanded={expandedUserId === user.id} onToggleExpand={() => setExpandedUserId((prev) => (prev === user.id ? null : user.id))} onEdit={() => setEditingUser(user)} onDelete={() => handleDeleteUser(user.id)} />
            ))
          )}
        </div>
      )}
      {!isLoading && filteredUsers.length > 0 && (
        <div className="mt-6 flex items-center justify-between border-t border-border pt-4 text-sm text-content-muted">
          <span>Mostrando {filteredUsers.length} de {users.length} usuarios</span>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-success" />{users.filter((u) => u.status === 'active').length} activos</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-content-muted" />{users.filter((u) => u.status === 'inactive').length} inactivos</span>
          </div>
        </div>
      )}
    </PageShell>
  );
}