import styled from 'styled-components'

const func = (props) => (
  `
  margin: auto;
  text-align: center;
  border-collapse: collapse;
  border-left: 1px solid ${props.theme.text};
  border-right: 1px solid ${props.theme.text};
  border-top: 1px solid ${props.theme.text};
  border-bottom: 1px solid ${props.theme.text};

  th, td {
    padding: 2vw;
    text-align: center;
  }

  tr {
    margin-bottom: 0px;
    text-align: center;
  }

  .inner {
    font-style: italic;
    font-weight: bolder;
    text-transform: capitalize;
  }
  .title {
    font-style: italic;
    font-size: larger;
  }
  `
)

export const CompareTable = styled.table`
  ${props => func(props)}
`