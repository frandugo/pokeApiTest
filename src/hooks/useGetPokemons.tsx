import { useState, useEffect } from 'react';

const useGetPokemons = (initialUrl = 'https://pokeapi.co/api/v2/pokemon', limit = 20) => {
  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [prevPageUrl, setPrevPageUrl] = useState(null);
  const [currentPageUrl, setCurrentPageUrl] = useState(initialUrl);

  useEffect(() => {
    const fetchPokemonData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${currentPageUrl}?limit=${limit}`);
        if (!response.ok) throw new Error('Something went wrong with the pokemon API');
        const data = await response.json();
        console.log("data", data);
        setPokemonData(data.results);
        setNextPageUrl(data.next);
        setPrevPageUrl(data.previous);
      } catch (error : any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonData();
  }, [currentPageUrl, limit]);

  const goToNextPage = () => {
    if (nextPageUrl) setCurrentPageUrl(nextPageUrl);
  };

  const goToPrevPage = () => {
    if (prevPageUrl) setCurrentPageUrl(prevPageUrl);
  };

  return { pokemonData, loading, error, goToNextPage, goToPrevPage, currentPageUrl };
};

export default useGetPokemons;