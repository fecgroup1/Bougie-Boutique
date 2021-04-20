import React from 'react';

import Price from './Select/Price.js';
import Thumbnails from './Select/Thumbnails.js';

const Select = ({title, category, currStyle, styles, changeStyle}) => (
  <div id="select">
    <div className="category">{category}</div>
    <div className="title">{title}</div>
    <div className="price">
      <Price
        orig={styles[currStyle].original_price}
        sale={styles[currStyle].sale_price}
        noSale={styles[currStyle]['default?']}/>
    </div>
    <div className="stylename">Style: {styles[currStyle].name}</div>
    <Thumbnails
      styles={styles}
      currStyle={currStyle}
      changeStyle={changeStyle} />
  </div>
)

export default Select;