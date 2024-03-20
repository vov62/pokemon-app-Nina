/* eslint-disable react-hooks/rules-of-hooks */
// import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { getDataFromApi } from "../Api/api";
import img from "../assets/pokeball-loader.gif";
import PokemonList from "./../component/PokemonList";

const apiUrl = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=";

const HomePage = () => {
  const [page, setPage] = useState(1);
  const [filterName, setFilterName] = useState("");
  const [filterId, setFilterId] = useState("");
  const [filterTypes, setFilterTypes] = useState("");

  const { ref, inView } = useInView({
    threshold: 0,
  });

  const { data, fetchNextPage, hasNextPage, isError, isLoading } =
    useInfiniteQuery({
      queryKey: ["pokemonData"],
      queryFn: async () => {
        setPage((page) => page + 1);
        console.log(page);
        const res = await axios.get(`${apiUrl}${page}`);
        const { results } = res.data;
        return getDataFromApi(results);
      },
      initialPageParam: 10,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length ? allPages.length + 1 : undefined;
      },
    });

  if (isError) {
    return <div>Error fetching data</div>;
  }

  const handleNameFilterChange = (e) => {
    setFilterName(e.target.value);
  };

  const handleIdFilterChange = (e) => {
    setFilterId(e.target.value);
  };

  const handleTypesFilterChange = (e) => {
    setFilterTypes(e.target.value);
  };

  const filteredData = data?.pages
    ?.flatMap((page) => page)
    .filter((pokemon) => {
      // Filter by name
      if (
        filterName &&
        !pokemon.name.toLowerCase().includes(filterName.toLowerCase())
      ) {
        return false;
      }

      // Filter by id
      if (filterId && pokemon.id !== parseInt(filterId)) {
        return false;
      }

      // Filter by types
      if (
        filterTypes &&
        !pokemon.types.some((type) =>
          type.type.name.toLowerCase().includes(filterTypes.toLowerCase())
        )
      ) {
        return false;
      }

      return true;
    });

  useEffect(() => {
    if (hasNextPage && inView) {
      fetchNextPage();
    }
  }, [hasNextPage, inView, fetchNextPage]);

  return (
    <div className="p-7">
      <h1 className="font-bold text-3xl text-gray-50">Pokedex </h1>
      {/* max-lg:flex-col */}
      <div className="flex justify-between w-full gap-9 mt-8 max-lg:flex-col">
        <div className="card bg-[#ffffff1f] shadow-[#00000059] shadow-xl max-h-96 place-items-center py-3 lg:sticky top-10  max-sm:static">
          <h2>Filter By</h2>

          <div className="label px-4 flex flex-col ">
            <div className="flex items-center">
              <label className="label-text m-5 text-base font-bold text-[#fff]">
                name:
              </label>

              <input
                type="text"
                className="input input-bordered input-sm  max-w-xs text-black"
                value={filterName}
                onChange={handleNameFilterChange}
              />
            </div>

            <div className="flex items-center">
              <label className="label-text m-5 text-base font-bold text-[#fff]">
                id:
              </label>
              <input
                type="text"
                className="input input-bordered input-sm text-base  text-black"
                value={filterId}
                onChange={handleIdFilterChange}
              />
            </div>

            <div className="flex items-center">
              <label className="label-text m-5 font-bold text-[#fff]">
                Types:
              </label>
              <input
                type="text"
                className="input input-bordered input-sm  max-w-xs text-black"
                value={filterTypes}
                onChange={handleTypesFilterChange}
              />
            </div>
          </div>
        </div>

        <div className="col-span-3">
          {isLoading ? (
            <div className="flex justify-center items-center">
              <img src={img} alt="pokador" width={80} />
            </div>
          ) : (
            <>
              <PokemonList data={filteredData} />

              <div className="py-5">
                <span
                  ref={ref}
                  className="loading loading-spinner loading-md"
                ></span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
