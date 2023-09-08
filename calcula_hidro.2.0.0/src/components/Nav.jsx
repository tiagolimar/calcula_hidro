export const Nav = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary col-12">
    <div className="container-fluid">
      <a className="navbar-brand" href="#">CalculaHidro</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
        aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarText">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="./index.html">NBR 5626:1998</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="./nbr10844.html">NBR 10844</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">NBR 8160</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  )
}
