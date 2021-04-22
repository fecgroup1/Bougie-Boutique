import styled from 'styled-components'

export const StarsOuter = styled.div`
  display: inline-block;
  position: relative;
  font-family: FontAwesome;
  color: ${props => props.theme.bluGry} !important;

  &::before {
    content: "\f006 \f006 \f006 \f006 \f006";
  }
`

const func = (props) => (
  `
  width: ${props.rating / 5 * 100}%;
  &::before {
    content: "\f005 \f005 \f005 \f005 \f005";
    color: ${props.theme.bluGry} !important;
  }
  `
)

export const StarsInner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  white-space: nowrap;
  overflow: hidden;
  ${props => func(props)}
`
