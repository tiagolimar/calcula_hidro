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
  const [listDn, setListDn] = useState([]);

  const updateListDn = (data) => {
    return data;
  };

  console.log(material);
  
  useEffect(() => {
    (async () => {
      const data = await getPipes("./src/data/nbr_5626_tubos.json");
      setListPipes(data);
      setListMaterials(data.map((item) => item.material));
      setMaterial(data[0].material)
      setListDn(updateListDn(data));
    })();
  }, []);

  return listPipes.length > 0 ? (
    <Card title="Tubos">
      <Col>
        <SelectForm
          title="Material"
          data={listMaterials}
          value={material}
          onChange={e=>setMaterial(e.target.value)}
        />
        <SelectForm title="DN" unit=" (mm)" />
        <InputFormNumber title="Peso R." />
        <InputFormNumber title="Qm" unit=" (m³/h)" />
        <InputFormNumber disabled title="Ql" unit=" (l/s)" />
      </Col>
      <Col>
        <InputFormNumber disabled title="V" unit=" (m/s)" />
        <InputFormNumber disabled title="DI" unit=" (mm)" />
        <InputFormNumber disabled title="Lt" unit=" (m)" />
        <InputFormNumber disabled title="Ju" unit=" (m/m)" />
        <InputFormNumber disabled title="Jt" unit=" (mca)" />
      </Col>
    </Card>
  ) : null;
};
