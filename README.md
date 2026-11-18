# 📱 Guia Interativo de Responsividade & Boas Práticas em Vue 3

> **Projeto Acadêmico Semestral**  
> Um guia web didático e interativo construído em **Vue 3** com **Vite** e **Vue Router**, apresentando conceitos essenciais de design responsivo, CSS moderno, arquitetura de componentes e boas práticas de desenvolvimento web.

---

## 📌 Sobre o Projeto

Este projeto consiste em um guia interativo estruturado em módulos independentes via rotas. Cada seção de conteúdo obrigatório contém:
1. **Explicação curta e didática** (acessível para alunos iniciantes do 1º semestre);
2. **Exemplo de código comentado**;
3. **Resposta fundamentada à pergunta-guia da seção**;
4. **Fontes de referência e documentação consultadas**.

Além disso, o projeto conta com **3 laboratórios interativos** onde o usuário experimenta visualmente os conceitos de responsividade e um **desafio final** baseado nas contas do guia.

> ℹ️ **Nota de Versão:** Esta entrega contém o **esqueleto estrutural e de conteúdos**, com foco nas seções, roteamento, lógica e componentes, antes do refinamento das media queries e ajustes finos de responsividade mobile.

---

## 🎨 Tipografia & Identidade Visual

O projeto foi configurado com design tokens em variáveis CSS nativas (`:root`), utilizando as fontes especificadas:
- **Títulos e Destaques:** `Poppins` (Google Fonts);
- **Corpo de Texto e Controles:** `Iterian` (com fallback robusto para `Inter` / sans-serif);
- **Espaçamentos e Tipografia:** Definidos em unidades relativas acessíveis (`rem`).

---

## 📂 Estrutura de Pastas

```text
guia-responsividade/
├── public/                 # Arquivos públicos e estáticos
├── src/
│   ├── assets/
│   │   └── main.css        # Design tokens em :root, fontes e estilos base
│   ├── components/
│   │   ├── AppNavbar.vue   # Barra de navegação com links para seções e labs
│   │   └── SectionBlock.vue# Componente base das 4 partes de cada seção
│   ├── router/
│   │   └── index.js        # Vue Router com lazy-loading sob demanda
│   ├── views/
│   │   ├── HomeView.vue                    # Tela inicial de boas-vindas
│   │   ├── ResponsividadeImportaView.vue   # Seção 1: Por que responsividade importa
│   │   ├── UnidadesCssView.vue             # Seção 2: Unidades CSS (rem, em, fr, dvh, ch...)
│   │   ├── FlexboxGridView.vue             # Seção 3: Flexbox & Grid (cálculo de 464px)
│   │   ├── ImagensResponsivasView.vue      # Seção 4: Imagens, lazy loading e CLS
│   │   ├── BoasPraticasVueView.vue         # Seção 5: Boas práticas Vue, :key e Web Vitals
│   │   ├── DesafioView.vue                 # Seção 6: Desafio final interativo
│   │   └── LaboratoriosView.vue            # Laboratórios práticos (3 demonstrações)
│   ├── App.vue             # Componente raiz da aplicação
│   └── main.js             # Ponto de entrada do Vue 3
├── index.html              # HTML base com importação de fontes e meta viewport
├── package.json            # Dependências e scripts
├── vercel.json             # Configuração de reescrita para SPA na Vercel
├── vite.config.js          # Configuração do empacotador Vite
└── README.md               # Documentação completa
```

---

## 📚 Seções e Perguntas-Guia Respondidas

| Seção | Título | Pergunta-Guia & Solução |
|---|---|---|
| **1** | **Por que responsividade importa** | Explica por que um site sem `<meta name="viewport">` abre minúsculo no celular mesmo com media queries e como o viewport virtual desktop de ~980px é corrigido pela meta tag. |
| **2** | **Unidades CSS** | Demonstra por que `px` ignora as preferências de acessibilidade de pessoas com baixa visão, enquanto o `rem` escala automaticamente de acordo com o tamanho de fonte configurado no navegador do usuário. |
| **3** | **Flexbox e Grid** | Demonstra o cálculo detalhado de quando `repeat(auto-fit, minmax(14rem, 1fr))` com `gap: 1rem` (adotando `1rem = 16px`) passa de 1 para 2 colunas: **a partir de 464px** (`224px + 16px + 224px`). |
| **4** | **Imagens responsivas** | Explica por que imagens sem `width` e `height` causam o empurrão do texto (reflow) após carregarem e identifica a métrica **CLS (Cumulative Layout Shift)** do Google Core Web Vitals. |
| **5** | **Boas práticas em projetos Vue** | Demonstra a importância de `:key` no `v-for`, explicando como a ausência de chave única provoca a reutilização indevida do nó do DOM ("in-place patch"), fazendo campos de formulário e inputs digitados "dançarem" entre itens. |
| **6** | **Desafio Final** | Pergunta interativa com cálculo de 3 colunas baseada no laboratório de Grid, com validador em tempo real. |

---

## 🧪 Laboratórios Interativos

O guia disponibiliza 3 demonstrações práticas acessíveis pela rota `/laboratorios`:
1. **Slider de Largura de Contêiner:** Controle deslizante para redimensionar dinamicamente um container e visualizar o quebra-cabeça de colunas do CSS Grid com `auto-fit` e `minmax`;
2. **Conversor de Unidades CSS:** Conversor de valores numéricos em `rem`, `em` ou `%` para pixels (`px`) instantaneamente com base em 16px;
3. **Indicador de Janela & Breakpoint:** Medidor reativo em tempo real da largura do navegador com sinalização do breakpoint ativo (`Mobile`, `Tablet` ou `Desktop`).

---

## 🚀 Como Rodar Localmente

### Pré-requisitos
- **Node.js** (versão 18 ou superior instalada);
- **npm** (incluso com o Node.js).

### Passo a Passo

1. **Acesse a pasta do projeto no terminal:**
   ```bash
   cd guia-responsividade
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

4. **Acesse a aplicação no navegador:**
   Abra a URL exibida no terminal (normalmente [http://localhost:5173](http://localhost:5173)).

5. **Para gerar a versão de produção (build):**
   ```bash
   npm run build
   ```

---

## 🌐 Publicação no Vercel

O projeto está totalmente preparado para publicação na plataforma **Vercel**.

### Por que existe um arquivo `vercel.json`?
Como utilizamos o **Vue Router** com modo de histórico HTML5 (`createWebHistory`), o arquivo `vercel.json` na raiz instrui o servidor da Vercel a redirecionar qualquer rota interna para o `index.html`. Isso evita o erro **404 - Not Found** quando o usuário recarrega diretamente uma página interna (ex: `/unidades-css`).

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### Como publicar na Vercel:

#### Opção A: Conectando com GitHub (Recomendado)
1. Suba o código para um repositório no seu GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: esqueleto inicial do guia de responsividade"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
   git push -u origin main
   ```
2. Acesse [vercel.com](https://vercel.com) e clique em **Add New... > Project**.
3. Importe o repositório do GitHub.
4. O Vercel detectará automaticamente o framework **Vite**.
5. Clique em **Deploy**. Seu site estará no ar com link público HTTPS!

#### Opção B: Via Vercel CLI
1. Instale a CLI ou execute diretamente:
   ```bash
   npx vercel
   ```
2. Siga as instruções do terminal para vincular o projeto e publicar.
