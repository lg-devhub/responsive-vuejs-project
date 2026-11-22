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
      <div class="header-left">
        <div class="header-tag-group">
          <span class="badge badge-pink">RF10 • API Dinâmica</span>
          <span class="live-tag">
            <span class="pulse-dot"></span>
            <span>Ao Vivo</span>
          </span>
        </div>
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
        <span class="refresh-icon" :class="{ 'spin-animation': isLoading }">↻</span>
        <span>{{ isLoading ? 'Atualizando...' : 'Atualizar' }}</span>
      </button>
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
      <div class="weather-hero-row">
        <div class="condition-group">
          <span class="condition-emoji" :aria-label="weatherData.conditionText">
            {{ weatherData.icon }}
          </span>
          <div class="condition-info">
            <h4 class="condition-name">{{ weatherData.conditionText }}</h4>
            <span class="day-status-pill" :class="{ 'is-night': !weatherData.isDay }">
              {{ weatherData.timeStatus }}
            </span>
          </div>
        </div>

        <div class="temperature-group">
          <div class="temp-display">
            <span class="temp-val">{{ weatherData.temperature }}</span>
            <span class="temp-unit">°C</span>
          </div>
          <span class="temp-apparent">Sensação Térmica: {{ weatherData.apparentTemperature }}°C</span>
        </div>
      </div>

      <!-- Grade de Métricas Complementares em Inset Strip -->
      <div class="metrics-strip">
        <div class="metric-item">
          <span class="metric-icon">💧</span>
          <div class="metric-details">
            <span class="metric-label">Umidade Relativa</span>
            <span class="metric-value">{{ weatherData.humidity }}%</span>
          </div>
        </div>

        <div class="metric-item">
          <span class="metric-icon">💨</span>
          <div class="metric-details">
            <span class="metric-label">Vento em Vice City</span>
            <span class="metric-value">{{ weatherData.windSpeed }} km/h</span>
          </div>
        </div>

        <div class="metric-item">
          <span class="metric-icon">📍</span>
          <div class="metric-details">
            <span class="metric-label">Estação Oficial</span>
            <span class="metric-value">Miami (25.76°N)</span>
          </div>
        </div>
      </div>

      <!-- Rodapé do Card com Horário e Conexão Pedagógica -->
      <div class="weather-footer">
        <span class="timestamp-text">
          <span class="dot-pink">●</span> Última medição registrada: <strong>{{ weatherData.recordedAt }}</strong>
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
  background: rgba(18, 12, 32, 0.78);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 79, 163, 0.35);
  border-radius: var(--radius-2xl);
  padding: var(--spacing-lg) var(--spacing-xl);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.65), 0 0 25px rgba(255, 79, 163, 0.15);
  position: relative;
  overflow: hidden;
  transition: border-color var(--transition-normal), box-shadow var(--transition-normal);
}

.weather-widget:hover {
  border-color: rgba(54, 217, 232, 0.5);
  box-shadow: 0 16px 45px rgba(0, 0, 0, 0.7), 0 0 30px rgba(54, 217, 232, 0.2);
}

/* Brilho superior temático */
.weather-widget::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, #ff4fa3 0%, #a855f7 50%, #36d9e8 100%);
}

.widget-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-md);
  flex-wrap: wrap;
}

.header-left {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.header-tag-group {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  flex-wrap: wrap;
}

.live-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  background: rgba(16, 185, 129, 0.15);
  border: 1px solid rgba(16, 185, 129, 0.4);
  color: #34d399;
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  padding: 0.15rem 0.55rem;
  border-radius: var(--radius-full);
  letter-spacing: 0.05em;
}

.pulse-dot {
  width: 0.4rem;
  height: 0.4rem;
  background-color: #10b981;
  border-radius: 50%;
  box-shadow: 0 0 8px #10b981;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.35; transform: scale(0.8); }
}

.widget-title {
  font-family: var(--font-family-heading);
  font-size: 1.15rem;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: -0.01em;
}

.widget-sub {
  font-size: 0.8rem;
  color: var(--color-text-muted);
}

.btn-refresh {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #ffffff;
  font-family: var(--font-family-heading);
  font-size: var(--font-size-xs);
  font-weight: 600;
  padding: 0.45rem 0.9rem;
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: all var(--transition-fast);
  backdrop-filter: blur(8px);
}

.btn-refresh:hover:not(:disabled) {
  background: rgba(255, 79, 163, 0.2);
  border-color: var(--color-primary);
  box-shadow: 0 0 14px rgba(255, 79, 163, 0.35);
}

.btn-refresh:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.refresh-icon {
  font-size: 1rem;
  line-height: 1;
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
  padding: var(--spacing-sm) 0;
}

.pulse-effect {
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.04) 25%, rgba(255, 79, 163, 0.08) 50%, rgba(255, 255, 255, 0.04) 75%);
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

.skeleton-title { width: 55%; }
.skeleton-sub { width: 35%; height: 0.9rem; }

.skeleton-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
  gap: var(--spacing-sm);
}

.skeleton-card {
  height: 4rem;
  border-radius: var(--radius-md);
}

/* Estado de Erro */
.state-error {
  background: rgba(239, 68, 68, 0.08);
  border: 1px solid rgba(239, 68, 68, 0.35);
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

.weather-hero-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-md);
  flex-wrap: wrap;
  padding: var(--spacing-xs) 0;
}

.condition-group {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.condition-emoji {
  font-size: 3rem;
  line-height: 1;
  filter: drop-shadow(0 0 12px rgba(255, 122, 24, 0.5));
}

.condition-info {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.condition-name {
  font-family: var(--font-family-heading);
  font-size: 1.15rem;
  font-weight: 700;
  color: #ffffff;
}

.day-status-pill {
  display: inline-flex;
  align-self: flex-start;
  font-size: 0.7rem;
  font-weight: 700;
  color: var(--color-accent);
  background: rgba(54, 217, 232, 0.12);
  border: 1px solid rgba(54, 217, 232, 0.35);
  padding: 0.15rem 0.55rem;
  border-radius: var(--radius-full);
  letter-spacing: 0.03em;
}

.day-status-pill.is-night {
  color: var(--color-secondary);
  background: rgba(168, 85, 247, 0.15);
  border-color: rgba(168, 85, 247, 0.4);
}

.temperature-group {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.temp-display {
  display: flex;
  align-items: flex-start;
  line-height: 0.9;
}

.temp-val {
  font-size: 2.85rem;
  font-family: var(--font-family-heading);
  font-weight: 900;
  color: var(--color-primary);
  text-shadow: 0 0 25px rgba(255, 79, 163, 0.55);
}

.temp-unit {
  font-size: 1.5rem;
  color: var(--color-primary);
  font-weight: 800;
  margin-top: 0.2rem;
  margin-left: 0.15rem;
}

.temp-apparent {
  font-size: 0.75rem;
  color: var(--color-text-muted);
  margin-top: 0.35rem;
}

/* Faixa Inset de Métricas Organizada em Grade Responsiva */
.metrics-strip {
  background: rgba(10, 7, 20, 0.65);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-lg);
  padding: 0.75rem 1rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-sm);
}

@media (min-width: 40rem) {
  .metrics-strip {
    grid-template-columns: repeat(3, 1fr);
    gap: var(--spacing-md);
  }
}

.metric-item {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.35rem 0.5rem;
}

.metric-icon {
  font-size: 1.35rem;
  line-height: 1;
}

.metric-details {
  display: flex;
  flex-direction: column;
}

.metric-label {
  font-size: 0.65rem;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 600;
}

.metric-value {
  font-size: 0.95rem;
  font-weight: 700;
  color: #ffffff;
  font-family: var(--font-family-code);
}

/* Rodapé do Widget */
.weather-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-sm);
  flex-wrap: wrap;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  padding-top: var(--spacing-sm);
  font-size: 0.75rem;
  color: var(--color-text-muted);
}

.dot-pink {
  color: var(--color-primary);
  font-size: 0.7rem;
  margin-right: 0.2rem;
}

.education-note {
  color: var(--color-text-secondary);
  font-size: 0.75rem;
}

@media (max-width: 48rem) {
  .weather-widget {
    padding: var(--spacing-md);
  }
  .temperature-group {
    align-items: flex-start;
  }
}
</style>