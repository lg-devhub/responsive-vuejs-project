<script setup>
import { RouterView } from 'vue-router'
import AppNavbar from './components/layout/AppNavbar.vue'
import AppFooter from './components/layout/AppFooter.vue'
import BreakpointMonitor from './components/layout/BreakpointMonitor.vue'
</script>

<template>
  <div class="app-container">
    <!-- Navbar fixa e responsiva com menu hambúrguer para mobile -->
    <AppNavbar />

    <!-- Área de Conteúdo Principal -->
    <main class="main-content" id="main-content">
      <RouterView />
    </main>

    <!-- Rodapé semântico e responsivo -->
    <AppFooter />

    <!-- LAB03: Monitor de Breakpoint Fixo em Tempo Real -->
    <BreakpointMonitor />
  </div>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
}

.main-content {
  flex: 1;
  width: 100%;
  max-width: 76rem;
  margin: 0 auto;
  padding: var(--spacing-lg) var(--spacing-md);
}

@media (min-width: 48rem) {
  .main-content {
    padding: var(--spacing-xl) var(--spacing-lg);
  }
}
</style>
