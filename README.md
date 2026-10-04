# Portfólio — Site Interativo

## Estrutura

portfolio-site/
├── index.html   → estrutura da página
├── style.css    → tema "blueprint" (claro/escuro), grid e componentes
└── script.js    → interatividade (dados dos projetos ficam aqui em cima do arquivo)

## O que tem de interativo/dinâmico

- **Crosshair estilo prancheta CAD** que segue o mouse com coordenadas ao vivo.
- **Efeito de digitação** no título do hero (troca de frases automaticamente).
- **Contadores animados** (projetos, anos de experiência, clientes).
- **Modo claro/escuro** com preferência salva no `localStorage`.
- **Filtro de projetos** por categoria (Web / UI-UX / Ferramentas), sem recarregar a página.
- **Barras de habilidade animadas** que preenchem ao entrar na tela (`IntersectionObserver`).
- **Animações de "revelar ao rolar"** nas seções.
- **Formulário de contato com validação** em tempo real (nome, e-mail, mensagem).
- **Menu responsivo** (hambúrguer no mobile).

## Como editar

Tudo que você provavelmente vai querer trocar primeiro está no topo do
`script.js`, nos arrays:

```js
const PROJECTS = [ ... ];  // seus projetos
const SKILLS = [ ... ];    // suas habilidades
```

E no `index.html`:
- Nome, título e texto da seção "Sobre" (`#sobre`)
- Links de contato (`#contato`) — troque o e-mail, GitHub e LinkedIn
- O formulário hoje só **simula** o envio. Para enviar de verdade sem backend,
  use um serviço como [Formspree](https://formspree.io) ou
  [Web3Forms](https://web3forms.com): basta trocar a URL de ação do form e o
  `fetch` dentro do `script.js`.

Cores, fontes e o grid de fundo estão como variáveis CSS no topo do
`style.css` (`:root` e `[data-theme="dark"]`), então dá pra trocar a
identidade visual inteira mexendo só ali.

## Como rodar no VS Code

1. Abra a pasta `portfolio-site` no VS Code.
2. Instale a extensão **Live Server** (Ritwick Dey).
3. Clique com o botão direito em `index.html` → **Open with Live Server**.
4. O site abre no navegador e recarrega sozinho a cada alteração.

(Alternativa sem extensão: rode `python3 -m http.server` dentro da pasta e
acesse `http://localhost:8000`.)

## Como publicar no GitHub Pages

1. Crie um repositório novo no GitHub (ex: `meu-portfolio`).
2. No terminal, dentro da pasta do projeto:
   ```bash
   git init
   git add .
   git commit -m "primeiro commit: site de portfólio"
   git branch -M main
   git remote add origin https://github.com/SEU-USUARIO/meu-portfolio.git
   git push -u origin main
   ```
3. No GitHub, vá em **Settings → Pages**.
4. Em "Source", escolha a branch `main` e a pasta `/root`.
5. Salve. Em alguns minutos o site fica no ar em:
   `https://SEU-USUARIO.github.io/meu-portfolio/`

## Acessibilidade

- Navegação por teclado com foco visível em todos os elementos interativos.
- `prefers-reduced-motion` respeitado (reduz animações se o usuário pedir no sistema).
- Contraste de cor testado nos dois temas.
- Link "pular para o conteúdo" no topo da página.
