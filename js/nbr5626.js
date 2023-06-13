"use strict";

const id_iframe_tubo = 'tabela-tubos';
const id_iframe_peca = 'tabela-pecas';
const id_iframe_aparelho = 'tabela-aparelhos';

const seletor_material = document.querySelector('#material');
const seletor_diametro = document.querySelector('#diametro');
const seletor_material_peca = document.querySelector('#material-peca');
const seletor_diametro_peca = document.querySelector('#diametro-peca');
const seletor_nome_peca = document.querySelector('#nome-peca');
const seletor_aparelhos = document.querySelector('#aparelhos');

const input_dn_interno = document.querySelector('#dn-int');
const input_vazao = document.querySelector('#vazao');
const display_vazao = document.querySelector('#display-vazao');
const input_peso_unitario = document.querySelector('#peso-unitario');
const input_peso = document.querySelector('#peso');
const input_velocidade = document.querySelector('#velocidade');
const input_perda = document.querySelector('#perda');
const input_perda_total = document.querySelector('#perda-total');
const input_comprimento = document.querySelector('#comprimento');
const input_comprimento_peca = document.querySelector('#comprimento-peca');

const secao_peca = document.querySelector('#secao_peca');
const secao_dimensionamento = document.querySelector('#secao-dimensionamento');
const secao_tubo = document.querySelector('#secao_tubo');

let tabela_tubo = {};
let tabela_peca = {};
let tabela_aparelho = {};

const Tubo = {Id_Dn: 0, Dn: [], DnInterno: []};
const Peca = {Nomes: [], Id_Dn: 0, Dn: [], Comprimento: {}};

window.addEventListener('load', function() {
    tabela_tubo = iframe_para_objeto(id_iframe_tubo,'tubo');
    tabela_peca = iframe_para_objeto(id_iframe_peca,'peca');
    tabela_aparelho = iframe_para_objeto(id_iframe_aparelho,'aparelho');
    preencher_materiais();
    preencher_nome_peca();
});

function preencher_id_dn(){
    input_dn_interno.value = diametro.value.replace(',','.');
    calcula_velocidade_perda();
}

function preencher_materiais(){
    const materiais = Array.from(new Set(tabela_tubo['tubo-material']));
    const materiais_peca = Array.from(new Set(tabela_peca['peca-material']));
    const materiais_aparelho = Array.from(new Set(tabela_aparelho['aparelho-aparelho-sanitario']));

    criar_opcoes(materiais,seletor_material);

    if (seletor_diametro.options.length < 1){
        seletor_material.options[0].selectedIndex = 0;
    }

    preencher_diametros();

    criar_opcoes(materiais_peca,seletor_material_peca);

    if (seletor_nome_peca.options.length < 1){
        seletor_material_peca.options[0].selectedIndex = 0;
    }

    criar_opcoes(materiais_aparelho,seletor_aparelhos)
    preencher_peso()
    calcula_peso_total()
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
    limpar_opcoes(seletor_diametro);
    
    let material = seletor_material.options[seletor_material.selectedIndex].innerHTML;
    obter_diametros(material);
    let diametros = Tubo.Dn;

    for (let i = 0; i < diametros.length; i++){
        let opcao = document.createElement('option');
        opcao.setAttribute('value', Tubo.DnInterno[i]);
        opcao.innerHTML = diametros[i];
        seletor_diametro.appendChild(opcao);
    }

    input_dn_interno.value = Tubo.DnInterno[Tubo.Id_Dn].replace(',','.');
    calcula_velocidade_perda();
}

function preencher_nome_peca(){
    while(seletor_nome_peca.firstChild){
        seletor_nome_peca.removeChild(seletor_nome_peca.firstChild);
    }

    Peca.Nomes = [];
    let material = seletor_material_peca.options[seletor_material_peca.selectedIndex].innerHTML;
 
    for(let i in tabela_peca['peca-material']){
        if(tabela_peca['peca-material'][i] === material) {
            Peca.Nomes.push(tabela_peca['peca-nome-da-peca'][i]);
        }
    }

    Peca.Nomes = Array.from(new Set(Peca.Nomes));

    let nomes = Peca.Nomes;

    for (let i in nomes){
        let opcao = document.createElement('option');
        opcao.setAttribute('value', +i);
        opcao.innerHTML = nomes[+i];
        seletor_nome_peca.appendChild(opcao);
    }

    preencher_diametro_peca();
}

function preencher_diametro_peca(){
    limpar_opcoes(seletor_diametro_peca);

    Peca.DN = [];
    let nome = seletor_nome_peca.options[seletor_nome_peca.selectedIndex].innerHTML;
    let material = seletor_material_peca.options[seletor_material_peca.selectedIndex].innerHTML;
 
    for(let i in tabela_peca['peca-material']){
        if(tabela_peca['peca-material'][i] === material) {
            if(tabela_peca['peca-nome-da-peca'][i] === nome){
                let dn = tabela_peca['peca-dn-comercial'][i];
                Peca.DN.push(dn);
                Peca.Comprimento[dn] = tabela_peca['peca-comprimento-equivalente'][i];
            }
        }
    }
    
    let diametros = Peca.DN;
    
    for (let i in diametros){
        let opcao = document.createElement('option');
        opcao.setAttribute('value', i);
        opcao.innerHTML = diametros[i];
        seletor_diametro_peca.appendChild(opcao);
    }

    preencher_comprimento_peca();
}

function preencher_comprimento_peca(){
    let dn = seletor_diametro_peca.options[seletor_diametro_peca.selectedIndex].innerHTML;
    input_comprimento_peca.value = Peca.Comprimento[dn].replace(',','.');
}

function preencher_peso(){
    let aparelho = seletor_aparelhos.options[seletor_aparelhos.selectedIndex].innerHTML;
    let aparelhos = tabela_aparelho['aparelho-aparelho-sanitario'];
    let pesos = tabela_aparelho['aparelho-peso-relativo'];

    for (let i in pesos) {
        if (aparelho == aparelhos[i]){
            input_peso_unitario.value = pesos[i].replace(',','.')
        }
    }

    quantidade.value = 1;
}

function calcula_vazao() {
    let peso = input_peso.value;
    let vazao_ls = (0.3*peso**(0.5))
    let vazao = vazao_ls/1000*3600;

    verificar_vazio(input_peso,peso);

    input_vazao.value = vazao.toFixed(precisao);
    display_vazao.value = vazao_ls.toFixed(precisao);
    calcula_velocidade_perda();
}

function calcula_peso() {
    let vazao = input_vazao.value;
    let vazao_ls = vazao*1000/3600;
    let peso = (vazao_ls/0.3)**2;

    verificar_vazio(input_vazao,vazao);

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

function calculadora(){
    let valor = inputExpressao.value;
    let temAlgumaLetra = /[a-zA-Z]/.test(valor);

    if (!temAlgumaLetra){
        valor = valor.replaceAll('^','**').replaceAll(',','.');

        try{
            valor = eval(valor).toFixed(precisao);
        }catch(e){
            valor = 'error';
        }

        if (valor == Infinity){
            outputExpressao.value = 'error';
        }else if (valor){
            outputExpressao.value = valor;
        }else{
            outputExpressao.value = 'error';
        }
    }else{
        outputExpressao.value = 'invalid';
    }
}

function dragStart(event) {
    event.dataTransfer.setData("text", event.target.value);
}

let allowDrop = event=> event.preventDefault()

function drop(event) {
    event.preventDefault();
    let data = event.dataTransfer.getData("text");
    event.target.value = data;
}

let adicionar_peso = () => peso.value = (+peso.value + +peso_total.value).toFixed(precisao);

let calcula_peso_total = () => peso_total.value = (input_peso_unitario.value*quantidade.value).toFixed(precisao);
