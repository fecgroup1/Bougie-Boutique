import React from 'react';

const salePrice = {
  color: 'red'
};

const strikethru = {
  textDecoration: 'line-through'
};

const Price = ({orig, sale, noSale}) => {
  if (noSale) {
    return(
      <span>{orig}</span>
    );
  } else {
    return(
      <>
      <span style={salePrice}>{sale} </span>
      <span style={strikethru}>{orig}</span>
      </>
    );
  }
};

export default Price;