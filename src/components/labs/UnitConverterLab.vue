<script setup>
import { useLabsStore } from '../../stores/labsStore'

const labsStore = useLabsStore()
</script>

<template>
  <div class="lab-block" id="lab02">
    <div class="lab-header">
      <div class="tag-row">
        <span class="badge badge-cyan">LAB02 • Interativo</span>
        <span class="badge badge-purple">Cálculo Contextualizado</span>
      </div>
      <h3 class="lab-title">Conversor Interativo de Unidades CSS</h3>
      <p class="lab-desc">
        Converta valores em <code>rem</code>, <code>em</code>, <code>%</code>, <code>vw</code> ou <code>ch</code> diretamente para pixels (px).
        Experimente ajustar o <strong>contexto de referência</strong> para compreender como cada unidade relativa reage dinamicamente!
      </p>
    </div>

    <!-- Grade de Entradas e Seleção -->
    <div class="converter-grid">
      <!-- Entrada de Valor Numérico -->
      <div class="input-card">
        <label for="input-value" class="field-label">1. Valor de Entrada:</label>
        <div class="input-wrapper">
          <input
            id="input-value"
            v-model.number="labsStore.inputValue"
            type="number"
            step="0.1"
            min="0"
            class="number-input"
            aria-label="Valor a ser convertido"
          />
          <span class="unit-suffix">{{ labsStore.selectedUnit }}</span>
        </div>
      </div>

      <!-- Seleção da Unidade -->
      <div class="input-card">
        <label for="select-unit" class="field-label">2. Escolha a Unidade:</label>
        <select
          id="select-unit"
          v-model="labsStore.selectedUnit"
          class="unit-select"
          aria-label="Selecione a unidade CSS"
        >
          <option value="rem">rem (Relativo à raiz &lt;html&gt;)</option>
          <option value="em">em (Relativo ao elemento pai)</option>
          <option value="%">% (Porcentagem do contêiner pai)</option>
          <option value="vw">vw (% da largura da janela)</option>
          <option value="ch">ch (Largura do caractere '0')</option>
        </select>
      </div>
    </div>

    <!-- Ajuste do Contexto Dinâmico (Explicação do Referencial) -->
    <div class="context-card">
      <div class="context-header">
        <h4 class="context-title">
          <span class="context-icon">⚙️</span>
          <span>Contexto de Referência Ativo</span>
        </h4>
        <button
          type="button"
          class="btn-reset"
          @click="labsStore.resetConverter"
          title="Restaurar parâmetros padrão"
        >
          ↺ Restaurar Padrões
        </button>
      </div>

      <!-- Contexto para rem -->
      <div v-if="labsStore.selectedUnit === 'rem'" class="context-item">
        <div class="context-row">
          <label for="root-base">Tamanho da fonte raiz (&lt;html&gt;): <strong>{{ labsStore.rootBasePx }}px</strong></label>
          <span class="badge badge-pink">Padrão do navegador: 16px</span>
        </div>
        <input
          id="root-base"
          v-model.number="labsStore.rootBasePx"
          type="range"
          min="12"
          max="32"
          step="1"
          class="range-slider"
        />
        <p class="context-help">
          Simula o usuário alterando o tamanho da fonte nas opções de acessibilidade do navegador (ex: aumentando de 16px para 24px).
        </p>
      </div>

      <!-- Contexto para em -->
      <div v-else-if="labsStore.selectedUnit === 'em'" class="context-item">
        <div class="context-row">
          <label for="parent-base">Fonte do elemento pai direto: <strong>{{ labsStore.parentBasePx }}px</strong></label>
          <span class="badge badge-purple">Contexto do elemento pai</span>
        </div>
        <input
          id="parent-base"
          v-model.number="labsStore.parentBasePx"
          type="range"
          min="12"
          max="48"
          step="1"
          class="range-slider"
        />
        <p class="context-help">
          O <code>em</code> depende exclusivamente do <code>font-size</code> configurado no elemento pai mais próximo.
        </p>
      </div>

      <!-- Contexto para % -->
      <div v-else-if="labsStore.selectedUnit === '%'" class="context-item">
        <div class="context-row">
          <label for="container-ref">Largura do contêiner pai: <strong>{{ labsStore.containerRefPx }}px</strong></label>
          <span class="badge badge-cyan">Dimensão do contêiner</span>
        </div>
        <input
          id="container-ref"
          v-model.number="labsStore.containerRefPx"
          type="range"
          min="200"
          max="1000"
          step="20"
          class="range-slider"
        />
        <p class="context-help">
          Porcentagens dependem diretamente da largura ou altura calculada do contêiner onde o elemento está inserido.
        </p>
      </div>

      <!-- Contexto para vw -->
      <div v-else-if="labsStore.selectedUnit === 'vw'" class="context-item">
        <div class="context-row">
          <label for="vw-ref">Largura da Janela do Navegador (Viewport): <strong>{{ labsStore.viewportRefPx }}px</strong></label>
          <span class="badge badge-cyan">Viewport Width</span>
        </div>
        <input
          id="vw-ref"
          v-model.number="labsStore.viewportRefPx"
          type="range"
          min="320"
          max="1920"
          step="10"
          class="range-slider"
        />
        <p class="context-help">
          1vw equivale rigorosamente a 1% da largura total da área visível do navegador.
        </p>
      </div>

      <!-- Contexto para ch -->
      <div v-else class="context-item">
        <p class="context-help">
          1ch corresponde à largura do caractere "0" renderizado na fonte atual. Com base 16px, equivale a aproximadamente <strong>9.6px</strong>.
        </p>
      </div>
    </div>

    <!-- Resultado Final Calculado e Explicação Matemática -->
    <div class="result-card">
      <div class="result-header">
        <span class="result-title">Resultado Equivalente:</span>
        <div class="result-badge-value">
          <span class="result-px font-mono">{{ labsStore.calculatedPx }}</span>
          <span class="result-unit">px</span>
        </div>
      </div>

      <div class="formula-box">
        <span class="formula-label">Fórmula aplicada:</span>
        <code class="formula-code">{{ labsStore.explanationFormula }}</code>
      </div>

      <!-- Barra visual proporcional -->
      <div class="visual-bar-wrapper">
        <span class="bar-label">Demonstração física visual:</span>
        <div class="bar-track">
          <div
            class="bar-fill"
            :style="{ width: Math.min(Number(labsStore.calculatedPx), 600) + 'px' }"
          >
            <span class="bar-fill-text">{{ labsStore.calculatedPx }}px</span>
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
  border: 1px solid rgba(54, 217, 232, 0.32);
  border-radius: var(--radius-2xl);
  padding: var(--spacing-lg);
  box-shadow: 0 16px 45px rgba(0, 0, 0, 0.7), 0 0 25px rgba(54, 217, 232, 0.12);
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

/* Grade de Inputs */
.converter-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-md);
}

@media (min-width: 48rem) {
  .converter-grid {
    grid-template-columns: 1fr 1.5fr;
  }
}

.input-card {
  background: rgba(10, 7, 20, 0.75);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-xl);
  padding: var(--spacing-lg);
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.field-label {
  font-size: var(--font-size-xs);
  font-weight: 700;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.input-wrapper {
  display: flex;
  align-items: center;
  background: rgba(22, 16, 38, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: var(--radius-md);
  overflow: hidden;
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
}

.input-wrapper:focus-within {
  border-color: var(--color-accent);
  box-shadow: 0 0 14px rgba(54, 217, 232, 0.35);
}

.number-input {
  flex: 1;
  background: transparent;
  border: none;
  padding: 0.65rem 0.85rem;
  font-size: var(--font-size-lg);
  font-family: var(--font-family-code);
  font-weight: 700;
  color: #ffffff;
  outline: none;
}

.unit-suffix {
  padding: 0 0.85rem;
  color: var(--color-accent);
  font-weight: 800;
  font-size: var(--font-size-sm);
  background: rgba(54, 217, 232, 0.15);
  height: 100%;
  display: flex;
  align-items: center;
}

.unit-select {
  background: rgba(22, 16, 38, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: var(--radius-md);
  padding: 0.75rem 0.85rem;
  font-size: var(--font-size-sm);
  color: #ffffff;
  outline: none;
  cursor: pointer;
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
}

.unit-select:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 14px rgba(255, 79, 163, 0.35);
}

/* Contexto Card */
.context-card {
  background: rgba(10, 7, 20, 0.75);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-xl);
  padding: var(--spacing-lg);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.context-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  padding-bottom: 0.65rem;
}

.context-title {
  font-family: var(--font-family-heading);
  font-size: 1.05rem;
  font-weight: 700;
  color: #ffffff;
  display: flex;
  align-items: center;
  gap: 0.45rem;
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

.context-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.context-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.context-row strong {
  color: #ffffff;
}

.range-slider {
  width: 100%;
  height: 0.6rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-full);
  outline: none;
  cursor: pointer;
  accent-color: var(--color-accent);
}

.context-help {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  line-height: 1.5;
}

/* Resultado */
.result-card {
  background: rgba(10, 7, 20, 0.85);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid rgba(54, 217, 232, 0.35);
  border-left: 4px solid var(--color-accent);
  border-radius: var(--radius-xl);
  padding: var(--spacing-lg);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.6), 0 0 20px rgba(54, 217, 232, 0.15);
}

.result-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
}

.result-title {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 0.05em;
}

.result-badge-value {
  display: flex;
  align-items: baseline;
  gap: 0.3rem;
  background: rgba(54, 217, 232, 0.16);
  border: 1px solid rgba(54, 217, 232, 0.45);
  padding: 0.35rem 0.95rem;
  border-radius: var(--radius-md);
  box-shadow: 0 0 16px rgba(54, 217, 232, 0.25);
}

.result-px {
  font-size: var(--font-size-3xl);
  font-family: var(--font-family-heading);
  font-weight: 900;
  color: var(--color-accent);
  text-shadow: 0 0 15px rgba(54, 217, 232, 0.5);
}

.result-unit {
  font-size: var(--font-size-sm);
  color: #ffffff;
  font-weight: 800;
}

.formula-box {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  background: rgba(20, 14, 34, 0.85);
  padding: 0.75rem 1rem;
  border-radius: var(--radius-md);
  border: 1px dashed rgba(255, 255, 255, 0.15);
}

.formula-label {
  font-size: 0.65rem;
  color: var(--color-text-muted);
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 0.05em;
}

.formula-code {
  font-family: var(--font-family-code);
  font-size: var(--font-size-sm);
  color: var(--color-primary);
  font-weight: 600;
}

.visual-bar-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  margin-top: 0.25rem;
}

.bar-label {
  font-size: 0.7rem;
  color: var(--color-text-muted);
  font-weight: 600;
}

.bar-track {
  width: 100%;
  background: rgba(20, 14, 34, 0.85);
  border-radius: var(--radius-full);
  border: 1px solid rgba(255, 255, 255, 0.12);
  height: 1.6rem;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #ff4fa3 0%, #36d9e8 100%);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 0.6rem;
  transition: width 0.2s ease-out;
  min-width: 2.25rem;
  border-radius: var(--radius-full);
  box-shadow: 0 0 10px rgba(54, 217, 232, 0.3);
}

.bar-fill-text {
  font-size: 0.65rem;
  font-family: var(--font-family-code);
  font-weight: 800;
  color: #ffffff;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.8);
}
</style>
