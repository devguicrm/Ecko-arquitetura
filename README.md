# Écko Arquitetura - Site institucional

Site institucional estático desenvolvido com HTML, CSS e JavaScript puro.

## Estrutura

- `index.html`: estrutura da página
- `style.css`: layout, responsividade e animações
- `script.js`: menu mobile, filtros, lightbox, FAQ, botão de topo e formulário para WhatsApp
- `assets/img/`: imagens otimizadas do projeto

## O que alterar antes de publicar

No arquivo `script.js`, altere:

```js
const WHATSAPP_NUMBER = "5541999999999";
const INSTAGRAM_URL = "https://instagram.com/ecko.arquitetura";
```

No arquivo `index.html`, altere também:

- e-mail de contato
- número exibido na seção de contato
- @ do Instagram
- textos institucionais, se quiser deixar mais pessoal
- imagens dos projetos, caso tenha fotos reais

## Como publicar no GitHub Pages

1. Crie um repositório no GitHub.
2. Envie todos os arquivos desta pasta para o repositório.
3. Vá em `Settings > Pages`.
4. Em `Build and deployment`, selecione `Deploy from a branch`.
5. Escolha a branch `main` e a pasta `/root`.
6. Salve e aguarde o link ser gerado.
