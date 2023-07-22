import { Tubos } from './components/Tubos';
import { Calculadora } from './components/Calculadora';
import { Card } from './components/Card';
import { Nav } from './components/Nav';

function App() {

  return (
    <>
    <Nav />
      <div className="container p-2">
        <Calculadora />
        <Tubos />
        <Card title="Peças de Utilização"></Card>
        <Card title="Conexão"></Card>
      </div > 
    </>
  )
}

export default App
