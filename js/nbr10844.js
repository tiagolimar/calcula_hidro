"use strict";

const id_iframe_ip = 'tabela-ip';
const id_iframe_vazao = 'tabela-vazao';
let tabela_ip = {};
let tabela_vazao = {};

window.addEventListener('load', function() {
    tabela_ip = iframe_para_objeto(id_iframe_ip,'ip');
    tabela_vazao = iframe_para_objeto(id_iframe_vazao,'vazao');
    preencher_locais();
});




let preencher_locais = ()=>{
    let locais = Array.from(new Set(tabela_ip['ip-local']))
    criar_opcoes(locais,ip_local);
    preencher_tempo_retorno();
}

let preencher_tempo_retorno = ()=>{
    limpar_opcoes(ip_tempo)
    let local = ip_local.options[ip_local.selectedIndex].innerHTML

    if(local!='Seleção Manual'){
        let opcoes_retorno = []
    
        for (const i in tabela_ip['ip-tempo-de-retorno']) {
            if (tabela_ip['ip-local'][i]==local) {
                opcoes_retorno.push(tabela_ip['ip-tempo-de-retorno'][i])
            }
        }
        criar_opcoes(opcoes_retorno,ip_tempo)
        preencher_ip()
    }
}

let preencher_ip = ()=>{
    let local = ip_local.options[ip_local.selectedIndex].innerHTML
    let retorno = ip_tempo.options[ip_tempo.selectedIndex].innerHTML

    for (const i in tabela_ip['ip-ip']) {
        if (tabela_ip['ip-local'][i] === local && tabela_ip['ip-tempo-de-retorno'][i] === retorno) {
            ip.value = tabela_ip['ip-ip'][i];
        }
    }
}

let check_selecao_manual_ip = ()=>{
    let local = ip_local.options[ip_local.selectedIndex].innerHTML
    ip.disabled = local == 'Seleção Manual'? true : false
}