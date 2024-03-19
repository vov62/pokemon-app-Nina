import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import SinglePokemon from "./pages/SinglePokemon";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/single_pokemon/:id" element={<SinglePokemon />} />
      </Routes>
    </Router>
  );
}

export default App;
