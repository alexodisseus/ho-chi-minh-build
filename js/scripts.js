let dicionario = new Map();

// Adicionar os elementos ao dicionário
dicionario.set('div', { tipo: 'div' });
dicionario.set('h1', { tipo: 'h1' });
dicionario.set('h2', { tipo: 'h2' });
dicionario.set('h3', { tipo: 'h3' });
dicionario.set('paragrafo', { tipo: 'p' });
dicionario.set('link', { tipo: 'a' });
dicionario.set('imagem', { tipo: 'img' });
dicionario.set('lista', { tipo: 'ul' }); // ou 'ol' para lista ordenada
dicionario.set('label', { tipo: 'label' });
dicionario.set('input', { tipo: 'input' });
dicionario.set('botão', { tipo: 'button' });
dicionario.set('tabela simples', { tipo: 'table' });
dicionario.set('tabela outra', { tipo: 'table' });

const code_html = [];
const elementos = [];
let currentId = 0; // Variável para gerenciar IDs únicos

// pega a janela de design da pagina
let design = $('#design'); 
let localizacao = 0;

// Essa função pega o elemento clicado e manda pra função add_elemento
$(document).ready(function() {
    $('.toolbar-item').click(function() {
        var texto = $(this).children().first();
        add_elemento(texto.html());
        console.log(texto.html());

        $('.design-area *').on('click', function() {
            var elemento = $(this);
            select_elemento(elemento);
            console.log(elemento);
        });
    });
});

// Monta página e joga a lista em code_html na janela design
function monta_pagina() {
    const container = document.getElementById('design'); // Certifique-se de ter um elemento com esse ID
    let htmlContent = ''; // Variável para armazenar o conteúdo HTML
    elementos.forEach(elemento => {
        htmlContent += createElementHTML(elemento);
    });

    container.innerHTML = htmlContent;
    console.log(elementos);
}

function createElementHTML(elemento) {
    switch (elemento.tipo) {
        case 'ul':
            return `<${elemento.tipo} id="${elemento.id}"><li>Lista 1</li><li>Lista 2</li><li>Lista 3</li></${elemento.tipo}>`;
        case 'table':
            return `
            <${elemento.tipo} id="${elemento.id}">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Idade</th>
                        <th>Cidade</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>João</td>
                        <td>30</td>
                        <td>São Paulo</td>
                    </tr>
                    <tr>
                        <td>Maria</td>
                        <td>25</td>
                        <td>Rio de Janeiro</td>
                    </tr>
                </tbody>
            </${elemento.tipo}>`;
        case 'a':
            return `<${elemento.tipo} id="${elemento.id}" href="#">${elemento.tipo}</${elemento.tipo}>`;
        case 'img':
            return `<div><${elemento.tipo} src="/imagem.png" id="${elemento.id}"></div>`;
        case 'input':
            return `<${elemento.tipo} id="${elemento.id}" value="${elemento.tipo}">`;
        default:
            return `<${elemento.tipo} id="${elemento.id}">${elemento.tipo}</${elemento.tipo}>`;
    }
}

// Função add_elemento recebe o elemento clicado
function monta_note(elemento) {
    const tipoElemento = dicionario.get(elemento);
    
    // Crie um novo objeto com ID único
    return {
        tipo: tipoElemento.tipo,
        id: currentId++ // Incrementa e atribui o ID
    };
}

function select_elemento(elemento) {
    localizacao = elemento.id; // Atualiza para o ID do elemento selecionado
}

function add_elemento(elemento) {
    const node = monta_note(elemento);
    elementos.push(node);
    monta_pagina();

    // Log dos elementos adicionados
    for (let i = 0; i < elementos.length; i++) {
        console.log(`${elementos[i].tipo} - tipo`);
        console.log(`${elementos[i].id} - id`);
    }
}
