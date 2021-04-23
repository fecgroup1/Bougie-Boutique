import styled from 'styled-components';

export const AddToCartButton = styled.button`
  & {
    border: 3px solid ${props => props.theme.text};
    color: ${props => props.theme.text};
    background: ${props => props.theme.bg};
    outline: #002a60;
    transition: background 0.5s;
    padding: 1em;
    text-align: center;
    height: 4em;
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
    border: 3px solid ${props => props.theme.text};
    color: ${props => props.theme.text};
    background: ${props => props.theme.bg};
    outline: #0056c5;
    height: 4em;
    padding: 1em 0em;
    font-family: 'Josefin Sans', sans-serif;
    font-size: 1em;
    font-weight: bold;
    transition: background 0.5s;
  }
  &: hover {
    background: #002a60;
  }
`;