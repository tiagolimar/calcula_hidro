import { obterDadosTubos } from "../../Funcoes/obterDadosTubos";

const dadosTubos = await obterDadosTubos("./src/assets/nbr_5626_tubos.json")
const materiais = dadosTubos.map(tubo=>tubo.material)
const material = materiais[0]
const diametros = dadosTubos.filter(dado=>dado.material==material)[0].dn_comercial_mm

const campos = {
    material: {nome:"Material", valor: material, tipo: "select", dados:materiais, soLer:false },
    diametrosNominais: {nome:"DN (mm)", valor: 0, tipo: "select", dados: diametros, soLer:false },
    diametroInterno: {nome:"DI (mm)", valor: 0, tipo: "input", soLer:true },
    pesoRelativo: {nome:"Peso R.", valor: 0, tipo: "input", soLer:false },
    vazaoMetro: {nome:"Q (m³/h)", valor: 0, tipo: "input", soLer:false },
    vazaoLitro: {nome:"Q (l/s)", valor: 0, tipo: "input", soLer:true },
    velocidade: {nome:"V (m/s)", valor: 0, tipo: "input", soLer:true },
    comprimento: {nome:"L (m)", valor: 0, tipo: "input", soLer:false },
    perdaUnitaria: {nome:"Perda U.", valor: 0, tipo: "input", soLer:true },
    perdaTotal: {nome:"Perda T. (mca)", valor: 0, tipo: "input", soLer:true },
};

const banana = ()=>{

}
banana
export default campos;
