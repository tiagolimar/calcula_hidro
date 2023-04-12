const id_tabela_tubo = 'tabela-tubos';

const seletor_material = document.querySelector('#material');
const seletor_diametro = document.querySelector('#diametro');

const input_dn_interno = document.querySelector('#dn-int');
const input_vazao = document.querySelector('#vazao');
const display_vazao = document.querySelector('#display-vazao');
const input_peso = document.querySelector('#peso');
const input_velocidade = document.querySelector('#velocidade');
const input_perda = document.querySelector('#perda');
const input_perda_total = document.querySelector('#perda-total');
const input_comprimento = document.querySelector('#comprimento');

const precisao = 3;

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
    
    if(vazao>0 && diametro>0){
        vazao /= 3600;
        diametro /= 1000;

        let velocidade = (4*vazao)/(Math.PI*diametro**2)
        let perda = 0.000859*(vazao**(1.75))/(diametro**4.75);

        input_velocidade.value = velocidade.toFixed(precisao);
        input_perda.value = perda.toFixed(precisao+1);

        if(comprimento>0){
            input_perda_total.value = (comprimento*perda).toFixed(precisao);
        }
    }
}

function preencher_id_dn(){
    Tubo.Id_Dn = event.target.options[event.target.selectedIndex].value;
    input_dn_interno.value = Tubo.DnInterno[Tubo.Id_Dn].replace(',','.');
    calcula_velocidade_perda();
}

function obter_materiais(){
    const iframe = document.querySelector(`#${id_tabela_tubo}`);
    const coluna_materiais = iframe.contentDocument.documentElement.querySelectorAll('#tubos td:nth-child(1)');
    let valores_materiais = [];
    coluna_materiais.forEach(celula => valores_materiais.push(celula.textContent));
    const materiais = Array.from(new Set(valores_materiais));
    return materiais
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

    if (seletor_diametro.options.length < 1){
        seletor_material.options[0].selectedIndex = 0;
    }
    preencher_diametros();
}

function obter_diametros(material) {
    const iframe = document.querySelector(`#${id_tabela_tubo}`);

    const coluna_materiais = iframe.contentDocument.documentElement.querySelectorAll('#tubos td:nth-child(1)');
    const coluna_dn = iframe.contentDocument.documentElement.querySelectorAll('#tubos td:nth-child(2)');
    const coluna_dn_interno = iframe.contentDocument.documentElement.querySelectorAll('#tubos td:nth-child(5)');

    Tubo.Dn = [];
    Tubo.DnInterno = [];
    Tubo.Id_Dn = 0;

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

function preencher_diametros(){
    while(seletor_diametro.firstChild){
        seletor_diametro.removeChild(seletor_diametro.firstChild);
    }
    
    let material = seletor_material.options[seletor_material.selectedIndex].innerHTML;
    obter_diametros(material);
    let diametros = Tubo.Dn;

    for (let i = 0; i < diametros.length; i++){
        opcao = document.createElement('option');
        opcao.setAttribute('value', i);
        opcao.innerHTML = diametros[i];
        seletor_diametro.appendChild(opcao);
    }

    input_dn_interno.value = Tubo.DnInterno[Tubo.Id_Dn].replace(',','.');
    calcula_velocidade_perda();
}
