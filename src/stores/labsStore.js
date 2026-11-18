import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useLabsStore = defineStore('labs', () => {
  // ==========================================
  // LAB01: Responsive Container & CSS Grid
  // ==========================================
  const containerWidth = ref(600) // largura em pixels (300 a 860px)
  const cardMinWidthRem = ref(14) // 14rem
  const gapRem = ref(1) // 1rem
  const baseFontSize = ref(16) // 1rem = 16px

  // Cálculos matemáticos precisos
  const cardMinWidthPx = computed(() => +(cardMinWidthRem.value * baseFontSize.value).toFixed(1)) // 224px
  const gapPx = computed(() => +(gapRem.value * baseFontSize.value).toFixed(1)) // 16px

  // Limiares exatos de colunas no CSS Grid:
  // 1 Coluna: >= 224px
  // 2 Colunas: 2 * 224px + 1 * 16px = 448px + 16px = 464px
  // 3 Colunas: 3 * 224px + 2 * 16px = 672px + 32px = 704px
  // 4 Colunas: 4 * 224px + 3 * 16px = 896px + 48px = 944px
  const threshold2Cols = computed(() => 2 * cardMinWidthPx.value + 1 * gapPx.value) // 464px
  const threshold3Cols = computed(() => 3 * cardMinWidthPx.value + 2 * gapPx.value) // 704px

  // Colunas calculadas ativas no containerWidth atual
  const currentColumns = computed(() => {
    const w = containerWidth.value
    if (w < threshold2Cols.value) return 1
    if (w < threshold3Cols.value) return 2
    return 3
  })

  // Status visual e pedagógico em tempo real
  const columnStatus = computed(() => {
    const w = containerWidth.value
    if (w < threshold2Cols.value) {
      return {
        columns: 1,
        title: '1 Coluna Ativa',
        badgeClass: 'badge-yellow',
        tag: 'Mobile / Estreito',
        message: `Largura (${w}px) insuficiente para 2 cards de 224px + 1 gap de 16px (mínimo de 464px). Todos os cards empilham em coluna única.`,
        formula: `${w}px < 464px (2 × 224px + 16px)`
      }
    }
    if (w < threshold3Cols.value) {
      return {
        columns: 2,
        title: '2 Colunas Ativas (★ Limiar de 464px atingido!)',
        badgeClass: 'badge-pink',
        tag: 'Tablet / Intermediário',
        message: `Largura (${w}px) ultrapassou 464px! Há espaço para 2 cards de 224px (14rem) lado a lado com 16px (1rem) de gap.`,
        formula: `464px ≤ ${w}px < 704px`
      }
    }
    return {
      columns: 3,
      title: '3 Colunas Ativas (Limiar de 704px atingido!)',
      badgeClass: 'badge-cyan',
      tag: 'Desktop / Amplo',
      message: `Largura (${w}px) atinge 704px ou mais! O Grid agora acomoda 3 cards de 224px e 2 gaps de 16px (3 × 224 + 32 = 704px).`,
      formula: `${w}px ≥ 704px (3 × 224px + 2 × 16px)`
    }
  })

  const setContainerWidth = (val) => {
    containerWidth.value = Math.min(860, Math.max(300, Number(val) || 300))
  }

  const resetLab01 = () => {
    containerWidth.value = 600
  }

  // ==========================================
  // LAB02: CSS Unit Converter
  // ==========================================
  const inputValue = ref(1.5)
  const selectedUnit = ref('rem') // 'rem', 'em', '%', 'vw', 'ch'
  const rootFontSize = ref(16) // px do <html>
  const parentFontSize = ref(18) // px do elemento pai
  const containerRefWidth = ref(400) // px do contêiner pai
  const viewportRefWidth = ref(1200) // px da janela do navegador

  // Largura aproximada do caractere '0' baseada na raiz (cerca de 0.6 * font-size)
  const calculatedChZeroWidth = computed(() => +(rootFontSize.value * 0.6).toFixed(2))

  const convertedPx = computed(() => {
    const val = Number(inputValue.value) || 0
    switch (selectedUnit.value) {
      case 'rem':
        return +(val * rootFontSize.value).toFixed(2)
      case 'em':
        return +(val * parentFontSize.value).toFixed(2)
      case '%':
        return +((val / 100) * containerRefWidth.value).toFixed(2)
      case 'vw':
        return +((val / 100) * viewportRefWidth.value).toFixed(2)
      case 'ch':
        return +(val * calculatedChZeroWidth.value).toFixed(2)
      default:
        return 0
    }
  })

  const unitReferenceExplanation = computed(() => {
    const val = Number(inputValue.value) || 0
    switch (selectedUnit.value) {
      case 'rem':
        return {
          name: 'rem (Root EM)',
          formula: `${val}rem × ${rootFontSize.value}px (raiz <html>) = ${convertedPx.value}px`,
          explanation: `O rem é relativo exclusivamente à raiz do documento (<html> = ${rootFontSize.value}px). Independe de elementos pais, respeitando as preferências de tamanho de fonte configuradas pelo usuário no navegador para acessibilidade.`,
          contextName: 'Fonte Raiz (<html>)',
          contextValue: `${rootFontSize.value}px`,
          contextType: 'rootFontSize'
        }
      case 'em':
        return {
          name: 'em (Elemento Pai)',
          formula: `${val}em × ${parentFontSize.value}px (elemento pai) = ${convertedPx.value}px`,
          explanation: `O em multiplica o tamanho de fonte herdado do elemento pai direto (${parentFontSize.value}px). Atenção: quando aninhado sucessivamente, o em causa o efeito cascata multiplicativo!`,
          contextName: 'Fonte do Elemento Pai',
          contextValue: `${parentFontSize.value}px`,
          contextType: 'parentFontSize'
        }
      case '%':
        return {
          name: '% (Porcentagem do Contêiner)',
          formula: `(${val} / 100) × ${containerRefWidth.value}px = ${convertedPx.value}px`,
          explanation: `A porcentagem representa uma fração da largura do bloco contêiner pai direto (${containerRefWidth.value}px). É a espinha dorsal de layouts fluidos e imagens responsivas.`,
          contextName: 'Largura do Contêiner Pai',
          contextValue: `${containerRefWidth.value}px`,
          contextType: 'containerRefWidth'
        }
      case 'vw':
        return {
          name: 'vw (Viewport Width)',
          formula: `(${val} / 100) × ${viewportRefWidth.value}px = ${convertedPx.value}px`,
          explanation: `1vw representa exatamente 1% da largura visível da janela do navegador (${viewportRefWidth.value}px). Muda instantaneamente quando a tela é redimensionada.`,
          contextName: 'Largura da Viewport',
          contextValue: `${viewportRefWidth.value}px`,
          contextType: 'viewportRefWidth'
        }
      case 'ch':
        return {
          name: 'ch (Caractere "0")',
          formula: `${val}ch × ${calculatedChZeroWidth.value}px (largura do '0') = ${convertedPx.value}px`,
          explanation: `1ch equivale à largura do glifo do número '0' na fonte ativa (~${calculatedChZeroWidth.value}px). É a unidade ideal para medidas tipográficas ergonômicas de leitura (entre 50ch e 75ch por linha).`,
          contextName: 'Largura do Glifo "0"',
          contextValue: `${calculatedChZeroWidth.value}px`,
          contextType: 'rootFontSize'
        }
      default:
        return {
          name: '',
          formula: '',
          explanation: '',
          contextName: '',
          contextValue: '',
          contextType: ''
        }
    }
  })

  const resetLab02 = () => {
    inputValue.value = 1.5
    selectedUnit.value = 'rem'
    rootFontSize.value = 16
    parentFontSize.value = 18
    containerRefWidth.value = 400
    viewportRefWidth.value = 1200
  }

  // ==========================================
  // DESAFIO FINAL: Estado Compartilhado (RF11)
  // ==========================================
  const challengeAnswer = ref('')
  const challengeCompleted = ref(false)
  const challengeAttempts = ref(0)

  const registerChallengeAttempt = (isCorrect) => {
    challengeAttempts.value++
    if (isCorrect) {
      challengeCompleted.value = true
    }
  }

  const resetChallenge = () => {
    challengeAnswer.value = ''
    challengeCompleted.value = false
    challengeAttempts.value = 0
  }

  const resetAllLabs = () => {
    resetLab01()
    resetLab02()
    resetChallenge()
  }

  return {
    // LAB01
    containerWidth,
    cardMinWidthRem,
    gapRem,
    baseFontSize,
    cardMinWidthPx,
    gapPx,
    threshold2Cols,
    threshold3Cols,
    currentColumns,
    columnStatus,
    setContainerWidth,
    resetLab01,

    // LAB02
    inputValue,
    selectedUnit,
    rootFontSize,
    parentFontSize,
    containerRefWidth,
    viewportRefWidth,
    calculatedChZeroWidth,
    convertedPx,
    unitReferenceExplanation,
    resetLab02,

    // DESAFIO FINAL
    challengeAnswer,
    challengeCompleted,
    challengeAttempts,
    registerChallengeAttempt,
    resetChallenge,

    // Geral
    resetAllLabs
  }
})
