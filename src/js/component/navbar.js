import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import starwars from "../../img/starwars.png";
import SearchBar from "./searchBar";

export const Navbar = () => {
  const { store, actions } = useContext(Context);

  return (
    <nav className="navbar navbar-light bg-light d-flex justify-content-between mx-5 text-center">
      <Link className="navbar-brand" to="/">
        <img src={starwars} alt="Logo" width="50" height="50" />
      </Link>

      {/* Search Bar */}
      <SearchBar />

      {/* Favorites Dropdown */}
      <div className="dropdown">
        <button
          className="btn btn-primary dropdown-toggle"
          type="button"
          id="favoritesDropdown"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Favorites{" "}
          <span className="badge bg-warning">{store.favorites.length}</span>
        </button>
        <ul className="dropdown-menu dropdown-menu-end">
          {store.favorites.length > 0 ? (
            store.favorites.map((fav) => (
              <li
                key={`${fav.uid}-${fav.type}`}
                className="d-flex justify-content-between align-items-center px-3"
              >
                <Link to={`/${fav.type}/${fav.uid}`} className="dropdown-item">
                  {fav.name} <span className="text-muted">({fav.type})</span>
                </Link>
                <button
                  className="btn btn-light btn-sm"
                  onClick={() => actions.removeFavorite(fav.uid, fav.type)}
                >
                  <i className="fas fa-trash-alt"></i>
                </button>
              </li>
            ))
          ) : (
            <li className="dropdown-item text-center text-muted">
              No favorites yet
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};
