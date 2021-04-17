import React from 'react';
import ProductAPI from './ProductAPI.js';
import QuestionAPI from './QuestionAPI.js';
import ReviewAPI from './ReviewAPI.js'
// import { ProductAPI, QuestionAPI, ReviewAPI } from '../Utils'

class Store extends React.component {
  constructor(props){
    super(props);

    this.state = {
      currentProduct_id: 1,
      currentProduct: {},
      currentProductRating: 5,
      currentProductStars: 3.25,
      relatedProducts: {},
      reviews: {},
      qa: {},
    }


    // this.state = {
    //   currentProduct:{
    //     styles:[{}],
    //     relatedIds:[],
    //     reviews: {
    //       averageRating: 0,
    //       reviews[{}]
    //     }
    //   },
    //   relatedProducts:[{Product:{}, averageRating: 0}],
    //   outfit:[{}]
    // }

  }

  componentDidMount() {
    setProduct(this.state.currentProduct_id)
  }

  setProduct(id) {
    ProductAPI.getProduct(id)
    .then((productData) => {
      // console.log(productData);
      this.setState({currentProduct: productData});
    })
  }

  setReviews(id) {

  }

  setQuestions(id) {

  }

  render(){
    return(
      <div></div>
    )
  }
}
export default Store;