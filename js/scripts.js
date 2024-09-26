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
let localizacao_item = 0;

// Essa função pega o elemento clicado e manda pra função add_elemento
$(document).ready(function() {
    $('.toolbar-item').click(function() {
        var texto = $(this).children().first();
        add_elemento(texto.html());
        console.log(texto.html());

        $('.design-area *').on('click', function() {
            var elemento = $(this);
            select_elemento(elemento);

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
            return `<${elemento.tipo} src="/imagem.png" id="${elemento.id}">`;
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
    if (localizacao_item == 0){
        loc = null
    }else {
        loc = localizacao_item;
    }


    return {
        tipo: tipoElemento.tipo,
        id: currentId++,
        localizacao : loc
    };
}

function select_elemento(elemento) {

    localizacao = elemento.attr('id'); 
    console.log("Selected Element ID: " + localizacao);


    $('.toolbar-item-propriedades').empty();
    const container = document.getElementById('toolbar-item-propriedades');

    localizacao_item = localizacao;


    const selectedElement = elementos.find(e => e.id == localizacao); // Comparação não rigorosa

    if (selectedElement) {


        let htmlContent = `<div>Tipo: ${selectedElement.tipo}</div>`;
        htmlContent += `<div>ID: ${selectedElement.id}</div>`;
        htmlContent += `<div>localização: ${selectedElement.localizacao}</div>`;
        htmlContent += `<button onclick="edit_elemento(${selectedElement.id})">Editar</button>`;
        container.innerHTML = htmlContent;

    } else {
        console.log("Elemento não encontrado");
    }
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



function edit_elemento(elemento) {
    
    const selectedElement = elementos.find(e => e.id == elemento); // Comparação não rigorosa

    if (selectedElement) {
        alert(selectedElement.tipo+ " asd"+selectedElement.id);

    } else {
        console.log("Elemento não encontrado");
    }
}

