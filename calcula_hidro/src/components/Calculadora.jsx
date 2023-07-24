import React from "react";
import { Card } from "./Card";
import { InputText } from "./InputText";
import { Button } from "./Button";

export const Calculadora = () => {
  return (
    <Card title="Calculadora">
        <InputText width={5} title="Resultado" placeholder="Expressão..." />
        <Button width={2} id="calcular" title="=" />
        <InputText disabled title="Resultado" placeholder="Resultado..." />
    </Card>
  );
};
