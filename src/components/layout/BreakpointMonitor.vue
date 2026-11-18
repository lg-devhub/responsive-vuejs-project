<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useViewportStore } from '../../stores/viewportStore'

const viewportStore = useViewportStore()

onMounted(() => {
  viewportStore.init()
})

onUnmounted(() => {
  viewportStore.cleanup()
})
</script>

<template>
  <aside
    class="breakpoint-monitor"
    :class="{ 'is-minimized': viewportStore.isMinimized }"
    aria-label="LAB03 — Monitor de Breakpoint em Tempo Real"
  >
    <div class="monitor-header" @click="viewportStore.toggleMinimize">
      <div class="monitor-title">
        <span class="live-pulse"></span>
        <span class="title-text">LAB03 • Breakpoint</span>
      </div>
      <button
        class="toggle-btn"
        :aria-label="viewportStore.isMinimized ? 'Expandir monitor' : 'Minimizar monitor'"
        type="button"
      >
        {{ viewportStore.isMinimized ? '▲' : '▼' }}
      </button>
    </div>

    <!-- Conteúdo visível quando não minimizado -->
    <div v-show="!viewportStore.isMinimized" class="monitor-body">
      <div class="metric-row">
        <span class="metric-label">Largura Atual:</span>
        <span class="metric-value font-mono">{{ viewportStore.width }}px</span>
      </div>

      <div class="metric-row">
        <span class="metric-label">Breakpoint:</span>
        <span class="badge" :class="viewportStore.activeBreakpoint.tagClass">
          {{ viewportStore.activeBreakpoint.short }}
        </span>
      </div>

      <div class="monitor-desc">
        {{ viewportStore.activeBreakpoint.name }}
      </div>
    </div>
  </aside>
</template>

<style scoped>
.breakpoint-monitor {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  z-index: 999;
  background: rgba(28, 21, 48, 0.92);
  backdrop-filter: blur(10px);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg), 0 0 12px rgba(168, 85, 247, 0.25);
  font-size: var(--font-size-xs);
  color: var(--color-text-primary);
  min-width: 13rem;
  max-width: 18rem;
  transition: all var(--transition-normal);
  user-select: none;
}

.breakpoint-monitor:hover {
  border-color: var(--color-secondary);
}

.breakpoint-monitor.is-minimized {
  min-width: auto;
}

.monitor-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0.75rem;
  cursor: pointer;
  background: rgba(42, 32, 66, 0.6);
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
}

.monitor-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-family-heading);
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--color-text-primary);
}

.live-pulse {
  width: 0.5rem;
  height: 0.5rem;
  background-color: var(--color-accent);
  border-radius: 50%;
  box-shadow: 0 0 8px var(--color-accent);
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(0.85); }
}

.toggle-btn {
  background: transparent;
  border: none;
  color: var(--color-text-muted);
  font-size: 0.7rem;
  cursor: pointer;
  padding: 0.2rem 0.4rem;
  border-radius: var(--radius-sm);
  transition: color var(--transition-fast);
}

.toggle-btn:hover {
  color: var(--color-text-primary);
}

.monitor-body {
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.metric-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.metric-label {
  color: var(--color-text-muted);
}

.metric-value {
  font-weight: 700;
  color: var(--color-accent);
}

.font-mono {
  font-family: var(--font-family-code);
}

.monitor-desc {
  font-size: 0.7rem;
  color: var(--color-text-secondary);
  border-top: 1px dashed var(--color-border);
  padding-top: 0.4rem;
  margin-top: 0.2rem;
  text-align: center;
}

/* Em telas muito estreitas, mantém compacto */
@media (max-width: 30rem) {
  .breakpoint-monitor {
    bottom: 0.5rem;
    right: 0.5rem;
  }
}
</style>
