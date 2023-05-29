let ocultar_secao = e=>{
    let card = 'secao_' + e.target.id.replace('ocultar_','');
    card = document.getElementById(card);

    if (card.style.display == 'block' || card.style.display == ''){
        card.style.display = 'none';
    }else{
        card.style.display = 'block';
    }
}

const caracteres = {
    'á': 'a','à': 'a','â': 'a','ã': 'a',
    'é': 'e','è': 'e','ê': 'e','í': 'i',
    'ì': 'i','î': 'i','ó': 'o','ò': 'o',
    'ô': 'o','õ': 'o','ú': 'u','ù': 'u',
    'û': 'u','ç': 'c','.':'',' ':'-','\\':'-'
};
  
function substituir_caracteres(str) {
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
