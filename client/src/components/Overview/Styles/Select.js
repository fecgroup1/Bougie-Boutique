import React from 'react';

import Price from './Select/Price.js';
import Thumbnails from './Select/Thumbnails.js';

const small = {
  fontSize: '14px'
};

const titleFont = {
  fontFamily: '"Yeseva One", cursive',
  fontSize: '20px'
};

const Select = ({title, category, currStyle, styles, changeStyle}) => (
  <div id="select">
    <div style={small}>{category}</div>
    <div style={titleFont}>{title}</div>
    <div className="price">
      <Price
        orig={styles[currStyle].original_price}
        sale={styles[currStyle].sale_price}/>
    </div>
    <div className="stylename">Style: {styles[currStyle].name}</div>
    <Thumbnails
      styles={styles}
      currStyle={currStyle}
      changeStyle={changeStyle} />
  </div>
)

export default Select;