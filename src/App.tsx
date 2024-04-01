import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from '@emotion/styled';
import SearchInput from './components/SearchInput';
import PokemonList from './components/PokemonList';
import PokemonData from './interfaces/PokemonData';
import PokedexHeader from './components/Header';
import './App.css';

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const InputContainer = styled.div`
  display: flex;

`;

const App: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<PokemonData[] | null>(null);
  const [search, setSearch] = useState<string>('');
  const [shinyStatus, setShinyStatus] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0');
        const { results } = response.data;
  
        const pokemonRequests = results.map((pokemon: { url: string }) => axios.get(pokemon.url));
  
        const pokemonResponses = await Promise.all(pokemonRequests);
  
        const pkList: PokemonData[] = pokemonResponses.map((response: { data: PokemonData }) => response.data);
        
        setPokemonList(pkList);
      } catch (error) {
        console.error('Erro ao buscar dados dos Pokémon:', error);
      }
    };
  
    fetchData();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const toggleShiny = (id: number) => {
    setShinyStatus((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredPokemonList = pokemonList ? pokemonList.filter(pokemon =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  ) : [];

  return (
    <Container>
      <PokedexHeader/>
      <InputContainer>
        <SearchInput value={search} onChange={handleSearchChange} />
      </InputContainer>
      <PokemonList pokemonList={filteredPokemonList} shinyStatus={shinyStatus} toggleShiny={toggleShiny} />
    </Container>
  );
};

export default App;