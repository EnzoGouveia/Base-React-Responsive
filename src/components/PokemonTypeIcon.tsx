import styled from '@emotion/styled';
import React from 'react';

interface PokemonTypeIconProps {
  types: { type: { name: string } }[];
};

const Container = styled.div`
    img {
        width: 50px;
        height: 50px;
        margin: 10px;
    }
`;

const PokemonTypeIcon: React.FC<PokemonTypeIconProps> = ({ types }) => {
  const capitalizeFirstLetter = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const typeNames = types.map((item) => item.type.name);

  return (
    <Container>
      {typeNames.map((type, index) => (
        <img
          key={index}
          className='atributtes'
          src={`/src/assets/atributtes/Pokemon_Type_Icon_${capitalizeFirstLetter(type)}.png`}
          alt={type}
        />
      ))}
    </Container>
  );
};

export default PokemonTypeIcon;