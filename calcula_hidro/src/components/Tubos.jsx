import { useEffect, useState } from "react";
import { InputFormNumber } from "./InputFormNumber";
import { Card } from "./Card";
import { SelectForm } from "./SelectForm";
import { Col } from "./Col";
import { obterTubos } from "./functions/obterTubos.js";
import { obterVazao,converterVazao, obterPeso, obterVelocidade, obterPerda } from "./functions/equations";

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

    useEffect(()=>{
        const vazaoLitro_ = obterVazao(peso);
        if (vazaoLitro != vazaoLitro_){
            setVazaoMetro(converterVazao(vazaoLitro_));
            setVazaoLitro(vazaoLitro_);
        }
    },[peso])
    
    useEffect(()=>{
        const vazaoLitro_ = converterVazao(vazaoMetro);
        if(vazaoLitro_ != vazaoLitro){
            setVazaoLitro(vazaoLitro_);
            setPeso(obterPeso(vazaoLitro_));
        }
    },[vazaoMetro])
    
    useEffect(()=>{
        if (vazaoMetro){
            setVelocidade(obterVelocidade(vazaoMetro,DI));
            setPerdaUnit(obterPerda(vazaoMetro,DI));
        }

        if(perdaUnit*lengthTotal){
            setPerdaTotal(perdaUnit*lengthTotal);
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
                onChange={e => setPeso(e.target.value)}
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
                    onChange={e=>{setVazaoMetro(e.target.value)}}
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