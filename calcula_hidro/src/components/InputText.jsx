import { Col } from "./Col";
import { PropTypes } from 'prop-types';

export const InputText = (props) => {
    const placeholder = props.placeholder ? props.placeholder : 'Digite...';
    const width = props.width ? props.width : '';
    const disabled = props.disabled ? props.disabled : false;

    return (
        <Col width={width}>
            <input type="text"
                id={props.id}
                className={`form-control ${width}`}
                placeholder={placeholder}
                disabled = {disabled}
                onChange={props.onChange}
                onKeyUp={props.onKeyUp}
                value={props.value}
            />
        </Col>
    )
}

InputText.propTypes = {
    placeholder: PropTypes.string,
    id: PropTypes.string,
    onKeyUp: PropTypes.func,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
}