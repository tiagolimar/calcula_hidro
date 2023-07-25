import { Col } from "./Col";
import { InputNumber } from "./InputNumber";
import { Label } from "./Label";
import { convert_id } from "./functions/convert_id";

export const InputFormNumber = (props) => {
    const width = props.width ? props.width : "";
    const title = props.title ? props.title : "Campo";
    const unit = props.unit ? props.unit : " ";
    const disabled = props.disabled ? props.disabled : false
    const id = convert_id(title)

    return (
        <Col width={width}>
            <Label htmlFor={id} title={title} />
            <p className="d-inline">{unit}</p>
            <InputNumber disabled={disabled} id={id} />
        </Col>
    );
};
