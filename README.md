# 🌴 Vice City Responsive Guide — GTA VI Edition

> **Aplicação Web Educacional sobre Responsividade Web & Boas Práticas em Vue 3**  
> Projeto acadêmico semestral desenvolvido em **Vue 3** (Composition API), **Vite**, **Vue Router**, **Pinia** e **CSS3 Mobile-First**, com identidade visual inspirada na atmosfera noturna e tropical de Grand Theft Auto VI (Vice City).

---

## 📌 Visão Geral do Projeto

O **Vice City Responsive Guide** é uma aplicação interativa concebida para ensinar desenvolvimento de interfaces adaptáveis, fluidas e acessíveis. O projeto combina rigor técnico com uma identidade visual imersiva (tons neon, fundo dark cinematográfico e gradientes pôr do sol), sem comprometer a legibilidade ou os padrões de acessibilidade (WCAG AA).

A aplicação reúne:
- **5 Seções Técnicas Obrigatórias** com explicações didáticas para alunos iniciantes, exemplos de código comentados, respostas detalhadas para as perguntas-guia acadêmicas e fontes oficiais consultadas;
- **3 Laboratórios Práticos Interativos** com manipulação de parâmetros em tempo real e feedback visual imediato;
- **Consumo de API Real (RF10)** exibindo as condições meteorológicas em tempo real de Miami / Vice City (Open-Meteo API);
- **Gerenciamento Global com Pinia (RF09)** para o estado reativo dos laboratórios e monitoramento de breakpoints;
- **Final Mission (RF11):** Desafio final interativo exigindo aplicação dos cálculos aprendidos no guia;
- **Arquitetura 100% Mobile-First (RNF01):** Ausência total de rolagem horizontal indevida e menu hambúrguer com gaveta móvel acessível.

> ⚠️ **Aviso de Propriedade Intelectual:** Este projeto é uma iniciativa acadêmica e independente. Não é um produto oficial da Rockstar Games ou Take-Two Interactive, e não possui afiliação ou patrocínio de tais empresas.

---

## 🛠️ Tecnologias e Bibliotecas Utilizadas

- **[Vue 3](https://vuejs.org/)** — Versão 3.5 com Composition API e sintaxe moderna `<script setup>`;
- **[Vite](https://vitejs.dev/)** — Empacotador e servidor de desenvolvimento ultrarrápido;
- **[Vue Router](https://router.vuejs.org/)** — Gerenciador de rotas com modo histórico HTML5 e carregamento sob demanda (*Lazy Loading*);
- **[Pinia](https://pinia.vuejs.org/)** — Gerenciamento de estado global reativo para laboratórios e viewport;
- **[CSS3 Moderno](https://developer.mozilla.org/pt-BR/docs/Web/CSS)** — Reset mobile-first, variáveis CSS em `:root`, Flexbox, CSS Grid e media queries com `min-width`;
- **[Open-Meteo API](https://open-meteo.com/)** — API pública de meteorologia para dados dinâmicos em tempo real sem necessidade de chaves privadas;
- **Google Fonts** — Tipografias `Poppins` (títulos) e `Inter` (textos, controles e código).

---

## 📂 Arquitetura e Organização de Pastas

```text
src/
├── assets/
│   ├── images/                       # Assets gráficos e ilustrações
│   └── styles/
│       ├── tokens.css                # Design tokens em :root (paleta neon GTA VI, rem, fontes)
│       └── main.css                  # Reset global mobile-first, tipografia e utilitários
├── components/
│   ├── layout/
│   │   ├── AppNavbar.vue             # Navbar responsiva com menu hambúrguer e drawer mobile
│   │   ├── AppFooter.vue             # Rodapé semântico com navegação e créditos acadêmicos
│   │   └── BreakpointMonitor.vue     # LAB03: Widget flutuante fixo com monitoramento de resolução
│   ├── content/
│   │   └── SectionBlock.vue          # Template modular das 4 partes de cada seção educacional
│   ├── labs/
│   │   ├── ResponsiveContainerLab.vue # LAB01: Slider de largura e quebra de grid dinâmico
│   │   └── UnitConverterLab.vue      # LAB02: Conversor de rem, em, %, vw e ch com contexto
│   └── dynamic/
│       └── ViceCityConditions.vue    # RF10: Boletim meteorológico em tempo real (Open-Meteo)
├── views/
│   ├── HomeView.vue                  # Página inicial imersiva com trilha e clima ao vivo
│   ├── ResponsividadeImportaView.vue # Seção 1: Welcome to Vice City (Meta viewport e 980px)
│   ├── UnidadesCssView.vue           # Seção 2: CSS Units (rem, em, px, dvh e acessibilidade)
│   ├── FlexboxGridView.vue           # Seção 3: City Layout (1D vs 2D e cálculo de 464px)
│   ├── ImagensResponsivasView.vue    # Seção 4: Visual Experience (width/height e CLS)
│   ├── BoasPraticasVueView.vue       # Seção 5: Developer's Garage (:key, tokens e Web Vitals)
│   ├── LaboratoriosView.vue          # Central de Laboratórios Interativos (LAB01, LAB02, LAB03)
│   └── DesafioView.vue               # Seção 6: Final Mission (Desafio de 3 colunas a 608px)
├── router/
│   └── index.js                      # Rotas com lazy loading e scroll top
├── stores/
│   ├── labsStore.js                  # Store Pinia com os estados dos laboratórios interativos
│   └── viewportStore.js              # Store Pinia com listener de resize e breakpoints
├── services/
│   └── api.js                        # Cliente HTTP nativo (fetch) com tratamento de timeout e erro
├── App.vue                           # Componente raiz com o layout unificado
└── main.js                           # Ponto de entrada com Vue 3, Pinia e Vue Router
```

---

## 📚 Módulos Educacionais e Perguntas-Guia

| Módulo | Título | Pergunta-Guia & Resposta Resumida |
|---|---|---|
| **01** | **Welcome to Vice City: Introdução à Responsividade** | **P:** Por que um site sem a viewport tag abre miniaturizado no celular mesmo com media queries?<br>**R:** Os navegadores móveis adotam uma viewport virtual legada de ~980px e aplicam zoom-out. As media queries consultam essa tela virtual em vez da resolução física, ignorando regras mobile. A meta tag com `width=device-width, initial-scale=1.0` restaura a proporção real 1:1. |
| **02** | **CSS Units: Unidades CSS** | **P:** Por que o `rem` escala ao alterar a fonte do navegador, enquanto o `px` não?<br>**R:** O `px` é absoluto e ignora preferências de acessibilidade. O `rem` é relativo à raiz (`<html>`); se o usuário amplia a fonte padrão nas configurações, o `rem` acompanha proporcionalmente, garantindo inclusão a pessoas com baixa visão. |
| **03** | **City Layout: Flexbox e Grid** | **P:** Com `repeat(auto-fit, minmax(14rem, 1fr))` e `gap: 1rem` (`1rem = 16px`), a partir de qual largura surgem 2 colunas?<br>**R:** **A partir de 464px**. Cálculo: `Card 1 (224px) + Gap (16px) + Card 2 (224px) = 464px` (`14rem + 1rem + 14rem = 29rem × 16px = 464px`). |
| **04** | **Visual Experience: Imagens Responsivas** | **P:** Por que imagens sem width e height empurram o conteúdo após carregarem, e qual métrica mede isso?<br>**R:** O navegador reserva 0px de altura inicial e é forçado a recalcular o layout (*reflow*) ao receber o arquivo. A métrica do Google Core Web Vitals que mede e penaliza esses saltos é o **CLS (Cumulative Layout Shift)**. |
| **05** | **Developer's Garage: Boas Práticas em Vue** | **P:** O que acontece se uma lista com campos de texto renderizada com `v-for` sem `:key` tiver seu primeiro item removido?<br>**R:** O Vue adota a heurística *in-place patch*: ele sobrescreve os dados do primeiro nó e exclui o último do DOM. Como o estado interno do `<input>` pertence ao DOM real e não tinha chave única de identificação, o texto digitado permanece e pula incorretamente para o elemento seguinte. |
| **06** | **Final Mission: O Desafio** | **P:** Em um grid com `minmax(12rem, 1fr)` e `gap: 1rem`, a partir de qual largura surgem 3 colunas?<br>**R:** **A partir de 608px**. Cálculo: `3 cards × 192px (576px) + 2 gaps × 16px (32px) = 608px`. O sistema inclui validador interativo com dicas dinâmicas. |

---

## 🧪 Laboratórios Interativos

1. **LAB01 — Responsive Container (`ResponsiveContainerLab.vue`):**
   - Controle deslizante funcional de 300px a 900px;
   - Demonstração visual de 4 cards distritais de Vice City com `repeat(auto-fit, minmax(14rem, 1fr))`;
   - Botões de atalho para limiares críticos (360px para 1 coluna, 464px para 2 colunas, 704px para 3 colunas);
   - Feedback em tempo real via Pinia sobre quantas colunas cabem e quantos pixels faltam para a próxima quebra.

2. **LAB02 — CSS Unit Converter (`UnitConverterLab.vue`):**
   - Suporte para conversão entre `rem`, `em`, `%`, `vw` e `ch` para pixels (`px`);
   - Painel dinâmico de contexto que permite alterar a fonte raiz de acessibilidade (16px a 32px), a fonte do elemento pai ou a largura do contêiner;
   - Demonstração da fórmula matemática aplicada e barra proporcional visual.

3. **LAB03 — Breakpoint Monitor Fixo (`BreakpointMonitor.vue`):**
   - Indicador flutuante fixado no canto inferior direito da tela;
   - Monitora em tempo real a largura da janela (`window.innerWidth`) e classifica o breakpoint ativo:
     - **Mobile (<640px):** Badge Pink Neon (SM);
     - **Tablet (640px - 1023px):** Badge Purple Sunset (MD);
     - **Desktop (≥1024px):** Badge Cyan Neon (LG/XL);
   - Possui modo recolhido/minimizado para visualização desobstruída em smartphones.

---

## 🌐 Consumo de API em Tempo Real (RF10)

O componente **`ViceCityConditions.vue`** consome a API REST da **Open-Meteo**, sem necessidade de autenticação privada, trazendo dados reais das coordenadas de Miami (Vice City):
- Exibe temperatura atual, sensação térmica, umidade relativa, velocidade do vento e condição do céu;
- Identifica se o momento atual é "Dia / Sol Radiante" ou "Noite Neon em Vice City";
- Trata os 3 estados assíncronos: **Carregamento** (*skeleton loader* com animação de pulso), **Erro** (card de advertência com botão de *retry*) e **Sucesso** (painel em CSS Grid auto-responsivo com botão de atualização manual).

---

## 🎯 Conformidade com os Critérios de Aceitação do ERS

| # | Critério de Aceitação (ERS Seção 9) | Status | Evidência no Projeto |
|---|---|:---:|---|
| 1 | Desenvolvido com Vue 3 e Vite | ✅ | `package.json`, `vite.config.js` |
| 2 | Navegação implementada com Vue Router | ✅ | `src/router/index.js`, `RouterView`, `RouterLink` |
| 3 | Gerenciamento de estado com Pinia | ✅ | `src/stores/labsStore.js`, `src/stores/viewportStore.js` |
| 4 | Consumo funcional de uma API externa | ✅ | `src/services/api.js`, `src/components/dynamic/ViceCityConditions.vue` |
| 5 | Todas as 5 seções técnicas disponíveis | ✅ | Módulos 1 a 5 em `src/views/` |
| 6 | Todas as perguntas-guia respondidas | ✅ | Documentadas em cada Seção com caixa destacada |
| 7 | Explicações, exemplos comentados e fontes | ✅ | Implementadas via `SectionBlock.vue` em cada módulo |
| 8 | Pelo menos 3 laboratórios interativos | ✅ | LAB01 (Slider), LAB02 (Conversor), LAB03 (Monitor Fixo) |
| 9 | Página final de Desafio implementada | ✅ | `src/views/DesafioView.vue` com validador e dicas |
| 10 | Layout funcional em mobile e computador | ✅ | Abordagem mobile-first e media queries `min-width` |
| 11 | Sem rolagem horizontal indevida | ✅ | `box-sizing: border-box`, `max-width: 100%`, `overflow-x: hidden` |
| 12 | Menu mobile implementado | ✅ | Botão hambúrguer animado e drawer em `AppNavbar.vue` |
| 13 | Pronto para publicação na internet | ✅ | `vercel.json` configurado com reescritas para SPA |
| 14 | Código no GitHub com README detalhado | ✅ | Este documento e histórico de commits |
| 15 | Captura de tela mobile para entrega | ✅ | Instruções e validação em 320px/375px/390px |

---

## 🚀 Como Executar Localmente

### Pré-requisitos
- **Node.js** (v18.0.0 ou superior);
- **npm** (v9 ou superior).

### Instalação e Execução

```bash
# 1. Clone o repositório
git clone https://github.com/SEU_USUARIO/responsive-vuejs-project.git

# 2. Acesse a pasta do projeto
cd responsive-vuejs-project

# 3. Instale as dependências
npm install

# 4. Inicie o servidor de desenvolvimento
npm run dev
```

Abra seu navegador no endereço indicado (geralmente `http://localhost:5173/`).

### Build de Produção e Pré-visualização

```bash
# Gerar o pacote otimizado de produção
npm run build

# Testar a versão de produção localmente
npm run preview
```

---

## 🚢 Deploy na Vercel

O projeto possui um arquivo `vercel.json` que garante o funcionamento das rotas SPA (*Single Page Application*):

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

Para publicar:
1. Conecte seu repositório no dashboard da [Vercel](https://vercel.com);
2. A Vercel detectará o preset do **Vite** automaticamente;
3. Clique em **Deploy**. A aplicação estará disponível imediatamente com certificado HTTPS.
