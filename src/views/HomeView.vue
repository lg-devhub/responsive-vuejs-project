<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import ViceCityConditions from '../components/dynamic/ViceCityConditions.vue'
import wallpaper1Url from '../assets/img/wallpaper1.png'
import wallpaper2Url from '../assets/img/wallpaper2.png'

const layer1Ref = ref(null) // Camada 1: Protagonistas (Lucia e Jason)
const layer2Ref = ref(null) // Camada 2: Paisagem Panorâmica de Vice City

const sections = [
  {
    num: 1,
    title: 'Welcome to Vice City: Introdução à Responsividade',
    desc: 'Entenda como a web se adapta a diferentes telas, grids fluidos e o papel fundamental da meta tag viewport.',
    path: '/por-que-responsividade-importa',
    tag: 'Fundamento',
    badgeClass: 'badge-purple',
    categoryClass: 'foundation',
    themeIcon: '🌴'
  },
  {
    num: 2,
    title: 'CSS Units: Unidades CSS',
    desc: 'Absolutas vs. Relativas (rem, em, %, fr, vw, vh, dvh e ch), acessibilidade visual e suporte a preferências do usuário.',
    path: '/unidades-css',
    tag: 'Acessibilidade',
    badgeClass: 'badge-cyan',
    categoryClass: 'accessibility',
    themeIcon: '📐'
  },
  {
    num: 3,
    title: 'City Layout: Flexbox e Grid',
    desc: 'Unidimensional vs. Bidimensional, alinhamentos, gap e o cálculo matemático do repeat(auto-fit, minmax(14rem, 1fr)).',
    path: '/flexbox-grid',
    tag: 'Estrutural',
    badgeClass: 'badge-purple',
    categoryClass: 'layout',
    themeIcon: '🏢'
  },
  {
    num: 4,
    title: 'Visual Experience: Imagens Responsivas',
    desc: 'max-width, proporções explícitas, loading lazy consciente, aspect-ratio e prevenção de Cumulative Layout Shift (CLS).',
    path: '/imagens-responsivas',
    tag: 'Performance',
    badgeClass: 'badge-pink',
    categoryClass: 'performance',
    themeIcon: '🏎️'
  },
  {
    num: 5,
    title: 'Developer\'s Garage: Boas Práticas em Vue',
    desc: 'Componentização, props tipadas, :key obrigatório no v-for, design tokens, Core Web Vitals e rotas lazy-loaded.',
    path: '/boas-praticas-vue',
    tag: 'Arquitetura',
    badgeClass: 'badge-cyan',
    categoryClass: 'architecture',
    themeIcon: '⚙️'
  },
  {
    num: 6,
    title: 'Final Mission: O Desafio',
    desc: 'Atividade prática final com pergunta e enigma de cálculo que só se responde consultando este próprio guia.',
    path: '/desafio',
    tag: 'Missão Final',
    badgeClass: 'badge-amber',
    categoryClass: 'mission',
    themeIcon: '🎯'
  }
]

let ticking = false

const handleParallax = () => {
  ticking = false
  const scrollY = window.scrollY || document.documentElement.scrollTop || 0

  // Respeita a preferência de redução de movimento do usuário
  const isReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (isReducedMotion) {
    if (layer1Ref.value && layer2Ref.value) {
      const p = Math.min(1, Math.max(0, scrollY / 600))
      layer1Ref.value.style.opacity = String(1 - p)
      layer2Ref.value.style.opacity = String(p)
      layer1Ref.value.style.transform = 'none'
      layer2Ref.value.style.transform = 'none'
    }
    return
  }

  const isMobile = window.innerWidth < 768
  const transitionDistance = isMobile ? 480 : 720
  const progress = Math.min(1, Math.max(0, scrollY / transitionDistance))

  // Fatores de velocidade calibrados para fluidez e profundidade tridimensional
  const speed1 = isMobile ? 0.16 : 0.32
  const speed2 = isMobile ? 0.06 : 0.12

  // Camada 1: Protagonistas (Lucia e Jason)
  if (layer1Ref.value) {
    const y1 = -(scrollY * speed1)
    const scale1 = 1.02 + progress * 0.04
    // Desvanecimento suave de opacidade conforme o usuário desce a página
    const opacity1 = Math.max(0, 1 - Math.pow(progress, 1.25) * 1.3)
    layer1Ref.value.style.transform = `translate3d(0, ${y1.toFixed(1)}px, 0) scale(${scale1.toFixed(3)})`
    layer1Ref.value.style.opacity = opacity1.toFixed(3)
  }

  // Camada 2: Paisagem Panorâmica de Vice City
  if (layer2Ref.value) {
    const baseOffset = 30 * (1 - progress)
    const y2 = baseOffset - (scrollY * speed2)
    const scale2 = 1.08 - (progress * 0.08)
    // Aparição cinematográfica contínua assumindo protagonismo visual
    const opacity2 = Math.min(1, Math.pow(progress, 0.9) * 1.35)
    layer2Ref.value.style.transform = `translate3d(0, ${y2.toFixed(1)}px, 0) scale(${scale2.toFixed(3)})`
    layer2Ref.value.style.opacity = opacity2.toFixed(3)
  }
}

const onScroll = () => {
  if (!ticking) {
    window.requestAnimationFrame(handleParallax)
    ticking = true
  }
}

onMounted(() => {
  // Pré-carregamento dos wallpapers em memória para evitar flashes
  const p1 = new Image()
  p1.src = wallpaper1Url
  const p2 = new Image()
  p2.src = wallpaper2Url

  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
  handleParallax()
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
})
</script>

<template>
  <div class="home-root">
    <!-- ============================================================
         SISTEMA DE PARALLAX CINEMATOGRÁFICO (DUAS CAMADAS INDEPENDENTES)
         ============================================================ -->
    <div class="parallax-viewport" aria-hidden="true">
      <!-- Camada 2: Wallpaper Panorâmico de Vice City (skyline, praia, iate) -->
      <div
        ref="layer2Ref"
        class="parallax-layer parallax-layer--panoramic"
        :style="{ backgroundImage: `url(${wallpaper2Url})` }"
      ></div>

      <!-- Camada 1: Wallpaper com Protagonistas Lucia & Jason -->
      <div
        ref="layer1Ref"
        class="parallax-layer parallax-layer--protagonists"
        :style="{ backgroundImage: `url(${wallpaper1Url})` }"
      ></div>

      <!-- Vinheta e Atmosfera Cinematográfica Vice City -->
      <div class="parallax-atmosphere"></div>
    </div>

    <!-- ============================================================
         CONTEÚDO EM PRIMEIRO PLANO (SCROLL NATIVO E FLUIDO)
         ============================================================ -->
    <div class="home-content">
      <!-- HERO SECTION: Lucia e Jason em destaque à direita, textos à esquerda -->
      <section class="hero-section" aria-label="Apresentação do Guia">
        <div class="hero-container">
          <div class="hero-left-col">
            <!-- Grupo de Badges da Identidade Visual -->
            <div class="hero-tag-group">
              <span class="badge badge-pink">Trabalho Semestral • Vue 3 + Vite</span>
              <span class="badge badge-cyan">GTA VI / Vice City Theme</span>
            </div>

            <!-- Título Principal com Tipografia Expressiva -->
            <h1 class="hero-title">
              <span class="hero-title-main">Vice City Responsive</span>
              <span class="hero-title-gradient">Guide</span>
            </h1>

            <!-- Subtítulo com a Proposta Educacional -->
            <p class="hero-desc">
              Aprenda a desenvolver interfaces modernas, adaptáveis e acessíveis com foco em
              <strong>Mobile-First</strong>, unidades relativas, Flexbox, CSS Grid, otimização de imagens e as melhores práticas do ecossistema Vue 3.
            </p>

            <!-- Ações Primária e Secundária -->
            <div class="hero-actions">
              <RouterLink to="/por-que-responsividade-importa" class="btn btn-hero-primary">
                <span class="btn-play-icon">▶</span>
                <span>Iniciar pelo Módulo 1</span>
                <span class="btn-arrow">→</span>
              </RouterLink>
              <RouterLink to="/laboratorios" class="btn btn-hero-secondary">
                <span class="btn-lab-icon">🧪</span>
                <span>Explorar Laboratórios Práticos</span>
              </RouterLink>
            </div>
          </div>

          <!-- Boletim Meteorológico Real Integrado no Hero -->
          <div class="hero-weather-col">
            <ViceCityConditions />
          </div>
        </div>
      </section>

      <!-- SEÇÃO DE MÓDULOS EDUCACIONAIS -->
      <section class="modules-section" aria-label="Módulos Educacionais do Guia">
        <div class="modules-container">
          <!-- Cabeçalho da Trilha -->
          <div class="modules-header">
            <span class="badge badge-purple">Trilha de Aprendizagem</span>
            <h2 class="modules-title">Módulos Educacionais do Guia</h2>
            <p class="modules-sub">
              Navegue pelas seções obrigatórias para dominar os conceitos teóricos, códigos comentados e perguntas-guia.
            </p>
          </div>

          <!-- Grade de Módulos (3 Colunas em Desktop, 2 em Tablet, 1 em Mobile) -->
          <div class="modules-grid">
            <article
              v-for="sec in sections"
              :key="sec.num"
              class="module-card"
              :class="`module-card--${sec.categoryClass}`"
            >
              <!-- Cabeçalho do Card -->
              <div class="card-header">
                <span class="card-num-badge">{{ sec.num }}</span>
                <span class="badge" :class="sec.badgeClass">{{ sec.tag }}</span>
              </div>

              <!-- Conteúdo do Card -->
              <h3 class="card-title">{{ sec.title }}</h3>
              <p class="card-desc">{{ sec.desc }}</p>

              <!-- Link de Acesso com Efeito de Hover -->
              <RouterLink :to="sec.path" class="card-action-link">
                <span>Acessar módulo</span>
                <span class="action-arrow">→</span>
              </RouterLink>
            </article>
          </div>
        </div>
      </section>

      <!-- BANNER DE DESTAQUE DOS LABORATÓRIOS INTERATIVOS -->
      <section class="labs-banner-section" aria-label="Laboratórios Interativos">
        <div class="labs-banner-container">
          <div class="labs-banner-card">
            <!-- Mockup Visual Tecnológico de Estação de Trabalho -->
            <div class="labs-card-visual" aria-hidden="true">
              <div class="cyber-terminal">
                <div class="terminal-bar">
                  <span class="term-dot term-dot--pink"></span>
                  <span class="term-dot term-dot--cyan"></span>
                  <span class="term-dot term-dot--purple"></span>
                </div>
                <div class="terminal-body">
                  <div class="term-line"><span class="term-prompt">❯</span> LAB01: Container Resizer <span class="term-ok">[ONLINE]</span></div>
                  <div class="term-line"><span class="term-prompt">❯</span> LAB02: Unit Converter <span class="term-ok">[ONLINE]</span></div>
                  <div class="term-line"><span class="term-prompt">❯</span> LAB03: Breakpoint Probe <span class="term-live">[SYNC]</span></div>
                </div>
              </div>
            </div>

            <!-- Informações do Banner -->
            <div class="labs-card-info">
              <span class="badge badge-pink">Ambiente Interativo</span>
              <h3 class="labs-card-title">Laboratórios Experimentais em Tempo Real</h3>
              <p class="labs-card-desc">
                O guia inclui 3 laboratórios práticos com feedback visual instantâneo: redimensionador de container (LAB01), conversor de unidades contextualizado (LAB02) e monitor de breakpoints global (LAB03).
              </p>
            </div>

            <!-- Ação Principal para os Laboratórios -->
            <div class="labs-card-action">
              <RouterLink to="/laboratorios" class="btn btn-labs-action">
                <span>Abrir Central de Laboratórios</span>
                <span class="btn-icon">🧪</span>
              </RouterLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.home-root {
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
}

/* ============================================================
   SISTEMA DE PARALLAX CINEMATOGRÁFICO — CAMADAS E VIEWPORT
   ============================================================ */
.parallax-viewport {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.parallax-layer {
  position: absolute;
  top: -8vh;
  left: -4vw;
  width: 108vw;
  height: 116vh;
  background-size: cover;
  background-repeat: no-repeat;
  will-change: transform, opacity;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  transform-style: preserve-3d;
}

/* Camada 1: Wallpaper dos Protagonistas (Lucia & Jason) */
.parallax-layer--protagonists {
  background-position: right 18% center;
  z-index: 2;
  opacity: 1;
}

/* Camada 2: Wallpaper Panorâmico de Vice City */
.parallax-layer--panoramic {
  background-position: center center;
  z-index: 1;
  opacity: 0;
}

/* Ajuste de Posicionamento em Telas Médias e Pequenas */
@media (max-width: 64rem) {
  .parallax-layer--protagonists {
    background-position: 74% center;
  }
}

@media (max-width: 48rem) {
  .parallax-layer--protagonists {
    background-position: 80% center;
  }
}

/* Camada de Iluminação e Atmosfera Cinematográfica Vice City */
.parallax-atmosphere {
  position: absolute;
  inset: 0;
  z-index: 3;
  pointer-events: none;
  background:
    /* Vinheta lateral esquerda para proteger o texto e os controles */
    linear-gradient(90deg, rgba(13, 10, 24, 0.88) 0%, rgba(13, 10, 24, 0.72) 44%, rgba(13, 10, 24, 0.22) 75%, transparent 100%),
    /* Sombra superior para a barra de navegação */
    linear-gradient(180deg, rgba(13, 10, 24, 0.75) 0%, transparent 14%),
    /* Transição suave na base */
    linear-gradient(0deg, rgba(13, 10, 24, 0.95) 0%, rgba(13, 10, 24, 0.4) 40%, transparent 80%);
}

@media (max-width: 48rem) {
  .parallax-atmosphere {
    background:
      linear-gradient(180deg, rgba(13, 10, 24, 0.7) 0%, rgba(13, 10, 24, 0.85) 45%, rgba(13, 10, 24, 0.96) 100%);
  }
}

/* ============================================================
   CONTEÚDO EM PRIMEIRO PLANO
   ============================================================ */
.home-content {
  position: relative;
  z-index: 5;
  width: 100%;
  display: flex;
  flex-direction: column;
}

/* ============================================================
   HERO SECTION
   ============================================================ */
.hero-section {
  width: 100%;
  min-height: calc(100vh - 4.5rem);
  display: flex;
  align-items: center;
  padding: var(--spacing-xl) 0 var(--spacing-3xl);
  box-sizing: border-box;
}

.hero-container {
  width: 100%;
  max-width: 82rem;
  margin: 0 auto;
  padding: 0 var(--spacing-md);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
}

@media (min-width: 48rem) {
  .hero-container {
    padding: 0 var(--spacing-lg);
  }
}

.hero-left-col {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  max-width: 44rem; /* Garante que os textos fiquem à esquerda e os protagonistas livres à direita */
}

.hero-tag-group {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  flex-wrap: wrap;
}

.hero-title {
  display: flex;
  flex-direction: column;
  font-family: var(--font-family-heading);
  font-weight: 900;
  line-height: 1.05;
  letter-spacing: -0.03em;
  margin: 0;
}

.hero-title-main {
  font-size: var(--font-size-3xl);
  color: #ffffff;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.7);
}

.hero-title-gradient {
  font-size: var(--font-size-3xl);
  background: linear-gradient(135deg, #ff4fa3 0%, #d926aa 50%, #9333ea 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 20px rgba(255, 79, 163, 0.45));
}

@media (min-width: 48rem) {
  .hero-title-main {
    font-size: 3.25rem;
  }
  .hero-title-gradient {
    font-size: 3.25rem;
  }
}

@media (min-width: 64rem) {
  .hero-title-main {
    font-size: 3.75rem;
  }
  .hero-title-gradient {
    font-size: 3.75rem;
  }
}

.hero-desc {
  font-size: var(--font-size-base);
  color: #e2d9f3;
  line-height: 1.65;
  max-width: 40rem;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.6);
}

.hero-desc strong {
  color: #ffffff;
  font-weight: 700;
}

.hero-actions {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  flex-wrap: wrap;
  margin-top: var(--spacing-xs);
}

.btn-hero-primary {
  background: linear-gradient(135deg, #ff4fa3 0%, #ff2d92 50%, #d926aa 100%);
  border-radius: var(--radius-full);
  padding: 0.75rem 1.75rem;
  font-size: var(--font-size-sm);
  font-weight: 700;
  box-shadow: 0 0 24px rgba(255, 79, 163, 0.5), 0 4px 15px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.btn-hero-primary:hover {
  box-shadow: 0 0 35px rgba(255, 79, 163, 0.7), 0 6px 20px rgba(0, 0, 0, 0.6);
  transform: translateY(-2px) scale(1.02);
}

.btn-play-icon {
  font-size: 0.75rem;
  line-height: 1;
}

.btn-arrow {
  font-size: 1.1rem;
  line-height: 1;
  transition: transform var(--transition-fast);
}

.btn-hero-primary:hover .btn-arrow {
  transform: translateX(4px);
}

.btn-hero-secondary {
  background: rgba(20, 14, 34, 0.75);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-full);
  padding: 0.75rem 1.5rem;
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: #ffffff;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
}

.btn-hero-secondary:hover {
  background: rgba(38, 28, 64, 0.85);
  border-color: var(--color-accent);
  box-shadow: var(--shadow-neon-cyan);
  color: #ffffff;
}

.btn-lab-icon {
  font-size: 1rem;
  line-height: 1;
}

/* Coluna / Container do Boletim Meteorológico no Hero */
.hero-weather-col {
  width: 100%;
  max-width: 52rem;
  margin-top: var(--spacing-sm);
}

/* ============================================================
   SEÇÃO DE MÓDULOS EDUCACIONAIS
   ============================================================ */
.modules-section {
  width: 100%;
  padding: var(--spacing-2xl) 0 var(--spacing-xl);
  box-sizing: border-box;
}

.modules-container {
  width: 100%;
  max-width: 82rem;
  margin: 0 auto;
  padding: 0 var(--spacing-md);
}

@media (min-width: 48rem) {
  .modules-container {
    padding: 0 var(--spacing-lg);
  }
}

.modules-header {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  margin-bottom: var(--spacing-xl);
}

.modules-title {
  font-family: var(--font-family-heading);
  font-size: var(--font-size-2xl);
  font-weight: 800;
  color: #ffffff;
  letter-spacing: -0.02em;
}

@media (min-width: 48rem) {
  .modules-title {
    font-size: var(--font-size-3xl);
  }
}

.modules-sub {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  max-width: 42rem;
}

/* Grade de Módulos Responsiva */
.modules-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-md);
}

@media (min-width: 48rem) {
  .modules-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 64rem) {
  .modules-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: var(--spacing-lg);
  }
}

/* Cards Educacionais com Glassmorphism GTA VI */
.module-card {
  background: rgba(20, 14, 34, 0.74);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: var(--radius-xl);
  padding: var(--spacing-lg);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  transition: transform var(--transition-normal), border-color var(--transition-normal), box-shadow var(--transition-normal);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.45);
}

/* Linha sutil no topo do card com cor temática */
.module-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, rgba(255, 79, 163, 0.4), rgba(54, 217, 232, 0.4));
  opacity: 0.6;
  transition: opacity var(--transition-normal);
}

.module-card:hover {
  transform: translateY(-5px);
  border-color: rgba(255, 79, 163, 0.55);
  box-shadow: 0 16px 35px rgba(0, 0, 0, 0.6), 0 0 20px rgba(255, 79, 163, 0.25);
}

.module-card:hover::before {
  opacity: 1;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--spacing-sm);
}

.card-num-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: rgba(42, 32, 66, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: var(--color-accent);
  font-family: var(--font-family-code);
  font-size: var(--font-size-xs);
  font-weight: 800;
}

.card-title {
  font-family: var(--font-family-heading);
  font-size: 1.05rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: var(--spacing-xs);
  line-height: 1.35;
}

.card-desc {
  font-size: 0.85rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
  flex: 1;
  margin-bottom: var(--spacing-md);
}

.card-action-link {
  font-family: var(--font-family-heading);
  font-size: var(--font-size-xs);
  font-weight: 700;
  color: var(--color-primary);
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  text-decoration: none;
  transition: color var(--transition-fast), transform var(--transition-fast);
  margin-top: auto;
}

.action-arrow {
  font-size: 1rem;
  line-height: 1;
  transition: transform var(--transition-fast);
}

.card-action-link:hover {
  color: var(--color-accent);
  text-decoration: none;
}

.card-action-link:hover .action-arrow {
  transform: translateX(5px);
}

/* ============================================================
   BANNER DE DESTAQUE DOS LABORATÓRIOS
   ============================================================ */
.labs-banner-section {
  width: 100%;
  padding: var(--spacing-lg) 0 var(--spacing-3xl);
  box-sizing: border-box;
}

.labs-banner-container {
  width: 100%;
  max-width: 82rem;
  margin: 0 auto;
  padding: 0 var(--spacing-md);
}

@media (min-width: 48rem) {
  .labs-banner-container {
    padding: 0 var(--spacing-lg);
  }
}

.labs-banner-card {
  background: rgba(20, 14, 34, 0.78);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(54, 217, 232, 0.35);
  border-radius: var(--radius-2xl);
  padding: var(--spacing-xl);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-xl);
  flex-wrap: wrap;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.6), 0 0 25px rgba(54, 217, 232, 0.15);
  position: relative;
  overflow: hidden;
  transition: border-color var(--transition-normal), box-shadow var(--transition-normal);
}

.labs-banner-card:hover {
  border-color: rgba(255, 79, 163, 0.5);
  box-shadow: 0 16px 45px rgba(0, 0, 0, 0.7), 0 0 30px rgba(255, 79, 163, 0.2);
}

/* Mockup Tecnológico Cyberpunk do Banner */
.labs-card-visual {
  display: none;
}

@media (min-width: 64rem) {
  .labs-card-visual {
    display: block;
    width: 16rem;
    flex-shrink: 0;
  }
}

.cyber-terminal {
  background: rgba(10, 7, 20, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-md);
  padding: 0.65rem 0.85rem;
  box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.8);
}

.terminal-bar {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  margin-bottom: 0.5rem;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.term-dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
}

.term-dot--pink { background-color: var(--color-primary); box-shadow: 0 0 6px var(--color-primary); }
.term-dot--cyan { background-color: var(--color-accent); box-shadow: 0 0 6px var(--color-accent); }
.term-dot--purple { background-color: var(--color-secondary); box-shadow: 0 0 6px var(--color-secondary); }

.terminal-body {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  font-family: var(--font-family-code);
  font-size: 0.7rem;
}

.term-line {
  color: var(--color-text-secondary);
}

.term-prompt {
  color: var(--color-primary);
  font-weight: 800;
}

.term-ok {
  color: var(--color-accent);
  font-weight: 700;
}

.term-live {
  color: #34d399;
  font-weight: 700;
}

.labs-card-info {
  flex: 1;
  min-width: 16rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.labs-card-title {
  font-family: var(--font-family-heading);
  font-size: 1.25rem;
  font-weight: 800;
  color: #ffffff;
}

@media (min-width: 48rem) {
  .labs-card-title {
    font-size: 1.45rem;
  }
}

.labs-card-desc {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.labs-card-action {
  flex-shrink: 0;
}

.btn-labs-action {
  background: linear-gradient(135deg, #ff4fa3 0%, #d926aa 50%, #36d9e8 100%);
  border-radius: var(--radius-full);
  padding: 0.75rem 1.75rem;
  font-size: var(--font-size-sm);
  font-weight: 700;
  color: #ffffff;
  box-shadow: 0 0 20px rgba(255, 79, 163, 0.45);
  border: 1px solid rgba(255, 255, 255, 0.25);
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-labs-action:hover {
  box-shadow: 0 0 32px rgba(54, 217, 232, 0.6), 0 0 15px rgba(255, 79, 163, 0.4);
  transform: translateY(-2px) scale(1.02);
  color: #ffffff;
}

.btn-icon {
  font-size: 1.1rem;
  line-height: 1;
}

@media (max-width: 48rem) {
  .labs-card-action {
    width: 100%;
  }
  .btn-labs-action {
    width: 100%;
    justify-content: center;
  }
}
</style>