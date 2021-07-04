import React from "react";
import { Link } from "react-router-dom";
import "./Menu.css";

const Menu = () => {
  return (
    <nav className="main-menu">
      <ul className="nav-container-link">
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/create-tournament">
          <li>Create Tournament</li>
        </Link>
        <Link to="/register">
          <li>Register</li>
        </Link>
        <Link to="/login">
          <li>Login</li>
        </Link>
      </ul>
    </nav>
  );
};

export default Menu;
