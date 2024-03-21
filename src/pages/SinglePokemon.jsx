import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getSinglePokemonData } from "../utils/api";
import Loader from "../component/Loader";
import ErrorMessages from "../component/ErrorMessages";

const SinglePokemon = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["singlePokemon", id],
    queryFn: () => getSinglePokemonData(id),
    enabled: !!id,
  });

  if (isLoading)
    return (
      <div>
        <Loader />
      </div>
    );
  if (isError)
    return (
      <ErrorMessages>
        <p>please refresh the page or check your network connection...</p>
      </ErrorMessages>
    );

  return (
    <div className="py-6">
      <h1 className="text-4xl mt-4 font-bold ">Pokemon Details</h1>

      <div className="flex justify-center items-center flex-col my-10 ">
        <div className="card card-side p-4 shadow-xl w-2/4  bg-bgPrimary shadow-shadowPrimary max-lg:flex-col max-lg:w-3/4">
          <figure className="w-72 ml-8 max-lg:w-48 max-lg:m-auto max-md:w-48">
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
              alt={data?.name}
            />
          </figure>

          <div className="card-body justify-center items-center gap-9 p-6 max-sm:items-start max-sm:gap-5">
            <div className="flex justify-between items-center gap-10 max-sm:gap-6">
              <h2 className="card-title text-4xl text-transform: capitalize max-lg:text-3xl max-sm:text-2xl">
                {data?.name}
              </h2>
              <div className="font-bold">HP: {data?.base_experience}</div>
            </div>

            <div>
              <p className="text-left">Height: {data?.height} </p>
              <p className="text-left">Weight: {data?.weight} </p>
            </div>

            <div className="flex justify-center flex-wrap gap-3 max-sm:justify-start">
              {data?.stats?.map((poke) => {
                return (
                  <div key={poke.id} className="badge badge-accent badge-lg">
                    <p className="font-bold text-black">
                      {poke.stat.name}: {poke.base_stat}{" "}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex justify-between flex-wrap my-2 gap-12 max-sm:justify-center">
          <div>
            <img src={data?.sprites?.front_default} alt="pokemon" width={120} />
          </div>
          <img src={data?.sprites?.back_default} alt="pokemon" width={120} />
          <img src={data?.sprites?.front_shiny} alt="pokemon" width={120} />
          <img src={data?.sprites?.back_shiny} alt="pokemon" width={120} />
        </div>

        <div className="flex justify-between gap-10 w-2/4 max-sm:flex-col">
          <div>
            <h2 className="text-2xl font-bold text-lightGreen"> Type</h2>
            <p>{data?.types?.map((type) => type.type.name).join(", ")} snow</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-lightGreen">Abilities</h2>
            {data?.abilities?.map((ability) => {
              return (
                <>
                  <div>{ability?.ability?.name}</div>
                </>
              );
            })}
          </div>

          <div>
            <h2 className="text-2xl font-bold text-lightGreen">Forms</h2>
            {data?.forms?.map((form) => {
              return (
                <>
                  <div>{form?.name}</div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePokemon;
