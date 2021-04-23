import styled from 'styled-components'

export const StyledProductCard = styled.div`
  position: relative;
  display: inline-grid;
  width: 275px;
  height 400px;
  border: 5px solid ${props => props.theme.bluGry};
  grid-template-rows: 70% 30%;
  box-shadow: 10px 5px 15px #cccccc;

  .plus: focus {
    &::before {
      box-shadow: inset 10px 15px 15px #cccccc;
      border-radius: 50px;
    };
  }

  .lni-spinner-arrow::before {
    color: ${props => props.theme.bluGry}
  }
`
const AddOutfitButtonFunc = (props) => (
  `
    background: none;
    border: none;
  `
)

export const AddOutfitButton = styled.button`
  ${props => AddOutfitButtonFunc(props)};
`
