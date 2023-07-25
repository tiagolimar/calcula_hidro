import { Col } from "./Col";

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
                value={props.value}
            />
        </Col>
    )
}
