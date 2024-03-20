// import { useState } from "react";
import PokemonList from "./../component/PokemonList";
import { useInfiniteQuery, useQuery } from "react-query";
import img from "../assets/pokeball-loader.gif";
import { getDataFromApi } from "../Api/api";
import { useState } from "react";

const HomePage = () => {
  const [count, setCount] = useState(5);

  const [filterName, setFilterName] = useState("");
  const [filterId, setFilterId] = useState("");
  const [filterTypes, setFilterTypes] = useState("");

  //   const { data, isLoading, isError } = useQuery({
  //     queryKey: ["pokemonData"],
  //     queryFn: () => getDataFromApi(count),
  //   });

  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useInfiniteQuery({
      queryKey: ["pokemonData"],
      queryFn: ({ pageParam = 20 }) => getDataFromApi(pageParam),
      getNextPageParam: (lastPage) => {
        return lastPage.length + 1;
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
    .flatMap((page) => page) // Flatten the array of pages
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

  const handleLoadMore = () => {
    fetchNextPage();
  };

  return (
    <div className="p-7">
      <h1 className="font-bold text-3xl text-gray-50">Pokedex </h1>
      <div className="flex justify-between w-full gap-9 mt-8">
        <div className="card bg-base-300 max-h-72 place-items-center py-3 sticky top-0 ">
          <h2>Filter By</h2>
          <div className="label">
            <span className="label-text m-5">name:</span>
            <input
              type="text"
              className="input input-bordered input-sm  max-w-xs"
              value={filterName}
              onChange={handleNameFilterChange}
            />
          </div>

          <div className="label">
            <span className="label-text m-5">id:</span>
            <input
              type="text"
              className="input input-bordered input-sm  max-w-xs"
              value={filterId}
              onChange={handleIdFilterChange}
            />
          </div>

          <div className="label">
            <span className="label-text m-5">Types:</span>
            <input
              type="text"
              className="input input-bordered input-sm  max-w-xs"
              value={filterTypes}
              onChange={handleTypesFilterChange}
            />
          </div>
        </div>

        <div className="col-span-3">
          {isLoading ? (
            <img src={img} alt="pokador" width={80} />
          ) : (
            <>
              <PokemonList data={filteredData} />
              {!hasNextPage.length && (
                <button className="btn btn-primary" onClick={handleLoadMore}>
                  Load More
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
