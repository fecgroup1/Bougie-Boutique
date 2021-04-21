import styled from 'styled-components'

export const ProductsContainer = styled.div`
  display: grid;
  width: 85%;
  padding: 0 2vw;
  grid-template-rows: 10% 90%;
  justify-content: start;
`;

export const CardContainer = styled.div`
  display: grid;
  grid-gap: 2vw;
  grid-auto-flow: column;
  grid-auto-columns: calc(50% - var(--gutter) * 2);
  max-width: 100vw;
  overflow-x: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  scroll-behavior: smooth;

  ::-webkit-scrollbar {
    display: none
  }
`;

export const CardsWrapper = styled.div`
  display: grid;
  position: relative;
  scroll-behavior: smooth;
`

export const Button = styled.button`
  position: absolute !important;
  top 35%;
  ${props => props.position}: 0;
  display: ${props => props.show ? 'inline-block': 'none'}

`

export const CardImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  place-self: center;
`