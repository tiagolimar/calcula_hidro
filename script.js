"use strict";

const id_iframe_tubo = 'tabela-tubos';
const id_iframe_peca = 'tabela-pecas';

const seletor_material = document.querySelector('#material');
const seletor_diametro = document.querySelector('#diametro');
const seletor_material_peca = document.querySelector('#material-peca');
const seletor_diametro_peca = document.querySelector('#diametro-peca');
const seletor_nome_peca = document.querySelector('#nome-peca');

const input_dn_interno = document.querySelector('#dn-int');
const input_vazao = document.querySelector('#vazao');
const display_vazao = document.querySelector('#display-vazao');
const input_peso = document.querySelector('#peso');
const input_velocidade = document.querySelector('#velocidade');
const input_perda = document.querySelector('#perda');
const input_perda_total = document.querySelector('#perda-total');
const input_comprimento = document.querySelector('#comprimento');

const precisao = 3;

let tabela_tubo = {};
let tabela_peca = {};

const Tubo = {
    Material: '',
    Id_Dn: 0,
    Dn: [],
    DnInterno: [],
    Vazao: 0,
    TipoDePerda: 0,
    PerdaDeCargaUnitaria: 0,
    PerdaDeCargaTotal: 0,
    Comprimento: 0
};

const Peca = {
    Material: '',
    Nome: '',
    Id_Dn: 0,
    Dn: []
};

const caracteres = {
    'á': 'a',
    'à': 'a',
    'â': 'a',
    'ã': 'a',
    'é': 'e',
    'è': 'e',
    'ê': 'e',
    'í': 'i',
    'ì': 'i',
    'î': 'i',
    'ó': 'o',
    'ò': 'o',
    'ô': 'o',
    'õ': 'o',
    'ú': 'u',
    'ù': 'u',
    'û': 'u',
    'ç': 'c',
    '.':'',
    ' ':'-',
    '\\':'-'
  };
  
function substituir_caracteres(str) {
    let new_str = '';
    for (let char of str) new_str += caracteres[char] || char;
    return new_str;
}

window.addEventListener('load', function() {
    tabela_tubo = iframe_para_objeto(id_iframe_tubo,'tubo');
    tabela_peca = iframe_para_objeto(id_iframe_peca,'peca');
    preencher_materiais();
});

function iframe_para_objeto(id,nome){
    const iframe = document.querySelector(`#${id}`);
    const celulas_cabecalho = Array.from(iframe.contentDocument.documentElement.querySelectorAll('th'));
    let objeto = {}

    for(let i in celulas_cabecalho){
        let conteudo = celulas_cabecalho[i].textContent;
        conteudo = conteudo.toLowerCase();
        conteudo = conteudo.replaceAll(/\s*\([^)]*\)\s*/g, ''); //remove '(qualquer coisa)' da string
        conteudo = substituir_caracteres(conteudo);

        let valores_campo = Array.from(iframe.contentDocument.documentElement.
            querySelectorAll(`td:nth-child(${+i+1})`)).
            map(x=>x.textContent);

        objeto[`${nome}-${conteudo}`] = valores_campo;
    }
    return objeto
}

function calcula_vazao() {
    let peso = input_peso.value;

    if(!peso || peso < 0) input_peso.classList.add('text-danger');
    else input_peso.classList.remove('text-danger');

    let vazao_ls = (0.3*peso**(0.5))
    let vazao = vazao_ls/1000*3600;

    input_vazao.value = vazao.toFixed(precisao);
    display_vazao.value = vazao_ls.toFixed(precisao);
    calcula_velocidade_perda();
}

function calcula_peso() {
    let vazao = input_vazao.value;

    if(!vazao || vazao < 0) input_vazao.classList.add('text-danger');
    else input_vazao.classList.remove('text-danger');

    let vazao_ls = vazao*1000/3600;
    let peso = (vazao_ls/0.3)**2;

    display_vazao.value = vazao_ls.toFixed(precisao);
    input_peso.value = peso.toFixed(precisao);
    calcula_velocidade_perda();
}

function calcula_velocidade_perda(){
    let vazao = input_vazao.value;
    let diametro = input_dn_interno.value;
    let comprimento = input_comprimento.value;
    
    if(vazao>=0 && diametro>=0){
        vazao /= 3600;
        diametro /= 1000;

        let velocidade = (4*vazao)/(Math.PI*diametro**2);
        let perda = 0.000859*(vazao**(1.75))/(diametro**4.75);

        input_velocidade.value = velocidade.toFixed(precisao);
        input_perda.value = perda.toFixed(precisao+1);

        if(comprimento>=0){
            input_comprimento.classList.remove('text-danger');
            input_perda_total.value = (comprimento*perda).toFixed(precisao);
        }else{
            input_comprimento.classList.add('text-danger');
        }
    }
}

function preencher_id_dn(){
    Tubo.Id_Dn = event.target.options[event.target.selectedIndex].value;
    input_dn_interno.value = Tubo.DnInterno[Tubo.Id_Dn].replace(',','.');
    calcula_velocidade_perda();
}

function preencher_materiais(){
    const materiais = Array.from(new Set(tabela_tubo['tubo-material']));
    const materiais_peca = Array.from(new Set(tabela_peca['peca-material']));
    let i = 1;

    for (let material of materiais){
        let opcao = document.createElement('option');
        opcao.setAttribute('value', i);
        i++;
        opcao.innerHTML = material;
        seletor_material.appendChild(opcao);
    }

    if (seletor_diametro.options.length < 1){
        seletor_material.options[0].selectedIndex = 0;
    }
    preencher_diametros();

    for (let material of materiais_peca){
        let opcao = document.createElement('option');
        opcao.setAttribute('value', i);
        i++;
        opcao.innerHTML = material;
        seletor_material_peca.appendChild(opcao);
    }

    if (seletor_diametro.options.length < 1){
        seletor_material_peca.options[0].selectedIndex = 0;
    }
    preencher_pecas();
}

function obter_diametros(material) {
    const coluna_materiais = tabela_tubo['tubo-material'];
    const coluna_dn = tabela_tubo['tubo-dn-comercial'];
    const coluna_dn_interno = tabela_tubo['tubo-dn-interno'];

    Tubo.Dn = [];
    Tubo.DnInterno = [];
    Tubo.Id_Dn = 0;

    for(let i in coluna_materiais){
        if(coluna_materiais[i] === material) {
            Tubo.Dn.push(coluna_dn[i]);
            Tubo.DnInterno.push(coluna_dn_interno[i]);
        }
    }
}

function preencher_diametros(){
    while(seletor_diametro.firstChild){
        seletor_diametro.removeChild(seletor_diametro.firstChild);
    }
    
    let material = seletor_material.options[seletor_material.selectedIndex].innerHTML;
    obter_diametros(material);
    let diametros = Tubo.Dn;

    for (let i = 0; i < diametros.length; i++){
        let opcao = document.createElement('option');
        opcao.setAttribute('value', i);
        opcao.innerHTML = diametros[i];
        seletor_diametro.appendChild(opcao);
    }

    input_dn_interno.value = Tubo.DnInterno[Tubo.Id_Dn].replace(',','.');
    calcula_velocidade_perda();
}

function obter_tipo_peca(material) {
    const coluna_materiais = tabela_peca['peca-material'];
    const coluna_nome_peca = tabela_peca['peca-nome-da-peca'];
    const coluna_dn = tabela_peca['peca-dn-comercial'];

    Peca.Dn = [];
    Peca.Id_Dn = 0;

    for(let i in coluna_materiais){
        if(coluna_materiais[i] === material) {
            Peca.Dn.push(coluna_dn[i]);
        }
    }
}

function preencher_tipo_peca(){
    while(seletor_diametro_peca.firstChild){
        seletor_diametro_peca.removeChild(seletor_diametro_peca.firstChild);
    }
    
    let material = seletor_material_peca.options[seletor_material_peca.selectedIndex].innerHTML;
    obter_tipo_peca(material);
    let diametros = Peca.Dn;

    for (let i = 0; i < diametros.length; i++){
        let opcao = document.createElement('option');
        opcao.setAttribute('value', i);
        opcao.innerHTML = diametros[i];
        seletor_diametro_peca.appendChild(opcao);
    }
}

function ocultar_tabelas(){
    if (referencia.style.display == 'flex'){
        referencia.style.display = 'none';
    }else{
        referencia.style.display = 'flex';
    }
}
