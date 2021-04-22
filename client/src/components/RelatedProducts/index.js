import React, { Fragment, useState, useEffect, useMemo } from 'react';
import RelatedAPI from '../../Utils/RelatedAPI';
import ProductAPI from '../../Utils/ProductAPI';
import { RelatedContainer, ProductsContainer, CardContainer, CardsWrapper, Button } from '../../Styles';
import ProductCard from './ProductCard.js'
import CompareModal from './CompareModal.js'

const RelatedProducts = ({store, outfits}) => {

  const [products, setProducts] = useState([1, 2, 3, 4, 5, 6, 7, 9]);
  const [productsPosition, setProductsPosition] = useState(0);
  const [comparisonProduct, setComparisonProduct] = useState(null);

  useEffect(() => {
    RelatedAPI.getRelatedProducts(store.state.currentProductId)
      .then((results) => {
        console.log(results)
        setProducts(results)
      })

  }, [store.state.currentProductId]);

  const scroll = (container, direction, event) => {
    // console.log(container)
    let area = event.target.parentNode.parentNode.children[1];
    let cardWidth = event.target.parentNode.parentNode.children[1].children[1].clientWidth;
    // console.log('cardwidth', cardWidth)
    if(direction === 'left' ) {
      console.log('lefttime', event.target.parentNode.parentNode.children[1].scrollLeft)
      area.scrollLeft += cardWidth
      if (productsPosition === `${container}`.length - 3) {

      } else {
        setProductsPosition(productsPosition + 1);
      }
    } else {
      console.log('lefttime', event.target.parentNode.parentNode.children[1].scrollLeft)
      area.scrollLeft -= cardWidth
      setProductsPosition(productsPosition - 1)
    }
  }

  const realtedSection = useMemo(() =>
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
      <h2>YOUR OUTFIT</h2>
    </ProductsContainer>

  , [outfits])

    return (
      <Fragment>
        <RelatedContainer>

         {realtedSection}
         {outfitSection}

        </RelatedContainer>
        <CompareModal
          product={store.product}
          comparisonProduct={comparisonProduct}
          resetCompare={setComparisonProduct}
         />
    </Fragment>
    )
}


export default RelatedProducts;