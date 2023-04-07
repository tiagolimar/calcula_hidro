const id_tabela_tubo = 'tabela-tubos';
const seletor_material = document.querySelector('#selecionar-material');
const seletor_diametro = document.querySelector('#selecionar-diametro');

window.addEventListener('load', function() {
    preencher_materiais();
});

function obter_materiais(){
    const iframe = document.querySelector(`#${id_tabela_tubo}`);
    const coluna_materiais = iframe.contentDocument.documentElement.querySelectorAll('#tubos td:nth-child(1)');
    let valores_materiais = [];
    coluna_materiais.forEach(celula => valores_materiais.push(celula.textContent));
    const materiais = Array.from(new Set(valores_materiais));
    return materiais
}

function obter_diametros(material) {
    const iframe = document.querySelector(`#${id_tabela_tubo}`);

    const coluna_materiais = iframe.contentDocument.documentElement.querySelectorAll('#tubos td:nth-child(1)');
    const coluna_dn_comercial = iframe.contentDocument.documentElement.querySelectorAll('#tubos td:nth-child(2)');
    
    let valores_dn_comercial = [];
    let valores_materiais = [];
  
    coluna_dn_comercial.forEach(celula => valores_dn_comercial.push(celula.textContent));
    coluna_materiais.forEach(celula => valores_materiais.push(celula.textContent));
  
    let diametros = [];
    valores_materiais.forEach((mat, index) => {
      if (mat === material) {
        diametros.push(valores_dn_comercial[index]);
      }
    });
    console.log(diametros);
    return diametros;
}

function preencher_materiais(){
    const materiais = obter_materiais();
    let i = 1;

    for (material of materiais){
        opcao = document.createElement('option');
        opcao.setAttribute('value', i);
        i++;
        opcao.innerHTML = material;
        seletor_material.appendChild(opcao);
    }
}

function preencher_diametros(){
    while(seletor_diametro.firstChild){
        seletor_diametro.removeChild(seletor_diametro.firstChild);
    }
    
    let material = event.target.options[event.target.selectedIndex].innerHTML;
    const diametros = obter_diametros(material);

    for (let i = 1; i <= diametros.length; i++){
        opcao = document.createElement('option');
        opcao.setAttribute('value', i);
        opcao.innerHTML = diametros[i-1];
        seletor_diametro.appendChild(opcao);
    }
}