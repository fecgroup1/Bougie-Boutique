import styled from 'styled-components';

export const StyleThumbs = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;

export const ThumbImg = styled.img`
  & {
    object-fit: cover;
    object-position: 50% 50%;
    width: 86px;
    height: 86px;
    border: 7px solid ${props => props.theme.bg};
    opacity: 50%;
    transition: opacity 0.5s;
  }
  &: hover {
    opacity: 100%;
  }
`;

export const CurrThumb = styled.img`
  object-fit: cover;
  object-position: 50% 50%;
  width: 86px;
  height: 86px;
  margin: 4px;
  border: 3px solid ${props => props.theme.border};
  outline: 4px solid ${props => props.theme.outline};
`;