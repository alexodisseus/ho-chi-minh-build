// o array code_html vai ser o codigo html que vai receber os elementos
/*

legenda

code_html

id = indice( )
1 = elemento
2 = elemento_pai
3 = css #talvez


*/


let dicionario = new Map();
var table = `<table>
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
                <td>25</td>
                <td>São Paulo</td>
            </tr>
            <tr>
                <td>Maria</td>
                <td>30</td>
                <td>Rio de Janeiro</td>
            </tr>
            <tr>
                <td>Pedro</td>
                <td>22</td>
                <td>Belo Horizonte</td>
            </tr>
        </tbody>
    </table>`;


// Adicionar pares chave-valor
dicionario.set("div", "<div>div</div>");
dicionario.set("h1 - h2 - h3", "<h1>h1</h1>");
dicionario.set("paragrafo", "<p>paragrafo</p>");
dicionario.set("link", "<a href='#'>link</a>");
dicionario.set("imagem", "<div><img src='/images.png'></img></div>");
dicionario.set("lista", "<ul><li>lista1</li><li>lista2</li><li>lista3</li></ul>");
dicionario.set("label", "<label>label</label>");
dicionario.set("input", "<input value='input'>");
dicionario.set("botão", "<button>button</button>");
dicionario.set("tabela simples", table);




const  code_html = [];

const elementos = [];



//pega a janela de design da pagina
let design = $('#design'); 
var localizacao = 0;


// essa função pega o elemento clicado e manda pra fução add elemento
$(document).ready(function() {
    $('.toolbar-item').click(function() {
          var texto = $(this).children().first();
          add_elemento(texto.html());
          console.log(texto.html());
          
      $('.design-area *').on('click', function() {
              var elemento = $(this); // Seleciona o elemento que foi clicado
              select_elemento(elemento);
      });
    });
});




//monta pagina pega a lista em code_html e joga na janela design



//mudar para o id ser progressivo
//mudar para colocar o <div> ou <input> correto
//mudar para fazer o appendo no nó correto

function monta_pagina(){
  //trocar o limpa pagina para add no lugar;
  design.empty();
  
  for(let x in code_html){
    design.append($(code_html[x]).attr('id', x));
  }
  




}


//fuçã add elemento recebe o elemento clicado, verifica a parte do html que
// vai ser add e add no lugar selecionado, se não tiver nada secionado
// ela coloca no body por padrão


function monta_note(elemento , localizacao){

  asd = dicionario.get(elemento);
  return asd;

}

function monta_note2(elemento , localizacao){
  //aqui
  asd ={
  tipo: elemento,
  id: 0,
  css: {
    height: '30px',
    width: '80px',
    color: '#FF0'
  },
  pai: 1
};

  return asd;

}




function select_elemento(elemento){

  node = [elemento,  localizacao];  
  localizacao = localizacao;

}



function add_elemento(elemento){

  
  node = monta_note(elemento,  localizacao);
  code_html.push(node);
  console.log(code_html);
  node = monta_note2(elemento , localizacao)
  
  elementos.push(node);

  
  
  monta_pagina();
  


}







/*

usar isso>
const elementos = [
  {
    tipo: 'h',
    id: 1,
    css: {
      height: '100px',
      width: '200px',
      color: '#F00'
    },
    pai: 0 // supondo que não tenha pai
  },
  {
    tipo: 'div',
    id: 2,
    css: {
      height: '150px',
      width: '300px',
      color: '#0F0'
    },
    pai: 1
  },
  {
    tipo: 'p',
    id: 3,
    css: {
      height: '50px',
      width: '100px',
      color: '#00F'
    },
    pai: 2
  }
];

// Para acessar os dados
console.log(elementos[0].tipo); // "h"
console.log(elementos[1].css.color); // "#0F0"



// Iterando sobre a lista de elementos
elementos.forEach(elemento => {
  console.log(`Tipo: ${elemento.tipo}, ID: ${elemento.id}, Cor: ${elemento.css.color}`);
});

// Adicionando um novo elemento
elementos.push({
  tipo: 'span',
  id: 4,
  css: {
    height: '30px',
    width: '80px',
    color: '#FF0'
  },
  pai: 1
});

console.log(elementos);

*/

