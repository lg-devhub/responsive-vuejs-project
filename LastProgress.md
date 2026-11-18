# LastProgress.md — Registro Contínuo de Progresso

> **AVISO IMPORTANTE A TODOS OS AGENTES E DESENVOLVEDORES:**  
> **É EXPRESSAMENTE PROIBIDO APAGAR, SUBSTITUIR OU TRUNCAR QUALQUER CONTEÚDO DESTE ARQUIVO.**  
> Toda e qualquer atualização DEVE ser realizada **exclusivamente por acréscimo (APPEND)** ao final deste documento.  
> Cada entrada deve registrar a data/hora, a etapa executada, os arquivos criados ou modificados, os testes realizados e as observações relevantes para o próximo agente.

---

## [2026-11-18] Etapa Preliminar: Análise de Requisitos, Diagnóstico e Planejamento

### O que foi feito:
1. **Leitura e Análise Integral dos Documentos:**
   - Leitura completa de `AGENTS.md` e `docs/ERS.md`.
   - Mapeamento de todos os Requisitos Funcionais (RF01 a RF14) e Não Funcionais (RNF01 a RNF09).
   - Identificação dos critérios de aceitação e diretrizes de identidade visual do tema Grand Theft Auto VI / Vice City.
2. **Diagnóstico do Ambiente Existente:**
   - Verificada a estrutura atual do projeto (Vue 3 + Vite).
   - Identificada a ausência da biblioteca `pinia` (obrigatória para o RF09) e a presença de dependência indesejada (`"router": "^2.3.0"`).
   - Identificadas quebras críticas de responsividade no código legado existente (`width: 1024px` fixo em múltiplos arquivos).
   - Identificada a necessidade de reestilização completa para a temática Vice City (fundo escuro, gradientes sunset, cores neon) e criação do menu mobile (RF03).
   - Identificada a necessidade de um indicador fixo para o Breakpoint Monitor (LAB03) e do consumo de API externa real (RF10).
3. **Criação da Documentação Operacional:**
   - Criado o arquivo `docs/Passos.md` contendo o detalhamento passo a passo das 7 etapas de implementação, com a regra explícita de atualização contínua e append no `LastProgress.md` em cada uma delas.
   - Criado este arquivo `LastProgress.md` na raiz do projeto como repositório imutável e cumulativo de progresso.

### Arquivos Criados / Modificados:
- `docs/Passos.md` (Criado)
- `LastProgress.md` (Criado)

### Próximo Passo a Ser Executado:
- **Passo 1 — Dependências, Limpeza de Pacotes e Tokens Visuais Vice City** (conforme detalhado em `docs/Passos.md`).


---

## [2026-11-18] Execução do Passo 1: Dependências, Limpeza de Pacotes e Tokens Visuais Vice City

### O que foi feito:
1. **Gerenciamento e Instalação de Pacotes:**
   - Confirmada a remoção do pacote indevido `"router": "^2.3.0"`.
   - Instalado o `pinia` (versão 4.0.3, compatível com Vue 3) no `package.json`.
   - Registrado e instanciado o Pinia em `src/main.js` (`app.use(pinia)`).
2. **Criação dos Design Tokens Oficiais (Vice City / GTA VI):**
   - Criado o arquivo `src/assets/styles/tokens.css` com a paleta oficial:
     - Fundo escuro noturno (`--color-bg: #100d1c`).
     - Superfícies e cartões (`--color-surface: #1c1530`, `--color-surface-light: #2a2042`).
     - Acentos neon vibrantes (`--color-primary: #ff4fa3`, `--color-secondary: #a855f7`, `--color-accent: #36d9e8`).
     - Cores de texto acessíveis com contraste WCAG AA (`--color-text-primary: #fff5fa`, `--color-text-secondary: #d8cfe5`).
     - Gradientes temáticos (pôr do sol de Vice City / Sunset).
     - Escala tipográfica e espaçamentos estritamente baseados em `rem`.
3. **Reset Mobile-First e Eliminação de Larguras Fixas:**
   - Reescrito o `src/assets/main.css` com reset moderno, estilização dos blocos de código com contraste neon, cartões de perguntas-guia temáticos e botões estilizados.
   - Eliminadas as regras estáticas de `width: 1024px` em `App.vue`, `AppNavbar.vue` e `main.css`, substituindo-as por contêineres fluidos mobile-first (`width: 100%`, `max-width: 76rem`).
   - Adicionado no rodapé (`App.vue`) o aviso formal de projeto acadêmico independente sem vínculo com a Rockstar Games.
4. **Verificação Técnica:**
   - Executado `npm run build` com sucesso (52 módulos transformados, 0 erros).

### Arquivos Criados / Modificados:
- `package.json` (Adicionado `pinia`)
- `src/main.js` (Configurado `createPinia()`)
- `src/assets/styles/tokens.css` (Criado com os Design Tokens de GTA VI / Vice City)
- `src/assets/main.css` (Import de tokens, reset mobile-first, estilos temáticos)
- `src/App.vue` (Removido 1024px fixo, rodapé responsivo temático)
- `src/components/AppNavbar.vue` (Removido 1024px fixo do contêiner)
- `LastProgress.md` (Atualizado via append)

### Próximo Passo a Ser Executado:
- **Passo 2 — Estrutura de Layout e Navegação Responsiva (Mobile-First)** (Menu hambúrguer com gaveta móvel acessível, rodapé modular e LAB03 Breakpoint Monitor fixo).


---

## [2026-11-18] Execução do Passo 2: Estrutura de Layout e Navegação Responsiva (Mobile-First)

### O que foi feito:
1. **Store do Viewport com Pinia (`src/stores/viewportStore.js`):**
   - Criada store reativa responsável por escutar o evento `resize` da janela do navegador com listener passivo.
   - Detecta e expõe reativamente a largura (`width`), altura (`height`), e os breakpoints ativos categorizados:
     - Mobile: `< 640px` (SM)
     - Tablet: `640px - 1023px` (MD)
     - Desktop: `≥ 1024px` (LG/XL)
   - Controle do estado de minimização do indicador flutuante.
2. **LAB03 — Breakpoint Monitor Fixo (`src/components/layout/BreakpointMonitor.vue`):**
   - Implementado componente flutuante fixo no canto inferior direito da tela com visual neon de Vice City.
   - Exibe em tempo real a largura da janela em pixels e o badge temático com a descrição do breakpoint ativo.
   - Suporta minimização para evitar sobreposição em conteúdos na leitura e redimensiona fluidamente em telas compactas.
3. **Navegação Responsiva e Menu Mobile (`src/components/layout/AppNavbar.vue`):**
   - Atendidos integralmente os requisitos RF02 e RF03.
   - Em telas desktop (≥1024px): menu horizontal limpo com links estilizados, badge temático e indicação de rota ativa.
   - Em telas menores (<1024px): botão hambúrguer acessível com animação para 'X', gaveta móvel (*drawer*) com transição suave, backdrop escuro com blur, fechamento automático ao navegar, ao redimensionar ou ao pressionar `Escape`, e bloqueio de rolagem do body quando aberto.
   - Removido o arquivo legado duplicado `src/components/AppNavbar.vue`.
4. **Rodapé Semântico Modular (`src/components/layout/AppFooter.vue`):**
   - Implementado com layout grid responsivo (1 coluna em mobile, 3 colunas em tablet/desktop).
   - Apresenta resumo pedagógico, links diretos para as seções e laboratórios, stack tecnológica (Vue 3, Vite, Pinia, CSS3) e disclaimer formal de projeto independente não oficial.
5. **Integração no Layout Principal (`src/App.vue`):**
   - Integrados `AppNavbar`, `RouterView`, `AppFooter` e `BreakpointMonitor` em estrutura flexbox mobile-first com `min-height: 100vh` e contêineres fluidos.
6. **Verificação Técnica e Build:**
   - Executado `npm run build` com sucesso (57 módulos transformados, 0 erros).

### Arquivos Criados / Modificados / Removidos:
- `src/stores/viewportStore.js` (Criado)
- `src/components/layout/BreakpointMonitor.vue` (Criado — LAB03)
- `src/components/layout/AppNavbar.vue` (Criado com menu mobile e hambúrguer animado)
- `src/components/layout/AppFooter.vue` (Criado com layout responsivo e aviso de independência)
- `src/App.vue` (Atualizado com a nova arquitetura de componentes de layout)
- `src/components/AppNavbar.vue` (Removido arquivo legado redundante)
- `LastProgress.md` (Atualizado via append)

### Próximo Passo a Ser Executado:
- **Passo 3 — Páginas Educacionais e Perguntas-Guia (Seções 1 a 5)** (Refinar `SectionBlock.vue`, códigos comentados e respostas fundamentadas de cada uma das 5 seções do ERS).


---

## [2026-11-18] Execução do Passo 3: Páginas Educacionais e Perguntas-Guia (Seções 1 a 5)

### O que foi feito:
1. **Refatoração Visual e Estrutural do `SectionBlock.vue` (`src/components/SectionBlock.vue`):**
   - Atualizado com design temático de Vice City: linha superior com gradiente sunset, badges neon para módulo e edição, cartões com bordas sutis e caixas de perguntas e respostas destacadas.
   - Adicionada navegação sequencial no rodapé de cada módulo com links dinâmicos para a seção anterior e próxima seção, guiando os estudantes pelo curso.
2. **Seção 1 — Welcome to Vice City: Introdução à Responsividade (`src/views/ResponsividadeImportaView.vue`):**
   - Conceituação clara de design responsivo, grids fluidos e media queries mobile-first.
   - Código comentado demonstrando a meta tag viewport no `<head>` e breakpoints com `min-width` em `rem`.
   - Pergunta-guia respondida em detalhes: explicação da tela virtual de 980px e zoom-out legado dos navegadores móveis na ausência da viewport meta tag.
   - Fontes oficiais documentadas (MDN, web.dev e W3C).
3. **Seção 2 — CSS Units: Unidades CSS (`src/views/UnidadesCssView.vue`):**
   - Comparativo entre unidades absolutas (`px`) e relativas (`rem`, `em`, `%`, `fr`, `vw`, `vh`, `dvh`, `ch`).
   - Código comentado demonstrando boas práticas de tipografia acessível e uso de `dvh` para evitar cortes por barras móveis de navegadores.
   - Pergunta-guia respondida: detalhamento da mecânica do `rem` atrelada à raiz (`html`) e respeito às preferências de acessibilidade de pessoas com baixa visão versus a rigidez estática do `px`.
   - Fontes oficiais documentadas (MDN, web.dev e W3C).
4. **Seção 3 — City Layout: Flexbox e Grid (`src/views/FlexboxGridView.vue`):**
   - Distinção fundamental entre layouts 1D (Flexbox) e 2D (Grid), cobrindo `justify-content`, `align-items`, `flex-wrap`, `gap` e `repeat(auto-fit, minmax())`.
   - Código comentado com exemplos práticos de navbar flexível e galeria auto-ajustável.
   - Pergunta-guia respondida com demonstração matemática passo a passo: `14rem (224px) + 1rem (16px) + 14rem (224px) = 464px` para surgimento da 2ª coluna.
   - Demonstração visual estilizada em dark theme (eliminados resíduos de estilo claro).
   - Fontes oficiais documentadas (CSS-Tricks e MDN).
5. **Seção 4 — Visual Experience: Imagens Responsivas (`src/views/ImagensResponsivasView.vue`):**
   - 5 regras essenciais: `max-width: 100%`, `height: auto`, atributos explícitos `width` e `height`, uso consciente de `loading="lazy"` (com advertência sobre a imagem LCP), `object-fit: cover` e `srcset`.
   - Pergunta-guia respondida: explicação do recálculo de layout (*reflow*) e da métrica Core Web Vitals **CLS (Cumulative Layout Shift)** quando a proporção não é pré-alocada pelo navegador.
   - Fontes oficiais documentadas (web.dev e MDN).
6. **Seção 5 — Developer's Garage: Boas Práticas em Vue (`src/views/BoasPraticasVueView.vue`):**
   - 7 pilares explicados: organização em pastas, nomes Multi-word, props tipadas, eventos emitidos, obrigatoriedade de `:key` único no `v-for`, design tokens em `:root`, Core Web Vitals (LCP, INP, CLS) e rotas sob demanda (*lazy loading*).
   - Pergunta-guia respondida: anomalia do Virtual DOM com heurística *in-place* sem `:key`, causando reaproveitamento incorreto de nós do DOM e dados digitados em `<input>`.
   - Fontes oficiais documentadas (Vue.js Oficial e web.dev).
7. **Verificação Técnica e Build:**
   - Executado `npm run build` com sucesso (62 módulos transformados, 0 erros).

### Arquivos Modificados:
- `src/components/SectionBlock.vue` (Design Vice City e navegação sequencial)
- `src/views/ResponsividadeImportaView.vue` (Seção 1 refinada)
- `src/views/UnidadesCssView.vue` (Seção 2 refinada)
- `src/views/FlexboxGridView.vue` (Seção 3 refinada e cálculo 464px em dark theme)
- `src/views/ImagensResponsivasView.vue` (Seção 4 refinada com alertas LCP/CLS)
- `src/views/BoasPraticasVueView.vue` (Seção 5 refinada com 7 pilares Vue)
- `LastProgress.md` (Atualizado via append)

### Próximo Passo a Ser Executado:
- **Passo 4 — Laboratórios Interativos e Gerenciamento Global via Pinia (LAB01 e LAB02)** (Store `labsStore.js`, componentes `ResponsiveContainerLab.vue` e `UnitConverterLab.vue`, e centralização em `LaboratoriosView.vue`).
