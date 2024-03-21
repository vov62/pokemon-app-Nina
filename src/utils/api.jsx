import axios from "axios";
import ErrorMessages from "../component/ErrorMessages";

const singlePokemonUrl = "https://pokeapi.co/api/v2/pokemon/";

export const getDataFromApi = async (results) => {
  try {
    const pokemonDetails = await Promise.all(
      results.map(async (item) => {
        const result = await axios.get(item.url);
        return result.data;
      })
    );

    return pokemonDetails;
  } catch (error) {
    console.log(error, "fetching failed");
    <ErrorMessages>
      <p>fetching failed, check your connection or refresh</p>
    </ErrorMessages>;
  }
};

export const getSinglePokemonData = async (id) => {
  const res = await axios(`${singlePokemonUrl}${id}`);
  const results = res.data;

  return results;
};
