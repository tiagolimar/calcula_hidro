import { Col } from "./Col";
import { PropTypes } from 'prop-types';

export const InputNumber = (props) => {
    const type = props.type ? props.type : "number";
    const placeholder = props.placeholder ? props.placeholder : 'Sem valor...';
    const width = props.width ? props.width : '';
    const disabled = props.disabled ? props.disabled : false;
    
    return (
        <Col width={width}>
            <input type={type}
                value={props.value}
                min={0}
                id={props.id}
                className={`form-control ${width}`}
                placeholder={placeholder}
                disabled = {disabled}
                onChange={props.onChange}
            />
        </Col>
    )
}

InputNumber.propTypes = {
    width: PropTypes.string,
    type: PropTypes.string,
    title: PropTypes.string,
    id: PropTypes.string,
    disabled: PropTypes.bool,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
  };