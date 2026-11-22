<script setup>
import SectionBlock from '../components/SectionBlock.vue'

const sources = [
  {
    title: 'CSS-Tricks — A Complete Guide to CSS Flexbox',
    url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/',
    note: 'Referência fundamental sobre alinhamentos e eixos'
  },
  {
    title: 'CSS-Tricks — A Complete Guide to CSS Grid',
    url: 'https://css-tricks.com/snippets/css/complete-guide-grid/',
    note: 'Técnicas de auto-fit, minmax e grids fluidos sem media query'
  },
  {
    title: 'MDN Web Docs — Relação do Grid Layout com outros métodos de layout',
    url: 'https://developer.mozilla.org/pt-BR/docs/Web/CSS/CSS_grid_layout/Relationship_of_grid_layout',
    note: 'Quando usar Flexbox vs quando usar CSS Grid'
  }
]

const prevRoute = {
  path: '/unidades-css',
  title: 'Módulo 2: Unidades CSS'
}

const nextRoute = {
  path: '/imagens-responsivas',
  title: 'Módulo 4: Imagens Responsivas'
}
</script>

<template>
  <SectionBlock
    section-number="3"
    theme-subtitle="Vice City • Módulo 3"
    title="City Layout: Flexbox e Grid"
    subtitle="Layout unidimensional vs. bidimensional e a matemática do repeat(auto-fit, minmax())."
    guide-question="Considerando um grid com repeat(auto-fit, minmax(14rem, 1fr)) e gap de 1rem, a partir de qual largura o contêiner consegue apresentar duas colunas, considerando 1rem = 16px? Demonstre o cálculo passo a passo."
    guide-answer="O contêiner consegue apresentar exatamente duas colunas a partir de 464px de largura interna disponível."
    :sources="sources"
    :prev-route="prevRoute"
    :next-route="nextRoute"
  >
    <template #explanation>
      <p>
        Para organizar elementos no espaço da tela de forma moderna, o CSS oferece duas ferramentas complementares:
      </p>

      <div class="layout-comparison-grid">
        <div class="comparison-card">
          <div class="comparison-header">
            <span class="tech-pill pill-purple">1D • Unidimensional</span>
            <h4>Flexbox (Flexible Box Layout)</h4>
          </div>
          <p class="comparison-desc">
            Organiza itens ao longo de <strong>um único eixo</strong> por vez (linha horizontal OU coluna vertical).
          </p>
          <ul class="prop-list">
            <li><code>justify-content</code>: Alinha os itens no eixo principal (espaçamento entre elementos, centro, início ou fim).</li>
            <li><code>align-items</code>: Alinha os itens no eixo transversal (vertical em linhas).</li>
            <li><code>flex-wrap: wrap</code>: Permite que itens quebrem para a linha seguinte se faltar espaço.</li>
            <li><code>gap</code>: Define espaçamento uniforme entre os filhos sem precisar de margens negativas.</li>
          </ul>
        </div>

        <div class="comparison-card">
          <div class="comparison-header">
            <span class="tech-pill pill-cyan">2D • Bidimensional</span>
            <h4>CSS Grid Layout</h4>
          </div>
          <p class="comparison-desc">
            Organiza itens simultaneamente em <strong>linhas E colunas</strong>, criando grades estruturadas e fluidas.
          </p>
          <ul class="prop-list">
            <li><code>grid-template-columns</code>: Define o número e tamanho das colunas da grade.</li>
            <li><code>repeat(auto-fit, minmax(14rem, 1fr))</code>: Cria automaticamente quantas colunas de no mínimo 14rem couberem na tela; se houver espaço extra, elas se expandem por igual (1fr).</li>
            <li>Não necessita de media queries manuais para alternar entre 1, 2, 3 ou 4 colunas!</li>
          </ul>
        </div>
      </div>
    </template>

    <template #code>
      <pre class="code-block" v-pre><code>/* 1. Barra de Navegação Unidimensional com Flexbox */
.navbar-header {
  display: flex;
  justify-content: space-between; /* Logo na esquerda, links na direita */
  align-items: center;            /* Alinhamento vertical centralizado */
  flex-wrap: wrap;                /* Se faltar espaço, não transborda */
  gap: 1rem;                      /* Espaço uniforme entre os filhos */
}

/* 2. Galeria de Cards Bidimensional com CSS Grid Fluido */
.gallery-grid {
  display: grid;
  /* Cria tantas colunas de no mínimo 14rem quantas couberem */
  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
  gap: 1rem;
}</code></pre>
    </template>

    <template #answer-extra>
      <div class="calc-box">
        <h5 class="calc-title">📐 Demonstração Matemática Passo a Passo:</h5>
        <div class="calc-steps">
          <div class="calc-step-row">
            <span class="step-num">1</span>
            <span class="step-text">Convenção informada: <code>1rem = 16px</code>.</span>
          </div>
          <div class="calc-step-row">
            <span class="step-num">2</span>
            <span class="step-text">Largura mínima de 1 coluna (card): <code>14rem = 14 × 16px = 224px</code>.</span>
          </div>
          <div class="calc-step-row">
            <span class="step-num">3</span>
            <span class="step-text">Espaçamento entre as duas colunas (gap): <code>1rem = 16px</code>.</span>
          </div>
          <div class="calc-step-row">
            <span class="step-num">4</span>
            <span class="step-text">
              Para acomodar 2 colunas lado a lado, a largura total requerida é:
              <br>
              <code>Largura Card 1 + Gap + Largura Card 2</code>
            </span>
          </div>
          <div class="calc-step-row highlight-step">
            <span class="step-num highlight-num">★</span>
            <span class="step-text">
              <strong>224px + 16px + 224px = 464px</strong>
              <br>
              <small class="step-sub">(Em rem: 14rem + 1rem + 14rem = 29rem → 29 × 16px = 464px).</small>
            </span>
          </div>
          <p class="calc-summary">
            <strong>Conclusão Prática:</strong> Se o contêiner tiver 463px ou menos, o navegador não consegue encaixar a segunda coluna com seu tamanho mínimo de 14rem e mantém apenas 1 coluna expandida (1fr). No exato instante em que a largura atinge <strong>464px</strong>, a 2ª coluna é renderizada instantaneamente!
          </p>
        </div>
      </div>
    </template>
  </SectionBlock>
</template>

<style scoped>
.layout-comparison-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-md);
  margin-top: var(--spacing-md);
}

@media (min-width: 48rem) {
  .layout-comparison-grid {
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-lg);
  }
}

.comparison-card {
  background: rgba(22, 16, 38, 0.75);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: var(--radius-xl);
  padding: var(--spacing-lg);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.45);
  transition: border-color var(--transition-fast), transform var(--transition-fast);
}

.comparison-card:hover {
  border-color: rgba(168, 85, 247, 0.5);
  transform: translateY(-3px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.55), 0 0 16px rgba(168, 85, 247, 0.2);
}

.comparison-header {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  margin-bottom: 0.25rem;
}

.comparison-header h4 {
  font-family: var(--font-family-heading);
  font-size: 1.15rem;
  font-weight: 700;
  color: #ffffff;
}

.tech-pill {
  align-self: flex-start;
  font-size: var(--font-size-xs);
  font-weight: 800;
  text-transform: uppercase;
  padding: 0.2rem 0.65rem;
  border-radius: var(--radius-full);
  letter-spacing: 0.05em;
}

.pill-purple {
  background: rgba(168, 85, 247, 0.18);
  color: var(--color-secondary);
  border: 1px solid rgba(168, 85, 247, 0.45);
  box-shadow: 0 0 10px rgba(168, 85, 247, 0.25);
}

.pill-cyan {
  background: rgba(54, 217, 232, 0.16);
  color: var(--color-accent);
  border: 1px solid rgba(54, 217, 232, 0.45);
  box-shadow: 0 0 10px rgba(54, 217, 232, 0.25);
}

.comparison-desc {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}

.prop-list {
  padding-left: var(--spacing-md);
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: 1.6;
}

/* Demonstração do Cálculo em Dark Theme com Iluminação Neon */
.calc-box {
  margin-top: var(--spacing-lg);
  background: rgba(10, 7, 20, 0.85);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid rgba(54, 217, 232, 0.35);
  border-radius: var(--radius-xl);
  padding: var(--spacing-lg);
  box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.7), 0 8px 25px rgba(0, 0, 0, 0.45);
  position: relative;
  overflow: hidden;
}

.calc-box::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--color-accent) 0%, var(--color-primary) 100%);
}

.calc-title {
  font-family: var(--font-family-heading);
  color: var(--color-accent);
  font-size: 1.15rem;
  font-weight: 800;
  margin-bottom: var(--spacing-md);
  text-shadow: 0 0 12px rgba(54, 217, 232, 0.3);
}

.calc-steps {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.calc-step-row {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-sm);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.step-num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  background: rgba(38, 28, 64, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #ffffff;
  border-radius: 50%;
  font-size: var(--font-size-xs);
  font-weight: 800;
  flex-shrink: 0;
}

.highlight-step {
  background: rgba(54, 217, 232, 0.12);
  border: 1px solid rgba(54, 217, 232, 0.4);
  padding: 0.65rem;
  border-radius: var(--radius-md);
  color: #ffffff;
  box-shadow: 0 0 15px rgba(54, 217, 232, 0.15);
}

.highlight-num {
  background: var(--color-accent);
  color: #0b0816;
  border-color: transparent;
  box-shadow: 0 0 10px var(--color-accent);
}

.step-sub {
  color: var(--color-accent);
}

.calc-summary {
  margin-top: 0.5rem;
  padding-top: 0.75rem;
  border-top: 1px dashed rgba(255, 255, 255, 0.15);
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  line-height: 1.6;
}
</style>
