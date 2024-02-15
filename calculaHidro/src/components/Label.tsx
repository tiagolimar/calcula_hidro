export const Label = (props) => {
  return (
    <label htmlFor={props.htmlFor} className="mt-2">{props.title}</label>
  )
}
