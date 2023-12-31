import {React, useEffect} from 'react'
import {Link,useLocation} from "react-router-dom";
import { useHistory } from 'react-router-dom';
export default function Navbar() {
    let history = useHistory();
    const handleLogout = () =>{
        localStorage.removeItem('token');
        history.push("/login");
    }
    let location = useLocation();
    useEffect(() => {
    }, [location]);
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark border-bottom border-bottom-dark" data-bs-theme="dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">iNotebook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname==='/'?'active':''}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname==='/about'?'active':''}`} to="/about">About</Link>
                        </li>
                    </ul>

                </div>
                {!localStorage.getItem('token') ?
                    <div>
                        <Link className="btn btn-primary mx-1 btn-sm" to="/login" role="button">Login</Link>
                        <Link className="btn btn-primary mx-1 btn-sm" to="/signup" role="button">Signup</Link>
                    </div>
                    : <button type="button" className="btn btn-primary" onClick={handleLogout}>Logout</button>

                }
            </div>
        </nav>
    )
}
