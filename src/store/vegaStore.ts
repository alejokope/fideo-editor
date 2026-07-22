import { create } from 'zustand'

export interface VegaSpec {
  id: string
  name: string
  description: string
  category: string
  lastUpdated: string
  preview: string
}

interface VegaState {
  specs: VegaSpec[]
  loading: boolean
  search: string
  setSearch: (s: string) => void
  selectedSpecId: string | null
  setSelectedSpecId: (id: string | null) => void
}

const MOCK_VEGA_SPECS: VegaSpec[] = [
  { id: '1', name: 'Ventas por Región', description: 'Mapa coroplético con ventas regionales. Datos actualizados mensualmente.', category: 'Maps', lastUpdated: '2024-01-15T10:00:00Z', preview: 'https://picsum.photos/seed/vega1/600/400' },
  { id: '2', name: 'Tendencia de Ingresos', description: 'Gráfico de líneas con bandas de confianza y predicciones.', category: 'Time Series', lastUpdated: '2024-01-18T14:00:00Z', preview: 'https://picsum.photos/seed/vega2/600/400' },
  { id: '3', name: 'Distribución de Usuarios', description: 'Gráfico de donut con breakdown demográfico de usuarios activos.', category: 'Part-to-Whole', lastUpdated: '2024-01-20T09:30:00Z', preview: 'https://picsum.photos/seed/vega3/600/400' },
  { id: '4', name: 'Funnel de Conversión', description: 'Embudo de conversión con tasas de drop-off por etapa.', category: 'Funnel', lastUpdated: '2024-01-22T16:00:00Z', preview: 'https://picsum.photos/seed/vega4/600/400' },
  { id: '5', name: 'Scatter: Precio vs Valor', description: 'Diagrama de dispersión interactivo con zoom y фильтр por categoría.', category: 'Correlation', lastUpdated: '2024-01-25T11:00:00Z', preview: 'https://picsum.photos/seed/vega5/600/400' },
  { id: '6', name: 'Ranking de Productos', description: 'Barras horizontales ordenadas por revenue con drill-down.', category: 'Ranking', lastUpdated: '2024-01-28T13:00:00Z', preview: 'https://picsum.photos/seed/vega6/600/400' },
]

export const useVegaStore = create<VegaState>((set) => ({
  specs: MOCK_VEGA_SPECS,
  loading: false,
  search: '',
  setSearch: (search) => set({ search }),
  selectedSpecId: null,
  setSelectedSpecId: (selectedSpecId) => set({ selectedSpecId }),
}))