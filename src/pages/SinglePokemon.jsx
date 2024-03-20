import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getSinglePokemonData } from "../Api/api";

const SinglePokemon = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["singlePokemon", id],
    queryFn: () => getSinglePokemonData(id),
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  return (
    <div className="py-6">
      <h1 className="text-4xl">Pokemon Details</h1>

      <div className="flex justify-center items-center flex-col my-10">
        <div className="card card-side bg-base-100 p-4 shadow-xl w-2/4  bg-[#ffffff1f] shadow-[#00000059]">
          <figure className="w-72">
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
              alt={data?.name}
            />
          </figure>

          <div className="card-body justify-center items-center gap-9 p-6 ">
            <div className="flex justify-between items-center gap-10">
              <h2 className="card-title text-4xl text-transform: capitalize">
                {data?.name}
              </h2>
              <div className="font-bold">HP: {data?.base_experience}</div>
            </div>

            <div className="font-bold">
              <p>
                Type: {data?.types?.map((type) => type.type.name).join(", ")}{" "}
                snow
              </p>
              <p className="text-left">Height: {data?.height} </p>
              <p className="text-left">Weight: {data?.weight} </p>
            </div>

            <div className="flex justify-center flex-wrap gap-3">
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

        <div className="flex justify-between my-2 gap-12">
          <div className="">
            <img src={data?.sprites?.front_default} alt="pokemon" width={120} />
          </div>
          <img src={data?.sprites?.back_default} alt="pokemon" width={120} />
          <img src={data?.sprites?.front_shiny} alt="pokemon" width={120} />

          <img src={data?.sprites?.back_shiny} alt="pokemon" width={120} />
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
