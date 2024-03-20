import axios from "axios";
import { useState } from "react";

const singlePokemonUrl = "https://pokeapi.co/api/v2/pokemon/";

const apiUrl = "https://pokeapi.co/api/v2/pokemon?limit=";

export const getDataFromApi = async (limit) => {
  //   console.log(limit);
  const res = await axios(`${apiUrl}${limit}`);
  const { results } = res.data;

  // Fetch details for each Pokemon
  const pokemonDetails = await Promise.all(
    results.map(async (item) => {
      const result = await axios(item.url);
      return result.data;
    })
  );

  return pokemonDetails; // Return data for useQuery
};

export const getSinglePokemonData = async (id) => {
  //   console.log(limit);
  const res = await axios(`${singlePokemonUrl}${id}`);
  const results = res.data;
  console.log(results);

  return results; // Return data for useQuery
};
