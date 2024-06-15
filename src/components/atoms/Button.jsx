import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  padding: 10px 20px;
  margin: 5px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const Button = ({ children, onClick }) => (
  <StyledButton onClick={onClick}>
    {children}
  </StyledButton>
);

export default Button;
