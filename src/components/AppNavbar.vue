<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <header class="navbar">
    <div class="navbar-inner">
      <div class="brand">
        <RouterLink to="/" class="brand-link">
          <span class="brand-title">Guia Responsividade</span>
          <span class="badge">Esqueleto</span>
        </RouterLink>
      </div>

      <nav class="nav-links">
        <RouterLink to="/" class="nav-item">Início</RouterLink>
        <RouterLink to="/por-que-responsividade-importa" class="nav-item">1. Importância</RouterLink>
        <RouterLink to="/unidades-css" class="nav-item">2. Unidades</RouterLink>
        <RouterLink to="/flexbox-grid" class="nav-item">3. Flex & Grid</RouterLink>
        <RouterLink to="/imagens-responsivas" class="nav-item">4. Imagens</RouterLink>
        <RouterLink to="/boas-praticas-vue" class="nav-item">5. Boas Práticas</RouterLink>
        <RouterLink to="/desafio" class="nav-item nav-item-highlight">6. Desafio</RouterLink>
        <RouterLink to="/laboratorios" class="nav-item nav-item-lab">🧪 Labs (3)</RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.navbar {
  background-color: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
  position: sticky;
  top: 0;
  z-index: 100;
}

.navbar-inner {
  width: 1024px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-sm) var(--spacing-md);
}

.brand-link {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  text-decoration: none;
}

.brand-title {
  font-family: var(--font-family-heading);
  font-size: var(--font-size-lg);
  font-weight: 700;
  color: var(--color-text-primary);
}

.badge {
  background-color: var(--color-surface-muted);
  color: var(--color-text-muted);
  font-size: var(--font-size-xs);
  padding: 0.1rem 0.4rem;
  border-radius: var(--radius-sm);
  font-weight: 600;
}

.nav-links {
  display: flex;
  gap: var(--spacing-sm);
  align-items: center;
}

.nav-item {
  font-family: var(--font-family-body);
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--color-text-secondary);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-sm);
  transition: all 0.2s;
  text-decoration: none;
}

.nav-item:hover {
  color: var(--color-primary);
  background-color: var(--color-surface-muted);
  text-decoration: none;
}

.nav-item.router-link-active {
  color: var(--color-primary-dark);
  background-color: #dbeafe;
  font-weight: 600;
}

.nav-item-highlight.router-link-active {
  background-color: #fef3c7;
  color: #92400e;
}

.nav-item-lab {
  background-color: #ecfdf5;
  color: #065f46;
  font-weight: 600;
}
</style>
