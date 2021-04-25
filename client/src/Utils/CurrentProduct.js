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
      currentProductId: "13318",
      cart: null,
    };

    this.changeProduct = this.changeProduct.bind(this);
    // this.changeStyle = this.changeStyle.bind(this);
    this.setProduct = this.setProduct.bind(this);
    this.setQuestions = this.setQuestions.bind(this);
    this.setCart = this.setCart.bind(this);
    // this.updateCart = this.updateCart.bind(this);
    this.changeImg = this.changeImg.bind(this);
    this.setReviews=this.setReviews.bind(this);
    this.setMeta=this.setMeta.bind(this);
  }

  changeProduct(pid) {
    this.setState({currentProductId: pid})
    this.setProduct(pid);
    window.scrollTo({top: 0, behavior: 'smooth'})
  }

  // changeStyle(index) {
  //   this.setState({
  //     currStyle: index
  //   });
  // }

  setProduct(pid) {
    let id = pid === undefined ? this.state.currentProductId: pid;
    ProductAPI.getProduct(id)
    .then((resData) => {
      let productData = resData;
      // productData.currStyle = 0;
      // productData.cart = this.checkCart(resData);
      productData.currImg = [0, 0];
      this.setState(productData);
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

  setQuestions(id) {
    QuestionAPI.getQuestions(id)
      .then((questions) => {
        console.log('hello', questions)
        this.setState({ questions: questions })
      })
  }

  setCart() {
    let productData = this.state;
    var cart = JSON.parse(window.localStorage.getItem('cart'));
    console.log('current cart', cart);
    if (this.state.cart !== null) {
      console.log('shouldn\'t be here');
      var newCart = {};
      if (cart !== null) {
        for (let i = 0; i < productData.styles.length; i++) {
          let style = productData.styles[i];
          for (let j = 0; j < style.skus.length; j++) {
            let sku = style.skus[j].sku;
            let stock = style.skus[j].quantity;
            if (cart[sku] <= stock) {
              newCart[sku] = cart[sku];
            } else if (cart[sku] > stock) {
              newCart[sku] = stock;
            }
          }
        }
        window.localStorage.setItem('cart', JSON.stringify(newCart));
      }
      console.log(window.localStorage);
      this.setState({
        cart: newCart
      });
    } else {
      this.setState({
        cart: cart,
      });
    }
  }

  // updateCart() {
  //   let newCart = this.checkCart(this.state);
  //   this.setState({
  //     cart: newCart
  //   });
  // }

  changeImg(style, index) {
    this.setState({
      // currStyle: this.state.currImg[0],
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

