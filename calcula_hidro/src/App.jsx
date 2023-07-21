import { useState } from 'react';
import { Card } from './components/Card';

function App() {

  return (
    <>
      <Card title="Calculadora">
        <InputForm id='q' />
        <InputForm id='s' />
        <InputForm id='a' />
      </Card>
    </>
  )
}

export default App
