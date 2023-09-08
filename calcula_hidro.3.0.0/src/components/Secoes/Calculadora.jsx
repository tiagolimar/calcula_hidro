import { useState } from "react";
import { Button } from "react-bootstrap";

import { InputText } from "../InputText";
import { Secao } from "../Secao";
import { calcularExpressao } from "../Funcoes/calcularExpressao.js";

export const Calculadora = () => {
    let [entrada, setEntrada] = useState("");
    let [saida, setSaida] = useState("");

    let calcular = () => setSaida(calcularExpressao(entrada));

    return (
        <Secao title="Calculadora">
            <InputText
                title="Expressão"
                value={entrada}
                onChange={(e) => setEntrada(e.target.value)}
                onKeyUp={(e) => e.keyCode == 13 && calcular()}
                placeholder="Escreva..."
            />

            <Button className="w-100 mt-4" onClick={calcular}>
                Calcular
            </Button>
            
            <InputText
                title="Resultado"
                readOnly
                value={saida}
                placeholder="resultado..."
            />
        </Secao>
    );
};
