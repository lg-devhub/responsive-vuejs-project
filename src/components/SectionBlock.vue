<script setup>
import { RouterLink } from 'vue-router'

/**
 * Componente base para cada seção obrigatória do Guia.
 * Estrutura conforme solicitado no ERS do trabalho:
 * 1. Explicação curta (nível 1º semestre)
 * 2. Exemplo de código comentado
 * 3. Resposta à pergunta-guia da seção
 * 4. Fontes consultadas
 */

defineProps({
  sectionNumber: {
    type: [Number, String],
    required: true
  },
  themeSubtitle: {
    type: String,
    default: 'Vice City Edition'
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
  },
  prevRoute: {
    type: Object,
    default: null
  },
  nextRoute: {
    type: Object,
    default: null
  }
})
</script>

<template>
  <article class="section-card">
    <!-- Cabeçalho da Seção com Identidade Vice City -->
    <header class="section-header">
      <div class="tag-group">
        <span class="section-badge">Módulo {{ sectionNumber }}</span>
        <span class="theme-tag">{{ themeSubtitle }}</span>
      </div>
      <h1 class="section-title">{{ title }}</h1>
      <p v-if="subtitle" class="section-subtitle">{{ subtitle }}</p>
    </header>

    <!-- 1. Explicação curta -->
    <section class="part-block" aria-labelledby="part1-heading">
      <h2 id="part1-heading" class="part-heading">
        <span class="part-number">1</span>
        <span>Explicação Direta (Nível 1º Semestre)</span>
      </h2>
      <div class="part-content">
        <slot name="explanation"></slot>
      </div>
    </section>

    <!-- 2. Exemplo de código comentado -->
    <section class="part-block" aria-labelledby="part2-heading">
      <h2 id="part2-heading" class="part-heading">
        <span class="part-number">2</span>
        <span>Exemplo de Código Comentado</span>
      </h2>
      <div class="part-content">
        <slot name="code"></slot>
      </div>
    </section>

    <!-- 3. Pergunta-guia e Resposta explicada -->
    <section class="part-block" aria-labelledby="part3-heading">
      <h2 id="part3-heading" class="part-heading">
        <span class="part-number">3</span>
        <span>Pergunta-Guia & Solução Detalhada</span>
      </h2>

      <div class="question-box">
        <h4>
          <span class="q-icon">❓</span>
          <span>Pergunta-Guia da Seção:</span>
        </h4>
        <p class="question-text">{{ guideQuestion }}</p>
      </div>

      <div class="answer-box">
        <h4>
          <span class="a-icon">💡</span>
          <span>Resposta Fundamentada:</span>
        </h4>
        <p class="answer-text">{{ guideAnswer }}</p>
        <slot name="answer-extra"></slot>
      </div>
    </section>

    <!-- 4. Fontes consultadas -->
    <footer class="part-block sources-block" aria-labelledby="part4-heading">
      <h3 id="part4-heading" class="sources-heading">
        <span class="sources-icon">📚</span>
        <span>Fontes e Documentações Consultadas</span>
      </h3>
      <ul class="sources-list">
        <li v-for="(source, index) in sources" :key="index">
          <a :href="source.url" target="_blank" rel="noopener noreferrer" class="source-link">
            {{ source.title }}
          </a>
          <span v-if="source.note" class="source-note"> — {{ source.note }}</span>
        </li>
      </ul>
    </footer>

    <!-- Navegação Sequencial entre Módulos -->
    <nav v-if="prevRoute || nextRoute" class="section-nav" aria-label="Navegação entre Módulos">
      <RouterLink
        v-if="prevRoute"
        :to="prevRoute.path"
        class="btn btn-secondary nav-btn prev-btn"
      >
        ← {{ prevRoute.title }}
      </RouterLink>
      <div v-else class="nav-spacer"></div>

      <RouterLink
        v-if="nextRoute"
        :to="nextRoute.path"
        class="btn nav-btn next-btn"
      >
        {{ nextRoute.title }} →
      </RouterLink>
    </nav>
  </article>
</template>

<style scoped>
.section-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-lg), 0 0 25px rgba(0, 0, 0, 0.4);
  position: relative;
  overflow: hidden;
}

@media (min-width: 48rem) {
  .section-card {
    padding: var(--spacing-2xl);
  }
}

.section-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--gradient-sunset);
}

.section-header {
  border-bottom: 1px solid var(--color-border);
  padding-bottom: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
}

.tag-group {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  flex-wrap: wrap;
  margin-bottom: var(--spacing-xs);
}

.section-badge {
  display: inline-flex;
  align-items: center;
  background: rgba(255, 79, 163, 0.15);
  color: var(--color-primary);
  border: 1px solid rgba(255, 79, 163, 0.35);
  font-size: var(--font-size-xs);
  font-weight: 700;
  padding: 0.2rem 0.6rem;
  border-radius: var(--radius-sm);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.theme-tag {
  display: inline-flex;
  align-items: center;
  background: rgba(54, 217, 232, 0.12);
  color: var(--color-accent);
  border: 1px solid rgba(54, 217, 232, 0.25);
  font-size: var(--font-size-xs);
  font-weight: 600;
  padding: 0.2rem 0.6rem;
  border-radius: var(--radius-sm);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.section-title {
  font-size: var(--font-size-2xl);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-xs);
  letter-spacing: -0.02em;
}

@media (min-width: 48rem) {
  .section-title {
    font-size: var(--font-size-3xl);
  }
}

.section-subtitle {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.part-block {
  margin-bottom: var(--spacing-2xl);
}

.part-heading {
  font-size: var(--font-size-lg);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-md);
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.part-number {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.75rem;
  height: 1.75rem;
  background: var(--gradient-sunset);
  color: #ffffff;
  border-radius: 50%;
  font-size: var(--font-size-xs);
  font-weight: 800;
  flex-shrink: 0;
}

.part-content {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  line-height: 1.75;
}

.question-text {
  font-size: var(--font-size-base);
  color: var(--color-text-primary);
  line-height: 1.6;
}

.answer-text {
  font-size: var(--font-size-base);
  color: var(--color-text-primary);
  line-height: 1.7;
}

.sources-block {
  margin-top: var(--spacing-2xl);
  padding-top: var(--spacing-lg);
  border-top: 1px dashed var(--color-border);
}

.sources-heading {
  font-size: var(--font-size-md);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-sm);
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.sources-list {
  padding-left: var(--spacing-lg);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.sources-list li {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.source-link {
  color: var(--color-accent);
  font-weight: 500;
}

.source-link:hover {
  color: var(--color-primary);
  text-decoration: underline;
}

.source-note {
  color: var(--color-text-muted);
}

/* Navegação entre seções */
.section-nav {
  margin-top: var(--spacing-2xl);
  padding-top: var(--spacing-lg);
  border-top: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-md);
  flex-wrap: wrap;
}

.nav-spacer {
  flex: 1;
}

.nav-btn {
  font-size: var(--font-size-xs);
}
</style>
