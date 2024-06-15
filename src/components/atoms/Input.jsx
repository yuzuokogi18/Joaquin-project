import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  padding: 10px;
  margin: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Input = ({ type, placeholder, value, onChange }) => (
  <StyledInput type={type} placeholder={placeholder} value={value} onChange={onChange} />
);

export default Input;
