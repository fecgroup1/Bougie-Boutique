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

  select {
    border: 3px solid ${props => props.theme.text};
    color: ${props => props.theme.text};
    background: ${props => props.theme.bg};
    outline: #0056c5;
    height: 4em;
    padding: 1em 0em;
  }

  .ReactModal__Content {
    opacity: 0;
    transition: all 500ms ease-in-out;
  }

  .ReactModal__Overlay {
    transition: all 500ms ease-out;
  }

  .ReactModal__Content--after-open {
    opacity: 1;
  }

  .ReactModal__Content--before-close {
    opacity: 0;
  }

//   button {
//     & {
//       border: 3px solid ${props => props.theme.text};
//       color: ${props => props.theme.text};
//       background: ${props => props.theme.bg};
//       outline: #002a60;
//       transition: background 0.5s;
//       padding: 1em;
//       text-align: center;
//       height: 4em;
//     }
//     &: hover {
//       background: #002a60;
//     }
//   }
// `;

export const ThemeToggle = styled.button`
  border: none;
  color: #ccc;
  background: none;
  font-size: 30px;
  outline: none;
  height: auto;
  padding: 0;
  top: 22px;
  position: absolute;
  transition: right 0.5s
`;

export const Title = styled.h1`
  font-family: 'Yeseva One', cursive;
  margin: 0px;
`;

export const light = {
  border: 'white',
  outline: '#002a60',
  text: 'black',
  bg: 'white',
  bluGry: '#002a60',
  blkGry: 'black'
};

export const dark = {
  border: '#002a60',
  outline: '#cccccc',
  text: '#cccccc',
  bg: '#111111',
  bluGry: '#cccccc',
  blkGry: '#cccccc'
}



// input {
//   -webkit-appearance: none;
//   appearance: none;
// }