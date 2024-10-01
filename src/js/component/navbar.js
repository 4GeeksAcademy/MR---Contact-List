import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
    return (
        <nav className="navbar navbar-light bg-light ms-2">
            <Link to="/">
                <span className="navbar-brand mb-0 h1">Contact list</span>
            </Link>
            <div className="ml-auto d-flex align-items-center">
                <Link to="/addUser" className="me-2"> 
                    <button className="btn btn-outline-secondary">Add new User</button>
                </Link>
                <Link to="/addContact" className="me-2">
                    <button className="btn btn-info">Add new contact</button>					
                </Link>
            </div>
        </nav>
    );
};
