import React, { useState } from "react";
import { Card } from "./Card";
import { InputText } from "./InputText";
import { Button } from "./Button";
import { calc_expression } from "./functions/calc_expression";

export const Calculadora = () => {
  let [input, setInput] = useState("");
  let [output, setOutput] = useState("");

  let handleOnKeyUp = (e)=> e.keyCode == 13 | calc()

  let handleOnChange = (e)=>{
    input = e.target.value;
    setInput(input);
  }

  let calc = ()=>{
    let resultado = calc_expression(input)
    setOutput(resultado)
  } 
  
  return (
    <Card title="Calculadora">
        <InputText width={5} title="Resultado" placeholder="Expressão..." value={input} onChange={handleOnChange} onKeyUp={handleOnKeyUp} />
        <Button width={2} id="calcular" title="=" onClick={calc} />
        <InputText disabled title="Resultado" placeholder="Resultado..." value={output} />
    </Card>
  );
};
