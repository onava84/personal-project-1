import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearReduxState } from "../../redux/reducer";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./Menu.css";

const Menu = (props) => {
  const username = useSelector((reduxState) => reduxState.username);
  const dispatch = useDispatch();
  let history = useHistory();

  const handleLogOut = () => {
    axios.delete("/auth/logout").then((response) => {
      console.log(response);
      dispatch(clearReduxState());
      history.push("/login");
    });
  };

  const loggedInUsers = (
    <>
      <Link to="/">
        <li>Home</li>
      </Link>
      <Link to="/dashboard">
        <li>Dashboard</li>
      </Link>
      <Link to="/create-tournament">
        <li>Create tournament</li>
      </Link>
      <Link to="/tournaments">
        <li>See tournaments</li>
      </Link>
      <li onClick={() => handleLogOut()}>Logout</li>
    </>
  );

  const guestUsers = (
    <>
      <Link to="/">
        <li>Home</li>
      </Link>
      <Link to="/register">
        <li>Register</li>
      </Link>
      <Link to="/tournaments">
        <li>See tournaments</li>
      </Link>
      <Link to="/login">
        <li>Login</li>
      </Link>
    </>
  );

  return (
    <nav className="main-menu">
      <ul className="nav-container-link">
        {username ? loggedInUsers : guestUsers}
      </ul>
    </nav>
  );
};

export default Menu;
