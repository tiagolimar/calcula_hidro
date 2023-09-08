import Card from "react-bootstrap/Card";
import { PropTypes } from "prop-types";
import { Col, Row } from "react-bootstrap";
export const Secao = (props) => {
    return (
        <Card border="primary" className="w-100">
            <Card.Header>{props.title}</Card.Header>
            <Card.Body>
                <Row>
                    {props.children.map((item, id) => {
                        return <Col key={id}>{item}</Col>;
                    })}
                </Row>
            </Card.Body>
        </Card>
    );
};

Secao.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};
