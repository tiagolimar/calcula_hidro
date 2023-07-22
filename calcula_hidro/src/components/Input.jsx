import { Col } from "./Col";

export const Input = (props) => {
    const type = props.type ? props.type : "text";
    const value = props.value ? props.value : undefined;
    const step = props.step ? props.step : 1;
    const min = props.min ? props.min : 1;
    const placeholder = props.placeholder ? props.placeholder : 'Digite...';
    const width = props.width ? `col-md-${props.width}` : ''

    return (
        <Col>
            <input type={type}
                value={value}
                tep={step}
                min={min}
                id={props.id}
                className={`form-control ${width}`}
                placeholder={placeholder}
            />
        </Col>
    )
}
