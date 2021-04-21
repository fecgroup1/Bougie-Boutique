import React, { Fragment, useState, useEffect, memo } from 'react';
import RelatedAPI from '../../Utils/RelatedAPI';
import ProductAPI from '../../Utils/ProductAPI';
import { RelatedContainer, ProductsContainer, CardContainer, CardsWrapper, Button } from '../../Styles';
import ProductCard from './ProductCard.js'

const RelatedProducts = (props) => {

  const [products, setProducts] = useState([1, 2, 3, 4, 5, 6, 7, 9]);
  const [productsPosition, setProductsPosition] = useState(0);

  useEffect(() => {
    // if (props.store.state.related) {
    //   ProductAPI.getRelatedProducts(props.store.state.related)
    //     .then((results) => setProducts(results.data))
    // }
  }, [props.store.state]);

  const scroll = (container, direction, event) => {
    console.log(container)
    let area = event.target.parentNode.children[1];
    let cardWidth = event.target.parentNode.children[1].children[1].clientWidth;
    console.log('cardwidth', cardWidth)
    if(direction === 'left' ) {
      console.log('lefttime', event.target.parentNode.children[1].scrollLeft)
      area.scrollLeft += cardWidth
      setProductsPosition(productsPosition - 1)
    } else {
      area.scrollLeft -= cardWidth
      setProductsPosition(productsPosition + 1)
    }

    // direction === 'left' ? area.scrollLeft += cardWidth && setProductsPosition(productsPosition - 1) : area.scrollLeft -= cardWidth && setProductsPosition(productsPosition + 1)
  }

    return (
      <Fragment>
        <RelatedContainer>
          <ProductsContainer
            key={'relatedProductsContainer'}
            items={products.length}
            // products={this.props.store.}
          ><div>
            <h3>RELATED PRODUCTS</h3>
          </div>
          <CardsWrapper>
            <Button
              onClick={(event) => scroll('products', 'right', event)}
              show={!!productsPosition}
            >
              &#60;
            </Button>
            <CardContainer>
              {
                products.map((product, index) => (
                  <ProductCard
                    key={index}
                    product={product}
                    className={'productCard'}
                  />
                ))
              }
            </CardContainer>
              <Button
                onClick={(event) => scroll('products', 'left', event)}
                show={true}
              >&gt;</Button>
              </CardsWrapper>

          </ProductsContainer>

          <ProductsContainer
            key={'outfitProductsContainer'}
          >
            <h2>YOUR OUTFIT</h2>
          </ProductsContainer>

        <div> btw I'm a Class related component {props.store.state.currentProductId}</div>
        </RelatedContainer>
    </Fragment>
    )
}


export default RelatedProducts;