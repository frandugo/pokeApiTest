import usePokemonDetails from './../hooks/usePokemonDetails';

import { useParams, Link } from 'react-router-dom';

const PokemonList = () => {
  const { name } = useParams();
  const { pokemonDetails, loading, error } = usePokemonDetails(name)

  return (
    <div className='m-0 bg-slate-900 min-h-screen p-6 flex flex-col justify-center items-center'>
        <div className='bg-white p-4 rounded-md w-[20rem] mb-4 '>
            <>
              { loading ? (
                <p>Loading Pokemon</p>
              ) : error ? (
                <p>Error loading details: {error}</p>
              ) : pokemonDetails ? (
                <div>
                  <h3 className='text-center uppercase text-2xl'>{pokemonDetails.name}</h3>
                  <img src={pokemonDetails.sprites.front_default} alt={pokemonDetails.name} className='m-auto'/>
                  <div className='flex justify-between items-center w-full mb-3'>
                    <h4 className='text-lg mb-2 font-bold text-black'>Height:</h4><span className='text-gray-600'>{pokemonDetails.height}</span>
                    <h4 className='text-lg mb-2 font-bold text-black'>Weight:</h4><span className='text-gray-600'>{pokemonDetails.weight}</span>
                  </div>  
                  <h4 className='text-lg mb-2 font-bold text-black'>Abilities:</h4>
                  <ul className='grid grid-cols-3 text-gray-600'>
                    {pokemonDetails.abilities.map((ability: any, index: any) => (
                      <li key={index}>{ability.ability.name}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p>Pokemon not founded</p>
              )}
            </>
        </div>
        <Link to={'/'} className='bg-white rounded-sm text-blue-600 py-2 px-10'>Back</Link>
    </div>
  );
};

export default PokemonList;
