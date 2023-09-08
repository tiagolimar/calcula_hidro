import { Col } from "./Col";
import { InputNumber } from "./InputNumber";
import { Label } from "./Label";
import { convert_id } from "./functions/convert_id";
import { PropTypes } from 'prop-types';

export const InputFormNumber = (props) => {
  const width = props.width ? props.width : "";
  const title = props.title ? props.title : "Campo";
  const unit = props.unit ? props.unit : " ";
  const disabled = props.disabled ? props.disabled : false;
  const id = convert_id(title);

  return (
    <Col width={width}>
      <Label htmlFor={id} title={title} />
      <p className="d-inline">{unit}</p>
      <InputNumber
        disabled={disabled}
        id={id}
        value={props.value}
        placeholder={props.placeholder}
        onChange={props.onChange}
      />
    </Col>
  );
};

InputFormNumber.propTypes = {
  width: PropTypes.string,
  title: PropTypes.string,
  unit: PropTypes.string,
  disabled: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};