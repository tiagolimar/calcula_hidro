const id_tabela_tubo = 'tabela-tubos';
const seletor_material = document.querySelector('#selecionar-material');
const seletor_diametro = document.querySelector('#selecionar-diametro');

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
    const coluna_dn = iframe.contentDocument.documentElement.querySelectorAll('#tubos td:nth-child(2)');
    const coluna_dn_interno = iframe.contentDocument.documentElement.querySelectorAll('#tubos td:nth-child(5)');

    for(let i in coluna_materiais){
        valor_material = coluna_materiais[i].textContent;
        
        if(valor_material === material) {
            valor_dn = coluna_dn[i].textContent;
            valor_dn_interno = coluna_dn_interno[i].textContent;
            Tubo.Dn.push(valor_dn);
            Tubo.DnInterno.push(valor_dn_interno);
        }
    }
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
    obter_diametros(material);
    let diametros = Tubo.Dn;

    for (let i = 0; i < diametros.length; i++){
        opcao = document.createElement('option');
        opcao.setAttribute('value', i);
        opcao.innerHTML = diametros[i];
        seletor_diametro.appendChild(opcao);
    }
}

function preencher_id_dn(){
    Tubo.Id_Dn = event.target.options[event.target.selectedIndex].value;
    console.log(Tubo.Id_Dn);
}