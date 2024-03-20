import PropTypes from "prop-types";
import img from "../assets/modal.png";
import { Link, useSearchParams } from "react-router-dom";

// card bg =  background-color: rgba(255, 255, 255, 0.125);
// card shadow =  box-shadow: #00000059 0px 5px 15px;

const PokemonCard = ({ item }) => {
  const { id } = item;

  return (
    <Link to={`/pokemon/${id}`}>
      <div className="card card-compact p-3 bg-[#ffffff1f] shadow-xl shadow-[#00000059] w-40 h-52 hover:scale-110 transition-all duration-300 ease-in-out cursor-pointer hover:border">
        <figure>
          {/* <img src={item.sprites?.front_default || img} alt="animal" /> */}
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
            alt="pokemon"
            width={100}
            // height={80}
            className="object-cover"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-green-100 text-lg">{item?.name}</h2>
        </div>
      </div>
    </Link>
  );
};

export default PokemonCard;

PokemonCard.propTypes = {
  item: PropTypes.object,
};
