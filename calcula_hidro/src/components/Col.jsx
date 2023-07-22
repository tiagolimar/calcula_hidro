export const Col = (props) => {
    const width = props.width ? `-md-${props.width}` : ''
    return (
        <div className={`col${width}`}>{props.children}</div>
    )
}