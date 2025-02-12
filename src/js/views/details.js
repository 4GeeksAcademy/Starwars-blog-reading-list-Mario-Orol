import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Details = () => {
  const { store, actions } = useContext(Context);
  const { id } = useParams();

  useEffect(() => {
    if (store.people.length === 0) {
      actions.fetchPeople(); // Fetch if missing
    }
  }, []);

  // Find person in store.people
  const person = store.people.find((p) => p.uid === id.toString()); // Ensure both are strings

  console.log("People in store:", store.people);
  console.log("Looking for ID:", id);

  if (!person) return <h1 className="text-center">Loading...</h1>;

  return (
    <div className="container mt-4">
      {/* Grid Layout */}
      <div className="row">
        {/* Left Side - Image */}
        <div className="col-md-6">
          <img
            src={person.image}
            alt={person.name}
            className="img-fluid rounded"
          />
        </div>

        {/* Right Side - Description */}
        <div className="col-md-6">
          <h1 className="fw-bold">{person.name}</h1>
          <p className="text-muted">
            {person.description || "No description available."}
          </p>
        </div>
      </div>

      {/* Bottom Section - Properties */}
      <hr className="my-4" />
      <div className="row text-center">
        <div className="col-2">
          <h5 className="text-danger">Name</h5>
          <p>{person.name}</p>
        </div>
        <div className="col-2">
          <h5 className="text-danger">Birth Year</h5>
          <p>{person.properties.birth_year}</p>
        </div>
        <div className="col-2">
          <h5 className="text-danger">Gender</h5>
          <p>{person.properties.gender}</p>
        </div>
        <div className="col-2">
          <h5 className="text-danger">Height</h5>
          <p>{person.properties.height}</p>
        </div>
        <div className="col-2">
          <h5 className="text-danger">Skin Color</h5>
          <p>{person.properties.skin_color}</p>
        </div>
        <div className="col-2">
          <h5 className="text-danger">Eye Color</h5>
          <p>{person.properties.eye_color}</p>
        </div>
      </div>
    </div>
  );
};
