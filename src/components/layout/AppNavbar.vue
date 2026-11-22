<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useViewportStore } from '../../stores/viewportStore'

const route = useRoute()
const viewportStore = useViewportStore()

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

// Fecha o menu móvel automaticamente se a tela for redimensionada para desktop
watch(() => viewportStore.isDesktop, (isDesktop) => {
  if (isDesktop && isMenuOpen.value) {
    closeMenu()
  }
})

// Fecha o menu ao navegar de rota
watch(() => route.path, () => {
  closeMenu()
})

// Fecha ao pressionar ESC
const handleKeyDown = (e) => {
  if (e.key === 'Escape' && isMenuOpen.value) {
    closeMenu()
  }
}

// Bloqueia rolagem do body quando menu mobile está aberto
watch(isMenuOpen, (open) => {
  if (typeof document !== 'undefined') {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }
})

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
  if (typeof document !== 'undefined') {
    document.body.style.overflow = ''
  }
})
</script>

<template>
  <header class="navbar" role="banner">
    <div class="navbar-container">
      <!-- Marca do Guia / Logo GTA VI Vice City -->
      <RouterLink to="/" class="brand-link" @click="closeMenu" aria-label="Vice City Responsive Guide — Início">
        <div class="logo-vi-badge" aria-hidden="true">
          <svg class="vi-svg" viewBox="0 0 46 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="navViGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#ff4fa3" />
                <stop offset="40%" stop-color="#d926aa" />
                <stop offset="70%" stop-color="#a855f7" />
                <stop offset="100%" stop-color="#ff7a18" />
              </linearGradient>
            </defs>
            <!-- Slanted Roman VI -->
            <path d="M2 3 L13.5 33 L20.5 33 L30 3 L23 3 L17 23.5 L10.5 3 Z" fill="url(#navViGradient)" />
            <path d="M34 3 L34 33 L42 33 L42 3 Z" fill="url(#navViGradient)" />
          </svg>
        </div>
        <div class="brand-text-group">
          <span class="brand-title">VICE CITY</span>
          <span class="brand-subtitle">RESPONSIVE GUIDE</span>
        </div>
      </RouterLink>

      <!-- Botão Hambúrguer para Telas Pequenas (RF03) -->
      <button
        class="hamburger-btn"
        :class="{ 'is-active': isMenuOpen }"
        type="button"
        :aria-expanded="isMenuOpen"
        aria-controls="primary-navigation"
        :aria-label="isMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'"
        @click="toggleMenu"
      >
        <span class="hamburger-bar"></span>
        <span class="hamburger-bar"></span>
        <span class="hamburger-bar"></span>
      </button>

      <!-- Navegação Desktop Centralizada em Pílulas -->
      <nav id="primary-navigation" class="nav-desktop" aria-label="Navegação Principal Desktop">
        <RouterLink to="/" class="nav-item nav-item--home">
          <span class="item-icon">🏠</span>
          <span>Início</span>
        </RouterLink>
        <RouterLink to="/por-que-responsividade-importa" class="nav-item">
          <span>1. Responsividade</span>
        </RouterLink>
        <RouterLink to="/unidades-css" class="nav-item">
          <span>2. Unidades</span>
        </RouterLink>
        <RouterLink to="/flexbox-grid" class="nav-item">
          <span>3. Flex & Grid</span>
        </RouterLink>
        <RouterLink to="/imagens-responsivas" class="nav-item">
          <span>4. Imagens</span>
        </RouterLink>
        <RouterLink to="/boas-praticas-vue" class="nav-item">
          <span>5. Boas Práticas</span>
        </RouterLink>
        <RouterLink to="/laboratorios" class="nav-item nav-item--lab">
          <span class="item-icon">🧪</span>
          <span>Labs (3)</span>
        </RouterLink>
        <RouterLink to="/desafio" class="nav-item nav-item--challenge">
          <span class="item-icon">⭐</span>
          <span>Desafio</span>
        </RouterLink>
      </nav>
    </div>

    <!-- Teleport para o body garante que o Backdrop e o Menu Mobile sobreponham TODOS os elementos da página -->
    <Teleport to="body">
      <!-- Backdrop escuro com desfoque (blur) no restante da aplicação -->
      <Transition name="fade">
        <div
          v-if="isMenuOpen"
          class="mobile-backdrop"
          aria-hidden="true"
          @click="closeMenu"
        ></div>
      </Transition>

      <!-- Gaveta / Drawer de Navegação Mobile (RF03) -->
      <Transition name="drawer">
        <nav
          v-if="isMenuOpen"
          class="mobile-drawer"
          aria-label="Navegação Principal Mobile"
        >
          <div class="drawer-header">
            <div class="drawer-brand">
              <span class="drawer-vi-badge">VI</span>
              <div>
                <span class="drawer-title">VICE CITY</span>
                <span class="drawer-sub">MENU DE NAVEGAÇÃO</span>
              </div>
            </div>
            <button
              type="button"
              class="drawer-close-btn"
              @click="closeMenu"
              aria-label="Fechar menu"
            >
              ✕
            </button>
          </div>

          <div class="drawer-links">
            <RouterLink to="/" class="drawer-item" @click="closeMenu">
              <span class="item-icon">🏠</span>
              <div class="drawer-item-content">
                <span class="drawer-item-title">Início</span>
                <span class="drawer-item-desc">Visão geral e atmosfera Vice City</span>
              </div>
            </RouterLink>

            <RouterLink to="/por-que-responsividade-importa" class="drawer-item" @click="closeMenu">
              <span class="drawer-num">01</span>
              <div class="drawer-item-content">
                <span class="drawer-item-title">Introdução à Responsividade</span>
                <span class="drawer-item-desc">Viewport meta tag e media queries</span>
              </div>
            </RouterLink>

            <RouterLink to="/unidades-css" class="drawer-item" @click="closeMenu">
              <span class="drawer-num">02</span>
              <div class="drawer-item-content">
                <span class="drawer-item-title">Unidades CSS</span>
                <span class="drawer-item-desc">rem, em, %, fr, vw, vh, dvh e ch</span>
              </div>
            </RouterLink>

            <RouterLink to="/flexbox-grid" class="drawer-item" @click="closeMenu">
              <span class="drawer-num">03</span>
              <div class="drawer-item-content">
                <span class="drawer-item-title">Flexbox & Grid Layout</span>
                <span class="drawer-item-desc">Unidimensional vs. Bidimensional</span>
              </div>
            </RouterLink>

            <RouterLink to="/imagens-responsivas" class="drawer-item" @click="closeMenu">
              <span class="drawer-num">04</span>
              <div class="drawer-item-content">
                <span class="drawer-item-title">Imagens Responsivas & CLS</span>
                <span class="drawer-item-desc">max-width, proporções e loading lazy</span>
              </div>
            </RouterLink>

            <RouterLink to="/boas-praticas-vue" class="drawer-item" @click="closeMenu">
              <span class="drawer-num">05</span>
              <div class="drawer-item-content">
                <span class="drawer-item-title">Boas Práticas em Vue 3</span>
                <span class="drawer-item-desc">Componentização, props e tokens</span>
              </div>
            </RouterLink>

            <div class="drawer-divider"></div>

            <RouterLink to="/laboratorios" class="drawer-item drawer-item--lab" @click="closeMenu">
              <span class="item-icon">🧪</span>
              <div class="drawer-item-content">
                <span class="drawer-item-title">Laboratórios Interativos (3)</span>
                <span class="drawer-item-desc">Container, Unidades e Breakpoint</span>
              </div>
            </RouterLink>

            <RouterLink to="/desafio" class="drawer-item drawer-item--challenge" @click="closeMenu">
              <span class="item-icon">⭐</span>
              <div class="drawer-item-content">
                <span class="drawer-item-title">Final Mission: O Desafio</span>
                <span class="drawer-item-desc">Enigma prático de cálculo responsivo</span>
              </div>
            </RouterLink>
          </div>

          <div class="drawer-footer">
            <p class="drawer-note">Vice City Responsive Guide • GTA VI Theme</p>
            <span class="badge badge-pink">Vue 3 + Vite</span>
          </div>
        </nav>
      </Transition>
    </Teleport>
  </header>
</template>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(13, 10, 24, 0.72);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 4px 25px rgba(0, 0, 0, 0.45);
  width: 100%;
  transition: background-color var(--transition-normal);
}

.navbar-container {
  width: 100%;
  max-width: 82rem;
  margin: 0 auto;
  padding: 0.65rem var(--spacing-md);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-sm);
}

/* Marca / Logo GTA VI */
.brand-link {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  text-decoration: none;
  transition: transform var(--transition-fast);
  flex-shrink: 0;
}

.brand-link:hover {
  transform: scale(1.02);
  text-decoration: none;
}

.logo-vi-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.6rem;
  height: 2.1rem;
  filter: drop-shadow(0 0 8px rgba(255, 79, 163, 0.5));
}

.vi-svg {
  width: 100%;
  height: 100%;
  display: block;
}

.brand-text-group {
  display: flex;
  flex-direction: column;
}

.brand-title {
  font-family: var(--font-family-heading);
  font-size: 1.125rem;
  font-weight: 900;
  letter-spacing: 0.08em;
  color: #ffffff;
  line-height: 1.1;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.6);
}

.brand-subtitle {
  font-family: var(--font-family-heading);
  font-size: 0.55rem;
  font-weight: 700;
  letter-spacing: 0.22em;
  color: var(--color-accent);
  line-height: 1;
  text-transform: uppercase;
}

/* Navegação Desktop Centralizada (Visível a partir de telas médias/grandes) */
.nav-desktop {
  display: none;
}

@media (min-width: 64rem) {
  .nav-desktop {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    flex-wrap: nowrap;
  }
}

.nav-item {
  font-family: var(--font-family-heading);
  font-size: var(--font-size-xs);
  font-weight: 600;
  color: var(--color-text-secondary);
  padding: 0.45rem 0.75rem;
  border-radius: var(--radius-full);
  transition: all var(--transition-fast);
  text-decoration: none;
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  border: 1px solid transparent;
}

.nav-item:hover {
  color: #ffffff;
  background-color: rgba(255, 255, 255, 0.08);
  text-decoration: none;
}

/* Item Ativo Padrão destacado em Magenta */
.nav-item.router-link-active:not(.nav-item--lab):not(.nav-item--challenge) {
  color: #ffffff;
  background: var(--gradient-magenta-pink);
  box-shadow: 0 0 16px rgba(255, 79, 163, 0.5);
  border-color: rgba(255, 255, 255, 0.2);
  font-weight: 700;
}

/* Pílula Especial dos Laboratórios */
.nav-item--lab {
  color: var(--color-accent);
  border: 1px solid rgba(54, 217, 232, 0.4);
  background: rgba(54, 217, 232, 0.08);
}

.nav-item--lab:hover {
  border-color: var(--color-accent);
  box-shadow: var(--shadow-neon-cyan);
  color: #ffffff;
}

.nav-item--lab.router-link-active {
  background: rgba(54, 217, 232, 0.25);
  border-color: var(--color-accent);
  color: #ffffff;
  box-shadow: var(--shadow-neon-cyan);
}

/* Pílula Especial do Desafio */
.nav-item--challenge {
  color: #fbbf24;
  border: 1px solid rgba(245, 158, 11, 0.4);
  background: rgba(245, 158, 11, 0.08);
}

.nav-item--challenge:hover {
  border-color: #fbbf24;
  box-shadow: 0 0 14px rgba(245, 158, 11, 0.35);
  color: #ffffff;
}

.nav-item--challenge.router-link-active {
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.3) 0%, rgba(255, 79, 163, 0.3) 100%);
  border-color: #fbbf24;
  color: #ffffff;
  box-shadow: 0 0 14px rgba(245, 158, 11, 0.4);
}

.item-icon {
  font-size: 0.9rem;
  line-height: 1;
}

/* Botão Hambúrguer Mobile */
.hamburger-btn {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2.75rem;
  height: 2.75rem;
  padding: 0.65rem 0.55rem;
  background: rgba(28, 20, 48, 0.7);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
  backdrop-filter: blur(8px);
}

@media (min-width: 64rem) {
  .hamburger-btn {
    display: none;
  }
}

.hamburger-btn:hover {
  border-color: var(--color-primary);
  box-shadow: var(--shadow-neon-pink);
}

.hamburger-btn:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

.hamburger-bar {
  width: 100%;
  height: 2px;
  background-color: var(--color-text-primary);
  border-radius: 2px;
  transition: all var(--transition-normal);
  transform-origin: center;
}

.hamburger-btn.is-active .hamburger-bar:nth-child(1) {
  transform: translateY(6px) rotate(45deg);
  background-color: var(--color-primary);
}

.hamburger-btn.is-active .hamburger-bar:nth-child(2) {
  opacity: 0;
  transform: scaleX(0);
}

.hamburger-btn.is-active .hamburger-bar:nth-child(3) {
  transform: translateY(-6px) rotate(-45deg);
  background-color: var(--color-primary);
}

/* Backdrop Escuro com Blur no Restante da Tela */
.mobile-backdrop {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  height: 100dvh;
  background: rgba(8, 5, 18, 0.72);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: 9998;
}

/* Gaveta / Drawer Mobile */
.mobile-drawer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 86%;
  max-width: 25rem;
  height: 100vh;
  height: 100dvh;
  background: rgba(16, 12, 28, 0.97);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border-left: 1px solid rgba(255, 79, 163, 0.35);
  box-shadow: -10px 0 45px rgba(0, 0, 0, 0.85), 0 0 25px rgba(255, 79, 163, 0.2);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding: var(--spacing-lg) var(--spacing-md);
}

.drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: var(--spacing-md);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: var(--spacing-md);
}

.drawer-brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.drawer-vi-badge {
  font-family: var(--font-family-heading);
  font-size: 1.25rem;
  font-weight: 900;
  background: var(--gradient-sunset);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1;
}

.drawer-title {
  display: block;
  font-family: var(--font-family-heading);
  font-size: 0.95rem;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: 0.05em;
  line-height: 1;
}

.drawer-sub {
  display: block;
  font-size: 0.55rem;
  font-weight: 700;
  color: var(--color-accent);
  letter-spacing: 0.15em;
}

.drawer-close-btn {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #ffffff;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1rem;
  transition: all var(--transition-fast);
}

.drawer-close-btn:hover {
  background: rgba(255, 79, 163, 0.25);
  border-color: var(--color-primary);
  color: #ffffff;
}

.drawer-links {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  flex: 1;
}

.drawer-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.7rem 0.85rem;
  border-radius: var(--radius-md);
  color: var(--color-text-secondary);
  text-decoration: none;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid transparent;
  transition: all var(--transition-fast);
}

.drawer-item:hover {
  background: rgba(255, 255, 255, 0.08);
  color: #ffffff;
  text-decoration: none;
}

.drawer-item.router-link-active {
  background: rgba(255, 79, 163, 0.15);
  border-color: rgba(255, 79, 163, 0.4);
  color: #ffffff;
  box-shadow: 0 0 12px rgba(255, 79, 163, 0.2);
}

.drawer-num {
  font-family: var(--font-family-code);
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--color-primary);
  background: rgba(255, 79, 163, 0.15);
  padding: 0.2rem 0.45rem;
  border-radius: var(--radius-sm);
  border: 1px solid rgba(255, 79, 163, 0.25);
}

.drawer-item-content {
  display: flex;
  flex-direction: column;
}

.drawer-item-title {
  font-family: var(--font-family-heading);
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: #ffffff;
}

.drawer-item-desc {
  font-size: 0.7rem;
  color: var(--color-text-muted);
}

.drawer-divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.08);
  margin: var(--spacing-sm) 0;
}

.drawer-item--lab {
  border-color: rgba(54, 217, 232, 0.3);
  background: rgba(54, 217, 232, 0.06);
}

.drawer-item--challenge {
  border-color: rgba(245, 158, 11, 0.3);
  background: rgba(245, 158, 11, 0.06);
}

.drawer-footer {
  margin-top: var(--spacing-lg);
  padding-top: var(--spacing-md);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.drawer-note {
  font-size: 0.7rem;
  color: var(--color-text-muted);
}

/* Transições da Gaveta e Backdrop */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.drawer-enter-active,
.drawer-leave-active {
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.drawer-enter-from,
.drawer-leave-to {
  transform: translateX(100%);
}
</style>