import { Col } from "./Col";
import { Select } from "./Select";
import { Label } from "./Label";
import { PropTypes } from "prop-types";

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
            <Select
                id={id}
                onChange={props.onChange}
                value={props.value}
                selectedIndex={props.selectedIndex}
            >
                {props.data
                    ? props.data.map((item, id) => {
                          return (
                              <option value={item} key={id}>
                                  {item}
                              </option>
                          );
                      })
                    : null}
            </Select>
        </Col>
    );
};

SelectForm.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node,
    width: PropTypes.string,
    unit: PropTypes.string,
    id: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    selectedIndex: PropTypes.number,
    data: PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    ).isRequired,
    onChange: PropTypes.func.isRequired,
};
