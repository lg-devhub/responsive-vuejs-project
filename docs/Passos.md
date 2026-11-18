# Passos de Implementação — Vice City Responsive Guide (GTA VI)

Este documento contém o detalhamento passo a passo do desenvolvimento da aplicação educacional **Vice City Responsive Guide**, em conformidade com as diretrizes do `AGENTS.md` e os requisitos do `docs/ERS.md`.

---

## REGRA GERAL DE REGISTRO DE PROGRESSO (MANDATÓRIA)

> **ATENÇÃO A TODOS OS AGENTES E DESENVOLVEDORES:**  
> Ao concluir a execução de **qualquer um dos passos abaixo**, você **DEVE** obrigatoriamente registrar um log detalhado no arquivo `LastProgress.md` (localizado na raiz do projeto).  
> **É EXPRESSAMENTE PROIBIDO APAGAR, SUBSTITUIR OU TRUNCAR O CONTEÚDO DE `LastProgress.md`**.  
> Qualquer atualização deve ser feita **exclusivamente por acréscimo (APPEND)** ao final do arquivo, preservando todo o histórico anterior para que os próximos agentes tenham rastreabilidade completa.

---

## Passo 1 — Dependências, Limpeza de Pacotes e Tokens Visuais Vice City

### Descrição e Objetivos:
Configurar a base estrutural do projeto com as bibliotecas corretas, sanear o `package.json`, definir os design tokens oficiais em `:root` com a identidade visual de Grand Theft Auto VI / Vice City e estabelecer o reset global estritamente **Mobile-First**.

### Atividades Detalhadas:
1. **Gerenciamento de Pacotes:**
   - Instalar o `pinia` (versão compatível com Vue 3) para atender ao requisito RF09.
   - Remover a dependência indevida `"router": "^2.3.0"` do `package.json`.
   - Inicializar e registrar a instância do Pinia em `src/main.js`.
2. **Design Tokens & Variáveis CSS (`src/assets/styles/tokens.css` ou `src/assets/main.css`):**
   - Configurar paleta oficial inspirada em Vice City / GTA VI:
     - Fundo principal: `#100d1c` (dark violet/noturno).
     - Superfícies/Cards: `#1c1530` e `#2a2042`.
     - Cores de destaque neon: Primária `#ff4fa3` (Pink Neon), Secundária `#a855f7` (Sunset Purple), Acento `#36d9e8` (Cyan Neon).
     - Cores de texto com contraste WCAG AA: `#fff5fa` (principal) e `#b9adc9` (secundário/mutado).
     - Gradientes temáticos: `linear-gradient(135deg, #ff4fa3, #a855f7, #36d9e8)`.
   - Tipografia e unidades relativas:
     - Fontes: `Poppins` (títulos) e `Inter` (corpo e códigos).
     - Escala tipográfica e de espaçamentos exclusivamente em `rem`.
3. **Reset e Eliminação de Larguras Fixas:**
   - Remover imediatamente qualquer regra estática como `width: 1024px` dos contêineres globais.
   - Definir contêineres fluidos mobile-first com `width: 100%`, `max-width: ...` e media queries `@media (min-width: ...)`.

### Critérios de Validação:
- `npm run build` executa sem erros.
- Não existem mais larguras fixas em pixels nos contêineres principais.
- Pinia devidamente injetado na aplicação Vue.

> **REGISTRO OBRIGATÓRIO DESTE PASSO:**  
> Ao concluir este passo, registre no final de `LastProgress.md` (via append) o que foi executado, os pacotes alterados e os arquivos de estilo criados/modificados. Não apague nada do arquivo.

---

## Passo 2 — Estrutura de Layout e Navegação Responsiva (Mobile-First)

### Descrição e Objetivos:
Implementar a estrutura mestre da aplicação, incluindo o menu de navegação responsivo (RF02 e RF03) com gaveta/hambúrguer para dispositivos móveis, rodapé semântico e o indicador fixo Breakpoint Monitor (LAB03).

### Atividades Detalhadas:
1. **Componente de Navegação (`src/components/layout/AppNavbar.vue`):**
   - Implementar versão desktop com links diretos estilizados no padrão neon de Vice City.
   - Implementar botão hambúrguer para telas mobile (`aria-label`, acessível via teclado, alternância de ícone aberto/fechado).
   - Implementar gaveta móvel (*mobile drawer/modal*) que se abre fluidamente ao clicar no hambúrguer e fecha ao selecionar um link ou ao redimensionar a tela.
   - Garantir que o menu não transborde a tela e bloqueie rolagem lateral indevida.
2. **Rodapé da Aplicação (`src/components/layout/AppFooter.vue`):**
   - Criar rodapé responsivo com créditos acadêmicos, aviso de projeto independente (sem afiliação oficial à Rockstar Games), links rápidos e fontes utilizadas.
3. **Store do Viewport & Breakpoint Monitor (`src/stores/viewportStore.js` e `src/components/layout/BreakpointMonitor.vue`):**
   - Criar store Pinia para escutar eventos de `resize` da janela do navegador de forma otimizada.
   - Desenvolver o componente fixo do **LAB03 (Breakpoint Monitor)** flutuando discretamente na tela, exibindo a largura atual (`window.innerWidth`), o breakpoint ativo (Mobile, Tablet, Desktop) e estado da aplicação, com opção de minimizar para não atrapalhar a leitura.
4. **Atualização do `src/App.vue`:**
   - Integrar `AppNavbar`, `RouterView`, `AppFooter` e `BreakpointMonitor` em um layout responsivo flexbox/grid.

### Critérios de Validação:
- Testar o menu mobile nos tamanhos 320px, 375px e 425px garantindo abertura, fechamento e acessibilidade.
- Redimensionamento de tela atualiza os valores do Breakpoint Monitor instantaneamente.
- Ausência total de rolagem horizontal em qualquer resolução.

> **REGISTRO OBRIGATÓRIO DESTE PASSO:**  
> Ao concluir este passo, registre no final de `LastProgress.md` (via append) os detalhes dos componentes de layout criados, funcionamento do menu mobile e testes responsivos realizados. Não apague nada do arquivo.

---

## Passo 3 — Páginas Educacionais e Perguntas-Guia (Seções 1 a 5)

### Descrição e Objetivos:
Refinar e implementar com rigor técnico e visual as cinco seções educacionais obrigatórias exigidas pelo ERS, garantindo a presença das 4 partes obrigatórias em cada uma (explicação curta, código comentado, pergunta-guia respondida e fontes).

### Atividades Detalhadas:
1. **Componente Padronizado de Conteúdo (`src/components/content/SectionBlock.vue`):**
   - Atualizar a estilização do bloco com estética neon, cards com bordas sutis, tags temáticas e caixas de destaque para perguntas e respostas.
2. **Seção 1 — Welcome to Vice City: Introdução à Responsividade (`ResponsividadeImportaView.vue`):**
   - Conceito de responsividade, importância da adaptação, diferenças entre resoluções, meta tag viewport e media queries com `min-width`.
   - Pergunta-guia e resposta detalhada sobre por que um site sem a viewport tag é miniaturizado nos navegadores móveis (tela virtual de 980px).
   - Fontes e links oficiais (MDN e web.dev).
3. **Seção 2 — CSS Units: Unidades CSS (`UnidadesCssView.vue`):**
   - Unidades absolutas vs. relativas: px, rem, em, %, fr, vw, vh, dvh e ch. Aplicações e acessibilidade.
   - Pergunta-guia e resposta sobre o impacto do rem nas preferências de tamanho de fonte do usuário versus a fixidez do px.
   - Fontes oficiais.
4. **Seção 3 — City Layout: Flexbox e Grid (`FlexboxGridView.vue`):**
   - 1D vs 2D, justify-content, align-items, flex-wrap, gap, e `repeat(auto-fit, minmax())`.
   - Pergunta-guia e resposta matemática detalhada sobre o surgimento da 2ª coluna aos 464px (2 cards de 14rem/224px + gap de 1rem/16px).
   - Fontes oficiais.
5. **Seção 4 — Visual Experience: Imagens Responsivas (`ImagensResponsivasView.vue`):**
   - max-width: 100%, height: auto, atributos width e height no HTML para prevenir CLS, loading="lazy", aspect-ratio, object-fit e srcset.
   - Pergunta-guia e resposta sobre deslocamento de layout (CLS - Cumulative Layout Shift).
   - Fontes oficiais.
6. **Seção 5 — Developer's Garage: Boas Práticas em Vue (`BoasPraticasVueView.vue`):**
   - Estrutura de pastas, convenções PascalCase/kebab-case, props tipadas, eventos emitidos, `:key` no `v-for`, design tokens em CSS, Core Web Vitals (LCP, INP, CLS) e rotas lazy-loaded.
   - Pergunta-guia e resposta sobre o risco do v-for sem :key ou com índices ao remover elementos de listas com campos de formulário.
   - Fontes oficiais.

### Critérios de Validação:
- Todas as 5 seções contêm os 4 tópicos mandatórios.
- Código formatado e de fácil leitura, com sintaxe destacada.
- Links externos funcionando e estilizados.

> **REGISTRO OBRIGATÓRIO DESTE PASSO:**  
> Ao concluir este passo, registre no final de `LastProgress.md` (via append) a implementação de cada seção, verificando a conformidade com as perguntas-guia do ERS. Não apague nada do arquivo.

---

## Passo 4 — Laboratórios Interativos e Gerenciamento Global via Pinia (LAB01 e LAB02)

### Descrição e Objetivos:
Implementar os laboratórios práticos interativos em componentes modulares reutilizáveis, gerenciados pela store do Pinia `labsStore.js`, garantindo cálculos matemáticos rigorosos e visualização em tempo real (RF08, RF09 e RF12).

### Atividades Detalhadas:
1. **Store dos Laboratórios (`src/stores/labsStore.js`):**
   - Armazenar o estado reativo dos laboratórios: largura do contêiner para o LAB01, valor e unidade para o LAB02.
   - Métodos para resetar parâmetros para os valores padrão.
2. **LAB01 — Responsive Container (`src/components/labs/ResponsiveContainerLab.vue`):**
   - Controle deslizante funcional (`range input`) permitindo ao usuário variar a largura de um contêiner (ex: 300px a 900px).
   - Demonstração em tempo real de cards configurados com CSS Grid `repeat(auto-fit, minmax(14rem, 1fr))` e `gap: 1rem`.
   - Indicador visual e badge informando exatamente quando a transição entre 1, 2 e 3 colunas ocorre (destacando o limiar de 464px).
3. **LAB02 — CSS Unit Converter (`src/components/labs/UnitConverterLab.vue`):**
   - Campos interativos para digitar valores e escolher unidades (`rem`, `em`, `%`, `vw`, `ch`).
   - Cálculo em pixels dinâmico e matematicamente preciso.
   - Explicação clara do elemento de referência de cada unidade (ex: base 16px da raiz do documento para `rem`, tamanho de fonte do pai para `em`, largura do contêiner para `%`).
4. **Integração na View dos Laboratórios (`src/views/LaboratoriosView.vue`):**
   - Organizar a página de laboratórios com apresentação imersiva Vice City, integrando os laboratórios modulares com abas ou cards dedicados e feedback visual imediato.

### Critérios de Validação:
- Slider atualiza a largura sem travamentos.
- Cálculos matemáticos conferidos e livres de ambiguidades.
- Estado sincronizado via Pinia.

> **REGISTRO OBRIGATÓRIO DESTE PASSO:**  
> Ao concluir este passo, registre no final de `LastProgress.md` (via append) os laboratórios desenvolvidos, testes de cálculo realizados e a integração com o Pinia. Não apague nada do arquivo.

---

## Passo 5 — Integração com API Externa Dinâmica (Boletim Meteorológico de Vice City)

### Descrição e Objetivos:
Integrar o consumo de uma API externa real (RF10), pública e compatível com ambiente de produção sem necessidade de chaves sensíveis, tratando todos os estados de requisição (carregamento, sucesso, erro e recarregamento manual).

### Atividades Detalhadas:
1. **Serviço de API (`src/services/api.js`):**
   - Utilizar a **Open-Meteo Weather API** com as coordenadas geográficas de Miami (inspiração oficial de Vice City: 25.7617° N, -80.1918° W).
   - Implementar método para buscar temperatura atual, umidade relativa, velocidade do vento, código meteorológico e status dia/noite (pôr do sol de Vice City).
   - Tratamento de timeout e retorno padronizado de erros.
2. **Componente Dinâmico (`src/components/dynamic/ViceCityConditions.vue`):**
   - Apresentar o "Boletim Meteorológico e Condições ao Vivo de Vice City".
   - Estado de *loading* com animação de esqueleto/pulso neon.
   - Exibição de dados dinâmicos em cards responsivos com CSS Grid.
   - Estado de erro caso falte internet ou a API falhe, com botão "Tentar Novamente".
   - Botão para atualizar dados manualmente e indicação do horário da última medição.
3. **Integração na Aplicação:**
   - Incluir o componente na `HomeView.vue` e/ou na página de laboratórios/seções como demonstração de dados reativos e consumo assíncrono.

### Critérios de Validação:
- Requisição real ao endpoint da Open-Meteo confirmada no Network do navegador.
- Estados de loading, sucesso e falha visíveis e estilizados conforme a temática.
- Nenhuma chave de API exposta.

> **REGISTRO OBRIGATÓRIO DESTE PASSO:**  
> Ao concluir este passo, registre no final de `LastProgress.md` (via append) a implementação do serviço, componente de API, testes de rede e tratamento de falhas. Não apague nada do arquivo.

---

## Passo 6 — Página Inicial Imersiva e Desafio Final (Final Mission)

### Descrição e Objetivos:
Finalizar a `HomeView.vue` com ambientação temática de GTA VI / Vice City e consolidar a página de desafio `DesafioView.vue` (RF11), exigindo conhecimentos dos cálculos do guia para ser concluído com sucesso.

### Atividades Detalhadas:
1. **Página Inicial (`src/views/HomeView.vue`):**
   - Hero banner com visual neon retro-futurista de Vice City.
   - Grid temático de cartões para cada uma das seções e laboratórios com indicadores de progresso.
   - Seção de introdução pedagógica explicando a metodologia de aprendizagem do guia.
2. **Página de Desafio (`src/views/DesafioView.vue`):**
   - Desafio temático fundamentado no ERS: cálculo matemático da quebra de colunas no CSS Grid (`minmax(12rem, 1fr)` + `gap: 1rem`).
   - Campo interativo para inserção da resposta pelo usuário.
   - Validação reativa instantânea: feedback de sucesso para 608px (3 x 192px + 2 x 16px) com explicação passo a passo, ou mensagens de dica progressiva caso a resposta seja diferente.
   - Conexão do desafio com os conceitos explorados na Seção 3 e no LAB01.

### Critérios de Validação:
- Resolução e validação do desafio em conformidade matemática estrita.
- Experiência do usuário envolvente e coerente com a narrativa de GTA VI.

> **REGISTRO OBRIGATÓRIO DESTE PASSO:**  
> Ao concluir este passo, registre no final de `LastProgress.md` (via append) os detalhes da HomeView e DesafioView, incluindo feedbacks do usuário e validações. Não apague nada do arquivo.

---

## Passo 7 — Validação Mobile-First, Acessibilidade, Otimização e Build de Produção

### Descrição e Objetivos:
Realizar a auditoria técnica final de qualidade, responsividade, acessibilidade e desempenho, validando todos os critérios de aceitação do ERS.

### Atividades Detalhadas:
1. **Auditoria de Responsividade:**
   - Testar em resoluções de 320px (iPhone SE antigo), 375px/390px (smartphones comuns), 768px (tablets), 1024px (laptops) e 1440px (desktops).
   - Confirmar a ausência absoluta de overflow horizontal ou elementos cortados.
2. **Auditoria de Acessibilidade:**
   - Verificar taxas de contraste de cores de texto neon sobre superfícies escuras.
   - Garantir tags alt descritivas em imagens, labels em inputs de formulário e foco navegável por teclado.
3. **Build e Otimização:**
   - Executar `npm run build` e inspecionar o tamanho dos chunks gerados.
   - Validar que o lazy loading das rotas funciona sem recargas desnecessárias.
4. **Atualização da Documentação (`README.md`):**
   - Atualizar o `README.md` com instruções de execução, arquitetura, tecnologias empregadas, screenshots da aplicação e informações acadêmicas.

### Critérios de Validação:
- Build final de produção concluído com código de saída 0 sem warnings críticos.
- Todos os 15 critérios de aceitação do ERS verificados e satisfeitos.

> **REGISTRO OBRIGATÓRIO DESTE PASSO:**  
> Ao concluir este passo, registre no final de `LastProgress.md` (via append) os resultados dos testes de responsividade, auditoria de build e resumo final do projeto. Não apague nada do arquivo.
