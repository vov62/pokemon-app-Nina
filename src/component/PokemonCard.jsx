import PropTypes from "prop-types";
import img from "../assets/modal.png";

// card bg =  background-color: rgba(255, 255, 255, 0.125);
// card shadow =  box-shadow: #00000059 0px 5px 15px;

const PokemonCard = ({ item }) => {
  return (
    <div className="card card-compact bg-[#ffffff1f] shadow-xl shadow-[#00000059] w-40">
      <figure>
        <img src={item.sprites?.front_default || img} alt="animal" />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-green-100 text-lg">{item?.name}</h2>
      </div>
    </div>
  );
};

export default PokemonCard;

PokemonCard.propTypes = {
  item: PropTypes.object,
};
