function Sidebar() {
  return (
    <div className="offcanvas offcanvas-start show" id="offcanvas" aria-labelledby="offcanvasLabel">
    <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasLabel">Offcanvas</h5>
        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div className="offcanvas-body">
        Content for the offcanvas goes here. You can place just about any Bootstrap component or custom elements here.
    </div>
    </div>
  )
}

export default Sidebar