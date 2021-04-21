import styled from 'styled-components'

export const StarsOuter = styled.div`
  display: inline-block;
  position: relative;
  font-family: FontAwesome;
  color: ${props => props.color};

  &::before {
    content: "\f006 \f006 \f006 \f006 \f006";
  }
`

export const StarsInner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  white-space: nowrap;
  overflow: hidden;
  width: ${props => props.rating / 5 * 100}%;

  &::before {
    content: "\f005 \f005 \f005 \f005 \f005";
    color: ${props => props.color}
  }
`
