import { useEffect, useState } from "react";
import { InputFormNumber } from "./InputFormNumber";
import { Card } from "./Card";
import { SelectForm } from "./SelectForm";
import { Col } from "./Col";
import { obterTubos } from "./functions/obterTubos.js";
import {
    obterVazao,
    deMetroPraLitro,
    deLitroPraMetro,
    obterPeso,
    obterVelocidade,
    obterPerda,
} from "./functions/equations";

export const Tubos = () => {
    const [inputs, setInputs] = useState({
        material: "",
        listaTubos: [],
        listaMateriais: [],
        listaDN: [],
        listaDI: [],
        DN: 0,
        DI: 0,
        indexDN: 0,
        peso: 0,
        vazaoMetro: 0,
        vazaoLitro: 0,
        comprimentoTotal: 0,
        perdaTotal: 0,
        velocidade: 0,
        perdaUnit: 0,
    });

    useEffect(() => {
        (async () => {
            const data = await obterTubos("./src/data/nbr_5626_tubos.json");
            const material = data[0].material;
            setInputs({
                ...inputs,
                listaTubos: data,
                listaMateriais: data.map((item) => item.material),
                material,
                listaDN: data[0].dn_comercial_mm,
                listaDI: data[0].dn_interno_mm,
                DN: data[0].dn_comercial_mm[0],
                DI: data[0].dn_interno_mm[0],
                indexDN: 0,
            });
        })();
    }, []);

    const atualizarDN = (material) => {
        if (inputs.listaTubos.length > 0) {
            let indexDN = 0;
            for (const tubo of inputs.listaTubos) {
                if (tubo.material == material) {
                    const DN = tubo.dn_comercial_mm[0];
                    const DI = tubo.dn_interno_mm[0]
                    const listaDN = tubo.dn_comercial_mm;
                    const listaDI = tubo.dn_interno_mm;
                    setInputs({
                        ...inputs, material, listaDN, listaDI, DN, DI, indexDN,
                    });
                    atualizarDI({DN, listaDI, listaDN});
                    break;
                }
                indexDN++;
            }
        }
    };

    const atualizarDI = ({DN, listaDI, listaDN}) => {
        listaDI = listaDI || inputs.listaDI;
        listaDN = listaDN || inputs.listaDN;
        const index = listaDN.findIndex((dn) => dn == DN);
        if (index !== -1) {
            const DI = listaDI[index];
            const {velocidade,perdaUnit,perdaTotal} = atualizaInputs({DI});
            setInputs({ ...inputs, DI, DN, velocidade, perdaUnit, perdaTotal});
        }
    };

    const atualizaPeso = (peso) => {
        const vazaoLitro = obterVazao(peso);
        const vazaoMetro = deLitroPraMetro(vazaoLitro);
        const DI = inputs.DI;
        const {velocidade,perdaUnit,perdaTotal} = atualizaInputs({DI});
        setInputs({ ...inputs, peso, vazaoLitro, vazaoMetro, velocidade, perdaUnit, perdaTotal});
    };

    const atualizaVazao = (vazaoMetro) => {
        const vazaoLitro = deMetroPraLitro(vazaoMetro);
        const peso = obterPeso(vazaoLitro);
        const DI = inputs.DI;
        const {velocidade,perdaUnit,perdaTotal} = atualizaInputs({DI,vazaoMetro});
        setInputs({...inputs, vazaoMetro, vazaoLitro, peso, velocidade, perdaUnit, perdaTotal });
    };

    const atualizarPerda = (comprimentoTotal) => {
        const DI = inputs.DI;
        const {velocidade,perdaUnit,perdaTotal} = atualizaInputs({DI,comprimentoTotal});
        setInputs({ ...inputs, comprimentoTotal, velocidade, perdaUnit, perdaTotal});
    };

    const atualizaInputs = ({DI,comprimentoTotal,perdaTotal,vazaoMetro})=>{
        vazaoMetro = vazaoMetro || inputs.vazaoMetro;
        comprimentoTotal = comprimentoTotal || inputs.comprimentoTotal;
        const velocidade = inputs.vazaoMetro? obterVelocidade(inputs.vazaoMetro, DI) : inputs.velocidade;
        const perdaUnit = inputs.vazaoMetro? obterPerda(inputs.vazaoMetro, DI) : inputs.perdaUnit;
        perdaTotal = inputs.perdaUnit * inputs.comprimentoTotal || inputs.perdaTotal;
        return {velocidade, perdaUnit, perdaTotal}
    }

    return inputs.listaTubos.length > 0 ? (
        <Card title="Tubos">
            <Col>
                <SelectForm
                    title="Material"
                    data={inputs.listaMateriais}
                    value={inputs.material}
                    onChange={(e) => atualizarDN(e.target.value)}
                />
                <InputFormNumber
                    title="Qm"
                    unit=" (m³/h)"
                    value={inputs.vazaoMetro}
                    onChange={(e) => {
                        atualizaVazao(e.target.value);
                    }}
                />
                <InputFormNumber
                    disabled
                    title="Ql"
                    unit=" (l/s)"
                    value={inputs.vazaoLitro}
                />

                <InputFormNumber
                    disabled
                    title="DI"
                    unit=" (mm)"
                    value={inputs.DI}
                />
                <InputFormNumber
                    disabled
                    title="Ju"
                    unit=" (m/m)"
                    value={inputs.perdaUnit}
                />
            </Col>
            <Col>
                <SelectForm
                    title="DN"
                    unit=" (mm)"
                    data={inputs.listaDN}
                    value={inputs.DN}
                    onChange={(e) => atualizarDI({[DN]:e.target.value})}
                    selectedIndex={inputs.indexDN}
                />
                <InputFormNumber
                    title="Peso R."
                    value={inputs.peso}
                    onChange={(e) => atualizaPeso(e.target.value)}
                />
                <InputFormNumber
                    title="Lt"
                    unit=" (m)"
                    value={inputs.comprimentoTotal}
                    onChange={(e) => atualizarPerda(e.target.value)}
                />
                <InputFormNumber
                    disabled
                    title="V"
                    unit=" (m/s)"
                    value={inputs.velocidade}
                />
                <InputFormNumber
                    disabled
                    title="Jt"
                    unit=" (mca)"
                    value={inputs.perdaTotal}
                />
            </Col>
        </Card>
    ) : null;
};
