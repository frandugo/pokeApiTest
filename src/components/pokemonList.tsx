import { useState, useEffect } from 'react';
import useGetPokemons from '../hooks/useGetPokemons';
import { debounce } from '../utils/debounce';

import { Link } from "react-router-dom";

const PokemonList = () => {

  const { pokemonData, loading, error, goToNextPage, goToPrevPage } = useGetPokemons();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPokemon, setFilteredPokemon] = useState(pokemonData);

  useEffect(() => {
    const debouncedFilter = debounce((query: any) => {
      if (query) {
        const filtered = pokemonData.filter((pokemon: any) =>
          pokemon.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredPokemon(filtered);
      } else {
        setFilteredPokemon(pokemonData);
      }
    }, 1500);

    debouncedFilter(searchQuery);
  }, [searchQuery, pokemonData]);

  const handleSearchChange = (e: any) => {
    setSearchQuery(e.target.value);
  };

  if (loading) return <p>Loading Pokemon list</p>;
  if (error) return (
    <div className='flex items-center justify-center bg-slate-900 min-h-screen'>
        <p className='text-3xl text-white'>Error loading Pokemon list: {error}</p>
    </div>
);

  return (
    <div className='m-0 bg-slate-900 min-h-screen p-6'>
        <div className='m-auto max-w-2xl'>
            <div className='mb-4'>
                <input
                    className='w-full p-2 bg-white text-black rounded-sm border-0 '
                    type="text"
                    placeholder="Search Pokemon"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </div>    
            <div>
                <ul className='grid grid-cols-4 mb-6'>
                {filteredPokemon.map((pokemon: any, index: any) => (
                    <li key={index} className='py-5 '>
                        <Link to={ `/${pokemon.name}` }>
                            <h2 className='text-white text-2xl'>{pokemon.name}</h2>
                        </Link>    
                    </li>
                ))}
                </ul>
                <div className='flex justify-between'>
                    <button onClick={goToPrevPage} className='bg-white rounded-sm text-blue-600 py-2 px-10'>Previous</button>
                    <button onClick={goToNextPage} className='bg-white rounded-sm text-blue-600 py-2 px-10'>Next</button>
                </div>
            </div>
        </div>    
    </div>
  );
};

export default PokemonList;
