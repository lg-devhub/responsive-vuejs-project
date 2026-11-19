/**
 * Serviço de Integração com API Pública Externa (RF10)
 * Provedor: Open-Meteo Weather API (Estação Meteorológica Miami / Vice City)
 * Coordenadas: 25.7617° N, -80.1918° W (Miami, FL - inspiração real de Vice City)
 * Características: Gratuita, sem necessidade de chaves privadas (atende RNF08), suporte a CORS.
 */

const MIAMI_LAT = 25.7617
const MIAMI_LON = -80.1918
const API_URL = `https://api.open-meteo.com/v1/forecast?latitude=${MIAMI_LAT}&longitude=${MIAMI_LON}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m&timezone=America%2FNew_York`

/**
 * Traduz o código meteorológico padrão da WMO (World Meteorological Organization)
 * para descrições temáticas e ícones estilizados de Vice City.
 */
const getWeatherCondition = (code, isDay) => {
  switch (code) {
    case 0:
      return {
        text: isDay ? 'Céu Limpo e Ensolarado' : 'Noite Limpa e Estrelada',
        icon: isDay ? '☀️' : '🌙'
      }
    case 1:
    case 2:
      return {
        text: isDay ? 'Poucas Nuvens Tropicais' : 'Noite com Nuvens Dispersas',
        icon: isDay ? '🌤️' : '☁️'
      }
    case 3:
      return {
        text: 'Céu Parcialmente Encoberto',
        icon: '⛅'
      }
    case 45:
    case 48:
      return {
        text: 'Neblina sobre Biscayne Bay',
        icon: '🌫️'
      }
    case 51:
    case 53:
    case 55:
    case 61:
    case 63:
    case 65:
      return {
        text: 'Chuva Tropical Passageira',
        icon: '🌧️'
      }
    case 80:
    case 81:
    case 82:
      return {
        text: 'Pancadas Fortes de Verão',
        icon: '🌦️'
      }
    case 95:
    case 96:
    case 99:
      return {
        text: 'Tempestade Elétrica com Trovoadas',
        icon: '⛈️'
      }
    default:
      return {
        text: 'Clima Típico de Vice City',
        icon: '🌴'
      }
  }
}

/**
 * Busca as condições meteorológicas em tempo real de Vice City.
 * Inclui timeout de 8 segundos para tratamento de redes lentas ou instáveis.
 */
export const fetchViceCityWeather = async () => {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 8000)

  try {
    const response = await fetch(API_URL, {
      signal: controller.signal,
      headers: {
        'Accept': 'application/json'
      }
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new Error(`Erro na resposta da API externa: HTTP ${response.status}`)
    }

    const json = await response.json()
    const current = json.current

    if (!current) {
      throw new Error('Formato inesperado dos dados recebidos da estação meteorológica.')
    }

    const isDay = Boolean(current.is_day)
    const condition = getWeatherCondition(current.weather_code, isDay)

    return {
      success: true,
      data: {
        temperature: Math.round(current.temperature_2m),
        apparentTemperature: Math.round(current.apparent_temperature),
        humidity: current.relative_humidity_2m,
        windSpeed: Math.round(current.wind_speed_10m),
        isDay,
        timeStatus: isDay ? 'Dia / Sol Radiante' : 'Noite Neon',
        conditionText: condition.text,
        icon: condition.icon,
        recordedAt: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        station: 'Estação Meteorológica Vice City (Miami, FL)'
      }
    }
  } catch (err) {
    clearTimeout(timeoutId)
    const isTimeout = err.name === 'AbortError'
    return {
      success: false,
      error: isTimeout
        ? 'A requisição excedeu o tempo limite de conexão (8 segundos).'
        : (err.message || 'Falha ao conectar com o serviço meteorológico.')
    }
  }
}
