import React, {Fragment} from 'react';
import ProductAPI from './ProductAPI.js';
import QuestionAPI from './QuestionAPI.js';
import ReviewAPI from './ReviewAPI.js'
import dummyState from './dummyState.json'
// import { ProductAPI, QuestionAPI, ReviewAPI } from '../Utils'

class AppStore extends React.Component {

  constructor (props) {
    super(props);

    this.state = dummyState

  }


  componentDidMount() {
    this.setProduct(this.state.currentProduct_id)
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
        {this.props.render(this.state)}
      </Fragment>
    )
  }
}

// const AppStore = () => (
//   <div>yes</div>
// )

export default AppStore;