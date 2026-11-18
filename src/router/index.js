import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/por-que-responsividade-importa',
    name: 'responsividade-importa',
    // Carregamento de rotas sob demanda (Lazy Loading - Boa Prática Vue)
    component: () => import('../views/ResponsividadeImportaView.vue')
  },
  {
    path: '/unidades-css',
    name: 'unidades-css',
    component: () => import('../views/UnidadesCssView.vue')
  },
  {
    path: '/flexbox-grid',
    name: 'flexbox-grid',
    component: () => import('../views/FlexboxGridView.vue')
  },
  {
    path: '/imagens-responsivas',
    name: 'imagens-responsivas',
    component: () => import('../views/ImagensResponsivasView.vue')
  },
  {
    path: '/boas-praticas-vue',
    name: 'boas-praticas-vue',
    component: () => import('../views/BoasPraticasVueView.vue')
  },
  {
    path: '/desafio',
    name: 'desafio',
    component: () => import('../views/DesafioView.vue')
  },
  {
    path: '/laboratorios',
    name: 'laboratorios',
    component: () => import('../views/LaboratoriosView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
