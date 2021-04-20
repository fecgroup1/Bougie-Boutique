import React, { Fragment, useState, useEffect } from 'react';
import RelatedAPI from '../../Utils/RelatedAPI';
import ProductAPI from '../../Utils/ProductAPI';
import { RelatedContainer, ProductsContainer, ProductCard } from '../../Styles';
// import ProductCard from './ProductCard.js'

const RelatedProducts = (props) => {

  const [products, setProducts] = useState([1, 2, 3]);

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     products: [1, 2, 3]
  //   }
  // }

  // componentDidMount() {
  //   console.log('ln 17',this.props.store.state.related)
  //   ProductAPI.getRelatedProducts(this.props.store.state.related)
  //   .then((results) => console.log('I am the results', results))
  // }

  // componentDidUpdate() {
  //   console.log('ln 23', this.props.store.state.related)
  // }



    const store = props.state
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
            {
              products.map((product, index) => (
                <ProductCard
                  key={index}
                />
              ))
            }
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