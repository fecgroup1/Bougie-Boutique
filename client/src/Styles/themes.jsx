import styled, { createGlobalStyle } from 'styled-components';

export const Body = createGlobalStyle`
  body {
    color: ${props => props.theme.text};
    background: ${props => props.theme.bg};
    font-family: 'Josefin Sans', sans-serif;
    font-weight: 500;
    font-size: 18px;
    margin: 0px;
  }

  #content {
    padding: 0px 20px;
  }

  a {
    color: #0056c5;
    transition: color 0.5s;
  }
  a: hover {
    color: ${props => props.theme.text};
  }
  input {
    -webkit-appearance: none;
    appearance: none;
  }

  select {
    border: 3px solid ${props => props.theme.text};
    color: ${props => props.theme.text};
    background: ${props => props.theme.bg};
    outline: #0056c5;
    height: 4em;
    padding: 1em 0em;
  }

  button {
    & {
      border: 3px solid ${props => props.theme.text};
      color: ${props => props.theme.text};
      background: ${props => props.theme.bg};
      outline: #002a60;
      transition: background 0.5s;
      padding: 1em;
      text-align: center;
      height: 4em;
    }
    &: hover {
      background: #002a60;
    }
  }
`;

// export const ThemeToggle = styled.button`
//   border: none;
//   color: #ccc;
//   background: none;
//   font-size: 20px;
//   outline: none;
//   height: auto;
//   padding: 0;
// `;

export const Title = styled.h1`
  font-family: 'Yeseva One', cursive;
  margin: 0px;
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

