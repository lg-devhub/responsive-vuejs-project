<script setup>
import SectionBlock from '../components/SectionBlock.vue'

const sources = [
  {
    title: 'Vue.js Oficial — Guia de Estilo (Regras de Prioridade A - Essenciais)',
    url: 'https://vuejs.org/style-guide/',
    note: 'Convenções oficiais de nomes de componentes, props e chaves no v-for'
  },
  {
    title: 'web.dev — Core Web Vitals (LCP, INP e CLS)',
    url: 'https://web.dev/explore/vitals',
    note: 'Métricas oficiais de performance e estabilidade visual do Google'
  },
  {
    title: 'Vue Router — Carregamento de Rotas sob Demanda (Lazy Loading)',
    url: 'https://router.vuejs.org/guide/advanced/lazy-loading.html',
    note: 'Otimização de bundles com importação dinâmica de componentes'
  }
]

const prevRoute = {
  path: '/imagens-responsivas',
  title: 'Módulo 4: Imagens Responsivas'
}

const nextRoute = {
  path: '/laboratorios',
  title: 'Ir para os Laboratórios Práticos (🧪)'
}
</script>

<template>
  <SectionBlock
    section-number="5"
    theme-subtitle="Vice City • Módulo 5"
    title="Developer's Garage: Boas Práticas em Vue"
    subtitle="Arquitetura de componentes, tipagem estrita, reconciliação de Virtual DOM, tokens e Core Web Vitals."
    guide-question="O que pode acontecer quando uma lista renderizada com v-for não utiliza :key e o primeiro elemento é removido após o usuário digitar informações em um campo de texto do segundo elemento?"
    guide-answer="O texto digitado pelo usuário no campo do segundo elemento continuará visível na tela, mas agora associado incorretamente ao elemento que assumiu o primeiro lugar da lista! Isso acontece porque, na ausência de uma chave exclusiva (:key), o algoritmo de reconciliação do Virtual DOM do Vue utiliza uma heurística de atualização 'in-place' (no mesmo local): ele reaproveita a estrutura do nó DOM existente, injeta os novos dados do primeiro item no primeiro nó e remove o último elemento do fim da lista. Como o estado de digitação de um &lt;input&gt; reside no nó do DOM real e não estava vinculado a uma chave única de identidade, o Vue reaproveita o input com o texto já digitado, gerando uma grave anomalia de interface."
    :sources="sources"
    :prev-route="prevRoute"
    :next-route="nextRoute"
  >
    <template #explanation>
      <p>
        Desenvolver aplicações escaláveis e profissionais com Vue 3 exige seguir boas práticas de engenharia de software e design de interfaces.
        Abaixo estão os 7 pilares fundamentais aplicados neste projeto:
      </p>

      <div class="practices-grid">
        <div class="practice-card">
          <h4>1. Organização e Separação de Papéis</h4>
          <p>
            Divida o projeto em diretórios com responsabilidade única: <code>src/components/</code> para componentes reutilizáveis, <code>src/views/</code> para páginas de rota, <code>src/stores/</code> para estado global Pinia e <code>src/services/</code> para chamadas de API.
          </p>
        </div>

        <div class="practice-card">
          <h4>2. Nomenclatura com Múltiplas Palavras (Multi-word)</h4>
          <p>
            Sempre nomeie componentes com duas ou mais palavras em PascalCase (ex: <code>SectionBlock.vue</code>, <code>BreakpointMonitor.vue</code>) para evitar colisões com tags HTML padrão existentes e futuras.
          </p>
        </div>

        <div class="practice-card">
          <h4>3. Props Tipadas e Eventos Declarados</h4>
          <p>
            Utilize <code>defineProps()</code> com tipos explícitos (<code>String</code>, <code>Number</code>, <code>Boolean</code>, <code>Array</code>) e declare eventos com <code>defineEmits()</code> para autocompletion e rastreabilidade estrita.
          </p>
        </div>

        <div class="practice-card">
          <h4>4. Uso Obrigatório de <code>:key</code> Único</h4>
          <p>
            Sempre vincule uma chave única estável (ex: <code>:key="item.id"</code>) em iterações com <code>v-for</code>. <strong>Nunca use o índice do array</strong> caso a lista possa sofrer adições, reordenações ou remoções.
          </p>
        </div>

        <div class="practice-card">
          <h4>5. Design Tokens em Variáveis CSS</h4>
          <p>
            Centralize cores, espaçamentos e fontes dentro de <code>:root</code>. Isso possibilita temas rápidos, consistência visual e manutenibilidade sem estilos mágicos espalhados.
          </p>
        </div>

        <div class="practice-card">
          <h4>6. Métricas Core Web Vitals</h4>
          <p>
            <strong>LCP (Largest Contentful Paint):</strong> Renderização rápida do elemento principal.
            <br>
            <strong>INP (Interaction to Next Paint):</strong> Resposta instantânea aos cliques do usuário.
            <br>
            <strong>CLS (Cumulative Layout Shift):</strong> Estabilidade visual sem saltos de layout.
          </p>
        </div>

        <div class="practice-card">
          <h4>7. Carregamento de Rotas sob Demanda (Lazy Loading)</h4>
          <p>
            No Vue Router, importe as visualizações dinamicamente com <code>component: () =&gt; import('../views/...')</code> para que o navegador baixe apenas o código da página que o usuário está visualizando.
          </p>
        </div>
      </div>
    </template>

    <template #code>
      <pre class="code-block"><code>&lt;!-- Exemplo: Componente Vue 3 com script setup, props tipadas e key correta --&gt;
&lt;script setup&gt;
// 1. Props fortemente tipadas e validadas
const props = defineProps({
  inventarioCarros: {
    type: Array,
    required: true
  }
})

// 2. Emissão de eventos customizados
const emit = defineEmits(['removerCarro', 'atualizarNota'])
&lt;/script&gt;

&lt;template&gt;
  &lt;ul class="lista-carros"&gt;
    &lt;!-- 3. :key com id exclusivo do item: previne bugs de reaproveitamento do DOM --&gt;
    &lt;li v-for="carro in inventarioCarros" :key="carro.id" class="item-carro"&gt;
      &lt;strong&gt;{{ carro.modelo }}&lt;/strong&gt;
      &lt;input
        type="text"
        placeholder="Adicionar anotação..."
        @change="emit('atualizarNota', carro.id, $event.target.value)"
      /&gt;
      &lt;button @click="emit('removerCarro', carro.id)" class="btn-delete"&gt;
        Excluir
      &lt;/button&gt;
    &lt;/li&gt;
  &lt;/ul&gt;
&lt;/template&gt;</code></pre>
    </template>

    <template #answer-extra>
      <div class="tip-card">
        <span class="tip-badge">Regra de Ouro do Virtual DOM</span>
        <p>
          O <code>:key</code> é o documento de identidade único que o Vue utiliza para reconciliar nós virtuais com elementos reais do navegador. Sem ele, dados digitados em formulários dinâmicos podem permanecer no nó reciclado e corromper os dados exibidos.
        </p>
      </div>
    </template>
  </SectionBlock>
</template>

<style scoped>
.practices-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-md);
  margin-top: var(--spacing-md);
}

@media (min-width: 48rem) {
  .practices-grid {
    grid-template-columns: 1fr 1fr;
  }
}

.practice-card {
  background: var(--color-surface-light);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.practice-card h4 {
  font-size: var(--font-size-base);
  color: var(--color-accent);
}

.practice-card p {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.tip-card {
  margin-top: var(--spacing-md);
  background: rgba(168, 85, 247, 0.08);
  border: 1px solid rgba(168, 85, 247, 0.25);
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
  color: var(--color-secondary);
}

.tip-card p {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: 1.6;
}
</style>
