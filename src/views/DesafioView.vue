<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useLabsStore } from '../stores/labsStore'

const labsStore = useLabsStore()

const inputResposta = ref(labsStore.challengeAnswer || '')
const feedback = ref(null)
const mostrarDica = ref(false)

const respostaNormalizada = computed(() => {
  return inputResposta.value.trim().toLowerCase().replace('px', '').trim()
})

const verificarResposta = () => {
  const resp = respostaNormalizada.value

  if (!resp) {
    feedback.value = {
      tipo: 'aviso',
      titulo: 'Campo Vazio',
      mensagem: 'Por favor, digite um valor numérico em pixels (ex: 608 ou 608px) para validar sua hipótese.'
    }
    return
  }

  // Resposta exata: 608px
  if (resp === '608') {
    feedback.value = {
      tipo: 'sucesso',
      titulo: 'MISSION PASSED! RESPEITO + 🏆',
      mensagem: 'Excelente raciocínio! 608px é o limiar exato para o surgimento de 3 colunas no CSS Grid!'
    }
    labsStore.challengeAnswer = inputResposta.value
    labsStore.registerChallengeAttempt(true)
    return
  }

  // Dicas contextuais inteligentes para erros comuns
  if (resp === '576') {
    feedback.value = {
      tipo: 'erro',
      titulo: 'Você esqueceu dos Gaps!',
      mensagem: '576px é a soma pura dos 3 cards de 12rem (3 × 192px = 576px). Porém, entre 3 colunas existem 2 espaçamentos (gaps) de 1rem (16px cada = 32px) que também ocupam espaço!'
    }
  } else if (resp === '464') {
    feedback.value = {
      tipo: 'erro',
      titulo: 'Atenção às variáveis do problema!',
      mensagem: '464px foi a resposta da Seção 3 para 2 colunas com cards de 14rem. Aqui estamos calculando 3 colunas com cards de 12rem!'
    }
  } else if (resp === '624') {
    feedback.value = {
      tipo: 'erro',
      titulo: 'Cuidado com o número de gaps!',
      mensagem: 'Parece que você somou 3 gaps (48px). Para separar 3 colunas lado a lado, são necessários apenas 2 espaços intermediários (2 × 16px = 32px)!'
    }
  } else if (Number(resp) < 400) {
    feedback.value = {
      tipo: 'erro',
      titulo: 'Valor muito baixo',
      mensagem: 'Um único card de 12rem já mede 192px. Para 3 colunas precisamos de muito mais espaço disponível!'
    }
  } else {
    feedback.value = {
      tipo: 'erro',
      titulo: 'Resposta Incorreta',
      mensagem: `O valor "${inputResposta.value}" ainda não é o limiar exato. Dica: calcule 3 cards de 12rem (192px cada) + 2 gaps de 1rem (16px cada).`
    }
  }

  labsStore.registerChallengeAttempt(false)
}

const reiniciarDesafio = () => {
  inputResposta.value = ''
  feedback.value = null
  labsStore.resetChallenge()
}
</script>

<template>
  <div class="desafio-page">
    <article class="desafio-card" aria-labelledby="desafio-title">
      <!-- Cabeçalho do Desafio com Temática Vice City -->
      <header class="desafio-header">
        <div class="badge-row">
          <span class="badge-mission">🌴 MISSÃO FINAL • RF11</span>
          <span v-if="labsStore.challengeCompleted" class="badge-completed">
            ★ Desafio Concluído!
          </span>
          <span v-else class="badge-status">
            Tentativas: {{ labsStore.challengeAttempts }}
          </span>
        </div>

        <h1 id="desafio-title" class="desafio-title">
          O Desafio Final do Guia: O Limiar das 3 Colunas
        </h1>

        <p class="desafio-subtitle">
          Esta é a atividade culminante do projeto. Uma pergunta autoral formulada pela dupla, cuja resposta exige a aplicação
          direta da matemática de layouts CSS Grid e unidades relativas demonstrada ao longo deste guia interativo!
        </p>
      </header>

      <!-- Caixa de Enunciado -->
      <section class="enunciado-section" aria-label="Enunciado oficial do desafio">
        <div class="enunciado-header">
          <span class="enunciado-icon">🎯</span>
          <h3>Enunciado da Missão</h3>
        </div>

        <div class="enunciado-body">
          <p>
            Na <strong>Seção 3 (Flexbox e Grid)</strong> e no <strong>LAB01</strong>, calculamos e comprovamos que um contêiner configurado com
            <code>repeat(auto-fit, minmax(14rem, 1fr))</code> e <code>gap: 1rem</code> (adotando <code>1rem = 16px</code>)
            passa de 1 para 2 colunas exatamente aos <strong>464px</strong>.
          </p>

          <div class="scenario-box">
            <h4 class="scenario-title">Agora considere o seguinte cenário prático em Vice City:</h4>
            <p>
              Você está desenvolvendo a nova vitrine responsiva da concessionária de veículos de luxo de Ocean Drive.
              As novas especificações de estilo CSS são:
            </p>
            <ul class="specs-list">
              <li>Largura mínima por card: <code>minmax(12rem, 1fr)</code></li>
              <li>Espaçamento entre colunas: <code>gap: 1rem</code></li>
              <li>Tamanho da fonte raiz do navegador: <code>1rem = 16px</code></li>
            </ul>
          </div>

          <p class="question-callout">
            ❓ <strong>Pergunta:</strong> A partir de qual largura total do contêiner (em pixels) os cards deixarão de ficar empilhados em 2 colunas e passarão a exibir exatamente <strong>3 colunas</strong> lado a lado?
          </p>
        </div>
      </section>

      <!-- Painel Interativo de Resolução -->
      <section class="resolution-section" aria-label="Área de inserção e validação da resposta">
        <label for="campo-resposta" class="label-input">
          Digite o valor exato calculado (em pixels):
        </label>

        <div class="input-form">
          <div class="input-wrapper">
            <input
              id="campo-resposta"
              v-model="inputResposta"
              type="text"
              placeholder="Ex: 500 ou 500px"
              class="input-resposta"
              aria-label="Sua resposta em pixels para a transição de 3 colunas"
              @keyup.enter="verificarResposta"
            />
            <span class="input-addon">px</span>
          </div>

          <button
            type="button"
            class="btn-validate"
            @click="verificarResposta"
          >
            Validar Resposta
          </button>

          <button
            v-if="feedback || labsStore.challengeCompleted"
            type="button"
            class="btn-reset"
            title="Limpar e tentar novamente"
            @click="reiniciarDesafio"
          >
            ↺ Limpar
          </button>
        </div>

        <!-- Feedback em Tempo Real (RF12) -->
        <transition name="fade">
          <div
            v-if="feedback"
            class="feedback-banner"
            :class="`feedback-${feedback.tipo}`"
            role="status"
          >
            <div class="feedback-icon">
              {{ feedback.tipo === 'sucesso' ? '🏆' : feedback.tipo === 'aviso' ? 'ℹ️' : '❌' }}
            </div>
            <div class="feedback-content">
              <strong class="feedback-title">{{ feedback.titulo }}</strong>
              <p class="feedback-msg">{{ feedback.mensagem }}</p>
            </div>
          </div>
        </transition>

        <!-- Área de Celebração e Demonstração Visual ao Acertar -->
        <transition name="fade">
          <div v-if="labsStore.challengeCompleted" class="success-breakdown">
            <div class="breakdown-header">
              <span class="star-icon">⭐</span>
              <h4>Memória de Cálculo Completa Passo a Passo:</h4>
            </div>

            <div class="calc-steps-grid">
              <div class="step-card">
                <span class="step-num">Passo 1</span>
                <span class="step-label">Largura de 1 Card:</span>
                <code class="step-code">12rem × 16px = 192px</code>
              </div>

              <div class="step-card">
                <span class="step-num">Passo 2</span>
                <span class="step-label">Total para 3 Cards:</span>
                <code class="step-code">3 × 192px = 576px</code>
              </div>

              <div class="step-card">
                <span class="step-num">Passo 3</span>
                <span class="step-label">2 Gaps Intermediários:</span>
                <code class="step-code">2 × 16px = 32px</code>
              </div>

              <div class="step-card highlight">
                <span class="step-num">Resultado Final</span>
                <span class="step-label">Limiar Exato:</span>
                <code class="step-code result">576px + 32px = 608px</code>
              </div>
            </div>

            <!-- Demonstração Visual com 3 Cards em 608px -->
            <div class="live-proof-box">
              <span class="proof-label">
                Simulação Real do Contêiner aos 608px (Grid com 3 colunas ativas):
              </span>
              <div class="proof-container">
                <div class="proof-grid">
                  <div class="proof-card">
                    <span class="car-icon">🏎️</span>
                    <strong>Card 1</strong>
                    <code>min 192px</code>
                  </div>
                  <div class="proof-card">
                    <span class="car-icon">🏍️</span>
                    <strong>Card 2</strong>
                    <code>min 192px</code>
                  </div>
                  <div class="proof-card">
                    <span class="car-icon">🛥️</span>
                    <strong>Card 3</strong>
                    <code>min 192px</code>
                  </div>
                </div>
              </div>
              <small class="proof-caption">
                Com 607px, o terceiro card cai para a linha de baixo. Aos 608px cravados, os 3 cards cabem na mesma linha!
              </small>
            </div>
          </div>
        </transition>
      </section>

      <!-- Painel de Dicas e Referências de Suporte -->
      <footer class="desafio-footer">
        <button
          type="button"
          class="btn-toggle-hint"
          @click="mostrarDica = !mostrarDica"
        >
          <span>💡 {{ mostrarDica ? 'Ocultar Dica Estratégica' : 'Precisa de Ajuda com a Fórmula? (Ver Dica)' }}</span>
          <span>{{ mostrarDica ? '▲' : '▼' }}</span>
        </button>

        <div v-show="mostrarDica" class="hint-panel">
          <p>
            <strong>Lembre-se da Fórmula Geral do CSS Grid Auto-Fit:</strong>
          </p>
          <p class="formula-quote">
            <code>Largura Mínima = (N_colunas × Largura_Card_px) + ((N_colunas - 1) × Gap_px)</code>
          </p>
          <ul class="hint-list">
            <li>Substitua <code>N_colunas = 3</code>.</li>
            <li>Substitua <code>Largura_Card_px = 12 × 16 = 192px</code>.</li>
            <li>Substitua <code>Gap_px = 1 × 16 = 16px</code>.</li>
            <li>O número de gaps é <code>(3 - 1) = 2</code>.</li>
          </ul>
        </div>

        <div class="navigation-links">
          <RouterLink to="/flexbox-grid" class="nav-link">
            ← Revisar Seção 3 (Flexbox e Grid)
          </RouterLink>
          <RouterLink to="/laboratorios" class="nav-link">
            Experimentar no LAB01 (Container Slider) →
          </RouterLink>
        </div>
      </footer>
    </article>
  </div>
</template>

<style scoped>
.desafio-page {
  width: 100%;
}

.desafio-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-lg), 0 0 25px rgba(255, 79, 163, 0.12);
  position: relative;
  overflow: hidden;
}

@media (min-width: 48rem) {
  .desafio-card {
    padding: var(--spacing-2xl);
  }
}

.desafio-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--gradient-sunset);
}

/* Cabeçalho */
.desafio-header {
  margin-bottom: var(--spacing-xl);
}

.badge-row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
  align-items: center;
  margin-bottom: var(--spacing-sm);
}

.badge-mission {
  display: inline-block;
  background: rgba(255, 79, 163, 0.2);
  color: #ff70b5;
  border: 1px solid rgba(255, 79, 163, 0.4);
  font-size: var(--font-size-xs);
  font-weight: 700;
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-full);
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.badge-completed {
  display: inline-block;
  background: rgba(16, 185, 129, 0.2);
  color: #34d399;
  border: 1px solid rgba(16, 185, 129, 0.5);
  box-shadow: 0 0 10px rgba(16, 185, 129, 0.3);
  font-size: var(--font-size-xs);
  font-weight: 700;
  padding: 0.25rem 0.65rem;
  border-radius: var(--radius-full);
}

.badge-status {
  display: inline-block;
  background: rgba(255, 255, 255, 0.08);
  color: var(--color-text-muted);
  font-size: var(--font-size-xs);
  padding: 0.25rem 0.6rem;
  border-radius: var(--radius-full);
}

.desafio-title {
  font-size: var(--font-size-2xl);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-xs);
  line-height: 1.25;
}

@media (min-width: 48rem) {
  .desafio-title {
    font-size: var(--font-size-3xl);
  }
}

.desafio-subtitle {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: 1.6;
  max-width: 50rem;
}

/* Enunciado */
.enunciado-section {
  background: var(--color-surface-muted);
  border: 1px solid var(--color-border);
  border-left: 4px solid var(--color-secondary);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
  margin-bottom: var(--spacing-xl);
}

@media (min-width: 48rem) {
  .enunciado-section {
    padding: var(--spacing-lg);
  }
}

.enunciado-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: var(--spacing-sm);
}

.enunciado-icon {
  font-size: 1.25rem;
}

.enunciado-header h3 {
  font-size: var(--font-size-base);
  color: var(--color-text-primary);
}

.enunciado-body p {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.scenario-box {
  background: rgba(42, 32, 66, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-sm);
  padding: var(--spacing-md);
  margin: var(--spacing-md) 0;
}

.scenario-title {
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-xs);
}

.specs-list {
  list-style: square inside;
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  margin-top: 0.4rem;
}

.specs-list code {
  color: var(--color-accent);
}

.question-callout {
  background: rgba(255, 79, 163, 0.1);
  border: 1px dashed rgba(255, 79, 163, 0.4);
  border-radius: var(--radius-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  color: #fff5fa !important;
  font-size: var(--font-size-sm) !important;
}

/* Área de Resolução */
.resolution-section {
  background: #0c0915;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
  margin-bottom: var(--spacing-xl);
}

@media (min-width: 48rem) {
  .resolution-section {
    padding: var(--spacing-lg);
  }
}

.label-input {
  display: block;
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-xs);
}

.input-form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

@media (min-width: 36rem) {
  .input-form {
    flex-direction: row;
    align-items: center;
  }
}

.input-wrapper {
  display: flex;
  align-items: center;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  overflow: hidden;
  flex: 1;
  max-width: 22rem;
  transition: border-color var(--transition-fast);
}

.input-wrapper:focus-within {
  border-color: var(--color-primary);
  box-shadow: 0 0 10px rgba(255, 79, 163, 0.35);
}

.input-resposta {
  background: transparent;
  border: none;
  padding: 0.65rem 0.9rem;
  color: #ffffff;
  font-family: var(--font-family-code);
  font-size: var(--font-size-base);
  font-weight: 700;
  outline: none;
  width: 100%;
}

.input-addon {
  padding: 0.65rem 0.8rem;
  background: var(--color-surface-light);
  color: var(--color-text-muted);
  font-family: var(--font-family-code);
  font-size: var(--font-size-xs);
  border-left: 1px solid var(--color-border);
}

.btn-validate {
  background: var(--gradient-sunset);
  color: #ffffff;
  border: none;
  font-weight: 700;
  font-size: var(--font-size-sm);
  padding: 0.7rem 1.4rem;
  border-radius: var(--radius-md);
  cursor: pointer;
  box-shadow: 0 0 15px rgba(255, 79, 163, 0.4);
  transition: transform var(--transition-fast);
  white-space: nowrap;
}

.btn-validate:hover {
  transform: translateY(-2px);
}

.btn-reset {
  background: transparent;
  border: 1px dashed var(--color-border);
  color: var(--color-text-muted);
  font-size: var(--font-size-xs);
  padding: 0.7rem 1rem;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.btn-reset:hover {
  border-color: var(--color-secondary);
  color: var(--color-text-primary);
}

/* Banner de Feedback */
.feedback-banner {
  display: flex;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  margin-top: var(--spacing-md);
  border: 1px solid;
  align-items: flex-start;
}

.feedback-sucesso {
  background: rgba(16, 185, 129, 0.12);
  border-color: rgba(16, 185, 129, 0.5);
  box-shadow: 0 0 15px rgba(16, 185, 129, 0.2);
}

.feedback-sucesso .feedback-title {
  color: #34d399;
}

.feedback-erro {
  background: rgba(239, 68, 68, 0.12);
  border-color: rgba(239, 68, 68, 0.4);
}

.feedback-erro .feedback-title {
  color: #fca5a5;
}

.feedback-aviso {
  background: rgba(245, 158, 11, 0.12);
  border-color: rgba(245, 158, 11, 0.4);
}

.feedback-aviso .feedback-title {
  color: #fcd34d;
}

.feedback-icon {
  font-size: 1.5rem;
}

.feedback-content {
  flex: 1;
}

.feedback-title {
  display: block;
  font-size: var(--font-size-sm);
  margin-bottom: 0.2rem;
}

.feedback-msg {
  font-size: var(--font-size-xs);
  color: var(--color-text-primary);
  line-height: 1.5;
}

/* Memória de Cálculo e Demonstração */
.success-breakdown {
  margin-top: var(--spacing-lg);
  border-top: 1px dashed rgba(255, 255, 255, 0.1);
  padding-top: var(--spacing-lg);
}

.breakdown-header {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: var(--spacing-md);
}

.breakdown-header h4 {
  font-size: var(--font-size-sm);
  color: #34d399;
}

.calc-steps-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-lg);
}

@media (min-width: 40rem) {
  .calc-steps-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 64rem) {
  .calc-steps-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.step-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.step-card.highlight {
  border-color: #34d399;
  background: rgba(16, 185, 129, 0.1);
  box-shadow: 0 0 10px rgba(16, 185, 129, 0.2);
}

.step-num {
  font-size: 0.65rem;
  color: var(--color-text-muted);
  text-transform: uppercase;
  font-weight: 700;
}

.step-label {
  font-size: var(--font-size-xs);
  color: var(--color-text-primary);
}

.step-code {
  font-family: var(--font-family-code);
  font-size: var(--font-size-xs);
  color: var(--color-accent);
}

.step-code.result {
  color: #34d399;
  font-weight: 800;
  font-size: var(--font-size-sm);
}

/* Demonstração Visual da Prova Real */
.live-proof-box {
  background: var(--color-surface-muted);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
}

.proof-label {
  display: block;
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-sm);
  font-weight: 600;
}

.proof-container {
  max-width: 608px;
  margin: 0 auto;
  border: 2px dashed #34d399;
  border-radius: var(--radius-sm);
  padding: var(--spacing-sm);
  background: rgba(16, 185, 129, 0.05);
}

.proof-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
  gap: 1rem;
}

.proof-card {
  background: var(--color-surface-light);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-sm);
  padding: 0.75rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  align-items: center;
}

.car-icon {
  font-size: 1.4rem;
}

.proof-card strong {
  font-size: var(--font-size-xs);
  color: var(--color-text-primary);
}

.proof-card code {
  font-size: 0.7rem;
  color: var(--color-accent);
}

.proof-caption {
  display: block;
  font-size: 0.7rem;
  color: var(--color-text-muted);
  text-align: center;
  margin-top: var(--spacing-sm);
}

/* Rodapé do Desafio */
.desafio-footer {
  margin-top: var(--spacing-lg);
}

.btn-toggle-hint {
  width: 100%;
  background: var(--color-surface-muted);
  border: 1px solid var(--color-border);
  color: var(--color-text-secondary);
  padding: 0.6rem 1rem;
  border-radius: var(--radius-sm);
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: var(--font-size-xs);
  transition: all var(--transition-fast);
}

.btn-toggle-hint:hover {
  border-color: var(--color-secondary);
  color: var(--color-text-primary);
}

.hint-panel {
  background: rgba(28, 21, 48, 0.8);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  padding: var(--spacing-md);
  margin-top: var(--spacing-sm);
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  line-height: 1.5;
}

.formula-quote code {
  display: block;
  background: #0c0915;
  color: var(--color-accent);
  padding: 0.5rem;
  border-radius: var(--radius-sm);
  margin: 0.4rem 0;
  font-size: 0.75rem;
}

.hint-list {
  list-style: disc inside;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-top: 0.4rem;
}

.navigation-links {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: var(--spacing-lg);
  border-top: 1px solid var(--color-border);
  padding-top: var(--spacing-md);
}

@media (min-width: 36rem) {
  .navigation-links {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}

.nav-link {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.nav-link:hover {
  color: var(--color-accent);
  text-decoration: underline;
}

/* Transições */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>
