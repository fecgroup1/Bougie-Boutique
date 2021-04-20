import styled from 'styled-components'

export const ProductsContainer = styled.div`
  display: grid;
  width: 85vw;
  grid-template-rows: 10% 90%;
`;

export const CardContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: calc(50% - var(--gutter) * 2);
`;