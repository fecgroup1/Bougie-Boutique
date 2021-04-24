import styled, { createGlobalStyle } from 'styled-components';
import React from 'react';

export const Body = createGlobalStyle`
  body {
    color: ${props => props.theme.text};
    background: ${props => props.theme.bg};
    font-family: 'Josefin Sans', sans-serif;
    font-weight: 500;
    font-size: 18px;
    margin: 0px;
    scroll-behavior: smooth;
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

  @keyframes loadspin {
    from { transform: rotate(0deg) }
    to { transform: rotate(360deg) }
  }

  // #cart > select {
  //   border: 3px solid ${props => props.theme.text};
  //   color: ${props => props.theme.text};
  //   background: ${props => props.theme.bg};
  //   outline: #0056c5;
  //   height: 4em;
  //   padding: 1em 0em;
  //   font-family: 'Josefin Sans', sans-serif;
  //   font-size: 1em;
  //   font-weight: bold;
  //   transition: background 0.5s;
  // }
  // #cart > select: hover {
  //   background: #002a60;
  // }

  .compareModalOverlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
    transition: 500ms ease-in-out;
    transition: all 500ms ease-out;
  }
  .compareModalOverlay-in {
    opacity: 1 ;
  }

  .compareModalOverlay-out {
    opacity: 0 ;
  }

  .addOutfit {
    box-shadow: none !important;
    grid-template-rows: 100% !important;
    button {
      border-radius: 50px;
      height: fit-content;
      width: fit-content;
      margin: auto;
    }
    button: active {
      box-shadow: inset 10px 5px 15px #cccccc;
      border-radius: 500px;
      height: fit-content;
      width: fit-content;
    }
    &: hover {
      cursor: auto;
    }
  }

  // button {
  //   & {
  //     border: 3px solid ${props => props.theme.text};
  //     color: ${props => props.theme.text};
  //     background: ${props => props.theme.bg};
  //     outline: #002a60;
  //     transition: background 0.5s;
  //     padding: 1em;
  //     text-align: center;
  //     height: 4em;
  //   }
  //   &: hover {
  //     background: #002a60;
  //   }
  // }
`;

export const NavButton = styled.button`
  border: none;
  color: #ccc;
  background: none;
  font-size: 2em;
  outline: none;
  padding: 0;
  height: 1em;
  width: 1em;
`;

export const Title = styled.h1`
  font-family: 'Yeseva One', cursive;
  margin-block-start: 0;
  margin-block-end: 0;
  line-height: 1em;
`;

export const light = {
  border: 'white',
  outline: '#002a60',
  text: 'black',
  bg: 'rgb(255, 255, 255)',
  bluGry: '#002a60',
  blkGry: 'black',
  invertWht: 0,
};

export const dark = {
  border: '#002a60',
  outline: '#cccccc',
  text: '#cccccc',
  bg: 'rgb(17, 17, 17)',
  bluGry: '#cccccc',
  blkGry: '#cccccc',
  invertWht: 1,
}

export const ThemeContext = React.createContext(light);


// input {
//   -webkit-appearance: none;
//   appearance: none;
// }