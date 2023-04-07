const iframe = document.querySelector("#tabela-tubos");
const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

function obter_materiais(){
    const cells = iframeDoc.querySelectorAll("#tabela_tubos td:nth-child(1)");
    const values = [];
    cells.forEach(cell => values.push(cell.textContent));
    const materiais = Array.from(new Set(values));
    return materiais
}


function preencher_materiais(){
    const select = document.querySelector('#selecionar-material')
    const materiais = obter_materiais();
    for (material of materiais){
        opcao = material.
    }
}