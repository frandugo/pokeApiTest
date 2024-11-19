import { useState, useEffect } from 'react';

const usePokemonDetails = (pokemonNameOrId: any) => {
  const [pokemonDetails, setPokemonDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!pokemonNameOrId) return;

    const fetchPokemonDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNameOrId}`);
        if (!response.ok) throw new Error('Something was wrong fetching Pokemon detail');
        const data = await response.json();
        setPokemonDetails(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonDetails();
  }, [pokemonNameOrId]);

  return { pokemonDetails, loading, error };
};

export default usePokemonDetails;
