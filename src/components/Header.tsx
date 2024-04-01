import React from 'react';
import styled from '@emotion/styled';

const HeaderContainer = styled.div`
    font-family: 'Pokemon Solid', sans-serif;
    background-color: black;
    color: white;
    margin-bottom: 30px;
    text-align: center;
    width: 100%;
`;

const PokedexHeader: React.FC = () => {
  return (
    <HeaderContainer>
      <img src='https://fontmeme.com/temporary/38cd057136d5241f2c24f7aeaceb02df.png' />
    </HeaderContainer>
  );
};

export default PokedexHeader;
