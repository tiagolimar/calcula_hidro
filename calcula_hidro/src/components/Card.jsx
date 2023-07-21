export const Card = (props) => {
    return (
        <div className="card col-12 m-1 border-primary rounded-4">
            <div className="card-header d-flex justify-content-between">
                <h3 className="card-title fs-4">{props.title}</h3>
            </div>
            <div className="card-body d-flex gap-2">
                {props.children}
            </div>
        </div>
    )
}
