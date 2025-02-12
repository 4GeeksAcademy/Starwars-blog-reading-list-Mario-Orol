import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

const Home = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.fetchPeople();
    actions.fetchLocations();
    actions.fetchStarships();
  }, []);

  return (
    <div className="container">
      <h2 className="text-danger my-2">Characters</h2>
      <div
        className="d-flex overflow-auto p-3"
        style={{ whiteSpace: "nowrap" }}
      >
        {store.people.map((person) => (
          <div
            key={person.uid}
            className="card mx-2"
            style={{ minWidth: "400px" }}
          >
            <img
              src={person.image}
              className="card-img-top"
              alt="..."
              style={{
                width: "400px",
                height: "400px",
                objectFit: "cover",
              }}
            />
            <div className="card-body">
              <h5 className="card-title">{person.name}</h5>
              <p className="card-text mb-0">
                Gender: {person.properties.gender}
              </p>
              <p className="card-text mb-0">
                Hair Color: {person.properties.hair_color}
              </p>
              <p className="card-text mb-0">
                Eye-Color: {person.properties.eye_color}
              </p>
              <div className="d-flex justify-content-between my-2">
                <Link
                  to={`/details/${person.uid}`}
                  className="btn btn-outline-primary"
                >
                  Learn More!
                </Link>
                <button
                  onClick={() => actions.addFavorite(person)}
                  className="btn btn-outline-warning"
                >
                  <i
                    className={
                      store.favorites.some((fav) => fav.uid === person.uid)
                        ? "fas fa-heart text-warning" // Solid Heart if Favorite
                        : "far fa-heart text-warning"
                    } // Regular Heart if Not Favorite
                  ></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-danger my-2">Locations</h2>
      <div
        className="d-flex overflow-auto p-3"
        style={{ whiteSpace: "nowrap" }}
      >
        {store.locations?.map((locations) => (
          <div
            key={locations.uid}
            className="card mx-2"
            style={{ minWidth: "400px" }}
          >
            <img
              src={locations.image}
              className="card-img-top"
              alt="..."
              style={{
                width: "400px",
                height: "400px",
                objectFit: "cover",
              }}
            />
            <div className="card-body">
              <h5 className="card-title">{locations.name}</h5>
              <p
                className="card-text mb-0"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                Description: {locations.description}
              </p>
              <div className="d-flex justify-content-between my-2">
                <Link
                  to={`/location/${locations.uid}`}
                  className="btn btn-outline-primary"
                >
                  Learn More!
                </Link>
                <button
                  onClick={() => actions.addFavorite(locations)}
                  className="btn btn-outline-warning"
                >
                  <i
                    className={
                      store.favorites.some((fav) => fav.uid === locations.uid)
                        ? "fas fa-heart text-warning" // Solid Heart if Favorite
                        : "far fa-heart text-warning"
                    } // Regular Heart if Not Favorite
                  ></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-danger my-2">Starships</h2>
      <div
        className="d-flex overflow-auto p-3"
        style={{ whiteSpace: "nowrap" }}
      >
        {store.starships?.map((starships) => (
          <div
            key={starships.uid}
            className="card mx-2"
            style={{ minWidth: "400px" }}
          >
            <img
              src={starships.image}
              className="card-img-top"
              alt="..."
              style={{
                width: "400px",
                height: "400px",
                objectFit: "cover",
              }}
            />
            <div className="card-body">
              <h5 className="card-title">{starships.name}</h5>
              <p className="card-text mb-0">
                Cargo Capacity: {starships.properties?.cargo_capacity}
              </p>
              <p className="card-text mb-0">
                Crew: {starships.properties?.crew}
              </p>
              <p className="card-text mb-0">
                Passengers: {starships.properties?.passengers}
              </p>
              <div className="d-flex justify-content-between my-2">
                <Link
                  to={`/starship/${starships.uid}`}
                  className="btn btn-outline-primary"
                >
                  Learn More!
                </Link>
                <button
                  onClick={() => actions.addFavorite(starships)}
                  className="btn btn-outline-warning"
                >
                  <i
                    className={
                      store.favorites.some((fav) => fav.uid === starships.uid)
                        ? "fas fa-heart text-warning" // Solid Heart if Favorite
                        : "far fa-heart text-warning"
                    } // Regular Heart if Not Favorite
                  ></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
