"strict mode";

const {valoresAlpha, valoresPerdaDeCarga} = window.constantes;

function calcularVazaoAR(e) {
    e.preventDefault();

    const diametroTQ = Number(document.getElementById("diametroTQ").value);
    const vazaoTQ = Number(document.getElementById("vazaoTQ").value);
    const comprimentoCV_ = Number(document.getElementById("comprimentoCV_").value);
    const vazaoAR = document.getElementById("vazaoAR");
    const vazaoAR_ = document.getElementById("vazaoAR_");
    const diametroCV = document.getElementById("diametroCV");
    const diametroCV_ = document.getElementById("diametroCV_");

    if (Number.isNaN(vazaoTQ) || Number.isNaN(comprimentoCV_)) {
        alert("Os valores informados não são válidos.");
        return;
    }

    const alpha = valoresAlpha[`${diametroTQ}`];
    const f = valoresPerdaDeCarga[`${diametroCV_.value}`];
    console.log(f);
    
    const vazaoARCalculada = alpha * vazaoTQ ** (2/5) - 1.5 * vazaoTQ;
    const vazaoARCalculada_ = vazaoARCalculada * 40;

    vazaoAR.value = vazaoARCalculada;
    vazaoAR_.value = vazaoARCalculada_;

    
    const dnCV = (4.06 * (comprimentoCV_/1000 * vazaoARCalculada_ ** 2) ** (1/5)) * f ** 0.2;

    diametroCV.value =  dnCV;
}

function metroParaMilimetro(id1, id2) {
    document.getElementById(id2).value = document.getElementById(id1).value * 1000;
}

document.getElementById("formVazaoAR").addEventListener("submit", calcularVazaoAR);
document.getElementById("comprimentoCV").addEventListener("input", () => metroParaMilimetro("comprimentoCV", "comprimentoCV_"));