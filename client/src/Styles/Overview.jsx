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
    content: "\f006  \f006  \f006  \f006  \f006";
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
    content: "\f005  \f005  \f005  \f005  \f005";
    color: ${props => props.theme.outline}
  }
`;

export const StyleName = styled.div`
  margin-top: 10px;
`;

export const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: -10px;
`;

export const Left = styled.div`
  flex: 5 0 200px;
  order: 1;
  margin: 10px;
`;

export const Right = styled.div`
  min-width: 400px;
  flex: 1 0 400px;
  order: 2;
  margin: 10px;
`;

export const LinedTop = styled.div`
  border-top: 3px solid #002a60;
  margin-top: 10px;
  padding-top: 10px;
`;

export const AddToCartButton = styled.button`
  & {
    border: 3px solid ${props => props.theme.text};
    color: ${props => props.theme.text};
    background: ${props => props.theme.bg};
    outline: #002a60;
    transition: background 0.5s;
    padding: 1em;
    text-align: center;
    height: 4em;
    font-size: 1em;
    font-family: 'Josefin Sans', sans-serif;
    font-weight: bold;
  }
  &: hover {
    background: #002a60;
  }
`;

export const CartDropdown = styled.select`
  border: 3px solid ${props => props.theme.text};
  color: ${props => props.theme.text};
  background: ${props => props.theme.bg};
  outline: #0056c5;
  height: 4em;
  padding: 1em 0em;
  font-family: 'Josefin Sans', sans-serif;
  font-size: 1em;
  font-weight: bold;
`;