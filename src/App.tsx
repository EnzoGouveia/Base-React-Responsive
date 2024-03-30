import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from '@emotion/styled';
import PokemonStats from './components/PokemonStats';
import './App.css';

interface PokemonData {
  sprites: { 
    versions: { 
      'generation-v': { 
        'black-white': { 
          animated: {
            front_shiny: string; 
            front_default: string 
          } 
        } 
      } 
    } 
  };
  id: number;
  name: string;
  height: number;
  weight: number;
  stats: [];
  types: { 
    type: { 
      name: string 
    } 
  }[];
}

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const InputContainer = styled.div`
  display: flex;
  margin-bottom: 30px;
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 300px);
  justify-content: center;
  gap: 20px;

  @media(max-width: 1320px){
    grid-template-columns: repeat(3, 300px);
  }

  @media(max-width: 1000px){
    grid-template-columns: repeat(2, 300px);
  }

  @media(max-width: 680px){
    grid-template-columns: repeat(1, 300px);
  }
`;

const Card = styled.div`
  background-color: black;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const PokemonInfo = styled.div`

  img {
    width: 100px;
    height: 100px;
  }
`;

const Atributtes = styled.div`
  align-items: center;
  align-text: center;

  .atributtes{
    padding: 10px;
    width: 50px;
    height: 50px;
  }
`

const capitalizeFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

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
      <InputContainer>
        <input
          type="text"
          placeholder="Search Pokémon"
          value={search}
          onChange={handleSearchChange} 
        />
      </InputContainer>
      <CardContainer>
        {filteredPokemonList.map((pokemon) => <Card key={pokemon.id}>
          <img src='https://archives.bulbagarden.net/media/upload/0/0f/ShinyLAStar_Pok%C3%A9dex.png' onClick={() => toggleShiny(pokemon.id)}></img>
          <h2>
            {capitalizeFirstLetter(pokemon.name)}
          </h2>
          <PokemonInfo>
            <img src={
              shinyStatus[pokemon.id]
                ? pokemon.sprites.versions["generation-v"]["black-white"].animated
                    .front_shiny
                : pokemon.sprites.versions["generation-v"]["black-white"].animated
                    .front_default
            }
            alt={pokemon.name} />
            <p>Height: {pokemon.height / 10}m</p>
            <p>Weight: {pokemon.weight / 10}kg</p>
            <h2>Types</h2>
            <Atributtes>
              {pokemon.types.map(type => <img key={pokemon.id+'pk'} className='atributtes' src={`/src/assets/atributtes/Pokemon_Type_Icon_${capitalizeFirstLetter(type.type.name)}.png`} />)}
            </Atributtes>
            <h2>Stats</h2>
            <PokemonStats stats={pokemon.stats} />
          </PokemonInfo>
        </Card>
        )}
      </CardContainer>
    </Container>
  );
};

export default App;