import PropTypes from "prop-types";
import PokemonCard from "../pokemonCard/PokemonCard";

const PokemonList = ({ data }) => {
  return (
    <div className="flex gap-5 flex-wrap justify-center ">
      {data?.map((item, i) => (
        <PokemonCard item={item} key={`${item.id}-${i}`} />
      ))}
    </div>
  );
};

export default PokemonList;

PokemonList.propTypes = {
  data: PropTypes.array,
};
