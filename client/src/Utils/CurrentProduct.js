import React, {Fragment} from 'react';
import ProductAPI from './ProductAPI.js';
import QuestionAPI from './QuestionAPI.js';
import ReviewAPI from './ReviewAPI.js'
import dummyState from './dummyState.json'
// import { ProductAPI, QuestionAPI, ReviewAPI } from '../Utils'

class CurrentProduct extends React.Component {

  constructor (props) {
    super(props);

    this.state = dummyState;
    this.changeProduct = this.changeProduct.bind(this);
  }


  componentDidMount() {
    this.setProduct(this.state.currentProduct_id)
  }

  changeProduct() {
    this.setState({
      currentProductId: 9999
    });
  }

  setProduct(id) {
    // ProductAPI.getProduct(id)
    // .then((productData) => {
    //   // console.log(productData);
    //   this.setState({currentProduct: productData});
    // })
  }

  setReviews(id) {

  }

  setQuestions(id) {

  }


  render() {
    return (
      <Fragment>
        {this.props.render(this)}
      </Fragment>
    )
  }
}

export default CurrentProduct;