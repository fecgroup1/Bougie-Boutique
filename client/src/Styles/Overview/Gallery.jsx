import styled from 'styled-components';

export const MainImg = styled.img`
& {
  object-fit: cover;
  object-position: 50% 50%;
  width: 100%;
  height: 100%;
}
&: hover {
  cursor: zoom-in;
}
`;

export const MainNull = styled.img`
  border: none;
  width: 50%;
  height: 50%;
  margin: 25%;
  opacity: 30%;
  filter: invert(${props => props.theme.invertWht});
  object-position: 50% 50%;
  transition: filter 0.5s;
`;

export const GallPlaceholder = styled.img`
  & {
    border: 0.75vh solid transparent;
    width: 3vh;
    height: 3vh;
    min-width: 15px;
    min-height: 15px;
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
  // width: 3vh;
  // height: 3vh;
  // min-width: 15px;
  // min-height: 15px;
  border: 0.25vh solid ${props => props.theme.border};
  outline: 0.5vh solid ${props => props.theme.outline};
  margin: 0.5vh;
  padding: 1.5vh;
`;

export const SelectedGallPlaceholder = styled.img`
  & {
    width: 3vh;
    height: 3vh;
    min-width: 15px;
    min-height: 15px;
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
  scroll-snap-align: center;
  border: 5px solid transparent;
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
  scroll-snap-align: center;
  margin: 3px;
  border: 2px solid ${props => props.theme.border};
  outline: 3px solid ${props => props.theme.outline};
  transition: border 0.5s, outline 0.5s;
`;

export const NoScrollBar = styled.div`
  &{
    display: grid;
    overflow-x: hidden;
    overflow-y: auto;
    scroll-snap-type: y mandatory;
    -ms-overflow-style: none;
    transition: transform 0.5s;
    position: relative;
    width: 100%;
    scroll-behavior: smooth;
  }
  &:: -webkit-scrollbar {
    display: none
  }
`;

export const GalleryScroll = styled.button`
&{
  align-items: center;
  justify-content: center;
  background: ${props => props.theme.alphaBg};
  border: 0.5vh solid transparent;
  border-radius: 50%;
  color: ${props => props.theme.text};
  display: flex;
  opacity: 70%;
  outline: none;
  font-Size: 1.5em;
  margin: 1px;
  padding: 0;
  text-align: center;
  transition: background 0.5s, color 0.5s, opacity 0.5s;
}
&:hover {
  opacity: 100%;
}`;

export const GallThumbContainer = styled.div`
  overflow: hidden;
  position: absolute;
  background: ${props => props.theme.bg};
  transition: background 0.5s;
`;