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
      fetchPlanets: async () => {
        try {
          const response = await fetch("https://www.swapi.tech/api/planets");
          const data = await response.json();
          setStore({ planets: data.results });
        } catch (error) {
          console.error("Error fetching planets:", error);
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
