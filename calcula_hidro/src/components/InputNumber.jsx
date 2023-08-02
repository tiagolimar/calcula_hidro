import { Col } from "./Col";

export const InputNumber = (props) => {
    const type = props.type ? props.type : "text";
    const step = props.step ? props.step : 0.1;
    const min = props.min ? props.min : 0.0;
    const placeholder = props.placeholder ? props.placeholder : 'Digite...';
    const width = props.width ? props.width : '';
    const disabled = props.disabled ? props.disabled : false;
    
    return (
        <Col width={width}>
            <input type={type}
                value={props.value}
                step={step}
                min={min}
                id={props.id}
                className={`form-control ${width}`}
                placeholder={placeholder}
                disabled = {disabled}
                onChange={props.onChange}
            />
        </Col>
    )
}
