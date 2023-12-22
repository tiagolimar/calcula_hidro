import Form from "react-bootstrap/Form";
import { PropTypes } from "prop-types";

export const Select = (props) => {
    return (
        <Form.Group className="mb-3">
            <Form.Label>{props.title}</Form.Label>
            <Form.Select >
                {props.dados
                    ? props.dados.map((dado, id) => (
                          <option key={id} value={dado}>
                              {dado}
                          </option>
                      ))
                    : null}
            </Form.Select>
        </Form.Group>
    );
};

Select.propTypes = {
    title: PropTypes.string.isRequired,
    dados: PropTypes.array,
};
