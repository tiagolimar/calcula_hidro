export const Card = (props) => {
    const round = props.round ? props.round : 3

    return (
        <div className={`card col-12 mt-2 mb-2 border-primary rounded-${round}`}>
            <div className="card-header d-flex justify-content-between">
                <h3 className="card-title fs-6">{props.title}</h3>
            </div>
            <div className="card-body d-flex flex-wrap gap-2">
                {props.children}
            </div>
        </div>
    )
}
