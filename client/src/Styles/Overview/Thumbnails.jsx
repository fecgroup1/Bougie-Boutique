import styled from 'styled-components';

export const StyleThumbs = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;

export const Loading = styled.img`
  border: none;
  width: 50%;
  height: 50%;
  margin: 25%;
  opacity: 30%;
  filter: invert(${props => props.theme.invertWht});
  transition: filter 0.5s;
  object-position: 50% 50%;
  animation-name: loadspin;
  animation-duration: 3s;
  animation-iteration-count: infinite;
  animation-timing-function: cubic-bezier(0.42, 0.6, 0.58, 0.1);
`;

export const StylePlaceholder = styled.img`
  & {
    object-fit: cover;
    border: 1.25vh solid transparent;
    width: 5vh;
    height: 5vh;
    padding: 2.5vh;
    opacity: 30%;
    object-position: 50% 50%;
    filter: invert(${props => props.theme.invertWht});
  }
  &: hover {
    opacity: 50%;
  }
`;

export const PlaceholderBorder = styled.div`
  border: 0.5vh solid ${props => props.theme.border};
  outline: 0.75vh solid ${props => props.theme.outline};
`;

export const SelectedStylePlaceholder = styled.img`
  & {
    object-fit: cover;
    width: 5vh;
    height: 5vh;
    padding: 2.5vh;
    opacity: 30%;
    object-position: 50% 50%;
    margin: 0.75vh;
    filter: invert(${props => props.theme.invertWht});
    transition: filter 0.5s;
  }
  &: hover {
    opacity: 50%;
  }
`;

export const ThumbImg = styled.img`
  & {
    object-fit: cover;
    object-position: 50% 50%;
    width: 10vh;
    height: 10vh;
    border: 1.25vh solid transparent;
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
  width: 10vh;
  height: 10vh;
  min-width: 80px;
  min-height: 80px;
  margin: 0.75vh;
  border: 0.5vh solid ${props => props.theme.border};
  outline: 0.75vh solid ${props => props.theme.outline};
  transition: border 0.5s, outline 0.5s;
`;