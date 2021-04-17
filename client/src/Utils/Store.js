import React from 'react';
import ProductAPI from './ProductAPI.js';
import QuestionAPI from './QuestionAPI.js';
import ReviewAPI from 'ReviewAPI.js'
// import { ProductAPI, QuestionAPI, ReviewAPI } from './Utils'

class Store extends React.component {
  constructor(props){
    super(props);

    this.state = {
      currentProduct_id: 1,
      currentProduct: {},
      relatedProducts: {},
      reviews: {},
      qa: {},
    }

  }

  componentDidMount() {

  }

  setProduct(id) {
    ProductAPI.getProduct(id)
    .then((productData) => {
      // console.log(productData);
      this.setState({currentProduct: productData});
    })
  }

  render(){
    return(
      <div></div>
    )
  }
}
export default Store;