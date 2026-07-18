// ==========================================
// 1. GERENCIAMENTO DAS ANIMAÇÕES VIA CLASSE
// ==========================================
document.querySelectorAll('.navbar a').forEach(function(link) {
    link.addEventListener('click', function() {
        const destino = link.getAttribute('href'); // ex: "#menu", "#address"
        const secaoDestino = document.querySelector(destino);
        if (!secaoDestino) return;

        // No caso do Home, a seção fica dentro de .home-container,
        // então usamos o container pai pra pegar a animação de fundo dele também
        const container = (destino === '#home' && secaoDestino.closest('.home-container'))
            ? secaoDestino.closest('.home-container')
            : secaoDestino;

        // Pega todos os elementos com a classe "animar" dentro da seção de destino
        const elementosAnimados = [...container.querySelectorAll('.animar')];

        // Se a própria seção tiver a classe (caso do Endereço), inclui ela também
        if (container.classList.contains('animar')) {
            elementosAnimados.push(container);
        }

        // O header sempre reanima, já que fica fixo e visível o tempo todo
        const header = document.querySelector('.header');
        if (header) elementosAnimados.push(header);

        elementosAnimados.forEach(function(el) {
            el.classList.remove('animar');
            el.offsetHeight;
        });

        setTimeout(function() {
            elementosAnimados.forEach(function(el) {
                el.classList.add('animar');
            });
        }, 10);
    });
});

// ==========================================
// 2. SISTEMA DA LUPA E FILTRO DE PESQUISA
// ==========================================
const searchBtn = document.querySelector('img[alt="search--v2"]');
const searchForm = document.querySelector('.search-form');
const searchBox = document.querySelector('#search-box');

if (searchBtn && searchForm) {
    searchBtn.style.cursor = 'pointer';
    searchBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        searchForm.classList.toggle('active');
        if (searchForm.classList.contains('active') && searchBox) {
            searchBox.focus();
        }
    });
}

window.addEventListener('scroll', function() {
    if (searchForm) {
        searchForm.classList.remove('active');
    }
});

if (searchBox) {
    searchBox.addEventListener('input', function() {
        const termoPesquisa = searchBox.value.toLowerCase().trim()
            .normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        
        if (termoPesquisa === "") return;

        const cardsCafe = document.querySelectorAll('.menu .box');
        
        cardsCafe.forEach(function(card) {
            const h3Element = card.querySelector('h3');
            if (h3Element) {
                const nomeCafe = h3Element.textContent.toLowerCase().trim()
                    .normalize('NFD').replace(/[\u0300-\u036f]/g, "");
                
                if (nomeCafe.includes(termoPesquisa)) {
                    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    card.style.outline = '3px solid #d3ad7f';
                    card.style.transition = 'outline 0.3s ease';
                    setTimeout(function() {
                        card.style.outline = 'none';
                    }, 2000);
                }
            }
        });
    });
}

// ==========================================
// 3. LOGICA DE ADICIONAR ITENS AO CARRINHO
// ==========================================
const botoesAdicionar = document.querySelectorAll('.menu .box .btn');

botoesAdicionar.forEach(function(botao) {
    botao.addEventListener('click', function(evento) {
        evento.preventDefault();
        
        const cardCardapio = botao.closest('.box');
        const nome = cardCardapio.querySelector('h3').textContent;
        const precoTexto = cardCardapio.querySelector('.price').childNodes[0].textContent;
        const preco = parseFloat(precoTexto.replace('R$', '').replace(',', '.').trim());
        const imagem = cardCardapio.querySelector('img').src;

        const produtoObjeto = {
            nome: nome,
            preco: preco,
            imagem: imagem,
            quantidade: 1
        };

        let carrinhoLista = JSON.parse(localStorage.getItem('meuCarrinho')) || [];
        const produtoExistente = carrinhoLista.find(item => item.nome === produtoObjeto.nome);

        if (produtoExistente) {
            produtoExistente.quantidade++;
        } else {
            carrinhoLista.push(produtoObjeto);
        }

        localStorage.setItem('meuCarrinho', JSON.stringify(carrinhoLista));
        alert(`${nome} adicionado ao seu carrinho!`);
    });
});