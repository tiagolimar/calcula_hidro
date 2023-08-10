import React, { useState } from "react";
import { Card } from "./Card";
import { SelectForm } from "./SelectForm";
import { InputFormNumber } from "./InputFormNumber";

export const PecaUtilizacao = () => {
    const [conexao, set] = useState("");
    const [num, setNum] = useState(0);
    const [peso, setPeso] = useState(0);
    const [pesoTotal, setPesoTotal] = useState(0);


    return (
        <Card title="Peças de Utilização">
            <SelectForm title="Peça" />
            <InputFormNumber title="Nº" value="" />
            <InputFormNumber title="Peso" value="" />
            <InputFormNumber title="Peso T." value="" />
        </Card>
    );
};
