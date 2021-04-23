import React, { Fragment, useState, useEffect, useMemo } from 'react';
import RelatedAPI from '../../Utils/RelatedAPI';
import ProductAPI from '../../Utils/ProductAPI';
import { RelatedContainer, ProductsContainer, CardContainer, CardsWrapper, Button, StarsInner, StarsOuter, StyledProductCard, AddOutfitButton } from '../../Styles';
import ProductCard from './ProductCard.js'
import CompareModal from './CompareModal.js'

const RelatedProducts = ({store, theme}) => {

  const [products, setProducts] = useState([1, 2, 3, 4]);
  const [productsPosition, setProductsPosition] = useState(0);
  const [comparisonProduct, setComparisonProduct] = useState(null);
  const [outfits, setOutfits] = useState()

  useEffect(() => {
    RelatedAPI.getRelatedProducts(store.state.currentProductId)
      .then((results) => {
        setProducts(results)
      })

  }, [store.state.currentProductId]);

  useEffect(() => {

  }, [outfits])

  const scroll = (container, direction, event) => {
    let area = event.target.parentNode.parentNode.children[1];
    let cardWidth = event.target.parentNode.parentNode.children[1].children[1].clientWidth;
    if(direction === 'left' ) {
      // console.log('lefttime', event.target.parentNode.parentNode.children[1].scrollLeft)
      area.scrollLeft += cardWidth
      if (productsPosition === `${container}`.length - 3) {

      } else {
        setProductsPosition(productsPosition + 1);
      }
    } else {
      // console.log('lefttime', event.target.parentNode.parentNode.children[1].scrollLeft)
      area.scrollLeft -= cardWidth
      setProductsPosition(productsPosition - 1)
    }
  }

  const handleSaveOutfit = () => {

  }

  const relatedSection = useMemo(() =>
    <ProductsContainer
    key={'relatedProductsContainer'}
    items={products.length}
    >
      <div>
        <h3>RELATED PRODUCTS</h3>
      </div>
      <CardsWrapper>
        <Button
          // onClick={(event) => scroll('products', 'right', event)}
          show={!!productsPosition}
          position={'left'}
        >
          <i className="lni lni-32 lni-chevron-left-circle"
          style={{padding: '30px 20px',
            opacity: '.75',
            backgroundColor: 'white'}}
          onClick={(event) => scroll('products', 'right', event)}
          ></i>
        </Button>
        <CardContainer>
          {
            products.map((product, index) => (
              <ProductCard
                key={index}
                product={product}
                className={'productCard'}
                compareMe={setComparisonProduct}
                changeProduct={store.changeProduct}
              />
            ))
          }
        </CardContainer>
          <Button
            // onClick={(event) => scroll('products', 'left', event)}
            show={true}
            position={'right'}
          >
            <i className="lni lni-32 lni-chevron-right-circle"
            style={{padding: '30px 20px',
            opacity: '.75',
            backgroundColor: 'white'}}
            onClick={(event) => scroll('products', 'left', event)}
            />
          </Button>
      </CardsWrapper>
    </ProductsContainer>

    , [store.state.currentProductId, products])

  const outfitSection = useMemo(() =>
    <ProductsContainer
    key={'outfitProductsContainer'}
    >
      <div>
        <h3>YOUR OUTFIT</h3>
      </div>
      <CardsWrapper>
      <CardContainer>
        <StyledProductCard
          className={'addOutfit'}
        >
        <AddOutfitButton
        onClick={handleSaveOutfit}
        >
          <i
            style={{
              fontSize: '9em',
              color: theme.bluGry
            }}
            className="lni lni-circle-plus plus"
          />
        </AddOutfitButton>
        </StyledProductCard>
          {/* {
            products.map((product, index) => (
              <ProductCard
                key={index}
                product={product}
                className={'productCard'}
                compareMe={setComparisonProduct}
              />
            ))
          } */}
        </CardContainer>
      </CardsWrapper>

    </ProductsContainer>

  , [outfits])

    return (
      <Fragment>
        <RelatedContainer>
          {relatedSection}
          {outfitSection}
        </RelatedContainer>
        <CompareModal
          product={store.state.product}
          comparisonProduct={comparisonProduct}
          resetCompare={setComparisonProduct}
         />
    </Fragment>
    )
}


export default RelatedProducts;