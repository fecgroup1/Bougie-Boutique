import styled from 'styled-components'

export const ProductsContainer = styled.div`
  display: grid;
  width: 95%;
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
  padding: 0;
  opacity: .85;
  background-color: white;
  border: none;
  top 30%;
  z-index: 1;
  box-shadow: 1px 1px 5px;
  ${props => props.position}: 0;
  display: ${props => props.show ? 'inline-block': 'none'}

`

export const CardImage = styled.div`
  background-image: url(${props => props.src});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`

const actionButtonFunc = (props) => (
  ` background-color: ${props.theme.bg};
    color: ${props.theme.bluGry};

    &:hover {
      cursor: ${props.cursor === 'compare' ? 'help' : ''};
    }

    button: hover {
      background-color: ${props.theme.bluGry};
      color: ${props.theme.bg};
    };

    i: hover {
      border-radius: 1em;
      padding: .5 em;
      background-color: ${props.theme.bluGry};
      color: ${props.theme.bg};
    }
  `
)

export const ActionButton = styled.button`
  position: absolute;
  right: .25em;
  top: .25em;
  border-radius: 2em;
  padding: .25em;d
  border: 1px solid;
  ${props => actionButtonFunc(props)};
`