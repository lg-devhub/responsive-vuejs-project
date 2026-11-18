<script setup>
import { useLabsStore } from '../../stores/labsStore'

const labsStore = useLabsStore()

// Unidades disponíveis com suas definições e categorias
const unidadesDisponiveis = [
  { id: 'rem', label: 'rem', name: 'Root EM (Relativo à Raiz <html>)', badge: 'Acessível' },
  { id: 'em', label: 'em', name: 'Element EM (Relativo ao Pai)', badge: 'Cascata' },
  { id: '%', label: '%', name: 'Porcentagem (Relativo ao Contêiner)', badge: 'Fluido' },
  { id: 'vw', label: 'vw', name: 'Viewport Width (1% da Largura da Tela)', badge: 'Tela' },
  { id: 'ch', label: 'ch', name: 'Caractere "0" (Medida Tipográfica)', badge: 'Ergonômico' }
]

// Presets rápidos dependendo da unidade
const presetsPorUnidade = {
  rem: [
    { label: '0.875rem (14px)', value: 0.875 },
    { label: '1rem (16px base)', value: 1 },
    { label: '1.5rem (24px)', value: 1.5 },
    { label: '2rem (32px)', value: 2 }
  ],
  em: [
    { label: '0.8em (Pequeno)', value: 0.8 },
    { label: '1.2em (Título H3)', value: 1.2 },
    { label: '1.5em (Título H2)', value: 1.5 },
    { label: '2em (Destaque)', value: 2 }
  ],
  '%': [
    { label: '25% (1/4 Contêiner)', value: 25 },
    { label: '50% (Metade)', value: 50 },
    { label: '75% (3/4)', value: 75 },
    { label: '100% (Largura Total)', value: 100 }
  ],
  vw: [
    { label: '25vw (1/4 Tela)', value: 25 },
    { label: '50vw (Metade da Tela)', value: 50 },
    { label: '80vw (Largura Leitura)', value: 80 },
    { label: '100vw (Full Screen)', value: 100 }
  ],
  ch: [
    { label: '45ch (Coluna Estreita)', value: 45 },
    { label: '60ch (Linha Ideal)', value: 60 },
    { label: '75ch (Limite Leitura)', value: 75 }
  ]
}

const selecionarUnidade = (unitId) => {
  labsStore.selectedUnit = unitId
  // Ajusta o valor padrão sensato para a unidade se necessário
  if (unitId === '%' || unitId === 'vw') {
    if (labsStore.inputValue <= 5) labsStore.inputValue = 50
  } else if (unitId === 'ch') {
    if (labsStore.inputValue < 10) labsStore.inputValue = 60
  } else {
    if (labsStore.inputValue > 10) labsStore.inputValue = 1.5
  }
}

const aplicarPreset = (val) => {
  labsStore.inputValue = val
}
</script>

<template>
  <section class="lab-card" aria-labelledby="lab02-title">
    <!-- Cabeçalho do Laboratório -->
    <div class="lab-header">
      <div class="lab-badge-row">
        <span class="lab-badge">LAB02 • CONVERSOR DE UNIDADES CSS</span>
        <span class="badge badge-cyan">Cálculo Preciso & Contextual</span>
      </div>
      <h2 id="lab02-title" class="lab-title">
        Conversor Interativo de Unidades CSS em Tempo Real
      </h2>
      <p class="lab-description">
        Experimente as unidades <code>rem</code>, <code>em</code>, <code>%</code>, <code>vw</code> e <code>ch</code>.
        Diferente de conversores simplistas e matematicamente enganosos, este laboratório permite visualizar e calibrar
        o <strong>elemento de referência real</strong> de cada cálculo, comprovando na prática como cada unidade se comporta.
      </p>
    </div>

    <!-- Seletor de Unidades em Abas/Segmentos -->
    <div class="unit-selector-bar" role="tablist" aria-label="Selecione a unidade CSS">
      <button
        v-for="unidade in unidadesDisponiveis"
        :key="unidade.id"
        type="button"
        role="tab"
        :aria-selected="labsStore.selectedUnit === unidade.id"
        class="unit-tab-btn"
        :class="{ active: labsStore.selectedUnit === unidade.id }"
        @click="selecionarUnidade(unidade.id)"
      >
        <span class="tab-symbol">{{ unidade.label }}</span>
        <span class="tab-badge">{{ unidade.badge }}</span>
      </button>
    </div>

    <!-- Painel de Configuração e Entrada -->
    <div class="converter-panel">
      <div class="inputs-grid">
        <!-- Entrada Principal do Valor -->
        <div class="input-card main-input">
          <label for="input-valor" class="input-label">
            Valor em <strong class="highlight-unit">{{ labsStore.selectedUnit }}</strong>:
          </label>
          <div class="input-wrapper">
            <input
              id="input-valor"
              v-model.number="labsStore.inputValue"
              type="number"
              :step="labsStore.selectedUnit === '%' || labsStore.selectedUnit === 'vw' || labsStore.selectedUnit === 'ch' ? '1' : '0.1'"
              class="styled-number-input"
              aria-label="Valor numérico da unidade"
            />
            <span class="unit-addon">{{ labsStore.selectedUnit }}</span>
          </div>

          <!-- Presets para a unidade selecionada -->
          <div class="presets-mini">
            <span class="mini-label">Atalhos comuns:</span>
            <div class="mini-buttons">
              <button
                v-for="preset in presetsPorUnidade[labsStore.selectedUnit]"
                :key="preset.value"
                type="button"
                class="mini-btn"
                :class="{ active: labsStore.inputValue === preset.value }"
                @click="aplicarPreset(preset.value)"
              >
                {{ preset.label }}
              </button>
            </div>
          </div>
        </div>

        <!-- Ajuste do Contexto de Referência (Obrigatório para rigor matemático!) -->
        <div class="input-card context-input">
          <label class="input-label">
            Contexto de Referência Dinâmico:
          </label>

          <!-- Referência para REM e CH: Base da Fonte Raiz -->
          <div v-if="labsStore.selectedUnit === 'rem' || labsStore.selectedUnit === 'ch'" class="context-group">
            <div class="context-desc">
              <span>Fonte Raiz <code>&lt;html&gt;</code> do Navegador:</span>
              <strong class="context-val">{{ labsStore.rootFontSize }}px</strong>
            </div>
            <input
              v-model.number="labsStore.rootFontSize"
              type="range"
              min="12"
              max="28"
              step="1"
              class="range-slider"
              aria-label="Tamanho da fonte raiz em pixels"
            />
            <small class="context-hint">
              💡 Simule o que acontece quando um usuário com baixa visão aumenta a fonte padrão do navegador de 16px para 20px ou 24px!
            </small>
          </div>

          <!-- Referência para EM: Fonte do Pai -->
          <div v-else-if="labsStore.selectedUnit === 'em'" class="context-group">
            <div class="context-desc">
              <span>Fonte do Elemento Pai:</span>
              <strong class="context-val">{{ labsStore.parentFontSize }}px</strong>
            </div>
            <input
              v-model.number="labsStore.parentFontSize"
              type="range"
              min="12"
              max="36"
              step="1"
              class="range-slider"
              aria-label="Tamanho da fonte do elemento pai em pixels"
            />
            <small class="context-hint">
              💡 O <code>em</code> calcula baseado no elemento contêiner pai. Se o pai tiver 20px, 1.5em vira 30px!
            </small>
          </div>

          <!-- Referência para %: Largura do Contêiner -->
          <div v-else-if="labsStore.selectedUnit === '%'" class="context-group">
            <div class="context-desc">
              <span>Largura do Bloco Pai:</span>
              <strong class="context-val">{{ labsStore.containerRefWidth }}px</strong>
            </div>
            <input
              v-model.number="labsStore.containerRefWidth"
              type="range"
              min="200"
              max="800"
              step="20"
              class="range-slider"
              aria-label="Largura do contêiner pai em pixels"
            />
            <small class="context-hint">
              💡 A porcentagem sempre precisa de um contêiner pai de referência para ser calculada.
            </small>
          </div>

          <!-- Referência para VW: Largura da Janela -->
          <div v-else-if="labsStore.selectedUnit === 'vw'" class="context-group">
            <div class="context-desc">
              <span>Largura Total da Tela (Viewport):</span>
              <strong class="context-val">{{ labsStore.viewportRefWidth }}px</strong>
            </div>
            <input
              v-model.number="labsStore.viewportRefWidth"
              type="range"
              min="320"
              max="1920"
              step="20"
              class="range-slider"
              aria-label="Largura da viewport em pixels"
            />
            <small class="context-hint">
              💡 1vw = 1% da largura da janela visível do navegador.
            </small>
          </div>
        </div>
      </div>

      <!-- Card de Resultado Final em Destaque Neon -->
      <div class="result-neon-card">
        <div class="result-header">
          <span class="result-badge">Resultado Convertido</span>
          <button
            type="button"
            class="reset-link-btn"
            @click="labsStore.resetLab02"
          >
            ↺ Redefinir Valores
          </button>
        </div>

        <div class="result-display">
          <div class="result-number-group">
            <span class="result-equal">=</span>
            <span class="result-value-number">{{ labsStore.convertedPx }}</span>
            <span class="result-unit-label">px</span>
          </div>

          <div class="result-formula-box">
            <span class="formula-label">Cálculo Aplicado:</span>
            <code class="formula-code">{{ labsStore.unitReferenceExplanation.formula }}</code>
          </div>
        </div>

        <!-- Explicação Didática da Unidade Selecionada -->
        <div class="explanation-box">
          <div class="explanation-title">
            <span class="exp-icon">ℹ️</span>
            <strong>Por que funciona assim ({{ labsStore.unitReferenceExplanation.name }}):</strong>
          </div>
          <p class="explanation-text">{{ labsStore.unitReferenceExplanation.explanation }}</p>
        </div>

        <!-- Barra Visual Comparativa -->
        <div class="visual-comparison-area">
          <span class="comp-label">Escala Visual Renderizada (comprimento proporcional):</span>
          <div class="comparison-track">
            <!-- Barra calculada -->
            <div
              class="dynamic-bar"
              :style="{ width: Math.min(100, Math.max(2, (labsStore.convertedPx / 4))) + '%' }"
            >
              <span class="bar-label">{{ labsStore.convertedPx }}px</span>
            </div>
          </div>
          <div class="track-legend">
            <span>0px</span>
            <span>16px (1rem base)</span>
            <span>100px</span>
            <span>200px</span>
            <span>400px</span>
          </div>
        </div>
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
  background: rgba(54, 217, 232, 0.2);
  color: #36d9e8;
  border: 1px solid rgba(54, 217, 232, 0.4);
  font-size: var(--font-size-xs);
  font-weight: 700;
  padding: 0.25rem 0.65rem;
  border-radius: var(--radius-full);
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.badge-cyan {
  background: rgba(54, 217, 232, 0.15);
  color: #36d9e8;
  border: 1px solid rgba(54, 217, 232, 0.4);
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

/* Seletor de Unidades em Abas */
.unit-selector-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: var(--spacing-lg);
  border-bottom: 1px solid var(--color-border);
  padding-bottom: var(--spacing-md);
}

.unit-tab-btn {
  background: var(--color-surface-light);
  border: 1px solid var(--color-border);
  color: var(--color-text-secondary);
  padding: 0.5rem 0.9rem;
  border-radius: var(--radius-md);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all var(--transition-fast);
}

.unit-tab-btn:hover {
  border-color: var(--color-accent);
  color: var(--color-text-primary);
}

.unit-tab-btn.active {
  background: rgba(54, 217, 232, 0.15);
  border-color: var(--color-accent);
  color: var(--color-accent);
  box-shadow: 0 0 12px rgba(54, 217, 232, 0.25);
}

.tab-symbol {
  font-family: var(--font-family-code);
  font-weight: 700;
  font-size: var(--font-size-base);
}

.tab-badge {
  font-size: 0.65rem;
  background: rgba(0, 0, 0, 0.3);
  padding: 0.1rem 0.4rem;
  border-radius: var(--radius-sm);
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.unit-tab-btn.active .tab-badge {
  color: var(--color-accent);
  background: rgba(54, 217, 232, 0.2);
}

/* Painel do Conversor */
.converter-panel {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.inputs-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-md);
}

@media (min-width: 48rem) {
  .inputs-grid {
    grid-template-columns: 1fr 1fr;
  }
}

.input-card {
  background: var(--color-surface-muted);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.input-label {
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-text-primary);
}

.highlight-unit {
  color: var(--color-accent);
}

.input-wrapper {
  display: flex;
  align-items: center;
  background: #0c0915;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  overflow: hidden;
  transition: border-color var(--transition-fast);
}

.input-wrapper:focus-within {
  border-color: var(--color-primary);
  box-shadow: 0 0 8px rgba(255, 79, 163, 0.3);
}

.styled-number-input {
  flex: 1;
  background: transparent;
  border: none;
  padding: 0.6rem 0.8rem;
  color: #ffffff;
  font-size: var(--font-size-xl);
  font-family: var(--font-family-code);
  font-weight: 700;
  outline: none;
  width: 100%;
}

.unit-addon {
  padding: 0.6rem 1rem;
  background: var(--color-surface-light);
  color: var(--color-accent);
  font-family: var(--font-family-code);
  font-weight: 700;
  font-size: var(--font-size-base);
  border-left: 1px solid var(--color-border);
}

/* Presets Mini */
.presets-mini {
  margin-top: var(--spacing-xs);
}

.mini-label {
  font-size: 0.7rem;
  color: var(--color-text-muted);
  display: block;
  margin-bottom: 0.3rem;
}

.mini-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.mini-btn {
  background: var(--color-surface-light);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: var(--color-text-secondary);
  font-size: 0.7rem;
  padding: 0.25rem 0.5rem;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.mini-btn:hover {
  border-color: var(--color-secondary);
  color: var(--color-text-primary);
}

.mini-btn.active {
  background: var(--color-primary);
  color: #ffffff;
  border-color: var(--color-primary);
  font-weight: 700;
}

/* Contexto de Referência */
.context-group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  margin-top: 0.25rem;
}

.context-desc {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
}

.context-val {
  color: var(--color-accent);
  font-family: var(--font-family-code);
  font-size: var(--font-size-sm);
}

.range-slider {
  width: 100%;
  height: 0.5rem;
  border-radius: var(--radius-full);
  background: #2a2042;
  outline: none;
  cursor: pointer;
  accent-color: var(--color-accent);
}

.context-hint {
  font-size: 0.7rem;
  color: var(--color-text-muted);
  line-height: 1.4;
  margin-top: 0.2rem;
}

/* Card de Resultado Neon */
.result-neon-card {
  background: #0f0a1c;
  border: 1px solid var(--color-border);
  border-left: 4px solid var(--color-primary);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
  box-shadow: 0 0 20px rgba(255, 79, 163, 0.12);
}

@media (min-width: 48rem) {
  .result-neon-card {
    padding: var(--spacing-lg);
  }
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-sm);
}

.result-badge {
  font-size: var(--font-size-xs);
  font-weight: 700;
  text-transform: uppercase;
  color: var(--color-primary);
  letter-spacing: 0.05em;
}

.reset-link-btn {
  background: transparent;
  border: none;
  color: var(--color-text-muted);
  font-size: var(--font-size-xs);
  cursor: pointer;
  text-decoration: underline;
  transition: color var(--transition-fast);
}

.reset-link-btn:hover {
  color: var(--color-text-primary);
}

.result-display {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
}

@media (min-width: 48rem) {
  .result-display {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}

.result-number-group {
  display: flex;
  align-items: baseline;
  gap: 0.4rem;
}

.result-equal {
  font-size: var(--font-size-2xl);
  color: var(--color-text-muted);
}

.result-value-number {
  font-size: var(--font-size-hero);
  font-weight: 800;
  font-family: var(--font-family-code);
  color: var(--color-accent);
  text-shadow: 0 0 15px rgba(54, 217, 232, 0.5);
  line-height: 1;
}

.result-unit-label {
  font-size: var(--font-size-xl);
  font-weight: 700;
  color: var(--color-text-primary);
}

.result-formula-box {
  background: rgba(0, 0, 0, 0.4);
  padding: 0.5rem 0.8rem;
  border-radius: var(--radius-sm);
  border: 1px dashed rgba(255, 255, 255, 0.12);
}

.formula-label {
  display: block;
  font-size: 0.7rem;
  color: var(--color-text-muted);
  margin-bottom: 0.1rem;
}

.formula-code {
  color: #ff70b5;
  font-family: var(--font-family-code);
  font-size: var(--font-size-sm);
}

/* Caixa de Explicação Didática */
.explanation-box {
  background: var(--color-surface-muted);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  margin-bottom: var(--spacing-md);
}

.explanation-title {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: var(--font-size-xs);
  color: var(--color-text-primary);
  margin-bottom: 0.25rem;
}

.exp-icon {
  font-size: 0.9rem;
}

.explanation-text {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  line-height: 1.5;
}

/* Barra Visual Comparativa */
.visual-comparison-area {
  margin-top: var(--spacing-xs);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding-top: var(--spacing-sm);
}

.comp-label {
  display: block;
  font-size: 0.7rem;
  color: var(--color-text-muted);
  margin-bottom: 0.4rem;
}

.comparison-track {
  width: 100%;
  height: 1.8rem;
  background: rgba(0, 0, 0, 0.5);
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border);
  overflow: hidden;
  position: relative;
}

.dynamic-bar {
  height: 100%;
  background: linear-gradient(90deg, #ff4fa3 0%, #36d9e8 100%);
  border-radius: inherit;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 0.5rem;
  box-shadow: 0 0 10px rgba(54, 217, 232, 0.4);
  transition: width 0.2s ease-out;
  min-width: 3.5rem;
}

.bar-label {
  font-size: 0.65rem;
  font-family: var(--font-family-code);
  font-weight: 700;
  color: #ffffff;
  white-space: nowrap;
}

.track-legend {
  display: flex;
  justify-content: space-between;
  font-size: 0.65rem;
  color: var(--color-text-muted);
  font-family: var(--font-family-code);
  margin-top: 0.2rem;
}
</style>
