import { Col } from "./Col"

export const Button = (props) => {
    const title = props.title ? props.title : 'Ok'
    const event_ = props.event_ ? props.event_ : () => { alert('Click') }
    const width = props.width ? props.width : ''

    return (
        <Col width={width}>
            <button className={`btn btn-primary`} onclick={event_}>{title}</button>
        </Col>
    )
}