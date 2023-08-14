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
    const [pack, setPack] = useState({
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
            const material_ = data[0].material;
            setPack({
                ...pack,
                listaTubos: data,
                listaMateriais: data.map((item) => item.material),
                material: material_,
                listaDN: data[0].dn_comercial_mm,
                listaDI: data[0].dn_interno_mm,
                DN: data[0].dn_comercial_mm[0],
                DI: data[0].dn_interno_mm[0],
                indexDN: 0,
            });
        })();
    }, []);

    const atualizarDN = (valor) => {
        const material_ = valor;
        if (pack.listaTubos.length > 0) {
            let i = 0;
            for (const tubo of pack.listaTubos) {
                if (tubo.material == material_) {
                    setPack({
                        ...pack,
                        material: material_,
                        listaDN: tubo.dn_comercial_mm,
                        listaDI: tubo.dn_interno_mm,
                        DN: tubo.dn_comercial_mm[0],
                        DI: tubo.dn_interno_mm[0],
                        indexDN: i,
                    });
                    break;
                }
                i++;
            }
        }
    };

    const atualizarDI = (valor) => {
        const DN_ = valor;
        const index = pack.listaDN.findIndex((dn) => dn == DN_);
        if (index !== -1) {
            const DI_ = pack.listaDI[index];

            let velocidade_ = pack.velocidade;
            let perdaUnit_ = pack.perdaUnit;
            let perdaTotal_ =
                pack.perdaUnit * pack.comprimentoTotal || pack.perdaTotal;

            if (pack.vazaoMetro) {
                velocidade_ = obterVelocidade(pack.vazaoMetro, DI_);
                perdaUnit_ = obterPerda(pack.vazaoMetro, DI_);
            }

            setPack({
                ...pack,
                DI: DI_,
                DN: DN_,
                velocidade: velocidade_,
                perdaUnit: perdaUnit_,
                perdaTotal: perdaTotal_,
            });
        }
    };

    const atualizaPeso = (peso_) => {
        const vazaoLitro_ = obterVazao(peso_);
        const vazaoMetro_ = deLitroPraMetro(vazaoLitro_);

        let velocidade_ = pack.velocidade;
        let perdaUnit_ = pack.perdaUnit;
        let perdaTotal_ =
            pack.perdaUnit * pack.comprimentoTotal || pack.perdaTotal;

        if (pack.vazaoMetro) {
            velocidade_ = obterVelocidade(pack.vazaoMetro, pack.DI);
            perdaUnit_ = obterPerda(pack.vazaoMetro, pack.DI);
        }

        setPack({
            ...pack,
            peso: peso_,
            vazaoLitro: vazaoLitro_,
            vazaoMetro: vazaoMetro_,
            velocidade: velocidade_,
            perdaUnit: perdaUnit_,
            perdaTotal: perdaTotal_,
        });
    };

    const atualizaVazao = (vazaoMetro_) => {
        const vazaoLitro_ = deMetroPraLitro(vazaoMetro_);
        const peso_ = obterPeso(vazaoLitro_);

        let velocidade_ = pack.velocidade;
        let perdaUnit_ = pack.perdaUnit;
        let perdaTotal_ =
            pack.perdaUnit * pack.comprimentoTotal || pack.perdaTotal;

        if (pack.vazaoMetro) {
            velocidade_ = obterVelocidade(pack.vazaoMetro, pack.DI);
            perdaUnit_ = obterPerda(pack.vazaoMetro, pack.DI);
        }

        setPack({
            ...pack,
            vazaoMetro: vazaoMetro_,
            vazaoLitro: vazaoLitro_,
            peso: peso_,
            velocidade: velocidade_,
            perdaUnit: perdaUnit_,
            perdaTotal: perdaTotal_,
        });
    };

    const atualizarPerda = (valor) => {
        const comprimentoTotal_ = valor;
        let velocidade_ = pack.velocidade;
        let perdaUnit_ = pack.perdaUnit;
        let perdaTotal_ = pack.perdaUnit * comprimentoTotal_ || pack.perdaTotal;

        if (pack.vazaoMetro) {
            velocidade_ = obterVelocidade(pack.vazaoMetro, pack.DI);
            perdaUnit_ = obterPerda(pack.vazaoMetro, pack.DI);
        }

        setPack({
            ...pack,
            comprimentoTotal: comprimentoTotal_,
            velocidade: velocidade_,
            perdaUnit: perdaUnit_,
            perdaTotal: perdaTotal_,
        });
    };

    return pack.listaTubos.length > 0 ? (
        <Card title="Tubos">
            <Col>
                <SelectForm
                    title="Material"
                    data={pack.listaMateriais}
                    value={pack.material}
                    onChange={(e) => atualizarDN(e.target.value)}
                />
                <InputFormNumber
                    title="Qm"
                    unit=" (m³/h)"
                    value={pack.vazaoMetro}
                    onChange={(e) => {
                        atualizaVazao(e.target.value);
                    }}
                />
                <InputFormNumber
                    disabled
                    title="Ql"
                    unit=" (l/s)"
                    value={pack.vazaoLitro}
                />

                <InputFormNumber
                    disabled
                    title="DI"
                    unit=" (mm)"
                    value={pack.DI}
                />
                <InputFormNumber
                    disabled
                    title="Ju"
                    unit=" (m/m)"
                    value={pack.perdaUnit}
                />
            </Col>
            <Col>
                <SelectForm
                    title="DN"
                    unit=" (mm)"
                    data={pack.listaDN}
                    value={pack.DN}
                    onChange={(e) => atualizarDI(e.target.value)}
                    selectedIndex={pack.indexDN}
                />
                <InputFormNumber
                    title="Peso R."
                    value={pack.peso}
                    onChange={(e) => atualizaPeso(e.target.value)}
                />
                <InputFormNumber
                    title="Lt"
                    unit=" (m)"
                    value={pack.comprimentoTotal}
                    onChange={(e) => atualizarPerda(e.target.value)}
                />
                <InputFormNumber
                    disabled
                    title="V"
                    unit=" (m/s)"
                    value={pack.velocidade}
                />
                <InputFormNumber
                    disabled
                    title="Jt"
                    unit=" (mca)"
                    value={pack.perdaTotal}
                />
            </Col>
        </Card>
    ) : null;
};
