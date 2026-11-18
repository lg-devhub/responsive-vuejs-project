<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useViewportStore } from '../../stores/viewportStore'

const viewportStore = useViewportStore()

onMounted(() => {
  viewportStore.init()
})

onUnmounted(() => {
  // O cleanup pode ser deixado a cargo do layout ou do store global
})
</script>

<template>
  <section class="lab-card" aria-labelledby="lab03-title">
    <div class="lab-header">
      <div class="lab-badge-row">
        <span class="lab-badge">LAB03 • BREAKPOINT MONITOR</span>
        <span class="badge" :class="viewportStore.activeBreakpoint.tagClass">
          {{ viewportStore.activeBreakpoint.name }}
        </span>
      </div>
      <h2 id="lab03-title" class="lab-title">
        Monitor de Breakpoints & Redimensionamento de Janela
      </h2>
      <p class="lab-description">
        Este laboratório está sincronizado em tempo real com o tamanho do seu navegador através da store global do Pinia
        (<code>viewportStore.js</code>). Redimensione a janela ou gire o dispositivo móvel para observar as métricas e a
        faixa de breakpoint alterando instantaneamente.
      </p>
    </div>

    <!-- Indicador Principal de Largura e Breakpoint -->
    <div class="monitor-dashboard">
      <div class="metric-display-card">
        <span class="metric-caption">Largura da Janela do Navegador</span>
        <div class="metric-number-row">
          <span class="metric-val">{{ viewportStore.width }}</span>
          <span class="metric-unit">px</span>
        </div>
        <span class="metric-rem-equiv font-mono">
          Equivalente a {{ (viewportStore.width / 16).toFixed(1) }}rem (base 16px)
        </span>
      </div>

      <div class="metric-display-card">
        <span class="metric-caption">Altura da Janela (Viewport Height)</span>
        <div class="metric-number-row">
          <span class="metric-val text-cyan">{{ viewportStore.height }}</span>
          <span class="metric-unit">px</span>
        </div>
        <span class="metric-rem-equiv font-mono">
          100dvh = {{ viewportStore.height }}px (altura dinâmica)
        </span>
      </div>

      <div class="metric-display-card highlight-card">
        <span class="metric-caption">Breakpoint Ativo Detectado</span>
        <div class="active-badge-large" :class="viewportStore.activeBreakpoint.tagClass">
          <span class="live-dot"></span>
          {{ viewportStore.activeBreakpoint.name }}
        </div>
        <span class="metric-rem-equiv">
          {{ viewportStore.activeBreakpoint.description }}
        </span>
      </div>
    </div>

    <!-- Tabela Comparativa de Breakpoints Oficiais do Projeto -->
    <div class="breakpoints-table-wrapper">
      <h4 class="table-title">📐 Escala de Breakpoints Mobile-First do Projeto:</h4>
      <div class="table-responsive">
        <table class="bp-table">
          <thead>
            <tr>
              <th>Status</th>
              <th>Breakpoint</th>
              <th>Faixa em Pixels</th>
              <th>Em Unidades Relativas (rem)</th>
              <th>Media Query Recomendada</th>
            </tr>
          </thead>
          <tbody>
            <tr :class="{ 'row-active': viewportStore.isMobile }">
              <td>
                <span v-if="viewportStore.isMobile" class="pulse-active">● ATIVO</span>
                <span v-else class="inactive-label">—</span>
              </td>
              <td><strong>Mobile (SM)</strong></td>
              <td>&lt; 640px</td>
              <td>&lt; 40rem</td>
              <td><code>CSS Padrão (Sem Media Query)</code></td>
            </tr>
            <tr :class="{ 'row-active': viewportStore.isTablet }">
              <td>
                <span v-if="viewportStore.isTablet" class="pulse-active">● ATIVO</span>
                <span v-else class="inactive-label">—</span>
              </td>
              <td><strong>Tablet (MD)</strong></td>
              <td>640px a 1023px</td>
              <td>40rem a 63.9375rem</td>
              <td><code>@media (min-width: 40rem)</code></td>
            </tr>
            <tr :class="{ 'row-active': viewportStore.isDesktop }">
              <td>
                <span v-if="viewportStore.isDesktop" class="pulse-active">● ATIVO</span>
                <span v-else class="inactive-label">—</span>
              </td>
              <td><strong>Desktop (LG / XL)</strong></td>
              <td>≥ 1024px</td>
              <td>≥ 64rem</td>
              <td><code>@media (min-width: 64rem)</code></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Caixa Didática: Por que min-width? -->
    <div class="didactic-box">
      <div class="didactic-header">
        <span class="didactic-icon">💡</span>
        <strong>A Regra de Ouro do Mobile-First:</strong>
      </div>
      <p>
        Note que o breakpoint <strong>Mobile (SM)</strong> não possui media query! Todo o CSS base é escrito
        nativamente para dispositivos móveis, e as media queries <code>@media (min-width: ...)</code> entram apenas
        para expandir e aprimorar o layout conforme a tela cresce. Isso evita sobrecarga de regras em celulares e
        elimina código CSS redundante.
      </p>
    </div>
  </section>
</template>

<style scoped>
.lab-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
  box-shadow: var(--shadow-md);
}

@media (min-width: 48rem) {
  .lab-card {
    padding: var(--spacing-xl);
  }
}

.lab-header {
  margin-bottom: var(--spacing-lg);
}

.lab-badge-row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
  align-items: center;
  margin-bottom: var(--spacing-sm);
}

.lab-badge {
  display: inline-block;
  background: rgba(16, 185, 129, 0.2);
  color: #34d399;
  border: 1px solid rgba(16, 185, 129, 0.4);
  font-size: var(--font-size-xs);
  font-weight: 700;
  padding: 0.25rem 0.65rem;
  border-radius: var(--radius-full);
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.lab-title {
  font-size: var(--font-size-xl);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-xs);
  line-height: 1.3;
}

@media (min-width: 48rem) {
  .lab-title {
    font-size: var(--font-size-2xl);
  }
}

.lab-description {
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  line-height: 1.6;
}

/* Dashboard de Métricas */
.monitor-dashboard {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
}

@media (min-width: 48rem) {
  .monitor-dashboard {
    grid-template-columns: repeat(3, 1fr);
  }
}

.metric-display-card {
  background: var(--color-surface-muted);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.metric-display-card.highlight-card {
  border-color: var(--color-secondary);
  background: rgba(42, 32, 66, 0.5);
  box-shadow: 0 0 15px rgba(168, 85, 247, 0.15);
}

.metric-caption {
  font-size: 0.75rem;
  color: var(--color-text-muted);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.metric-number-row {
  display: flex;
  align-items: baseline;
  gap: 0.3rem;
}

.metric-val {
  font-size: var(--font-size-3xl);
  font-weight: 800;
  font-family: var(--font-family-code);
  color: var(--color-primary);
  line-height: 1;
}

.metric-val.text-cyan {
  color: var(--color-accent);
}

.metric-unit {
  font-size: var(--font-size-base);
  font-weight: 700;
  color: var(--color-text-secondary);
}

.metric-rem-equiv {
  font-size: 0.75rem;
  color: var(--color-text-secondary);
}

.font-mono {
  font-family: var(--font-family-code);
}

.active-badge-large {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: var(--font-size-sm);
  font-weight: 700;
  padding: 0.4rem 0.8rem;
  border-radius: var(--radius-sm);
  width: fit-content;
  margin: 0.2rem 0;
}

.live-dot {
  width: 0.6rem;
  height: 0.6rem;
  background-color: currentColor;
  border-radius: 50%;
  animation: pulse-dot 1.2s infinite;
}

@keyframes pulse-dot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.3; transform: scale(0.8); }
}

/* Tabela de Breakpoints */
.breakpoints-table-wrapper {
  background: #0c0915;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
}

.table-title {
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-sm);
}

.table-responsive {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.bp-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: var(--font-size-xs);
}

.bp-table th {
  background: var(--color-surface-light);
  color: var(--color-text-muted);
  font-weight: 600;
  padding: 0.5rem 0.75rem;
  border-bottom: 1px solid var(--color-border);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-size: 0.7rem;
}

.bp-table td {
  padding: 0.65rem 0.75rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  color: var(--color-text-secondary);
}

.bp-table tr.row-active {
  background: rgba(255, 79, 163, 0.12);
  color: #ffffff;
}

.bp-table tr.row-active td {
  color: #ffffff;
  border-bottom-color: rgba(255, 79, 163, 0.3);
}

.pulse-active {
  color: #ff4fa3;
  font-weight: 700;
  font-size: 0.7rem;
  letter-spacing: 0.05em;
}

.inactive-label {
  color: var(--color-text-muted);
}

.bp-table code {
  color: var(--color-accent);
  background: rgba(0, 0, 0, 0.3);
  font-size: 0.7rem;
}

/* Caixa Didática */
.didactic-box {
  background: rgba(28, 21, 48, 0.8);
  border: 1px solid var(--color-border);
  border-left: 3px solid var(--color-accent);
  border-radius: var(--radius-sm);
  padding: var(--spacing-md);
}

.didactic-header {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-xs);
}

.didactic-icon {
  font-size: 1rem;
}

.didactic-box p {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  line-height: 1.5;
}
</style>
