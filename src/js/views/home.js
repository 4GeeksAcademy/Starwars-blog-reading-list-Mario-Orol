import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import rigo from "../../img/rigo-baby.jpg";
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
        {store.people.map((character) => (
          <div
            key={character.uid}
            className="card mx-2"
            style={{ minWidth: "400px" }}
          >
            <img
              src={character.image || rigo}
              className="card-img-top"
              alt={character.name || "rigo"}
              style={{
                width: "400px",
                height: "400px",
                objectFit: "cover",
              }}
            />
            <div className="card-body">
              <h5 className="card-title">{character.name}</h5>
              <p className="card-text mb-0">
                Gender: {character.properties.gender}
              </p>
              <p className="card-text mb-0">
                Hair Color: {character.properties.hair_color}
              </p>
              <p className="card-text mb-0">
                Eye-Color: {character.properties.eye_color}
              </p>
              <div className="d-flex justify-content-between my-2">
                <Link
                  to={`/character/${character.uid}`}
                  className="btn btn-outline-primary"
                >
                  Learn More!
                </Link>
                <button
                  onClick={() => actions.addFavorite(character)}
                  className="btn btn-outline-warning"
                >
                  <i
                    className={
                      store.favorites.some(
                        (fav) =>
                          fav.uid === character.uid && fav.type === "character"
                      )
                        ? "fas fa-heart text-warning"
                        : "far fa-heart text-warning"
                    }
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
              src={locations.image || rigo}
              className="card-img-top"
              alt={locations.name || "rigo"}
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
                      store.favorites.some(
                        (fav) =>
                          fav.uid === locations.uid && fav.type === "location"
                      )
                        ? "fas fa-heart text-warning" // ✅ Solid Heart when in favorites
                        : "far fa-heart text-warning"
                    } // ✅ Outline Heart when not in favorites
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
              src={starships.image || rigo}
              className="card-img-top"
              alt={starships.name || "rigo"}
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
                      store.favorites.some(
                        (fav) =>
                          fav.uid === starships.uid && fav.type === "starship"
                      )
                        ? "fas fa-heart text-warning" // ✅ Solid Heart when in favorites
                        : "far fa-heart text-warning"
                    } // ✅ Outline Heart when not in favorites
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
