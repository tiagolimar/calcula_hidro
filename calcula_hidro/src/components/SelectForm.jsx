import { Col } from "./Col";
import { Select } from "./Select";
import { Label } from "./Label";

export const SelectForm = (props) => {
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
      <Select id={id} onChange={props.onChange}>
        {props.data ? (props.data.map((item, id) => {
          return <option value={item} key={id}>{item}</option>;
        })):null}
      </Select>
    </Col>
  );
};
