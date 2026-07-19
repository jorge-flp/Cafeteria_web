# ☕ Cafeteria Web

> Sistema de e-commerce para cafeteria — de um site institucional a uma experiência de compra completa, com busca inteligente, carrinho persistente e layout responsivo.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/license-MIT-green)

## 📋 Sobre o Projeto

O objetivo principal deste projeto foi transformar uma página institucional simples em uma **plataforma dinâmica de e-commerce**, com transições de fluxo entre as telas. O foco foi otimizar a experiência do cliente, tornando a navegação intuitiva, rápida e totalmente funcional — desde a busca por um produto até a simulação da finalização da compra.

## ✨ Funcionalidades

### 🔍 Busca Inteligente com Rolagem Automática

- **Filtro tolerante a falhas** — a busca usa normalização de strings (`NFD`), então digitar "cafe coado" sem acento encontra normalmente o produto cadastrado como "Café Coado".
- **Rolagem suave (`smooth scroll`)** — ao encontrar a correspondência, a página rola automaticamente até o cardápio, centralizando o produto na tela.
- **Destaque visual temporário** — o produto encontrado recebe uma borda iluminada por 2 segundos, na cor de destaque da marca.

### 🛒 Carrinho de Compras com Persistência de Dados

- **Persistência via `localStorage`** — nome, preço e imagem são salvos localmente ao clicar em "Adicionar ao Carrinho", então o carrinho não se perde ao fechar ou atualizar a aba.
- **Agrupamento inteligente** — adicionar o mesmo item mais de uma vez incrementa a quantidade em vez de duplicar a linha.
- **Cálculo dinâmico de subtotal e total** — recalculado em tempo real e exibido no padrão monetário brasileiro (R$).
- **Simulação de pagamento** — ao finalizar a compra, o carrinho é limpo do `localStorage` e o cliente retorna à página inicial.

### 📱 Layout Responsivo

- Site adaptado para desktop, tablet e celular via **media queries**, com o header, a busca, a seção "Sobre", a grade de produtos e o mapa se reorganizando conforme o tamanho da tela.

## 🏗️ Arquitetura do Projeto

Projeto estruturado em arquitetura modular, separando responsabilidades para facilitar manutenção e escalabilidade:

```
Cafeteria_web/
├── html/
│   ├── index.html       # Vitrine principal
│   └── carrinho.html    # Página de checkout
├── css/
│   ├── style.css         # Identidade visual, tipografia e responsividade
│   └── carrinho.css      # Estilos exclusivos do carrinho
├── js/
│   ├── script.js         # Interações da página inicial (busca, animações)
│   └── carrinho.js       # Regras de negócio do carrinho
└── img/                  # Logos, banners e fotos dos produtos
```

| Pasta | Responsabilidade |
|---|---|
| `html/` | Páginas estruturais do sistema |
| `css/` | Identidade visual, tipografia (Roboto), paleta escura e responsividade |
| `js/` | Lógica separada por página — navegação/busca e carrinho |
| `img/` | Ativos visuais armazenados localmente |

## 🛠️ Tecnologias Utilizadas

- **HTML5** — estrutura semântica
- **CSS3** — variáveis, Flexbox, Grid, media queries e animações via `@keyframes`
- **JavaScript (Vanilla)** — manipulação do DOM e regras de negócio
- **LocalStorage API** — persistência do carrinho no navegador
- **Google Fonts** — tipografia Roboto

## 🚀 Como Executar

```bash
git clone https://github.com/jorge-flp/Cafeteria_web.git
cd Cafeteria_web
```

Depois é só abrir `html/index.html` no navegador. O projeto é 100% client-side, sem dependências ou build — para uma melhor experiência durante o desenvolvimento, a extensão **Live Server** (VS Code) é recomendada.

## 🎯 Benefícios do Projeto

1. **Experiência do usuário (UX)** — navegação fluida e feedback imediato ao adicionar itens reduzem a taxa de abandono do site.
2. **Organização de código** — a modularização em pastas deixa o projeto pronto para escala, facilitando adicionar novos produtos ou métodos de pagamento.
3. **Desempenho** — o uso do armazenamento nativo do navegador reduz a necessidade de requisições constantes a um servidor para manter o carrinho ativo.

## 📄 Licença

Este projeto está sob a licença MIT — veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👤 Autor

Desenvolvido por [@jorge-flp](https://github.com/jorge-flp)
