<script setup>
import { RouterLink } from 'vue-router'

const sections = [
  {
    num: 1,
    title: 'Por que responsividade importa',
    desc: 'Entenda como a web se adapta a diferentes telas e o papel fundamental da meta tag viewport.',
    path: '/por-que-responsividade-importa'
  },
  {
    num: 2,
    title: 'Unidades CSS',
    desc: 'Absolutas vs. Relativas (rem, em, %, fr, vw, vh, dvh e ch) e seu impacto na acessibilidade.',
    path: '/unidades-css'
  },
  {
    num: 3,
    title: 'Flexbox e Grid',
    desc: 'Unidimensional vs. Bidimensional, justify-content, align-items, gap e repeat(auto-fit, minmax()).',
    path: '/flexbox-grid'
  },
  {
    num: 4,
    title: 'Imagens responsivas',
    desc: 'max-width, dimensões HTML, loading lazy, aspect-ratio, object-fit e prevenção de layout shift (CLS).',
    path: '/imagens-responsivas'
  },
  {
    num: 5,
    title: 'Boas práticas em projetos Vue',
    desc: 'Estrutura, convenções, props tipadas, :key no v-for, design tokens, Core Web Vitals e rotas sob demanda.',
    path: '/boas-praticas-vue'
  },
  {
    num: 6,
    title: 'Desafio Final',
    desc: 'Página final com pergunta e enigma prático que só se responde consultando este próprio guia.',
    path: '/desafio'
  }
]
</script>

<template>
  <div class="home-view">
    <section class="hero-card">
      <span class="hero-badge">Trabalho Semestral — Vue 3 + Vite</span>
      <h1 class="hero-title">Guia Interativo de Responsividade</h1>
      <p class="hero-desc">
        Bem-vindo ao esqueleto principal da nossa aplicação. Este guia aborda todos os tópicos obrigatórios
        de responsividade e boas práticas de desenvolvimento web moderno com Vue 3.
      </p>

      <div class="hero-actions">
        <RouterLink to="/por-que-responsividade-importa" class="btn">Iniciar pelo Módulo 1</RouterLink>
        <RouterLink to="/laboratorios" class="btn btn-secondary">Explorar Laboratórios Práticos 🧪</RouterLink>
      </div>
    </section>

    <section class="sections-overview">
      <h2 class="overview-title">Seções Obrigatórias do Guia</h2>
      <div class="cards-grid">
        <div v-for="sec in sections" :key="sec.num" class="card-item">
          <div class="card-header">
            <span class="card-num">{{ sec.num }}</span>
            <h3 class="card-heading">{{ sec.title }}</h3>
          </div>
          <p class="card-text">{{ sec.desc }}</p>
          <RouterLink :to="sec.path" class="card-link">Acessar seção &rarr;</RouterLink>
        </div>
      </div>
    </section>

    <section class="labs-banner">
      <div class="banner-content">
        <h3>Demonstrações Interativas (Laboratórios)</h3>
        <p>O guia inclui pelo menos 3 laboratórios práticos para ver os conceitos em ação: redimensionador de container, conversor de unidades e indicador de breakpoint.</p>
      </div>
      <RouterLink to="/laboratorios" class="btn">Abrir Laboratórios</RouterLink>
    </section>
  </div>
</template>

<style scoped>
.hero-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--spacing-2xl);
  margin-bottom: var(--spacing-xl);
  box-shadow: var(--shadow-sm);
  text-align: center;
}

.hero-badge {
  display: inline-block;
  background-color: #dbeafe;
  color: var(--color-primary-dark);
  font-size: var(--font-size-xs);
  font-weight: 700;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  margin-bottom: var(--spacing-sm);
  text-transform: uppercase;
}

.hero-title {
  font-size: var(--font-size-4xl);
  margin-bottom: var(--spacing-md);
  color: var(--color-text-primary);
}

.hero-desc {
  font-size: var(--font-size-lg);
  color: var(--color-text-secondary);
  max-width: 700px;
  margin: 0 auto var(--spacing-xl) auto;
}

.hero-actions {
  display: flex;
  gap: var(--spacing-md);
  justify-content: center;
}

.overview-title {
  font-size: var(--font-size-2xl);
  margin-bottom: var(--spacing-md);
  color: var(--color-text-primary);
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-xl);
}

.card-item {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--spacing-lg);
  display: flex;
  flex-direction: column;
}

.card-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-xs);
}

.card-num {
  background-color: #e0e7ff;
  color: #3730a3;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: var(--font-size-sm);
}

.card-heading {
  font-size: var(--font-size-lg);
  color: var(--color-text-primary);
}

.card-text {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  flex: 1;
  margin-bottom: var(--spacing-md);
}

.card-link {
  font-weight: 600;
  font-size: var(--font-size-sm);
}

.labs-banner {
  background: #f8fafc;
  border: 2px dashed #cbd5e1;
  border-radius: var(--radius-md);
  padding: var(--spacing-lg);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.banner-content h3 {
  font-size: var(--font-size-xl);
  margin-bottom: var(--spacing-xs);
}

.banner-content p {
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  max-width: 650px;
}
</style>
