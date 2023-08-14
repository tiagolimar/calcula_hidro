import { PropTypes } from 'prop-types';

export const Label = (props) => {
  return (
    <label htmlFor={props.htmlFor} className="mt-2">{props.title}</label>
  )
}

Label.propTypes = {
  htmlFor: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}