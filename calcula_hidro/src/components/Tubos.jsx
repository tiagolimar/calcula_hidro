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

  useEffect(function main () {
    (async () => {
      const data = await getPipes("./src/data/nbr_5626_tubos.json");
      setListPipes(data);
      setListMaterials(data.map((item) => item.material));
      setMaterial(data[0].material);
    })();
  }, []);

  useEffect(function updateListDN(){
    if (listPipes.length > 0) {
      for (const pipe of listPipes) {
        if (pipe.material == material) {
          setListDN(pipe.dn_comercial_mm);
          setListDI(pipe.dn_interno_mm)
        }
      }
    }
  },[material])

  return listPipes.length > 0 ? (
    <Card title="Tubos">
      <Col>
        <SelectForm
          title="Material"
          data={listMaterials}
          value={material}
          onChange={(e) => setMaterial(e.target.value)}
        />
        <InputFormNumber title="Peso R." />
        <InputFormNumber disabled title="DI" unit=" (mm)" />
        <InputFormNumber disabled title="V" unit=" (m/s)" />
        <InputFormNumber disabled title="Ju" unit=" (m/m)" />
      </Col>
      <Col>
        <SelectForm title="DN" unit=" (mm)" data={listDN} />
        <InputFormNumber title="Qm" unit=" (m³/h)" />
        <InputFormNumber disabled title="Ql" unit=" (l/s)" />
        <InputFormNumber disabled title="Lt" unit=" (m)" />
        <InputFormNumber disabled title="Jt" unit=" (mca)" />
      </Col>
    </Card>
  ) : null;
};
