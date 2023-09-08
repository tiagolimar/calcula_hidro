export const MinimizeAndCloseButtons = (props) => {
    return (
      <div className="d-flex justify-content-between">
        <button className="btn btn-secondary btn-sm me-2" onClick={props.onClickMin} >&#8212;</button>
        <button className="btn btn-primary btn-sm" onClick={props.onClickMax} >&#9647;</button>
      </div>
    );
  };