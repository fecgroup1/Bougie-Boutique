import Stars from './Styles/Stars.js';
import Select from './Styles/Select.js';
import AddToCart from './Styles/AddToCart.js';

import React from 'react';

const Styles = ({product, currStyle, changeStyle, styles, stars, reviews}) => (
    <div id="styles" className="right">
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
    </div>
);

export default Styles;