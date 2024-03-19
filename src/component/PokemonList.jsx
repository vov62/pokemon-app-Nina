import PropTypes from "prop-types";
import PokemonCard from "./PokemonCard";

const PokemonList = ({ data }) => {
  // console.log(data);

  return (
    <div className="flex gap-5 flex-wrap justify-center border border-l-rose-50">
      {data?.map((item) => (
        <PokemonCard item={item} key={item.name} />
      ))}

      {/* <PokemonCard item={data} key={data.name} /> */}
    </div>
  );
};

export default PokemonList;

PokemonList.propTypes = {
  data: PropTypes.array,
};
