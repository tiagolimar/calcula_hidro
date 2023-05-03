"use strict";

let tabela_geral = document.querySelector('#tabela-dimencionamento');
let cabecalho = {
'valor1':'campo1',
'valor2':'campo2',
'valor3':'campo3',
'valor4':'campo4',
'valor5':'campo5',
'valor6':'campo6',
'valor7':'campo7',
'valor8':'campo8'
};


function adicionar_trecho(){
    let dados_principais = criar_div('row');
    dados_principais.classList.add('border-primary');
    for (let valor of Object.keys(cabecalho)){
        let campo = criar_div('col');
        let linha = criar_div('row');
        let titulo = document.createElement('label');
        let input = document.createElement('input');

        input.classList.add('form-control');
        input.disabled = true;
        titulo.innerHTML = valor;
        input.value = cabecalho[valor];

        linha.appendChild(titulo);
        linha.appendChild(input);
        campo.appendChild(linha);
        dados_principais.appendChild(campo);
    }
    tabela_geral.appendChild(dados_principais);
}

function criar_div(tipo){
    let div = document.createElement('div');
    div.classList.add(tipo);
    return div
}

adicionar_trecho();
adicionar_trecho();
adicionar_trecho();