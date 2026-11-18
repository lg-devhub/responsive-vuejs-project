<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <footer class="app-footer">
    <div class="footer-container">
      <div class="footer-grid">
        <!-- Coluna 1: Sobre o Projeto -->
        <div class="footer-col brand-col">
          <div class="footer-brand">
            <span class="neon-icon">🌴</span>
            <span class="brand-text">Vice City Guide</span>
          </div>
          <p class="brand-desc">
            Aplicação educacional interativa projetada para ensinar os fundamentos, cálculos e boas práticas de responsividade web moderna com Vue 3.
          </p>
          <span class="badge badge-pink">Trabalho Acadêmico • Frontend</span>
        </div>

        <!-- Coluna 2: Navegação Rápida -->
        <div class="footer-col">
          <h4 class="col-title">Seções do Guia</h4>
          <ul class="footer-links">
            <li><RouterLink to="/por-que-responsividade-importa">1. Introdução à Responsividade</RouterLink></li>
            <li><RouterLink to="/unidades-css">2. Unidades CSS</RouterLink></li>
            <li><RouterLink to="/flexbox-grid">3. Flexbox & Grid</RouterLink></li>
            <li><RouterLink to="/imagens-responsivas">4. Imagens Responsivas</RouterLink></li>
            <li><RouterLink to="/boas-praticas-vue">5. Boas Práticas Vue</RouterLink></li>
          </ul>
        </div>

        <!-- Coluna 3: Laboratórios & Missão -->
        <div class="footer-col">
          <h4 class="col-title">Experimentação</h4>
          <ul class="footer-links">
            <li><RouterLink to="/laboratorios">🧪 Laboratórios Interativos</RouterLink></li>
            <li><RouterLink to="/desafio">🎯 Desafio Final (Final Mission)</RouterLink></li>
          </ul>
          <div class="footer-tech-stack">
            <span class="tech-tag">Vue 3</span>
            <span class="tech-tag">Vite</span>
            <span class="tech-tag">Pinia</span>
            <span class="tech-tag">CSS3</span>
          </div>
        </div>
      </div>

      <!-- Barra inferior com aviso legal -->
      <div class="footer-bottom">
        <p class="copyright">
          © 2026 Vice City Responsive Guide — Desenvolvido para fins puramente educacionais e acadêmicos.
        </p>
        <p class="disclaimer">
          Inspirado na estética e ambientação de Grand Theft Auto VI (Vice City). Este projeto é independente e <strong>não possui nenhum vínculo, afiliação ou patrocínio oficial da Rockstar Games ou Take-Two Interactive</strong>.
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  background-color: var(--color-surface);
  border-top: 1px solid var(--color-border);
  padding: var(--spacing-2xl) var(--spacing-md) var(--spacing-xl);
  margin-top: auto;
  position: relative;
  z-index: 10;
}

.footer-container {
  width: 100%;
  max-width: 76rem;
  margin: 0 auto;
}

.footer-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-xl);
  margin-bottom: var(--spacing-2xl);
}

@media (min-width: 48rem) {
  .footer-grid {
    grid-template-columns: 2fr 1.2fr 1.2fr;
    gap: var(--spacing-2xl);
  }
}

.footer-col {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.footer-brand {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  font-family: var(--font-family-heading);
  font-size: var(--font-size-lg);
  font-weight: 800;
  color: var(--color-text-primary);
}

.neon-icon {
  font-size: 1.5rem;
}

.brand-text {
  background: var(--gradient-sunset);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.brand-desc {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  line-height: 1.6;
}

.col-title {
  font-family: var(--font-family-heading);
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: var(--spacing-xs);
  position: relative;
  padding-bottom: 0.4rem;
}

.col-title::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 2rem;
  height: 2px;
  background: var(--color-primary);
}

.footer-links {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.footer-links a {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  transition: all var(--transition-fast);
  display: inline-block;
}

.footer-links a:hover {
  color: var(--color-primary);
  transform: translateX(4px);
  text-decoration: none;
}

.footer-tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: var(--spacing-sm);
}

.tech-tag {
  background: var(--color-surface-light);
  border: 1px solid var(--color-border);
  color: var(--color-accent);
  font-size: var(--font-size-xs);
  padding: 0.15rem 0.5rem;
  border-radius: var(--radius-sm);
  font-family: var(--font-family-code);
}

.footer-bottom {
  border-top: 1px solid var(--color-border);
  padding-top: var(--spacing-lg);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  text-align: center;
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}

.disclaimer {
  opacity: 0.8;
  max-width: 50rem;
  margin: 0 auto;
  line-height: 1.5;
}
</style>
