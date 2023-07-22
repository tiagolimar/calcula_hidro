import { ColAuto } from "./ColAuto";
import { Input } from "./Input";

export const InputForm = (props) => {
    const width = props.width ? `-md-${props.width}` : "";
    const title = props.title ? props.title : "Campo";
    const unit = props.unit ? props.unit : " ";
    const id = title
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();

    return (
        <ColAuto>
            <label forhtml="quantidade">{title}</label>
            <p className="d-inline">{unit}</p>
            <Input id={id} />
        </ColAuto>
    );
};
