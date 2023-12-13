import "./components-css/AppNavbar.css";
import AppSidebar from "./AppSidebar";
import AppContext from '../contexts/AppContext';
import supabase from '../supabase/database'
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";



export default function AppNavbar() {
    const { session } = useContext(AppContext);
    const navigate = useNavigate();

    const handleSignOut = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid d-flex flex-column justify-content-center align-items-center">
                <Link style={{ 'textDecoration': 'none', 'fontSize': '2.5rem' }} to={`/`}>Game<span style={{color: "#3ecf8e"}}>Hub</span></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    {session ? (
                        <ul className="navbar-nav d-flex justify-content-center align-items-center">
                            <li className="nav-item dropdown">
                                <a style={{color: "#3ecf8e"}} className="m-0 nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {session.user.user_metadata.username || session.user.email}
                                </a>
                                <ul className="dropdown-menu">
                                    <li className="ps-3 pb-2"><Link style={{ textDecoration: "none" }} to="/account">Account page</Link></li>
                                    <li className="ps-3"><Link style={{ textDecoration: "none" }} to="/settings">Settings page</Link></li>
                                    <hr className="mb-2" />
                                    <li className="ps-3"><button className="btn btn-link text-light text-decoration-none ps-0 p-1" type="button" onClick={handleSignOut}>
                                        Sign Out
                                    </button></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <AppSidebar />
                            </li>
                        </ul>
                    ) : (
                        <ul className="navbar nav">
                            <li className="nav-item pe-3">
                                <Link style={{ textDecoration: "none" }} to="/login">Login</Link>
                            </li>
                            <li className="nav-item pe-2">
                                <Link style={{ textDecoration: "none" }} to="/signup">Register</Link>
                            </li>
                            <li className="nav-item">
                                <AppSidebar />
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        </nav >
    )
}