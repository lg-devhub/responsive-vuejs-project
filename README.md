# 🌴 Vice City Responsive Guide — Guia Didático de Responsividade & Vue 3

> **Projeto Acadêmico Semestral**  
> Um guia web didático, responsivo e interativo construído em **Vue 3** com **Vite**, **Vue Router** e **Pinia**, contextualizado com a atmosfera visual, urbana e neon de **Grand Theft Auto VI (Vice City)**.  
> *Aviso: Este é um projeto acadêmico independente sem qualquer vínculo oficial ou comercial com a Rockstar Games.*

---

## 📌 Sumário Executivo

O **Vice City Responsive Guide** é uma aplicação educacional concebida para ensinar os princípios fundamentais do design responsivo moderno, engenharia de layout CSS e arquitetura modular em Vue 3. 

O projeto une rigor matemático e pedagógico com uma identidade visual imersiva e marcante, permitindo aos estudantes do 1º semestre de tecnologia compreender na prática conceitos abstratos como grids fluidos, quebra de colunas sem media queries, acessibilidade de unidades relativas e gerenciamento global de estado.

---

## 🛠️ Stack Tecnológica

- **Frontend Framework:** Vue 3 (Composition API com sintaxe `<script setup>`)
- **Build Tool & Bundler:** Vite 6
- **Roteamento:** Vue Router 4 (com modo de histórico HTML5 e carregamento sob demanda *lazy-loading*)
- **Gerenciamento de Estado Global:** Pinia 4
- **Estilização:** CSS3 puro e nativo com Design Tokens centralizados em `:root`
- **Consumo de API:** Open-Meteo Weather API (dados meteorológicos ao vivo de Miami / Vice City)
- **Metodologia de Estilo:** Estritamente **Mobile-First** (CSS base para dispositivos móveis com expansão via `@media (min-width: ...)`)

---

## 📐 Metodologia Pedagógica (Os 4 Pilares do ERS)

Em estrita conformidade com os requisitos do documento acadêmico `docs/ERS.md`, cada seção educacional do guia estrutura o aprendizado em 4 pilares:

1. **Explicação Didática Curta:** Linguagem clara e objetiva para estudantes iniciantes;
2. **Exemplo de Código Comentado:** Trechos sintáticos modernos detalhando o porquê de cada propriedade;
3. **Pergunta-Guia Respondida:** Fundamentação aprofundada de dilemas clássicos do desenvolvimento web;
4. **Fontes & Referências Oficiais:** Links diretos para especificações da MDN Web Docs, web.dev (Google) e W3C.

---

## 📚 Módulos Educacionais & Perguntas-Guia

| Módulo | Título | Conteúdos Principais | Pergunta-Guia & Fundamentação |
|---|---|---|---|
| **Seção 1** | **Por que responsividade importa** | Viewport meta tag, grids fluidos, media queries mobile-first, diferenças de densidade de tela. | **Por que sem `<meta name="viewport">` o site miniaturiza no celular?** O navegador assume a tela virtual desktop de ~980px e aplica zoom-out forçado. A meta tag alinha a viewport à largura real do hardware (`width=device-width, initial-scale=1.0`). |
| **Seção 2** | **Unidades CSS** | Absolutas vs. Relativas (`px`, `rem`, `em`, `%`, `fr`, `vw`, `vh`, `dvh`, `ch`), acessibilidade e leitura. | **Por que `rem` escala com as preferências do usuário e `px` não?** O `rem` calcula diretamente sobre a raiz `<html>`. Quando usuários com baixa visão aumentam a fonte padrão do navegador, elementos em `rem` escalam proporcionalmente, enquanto `px` permanece estático e inacessível. |
| **Seção 3** | **Flexbox e Grid** | 1D vs. 2D, `justify-content`, `align-items`, `gap` e `repeat(auto-fit, minmax())`. | **A partir de qual largura o contêiner exibe 2 colunas com cards de 14rem e gap de 1rem (base 16px)?** Exatamente aos **464px**! Cálculo: $2 \times 224\text{px} + 1 \times 16\text{px} = 448\text{px} + 16\text{px} = \mathbf{464\text{px}}$. |
| **Seção 4** | **Imagens responsivas** | `max-width: 100%`, `height: auto`, atributos `width`/`height`, `loading="lazy"`, `aspect-ratio` e `object-fit`. | **Por que a falta de dimensões HTML desloca o layout e qual métrica mede isso?** O navegador não reserva o espaço vertical antes do download, causando reflow brusco. O Google mede essa instabilidade através do **CLS (Cumulative Layout Shift)** do Core Web Vitals. |
| **Seção 5** | **Boas práticas em projetos Vue** | Arquitetura modular, props tipadas, `:key` obrigatório no `v-for`, design tokens e Web Vitals (LCP, INP, CLS). | **O que ocorre no `v-for` sem `:key` ao remover o 1º item com campos digitados?** O algoritmo *in-place patch* do Virtual DOM reutiliza os nós existentes do DOM sem recriá-los, fazendo o texto digitado "dançar" para o item vizinho. |
| **Seção 6** | **Desafio Final (Final Mission)** | Cálculo avançado de quebra de colunas para 3 colunas com validação em tempo real. | Enigma autoral com cards de 12rem e gap de 1rem. Resposta exata: **608px** ($3 \times 192\text{px} + 2 \times 16\text{px} = 576\text{px} + 32\text{px} = \mathbf{608\text{px}}$). |

---

## 🧪 Laboratórios Interativos (LAB01, LAB02 e LAB03)

Disponíveis na rota `/laboratorios`, com estado centralizado via Pinia (`src/stores/labsStore.js` e `src/stores/viewportStore.js`):

1. **LAB01 — Responsive Container & CSS Grid:**
   - Controle deslizante funcional (`range input`) variando a largura de 300px a 860px;
   - Demonstração empírica da regra `repeat(auto-fit, minmax(14rem, 1fr))` com `gap: 1rem`;
   - Marcadores visuais destacados na régua para os limiares de transição de **464px (2 colunas)** e **704px (3 colunas)**;
   - Botões de presets rápidos e cards temáticos estilizados de Vice City.
2. **LAB02 — Conversor Interativo de Unidades CSS:**
   - Suporte completo a 5 unidades: `rem`, `em`, `%`, `vw` e `ch`;
   - **Contexto de Referência Dinâmico:** permite calibrar o tamanho da fonte raiz (`<html>`), fonte do elemento pai, largura do contêiner e largura da viewport para demonstrar como o cálculo real varia de acordo com o contexto;
   - Barra comparativa visual com escala proporcional em tempo real.
3. **LAB03 — Breakpoint Monitor:**
   - Componente flutuante fixo no rodapé e painel dedicado na página de laboratórios;
   - Leitura reativa instantânea de `window.innerWidth` e `window.innerHeight`;
   - Identificação do breakpoint ativo conforme as diretrizes do projeto:
     - **Mobile (SM):** `< 640px` (CSS nativo sem media query)
     - **Tablet (MD):** `640px a 1023px` (`@media (min-width: 40rem)`)
     - **Desktop (LG/XL):** `≥ 1024px` (`@media (min-width: 64rem)`)

---

## 🌐 Consumo de API Externa (RF10)

A aplicação integra dados meteorológicos em tempo real através da **Open-Meteo Weather API** para as coordenadas geográficas de Miami (inspiração de Vice City: `25.7617° N, -80.1918° W`):
- **Serviço Assíncrono:** `src/services/api.js` com `AbortController` (timeout de 8s);
- **Componente:** `src/components/dynamic/ViceCityConditions.vue`;
- **Tratamento de Estados:**
  - *Loading:* Esqueleto (*skeleton*) com animação *shimmer* neon;
  - *Success:* Temperatura atual, sensação térmica, umidade, velocidade do vento, código WMO e indicador de Dia Tropical / Noite Neon;
  - *Error:* Alerta temático com mensagem descritiva e botão "Tentar Reconectar Agora";
  - *Manual Refresh:* Botão para recarregar dados sob demanda com timestamp da última leitura.

---

## 📂 Estrutura Arquitetural do Projeto

```text
responsive-vuejs-project/
├── docs/
│   ├── ERS.md                       # Especificação de Requisitos de Software oficial
│   └── Passos.md                    # Plano de execução passo a passo do projeto
├── public/                          # Ativos estáticos públicos
├── src/
│   ├── assets/
│   │   ├── styles/
│   │   │   └── tokens.css           # Design tokens (:root) de Vice City / GTA VI
│   │   └── main.css                 # Reset mobile-first, estilos globais e acessibilidade
│   ├── components/
│   │   ├── content/
│   │   │   └── SectionBlock.vue     # Componente padronizado dos 4 pilares de cada seção
│   │   ├── dynamic/
│   │   │   └── ViceCityConditions.vue # Consumo da API meteorológica em tempo real (RF10)
│   │   ├── labs/
│   │   │   ├── ResponsiveContainerLab.vue # LAB01: Slider de contêiner e grid
│   │   │   ├── UnitConverterLab.vue       # LAB02: Conversor contextual de unidades
│   │   │   └── BreakpointMonitorLab.vue   # LAB03: Painel didático de breakpoints
│   │   └── layout/
│   │       ├── AppNavbar.vue        # Barra com menu hambúrguer mobile acessível
│   │       ├── AppFooter.vue        # Rodapé semântico e disclaimer de independência
│   │       └── BreakpointMonitor.vue# Widget fixo flutuante do LAB03
│   ├── router/
│   │   └── index.js                 # Vue Router com lazy loading de todas as rotas
│   ├── services/
│   │   └── api.js                   # Serviço de integração com Open-Meteo API
│   ├── stores/
│   │   ├── labsStore.js             # Estado compartilhado dos laboratórios e desafio
│   │   └── viewportStore.js         # Estado global de redimensionamento e breakpoints
│   ├── views/
│   │   ├── HomeView.vue             # Página inicial com hero, API e metodologia
│   │   ├── ResponsividadeImportaView.vue # Módulo 1: Por que responsividade importa
│   │   ├── UnidadesCssView.vue      # Módulo 2: Unidades CSS
│   │   ├── FlexboxGridView.vue      # Módulo 3: Flexbox e Grid (cálculo 464px)
│   │   ├── ImagensResponsivasView.vue # Módulo 4: Imagens responsivas, CLS e LCP
│   │   ├── BoasPraticasVueView.vue  # Módulo 5: Boas práticas Vue e Web Vitals
│   │   ├── DesafioView.vue          # Módulo 6: Desafio Final (cálculo 608px)
│   │   └── LaboratoriosView.vue     # Tela integradora dos 3 laboratórios práticos
│   ├── App.vue                      # Componente raiz da aplicação
│   └── main.js                      # Inicialização do Vue 3, Pinia e Router
├── index.html                       # HTML5 base com meta viewport e Google Fonts
├── LastProgress.md                  # Registro contínuo e cumulativo de progresso
├── package.json                     # Metadados e dependências (Vue, Pinia, Router, Vite)
├── vercel.json                      # Regras de reescrita para rotas SPA na Vercel
├── vite.config.js                   # Configuração de build do Vite
└── README.md                        # Documentação completa do projeto
```

---

## 🎨 Paleta de Cores & Design Tokens (Vice City Theme)

Configurados em `src/assets/styles/tokens.css` com variáveis CSS em `:root`:

```css
:root {
  /* Fundo Noturno e Superfícies */
  --color-bg: #100d1c;
  --color-surface: #1c1530;
  --color-surface-light: #2a2042;
  --color-surface-muted: #161228;

  /* Acentos Neon Principais */
  --color-primary: #ff4fa3;       /* Pink Neon */
  --color-secondary: #a855f7;     /* Sunset Purple */
  --color-accent: #36d9e8;        /* Cyan Neon */

  /* Textos com Contraste WCAG AA */
  --color-text-primary: #fff5fa;
  --color-text-secondary: #d8cfe5;
  --color-text-muted: #b9adc9;

  /* Gradientes Oficiais */
  --gradient-sunset: linear-gradient(135deg, #ff4fa3 0%, #a855f7 50%, #36d9e8 100%);
}
```

---

## 🚀 Como Rodar o Projeto Localmente

### Pré-requisitos
- **Node.js** (v18.0 ou superior)
- **npm** (incluso com o Node.js)

### Instruções Passo a Passo

1. **Clone o repositório ou navegue até a pasta do projeto:**
   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd responsive-vuejs-project
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```
   Acesse a URL informada no terminal (geralmente `http://localhost:5173`).

4. **Para testar em outros aparelhos da rede local (ex: celular físico via Wi-Fi):**
   ```bash
   npm run dev -- --host
   ```
   Abra o endereço IP exibido (ex: `http://192.168.1.X:5173`) no navegador do celular.

5. **Para gerar e testar o build de produção:**
   ```bash
   npm run build
   npm run preview
   ```

---

## 📋 Matriz de Conformidade dos Critérios de Aceitação (ERS)

| Nº | Critério de Aceitação Exigido no ERS | Status | Evidência Técnica no Projeto |
|---|---|---|---|
| **01** | Desenvolvido utilizando Vue 3 e Vite | ✅ Concluído | `package.json` com `vue: ^3.5.13` e `vite: ^6.1.0`. |
| **02** | Navegação implementada com Vue Router | ✅ Concluído | `src/router/index.js` com rotas e lazy loading. |
| **03** | Gerenciamento de estado utilizando Pinia | ✅ Concluído | `labsStore.js` e `viewportStore.js` gerenciando laboratórios, desafio e tela. |
| **04** | Consumo funcional de uma API externa real | ✅ Concluído | `src/services/api.js` consumindo Open-Meteo Weather API ao vivo em `ViceCityConditions.vue`. |
| **05** | Todas as 5 seções técnicas disponíveis | ✅ Concluído | Seções 1 a 5 implementadas em rotas independentes. |
| **06** | Todas as perguntas-guia respondidas | ✅ Concluído | Respostas fundamentadas nas seções, no `SectionBlock.vue` e documentadas neste README. |
| **07** | Explicações, exemplos comentados e referências | ✅ Concluído | Os 4 pilares presentes em cada um dos módulos educacionais. |
| **08** | Pelo menos três laboratórios interativos funcionais | ✅ Concluído | LAB01 (Container), LAB02 (Unit Converter) e LAB03 (Breakpoint Monitor). |
| **09** | Página final de desafio implementada | ✅ Concluído | `DesafioView.vue` com cálculo exato de 608px e feedback inteligente. |
| **10** | Layout funcionando em mobile e computadores | ✅ Concluído | Grid e Flexbox fluidos testados de 320px a 1440px+. |
| **11** | Sem rolagem horizontal indevida | ✅ Concluído | Contêineres com `width: 100%`, `max-width` e ausência de larguras estáticas em pixels. |
| **12** | Menu mobile implementado | ✅ Concluído | `AppNavbar.vue` com botão hambúrguer acessível, gaveta deslizante e bloqueio de scroll. |
| **13** | Projeto preparado para publicação na internet | ✅ Concluído | Arquivo `vercel.json` configurado com reescritas para SPA na Vercel/Netlify. |
| **14** | Código no GitHub com documentação README | ✅ Concluído | Repositório estruturado com documentação técnica detalhada. |
| **15** | Instruções de execução e teste mobile | ✅ Concluído | Suporte a `npm run dev -- --host` e compatibilidade total com emuladores de smartphone. |

---

## 📱 Testando em Dispositivos Móveis

Para auditar o comportamento da aplicação em smartphones e tablets:
1. Abra o navegador (Google Chrome, Edge ou Firefox);
2. Pressione `F12` (ou `Ctrl + Shift + I`) para abrir o *Developer Tools*;
3. Ative o modo responsivo clicando no ícone **Toggle device toolbar** (`Ctrl + Shift + M`);
4. Teste em resoluções canônicas:
   - **320px** (iPhone SE 1ª Geração)
   - **375px** (iPhone SE / iPhone 12/13 mini)
   - **390px / 414px** (iPhone 13/14/15 e Galaxy S22)
   - **768px** (iPad Mini / Tablet)
   - **1024px** (iPad Pro / Notebook)
5. Observe a abertura do menu hambúrguer, o comportamento reativo do **LAB03 Breakpoint Monitor** e a adaptação fluida dos cartões sem overflow horizontal.

---

## ⚖️ Licença & Aviso Legal

Este projeto foi desenvolvido estritamente para **fins acadêmicos e educacionais**.  
Todas as marcas registradas, nomes e referências a *Grand Theft Auto*, *GTA VI* e *Vice City* pertencem à **Rockstar Games** e **Take-Two Interactive Software, Inc.**. O projeto não possui fins lucrativos nem afiliação com os detentores dos direitos autorais.
