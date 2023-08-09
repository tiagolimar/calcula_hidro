const precisao = 3;

const formatar = num=> num.toFixed(precisao)
export const obterVazao = (peso) => {
    return formatar(0.3*peso**0.5);
}

export const converterVazao = (vazaoMetro)=>{
    const vazaoLitro = formatar(vazaoMetro*1000/3600);
    return vazaoLitro;
}

export const obterPeso = (vazaoLitro)=>{
    return formatar((vazaoLitro/0.3)**2);
}

export const obterVelocidade = (vazaoMetro,DI)=>{
    const vazaoMpS = vazaoMetro/3600;
    const diameter = DI/1000; 
    return formatar((4*vazaoMpS)/(Math.PI*diameter**2));
}

export const obterPerda = (vazaoMetro,DI)=>{
    const vazaoMpS = vazaoMetro/3600;
    const diameter = DI/1000; 
    return formatar(0.000859*(vazaoMpS**(1.75))/(diameter**4.75));
}