import "./components-css/AppNavbar.css"

export default function AppNavbar() {
    return (
        <nav className="navbar navbar-expand-lg" data-bs-theme="dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">MY GAMES</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <form className="d-flex w-100" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search game..." aria-label="Search" />
                    </form>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link login" aria-current="page" href="#">Login</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link register" href="#">Register</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}