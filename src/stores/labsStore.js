import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useLabsStore = defineStore('labs', () => {
  // ========================================================
  // LAB01 — Estado do Responsive Container
  // ========================================================
  const containerWidth = ref(600) // em pixels (300px a 900px)

  // Cálculo de colunas do grid: repeat(auto-fit, minmax(14rem, 1fr)) com gap: 1rem (base 16px)
  // Card mínimo = 14 * 16 = 224px | Gap = 16px
  // 1 coluna: < 464px
  // 2 colunas: 464px a 703px (2 * 224 + 16 = 464px)
  // 3 colunas: 704px a 943px (3 * 224 + 2 * 16 = 704px)
  // 4 colunas: >= 944px (4 * 224 + 3 * 16 = 944px)
  const columnsCount = computed(() => {
    const w = containerWidth.value
    if (w < 464) return 1
    if (w < 704) return 2
    if (w < 944) return 3
    return 4
  })

  const columnStatus = computed(() => {
    const cols = columnsCount.value
    const w = containerWidth.value
    if (cols === 1) {
      const faltaPara2 = 464 - w
      return {
        cols: 1,
        label: '1 Coluna',
        desc: `Faltam ${faltaPara2}px para a 2ª coluna surgir (limiar aos 464px).`,
        badgeClass: 'badge-pink'
      }
    }
    if (cols === 2) {
      const faltaPara3 = 704 - w
      return {
        cols: 2,
        label: '2 Colunas Ativas',
        desc: `Limite de 464px atingido! Faltam ${faltaPara3}px para 3 colunas (limiar aos 704px).`,
        badgeClass: 'badge-cyan'
      }
    }
    if (cols === 3) {
      const faltaPara4 = 944 - w
      return {
        cols: 3,
        label: '3 Colunas Ativas',
        desc: `Limite de 704px atingido! Faltam ${faltaPara4}px para 4 colunas (limiar aos 944px).`,
        badgeClass: 'badge-purple'
      }
    }
    return {
      cols: 4,
      label: '4 Colunas Ativas',
      desc: 'Capacidade máxima de 4 colunas simultâneas atingida!',
      badgeClass: 'badge-cyan'
    }
  })

  const resetContainerWidth = () => {
    containerWidth.value = 600
  }

  // ========================================================
  // LAB02 — Estado do Conversor de Unidades CSS
  // ========================================================
  const inputValue = ref(1.5)
  const selectedUnit = ref('rem')
  const rootBasePx = ref(16)        // Base do HTML (1rem = 16px)
  const parentBasePx = ref(20)      // Fonte do elemento pai (para em)
  const containerRefPx = ref(400)   // Largura do contêiner pai (para %)
  const viewportRefPx = ref(1200)   // Largura da janela (para vw)

  const calculatedPx = computed(() => {
    const val = Number(inputValue.value) || 0

    switch (selectedUnit.value) {
      case 'rem':
        return (val * rootBasePx.value).toFixed(1)
      case 'em':
        return (val * parentBasePx.value).toFixed(1)
      case '%':
        return ((val / 100) * containerRefPx.value).toFixed(1)
      case 'vw':
        return ((val / 100) * viewportRefPx.value).toFixed(1)
      case 'ch':
        // 1ch aprox. 0.55 a 0.6 da fonte base (adotamos 9.6px para fonte de 16px)
        return (val * (rootBasePx.value * 0.6)).toFixed(1)
      default:
        return (0).toFixed(1)
    }
  })

  const explanationFormula = computed(() => {
    const val = Number(inputValue.value) || 0
    switch (selectedUnit.value) {
      case 'rem':
        return `${val}rem × ${rootBasePx.value}px (raiz <html>) = ${calculatedPx.value}px`
      case 'em':
        return `${val}em × ${parentBasePx.value}px (fonte do elemento pai) = ${calculatedPx.value}px`
      case '%':
        return `(${val}% ÷ 100) × ${containerRefPx.value}px (largura do pai) = ${calculatedPx.value}px`
      case 'vw':
        return `(${val}% da tela) × ${viewportRefPx.value}px (largura da janela) = ${calculatedPx.value}px`
      case 'ch':
        return `${val}ch × (${rootBasePx.value}px × 0.6 larg. do '0') ≈ ${calculatedPx.value}px`
      default:
        return ''
    }
  })

  const resetConverter = () => {
    inputValue.value = 1.5
    selectedUnit.value = 'rem'
    rootBasePx.value = 16
    parentBasePx.value = 20
    containerRefPx.value = 400
  }

  return {
    // LAB01
    containerWidth,
    columnsCount,
    columnStatus,
    resetContainerWidth,
    // LAB02
    inputValue,
    selectedUnit,
    rootBasePx,
    parentBasePx,
    containerRefPx,
    viewportRefPx,
    calculatedPx,
    explanationFormula,
    resetConverter
  }
})
