import { Col } from "./Col"
import { PropTypes } from 'prop-types';

export const Button = (props) => {
    const title = props.title ? props.title : 'Ok'
    const width = props.width ? props.width : ''
    const id = props.id ? props.id : title.normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

    return (
        <Col width={width}>
            <button className={`btn btn-primary`} 
            id={id} 
            onClick={props.onClick}
            >{title}</button>
        </Col>
    )
}

Button.propTypes = {
    title: PropTypes.string,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    id: PropTypes.string,
    onClick: PropTypes.func
}