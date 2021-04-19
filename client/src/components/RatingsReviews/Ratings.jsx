import React from 'react';
import StarRating from './StarRatings';
import Characteristics from './Characteristics';

const Ratings = ({ meta }) => (
  <div>
    <div>{meta.averageRating}</div>
    <StarRating stars={meta.starRating} />
    <Characteristics characteristics={meta.characteristics} />
  </div>
);

export default Ratings;
