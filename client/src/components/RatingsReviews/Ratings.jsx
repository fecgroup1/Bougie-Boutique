import React from 'react';
import StarRating from './StarRatings';
import Characteristics from './Characteristics';

var calculatePercent = (obj)=>{
  var pos =Number(obj.true);
  var neg = Number(obj.false);
  var total = pos + neg;
  percent = (pos / total) * 100;

}


const Ratings = ({ meta }) => (
  <div>
    <div>{meta.averageRating}</div>
    <StarRating stars={meta.starRating} />
    <p>{calculatePercent(meta.recommended)}% of reviews recomend this product</p>
    <Characteristics characteristics={meta.characteristics} />
  </div>
);

export default Ratings;



// //recommended": {
//   "false": "3",
//   "true": "20"
// },