import { create } from 'zustand'

export interface Template {
  id: string
  name: string
  preview: string
  description: string
  category: string
  usageCount: number
}

interface TemplateState {
  templates: Template[]
  loading: boolean
  search: string
  setSearch: (s: string) => void
}

const MOCK_TEMPLATES: Template[] = [
  { id: '1', name: 'Email Marketing Pro', preview: 'https://picsum.photos/seed/tpl1/600/400', description: 'Plantilla profesional para campañas de email marketing con estructura modular.', category: 'Email', usageCount: 342 },
  { id: '2', name: 'Dashboard Analytics', preview: 'https://picsum.photos/seed/tpl2/600/400', description: 'Panel de control con gráficos y métricas clave para seguimiento de KPIs.', category: 'Dashboard', usageCount: 189 },
  { id: '3', name: 'Landing Page SaaS', preview: 'https://picsum.photos/seed/tpl3/600/400', description: 'Página de aterrizaje optimizada para productos SaaS con CTAs claros.', category: 'Landing', usageCount: 521 },
  { id: '4', name: 'Social Media Kit', preview: 'https://picsum.photos/seed/tpl4/600/400', description: 'Kit completo de plantillas para redes sociales en múltiples formatos.', category: 'Social', usageCount: 267 },
  { id: '5', name: 'E-commerce Product Grid', preview: 'https://picsum.photos/seed/tpl5/600/400', description: 'Grid de productos con filtros, galería y selector de variantes.', category: 'E-commerce', usageCount: 145 },
  { id: '6', name: 'Blog Layout Moderno', preview: 'https://picsum.photos/seed/tpl6/600/400', description: 'Layout limpio y legible para artículos de blog con sidebar integrado.', category: 'Blog', usageCount: 98 },
]

export const useTemplateStore = create<TemplateState>((set) => ({
  templates: MOCK_TEMPLATES,
  loading: false,
  search: '',
  setSearch: (search) => set({ search }),
}))