import styled from 'styled-components';

export const StyleThumbs = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;

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