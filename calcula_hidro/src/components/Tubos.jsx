import { useEffect, useRef, useState } from "react";
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
    const [material, setMaterial] = useState("");
    const [listaTubos, setListaTubos] = useState([]);
    const [listaMateriais, setListaMateriais] = useState([]);
    const [listaDN, setListaDN] = useState([]);
    const [listaDI, setListaDI] = useState([]);
    const [DN, setDN] = useState(0);
    const [DI, setDI] = useState(0);
    const [indexDN,setIndexDN] = useState(0);

    const [peso,setPeso] = useState(0);
    const [vazaoMetro,setVazaoMetro] = useState(0);
    const [vazaoLitro,setVazaoLitro] = useState(0);
    const [lengthTotal,setLengthTotal] = useState(0);
    const [perdaTotal,setPerdaTotal] = useState(0);
    const [velocidade,setVelocidade] = useState(0);
    const [perdaUnit,setPerdaUnit] = useState(0);
    
    const [dataTubo,setDataTubo] = useState({
        DN: 0,
        DI: 0,
        indexDN: 0,
        peso: 0,
        vazaoMetro: 0,
        vazaoLitro: 0,
        lengthTotal: 0,
        perdaTotal: 0,
        velocidade: 0,
        perdaUnit: 0,
    })
    
    useEffect(()=>{
        (async () => {
            const data = await obterTubos("./src/data/nbr_5626_tubos.json");
            setListaTubos(data);
            setListaMateriais(data.map((item) => item.material));
            setMaterial(data[0].material);
        })();
    }, []);

    useEffect(()=>{
        if (listaTubos.length > 0) {
            for (const tubo of listaTubos) {
                if (tubo.material == material) {
                    setListaDN(tubo.dn_comercial_mm);
                    setListaDI(tubo.dn_interno_mm);
                    setDN(tubo.dn_comercial_mm[0]);
                    setDI(tubo.dn_interno_mm[0]);
                    setIndexDN(0);
                }
            }
        }
    },[material, listaDI, listaDN, listaTubos]);

    useEffect(()=>{
        const index = listaDN.findIndex(dn => dn == DN);
        if (index !== -1) {
            setDI(listaDI[index]);
        }
    },[DN, listaDI, listaDN]);

    const atualizaPeso = (peso_)=>{
        const vazaoLitro_ = obterVazao(peso_);
        const vazaoMetro_ = deLitroPraMetro(vazaoLitro_)
       
        setPeso(peso_);
        setVazaoLitro(vazaoLitro_);
        setVazaoMetro(vazaoMetro_);
    }

    const atualizaVazao = (vazaoMetro_)=>{
        const vazaoLitro_ = deMetroPraLitro(vazaoMetro_);
        const peso_ = obterPeso(vazaoLitro_);
        
        setVazaoMetro(vazaoMetro_);
        setVazaoLitro(vazaoLitro_);
        setPeso(peso_);
    }
    
    useEffect(()=>{
        if (vazaoMetro){
            const velocidade_= obterVelocidade(vazaoMetro,DI);
            const perdaUnit_ = obterPerda(vazaoMetro,DI);

            setVelocidade(velocidade_);
            setPerdaUnit(perdaUnit_);
        }

        if(perdaUnit*lengthTotal){
            const perdaTotal_ = perdaUnit*lengthTotal;
            setPerdaTotal(perdaTotal_);
        }
        
    },[vazaoMetro,DI,lengthTotal])
    
    return listaTubos.length > 0 ? (
        <Card title="Tubos">
            <Col>
                <SelectForm
                    title="Material"
                    data={listaMateriais}
                    value={material}
                    onChange={(e) => setMaterial(e.target.value)}
                />
                <InputFormNumber
                title="Peso R."
                value={peso}
                onChange={({target})=>atualizaPeso(target.value)}
                />
                <InputFormNumber
                    title="Lt"
                    unit=" (m)"
                    value={lengthTotal}
                    onChange={e=>setLengthTotal(e.target.value)}
                />
                <InputFormNumber disabled
                    title="DI"
                    unit=" (mm)"
                    value={DI}
                />
                <InputFormNumber disabled
                    title="Ju"
                    unit=" (m/m)"
                    value={perdaUnit}
                />
            </Col>
            <Col>
                <SelectForm
                    title="DN"
                    unit=" (mm)"
                    data={listaDN}
                    value={DN}
                    onChange={e => setDN(e.target.value)}
                    selectedIndex = {indexDN}
                />
                <InputFormNumber
                    title="Qm"
                    unit=" (m³/h)"
                    value={vazaoMetro}
                    onChange={({target})=>{atualizaVazao(target.value)}}
                />
                <InputFormNumber
                    disabled
                    title="Ql"
                    unit=" (l/s)"
                    value={vazaoLitro}
                />
                <InputFormNumber
                    disabled
                    title="V"
                    unit=" (m/s)"
                    value={velocidade}
                />
                <InputFormNumber
                    disabled
                    title="Jt"
                    unit=" (mca)"
                    value={perdaTotal}
                />
            </Col>
        </Card>
    ) : null;
};