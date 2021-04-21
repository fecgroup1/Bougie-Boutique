import Stars from './Styles/Stars.js';
import Select from './Styles/Select.js';
import AddToCart from './Styles/AddToCart.js';

import React from 'react';

import { Right } from './../../Styles';

const Styles = ({product, currStyle, changeStyle, styles, stars, reviews}) => (
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
        currStyle={currStyle}
        styles={styles}/>
    </Right>
);

export default Styles;