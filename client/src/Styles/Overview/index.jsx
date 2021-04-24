import styled from 'styled-components';

export { AddToCartButton, CartDropdown} from './AddToCart';
export { StyleThumbs, ThumbImg, CurrThumb, Loading, StylePlaceholder, SelectedStylePlaceholder, PlaceholderBorder } from './Thumbnails';
export { GallPlaceholder, GallergyBorder, SelectedGallPlaceholder, GallThumb, CurrGallThumb, NoScrollBar, GalleryScroll, GallThumbContainer, ScrollBg, MainImg, MainNull } from './Gallery';
export { OuterStars, InnerStars } from './Stars';

export const Small = styled.span`
  font-size: 14px;
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