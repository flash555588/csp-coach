import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('@/views/DashboardView.vue'),
  },
  {
    path: '/path',
    name: 'LearningPath',
    component: () => import('@/views/LearningPathView.vue'),
  },
  {
    path: '/workflow',
    name: 'Workflow',
    component: () => import('@/views/WorkflowView.vue'),
  },
  {
    path: '/palette',
    name: 'Palette',
    component: () => import('@/views/ColorPaletteView.vue'),
  },
  {
    path: '/analyzer',
    name: 'Analyzer',
    component: () => import('@/views/ReferenceAnalyzerView.vue'),
  },
  {
    path: '/resources',
    name: 'Resources',
    component: () => import('@/views/ResourcesView.vue'),
  },
  {
    path: '/progress',
    name: 'Progress',
    component: () => import('@/views/ProgressView.vue'),
  },
  {
    path: '/prompts',
    name: 'Prompts',
    component: () => import('@/views/PromptsView.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
