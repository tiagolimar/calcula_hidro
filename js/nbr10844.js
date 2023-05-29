"use strict";

const id_iframe_ip = 'tabela-ip';
const id_iframe_vazao = 'tabela-vazao';
let tabela_ip = {};
let tabela_vazao = {};

window.addEventListener('load', function() {
    tabela_ip = iframe_para_objeto(id_iframe_ip,'ip');
    tabela_vazao = iframe_para_objeto(id_iframe_vazao,'vazao');
});
