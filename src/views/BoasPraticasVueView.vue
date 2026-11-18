<script setup>
import SectionBlock from '../components/SectionBlock.vue'

const sources = [
  {
    title: 'Vue.js Oficial — Guia de Estilo (Boas Práticas e Regras de Prioridade A)',
    url: 'https://vuejs.org/style-guide/',
    note: 'Convenções oficiais de nomes, props e chaves no v-for'
  },
  {
    title: 'web.dev — Core Web Vitals (LCP, INP, CLS)',
    url: 'https://web.dev/explore/vitals',
    note: 'Métricas oficiais do Google para experiência do usuário na web'
  }
]
</script>

<template>
  <SectionBlock
    section-number="5"
    title="Boas Práticas em Projetos Vue.js"
    subtitle="Arquitetura de componentes, tipagem, reconciliação de Virtual DOM e Core Web Vitals."
    guide-question="Uma lista de animais é exibida com v-for, sem :key, e cada item tem um campo de texto. A pessoa digita algo no campo do segundo animal, e em seguida o primeiro animal é removido da lista. O que pode acontecer com o texto digitado, e por quê?"
    guide-answer="O texto digitado pela pessoa no segundo animal continuará aparecendo na tela, mas agora associado erroneamente ao animal que virou o primeiro da lista! Isso ocorre porque, sem uma chave única (:key), o mecanismo de Virtual DOM do Vue adota uma estratégia de atualização rápida no mesmo local ('in-place patch'): ele simplesmente atualiza os dados do primeiro elemento com os novos dados recebidos e remove o último elemento DOM do fim da lista. Como o estado de digitação interna do elemento <input> pertence ao nó do DOM real e não estava atrelado a um :key único de identificação de objeto, o Vue reutilizou o input existente, fazendo o texto digitado 'dançar' de forma incorreta para outro item da lista."
    :sources="sources"
  >
    <template #explanation>
      <p>
        Para manter um projeto Vue escalável, legível e livre de bugs difíceis de rastrear, seguimos padrões consagrados:
      </p>
      <ul style="margin: 0.75rem 0 0.75rem 1.5rem;">
        <li>
          <strong>Estrutura de Pastas e Nomes:</strong> Separamos visualizações de rotas em <code>src/views/</code> e peças reutilizáveis em <code>src/components/</code>. Nomes de componentes devem ter sempre múltiplas palavras (Multi-word, ex: <code>AppNavbar.vue</code>, <code>SectionBlock.vue</code>), evitando conflitos com tags nativas do HTML.
        </li>
        <li>
          <strong>Props Tipadas e Validadas:</strong> Use <code>defineProps({ titulo: { type: String, required: true } })</code> em vez de arrays genéricos. Isso fornece autocompletion e avisos no console durante o desenvolvimento.
        </li>
        <li>
          <strong>Obrigatório <code>:key</code> único no <code>v-for</code>:</strong> Sempre vincule um ID único (ex: <code>:key="animal.id"</code>) para que o Vue saiba exatamente qual nó do DOM mover ou destruir.
        </li>
        <li>
          <strong>Variáveis CSS como Design Tokens:</strong> Declarar cores, fontes e espaçamentos no <code>:root</code> garante consistência visual e facilidade para temas e responsividade.
        </li>
        <li>
          <strong>Core Web Vitals & Carregamento sob Demanda:</strong>
          <ul style="margin-top: 0.25rem; margin-left: 1.5rem;">
            <li><strong>LCP (Largest Contentful Paint):</strong> Mede o tempo até o maior elemento visual (geralmente título ou imagem hero) aparecer na tela.</li>
            <li><strong>INP (Interaction to Next Paint):</strong> Mede a resposta da interface aos cliques e interações do usuário.</li>
            <li><strong>CLS (Cumulative Layout Shift):</strong> Mede a estabilidade visual para que nada pule na tela enquanto carrega.</li>
            <li><strong>Lazy Loading de Rotas:</strong> Carregue componentes de rota sob demanda com <code>component: () => import(...)</code> no Vue Router, diminuindo o tamanho inicial do bundle JavaScript.</li>
          </ul>
        </li>
      </ul>
    </template>

    <template #code>
      <pre class="code-block"><code>&lt;!-- Exemplo: Componente Vue 3 moderno com script setup e boas práticas --&gt;
&lt;script setup&gt;
import { defineProps, defineEmits } from 'vue'

// 1. Props estritamente tipadas e documentadas
const props = defineProps({
  listaAnimais: {
    type: Array,
    required: true
  }
})

// 2. Eventos declarados
const emit = defineEmits(['removerAnimal'])
&lt;/script&gt;

&lt;template&gt;
  &lt;ul&gt;
    &lt;!-- 3. :key com id exclusivo do item, NUNCA omitir e evitar índice do array! --&gt;
    &lt;li v-for="animal in listaAnimais" :key="animal.id" class="item-animal"&gt;
      &lt;span&gt;{{ animal.nome }}&lt;/span&gt;
      &lt;input type="text" placeholder="Observação..." /&gt;
      &lt;button @click="emit('removerAnimal', animal.id)"&gt;Remover&lt;/button&gt;
    &lt;/li&gt;
  &lt;/ul&gt;
&lt;/template&gt;</code></pre>
    </template>

    <template #answer-extra>
      <div style="margin-top: 0.75rem; font-size: var(--font-size-sm); color: var(--color-text-secondary);">
        <strong>Resumo do :key:</strong> O <code>:key</code> funciona como a "identidade digital" do elemento no Virtual DOM. Sem ele, o Vue reutiliza elementos visuais cegamente e gera anomalias em formulários e listas.
      </div>
    </template>
  </SectionBlock>
</template>
