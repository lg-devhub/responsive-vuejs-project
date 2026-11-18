<script setup>
/**
 * Componente base para cada seção obrigatória do Guia.
 * Estrutura conforme solicitado no PDF do trabalho:
 * 1. Explicação curta
 * 2. Exemplo de código comentado
 * 3. Resposta à pergunta-guia da seção
 * 4. Fontes consultadas
 */

defineProps({
  sectionNumber: {
    type: [Number, String],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    default: ''
  },
  guideQuestion: {
    type: String,
    required: true
  },
  guideAnswer: {
    type: String,
    required: true
  },
  sources: {
    type: Array,
    default: () => []
  }
})
</script>

<template>
  <article class="section-card">
    <header class="section-header">
      <span class="section-tag">Seção {{ sectionNumber }}</span>
      <h1 class="section-title">{{ title }}</h1>
      <p v-if="subtitle" class="section-subtitle">{{ subtitle }}</p>
    </header>

    <!-- 1. Explicação curta -->
    <div class="part-block">
      <h2 class="part-heading">1. Explicação Direta (Nível 1º Semestre)</h2>
      <div class="part-content">
        <slot name="explanation"></slot>
      </div>
    </div>

    <!-- 2. Exemplo de código comentado -->
    <div class="part-block">
      <h2 class="part-heading">2. Exemplo de Código Comentado</h2>
      <div class="part-content">
        <slot name="code"></slot>
      </div>
    </div>

    <!-- 3. Pergunta-guia e Resposta visível -->
    <div class="part-block">
      <h2 class="part-heading">3. Pergunta-Guia & Solução</h2>
      <div class="question-box">
        <h4>❓ Pergunta-guia da Seção:</h4>
        <p>{{ guideQuestion }}</p>
      </div>
      <div class="answer-box">
        <h4>💡 Resposta Explicada:</h4>
        <p>{{ guideAnswer }}</p>
        <slot name="answer-extra"></slot>
      </div>
    </div>

    <!-- 4. Fontes consultadas -->
    <footer class="part-block sources-block">
      <h3 class="sources-heading">4. Fontes Consultadas</h3>
      <ul class="sources-list">
        <li v-for="(source, index) in sources" :key="index">
          <a :href="source.url" target="_blank" rel="noopener noreferrer">
            {{ source.title }}
          </a>
          <span v-if="source.note" class="source-note"> — {{ source.note }}</span>
        </li>
      </ul>
    </footer>
  </article>
</template>

<style scoped>
.section-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-sm);
}

.section-header {
  border-bottom: 2px solid var(--color-surface-muted);
  padding-bottom: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
}

.section-tag {
  display: inline-block;
  background-color: #dbeafe;
  color: var(--color-primary-dark);
  font-size: var(--font-size-xs);
  font-weight: 700;
  padding: 0.2rem 0.6rem;
  border-radius: var(--radius-sm);
  margin-bottom: var(--spacing-xs);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.section-title {
  font-size: var(--font-size-3xl);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-xs);
}

.section-subtitle {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
}

.part-block {
  margin-bottom: var(--spacing-xl);
}

.part-heading {
  font-size: var(--font-size-xl);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-sm);
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.part-content {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  line-height: 1.7;
}

.sources-block {
  margin-top: var(--spacing-xl);
  padding-top: var(--spacing-md);
  border-top: 1px dashed var(--color-border);
}

.sources-heading {
  font-size: var(--font-size-lg);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-xs);
}

.sources-list {
  padding-left: var(--spacing-lg);
}

.sources-list li {
  margin-bottom: var(--spacing-xs);
  font-size: var(--font-size-sm);
}

.source-note {
  color: var(--color-text-muted);
}
</style>
