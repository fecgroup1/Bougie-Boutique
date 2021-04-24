import styled from 'styled-components';

export const GallPlaceholder = styled.img`
  & {
    border: 0.75vh solid transparent;
    width: 3vh;
    height: 3vh;
    padding: 1.5vh;
    opacity: 30%;
    object-position: 50% 50%;
    filter: invert(${props => props.theme.invertWht});
  }
  &: hover {
    opacity: 50%;
  }
`;

export const GallergyBorder = styled.div`
  width: 3vh;
  height: 3vh;
  border: 0.25vh solid ${props => props.theme.border};
  outline: 0.5vh solid ${props => props.theme.outline};
  margin: 0.5vh;
  padding: 1.5vh;
`;

export const SelectedGallPlaceholder = styled.img`
  & {
    width: 3vh;
    height: 3vh;
    opacity: 30%;
    object-position: 50% 50%;
    filter: invert(${props => props.theme.invertWht});
  }
  &: hover {
    opacity: 50%;
  }
`;

export const GallThumb = styled.img`
& {
  object-fit: cover;
  object-position: 50% 50%;
  width: 6vh;
  height: 6vh;
  scroll-snap-align: center;
  border: 0.75vh solid transparent;
  opacity: 50%;
  transition: opacity 0.5s;
}
&: hover {
  opacity: 100%;
}
`;

export const CurrGallThumb = styled.img`
  object-fit: cover;
  object-position: 50% 50%;
  width: 6vh;
  height: 6vh;
  scroll-snap-align: center;
  margin: 0.5vh;
  border: 0.25vh solid ${props => props.theme.border};
  outline: 0.5vh solid ${props => props.theme.outline};
  transition: border 0.5s, outline 0.5s;
`;

export const NoScrollBar = styled.div`
  &{
    display: grid;
    align-content: flex-start;
    overflow-x: hidden;
    overflow-y: auto;
    scroll-snap-type: y mandatory;
    -ms-overflow-style: none;
    transition: transform 0.5s;
    position: relative;
    width: 7.5vh;
    scroll-behavior: smooth;
  }
  &:: -webkit-scrollbar {
    display: none
  }
`;

export const ScrollBg = styled.button`
  border: none;
  background: ${props => props.theme.bg};
  font-size: 2em;
  outline: none;
  padding: 0;
  width: 2.5vh;
  height: 2.5vh;
  border-radius: 50%;
  margin: 0.5vh;
  transition: background 0.5s;
  z-index: 0;
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
  z-index: 1
}
&:hover {
  opacity: 100%;
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