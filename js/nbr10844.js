"use strict";

const id_iframe_ip = 'tabela-ip'
const id_iframe_vazao = 'tabela-vazao'
let tabela_ip = {}
let tabela_vazao = {}
let n = '0,011'

window.addEventListener('load', function() {
    tabela_ip = iframe_para_objeto(id_iframe_ip,'ip')
    tabela_vazao = iframe_para_objeto(id_iframe_vazao,'vazao')
    preencher_locais()
    preencher_vazao_unitario()
});

let preencher_locais = ()=>{
    let locais = Array.from(new Set(tabela_ip['ip-local']))
    criar_opcoes(locais,ip_local);
    preencher_tempo_retorno();
}

let preencher_tempo_retorno = ()=>{
    limpar_opcoes(ip_tempo)
    check_selecao_manual_ip()
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
    calcula_vazao()
}

let preencher_vazao_unitario = () => {
    let dn = ip_dn.options[ip_dn.selectedIndex].innerHTML
    let inclinacao = ip_inclinacao.options[ip_inclinacao.selectedIndex].innerHTML
    for (const i in tabela_vazao['vazao-dn']) {
        if ((tabela_vazao['vazao-dn'][i] == dn) && (tabela_vazao['vazao-inclinacao'][i] == inclinacao) && (tabela_vazao['vazao-n'][i] == n)) {
            let vazao = tabela_vazao['vazao-vazao'][i]
            ip_vazao_un1.value = vazao
            ip_vazao_un2.value = vazao/1000*60
        }
    }
}

let check_selecao_manual_ip = ()=>{
    let local = ip_local.options[ip_local.selectedIndex].innerHTML
    ip.disabled = local == 'Seleção Manual'? false : true
    ip_tempo.disabled = local == 'Seleção Manual'? true : false
}

let calcula_vazao = ()=>{
    verificar_vazio(ip_area,ip_area.value)
    let vazao_lmin = (ip.value*ip_area.value)/60
    let vazao_m3h = vazao_lmin/1000*60
    ip_vazao_proj1.value = vazao_lmin.toFixed(precisao)
    ip_vazao_proj2.value = vazao_m3h.toFixed(precisao)
}

