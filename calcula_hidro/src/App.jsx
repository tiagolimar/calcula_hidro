import { Tubos } from './components/Tubos';
import { Calculadora } from './components/Calculadora';
import { PecaUtilizacao } from './components/PecaUtilizacao';
import { Card } from './components/Card';
import { Nav } from './components/Nav';

function App() {

  return (
    <>
    <Nav />
      <div className="container p-2">
        <Calculadora />
        <Tubos />
        <PecaUtilizacao />
        <Card title="Conexão">VAZIO</Card>
      </div > 
    </>
  )
}

export default App
