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
  background: rgba(18, 12, 32, 0.82);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 79, 163, 0.32);
  border-radius: var(--radius-2xl);
  padding: var(--spacing-xl);
  box-shadow: 0 16px 45px rgba(0, 0, 0, 0.7), 0 0 25px rgba(255, 79, 163, 0.12);
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
  background: linear-gradient(90deg, #ff4fa3 0%, #a855f7 50%, #36d9e8 100%);
}

.tag-row {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  flex-wrap: wrap;
}

.hero-title {
  font-family: var(--font-family-heading);
  font-size: var(--font-size-2xl);
  font-weight: 800;
  color: #ffffff;
  line-height: 1.2;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.6);
}

@media (min-width: 48rem) {
  .hero-title {
    font-size: 2.25rem;
  }
}

.hero-desc {
  font-size: var(--font-size-base);
  color: #e2d9f3;
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
  background: rgba(28, 20, 48, 0.75);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  color: var(--color-text-secondary);
  padding: 0.45rem 0.95rem;
  border-radius: var(--radius-full);
  font-size: var(--font-size-xs);
  font-weight: 600;
  text-decoration: none;
  transition: all var(--transition-fast);
}

.lab-nav-pill:hover {
  border-color: var(--color-accent);
  color: #ffffff;
  box-shadow: var(--shadow-neon-cyan);
  transform: translateY(-2px);
  text-decoration: none;
}

.pill-num {
  font-family: var(--font-family-code);
  font-size: 0.7rem;
  font-weight: 800;
  color: var(--color-accent);
  background: rgba(54, 217, 232, 0.15);
  padding: 0.15rem 0.45rem;
  border-radius: var(--radius-sm);
}

/* Seção LAB03 Overview */
.lab-block {
  background: rgba(18, 12, 32, 0.82);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(54, 217, 232, 0.3);
  border-radius: var(--radius-2xl);
  padding: var(--spacing-lg);
  box-shadow: 0 16px 45px rgba(0, 0, 0, 0.7), 0 0 20px rgba(54, 217, 232, 0.12);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  position: relative;
  overflow: hidden;
}

.lab-block::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, #36d9e8 0%, #a855f7 100%);
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
  font-family: var(--font-family-heading);
  font-size: 1.35rem;
  font-weight: 800;
  color: #ffffff;
}

.lab-desc {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.monitor-demo-card {
  background: rgba(10, 7, 20, 0.75);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-xl);
  padding: var(--spacing-lg);
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
    gap: var(--spacing-md);
  }
}

.metric-box {
  background: rgba(20, 14, 34, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-lg);
  padding: var(--spacing-md);
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.metric-label {
  font-size: 0.65rem;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 600;
}

.metric-val {
  font-size: 1.25rem;
  font-weight: 800;
}

.font-mono {
  font-family: var(--font-family-code);
}

.text-cyan { color: var(--color-accent); text-shadow: 0 0 10px rgba(54, 217, 232, 0.35); }
.text-purple { color: var(--color-secondary); text-shadow: 0 0 10px rgba(168, 85, 247, 0.35); }
.text-pink { color: var(--color-primary); text-shadow: 0 0 10px rgba(255, 79, 163, 0.35); }

.monitor-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-md);
  flex-wrap: wrap;
  border-top: 1px dashed rgba(255, 255, 255, 0.1);
  padding-top: var(--spacing-md);
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
  padding: 0.45rem 0.95rem;
  min-height: auto;
  border-radius: var(--radius-full);
}

/* Callout para a missão final */
.mission-callout {
  background: rgba(20, 14, 34, 0.82);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 79, 163, 0.35);
  border-radius: var(--radius-2xl);
  padding: var(--spacing-xl);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-lg);
  flex-wrap: wrap;
  box-shadow: 0 16px 45px rgba(0, 0, 0, 0.7), 0 0 25px rgba(255, 79, 163, 0.15);
}

.callout-content {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  flex: 1;
  min-width: 16rem;
}

.callout-content h3 {
  font-family: var(--font-family-heading);
  font-size: 1.35rem;
  font-weight: 800;
  color: #ffffff;
}

.callout-content p {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}
</style>
