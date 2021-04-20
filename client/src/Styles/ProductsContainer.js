import styled from 'styled-components'

export const ProductsContainer = styled.div`
  display: grid;
  width: 85vw;
  grid-template-rows: 10% 90%;
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

  ::-webkit-scrollbar {
    display: none
  }
`;

export const CardsWrapper = styled.div`

`