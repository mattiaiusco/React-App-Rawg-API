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
                <Link style={{ 'textDecoration': 'none', 'fontSize': '2.5rem' }} to={`/`}>GameHub</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        {session ? (
                            <ul className="navbar-nav d-flex justify-content-center align-items-center">
                                <li className="nav-item dropdown">
                                    <details role="list" dir="rtl">
                                        <summary aria-haspopup="listbox" role="link">
                                            {session.user.user_metadata.username || session.user.email}
                                        </summary>
                                        <ul role="listbox" className="ps-0 navbar-nav flex-column">
                                            <li className="nav-item pb-2">
                                                <Link style={{ textDecoration: "none" }} to="/account">Account page</Link>
                                            </li>
                                            <li className="nav-item pb-2">
                                                <Link style={{ textDecoration: "none" }} to="/settings">Settings page</Link>
                                            </li>
                                            <li className="nav-item" style={{ cursor: 'pointer' }}>
                                                <button className="btn btn-danger p-1" type="button" onClick={handleSignOut}>
                                                    Sign Out
                                                </button>
                                            </li>
                                        </ul>
                                    </details>
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