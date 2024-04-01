import React from 'react';
import styled from '@emotion/styled';

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
`;

const SearchInputField = styled.input`
  width: 100%;
  padding: 10px;
  border: 2px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  outline: none;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
`;

const SearchInput: React.FC<{ value: string; onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; }> = ({ value, onChange }) => {
  return (
    <InputContainer>
      <SearchInputField
        type="text"
        placeholder="Search Pokémon"
        value={value}
        onChange={onChange}
      />
    </InputContainer>
  );
};

export default SearchInput;