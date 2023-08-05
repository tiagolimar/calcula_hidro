import { useEffect, useState } from "react";
import { InputFormNumber } from "./InputFormNumber";
import { Card } from "./Card";
import { SelectForm } from "./SelectForm";
import { Col } from "./Col";
import { getPipes } from "./functions/getPipes.js";

export const Tubos = () => {
    const [material, setMaterial] = useState("");
    const [listPipes, setListPipes] = useState([]);
    const [listMaterials, setListMaterials] = useState([]);
    const [listDN, setListDN] = useState([]);
    const [listDI, setListDI] = useState([]);
    const [DN, setDN] = useState(0);
    const [DI, setDI] = useState(0);
    const [indexDN,setIndexDN] = useState(0);

    const [clout,setClout] = useState(0);
    const [flowMeter,setFlowMeter] = useState(0);
    const [flowLiter,setFlowLiter] = useState(0);
    const [lengthTotal,setLengthTotal] = useState(0);
    const [lostTotal,setLostTotal] = useState(0);
    const [velocity,setVelocity] = useState(0);
    const [lostUnit,setLostUnit] = useState(0);

    useEffect(()=>{
        (async () => {
            const data = await getPipes("./src/data/nbr_5626_tubos.json");
            setListPipes(data);
            setListMaterials(data.map((item) => item.material));
            setMaterial(data[0].material);
        })();
    }, []);

    useEffect(()=>{
            if (listPipes.length > 0) {
                for (const pipe of listPipes) {
                    if (pipe.material == material) {
                        setListDN(pipe.dn_comercial_mm);
                        setListDI(pipe.dn_interno_mm);
                        setDN(pipe.dn_comercial_mm[0]);
                        setDI(pipe.dn_interno_mm[0]);
                        setIndexDN(0);
                    }
                }
            }
        },[material, listDI, listDN, listPipes]);

    useEffect(()=>{
            for (const i in listDN) {
                if (listDN[i] == DN) {
                  setDI(listDI[i]);
                  break;
                }
            }
        },[DN, listDI, listDN]);

    useEffect(()=>{
        const flow = eval(0.3*clout**0.5).toFixed(3);
        if (flow != flowLiter){
            setFlowLiter(flow);
            setFlowMeter(eval(0.3*clout**0.5/1000*3600).toFixed(3));
        }
    },[clout,flowLiter])
    
    useEffect(()=>{
        const flow = eval(flowMeter*1000/3600).toFixed(3);
        if(flow != flowLiter){
            setFlowLiter(flow);
            setClout(eval((flowLiter/0.3)**2).toFixed(3));
        }
    },[flowMeter,flowLiter])
    
    useEffect(()=>{
        const flow_MpS = flowMeter/3600;
        const diameter = DI/1000;

        if (flow_MpS){
            setVelocity((4*flow_MpS)/(Math.PI*diameter**2).toFixed(3));
            setLostUnit(0.000859*(flow_MpS**(1.75))/(diameter**4.75));
        }

        if(lostUnit*lengthTotal){
            setLostTotal(lostUnit*lengthTotal);
        }
        
    },[flowMeter,DI,lengthTotal])
    
    return listPipes.length > 0 ? (
        <Card title="Tubos">
            <Col>
                <SelectForm
                    title="Material"
                    data={listMaterials}
                    value={material}
                    onChange={(e) => setMaterial(e.target.value)}
                />
                <InputFormNumber 
                title="Peso R."
                value={clout}
                onChange={e => setClout(e.target.value)}
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
                    value={lostUnit}
                />
            </Col>
            <Col>
                <SelectForm
                    title="DN"
                    unit=" (mm)"
                    data={listDN}
                    value={DN}
                    onChange={e => setDN(e.target.value)}
                    selectedIndex = {indexDN}
                />
                <InputFormNumber
                    title="Qm"
                    unit=" (m³/h)"
                    value={flowMeter}
                    onChange={e=>{setFlowMeter(e.target.value)}}
                />
                <InputFormNumber
                    disabled
                    title="Ql"
                    unit=" (l/s)"
                    value={flowLiter}
                />
                <InputFormNumber
                    disabled
                    title="V"
                    unit=" (m/s)"
                    value={velocity}
                />
                <InputFormNumber
                    disabled
                    title="Jt"
                    unit=" (mca)"
                    value={lostTotal}
                />
            </Col>
        </Card>
    ) : null;
};
