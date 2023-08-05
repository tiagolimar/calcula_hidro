import { Col } from "./Col";

export const InputNumber = (props) => {
    const type = props.type ? props.type : "text";
    const placeholder = props.placeholder ? props.placeholder : 'Digite...';
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
