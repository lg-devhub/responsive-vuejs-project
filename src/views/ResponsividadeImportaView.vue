<script setup>
import SectionBlock from '../components/SectionBlock.vue'

const sources = [
  {
    title: 'MDN Web Docs — Noções básicas de design responsivo',
    url: 'https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Core/CSS_layout/Responsive_Design',
    note: 'Visão geral de viewports e media queries'
  },
  {
    title: 'web.dev — Noções básicas de viewport responsivo',
    url: 'https://web.dev/responsive-web-design-basics/',
    note: 'Explicação detalhada sobre a tag meta viewport'
  }
]
</script>

<template>
  <SectionBlock
    section-number="1"
    title="Por que responsividade importa"
    subtitle="A base para criar páginas que funcionam e se adaptam com qualidade a qualquer tela."
    guide-question="Um site tem media queries bem escritas, mas não tem a meta tag viewport. No celular, ele aparece como a versão de computador, só que minúscula. Por que isso acontece, e o que a meta viewport muda?"
    guide-answer="Sem a meta tag viewport, os navegadores móveis (como o Safari no iOS ou o Chrome no Android) assumem por padrão que o site foi feito apenas para computadores antigos. Para evitar que o layout quebre, eles renderizam a página em uma tela virtual de cerca de 980 pixels e 'encolhem' tudo com zoom-out para caber na tela física. As media queries, ao consultarem o tamanho da janela, veem os 980px em vez da tela real e nunca são disparadas. A meta viewport corrige isso informando: 'use a largura real da tela do aparelho (width=device-width) e uma proporção de 1 para 1 (initial-scale=1.0)'."
    :sources="sources"
  >
    <template #explanation>
      <p>
        Imagine que a internet não é acessada apenas em um monitor de mesa de 24 polegadas: as pessoas usam smartphones,
        tablets, relógios inteligentes, notebooks e televisores.
      </p>
      <p style="margin-top: 0.75rem;">
        <strong>Design Responsivo</strong> significa construir o layout do site de forma flexível, para que textos,
        botões e imagens se reorganizem naturalmente no espaço disponível, sem exigir que o usuário dê zoom ou role a
        página para os lados horizontalmente.
      </p>
    </template>

    <template #code>
      <pre class="code-block"><code>&lt;!-- 1. No &lt;head&gt; do index.html: ESSENCIAL para qualquer site responsivo --&gt;
&lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;

&lt;!-- 2. No arquivo CSS: Mobile-First básico com media query --&gt;
&lt;style&gt;
  /* Estilo base (fora da media query): pensado para telas menores primeiro */
  .container {
    width: 100%;
    padding: 1rem;
  }

  /* Quando a tela tiver no mínimo 768px (tablets e computadores), aplicamos ajustes */
  @media (min-width: 768px) {
    .container {
      max-width: 720px;
      margin: 0 auto;
    }
  }
&lt;/style&gt;</code></pre>
    </template>

    <template #answer-extra>
      <div style="margin-top: 0.75rem; font-size: var(--font-size-sm); color: var(--color-text-secondary);">
        <strong>Resumo em 1 frase:</strong> A meta tag viewport é a chave que liga o dispositivo real ao motor de regras de estilo do CSS.
      </div>
    </template>
  </SectionBlock>
</template>
