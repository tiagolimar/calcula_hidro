import { useState } from "react";
import { Card } from "./Card";
import { InputText } from "./InputText";
import { Button } from "./Button";
import { calcularExpressao } from "./functions/calcularExpressao";

/**
 * Represents a calculator component.
 * 
 * This component allows users to input an expression and calculate the result.
 * It uses React hooks to manage the state of the input and output values.
 * The component renders a Card component with an input field for the expression,
 * a button to calculate the expression, and an output field to display the result.
 * 
 * @returns {JSX.Element} The calculator component.
 */
export const Calculadora = () => {
  let [entrada, setEntrada] = useState("");
  let [saida, setSaida] = useState("");

  let handleOnKeyUp = (e)=> {
    if(e.keyCode == 13){ calc()}}

  let handleOnChange = (e)=>{
    entrada = e.target.value;
    setEntrada(entrada);
  }

  let calc = ()=>{
    let resultado = calcularExpressao(entrada)
    setSaida(resultado)
  } 
  
  return (
    <Card title="Calculadora">
        <InputText width={5} title="Resultado" placeholder="Expressão..." value={entrada} onChange={handleOnChange} onKeyUp={handleOnKeyUp} />
        <Button width={2} id="calcular" title="=" onClick={calc} />
        <InputText disabled title="Resultado" placeholder="Resultado..." value={saida} />
    </Card>
  );
};
