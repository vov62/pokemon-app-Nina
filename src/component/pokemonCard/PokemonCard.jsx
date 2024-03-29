import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const PokemonCard = ({ item }) => {
  const { id } = item;

  return (
    <Link to={`/pokemon/${id}`}>
      <div className="card card-compact p-3 bg-bgPrimary shadow-xl shadow-shadowPrimary w-40 h-52 hover:scale-110 transition-all duration-300 ease-in-out cursor-pointer hover:border">
        <figure>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
            alt="pokemon"
            width={100}
            className="object-cover"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-green-300 text-lg flex justify-center items-center">
            {item?.name}
          </h2>
          <p className="font-bold">{id}</p>
        </div>
      </div>
    </Link>
  );
};

export default PokemonCard;

PokemonCard.propTypes = {
  item: PropTypes.object,
};
