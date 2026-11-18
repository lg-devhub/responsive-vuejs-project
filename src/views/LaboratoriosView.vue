<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

// --- Lab 1: Controle Deslizante de Largura de Contêiner ---
const larguraContainer = ref(600)

// --- Lab 2: Conversor de Unidades CSS ---
const valorEntrada = ref(1.5)
const unidadeSelecionada = ref('rem')
const tamanhoBaseRem = ref(16) // 1rem = 16px padrão

const valorCalculadoEmPx = computed(() => {
  const val = Number(valorEntrada.value) || 0
  if (unidadeSelecionada.value === 'rem') {
    return (val * tamanhoBaseRem.value).toFixed(1)
  }
  if (unidadeSelecionada.value === 'em') {
    // Considerando contexto direto do elemento pai
    return (val * tamanhoBaseRem.value).toFixed(1)
  }
  if (unidadeSelecionada.value === '%') {
    // Exemplo relativo a uma largura de referência de 400px
    return ((val / 100) * 400).toFixed(1)
  }
  return 0
})

// --- Lab 3: Indicador de Largura de Janela e Breakpoint ---
const larguraJanela = ref(typeof window !== 'undefined' ? window.innerWidth : 1024)

const breakpointAtivo = computed(() => {
  if (larguraJanela.value < 640) return { nome: 'Mobile (Pequeno)', classe: 'tag-mobile' }
  if (larguraJanela.value < 1024) return { nome: 'Tablet (Médio)', classe: 'tag-tablet' }
  return { nome: 'Desktop (Grande)', classe: 'tag-desktop' }
})

const atualizarLargura = () => {
  larguraJanela.value = window.innerWidth
}

onMounted(() => {
  window.addEventListener('resize', atualizarLargura)
})

onUnmounted(() => {
  window.removeEventListener('resize', atualizarLargura)
})
</script>

<template>
  <div class="labs-view">
    <header class="labs-header">
      <span class="labs-tag">Demonstrações Práticas</span>
      <h1>Laboratórios Interativos</h1>
      <p>
        Pequenas demonstrações interativas onde você mexe nos controles e observa os conceitos de responsividade e CSS acontecendo em tempo real.
      </p>
    </header>

    <!-- Laboratório 1 -->
    <section class="lab-card">
      <div class="lab-badge">Laboratório 1</div>
      <h2>Controle Deslizante: Largura de Contêiner & Grid</h2>
      <p class="lab-desc">
        Arraste a barra para mudar a largura do contêiner abaixo e observe a fórmula <code>repeat(auto-fit, minmax(14rem, 1fr))</code> reposicionar os cards automaticamente:
      </p>

      <div class="slider-control">
        <label for="slider-largura">Largura do Contêiner: <strong>{{ larguraContainer }}px</strong></label>
        <input
          id="slider-largura"
          v-model.number="larguraContainer"
          type="range"
          min="300"
          max="800"
          step="10"
          class="range-input"
        />
      </div>

      <div class="preview-area">
        <div class="container-dinamico" :style="{ width: larguraContainer + 'px' }">
          <div class="grid-demonstracao">
            <div class="card-demo">Card A (min 14rem)</div>
            <div class="card-demo">Card B (min 14rem)</div>
            <div class="card-demo">Card C (min 14rem)</div>
          </div>
        </div>
      </div>
      <p class="legenda-lab">
        Dica: lembre-se da Seção 3! Com 14rem (224px) por card + 1rem (16px) de gap, a 2ª coluna surge aos <strong>464px</strong>!
      </p>
    </section>

    <!-- Laboratório 2 -->
    <section class="lab-card">
      <div class="lab-badge">Laboratório 2</div>
      <h2>Conversor Interativo de Unidades CSS</h2>
      <p class="lab-desc">
        Converta valores em <code>rem</code>, <code>em</code> ou <code>%</code> diretamente para pixels (px) baseando-se no padrão de 1rem = 16px:
      </p>

      <div class="converter-grid">
        <div class="input-field">
          <label>Valor:</label>
          <input v-model.number="valorEntrada" type="number" step="0.1" class="input-text" />
        </div>

        <div class="input-field">
          <label>Unidade:</label>
          <select v-model="unidadeSelecionada" class="select-unit">
            <option value="rem">rem (relativo à raiz)</option>
            <option value="em">em (relativo ao pai)</option>
            <option value="%">% (porcentagem)</option>
          </select>
        </div>

        <div class="result-box">
          <span class="result-label">Resultado Equivalente:</span>
          <span class="result-value">{{ valorCalculadoEmPx }} px</span>
          <small v-if="unidadeSelecionada === '%'" class="result-note">(baseado em contêiner de 400px)</small>
          <small v-else class="result-note">(baseado em fonte raiz de 16px)</small>
        </div>
      </div>
    </section>

    <!-- Laboratório 3 -->
    <section class="lab-card">
      <div class="lab-badge">Laboratório 3</div>
      <h2>Indicador de Janela e Breakpoints</h2>
      <p class="lab-desc">
        Este componente monitora o tamanho em tempo real da tela do seu navegador e indica qual breakpoint estaria ativo:
      </p>

      <div class="indicator-box">
        <div class="indicator-metric">
          <span class="metric-label">Largura atual da janela:</span>
          <span class="metric-number">{{ larguraJanela }} px</span>
        </div>

        <div class="indicator-metric">
          <span class="metric-label">Breakpoint ativo detectado:</span>
          <span :class="['badge-breakpoint', breakpointAtivo.classe]">
            {{ breakpointAtivo.nome }}
          </span>
        </div>
      </div>
      <p class="legenda-lab">
        Experimente redimensionar a janela do seu navegador para ver o valor e o rótulo mudarem dinamicamente.
      </p>
    </section>
  </div>
</template>

<style scoped>
.labs-header {
  margin-bottom: var(--spacing-xl);
}

.labs-tag {
  display: inline-block;
  background-color: #ecfdf5;
  color: #065f46;
  font-size: var(--font-size-xs);
  font-weight: 700;
  padding: 0.2rem 0.6rem;
  border-radius: var(--radius-sm);
  margin-bottom: var(--spacing-xs);
  text-transform: uppercase;
}

.labs-header h1 {
  font-size: var(--font-size-3xl);
  margin-bottom: var(--spacing-xs);
}

.labs-header p {
  color: var(--color-text-secondary);
  font-size: var(--font-size-base);
}

.lab-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  margin-bottom: var(--spacing-xl);
  box-shadow: var(--shadow-sm);
}

.lab-badge {
  display: inline-block;
  background-color: #e0e7ff;
  color: #3730a3;
  font-size: var(--font-size-xs);
  font-weight: 700;
  padding: 0.2rem 0.5rem;
  border-radius: var(--radius-sm);
  margin-bottom: var(--spacing-xs);
}

.lab-desc {
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  margin: var(--spacing-xs) 0 var(--spacing-md) 0;
}

/* Lab 1 Styles */
.slider-control {
  margin-bottom: var(--spacing-md);
}

.slider-control label {
  display: block;
  font-size: var(--font-size-sm);
  margin-bottom: var(--spacing-xs);
}

.range-input {
  width: 100%;
  max-width: 400px;
}

.preview-area {
  background-color: #f1f5f9;
  border: 2px dashed #cbd5e1;
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  overflow-x: auto;
}

.container-dinamico {
  background: #ffffff;
  border: 1px solid #94a3b8;
  border-radius: var(--radius-sm);
  padding: var(--spacing-sm);
  transition: width 0.15s ease-out;
  margin: 0 auto;
}

.grid-demonstracao {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
  gap: 1rem;
}

.card-demo {
  background-color: #dbeafe;
  color: #1e40af;
  border: 1px solid #93c5fd;
  border-radius: var(--radius-sm);
  padding: var(--spacing-md);
  text-align: center;
  font-size: var(--font-size-sm);
  font-weight: 600;
}

.legenda-lab {
  margin-top: var(--spacing-sm);
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}

/* Lab 2 Styles */
.converter-grid {
  display: flex;
  gap: var(--spacing-md);
  align-items: flex-end;
}

.input-field {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.input-field label {
  font-size: var(--font-size-xs);
  font-weight: 600;
}

.input-text, .select-unit {
  font-family: var(--font-family-body);
  font-size: var(--font-size-base);
  padding: var(--spacing-xs) var(--spacing-sm);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  outline: none;
}

.result-box {
  background-color: #f0fdf4;
  border: 1px solid #86efac;
  border-radius: var(--radius-md);
  padding: var(--spacing-xs) var(--spacing-md);
  display: flex;
  flex-direction: column;
}

.result-label {
  font-size: var(--font-size-xs);
  color: #166534;
  font-weight: 600;
}

.result-value {
  font-size: var(--font-size-xl);
  font-weight: 700;
  color: #15803d;
}

.result-note {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}

/* Lab 3 Styles */
.indicator-box {
  display: flex;
  gap: var(--spacing-xl);
  background: #f8fafc;
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
}

.indicator-metric {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.metric-label {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}

.metric-number {
  font-size: var(--font-size-2xl);
  font-weight: 700;
  color: var(--color-text-primary);
}

.badge-breakpoint {
  display: inline-block;
  padding: var(--spacing-xs) var(--spacing-md);
  border-radius: var(--radius-sm);
  font-weight: 700;
  font-size: var(--font-size-sm);
  width: fit-content;
}

.tag-mobile {
  background-color: #fef3c7;
  color: #92400e;
}

.tag-tablet {
  background-color: #e0e7ff;
  color: #3730a3;
}

.tag-desktop {
  background-color: #dcfce7;
  color: #166534;
}
</style>
