<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

// Estado do desafio interativo
const respostaUsuario = ref('')
const feedback = ref(null)
const tentativas = ref(0)

const verificarResposta = () => {
  const respostaLimpa = respostaUsuario.value.trim().toLowerCase().replace('px', '').trim()
  tentativas.value++

  if (!respostaLimpa) {
    feedback.value = {
      tipo: 'aviso',
      titulo: '⚠️ Campo Vazio',
      mensagem: 'Por favor, digite um valor numérico em pixels (ex: 608 ou 608px) para submeter sua resposta.'
    }
    return
  }

  // Resposta exata: 608px
  if (respostaLimpa === '608') {
    feedback.value = {
      tipo: 'sucesso',
      titulo: '🏆 MISSÃO CUMPRIDA! RESPOSTA EXATA: 608px',
      mensagem: 'Excelente raciocínio matemático! Você dominou o funcionamento do CSS Grid e auto-fit.',
      detalhes: [
        'Cards mínimos: 3 colunas × 12rem = 36rem (36 × 16px = 576px)',
        'Gaps intermediários: 2 espaçamentos × 1rem = 2rem (2 × 16px = 32px)',
        'Fórmula total: 576px + 32px = 608px exatos para renderizar 3 colunas!'
      ]
    }
  } else if (respostaLimpa === '576') {
    feedback.value = {
      tipo: 'quase',
      titulo: '🔥 Quase lá! Você esqueceu os gaps!',
      mensagem: 'Você calculou corretamente 3 cards de 12rem (3 × 192px = 576px), mas se esqueceu que entre 3 colunas existem 2 espaçamentos (gaps) de 1rem (16px cada = 32px). Some os 32px ao seu valor!'
    }
  } else if (respostaLimpa === '592') {
    feedback.value = {
      tipo: 'quase',
      titulo: '🔍 Falta apenas 1 gap!',
      mensagem: 'Você somou 3 cards (576px) com apenas 1 gap de 16px (592px). Para 3 colunas alinhadas, são necessários 2 gaps intermediários! Adicione mais 16px.'
    }
  } else if (respostaLimpa === '464') {
    feedback.value = {
      tipo: 'erro',
      titulo: '👀 Atenção ao Enunciado!',
      mensagem: '464px foi a resposta da Seção 3 (para 2 colunas de 14rem). Neste desafio, cada card possui 12rem e o objetivo é saber quando surgem 3 colunas simultâneas!'
    }
  } else {
    feedback.value = {
      tipo: 'erro',
      titulo: `❌ Valor incorreto: ${respostaUsuario.value}`,
      mensagem: `Dica de Vice City: Para 3 colunas no Grid, precisamos acomodar a largura mínima de 3 cards (12rem cada) MAIS o espaçamento entre eles (quantos gaps existem entre 3 itens enfileirados?). Lembre-se de que 1rem = 16px.`
    }
  }
}

const reiniciarDesafio = () => {
  respostaUsuario.value = ''
  feedback.value = null
}
</script>

<template>
  <div class="desafio-view">
    <div class="desafio-card">
      <!-- Badge de Missão Final -->
      <div class="mission-header">
        <div class="tag-row">
          <span class="badge badge-pink">Missão 06 • Final Mission</span>
          <span class="badge badge-cyan">Desafio Acadêmico</span>
        </div>
        <h1 class="desafio-title">Final Mission: O Grande Desafio do Guia</h1>
        <p class="desafio-subtitle">
          Esta questão especial foi elaborada com base direta nos conceitos, cálculos e laboratórios apresentados ao longo do Vice City Responsive Guide.
        </p>
      </div>

      <!-- Enunciado Detalhado do Desafio -->
      <div class="enunciado-card">
        <div class="enunciado-header">
          <span class="enunciado-icon">🎯</span>
          <h3 class="enunciado-title">Enunciado da Missão:</h3>
        </div>
        <div class="enunciado-body">
          <p>
            Na <strong>Seção 3 (Flexbox e Grid)</strong> e no <strong>LAB01</strong>, comprovamos matematicamente que um contêiner com
            <code>repeat(auto-fit, minmax(14rem, 1fr))</code> e <code>gap: 1rem</code> transiciona de 1 para 2 colunas aos <strong>464px</strong>.
          </p>
          <div class="mission-scenario">
            <h4>Agora imagine a seguinte especificação para uma nova galeria de veículos de Vice City:</h4>
            <ul>
              <li>Fórmula das colunas: <code>grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr))</code></li>
              <li>Espaçamento entre colunas: <code>gap: 1rem</code></li>
              <li>Convenção de acessibilidade: <code>1rem = 16px</code></li>
            </ul>
          </div>
          <div class="question-callout">
            <span class="callout-badge">Pergunta do Desafio:</span>
            <p>
              A partir de qual <strong>largura interna total do contêiner (em pixels)</strong> os cards deixarão de ficar em 2 colunas e passarão a exibir exatamente <strong>3 colunas</strong> na grade?
            </p>
          </div>
        </div>
      </div>

      <!-- Área de Interação e Digitação -->
      <div class="interacao-card">
        <label for="campo-resposta" class="label-resposta">
          Sua resposta em pixels (digite ex: <strong>600</strong> ou <strong>600px</strong>):
        </label>
        <div class="input-action-row">
          <div class="input-container">
            <input
              id="campo-resposta"
              v-model="respostaUsuario"
              type="text"
              placeholder="Digite o valor calculado..."
              class="input-desafio font-mono"
              autocomplete="off"
              @keyup.enter="verificarResposta"
            />
            <span class="input-suffix">px</span>
          </div>
          <button type="button" class="btn btn-validate" @click="verificarResposta">
            Validar Resposta
          </button>
          <button
            v-if="feedback"
            type="button"
            class="btn btn-secondary btn-retry"
            @click="reiniciarDesafio"
          >
            Limpar
          </button>
        </div>

        <!-- Feedback Interativo com Estilo Vice City -->
        <Transition name="fade">
          <div v-if="feedback" :class="['feedback-card', `feedback-${feedback.tipo}`]">
            <div class="feedback-header">
              <h4>{{ feedback.titulo }}</h4>
              <span v-if="tentativas > 0" class="attempts-counter">Tentativa #{{ tentativas }}</span>
            </div>
            <p class="feedback-message">{{ feedback.mensagem }}</p>

            <!-- Detalhes do Cálculo em Caso de Sucesso -->
            <div v-if="feedback.detalhes" class="feedback-breakdown">
              <h5>📐 Demonstração Matemática:</h5>
              <ol>
                <li v-for="(item, idx) in feedback.detalhes" :key="idx">{{ item }}</li>
              </ol>
              <div class="trophy-banner">
                <span>🌟 Você completou todos os módulos educacionais com sucesso!</span>
              </div>
            </div>
          </div>
        </Transition>
      </div>

      <!-- Dicas e Links de Consulta no Próprio Guia -->
      <footer class="dica-footer">
        <div class="dica-header">
          <span class="dica-icon">💡</span>
          <h4>Precisa de ajuda ou deseja revisar os conceitos?</h4>
        </div>
        <p class="dica-text">
          A resposta está fundamentada nas fórmulas demonstradas na Seção 3 e na experimentação do LAB01:
        </p>
        <div class="dica-links">
          <RouterLink to="/flexbox-grid" class="dica-pill">
            <span>📖 Revisar Seção 3 (Flexbox & Grid)</span>
          </RouterLink>
          <RouterLink to="/laboratorios" class="dica-pill">
            <span>🧪 Testar Larguras no LAB01</span>
          </RouterLink>
          <RouterLink to="/unidades-css" class="dica-pill">
            <span>📏 Revisar Conversão de rem para px</span>
          </RouterLink>
        </div>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.desafio-view {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.desafio-card {
  background: rgba(18, 12, 32, 0.82);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 79, 163, 0.35);
  border-radius: var(--radius-2xl);
  padding: var(--spacing-lg);
  box-shadow: 0 16px 45px rgba(0, 0, 0, 0.7), 0 0 25px rgba(255, 79, 163, 0.15);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
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
  background: linear-gradient(90deg, #ff4fa3 0%, #ff7a18 50%, #36d9e8 100%);
}

.mission-header {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: var(--spacing-lg);
}

.tag-row {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.desafio-title {
  font-family: var(--font-family-heading);
  font-size: var(--font-size-2xl);
  font-weight: 800;
  color: #ffffff;
  letter-spacing: -0.02em;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.6);
}

@media (min-width: 48rem) {
  .desafio-title {
    font-size: 2.25rem;
  }
}

.desafio-subtitle {
  font-size: var(--font-size-base);
  color: #e2d9f3;
  line-height: 1.6;
}

/* Enunciado do Desafio */
.enunciado-card {
  background: rgba(22, 16, 38, 0.75);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid rgba(168, 85, 247, 0.35);
  border-left: 4px solid var(--color-secondary);
  border-radius: var(--radius-xl);
  padding: var(--spacing-lg);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.45);
}

.enunciado-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.enunciado-icon {
  font-size: 1.4rem;
}

.enunciado-title {
  font-family: var(--font-family-heading);
  font-size: var(--font-size-lg);
  font-weight: 700;
  color: #ffffff;
}

.enunciado-body {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  line-height: 1.7;
}

.mission-scenario {
  background: rgba(10, 7, 20, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-lg);
  padding: var(--spacing-md);
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.mission-scenario h4 {
  font-family: var(--font-family-heading);
  font-size: var(--font-size-sm);
  font-weight: 700;
  color: var(--color-accent);
}

.mission-scenario ul {
  padding-left: var(--spacing-md);
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.question-callout {
  background: rgba(255, 79, 163, 0.12);
  border: 1px solid rgba(255, 79, 163, 0.4);
  border-left: 4px solid var(--color-primary);
  border-radius: var(--radius-lg);
  padding: var(--spacing-md);
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  box-shadow: 0 0 15px rgba(255, 79, 163, 0.15);
}

.callout-badge {
  font-family: var(--font-family-heading);
  font-size: var(--font-size-xs);
  font-weight: 800;
  text-transform: uppercase;
  color: var(--color-primary);
  letter-spacing: 0.05em;
}

.question-callout p {
  color: #ffffff;
  font-weight: 600;
  font-size: var(--font-size-base);
}

/* Painel de Interação */
.interacao-card {
  background: rgba(10, 7, 20, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-xl);
  padding: var(--spacing-xl);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.label-resposta {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  font-weight: 500;
}

.label-resposta strong {
  color: #ffffff;
}

.input-action-row {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  flex-wrap: wrap;
}

.input-container {
  display: flex;
  align-items: center;
  background: rgba(22, 16, 38, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: var(--radius-md);
  overflow: hidden;
  flex: 1;
  min-width: 14rem;
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
}

.input-container:focus-within {
  border-color: var(--color-primary);
  box-shadow: 0 0 16px rgba(255, 79, 163, 0.4);
}

.input-desafio {
  flex: 1;
  background: transparent;
  border: none;
  padding: 0.75rem var(--spacing-md);
  font-size: var(--font-size-lg);
  color: #ffffff;
  font-weight: 700;
  outline: none;
}

.input-suffix {
  padding: 0 var(--spacing-md);
  color: var(--color-accent);
  font-weight: 800;
  font-size: var(--font-size-sm);
}

.font-mono {
  font-family: var(--font-family-code);
}

.btn-validate {
  min-height: 2.75rem;
  background: var(--gradient-magenta-pink);
  box-shadow: 0 0 18px rgba(255, 79, 163, 0.45);
  border-radius: var(--radius-full);
  padding: 0.65rem 1.4rem;
  font-weight: 700;
}

.btn-validate:hover {
  box-shadow: 0 0 28px rgba(255, 79, 163, 0.65);
  transform: translateY(-2px);
}

.btn-retry {
  min-height: 2.75rem;
  border-radius: var(--radius-full);
}

/* Cartões de Feedback */
.feedback-card {
  border-radius: var(--radius-xl);
  padding: var(--spacing-lg);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  animation: slideIn 0.25s ease-out;
  backdrop-filter: blur(14px);
}

@keyframes slideIn {
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
}

.feedback-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-sm);
}

.feedback-header h4 {
  font-family: var(--font-family-heading);
  font-weight: 800;
}

.attempts-counter {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  font-family: var(--font-family-code);
  font-weight: 700;
}

.feedback-message {
  font-size: var(--font-size-base);
  line-height: 1.65;
}

.feedback-sucesso {
  background: rgba(16, 185, 129, 0.15);
  border: 1px solid rgba(16, 185, 129, 0.45);
  box-shadow: 0 0 20px rgba(16, 185, 129, 0.2);
  color: #34d399;
}

.feedback-sucesso h4 {
  color: #34d399;
  font-size: var(--font-size-lg);
}

.feedback-sucesso .feedback-message {
  color: #ffffff;
}

.feedback-quase {
  background: rgba(245, 158, 11, 0.15);
  border: 1px solid rgba(245, 158, 11, 0.45);
  box-shadow: 0 0 20px rgba(245, 158, 11, 0.2);
  color: #fbbf24;
}

.feedback-quase h4 {
  color: #fbbf24;
}

.feedback-quase .feedback-message {
  color: #ffffff;
}

.feedback-erro {
  background: rgba(239, 68, 68, 0.15);
  border: 1px solid rgba(239, 68, 68, 0.45);
  box-shadow: 0 0 20px rgba(239, 68, 68, 0.2);
  color: #f87171;
}

.feedback-erro h4 {
  color: #f87171;
}

.feedback-erro .feedback-message {
  color: var(--color-text-secondary);
}

.feedback-aviso {
  background: rgba(168, 85, 247, 0.15);
  border: 1px solid rgba(168, 85, 247, 0.45);
  box-shadow: 0 0 20px rgba(168, 85, 247, 0.2);
  color: var(--color-secondary);
}

.feedback-breakdown {
  background: rgba(10, 7, 20, 0.85);
  border: 1px solid rgba(16, 185, 129, 0.35);
  border-radius: var(--radius-lg);
  padding: var(--spacing-md);
  margin-top: var(--spacing-xs);
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.feedback-breakdown h5 {
  font-family: var(--font-family-heading);
  color: var(--color-accent);
  font-size: var(--font-size-sm);
  font-weight: 700;
}

.feedback-breakdown ol {
  padding-left: var(--spacing-lg);
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  font-size: var(--font-size-sm);
  color: #ffffff;
}

.trophy-banner {
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  border-top: 1px dashed rgba(16, 185, 129, 0.3);
  font-size: var(--font-size-xs);
  color: var(--color-accent);
  font-weight: 700;
}

/* Dicas e Navegação */
.dica-footer {
  border-top: 1px dashed rgba(255, 255, 255, 0.15);
  padding-top: var(--spacing-lg);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.dica-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.dica-header h4 {
  font-family: var(--font-family-heading);
  font-size: var(--font-size-base);
  color: #ffffff;
}

.dica-text {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}

.dica-links {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  flex-wrap: wrap;
  margin-top: 0.25rem;
}

.dica-pill {
  background: rgba(28, 20, 48, 0.75);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: var(--color-text-secondary);
  font-size: var(--font-size-xs);
  font-weight: 600;
  padding: 0.45rem 0.95rem;
  border-radius: var(--radius-full);
  text-decoration: none;
  transition: all var(--transition-fast);
}

.dica-pill:hover {
  border-color: var(--color-secondary);
  color: #ffffff;
  box-shadow: 0 0 12px rgba(168, 85, 247, 0.35);
  transform: translateY(-2px);
  text-decoration: none;
}
</style>
