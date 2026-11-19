<script setup>
import { RouterLink } from 'vue-router'
import { useViewportStore } from '../stores/viewportStore'
import ResponsiveContainerLab from '../components/labs/ResponsiveContainerLab.vue'
import UnitConverterLab from '../components/labs/UnitConverterLab.vue'

const viewportStore = useViewportStore()
</script>

<template>
  <div class="labs-view">
    <!-- Cabeçalho Principal dos Laboratórios -->
    <header class="labs-hero">
      <div class="tag-row">
        <span class="badge badge-pink">Vice City Lab Suite</span>
        <span class="badge badge-cyan">3 Demonstrações Interativas</span>
      </div>
      <h1 class="hero-title">Laboratórios Interativos de Responsividade</h1>
      <p class="hero-desc">
        Experimente na prática os conceitos fundamentais de CSS e layout adaptável. Modifique os controles deslizantes, converta unidades com contextos reais e observe a quebra de colunas e breakpoints acontecendo em tempo real.
      </p>

      <!-- Atalhos de Navegação Rápida entre Laboratórios -->
      <nav class="lab-nav" aria-label="Atalhos dos Laboratórios">
        <a href="#lab01" class="lab-nav-pill">
          <span class="pill-num">01</span>
          <span>Responsive Container</span>
        </a>
        <a href="#lab02" class="lab-nav-pill">
          <span class="pill-num">02</span>
          <span>Unit Converter</span>
        </a>
        <a href="#lab03-overview" class="lab-nav-pill">
          <span class="pill-num">03</span>
          <span>Breakpoint Monitor</span>
        </a>
      </nav>
    </header>

    <!-- LAB 01: Responsive Container -->
    <ResponsiveContainerLab />

    <!-- LAB 02: CSS Unit Converter -->
    <UnitConverterLab />

    <!-- LAB 03: Explicação e Painel do Breakpoint Monitor Fixo -->
    <section class="lab-block" id="lab03-overview">
      <div class="lab-header">
        <div class="tag-row">
          <span class="badge badge-purple">LAB03 • Global & Fixo</span>
          <span class="badge" :class="viewportStore.activeBreakpoint.tagClass">
            Ativo: {{ viewportStore.activeBreakpoint.short }}
          </span>
        </div>
        <h3 class="lab-title">LAB03: Breakpoint Monitor em Tempo Real</h3>
        <p class="lab-desc">
          Conforme exigido no ERS, o Breakpoint Monitor é um <strong>indicador fixo na interface</strong> que acompanha toda a sua navegação pela aplicação (visível no canto inferior direito da tela).
        </p>
      </div>

      <div class="monitor-demo-card">
        <div class="demo-metrics">
          <div class="metric-box">
            <span class="metric-label">Largura Atual da Janela</span>
            <span class="metric-val font-mono text-cyan">{{ viewportStore.width }}px</span>
          </div>

          <div class="metric-box">
            <span class="metric-label">Altura Atual da Janela</span>
            <span class="metric-val font-mono text-purple">{{ viewportStore.height }}px</span>
          </div>

          <div class="metric-box">
            <span class="metric-label">Breakpoint Detectado</span>
            <span class="metric-val text-pink">{{ viewportStore.activeBreakpoint.name }}</span>
          </div>
        </div>

        <div class="monitor-info">
          <p>
            <strong>Como testar:</strong> Redimensione a janela do seu navegador ou abra as Ferramentas de Desenvolvedor (F12) e ative a barra de emulação de dispositivos (Ctrl+Shift+M). Os valores e breakpoints se atualizam instantaneamente via Pinia!
          </p>
          <button
            type="button"
            class="btn btn-secondary btn-sm"
            @click="viewportStore.toggleMinimize"
          >
            {{ viewportStore.isMinimized ? '▲ Abrir Widget Fixo' : '▼ Minimizar Widget Fixo' }}
          </button>
        </div>
      </div>
    </section>

    <!-- Chamada para a Próxima Missão (Desafio Final) -->
    <div class="mission-callout">
      <div class="callout-content">
        <span class="badge badge-pink">Próxima Etapa</span>
        <h3>Pronto para testar seus conhecimentos?</h3>
        <p>
          Aplique os cálculos e observações destes laboratórios para desvendar a pergunta do Desafio Final.
        </p>
      </div>
      <RouterLink to="/desafio" class="btn">
        Ir para o Desafio Final (🎯)
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.labs-view {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
}

.labs-hero {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-lg);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  position: relative;
  overflow: hidden;
}

.labs-hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--gradient-sunset);
}

.tag-row {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  flex-wrap: wrap;
}

.hero-title {
  font-size: var(--font-size-2xl);
  color: var(--color-text-primary);
  line-height: 1.2;
}

@media (min-width: 48rem) {
  .hero-title {
    font-size: var(--font-size-3xl);
  }
}

.hero-desc {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  line-height: 1.7;
}

/* Pílulas de Navegação Rápida */
.lab-nav {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  flex-wrap: wrap;
  margin-top: var(--spacing-xs);
}

.lab-nav-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--color-surface-light);
  border: 1px solid var(--color-border);
  color: var(--color-text-primary);
  padding: 0.4rem 0.8rem;
  border-radius: var(--radius-full);
  font-size: var(--font-size-xs);
  font-weight: 600;
  text-decoration: none;
  transition: all var(--transition-fast);
}

.lab-nav-pill:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
  transform: translateY(-2px);
  text-decoration: none;
}

.pill-num {
  font-family: var(--font-family-code);
  font-size: 0.65rem;
  color: var(--color-accent);
  background: rgba(54, 217, 232, 0.12);
  padding: 0.1rem 0.35rem;
  border-radius: var(--radius-sm);
}

/* Seção LAB03 Overview */
.lab-block {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-lg);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

@media (min-width: 48rem) {
  .lab-block {
    padding: var(--spacing-xl);
  }
}

.lab-header {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.lab-title {
  font-size: var(--font-size-xl);
  color: var(--color-text-primary);
}

.lab-desc {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.monitor-demo-card {
  background: var(--color-surface-light);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--spacing-md);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.demo-metrics {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-sm);
}

@media (min-width: 48rem) {
  .demo-metrics {
    grid-template-columns: repeat(3, 1fr);
  }
}

.metric-box {
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.metric-label {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  text-transform: uppercase;
}

.metric-val {
  font-size: var(--font-size-lg);
  font-weight: 700;
}

.font-mono {
  font-family: var(--font-family-code);
}

.text-cyan { color: var(--color-accent); }
.text-purple { color: var(--color-secondary); }
.text-pink { color: var(--color-primary); }

.monitor-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-md);
  flex-wrap: wrap;
  border-top: 1px dashed var(--color-border);
  padding-top: var(--spacing-sm);
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.monitor-info p {
  flex: 1;
  min-width: 16rem;
}

.btn-sm {
  font-size: var(--font-size-xs);
  padding: 0.35rem 0.75rem;
  min-height: auto;
}

/* Callout para a missão final */
.mission-callout {
  background: linear-gradient(135deg, rgba(255, 79, 163, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%);
  border: 1px solid rgba(255, 79, 163, 0.3);
  border-radius: var(--radius-xl);
  padding: var(--spacing-xl);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-lg);
  flex-wrap: wrap;
}

.callout-content {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  flex: 1;
  min-width: 16rem;
}

.callout-content h3 {
  font-size: var(--font-size-xl);
  color: var(--color-text-primary);
}

.callout-content p {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}
</style>
