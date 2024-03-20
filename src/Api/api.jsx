import axios from "axios";

// const apiUrl = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=";
const singlePokemonUrl = "https://pokeapi.co/api/v2/pokemon/";

export const getDataFromApi = async (results) => {
  try {
    //  const res = await axios.get(`${apiUrl}${offset}`);
    // const { results } = res.data;
    // Fetch details for each Pokemon

    const pokemonDetails = await Promise.all(
      results.map(async (item) => {
        const result = await axios.get(item.url);
        return result.data;
      })
    );

    return pokemonDetails; // Return data for useQuery
  } catch (error) {
    console.log(error);
  }
};

export const getSinglePokemonData = async (id) => {
  //   console.log(limit);
  const res = await axios(`${singlePokemonUrl}${id}`);
  const results = res.data;
  //   console.log(results);

  return results; // Return data for useQuery
};
