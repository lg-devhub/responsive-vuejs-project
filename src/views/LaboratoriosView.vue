<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useLabsStore } from '../stores/labsStore'
import ResponsiveContainerLab from '../components/labs/ResponsiveContainerLab.vue'
import UnitConverterLab from '../components/labs/UnitConverterLab.vue'
import BreakpointMonitorLab from '../components/labs/BreakpointMonitorLab.vue'

const labsStore = useLabsStore()

// Controle de abas para navegação focada ou visão panorâmica
const abaAtiva = ref('todos') // 'todos', 'lab01', 'lab02', 'lab03'

const definirAba = (aba) => {
  abaAtiva.value = aba
}
</script>

<template>
  <div class="laboratorios-page">
    <!-- Cabeçalho da Página com Temática Vice City -->
    <header class="page-header">
      <div class="header-badge-row">
        <span class="page-badge">🌴 MÓDULO PRÁTICO • LABORATÓRIOS VIRTUAIS</span>
        <span class="badge-status">Pinia Store Reativa</span>
      </div>

      <h1 class="page-title">
        Laboratórios Interativos de Responsividade
      </h1>

      <p class="page-subtitle">
        Espaço de experimentação prática e verificação empírica. Teste o comportamento do CSS Grid sem media queries,
        calibre unidades relativas com contextos de referência reais e acompanhe os breakpoints do navegador em tempo real.
      </p>

      <!-- Barra de Ações Rápidas e Filtro por Aba -->
      <div class="labs-nav-bar">
        <div class="tabs-group" role="tablist" aria-label="Navegar entre laboratórios">
          <button
            type="button"
            role="tab"
            :aria-selected="abaAtiva === 'todos'"
            class="tab-btn"
            :class="{ active: abaAtiva === 'todos' }"
            @click="definirAba('todos')"
          >
            📋 Todos os Labs
          </button>
          <button
            type="button"
            role="tab"
            :aria-selected="abaAtiva === 'lab01'"
            class="tab-btn"
            :class="{ active: abaAtiva === 'lab01' }"
            @click="definirAba('lab01')"
          >
            LAB01 • Container & Grid
          </button>
          <button
            type="button"
            role="tab"
            :aria-selected="abaAtiva === 'lab02'"
            class="tab-btn"
            :class="{ active: abaAtiva === 'lab02' }"
            @click="definirAba('lab02')"
          >
            LAB02 • Conversor CSS
          </button>
          <button
            type="button"
            role="tab"
            :aria-selected="abaAtiva === 'lab03'"
            class="tab-btn"
            :class="{ active: abaAtiva === 'lab03' }"
            @click="definirAba('lab03')"
          >
            LAB03 • Breakpoint Monitor
          </button>
        </div>

        <button
          type="button"
          class="global-reset-btn"
          title="Restaurar todos os laboratórios para os valores padrão"
          @click="labsStore.resetAllLabs"
        >
          ↺ Reset Geral
        </button>
      </div>
    </header>

    <!-- Área de Conteúdo dos Laboratórios -->
    <main class="labs-content">
      <!-- LAB01: Responsive Container -->
      <div v-show="abaAtiva === 'todos' || abaAtiva === 'lab01'" class="lab-wrapper">
        <ResponsiveContainerLab />
      </div>

      <!-- LAB02: CSS Unit Converter -->
      <div v-show="abaAtiva === 'todos' || abaAtiva === 'lab02'" class="lab-wrapper">
        <UnitConverterLab />
      </div>

      <!-- LAB03: Breakpoint Monitor -->
      <div v-show="abaAtiva === 'todos' || abaAtiva === 'lab03'" class="lab-wrapper">
        <BreakpointMonitorLab />
      </div>
    </main>

    <!-- Rodapé de Navegação do Guia -->
    <footer class="labs-footer-nav">
      <div class="nav-card-footer">
        <div class="nav-text">
          <h3>Pronto para testar seus conhecimentos?</h3>
          <p>
            Agora que você experimentou as quebras de colunas e unidades nos laboratórios, resolva o desafio final
            calculando a quebra para 3 colunas!
          </p>
        </div>
        <div class="nav-actions">
          <RouterLink to="/flexbox-grid" class="secondary-link">
            ← Revisar Seção 3 (Flexbox & Grid)
          </RouterLink>
          <RouterLink to="/desafio" class="btn btn-primary">
            Acessar o Desafio Final →
          </RouterLink>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.laboratorios-page {
  width: 100%;
}

/* Cabeçalho */
.page-header {
  margin-bottom: var(--spacing-xl);
}

.header-badge-row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
  align-items: center;
  margin-bottom: var(--spacing-sm);
}

.page-badge {
  display: inline-block;
  background: rgba(255, 79, 163, 0.15);
  color: var(--color-primary);
  border: 1px solid rgba(255, 79, 163, 0.4);
  font-size: var(--font-size-xs);
  font-weight: 700;
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-full);
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.badge-status {
  display: inline-block;
  background: rgba(168, 85, 247, 0.15);
  color: #c084fc;
  border: 1px solid rgba(168, 85, 247, 0.3);
  font-size: var(--font-size-xs);
  font-weight: 600;
  padding: 0.25rem 0.65rem;
  border-radius: var(--radius-full);
}

.page-title {
  font-size: var(--font-size-3xl);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-sm);
  line-height: 1.2;
}

@media (min-width: 48rem) {
  .page-title {
    font-size: var(--font-size-4xl);
  }
}

.page-subtitle {
  color: var(--color-text-secondary);
  font-size: var(--font-size-base);
  max-width: 54rem;
  line-height: 1.6;
  margin-bottom: var(--spacing-lg);
}

/* Barra de Abas e Ações Rápidas */
.labs-nav-bar {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--spacing-xs) var(--spacing-sm);
}

@media (min-width: 48rem) {
  .labs-nav-bar {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}

.tabs-group {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.tab-btn {
  background: transparent;
  border: none;
  color: var(--color-text-muted);
  font-size: var(--font-size-xs);
  font-weight: 600;
  padding: 0.45rem 0.8rem;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.tab-btn:hover {
  color: var(--color-text-primary);
  background: rgba(255, 255, 255, 0.05);
}

.tab-btn.active {
  background: var(--color-surface-light);
  color: var(--color-accent);
  box-shadow: 0 0 10px rgba(54, 217, 232, 0.25);
  font-weight: 700;
}

.global-reset-btn {
  background: transparent;
  border: 1px dashed var(--color-border);
  color: var(--color-text-muted);
  font-size: var(--font-size-xs);
  padding: 0.4rem 0.8rem;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all var(--transition-fast);
  white-space: nowrap;
  width: fit-content;
}

.global-reset-btn:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

/* Conteúdo */
.labs-content {
  display: flex;
  flex-direction: column;
}

.lab-wrapper {
  margin-bottom: var(--spacing-lg);
}

/* Rodapé dos Laboratórios */
.labs-footer-nav {
  margin-top: var(--spacing-xl);
  margin-bottom: var(--spacing-2xl);
}

.nav-card-footer {
  background: linear-gradient(135deg, rgba(28, 21, 48, 0.9) 0%, rgba(42, 32, 66, 0.7) 100%);
  border: 1px solid var(--color-border);
  border-left: 4px solid var(--color-primary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  box-shadow: var(--shadow-md);
}

@media (min-width: 48rem) {
  .nav-card-footer {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: var(--spacing-xl);
  }
}

.nav-text h3 {
  font-size: var(--font-size-lg);
  color: var(--color-text-primary);
  margin-bottom: 0.3rem;
}

.nav-text p {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: 1.5;
  max-width: 38rem;
}

.nav-actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  align-items: stretch;
}

@media (min-width: 36rem) {
  .nav-actions {
    flex-direction: row;
    align-items: center;
  }
}

.secondary-link {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  text-decoration: none;
  padding: 0.6rem 1rem;
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
  text-align: center;
}

.secondary-link:hover {
  color: var(--color-accent);
  background: rgba(255, 255, 255, 0.05);
}

.btn-primary {
  background: var(--gradient-sunset);
  color: #ffffff;
  font-weight: 700;
  font-size: var(--font-size-sm);
  padding: 0.65rem 1.25rem;
  border-radius: var(--radius-md);
  text-decoration: none;
  text-align: center;
  box-shadow: 0 0 15px rgba(255, 79, 163, 0.4);
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 20px rgba(255, 79, 163, 0.6);
  text-decoration: none;
}
</style>
