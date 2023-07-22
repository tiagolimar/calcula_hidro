import React from 'react'
import { Card } from './Card'
import { Input } from './Input'
import { Button } from './Button'

export const Calculadora = () => {
    return (
        <Card title="Calculadora">
            <Input width=' ' title="Resultado" placeholder="Expressão..." />
            <Button title="Calcular" width={1} />
            <Input width={5} title="Resultado" placeholder="Resultado..." />
        </Card>
    )
}
