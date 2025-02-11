import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Location = () => {
  const { store } = useContext(Context);
  const { id } = useParams();

  // Find location by ID
  const location = store.locations?.find((loc) => loc.uid === id);

  if (!location) {
    return <h2 className="text-center mt-5">Loading location details...</h2>;
  }

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Left Side - Image */}
        <div className="col-md-6">
          <img
            src={location.image}
            alt={location.name}
            className="img-fluid rounded"
            style={{ maxWidth: "500px" }}
          />
        </div>

        {/* Right Side - Description */}
        <div className="col-md-6">
          <h1 className="fw-bold">{location.name}</h1>
          <p className="text-muted">
            {location.description || "No description available."}
          </p>
        </div>
      </div>

      {/* Bottom Section - Properties */}
      <hr className="my-4" />
      <div className="row text-center">
        <div className="col-6">
          <h5 className="text-danger">Climate</h5>
          <p>{location.properties?.climate || "Unknown"}</p>
        </div>
        <div className="col-6">
          <h5 className="text-danger">Terrain</h5>
          <p>{location.properties?.terrain || "Unknown"}</p>
        </div>
      </div>
    </div>
  );
};
