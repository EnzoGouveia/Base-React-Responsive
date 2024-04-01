import React from 'react';
import styled from '@emotion/styled';
import PokemonStats from './PokemonStats';
import PokemonTypeIcon from './PokemonTypeIcon';
import PokemonData from '../interfaces/PokemonData';

interface PokemonCardProps {
  pokemon: PokemonData;
  shinyStatus: boolean;
  toggleShiny: () => void;
}

const Card = styled.div`
    background-color: black;
    padding-top: 10px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    display: grid;
    align-items: center;
    justify-items: center;
`;

const PokemonInfo = styled.div`
    display: grid;
    align-items: center;
    justify-items: center;
    align-text: center;
    img {
        width: 100px;
        height: 100px;
    }
`;

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, shinyStatus, toggleShiny }) => {
  const capitalizeFirstLetter = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <Card>
        <img
            src='https://archives.bulbagarden.net/media/upload/0/0f/ShinyLAStar_Pok%C3%A9dex.png'
            onClick={toggleShiny}
            alt="Toggle Shiny"
        />
        <h2>{capitalizeFirstLetter(pokemon.name)}</h2>
        <PokemonInfo>
        <img
            src={
            shinyStatus
                ? pokemon.sprites.versions["generation-v"]["black-white"].animated.front_shiny
                : pokemon.sprites.versions["generation-v"]["black-white"].animated.front_default
            }
            alt={pokemon.name}
        />
        <p>Height: {pokemon.height / 10}m</p>
        <p>Weight: {pokemon.weight / 10}kg</p>
        <h2>Types</h2>
        <PokemonTypeIcon types={pokemon.types} />
        <h2>Stats</h2>
        <PokemonStats stats={pokemon.stats} />
        </PokemonInfo>
    </Card>
  );
};

export default PokemonCard;