import React from 'react';
import styled from '@emotion/styled';
import PokemonCard from './PokemonCard';
import PokemonData from '../interfaces/PokemonData';

interface PokemonListProps {
  pokemonList: PokemonData[];
  shinyStatus: { [key: number]: boolean };
  toggleShiny: (id: number) => void;
}

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

const PokemonList: React.FC<PokemonListProps> = ({ pokemonList, shinyStatus, toggleShiny }) => {
  return (
    <CardContainer>
      {pokemonList.map((pokemon) => (
        <PokemonCard
          key={pokemon.id}
          pokemon={pokemon}
          shinyStatus={shinyStatus[pokemon.id]}
          toggleShiny={() => toggleShiny(pokemon.id)}
        />
      ))}
    </CardContainer>
  );
};

export default PokemonList;