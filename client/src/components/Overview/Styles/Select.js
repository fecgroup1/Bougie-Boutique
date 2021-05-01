import React from 'react';
import { Small } from './../../../Styles';


import Price from './Select/Price.js';
import Thumbnails from './Select/Thumbnails.js';

const titleFont = {
  fontFamily: '"Yeseva One", cursive',
  fontSize: '24px'
};

const Select = ({title, category, currStyle, styles, changeStyle}) => (
  <div id="select">
    <Small>{category}</Small>
    <div style={titleFont}>{title}</div>
    <div className="price" style={{margin: '5px 0px'}}>
      <Price
        orig={styles[currStyle].original_price}
        sale={styles[currStyle].sale_price}/>
    </div>
    <div
      className="stylename small"
      style={{marginTop: '10px'}}>
        Style: {styles[currStyle].name}
    </div>
    <Thumbnails
      title={title}
      styles={styles}
      currStyle={currStyle}
      changeStyle={changeStyle} />
  </div>
)

export default Select;