import React from "react";
import { Link } from "react-router-dom";
import starwars from "../../img/starwars.png";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-light bg-light d-flex justify-content-between mx-5 text-center">
      <Link className="navbar-brand" to="/">
        <img src={starwars} alt="Logo" width="50" height="50" />
      </Link>

      {/* Example single danger button */}
      <div className="btn-group">
        <button
          type="button"
          className="btn btn-danger dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Favorites
        </button>
        <ul className="dropdown-menu">
          <li>
            <a className="dropdown-item" href="#"></a>
          </li>
          <li>
            <a className="dropdown-item" href="#"></a>
          </li>
          <li>
            <a className="dropdown-item" href="#"></a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
