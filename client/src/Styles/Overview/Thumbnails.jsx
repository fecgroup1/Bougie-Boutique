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
object-position: 50% 50%;
animation-name: loadspin;
animation-duration: 3s;
animation-iteration-count: infinite;
animation-timing-function: cubic-bezier(0.42, 0.6, 0.58, 0.1);
`;


export const StylePlaceholder = styled.img`
  & {
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
    width: 5vh;
    height: 5vh;
    padding: 2.5vh;
    opacity: 30%;
    object-position: 50% 50%;
    margin: 0.75vh;
    filter: invert(${props => props.theme.invertWht});
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

export const GallThumb = styled.img`
& {
  objectFit: cover;
  objectPosition: 50% 50%;
  width: 6vh;
  height: 6vh;
  scrollSnapAlign: center;
  border: 0.75vh solid transparent;
  opacity: 50%;
  transition: opacity 0.5s;
  z-index: 1;
}
&: hover {
  opacity: 100%;
}
`;

export const CurrGallThumb = styled.img`
  objectFit: cover;
  objectPosition: 50% 50%;
  width: 6vh;
  height: 6vh;
  scrollSnapAlign: center;
  margin: 0.5vh;
  border: 0.25vh solid ${props => props.theme.border};
  outline: 0.5vh solid ${props => props.theme.outline};
  transition: border 0.5s, outline 0.5s;
  z-index: 1;
`;

export const NoScrollBar = styled.div`
  &{
    overflow-x: hidden;
    overflow-y: auto;
    scroll-snap-type: y mandatory;
    -ms-overflow-style: none;
    transition: transform 0.5s;
    position: relative;
    width: 7.5vh;
  }
  &:: -webkit-scrollbar {
    display: none
  }
`;

export const ScrollBg = styled.button`
  border: none;
  color: #ccc;
  background: ${props => props.theme.bg};
  font-size: 2em;
  outline: none;
  padding: 0;
  width: 2.5vh;
  height: 2.5vh;
  border-radius: 50%;
  margin: 1vh;
  transition: opacity 0.5s;
`;

export const GalleryScroll = styled.button`
&{
  margin: 0.5vh;
  font-size: 2.5vh;
  text-align: center;
  transition: opacity 0.5s;
  color: ${props => props.theme.text};
  border: none;
  background: none;
  outline: none;
  opacity: 50%;
  transition: color 0.5s, opacity 0.5s;
}
&:hover {
  opacity: 100%
}`;

export const GallThumbContainer = styled.div`
  overflow: hidden;
  position: absolute;
  top: 100px;
  left: 20px;
  width: 7.5vh;
  background: ${props => props.theme.bg};
  height: 56.5vh;
  margin: 4.75vh 1vw;
  transition: background 0.5s;
`;