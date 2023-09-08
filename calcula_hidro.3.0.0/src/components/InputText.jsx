import { Form } from "react-bootstrap";
import { PropTypes } from 'prop-types';

export const InputText = (props) => {
    return (
        <Form.Group className="mb-3">
            <Form.Label>{props.title}</Form.Label>
            <Form.Control type="text" placeholder={props.placeholder} readOnly={props.readOnly} value={props.value} onChange={props.onChange} onKeyUp={props.onKeyUp}/>
        </Form.Group>
    );
};

InputText.propTypes = {
    title : PropTypes.string.isRequired,
    readOnly : PropTypes.boolean,
    value: PropTypes.string,
    onChange : PropTypes.func,
    onKeyUp : PropTypes.func,
    placeholder : PropTypes.string,
}