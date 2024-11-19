import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom';

import PokemonList from './../components/pokemonList';
import useGetPokemons from '../hooks/useGetPokemons';

jest.mock('../hooks/useGetPokemons');
jest.mock('../utils/debounce', () => ({
  debounce: (fn: any) => fn,
}));

const mockedUseGetPokemons = useGetPokemons as jest.Mock;

describe('PokemonList Component', () => {
  const mockPokemons = [
    { name: 'bulbasaur', url: '' },
    { name: 'ivysaur', url: '' },
    { name: 'venusaur', url: '' },
  ];

  beforeEach(() => {
    mockedUseGetPokemons.mockReturnValue({
      pokemonData: mockPokemons,
      loading: false,
      error: null,
      goToNextPage: jest.fn(),
      goToPrevPage: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Show loading state first', () => {
    mockedUseGetPokemons.mockReturnValueOnce({
      pokemonData: [],
      loading: true,
      error: null,
      goToNextPage: jest.fn(),
      goToPrevPage: jest.fn(),
    });

    render(<PokemonList />);
    expect(screen.getByText(/Loading Pokemon list/i)).toBeInTheDocument();
  });

  test('show error or state failure', () => {
    mockedUseGetPokemons.mockReturnValueOnce({
      pokemonData: [],
      loading: false,
      error: 'API error',
      goToNextPage: jest.fn(),
      goToPrevPage: jest.fn(),
    });

    render(<PokemonList />);
    expect(screen.getByText(/Error loading Pokemon list: API error/i)).toBeInTheDocument();
  });

  test('render pokemon list', () => {
    mockedUseGetPokemons.mockReturnValue({
      pokemonData: mockPokemons,
      loading: false,
      error: null,
      goToNextPage: jest.fn(),
      goToPrevPage: jest.fn(),
    });
    render( 
      <MemoryRouter>
        <PokemonList />
      </MemoryRouter>
    );
    mockPokemons.forEach((pokemon) => {
      expect(screen.getByText(pokemon.name)).toBeInTheDocument();
    });
  });

  test('filter pokemon by search input', async () => {
    render(
      <MemoryRouter>
        <PokemonList />
      </MemoryRouter>  
    );

    const searchInput = screen.getByPlaceholderText(/Search Pokemon/i);

    fireEvent.change(searchInput, { target: { value: 'bulba' } });

    await waitFor(() => {
      expect(screen.queryByText('bulbasaur')).toBeInTheDocument();
      expect(screen.queryByText('ivysaur')).not.toBeInTheDocument();
    });
  });

  test('"Next" button is clicked', () => {
    const goToNextPageMock = jest.fn();
    mockedUseGetPokemons.mockReturnValueOnce({
      pokemonData: mockPokemons,
      loading: false,
      error: null,
      goToNextPage: goToNextPageMock,
      goToPrevPage: jest.fn(),
    });

    render(
      <MemoryRouter>
        <PokemonList />
      </MemoryRouter>  
    );
    const nextButton = screen.getByText(/Next/i);

    fireEvent.click(nextButton);
    expect(goToNextPageMock).toHaveBeenCalledTimes(1);
  });

  test('"Prev" button is clicked', () => {
    const goToPrevPageMock = jest.fn();
    mockedUseGetPokemons.mockReturnValueOnce({
      pokemonData: mockPokemons,
      loading: false,
      error: null,
      goToNextPage: jest.fn(),
      goToPrevPage: goToPrevPageMock,
    });

    render(
      <MemoryRouter>
        <PokemonList />
      </MemoryRouter>
    );
    const prevButton = screen.getByText(/Previous/i);

    fireEvent.click(prevButton);
    expect(goToPrevPageMock).toHaveBeenCalledTimes(1);
  });
});
