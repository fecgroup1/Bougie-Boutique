import styled from 'styled-components';

export { AddToCartButton, CartDropdown} from './AddToCart';
export { ThumbImg, CurrThumb, Loading, StylePlaceholder, SelectedStylePlaceholder, PlaceholderBorder } from './Thumbnails';
export { GallPlaceholder, GallergyBorder, SelectedGallPlaceholder, GallThumb, CurrGallThumb, NoScrollBar, GalleryScroll, GallThumbContainer, MainImg, MainNull } from './Gallery';

export const Small = styled.span`
  font-size: 14px;
`;

export const StyleName = styled.div`
  margin-top: 10px;
`;

export const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  margin: -10px;
`;

export const Left = styled.div`
  flex: 5 0 200px;
  order: 1;
  margin: 10px;
  min-width: 400px;
  @media screen and (max-width: 700px) {
    min-width: unset;
    width: 100%;
    flex: none;
  }
`;

export const Right = styled.div`
  min-width: 400px;
  flex: 1 0 400px;
  order: 2;
  margin: 10px;
  @media screen and (max-width: 700px) {
    min-height: unset;
    min-width: unset;
    flex: none;
    width: 100%;
  }
`;

export const LinedTop = styled.div`
  border-top: 3px solid #002a60;
  margin-top: 10px;
  padding-top: 10px;
`;