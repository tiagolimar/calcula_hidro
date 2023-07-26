export const calc_expression = (valor) => {
    let valor_de_saida;
    let temAlgumaLetra = /[a-zA-Z]/.test(valor);
    
    if (!temAlgumaLetra) {
        valor = valor.replaceAll('^', '**').replaceAll(',', '.');
        
        try {
            valor = eval(valor);
        } catch (e) {
            return 'error';
        }
        
        if (valor == Infinity) {
            valor_de_saida = 'error';
        } else {
            valor_de_saida = (valor && valor!=0) ? valor : 'error' 
        }
    } else {
        valor_de_saida = 'error';
    }
    return valor_de_saida
}

