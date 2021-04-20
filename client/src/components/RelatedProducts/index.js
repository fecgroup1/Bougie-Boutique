import React, { Fragment, useState, useEffect, memo } from 'react';
import RelatedAPI from '../../Utils/RelatedAPI';
import ProductAPI from '../../Utils/ProductAPI';
import { RelatedContainer, ProductsContainer, CardContainer, CardsWrapper } from '../../Styles';
import ProductCard from './ProductCard.js'

const RelatedProducts = (props) => {

  const [products, setProducts] = useState([1, 2, 3, 4, 5, 6, 7, 9]);

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
    }

    direction === 'left' ? area.scrollLeft += cardWidth : area.scrollLeft -= cardWidth
    // console.log(event.target.parentNode.children[1].scrollLeft)
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
            <button
              onClick={(event) => scroll('products', 'right', event)}
            >
              &#60;
            </button>
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
              <button
                onClick={(event) => scroll('products', 'left', event)}
              >&gt;</button>
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