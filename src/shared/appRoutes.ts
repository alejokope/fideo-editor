export type AppRouteId =
  | 'home'
  | 'editor'
  | 'designs'
  | 'components'
  | 'templates'
  | 'vega'
  | 'partners'
  | 'users';

export const APP_ROUTE_LABELS: Record<AppRouteId, string> = {
  home: 'Inicio',
  editor: 'Editor',
  designs: 'Diseños',
  components: 'Componentes',
  templates: 'Plantillas',
  vega: 'Vega',
  partners: 'Partners',
  users: 'Usuarios',
};