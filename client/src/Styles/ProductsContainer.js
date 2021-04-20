import styled from 'styled-components'

export const ProductsContainer = styled.div`
  display: grid;
  width: 85vw;
  grid-template-rows: 10% 90%
  template-columns: repeat(${props => props.items}, 5vw)
`;