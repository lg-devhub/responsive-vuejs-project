<script setup>
import { useLabsStore } from '../../stores/labsStore'

const labsStore = useLabsStore()

const setPresetWidth = (width) => {
  labsStore.containerWidth = width
}
</script>

<template>
  <div class="lab-block" id="lab01">
    <div class="lab-header">
      <div class="tag-row">
        <span class="badge badge-pink">LAB01 • Interativo</span>
        <span class="badge" :class="labsStore.columnStatus.badgeClass">
          {{ labsStore.columnStatus.label }}
        </span>
      </div>
      <h3 class="lab-title">Controle Deslizante: Largura de Contêiner & Grid</h3>
      <p class="lab-desc">
        Arraste a barra para alterar a largura do contêiner abaixo em tempo real. Observe como o CSS Grid com
        <code>repeat(auto-fit, minmax(14rem, 1fr))</code> e <code>gap: 1rem</code> reorganiza as colunas de forma fluida sem nenhuma media query!
      </p>
    </div>

    <!-- Controles do Slider e Atalhos -->
    <div class="controls-card">
      <div class="slider-header">
        <label for="slider-container" class="slider-label">
          Largura do Contêiner: <strong class="font-mono text-neon">{{ labsStore.containerWidth }}px</strong>
        </label>
        <button
          class="btn-reset"
          type="button"
          @click="labsStore.resetContainerWidth"
          title="Resetar para 600px"
        >
          ↺ Resetar
        </button>
      </div>

      <input
        id="slider-container"
        v-model.number="labsStore.containerWidth"
        type="range"
        min="300"
        max="900"
        step="2"
        class="range-slider"
        aria-label="Controle deslizante de largura do contêiner"
      />

      <!-- Botões de Atalho para Limiares Críticos -->
      <div class="preset-buttons">
        <span class="presets-label">Atalhos estratégicos:</span>
        <button
          type="button"
          class="preset-btn"
          :class="{ active: labsStore.containerWidth === 360 }"
          @click="setPresetWidth(360)"
        >
          360px (1 Col)
        </button>
        <button
          type="button"
          class="preset-btn preset-highlight"
          :class="{ active: labsStore.containerWidth === 464 }"
          @click="setPresetWidth(464)"
        >
          ★ 464px (Limiar 2 Col)
        </button>
        <button
          type="button"
          class="preset-btn preset-highlight"
          :class="{ active: labsStore.containerWidth === 704 }"
          @click="setPresetWidth(704)"
        >
          ★ 704px (Limiar 3 Col)
        </button>
        <button
          type="button"
          class="preset-btn"
          :class="{ active: labsStore.containerWidth === 800 }"
          @click="setPresetWidth(800)"
        >
          800px (Desktop)
        </button>
      </div>

      <!-- Feedback de Estado em Tempo Real (RF12) -->
      <div class="status-box">
        <span class="status-icon">💡</span>
        <span class="status-text">{{ labsStore.columnStatus.desc }}</span>
      </div>
    </div>

    <!-- Área de Visualização Interativa do Grid -->
    <div class="preview-wrapper">
      <div class="preview-scroll">
        <div
          class="dynamic-container"
          :style="{ width: labsStore.containerWidth + 'px' }"
        >
          <div class="container-ruler">
            <span>0px</span>
            <span class="ruler-center">Largura: {{ labsStore.containerWidth }}px</span>
            <span>{{ labsStore.containerWidth }}px</span>
          </div>

          <div class="demo-grid">
            <div class="demo-card card-neon-1">
              <span class="card-tag">Distrito 01</span>
              <h4>Ocean Beach</h4>
              <p>min 14rem (224px) • expande em 1fr</p>
            </div>

            <div class="demo-card card-neon-2">
              <span class="card-tag">Distrito 02</span>
              <h4>Vice Point</h4>
              <p>min 14rem (224px) • expande em 1fr</p>
            </div>

            <div class="demo-card card-neon-3">
              <span class="card-tag">Distrito 03</span>
              <h4>Downtown</h4>
              <p>min 14rem (224px) • expande em 1fr</p>
            </div>

            <div class="demo-card card-neon-4">
              <span class="card-tag">Distrito 04</span>
              <h4>Starfish Island</h4>
              <p>min 14rem (224px) • expande em 1fr</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
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

.tag-row {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  flex-wrap: wrap;
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

/* Painel de Controles */
.controls-card {
  background: var(--color-surface-light);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--spacing-md);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.slider-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
}

.slider-label {
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
}

.text-neon {
  color: var(--color-accent);
  font-size: var(--font-size-base);
}

.font-mono {
  font-family: var(--font-family-code);
}

.btn-reset {
  background: transparent;
  border: 1px solid var(--color-border);
  color: var(--color-text-muted);
  font-size: var(--font-size-xs);
  padding: 0.2rem 0.5rem;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.btn-reset:hover {
  color: var(--color-text-primary);
  border-color: var(--color-accent);
}

/* Range Slider */
.range-slider {
  width: 100%;
  height: 0.5rem;
  background: var(--color-bg);
  border-radius: var(--radius-full);
  outline: none;
  cursor: pointer;
  accent-color: var(--color-primary);
  margin: 0.5rem 0;
}

/* Botões Preset */
.preset-buttons {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  flex-wrap: wrap;
}

.presets-label {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  margin-right: 0.25rem;
}

.preset-btn {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  color: var(--color-text-secondary);
  font-size: var(--font-size-xs);
  padding: 0.25rem 0.6rem;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.preset-btn:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
}

.preset-btn.active {
  background: var(--color-primary);
  color: #ffffff;
  border-color: var(--color-primary);
  box-shadow: 0 0 10px rgba(255, 79, 163, 0.4);
}

.preset-highlight {
  border-color: rgba(54, 217, 232, 0.4);
  color: var(--color-accent);
}

/* Status Box */
.status-box {
  background: rgba(16, 13, 28, 0.8);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 0.5rem 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
}

.status-icon {
  font-size: 1rem;
}

/* Área de Pré-visualização com Scroll Suave */
.preview-wrapper {
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--spacing-md);
  overflow: hidden;
}

.preview-scroll {
  width: 100%;
  overflow-x: auto;
  padding-bottom: 0.5rem;
}

.dynamic-container {
  min-width: 300px;
  max-width: none;
  margin: 0 auto;
  border: 2px dashed rgba(168, 85, 247, 0.5);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
  background: rgba(28, 21, 48, 0.6);
  transition: width 0.1s ease-out;
}

.container-ruler {
  display: flex;
  justify-content: space-between;
  font-family: var(--font-family-code);
  font-size: 0.7rem;
  color: var(--color-secondary);
  border-bottom: 1px solid rgba(168, 85, 247, 0.3);
  padding-bottom: 0.25rem;
  margin-bottom: var(--spacing-md);
}

.ruler-center {
  color: var(--color-accent);
  font-weight: 700;
}

/* Grid Real em Ação */
.demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
  gap: 1rem;
}

.demo-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  transition: all var(--transition-fast);
}

.demo-card:hover {
  transform: translateY(-2px);
}

.card-tag {
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--color-text-muted);
  letter-spacing: 0.05em;
}

.demo-card h4 {
  font-size: var(--font-size-base);
  color: var(--color-text-primary);
}

.demo-card p {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  font-family: var(--font-family-code);
}

.card-neon-1 { border-top: 3px solid var(--color-primary); }
.card-neon-2 { border-top: 3px solid var(--color-secondary); }
.card-neon-3 { border-top: 3px solid var(--color-accent); }
.card-neon-4 { border-top: 3px solid var(--color-warning); }
</style>
