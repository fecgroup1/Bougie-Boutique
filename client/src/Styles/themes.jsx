import styled, { createGlobalStyle } from 'styled-components';

export const Body = createGlobalStyle`
  body {
    color: ${props => props.theme.text};
    background: ${props => props.theme.bg};
    font-family: 'Josefin Sans', sans-serif;
    font-weight: 500;
    font-size: 18px;
    padding: 0px 20px;
  }
`;

export const Title = styled.h1`
  font-family: 'Yeseva One', cursive;
`;

export const light = {
  border: 'white',
  outline: '#002a60',
  text: 'black',
  bg: 'white',
};

export const dark = {
  border: '#002a60',
  outline: '#cccccc',
  text: '#cccccc',
  bg: '#111111',
}

