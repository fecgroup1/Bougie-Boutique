import Stars from './Styles/Stars.js';
import Select from './Styles/Select.js';
import AddToCart from './Styles/AddToCart.js';

import React from 'react';

import { Right } from './../../Styles';

const checkStock = (stylesObj, styleIndex) => {
  for (let i = 0; i < stylesObj[styleIndex].skus.length; i++) {
    if (stylesObj[styleIndex].skus[i].quantity > 0) {
      return false;
    }
  }
  return true;
}

const Styles = ({product, currStyle, changeStyle, styles, stars, reviews, cart, updateCart}) => {

  const outOfStock = checkStock(styles, currStyle);

  return (
    <Right>
      <Stars
        rating={stars}
        reviews={reviews}/>
      <Select
        title={product.name}
        category={product.category}
        currStyle={currStyle}
        styles={styles}
        changeStyle={changeStyle}/>
      <AddToCart
        title={product.name}
        currStyle={currStyle}
        styles={styles}
        outOfStock={outOfStock}
        cart={cart}
        updateCart={updateCart}/>
    </Right>
  )
};

export default Styles;