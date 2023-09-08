import Card from "react-bootstrap/Card";
export const Secao = (props) => {
    return (
        <Card border="primary" className="w-100">
            <Card.Header>{props.title}</Card.Header>
            <Card.Body>
                <h1>HELOO</h1>
            </Card.Body>
        </Card>
    );
};

PropType