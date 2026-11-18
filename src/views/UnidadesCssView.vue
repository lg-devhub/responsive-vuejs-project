<script setup>
import SectionBlock from '../components/SectionBlock.vue'

const sources = [
  {
    title: 'MDN Web Docs — Valores e unidades CSS',
    url: 'https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Core/CSS_layout/Values_and_units',
    note: 'Guia completo de unidades relativas e absolutas'
  },
  {
    title: 'web.dev — As novas unidades de viewport (dvh, lvh, svh)',
    url: 'https://web.dev/blog/viewport-units',
    note: 'Resolução de barras dinâmicas em navegadores mobile'
  },
  {
    title: 'W3C CSS Values and Units Module Level 4',
    url: 'https://www.w3.org/TR/css-values-4/',
    note: 'Especificação técnica internacional'
  }
]

const prevRoute = {
  path: '/por-que-responsividade-importa',
  title: 'Módulo 1: Introdução'
}

const nextRoute = {
  path: '/flexbox-grid',
  title: 'Módulo 3: Flexbox & Grid'
}
</script>

<template>
  <SectionBlock
    section-number="2"
    theme-subtitle="Vice City • Módulo 2"
    title="CSS Units: Unidades CSS"
    subtitle="Domine o uso estratégico de px, rem, em, %, fr, vw, vh, dvh e ch para construir interfaces escaláveis e acessíveis."
    guide-question="Por que textos definidos em rem podem aumentar quando o usuário modifica o tamanho da fonte do navegador, enquanto textos definidos em px podem permanecer visualmente inalterados?"
    guide-answer="O pixel (px) é uma unidade de medida absoluta na web: quando definimos font-size: 16px, travamos uma quantidade exata de pontos de hardware na tela e instruímos o navegador a ignorar qualquer preferência de acessibilidade configurada pelo usuário. Já o 'rem' (root em) é uma unidade estritamente relativa ao tamanho da fonte do elemento raiz (&lt;html&gt;). Por padrão nos navegadores, 1rem equivale ao tamanho de fonte escolhido pelo usuário (comumente 16px). Se um usuário com baixa visão ajusta a fonte padrão do seu sistema operacional ou navegador para 24px, 1rem passa a valer 24px automaticamente, escalando harmoniosamente todos os textos do site."
    :sources="sources"
    :prev-route="prevRoute"
    :next-route="nextRoute"
  >
    <template #explanation>
      <p>
        No ecossistema de CSS, a escolha das unidades de medida determina se a sua interface será rígida ou flexível.
        Dividimos as unidades em dois grandes grupos:
      </p>

      <div class="units-grid">
        <div class="unit-group-card">
          <h4 class="card-group-title">1. Unidades Absolutas</h4>
          <p class="unit-desc">
            Possuem valor fixo independente da resolução da tela ou das configurações do sistema.
          </p>
          <div class="unit-item">
            <code>px</code>: Pixel de CSS. Útil para bordas ultrafinas (ex: <code>1px solid ...</code>) ou sombras sutis, mas desaconselhado para tamanhos de texto e espaçamentos estruturais de acessibilidade.
          </div>
        </div>

        <div class="unit-group-card">
          <h4 class="card-group-title">2. Unidades Relativas (Recomendadas)</h4>
          <p class="unit-desc">
            Calculadas dinamicamente com base em outro elemento ou na viewport.
          </p>
          <ul class="unit-list">
            <li><code>rem</code>: Relativo ao tamanho da fonte da raiz (<code>&lt;html&gt;</code>). É o padrão ouro para tipografia, paddings e margens.</li>
            <li><code>em</code>: Relativo ao tamanho da fonte do elemento pai imediato. Excelente para botões que precisam ter ícones e paddings proporcionais ao texto do botão.</li>
            <li><code>%</code>: Porcentagem relativa à dimensão correspondente do contêiner pai.</li>
            <li><code>fr</code>: Fração do espaço livre disponível em um CSS Grid Container.</li>
            <li><code>vw / vh</code>: 1% da largura (viewport width) ou altura (viewport height) visível do navegador.</li>
            <li><code>dvh</code>: <em>Dynamic Viewport Height</em>. Altura dinâmica de viewport que se adapta automaticamente quando a barra de endereços do celular aparece ou se recolhe durante a rolagem.</li>
            <li><code>ch</code>: Largura do caractere "0" da fonte aplicada. Perfeita para determinar comprimentos de linha de leitura confortáveis (ex: <code>max-width: 65ch;</code>).</li>
          </ul>
        </div>
      </div>
    </template>

    <template #code>
      <pre class="code-block"><code>/* Aplicação prática e acessível de unidades */
:root {
  /* 1rem = 16px por padrão, mas respeita a escala de acessibilidade */
  --spacing-base: 1rem;
}

/* Tipografia e espaçamento acessível com rem */
h1 {
  font-size: 2rem;      /* 32px se base for 16px; 48px se o usuário usar base 24px */
  margin-bottom: 1rem;
}

/* Limite ergonômico de caracteres por linha com ch */
.artigo-conteudo {
  max-width: 65ch;     /* Entre 45 e 75 caracteres por linha para leitura ideal */
  margin-inline: auto;
  padding: 1.5rem;
}

/* Altura de tela cheia sem quebras no mobile com dvh */
.hero-banner {
  min-height: 100dvh;   /* Nunca é cortado pela barra de URL do Safari/Chrome no celular */
  display: flex;
  align-items: center;
}

/* Botão proporcional e autônomo com em */
.btn-tag {
  font-size: 0.875rem;
  padding: 0.5em 1em;   /* O padding se ajusta proporcionalmente se a fonte do botão mudar */
}</code></pre>
    </template>

    <template #answer-extra>
      <div class="tip-card">
        <span class="tip-badge">Acessibilidade na Prática (WCAG)</span>
        <p>
          Nunca fixe o corpo do texto em <code>px</code> (como <code>font-size: 16px</code>). Ao utilizar <code>rem</code>, você respeita pessoas que precisam de fontes maiores por questões de saúde ocular, cumprindo os critérios internacionais de acessibilidade web.
        </p>
      </div>
    </template>
  </SectionBlock>
</template>

<style scoped>
.units-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-md);
  margin-top: var(--spacing-md);
}

@media (min-width: 48rem) {
  .units-grid {
    grid-template-columns: 1fr 1.6fr;
  }
}

.unit-group-card {
  background: var(--color-surface-light);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.card-group-title {
  color: var(--color-accent);
  font-size: var(--font-size-base);
  margin-bottom: 0.25rem;
}

.unit-desc {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}

.unit-item {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.unit-list {
  padding-left: var(--spacing-md);
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: 1.5;
}

.tip-card {
  margin-top: var(--spacing-md);
  background: rgba(54, 217, 232, 0.08);
  border: 1px solid rgba(54, 217, 232, 0.25);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.tip-badge {
  font-family: var(--font-family-heading);
  font-size: var(--font-size-xs);
  font-weight: 700;
  text-transform: uppercase;
  color: var(--color-accent);
}

.tip-card p {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: 1.6;
}
</style>
