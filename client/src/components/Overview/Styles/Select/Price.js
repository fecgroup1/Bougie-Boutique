import React from 'react';

const salePrice = {
  color: 'red'
};

const strikethru = {
  textDecoration: 'line-through'
};

const Price = ({orig, sale}) => {
  if (sale === null) {
    return(
      <span>${typeof orig === 'number' ? orig.toFixed(2): '0.00'}</span>
    );
  } else {
    return(
      <>
      <span style={salePrice}>${typeof sale === 'number' ? sale.toFixed(2): sale} </span>
      <span style={strikethru}>${typeof orig === 'number' ? orig.toFixed(2): orig}</span>
      </>
    );
  }
};

export default Price;