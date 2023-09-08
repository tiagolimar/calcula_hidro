import { Container } from "react-bootstrap";
import { Calculadora } from './components/Secoes/Calculadora.jsx';
import { Tubos } from './components/Secoes/Tubos.jsx'

function App() {
    return (
        <>
            <Container className="d-flex flex-column justify-content-center p-4 gap-4">
                <Calculadora />
                <Tubos />
            </Container>
        </>
    );
}

export default App;
