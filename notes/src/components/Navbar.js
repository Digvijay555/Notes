import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import "./style.css"
const Navbar = () => {

    let navigation = useNavigate();  
    let location = useLocation();  
    const logout = () =>{
        localStorage.removeItem('token');
        navigation('/login')
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-light shadow">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="" style={{color:"cadetblue",fontWeight:"bold"}}>NotesOnCloud</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" style={{color:"black"}} to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about" style={{color:"black"}}>About</Link>
                            </li>


                        </ul>
                        {!localStorage.getItem('token') ? <form className="d-flex" role="search">
                            <Link class="btn mx-1" style={{backgroundColor:"black", color:"cadetblue",fontSize:"18px",borderRadius:"7px"}} to="/login" role="button">Login</Link>
                            <Link class="btn btn-primary mx-1" style={{backgroundColor:"black", color:"cadetblue",fontSize:"18px",borderRadius:"7px"}} to="/signUp" role="button">SignUp</Link>
                        </form> : <button class="btn  mx-1" style={{backgroundColor:"black", color:"cadetblue",fontSize:"18px",borderRadius:"7px"}} onClick={logout}>LogOut</button>}
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar