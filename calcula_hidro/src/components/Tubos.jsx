import React from "react";
import { InputFormNumber } from "./InputFormNumber";
import { Card } from "./Card";
import { SelectForm } from "./SelectForm";
import { Col } from "./Col";
import { getPipesMaterials } from "./functions/getPipesMaterials.js"

const pipesMaterials = await getPipesMaterials('./src/data/nbr_5626_tubos.json');
console.log(pipesMaterials);

export const Tubos = () => {
  return (
    <Card title="Tubos">
      <Col>
        <SelectForm title="Material" />
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
  );
};
