// ==========================================
// 3. LOGICA DE ADICIONAR ITENS AO CARRINHO
// ==========================================

// Seleciona todos os botões de adicionar ao carrinho
const botoesAdicionar = document.querySelectorAll('.menu .box .btn');

botoesAdicionar.forEach(function(botao) {
    botao.addEventListener('click', function(evento) {
        evento.preventDefault(); // Evita que a página suba ao clicar no #
        
        // Encontra o card do café onde o botão foi clicado
        const cardCardapio = botao.closest('.box');
        
        // Captura as informações do produto
        const nome = cardCardapio.querySelector('h3').textContent;
        // Pega o preço limpando o texto "R$ " e espaços
        const precoTexto = cardCardapio.querySelector('.price').childNodes[0].textContent;
        const preco = parseFloat(precoTexto.replace('R$', '').replace(',', '.').trim());
        const imagem = cardCardapio.querySelector('img').src;

        // Cria o objeto do produto
        const produtoObjeto = {
            nome: nome,
            preco: preco,
            imagem: imagem,
            quantidade: 1
        };

        // Pega o carrinho atual do localStorage ou cria um array vazio se não existir
        let carrinhoLista = JSON.parse(localStorage.getItem('meuCarrinho')) || [];

        // Verifica se o café já foi adicionado antes
        const produtoExistente = carrinhoLista.find(item => item.nome === produtoObjeto.nome);

        if (produtoExistente) {
            produtoExistente.quantidade++; // Se já existe, só aumenta a quantidade
        } else {
            carrinhoLista.push(produtoObjeto); // Se é novo, adiciona na lista
        }

        // Salva a lista atualizada de volta no localStorage do navegador
        localStorage.setItem('meuCarrinho', JSON.stringify(carrinhoLista));

        // Feedback visual para o usuário
        alert(`${nome} adicionado ao seu carrinho!`);
    });
});

// carrinho.js — renderiza e gerencia o carrinho salvo no localStorage

document.addEventListener('DOMContentLoaded', function () {
    const listaProdutos = document.getElementById('lista-produtos');
    const precoTotalEl = document.getElementById('preco-total');
    const checkoutBtn = document.getElementById('checkout-btn');

    function getCarrinho() {
        return JSON.parse(localStorage.getItem('meuCarrinho')) || [];
    }

    function salvarCarrinho(carrinho) {
        localStorage.setItem('meuCarrinho', JSON.stringify(carrinho));
    }

    function formatarPreco(valor) {
        return 'R$ ' + valor.toFixed(2).replace('.', ',');
    }

    function renderizarCarrinho() {
        const carrinho = getCarrinho();
        listaProdutos.innerHTML = '';

        if (carrinho.length === 0) {
            listaProdutos.innerHTML = '<p class="carrinho-vazio">Seu carrinho está vazio.</p>';
            precoTotalEl.textContent = formatarPreco(0);
            return;
        }

        let total = 0;

        carrinho.forEach(function (item, index) {
            const subtotal = item.preco * item.quantidade;
            total += subtotal;

            const itemDiv = document.createElement('div');
            itemDiv.classList.add('item-carrinho');
            itemDiv.innerHTML = `
                <img src="${item.imagem}" alt="${item.nome}">
                <div class="item-info">
                    <h3>${item.nome}</h3>
                    <p>Preço unitário: ${formatarPreco(item.preco)}</p>
                    <p>Subtotal: ${formatarPreco(subtotal)}</p>
                </div>
                <div class="quantidade">
                    <button class="btn-diminuir" data-index="${index}">-</button>
                    <span>${item.quantidade}</span>
                    <button class="btn-aumentar" data-index="${index}">+</button>
                </div>
                <button class="btn-remover" data-index="${index}">Remover</button>
            `;

            listaProdutos.appendChild(itemDiv);
        });

        precoTotalEl.textContent = formatarPreco(total);
        ativarBotoes();
    }

    function ativarBotoes() {
        document.querySelectorAll('.btn-aumentar').forEach(function (botao) {
            botao.addEventListener('click', function () {
                const carrinho = getCarrinho();
                const i = parseInt(botao.dataset.index);
                carrinho[i].quantidade++;
                salvarCarrinho(carrinho);
                renderizarCarrinho();
            });
        });

        document.querySelectorAll('.btn-diminuir').forEach(function (botao) {
            botao.addEventListener('click', function () {
                const carrinho = getCarrinho();
                const i = parseInt(botao.dataset.index);
                carrinho[i].quantidade--;
                if (carrinho[i].quantidade <= 0) carrinho.splice(i, 1);
                salvarCarrinho(carrinho);
                renderizarCarrinho();
            });
        });

        document.querySelectorAll('.btn-remover').forEach(function (botao) {
            botao.addEventListener('click', function () {
                const carrinho = getCarrinho();
                const i = parseInt(botao.dataset.index);
                carrinho.splice(i, 1);
                salvarCarrinho(carrinho);
                renderizarCarrinho();
            });
        });
    }

    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function () {
            if (getCarrinho().length === 0) {
                alert('Seu carrinho está vazio!');
                return;
            }
            alert('Compra realizada com sucesso! Obrigado pela preferência.');
            localStorage.removeItem('meuCarrinho');
            renderizarCarrinho();
        });
    }

    renderizarCarrinho();
});
