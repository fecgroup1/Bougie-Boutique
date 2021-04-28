import styled from 'styled-components';

export const OuterStars = styled.div`
  & {
    display: inline-block;
    position: relative;
    top: 0;
    left: 0;
    color: ${props => props.theme.outline};
  }
`;
export const InnerStars = styled.div`
  & {
    position: absolute;
    top: 0;
    left: 0;
    white-space: nowrap;
    overflow: hidden;
    color: ${props => props.theme.outline};
  }
`;