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
  }
]
</script>

<template>
  <SectionBlock
    section-number="3"
    title="Flexbox e CSS Grid"
    subtitle="Layout unidimensional vs. bidimensional e a magia do repeat(auto-fit, minmax())."
    guide-question="Um contêiner usa grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr)) e gap: 1rem. A partir de qual largura do contêiner, em px, os cards deixam de ficar em 1 coluna e passam para 2? Considerem 1rem = 16px e mostrem a conta."
    guide-answer="Os cards passam de 1 para 2 colunas a partir de 464px de largura interna do contêiner."
    :sources="sources"
  >
    <template #explanation>
      <p>
        A regra principal para saber qual usar é simples:
      </p>
      <ul style="margin: 0.75rem 0 0.75rem 1.5rem;">
        <li>
          <strong>Flexbox (Unidimensional):</strong> Cuida de elementos distribuídos em <em>uma linha OU em uma coluna</em>.
          É perfeito para barras de navegação, centralização de botões, grupos de tags e controles com <code>justify-content</code> (alinhamento no eixo principal), <code>align-items</code> (no eixo transversal), <code>flex-wrap</code> (quebra de linha) e <code>gap</code>.
        </li>
        <li>
          <strong>CSS Grid (Bidimensional):</strong> Cuida de linhas <em>E</em> colunas simultaneamente.
          É perfeito para layouts gerais de páginas, galerias de fotos e painéis em grade. Com a fórmula <code>repeat(auto-fit, minmax(14rem, 1fr))</code>, o Grid calcula sozinho quantas colunas cabem na tela sem precisar de nenhuma media query manual!
        </li>
      </ul>
    </template>

    <template #code>
      <pre class="code-block"><code>/* 1. Exemplo com Flexbox: barra de navegação alinhada */
.nav-menu {
  display: flex;
  justify-content: space-between; /* Espaça itens nas extremidades */
  align-items: center;            /* Centraliza verticalmente */
  flex-wrap: wrap;                /* Se faltar espaço, quebra para linha de baixo */
  gap: 1rem;                      /* Espaço uniforme entre os itens */
}

/* 2. Exemplo com Grid: galeria que se auto-ajusta sem media query */
.cards-grid {
  display: grid;
  /* Cria tantas colunas de no mínimo 14rem quantas couberem; se sobrar espaço, expandem proporcionalmente (1fr) */
  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
  gap: 1rem;
}</code></pre>
    </template>

    <template #answer-extra>
      <div style="margin-top: 1rem; background: #ffffff; padding: 1rem; border-radius: 0.5rem; border: 1px solid #bbf7d0;">
        <h5 style="color: #166534; margin-bottom: 0.5rem;">Demonstração do Cálculo Passo a Passo:</h5>
        <ol style="margin-left: 1.5rem; line-height: 1.8;">
          <li>Valor de referência dado: <code>1rem = 16px</code>.</li>
          <li>Largura mínima de 1 coluna (card): <code>14rem = 14 &times; 16px = 224px</code>.</li>
          <li>Espaçamento entre colunas (gap): <code>1rem = 16px</code>.</li>
          <li>Para caberem 2 colunas, o contêiner precisa comportar:
            <br>
            <code>(Largura Mínima Coluna 1) + (Gap) + (Largura Mínima Coluna 2)</code>
          </li>
          <li>
            <code>224px + 16px + 224px = <strong>464px</strong></code>
            <br>
            (Ou em rem: <code>14rem + 1rem + 14rem = 29rem</code> &rarr; <code>29 &times; 16px = 464px</code>).
          </li>
          <li><strong>Conclusão:</strong> Enquanto o contêiner tiver menos de 464px de largura, ele exibirá apenas 1 coluna ocupando todo o espaço disponível (1fr). A partir de exatamente <strong>464px</strong>, haverá espaço suficiente para a 2ª coluna entrar!</li>
        </ol>
      </div>
    </template>
  </SectionBlock>
</template>
