import styled from 'styled-components';

export const AddToCartButton = styled.button`
  & {
    display: flex;
    place-items: center;
    place-content: center;
    border: 3px solid ${props => props.theme.text};
    color: ${props => props.theme.text};
    background: ${props => props.theme.bg};
    outline: #002a60;
    transition: background 0.5s;
    text-align: center;
    height: 10vh;
    min-height: 6vh;
    font-size: 1em;
    font-family: 'Josefin Sans', sans-serif;
    font-weight: bold;
  }
  &: hover {
    background: #002a60;
  }
`;

export const CartDropdown = styled.select`
  & {
    display: flex;
    place-items: center;
    place-content: center;
    border: 3px solid ${props => props.theme.text};
    color: ${props => props.theme.text};
    background: ${props => props.theme.bg};
    outline: #0056c5;
    min-height: 6vh;
    height: 10vh;
    font-family: 'Josefin Sans', sans-serif;
    font-size: 1em;
    font-weight: bold;
    transition: background 0.5s;
  }
  &: hover {
    background: #002a60;
  }
`;