import React from 'react'
import { InputForm } from './InputForm'
import { Card } from './Card'

const seq = (num)=>{
    let list = []
    for (let index = 0; index < num; index++) list.push(<InputForm title={`campo${index+1}`} width={3} />)
    return list
}

export const Tubos = () => {
  return (
    <Card title='Tubos'>
        {seq(10)}
    </Card>
  )
}
