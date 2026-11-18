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
      <!-- Marca do Guia / Logo Vice City -->
      <RouterLink to="/" class="brand-link" @click="closeMenu">
        <span class="brand-icon">🌴</span>
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

      <!-- Navegação Desktop (visível apenas em telas amplas) -->
      <nav id="primary-navigation" class="nav-desktop" aria-label="Navegação Principal Desktop">
        <RouterLink to="/" class="nav-item">Início</RouterLink>
        <RouterLink to="/por-que-responsividade-importa" class="nav-item">1. Responsividade</RouterLink>
        <RouterLink to="/unidades-css" class="nav-item">2. Unidades</RouterLink>
        <RouterLink to="/flexbox-grid" class="nav-item">3. Flex & Grid</RouterLink>
        <RouterLink to="/imagens-responsivas" class="nav-item">4. Imagens</RouterLink>
        <RouterLink to="/boas-praticas-vue" class="nav-item">5. Boas Práticas</RouterLink>
        <RouterLink to="/laboratorios" class="nav-item nav-item-lab">🧪 Labs (3)</RouterLink>
        <RouterLink to="/desafio" class="nav-item nav-item-challenge">🎯 Desafio</RouterLink>
      </nav>
    </div>

    <!-- Backdrop escuro para o Menu Mobile -->
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
          <span class="drawer-title">Menu de Navegação</span>
          <span class="badge badge-pink">GTA VI Edition</span>
        </div>

        <div class="drawer-links">
          <RouterLink to="/" class="drawer-item" @click="closeMenu">
            <span class="item-icon">🏠</span>
            <span>Início</span>
          </RouterLink>

          <RouterLink to="/por-que-responsividade-importa" class="drawer-item" @click="closeMenu">
            <span class="item-number">01</span>
            <span>Introdução à Responsividade</span>
          </RouterLink>

          <RouterLink to="/unidades-css" class="drawer-item" @click="closeMenu">
            <span class="item-number">02</span>
            <span>Unidades CSS (rem, em, %)</span>
          </RouterLink>

          <RouterLink to="/flexbox-grid" class="drawer-item" @click="closeMenu">
            <span class="item-number">03</span>
            <span>Flexbox & Grid Layout</span>
          </RouterLink>

          <RouterLink to="/imagens-responsivas" class="drawer-item" @click="closeMenu">
            <span class="item-number">04</span>
            <span>Imagens Responsivas & CLS</span>
          </RouterLink>

          <RouterLink to="/boas-praticas-vue" class="drawer-item" @click="closeMenu">
            <span class="item-number">05</span>
            <span>Boas Práticas em Vue 3</span>
          </RouterLink>

          <div class="drawer-divider"></div>

          <RouterLink to="/laboratorios" class="drawer-item drawer-item-lab" @click="closeMenu">
            <span class="item-icon">🧪</span>
            <span>Laboratórios Interativos (3)</span>
          </RouterLink>

          <RouterLink to="/desafio" class="drawer-item drawer-item-challenge" @click="closeMenu">
            <span class="item-icon">🎯</span>
            <span>Final Mission: O Desafio</span>
          </RouterLink>
        </div>

        <div class="drawer-footer">
          <p class="drawer-note">Vice City Responsive Guide • 2026</p>
        </div>
      </nav>
    </Transition>
  </header>
</template>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(16, 13, 28, 0.88);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--color-border);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
  width: 100%;
}

.navbar-container {
  width: 100%;
  max-width: 76rem;
  margin: 0 auto;
  padding: 0.75rem var(--spacing-md);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Marca / Logo */
.brand-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  transition: transform var(--transition-fast);
}

.brand-link:hover {
  transform: scale(1.02);
  text-decoration: none;
}

.brand-icon {
  font-size: 1.5rem;
  line-height: 1;
}

.brand-text-group {
  display: flex;
  flex-direction: column;
}

.brand-title {
  font-family: var(--font-family-heading);
  font-size: 1.15rem;
  font-weight: 900;
  letter-spacing: 0.08em;
  background: var(--gradient-sunset);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.1;
}

.brand-subtitle {
  font-family: var(--font-family-heading);
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: var(--color-accent);
  line-height: 1;
}

/* Navegação Desktop (Escondida por padrão - Mobile First!) */
.nav-desktop {
  display: none;
}

@media (min-width: 64rem) {
  .nav-desktop {
    display: flex;
    align-items: center;
    gap: 0.35rem;
  }
}

.nav-item {
  font-family: var(--font-family-heading);
  font-size: var(--font-size-xs);
  font-weight: 600;
  color: var(--color-text-secondary);
  padding: 0.45rem 0.7rem;
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
  text-decoration: none;
  white-space: nowrap;
}

.nav-item:hover {
  color: var(--color-text-primary);
  background-color: var(--color-surface-light);
  text-decoration: none;
}

.nav-item.router-link-active {
  color: #ffffff;
  background: rgba(255, 79, 163, 0.2);
  border: 1px solid rgba(255, 79, 163, 0.4);
  box-shadow: 0 0 10px rgba(255, 79, 163, 0.2);
}

.nav-item-lab {
  color: var(--color-accent);
}

.nav-item-lab.router-link-active {
  background: rgba(54, 217, 232, 0.2);
  border-color: rgba(54, 217, 232, 0.4);
  color: #ffffff;
}

.nav-item-challenge {
  background: rgba(168, 85, 247, 0.15);
  border: 1px solid rgba(168, 85, 247, 0.3);
  color: var(--color-text-primary);
}

.nav-item-challenge.router-link-active {
  background: var(--gradient-sunset);
  border-color: transparent;
  color: #ffffff;
}

/* Botão Hambúrguer Mobile (Visível em Mobile e Tablet) */
.hamburger-btn {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2.75rem;
  height: 2.75rem;
  padding: 0.6rem 0.5rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
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

/* Backdrop escuro */
.mobile-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  z-index: 190;
}

/* Gaveta Móvel (Drawer) */
.mobile-drawer {
  position: fixed;
  top: 0;
  right: 0;
  width: min(85vw, 22rem);
  height: 100vh;
  background: var(--color-surface);
  border-left: 1px solid var(--color-border);
  box-shadow: var(--shadow-lg), -5px 0 25px rgba(0, 0, 0, 0.7);
  z-index: 200;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: var(--spacing-lg) var(--spacing-md);
}

.drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: var(--spacing-md);
  border-bottom: 1px solid var(--color-border);
  margin-bottom: var(--spacing-md);
}

.drawer-title {
  font-family: var(--font-family-heading);
  font-size: var(--font-size-sm);
  font-weight: 700;
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.drawer-links {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  flex: 1;
}

.drawer-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: 0.75rem var(--spacing-sm);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: all var(--transition-fast);
  border: 1px solid transparent;
}

.drawer-item:hover {
  background: var(--color-surface-light);
  color: var(--color-text-primary);
  text-decoration: none;
  transform: translateX(4px);
}

.drawer-item.router-link-active {
  background: rgba(255, 79, 163, 0.15);
  border-color: rgba(255, 79, 163, 0.35);
  color: var(--color-text-primary);
  font-weight: 600;
}

.item-number {
  font-family: var(--font-family-code);
  font-size: var(--font-size-xs);
  color: var(--color-accent);
  background: rgba(54, 217, 232, 0.1);
  padding: 0.1rem 0.35rem;
  border-radius: var(--radius-sm);
  min-width: 1.6rem;
  text-align: center;
}

.item-icon {
  font-size: 1.1rem;
}

.drawer-divider {
  height: 1px;
  background: var(--color-border);
  margin: var(--spacing-sm) 0;
}

.drawer-item-lab {
  background: rgba(54, 217, 232, 0.08);
  border-color: rgba(54, 217, 232, 0.2);
  color: var(--color-accent);
}

.drawer-item-challenge {
  background: rgba(168, 85, 247, 0.1);
  border-color: rgba(168, 85, 247, 0.25);
  color: var(--color-secondary);
}

.drawer-footer {
  padding-top: var(--spacing-md);
  border-top: 1px solid var(--color-border);
  text-align: center;
}

.drawer-note {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}

/* Animações de Transição */
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
  transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1);
}

.drawer-enter-from,
.drawer-leave-to {
  transform: translateX(100%);
}
</style>
