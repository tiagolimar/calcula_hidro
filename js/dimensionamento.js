"use strict";

let tabela_geral = document.querySelector('#tabela-dimencionamento');

let listaTrechos = [];

let dadosTrecho = {
    'TRECHO':'0,001',
    'PESO':'0,002',
    'Q(l/s)':'0,003',
    'V(m/s)':'0,004',
    'DN (mm)':'0,005',
    'DN int (mm)':'0,006',
    'L (m)':'0,007',
    'L eq. (m)':'0,008',
    'L total (m)':'0,008',
    'J (m/m)':'0,008',
    'Δ Nível (m)':'0,008',
    'ΔH (m)':'0,008',
    'P. inicial (mca)':'0,008',
    'P. final (mca)':'0,008'
};

let subDadosTrecho = {
    'TIPO':'0,001',
    'TRECHO':'0,001',
    'PESO':'0,002',
    'Q (l/s)':'0,003',
    'DN (mm)':'0,005',
    'DN int (mm)':'0,006',
    'L (m)':'0,007',
    'L eq. (m)':'0,008',
    'L total (m)':'0,008',
    'J (m/m)':'0,008',
    'Δ Nível (m)':'0,008',
    'ΔH (m)':'0,008',
    'P. inicial (mca)':'0,008',
    'P. final (mca)':'0,008'
};

function criarTabelaDeTrecho(objeto,sub_objeto) {
    let tabela = document.createElement("table");
    
    let linhaCabecalho = document.createElement("tr");
    
    for (let chave in objeto) {
      let celulaCabecalho = document.createElement("th");
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
      linhaConteudo.appendChild(celulaConteudo);
    }
    
    tabela.appendChild(linhaConteudo);
    
    let linhaExtra = document.createElement("tr");
    let celulaExtra = document.createElement("td");
    celulaExtra.colSpan = Object.keys(objeto).length;
    celulaExtra.id = 'hospedagem_sub_trecho';
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
    let linhaConteudo = document.createElement("tr");
    
    for (let chave in objeto) {
      let celulaConteudo = document.createElement("td");
      let textoConteudo = document.createTextNode(objeto[chave]);
      celulaConteudo.appendChild(textoConteudo);
      linhaConteudo.appendChild(celulaConteudo);
    }
    
    tabela.appendChild(linhaConteudo);

    return tabela;
}

function incluirSubTrechoEmTrecho(tabelaPrincipal, tabelaSecundaria) {
    let hospedagem = tabelaPrincipal.querySelector('#hospedagem_sub_trecho');
    hospedagem.appendChild(tabelaSecundaria);
}

let tabela_trecho = criarTabelaDeTrecho(dadosTrecho,subDadosTrecho);

let tabela_sub_trecho1 = criarTabelaDeSubTrecho(subDadosTrecho);
let tabela_sub_trecho2 = criarTabelaDeSubTrecho(subDadosTrecho);

incluirSubTrechoEmTrecho(tabela_trecho, tabela_sub_trecho1);
incluirSubTrechoEmTrecho(tabela_trecho, tabela_sub_trecho2);

tabela_geral.appendChild(tabela_trecho);
