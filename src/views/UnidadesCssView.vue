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
  }
]
</script>

<template>
  <SectionBlock
    section-number="2"
    title="Unidades CSS: Absolutas e Relativas"
    subtitle="Domine rem, em, %, fr, vw, vh, dvh e ch para construir páginas adaptáveis e acessíveis."
    guide-question="Uma pessoa com baixa visão aumenta o tamanho da fonte nas configurações do navegador. O texto definido em px continua do mesmo tamanho, e o definido em rem aumenta. Por que essa diferença acontece?"
    guide-answer="O pixel (px) é uma unidade de medida absoluta na web: quando você define font-size: 16px, você está fixando uma quantidade exata de pontos na tela e forçando o navegador a ignorar a preferência de acessibilidade do usuário. Já o 'rem' (root em) é uma unidade relativa ao elemento raiz (html). Por padrão, 1rem equivale ao tamanho de fonte configurado pelo usuário (geralmente 16px). Se o usuário vai nas configurações do sistema ou navegador e ajusta a fonte padrão para 24px, 1rem passa a valer 24px automaticamente, escalando todo o site e garantindo a inclusão de quem tem baixa visão."
    :sources="sources"
  >
    <template #explanation>
      <p>
        No CSS, dividimos as unidades em dois grandes grupos:
      </p>
      <ul style="margin: 0.75rem 0 0.75rem 1.5rem;">
        <li><strong>Absolutas (ex: <code>px</code>):</strong> Têm sempre o mesmo tamanho fixo, independentemente do tamanho da tela ou das preferências do usuário.</li>
        <li><strong>Relativas:</strong> Seu tamanho é calculado em relação a outro elemento ou à janela de exibição:
          <ul style="margin-top: 0.5rem; margin-left: 1.5rem;">
            <li><code>rem</code>: Relativo à fonte do elemento raiz (<code>&lt;html&gt;</code>). Ideal para tipografia, paddings e margens acessíveis.</li>
            <li><code>em</code>: Relativo ao tamanho da fonte do próprio elemento pai. Útil em componentes isolados ou botões proporcionais.</li>
            <li><code>%</code>: Relativo à dimensão correspondente do contêiner pai.</li>
            <li><code>fr</code>: Fração do espaço livre (usado exclusivamente no CSS Grid).</li>
            <li><code>vw / vh</code>: Porcentagem da largura (viewport width) ou altura total da janela.</li>
            <li><code>dvh</code>: Dynamic Viewport Height — altura dinâmica que se ajusta quando a barra de endereços do celular sobe ou desce!</li>
            <li><code>ch</code>: Largura do caractere "0" da fonte atual. Perfeito para definir largura máxima de leitura confortável em textos (ex: <code>max-width: 65ch;</code>).</li>
          </ul>
        </li>
      </ul>
    </template>

    <template #code>
      <pre class="code-block"><code>/* Exemplo de uso consciente das unidades */
:root {
  /* 1rem = 16px por padrão, mas acompanha a preferência do usuário */
  --font-base: 1rem;
}

body {
  font-size: var(--font-base);
}

.artigo-leitura {
  /* Largura ideal para leitura confortável de olhos humanos (cerca de 65 caracteres) */
  max-width: 65ch;
  margin: 0 auto;
  padding: 1.5rem; /* 24px proporcionais */
}

.hero-tela-cheia {
  /* dvh evita que a barra do Safari/Chrome no celular corte o botão inferior */
  min-height: 100dvh;
  display: flex;
  align-items: center;
}</code></pre>
    </template>

    <template #answer-extra>
      <div style="margin-top: 0.75rem; font-size: var(--font-size-sm); color: var(--color-text-secondary);">
        <strong>Dica de Ouro:</strong> Para acessibilidade profissional, use <code>rem</code> para fontes e espaçamentos estruturais, e evite travar fontes em <code>px</code>.
      </div>
    </template>
  </SectionBlock>
</template>
