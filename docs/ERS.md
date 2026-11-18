# ERS — ESPECIFICAÇÃO DE REQUISITOS DE SOFTWARE
## Projeto: Vice City Responsive Guide — GTA VI

**Versão:** 1.0  
**Tipo de projeto:** Aplicação Web Educacional  
**Tema:** Grand Theft Auto VI (GTA 6)  
**Tecnologias principais:** Vue 3, Vite, JavaScript, CSS3 e Pinia  
**Desenvolvimento:** Trabalho acadêmico em dupla

---

# 1. Introdução

## 1.1. Propósito

Este documento tem como objetivo especificar os requisitos funcionais e não funcionais do projeto Vice City Responsive Guide, uma aplicação web educacional desenvolvida com Vue 3, cujo propósito é apresentar conceitos, técnicas e boas práticas de desenvolvimento de interfaces responsivas.

A aplicação utilizará a identidade visual inspirada no universo de Grand Theft Auto VI, especialmente na ambientação de Vice City, combinando elementos urbanos, tropicais, cores neon e referências visuais ao jogo para proporcionar uma experiência interativa e atrativa.

O sistema deverá funcionar como um guia de aprendizagem, permitindo que estudantes compreendam conceitos de responsividade por meio de explicações, exemplos de código comentados e laboratórios interativos.

## 1.2. Escopo do projeto

O Vice City Responsive Guide será uma aplicação web responsiva, acessível por computadores, tablets e smartphones.

O sistema apresentará conteúdos educacionais divididos em seções, cada uma dedicada a um conceito importante de responsividade e desenvolvimento frontend.

A aplicação deverá disponibilizar:

- Página inicial com apresentação do projeto.
- Menu de navegação entre as seções.
- Conteúdo educacional com explicações e exemplos de código.
- Laboratórios interativos para experimentação dos conceitos.
- Integração com gerenciamento de estado utilizando Pinia.
- Consumo de API para apresentação de informações dinâmicas.
- Página final com um desafio de aprendizagem.
- Layout adaptável a diferentes resoluções de tela.

## 1.3. Público-alvo

O sistema será direcionado principalmente a:

- Estudantes de desenvolvimento web.
- Iniciantes em Vue.js e CSS.
- Desenvolvedores interessados em responsividade.
- Pessoas que desejam compreender conceitos de interfaces adaptáveis.

## 1.4. Referências

- Documento acadêmico: Projeto — Responsividade!
- Documentação oficial do Vue.js.
- Documentação oficial do Vite.
- Documentação do Vue Router.
- Documentação do Pinia.
- Documentação MDN Web Docs (HTML e CSS).
- Documentação web.dev (Core Web Vitals).

---

# 2. Descrição geral do sistema

## 2.1. Perspectiva do produto

O sistema será uma aplicação independente, executada diretamente no navegador, sem necessidade de instalação por parte do usuário.

A interface será inspirada na identidade visual de GTA VI, utilizando elementos gráficos que remetam à ambientação de Vice City, como paisagens tropicais, iluminação neon, tons de rosa e roxo, elementos urbanos e referências à estética dos materiais promocionais do jogo.

A identidade visual deverá complementar o conteúdo educacional, sem comprometer a legibilidade, a acessibilidade ou a usabilidade.

## 2.2. Características dos usuários

O usuário não precisará realizar cadastro ou autenticação para acessar o conteúdo.

As principais interações serão realizadas por meio da navegação entre páginas, leitura de conteúdo, visualização de exemplos e utilização dos laboratórios interativos.

## 2.3. Ambiente operacional

O sistema deverá funcionar nos seguintes ambientes:

- Google Chrome.
- Microsoft Edge.
- Mozilla Firefox.
- Opera.
- Navegadores modernos para dispositivos Android e iOS.

A aplicação deverá ser publicada em um serviço de hospedagem, como Vercel, Netlify ou GitHub Pages.

## 2.4. Restrições técnicas

- O frontend deverá utilizar Vue 3 com Vite.
- O projeto deverá ser organizado em componentes reutilizáveis.
- A navegação deverá utilizar Vue Router.
- O gerenciamento de estado deverá utilizar Pinia.
- O desenvolvimento visual deverá utilizar CSS3.
- A aplicação deverá adotar a abordagem mobile-first.
- As media queries deverão utilizar min-width.
- Cores e espaçamentos deverão ser organizados em variáveis CSS dentro de :root.
- Fontes e espaçamentos deverão priorizar unidades relativas, especialmente rem.
- Não deverá existir rolagem horizontal indevida.
- O menu deverá ser adaptado para dispositivos móveis.

---

# 3. Requisitos funcionais

Os requisitos funcionais descrevem as funcionalidades que o sistema deverá disponibilizar aos usuários.

**RF01 — Página inicial**

O sistema deverá apresentar uma página inicial contendo o nome do projeto, sua proposta educacional e uma identidade visual inspirada em GTA VI.

**RF02 — Navegação entre seções**

O sistema deverá permitir que o usuário navegue entre as diferentes seções do guia por meio de um menu interativo.

**RF03 — Navegação responsiva**

Em dispositivos com telas menores, o menu de navegação deverá ser substituído por um botão que permita abrir e fechar as opções de navegação.

**RF04 — Conteúdo educacional**

Cada seção deverá apresentar uma explicação objetiva sobre o conceito abordado, utilizando linguagem acessível para estudantes iniciantes.

**RF05 — Exemplos de código**

O sistema deverá disponibilizar exemplos de código comentados, demonstrando a aplicação prática dos conceitos apresentados.

**RF06 — Perguntas-guia**

Cada seção deverá apresentar e responder à respectiva pergunta-guia definida no documento acadêmico.

**RF07 — Referências bibliográficas**

Cada seção deverá apresentar as fontes utilizadas na elaboração do conteúdo, preferencialmente com links para documentações oficiais.

**RF08 — Laboratórios interativos**

O sistema deverá disponibilizar pelo menos três laboratórios interativos que permitam ao usuário modificar parâmetros e visualizar os resultados em tempo real.

**RF09 — Gerenciamento de estado**

O sistema deverá utilizar Pinia para gerenciar estados compartilhados entre componentes, como preferências de interface e configurações dos laboratórios.

**RF10 — Consumo de API**

O sistema deverá consumir uma API para apresentar informações dinâmicas em pelo menos um componente da aplicação.

**RF11 — Página de desafio**

O sistema deverá apresentar uma página final denominada "Desafio", contendo uma pergunta elaborada com base nos conteúdos e laboratórios disponíveis.

**RF12 — Feedback de interação**

O sistema deverá fornecer feedback visual ao usuário durante a utilização dos laboratórios, indicando as alterações realizadas e seus respectivos resultados.

**RF13 — Adaptação de imagens**

As imagens utilizadas na aplicação deverão se adaptar às dimensões dos dispositivos, evitando distorções e transbordamentos.

**RF14 — Carregamento otimizado**

O sistema deverá utilizar técnicas de otimização de carregamento de imagens e recursos, incluindo carregamento sob demanda quando apropriado.

---

# 4. Organização do conteúdo educacional

A aplicação deverá apresentar cinco seções de conteúdo técnico, além da página final de desafio.

## 4.1. Seção 1 — Welcome to Vice City: Introdução à Responsividade

Conteúdo:
- Conceito de responsividade.
- Importância da adaptação de interfaces.
- Diferenças entre dispositivos e resoluções.
- Media queries.
- Meta tag viewport.

Pergunta-guia:

Um site possui media queries corretamente configuradas, mas não apresenta a meta tag viewport. Por que ele aparece como uma versão reduzida da página de computador em dispositivos móveis?

## 4.2. Seção 2 — CSS Units: Unidades CSS

Conteúdo:
- Unidades absolutas e relativas.
- px, rem e em.
- Porcentagens.
- fr.
- vw e vh.
- dvh e ch.
- Aplicações práticas de cada unidade.

Pergunta-guia:

Por que textos definidos em rem podem aumentar quando o usuário modifica o tamanho da fonte do navegador, enquanto textos definidos em px podem permanecer visualmente inalterados?

## 4.3. Seção 3 — City Layout: Flexbox e Grid

Conteúdo:
- Diferenças entre Flexbox e Grid.
- Layouts unidimensionais e bidimensionais.
- justify-content.
- align-items.
- flex-wrap.
- gap.
- repeat(auto-fit, minmax()).

Pergunta-guia:

Considerando um grid com repeat(auto-fit, minmax(14rem, 1fr)) e gap de 1rem, a partir de qual largura o contêiner consegue apresentar duas colunas, considerando 1rem = 16px?

## 4.4. Seção 4 — Visual Experience: Imagens Responsivas

Conteúdo:
- max-width: 100%.
- height: auto.
- Atributos width e height.
- loading="lazy".
- aspect-ratio.
- object-fit.
- srcset.

Pergunta-guia:

Por que uma imagem sem os atributos width e height pode deslocar o conteúdo da página durante seu carregamento? Qual métrica do Google mede esse comportamento?

## 4.5. Seção 5 — Developer's Garage: Boas Práticas em Vue

Conteúdo:
- Organização de pastas.
- Componentização.
- Nomenclatura de componentes.
- Props tipadas e eventos.
- Utilização de :key no v-for.
- Variáveis CSS e design tokens.
- Core Web Vitals: LCP, INP e CLS.
- Carregamento de rotas sob demanda.

Pergunta-guia:

O que pode acontecer quando uma lista renderizada com v-for não utiliza :key e o primeiro elemento é removido após o usuário digitar informações em um campo de texto do segundo elemento?

## 4.6. Seção 6 — Final Mission: Desafio

A aplicação deverá apresentar uma página final com uma atividade que exija que o usuário utilize os conhecimentos adquiridos durante a navegação.

O desafio deverá ser elaborado pela dupla e possuir resposta fundamentada nos exemplos ou laboratórios apresentados no próprio guia.

---

# 5. Requisitos dos laboratórios interativos

A aplicação deverá possuir pelo menos três laboratórios que permitam a experimentação prática dos conceitos apresentados.

**LAB01 — Responsive Container**

O usuário deverá conseguir modificar a largura de um contêiner por meio de um controle deslizante.

O sistema deverá atualizar o tamanho do elemento em tempo real, permitindo observar como diferentes dimensões afetam a disposição do conteúdo.

**LAB02 — CSS Unit Converter**

O sistema deverá disponibilizar um conversor de unidades CSS.

O usuário poderá inserir valores em unidades como rem, em e %, visualizar o resultado convertido em pixels e compreender as diferenças entre unidades absolutas e relativas.

**LAB03 — Breakpoint Monitor**

O sistema deverá apresentar um indicador fixo na interface, informando a largura atual da janela do navegador e o breakpoint ativo.

O indicador deverá atualizar automaticamente quando a janela for redimensionada.

**Requisito adicional:** Os laboratórios deverão possuir uma apresentação visual coerente com a temática de GTA VI, sem prejudicar a compreensão dos conceitos técnicos.

---

# 6. Requisitos não funcionais

Os requisitos não funcionais definem as características de qualidade, desempenho, segurança e usabilidade esperadas do sistema.

**RNF01 — Responsividade**

A aplicação deverá funcionar adequadamente em smartphones, tablets e computadores, sem apresentar rolagem horizontal indevida ou conteúdo transbordando.

**RNF02 — Usabilidade**

A navegação deverá ser intuitiva, permitindo que usuários iniciantes encontrem facilmente as seções e utilizem os laboratórios.

**RNF03 — Desempenho**

A aplicação deverá evitar carregamentos desnecessários, utilizar imagens otimizadas e implementar carregamento sob demanda de rotas.

**RNF04 — Acessibilidade**

O sistema deverá utilizar contraste adequado, textos legíveis, descrições alternativas para imagens relevantes e elementos de navegação acessíveis.

**RNF05 — Manutenibilidade**

O código deverá apresentar organização modular, componentes reutilizáveis e separação adequada de responsabilidades.

**RNF06 — Compatibilidade**

A aplicação deverá apresentar funcionamento consistente nos principais navegadores modernos.

**RNF07 — Identidade visual**

A interface deverá manter uma identidade visual consistente, inspirada em GTA VI, utilizando elementos gráficos, tipografia e cores que remetam ao universo do jogo.

**RNF08 — Segurança**

A aplicação não deverá expor credenciais, chaves privadas ou informações sensíveis em seu código-fonte público.

**RNF09 — Confiabilidade**

Os laboratórios deverão apresentar resultados coerentes com os parâmetros inseridos pelo usuário, evitando erros de cálculo ou atualizações incorretas.

---

# 7. Arquitetura e organização do projeto

A aplicação deverá utilizar uma arquitetura baseada em componentes Vue 3, com separação entre páginas, componentes reutilizáveis, gerenciamento de estado e serviços externos.

Estrutura sugerida:

src/
- assets/
  - images/
  - styles/
- components/
  - layout/
  - navigation/
  - labs/
  - content/
- views/
  - HomeView.vue
  - ResponsivenessView.vue
  - UnitsView.vue
  - LayoutView.vue
  - ImagesView.vue
  - VuePracticesView.vue
  - ChallengeView.vue
- router/
  - index.js
- stores/
  - settingsStore.js
  - labsStore.js
- services/
  - api.js
- App.vue
- main.js

A estrutura poderá ser adaptada conforme as necessidades de implementação, desde que mantenha a organização e a separação de responsabilidades.

---

# 8. Interface e identidade visual

## 8.1. Diretrizes visuais

A identidade visual deverá utilizar referências estéticas de GTA VI, especialmente sua ambientação tropical e urbana.

Elementos visuais sugeridos:

- Tons de rosa, roxo e azul neon.
- Gradientes inspirados no pôr do sol de Vice City.
- Elementos gráficos urbanos e tropicais.
- Tipografia moderna e de fácil leitura.
- Cards com efeitos visuais discretos.
- Ícones e elementos de navegação personalizados.
- Imagens temáticas utilizadas de maneira equilibrada.

## 8.2. Experiência de navegação

A página inicial deverá funcionar como ponto de entrada para o guia, apresentando as seções disponíveis.

Cada página deverá possuir navegação consistente, permitindo avançar, retornar e acessar outras partes do conteúdo.

A versão mobile deverá apresentar uma navegação simplificada, mantendo todas as funcionalidades disponíveis na versão desktop.

---

# 9. Critérios de aceitação

O projeto será considerado concluído quando atender aos seguintes critérios:

1. A aplicação estiver desenvolvida utilizando Vue 3 e Vite.
2. A navegação entre as páginas estiver implementada com Vue Router.
3. O gerenciamento de estado utilizar Pinia.
4. Houver consumo funcional de uma API.
5. Todas as cinco seções técnicas estiverem disponíveis.
6. Todas as perguntas-guia estiverem respondidas.
7. Cada seção possuir explicações, exemplos comentados e fontes consultadas.
8. Existirem pelo menos três laboratórios interativos funcionais.
9. A página final de desafio estiver implementada.
10. O layout funcionar corretamente em dispositivos móveis e computadores.
11. Não houver rolagem horizontal indevida.
12. O menu mobile estiver implementado.
13. O projeto estiver publicado na internet.
14. O código-fonte estiver disponível em um repositório GitHub com README.
15. Existir uma captura de tela da aplicação funcionando em um aparelho celular.

---

# 10. Entregáveis

Ao término do desenvolvimento, deverão ser disponibilizados:

- Link da aplicação publicada.
- Link do repositório GitHub.
- Captura de tela da aplicação executando em um dispositivo móvel.
- Apresentação do projeto e demonstração de pelo menos um laboratório interativo.

**Prazo de entrega:** 22/12/2026, às 23h59.

**Data de apresentação:** 01/12/2026.

---

# 11. Considerações finais

O Vice City Responsive Guide tem como objetivo unir aprendizagem técnica e experiência visual, utilizando a identidade de GTA VI como elemento de contextualização e diferenciação.

Apesar da temática inspirada em um jogo eletrônico, o foco principal da aplicação será educacional, apresentando conceitos fundamentais de responsividade, CSS e desenvolvimento de interfaces utilizando Vue 3.

A implementação deverá priorizar a clareza das explicações, a qualidade dos exemplos, a interatividade dos laboratórios e a adaptação da interface a diferentes dispositivos.

O resultado esperado é uma aplicação funcional, visualmente original e tecnicamente consistente, capaz de demonstrar na prática os conhecimentos estudados durante o semestre.