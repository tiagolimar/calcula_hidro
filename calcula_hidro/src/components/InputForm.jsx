import { Col } from "./Col";
import { Input } from "./Input";

export const InputForm = (props) => {
  const width = props.width ? `-md-${props.width}` : '';
  const title = props.title ? props.title : 'Campo';
  const id = title.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()

  return (
    <Col width={width} >
      <label forHTML="quantidade">{title}</label>
      <Input />
    </Col>
  )
}
