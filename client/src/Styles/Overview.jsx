import styled from 'styled-components';

export const StyleThumbs = styled.img`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;

export const Stars = styled.div`
  margin-bottom: 10px;
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
    content: "\f006 \f006 \f006 \f006 \f006";
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
    content: "\f005 \f005 \f005 \f005 \f005";
    color: ${props => props.theme.outline}
  }
`;

export const Price = styled.span`
  margin: 5px 0px;
`;

export const StyleName = styled.div`
  margin-top: 10px;
`;

export const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const GalleryStyle = styled.div`
  height: 500px;
`;

export const Left = styled.div`
  flex: 5 0 200px;
  order: 1;
  margin-right: 20px;
`;

export const Right = styled.div`
  min-width: 400px;
  flex: 1 0 400px;
  order: 2;
`;

export const DetailStyling = styled.div`
  padding-top: 10px;
`;

export const LinedTop = styled.div`
  border-top: 3px solid #002a60;
  margin-top: 10px;
  padding-top: 10px;
`;