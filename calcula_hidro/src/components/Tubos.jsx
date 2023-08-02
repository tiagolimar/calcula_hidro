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

    const [clout,setClout] = useState(0)

    useEffect(function main() {
        (async () => {
            const data = await getPipes("./src/data/nbr_5626_tubos.json");
            setListPipes(data);
            setListMaterials(data.map((item) => item.material));
            setMaterial(data[0].material);
        })();
    }, []);

    useEffect(function updateListDN() {
            if (listPipes.length > 0) {
                for (const pipe of listPipes) {
                    if (pipe.material == material) {
                        setListDN(pipe.dn_comercial_mm);
                        setListDI(pipe.dn_interno_mm);
                        setDN(pipe.dn_comercial_mm[0]);
                        setDI(pipe.dn_interno_mm[0]);
                        setIndexDN(1)
                    }
                }
            }
        },[material, listDI, listDN, listPipes]);

    useEffect(function updateDI() {
            for (const i in listDN) {
                if (listDN[i] == DN) {
                  setDI(listDI[i]);
                  break;
                }
            }
        },[DN, listDI, listDN]);

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

                <InputFormNumber disabled title="DI" unit=" (mm)" value={DI} />
                <InputFormNumber disabled title="V" unit=" (m/s)" />
                <InputFormNumber disabled title="Ju" unit=" (m/m)" />
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

                <InputFormNumber title="Qm" unit=" (m³/h)" />
                <InputFormNumber disabled title="Ql" unit=" (l/s)" />
                <InputFormNumber disabled title="Lt" unit=" (m)" />
                <InputFormNumber disabled title="Jt" unit=" (mca)" />
            </Col>
        </Card>
    ) : null;
};

Qm	vazaoMetros
Ql	vazaoLitros
Lt	lengthTotal
Jt	lostTotal
V	velocitypesoin
Ju	lostUnit