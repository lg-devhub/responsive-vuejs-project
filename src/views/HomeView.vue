<script setup>
import { RouterLink } from 'vue-router'
import ViceCityConditions from '../components/dynamic/ViceCityConditions.vue'

const sections = [
  {
    num: 1,
    title: 'Welcome to Vice City: Introdução à Responsividade',
    desc: 'Entenda como a web se adapta a diferentes telas, grids fluidos e o papel fundamental da meta tag viewport.',
    path: '/por-que-responsividade-importa',
    tag: 'Fundamento'
  },
  {
    num: 2,
    title: 'CSS Units: Unidades CSS',
    desc: 'Absolutas vs. Relativas (rem, em, %, fr, vw, vh, dvh e ch), acessibilidade visual e suporte a preferências do usuário.',
    path: '/unidades-css',
    tag: 'Acessibilidade'
  },
  {
    num: 3,
    title: 'City Layout: Flexbox e Grid',
    desc: 'Unidimensional vs. Bidimensional, alinhamentos, gap e o cálculo matemático do repeat(auto-fit, minmax(14rem, 1fr)).',
    path: '/flexbox-grid',
    tag: 'Estrutural'
  },
  {
    num: 4,
    title: 'Visual Experience: Imagens Responsivas',
    desc: 'max-width, proporções explícitas, loading lazy consciente, aspect-ratio e prevenção de Cumulative Layout Shift (CLS).',
    path: '/imagens-responsivas',
    tag: 'Performance'
  },
  {
    num: 5,
    title: 'Developer\'s Garage: Boas Práticas em Vue',
    desc: 'Componentização, props tipadas, :key obrigatório no v-for, design tokens, Core Web Vitals e rotas lazy-loaded.',
    path: '/boas-praticas-vue',
    tag: 'Arquitetura'
  },
  {
    num: 6,
    title: 'Final Mission: O Desafio',
    desc: 'Atividade prática final com pergunta e enigma de cálculo que só se responde consultando este próprio guia.',
    path: '/desafio',
    tag: 'Missão Final'
  }
]
</script>

<template>
  <div class="home-view">
    <!-- Hero Banner Imersivo Vice City -->
    <section class="hero-card">
      <div class="hero-tag-group">
        <span class="badge badge-pink">Trabalho Semestral • Vue 3 + Vite</span>
        <span class="badge badge-cyan">GTA VI / Vice City Theme</span>
      </div>
      <h1 class="hero-title">Vice City Responsive Guide</h1>
      <p class="hero-desc">
        Aprenda a desenvolver interfaces modernas, adaptáveis e acessíveis com foco em <strong>Mobile-First</strong>,
        unidades relativas, Flexbox, CSS Grid, otimização de imagens e as melhores práticas do ecossistema Vue 3.
      </p>

      <div class="hero-actions">
        <RouterLink to="/por-que-responsividade-importa" class="btn">
          <span>Iniciar pelo Módulo 1</span>
          <span>→</span>
        </RouterLink>
        <RouterLink to="/laboratorios" class="btn btn-secondary">
          <span>Explorar Laboratórios Práticos 🧪</span>
        </RouterLink>
      </div>
    </section>

    <!-- RF10: Componente Dinâmico com Consumo de API Real -->
    <ViceCityConditions />

    <!-- Grade das Seções Técnicas do Guia -->
    <section class="sections-overview">
      <div class="overview-header">
        <span class="badge badge-purple">Trilha de Aprendizagem</span>
        <h2 class="overview-title">Módulos Educacionais do Guia</h2>
        <p class="overview-sub">Navegue pelas seções obrigatórias para dominar os conceitos teóricos, códigos comentados e perguntas-guia.</p>
      </div>

      <div class="cards-grid">
        <div v-for="sec in sections" :key="sec.num" class="card-item">
          <div class="card-header">
            <span class="card-num">{{ sec.num }}</span>
            <span class="card-tag">{{ sec.tag }}</span>
          </div>
          <h3 class="card-heading">{{ sec.title }}</h3>
          <p class="card-text">{{ sec.desc }}</p>
          <RouterLink :to="sec.path" class="card-link">
            <span>Acessar módulo</span>
            <span>&rarr;</span>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Banner de Destaque dos Laboratórios -->
    <section class="labs-banner">
      <div class="banner-content">
        <span class="badge badge-pink">Ambiente Interativo</span>
        <h3>Laboratórios Experimentais em Tempo Real</h3>
        <p>
          O guia inclui 3 laboratórios práticos com feedback visual instantâneo: redimensionador de container (LAB01), conversor de unidades contextualizado (LAB02) e monitor de breakpoints global (LAB03).
        </p>
      </div>
      <RouterLink to="/laboratorios" class="btn">
        Abrir Central de Laboratórios (🧪)
      </RouterLink>
    </section>
  </div>
</template>

<style scoped>
.home-view {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
}

.hero-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--spacing-2xl) var(--spacing-lg);
  box-shadow: var(--shadow-lg), 0 0 30px rgba(0, 0, 0, 0.4);
  text-align: center;
  position: relative;
  overflow: hidden;
}

.hero-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--gradient-sunset);
}

.hero-tag-group {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xs);
  flex-wrap: wrap;
  margin-bottom: var(--spacing-sm);
}

.hero-title {
  font-size: var(--font-size-3xl);
  margin-bottom: var(--spacing-sm);
  background: var(--gradient-sunset);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.02em;
}

@media (min-width: 48rem) {
  .hero-title {
    font-size: var(--font-size-hero);
  }
}

.hero-desc {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  max-width: 45rem;
  margin: 0 auto var(--spacing-xl) auto;
  line-height: 1.7;
}

.hero-actions {
  display: flex;
  gap: var(--spacing-md);
  justify-content: center;
  flex-wrap: wrap;
}

/* Visão Geral dos Módulos */
.overview-header {
  margin-bottom: var(--spacing-lg);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.overview-title {
  font-size: var(--font-size-2xl);
  color: var(--color-text-primary);
}

.overview-sub {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}

.cards-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-md);
}

@media (min-width: 48rem) {
  .cards-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 64rem) {
  .cards-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.card-item {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  display: flex;
  flex-direction: column;
  transition: all var(--transition-fast);
}

.card-item:hover {
  transform: translateY(-4px);
  border-color: var(--color-secondary);
  box-shadow: 0 0 15px rgba(168, 85, 247, 0.25);
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--spacing-sm);
}

.card-num {
  background: var(--color-surface-light);
  border: 1px solid var(--color-border);
  color: var(--color-accent);
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: var(--font-size-sm);
  font-family: var(--font-family-code);
}

.card-tag {
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--color-text-muted);
  letter-spacing: 0.05em;
}

.card-heading {
  font-size: var(--font-size-base);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-xs);
  line-height: 1.35;
}

.card-text {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  flex: 1;
  margin-bottom: var(--spacing-md);
  line-height: 1.6;
}

.card-link {
  font-weight: 600;
  font-size: var(--font-size-sm);
  color: var(--color-primary);
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  transition: transform var(--transition-fast);
}

.card-link:hover {
  transform: translateX(4px);
  color: var(--color-accent);
  text-decoration: none;
}

/* Banner de Laboratórios */
.labs-banner {
  background: linear-gradient(135deg, rgba(28, 21, 48, 0.9) 0%, rgba(42, 32, 66, 0.9) 100%);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--spacing-xl);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--spacing-lg);
  flex-wrap: wrap;
  box-shadow: var(--shadow-md);
}

.banner-content {
  flex: 1;
  min-width: 16rem;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.banner-content h3 {
  font-size: var(--font-size-xl);
  color: var(--color-text-primary);
}

.banner-content p {
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  line-height: 1.6;
}
</style>
