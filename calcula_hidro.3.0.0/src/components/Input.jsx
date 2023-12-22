import { Form } from "react-bootstrap";
import { PropTypes } from "prop-types";

export const Input = (props) => {
    return (
        <Form.Group className="mb-3">
            <Form.Label>{props.title}</Form.Label>
            <Form.Control
                type={props.type ? props.type : "number"}
                placeholder={props.placeholder}
                readOnly={props.readOnly || false}
                value={props.value}
                onChange={props.onChange}
                onKeyUp={props.onKeyUp}
            />
        </Form.Group>
    );
};

Input.propTypes = {
    title: PropTypes.string.isRequired,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    readOnly: PropTypes.bool,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onChange: PropTypes.func,
    onKeyUp: PropTypes.func,
};
