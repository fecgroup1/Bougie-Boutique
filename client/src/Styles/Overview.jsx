import styled from 'styled-components';

<<<<<<< HEAD
export const StyleThumbs = styled.div`
=======
export const StyleThumbs = styled.img`
>>>>>>> Added styled component variables
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;

<<<<<<< HEAD
export const ThumbImg = styled.img`
  & {
    object-fit: cover;
    object-position: 50% 50%;
    width: 88px;
    height: 88px;
    margin: 3px;
    border: 6px solid ${props => props.theme.bg};
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
  width: 88px;
  height: 88px;
  margin: 6px;
  border: 2px solid ${props => props.theme.border};
  outline: 4px solid ${props => props.theme.outline};
=======
export const Stars = styled.div`
  margin-bottom: 10px;
>>>>>>> Added styled component variables
`;

export const Small = styled.span`
  font-size: 14px;
`;

export const OuterStars = styled.div`
  & {
    display: inline-block;
    position: relative;
    font-family: FontAwesome;
    color: ${props => props.theme.outline};
  }
  &:before {
<<<<<<< HEAD
    content: "\f006  \f006  \f006  \f006  \f006";
=======
    content: "\f006 \f006 \f006 \f006 \f006";
>>>>>>> Added styled component variables
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
<<<<<<< HEAD
    content: "\f005  \f005  \f005  \f005  \f005";
=======
    content: "\f005 \f005 \f005 \f005 \f005";
>>>>>>> Added styled component variables
    color: ${props => props.theme.outline}
  }
`;

<<<<<<< HEAD
=======
export const Price = styled.span`
  margin: 5px 0px;
`;

>>>>>>> Added styled component variables
export const StyleName = styled.div`
  margin-top: 10px;
`;

export const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
<<<<<<< HEAD
  margin: -10px;
=======
`;

export const GalleryStyle = styled.div`
  height: 500px;
>>>>>>> Added styled component variables
`;

export const Left = styled.div`
  flex: 5 0 200px;
  order: 1;
<<<<<<< HEAD
  margin: 10px;
=======
  margin-right: 20px;
>>>>>>> Added styled component variables
`;

export const Right = styled.div`
  min-width: 400px;
  flex: 1 0 400px;
  order: 2;
<<<<<<< HEAD
  margin: 10px;
=======
`;

export const DetailStyling = styled.div`
  padding-top: 10px;
>>>>>>> Added styled component variables
`;

export const LinedTop = styled.div`
  border-top: 3px solid #002a60;
  margin-top: 10px;
  padding-top: 10px;
`;