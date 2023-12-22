export async function buscarJsonLocal(caminhoArquivo) {
    try {
        const resposta = await fetch(caminhoArquivo);
        if (!resposta.ok) {
            throw new Error(
                `Falha na requisição: ${resposta.status} ${resposta.statusText}`
            );
        }
        const objetoJson = await resposta.json();
        return objetoJson;
    } catch (erro) {
        console.error("Ocorreu um erro ao obter o arquivo JSON:", erro);
    }
}

function obterValoresUnicosPorChave(arrayObjetos, nomeChave) {
    const valoresUnicos = new Set();

    for (const obj of arrayObjetos) {
        if (Object.prototype.hasOwnProperty.call(obj, nomeChave)) {
            valoresUnicos.add(obj[nomeChave]);
        } else {
            throw new Error(`Chave inválida: ${nomeChave}`);
        }
    }

    return Array.from(valoresUnicos);
}

function agruparPorValorUnico(arrayObjetos, nomeChave, valoresUnicosArray) {
    const arrayResultado = [];

    for (const valor of valoresUnicosArray) {
        const objetoAgrupado = { [nomeChave]: valor };
        for (const obj of arrayObjetos) {
            if (obj[nomeChave] === valor) {
                for (const chave in obj) {
                    if (chave !== nomeChave) {
                        if (!Object.prototype.hasOwnProperty.call(objetoAgrupado, chave)) {
                            objetoAgrupado[chave] = [];
                        }
                        objetoAgrupado[chave].push(obj[chave]);
                    }
                }
            }
        }
        arrayResultado.push(objetoAgrupado);
    }

    return arrayResultado;
}

export const obterDadosTubos = async (arquivo) => {
    const tubos = await buscarJsonLocal(arquivo);
    const tiposMateriais = obterValoresUnicosPorChave(tubos, "material");
    const materiaisAgrupados = agruparPorValorUnico(tubos, "material", tiposMateriais);
    return materiaisAgrupados;
};