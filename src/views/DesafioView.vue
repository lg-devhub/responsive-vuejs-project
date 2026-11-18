<script setup>
import { ref } from 'vue'

// Estado do desafio interativo
const respostaUsuario = ref('')
const feedback = ref(null)

const verificarResposta = () => {
  const respostaLimpa = respostaUsuario.value.trim().replace('px', '').trim()
  if (respostaLimpa === '608') {
    feedback.value = {
      sucesso: true,
      mensagem: '🎉 Parabéns! Resposta exata: 608px! (3 cards de 12rem [576px] + 2 gaps de 1rem [32px] = 608px).'
    }
  } else if (!respostaLimpa) {
    feedback.value = {
      sucesso: false,
      mensagem: 'Por favor, digite um valor numérico para testar.'
    }
  } else {
    feedback.value = {
      sucesso: false,
      mensagem: `A resposta "${respostaUsuario.value}" ainda não está certa. Dica: Lembre-se que para 3 colunas precisamos de 3 cards de 12rem e 2 gaps de 1rem entre eles!`
    }
  }
}
</script>

<template>
  <div class="desafio-view">
    <div class="desafio-card">
      <div class="badge-desafio">Etapa Final do Trabalho</div>
      <h1 class="desafio-title">O Grande Desafio do Guia</h1>
      <p class="desafio-subtitle">
        Uma pergunta especial elaborada pela dupla que só pode ser respondida utilizando os conceitos e cálculos demonstrados neste guia!
      </p>

      <div class="enunciado-box">
        <h3>🎯 Enunciado do Desafio:</h3>
        <p>
          Na Seção 3 deste guia, calculamos que um contêiner com <code>repeat(auto-fit, minmax(14rem, 1fr))</code> e <code>gap: 1rem</code> passa de 1 para 2 colunas a 464px.
        </p>
        <p style="margin-top: 0.75rem;">
          Agora imagine um novo layout onde cada card tem <strong>minmax(12rem, 1fr)</strong> e o espaçamento (gap) continua sendo <strong>1rem</strong> (adotando a convenção de <code>1rem = 16px</code>).
        </p>
        <p style="margin-top: 0.75rem; font-weight: 600; color: var(--color-primary-dark);">
          Pergunta: A partir de qual largura total do contêiner (em px) os cards deixarão de ficar em 2 colunas e passarão a exibir exatamente 3 colunas?
        </p>
      </div>

      <div class="interacao-box">
        <label for="campo-resposta" class="label-resposta">Sua resposta em pixels (ex: 500 ou 500px):</label>
        <div class="input-group">
          <input
            id="campo-resposta"
            v-model="respostaUsuario"
            type="text"
            placeholder="Digite o valor calculado..."
            class="input-desafio"
            @keyup.enter="verificarResposta"
          />
          <button class="btn" @click="verificarResposta">Validar Resposta</button>
        </div>

        <div v-if="feedback" :class="['feedback-box', feedback.sucesso ? 'feedback-ok' : 'feedback-erro']">
          <p>{{ feedback.mensagem }}</p>
        </div>
      </div>

      <div class="dica-box">
        <h4>💡 Precisa de ajuda com a conta?</h4>
        <p>Volte à <strong>Seção 3 (Flexbox e Grid)</strong> para ver a fórmula exata da soma dos cards mínimos com os respectivos espaçamentos entre colunas.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.desafio-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-sm);
}

.badge-desafio {
  display: inline-block;
  background-color: #fef3c7;
  color: #92400e;
  font-size: var(--font-size-xs);
  font-weight: 700;
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-sm);
  margin-bottom: var(--spacing-sm);
  text-transform: uppercase;
}

.desafio-title {
  font-size: var(--font-size-3xl);
  margin-bottom: var(--spacing-xs);
}

.desafio-subtitle {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-lg);
}

.enunciado-box {
  background-color: #f8fafc;
  border: 1px solid var(--color-border);
  border-left: 4px solid var(--color-primary);
  border-radius: var(--radius-md);
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
}

.enunciado-box h3 {
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-sm);
}

.interacao-box {
  background-color: #ffffff;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
}

.label-resposta {
  display: block;
  font-weight: 600;
  font-size: var(--font-size-sm);
  margin-bottom: var(--spacing-xs);
  color: var(--color-text-primary);
}

.input-group {
  display: flex;
  gap: var(--spacing-sm);
}

.input-desafio {
  flex: 1;
  font-family: var(--font-family-body);
  font-size: var(--font-size-base);
  padding: var(--spacing-sm) var(--spacing-md);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  outline: none;
}

.input-desafio:focus {
  border-color: var(--color-primary);
}

.feedback-box {
  margin-top: var(--spacing-md);
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
}

.feedback-ok {
  background-color: #dcfce7;
  color: #166534;
  border: 1px solid #86efac;
}

.feedback-erro {
  background-color: #fee2e2;
  color: #991b1b;
  border: 1px solid #fca5a5;
}

.dica-box {
  border-top: 1px dashed var(--color-border);
  padding-top: var(--spacing-md);
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}
</style>
