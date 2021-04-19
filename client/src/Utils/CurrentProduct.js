import React, {Fragment} from 'react';
import ProductAPI from './ProductAPI.js';
import QuestionAPI from './QuestionAPI.js';
import ReviewAPI from './ReviewAPI.js';
import dummyState from './dummyState.json';
// import { ProductAPI, QuestionAPI, ReviewAPI } from '../Utils'

class CurrentProduct extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      currentProductId: "13023"
    };

    // Test function
    this.changeProduct = this.changeProduct.bind(this);
    this.setProduct = this.setProduct.bind(this);
  }


  componentDidMount() {
    this.setProduct(this.state.currentProductId)
  }

  // TEST FUNCTION TO DELETE
  changeProduct() {
    this.setState({
      currentProductId: 9999
    });
  }

  setProduct(id) {
    ProductAPI.getProduct(id)
    .then((productData) => {
      // console.log(productData);
      this.setState(productData);
    })
  }

  setReviews(id) {
    ReviewAPI.getReviews(id)
      .then((reviews) => {
        this.setState({ reviews: reviews });
      });
  }

  setMeta(id) {
    ReviewAPI.getMeta(id)
      .then((meta) => {
        this.setState({ meta: meta });
      });
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

