<script setup>
import { ref, onMounted } from 'vue'
import { fetchViceCityWeather } from '../../services/api'

const weatherData = ref(null)
const isLoading = ref(true)
const errorMessage = ref(null)

const loadWeather = async () => {
  isLoading.value = true
  errorMessage.value = null

  const result = await fetchViceCityWeather()

  if (result.success) {
    weatherData.value = result.data
  } else {
    errorMessage.value = result.error
  }

  isLoading.value = false
}

onMounted(() => {
  loadWeather()
})
</script>

<template>
  <section class="weather-widget" aria-label="Boletim Meteorológico ao Vivo de Vice City">
    <!-- Cabeçalho do Card -->
    <div class="widget-header">
      <div class="header-tag-group">
        <span class="badge badge-pink">RF10 • API Dinâmica</span>
        <span class="live-tag">
          <span class="pulse-dot"></span>
          <span>Ao Vivo</span>
        </span>
      </div>
      <div class="header-main">
        <div>
          <h3 class="widget-title">Boletim Meteorológico de Vice City</h3>
          <p class="widget-sub">Dados meteorológicos em tempo real consumidos da Open-Meteo API (Miami, FL).</p>
        </div>
        <button
          type="button"
          class="btn-refresh"
          :disabled="isLoading"
          @click="loadWeather"
          title="Recarregar dados meteorológicos"
        >
          <span :class="{ 'spin-animation': isLoading }">↻</span>
          <span>{{ isLoading ? 'Atualizando...' : 'Atualizar' }}</span>
        </button>
      </div>
    </div>

    <!-- Estado 1: Carregamento (Skeleton Loading) -->
    <div v-if="isLoading" class="state-loading" aria-live="polite">
      <div class="skeleton-main">
        <div class="skeleton-icon pulse-effect"></div>
        <div class="skeleton-text-group">
          <div class="skeleton-line skeleton-title pulse-effect"></div>
          <div class="skeleton-line skeleton-sub pulse-effect"></div>
        </div>
      </div>
      <div class="skeleton-grid">
        <div class="skeleton-card pulse-effect"></div>
        <div class="skeleton-card pulse-effect"></div>
        <div class="skeleton-card pulse-effect"></div>
      </div>
    </div>

    <!-- Estado 2: Falha / Erro com Botão de Retry -->
    <div v-else-if="errorMessage" class="state-error" role="alert">
      <div class="error-icon">⚠️</div>
      <div class="error-body">
        <h4>Falha ao carregar boletim de Vice City</h4>
        <p class="error-msg">{{ errorMessage }}</p>
        <p class="error-tip">Verifique sua conexão com a internet ou tente novamente em alguns instantes.</p>
      </div>
      <button type="button" class="btn btn-secondary btn-retry" @click="loadWeather">
        Tentar Novamente
      </button>
    </div>

    <!-- Estado 3: Sucesso com Dados Dinâmicos em Grid Responsivo -->
    <div v-else-if="weatherData" class="state-success">
      <!-- Destaque Principal de Temperatura e Condição -->
      <div class="weather-hero">
        <div class="weather-condition-group">
          <span class="condition-emoji" :aria-label="weatherData.conditionText">
            {{ weatherData.icon }}
          </span>
          <div class="condition-details">
            <h4 class="condition-name">{{ weatherData.conditionText }}</h4>
            <span class="day-status-badge" :class="{ 'is-night': !weatherData.isDay }">
              {{ weatherData.timeStatus }}
            </span>
          </div>
        </div>

        <div class="temperature-group">
          <div class="temp-main">
            <span class="temp-val">{{ weatherData.temperature }}</span>
            <span class="temp-unit">°C</span>
          </div>
          <span class="temp-apparent">Sensação Térmica: {{ weatherData.apparentTemperature }}°C</span>
        </div>
      </div>

      <!-- Grade de Métricas Complementares (Grid Responsivo) -->
      <div class="metrics-grid">
        <div class="metric-card">
          <span class="metric-icon">💧</span>
          <div class="metric-info">
            <span class="metric-label">Umidade Relativa</span>
            <span class="metric-value font-mono">{{ weatherData.humidity }}%</span>
          </div>
        </div>

        <div class="metric-card">
          <span class="metric-icon">💨</span>
          <div class="metric-info">
            <span class="metric-label">Vento em Vice City</span>
            <span class="metric-value font-mono">{{ weatherData.windSpeed }} km/h</span>
          </div>
        </div>

        <div class="metric-card">
          <span class="metric-icon">📍</span>
          <div class="metric-info">
            <span class="metric-label">Estação Oficial</span>
            <span class="metric-value font-mono">Miami (25.76°N)</span>
          </div>
        </div>
      </div>

      <!-- Rodapé do Card com Horário e Conexão Pedagógica -->
      <div class="weather-footer">
        <span class="timestamp-text">
          Última medição registrada: <strong>{{ weatherData.recordedAt }}</strong>
        </span>
        <span class="education-note">
          Demonstração de <strong>fetch assíncrono</strong> e <strong>Grid responsivo</strong> em Vue 3.
        </span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.weather-widget {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-lg), 0 0 20px rgba(0, 0, 0, 0.4);
  position: relative;
  overflow: hidden;
}

@media (min-width: 48rem) {
  .weather-widget {
    padding: var(--spacing-xl);
  }
}

.weather-widget::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--gradient-sunset);
}

.widget-header {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  margin-bottom: var(--spacing-lg);
  border-bottom: 1px solid var(--color-border);
  padding-bottom: var(--spacing-md);
}

.header-tag-group {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.live-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  background: rgba(16, 185, 129, 0.15);
  border: 1px solid rgba(16, 185, 129, 0.3);
  color: #10b981;
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  padding: 0.15rem 0.5rem;
  border-radius: var(--radius-full);
}

.pulse-dot {
  width: 0.4rem;
  height: 0.4rem;
  background-color: #10b981;
  border-radius: 50%;
  box-shadow: 0 0 6px #10b981;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(0.85); }
}

.header-main {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--spacing-md);
  flex-wrap: wrap;
}

.widget-title {
  font-size: var(--font-size-lg);
  color: var(--color-text-primary);
  margin-bottom: 0.2rem;
}

.widget-sub {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}

.btn-refresh {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  background: var(--color-surface-light);
  border: 1px solid var(--color-border);
  color: var(--color-accent);
  font-size: var(--font-size-xs);
  font-weight: 600;
  padding: 0.35rem 0.75rem;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.btn-refresh:hover:not(:disabled) {
  border-color: var(--color-accent);
  box-shadow: 0 0 10px rgba(54, 217, 232, 0.3);
}

.btn-refresh:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.spin-animation {
  display: inline-block;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  100% { transform: rotate(360deg); }
}

/* Estado de Loading (Skeleton) */
.state-loading {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.pulse-effect {
  background: linear-gradient(90deg, var(--color-surface-light) 25%, var(--color-surface) 50%, var(--color-surface-light) 75%);
  background-size: 200% 100%;
  animation: skeletonPulse 1.5s infinite;
}

@keyframes skeletonPulse {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.skeleton-main {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.skeleton-icon {
  width: 4rem;
  height: 4rem;
  border-radius: var(--radius-md);
}

.skeleton-text-group {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.skeleton-line {
  height: 1.25rem;
  border-radius: var(--radius-sm);
}

.skeleton-title { width: 60%; }
.skeleton-sub { width: 40%; height: 0.9rem; }

.skeleton-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
  gap: var(--spacing-sm);
}

.skeleton-card {
  height: 4.5rem;
  border-radius: var(--radius-md);
}

/* Estado de Erro */
.state-error {
  background: rgba(239, 68, 68, 0.08);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: var(--radius-lg);
  padding: var(--spacing-md);
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  flex-wrap: wrap;
}

.error-icon {
  font-size: 2rem;
}

.error-body {
  flex: 1;
  min-width: 14rem;
}

.error-body h4 {
  font-size: var(--font-size-base);
  color: var(--color-danger);
  margin-bottom: 0.25rem;
}

.error-msg {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  font-family: var(--font-family-code);
  margin-bottom: 0.25rem;
}

.error-tip {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}

.btn-retry {
  align-self: center;
}

/* Estado de Sucesso */
.state-success {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.weather-hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--color-surface-light);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--spacing-md);
  flex-wrap: wrap;
  gap: var(--spacing-md);
}

.weather-condition-group {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.condition-emoji {
  font-size: 3rem;
  line-height: 1;
}

.condition-details {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.condition-name {
  font-size: var(--font-size-lg);
  color: var(--color-text-primary);
}

.day-status-badge {
  display: inline-flex;
  align-self: flex-start;
  font-size: var(--font-size-xs);
  font-weight: 700;
  color: var(--color-accent);
  background: rgba(54, 217, 232, 0.12);
  border: 1px solid rgba(54, 217, 232, 0.3);
  padding: 0.15rem 0.5rem;
  border-radius: var(--radius-full);
}

.day-status-badge.is-night {
  color: var(--color-secondary);
  background: rgba(168, 85, 247, 0.15);
  border-color: rgba(168, 85, 247, 0.35);
}

.temperature-group {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.temp-main {
  display: flex;
  align-items: flex-start;
  line-height: 1;
}

.temp-val {
  font-size: var(--font-size-4xl);
  font-family: var(--font-family-heading);
  font-weight: 900;
  background: var(--gradient-sunset);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.temp-unit {
  font-size: var(--font-size-xl);
  color: var(--color-primary);
  font-weight: 700;
  margin-top: 0.25rem;
}

.temp-apparent {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}

/* Grade de Métricas */
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  gap: var(--spacing-sm);
}

.metric-card {
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--spacing-sm) var(--spacing-md);
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.metric-icon {
  font-size: 1.5rem;
}

.metric-info {
  display: flex;
  flex-direction: column;
}

.metric-label {
  font-size: 0.7rem;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.metric-value {
  font-size: var(--font-size-base);
  font-weight: 700;
  color: var(--color-text-primary);
}

.font-mono {
  font-family: var(--font-family-code);
}

/* Rodapé do Widget */
.weather-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-sm);
  flex-wrap: wrap;
  border-top: 1px dashed var(--color-border);
  padding-top: var(--spacing-sm);
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}

.education-note {
  color: var(--color-text-secondary);
}
</style>
