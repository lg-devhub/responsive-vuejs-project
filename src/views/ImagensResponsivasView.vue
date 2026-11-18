<script setup>
import SectionBlock from '../components/SectionBlock.vue'

const sources = [
  {
    title: 'web.dev — Otimização de Mudança de Layout Cumulativa (CLS)',
    url: 'https://web.dev/cls/',
    note: 'Como evitar saltos inesperados de layout durante o carregamento'
  },
  {
    title: 'MDN Web Docs — Imagens responsivas e elemento picture',
    url: 'https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Responsive_Design/Responsive_images',
    note: 'Uso de srcset, sizes e aspect-ratio moderno'
  }
]
</script>

<template>
  <SectionBlock
    section-number="4"
    title="Imagens Responsivas e Performance"
    subtitle="max-width, dimensões HTML, aspect-ratio, lazy loading consciente e prevenção de CLS."
    guide-question="Ao abrir uma página, o texto aparece primeiro. Quando a imagem termina de carregar, ela empurra o texto para baixo. Por que isso acontece quando a imagem não tem width e height no HTML? Qual métrica do Google mede esse problema?"
    guide-answer="Isso acontece porque, sem os atributos 'width' e 'height' explícitos no HTML (ou sem a propriedade CSS 'aspect-ratio'), o navegador não sabe antecipadamente qual é a proporção e o tamanho que a imagem terá. Durante o carregamento inicial do HTML, o navegador reserva 0px de altura para a imagem ainda não baixada. Quando o arquivo da imagem finalmente chega pela rede, o navegador descobre suas dimensões reais e é obrigado a recalcular o layout da página (reflow), empurrando bruscamente os textos que já estavam visíveis. A métrica do Google Core Web Vitals que mede e penaliza esses saltos visuais na página chama-se CLS (Cumulative Layout Shift)."
    :sources="sources"
  >
    <template #explanation>
      <p>
        Imagens mal configuradas são as maiores vilãs da lentidão e da má experiência em páginas web.
        Para torná-las responsivas e eficientes, seguimos algumas regras de ouro:
      </p>
      <ul style="margin: 0.75rem 0 0.75rem 1.5rem;">
        <li>
          <strong><code>max-width: 100%</code> e <code>height: auto</code>:</strong> Garante que a imagem nunca ultrapasse a largura do contêiner onde está inserida, redimensionando proporcionalmente.
        </li>
        <li>
          <strong>Atributos <code>width</code> e <code>height</code> no HTML:</strong> Não servem para fixar o tamanho em pixels estáticos, mas sim para informar ao navegador a <em>proporção de aspecto (aspect-ratio)</em> antes do download terminar, reservando o espaço em branco exato e evitando o "salto" de conteúdo (CLS).
        </li>
        <li>
          <strong><code>loading="lazy"</code>:</strong> Adia o download de imagens que estão fora da tela inicial (abaixo da dobra). <em>Atenção:</em> <strong>NÃO</strong> use lazy loading na imagem principal de destaque do topo (imagem LCP), pois isso atrasaria desnecessariamente a primeira impressão visual da página!
        </li>
        <li>
          <strong><code>object-fit: cover</code>:</strong> Recorta e preenche o espaço sem distorcer nem achatar a imagem.
        </li>
        <li>
          <strong><code>srcset</code> e <code>&lt;picture&gt;</code>:</strong> Permite enviar imagens menores e mais leves para celulares e versões de alta resolução apenas para telas retina/computador.
        </li>
      </ul>
    </template>

    <template #code>
      <pre class="code-block"><code>&lt;!-- Imagem responsiva recomendada (com proporção reservada e lazy loading) --&gt;
&lt;img
  src="/foto-800.webp"
  srcset="/foto-400.webp 400w, /foto-800.webp 800w, /foto-1200.webp 1200w"
  sizes="(max-width: 600px) 100vw, 800px"
  width="800"
  height="600"
  loading="lazy"
  alt="Exemplo ilustrativo de imagem responsiva"
  class="img-fluida"
/&gt;

&lt;style&gt;
  .img-fluida {
    max-width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: var(--radius-md);
  }
&lt;/style&gt;</code></pre>
    </template>

    <template #answer-extra>
      <div style="margin-top: 0.75rem; font-size: var(--font-size-sm); color: var(--color-text-secondary);">
        <strong>Dica prática:</strong> Sempre defina <code>width="..." height="..."</code> diretamente no HTML da tag <code>&lt;img&gt;</code> ou adicione <code>aspect-ratio: 16 / 9;</code> no CSS. O navegador moderno cuida do restante para você zerar seu CLS.
      </div>
    </template>
  </SectionBlock>
</template>
