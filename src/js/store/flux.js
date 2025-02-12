const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      people: [],
      person: null,
      planets: [],
      vehicles: [],
      favorites: [],
    },
    actions: {
      // Fetch People
      fetchPeople: async () => {
        try {
          const response = await fetch("https://www.swapi.tech/api/people");
          const data = await response.json();

          // Fetch additional details for each person
          const peopleDetails = await Promise.all(
            data.results.map(async (person) => {
              const personResponse = await fetch(person.url);
              const personData = await personResponse.json();

              // Fetch character image
              const imageRes = await fetch(
                `https://akabab.github.io/starwars-api/api/id/${person.uid}.json`
              );
              const imageData = await imageRes.json();

              return {
                uid: person.uid,
                name: person.name,
                description: personData.result.description,
                properties: personData.result.properties, // Store ALL properties
                image:
                  imageData.image ||
                  "https://via.placeholder.com/400x500?text=No+Image",
              };
            })
          );
          setStore({ people: peopleDetails });
        } catch (error) {
          console.error("Error fetching people:", error);
        }
      },

      //Fetch Planets
      fetchLocations: async () => {
        try {
          // Fetch locations from Star Wars Databank API
          const response = await fetch(
            "https://starwars-databank-server.vercel.app/api/v1/locations"
          );
          const data = await response.json();

          // Transform the data to match our needs
          const locations = data.data.map((location) => ({
            uid: location._id, // Unique ID from the API
            name: location.name,
            description: location.description || "No description available",
            image:
              location.image ||
              "https://via.placeholder.com/400x500?text=No+Image",
          }));

          // Update store with locations
          setStore({ locations });
        } catch (error) {
          console.error("Error fetching locations:", error);
        }
      },

      // Fetch Starships
      fetchStarships: async () => {
        try {
          const response = await fetch("https://www.swapi.tech/api/starships");
          const data = await response.json();

          // Fetch all vehicles from the Star Wars Databank API (handling pagination)
          let allVehicles = [];
          let page = 1;
          let nextPage = `https://starwars-databank-server.vercel.app/api/v1/vehicles?page=${page}`;

          while (nextPage) {
            const imageRes = await fetch(nextPage);
            const imageData = await imageRes.json();

            // Append fetched vehicles to our list
            allVehicles = [...allVehicles, ...imageData.data];

            // Check if there is another page
            nextPage = imageData.info?.next
              ? `https://starwars-databank-server.vercel.app${imageData.info.next}`
              : null;
          }

          // Fetch additional details from each starship & match images
          const starshipDetails = await Promise.all(
            data.results.map(async (starship) => {
              try {
                // Fetch starship properties from SWAPI
                const starshipResponse = await fetch(starship.url);
                const starshipData = await starshipResponse.json();
                const properties = starshipData?.result?.properties || {};
                const description =
                  starshipData?.result?.description ||
                  "No description available.";

                // Match the starship in Databank API (vehicles) by name
                const matchingVehicle = allVehicles.find(
                  (vehicle) =>
                    vehicle.name
                      .toLowerCase()
                      .includes(starship.name.toLowerCase()) ||
                    starship.name
                      .toLowerCase()
                      .includes(vehicle.name.toLowerCase())
                );

                return {
                  uid: starship.uid,
                  name: starship.name,
                  description,
                  properties,
                  image:
                    matchingVehicle?.image ||
                    "https://via.placeholder.com/400x500?text=No+Image",
                };
              } catch (error) {
                console.error(
                  `Error fetching details for ${starship.name}:`,
                  error
                );
                return null;
              }
            })
          );

          // Filter out any null values (if any fetch failed)
          setStore({ starships: starshipDetails.filter((s) => s !== null) });
        } catch (error) {
          console.error("Error fetching vehicles:", error);
        }
      },

      // Add to Favorites
      addFavorite: (item) => {
        const store = getStore();

        const isFavorite = store.favorites.some((fav) => fav.uid === item.uid);

        if (isFavorite) {
          // Remove from favorites
          setStore({
            favorites: store.favorites.filter((fav) => fav.uid !== item.uid),
          });
        } else {
          // Add to favorites
          setStore({ favorites: [...store.favorites, item] });
        }
      },

      // Remove from Favorites
      removeFavorite: (uid) => {
        const store = getStore();
        setStore({
          favorites: store.favorites.filter((fav) => fav.uid !== uid),
        });
      },
    },
  };
};

export default getState;
