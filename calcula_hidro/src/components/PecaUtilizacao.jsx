import { useEffect, useState } from "react";
import { Card } from "./Card";
import { SelectForm } from "./SelectForm";
import { InputFormNumber } from "./InputFormNumber";
import { fetchLocalJson } from "./functions/obterTubos";

export const PecaUtilizacao = () => {
    const [dados,setDados] = useState([])
    const [pecas,setPecas] = useState([])
    const [pack, setPack] = useState({
        peca: "",
        quant: 0,
        peso: 0,
        pesoTotal: 0,
    });

    useEffect(()=>{(async ()=> {
        const dados_ = await fetchLocalJson("./src/data/pesos-5626-98.json");
        setDados(dados_);
        setPecas(dados_.map(item=>item["peca_hidrossanitaria"]))
        setPack({...pack,
            peca: dados_[0]["peca_hidrossanitaria"],
            peso: dados_[0]["peso_relativo"]
        });
    })()},[])

    const atualizarPeca = e =>{
        const peca = e.target.value;

        const indexPeca = pecas.findIndex(peca_=> peca_ == peca);
        const pesos = dados.map(i=>i["peso_relativo"]);

        const peso = pesos[indexPeca];
        const pesoTotal = (pack.quant * peso).toFixed(5);
    
        setPack({
            ...pack,
            ["peca"]: peca,
            ["peso"]: peso,
            ["pesoTotal"]: pesoTotal,
        });

    }
    
    const atualizaNum = e=>{
        const quant = e.target.value;
        const pesoTotal = (quant * pack.peso).toFixed(5)

        setPack({ ...pack, ["quant"]: quant, ["pesoTotal"]: pesoTotal });
    }

    
    return (
        <Card title="Peças de Utilização">
            <SelectForm
                title="Peça"
                data={pecas}
                value={pack.peca}
                onChange={atualizarPeca}
            />
            <InputFormNumber
                title="Nº"
                value={pack.quant}
                onChange={atualizaNum}
            />
            <InputFormNumber disabled title="Peso" value={pack.peso} />
            <InputFormNumber disabled title="Peso T." value={pack.pesoTotal} />
        </Card>
    );
};
