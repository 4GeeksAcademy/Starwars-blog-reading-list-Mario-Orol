import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router";

const SearchBar = () => {
  const { store } = useContext(Context);
  const navegate = useNavigate();
  const [query, setQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  // Handle search input
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setQuery(value);

    if (value.length === 0) {
      setFilteredResults([]);
      return;
    }

    // Combine characters, planets, and starships into one search list
    const results = [
      ...store.people.map((item) => ({ ...item, type: "character" })),
      ...store.locations.map((item) => ({ ...item, type: "location" })),
      ...store.starships.map((item) => ({ ...item, type: "starship" })),
    ].filter((item) => item.name.toLowerCase().includes(value));

    setFilteredResults(results);
  };

  // Navegate to details page on click
  const handleSelect = (item) => {
    setQuery("");
    setFilteredResults([]);

    let path = "";
    if (item.type === "character") path = `/character/${item.uid}`;
    if (item.type === "location") path = `/location/${item.uid}`;
    if (item.type === "starship") path = `/starship/${item.uid}`;

    navegate(path);
  };

  return (
    <div className="search-container position-relative">
      <input
        type="text"
        className="form-control"
        placeholder="Search Star Wars..."
        value={query}
        onChange={handleSearch}
      />
      {filteredResults.length > 0 && (
        <ul
          className="list-group position-absolute w-100"
          style={{ zIndex: 1000 }}
        >
          {filteredResults.map((item, index) => (
            <li
              key={index}
              className="list-group-item list-group-item-action"
              onClick={() => handleSelect(item)}
              style={{ cursor: "pointer" }}
            >
              <strong>{item.name}</strong>{" "}
              <span className="text-muted">({item.type})</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
