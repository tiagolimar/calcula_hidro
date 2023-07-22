import { ColAuto } from "./ColAuto";
// import { Select } from "./Select";

export const SelectForm = (props) => {
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
            <select id={id} onChange={''} className="form-select">
            </select>
        </ColAuto>
    );
};
