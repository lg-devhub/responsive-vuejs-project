/**
 * Serviço de Integração com API Externa — Vice City Conditions (RF10)
 * Consome dados meteorológicos em tempo real da Open-Meteo Weather API
 * para as coordenadas de Miami / Flórida (inspiração oficial de Vice City).
 * Endpoint público, sem necessidade de chaves privadas (compatível com produção).
 */

const MIAMI_LAT = 25.7617
const MIAMI_LON = -80.1918
const API_TIMEOUT_MS = 8000

// Mapeamento dos códigos meteorológicos WMO (World Meteorological Organization)
const WMO_WEATHER_MAP = {
  0: { description: 'Céu Limpo Tropical', icon: '☀️', vibe: 'Dia radiante em Ocean Beach' },
  1: { description: 'Predominantemente Ensolarado', icon: '🌤️', vibe: 'Céu aberto sobre Starfish Island' },
  2: { description: 'Parcialmente Nublado', icon: '⛅', vibe: 'Brisa amena cortando a baía' },
  3: { description: 'Nublado Tropical', icon: '☁️', vibe: 'Nuvens densas sobre Downtown' },
  45: { description: 'Névoa Marítima', icon: '🌫️', vibe: 'Névoa costeira cobrindo as marinas' },
  48: { description: 'Neblina com Cristais', icon: '🌫️', vibe: 'Visibilidade reduzida nos canais' },
  51: { description: 'Garoa Tropical Leve', icon: '🌦️', vibe: 'Gotas suaves refletindo os neons' },
  53: { description: 'Garoa Moderada', icon: '🌦️', vibe: 'Asfalto molhado na Washington Beach' },
  55: { description: 'Garoa Intensa', icon: '🌧️', vibe: 'Chuva fina contínua sobre a cidade' },
  61: { description: 'Chuva Tropical Leve', icon: '🌧️', vibe: 'Chuva passageira de verão' },
  63: { description: 'Chuva Moderada', icon: '🌧️', vibe: 'Trânsito cauteloso na Ocean Drive' },
  65: { description: 'Temporal Tropical Forte', icon: '⛈️', vibe: 'Tempestade torrencial de Vice City' },
  80: { description: 'Pancadas de Chuva Rápidas', icon: '🌦️', vibe: 'Pancada súbita típica da Flórida' },
  81: { description: 'Pancadas Fortes', icon: '🌧️', vibe: 'Água acumulando nas avenidas neon' },
  82: { description: 'Tempestade Violenta', icon: '⛈️', vibe: 'Ventos fortes e alertas marítimos' },
  95: { description: 'Trovoada com Raios', icon: '⛈️', vibe: 'Relâmpagos iluminando o pôr do sol' },
  96: { description: 'Tempestade com Granizo Leve', icon: '⛈️', vibe: 'Alerta climático severo' },
  99: { description: 'Tempestade Severa com Granizo', icon: '🌩️', vibe: 'Sirenes de emergência ligadas' }
}

/**
 * Obtém a interpretação textual e o ícone a partir do código WMO
 */
function getWeatherInfo(code) {
  return WMO_WEATHER_MAP[code] || {
    description: 'Condição Tropical Variável',
    icon: '🌴',
    vibe: 'Clima característico do sul da Flórida'
  }
}

/**
 * Busca as condições meteorológicas em tempo real de Vice City (Miami)
 * @returns {Promise<Object>} Dados tratados de temperatura, umidade, vento e status
 */
export async function fetchViceCityWeather() {
  const url = new URL('https://api.open-meteo.com/v1/forecast')
  url.searchParams.set('latitude', MIAMI_LAT.toString())
  url.searchParams.set('longitude', MIAMI_LON.toString())
  url.searchParams.set(
    'current',
    'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m'
  )
  url.searchParams.set('timezone', 'America/New_York')

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT_MS)

  try {
    const response = await fetch(url.toString(), {
      signal: controller.signal,
      headers: {
        Accept: 'application/json'
      }
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new Error(`Falha no serviço meteorológico: status HTTP ${response.status} (${response.statusText})`)
    }

    const data = await response.json()

    if (!data.current) {
      throw new Error('Formato inesperado: dados meteorológicos atuais não retornados pela API.')
    }

    const current = data.current
    const units = data.current_units || {}
    const weatherInfo = getWeatherInfo(current.weather_code)

    return {
      success: true,
      city: 'Vice City (Miami, Flórida)',
      coordinates: `${MIAMI_LAT}° N, ${Math.abs(MIAMI_LON)}° W`,
      temperature: current.temperature_2m,
      temperatureUnit: units.temperature_2m || '°C',
      apparentTemperature: current.apparent_temperature,
      humidity: current.relative_humidity_2m,
      humidityUnit: units.relative_humidity_2m || '%',
      windSpeed: current.wind_speed_10m,
      windSpeedUnit: units.wind_speed_10m || 'km/h',
      isDay: current.is_day === 1,
      periodLabel: current.is_day === 1 ? '☀️ Dia Tropical' : '🌙 Noite Neon',
      weatherCode: current.weather_code,
      weatherDescription: weatherInfo.description,
      weatherIcon: weatherInfo.icon,
      weatherVibe: weatherInfo.vibe,
      timestamp: current.time,
      fetchedAt: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    }
  } catch (error) {
    clearTimeout(timeoutId)

    let mensagemAmigavel = 'Não foi possível conectar ao satélite meteorológico de Vice City.'
    if (error.name === 'AbortError') {
      mensagemAmigavel = 'Tempo limite de requisição excedido (timeout de 8s). O servidor meteorológico demorou a responder.'
    } else if (error.message) {
      mensagemAmigavel = error.message
    }

    return {
      success: false,
      error: mensagemAmigavel,
      failedAt: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    }
  }
}
