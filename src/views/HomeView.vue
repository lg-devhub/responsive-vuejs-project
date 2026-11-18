<script setup>
import { RouterLink } from 'vue-router'
import { useLabsStore } from '../stores/labsStore'
import ViceCityConditions from '../components/dynamic/ViceCityConditions.vue'

const labsStore = useLabsStore()

const sections = [
  {
    num: 1,
    title: 'Por que responsividade importa',
    desc: 'Entenda como a web se adapta a diferentes telas e o papel fundamental da meta tag viewport.',
    path: '/por-que-responsividade-importa',
    tag: 'Fundamentos'
  },
  {
    num: 2,
    title: 'Unidades CSS',
    desc: 'Absolutas vs. Relativas (rem, em, %, fr, vw, vh, dvh e ch) e seu impacto na acessibilidade.',
    path: '/unidades-css',
    tag: 'Acessibilidade'
  },
  {
    num: 3,
    title: 'Flexbox e Grid',
    desc: 'Unidimensional vs. Bidimensional, justify-content, align-items, gap e o cálculo de 464px do auto-fit.',
    path: '/flexbox-grid',
    tag: 'Layout 2D'
  },
  {
    num: 4,
    title: 'Imagens responsivas',
    desc: 'max-width, dimensões HTML, loading lazy, aspect-ratio, object-fit e prevenção do Core Web Vital CLS.',
    path: '/imagens-responsivas',
    tag: 'Performance'
  },
  {
    num: 5,
    title: 'Boas práticas em projetos Vue',
    desc: 'Estrutura modular, props tipadas, obrigatoriedade do :key no v-for, design tokens e rotas sob demanda.',
    path: '/boas-praticas-vue',
    tag: 'Arquitetura'
  },
  {
    num: 6,
    title: 'Desafio Final',
    desc: 'Enigma prático de cálculo de colunas que só pode ser solucionado consultando os conceitos deste guia!',
    path: '/desafio',
    tag: 'Missão Final'
  }
]

const labsList = [
  {
    id: 'lab01',
    name: 'LAB01: Responsive Container & Grid',
    desc: 'Slider de largura comprovando o limiar de transição de 464px para 2 colunas e 704px para 3 colunas.',
    icon: '📏'
  },
  {
    id: 'lab02',
    name: 'LAB02: Conversor de Unidades CSS',
    desc: 'Conversor em tempo real de rem, em, %, vw e ch com contexto de referência configurável.',
    icon: '⚖️'
  },
  {
    id: 'lab03',
    name: 'LAB03: Breakpoint Monitor',
    desc: 'Medidor dinâmico do viewport da janela com classificação automática (SM, MD, LG).',
    icon: '📱'
  }
]

const pilaresPedagogicos = [
  {
    numero: '01',
    titulo: 'Explicação Curta & Acessível',
    descricao: 'Linguagem didática e direta, elaborada especialmente para ser compreendida por estudantes do 1º semestre.'
  },
  {
    numero: '02',
    titulo: 'Código Comentado & Funcional',
    descricao: 'Trechos de HTML e CSS modernos prontos para uso, com comentários detalhando o porquê de cada propriedade.'
  },
  {
    numero: '03',
    titulo: 'Pergunta-Guia Respondida',
    descricao: 'Respostas aprofundadas às indagações essenciais da engenharia web (meta viewport, acessibilidade do rem, cálculo 464px, CLS e Virtual DOM).'
  },
  {
    numero: '04',
    titulo: 'Documentação & Fontes Oficiais',
    descricao: 'Links confiáveis apontando diretamente para as especificações técnicas da MDN Web Docs, web.dev (Google) e W3C.'
  }
]
</script>

<template>
  <div class="home-view">
    <!-- Hero Banner Temático de Vice City -->
    <section class="hero-card" aria-labelledby="home-title">
      <div class="hero-badge-row">
        <span class="hero-badge">🌴 GUIA ACADÊMICO INTERATIVO</span>
        <span class="hero-version">Vue 3 + Vite + Pinia</span>
        <span v-if="labsStore.challengeCompleted" class="badge-passed">
          ★ MISSÃO FINAL CONCLUÍDA
        </span>
      </div>

      <h1 id="home-title" class="hero-title">
        Vice City Responsive Guide
      </h1>

      <p class="hero-desc">
        Aprenda desenvolvimento web responsivo, arquitetura de componentes Vue 3 e CSS moderno com uma experiência
        imersiva inspirada na atmosfera noturna e neon de Grand Theft Auto VI.
      </p>

      <div class="hero-actions">
        <RouterLink to="/por-que-responsividade-importa" class="btn btn-primary">
          Iniciar Módulo 1 (Introdução) →
        </RouterLink>
        <RouterLink to="/laboratorios" class="btn btn-secondary">
          Explorar Laboratórios Práticos 🧪
        </RouterLink>
        <RouterLink to="/desafio" class="btn btn-challenge">
          Desafio Final 🏆
        </RouterLink>
      </div>
    </section>

    <!-- Componente Dinâmico com Consumo de API Externa (RF10) -->
    <ViceCityConditions />

    <!-- Metodologia Pedagógica do Guia (Os 4 Pilares Fundamentais do ERS) -->
    <section class="methodology-section" aria-labelledby="methodology-title">
      <div class="section-title-group">
        <span class="section-tag">Metodologia de Aprendizagem</span>
        <h2 id="methodology-title" class="overview-title">Os 4 Pilares Educacionais de Cada Seção</h2>
        <p class="overview-subtitle">
          Em conformidade com os requisitos do documento acadêmico ERS, cada módulo do curso estrutura o conhecimento
          em quatro etapas rigorosamente pedagógicas:
        </p>
      </div>

      <div class="pillars-grid">
        <div v-for="pilar in pilaresPedagogicos" :key="pilar.numero" class="pillar-card">
          <span class="pillar-num">{{ pilar.numero }}</span>
          <h3 class="pillar-title">{{ pilar.titulo }}</h3>
          <p class="pillar-desc">{{ pilar.descricao }}</p>
        </div>
      </div>
    </section>

    <!-- Visão Geral das Seções Obrigatórias -->
    <section class="sections-overview" aria-labelledby="modules-title">
      <div class="section-title-group">
        <span class="section-tag">Grade Curricular</span>
        <h2 id="modules-title" class="overview-title">Módulos Educacionais Obrigatórios</h2>
        <p class="overview-subtitle">
          Navegue pelas 5 seções conceituais e complete o percurso didático com a Missão Final.
        </p>
      </div>

      <div class="cards-grid">
        <article v-for="sec in sections" :key="sec.num" class="card-item">
          <div class="card-header">
            <span class="card-num">{{ sec.num }}</span>
            <div class="card-title-group">
              <span class="card-tag">{{ sec.tag }}</span>
              <h3 class="card-heading">{{ sec.title }}</h3>
            </div>
          </div>
          <p class="card-text">{{ sec.desc }}</p>
          <div class="card-footer-action">
            <RouterLink :to="sec.path" class="card-link">
              Acessar Módulo {{ sec.num }} &rarr;
            </RouterLink>
            <span v-if="sec.num === 6 && labsStore.challengeCompleted" class="badge-card-done">
              ✓ Resolvido
            </span>
          </div>
        </article>
      </div>
    </section>

    <!-- Seção Panorâmica dos Laboratórios Práticos -->
    <section class="labs-overview-section" aria-labelledby="labs-overview-title">
      <div class="section-title-group">
        <span class="section-tag">Experimentação Visual</span>
        <h2 id="labs-overview-title" class="overview-title">Laboratórios Interativos (LAB01 a LAB03)</h2>
        <p class="overview-subtitle">
          Ambientes controlados para ver os números e as regras do CSS agirem em tempo real.
        </p>
      </div>

      <div class="labs-grid">
        <article v-for="lab in labsList" :key="lab.id" class="lab-summary-card">
          <div class="lab-icon-box">{{ lab.icon }}</div>
          <div class="lab-summary-body">
            <h3 class="lab-summary-title">{{ lab.name }}</h3>
            <p class="lab-summary-desc">{{ lab.desc }}</p>
          </div>
          <RouterLink to="/laboratorios" class="lab-summary-btn">
            Abrir Lab &rarr;
          </RouterLink>
        </article>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-view {
  width: 100%;
}

/* Hero Banner */
.hero-card {
  background: linear-gradient(180deg, rgba(28, 21, 48, 0.95) 0%, rgba(16, 13, 28, 0.98) 100%);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl) var(--spacing-md);
  margin-bottom: var(--spacing-xl);
  box-shadow: var(--shadow-lg), 0 0 25px rgba(255, 79, 163, 0.15);
  text-align: center;
  position: relative;
  overflow: hidden;
}

@media (min-width: 48rem) {
  .hero-card {
    padding: var(--spacing-3xl) var(--spacing-xl);
  }
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

.hero-badge-row {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
  margin-bottom: var(--spacing-sm);
}

.hero-badge {
  display: inline-block;
  background: rgba(255, 79, 163, 0.15);
  color: var(--color-primary);
  border: 1px solid rgba(255, 79, 163, 0.4);
  font-size: var(--font-size-xs);
  font-weight: 700;
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-full);
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.hero-version {
  display: inline-block;
  background: rgba(54, 217, 232, 0.12);
  color: var(--color-accent);
  border: 1px solid rgba(54, 217, 232, 0.3);
  font-size: var(--font-size-xs);
  font-weight: 600;
  padding: 0.25rem 0.65rem;
  border-radius: var(--radius-full);
}

.badge-passed {
  display: inline-block;
  background: rgba(16, 185, 129, 0.2);
  color: #34d399;
  border: 1px solid rgba(16, 185, 129, 0.5);
  font-size: var(--font-size-xs);
  font-weight: 700;
  padding: 0.25rem 0.65rem;
  border-radius: var(--radius-full);
  box-shadow: 0 0 10px rgba(16, 185, 129, 0.3);
}

.hero-title {
  font-size: var(--font-size-3xl);
  margin-bottom: var(--spacing-sm);
  color: var(--color-text-primary);
  background: var(--gradient-sunset);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.15;
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
  line-height: 1.6;
}

@media (min-width: 48rem) {
  .hero-desc {
    font-size: var(--font-size-lg);
  }
}

.hero-actions {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  justify-content: center;
  align-items: center;
}

@media (min-width: 40rem) {
  .hero-actions {
    flex-direction: row;
    gap: var(--spacing-md);
  }
}

.btn-primary {
  background: var(--gradient-sunset);
  color: #ffffff;
  font-weight: 700;
  padding: 0.75rem 1.4rem;
  border-radius: var(--radius-md);
  text-decoration: none;
  box-shadow: 0 0 15px rgba(255, 79, 163, 0.4);
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);
  white-space: nowrap;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 20px rgba(255, 79, 163, 0.6);
  text-decoration: none;
  color: #ffffff;
}

.btn-secondary {
  background: var(--color-surface-light);
  border: 1px solid var(--color-border);
  color: var(--color-accent);
  font-weight: 600;
  padding: 0.75rem 1.4rem;
  border-radius: var(--radius-md);
  text-decoration: none;
  transition: all var(--transition-fast);
  white-space: nowrap;
}

.btn-secondary:hover {
  border-color: var(--color-accent);
  background: rgba(54, 217, 232, 0.12);
  text-decoration: none;
  color: var(--color-accent);
}

.btn-challenge {
  background: rgba(245, 158, 11, 0.15);
  border: 1px solid rgba(245, 158, 11, 0.4);
  color: #fcd34d;
  font-weight: 700;
  padding: 0.75rem 1.4rem;
  border-radius: var(--radius-md);
  text-decoration: none;
  transition: all var(--transition-fast);
  white-space: nowrap;
}

.btn-challenge:hover {
  background: rgba(245, 158, 11, 0.25);
  border-color: #fcd34d;
  text-decoration: none;
  transform: translateY(-2px);
}

/* Seções Gerais */
.section-title-group {
  margin-bottom: var(--spacing-lg);
}

.section-tag {
  display: inline-block;
  font-size: var(--font-size-xs);
  font-weight: 700;
  color: var(--color-accent);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.2rem;
}

.overview-title {
  font-size: var(--font-size-xl);
  color: var(--color-text-primary);
  margin-bottom: 0.25rem;
}

@media (min-width: 48rem) {
  .overview-title {
    font-size: var(--font-size-2xl);
  }
}

.overview-subtitle {
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  line-height: 1.5;
}

/* Pilares Pedagógicos */
.methodology-section {
  margin-bottom: var(--spacing-2xl);
}

.pillars-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-md);
}

@media (min-width: 40rem) {
  .pillars-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 64rem) {
  .pillars-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.pillar-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-top: 3px solid var(--color-primary);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  transition: transform var(--transition-fast);
}

.pillar-card:hover {
  transform: translateY(-3px);
  border-top-color: var(--color-accent);
}

.pillar-num {
  font-family: var(--font-family-code);
  font-size: var(--font-size-sm);
  font-weight: 800;
  color: var(--color-primary);
}

.pillar-title {
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
}

.pillar-desc {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  line-height: 1.5;
}

/* Visão Geral dos Módulos */
.sections-overview {
  margin-bottom: var(--spacing-2xl);
}

.cards-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-md);
}

@media (min-width: 40rem) {
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
  border-radius: var(--radius-md);
  padding: var(--spacing-lg);
  display: flex;
  flex-direction: column;
  transition: transform var(--transition-fast), border-color var(--transition-fast);
}

.card-item:hover {
  transform: translateY(-3px);
  border-color: var(--color-secondary);
}

.card-header {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-xs);
}

.card-num {
  background: var(--gradient-sunset);
  color: #ffffff;
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: var(--font-size-sm);
  flex-shrink: 0;
  box-shadow: 0 0 8px rgba(255, 79, 163, 0.35);
}

.card-title-group {
  display: flex;
  flex-direction: column;
}

.card-tag {
  font-size: 0.65rem;
  font-weight: 700;
  color: var(--color-accent);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.card-heading {
  font-size: var(--font-size-base);
  color: var(--color-text-primary);
  line-height: 1.3;
}

.card-text {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  flex: 1;
  margin: var(--spacing-xs) 0 var(--spacing-md) 0;
  line-height: 1.5;
}

.card-footer-action {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px dashed rgba(255, 255, 255, 0.08);
  padding-top: var(--spacing-xs);
}

.card-link {
  font-weight: 700;
  font-size: var(--font-size-xs);
  color: var(--color-primary);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.card-link:hover {
  color: var(--color-accent);
  text-decoration: underline;
}

.badge-card-done {
  font-size: 0.65rem;
  background: rgba(16, 185, 129, 0.2);
  color: #34d399;
  padding: 0.15rem 0.4rem;
  border-radius: var(--radius-sm);
  font-weight: 700;
}

/* Laboratórios Resumo */
.labs-overview-section {
  margin-bottom: var(--spacing-2xl);
}

.labs-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-md);
}

@media (min-width: 48rem) {
  .labs-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.lab-summary-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  transition: border-color var(--transition-fast), transform var(--transition-fast);
}

.lab-summary-card:hover {
  border-color: var(--color-accent);
  transform: translateY(-2px);
}

.lab-icon-box {
  font-size: 1.75rem;
}

.lab-summary-body {
  flex: 1;
}

.lab-summary-title {
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
  margin-bottom: 0.25rem;
}

.lab-summary-desc {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  line-height: 1.4;
}

.lab-summary-btn {
  font-size: var(--font-size-xs);
  font-weight: 700;
  color: var(--color-accent);
  text-decoration: none;
  align-self: flex-start;
  transition: color var(--transition-fast);
}

.lab-summary-btn:hover {
  color: var(--color-primary);
  text-decoration: underline;
}
</style>
