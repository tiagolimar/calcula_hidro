"use strict";

let tabela_geral = document.querySelector('#secao-dimensionamento');
let listaTrechos = [];
let num_id_trecho = 0;

let dadosTrecho = {
    'TRECHO':'0-1',
    'PESO':'148,8',
    'Q(l/s)':'3,660',
    'V(m/s)':'2,407',
    'DN (mm)':'50,0',
    'DN int (mm)':'44,0',
    'L (m)':'11,550',
    'L eq. (m)':'9,50',
    'L total (m)':'21,05',
    'J (m/m)':'0,1299',
    'Δ Nível (m)':'1,000',
    'ΔH (m)':'2,734',
    'P. inicial (mca)':'0,000',
    'P. final (mca)':'-2,734'
};

let subDadosTrecho = {
    'TRECHO':'0-1',
    'TIPO':'TUBO',
    'PESO':'148,8',
    'Q (l/s)':'3,660',
    'DN (mm)':'50,0',
    'DN int (mm)':'44,0',
    'L (m)':'11,550',
    'L eq. (m)':'9,50',
    'L total (m)':'21,05',
    'J (m/m)':'0,1299',
    'Δ Nível (m)':'1,000',
    'ΔH (m)':'2,734',
    'P. inicial (mca)':'0,000',
    'P. final (mca)':'-2,734'
};

function criarTabelaDeTrecho(objeto,sub_objeto) {
    let tabela = document.createElement("table");
    tabela.classList.add("tabela-trecho");

    let linhaCabecalho = document.createElement("tr");
    linhaCabecalho.onclick = minimizarSubTrecho;

    for (let chave in objeto) {
      let celulaCabecalho = document.createElement("th");
      celulaCabecalho.classList.add(".bg-dark-subtle");
      let textoCabecalho = document.createTextNode(chave);
      celulaCabecalho.appendChild(textoCabecalho);
      linhaCabecalho.appendChild(celulaCabecalho);
    }
    
    tabela.appendChild(linhaCabecalho);
    
    let linhaConteudo = document.createElement("tr");
    
    for (let chave in objeto) {
      let celulaConteudo = document.createElement("td");
      let textoConteudo = document.createTextNode(objeto[chave]);
      celulaConteudo.appendChild(textoConteudo);
      celulaConteudo.classList.add("py-2");
      celulaConteudo.classList.add("bg-body-secondary");
      linhaConteudo.appendChild(celulaConteudo);
    }
    
    tabela.appendChild(linhaConteudo);
    
    let linhaExtra = document.createElement("tr");
    let celulaExtra = document.createElement("td");
    celulaExtra.colSpan = Object.keys(objeto).length;
    celulaExtra.classList.add('hospedagem_sub_trecho');
    celulaExtra.classList.add('p-2');
    let contador = 0;
    let linhaCabecalhoExtra = document.createElement("tr");
    
    for (let chave in sub_objeto){
        contador++;
        let celulaCabecalhoExtra = document.createElement("th");
        let textoCabecalho = document.createTextNode(chave);
        celulaCabecalhoExtra.appendChild(textoCabecalho);
        linhaCabecalhoExtra.appendChild(celulaCabecalhoExtra);

        if (contador == Object.keys(sub_objeto).length){
            celulaExtra.appendChild(linhaCabecalhoExtra);
        }
    }

    linhaExtra.appendChild(celulaExtra);
    tabela.appendChild(linhaExtra);
    
    return tabela;
}

function criarTabelaDeSubTrecho(objeto) {
    let tabela = document.createElement("table");
    tabela.classList.add("tabela-subtrecho");

    let linhaConteudo = document.createElement("tr");
    
    for (let chave in objeto) {
      let celulaConteudo = document.createElement("td");
      celulaConteudo.classList.add("py-1");
      celulaConteudo.classList.add("bg-body-secondary");
      let textoConteudo = document.createTextNode(objeto[chave]);
      celulaConteudo.appendChild(textoConteudo);
      linhaConteudo.appendChild(celulaConteudo);
    }
    
    tabela.appendChild(linhaConteudo);

    return tabela;
}

function incluirSubTrechoEmTrecho(tabelaPrincipal, tabelaSecundaria) {
    let hospedagem = tabelaPrincipal.querySelector('.hospedagem_sub_trecho');
    hospedagem.appendChild(tabelaSecundaria);
}

function incluirTrecho(){
    ver_secao_dimensionamento(true);
    let tabela_trecho = criarTabelaDeTrecho(dadosTrecho,subDadosTrecho);
    tabela_geral.appendChild(tabela_trecho);
    listaTrechos.push(tabela_trecho);
}

function incluirSubTrecho(){
    ver_secao_dimensionamento(true);
    if (listaTrechos.length==0){
        incluirTrecho();
    }
    let tabela_trecho = listaTrechos[listaTrechos.length-1];
    let tabela_sub_trecho = criarTabelaDeSubTrecho(subDadosTrecho);
    incluirSubTrechoEmTrecho(tabela_trecho, tabela_sub_trecho);
}

function removerTrecho(){
    if (listaTrechos.length>0){
        listaTrechos[listaTrechos.length-1].remove();
        listaTrechos.pop();
    }
}

function ver_secao_dimensionamento(forcarMostrar = false){
    if (forcarMostrar){
        secao_dimensionamento.style.display = 'block';
    }else{
        if (secao_dimensionamento.style.display == 'block' || secao_dimensionamento.style.display == ''){
            secao_dimensionamento.style.display = 'none';
        }else{
            secao_dimensionamento.style.display = 'block';
        }
    }
}

function minimizarSubTrecho() {
    let subTrecho = this.parentNode.getElementsByTagName('tr')[2].querySelector('td.hospedagem_sub_trecho');
    if (subTrecho.style.display==''){
        subTrecho.style.display = 'none';
    }else{
        subTrecho.style.display = '';
    }
}

function criar_nome_trecho() {
    num_id_trecho = +num_id_trecho + 1;
    return `{num_id_trecho-1}-{num_id_trecho}`
}

incluirSubTrecho();
incluirSubTrecho();
incluirSubTrecho();

