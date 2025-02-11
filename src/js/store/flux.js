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

          console.log("Fetched Locations:", locations);
        } catch (error) {
          console.error("Error fetching locations:", error);
        }
      },

      // Fetch Vehicles
      fetchVehicles: async () => {
        try {
          const response = await fetch("https://www.swapi.tech/api/vehicles");
          const data = await response.json();
          setStore({ vehicles: data.results });
        } catch (error) {
          console.error("Error fetching vehicles:", error);
        }
      },

      // Add to Favorites
      addFavorite: (item) => {
        const store = getStore();
        if (!store.favorites.some((fav) => fav.uid === item.uid)) {
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
