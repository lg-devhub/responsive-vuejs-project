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
  background: rgba(14, 10, 24, 0.92);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 79, 163, 0.35);
  border-radius: var(--radius-lg);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.7), 0 0 18px rgba(255, 79, 163, 0.2);
  font-size: var(--font-size-xs);
  color: var(--color-text-primary);
  min-width: 14rem;
  max-width: 18rem;
  transition: all var(--transition-normal);
  user-select: none;
  overflow: hidden;
}

.breakpoint-monitor:hover {
  border-color: var(--color-accent);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.7), 0 0 20px rgba(54, 217, 232, 0.25);
}

.breakpoint-monitor.is-minimized {
  min-width: auto;
}

.monitor-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.55rem 0.85rem;
  cursor: pointer;
  background: rgba(28, 20, 48, 0.8);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.monitor-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-family-heading);
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #ffffff;
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
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--color-text-muted);
  font-size: 0.65rem;
  cursor: pointer;
  padding: 0.2rem 0.45rem;
  border-radius: var(--radius-sm);
  transition: all var(--transition-fast);
}

.toggle-btn:hover {
  color: #ffffff;
  border-color: var(--color-accent);
}

.monitor-body {
  padding: 0.85rem;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}

.metric-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.metric-label {
  color: var(--color-text-muted);
  font-size: 0.75rem;
  font-weight: 600;
}

.metric-value {
  font-weight: 800;
  color: var(--color-accent);
  text-shadow: 0 0 8px rgba(54, 217, 232, 0.35);
}

.font-mono {
  font-family: var(--font-family-code);
}

.monitor-desc {
  font-size: 0.7rem;
  color: var(--color-text-secondary);
  border-top: 1px dashed rgba(255, 255, 255, 0.1);
  padding-top: 0.45rem;
  margin-top: 0.25rem;
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
