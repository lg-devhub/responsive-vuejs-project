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
  background: var(--color-surface-light);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--spacing-md);
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
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
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  overflow: hidden;
  transition: border-color var(--transition-fast);
}

.input-wrapper:focus-within {
  border-color: var(--color-accent);
  box-shadow: 0 0 10px rgba(54, 217, 232, 0.25);
}

.number-input {
  flex: 1;
  background: transparent;
  border: none;
  padding: 0.6rem 0.75rem;
  font-size: var(--font-size-lg);
  font-family: var(--font-family-code);
  font-weight: 700;
  color: var(--color-text-primary);
  outline: none;
}

.unit-suffix {
  padding: 0 0.75rem;
  color: var(--color-accent);
  font-weight: 700;
  font-size: var(--font-size-sm);
  background: rgba(54, 217, 232, 0.1);
  height: 100%;
  display: flex;
  align-items: center;
}

.unit-select {
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 0.7rem 0.75rem;
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
  outline: none;
  cursor: pointer;
  transition: border-color var(--transition-fast);
}

.unit-select:focus {
  border-color: var(--color-primary);
}

/* Contexto Card */
.context-card {
  background: var(--color-surface-light);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--spacing-md);
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
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 0.5rem;
}

.context-title {
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
  display: flex;
  align-items: center;
  gap: 0.4rem;
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
  color: var(--color-accent);
  border-color: var(--color-accent);
}

.context-item {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
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

.range-slider {
  width: 100%;
  height: 0.5rem;
  background: var(--color-bg);
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
  background: rgba(16, 13, 28, 0.9);
  border: 1px solid var(--color-border);
  border-left: 4px solid var(--color-accent);
  border-radius: var(--radius-lg);
  padding: var(--spacing-md);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.result-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
}

.result-title {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 0.05em;
}

.result-badge-value {
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
  background: rgba(54, 217, 232, 0.15);
  border: 1px solid rgba(54, 217, 232, 0.3);
  padding: 0.3rem 0.8rem;
  border-radius: var(--radius-md);
}

.result-px {
  font-size: var(--font-size-2xl);
  font-weight: 800;
  color: var(--color-accent);
}

.result-unit {
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
  font-weight: 700;
}

.formula-box {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  background: var(--color-surface);
  padding: 0.6rem 0.75rem;
  border-radius: var(--radius-md);
  border: 1px dashed var(--color-border);
}

.formula-label {
  font-size: 0.7rem;
  color: var(--color-text-muted);
  text-transform: uppercase;
}

.formula-code {
  font-size: var(--font-size-sm);
  color: var(--color-primary);
}

.visual-bar-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-top: 0.25rem;
}

.bar-label {
  font-size: 0.7rem;
  color: var(--color-text-muted);
}

.bar-track {
  width: 100%;
  background: var(--color-surface);
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border);
  height: 1.5rem;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  background: var(--gradient-sunset);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 0.5rem;
  transition: width 0.2s ease-out;
  min-width: 2rem;
}

.bar-fill-text {
  font-size: 0.65rem;
  font-family: var(--font-family-code);
  font-weight: 800;
  color: #ffffff;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);
}
</style>
