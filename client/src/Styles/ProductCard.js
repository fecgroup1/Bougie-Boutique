import styled from 'styled-components'

export const ProductCard = styled.div`
  position: relative;
  display: inline-grid;
  width: 275px;
  height 400px;
  border: 5px solid ${props => props.theme.bluGry};
  grid-template-rows: 70% 30%;
`
