export type ModuleKind = 'primary' | 'library' | 'admin';

export interface Module {
  id: string;
  title: string;
  description: string;
  route: string;
  actionLabel: string;
  kind: ModuleKind;
  icon: string;
}

export const modules: Module[] = [
  // Primary modules
  {
    id: 'editor',
    title: 'Editor',
    description: 'Crea y edita diseños visuales con el editor intuitivo de Grilla.',
    route: '/editor',
    actionLabel: 'Abrir editor',
    kind: 'primary',
    icon: '✏️',
  },
  {
    id: 'designs',
    title: 'Mis Diseños',
    description: 'Gestiona todos tus diseños guardados y acceder a ellos rápidamente.',
    route: '/designs',
    actionLabel: 'Ver diseños',
    kind: 'primary',
    icon: '🎨',
  },
  {
    id: 'components',
    title: 'Componentes',
    description: 'Explora y reutiliza componentes visuales listos para integrar.',
    route: '/components',
    actionLabel: 'Explorar',
    kind: 'primary',
    icon: '🧩',
  },
  // Library modules
  {
    id: 'templates',
    title: 'Plantillas',
    description: 'Descubre plantillas profesionales para acelerar tu flujo de trabajo.',
    route: '/templates',
    actionLabel: 'Ver plantillas',
    kind: 'library',
    icon: '📐',
  },
  {
    id: 'vega',
    title: 'Vega',
    description: 'Herramienta avanzada de visualización de datos y gráficos interactivos.',
    route: '/vega',
    actionLabel: 'Abrir Vega',
    kind: 'library',
    icon: '📊',
  },
  // Admin modules
  {
    id: 'partners',
    title: 'Partners',
    description: 'Gestiona partners, integraciones y conexiones externas.',
    route: '/partners',
    actionLabel: 'Administrar',
    kind: 'admin',
    icon: '🤝',
  },
  {
    id: 'users',
    title: 'Usuarios',
    description: 'Administra usuarios, permisos y configuraciones de acceso.',
    route: '/users',
    actionLabel: 'Gestionar',
    kind: 'admin',
    icon: '👥',
  },
];

export const getModulesByKind = (kind: ModuleKind) =>
  modules.filter((m) => m.kind === kind);