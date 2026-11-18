<script setup>
import { ref, onMounted } from 'vue'
import { fetchViceCityWeather } from '../../services/api'

const weatherData = ref(null)
const isLoading = ref(true)
const isError = ref(false)
const errorMessage = ref('')
const lastUpdatedTime = ref('')

const carregarDadosMeteorologicos = async () => {
  isLoading.value = true
  isError.value = false
  errorMessage.value = ''

  try {
    const result = await fetchViceCityWeather()
    if (result.success) {
      weatherData.value = result
      lastUpdatedTime.value = result.fetchedAt
    } else {
      isError.value = true
      errorMessage.value = result.error
    }
  } catch (err) {
    isError.value = true
    errorMessage.value = 'Falha inesperada ao tentar comunicar com a API meteorológica.'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  carregarDadosMeteorologicos()
})
</script>

<template>
  <section class="conditions-panel" aria-labelledby="weather-title">
    <!-- Cabeçalho do Painel Dinâmico -->
    <div class="panel-header">
      <div class="header-tag-group">
        <span class="live-pulse-badge">
          <span class="pulse-indicator"></span>
          AO VIVO • DADOS REAIS VIA SATÉLITE
        </span>
        <span class="api-tag">Open-Meteo Weather API (RF10)</span>
      </div>

      <div class="header-main-row">
        <div>
          <h2 id="weather-title" class="panel-title">
            Boletim Meteorológico de Vice City
          </h2>
          <p class="panel-subtitle">
            Coordenadas Oficiais: <code>25.7617° N, 80.1918° W</code> (Miami, FL — inspiração de Vice City).
            Consumo assíncrono real demonstrando reatividade, tratamento de estados e renderização fluida.
          </p>
        </div>

        <button
          type="button"
          class="btn-refresh"
          :disabled="isLoading"
          title="Buscar medição mais recente"
          @click="carregarDadosMeteorologicos"
        >
          <span class="refresh-icon" :class="{ spinning: isLoading }">↺</span>
          <span class="refresh-text">{{ isLoading ? 'Sincronizando...' : 'Atualizar Dados' }}</span>
        </button>
      </div>
    </div>

    <!-- Estado 1: CARREGANDO (Skeleton / Pulso Neon) -->
    <div v-if="isLoading" class="state-loading" role="status" aria-label="Buscando boletim meteorológico...">
      <div class="skeleton-header">
        <div class="skeleton-pill"></div>
        <div class="skeleton-pill short"></div>
      </div>
      <div class="skeleton-grid">
        <div v-for="n in 4" :key="n" class="skeleton-card">
          <div class="skeleton-line short"></div>
          <div class="skeleton-number"></div>
          <div class="skeleton-line"></div>
        </div>
      </div>
      <p class="loading-caption">
        📡 Conectando aos sensores meteorológicos de Vice City via HTTPS...
      </p>
    </div>

    <!-- Estado 2: ERRO OU FALHA NA REQUISIÇÃO -->
    <div v-else-if="isError" class="state-error" role="alert">
      <div class="error-icon">⚠️</div>
      <div class="error-content">
        <h3 class="error-title">Interrupção no Sinal Meteorológico</h3>
        <p class="error-desc">{{ errorMessage }}</p>
        <p class="error-hint">
          Verifique sua conexão de rede ou tente novamente em instantes. A aplicação continua operando normalmente.
        </p>
        <button
          type="button"
          class="btn-retry"
          @click="carregarDadosMeteorologicos"
        >
          Tentar Reconectar Agora
        </button>
      </div>
    </div>

    <!-- Estado 3: SUCESSO (Dados Reais Renderizados em Grid Responsivo) -->
    <div v-else-if="weatherData" class="state-success">
      <!-- Banner de Destaque da Cidade e Condição Atual -->
      <div class="weather-hero-banner">
        <div class="hero-left">
          <span class="weather-giant-icon">{{ weatherData.weatherIcon }}</span>
          <div>
            <div class="condition-badge-row">
              <span class="condition-badge">{{ weatherData.weatherDescription }}</span>
              <span class="period-badge">{{ weatherData.periodLabel }}</span>
            </div>
            <div class="temp-big-row">
              <span class="temp-number">{{ weatherData.temperature }}</span>
              <span class="temp-unit">{{ weatherData.temperatureUnit }}</span>
            </div>
            <p class="weather-vibe">"{{ weatherData.weatherVibe }}"</p>
          </div>
        </div>

        <div class="hero-right">
          <div class="meta-item">
            <span class="meta-label">Localização:</span>
            <span class="meta-val">{{ weatherData.city }}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">Coordenadas:</span>
            <span class="meta-val font-mono">{{ weatherData.coordinates }}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">Última Coleta:</span>
            <span class="meta-val font-mono highlight-time">{{ weatherData.fetchedAt }}</span>
          </div>
        </div>
      </div>

      <!-- Grid Responsivo de Métricas Detalhadas (repeat(auto-fit, minmax(11rem, 1fr))) -->
      <div class="metrics-grid">
        <article class="metric-card">
          <div class="card-top">
            <span class="metric-icon">🌡️</span>
            <span class="metric-name">Sensação Térmica</span>
          </div>
          <div class="metric-val-group">
            <span class="metric-big-number">{{ weatherData.apparentTemperature }}</span>
            <span class="metric-unit-text">{{ weatherData.temperatureUnit }}</span>
          </div>
          <p class="metric-sub">Calculada considerando umidade e vento litorâneo.</p>
        </article>

        <article class="metric-card">
          <div class="card-top">
            <span class="metric-icon">💧</span>
            <span class="metric-name">Umidade Relativa</span>
          </div>
          <div class="metric-val-group">
            <span class="metric-big-number text-cyan">{{ weatherData.humidity }}</span>
            <span class="metric-unit-text">{{ weatherData.humidityUnit }}</span>
          </div>
          <p class="metric-sub">Ar tropical úmido característico de Vice Beach.</p>
        </article>

        <article class="metric-card">
          <div class="card-top">
            <span class="metric-icon">💨</span>
            <span class="metric-name">Velocidade do Vento</span>
          </div>
          <div class="metric-val-group">
            <span class="metric-big-number text-pink">{{ weatherData.windSpeed }}</span>
            <span class="metric-unit-text">{{ weatherData.windSpeedUnit }}</span>
          </div>
          <p class="metric-sub">Rajadas na costa leste de Starfish Island.</p>
        </article>

        <article class="metric-card">
          <div class="card-top">
            <span class="metric-icon">📡</span>
            <span class="metric-name">Status do Satélite</span>
          </div>
          <div class="metric-val-group">
            <span class="metric-status-ok">100% ONLINE</span>
          </div>
          <p class="metric-sub">WMO Code: {{ weatherData.weatherCode }} • Conexão estável.</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.conditions-panel {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
  box-shadow: var(--shadow-md);
  position: relative;
  overflow: hidden;
}

@media (min-width: 48rem) {
  .conditions-panel {
    padding: var(--spacing-xl);
  }
}

/* Linha superior com gradiente Vice City */
.conditions-panel::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--gradient-sunset);
}

.panel-header {
  margin-bottom: var(--spacing-lg);
}

.header-tag-group {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
  align-items: center;
  margin-bottom: var(--spacing-xs);
}

.live-pulse-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: rgba(16, 185, 129, 0.15);
  color: #34d399;
  border: 1px solid rgba(16, 185, 129, 0.4);
  font-size: var(--font-size-xs);
  font-weight: 700;
  padding: 0.2rem 0.6rem;
  border-radius: var(--radius-full);
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.pulse-indicator {
  width: 0.5rem;
  height: 0.5rem;
  background-color: #34d399;
  border-radius: 50%;
  animation: pulse-ring 1.5s infinite;
}

@keyframes pulse-ring {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.3); opacity: 0.4; }
  100% { transform: scale(1); opacity: 1; }
}

.api-tag {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  background: rgba(255, 255, 255, 0.05);
  padding: 0.2rem 0.5rem;
  border-radius: var(--radius-full);
}

.header-main-row {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  margin-top: var(--spacing-xs);
}

@media (min-width: 48rem) {
  .header-main-row {
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
  }
}

.panel-title {
  font-size: var(--font-size-xl);
  color: var(--color-text-primary);
  margin-bottom: 0.25rem;
}

@media (min-width: 48rem) {
  .panel-title {
    font-size: var(--font-size-2xl);
  }
}

.panel-subtitle {
  color: var(--color-text-secondary);
  font-size: var(--font-size-xs);
  line-height: 1.5;
  max-width: 44rem;
}

.panel-subtitle code {
  color: var(--color-accent);
}

.btn-refresh {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--color-surface-light);
  border: 1px solid var(--color-border);
  color: var(--color-text-primary);
  padding: 0.5rem 0.9rem;
  border-radius: var(--radius-md);
  cursor: pointer;
  font-size: var(--font-size-xs);
  font-weight: 600;
  transition: all var(--transition-fast);
  align-self: flex-start;
  white-space: nowrap;
}

.btn-refresh:hover:not(:disabled) {
  border-color: var(--color-accent);
  color: var(--color-accent);
  box-shadow: 0 0 10px rgba(54, 217, 232, 0.3);
}

.btn-refresh:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.refresh-icon {
  font-size: 1rem;
  display: inline-block;
}

.refresh-icon.spinning {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Estado de Carregamento (Skeleton) */
.state-loading {
  background: rgba(12, 9, 21, 0.7);
  border: 1px dashed var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--spacing-lg);
}

.skeleton-header {
  display: flex;
  gap: 1rem;
  margin-bottom: var(--spacing-md);
}

.skeleton-pill {
  width: 10rem;
  height: 1.5rem;
  background: linear-gradient(90deg, #2a2042 25%, #3d2f5f 50%, #2a2042 75%);
  background-size: 200% 100%;
  border-radius: var(--radius-full);
  animation: shimmer 1.5s infinite;
}

.skeleton-pill.short {
  width: 6rem;
}

.skeleton-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(11rem, 1fr));
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-md);
}

.skeleton-card {
  background: var(--color-surface-light);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.skeleton-line {
  height: 0.8rem;
  background: #2a2042;
  border-radius: var(--radius-sm);
  animation: shimmer 1.5s infinite;
}

.skeleton-line.short {
  width: 50%;
}

.skeleton-number {
  height: 2.5rem;
  width: 70%;
  background: #2a2042;
  border-radius: var(--radius-sm);
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.loading-caption {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
  text-align: center;
}

/* Estado de Erro */
.state-error {
  display: flex;
  gap: var(--spacing-md);
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.4);
  border-radius: var(--radius-md);
  padding: var(--spacing-lg);
  align-items: flex-start;
}

.error-icon {
  font-size: 2rem;
}

.error-title {
  color: #fca5a5;
  font-size: var(--font-size-base);
  margin-bottom: 0.25rem;
}

.error-desc {
  font-size: var(--font-size-xs);
  color: var(--color-text-primary);
  margin-bottom: 0.5rem;
}

.error-hint {
  font-size: 0.75rem;
  color: var(--color-text-muted);
  margin-bottom: var(--spacing-sm);
}

.btn-retry {
  background: var(--color-primary);
  color: #ffffff;
  border: none;
  font-weight: 700;
  font-size: var(--font-size-xs);
  padding: 0.4rem 0.9rem;
  border-radius: var(--radius-sm);
  cursor: pointer;
  box-shadow: 0 0 10px rgba(255, 79, 163, 0.4);
  transition: transform var(--transition-fast);
}

.btn-retry:hover {
  transform: translateY(-1px);
}

/* Estado de Sucesso */
.state-success {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.weather-hero-banner {
  background: linear-gradient(135deg, rgba(42, 32, 66, 0.8) 0%, rgba(28, 21, 48, 0.95) 100%);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

@media (min-width: 48rem) {
  .weather-hero-banner {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: var(--spacing-lg);
  }
}

.hero-left {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.weather-giant-icon {
  font-size: 3.5rem;
  line-height: 1;
}

.condition-badge-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 0.2rem;
}

.condition-badge {
  background: rgba(255, 79, 163, 0.2);
  color: #ff70b5;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.15rem 0.5rem;
  border-radius: var(--radius-sm);
}

.period-badge {
  background: rgba(54, 217, 232, 0.15);
  color: var(--color-accent);
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.15rem 0.5rem;
  border-radius: var(--radius-sm);
}

.temp-big-row {
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
}

.temp-number {
  font-size: var(--font-size-hero);
  font-weight: 800;
  font-family: var(--font-family-code);
  color: #ffffff;
  line-height: 1;
}

.temp-unit {
  font-size: var(--font-size-xl);
  color: var(--color-text-muted);
  font-weight: 700;
}

.weather-vibe {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  font-style: italic;
  margin-top: 0.2rem;
}

.hero-right {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  border-top: 1px dashed var(--color-border);
  padding-top: var(--spacing-sm);
}

@media (min-width: 48rem) {
  .hero-right {
    border-top: none;
    border-left: 1px dashed var(--color-border);
    padding-top: 0;
    padding-left: var(--spacing-lg);
  }
}

.meta-item {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  font-size: var(--font-size-xs);
}

.meta-label {
  color: var(--color-text-muted);
}

.meta-val {
  color: var(--color-text-primary);
  font-weight: 600;
}

.highlight-time {
  color: var(--color-accent);
}

.font-mono {
  font-family: var(--font-family-code);
}

/* Grid de Métricas */
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(11rem, 1fr));
  gap: var(--spacing-md);
}

.metric-card {
  background: var(--color-surface-muted);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  transition: transform var(--transition-fast), border-color var(--transition-fast);
}

.metric-card:hover {
  transform: translateY(-2px);
  border-color: var(--color-secondary);
}

.card-top {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.metric-icon {
  font-size: 1.1rem;
}

.metric-name {
  font-size: 0.75rem;
  color: var(--color-text-muted);
  font-weight: 600;
}

.metric-val-group {
  display: flex;
  align-items: baseline;
  gap: 0.3rem;
  margin: 0.2rem 0;
}

.metric-big-number {
  font-size: var(--font-size-2xl);
  font-weight: 800;
  font-family: var(--font-family-code);
  color: var(--color-text-primary);
  line-height: 1;
}

.metric-big-number.text-cyan {
  color: var(--color-accent);
}

.metric-big-number.text-pink {
  color: var(--color-primary);
}

.metric-unit-text {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  font-weight: 600;
}

.metric-status-ok {
  color: #34d399;
  font-weight: 700;
  font-size: var(--font-size-sm);
  letter-spacing: 0.05em;
}

.metric-sub {
  font-size: 0.7rem;
  color: var(--color-text-secondary);
  line-height: 1.4;
}
</style>
