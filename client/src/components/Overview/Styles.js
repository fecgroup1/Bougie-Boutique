import Stars from './Styles/Stars.js';
import AddToCart from './Styles/AddToCart.js';
import Price from './Styles/Select/Price.js';
import Thumbnails from './Styles/Select/Thumbnails.js';

import React from 'react';

import { Right, Small } from './../../Styles/Overview';

const checkStock = (stylesObj, styleIndex) => {
  for (let i = 0; i < stylesObj[styleIndex].skus.length; i++) {
    if (stylesObj[styleIndex].skus[i].quantity > 0) {
      return false;
    }
  }
  return true;
}

const Styles = ({store, product, currStyle, changeStyle, styles, stars, reviews, cart, setCart}) => {

  const outOfStock = checkStock(styles, currStyle);
  const container = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    alignContent: 'space-between',
    height: '66vh',
    minHeight: '400px',
  }

  var title = product.name;
  var category = product.category;

  const titleFont = {
    fontFamily: '"Yeseva One", cursive',
    fontSize: '1.5em'
  };

  return (
    <Right style={container}>
      <Stars
        rating={stars}
        reviews={reviews}/>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '100%',
        gridAutoRows: 'auto',
        alignContent: 'space-evenly',
        flexGrow: 1,
        paddingTop: '0.5%',
      }}>
        <Small>{category}</Small>
        <div style={titleFont}>{title}</div>
        <div className="price">
          <Price
            orig={styles[currStyle].original_price}
            sale={styles[currStyle].sale_price}/>
        </div>
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '100%',
        gridAutoRows: 'auto',
        alignContent: 'space-around',
        flexGrow: 2,
      }}>
        <Thumbnails
          styles={styles}
          currStyle={currStyle}
          changeStyle={changeStyle} />
      </div>
      <AddToCart
        title={product.name}
        currStyle={currStyle}
        styles={styles}
        outOfStock={outOfStock}
        cart={cart}
        setCart={setCart}/>
    </Right>
  )
};

export default Styles;