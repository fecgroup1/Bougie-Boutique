import styled from 'styled-components';

export const OuterStars = styled.div`
  & {
    display: inline-block;
    position: relative;
    font-family: FontAwesome;
    color: ${props => props.theme.outline};
  }
  &:before {
    content: "\f006 \f006 \f006 \f006 \f006";
  }
`;
export const InnerStars = styled.div`
  & {
    position: absolute;
    top: 0;
    left: 0;
    white-space: nowrap;
    overflow: hidden;
  }
  &:before {
    content: "\f005 \f005 \f005 \f005 \f005";
    color: ${props => props.theme.outline}
  }
`;