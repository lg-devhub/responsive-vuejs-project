<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <footer class="app-footer" role="contentinfo">
    <div class="footer-container">
      <div class="footer-grid">
        <!-- Coluna 1: Sobre o Projeto com Identidade GTA VI -->
        <div class="footer-col brand-col">
          <div class="footer-brand">
            <div class="footer-vi-badge" aria-hidden="true">
              <svg class="footer-vi-svg" viewBox="0 0 46 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="footerViGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#ff4fa3" />
                    <stop offset="50%" stop-color="#a855f7" />
                    <stop offset="100%" stop-color="#36d9e8" />
                  </linearGradient>
                </defs>
                <path d="M2 3 L13.5 33 L20.5 33 L30 3 L23 3 L17 23.5 L10.5 3 Z" fill="url(#footerViGradient)" />
                <path d="M34 3 L34 33 L42 33 L42 3 Z" fill="url(#footerViGradient)" />
              </svg>
            </div>
            <div class="footer-brand-text">
              <span class="brand-name">VICE CITY</span>
              <span class="brand-sub">RESPONSIVE GUIDE</span>
            </div>
          </div>
          <p class="brand-desc">
            Aplicação educacional interativa projetada para ensinar os fundamentos, cálculos e boas práticas de responsividade web moderna com Vue 3.
          </p>
          <div class="brand-tag-wrap">
            <span class="badge badge-pink">Trabalho Acadêmico • Frontend</span>
          </div>
        </div>

        <!-- Coluna 2: Navegação Rápida -->
        <div class="footer-col">
          <h4 class="col-title">Seções do Guia</h4>
          <ul class="footer-links">
            <li><RouterLink to="/por-que-responsividade-importa">1. Introdução à Responsividade</RouterLink></li>
            <li><RouterLink to="/unidades-css">2. Unidades CSS (rem, em, %)</RouterLink></li>
            <li><RouterLink to="/flexbox-grid">3. Flexbox & Grid</RouterLink></li>
            <li><RouterLink to="/imagens-responsivas">4. Imagens Responsivas & CLS</RouterLink></li>
            <li><RouterLink to="/boas-praticas-vue">5. Boas Práticas em Vue 3</RouterLink></li>
          </ul>
        </div>

        <!-- Coluna 3: Experimentação & Stack -->
        <div class="footer-col">
          <h4 class="col-title">Experimentação</h4>
          <ul class="footer-links">
            <li><RouterLink to="/laboratorios" class="link-lab">🧪 Laboratórios Interativos (3)</RouterLink></li>
            <li><RouterLink to="/desafio" class="link-challenge">⭐ Desafio Final (Final Mission)</RouterLink></li>
          </ul>
          <div class="footer-tech-stack">
            <span class="tech-tag">Vue 3</span>
            <span class="tech-tag">Vite</span>
            <span class="tech-tag">Pinia</span>
            <span class="tech-tag">CSS3</span>
          </div>
        </div>
      </div>

      <!-- Barra inferior com aviso legal e créditos acadêmicos -->
      <div class="footer-bottom">
        <p class="copyright">
          © 2026 Vice City Responsive Guide — Desenvolvido para fins puramente educacionais e acadêmicos.
        </p>
        <p class="disclaimer">
          Inspirado na atmosfera de Grand Theft Auto VI (Vice City). Projeto independente sem vínculo oficial com a Rockstar Games.
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  background: rgba(13, 10, 24, 0.88);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-top: 1px solid rgba(255, 79, 163, 0.25);
  padding: var(--spacing-2xl) var(--spacing-md) var(--spacing-xl);
  margin-top: auto;
  position: relative;
  z-index: 10;
  width: 100%;
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
  gap: 0.65rem;
}

.footer-vi-badge {
  width: 2.4rem;
  height: 1.9rem;
  flex-shrink: 0;
  filter: drop-shadow(0 0 8px rgba(255, 79, 163, 0.4));
}

.footer-vi-svg {
  width: 100%;
  height: 100%;
  display: block;
}

.footer-brand-text {
  display: flex;
  flex-direction: column;
}

.brand-name {
  font-family: var(--font-family-heading);
  font-size: 1.15rem;
  font-weight: 900;
  letter-spacing: 0.08em;
  color: #ffffff;
  line-height: 1.1;
}

.brand-sub {
  font-family: var(--font-family-heading);
  font-size: 0.55rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: var(--color-accent);
}

.brand-desc {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  line-height: 1.6;
  max-width: 28rem;
}

.brand-tag-wrap {
  margin-top: 0.25rem;
}

.col-title {
  font-family: var(--font-family-heading);
  font-size: var(--font-size-sm);
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: var(--spacing-xs);
  position: relative;
  padding-bottom: 0.4rem;
}

.col-title::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 2.25rem;
  height: 2px;
  background: var(--gradient-magenta-pink);
  border-radius: 2px;
}

.footer-links {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}

.footer-links a {
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  text-decoration: none;
  transition: all var(--transition-fast);
  display: inline-flex;
  align-items: center;
}

.footer-links a:hover {
  color: #ffffff;
  transform: translateX(4px);
  text-decoration: none;
}

.link-lab {
  color: var(--color-accent) !important;
}

.link-lab:hover {
  text-shadow: 0 0 10px rgba(54, 217, 232, 0.4);
}

.link-challenge {
  color: #fbbf24 !important;
}

.link-challenge:hover {
  text-shadow: 0 0 10px rgba(245, 158, 11, 0.4);
}

.footer-tech-stack {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  flex-wrap: wrap;
  margin-top: var(--spacing-sm);
}

.tech-tag {
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.2rem 0.55rem;
  border-radius: var(--radius-sm);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--color-text-secondary);
  font-family: var(--font-family-code);
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding-top: var(--spacing-md);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: var(--color-text-muted);
}

.copyright {
  color: var(--color-text-secondary);
}

.disclaimer {
  color: var(--color-text-muted);
  line-height: 1.5;
}
</style>