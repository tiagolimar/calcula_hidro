import { Col } from "./Col";
import { InputText } from "./InputText";
import { Label } from "./Label";

export const InputForm = (props) => {
    const width = props.width ? props.width : "";
    const title = props.title ? props.title : "Campo";
    const unit = props.unit ? props.unit : " ";
    const id = title
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();

    return (
        <Col width={width}>
            <Label htmlFor={id} title={title} />
            <p className="d-inline">{unit}</p>
            <InputText id={id} />
        </Col>
    );
};
