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
  },
  {
    title: 'W3C — CSS Media Queries Level 4',
    url: 'https://www.w3.org/TR/mediaqueries-4/',
    note: 'Especificação técnica oficial sobre consultas de mídia e breakpoints'
  }
]

const nextRoute = {
  path: '/unidades-css',
  title: 'Módulo 2: Unidades CSS'
}
</script>

<template>
  <SectionBlock
    section-number="1"
    theme-subtitle="Vice City • Módulo 1"
    title="Welcome to Vice City: Introdução à Responsividade"
    subtitle="A base essencial para construir interfaces fluidas que se adaptam com maestria a smartphones, tablets e desktops."
    guide-question="Um site possui media queries perfeitamente configuradas, mas não apresenta a meta tag viewport no HTML. Por que ele aparece como uma versão miniaturizada da página de computador quando aberto em dispositivos móveis, e o que a viewport muda?"
    guide-answer="Sem a meta tag viewport, os navegadores móveis modernos (como o Safari no iOS ou o Chrome no Android) adotam um comportamento legado: para evitar que sites antigos quebrem, eles renderizam a página em uma 'tela virtual' de cerca de 980 pixels de largura e aplicam um zoom-out geral para encolher tudo e caber na tela física do aparelho. Como as media queries consultam essa viewport virtual de 980px em vez da largura física real, as regras para mobile nunca são ativadas. A meta tag viewport (&lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;&gt;) instrui o navegador a usar a largura real do dispositivo em escala 1:1, disparando os breakpoints corretamente."
    :sources="sources"
    :next-route="nextRoute"
  >
    <template #explanation>
      <p>
        No universo do desenvolvimento web moderno, os usuários acessam suas aplicações a partir de uma imensa variedade de telas:
        smartphones compactos, tablets na vertical ou horizontal, notebooks, telas ultrawide e televisores.
      </p>
      <p style="margin-top: 0.75rem;">
        <strong>Design Responsivo</strong> é a metodologia de design e código onde o layout responde ativamente ao ambiente do usuário.
        Em vez de criar versões separadas do mesmo site (como os antigos subdomínios <code>m.site.com</code>), utilizamos um único código HTML
        e estilos CSS que reorganizam textos, imagens e menus dinamicamente.
      </p>
      <p style="margin-top: 0.75rem;">
        Os pilares fundamentais são:
      </p>
      <ul style="margin: 0.5rem 0 0.5rem 1.5rem; line-height: 1.8;">
        <li><strong>Meta Tag Viewport:</strong> Informa as proporções e escala reais da tela física ao navegador.</li>
        <li><strong>Grids Fluidos:</strong> Contêineres que utilizam porcentagens e unidades relativas em vez de larguras fixas em pixels.</li>
        <li><strong>Media Queries Mobile-First:</strong> Regras CSS aplicadas com <code>@media (min-width: ...)</code> para enriquecer o layout progressivamente para telas maiores.</li>
      </ul>
    </template>

    <template #code>
      <pre class="code-block"><code>&lt;!-- 1. No &lt;head&gt; do index.html: REGRA MANDATÓRIA para qualquer página responsiva --&gt;
&lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;

&lt;!-- 2. No arquivo CSS: Abordagem Mobile-First com Media Query --&gt;
&lt;style&gt;
  /* Estilo base: escrito para celulares (telas menores) primeiro */
  .container {
    width: 100%;
    padding: 1rem; /* 16px */
    margin: 0 auto;
  }

  /* Breakpoint para telas maiores: quando a largura tiver no mínimo 48rem (768px) */
  @media (min-width: 48rem) {
    .container {
      max-width: 45rem; /* 720px */
    }
  }

  /* Breakpoint para desktops amplos: no mínimo 64rem (1024px) */
  @media (min-width: 64rem) {
    .container {
      max-width: 72rem; /* 1152px */
    }
  }
&lt;/style&gt;</code></pre>
    </template>

    <template #answer-extra>
      <div class="tip-card">
        <span class="tip-badge">Regra de Ouro</span>
        <p>
          A meta tag viewport é a "ponte" entre a tela física de vidro do celular e o motor de renderização do CSS. Sem ela, o dispositivo se comporta como um monitor de computador em miniatura.
        </p>
      </div>
    </template>
  </SectionBlock>
</template>

<style scoped>
.tip-card {
  margin-top: var(--spacing-md);
  background: rgba(255, 79, 163, 0.08);
  border: 1px solid rgba(255, 79, 163, 0.25);
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
  color: var(--color-primary);
}

.tip-card p {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: 1.6;
}
</style>
