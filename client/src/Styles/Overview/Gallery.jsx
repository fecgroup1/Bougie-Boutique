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
  background: ${props => props.theme.bg};
  border: none;
  border-radius: 50%;
  height: 3vh;
  margin: 0vh;
  outline: none;
  padding: 0;
  transition: background 0.5s;
  width: 3vh;
`;

export const GalleryScroll = styled.button`
&{
  align-items: center;
  background: none;
  border: 0.5vh solid transparent;
  border-radius: 50%;
  color: ${props => props.theme.text};
  display: flex;
  font-size: 2.5vh;
  height: 3vh;
  justify-content: center;
  line-height: 3vh;
  opacity: 50%;
  outline: none;
  padding: 0;
  text-align: center;
  transition: color 0.5s, opacity 0.5s;
  width: 3vh;
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