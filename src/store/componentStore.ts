import { create } from 'zustand'

export interface Component {
  id: string
  name: string
  description: string
  category: string
  preview: string
  published: boolean
  lastUpdated: string
}

interface ComponentState {
  components: Component[]
  loading: boolean
  search: string
  setSearch: (s: string) => void
}

const MOCK_COMPONENTS: Component[] = [
  {
    id: '1',
    name: 'Button Primary',
    description: 'Botón principal con estados hover, active y disabled. Soporta múltiples tamaños.',
    category: 'Actions',
    preview: 'https://picsum.photos/seed/comp1/300/200',
    published: true,
    lastUpdated: '2024-01-10T12:00:00Z',
  },
  {
    id: '2',
    name: 'Card Component',
    description: 'Tarjeta genérica con header, body y footer. Soporta imágenes y acciones.',
    category: 'Layout',
    preview: 'https://picsum.photos/seed/comp2/300/200',
    published: true,
    lastUpdated: '2024-01-12T14:30:00Z',
  },
  {
    id: '3',
    name: 'Input Field',
    description: 'Campo de texto con label, helper text, validación y iconos opcionales.',
    category: 'Forms',
    preview: 'https://picsum.photos/seed/comp3/300/200',
    published: true,
    lastUpdated: '2024-01-15T09:00:00Z',
  },
  {
    id: '4',
    name: 'Navigation Bar',
    description: 'Barra de navegación responsive con menú hamburguesa en móvil.',
    category: 'Navigation',
    preview: 'https://picsum.photos/seed/comp4/300/200',
    published: false,
    lastUpdated: '2024-01-18T16:00:00Z',
  },
  {
    id: '5',
    name: 'Modal Dialog',
    description: 'Diálogo modal con overlay, close button y trap de focus integrado.',
    category: 'Overlay',
    preview: 'https://picsum.photos/seed/comp5/300/200',
    published: true,
    lastUpdated: '2024-01-20T11:00:00Z',
  },
  {
    id: '6',
    name: 'Avatar Group',
    description: 'Grupo de avatares apilados con contador de overflow personalizable.',
    category: 'Display',
    preview: 'https://picsum.photos/seed/comp6/300/200',
    published: true,
    lastUpdated: '2024-01-22T13:45:00Z',
  },
  {
    id: '7',
    name: 'Badge Chip',
    description: 'Chip pequeño para labels, estados y contadores. Variantes de color.',
    category: 'Display',
    preview: 'https://picsum.photos/seed/comp7/300/200',
    published: true,
    lastUpdated: '2024-01-25T10:00:00Z',
  },
  {
    id: '8',
    name: 'Dropdown Select',
    description: 'Select con búsqueda, múltiples selección y grouping de opciones.',
    category: 'Forms',
    preview: 'https://picsum.photos/seed/comp8/300/200',
    published: false,
    lastUpdated: '2024-01-28T15:30:00Z',
  },
]

export const useComponentStore = create<ComponentState>((set) => ({
  components: MOCK_COMPONENTS,
  loading: false,
  search: '',
  setSearch: (search) => set({ search }),
}))