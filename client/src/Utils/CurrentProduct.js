import React, {Fragment} from 'react';
import ProductAPI from './ProductAPI.js';
import QuestionAPI from './QuestionAPI.js';
import ReviewAPI from './ReviewAPI.js';

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
    this.setQuestions = this.setQuestions.bind(this);
    this.setCart = this.setCart.bind(this);
    // this.updateCart = this.updateCart.bind(this);
    this.changeImg = this.changeImg.bind(this);
    this.setReviews=this.setReviews.bind(this);
    this.setMeta=this.setMeta.bind(this);
  }

  changeProduct(pid, event) {
    this.setState({currentProductId: pid})
    this.setProduct(pid);
    window.scrollTo({top: 0, behavior: 'smooth'})
    window.history.pushState(null, `product: ${pid} page`, `?pid=${pid}`);
  }

  // changeStyle(index) {
  //   this.setState({
  //     currStyle: index
  //   });
  // }

  setProduct(pid) {
    console.log('ive been called')
    let id = pid === undefined ? this.state.currentProductId: pid;
    ProductAPI.getProduct(id)
    .then((resData) => {
      console.log(resData);
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

  setQuestions(id) {
    QuestionAPI.getQuestions(id)
      .then((questions) => {
        console.log('hello', questions)
        this.setState({ questions: questions })
      })
  }

  setCart() {
    // let productData = this.state;
    var cart = JSON.parse(window.localStorage.getItem('cart'));
    console.log('current cart', cart);
    if (cart === null) {
      // console.log('shouldn\'t be here');
      var newCart = {};
      // if (cart !== null) {
      //   for (let i = 0; i < productData.styles.length; i++) {
      //     let style = prsoductData.styles[i];
      //     for (let j = 0; j < style.skus.length; j++) {
      //       let sku = style.skus[j].sku;
      //       let stock = style.skus[j].quantity;
      //       if (cart[sku] <= stock) {
      //         newCart[sku] = cart[sku];
      //       } else if (cart[sku] > stock) {
      //         newCart[sku] = stock;
      //       }
      //     }
      //   }
      //   window.localStorage.setItem('cart', JSON.stringify(newCart));
      // }
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

