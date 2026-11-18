import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useViewportStore = defineStore('viewport', () => {
  const width = ref(typeof window !== 'undefined' ? window.innerWidth : 1024)
  const height = ref(typeof window !== 'undefined' ? window.innerHeight : 768)
  const isMinimized = ref(false)

  // Breakpoints oficiais alinhados com o ERS e media queries
  // Mobile: < 640px (< 40rem)
  // Tablet: 640px - 1023px (40rem - 63.9375rem)
  // Desktop: >= 1024px (>= 64rem)
  const isMobile = computed(() => width.value < 640)
  const isTablet = computed(() => width.value >= 640 && width.value < 1024)
  const isDesktop = computed(() => width.value >= 1024)

  const activeBreakpoint = computed(() => {
    if (width.value < 640) {
      return {
        id: 'mobile',
        name: 'Mobile (<640px)',
        short: 'SM',
        description: 'Telas compactas / Smartphones',
        tagClass: 'badge-pink'
      }
    }
    if (width.value < 1024) {
      return {
        id: 'tablet',
        name: 'Tablet (640px - 1023px)',
        short: 'MD',
        description: 'Telas médias / Tablets e Dobráveis',
        tagClass: 'badge-purple'
      }
    }
    return {
      id: 'desktop',
      name: 'Desktop (≥1024px)',
      short: 'LG/XL',
      description: 'Telas amplas / Notebooks e Monitores',
      tagClass: 'badge-cyan'
    }
  })

  let resizeHandler = null

  const handleResize = () => {
    if (typeof window !== 'undefined') {
      width.value = window.innerWidth
      height.value = window.innerHeight
    }
  }

  const init = () => {
    if (typeof window !== 'undefined' && !resizeHandler) {
      handleResize()
      resizeHandler = handleResize
      window.addEventListener('resize', resizeHandler, { passive: true })
    }
  }

  const cleanup = () => {
    if (typeof window !== 'undefined' && resizeHandler) {
      window.removeEventListener('resize', resizeHandler)
      resizeHandler = null
    }
  }

  const toggleMinimize = () => {
    isMinimized.value = !isMinimized.value
  }

  return {
    width,
    height,
    isMobile,
    isTablet,
    isDesktop,
    activeBreakpoint,
    isMinimized,
    init,
    cleanup,
    toggleMinimize
  }
})
