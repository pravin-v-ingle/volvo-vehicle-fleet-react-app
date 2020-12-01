import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from '../assets/VolvoGroup.png';
const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
      <img  src={logo}  alt="Volvo Fleet"/>
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
         
          <NavLink className="nav-item nav-link" to="/vehicles/new">
           Insert Vehicle
          </NavLink>
          <NavLink className="nav-item nav-link" to="/findVehiclesByChassisId">
           Find & Edit/Delete Vehicle(s)
          </NavLink>
          <NavLink className="nav-item nav-link" to="/vehicles">
           All Vehicles
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
