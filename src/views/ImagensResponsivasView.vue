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
  },
  {
    title: 'web.dev — Largest Contentful Paint (LCP) e otimização de imagens hero',
    url: 'https://web.dev/lcp/',
    note: 'Por que imagens no topo da página nunca devem ter loading lazy'
  }
]

const prevRoute = {
  path: '/flexbox-grid',
  title: 'Módulo 3: Flexbox & Grid'
}

const nextRoute = {
  path: '/boas-praticas-vue',
  title: 'Módulo 5: Boas Práticas Vue'
}
</script>

<template>
  <SectionBlock
    section-number="4"
    theme-subtitle="Vice City • Módulo 4"
    title="Visual Experience: Imagens Responsivas"
    subtitle="max-width, dimensões HTML, aspect-ratio, loading consciente e prevenção de saltos de layout (CLS)."
    guide-question="Por que uma imagem sem os atributos width e height pode deslocar o conteúdo da página durante seu carregamento? Qual métrica do Google mede esse comportamento?"
    guide-answer="Sem os atributos 'width' e 'height' explícitos no HTML (ou sem a propriedade CSS 'aspect-ratio'), o navegador não consegue calcular previamente o espaço e a proporção que a imagem ocupará antes de baixá-la por completo. Durante o parse inicial da página, o navegador aloca provisoriamente 0px de altura para a imagem em download. No instante em que o arquivo da imagem finalmente chega pela rede, o navegador descobre suas dimensões reais e é forçado a recalcular o layout (reflow), empurrando bruscamente para baixo os textos que o usuário já estava lendo. A métrica do Google Core Web Vitals que mede e penaliza esses deslocamentos visuais inesperados é o CLS (Cumulative Layout Shift)."
    :sources="sources"
    :prev-route="prevRoute"
    :next-route="nextRoute"
  >
    <template #explanation>
      <p>
        Em interfaces ricas visualmente — especialmente inspiradas no estilo cinematográfico de Vice City —, o tratamento inadequado de imagens é o principal causador de lentidão e frustração do usuário.
      </p>
      <p style="margin-top: 0.75rem;">
        Para garantir imagens verdadeiramente responsivas e alta performance, seguimos 5 princípios técnicos:
      </p>

      <div class="image-rules-list">
        <div class="rule-card">
          <span class="rule-badge">Regra 1</span>
          <h4>Fluidez Básica com <code>max-width: 100%</code> e <code>height: auto</code></h4>
          <p>
            Impede que a imagem transborde a largura do seu contêiner pai, redimensionando sua altura proporcionalmente para não achatar ou distorcer a imagem.
          </p>
        </div>

        <div class="rule-card">
          <span class="rule-badge">Regra 2</span>
          <h4>Dimensões HTML para Zerar o CLS</h4>
          <p>
            Inserir <code>width="800" height="600"</code> no HTML <strong>não</strong> engessa o tamanho em pixels se você tiver <code>max-width: 100%</code> no CSS. Serve para o navegador calcular o <code>aspect-ratio (800/600 = 4/3)</code> e reservar o espaço exato na tela antes do download!
          </p>
        </div>

        <div class="rule-card">
          <span class="rule-badge">Regra 3</span>
          <h4>Uso Consciente do <code>loading="lazy"</code></h4>
          <p>
            Adia o carregamento de imagens que estão abaixo da dobra (fora do campo de visão inicial). <strong>Aviso crítico:</strong> NUNCA aplique <code>loading="lazy"</code> na imagem de destaque do topo da página (imagem LCP), pois isso atrasaria a renderização inicial perceptível.
          </p>
        </div>

        <div class="rule-card">
          <span class="rule-badge">Regra 4</span>
          <h4>Enquadramento com <code>object-fit: cover</code></h4>
          <p>
            Permite que imagens em cards preencham caixas de proporção fixa (ex: banners de 16/9) sem distorcer o aspecto original dos pixels.
          </p>
        </div>

        <div class="rule-card">
          <span class="rule-badge">Regra 5</span>
          <h4>Resoluções sob Medida com <code>srcset</code> e <code>sizes</code></h4>
          <p>
            Permite que o navegador do celular baixe uma versão leve de 400px de largura, enquanto uma tela 4K de computador baixa a versão de 1600px.
          </p>
        </div>
      </div>
    </template>

    <template #code>
      <pre class="code-block"><code>&lt;!-- Padrão Ouro da Web: Imagem Fluida, Proporção Reservada e Alta Performance --&gt;
&lt;img
  src="/images/vice-city-hero-800.webp"
  srcset="
    /images/vice-city-hero-400.webp 400w,
    /images/vice-city-hero-800.webp 800w,
    /images/vice-city-hero-1200.webp 1200w
  "
  sizes="(max-width: 48rem) 100vw, 800px"
  width="800"
  height="450"
  loading="lazy"
  alt="Vista panorâmica noturna com luzes neon de Vice City"
  class="responsive-media"
/&gt;

&lt;style&gt;
  .responsive-media {
    max-width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: var(--radius-md);
    aspect-ratio: 16 / 9; /* Garante a reserva espacial mesmo sem atributos no HTML */
  }
&lt;/style&gt;</code></pre>
    </template>

    <template #answer-extra>
      <div class="tip-card">
        <span class="tip-badge">Impacto no Google Core Web Vitals</span>
        <p>
          O Google penaliza fortemente páginas com <strong>CLS (Cumulative Layout Shift) &gt; 0.1</strong>. Manter <code>width</code> e <code>height</code> no HTML é a solução mais simples e eficaz para manter o CLS zerado (pontuação 0.0).
        </p>
      </div>
    </template>
  </SectionBlock>
</template>

<style scoped>
.image-rules-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-md);
}

.rule-card {
  background: var(--color-surface-light);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.rule-badge {
  font-family: var(--font-family-heading);
  font-size: var(--font-size-xs);
  font-weight: 700;
  text-transform: uppercase;
  color: var(--color-primary);
}

.rule-card h4 {
  font-size: var(--font-size-base);
  color: var(--color-text-primary);
}

.rule-card p {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: 1.6;
}

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
