import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Starships = () => {
  const { store } = useContext(Context);
  const { id } = useParams();

  // Find startship by ID
  const starship = store.starships?.find((star) => star.uid === id);

  if (!starship) {
    return <h2 className="text-center mt-5">Loading Starship details...</h2>;
  }

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Left Side - Image */}
        <div className="col-md-6">
          <img
            src={starship.image}
            alt={starship.name}
            className="img-fluid rounded"
            style={{ maxWidth: "500px" }}
          />
        </div>

        {/* Right Side - Description */}
        <div className="col-md-6">
          <h1 className="fw-bold">{starship.name}</h1>
          <p className="text-muted">
            {starship.description || "No description available."}
          </p>
        </div>
      </div>

      {/* Bottom Section - Properties */}
      <hr className="my-4" />
      <div className="row text-center">
        <div className="col-4">
          <h5 className="text-danger">Model</h5>
          <p>{starship.properties?.model || "Unknown"}</p>
        </div>
        <div className="col-4">
          <h5 className="text-danger">Manufacturer</h5>
          <p>{starship.properties?.manufacturer || "Unknown"}</p>
        </div>
        <div className="col-4">
          <h5 className="text-danger">Crew</h5>
          <p>{starship.properties?.crew || "Unknown"}</p>
        </div>
        <div className="col-4">
          <h5 className="text-danger">Passengers</h5>
          <p>{starship.properties?.passengers || "Unknown"}</p>
        </div>
        <div className="col-4">
          <h5 className="text-danger">Hyperdrive Rating</h5>
          <p>{starship.properties?.hyperdrive_rating || "Unknown"}</p>
        </div>
        <div className="col-4">
          <h5 className="text-danger">Cargo Capacity</h5>
          <p>{starship.properties?.cargo_capacity || "Unknown"}</p>
        </div>
      </div>
    </div>
  );
};
