import React from 'react';

const Details = ({slogan, description, features}) => (
    <div id="Details">
      <Stars rating={stars} />
      <Select />
      <AddToCart />
    </div>
);

export default Details;