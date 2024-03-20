import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getSinglePokemonData } from "../Api/api";

const SinglePokemon = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["singlePokemon", id],
    queryFn: () => getSinglePokemonData(id),
    enabled: !!id,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  return (
    <div className="py-6">
      <h1 className="text-4xl">Pokemon Details</h1>

      <div className="flex justify-center items-center flex-col my-10 ">
        <div className="card card-side p-4 shadow-xl w-2/4  bg-[#ffffff1f] shadow-[#00000059] max-lg:flex-col max-lg:w-3/4">
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
        {/* sprites */}

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
            <h2 className="text-2xl font-bold text-[#00d7c0]"> Type</h2>
            <p>{data?.types?.map((type) => type.type.name).join(", ")} snow</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#00d7c0]">Abilities</h2>
            {data?.abilities?.map((ability) => {
              return (
                <>
                  <div>{ability?.ability?.name}</div>
                </>
              );
            })}
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#00d7c0]">Forms</h2>
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

{
  /* <div className="flex flex-wrap justify-center gap-8 p-4 bg-[#ffffff1f] shadow-[#00000059]">
<div className="max-w-md">
  <img src={img} alt={pokemon?.name} />
  <img src={pokemon?.sprites.front_default} alt={pokemon?.name} />
</div>
<div className="max-w-md">
  <h2 className="text-2xl font-bold mb-2">{pokemon?.name}charmander</h2>
  <div>
    <p>
      Type: {pokemon?.types.map((type) => type.type.name).join(", ")}{" "}
      snow
    </p>
    <p>Height: {pokemon?.height} 1.2</p>
    <p>Weight: {pokemon?.weight} 14</p>
  </div>
</div>
</div> */
}
