import { create } from 'zustand'
export interface Design {
  id: string
  name: string
  thumbnail: string
  createdAt: string
  inUse: boolean
  tags: string[]
}

interface DesignState {
  designs: Design[]
  loading: boolean
  search: string
  setSearch: (s: string) => void
  deleteDesign: (id: string) => void
}

const MOCK_DESIGNS: Design[] = [
  {
    id: '1',
    name: 'Banner Homepage Q3',
    thumbnail: 'https://picsum.photos/seed/design1/400/250',
    createdAt: '2024-01-15T10:30:00Z',
    inUse: true,
    tags: ['banner', 'homepage'],
  },
  {
    id: '2',
    name: 'Card Promocional Verano',
    thumbnail: 'https://picsum.photos/seed/design2/400/250',
    createdAt: '2024-01-20T14:00:00Z',
    inUse: false,
    tags: ['card', 'promo'],
  },
  {
    id: '3',
    name: 'Email Newsletter Feb',
    thumbnail: 'https://picsum.photos/seed/design3/400/250',
    createdAt: '2024-01-22T09:15:00Z',
    inUse: true,
    tags: ['email', 'newsletter'],
  },
  {
    id: '4',
    name: 'Social Post Instagram',
    thumbnail: 'https://picsum.photos/seed/design4/400/250',
    createdAt: '2024-01-25T16:45:00Z',
    inUse: false,
    tags: ['social', 'instagram'],
  },
  {
    id: '5',
    name: 'Header Navigation Dark',
    thumbnail: 'https://picsum.photos/seed/design5/400/250',
    createdAt: '2024-01-28T11:00:00Z',
    inUse: false,
    tags: ['header', 'nav'],
  },
  {
    id: '6',
    name: 'Footer Minimal V2',
    thumbnail: 'https://picsum.photos/seed/design6/400/250',
    createdAt: '2024-02-01T08:30:00Z',
    inUse: true,
    tags: ['footer', 'minimal'],
  },
]

export const useDesignStore = create<DesignState>((set) => ({
  designs: MOCK_DESIGNS,
  loading: false,
  search: '',
  setSearch: (search) => set({ search }),
  deleteDesign: (id) =>
    set((state) => ({ designs: state.designs.filter((d) => d.id !== id) })),
}))