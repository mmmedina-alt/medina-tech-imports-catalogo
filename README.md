# Medina Tech Imports - catálogo online

Este é um aplicativo de catálogo de e-commerce de página única (SPA) para a "Medina Tech Imports". Construído com React e TypeScript, ele permite que os usuários visualizem produtos, busquem itens específicos, adicionem-nos a um carrinho e iniciem o processo de compra via WhatsApp com uma mensagem pré-formatada.

## ✨ Funcionalidades

- **Catálogo de produtos:** visualização clara dos produtos em um layout de grid responsivo.
- **Página de detalhes:** cada produto possui uma página dedicada com galeria de imagens, descrição completa e especificações técnicas.
- **Busca em tempo real:** uma camada de busca (overlay) permite encontrar produtos instantaneamente.
- **Carrinho de compras funcional:** adicione, remova e limpe itens do carrinho de forma intuitiva.
- **Checkout via WhatsApp:** o fluxo de compra é direcionado para o WhatsApp com uma mensagem automática e profissional, contendo o resumo do pedido.
- **Design moderno:** interface com tema escuro, focada na estética gamer, e totalmente responsiva para desktops, tablets e celulares.
- **Gerenciamento de sessão (local):** inclui uma página (não pública) para adicionar produtos que persistem apenas na sessão atual do navegador.

## 🚀 Stack de tecnologias

- **Linguagem:** TypeScript
- **Framework:** React 19
- **Estilização:** Tailwind CSS
- **Módulos:** carregados nativamente via `importmap`, eliminando a necessidade de um passo de build ou npm install para desenvolvimento.

## 📁 Estrutura do projeto

O projeto é organizado de forma modular para facilitar a manutenção e escalabilidade.

-   `App.tsx`: componente raiz que gerencia todo o estado da aplicação (navegação, carrinho, produtos, busca).
-   `components/`: contém componentes de UI reutilizáveis e focados na apresentação (ex: `Header`, `Footer`, `Catalog`).
-   `pages/`: contém componentes que representam as telas completas da aplicação (ex: `HomePage`, `ProductDetailPage`, `CartPage`).
-   `constants.ts`: armazena dados estáticos, como a lista inicial de produtos (`PRODUCTS`) e o número de contato do WhatsApp.
-   `types.ts`: define as estruturas de dados (interfaces TypeScript) usadas em todo o projeto, como `Product` e `CartItem`.
-   `index.html`: ponto de entrada da aplicação.

## 🏃 Como rodar localmente

Este projeto foi configurado para ser executado diretamente no navegador, sem a necessidade de um servidor Node.js ou bundlers como Webpack/Vite.

1.  Clone este repositório para a sua máquina.
2.  Abra a pasta do projeto no seu editor de código (ex: VS Code).
3.  Se você usa o VS Code, instale a extensão [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).
4.  Clique com o botão direito no arquivo `index.html` e selecione "Open with Live Server".

O site será aberto no seu navegador padrão.