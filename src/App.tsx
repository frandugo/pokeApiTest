import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import PokemonList from './components/pokemonList'
import PokemonDetail from './components/pokemonListDetail'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PokemonList />} />
        <Route path="/:name" element={<PokemonDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
