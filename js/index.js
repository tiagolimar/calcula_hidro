"use strict";

let precisao = 3

let criar_tabela_sessao = () => {
    let secao_legiveis = {}
    let template_obj = {
        'tabela':`
        <table>
            <thead>
                <tr><CABECALHO></tr>
            </thead>
            <tbody>
            </tbody>
        </table>
        `,
    }
    
    Array.from(document.querySelectorAll('.card-body.legivel')).forEach(e => {
        let obj = {...template_obj}
        obj.id = e.id
        let cabecalho = ''
        Array.from(e.querySelectorAll('label.legivel')).forEach(label => {
            cabecalho += `<th>${label.innerHTML}</th>`
        })
        obj.tabela = obj.tabela.replace('<CABECALHO>',cabecalho)
        secao_legiveis[e.id] = obj
    });
    return secao_legiveis
}

let secao_legiveis = criar_tabela_sessao()

let ocultar_secao = e=>{
    let card = 'secao_' + e.target.id.replace('ocultar_','');
    card = document.getElementById(card);

    if (card.style.display == 'block' || card.style.display == ''){
        card.style.display = 'none';
    }else{
        card.style.display = 'block';
    }
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

let adicionar_secao = (e)=>{
    let card = 'secao_' + e.target.id.replace('adicionar_','');
    card = document.getElementById(card);

    const input = Array.from(card.querySelectorAll('input.legivel'))
    const select = Array.from(card.querySelectorAll('select.legivel'))
    let campos = input.concat(select)

    let obj = secao_legiveis[card.id]

    let dados = ''
    let cancelar_processo = false

    campos.forEach(campo=>{
        if (campo.value>0){
            dados += `<td>${campo.value}</td>`
        }else{
            let label_correspondente = document.querySelector(`label[for="${campo.id}"]`)
            alert(`preencha o campo ${label_correspondente.innerHTML}`)
            cancelar_processo = true
        }
    })
    if (!cancelar_processo){
        obj.tabela = obj.tabela.replace('</tbody>', `\t<tr>${dados}</tr>\n\t\t\t</tbody>`)
        secao_legiveis[card.id] = {...obj}
    }
    console.log(secao_legiveis.secao_tubo.tabela);
}