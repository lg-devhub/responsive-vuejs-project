<script setup>
import { useLabsStore } from '../../stores/labsStore'

const labsStore = useLabsStore()

// Presets didáticos para experimentação rápida
const presets = [
  { label: '📱 Mobile (380px)', width: 380, desc: '1 coluna' },
  { label: '★ Limiar Exato (464px)', width: 464, desc: '2ª coluna surge' },
  { label: '💻 Tablet (600px)', width: 600, desc: '2 colunas fluidas' },
  { label: '🚀 Desktop (740px)', width: 740, desc: '3ª coluna surge' }
]

const aplicarPreset = (largura) => {
  labsStore.setContainerWidth(largura)
}
</script>

<template>
  <section class="lab-card" aria-labelledby="lab01-title">
    <!-- Cabeçalho do Laboratório -->
    <div class="lab-header">
      <div class="lab-badge-row">
        <span class="lab-badge">LAB01 • CSS GRID & CONTAINER</span>
        <span class="badge" :class="labsStore.columnStatus.badgeClass">
          {{ labsStore.columnStatus.title }}
        </span>
      </div>
      <h2 id="lab01-title" class="lab-title">
        Controle Deslizante: Largura de Contêiner & Auto-Fit Grid
      </h2>
      <p class="lab-description">
        Arraste o controle deslizante abaixo para simular diferentes larguras de tela/contêiner. Observe como a regra CSS
        <code>repeat(auto-fit, minmax(14rem, 1fr))</code> com <code>gap: 1rem</code> quebra os cards automaticamente
        sem nenhuma media query, cruzando exatamente os limiares matemáticos calculados!
      </p>
    </div>

    <!-- Controles Interativos -->
    <div class="controls-panel">
      <div class="slider-group">
        <div class="slider-label-row">
          <label for="container-slider" class="control-label">
            Largura do Contêiner Virtual:
          </label>
          <div class="value-tags">
            <span class="tag-px">{{ labsStore.containerWidth }}px</span>
            <span class="tag-rem">({{ (labsStore.containerWidth / 16).toFixed(2) }}rem)</span>
          </div>
        </div>

        <input
          id="container-slider"
          :value="labsStore.containerWidth"
          type="range"
          min="300"
          max="860"
          step="2"
          class="range-slider"
          aria-label="Controle deslizante de largura do contêiner"
          @input="labsStore.setContainerWidth($event.target.value)"
        />

        <div class="slider-scale">
          <span>300px</span>
          <span class="scale-marker highlight" :class="{ active: labsStore.containerWidth >= 464 }">
            464px (2 cols)
          </span>
          <span class="scale-marker highlight" :class="{ active: labsStore.containerWidth >= 704 }">
            704px (3 cols)
          </span>
          <span>860px</span>
        </div>
      </div>

      <!-- Presets Rápidos -->
      <div class="presets-row">
        <span class="presets-label">Atalhos de Teste:</span>
        <div class="presets-buttons">
          <button
            v-for="preset in presets"
            :key="preset.width"
            type="button"
            class="preset-btn"
            :class="{ active: labsStore.containerWidth === preset.width }"
            @click="aplicarPreset(preset.width)"
          >
            {{ preset.label }}
          </button>
          <button
            type="button"
            class="reset-btn"
            title="Redefinir para padrão de 600px"
            @click="labsStore.resetLab01"
          >
            ↺ Reset
          </button>
        </div>
      </div>
    </div>

    <!-- Feedback e Painel Matemático em Tempo Real (RF12) -->
    <div class="status-callout" :class="labsStore.columnStatus.badgeClass">
      <div class="status-icon">⚡</div>
      <div class="status-content">
        <div class="status-title-row">
          <strong>{{ labsStore.columnStatus.title }}</strong>
          <span class="status-badge-tag">{{ labsStore.columnStatus.tag }}</span>
        </div>
        <p class="status-message">{{ labsStore.columnStatus.message }}</p>
        <div class="status-formula">
          <code>Fórmula: {{ labsStore.columnStatus.formula }}</code>
        </div>
      </div>
    </div>

    <!-- Área de Demonstração Visual em Tempo Real -->
    <div class="preview-stage" aria-label="Área de simulação do contêiner responsivo">
      <div class="stage-info">
        <span class="stage-label">Área de Visualização (Scroll horizontal livre caso a tela seja menor)</span>
        <span class="stage-dimension">Contêiner: {{ labsStore.containerWidth }}px de largura</span>
      </div>

      <div class="preview-scroll-wrapper">
        <div
          class="simulated-container"
          :style="{ width: labsStore.containerWidth + 'px' }"
          role="region"
          aria-label="Contêiner dinâmico sob teste"
        >
          <!-- Grid Responsivo Real -->
          <div class="demo-grid">
            <article class="demo-card card-vehicle">
              <div class="card-header">
                <span class="card-icon">🏎️</span>
                <span class="card-tag">Veículo</span>
              </div>
              <h3 class="card-title">Pegassi Ignus</h3>
              <p class="card-desc">Superesportivo de alta aceleração para fugas rápidas por Vice Beach.</p>
              <div class="card-spec">
                <span>Largura mínima:</span>
                <code>14rem (224px)</code>
              </div>
            </article>

            <article class="demo-card card-property">
              <div class="card-header">
                <span class="card-icon">🌴</span>
                <span class="card-tag">Propriedade</span>
              </div>
              <h3 class="card-title">Mansão Starfish</h3>
              <p class="card-desc">Residência de luxo com vista panorâmica e píer privativo.</p>
              <div class="card-spec">
                <span>Largura mínima:</span>
                <code>14rem (224px)</code>
              </div>
            </article>

            <article class="demo-card card-aircraft">
              <div class="card-header">
                <span class="card-icon">🚁</span>
                <span class="card-tag">Aeronave</span>
              </div>
              <h3 class="card-title">Maverick Chopper</h3>
              <p class="card-desc">Helicóptero executivo com acesso rápido ao topo dos arranha-céus.</p>
              <div class="card-spec">
                <span>Largura mínima:</span>
                <code>14rem (224px)</code>
              </div>
            </article>

            <article class="demo-card card-boat">
              <div class="card-header">
                <span class="card-icon">🛥️</span>
                <span class="card-tag">Marítimo</span>
              </div>
              <h3 class="card-title">Speedophile Jet</h3>
              <p class="card-desc">Jet ski esportivo para navegação dinâmica pelas marinas e canais.</p>
              <div class="card-spec">
                <span>Largura mínima:</span>
                <code>14rem (224px)</code>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>

    <!-- Rodapé Didático e Fundamentação Matemática -->
    <div class="lab-footer-notes">
      <div class="note-box">
        <h4 class="note-heading">📐 Memória de Cálculo Passo a Passo (Seção 3):</h4>
        <ul class="note-list">
          <li><strong>Base da Raiz:</strong> Adotando <code>1rem = 16px</code>.</li>
          <li><strong>Largura Mínima de Cada Card:</strong> <code>14rem × 16px = 224px</code>.</li>
          <li><strong>Espaçamento Entre Colunas (gap):</strong> <code>1rem = 16px</code>.</li>
          <li>
            <strong>Para 2 Colunas:</strong>
            <code>(2 × 224px) + (1 × 16px) = 448px + 16px = <strong>464px</strong></code>.
          </li>
          <li>
            <strong>Para 3 Colunas:</strong>
            <code>(3 × 224px) + (2 × 16px) = 672px + 32px = <strong>704px</strong></code>.
          </li>
        </ul>
      </div>
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
  position: relative;
  overflow: hidden;
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
  background: rgba(168, 85, 247, 0.2);
  color: #c084fc;
  border: 1px solid rgba(168, 85, 247, 0.4);
  font-size: var(--font-size-xs);
  font-weight: 700;
  padding: 0.25rem 0.65rem;
  border-radius: var(--radius-full);
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.badge-yellow {
  background: rgba(245, 158, 11, 0.2);
  color: #fcd34d;
  border: 1px solid rgba(245, 158, 11, 0.4);
  padding: 0.25rem 0.65rem;
  border-radius: var(--radius-full);
  font-size: var(--font-size-xs);
  font-weight: 700;
}

.badge-pink {
  background: rgba(255, 79, 163, 0.2);
  color: #ff70b5;
  border: 1px solid rgba(255, 79, 163, 0.5);
  box-shadow: 0 0 10px rgba(255, 79, 163, 0.25);
  padding: 0.25rem 0.65rem;
  border-radius: var(--radius-full);
  font-size: var(--font-size-xs);
  font-weight: 700;
}

.badge-cyan {
  background: rgba(54, 217, 232, 0.2);
  color: #36d9e8;
  border: 1px solid rgba(54, 217, 232, 0.5);
  box-shadow: 0 0 10px rgba(54, 217, 232, 0.25);
  padding: 0.25rem 0.65rem;
  border-radius: var(--radius-full);
  font-size: var(--font-size-xs);
  font-weight: 700;
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

/* Painel de Controles */
.controls-panel {
  background: var(--color-surface-muted);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
  margin-bottom: var(--spacing-md);
}

@media (min-width: 48rem) {
  .controls-panel {
    padding: var(--spacing-lg);
  }
}

.slider-group {
  margin-bottom: var(--spacing-md);
}

.slider-label-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
  margin-bottom: var(--spacing-xs);
}

.control-label {
  font-weight: 600;
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
}

.value-tags {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.tag-px {
  background: var(--color-primary);
  color: #ffffff;
  font-family: var(--font-family-code);
  font-weight: 700;
  font-size: var(--font-size-sm);
  padding: 0.2rem 0.6rem;
  border-radius: var(--radius-sm);
  box-shadow: 0 0 8px rgba(255, 79, 163, 0.4);
}

.tag-rem {
  color: var(--color-accent);
  font-family: var(--font-family-code);
  font-size: var(--font-size-xs);
}

.range-slider {
  width: 100%;
  height: 0.6rem;
  border-radius: var(--radius-full);
  background: #2a2042;
  outline: none;
  cursor: pointer;
  accent-color: var(--color-primary);
  margin: var(--spacing-xs) 0;
}

.slider-scale {
  display: flex;
  justify-content: space-between;
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  font-family: var(--font-family-code);
}

.scale-marker.highlight {
  color: var(--color-text-secondary);
}

.scale-marker.highlight.active {
  color: var(--color-accent);
  font-weight: 700;
}

/* Presets Rápidos */
.presets-row {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  border-top: 1px dashed var(--color-border);
  padding-top: var(--spacing-sm);
}

@media (min-width: 48rem) {
  .presets-row {
    flex-direction: row;
    align-items: center;
    gap: var(--spacing-md);
  }
}

.presets-label {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.presets-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.preset-btn {
  background: var(--color-surface-light);
  border: 1px solid var(--color-border);
  color: var(--color-text-primary);
  font-size: var(--font-size-xs);
  padding: 0.35rem 0.7rem;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.preset-btn:hover {
  background: rgba(255, 79, 163, 0.15);
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.preset-btn.active {
  background: var(--color-primary);
  color: #ffffff;
  border-color: var(--color-primary);
  font-weight: 700;
  box-shadow: 0 0 10px rgba(255, 79, 163, 0.35);
}

.reset-btn {
  background: transparent;
  border: 1px dashed var(--color-border);
  color: var(--color-text-muted);
  font-size: var(--font-size-xs);
  padding: 0.35rem 0.7rem;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.reset-btn:hover {
  border-color: var(--color-secondary);
  color: var(--color-text-primary);
}

/* Callout de Feedback em Tempo Real */
.status-callout {
  display: flex;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  margin-bottom: var(--spacing-md);
  border: 1px solid;
  transition: all var(--transition-normal);
}

.status-callout.badge-yellow {
  background: rgba(245, 158, 11, 0.1);
  border-color: rgba(245, 158, 11, 0.35);
}

.status-callout.badge-pink {
  background: rgba(255, 79, 163, 0.1);
  border-color: rgba(255, 79, 163, 0.4);
}

.status-callout.badge-cyan {
  background: rgba(54, 217, 232, 0.1);
  border-color: rgba(54, 217, 232, 0.4);
}

.status-icon {
  font-size: 1.5rem;
}

.status-content {
  flex: 1;
}

.status-title-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
}

.status-badge-tag {
  font-size: var(--font-size-xs);
  color: var(--color-accent);
  background: rgba(54, 217, 232, 0.15);
  padding: 0.1rem 0.4rem;
  border-radius: var(--radius-sm);
}

.status-message {
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
  margin-bottom: 0.4rem;
}

.status-formula code {
  background: rgba(0, 0, 0, 0.3);
  color: var(--color-accent);
  font-size: var(--font-size-xs);
  padding: 0.2rem 0.5rem;
  border-radius: var(--radius-sm);
}

/* Área de Visualização do Contêiner */
.preview-stage {
  background: #0c0915;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
  margin-bottom: var(--spacing-md);
}

.stage-info {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  margin-bottom: var(--spacing-sm);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  padding-bottom: var(--spacing-xs);
}

.stage-dimension {
  color: var(--color-accent);
  font-weight: 600;
  font-family: var(--font-family-code);
}

.preview-scroll-wrapper {
  overflow-x: auto;
  padding: 0.5rem 0;
  -webkit-overflow-scrolling: touch;
}

.simulated-container {
  margin: 0 auto;
  background: var(--color-surface);
  border: 2px dashed rgba(255, 79, 163, 0.6);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
  box-shadow: 0 0 20px rgba(255, 79, 163, 0.15);
  transition: width 0.15s ease-out;
}

/* Grid Demonstrativo */
.demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
  gap: 1rem;
}

.demo-card {
  background: var(--color-surface-light);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  transition: transform var(--transition-fast), border-color var(--transition-fast);
}

.demo-card:hover {
  transform: translateY(-2px);
  border-color: var(--color-accent);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-icon {
  font-size: 1.5rem;
}

.card-tag {
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--color-accent);
  background: rgba(54, 217, 232, 0.12);
  padding: 0.15rem 0.4rem;
  border-radius: var(--radius-sm);
}

.card-title {
  font-size: var(--font-size-base);
  color: var(--color-text-primary);
  margin-top: 0.2rem;
}

.card-desc {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  line-height: 1.4;
  flex: 1;
}

.card-spec {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.7rem;
  color: var(--color-text-muted);
  border-top: 1px dashed var(--color-border);
  padding-top: 0.4rem;
  margin-top: 0.3rem;
}

.card-spec code {
  color: var(--color-primary);
  font-size: 0.7rem;
}

/* Memória de Cálculo */
.lab-footer-notes {
  margin-top: var(--spacing-md);
}

.note-box {
  background: rgba(28, 21, 48, 0.7);
  border: 1px solid var(--color-border);
  border-left: 3px solid var(--color-secondary);
  border-radius: var(--radius-sm);
  padding: var(--spacing-md);
}

.note-heading {
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-xs);
}

.note-list {
  list-style: none;
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.note-list li code {
  color: var(--color-accent);
}
</style>
