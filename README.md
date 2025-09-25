# Medina Tech Imports - Catálogo Online

Este é um aplicativo de catálogo de e-commerce de página única (SPA) para a "Medina Tech Imports". Construído com React e TypeScript, ele permite que os usuários visualizem produtos, busquem itens específicos, adicionem-nos a um carrinho e iniciem o processo de compra via WhatsApp com uma mensagem pré-formatada.

## ✨ Features

- **Catálogo de Produtos:** Visualização clara dos produtos em um layout de grid responsivo.
- **Página de Detalhes:** Cada produto possui uma página dedicada com galeria de imagens, descrição completa e especificações técnicas.
- **Busca em Tempo Real:** Uma camada de busca (overlay) permite encontrar produtos instantaneamente.
- **Carrinho de Compras Funcional:** Adicione, remova e limpe itens do carrinho de forma intuitiva.
- **Checkout via WhatsApp:** O fluxo de compra é direcionado para o WhatsApp com uma mensagem automática e profissional, contendo o resumo do pedido.
- **Design Moderno:** Interface com tema escuro, focada na estética gamer, e totalmente responsiva para desktops, tablets e celulares.
- **Gerenciamento de Sessão (local):** Inclui uma página (não pública) para adicionar produtos que persistem apenas na sessão atual do navegador.

## 🚀 Stack de Tecnologias

- **Linguagem:** TypeScript
- **Framework:** React 19
- **Estilização:** Tailwind CSS
- **Módulos:** Carregados nativamente via `importmap`, eliminando a necessidade de um passo de `build` ou `npm install` para desenvolvimento.

## 📁 Estrutura do Projeto

O projeto é organizado de forma modular para facilitar a manutenção e escalabilidade.

-   `App.tsx`: Componente raiz que gerencia todo o estado da aplicação (navegação, carrinho, produtos, busca).
-   `components/`: Contém componentes de UI reutilizáveis e focados na apresentação (ex: `Header`, `Footer`, `Catalog`).
-   `pages/`: Contém componentes que representam as "telas" completas da aplicação (ex: `HomePage`, `ProductDetailPage`, `CartPage`).
-   `constants.ts`: Armazena dados estáticos, como a lista inicial de produtos (`PRODUCTS`) e o número de contato do WhatsApp.
-   `types.ts`: Define as estruturas de dados (interfaces TypeScript) usadas em todo o projeto, como `Product` e `CartItem`.
-   `index.html`: Ponto de entrada da aplicação.

## 🏃 Como Rodar Localmente

Este projeto foi configurado para ser executado diretamente no navegador, sem a necessidade de um servidor Node.js ou bundlers como Webpack/Vite.

1.  Clone este repositório para a sua máquina.
2.  Abra a pasta do projeto no seu editor de código (ex: VS Code).
3.  Se você usa o VS Code, instale a extensão **[Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)**.
4.  Clique com o botão direito no arquivo `index.html` e selecione `Open with Live Server`.

O site será aberto no seu navegador padrão.