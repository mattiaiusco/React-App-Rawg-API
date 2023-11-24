import "./components-css/AppNavbar.css"
import AppSidebar from "./AppSidebar"
import { Link } from "react-router-dom"

export default function AppNavbar() {

    return (
        <nav class="navbar navbar-expand-lg">
            <div class="container-fluid d-flex flex-column justify-content-center align-items-center">
                <Link style={{'textDecoration': 'none', 'fontSize': '2.5rem'}} to={`/`}>GameHub</Link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="#">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Features</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Pricing</a>
                        </li>
                        <li class="nav-item">
                            <AppSidebar/>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}