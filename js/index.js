"use strict";

let precisao = 3

let ocultar_secao = e=>{
    let card = 'secao_' + e.target.id.replace('ocultar_','');
    card = document.getElementById(card);

    if (card.style.display == 'block' || card.style.display == ''){
        card.style.display = 'none';
    }else{
        card.style.display = 'block';
    }
}

let adicionar_secao = e=>{
    let obj = {}
    let card = 'secao_' + e.target.id.replace('adicionar_','');
    card = document.getElementById(card);
    let labels = Array.from(card.querySelectorAll('label'))
    let input = Array.from(card.querySelectorAll('input'))
    let select = Array.from(card.querySelectorAll('select'))
    let campos = input.concat(select)

    for (const campo of campos) {
        let id_value = campo.id
        for (const label of labels) {
            let id_chave = label.htmlFor
            if (id_chave == id_value) {
                obj[label.innerHTML] = campo.value
                break
            }
        }
    }
    objParaTabela(obj, secao_rascunho)
}

function substituir_caracteres(str) {
    const caracteres = {
        'á': 'a','à': 'a','â': 'a','ã': 'a',
        'é': 'e','è': 'e','ê': 'e','í': 'i',
        'ì': 'i','î': 'i','ó': 'o','ò': 'o',
        'ô': 'o','õ': 'o','ú': 'u','ù': 'u',
        'û': 'u','ç': 'c','.':'',' ':'-','\\':'-'
    };

    let new_str = '';
    for (let char of str) new_str += caracteres[char] || char;
    return new_str;
}

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

function criar_opcoes(lista,seletor){
    for (let i=1; i<= lista.length;i++){
        let opcao = document.createElement('option');
        opcao.setAttribute('value', i);
        opcao.innerHTML = lista[i-1];
        seletor.appendChild(opcao);
    }
}

let limpar_opcoes = seletor => {while(seletor.firstChild) seletor.removeChild(seletor.firstChild)}

function verificar_vazio(input,valor){
    if(!valor || valor < 0) input.classList.add('text-danger');
    else input.classList.remove('text-danger');
}

let objParaTabela = (obj, container) => {
    let template_html = `
    <table>
        <thead>
            <tr>
                <CABECALHO>
            </tr>
        </thead>
        <tbody>
            <tr>
                <CORPO>
            </tr>
        </tbody>
    </table>
    `

    let headerRow = ''
    for (const key in obj) {
        headerRow += `<th>${key}</th>`
    }
    template_html = template_html.replace('<CABECALHO>', headerRow)

    let dataRow = ''
    for (const key in obj) {
        dataRow += `<td>${obj[key]}</td>`
    }
    template_html = template_html.replace('<CORPO>', dataRow)

    container.innerHTML += template_html
}