import React, {Fragment} from 'react';
import ProductAPI from './ProductAPI.js';
import QuestionsAPI from './QuestionAPI.js';
import ReviewAPI from './ReviewAPI.js';
import axios from 'axios'

class CurrentProduct extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      currentProductId: this.props.pid,
      cart: {},
    };

    this.changeProduct = this.changeProduct.bind(this);
    // this.changeStyle = this.changeStyle.bind(this);
    this.setProduct = this.setProduct.bind(this);
    this.setCart = this.setCart.bind(this);
    // this.updateCart = this.updateCart.bind(this);
    this.changeImg = this.changeImg.bind(this);
    this.setReviews=this.setReviews.bind(this);
    this.setMeta=this.setMeta.bind(this);
    this.getQuestions = this.getQuestions.bind(this);
    this.getAnswers = this.getAnswers.bind(this)
  }

  componentDidMount() {
    window.onpopstate = (event) => {
      if (this.props.pid !== this.state.currentProductId) {
        this.setState({currentProductId: this.props.pid});
        this.setProduct(this.props.pid);
      }
    }
  }

  changeProduct(pid) {
    this.setState({currentProductId: pid})
    this.setProduct(pid);
    window.scrollTo({top: 0, behavior: 'smooth'})
    this.props.history.push(`/${pid}`);
  }

  setProduct(pid) {
    let id = pid === undefined ? this.state.currentProductId: pid;
    ProductAPI.getProduct(id)
    .then((resData) => {
      this.setState({
        currImg: [0, 0],
        product: resData.product,
        styles: resData.styles
      });
    })
  }

  setReviews(id) {
    ReviewAPI.getReviews(id)
      .then((reviews) => {
        this.setState({ reviews: reviews.data });
      });
  }

  setMeta(id) {
    ReviewAPI.getMeta(id)
      .then((meta) => {
        this.setState({ meta: meta.data })
      });
  }

  getQuestions(pid) {
    return QuestionsAPI.getQuestions(pid)
    .then((questions) => {
      return questions
    })
    .catch((err) => {
      console.log('err')
    })
  }

  getAnswers (qid) {
    return QuestionsAPI.getAnswers(qid)
    .then ((answers) => {
      return answers
    })
    .catch ((err) => {
      console.log(err)
    })
  }

  setCart() {
    var cart = JSON.parse(window.localStorage.getItem('cart'));
    this.setState({
      cart: cart === null ? {}: cart
    });
  }

  changeImg(style, index) {
    this.setState({
      currImg: [style, index]
    });
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

