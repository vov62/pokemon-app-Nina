import img from "../assets/pokeball-loader.gif";

const Loader = () => {
  return (
    <div className="flex justify-center items-center">
      <img src={img} alt="pokador" width={80} />
    </div>
  );
};

export default Loader;
