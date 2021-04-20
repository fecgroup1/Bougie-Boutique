import React, { Fragment, useState, useEffect, memo } from 'react';
import RelatedAPI from '../../Utils/RelatedAPI';
import ProductAPI from '../../Utils/ProductAPI';
import { RelatedContainer, ProductsContainer, CardContainer } from '../../Styles';
import ProductCard from './ProductCard.js'

const RelatedProducts = (props) => {

  const [products, setProducts] = useState([1, 2, 3, 4, 5, 6, 7, 9]);

  useEffect(() => {
    // if (props.store.state.related) {
    //   ProductAPI.getRelatedProducts(props.store.state.related)
    //     .then((results) => setProducts(results.data))
    // }
  }, [props.store.state]);

  const scroll = (container, direction) => {
    console.log(container)
    let area = document.getElementById(container);
    let cards = document.getElementsByClassName('productCard');
    console.log('cards', cards)
    // direction === 'left' ? area.scrollLeft = cards

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
          <div>
            <button
              onClick={() => scroll('related', 'left')}
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
              <button>&gt;</button>
            </div>

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