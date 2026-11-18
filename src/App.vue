<script setup>
import { RouterView } from 'vue-router'
import AppNavbar from './components/AppNavbar.vue'
</script>

<template>
  <div class="app-container">
    <AppNavbar />

    <main class="main-content">
      <RouterView />
    </main>

    <footer class="app-footer">
      <div class="footer-inner">
        <p>Projeto de Responsividade — Guia Interativo em Vue 3 (Esqueleto de Seções)</p>
        <p class="footer-sub">Fontes utilizadas: <strong>Poppins</strong> & <strong>Iterian / Inter</strong> | Pronto para deploy na Vercel</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.app-footer {
  background-color: var(--color-surface);
  border-top: 1px solid var(--color-border);
  padding: var(--spacing-lg) 0;
  margin-top: auto;
  text-align: center;
}

.footer-inner {
  width: 1024px;
  margin: 0 auto;
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}

.footer-sub {
  margin-top: var(--spacing-xs);
  font-size: var(--font-size-xs);
}
</style>
