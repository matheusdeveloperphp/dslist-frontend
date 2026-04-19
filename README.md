# 🎮 DSList Frontend

<p align="center">
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" />
</p>

<p align="center">
  Interface web para o <strong>DSList API</strong> — navegue, busque e reordene suas listas de jogos com visual cyberpunk.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/status-em%20desenvolvimento-neon?style=flat-square&color=00f5ff" />
</p>

---

## 🖥️ Preview

> Interface dark com tema **cyberpunk/neon** — grid de jogos, sidebar de categorias, modal de detalhes e drag & drop para reordenação.

---

## ✨ Funcionalidades

- 🗂️ **Listagem por categoria** — navegue entre as listas de jogos pela sidebar
- 🔍 **Busca em tempo real** — filtre jogos por título instantaneamente
- 📄 **Modal de detalhes** — veja score, gênero, plataformas e descrição completa de cada jogo
- 🖱️ **Drag & Drop** — reordene os jogos dentro de cada lista arrastando os cards
- 📱 **Responsivo** — adaptado para mobile e desktop

---

## 🏗️ Estrutura do Projeto

```
dslist-frontend/
├── public/
├── src/
│   ├── App.jsx        # Componente principal (toda a aplicação)
│   └── main.jsx       # Entry point React
├── index.html
├── package.json
└── vite.config.js
```

---

## 🔗 Integração com a API

Este frontend consome a **DSList API** (Spring Boot). Os seguintes endpoints são utilizados:

| Método | Rota | Uso |
|--------|------|-----|
| `GET` | `/lists` | Carrega as categorias na sidebar |
| `GET` | `/lists/{id}/games` | Carrega os jogos da categoria selecionada |
| `GET` | `/games/{id}` | Busca os detalhes do jogo no modal |
| `POST` | `/lists/{listId}/replacement` | Salva a nova ordem após drag & drop |

> 🔗 Repositório da API: [dslist-api](https://github.com/seu-usuario/dslist-api)

---

## 🚀 Como Executar Localmente

### Pré-requisitos

- Node.js 18+
- npm ou yarn
- **DSList API** rodando em `http://localhost:8080`

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/dslist-frontend.git
cd dslist-frontend
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure a URL da API

No arquivo `src/App.jsx`, verifique a constante:

```js
const API_BASE = "http://localhost:8080";
```

Altere para a URL da sua API em produção se necessário.

### 4. Rode o projeto

```bash
npm run dev
```

Acesse em: **http://localhost:5173**

---

## ⚙️ Configuração de CORS

Para que o frontend consiga se comunicar com a API, certifique-se de que o backend tem o CORS liberado para a origem do front. No `application.properties` da API:

```properties
cors.origins=http://localhost:5173
```

Em produção, use o domínio real:

```properties
cors.origins=https://seu-dominio.com
```

---

## 🏗️ Build para Produção

```bash
npm run build
```

Os arquivos otimizados serão gerados na pasta `dist/`. Basta copiar o conteúdo para o seu servidor (ex: `/var/www/portfolio`).

---

## 🎨 Design

| Elemento | Detalhe |
|----------|---------|
| Tema | Dark cyberpunk / neon |
| Fonte display | Orbitron (Google Fonts) |
| Fonte corpo | Rajdhani (Google Fonts) |
| Cor primária | `#00f5ff` (neon cyan) |
| Cor de destaque | `#ff006e` (neon pink) |
| Background | `#020408` |

---

## 🔧 Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera o build de produção |
| `npm run preview` | Visualiza o build localmente |

---

## 🗺️ Próximas Melhorias

- [ ] Animações de entrada nos cards
- [ ] Persistência da reordenação via API
- [ ] Tema claro / escuro
- [ ] Página 404 personalizada
- [ ] Testes com Vitest

---

## 👨‍💻 Autor

Desenvolvido por **Matheus Soares**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/seu-perfil)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/seu-usuario)
[![Portfolio](https://img.shields.io/badge/Portfolio-matheussoares.dev.br-blueviolet?style=for-the-badge)](https://matheussoares.dev.br)

---

## 🔗 Repositórios do Projeto

| Repositório | Descrição |
|-------------|-----------|
| [dslist-api](https://github.com/seu-usuario/dslist-api) | Backend Spring Boot |
| [dslist-frontend](https://github.com/seu-usuario/dslist-frontend) | Frontend React (este repositório) |