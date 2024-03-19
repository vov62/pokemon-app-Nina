// import { useState } from "react";
import PokemonList from "./../component/PokemonList";
import { useQuery } from "react-query";
import img from "../assets/pokeball-loader.gif";
import axios from "axios";
import { useState } from "react";

const HomePage = () => {
  const [newData, setData] = useState([]);

  const { data, isLoading } = useQuery({
    queryKey: ["data"],
    queryFn: () => getDataFromApi(),
  });

  const getDataFromApi = async () => {
    let res = await axios("https://pokeapi.co/api/v2/pokemon?limit=20");
    const data = res.data;
    getPokemon(data.results);
    return data;
  };

  const getPokemon = async (res) => {
    res.map(async (item) => {
      //   console.log(item.url);
      const results = await axios(item.url);
      //   console.log(results.data);
      setData((state) => {
        state = [...state, results.data];
        return state;
      });
    });
  };

  //   const getPokemon = async (res) => {};

  //   if (isLoading) return <div></div>;

  return (
    <div className="p-7">
      <h1 className="font-bold text-3xl text-gray-50">Pokedex </h1>
      <div className="grid grid-cols-4 w-full gap-9 mt-8">
        <div className="grid h-20 card bg-base-300 place-items-center">
          <h2>Filter By</h2>
        </div>
        <div className="col-span-3 h-20 flex-grow card ">
          {isLoading ? (
            <img src={img} alt="pokador" width={80} />
          ) : (
            <PokemonList data={newData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
