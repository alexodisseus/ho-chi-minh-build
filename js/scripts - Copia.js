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
    const styleString = elemento.style ? ` style="padding: ${elemento.style.padding}; border: ${elemento.style.border};"` : '';

    switch (elemento.tipo) {
        case 'ul':
            return `<${elemento.tipo} id="${elemento.id}"${styleString}><li>Lista 1</li><li>Lista 2</li><li>Lista 3</li></${elemento.tipo}>`;
        case 'table':
            return `
            <${elemento.tipo} id="${elemento.id}"${styleString}>
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
            return `<${elemento.tipo} id="${elemento.id}" href="#"${styleString}>${elemento.tipo}</${elemento.tipo}>`;
        case 'img':
            return `<${elemento.tipo} src="/imagem.png" id="${elemento.id}"${styleString}>`;
        case 'input':
            return `<${elemento.tipo} id="${elemento.id}" value="${elemento.tipo}"${styleString}>`;
        default:
            return `<${elemento.tipo} id="${elemento.id}"${styleString}>${elemento.tipo}</${elemento.tipo}>`;
    }
}

// Função add_elemento recebe o elemento clicado
function monta_note(elemento) {
    const tipoElemento = dicionario.get(elemento);
    
    // Crie um novo objeto com ID único
    const loc = localizacao_item === 0 ? null : localizacao_item;

    return {
        tipo: tipoElemento.tipo,
        id: currentId++,
        localizacao: loc,
        style: {} // Adiciona a propriedade de estilo
    };
}

function select_elemento(elemento) {
    const localizacao = elemento.attr('id'); 
    console.log("Selected Element ID: " + localizacao);

    $('.toolbar-item-propriedades').empty();
    const container = document.getElementById('toolbar-item-propriedades');

    localizacao_item = localizacao;

    const selectedElement = elementos.find(e => e.id == localizacao); // Comparação não rigorosa

    if (selectedElement) {
        let htmlContent = `<div>Tipo: ${selectedElement.tipo}</div>`;
        htmlContent += `<div>ID: ${selectedElement.id}</div>`;
        htmlContent += `<div>Localização: ${selectedElement.localizacao}</div>`;
        htmlContent += `<button onclick="edit_elemento(${selectedElement.id})">Editar</button>`;
        htmlContent += `<button onclick="remove_elemento(${selectedElement.id})">Remover</button>`;
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
    elementos.forEach(elem => {
        console.log(`${elem.tipo} - tipo`);
        console.log(`${elem.id} - id`);
    });
}

function edit_elemento(elemento) {
    const selectedElement = elementos.find(e => e.id === elemento); // Comparação rigorosa

    if (selectedElement) {
        const formHtml = `
            <div>
                <label for="padding">Padding:</label>
                <input type="text" id="padding" value="${selectedElement.style?.padding || ''}" placeholder="e.g., 10px">
            </div>
            <div>
                <label for="border">Border:</label>
                <input type="text" id="border" value="${selectedElement.style?.border || ''}" placeholder="e.g., solid">
            </div>
            <button onclick="apply_styles(${selectedElement.id})">Aplicar Estilos</button>
        `;
        const container = document.getElementById('toolbar-item-propriedades');
        container.innerHTML = formHtml;

    } else {
        console.log("Elemento não encontrado");
    }
}

function apply_styles(elementId) {
    const padding = document.getElementById('padding').value;
    const border = document.getElementById('border').value;

    const selectedElement = elementos.find(e => e.id === elementId);

    if (selectedElement) {
        // Atualiza a propriedade de estilo
        selectedElement.style = {
            padding: padding,
            border: border
        };
        
        // Atualiza o elemento na área de design
        monta_pagina();
        console.log(`Estilos aplicados ao elemento ${elementId}: Padding: ${padding}, Border: ${border}`);
    } else {
        console.log("Elemento não encontrado");
    }
}

function remove_elemento(id) {
    elementos = elementos.filter(e => e.id !== id);
    monta_pagina();
}
