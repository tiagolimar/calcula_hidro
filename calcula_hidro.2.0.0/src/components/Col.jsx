import { PropTypes } from 'prop-types';

export const Col = (props) => {
    const width = props.width ? `-${props.width}` : ''
    return (
        <div className={`col${width}`}>{props.children}</div>
    )
}

Col.propTypes = {
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    children: PropTypes.node.isRequired,
}