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
  background: rgba(18, 12, 32, 0.82);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 79, 163, 0.32);
  border-radius: var(--radius-2xl);
  padding: var(--spacing-lg);
  box-shadow: 0 16px 45px rgba(0, 0, 0, 0.7), 0 0 25px rgba(255, 79, 163, 0.12);
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
  background: linear-gradient(90deg, #ff4fa3 0%, #a855f7 100%);
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

/* Painel de Controles */
.controls-card {
  background: rgba(10, 7, 20, 0.75);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-xl);
  padding: var(--spacing-lg);
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
  color: #ffffff;
}

.text-neon {
  color: var(--color-primary);
  font-size: 1.15rem;
  font-weight: 800;
  text-shadow: 0 0 10px rgba(255, 79, 163, 0.4);
}

.font-mono {
  font-family: var(--font-family-code);
}

.btn-reset {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: var(--color-text-secondary);
  font-size: var(--font-size-xs);
  padding: 0.3rem 0.75rem;
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.btn-reset:hover {
  color: #ffffff;
  border-color: var(--color-accent);
  box-shadow: var(--shadow-neon-cyan);
}

/* Range Slider */
.range-slider {
  width: 100%;
  height: 0.6rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-full);
  outline: none;
  cursor: pointer;
  accent-color: var(--color-primary);
  margin: 0.75rem 0;
}

/* Botões Preset */
.preset-buttons {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.presets-label {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  margin-right: 0.25rem;
  font-weight: 600;
}

.preset-btn {
  background: rgba(28, 20, 48, 0.75);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: var(--color-text-secondary);
  font-size: var(--font-size-xs);
  font-weight: 600;
  padding: 0.35rem 0.85rem;
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.preset-btn:hover {
  border-color: var(--color-accent);
  color: #ffffff;
  box-shadow: var(--shadow-neon-cyan);
}

.preset-btn.active {
  background: var(--gradient-magenta-pink);
  color: #ffffff;
  border-color: rgba(255, 255, 255, 0.25);
  box-shadow: 0 0 14px rgba(255, 79, 163, 0.5);
}

.preset-highlight {
  border-color: rgba(54, 217, 232, 0.4);
  color: var(--color-accent);
}

/* Status Box */
.status-box {
  background: rgba(14, 10, 24, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-md);
  padding: 0.65rem 0.95rem;
  display: flex;
  align-items: center;
  gap: 0.65rem;
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
}

.status-icon {
  font-size: 1.15rem;
}

/* Área de Pré-visualização com Scroll Suave */
.preview-wrapper {
  background: rgba(8, 5, 16, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-xl);
  padding: var(--spacing-lg);
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
  border: 2px dashed rgba(255, 79, 163, 0.55);
  border-radius: var(--radius-lg);
  padding: var(--spacing-md);
  background: rgba(22, 16, 38, 0.7);
  transition: width 0.1s ease-out;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.6);
}

.container-ruler {
  display: flex;
  justify-content: space-between;
  font-family: var(--font-family-code);
  font-size: 0.7rem;
  color: var(--color-secondary);
  border-bottom: 1px solid rgba(168, 85, 247, 0.3);
  padding-bottom: 0.35rem;
  margin-bottom: var(--spacing-md);
}

.ruler-center {
  color: var(--color-accent);
  font-weight: 700;
  text-shadow: 0 0 8px rgba(54, 217, 232, 0.4);
}

/* Grid Real em Ação */
.demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
  gap: 1rem;
}

.demo-card {
  background: rgba(28, 20, 48, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  transition: all var(--transition-fast);
}

.demo-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.5);
}

.card-tag {
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--color-text-muted);
  letter-spacing: 0.05em;
}

.demo-card h4 {
  font-family: var(--font-family-heading);
  font-size: var(--font-size-base);
  color: #ffffff;
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
