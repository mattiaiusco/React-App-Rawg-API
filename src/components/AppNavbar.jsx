import "./components-css/AppNavbar.css"
import AppSidebar from "./AppSidebar"
import { Link } from "react-router-dom"

export default function AppNavbar() {

    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid d-flex flex-column justify-content-center align-items-center">
                <Link style={{'textDecoration': 'none', 'fontSize': '2.5rem'}} to={`/`}>GameHub</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to={"/login"}>Login</Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link" to={"/signup"}>Sign-up</Link>
                        </li>
                        <li className="nav-item">
                            <AppSidebar/>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}