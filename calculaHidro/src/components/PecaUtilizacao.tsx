import React, { useState } from "react";
import { Card } from "./Card";
import { SelectForm } from "./SelectForm";
import { InputFormNumber } from "./InputFormNumber";

export const PecaUtilizacao = () => {
    const [pack, setPack] = useState({
        peca: "",
        num: 0,
        peso: 0,
        pesoTotal: 0,
    });

    return (
        <Card title="Peças de Utilização">
            <SelectForm title="Peça" />
            <InputFormNumber title="Nº" value="" />
            <InputFormNumber title="Peso" value="" />
            <InputFormNumber title="Peso T." value="" />
        </Card>
    );
};
